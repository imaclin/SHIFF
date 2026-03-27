"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function TheEra() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-era" className="section-anchor py-24 bg-[var(--color-surface)]">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-2 gap-16 items-center"
        >
          {/* Text */}
          <div>
            <span className="stamp mb-6 block w-fit">The Backdrop</span>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-6 leading-tight">
              70s &amp; 80s Era Sports,<br />
              <span className="text-[var(--color-gold)]">Drugs &amp; Nightlife</span><br />
              of Baseball&apos;s Worst Scandal
            </h2>
            <div className="space-y-4 text-[var(--color-foreground)]/75 text-lg leading-relaxed font-body">
              <p>
                The 1979 World Champion Pittsburgh Pirates were gods-among-men to the adoring fans of Steel City. In the pre-internet era, star players were cloaked in impenetrable coolness and mystery. To get into their inner circle meant to walk among titans.
              </p>
              <p>
                And thus, their fans gladly broke the law for a taste of that life.
              </p>
              <p>
                What began as backstage access would spiral into a federal drug conspiracy stretching from Pittsburgh to Miami — and a criminal trial that rocked the foundation of American sports forever.
              </p>
            </div>
          </div>

          {/* Photo collage */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative aspect-square rounded overflow-hidden col-span-2">
              <Image
                src="/images/hero-celebration.jpg"
                alt="1979 Pirates World Series celebration"
                fill
                className="object-cover object-center"
                style={{ filter: "grayscale(0.4) contrast(1.1)" }}
              />
            </div>
            <div className="relative aspect-square rounded overflow-hidden">
              <Image
                src="/images/parrot-crowd.jpg"
                alt="Pirate Parrot with crowd"
                fill
                className="object-cover"
                style={{ filter: "grayscale(0.3)" }}
              />
            </div>
            <div className="relative aspect-square rounded overflow-hidden">
              <Image
                src="/images/cocaine-home-plate.jpg"
                alt="Evidence"
                fill
                className="object-cover"
                style={{ filter: "sepia(0.5) contrast(1.2)" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
