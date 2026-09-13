"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { chaosState } from "@/lib/chaos";

const MAX = 60;

export function CursorTrail() {
  const points = useRef<THREE.Points>(null);
  const history = useRef<THREE.Vector3[]>([]);
  const life = useRef<number[]>([]);

  const { positions, alphas } = useMemo(
    () => ({
      positions: new Float32Array(MAX * 3),
      alphas: new Float32Array(MAX),
    }),
    []
  );

  useFrame((state) => {
    if (!points.current || chaosState.reducedMotion) return;
    const { viewport } = state;
    const x = chaosState.pointer.x * viewport.width * 0.5;
    const y = chaosState.pointer.y * viewport.height * 0.5;

    history.current.unshift(new THREE.Vector3(x, y, 0.5));
    life.current.unshift(1);
    if (history.current.length > MAX) {
      history.current.pop();
      life.current.pop();
    }

    for (let i = 0; i < MAX; i++) {
      const v = history.current[i];
      positions[i * 3] = v ? v.x : 9999;
      positions[i * 3 + 1] = v ? v.y : 9999;
      positions[i * 3 + 2] = v ? v.z : 9999;
      life.current[i] = Math.max(0, (life.current[i] ?? 0) - 0.02);
      alphas[i] = life.current[i] ?? 0;
    }
    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={MAX}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        color="#ff4fd8"
        transparent
        opacity={0.7}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
