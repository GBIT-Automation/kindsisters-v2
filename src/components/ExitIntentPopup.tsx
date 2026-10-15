'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function ExitIntentPopup() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed this session
    if (dismissed) return;
    if (typeof window === 'undefined') return;

    // Check if already shown this session
    if (sessionStorage.getItem('ks-exit-shown')) return;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger when mouse moves to top of viewport (exit intent)
      if (e.clientY <= 5 && !dismissed) {
        setShow(true);
        sessionStorage.setItem('ks-exit-shown', 'true');
      }
    };

    // Delay adding the listener so it doesn't fire immediately
    const timer = setTimeout(() => {
      document.addEventListener('mouseleave', handleMouseLeave);
    }, 5000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [dismissed]);

  const handleClose = () => {
    setShow(false);
    setDismissed(true);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center bg-[var(--trust)]/60 backdrop-blur-sm p-4"
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="bg-white rounded-2xl shadow-[var(--shadow-lg)] max-w-md w-full p-8 md:p-10 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[var(--earth)] flex items-center justify-center text-[var(--trust-muted)] hover:text-[var(--trust)] transition-colors"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Content */}
            <p className="text-4xl mb-4">💛</p>
            <h3 className="font-[var(--font-dm-serif)] text-2xl md:text-3xl text-[var(--trust)] mb-3">
              Before you go...
            </h3>
            <p className="text-[var(--trust-soft)] leading-relaxed mb-2">
              Right now, a mum in Perth is choosing between buying food or toothpaste for her kids.
            </p>
            <p className="text-[var(--trust)] font-medium leading-relaxed mb-6">
              <strong className="text-[var(--warmth)]">$15</strong> means her child goes to school tomorrow clean, fed and ready to learn.
            </p>

            <Link
              href="/donate"
              className="block w-full rounded-full bg-[var(--kindness)] text-white py-3.5 font-semibold text-lg hover:bg-[var(--kindness-deep)] transition-colors mb-3"
              onClick={handleClose}
            >
              Donate Now
            </Link>

            <button
              onClick={handleClose}
              className="text-sm text-[var(--trust-muted)] hover:text-[var(--trust-soft)] transition-colors"
            >
              Maybe later
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
