'use client';

import { useState } from 'react';
import Script from 'next/script';

/**
 * Zeffy embedded donation form.
 *
 * Zeffy is a free donation platform for non-profits (charity keeps 100% of the
 * donation; donors optionally tip Zeffy). It handles amount selection,
 * one-time / monthly frequency, payment (via Stripe underneath) and automatic
 * tax receipts entirely inside its own iframe, so the donor never leaves this
 * page and no card data touches the Kind Sisters site.
 *
 * This uses Zeffy's v2 script embed: the script finds the `data-zeffy-embed`
 * element, injects its own iframe, and resizes it to fit the form. That is what
 * removes the internal scrollbar a fixed-height iframe leaves you with. If the
 * script fails to load we render a plain fixed-height iframe instead, matching
 * the fallback in Zeffy's own snippet.
 *
 * The script host must stay in `script-src` in the CSP (next.config.ts). If it
 * is dropped, the script is blocked, the fallback renders, and the form keeps
 * working but stops auto-sizing — a silent degrade, so check both after any
 * CSP change.
 *
 * The embed URL comes from Jody's Zeffy dashboard (Share -> Embed on the
 * donation form) via NEXT_PUBLIC_ZEFFY_EMBED_URL. NEXT_PUBLIC_* is inlined at
 * build time, so it must be set as a build arg, not only a runtime env var.
 */

const ZEFFY_EMBED_URL = process.env.NEXT_PUBLIC_ZEFFY_EMBED_URL ?? '';
const ZEFFY_SCRIPT_URL = 'https://www.zeffy.com/embed/v2/zeffy-embed.js';

// Applies to the fallback iframe only. The script embed sizes itself.
const FALLBACK_HEIGHT = 450;

/**
 * The script embed takes a path (`/embed/donation-form/...`) while the fallback
 * iframe takes the absolute URL. Derive one from the other so there is a single
 * environment variable to keep correct.
 */
function embedPath(url: string): string {
  try {
    return new URL(url).pathname;
  } catch {
    return '';
  }
}

export default function ZeffyDonate() {
  const [scriptFailed, setScriptFailed] = useState(false);

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
      {scriptFailed ? (
        <div
          className="relative w-full overflow-hidden rounded-[var(--radius-lg)]"
          style={{ height: FALLBACK_HEIGHT }}
        >
          <iframe
            title="Donation form powered by Zeffy"
            src={ZEFFY_EMBED_URL}
            allow="payment"
            className="absolute inset-0 h-full w-full"
            style={{ border: 0 }}
          />
        </div>
      ) : (
        <div
          data-zeffy-embed=""
          data-form-url={embedPath(ZEFFY_EMBED_URL)}
          className="w-full"
        />
      )}

      <Script
        src={ZEFFY_SCRIPT_URL}
        strategy="afterInteractive"
        onError={() => setScriptFailed(true)}
      />
    </div>
  );
}
