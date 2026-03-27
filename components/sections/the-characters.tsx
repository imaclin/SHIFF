"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type Character = {
  name: string;
  role: string;
  image: string | null;
  bio: string;
};

export function TheCharacters({ characters }: { characters: Character[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const [kevin, dale, ...rest] = characters;

  return (
    <section id="the-characters" className="section-anchor py-24 px-8 md:px-16 max-w-6xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        <span className="stamp mb-6 block w-fit">The Characters</span>
        <h2 className="font-heading text-5xl md:text-6xl font-bold text-[var(--color-foreground)] mb-16 leading-tight">
          THE PARROT &amp;<br />
          <span className="text-[var(--color-gold)]">THE PHOTOGRAPHER</span>
        </h2>

        {/* Kevin and Dale — featured */}
        <div className="grid md:grid-cols-2 gap-10 mb-20">
          {[kevin, dale].map((char) => (
            <div key={char.name} className="flex gap-6">
              {char.image && (
                <div className="relative w-24 h-32 flex-shrink-0 rounded overflow-hidden">
                  <Image
                    src={char.image}
                    alt={char.name}
                    fill
                    className="object-cover object-top"
                    style={{ filter: "grayscale(0.3) contrast(1.1)" }}
                  />
                </div>
              )}
              <div>
                <p className="font-heading text-[var(--color-gold)] font-bold text-xl mb-1">{char.name}</p>
                <p className="text-[var(--color-cream)]/60 text-xs uppercase tracking-widest mb-3">{char.role}</p>
                <p className="text-[var(--color-foreground)]/70 text-sm leading-relaxed font-body">{char.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Cocaine Seven */}
        <h3 className="font-heading text-3xl md:text-4xl font-bold text-[var(--color-foreground)] mb-10">
          THE <span className="text-[var(--color-gold)]">COCAINE SEVEN</span>
        </h3>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {rest.map((char, i) => (
            <motion.div
              key={char.name}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
            >
              <Card className="bg-[var(--color-surface)] border-[var(--color-border)] hover:border-[var(--color-gold)]/40 transition-colors h-full">
                <CardContent className="p-5">
                  <p className="font-heading text-[var(--color-gold)] font-bold text-lg mb-1">{char.name}</p>
                  <p className="text-[var(--color-cream)]/50 text-xs uppercase tracking-widest mb-3">{char.role}</p>
                  <p className="text-[var(--color-foreground)]/65 text-sm leading-relaxed font-body">{char.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
