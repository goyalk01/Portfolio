import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";

function createSeededRandom(seed: number): () => number {
  let state = seed;

  return () => {
    state = (state * 1664525 + 1013904223) % 4294967296;
    return state / 4294967296;
  };
}

const rand = createSeededRandom(42);

export default function Particles({ count = 2000 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null);

  const { positions, sizes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      // Spread stars in a large sphere
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      const r = 8 + rand() * 25;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      // Varied star sizes for depth
      sz[i] = 0.015 + rand() * 0.06;
    }
    return { positions: pos, sizes: sz };
  }, [count]);

  // Store random twinkle offsets
  const twinkleOffsets = useMemo(() => {
    const offsets = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      offsets[i] = rand() * Math.PI * 2;
    }
    return offsets;
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    // Slow rotation for gentle drift
    meshRef.current.rotation.y = state.clock.elapsedTime * 0.008;
    meshRef.current.rotation.x = state.clock.elapsedTime * 0.004;

    // Twinkle effect: modulate sizes
    const geo = meshRef.current.geometry;
    const sizeAttr = geo.getAttribute("size") as THREE.BufferAttribute;
    if (sizeAttr) {
      const t = state.clock.elapsedTime;
      for (let i = 0; i < count; i++) {
        const base = sizes[i];
        const twinkle = 0.6 + 0.4 * Math.sin(t * (1.5 + (i % 5) * 0.3) + twinkleOffsets[i]);
        sizeAttr.array[i] = base * twinkle;
      }
      sizeAttr.needsUpdate = true;
    }
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#ffffff"
        transparent
        opacity={0.9}
        sizeAttenuation
      />
    </points>
  );
}
