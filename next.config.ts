import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

// Only the real public site may be indexed. Anything else (the ks.gbit.au
// review deploy, previews, local) is kept out of search results.
//
// This keys off the site URL rather than a separate flag on purpose: at
// cutover you change NEXT_PUBLIC_SITE_URL to the production domain and
// indexing switches itself on. A standalone NOINDEX flag would have to be
// remembered, and forgetting it in either direction is bad — either the
// review site gets listed, or the live charity site quietly disappears from
// Google.
export const PRODUCTION_SITE_URL = 'https://kindsisters.org.au';
const isProductionSite =
  (process.env.NEXT_PUBLIC_SITE_URL ?? '').replace(/\/$/, '') === PRODUCTION_SITE_URL;

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-Frame-Options',
    value: 'DENY',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'Permissions-Policy',
    value:
      'camera=(), microphone=(), geolocation=(), interest-cohort=(), payment=(self "https://www.zeffy.com")',
  },
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      // www.zeffy.com serves the v2 donation embed script, which injects and
      // auto-sizes the donation iframe. Without it the embed silently falls
      // back to a fixed-height iframe (see ZeffyDonate.tsx).
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.zeffy.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob:",
      "connect-src 'self'",
      // Zeffy donation + newsletter forms are embedded as iframes.
      "frame-src 'self' https://www.zeffy.com",
      "frame-ancestors 'none'",
    ].join('; '),
  },
];

const nextConfig: NextConfig = {
  // Standalone build for VPS deploy (BinaryLane): ships a self-contained
  // server.js with only the traced dependencies. sharp + the sqlite driver are
  // native, so make sure they're traced into the bundle.
  output: 'standalone',
  // Pin the tracing root to this project (a stray lockfile above it otherwise
  // makes Next nest the standalone output under the full path).
  outputFileTracingRoot: projectRoot,
  outputFileTracingIncludes: {
    '/**': ['./node_modules/sharp/**/*', './node_modules/@libsql/**/*'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: isProductionSite
          ? securityHeaders
          : [
              ...securityHeaders,
              // Belt and braces alongside robots.txt and the meta tag. A header
              // covers non-HTML responses (images, PDFs, API routes) that a
              // meta tag cannot reach.
              {
                key: 'X-Robots-Tag',
                value: 'noindex, nofollow, noarchive, nosnippet, noimageindex',
              },
            ],
      },
    ];
  },
};

export default withPayload(nextConfig);
