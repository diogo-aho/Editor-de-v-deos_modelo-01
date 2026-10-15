# Editor de vídeos do Diogo Carvalho (@diogo.aho)

Editor de vídeos com IA em Remotion (React que vira vídeo). O Diogo grava; o Claude edita
seguindo o formato abaixo. **Fale sempre em português, de forma simples** (o Diogo não lê inglês).

Para editar um vídeo, siga a skill **`editar-video`** (`.claude/skills/editar-video/SKILL.md`).

## Regras que valem sempre

1. **A gravação é final.** Nunca peça para regravar. Corte os silêncios longos e nivele o volume (`scripts/preparar.py`).
2. **Nada importante onde a rede coloca os botões.** Respeite `zonaSegura()` em `src/marca.ts`.
3. **Nada de número ou dado inventado na tela.** Só o que o Diogo disse ou enviou. Na dúvida, pergunte.
4. **Toda opinião do Diogo sobre um vídeo vira uma regra escrita** na seção "Regras aprendidas" abaixo, com a data.
5. Legenda = exatamente o que ele falou. Se a transcrição tiver trecho duvidoso, pergunte antes de publicar.
6. Antes de entregar, renderize quadros soltos (`npx remotion still`) e confira: rosto livre, legenda legível, zona segura.

## Quem é

- **Nome nos vídeos:** Diogo Carvalho · **@diogo.aho** · imobiliária **Aho Imóveis** (logos em `public/aho/`)
- **Fotos:** `public/diogo/fotos/` (recortes de silhueta: `foto-N-recorte.png`)
- **Temas:** imóveis de alto padrão em Pinheiros, Jardins, Vila Nova Conceição e Itaim Bibi;
  autoconhecimento e autodesenvolvimento; comunidade **Eixoz** (5 eixos: Consciência, Saúde,
  Família, Propósito e Prosperidade). A identidade da Eixoz ainda está sendo criada: não inventar.
- **Público:** empresários e executivos de 40 a 60 anos; jovens empreendedores de 20 a 40.
- **Tom:** luxo silencioso — valor, autoridade e confiança. Nada chamativo. **Nunca memes.**
  Esporte ou assunto energético: mais transições e música mais forte e animada, na mesma linha elegante.

## Formatos

| Composição | Tamanho | Uso | Duração |
|---|---|---|---|
| `Reels` (**principal**) | 1080x1920 | Reels, TikTok, Shorts | até 90 s |
| `YouTube` | 1920x1080 | YouTube | ~10 min |
| `Feed` | 1080x1350 | feed Instagram/LinkedIn (reaproveita o Reels) | igual ao Reels |
| `Stories` | 1080x1920 | versão curta (trecho `stories` do roteiro) | 10–15 s |
| `Capa` / `CapaYouTube` | still | capa: foto enviada pelo Diogo + textos | — |
| `Carrossel` | still 1080x1350 | pontos principais do vídeo (prop `pagina`) | — |

## Como ele grava

iPhone 17 Pro Max + microfone de lapela. Fala para a câmera (em casa, na rua perto dos imóveis,
dentro dos apartamentos). Às vezes grava cenas do imóvel ou manda prints, fotos, imagens dos
projetos e vídeos à parte. O iPhone grava em HDR: `preparar.py` converte para SDR.

## Estrutura da tela

- Começa com o rosto; no meio alterna **tela dividida** (ilustra o que ele diz) e **cenas do imóvel
  em tela cheia**; termina com o rosto + assinatura (símbolo Aho, nome, @).
- Ele **some** da tela quando o que vai ser mostrado é muito importante.
- **Animações ao redor dele:** flutuam, passam e **atravessam por trás** (`palavraAtras`, usa o
  recorte da silhueta) em números, dados e destaques que não pedem uma imagem.
- **Edição:** animações sob medida, cortes e zoom (frases fortes), imagens de apoio, textos
  grandes, prints. **Ritmo médio**, com respiro quando a fala pedir.

## Legenda

- Clássica e simples: surge **uma linha de 2–3 palavras**; quando surge a próxima, a de cima sobe e fica mais fraca.
- **Letra branca** (Manrope). Palavras de **destaque**: serifada (Cormorant Garamond itálico), um pouco mais brilhante, sem acender demais.
- **Posição muda com a cena:** rosto = altura do peito; tela dividida = na parte de baixo da ilustração, logo acima do fio (rosto livre); tela cheia = terço de baixo (acima da zona dos botões); texto grande = sem legenda.

## Som

- **Música sempre**, do **Artlist** (o Diogo assina e manda as faixas por uma pasta do Google Drive).
  Estilo elegante e jovial, um pouco dançante, emocional quando necessário. A música pode
  **trocar no meio do vídeo** acompanhando a cena. Volume baixo por baixo da voz (~0,12).
- **Efeitos sutis** nas transições e nas animações. Provisórios gerados por `scripts/gerar_sons.py`
  (`public/sons/`) até chegarem os do Artlist.

## Visual

- **Paleta** (`src/marca.ts`): café `#2B211B`, grafite `#2E2F31`, chumbo `#5E6063`, oliva `#5B5A3F`,
  madeira `#A7744A`, cinza claro `#C8C8C5`, areia `#D9C8B0`, névoa `#ECECEA`, branco quente `#F4EFE7`.
- **Tema** varia por vídeo: escuro ou claro, clima quente (café/madeira/areia) ou neutro (grafite/cinzas/névoa),
  conforme o assunto e as imagens do projeto.
- **Letras:** Manrope (texto) + Cormorant Garamond (destaques). Legíveis, nada enfeitado.
- Sem mascote. Movimentos suaves (`SUAVE` em `marca.ts`), nunca tremidos ou elásticos.

## Referências

- **Enes Yilmazer** (YouTube): transições com efeito visual e sonoro, movimentos de câmera pelas paisagens, as letras e a música.
- **Ali Abdaal**: tudo — animações ao redor da pessoa, textos, ritmo.
- **Johnny Harris**: pausas e trocas de música no meio do vídeo acompanhando a cena.
- Valem para o vertical e o horizontal.

## Entregas de cada vídeo

- **Capa:** o Diogo manda a foto/imagem; o Claude cria os textos por cima (`Capa`).
- **Legenda do post** e **mensagem da DM:** dependem do vídeo — **pergunte ao Diogo** a cada vídeo.
- **Carrossel** com os pontos principais e **versão curta para Stories**.

## Ambiente técnico

- Transcrição: Whisper turbo forçado em português (`scripts/transcrever.py`). O Parakeet foi
  descartado: trocava o idioma para inglês.
- Modelos ficam em `modelos/` (fora do Git); o gancho `.claude/hooks/session-start.sh` baixa tudo.
- Rede: YouTube bloqueado no ambiente (liberar `youtube.com`, `googlevideo.com`, `ytimg.com` em
  "Acesso à rede" para baixar referências). Instagram, Google Drive e GitHub liberados.
- Navegador de render: Chrome Headless Shell do ambiente (`remotion.config.ts`).

## Regras aprendidas (opiniões do Diogo)

Formato: `AAAA-MM-DD — regra — (vídeo de origem)`

- 2026-10-15 — Formato definido na entrevista inicial (tudo acima). — (entrevista)
- 2026-10-15 — Toda mensagem para o Diogo é em português, sem exceção (ele não lê inglês). — (eixoz-01)
