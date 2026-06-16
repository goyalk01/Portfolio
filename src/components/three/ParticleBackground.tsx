import { Canvas } from "@react-three/fiber";
import Particles from "./Particles";

export default function ParticleBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.05} />
        <pointLight position={[10, 10, 10]} color="#ffffff" intensity={0.3} />
        <Particles />
      </Canvas>
    </div>
  );
}
