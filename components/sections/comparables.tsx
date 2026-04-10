"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type Comparable = {
  title: string;
  year: string;
  type: string;
  image: string;
};

export function Comparables({ comparables }: { comparables: Comparable[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="comparables" className="section-anchor py-24 px-8 md:px-16 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="stamp mb-6 block w-fit">Show Cross</span>
        <h2 className="font-heading text-5xl md:text-6xl font-bold text-[var(--color-foreground)] mb-4 leading-tight">
          IN THE SPIRIT OF
        </h2>
        <p className="text-[var(--color-foreground)]/60 text-lg mb-16 font-body max-w-2xl">
          Highly stylized, wildly popular. SHIFF is fueled by the same authenticity: a true story bigger than anything Hollywood could invent.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {comparables.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group"
            >
              <div className="relative aspect-[2/3] rounded overflow-hidden mb-3 border border-[var(--color-border)] group-hover:border-[var(--color-gold)]/50 transition-colors">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <p className="font-heading text-[var(--color-gold)] font-bold text-sm">{item.title}</p>
              <p className="text-[var(--color-cream)]/50 text-xs uppercase tracking-widest">{item.type} | {item.year}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
