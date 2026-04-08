"use client";

import { useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { useRef } from "react";

interface ParallaxOptions {
  offset?: [string, string];
  speed?: number;
  springConfig?: { stiffness: number; damping: number; mass: number };
}

export function useParallax({
  offset = ["start end", "end start"],
  speed = 0.5,
  springConfig = { stiffness: 100, damping: 30, mass: 0.5 },
}: ParallaxOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: offset as ["start end", "end start"],
  });

  const range = 100 * speed;
  const rawY = useTransform(scrollYProgress, [0, 1], [range, -range]);
  const y = useSpring(rawY, springConfig);

  return { ref, y, scrollYProgress };
}

export function useMultiParallax(
  scrollYProgress: MotionValue<number>,
  layers: { speed: number; springConfig?: { stiffness: number; damping: number; mass: number } }[]
) {
  return layers.map((layer) => {
    const range = 100 * layer.speed;
    const rawY = useTransform(scrollYProgress, [0, 1], [range, -range]);
    const y = useSpring(rawY, layer.springConfig ?? { stiffness: 100, damping: 30, mass: 0.5 });
    return y;
  });
}
