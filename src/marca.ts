// Identidade visual do Diogo Carvalho (@diogo.aho) — Aho Imóveis.
// Luxo silencioso: valor, autoridade e confiança. Nada chamativo.

export const cores = {
  cafe: "#2B211B",
  grafite: "#2E2F31",
  chumbo: "#5E6063",
  oliva: "#5B5A3F",
  madeira: "#A7744A",
  cinzaClaro: "#C8C8C5",
  areia: "#D9C8B0",
  nevoa: "#ECECEA",
  brancoQuente: "#F4EFE7",
} as const;

export type Tema = "escuro" | "claro";
export type Clima = "quente" | "neutro";

// Combinações de fundo/texto/detalhe para cada tema e clima.
export const paleta = (tema: Tema, clima: Clima) => {
  if (tema === "escuro") {
    return {
      fundo: clima === "quente" ? cores.cafe : cores.grafite,
      texto: cores.brancoQuente,
      textoSuave: clima === "quente" ? cores.areia : cores.cinzaClaro,
      detalhe: cores.madeira,
      cartao: "rgba(244, 239, 231, 0.10)",
    };
  }
  return {
    fundo: clima === "quente" ? cores.areia : cores.nevoa,
    texto: clima === "quente" ? cores.cafe : cores.grafite,
    textoSuave: clima === "quente" ? cores.oliva : cores.chumbo,
    detalhe: clima === "quente" ? cores.madeira : cores.oliva,
    cartao: "rgba(43, 33, 27, 0.08)",
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
