---
name: editar-video
description: Passo a passo para editar um vídeo do Diogo Carvalho (@diogo.aho) no padrão dele — da gravação bruta ao Reels, YouTube, feed, Stories, capa e carrossel. Use sempre que o Diogo mandar uma gravação, áudio, fotos ou vídeos para virar conteúdo, ou pedir para editar/refazer um vídeo.
---

# Editar um vídeo do Diogo

Leia o `CLAUDE.md` antes (formato, regras e "Regras aprendidas"). Fale em português simples.
Para detalhes de Remotion, use a skill `remotion-best-practices`.

## 0. Receber o material

- Gravação (vídeo do iPhone ou áudio), fotos/vídeos do imóvel, prints, imagens dos projetos.
  Podem vir anexados ou por link do Google Drive (`gdown`). Referências do Instagram: `yt-dlp`.
- Guarde os brutos em `brutos/<nome>/` (fora do Git) e as mídias de apoio em `public/projetos/<nome>/midia/`.
- Pergunte só o que faltar: **formato(s)**, **legenda do post** e **mensagem da DM** (sempre perguntar),
  **foto da capa**, e se é um assunto energético (esporte) ou calmo.
- **Nunca peça para regravar.**

## 1. Preparar a gravação

```bash
python scripts/preparar.py brutos/<nome>/<arquivo> <nome>
```

Converte HDR→SDR, corta silêncios longos (>0,6 s; ajuste com `--silencio`), nivela o volume
(-14 LUFS) e transcreve com o tempo de cada palavra. Saída: `public/projetos/<nome>/`
(`fala.mp4` ou `fala.wav`, `palavras.json`, `info.json`).

**Revise a transcrição** lendo o texto inteiro: corrija nomes, bairros (Pinheiros, Jardins,
Vila Nova Conceição, Itaim Bibi), Eixoz, Aho. Erros que se repetem vão para `scripts/correcoes.json`.
Trecho que não dá para entender: **pergunte ao Diogo** — a legenda tem que ser o que ele disse.

## 2. Recortar a silhueta (para animações que passam atrás dele)

Se a gravação for vídeo e houver `palavraAtras`:
```bash
python scripts/recortar.py public/projetos/<nome>/fala.mp4     # -> frente.webm
```
Para fotos: `python scripts/recortar.py public/diogo/fotos/foto-N.jpg`.

## 3. Montar o roteiro

```bash
python scripts/novo_roteiro.py <nome>            # vídeo
python scripts/novo_roteiro.py <nome> --foto diogo/fotos/foto-3.jpg   # só áudio
```

Edite `public/projetos/<nome>/roteiro.json` (tipos em `src/tipos.ts`). Tempos em segundos,
na linha do tempo já cortada. Monte assim:

- **Cenas** (`cenas`, em sequência, sem buracos; cada uma tem `inicio`/`fim`):
  - `rosto` — abre e fecha o vídeo. `zooms` nas frases fortes (escala 1.1–1.2).
  - `dividida` — metade ilustra o que ele diz (`midia` ou `animacao`), metade é ele.
  - `telaCheia` — imóvel/projeto em tela cheia (ele some) quando o que aparece é muito importante.
  - `textoGrande` — frase-chave dita por ele, em serifada (use as palavras exatas).
  - Ritmo médio: troque de cena a cada ~3–6 s; deixe respiro em momentos emocionais.
- **Destaques na legenda:** marque `"destaque": true` em 1 palavra-chave a cada ~5–8 s.
- **Sobreposições** (`sobreposicoes`): `destaque` (cartão com ícone lucide), `palavraAtras`
  (palavra gigante atrás dele), `numero` (**só números que ele disse**).
- **Animações sob medida:** crie em `src/animacoes/index.tsx` e registre em `ANIMACOES`.
  Mapas, gráficos, linhas do tempo… Elegantes, nunca chamativas. Nada de dado inventado.
- **Música** (`musicas`): faixas do Artlist em `public/musicas/`. Troque a faixa quando a cena
  muda de clima. Volume ~0,12 (a voz manda). Assunto energético: faixa mais forte.
- **Efeitos:** transições e entradas de animação já ganham som automático; extras em `efeitos`.
- `stories`: trecho de 10–15 s mais forte. `capa`: foto escolhida pelo Diogo + título curto
  (palavras dele). `carrossel`: 3–6 páginas com os pontos principais.
- `tema`/`clima`: escolha conforme as imagens do projeto (escuro/claro, quente/neutro).

## 4. Conferir antes de renderizar

Renderize quadros soltos nos momentos de troca de cena e sobreposições:
```bash
npx remotion still src/index.ts Reels out/q.png --frame=<n> --props=public/projetos/<nome>/roteiro.json
```
Confira: rosto livre, cartões fora do rosto, legenda legível e fora da zona dos botões,
nada importante no topo/base/lateral direita, nenhuma palavra cortada.

## 5. Renderizar e entregar

```bash
python scripts/entregar.py <nome> --formatos reels,stories            # padrão
python scripts/entregar.py <nome> --formatos reels,feed,youtube,stories
```
Gera em `out/<nome>/`: os vídeos, `capa.png` (e `capa-youtube.png`) e `carrossel-N.png`.
Para um só formato: `npx remotion render src/index.ts Reels out/x.mp4 --props=public/projetos/<nome>/roteiro.json`.

Mande os arquivos ao Diogo com um resumo curto em português e **a legenda do post e a DM**
que ele pediu. Faça commit do roteiro e do código (mídias grandes ficam fora do Git).

## 6. Depois da opinião do Diogo

Toda opinião dele vira regra em `CLAUDE.md` → "Regras aprendidas", com a data:
`2026-10-20 — legenda um pouco maior nos vídeos de rua — (vídeo "pinheiros-01")`.
Se a regra muda o padrão do código (cores, tamanhos, posições), ajuste o código também.
