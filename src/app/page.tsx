"use client";

import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Leadership from "@/components/Leadership";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Projects />
        <SectionDivider />
        <Skills />
        {/* <Leadership /> */}
        <SectionDivider />
        <Contact />
      </main>
      <Footer />
    </SmoothScroll>
  );
}

function SectionDivider() {
  return (
    <div className="mx-auto max-w-7xl px-8 py-2 sm:px-12 lg:px-24">
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
