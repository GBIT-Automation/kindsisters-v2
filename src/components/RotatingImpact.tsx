'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const lines = [
  { text: 'Every donation.', color: 'var(--warmth)' },
  { text: 'Every volunteer hour.', color: 'var(--relief)' },
  { text: 'Every act of kindness.', color: 'var(--kindness)' },
  { text: 'Creates hope within our community.', color: 'var(--trust)' },
];

export default function RotatingImpact() {
  const ref = useRef<HTMLDivElement>(null);
  // Start the reveal only once the block is actually on screen, so a visitor
  // always sees it play from the first line rather than catching it mid-way.
  const inView = useInView(ref, { once: true, margin: '-120px' });
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (visibleCount >= lines.length) return; // fully revealed — leave it

    const timer = setTimeout(() => {
      setVisibleCount((prev) => prev + 1);
    }, 800);

    return () => clearTimeout(timer);
  }, [inView, visibleCount]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center gap-3 md:gap-4 min-h-[280px] md:min-h-[320px] justify-center"
    >
      {lines.map((line, i) => (
        <motion.p
          key={line.text}
          initial={{ opacity: 0, y: 15 }}
          animate={i < visibleCount ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="font-[var(--font-dm-serif)] text-3xl md:text-5xl lg:text-6xl text-center font-bold"
          style={{ color: line.color }}
        >
          {line.text}
        </motion.p>
      ))}
    </div>
  );
}
