"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect } from "react";
import { chaosState, useGlobalPointer } from "@/lib/chaos";
import { ParticleField } from "./ParticleField";
import { LorenzAttractor } from "./LorenzAttractor";
import { MobiusStrip } from "./MobiusStrip";
import { BlochSphere } from "./BlochSphere";
import { CursorTrail } from "./CursorTrail";

function EnergyDriver() {
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const target = chaosState.scroll;
      chaosState.energy += (target - chaosState.energy) * 0.06;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, []);
  return null;
}

export function SceneCanvas() {
  useGlobalPointer();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10">
      <div className="grid-overlay absolute inset-0" />
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 9], fov: 55 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#05060a"]} />
        <fog attach="fog" args={["#05060a", 12, 26]} />
        <Suspense fallback={null}>
          <ParticleField />
          <LorenzAttractor />
          <MobiusStrip />
          <BlochSphere />
          <CursorTrail />
        </Suspense>
        <EnergyDriver />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-chaos-bg/60 via-chaos-bg/20 to-chaos-bg" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_42%,rgba(5,6,10,0.55),transparent_70%)]" />
    </div>
  );
}
