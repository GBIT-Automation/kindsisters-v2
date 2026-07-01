'use client';

import { useState } from 'react';

/**
 * Zeffy embedded newsletter sign-up form.
 *
 * Subscribers submit inside Zeffy's iframe (they never leave the page) and land
 * directly in a Zeffy contact list, which Jody can email campaigns from. This
 * replaces the old /api/newsletter route, which validated and then discarded
 * every submission.
 *
 * The embed URL comes from Jody's Zeffy dashboard once her newsletter form is
 * created (Contacts -> Lists / form -> Share -> Embed). Supplied via the
 * NEXT_PUBLIC_ZEFFY_NEWSLETTER_URL environment variable.
 *
 * TODO: VERIFY — set NEXT_PUBLIC_ZEFFY_NEWSLETTER_URL to the real embed URL Jody
 * sends through. Until then this renders a "coming soon" placeholder.
 */

const ZEFFY_NEWSLETTER_URL = process.env.NEXT_PUBLIC_ZEFFY_NEWSLETTER_URL ?? '';

// Zeffy embed height is fixed (not auto-responsive). Tune once the real form
// exists so there is no internal scrollbar.
const IFRAME_HEIGHT = 650;

export default function ZeffyNewsletter() {
  const [loaded, setLoaded] = useState(false);

  if (!ZEFFY_NEWSLETTER_URL) {
    return (
      <p className="text-trust-soft">
        Our newsletter sign-up is being set up. In the meantime, email{' '}
        <a
          href="mailto:info@kindsisters.org.au?subject=Newsletter%20Signup"
          className="text-kindness hover:text-kindness-deep underline"
        >
          info@kindsisters.org.au
        </a>{' '}
        to stay in the loop.
      </p>
    );
  }

  return (
    <div className="relative max-w-md mx-auto">
      {!loaded && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-[var(--radius-lg)] bg-canvas"
          aria-hidden="true"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border-default)] border-t-kindness" />
        </div>
      )}
      <iframe
        title="Subscribe to the Kind Sisters newsletter"
        src={ZEFFY_NEWSLETTER_URL}
        onLoad={() => setLoaded(true)}
        className="w-full rounded-[var(--radius-lg)] bg-canvas"
        style={{ height: IFRAME_HEIGHT, border: 'none' }}
      />
    </div>
  );
}
