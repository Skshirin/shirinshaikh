"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useRef } from "react";
import { use3DTilt } from "@/hooks/use3DTilt";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  }),
};

const interests = [
  { icon: "{ }", label: "Coding" },
  { icon: "AI", label: "Artificial Intelligence" },
  { icon: "Pr", label: "Problem Solving" },
  { icon: "Wd", label: "Web Dev" },
  { icon: "Cl", label: "Continuous Learning" },
];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const sectionRef = useRef<HTMLElement>(null);
  const tilt = use3DTilt(6, 1.01);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 60, damping: 30 };
  const cardY = useSpring(useTransform(scrollYProgress, [0, 1], [60, -40]), springConfig);
  const textY = useSpring(useTransform(scrollYProgress, [0, 1], [30, -20]), springConfig);

  return (
    <section id="about" className="relative py-28 md:py-36" ref={(el) => {
      ref(el);
      (sectionRef as React.MutableRefObject<HTMLElement | null>).current = el;
    }}>
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
          <span className="font-mono text-sm text-accent">01.</span>
          <span className="font-display text-4xl tracking-wider md:text-5xl">ABOUT ME</span>
          <span className="hidden h-[1px] flex-1 bg-border md:block" />
        </motion.div>

        <div className="grid gap-16 lg:grid-cols-5">
          {/* Left column: text with subtle parallax */}
          <motion.div className="lg:col-span-3" style={{ y: textY }}>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={1}
              className="text-lg leading-relaxed text-text-muted"
            >
             I&apos;m a passionate Web Developer focused on building modern, responsive, and user-friendly web applications. I primarily work with{" "}
<span className="text-accent">React</span>,{" "}
<span className="text-accent">Next.js</span>,{" "}
<span className="text-accent">JavaScript</span>, and{" "}
<span className="text-accent">WordPress</span>, and I&apos;m continuously learning new technologies to improve my development skills.
</motion.p>

<motion.p
  variants={fadeUp}
  initial="hidden"
  animate={inView ? "visible" : "hidden"}
  custom={2}
  className="mt-6 text-lg leading-relaxed text-text-muted"
>
  I have hands-on experience through real-world projects and a{" "}
  <span className="text-text-primary">WordPress Internship</span>, where I built and customized websites while focusing on performance and user experience.
</motion.p>

<motion.p
  variants={fadeUp}
  initial="hidden"
  animate={inView ? "visible" : "hidden"}
  custom={3}
  className="mt-6 text-lg leading-relaxed text-text-muted"
>
  I enjoy building practical projects, exploring new tools, and continuously improving as a developer. In my free time, I like coding, learning new technologies, and building side projects.
</motion.p>

            {/* Interests */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={4}
              className="mt-10 flex flex-wrap gap-3"
            >
              {interests.map((item, i) => (
                <motion.div
                  key={item.label}
                  className="group flex items-center gap-2 rounded-lg border border-border/60 bg-surface/50 px-4 py-2.5 backdrop-blur-sm transition-all duration-300 hover:border-accent/30 hover:bg-accent-dim"
                  whileHover={{ y: -2, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  initial={{ opacity: 0, y: 15 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  // @ts-expect-error - custom delay
                  transitionDelay={`${0.6 + i * 0.08}s`}
                >
                  <span className="font-mono text-xs text-accent">{item.icon}</span>
                  <span className="text-sm text-text-muted transition-colors group-hover:text-text-primary">
                    {item.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right column: 3D tilt info card */}
          <motion.div className="lg:col-span-2" style={{ y: cardY }}>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={2}
            >
              <div
                ref={tilt.ref}
                onMouseMove={tilt.handleMouseMove}
                onMouseLeave={tilt.handleMouseLeave}
                className="glass-card relative overflow-hidden p-8"
                style={tilt.style}
              >
                {/* Tilt glare overlay */}
                <div className="tilt-glare" style={tilt.glareStyle} />

                {/* Terminal-style header */}
                <div className="relative z-10 mb-6 flex items-center gap-2 border-b border-border/40 pb-4">
                  <div className="h-3 w-3 rounded-full bg-[#FF5F57] shadow-[0_0_6px_rgba(255,95,87,0.3)]" />
                  <div className="h-3 w-3 rounded-full bg-[#FFBD2E] shadow-[0_0_6px_rgba(255,189,46,0.3)]" />
                  <div className="h-3 w-3 rounded-full bg-[#28C840] shadow-[0_0_6px_rgba(40,200,64,0.3)]" />
                  <span className="ml-3 font-mono text-xs text-text-dim">about.json</span>
                </div>

                <div className="relative z-10 font-mono text-sm leading-loose">
                  <span className="text-text-dim">{"{"}</span>
                  <br />
                  <span className="ml-4 text-accent">&quot;name&quot;</span>
                  <span className="text-text-dim">: </span>
                  <span className="text-[#A8DB80]">&quot; Shirin Shaikh &quot;</span>
                  <span className="text-text-dim">,</span>
                  <br />
                  <span className="ml-4 text-accent">&quot;location&quot;</span>
                  <span className="text-text-dim">: </span>
                  <span className="text-[#A8DB80]">&quot;Mumbai, India&quot;</span>
                  <span className="text-text-dim">,</span>
                  <br />
                  <span className="ml-4 text-accent">&quot;role&quot;</span>
                  <span className="text-text-dim">: </span>
                  <span className="text-[#A8DB80]">&quot;WordPress developer Intern&quot;</span>
                  <span className="text-text-dim">,</span>
                  <br />
                  <span className="ml-4 text-accent">&quot;company&quot;</span>
                  <span className="text-text-dim">: </span>
                  <span className="text-[#A8DB80]">&quot;Gema Pvt. Ltd.&quot;</span>
                  <span className="text-text-dim">,</span>
                  <br />
                  <span className="ml-4 text-accent">&quot;education&quot;</span>
                  <span className="text-text-dim">: </span>
                  <span className="text-[#A8DB80]">&quot;B.E. Computer Engg.&quot;</span>
                  <span className="text-text-dim">,</span>
                  <br />
                  <span className="ml-4 text-accent">&quot;cgpa&quot;</span>
                  <span className="text-text-dim">: </span>
                  <span className="text-[#D19A66]">9.0</span>
                  <span className="text-text-dim">,</span>
                  <br />
                  <span className="ml-4 text-accent">&quot;available&quot;</span>
                  <span className="text-text-dim">: </span>
                  <span className="text-[#56B6C2]">true</span>
                  <br />
                  <span className="text-text-dim">{"}"}</span>
                </div>
              </div>
            </motion.div>

            {/* Certifications — with subtle hover lift */}
            {/* <motion.div
              variants={fadeUp}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              custom={3}
              className="mt-4"
            >
              <motion.div
                className="glass-card p-6"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-text-dim">
                  Certifications
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-accent" />
                    <div>
                      <p className="text-sm text-text-primary">Machine Learning Specialization</p>
                      <p className="font-mono text-xs text-text-dim">Stanford / Coursera</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-accent" />
                    <div>
                      <p className="text-sm text-text-primary">Azure Serverless Functions & Logic Apps</p>
                      <p className="font-mono text-xs text-text-dim">Microsoft</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div> */}
          </motion.div>
        </div>
      </div>
    </section>
  
  );
}
