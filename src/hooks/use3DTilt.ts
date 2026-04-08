"use client";

import { useRef, useCallback, useState } from "react";

interface TiltState {
  rotateX: number;
  rotateY: number;
  scale: number;
  glareX: number;
  glareY: number;
}

const defaultState: TiltState = {
  rotateX: 0,
  rotateY: 0,
  scale: 1,
  glareX: 50,
  glareY: 50,
};

export function use3DTilt(maxTilt = 8, scaleOnHover = 1.02) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<TiltState>(defaultState);
  const rafRef = useRef<number>(0);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!ref.current) return;
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = ref.current!.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setTilt({
          rotateX: (0.5 - y) * maxTilt * 2,
          rotateY: (x - 0.5) * maxTilt * 2,
          scale: scaleOnHover,
          glareX: x * 100,
          glareY: y * 100,
        });
      });
    },
    [maxTilt, scaleOnHover]
  );

  const handleMouseLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current);
    setTilt(defaultState);
  }, []);

  const style = {
    transform: `perspective(800px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(${tilt.scale}, ${tilt.scale}, ${tilt.scale})`,
    transition: tilt.scale === 1 ? "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)" : "transform 0.1s ease-out",
  };

  const glareStyle = {
    background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(204,255,0,0.06) 0%, transparent 60%)`,
    opacity: tilt.scale === 1 ? 0 : 1,
    transition: "opacity 0.4s ease",
  };

  return { ref, style, glareStyle, handleMouseMove, handleMouseLeave, tilt };
}
