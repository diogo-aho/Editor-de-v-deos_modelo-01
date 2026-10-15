// Identidade visual do Diogo Carvalho (@diogo.aho) — Aho Imóveis.
// Luxo silencioso: valor, autoridade e confiança. Nada chamativo.

// Paleta oficial (revisada em 2026-10-15). Proporção: 45% branco mineral, 20% pedra clara,
// 20% grafite profundo, 10% taupe amadeirado, 5% lima sofisticado.
// Os neutros dominam; o LIMA só marca: filetes, ícones, palavras-chave, numeração, pontos de conexão.
// Evitar: fundos grandes em lima, excesso de verde, lima com cara de neon, muitos destaques juntos.
export const cores = {
  brancoMineral: "#F5F2EB", // base: leveza, respiro, luz
  pedraClara: "#D8D2C8", // neutro secundário: materialidade, arquitetura
  grafite: "#2F3130", // contraste e autoridade: textos, fundos escuros
  taupe: "#8A7666", // apoio quente: acolhimento, interiores, textura
  lima: "#C7D94E", // destaque: só para marcar
} as const;

// rgba das cores, para brilhos e transparências
export const rgba = {
  brancoMineral: (a: number) => `rgba(245, 242, 235, ${a})`,
  pedraClara: (a: number) => `rgba(216, 210, 200, ${a})`,
  grafite: (a: number) => `rgba(47, 49, 48, ${a})`,
  taupe: (a: number) => `rgba(138, 118, 102, ${a})`,
  lima: (a: number) => `rgba(199, 217, 78, ${a})`,
};

export type Tema = "escuro" | "claro";
// quente = taupe como apoio; neutro = pedra/grafite puros
export type Clima = "quente" | "neutro";

// Combinações aprovadas de fundo e texto:
//  escuro: fundo grafite + texto branco mineral + detalhes lima (contraste premium)
//  claro neutro: fundo branco mineral + texto grafite + detalhe lima
//  claro quente: fundo pedra clara + texto grafite + taupe de apoio
export const paleta = (tema: Tema, clima: Clima) => {
  if (tema === "escuro") {
    return {
      fundo: cores.grafite,
      brilho: clima === "quente" ? rgba.taupe(0.35) : rgba.pedraClara(0.12),
      texto: cores.brancoMineral,
      textoSuave: cores.pedraClara,
      apoio: cores.taupe,
      detalhe: cores.lima,
      cartao: rgba.brancoMineral(0.08),
    };
  }
  return {
    fundo: clima === "quente" ? cores.pedraClara : cores.brancoMineral,
    brilho: clima === "quente" ? rgba.brancoMineral(0.5) : rgba.pedraClara(0.6),
    texto: cores.grafite,
    textoSuave: cores.taupe,
    apoio: cores.taupe,
    detalhe: cores.lima,
    cartao: rgba.grafite(0.06),
  };
};

export const fontes = {
  texto: "Manrope",
  destaque: "Cormorant Garamond",
};

// Movimento: suave e elegante. Nunca tremido, nunca elástico.
export const SUAVE = [0.33, 0, 0.15, 1] as const; // Easing.bezier

export type Formato = "vertical" | "horizontal" | "feed";

export const formatoDe = (largura: number, altura: number): Formato =>
  largura > altura ? "horizontal" : altura / largura > 1.5 ? "vertical" : "feed";

// Áreas onde as redes colocam botões, nome e legenda do post.
// Nada importante pode ficar aí. Valores em pixels do quadro final.
export const zonaSegura = (formato: Formato) => {
  switch (formato) {
    case "vertical": // Reels / TikTok / Shorts / Stories (1080x1920)
      return { topo: 230, base: 420, esquerda: 70, direita: 150 };
    case "feed": // 1080x1350
      return { topo: 70, base: 110, esquerda: 70, direita: 70 };
    case "horizontal": // YouTube (1920x1080): barra de progresso e botões embaixo
      return { topo: 60, base: 140, esquerda: 90, direita: 90 };
  }
};

export const ARROBA = "@diogo.aho";
export const NOME = "Diogo Carvalho";
