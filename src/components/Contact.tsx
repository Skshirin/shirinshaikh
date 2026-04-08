"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  }),
};

const socials = [
  {
    label: "Email",
    value: "skshirin007@gmail.com",
    href: "mailto:skshirin007@gmail.com",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/shirinshaikh-dev",
    href: "https://www.linkedin.com/in/shirinshaikh-dev/",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/Skshirin",
    href: "https://github.com/Skshirin",
    icon: (
      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    ),
  },
  {
    label: "Phone",
    value: "+91-9324171547",
    href: "tel:+919324171547",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
      </svg>
    ),
  },
];

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 60, damping: 30 };
  const headingY = useSpring(useTransform(scrollYProgress, [0, 1], [50, -30]), springConfig);
  const cardsY = useSpring(useTransform(scrollYProgress, [0, 1], [30, -20]), springConfig);

  return (
    <section
      id="contact"
      className="relative py-28 md:py-36"
      ref={(el) => {
        ref(el);
        (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
      }}
    >
      <div className="hero-gradient absolute inset-0 rotate-180" />
      <div className="relative z-10 mx-auto max-w-7xl px-8 sm:px-12 lg:px-24">
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          custom={0}
          className="mb-16 flex items-center gap-4"
        >
          <span className="font-mono text-sm text-accent">05.</span>
          <span className="font-display text-4xl tracking-wider md:text-5xl">CONTACT</span>
          <span className="hidden h-[1px] flex-1 bg-border md:block" />
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left: CTA with 3D perspective text */}
          <motion.div style={{ y: headingY }}>
            <motion.h3
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              className="font-display text-4xl leading-tight tracking-wider sm:text-5xl md:text-7xl"
              style={{ perspective: "800px" }}
            >
              <motion.span
                className="block"
                initial={{ opacity: 0, rotateX: -30, y: 40 }}
                animate={inView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
                transition={{ delay: 0.2, duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
                style={{ transformOrigin: "bottom left" }}
              >
                LET&apos;S BUILD
              </motion.span>
              <motion.span
                className="block text-stroke transition-all duration-500"
                initial={{ opacity: 0, rotateX: -30, y: 40 }}
                animate={inView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
                transition={{ delay: 0.35, duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
                style={{ transformOrigin: "bottom left" }}
              >
                SOMETHING
              </motion.span>
              <motion.span
                className="block text-accent glow-text"
                initial={{ opacity: 0, rotateX: -30, y: 40 }}
                animate={inView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
                transition={{ delay: 0.5, duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
                style={{ transformOrigin: "bottom left" }}
              >
                GREAT
              </motion.span>
            </motion.h3>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={2}
              className="mt-8 max-w-md text-lg leading-relaxed text-text-muted"
            >
              I&apos;m currently seeking web development internship or entry-level
              opportunities where I can apply my skills and continue learning.
              Whether you have a question or just want to connect, my inbox is always open.
            </motion.p>

            <motion.a
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={3}
              href="mailto:skshirin007@gmail.com"
              className="magnetic-btn mt-10 inline-block border border-accent bg-accent px-10 py-5 font-mono text-sm uppercase tracking-[0.2em] text-background transition-all"
              data-cursor-hover
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Say Hello</span>
            </motion.a>
          </motion.div>

          {/* Right: links with staggered 3D entrance */}
          <motion.div className="flex flex-col justify-center" style={{ y: cardsY }}>
            <div className="space-y-4">
              {socials.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target={social.label !== "Email" && social.label !== "Phone" ? "_blank" : undefined}
                  rel={social.label !== "Email" && social.label !== "Phone" ? "noopener noreferrer" : undefined}
                  initial={{ opacity: 0, x: 40, rotateY: -8 }}
                  animate={inView ? { opacity: 1, x: 0, rotateY: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.12, duration: 0.6, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }}
                  whileHover={{ x: 6, scale: 1.01 }}
                  className="group flex items-center gap-6 glass-card p-5 transition-all duration-500"
                  data-cursor-hover
                  style={{ perspective: "600px" }}
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-border/60 bg-surface/50 text-text-dim transition-all duration-300 group-hover:border-accent group-hover:bg-accent/5 group-hover:text-accent group-hover:shadow-[0_0_12px_rgba(204,255,0,0.15)]">
                    {social.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim">
                      {social.label}
                    </div>
                    <div className="mt-1 truncate text-sm text-text-muted transition-colors group-hover:text-text-primary">
                      {social.value}
                    </div>
                  </div>
                  <svg
                    className="h-4 w-4 shrink-0 text-text-dim transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                  </svg>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
