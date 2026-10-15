import { BookOpen, Ear, Flower2, Mic, Music, Play } from "lucide-react";
import React from "react";
import { AbsoluteFill, Easing, interpolate, useCurrentFrame } from "remotion";
import { useArea } from "./area";
import { cores, fontes, paleta, SUAVE } from "../marca";
import type { PropsAnimacao } from "./index";

// Animações do vídeo "Grafirmaliza / portas sensoriais" (Eixoz).
// Todos os textos são palavras ditas pelo Diogo.

const suave = Easing.bezier(...SUAVE);
const prog = (t: number, ini: number, dur: number) => suave(Math.min(1, Math.max(0, (t - ini) / dur)));

const useT = (t0 = 0) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useArea();
  return { t: frame / fps + t0, width, height, base: Math.min(width, height) };
};

const Fundo: React.FC<{ cor: string; brilho: string }> = ({ cor, brilho }) => (
  <AbsoluteFill style={{ background: `radial-gradient(ellipse at 50% 42%, ${brilho} 0%, ${cor} 70%)` }} />
);

// ── Grafirmaliza: GRAtidão + aFIRMAção + visuaLIZAção ─────────────────────────────
// tempos: [nome, gratidão, afirmação, visualização]
const PARTES = [
  { antes: "", silaba: "Gra", depois: "tidão" },
  { antes: "A", silaba: "firma", depois: "ção" },
  { antes: "Visua", silaba: "liza", depois: "ção" },
];

