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
7. **Nada passa sem o revisor.** Nenhum roteiro vai para gravação e nenhum vídeo é entregue sem o
   **APROVADO** do agente `revisor` (`.claude/agents/revisor.md`). Se ele disser AJUSTAR, corrige e manda de novo.

## Fluxo de um vídeo

1. **`pauteiro`** pesquisa e propõe 5 pautas → o Diogo aprova pelo número.
2. **`roteirista`** propõe 5+ ganchos → o Diogo escolhe → escreve o texto, a legenda da tela, o post e a DM.
3. **`revisor`** confere o roteiro (fontes, gancho, legendas). AJUSTAR → roteirista corrige → revisor de novo.
   Só com **APROVADO** o texto vai para o Diogo gravar.
4. O Diogo grava → edição pela skill **`editar-video`**.
5. **`revisor`** confere os quadros do vídeo pronto. AJUSTAR → corrige, renderiza e revisa de novo.
   Só com **APROVADO** o vídeo é entregue.

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
| `Reels` (**principal — entrega padrão**) | 1080x1920 | Reels, TikTok, Shorts | até 90 s |
| `Capa` / `CapaYouTube` | still | capa: foto enviada pelo Diogo + textos | — |
| `YouTube` | 1920x1080 | YouTube — só quando pedir | ~10 min |
| `Feed` | 1080x1350 | feed Instagram/LinkedIn — só quando pedir | igual ao Reels |
| `Stories` | 1080x1920 | versão curta — só quando pedir | 10–15 s |
| `Carrossel` | still 1080x1350 | pontos principais — só quando pedir (`entregar.py --carrossel`) | — |

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
- **Edição:** animações sob medida e **criativas** (objetos que se desenham, sílabas que voam, partículas,
  cadernos que se escrevem…), cortes e zoom (frases fortes), imagens de apoio, textos grandes, prints.
  **Muitas palavras-chave flutuando** (`flutuante`): acima da cabeça ou na altura do peito, nunca no rosto.
  **Ritmo médio**, com respiro quando a fala pedir.

## Legenda

- Clássica e simples: **uma linha só**, de 2–3 palavras; quando a próxima surge, a anterior sai (sem segunda linha).
  Tamanho 74 px no vertical.
- **Letra branca** (Manrope). Palavras de **destaque**: serifada (Cormorant Garamond itálico), um pouco mais brilhante, sem acender demais.
- **Posição muda com a cena:** rosto = altura do peito; tela dividida = na parte de baixo da ilustração, logo acima do fio (rosto livre); tela cheia = terço de baixo (acima da zona dos botões); texto grande = sem legenda.

## Som

- **Música sempre**, do **Artlist** (o Diogo assina e manda as faixas por uma pasta do Google Drive).
  Estilo elegante e jovial, um pouco dançante, emocional quando necessário. A música pode
  **trocar no meio do vídeo** acompanhando a cena. Volume baixo por baixo da voz (~0,12).
- **Efeitos sutis** nas transições e nas animações. Provisórios gerados por `scripts/gerar_sons.py`
  (`public/sons/`) até chegarem os do Artlist.

## Visual

### Paleta oficial (`src/marca.ts`) — essência: luxo silencioso + natureza + arquitetura + contraste contemporâneo

| Cor | Código | Uso | Função |
|---|---|---|---|
| Branco Mineral | `#F5F2EB` | 45% | base: fundos claros, respiro, capas minimalistas |
| Pedra Clara | `#D8D2C8` | 20% | neutro secundário: fundos de apoio, divisórias, contraste suave |
| Grafite Profundo | `#2F3130` | 20% | contraste e autoridade: textos, títulos, fundos escuros |
| Taupe Amadeirado | `#8A7666` | 10% | apoio quente: detalhes, blocos de apoio, fundos complementares |
| Lima Sofisticado | `#C7D94E` | 5% | destaque: filetes, ícones, palavras-chave, numeração, pontos de conexão |

