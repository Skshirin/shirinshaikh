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

const projects = [
  {
  title: "AI-Powered E-Commerce Website",
  description:
    "Developed a production-grade e-commerce website with secure authentication, Stripe payments, and AI-driven product discovery.",
  longDesc:
    "Integrated Stripe webhooks to handle real-time payment verification, order updates, role based access, and stock management. Built advanced filtering with pagination and keyword extraction, and enhanced search using LLM-based AI recommendations for better product discovery.",
  tech: ["Node.js", "Express.js", "PostgreSQL", "Stripe", "Cloudinary", "JWT", "REST APIs", "LLM APIs"],
  metrics: [
    { label: "Payments", value: "Stripe Webhooks" },
    { label: "Search", value: "AI Powered" },
    { label: "System", value: "RBAC + Scalable" },
  ],
  accent: "#CCFF00",
  featured: true,
  },
  {
  title: "Factify",
  subtitle: "Fake News Detection System",
  description:
    "Full-stack web application that detects and classifies fake news using machine learning and NLP techniques, providing real-time credibility analysis for articles and headlines.",
  longDesc:
    "Built an end-to-end fake news detection pipeline leveraging trained ML models with text preprocessing, TF-IDF vectorization, and classification algorithms. Integrated a responsive frontend with a scalable backend API to deliver instant predictions and improve information reliability for users.",
  tech: ["React", "Node.js", "Express.js", "Python", "Scikit-learn", "NLP", "MongoDB"],
  metrics: [
    { label: "Accuracy", value: "High ML Precision" },
    { label: "Detection", value: "Real-time" },
  ],
  accent: "#FF6B6B",
  featured: false,
  },
  {
  title: "Smart Ingredient Analyzer",
  subtitle: "AI-Powered Food & Cosmetic Safety App",
  description:
    "AI-driven system that scans product labels and detects harmful ingredients, delivering personalized risk scores based on user health conditions and allergies.",
  tech: ["React Native", "FastAPI", "PyTorch", "OCR", "DistilBERT"],
  metrics: [
    { label: "Type", value: "Mobile App + AI Backend" },
    { label: "Analysis", value: "Real-time + Personalized" },
  ],
  accent: "#FF6B35",
  featured: true,
  },
  {
  title: "Virtual Mouse",
  subtitle: "Computer Vision Application",
  description:
    "Gesture-controlled virtual mouse system that enables users to interact with their computer using hand movements, eliminating the need for physical input devices.",
  tech: ["Python", "OpenCV", "MediaPipe", "Computer Vision"],
  metrics: [
    { label: "Control", value: "Real-time Gesture Tracking" },
    { label: "Input", value: "Touchless Interaction" },
  ],
  accent: "#A855F7",
  featured: false,
  },
];

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section id="projects" className="relative py-28 md:py-36" ref={ref}>
      <div className="section-gradient-top absolute inset-0" />
      <div className="relative z-10 mx-auto max-w-7xl px-8 sm:px-12 lg:px-24">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-mono text-sm text-accent">03.</span>
          <span className="font-display text-4xl tracking-wider md:text-5xl">PROJECTS</span>
          <span className="hidden h-[1px] flex-1 bg-border md:block" />
        </motion.div>

        {/* Featured projects */}
        <div className="space-y-8">
          {projects
            .filter((p) => p.featured)
            .map((project, i) => (
              <FeaturedProject key={project.title} project={project} index={i} inView={inView} />
            ))}
        </div>

        {/* Other projects */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={4}
          className="mt-16"
        >
          <h3 className="mb-8 font-mono text-xs uppercase tracking-[0.3em] text-text-dim">
            Other Notable Projects
          </h3>
          <div className="grid gap-4 md:grid-cols-2">
            {projects
              .filter((p) => !p.featured)
              .map((project, i) => (
                <SmallProject key={project.title} project={project} index={i} inView={inView} />
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface ProjectType {
  title: string;
  subtitle?: string;
  description: string;
  longDesc?: string;
  tech: string[];
  metrics: { label: string; value: string }[];
  accent: string;
  featured: boolean;
}

function FeaturedProject({
  project,
  index,
  inView,
}: {
  project: ProjectType;
  index: number;
  inView: boolean;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const tilt = use3DTilt(5, 1.008);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, -50]),
    { stiffness: 60, damping: 25 }
  );
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.96, 1, 1, 0.96]);

  return (
    <motion.div
      ref={cardRef}
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index + 1}
      style={{ y, scale }}
      className="perspective-container"
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.handleMouseMove}
        onMouseLeave={tilt.handleMouseLeave}
        className="group relative overflow-hidden rounded-xl border border-border/60 bg-surface/30 backdrop-blur-sm transition-all duration-700 hover:border-border-light"
        style={tilt.style}
      >
        {/* Tilt glare */}
        <div className="tilt-glare" style={tilt.glareStyle} />

        {/* Accent top line */}
        <div
          className="h-[2px] w-full transition-all duration-700 group-hover:h-[3px]"
          style={{ background: `linear-gradient(90deg, ${project.accent}, transparent)` }}
        />

        <div className="relative z-10 p-8 md:p-12">
          <div className="grid gap-8 lg:grid-cols-5">
            {/* Left: info */}
            <div className="lg:col-span-3">
              {/* Project label */}
              <div className="mb-4 flex items-center gap-3">
                <motion.span
                  className="h-2 w-2"
                  style={{ background: project.accent }}
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-text-dim">
                  Featured Project
                </span>
              </div>

              <h3 className="font-display text-4xl tracking-wider text-text-primary transition-colors duration-300 group-hover:text-accent md:text-5xl">
                {project.title}
              </h3>
              {project.subtitle && (
                <p className="mt-1 font-mono text-xs tracking-wider text-text-dim">
                  {project.subtitle}
                </p>
              )}

              <p className="mt-6 text-base leading-relaxed text-text-muted">
                {project.description}
              </p>
              {project.longDesc && (
                <p className="mt-3 text-sm leading-relaxed text-text-dim">
                  {project.longDesc}
                </p>
              )}

              {/* Tech pills */}
              <div className="mt-8 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md border border-border/60 bg-background/50 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-dim transition-all duration-300 hover:text-text-primary"
                    style={{ borderColor: "var(--color-border)" }}
                    onMouseEnter={(e) => {
                      (e.target as HTMLElement).style.borderColor = project.accent;
                      (e.target as HTMLElement).style.color = project.accent;
                    }}
                    onMouseLeave={(e) => {
                      (e.target as HTMLElement).style.borderColor = "var(--color-border)";
                      (e.target as HTMLElement).style.color = "";
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right: metrics */}
            <div className="flex flex-col justify-center gap-6 lg:col-span-2">
              {project.metrics.map((m, mIdx) => (
                <motion.div
                  key={m.label}
                  className="border-l-2 pl-6 transition-colors duration-300"
                  style={{ borderColor: "var(--color-border)" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = project.accent;
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor = "var(--color-border)";
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 + index * 0.2 + mIdx * 0.1, duration: 0.5 }}
                >
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim">
                    {m.label}
                  </div>
                  <div
                    className="font-display text-2xl tracking-wider"
                    style={{ color: project.accent }}
                  >
                    {m.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Hover glow */}
        <div
          className="absolute -bottom-20 -right-20 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-10"
          style={{ background: project.accent }}
        />
      </div>
    </motion.div>
  );
}

function SmallProject({
  project,
  index,
  inView,
}: {
  project: ProjectType;
  index: number;
  inView: boolean;
}) {
  const tilt = use3DTilt(6, 1.02);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      custom={index + 5}
      className="perspective-container"
    >
      <div
        ref={tilt.ref}
        onMouseMove={tilt.handleMouseMove}
        onMouseLeave={tilt.handleMouseLeave}
        className="group relative overflow-hidden rounded-xl border border-border/60 bg-surface/30 p-8 backdrop-blur-sm transition-all duration-500 hover:border-border-light hover:bg-surface/60"
        style={tilt.style}
      >
        <div className="tilt-glare" style={tilt.glareStyle} />

        <div className="relative z-10">
          <div
            className="mb-4 h-[2px] w-8 transition-all duration-500 group-hover:w-16"
            style={{ background: project.accent }}
          />
          <h4 className="font-display text-2xl tracking-wider text-text-primary transition-colors group-hover:text-accent">
            {project.title}
          </h4>
          {project.subtitle && (
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-text-dim">
              {project.subtitle}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-text-muted">{project.description}</p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tech.map((t, i) => (
              <span key={t} className="font-mono text-[10px] text-text-dim">
                {t}{i < project.tech.length - 1 ? " ·" : ""}
              </span>
            ))}
          </div>

          <div className="mt-4 flex gap-6">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="font-mono text-[9px] uppercase tracking-wider text-text-dim">
                  {m.label}
                </div>
                <div className="font-mono text-xs" style={{ color: project.accent }}>
                  {m.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
