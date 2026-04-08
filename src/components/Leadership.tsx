"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { use3DTilt } from "@/hooks/use3DTilt";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  }),
};

export default function Leadership() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);
  const tilt = use3DTilt(4, 1.005);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 60, damping: 30 };
  const cardY = useSpring(useTransform(scrollYProgress, [0, 1], [40, -40]), springConfig);
  const cardScale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.95, 1, 1, 0.95]);

  return (
    <section
      className="relative py-28 md:py-36 overflow-hidden"
      ref={(el) => {
        ref(el);
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
    >
      <div className="relative z-10 mx-auto max-w-7xl px-8 sm:px-12 lg:px-24">
        <motion.div
          style={{ y: cardY, scale: cardScale }}
          className="perspective-container"
        >
          {/* Big statement */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            custom={0}
          >
            <div
              ref={tilt.ref}
              onMouseMove={tilt.handleMouseMove}
              onMouseLeave={tilt.handleMouseLeave}
              className="relative glass-card overflow-hidden p-6 sm:p-8 md:p-16"
              style={tilt.style}
            >
              {/* Tilt glare */}
              <div className="tilt-glare" style={tilt.glareStyle} />

              {/* Background accent */}
              <div className="absolute top-0 right-0 h-full w-1/3 bg-gradient-to-l from-accent/[0.03] to-transparent" />

              {/* Top labels */}
              <div className="relative z-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-10">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <motion.span
                      className="h-[2px] bg-accent"
                      initial={{ width: 0 }}
                      animate={inView ? { width: 24 } : {}}
                      transition={{ delay: 0.3, duration: 0.5 }}
                    />
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                      Leadership & Entrepreneurship
                    </span>
                  </div>
                  <h3 className="font-display text-4xl tracking-wider md:text-6xl">
                    PUSTALK
                  </h3>
                  <p className="mt-1 text-sm text-text-dim">E-Commerce Startup</p>
                </div>
                <div className="text-left md:text-right">
                  <span className="font-mono text-xs tracking-wider text-accent">
                    Oct 2020 — Jun 2022
                  </span>
                  <p className="mt-1 font-mono text-xs text-text-dim">Founder</p>
                </div>
              </div>

              {/* Content grid */}
              <div className="relative z-10 grid gap-10 md:grid-cols-2">
                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={1}
                >
                  <p className="text-base leading-relaxed text-text-muted">
                    Founded and led a{" "}
                    <span className="text-text-primary">5-member cross-functional team</span>{" "}
                    to design, build, and launch a full-stack e-commerce platform
                    from ideation to market. Managed the entire product lifecycle
                    including technical architecture, UI/UX design, development,
                    and go-to-market strategy.
                  </p>
                </motion.div>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  custom={2}
                >
                  <div className="rounded-lg border border-accent/20 bg-accent-dim p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <svg className="h-5 w-5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 01-.982-3.172M9.497 14.25a7.454 7.454 0 00.981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 007.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 002.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 012.916.52 6.003 6.003 0 01-5.395 4.972m0 0a6.726 6.726 0 01-2.749 1.35m0 0a6.772 6.772 0 01-3.044 0" />
                      </svg>
                      <span className="font-mono text-xs uppercase tracking-wider text-accent">Achievement</span>
                    </div>
                    <p className="text-lg text-text-primary">
                      Selected among the{" "}
                      <span className="font-display text-2xl tracking-wider text-accent">
                        Top 500 Startups
                      </span>{" "}
                      at the{" "}
                      <span className="text-text-primary">
                        Slingshot Singapore
                      </span>{" "}
                      international competition, competing against thousands of
                      global entrants.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Bottom stats */}
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                custom={3}
                className="relative z-10 mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8"
              >
                {[
                  { value: "5", label: "Team Members" },
                  { value: "Top 500", label: "Global Ranking" },
                  { value: "2 Years", label: "Duration" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.8 + i * 0.12, duration: 0.5 }}
                  >
                    <div className="font-display text-2xl tracking-wider text-accent md:text-3xl glow-text">
                      {stat.value}
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-text-dim md:text-[10px]">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
