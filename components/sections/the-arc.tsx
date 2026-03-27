// components/sections/the-arc.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const MILESTONES = [
  {
    year: "1979",
    side: "left" as const,
    dotColor: "bg-[var(--color-gold)]",
    yearColor: "text-[var(--color-gold)]",
    event: "Pirates win the World Series. Kevin Koch debuts as the first-ever Pirate Parrot, transforming overnight into a Steel City celebrity.",
  },
  {
    year: "1980",
    side: "right" as const,
    dotColor: "bg-[var(--color-foreground)]/30",
    yearColor: "text-[var(--color-foreground)]",
    event: "The first gram changes hands. Dale Shiffman finds his way into the Pirates' inner circle — and discovers a faster route to stay there.",
  },
  {
    year: "1983",
    side: "left" as const,
    dotColor: "bg-[var(--color-foreground)]/30",
    yearColor: "text-[var(--color-foreground)]",
    event: "Kevin Connelly arrives in Miami with $40,000 cash. Two kilos. What started as backstage access has gone fully national.",
  },
  {
    year: "1984",
    side: "right" as const,
    dotColor: "bg-[var(--color-foreground)]/30",
    yearColor: "text-[var(--color-foreground)]",
    event: "Rod Scurry collapses in the bullpen from cocaine-induced psychosis. The FBI opens its investigation into the Pittsburgh drug ring.",
  },
  {
    year: "1985",
    side: "left" as const,
    dotColor: "bg-red-600",
    yearColor: "text-red-500",
    event: "Kevin wears the wire. Dale is arrested. The trial begins — 20+ players called to testify, the sports world paralyzed. Seven fans pay the price.",
  },
] as const;

export function TheArc() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-arc" className="section-anchor py-24 px-8 md:px-16 max-w-5xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="stamp mb-6 block w-fit">The Arc</span>
        <h2 className="font-heading text-5xl md:text-6xl font-bold text-[var(--color-foreground)] mb-16 leading-tight">
          RISE AND<br />
          <span className="text-[var(--color-gold)]">FALL</span>
        </h2>

        {/* Timeline */}
        <div className="relative">
          {/* Spine — fades from gold to red */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background: "linear-gradient(to bottom, #FDB827 0%, #888 50%, #dc2626 100%)",
            }}
          />

          <div className="space-y-12">
            {MILESTONES.map((m, i) => (
              <motion.div
                key={m.year}
                initial={{ opacity: 0, x: m.side === "left" ? -30 : 30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.12 }}
                className={`relative flex ${m.side === "left" ? "justify-end pr-[calc(50%+28px)]" : "justify-start pl-[calc(50%+28px)]"}`}
              >
                {/* Dot on spine */}
                <div
                  className={`absolute top-1.5 w-3 h-3 rounded-full ${m.dotColor} border-2 border-[var(--color-background)]`}
                  style={{ left: "calc(50% - 6px)" }}
                />

                <div className={m.side === "left" ? "text-right" : "text-left"}>
                  <div className={`font-heading text-2xl font-bold ${m.yearColor} mb-1`}>
                    {m.year}
                  </div>
                  <p className="text-[var(--color-foreground)]/65 text-sm leading-relaxed font-body max-w-xs">
                    {m.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
