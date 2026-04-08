"use client";

import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import gsap from "gsap";

const roles = [
  "Full Stack Engineer",
  "Cloud Architect",
  "Startup Founder",
  "Linux Enthusiast",
];

export default function Hero() {
  const nameRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Multi-layer parallax speeds
  const springConfig = { stiffness: 50, damping: 30, mass: 0.8 };
  const gridY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), springConfig);
  const orbY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), springConfig);
  const contentY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), springConfig);
  const geoY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 150]), springConfig);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);

  // Mouse-reactive background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      mouseX.set(x * 20);
      mouseY.set(y * 20);
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [mouseX, mouseY]);

  useEffect(() => {
    if (!nameRef.current) return;

    const letters = nameRef.current.querySelectorAll(".letter");
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo(
      letters,
      { y: 120, opacity: 0, rotateX: -90, rotateZ: 5, scale: 0.8 },
      {
        y: 0,
        opacity: 1,
        rotateX: 0,
        rotateZ: 0,
        scale: 1,
        duration: 1.2,
        ease: "power4.out",
        stagger: 0.05,
      }
    );

    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, opacity: 0 },
        { scaleX: 1, opacity: 1, duration: 0.8, ease: "power2.inOut" },
        "-=0.5"
      );
    }
  }, []);

  const nameText = "Shirin Shaikh";

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="perspective-container relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Animated gradient orbs — deepest parallax layer */}
      <motion.div className="absolute inset-0" style={{ y: orbY }}>
        <motion.div
          className="gradient-orb morph-blob absolute -top-32 -right-32 h-[500px] w-[500px] bg-accent/[0.04]"
          style={{ x: smoothMouseX, y: smoothMouseY }}
        />
        <motion.div
          className="gradient-orb morph-blob absolute -bottom-40 -left-40 h-[400px] w-[400px] bg-accent/[0.03]"
          style={{
            x: useTransform(smoothMouseX, (v) => v * -0.5),
            y: useTransform(smoothMouseY, (v) => v * -0.5),
          }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <div
          className="gradient-orb absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 bg-accent/[0.02]"
          style={{ animation: "pulseGlow 6s ease-in-out infinite" }}
        />
      </motion.div>

      {/* Grid background — mid layer */}
      <motion.div className="grid-bg absolute inset-0" style={{ y: gridY }} />
      <div className="hero-gradient absolute inset-0" />

      {/* 3D floating geometric shapes */}
      <motion.div className="pointer-events-none absolute inset-0" style={{ y: geoY }}>
        {/* Rotating wireframe diamond */}
        <motion.div
          className="absolute top-[15%] right-[12%]"
          style={{ x: smoothMouseX, y: smoothMouseY }}
        >
          <div className="float-3d">
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" className="spin-slow opacity-[0.07]">
              <rect x="10" y="10" width="40" height="40" rx="2" stroke="#CCFF00" strokeWidth="1" transform="rotate(45 30 30)" />
              <rect x="15" y="15" width="30" height="30" rx="1" stroke="#CCFF00" strokeWidth="0.5" transform="rotate(45 30 30)" />
            </svg>
          </div>
        </motion.div>

        {/* Floating triangle */}
        <motion.div
          className="absolute bottom-[25%] left-[8%]"
          style={{
            x: useTransform(smoothMouseX, (v) => v * -0.7),
            y: useTransform(smoothMouseY, (v) => v * -0.7),
          }}
        >
          <div className="float-3d-delayed">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="spin-reverse opacity-[0.06]">
              <polygon points="24,4 44,40 4,40" stroke="#CCFF00" strokeWidth="1" fill="none" />
              <polygon points="24,12 38,36 10,36" stroke="#CCFF00" strokeWidth="0.5" fill="none" />
            </svg>
          </div>
        </motion.div>

        {/* Floating circle cluster */}
        <motion.div
          className="absolute top-[55%] right-[20%]"
          style={{
            x: useTransform(smoothMouseX, (v) => v * 0.4),
            y: useTransform(smoothMouseY, (v) => v * 0.4),
          }}
        >
          <div className="float-3d-slow">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-[0.05]">
              <circle cx="20" cy="20" r="18" stroke="#CCFF00" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="12" stroke="#CCFF00" strokeWidth="0.5" strokeDasharray="3 3" />
              <circle cx="20" cy="20" r="6" stroke="#CCFF00" strokeWidth="0.3" />
            </svg>
          </div>
        </motion.div>

        {/* Horizontal accent lines */}
        <motion.div className="absolute top-[30%] left-0 w-full opacity-[0.03]">
          <div className="h-[1px] w-1/3 bg-gradient-to-r from-transparent via-accent to-transparent" />
        </motion.div>
        <motion.div className="absolute top-[70%] right-0 flex w-full justify-end opacity-[0.03]">
          <div className="h-[1px] w-1/4 bg-gradient-to-l from-transparent via-accent to-transparent" />
        </motion.div>

        {/* Dot grid cluster */}
        <div className="absolute top-[20%] left-[15%] opacity-[0.04]">
          <div className="grid grid-cols-5 gap-3">
            {Array.from({ length: 25 }).map((_, i) => (
              <div key={i} className="h-1 w-1 rounded-full bg-accent" />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Content — front layer with 3D */}
      <motion.div
        className="preserve-3d relative z-10 mx-auto w-full max-w-7xl px-8 py-32 sm:px-12 lg:px-24"
        style={{ y: contentY, opacity: heroOpacity, scale: heroScale }}
      >
        {/* Pre-title */}
        <motion.div
          initial={{ opacity: 0, y: 20, rotateX: -15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ delay: 0.1, duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          className="mb-6 flex items-center gap-3"
        >
          <motion.span
            className="h-[1px] bg-accent"
            initial={{ width: 0 }}
            animate={{ width: 32 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          />
          <span className="font-mono text-sm tracking-[0.3em] text-accent">
            HELLO, I&apos;M
          </span>
        </motion.div>

        {/* Main Name — 3D letter reveal */}
        <h1
          ref={nameRef}
          className="font-display text-[clamp(3.5rem,13vw,12rem)] leading-[0.9] tracking-tight"
          style={{ perspective: "1000px" }}
        >
          {nameText.split("").map((char, i) => (
            <span
              key={i}
              className="letter inline-block"
              style={{
                transformOrigin: "bottom center",
                opacity: 0,
                transformStyle: "preserve-3d",
              }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        {/* Animated line with glow */}
        <div className="relative">
          <div
            ref={lineRef}
            className="my-8 h-[2px] w-full max-w-2xl origin-left bg-gradient-to-r from-accent via-accent/50 to-transparent"
            style={{ transform: "scaleX(0)" }}
          />
          <div className="absolute top-0 left-0 my-8 h-[2px] w-full max-w-2xl origin-left bg-gradient-to-r from-accent/40 via-accent/20 to-transparent blur-sm" />
        </div>

        {/* Subtitle with role rotation */}
        <motion.div
          initial={{ opacity: 0, y: 30, z: -50 }}
          animate={{ opacity: 1, y: 0, z: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
        >
          <RoleRotator roles={roles} />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          className="mt-8 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg"
        >
          Building responsive and user-friendly web applications using modern technologies.
          <br />
          <span className="text-text-dim">
          Passionate about creating real-world projects and improving my development skills.
          </span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <a
            href="#projects"
            className="magnetic-btn group inline-flex items-center justify-center border border-accent bg-accent px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-background transition-all"
            data-cursor-hover
          >
            <span className="flex items-center gap-2">
              View My Work
              <svg
                className="h-3 w-3 transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
          </a>
          <a
            href="https://drive.google.com/file/d/1N0OCtkWdJK3OCJl918PMgON3QamR_HYf/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="magnetic-btn group inline-flex items-center justify-center border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-text-primary transition-all hover:border-accent hover:text-background"
            data-cursor-hover
          >
            <span className="flex items-center gap-2">
              Resume
              <svg
                className="h-3 w-3 transition-transform group-hover:-translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </span>
          </a>
          <a
            href="#contact"
            className="magnetic-btn group inline-flex items-center justify-center border border-border px-8 py-4 font-mono text-xs uppercase tracking-[0.2em] text-text-primary transition-all hover:border-accent hover:text-background"
            data-cursor-hover
          >
            <span>Get In Touch</span>
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 1 }}
          className="mt-16 flex flex-wrap gap-8 border-t border-border pt-8 sm:gap-16"
        >
          {[
            { value: "Multiple", label: "Projects Completed" },
            { value: "1", label: "Internship Experience" },
            { value: "100%", label: "Practical Learning" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 + i * 0.15, duration: 0.6 }}
            >
              <div className="font-display text-3xl tracking-wider text-accent glow-text">
                {stat.value}
              </div>
              <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: useTransform(scrollYProgress, [0, 0.15], [1, 0]) }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-dim">
          Scroll
        </span>
        <div className="flex h-10 w-5 items-start justify-center rounded-full border border-text-dim p-1">
          <div className="scroll-indicator h-2 w-1 rounded-full bg-accent" />
        </div>
      </motion.div>
    </section>
  );
}

/* Role rotation component */
function RoleRotator({ roles }: { roles: string[] }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      indexRef.current = (indexRef.current + 1) % roles.length;
      if (containerRef.current) {
        const spans = containerRef.current.querySelectorAll("span");
        spans.forEach((span, i) => {
          if (i === indexRef.current) {
            gsap.fromTo(
              span,
              { y: 30, opacity: 0, rotateX: -40 },
              { y: 0, opacity: 1, rotateX: 0, duration: 0.5, ease: "power3.out" }
            );
            span.style.display = "block";
          } else {
            gsap.to(span, {
              y: -30,
              opacity: 0,
              rotateX: 40,
              duration: 0.3,
              ease: "power3.in",
              onComplete: () => {
                span.style.display = "none";
              },
            });
          }
        });
      }
    }, 2500);

    return () => clearInterval(interval);
  }, [roles]);

  return (
    <div ref={containerRef} className="relative h-8 overflow-hidden" style={{ perspective: "600px" }}>
      {roles.map((role, i) => (
        <span
          key={role}
          className="font-mono text-sm tracking-[0.15em] text-text-primary"
          style={{ display: i === 0 ? "block" : "none", transformStyle: "preserve-3d" }}
        >
          {"// "}
          <span className="text-accent">{role}</span>
        </span>
      ))}
    </div>
  );
}
