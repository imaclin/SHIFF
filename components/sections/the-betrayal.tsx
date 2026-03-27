// components/sections/the-betrayal.tsx
"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function TheBetrayal() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-betrayal" className="section-anchor bg-[var(--color-background)]">
      {/* Split photo panel */}
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-2 h-64 md:h-96"
      >
        {/* Kevin — left */}
        <div className="relative overflow-hidden">
          <Image
            src="/images/koch.jpg"
            alt="Kevin Koch"
            fill
            className="object-cover object-top"
            style={{ filter: "grayscale(0.2) contrast(1.1)" }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
          {/* Divider */}
          <div className="absolute top-0 right-0 bottom-0 w-px bg-black" />
          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
            <p className="font-heading text-[var(--color-gold)] font-bold text-base mb-1">Kevin Koch</p>
            <p className="text-[var(--color-foreground)]/60 text-xs uppercase tracking-widest leading-relaxed">
              Wore the wire.<br />Testified for the FBI.
            </p>
          </div>
        </div>

        {/* Dale — right */}
        <div className="relative overflow-hidden">
          <Image
            src="/images/shiffman.jpg"
            alt="Dale Shiffman"
            fill
            className="object-cover object-top"
            style={{ filter: "grayscale(0.5) contrast(0.9) brightness(0.7)" }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black" />
          {/* Label */}
          <div className="absolute bottom-0 left-0 right-0 p-5 md:p-8">
            <p className="font-heading text-[var(--color-foreground)]/70 font-bold text-base mb-1">Dale Shiffman</p>
            <p className="text-[var(--color-foreground)]/40 text-xs uppercase tracking-widest leading-relaxed">
              111 federal counts.<br />Didn&apos;t know until arrest.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Prose block */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.3 }}
        className="max-w-3xl mx-auto px-8 md:px-16 py-16 md:py-24"
      >
        <span className="stamp mb-8 block w-fit">The Wire</span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-[var(--color-foreground)] mb-4 leading-tight">
          The worst day of Dale&apos;s life<br />was his arrest.
        </h2>
        <p className="text-[var(--color-gold)] font-heading font-bold text-2xl md:text-3xl mb-8">
          The next day was worse.
        </p>
        <p className="text-[var(--color-foreground)]/65 text-lg leading-relaxed font-body max-w-2xl">
          When he found out it was Kevin who wore the wire — Kevin who gave the testimony that sealed his fate — his best friend since childhood. They hadn&apos;t spoken for decades. Until the cameras started rolling.
        </p>
      </motion.div>
    </section>
  );
}
