"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import type { Skill } from "@/data/skills";

export function SkillBar({ skill, index }: { skill: Skill; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [excited, setExcited] = useState(false);

  return (
    <div
      ref={ref}
      onPointerEnter={() => setExcited(true)}
      onPointerLeave={() => setExcited(false)}
      className="group"
    >
      <div className="mb-2 flex items-baseline justify-between font-mono text-sm">
        <span className="text-white/80 transition-colors group-hover:text-white">
          {skill.name}
        </span>
        <span
          className="tabular-nums text-white/40 transition-colors group-hover:text-white/80"
          style={{ color: excited ? skill.accent : undefined }}
        >
          {skill.level}%
        </span>
      </div>
      <div className="relative h-2 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${skill.accent}44, ${skill.accent})`,
            boxShadow: excited ? `0 0 18px ${skill.accent}` : "none",
          }}
          initial={{ width: 0 }}
          animate={{ width: inView ? `${skill.level}%` : 0 }}
          transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
        />
        <div
          className="absolute top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-white transition-all duration-300"
          style={{
            left: inView ? `calc(${skill.level}% - 5px)` : "0%",
            opacity: excited ? 1 : 0,
            boxShadow: `0 0 12px ${skill.accent}`,
          }}
        />
      </div>
    </div>
  );
}
