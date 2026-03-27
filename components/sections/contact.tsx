"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="section-anchor py-32 bg-[var(--color-surface)] border-t border-[var(--color-border)]">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="max-w-2xl mx-auto px-8 text-center"
      >
        <h2 className="font-heading text-6xl md:text-8xl font-bold text-[var(--color-gold)] mb-6 tracking-tight">
          SHIFF
        </h2>
        <p className="text-[var(--color-cream)]/50 uppercase tracking-widest text-sm mb-8">
          A Scripted Limited Series
        </p>
        <div className="border-t border-[var(--color-border)] pt-8">
          <p className="text-[var(--color-foreground)]/50 text-sm mb-3">For inquiries</p>
          <a
            href="mailto:jakeshiffman@gmail.com"
            className="font-heading text-[var(--color-gold)] text-xl hover:text-[var(--color-foreground)] transition-colors"
          >
            jakeshiffman@gmail.com
          </a>
        </div>
      </motion.div>
    </section>
  );
}
