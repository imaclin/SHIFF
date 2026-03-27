// components/sections/the-numbers.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function TheNumbers() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-numbers" className="section-anchor py-24 bg-[var(--color-surface)]">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp mb-10 block w-fit">The Injustice in Numbers</span>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
            {/* Top left — 111 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-[var(--color-background)] p-10"
            >
              <div className="font-heading text-7xl md:text-8xl font-bold text-[var(--color-gold)] leading-none mb-4">
                111
              </div>
              <div className="text-[var(--color-foreground)]/50 text-xs uppercase tracking-widest leading-relaxed">
                Federal drug trafficking counts<br />against Dale Shiffman — one fan
              </div>
            </motion.div>

            {/* Top right — 20+ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-[var(--color-background)] p-10"
            >
              <div className="font-heading text-7xl md:text-8xl font-bold text-[var(--color-foreground)] leading-none mb-4">
                20+
              </div>
              <div className="text-[var(--color-foreground)]/50 text-xs uppercase tracking-widest leading-relaxed">
                MLB players called to testify<br />under oath at federal trial
              </div>
            </motion.div>

            {/* Bottom full-width — 0 in gold */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="md:col-span-2 bg-[var(--color-gold)] p-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6"
            >
              <div>
                <div className="font-heading text-7xl md:text-8xl font-bold text-black leading-none mb-4">
                  0
                </div>
                <div className="text-black/70 text-xs uppercase tracking-widest font-bold">
                  Player suspensions handed down
                </div>
              </div>
              <p className="text-black/80 text-lg md:text-xl italic font-body md:text-right md:max-w-xs leading-relaxed">
                &ldquo;The players walked.<br />The fans went to prison.&rdquo;
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
