"""Transcreve um áudio ou vídeo e mostra o tempo de cada palavra.

Uso: python scripts/transcrever.py <arquivo> [saida.json]
"""
import json, subprocess, sys
from pathlib import Path

import imageio_ffmpeg
import numpy as np
import sherpa_onnx

MODELO = Path(__file__).resolve().parent.parent / "modelos" / "sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8"
TAXA = 16000


def ler_audio(arquivo):
    """Converte qualquer áudio/vídeo (ogg do WhatsApp, mp4, etc.) para mono 16 kHz."""
    cmd = [imageio_ffmpeg.get_ffmpeg_exe(), "-loglevel", "error", "-i", str(arquivo),
           "-ac", "1", "-ar", str(TAXA), "-f", "f32le", "-"]
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, dtype=np.float32)


def transcrever(arquivo):
    rec = sherpa_onnx.OfflineRecognizer.from_transducer(
        encoder=str(MODELO / "encoder.int8.onnx"), decoder=str(MODELO / "decoder.int8.onnx"),
        joiner=str(MODELO / "joiner.int8.onnx"), tokens=str(MODELO / "tokens.txt"),
        model_type="nemo_transducer", num_threads=4)
    audio = ler_audio(arquivo)
    st = rec.create_stream()
    st.accept_waveform(TAXA, audio)
    rec.decode_stream(st)
    r = st.result

    # O modelo devolve pedaços de palavra; "▁" marca o início de uma palavra nova.
    palavras = []
    for tok, ini in zip(r.tokens, r.timestamps):
        if tok.startswith((" ", "▁")) or not palavras:
            palavras.append({"palavra": tok.strip(" ▁"), "inicio": round(float(ini), 2)})
        else:
            palavras[-1]["palavra"] += tok
    for i, p in enumerate(palavras):
        fim = palavras[i + 1]["inicio"] if i + 1 < len(palavras) else len(audio) / TAXA
        p["fim"] = round(float(fim), 2)
    return {"texto": r.text, "palavras": palavras}


if __name__ == "__main__":
    resultado = transcrever(sys.argv[1])
    if len(sys.argv) > 2:
        Path(sys.argv[2]).write_text(json.dumps(resultado, ensure_ascii=False, indent=2), encoding="utf-8")
    print(resultado["texto"])
    for p in resultado["palavras"]:
        print(f'{p["inicio"]:7.2f}s  {p["palavra"]}')
