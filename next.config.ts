import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

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
      "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
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
        headers: securityHeaders,
      },
    ];
  },
};

export default withPayload(nextConfig);
