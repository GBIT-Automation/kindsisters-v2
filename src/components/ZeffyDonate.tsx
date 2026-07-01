'use client';

import { useState } from 'react';

/**
 * Zeffy embedded donation form.
 *
 * Zeffy is a free donation platform for non-profits (charity keeps 100% of the
 * donation; donors optionally tip Zeffy). It handles amount selection,
 * one-time / monthly frequency, payment (via Stripe underneath) and automatic
 * tax receipts entirely inside its own iframe, so the donor never leaves this
 * page and no card data touches the Kind Sisters site.
 *
 * The embed URL comes from Jody's Zeffy dashboard once her account is verified
 * (Share -> Embed on the donation form). It is supplied via the
 * NEXT_PUBLIC_ZEFFY_EMBED_URL environment variable.
 *
 * TODO: VERIFY — set NEXT_PUBLIC_ZEFFY_EMBED_URL to the real embed URL Jody
 * sends through. Until then this renders a "coming soon" placeholder.
 */

const ZEFFY_EMBED_URL = process.env.NEXT_PUBLIC_ZEFFY_EMBED_URL ?? '';

// Zeffy embed height is fixed (not auto-responsive). Tune this once the real
// form exists so there is no internal scrollbar on desktop.
const IFRAME_HEIGHT = 1100;

export default function ZeffyDonate() {
  const [loaded, setLoaded] = useState(false);

  if (!ZEFFY_EMBED_URL) {
    return (
      <div className="rounded-[var(--radius-lg)] border-2 border-dashed border-[var(--border-default)] bg-canvas p-10 text-center">
        <p className="text-4xl mb-4">💛</p>
        <h3 className="font-serif text-2xl text-trust mb-3">
          Our secure donation form is on its way
        </h3>
        <p className="text-trust-soft max-w-md mx-auto">
          We&apos;re setting up a new donation experience where 100% of your gift
          reaches Kind Sisters. In the meantime, please{' '}
          <a
            href="mailto:info@kindsisters.org.au?subject=Donation%20Enquiry"
            className="text-kindness hover:text-kindness-deep underline"
          >
            get in touch
          </a>{' '}
          to give.
        </p>
      </div>
    );
  }

  return (
    <div className="relative">
      {!loaded && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-[var(--radius-lg)] bg-canvas"
          aria-hidden="true"
        >
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--border-default)] border-t-kindness" />
        </div>
      )}
      <iframe
        title="Donate to Kind Sisters"
        src={ZEFFY_EMBED_URL}
        onLoad={() => setLoaded(true)}
        allow="payment"
        className="w-full rounded-[var(--radius-lg)] bg-canvas"
        style={{ height: IFRAME_HEIGHT, border: 'none' }}
      />
    </div>
  );
}
