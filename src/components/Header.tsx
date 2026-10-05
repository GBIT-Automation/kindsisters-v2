'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import DonateButton from './DonateButton';

const projectLinks = [
  { href: '/projects/essentials-relief-bags', label: 'Essentials Relief Bags' },
  { href: '/projects/womens-community-connect', label: "Women's Community Connect" },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  // Jody (4 Oct 2026): keep the banner stable. The header used to start as a large
  // centred logo and shrink on scroll, which shifted the page; it now stays in the
  // compact layout at all times. Jody (5 Oct 2026): logo bigger now the large
  // version is gone.
  const scrolled = true;
  const [projectsOpen, setProjectsOpen] = useState(false);

  const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects', hasDropdown: true },
    { href: '/events', label: 'Events' },
    { href: '/get-involved', label: 'Get Involved' },
    { href: '/stories', label: 'Stories' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-[var(--shadow-sm)]'
            : 'bg-white'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Compact state: Logo left, nav + donate right */}
          <div
            className="flex items-center justify-between transition-all duration-500 h-20 md:h-28"
            style={{ opacity: scrolled ? 1 : 0, overflow: scrolled ? 'visible' : 'hidden' }}
          >
            {/* Compact Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/kind-sisters-logo.svg"
                alt="Kind Sisters — Creating Space for Community"
                width={304}
                height={157}
                className="h-16 md:h-24 w-auto"
                priority
              />
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={() => setProjectsOpen(true)}
                    onMouseLeave={() => setProjectsOpen(false)}
                  >
                    <Link
                      href={link.href}
                      className="text-[var(--trust)] font-medium hover:text-[var(--kindness)] transition-colors text-sm tracking-wide inline-flex items-center gap-1"
                    >
                      {link.label}
                      <svg className={`w-3.5 h-3.5 transition-transform ${projectsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                    <AnimatePresence>
                      {projectsOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 4 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 4 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full pt-2"
                        >
                          <div className="bg-white rounded-[var(--radius-md)] shadow-[var(--shadow-md)] border border-[var(--border-subtle)] py-2 min-w-[220px]">
                            <Link
                              href="/projects"
                              className="block px-4 py-2 text-sm text-[var(--trust)] hover:bg-[var(--kindness-whisper)] hover:text-[var(--kindness-deep)] transition-colors font-medium"
                            >
                              All Programs
                            </Link>
                            <div className="border-t border-[var(--border-subtle)] my-1" />
                            {projectLinks.map((sub) => (
                              <Link
                                key={sub.href}
                                href={sub.href}
                                className="block px-4 py-2 text-sm text-[var(--trust-soft)] hover:bg-[var(--kindness-whisper)] hover:text-[var(--kindness-deep)] transition-colors"
                              >
                                {sub.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[var(--trust)] font-medium hover:text-[var(--kindness)] transition-colors text-sm tracking-wide"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <DonateButton size="sm" />
            </nav>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-[var(--trust)]"
              aria-label="Toggle navigation"
              aria-expanded={isOpen}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden bg-white border-t border-[var(--border-subtle)]"
            >
              <div className="px-4 py-4 space-y-1">
                {navLinks.map((link) => (
                  <div key={link.href}>
                    <Link
                      href={link.href}
                      onClick={() => { setIsOpen(false); setProjectsOpen(false); }}
                      className="block text-[var(--trust)] font-medium py-2 hover:text-[var(--kindness)] transition-colors"
                    >
                      {link.label}
                    </Link>
                    {link.hasDropdown && (
                      <div className="pl-4 space-y-1">
                        {projectLinks.map((sub) => (
                          <Link
                            key={sub.href}
                            href={sub.href}
                            onClick={() => setIsOpen(false)}
                            className="block text-[var(--trust-soft)] text-sm py-1.5 hover:text-[var(--kindness)] transition-colors"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <DonateButton size="md" className="w-full text-center mt-3" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
