"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink } from "lucide-react";

type MediaLink = {
  source: string;
  label: string;
  url: string;
};

export function Media({ links }: { links: MediaLink[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="media" className="section-anchor py-24 bg-[var(--color-surface)]">
      <div className="max-w-4xl mx-auto px-8 md:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp mb-6 block w-fit">Source Material</span>
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-[var(--color-foreground)] mb-16 leading-tight">
            MEDIA &amp;<br />
            <span className="text-[var(--color-gold)]">PRESS COVERAGE</span>
          </h2>

          <div className="divide-y divide-[var(--color-border)]">
            {links.map((link, i) => (
              <motion.a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: -10 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="group flex items-start justify-between gap-6 py-5 hover:bg-white/[0.02] -mx-4 px-4 rounded transition-colors"
              >
                <div>
                  <p className="text-[var(--color-cream)]/50 text-xs uppercase tracking-widest mb-1">{link.source}</p>
                  <p className="text-[var(--color-foreground)]/85 font-body group-hover:text-[var(--color-gold)] transition-colors">{link.label}</p>
                </div>
                <ExternalLink size={16} className="flex-shrink-0 text-[var(--color-cream)]/30 group-hover:text-[var(--color-gold)] transition-colors mt-1" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
