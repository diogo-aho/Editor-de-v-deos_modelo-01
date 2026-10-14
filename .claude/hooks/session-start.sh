#!/bin/bash
# Prepara o editor de vídeos sempre que uma conversa do Claude Code na web começa.
# Só instala o que estiver faltando; pode rodar quantas vezes quiser.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "${CLAUDE_PROJECT_DIR:-$(dirname "$0")/../..}"

# 1. Skills oficiais do Remotion
if [ ! -f .claude/skills/remotion-best-practices/SKILL.md ]; then
  npx -y skills add remotion-dev/skills -a claude-code -s '*' -y --copy
fi

# 2. Pacotes Node (remotion, three, ícones...)
npm install --no-audit --no-fund

# 3. Navegador que renderiza. Se a rede bloquear o download, o
#    remotion.config.ts usa o Chrome Headless Shell já instalado no ambiente.
NODE_USE_ENV_PROXY=1 npx remotion browser ensure \
  || echo "Aviso: download do navegador bloqueado; usando o Chrome Headless Shell do ambiente."

# 4. Ferramentas Python num ambiente virtual próprio (.venv)
if [ ! -x .venv/bin/python ]; then
  python3 -m venv .venv
fi
.venv/bin/pip install -q -r requirements.txt

# 5. Modelo de transcrição (641 MB, grande demais para o GitHub)
MODELO=sherpa-onnx-nemo-parakeet-tdt-0.6b-v3-int8
if [ ! -f "modelos/$MODELO/encoder.int8.onnx" ]; then
  mkdir -p modelos
  curl -sSLf "https://github.com/k2-fsa/sherpa-onnx/releases/download/asr-models/$MODELO.tar.bz2" \
    | tar xj -C modelos --exclude="$MODELO/test_wavs"
fi

# Deixa o python/yt-dlp/gdown do .venv disponíveis na sessão
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo "export PATH=\"$PWD/.venv/bin:\$PATH\"" >> "$CLAUDE_ENV_FILE"
  echo "export NODE_USE_ENV_PROXY=1" >> "$CLAUDE_ENV_FILE"
fi
