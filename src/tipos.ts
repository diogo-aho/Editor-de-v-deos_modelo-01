import type { Clima, Tema } from "./marca";

// Todos os tempos em segundos, na linha do tempo JÁ CORTADA (saída de scripts/preparar.py).

export type Palavra = {
  palavra: string;
  inicio: number;
  fim: number;
  destaque?: boolean; // aparece em letra serifada, um pouco mais brilhante
};

// Como o Diogo aparece: vídeo gravado ou, sem vídeo, uma foto com movimento lento.
export type Orador = {
  video?: string; // projetos/<nome>/fala.mp4
  frente?: string; // projetos/<nome>/frente.webm (recorte, para animações passarem atrás)
  foto?: string; // diogo/fotos/foto-3.jpg
  fotoFrente?: string; // diogo/fotos/foto-3-recorte.png
  foco?: string; // CSS object-position do rosto, ex. "50% 30%"
};

// Aproxima no rosto em "em" e volta em "ate" (padrão: 2,5 s depois). Escala típica: 1.12 a 1.2.
export type Zoom = { em: number; escala: number; ate?: number };

export type Cena =
  | { tipo: "rosto"; inicio: number; fim: number; orador?: Orador; zooms?: Zoom[] }
  | {
      tipo: "dividida";
      inicio: number;
      fim: number;
      midia?: string; // imagem ou vídeo do imóvel/projeto
      animacao?: string; // nome em src/animacoes
      palavras?: string[]; // textos usados pela animação (só o que o Diogo disse)
      orador?: Orador;
    }
  | { tipo: "telaCheia"; inicio: number; fim: number; midia?: string; animacao?: string; palavras?: string[]; titulo?: string }
  | { tipo: "textoGrande"; inicio: number; fim: number; texto: string; rotulo?: string };

export type Sobreposicao =
  | { tipo: "palavraAtras"; inicio: number; fim: number; texto: string }
  | { tipo: "destaque"; inicio: number; fim: number; texto: string; icone?: string; lado?: "esquerda" | "direita" }
  // Só com números que o Diogo disse ou enviou. Nunca inventar.
  | { tipo: "numero"; inicio: number; fim: number; valor: number; prefixo?: string; sufixo?: string; rotulo?: string };

export type Musica = { arquivo: string; inicio: number; fim: number; volume?: number };
export type Efeito = { arquivo: string; em: number; volume?: number };

export type Roteiro = {
  titulo: string;
  tema: Tema;
  clima: Clima;
  fala: string; // áudio da fala já tratado (fala.wav ou fala.mp4)
  duracao: number; // da fala cortada
  orador: Orador;
  palavras: Palavra[];
  cenas: Cena[];
  sobreposicoes: Sobreposicao[];
  musicas: Musica[];
  efeitos: Efeito[];
  encerramento: boolean;
  stories?: { inicio: number; fim: number }; // trecho da versão curta
  capa?: { foto: string; titulo: string; subtitulo?: string; foco?: string };
  carrossel?: { titulo: string; texto?: string }[];
};
