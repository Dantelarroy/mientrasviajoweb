"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  className?: string;
};

export default function FadeIn({ children, delay = 0, direction = "up", className }: Props) {
  const reduce = useReducedMotion();
  const dist = 28;

  const initial = reduce
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: direction === "up" ? dist : 0,
        x: direction === "left" ? -dist : direction === "right" ? dist : 0,
      };

  return (
    <motion.div
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-72px" }}
      transition={{ duration: reduce ? 0.15 : 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
