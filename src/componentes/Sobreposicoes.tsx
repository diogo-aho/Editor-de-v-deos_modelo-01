import * as Icones from "lucide-react";
import React from "react";
import { AbsoluteFill, Easing, interpolate, useVideoConfig } from "remotion";
import { cores, fontes, formatoDe, paleta, SUAVE, zonaSegura, type Clima, type Tema } from "../marca";
import type { Sobreposicao } from "../tipos";
import { useTempo } from "./Orador";

const suave = Easing.bezier(...SUAVE);
const entradaSaida = (t: number, inicio: number, fim: number, dur = 0.45) =>
  suave(Math.min(1, Math.max(0, (t - inicio) / dur))) * (1 - suave(Math.min(1, Math.max(0, (t - fim) / dur))));

// Palavra gigante que atravessa o quadro POR TRÁS do Diogo (a silhueta recortada é desenhada por cima).
export const PalavraAtras: React.FC<{
  item: Extract<Sobreposicao, { tipo: "palavraAtras" }>;
  tema: Tema;
  clima: Clima;
  inicioSeq: number;
}> = ({ item, inicioSeq }) => {
  const { width, height } = useVideoConfig();
  const t = useTempo() + inicioSeq;
  const vis = entradaSaida(t, item.inicio, item.fim, 0.5);
  if (vis <= 0) return null;
  const p = interpolate(t, [item.inicio, item.fim + 0.5], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  // cabe inteira na largura em algum momento do deslize
  const tamanho = Math.min(Math.min(width, height) * 0.27, (width * 1.75) / Math.max(4, item.texto.length));
  return (
    <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          top: height * (formatoDe(width, height) === "horizontal" ? 0.24 : 0.16),
          whiteSpace: "nowrap",
          fontFamily: fontes.destaque,
          fontStyle: "italic",
          fontWeight: 600,
          fontSize: tamanho,
          letterSpacing: "-0.01em",
          color: cores.brancoQuente,
          opacity: vis * 0.94,
          transform: `translateX(${(0.5 - p) * width * 0.22}px)`,
          textShadow: "0 10px 50px rgba(0,0,0,0.35)",
        }}
      >
        {item.texto}
      </div>
    </AbsoluteFill>
  );
};

// Cartão discreto com ícone, flutuando ao lado do Diogo.
const Destaque: React.FC<{ item: Extract<Sobreposicao, { tipo: "destaque" }>; tema: Tema; clima: Clima }> = ({ item }) => {
  const { width, height } = useVideoConfig();
  const t = useTempo();
  const vis = entradaSaida(t, item.inicio, item.fim);
  if (vis <= 0) return null;
  const z = zonaSegura(formatoDe(width, height));
  const Icone = (item.icone && (Icones as unknown as Record<string, React.FC<{ size: number; color: string; strokeWidth: number }>>)[item.icone]) || null;
  const flutua = Math.sin((t - item.inicio) * 1.6) * 8;
  const base = Math.min(width, height);
  const esquerda = item.lado !== "direita";
  // vertical/feed: o rosto ocupa o centro e as laterais são estreitas -> cartão centralizado no peito
  const lateral = formatoDe(width, height) === "horizontal";
  return (
    <div
      style={{
        position: "absolute",
        top: height * (lateral ? 0.24 : 0.47) + flutua,
        ...(lateral
          ? esquerda
            ? { left: z.esquerda + base * 0.02 }
            : { right: z.direita + base * 0.02 }
          : { left: "50%", marginLeft: 0, translate: "-50% 0" }),
        display: "flex",
        alignItems: "center",
        gap: base * 0.026,
        padding: `${base * 0.028}px ${base * 0.04}px`,
        borderRadius: base * 0.03,
        background: "rgba(30, 28, 26, 0.42)",
        border: "1px solid rgba(244, 239, 231, 0.22)",
        backdropFilter: "blur(14px)",
        opacity: vis,
        transform: `translateY(${(1 - vis) * 24}px) scale(${0.96 + 0.04 * vis})`,
        boxShadow: "0 18px 50px rgba(0,0,0,0.25)",
        whiteSpace: "nowrap",
      }}
    >
      {Icone && <Icone size={base * 0.058} color={cores.areia} strokeWidth={1.5} />}
      <span style={{ fontFamily: fontes.texto, fontWeight: 600, fontSize: base * 0.042, color: cores.brancoQuente, letterSpacing: "-0.01em" }}>
        {item.texto}
      </span>
    </div>
  );
};

// Número que conta até o valor. SÓ com números ditos ou enviados pelo Diogo.
const Numero: React.FC<{ item: Extract<Sobreposicao, { tipo: "numero" }>; tema: Tema; clima: Clima }> = ({ item, tema, clima }) => {
  const { width, height } = useVideoConfig();
  const t = useTempo();
  const vis = entradaSaida(t, item.inicio, item.fim);
  if (vis <= 0) return null;
  const c = paleta(tema, clima);
  const conta = suave(Math.min(1, Math.max(0, (t - item.inicio) / 1.1)));
  const valor = Math.round(item.valor * conta).toLocaleString("pt-BR");
  const base = Math.min(width, height);
  return (
    <AbsoluteFill style={{ alignItems: "center", pointerEvents: "none" }}>
      <div style={{ position: "absolute", top: height * 0.26, textAlign: "center", opacity: vis, transform: `translateY(${(1 - vis) * 20}px)` }}>
        <div style={{ fontFamily: fontes.destaque, fontWeight: 600, fontSize: base * 0.2, color: cores.brancoQuente, lineHeight: 1, textShadow: "0 8px 40px rgba(0,0,0,0.4)" }}>
          {item.prefixo}
          {valor}
          {item.sufixo}
        </div>
        {item.rotulo && (
          <div style={{ fontFamily: fontes.texto, fontWeight: 600, fontSize: base * 0.028, letterSpacing: "0.3em", textTransform: "uppercase", color: c.detalhe === cores.madeira ? cores.areia : c.detalhe, marginTop: base * 0.02 }}>
            {item.rotulo}
          </div>
        )}
      </div>
    </AbsoluteFill>
  );
};

// Sobreposições que ficam por cima de tudo (as "palavraAtras" são desenhadas dentro da cena de rosto).
export const Sobreposicoes: React.FC<{ itens: Sobreposicao[]; tema: Tema; clima: Clima }> = ({ itens, tema, clima }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    {itens.map((item, i) =>
      item.tipo === "destaque" ? (
        <Destaque key={i} item={item} tema={tema} clima={clima} />
      ) : item.tipo === "numero" ? (
        <Numero key={i} item={item} tema={tema} clima={clima} />
      ) : null,
    )}
  </AbsoluteFill>
);
