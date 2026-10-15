"""Abre uma página da internet pelo terminal e mostra só o texto.

Uso: python3 scripts/ler_pagina.py <link> [--max 20000]

Serve para os agentes (pauteiro, roteirista, revisor) conferirem fontes quando o
WebFetch não consegue abrir a página (ele não passa pela liberação de rede do ambiente).
"""
import argparse
import html
import re
import subprocess
import sys

p = argparse.ArgumentParser()
p.add_argument("link")
p.add_argument("--max", type=int, default=20000, help="máximo de caracteres mostrados")
a = p.parse_args()

r = subprocess.run(
    ["curl", "-sSL", "--max-time", "30", "-A",
     "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_0) AppleWebKit/537.36 Chrome/126 Safari/537.36",
     "-w", "\n__STATUS__%{http_code} %{url_effective}", a.link],
    capture_output=True, text=True, errors="replace",
)
corpo, _, status = r.stdout.rpartition("\n__STATUS__")
if r.returncode != 0 or not status.startswith(("2", "3")):
    print(f"ERRO ao abrir {a.link}: {status or ''} {r.stderr.strip()}", file=sys.stderr)
    sys.exit(1)

titulo = re.search(r"(?is)<title[^>]*>(.*?)</title>", corpo)
datas = re.findall(r'(?i)"(?:datePublished|dateModified)"\s*:\s*"([^"]+)"', corpo)
datas += re.findall(r'(?i)<meta[^>]+(?:article:published_time|article:modified_time)[^>]+content="([^"]+)"', corpo)
texto = re.sub(r"(?is)<(script|style|noscript|svg|nav|footer|header)\b.*?</\1>", " ", corpo)
texto = re.sub(r"(?i)<br\s*/?>|</p>|</h\d>|</li>", "\n", texto)
texto = html.unescape(re.sub(r"<[^>]+>", " ", texto))
texto = "\n".join(l for l in (re.sub(r"[ \t\xa0]+", " ", x).strip() for x in texto.splitlines()) if l)

print(f"LINK: {status.split(' ', 1)[-1]}")
print(f"TÍTULO: {html.unescape(titulo.group(1).strip()) if titulo else '(sem título)'}")
print(f"DATAS NA PÁGINA: {', '.join(dict.fromkeys(datas)) or '(não achei)'}")
print("-" * 60)
print(texto[: a.max])
