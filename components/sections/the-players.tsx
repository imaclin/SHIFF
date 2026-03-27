"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

type Player = {
  name: string;
  number: string;
  image: string | null;
  bio: string;
};

export function ThePlayers({ players }: { players: Player[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-players" className="section-anchor py-24 bg-[var(--color-surface)]">
      <div className="max-w-6xl mx-auto px-8 md:px-16">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <span className="stamp mb-6 block w-fit">The Players</span>
          <h2 className="font-heading text-5xl md:text-6xl font-bold text-[var(--color-foreground)] mb-4 leading-tight">
            THE PITTSBURGH<br />
            <span className="text-[var(--color-gold)]">PIRATE PLAYERS</span>
          </h2>
          <p className="text-[var(--color-foreground)]/60 text-lg mb-16 font-body max-w-2xl">
            The 1979 World Champions were gods-among-men to the adoring fans of Steel City. Their fans gladly <strong className="text-[var(--color-foreground)]">broke the law</strong> for a taste of that life.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {players.map((player, i) => (
              <motion.div
                key={player.name}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="bg-[var(--color-background)] border-[var(--color-border)] hover:border-[var(--color-gold)]/40 transition-colors overflow-hidden">
                  {player.image && (
                    <div className="relative aspect-[3/4] w-full">
                      <Image
                        src={player.image}
                        alt={player.name}
                        fill
                        className="object-cover object-top"
                        style={{ filter: "grayscale(0.2) contrast(1.1) sepia(0.1)" }}
                      />
                      {/* Baseball card number badge */}
                      <div className="absolute top-2 right-2 w-8 h-8 rounded-full bg-[var(--color-gold)] flex items-center justify-center">
                        <span className="text-black font-heading font-bold text-xs">{player.number}</span>
                      </div>
                    </div>
                  )}
                  <CardContent className="p-4">
                    <p className="font-heading text-[var(--color-gold)] font-bold text-base mb-2">{player.name}</p>
                    <p className="text-[var(--color-foreground)]/65 text-xs leading-relaxed font-body">{player.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <p className="text-[var(--color-cream)]/50 text-sm font-body">
            During the trial, <strong className="text-[var(--color-foreground)]/70">over 20 professional baseball players</strong> were called to testify. Not a single game suspension was handed to any player. The seven fans received over 30 years collectively in federal prison.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
