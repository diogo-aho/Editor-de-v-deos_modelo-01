import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { ThreeCanvas } from "@remotion/three";
import { Video } from "lucide-react";
import { siYoutube } from "simple-icons";

// Composição de verificação: texto animado, cubo 3D, ícone Lucide e logo Simple Icons.
export const Teste: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ backgroundColor: "#111", alignItems: "center", justifyContent: "center" }}>
      <ThreeCanvas width={1080} height={1080} style={{ position: "absolute", top: 0 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[2, 2, 2]} />
        <mesh rotation={[frame * 0.05, frame * 0.05, 0]}>
          <boxGeometry args={[2, 2, 2]} />
          <meshStandardMaterial color="#4f8cff" />
        </mesh>
      </ThreeCanvas>
      <div style={{ opacity, color: "white", fontSize: 90, fontFamily: "sans-serif", marginTop: 900, display: "flex", gap: 30, alignItems: "center" }}>
        <Video size={100} color="white" />
        Tudo pronto
        <svg width={100} height={100} viewBox="0 0 24 24" fill={`#${siYoutube.hex}`}>
          <path d={siYoutube.path} />
        </svg>
      </div>
    </AbsoluteFill>
  );
};
