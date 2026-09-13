"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { chaosState } from "@/lib/chaos";

export function ParticleField({ count = 1400 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);
  const { size, viewport } = useThree();

  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    const phases = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * viewport.width * 2.4;
      positions[i * 3 + 1] = (Math.random() - 0.5) * viewport.height * 2.4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 9;
      speeds[i] = 0.15 + Math.random() * 0.6;
      phases[i] = Math.random() * Math.PI * 2;
    }
    return { positions, speeds, phases };
  }, [count, viewport.width, viewport.height]);

  const base = useMemo(() => positions.slice(), [positions]);

  useFrame((state) => {
    if (!points.current) return;
    const t = state.clock.elapsedTime;
    const arr = points.current.geometry.attributes.position
      .array as Float32Array;

    chaosState.pointer.x +=
      (chaosState.pointerTarget.x - chaosState.pointer.x) * 0.05;
    chaosState.pointer.y +=
      (chaosState.pointerTarget.y - chaosState.pointer.y) * 0.05;

    const reduced = chaosState.reducedMotion;
    const energy = chaosState.energy;
    const px = chaosState.pointer.x * viewport.width * 0.5;
    const py = chaosState.pointer.y * viewport.height * 0.5;

    for (let i = 0; i < count; i++) {
      const ix = i * 3;
      const bx = base[ix];
      const by = base[ix + 1];
      const bz = base[ix + 2];

      if (reduced) {
        arr[ix] = bx;
        arr[ix + 1] = by;
        arr[ix + 2] = bz;
        continue;
      }

      const dx = bx + Math.sin(t * speeds[i] + phases[i]) * 0.25 - px;
      const dy = by + Math.cos(t * speeds[i] * 0.8 + phases[i]) * 0.25 - py;
      const dist2 = dx * dx + dy * dy;
      const push = Math.min(1.6 / (dist2 + 0.4), 1.4);

      arr[ix] = bx + dx * push * 0.35 + Math.sin(t * 0.3 + phases[i]) * 0.08;
      arr[ix + 1] =
        by + dy * push * 0.35 + Math.cos(t * 0.25 + phases[i]) * 0.08;
      arr[ix + 2] = bz + Math.sin(t * 0.5 + phases[i]) * (0.3 + energy);
    }

    points.current.geometry.attributes.position.needsUpdate = true;
    points.current.rotation.z = t * 0.012;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.028}
        color="#38e8ff"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
