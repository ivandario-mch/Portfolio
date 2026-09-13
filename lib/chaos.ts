"use client";

import { useEffect, useRef } from "react";

export type ChaosState = {
  pointer: { x: number; y: number };
  pointerTarget: { x: number; y: number };
  scroll: number;
  energy: number;
  reducedMotion: boolean;
  entropy: number;
  butterflyPulse: number;
};

export const chaosState: ChaosState = {
  pointer: { x: 0, y: 0 },
  pointerTarget: { x: 0, y: 0 },
  scroll: 0,
  energy: 0,
  reducedMotion: false,
  entropy: 0,
  butterflyPulse: 0,
};

export function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.min(Math.max((x - edge0) / (edge1 - edge0), 0), 1);
  return t * t * (3 - 2 * t);
}

/**
 * Visibility of an object given the page scroll progress (0..1).
 * `fade` is the width of the fade-in/out ramps, `hold` is how long it stays
 * fully visible in the middle.
 */
export function scrollWindow(
  scroll: number,
  start: number,
  end: number,
  fade = 0.08
) {
  const fadeIn = smoothstep(start - fade, start + fade, scroll);
  const fadeOut = 1 - smoothstep(end - fade, end + fade, scroll);
  return Math.min(fadeIn, fadeOut);
}

export function useGlobalPointer() {
  useEffect(() => {
    chaosState.reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const onMove = (e: PointerEvent) => {
      chaosState.pointerTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      chaosState.pointerTarget.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };

    const onScroll = () => {
      const max = document.body.scrollHeight - window.innerHeight;
      chaosState.scroll = max > 0 ? window.scrollY / max : 0;
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
}

export function usePointerKey() {
  const ref = useRef<HTMLDivElement>(null);
  return ref;
}

export function subscribeEntropy(fn: (v: number) => void) {
  const handler = (e: Event) => {
    const detail = (e as CustomEvent<number>).detail;
    chaosState.entropy = detail;
    fn(detail);
  };
  window.addEventListener("chaos-entropy", handler);
  return () => window.removeEventListener("chaos-entropy", handler);
}

export function emitEntropy(value: number) {
  window.dispatchEvent(new CustomEvent("chaos-entropy", { detail: value }));
}

export function pulseButterfly() {
  chaosState.butterflyPulse = 1;
}