export const Grafirmaliza: React.FC<PropsAnimacao> = ({ tema, clima, tempos = [0, 1, 2, 3], t0 }) => {
  const { t, base } = useT(t0);
  const c = paleta(tema, clima);
  const [tNome, ...tPartes] = tempos;
  const nome = prog(t, tNome - 0.15, 0.7);
  const sobe = prog(t, tPartes[0] - 0.1, 0.6);
  const acesa = (i: number) => prog(t, tPartes[i], 0.35);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Fundo cor={c.fundo} brilho="rgba(167,116,74,0.16)" />
      <div style={{ position: "relative", textAlign: "center", transform: `translateY(${-sobe * base * 0.32}px)` }}>
        <div style={{ fontFamily: fontes.texto, fontWeight: 600, fontSize: base * 0.03, letterSpacing: "0.4em", color: c.detalhe, opacity: nome, marginBottom: base * 0.03 }}>
          RITUAL DIÁRIO
        </div>
        <div style={{ fontFamily: fontes.destaque, fontWeight: 600, fontSize: base * 0.135, color: c.texto, letterSpacing: "0.01em", opacity: nome, filter: `blur(${(1 - nome) * 10}px)` }}>
          {PARTES.map((p, i) => (
            <span key={i} style={{ color: acesa(i) > 0.5 ? cores.madeira : c.texto, transition: "none" }}>
              {i === 0 ? "Gra" : p.silaba}
            </span>
          ))}
        </div>
      </div>
      <div style={{ position: "absolute", top: "42%", display: "flex", flexDirection: "column", gap: base * 0.035, alignItems: "center" }}>
        {PARTES.map((p, i) => {
          const v = acesa(i);
          return (
            <div
              key={i}
              style={{
                fontFamily: fontes.texto,
                fontWeight: 500,
                fontSize: base * 0.072,
                color: c.textoSuave,
                opacity: v,
                transform: `translateY(${(1 - v) * 30}px)`,
                letterSpacing: "-0.01em",
              }}
            >
              {p.antes}
              <span style={{ fontFamily: fontes.destaque, fontStyle: "italic", fontWeight: 700, fontSize: base * 0.085, color: cores.madeira }}>{p.silaba}</span>
              {p.depois}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// ── O filme da visualização: tela de cinema, play, música e as palavras afirmadas ──
// tempos: [filme, música, palavras]; palavras: o que aparece na tela
export const Filme: React.FC<PropsAnimacao> = ({ tema, clima, tempos = [0, 2, 4], palavras = [], t0 }) => {
  const { t, width, height, base } = useT(t0);
  const c = paleta(tema, clima);
  const [tFilme, tMusica, tPalavras] = tempos;
  const tela = prog(t, (t0 ?? 0) + 0.1, 0.8);
  const play = prog(t, tFilme, 0.5) * (1 - prog(t, tMusica - 0.4, 0.4));
  const musica = prog(t, tMusica, 0.6);
  const larg = width * 0.84;
  const alt = larg * 0.5625;
  const cadaPalavra = 1.15;
  const atual = Math.floor((t - tPalavras) / cadaPalavra);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center", paddingBottom: height * 0.28 }}>
      <Fundo cor={c.fundo} brilho="rgba(217,200,176,0.10)" />
      {/* luz do projetor */}
      <div style={{ position: "absolute", width: larg * 1.4, height: alt * 1.6, background: "radial-gradient(ellipse at 50% 50%, rgba(244,239,231,0.10), transparent 65%)", opacity: tela }} />
      <div
        style={{
          width: larg,
          height: alt,
          borderRadius: base * 0.02,
          border: `1.5px solid rgba(217,200,176,${0.5 * tela})`,
          background: "linear-gradient(160deg, #3a2d24 0%, #1f1813 100%)",
          boxShadow: "0 30px 80px rgba(0,0,0,0.45)",
          transform: `scale(${0.92 + 0.08 * tela})`,
          opacity: tela,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ position: "absolute", opacity: play, transform: `scale(${0.8 + 0.2 * play})` }}>
          <div style={{ width: base * 0.16, height: base * 0.16, borderRadius: "50%", border: `2px solid ${cores.areia}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Play size={base * 0.07} color={cores.areia} strokeWidth={1.5} style={{ marginLeft: base * 0.01 }} />
          </div>
        </div>
        {palavras.map((p, i) => {
          const v = prog(t, tPalavras + i * cadaPalavra, 0.35) * (i === palavras.length - 1 ? 1 : 1 - prog(t, tPalavras + (i + 1) * cadaPalavra - 0.2, 0.3));
          if (v <= 0) return null;
          return (
            <div key={i} style={{ position: "absolute", fontFamily: fontes.destaque, fontStyle: "italic", fontWeight: 600, fontSize: base * 0.1, color: cores.brancoQuente, opacity: v, transform: `translateY(${(1 - v) * 14}px)`, filter: `blur(${(1 - v) * 6}px)` }}>
              {p}
            </div>
          );
        })}
        {/* barra de progresso do filme */}
        <div style={{ position: "absolute", left: "6%", right: "6%", bottom: "8%", height: 2, background: "rgba(244,239,231,0.15)" }}>
          <div style={{ width: `${interpolate(t, [tFilme, tFilme + 10], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`, height: "100%", background: cores.madeira }} />
        </div>
      </div>
      {/* música: ondas suaves e notas subindo */}
      <div style={{ position: "absolute", top: height * 0.36 + alt / 2 + base * 0.04, display: "flex", gap: base * 0.012, alignItems: "flex-end", height: base * 0.08, opacity: musica }}>
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} style={{ width: base * 0.008, borderRadius: 9, background: i % 5 === 2 ? cores.madeira : cores.areia, height: base * 0.08 * (0.25 + 0.75 * Math.abs(Math.sin(t * 3.1 + i * 0.6) * Math.cos(t * 1.3 + i * 0.25))) }} />
        ))}
      </div>
      {[0, 1, 2].map((i) => {
        const ciclo = ((t - tMusica + i * 0.9) % 2.7) / 2.7;
        if (t < tMusica) return null;
        return (
          <Music
            key={i}
            size={base * 0.05}
            color={cores.areia}
            strokeWidth={1.4}
            style={{ position: "absolute", left: width * (0.2 + i * 0.28), top: height * 0.36 - alt / 2 - base * 0.05 - ciclo * base * 0.18, opacity: musica * Math.sin(ciclo * Math.PI) * 0.8 }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

// ── Portas sensoriais: cada sentido acende quando o Diogo fala dele ────────────────
// tempos: [ler, falar, ouvir, música, cheiro] (use um número grande para "ainda não");
// palavras[0] opcional: momento do brilho forte no centro não é texto — use tempos[5]
const PORTAS = [
  { nome: "Ler", Icone: BookOpen },
  { nome: "Falar", Icone: Mic },
  { nome: "Ouvir", Icone: Ear },
  { nome: "Música", Icone: Music },
  { nome: "Cheiro", Icone: Flower2 },
];

export const PortasSensoriais: React.FC<PropsAnimacao> = ({ tema, clima, tempos = [], t0 = 0 }) => {
  const { t, width, height, base } = useT(t0);
  const c = paleta(tema, clima);
  const cx = width / 2;
  const cy = height * 0.45;
  const raio = Math.min(width, height) * 0.31;
  const ativas = PORTAS.map((_, i) => prog(t, tempos[i] ?? 1e9, 0.5));
  const brilhoCentro = Math.max(prog(t, tempos[5] ?? 1e9, 0.8), ativas.reduce((a, b) => a + b, 0) / 5);
  const pulso = 1 + 0.03 * Math.sin(t * 2.4) * brilhoCentro;

  return (
    <AbsoluteFill>
      <Fundo cor={c.fundo} brilho={`rgba(167,116,74,${0.08 + 0.18 * brilhoCentro})`} />
      <svg width={width} height={height} style={{ position: "absolute" }}>
        {PORTAS.map((_, i) => {
          const ang = -Math.PI / 2 + (i * 2 * Math.PI) / PORTAS.length;
          const x = cx + Math.cos(ang) * raio;
          const y = cy + Math.sin(ang) * raio;
          const surge = prog(t, t0 + 0.1 + i * 0.12, 0.6);
          const comp = ativas[i];
          return (
            <g key={i}>
              <line x1={cx} y1={cy} x2={x} y2={y} stroke={cores.areia} strokeOpacity={0.12 * surge} strokeWidth={1.5} />
              <line x1={x} y1={y} x2={x + (cx - x) * comp} y2={y + (cy - y) * comp} stroke={cores.madeira} strokeOpacity={0.9} strokeWidth={2.5} />
            </g>
          );
        })}
      </svg>
      {/* centro: subconsciente */}
      <div style={{ position: "absolute", left: cx, top: cy, transform: `translate(-50%, -50%) scale(${pulso})`, width: raio * 0.95, height: raio * 0.95, borderRadius: "50%", border: `1.5px solid rgba(217,200,176,${0.3 + 0.5 * brilhoCentro})`, background: `radial-gradient(circle, rgba(167,116,74,${0.15 + 0.35 * brilhoCentro}) 0%, rgba(43,33,27,0.9) 75%)`, boxShadow: `0 0 ${60 * brilhoCentro}px rgba(167,116,74,${0.5 * brilhoCentro})`, display: "flex", alignItems: "center", justifyContent: "center", opacity: prog(t, t0, 0.6) }}>
        <div style={{ fontFamily: fontes.destaque, fontStyle: "italic", fontWeight: 600, fontSize: base * 0.06, color: cores.brancoQuente }}>Subconsciente</div>
      </div>
      {PORTAS.map(({ nome, Icone }, i) => {
        const ang = -Math.PI / 2 + (i * 2 * Math.PI) / PORTAS.length;
        const x = cx + Math.cos(ang) * raio;
        const y = cy + Math.sin(ang) * raio;
        const surge = prog(t, t0 + 0.1 + i * 0.12, 0.6);
        const a = ativas[i];
        const tam = base * 0.15;
        return (
          <div key={nome} style={{ position: "absolute", left: x, top: y, transform: `translate(-50%, -50%) scale(${(0.85 + 0.15 * surge) * (1 + 0.08 * a)})`, opacity: surge * (0.45 + 0.55 * a), display: "flex", flexDirection: "column", alignItems: "center", gap: base * 0.012 }}>
            <div style={{ width: tam, height: tam, borderRadius: "50%", border: `1.5px solid ${a > 0.5 ? cores.madeira : "rgba(217,200,176,0.5)"}`, background: `rgba(167,116,74,${0.32 * a})`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: `0 0 ${36 * a}px rgba(167,116,74,${0.55 * a})` }}>
              <Icone size={tam * 0.42} color={a > 0.5 ? cores.brancoQuente : cores.areia} strokeWidth={1.4} />
            </div>
            <div style={{ fontFamily: fontes.texto, fontWeight: 600, fontSize: base * 0.03, letterSpacing: "0.12em", textTransform: "uppercase", color: a > 0.5 ? cores.brancoQuente : cores.areia }}>{nome}</div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

// ── Disco de vinil: a música que gravou um momento ───────────────────────────────
// tempos: [texto aparece]; palavras[0]: texto (frase dita pelo Diogo)
export const Vinil: React.FC<PropsAnimacao> = ({ tema, clima, tempos = [1], palavras = [], t0 = 0 }) => {
  const { t, width, height, base } = useT(t0);
  const c = paleta(tema, clima);
  const surge = prog(t, t0 + 0.1, 0.8);
  const giro = (t - t0) * 50;
  const d = Math.min(width, height) * 0.62;
  const texto = prog(t, tempos[0], 0.6);
  const braco = interpolate(surge, [0, 1], [-28, -6]);

  return (
    <AbsoluteFill style={{ alignItems: "center", justifyContent: "center" }}>
      <Fundo cor={c.fundo} brilho="rgba(217,200,176,0.10)" />
      <div style={{ position: "relative", width: d, height: d, opacity: surge, transform: `translateY(${height * 0.04}px) scale(${0.82 + 0.08 * surge})` }}>
        <div style={{ position: "absolute", inset: 0, borderRadius: "50%", transform: `rotate(${giro}deg)`, background: `repeating-radial-gradient(circle, #1b1511 0px, #1b1511 3px, #2a211b 4px, #1b1511 6px)`, boxShadow: "0 30px 70px rgba(0,0,0,0.55)" }}>
          <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "conic-gradient(from 0deg, transparent 0deg, rgba(244,239,231,0.10) 30deg, transparent 60deg, transparent 180deg, rgba(244,239,231,0.08) 210deg, transparent 240deg)" }} />
          <div style={{ position: "absolute", left: "50%", top: "50%", width: d * 0.34, height: d * 0.34, transform: "translate(-50%,-50%)", borderRadius: "50%", background: `radial-gradient(circle, ${cores.areia} 0%, ${cores.madeira} 80%)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <div style={{ width: d * 0.03, height: d * 0.03, borderRadius: "50%", background: "#1b1511" }} />
          </div>
        </div>
        {/* braço da agulha */}
        <div style={{ position: "absolute", right: -d * 0.06, top: -d * 0.04, width: d * 0.05, height: d * 0.62, transformOrigin: "50% 4%", transform: `rotate(${braco}deg)` }}>
          <div style={{ width: d * 0.05, height: d * 0.05, borderRadius: "50%", background: cores.cinzaClaro }} />
          <div style={{ width: 4, height: d * 0.52, margin: "0 auto", background: cores.cinzaClaro }} />
          <div style={{ width: d * 0.045, height: d * 0.07, margin: "0 auto", background: cores.chumbo, borderRadius: 4 }} />
        </div>
      </div>
      {palavras[0] && (
        <div style={{ position: "absolute", top: height * 0.08, left: "8%", right: "8%", textAlign: "center", fontFamily: fontes.destaque, fontStyle: "italic", fontWeight: 600, fontSize: base * 0.06, color: c.texto, opacity: texto, transform: `translateY(${(1 - texto) * 16}px)` }}>
          {palavras[0]}
        </div>
      )}
    </AbsoluteFill>
  );
};
