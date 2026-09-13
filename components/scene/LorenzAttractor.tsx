"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { chaosState, scrollWindow } from "@/lib/chaos";

const SIGMA = 10;
const RHO = 28;
const BETA = 8 / 3;

function integrate(steps: number, dt: number, init: [number, number, number], scale: number) {
  const arr: number[] = [];
  let [x, y, z] = init;
  for (let i = 0; i < 400; i++) {
    const dx = SIGMA * (y - x);
    const dy = x * (RHO - z) - y;
    const dz = x * y - BETA * z;
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;
  }
  for (let i = 0; i < steps; i++) {
    const dx = SIGMA * (y - x);
    const dy = x * (RHO - z) - y;
    const dz = x * y - BETA * z;
    x += dx * dt;
    y += dy * dt;
    z += dz * dt;
    arr.push(x * scale, (z - 27) * scale, y * scale);
  }
  return new Float32Array(arr);
}

export function LorenzAttractor({
  scale = 0.16,
  steps = 2600,
}: {
  scale?: number;
  steps?: number;
}) {
  const group = useRef<THREE.Group>(null);

  const { main, ghost } = useMemo(() => {
    const makeLine = (positions: Float32Array, color: string, opacity: number) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const m = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.Line(g, m);
    };

    return {
      main: makeLine(
        integrate(steps, 0.0065, [0.1, 0, 0], scale),
        "#38e8ff",
        0.6
      ),
      ghost: makeLine(
        integrate(steps, 0.0065, [0.1001, 0, 0], scale),
        "#ff4fd8",
        0.1
      ),
    };
  }, [steps, scale]);

  useFrame((state, delta) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    const reduced = chaosState.reducedMotion;
    const visible = scrollWindow(chaosState.scroll, -0.05, 0.34, 0.09);

    const px = chaosState.pointer.x;
    const py = chaosState.pointer.y;

    if (chaosState.butterflyPulse > 0) {
      chaosState.butterflyPulse = Math.max(
        0,
        chaosState.butterflyPulse - delta * 0.35
      );
    }
    const pulse = chaosState.butterflyPulse;

    group.current.visible = visible > 0.01;

    if (!reduced) {
      group.current.rotation.y = t * 0.12 + px * 0.5;
      group.current.rotation.x = Math.sin(t * 0.08) * 0.12 + py * 0.35;
      group.current.position.x = px * 1.1;
      group.current.position.y = py * 0.7 - (1 - visible) * 2.5;
      group.current.scale.setScalar(
        (1 + pulse * 0.12 + chaosState.energy * 0.05) * (0.6 + visible * 0.4)
      );
    }

    (main.material as THREE.LineBasicMaterial).opacity = 0.6 * visible;
    (ghost.material as THREE.LineBasicMaterial).opacity =
      (0.1 + pulse * 0.5 + chaosState.entropy * 0.15) * visible;
  });

  return (
    <group ref={group}>
      <primitive object={main} />
      <primitive object={ghost} />
    </group>
  );
}