- **Os neutros dominam; o lima só marca.** A marca deve parecer sofisticada, silenciosa, natural e contemporânea.
- **Evitar:** fundos grandes em lima, excesso de verde, lima com cara de neon, muitos destaques ao mesmo tempo,
  logo preto muito grande sobre foto premium.
- **Combinações:** branco mineral + texto grafite (institucional) · pedra + texto grafite (arquitetônico) ·
  grafite + texto branco mineral + detalhes lima (contraste premium) · taupe + texto branco mineral (acolhedor) ·
  branco + texto grafite + detalhe lima (assinatura).
- **Fórmulas:** imóvel premium = imagem protagonista, texto branco/grafite, lima só em filetes e pontos, logo
  em marca d'água ou branco sutil · conceitual = fundo grafite, texto branco, detalhes lima, linhas curvas e
  pontos de conexão · institucional = fundo branco/pedra, texto grafite, taupe de apoio, lima em acentos.
- **Logo sobre imagens de imóveis:** sutil — marca d'água, branco sobre vidro, textura tonal.

- **Tema** varia por vídeo: escuro (grafite) ou claro (branco mineral / pedra), conforme o assunto e as imagens.
- **Letras:** Manrope (texto) + Cormorant Garamond (destaques). Legíveis, nada enfeitado.
- Sem mascote. Movimentos suaves (`SUAVE` em `marca.ts`), nunca tremidos ou elásticos.

## Referências

- **Enes Yilmazer** (YouTube): transições com efeito visual e sonoro, movimentos de câmera pelas paisagens, as letras e a música.
- **Ali Abdaal**: tudo — animações ao redor da pessoa, textos, ritmo.
- **Johnny Harris**: pausas e trocas de música no meio do vídeo acompanhando a cena.
- Valem para o vertical e o horizontal.

## Entregas de cada vídeo

- **Só o Reels** (entrega padrão). Stories, feed, YouTube e carrossel apenas quando o Diogo pedir.
- **Capa:** o Diogo manda a foto/imagem; o Claude cria os textos por cima (`Capa`).
- **Legenda do post** e **mensagem da DM:** dependem do vídeo — **pergunte ao Diogo** a cada vídeo.

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
- 2026-10-15 — Quando o Diogo falar um nome errado, a legenda mantém o que ele disse e entra uma "nota do editor" (sobreposição `correcao`) corrigindo com leveza e um toque de humor. Ex.: "MindVision" → "Mind Movie". — (eixoz-01)
- 2026-10-15 — Vídeos da Eixoz: assinatura "pessoal" (sem logo da Aho) até a identidade da Eixoz ficar pronta. Podem ter mais animações sob medida. — (eixoz-01)
- 2026-10-15 — Entregar só o Reels: sem carrossel e sem versão para Stories, a não ser que ele peça. — (eixoz-01)
- 2026-10-15 — Legenda com uma linha só (sem a linha anterior esmaecida), um pouco maior (74 px). — (eixoz-01)
- 2026-10-15 — Mais palavras-chave flutuando ao redor dele, grandes e legíveis, fora do rosto. — (eixoz-01)
- 2026-10-15 — Animações mais criativas: objetos e textos que se constroem, viajam e se conectam. — (eixoz-01)
- 2026-10-15 — Nova paleta oficial (branco mineral, pedra clara, grafite, taupe, lima); lima só para marcar. — (eixoz-01)
- 2026-10-15 — Fluxo com agentes: pauteiro → roteirista → revisor (roteiro) → gravação → edição → revisor (vídeo) → entrega. Nada vai para gravação nem é entregue sem APROVADO do revisor. — (pedido do Diogo)
- 2026-10-15 — Vídeo pode passar de 90 s quando o Diogo fala sem pausas: manter inteiro, não cortar conteúdo sem ele pedir. — (eixoz-01)
