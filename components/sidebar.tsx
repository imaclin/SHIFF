"use client";

import { useState, useEffect } from "react";
import { SECTIONS, SectionId } from "@/lib/data";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft } from "lucide-react";

export function Sidebar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId>("hero");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id as SectionId);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      {/* Backdrop on mobile */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/60 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <motion.aside
        animate={{ width: open ? 240 : 48 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed left-0 top-0 h-full z-40 flex flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] overflow-hidden"
      >
        {/* Toggle button */}
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center justify-center h-12 w-12 flex-shrink-0 text-[var(--color-gold)] hover:bg-white/5 transition-colors"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>

        {/* Wordmark */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-4 pb-4 font-heading text-[var(--color-gold)] text-xl font-bold tracking-widest uppercase"
            >
              SHIFF
            </motion.div>
          )}
        </AnimatePresence>

        {/* Gold rule */}
        <div className="mx-3 border-t border-[var(--color-gold)]/30" />

        {/* Nav links */}
        <nav className="flex-1 py-4 overflow-y-auto">
          {SECTIONS.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-3 py-2 text-sm transition-colors whitespace-nowrap ${
                active === id
                  ? "text-[var(--color-gold)]"
                  : "text-[var(--color-cream)]/70 hover:text-[var(--color-foreground)]"
              }`}
            >
              {/* Active indicator dot */}
              <span
                className={`flex-shrink-0 w-1.5 h-1.5 rounded-full transition-colors ${
                  active === id ? "bg-[var(--color-gold)]" : "bg-transparent"
                }`}
              />
              <AnimatePresence>
                {open && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </a>
          ))}
        </nav>
      </motion.aside>
    </>
  );
}
