"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function TheShow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="the-show" className="section-anchor py-24 px-8 md:px-16 max-w-5xl mx-auto">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="stamp mb-6 block w-fit">The Show</span>

        <h2 className="font-heading text-5xl md:text-7xl font-bold text-[var(--color-foreground)] mb-10 leading-tight">
          POWDERED<br />
          <span className="text-[var(--color-gold)]">DREAMS</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12 text-[var(--color-foreground)]/80 text-lg leading-relaxed font-body">
          <div className="space-y-5">
            <p>
              <strong className="text-[var(--color-gold)]">SHIFF</strong> is a scripted limited series that tells the true story of Kevin Koch and his best friend Dale Shiffman — two blue-collar Pittsburgh guys whose lives were transformed by their proximity to the city&apos;s biggest baseball heroes.
            </p>
            <p>
              Set in the late &apos;70s and early &apos;80s, at the dawn of the mascot era in sports and the height of cocaine&apos;s grip on America, this series examines how Dale and Kevin and their fellow <strong className="text-[var(--color-foreground)]">&quot;Pittsburgh Cocaine Seven&quot;</strong> became drug-supplying pawns for celebrity athletes up and down the eastern seaboard.
            </p>
          </div>
          <div className="space-y-5">
            <p>
              Until the whole scheme blew up amid a shocking betrayal from within — resulting in a criminal trial that nearly paralyzed the sports world, and turned these local fans into collateral damage.
            </p>
            <blockquote className="border-l-2 border-[var(--color-gold)] pl-6 text-[var(--color-gold)] italic text-xl">
              &quot;It&apos;s a tale of friendship, betrayal, crime and baseball. At its core, a story about fandom.&quot;
            </blockquote>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
