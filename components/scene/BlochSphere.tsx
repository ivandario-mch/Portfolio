"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { chaosState, scrollWindow } from "@/lib/chaos";

function circleGeometry(plane: "xy" | "xz") {
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= 96; i++) {
    const a = (i / 96) * Math.PI * 2;
    if (plane === "xy") pts.push(new THREE.Vector3(Math.cos(a), Math.sin(a), 0));
    else pts.push(new THREE.Vector3(Math.cos(a), 0, Math.sin(a)));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

function lineOf(points: THREE.Vector3[], color: string, opacity: number) {
  const g = new THREE.BufferGeometry().setFromPoints(points);
  const m = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    blending: THREE.AdditiveBlending,
  });
  return new THREE.Line(g, m);
}

export function BlochSphere() {
  const group = useRef<THREE.Group>(null);
  const arrow = useRef<THREE.Line>(null);

  const { equator, meridian, vector } = useMemo(
    () => ({
      equator: new THREE.Line(
        circleGeometry("xy"),
        new THREE.LineBasicMaterial({
          color: "#38e8ff",
          transparent: true,
          opacity: 0.35,
        })
      ),
      meridian: new THREE.Line(
        circleGeometry("xz"),
        new THREE.LineBasicMaterial({
          color: "#ff4fd8",
          transparent: true,
          opacity: 0.3,
        })
      ),
      vector: lineOf(
        [new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 1, 0)],
        "#ffb347",
        0.9
      ),
    }),
    []
  );

  useFrame((state) => {
    if (!group.current) return;

    const visible = scrollWindow(chaosState.scroll, 0.32, 0.64, 0.09);
    group.current.visible = visible > 0.01;

    const t = state.clock.elapsedTime;

    if (!chaosState.reducedMotion) {
      group.current.rotation.y = t * 0.35 + chaosState.pointer.x * 0.6;
      group.current.rotation.x = -0.15 + chaosState.pointer.y * 0.5;
    }
    group.current.position.x = chaosState.pointer.x * 0.6;
    group.current.position.y = chaosState.pointer.y * 0.4;
    group.current.scale.setScalar(1.6 * (0.6 + visible * 0.4));

    const angle = (Math.PI / 2) * (0.5 + 0.5 * Math.sin(t * 0.8));
    const dir = new THREE.Vector3(Math.sin(angle), Math.cos(angle), 0);
    const pos = arrow.current?.geometry.attributes.position as
      | THREE.BufferAttribute
      | undefined;
    if (pos) {
      pos.setXYZ(1, dir.x * 1.5, dir.y * 1.5, dir.z * 1.5);
      pos.needsUpdate = true;
    }

    const arrowMat = vector.material as THREE.LineBasicMaterial;
    arrowMat.opacity = 0.7 * visible;

    [equator, meridian].forEach((l) => {
      (l.material as THREE.LineBasicMaterial).opacity =
        (l === equator ? 0.35 : 0.3) * visible;
    });

    const sphere = group.current.children[0] as THREE.Mesh;
    (sphere.material as THREE.MeshBasicMaterial).opacity = 0.08 * visible;
  });

  return (
    <group ref={group} position={[0, 0, 0]} scale={1.6}>
      <mesh>
        <sphereGeometry args={[1.5, 24, 16]} />
        <meshBasicMaterial
          color="#38e8ff"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
      <primitive object={equator} />
      <primitive object={meridian} rotation={[Math.PI / 2, 0, 0]} />
      <primitive ref={arrow} object={vector} />
    </group>
  );
}
