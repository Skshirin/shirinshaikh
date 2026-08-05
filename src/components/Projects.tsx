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
    title: "Factify",
    subtitle: "Fake News & Hate Speech Detection System",
    description:
      "A research-driven AI application that detects fake news and hate speech across text, images, videos, and URLs using multimodal machine learning techniques.",
    longDesc:
      "Built a multimodal detection pipeline using PyTesseract OCR, Whisper ASR, and transformer-based NLP. Evaluated multiple models with DistilBERT achieving 96.5% accuracy. Research accepted and published at MICA 2025 (Springer).",
    tech: ["Python", "Transformers", "DistilBERT", "PyTesseract", "Whisper", "MoviePy", "NLP", "OCR"],
    metrics: [
      { label: "Accuracy", value: "96.5% DistilBERT" },
      { label: "Publication", value: "MICA 2025" },
      { label: "Multi-Modal AI", value: "OCR + ASR" },
    ],
    accent: "#FF6B6B",
    featured: true,
    github: "https://github.com/Skshirin/factify",
  },
  {
    title: "Ransomware CTI Platform",
    subtitle: "ML & Blockchain Threat Intel",
    description:
      "An AI-powered ransomware intelligence platform and Cyber Threat Intelligence (CTI) dashboard for malware intelligence collection and IOC analysis.",
    longDesc:
      "Monitors endpoint behavior via Sysmon, scores events with XGBoost (ROC-AUC 0.9956, F1 0.9614), auto-generates CTI reports, and publishes integrity hashes to the Polygon Amoy blockchain.",
    tech: ["Next.js", "Node.js", "Express", "TypeScript", "MongoDB", "FastAPI", "Python", "Docker", "Hardhat", "Solidity", "Polygon", "Tailwind CSS"],
    metrics: [
      { label: "AI Analysis", value: "XGBoost (ROC 0.99)" },
      { label: "Blockchain Verified", value: "Polygon Amoy" },
      { label: "Architecture", value: "Modular Services" },
    ],
    accent: "#A855F7",
    featured: true,
    github: "https://github.com/Skshirin/ransomshield-cti",
  },
  {
    title: "EvoCart",
    subtitle: "E-commerce Platform",
    description:
      "A production-grade e-commerce platform with a scalable backend, secure authentication, Stripe payments, and AI-powered product discovery.",
    longDesc:
      "Designed RESTful backend APIs with role-based access control and advanced filtering. Integrated the Stripe payment gateway with webhook handling for automated updates and stock management.",
    tech: ["Node.js", "Express.js", "PostgreSQL", "Stripe", "REST APIs", "JWT"],
    metrics: [
      { label: "Database", value: "PostgreSQL" },
      { label: "Payments", value: "Stripe Webhooks" },
      { label: "Discovery", value: "AI Powered" },
    ],
    accent: "#CCFF00",
    featured: true,
    github: "https://github.com/Skshirin/AI-Driven-E-Commerce-Platform",
  },
  {
    title: "AI Chat Dashboard",
    subtitle: "Multi-turn AI Chat Application",
    description:
      "A full-stack AI chatbot dashboard supporting multiple AI personas, conversation history, secure JWT authentication, and dynamically switchable personas.",
    longDesc:
      "Implements JWT access tokens and rotating HTTP-only refresh tokens. Features persistent multi-turn conversations stored in MongoDB and powered by Google's Gemini API.",
    tech: ["React", "Vite", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB Atlas", "Google Gemini API", "JWT"],
    metrics: [
      { label: "AI Chat", value: "Multi-Turn Gemini" },
      { label: "Personas", value: "4 Switchable" },
      { label: "JWT Auth", value: "Rotating Tokens" },
    ],
    accent: "#00D4FF",
    featured: false,
    github: "https://github.com/Skshirin/AI-Chat-Dashboard",
  },
  {
    title: "ChemScan",
    subtitle: "Harmful Ingredient Detection System",
    description:
      "An AI-powered mobile application designed for classification of harmful food and cosmetic ingredients, achieving 97% accuracy on 30,000+ samples.",
    longDesc:
      "Integrates real-time ingredient scanning into a React Native app with OCR in 3–5 seconds, deploying the DistilBERT classifier via Hugging Face Inference API.",
    tech: ["React Native", "DistilBERT", "NLP", "Hugging Face", "OCR", "PyTorch"],
    metrics: [
      { label: "Accuracy", value: "97% DistilBERT" },
      { label: "OCR Scan", value: "3-5 Seconds" },
      { label: "Analysis", value: "Personalized Risk" },
    ],
    accent: "#FF6B35",
    featured: false,
    github: "https://github.com/Skshirin/ingredients-hazard-detection",
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
  github?: string;
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

              <div className="flex items-center gap-3.5">
                <h3 className="font-display text-4xl tracking-wider text-text-primary transition-colors duration-300 group-hover:text-accent md:text-5xl">
                  {project.title}
                </h3>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-dim hover:text-accent transition-colors mt-2"
                    data-cursor-hover
                    aria-label="GitHub Repository"
                  >
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                    </svg>
                  </a>
                )}
              </div>
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
          <div className="flex items-center gap-2.5">
            <h4 className="font-display text-2xl tracking-wider text-text-primary transition-colors group-hover:text-accent">
              {project.title}
            </h4>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-text-dim hover:text-accent transition-colors mt-0.5"
                data-cursor-hover
                aria-label="GitHub Repository"
              >
                <svg className="h-4.5 w-4.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
            )}
          </div>
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
