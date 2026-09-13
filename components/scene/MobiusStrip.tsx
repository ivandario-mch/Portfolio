"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { chaosState, scrollWindow } from "@/lib/chaos";

export function MobiusStrip() {
  const mesh = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const uSegments = 180;
    const vSegments = 24;
    const geo = new THREE.BufferGeometry();
    const positions: number[] = [];
    const indices: number[] = [];
    const uvs: number[] = [];

    for (let i = 0; i <= uSegments; i++) {
      const u = (i / uSegments) * Math.PI * 2;
      for (let j = 0; j <= vSegments; j++) {
        const v = (j / vSegments - 0.5) * 0.9;
        const x =
          (1 + (v * Math.cos(u)) / 2) * Math.cos(u * 1.0) * 2.2;
        const y = (1 + (v * Math.cos(u)) / 2) * Math.sin(u * 1.0) * 2.2;
        const z = (v * Math.sin(u)) / 2 * 2.2 + Math.sin(u * 3) * 0.25;
        positions.push(x, y, z);
        uvs.push(i / uSegments, j / vSegments);
      }
    }

    for (let i = 0; i < uSegments; i++) {
      for (let j = 0; j < vSegments; j++) {
        const a = i * (vSegments + 1) + j;
        const b = a + vSegments + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }

    geo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3)
    );
    geo.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    geo.setIndex(indices);
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state, delta) => {
    if (!mesh.current) return;

    const visible = scrollWindow(chaosState.scroll, 0.6, 1.15, 0.09);
    mesh.current.visible = visible > 0.01;

    if (!chaosState.reducedMotion) {
      const t = state.clock.elapsedTime;
      mesh.current.rotation.z += delta * 0.12;
      mesh.current.rotation.x = Math.sin(t * 0.2) * 0.3;
      mesh.current.rotation.y = t * 0.08 + chaosState.pointer.x * 0.4;
    }
    mesh.current.position.x = chaosState.pointer.x * 0.6;
    mesh.current.position.y = chaosState.pointer.y * 0.4;
    mesh.current.scale.setScalar(1.0 * (0.6 + visible * 0.4));

    const mat = mesh.current.material as THREE.MeshBasicMaterial;
    mat.opacity = 0.28 * visible;
    mat.color.set("#38e8ff");
  });

  return (
    <mesh ref={mesh} geometry={geometry} position={[0, 0, 0]} scale={1.0}>
      <meshBasicMaterial
        color="#38e8ff"
        wireframe
        transparent
        opacity={0.28}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
