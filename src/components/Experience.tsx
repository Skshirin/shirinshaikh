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

const experiences = [
{
  company: "Gema Pvt. Ltd.",
  role: "WordPress Developer Intern",
  period: "Dec 2025 — Mar 2026",
  location: "Remote",
  project: "WordPress Website Development and Customization",
  achievements: [
    {
      text: "Developed and customized responsive websites using WordPress, ensuring clean UI and user-friendly design.",
      metric: null,
    },
    {
      text: "Worked with themes and plugins to add functionality and improve overall website performance.",
      metric: null,
    },
    {
      text: "Assisted in building and managing website content, including pages, blogs, and media assets.",
      metric: null,
    },
    {
      text: "Optimized websites for speed, responsiveness, and cross-device compatibility.",
      metric: null,
    },
    {
      text: "Collaborated with the team to debug issues and implement improvements based on client requirements.",
      metric: null,
    },
  ],
  tech: ["WordPress", "HTML", "CSS", "JavaScript", "PHP"],
}
];

function ExperienceCard({
  exp,
  expIdx,
  inView,
}: {
  exp: (typeof experiences)[number];
  expIdx: number;
  inView: boolean;
}) {
  const tilt = use3DTilt(4, 1.005);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const cardY = useSpring(
    useTransform(scrollYProgress, [0, 1], [30, -30]),
    { stiffness: 80, damping: 30 }
  );

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={expIdx + 1}
      className="relative md:pl-20"
      style={{ y: cardY }}
    >
      {/* Timeline dot */}
      <motion.div
        initial={{ scale: 0, rotate: 0 }}
        animate={inView ? { scale: 1, rotate: 45 } : { scale: 0 }}
        transition={{ delay: 0.5 + expIdx * 0.3, duration: 0.5, type: "spring" }}
        className="absolute left-0 top-2 hidden h-4 w-4 md:block md:left-[25px]"
      >
        <div className="h-full w-full border-2 border-accent bg-background shadow-[0_0_8px_rgba(204,255,0,0.3)]" />
      </motion.div>

      {/* Card with 3D tilt */}
      <div
        ref={tilt.ref}
        onMouseMove={tilt.handleMouseMove}
        onMouseLeave={tilt.handleMouseLeave}
        className="group glass-card relative overflow-hidden p-8 md:p-10"
        style={tilt.style}
      >
        {/* Tilt glare */}
        <div className="tilt-glare" style={tilt.glareStyle} />

        {/* Header */}
        <div className="relative z-10 mb-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="font-display text-2xl tracking-wider text-text-primary transition-colors group-hover:text-accent">
              {exp.company}
            </h3>
            <p className="mt-1 text-sm text-text-muted">{exp.role}</p>
          </div>
          <div className="flex flex-col items-start gap-1 md:items-end">
            <span className="font-mono text-xs tracking-wider text-accent">
              {exp.period}
            </span>
            <span className="font-mono text-xs text-text-dim">
              {exp.location}
            </span>
          </div>
        </div>

        {/* Project name */}
        <div className="relative z-10 mb-6 flex items-center gap-2 border-l-2 border-accent pl-4">
          <span className="font-mono text-xs text-text-dim">PROJECT:</span>
          <span className="text-sm text-text-primary">{exp.project}</span>
        </div>

        {/* Achievements */}
        <ul className="relative z-10 space-y-4">
          {exp.achievements.map((achievement, i) => (
            <motion.li
              key={i}
              className="flex gap-3"
              initial={{ opacity: 0, x: -10 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.6 + expIdx * 0.2 + i * 0.08, duration: 0.5 }}
            >
              <span className="mt-2 h-1 w-1 shrink-0 bg-accent" />
              <div>
                <p className="text-sm leading-relaxed text-text-muted">
                  {achievement.text}
                </p>
                {achievement.metric && (
                  <span className="mt-1 inline-block font-mono text-xs text-accent">
                    {achievement.metric}
                  </span>
                )}
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Tech stack */}
        <div className="relative z-10 mt-8 flex flex-wrap gap-2 border-t border-border/40 pt-6">
          {exp.tech.map((t, i) => (
            <motion.span
              key={t}
              className="rounded-md border border-border/60 bg-background/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-dim transition-colors hover:border-accent/30 hover:text-accent"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.8 + i * 0.05, duration: 0.3 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="experience" className="relative py-28 md:py-36" ref={ref}>
      <div className="grid-bg absolute inset-0 opacity-50" />
      <div className="relative z-10 mx-auto max-w-7xl px-8 sm:px-12 lg:px-24">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-mono text-sm text-accent">02.</span>
          <span className="font-display text-4xl tracking-wider md:text-5xl">EXPERIENCE</span>
          <span className="hidden h-[1px] flex-1 bg-border md:block" />
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line with glow */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            className="absolute left-0 top-0 hidden h-full w-[1px] origin-top md:block md:left-8"
          >
            <div className="h-full w-full bg-gradient-to-b from-accent via-border to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-b from-accent/30 via-transparent to-transparent blur-sm" />
          </motion.div>

          <div className="space-y-16">
            {experiences.map((exp, expIdx) => (
              <ExperienceCard key={expIdx} exp={exp} expIdx={expIdx} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
