"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type Creator = {
  name: string;
  role: string;
  image: string | null;
  bio: string;
};

export function Creators({ creators }: { creators: Creator[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="creators" className="section-anchor py-24 px-8 md:px-16 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="stamp mb-6 block w-fit">The Team</span>
        <h2 className="font-heading text-5xl md:text-6xl font-bold text-[var(--color-foreground)] mb-16 leading-tight">
          CREATORS &amp;<br />
          <span className="text-[var(--color-gold)]">PRODUCERS</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          {creators.map((person, i) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex gap-6"
            >
              <div className="flex-shrink-0">
                {person.image ? (
                  <div className="relative w-20 h-20 rounded overflow-hidden">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover object-top"
                      style={{ filter: "grayscale(0.2)" }}
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center">
                    <span className="font-heading text-[var(--color-gold)] text-2xl font-bold">
                      {person.name.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              <div>
                <p className="font-heading text-[var(--color-gold)] font-bold text-xl mb-1">{person.name}</p>
                <p className="text-[var(--color-cream)]/50 text-xs uppercase tracking-widest mb-3">{person.role}</p>
                <p className="text-[var(--color-foreground)]/65 text-sm leading-relaxed font-body">{person.bio}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
