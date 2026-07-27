# syntax=docker/dockerfile:1

# Kind Sisters v2 — Next.js 16 + Payload CMS 3 (SQLite).
# Multi-stage build producing the standalone Next server for the GBIT apps box
# (gbit-apps-prod-per, deployed via Coolify).
#
# Debian slim, not Alpine: sharp and @libsql/client ship glibc native binaries.

ARG NODE_VERSION=22.19.0

# ---- deps ------------------------------------------------------------------
FROM node:${NODE_VERSION}-slim AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- builder ---------------------------------------------------------------
FROM node:${NODE_VERSION}-slim AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Payload evaluates payload.config.ts during `next build`, so these must be set
# or the build aborts. The database here is a throwaway inside the build layer.
# The real one lives on the mounted volume at runtime.
ENV DATABASE_URL="file:/tmp/build.db"

# Opt this build into running Payload migrations on connect. Gated by an
# explicit flag so a developer's local `npm run build` never runs migrations
# against their push-managed dev database. See payload.config.ts.
ENV PAYLOAD_RUN_MIGRATIONS=true

# No default: Coolify supplies this as a build arg. Leaving it unset fails the
# build loudly rather than baking a guessable value into the image.
ARG PAYLOAD_SECRET
ENV PAYLOAD_SECRET=$PAYLOAD_SECRET

# NEXT_PUBLIC_* are inlined into the client bundle at build time. In Coolify
# these must be build args with "Available at Buildtime" ticked, or the browser
# bundle ships empty strings and the Zeffy iframes render blank.
ARG NEXT_PUBLIC_ZEFFY_EMBED_URL
ENV NEXT_PUBLIC_ZEFFY_EMBED_URL=$NEXT_PUBLIC_ZEFFY_EMBED_URL
ARG NEXT_PUBLIC_ZEFFY_NEWSLETTER_URL
ENV NEXT_PUBLIC_ZEFFY_NEWSLETTER_URL=$NEXT_PUBLIC_ZEFFY_NEWSLETTER_URL
ARG NEXT_PUBLIC_SITE_URL="https://ks.gbit.au"
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- runner ----------------------------------------------------------------
FROM node:${NODE_VERSION}-slim AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Default points at the volume mount, so a deploy that forgets to set
# DATABASE_URL still writes to persistent storage rather than silently losing
# Jody's content on the next redeploy.
ENV DATABASE_URL="file:/data/kindsisters.db"

# Apply pending migrations when the container starts, so a fresh volume gets
# its schema and an upgraded image applies any new migration on boot.
ENV PAYLOAD_RUN_MIGRATIONS=true

COPY --from=builder --chown=node:node /app/.next/standalone ./
COPY --from=builder --chown=node:node /app/.next/static ./.next/static
COPY --from=builder --chown=node:node /app/public ./public

# Volume mount points, created and owned by node up front. Coolify bind mounts
# arrive root-owned otherwise, which locks the app out of writing uploads.
RUN mkdir -p /data /app/public/media/gallery \
 && chown -R node:node /data /app/public/media

USER node
EXPOSE 3000

CMD ["node", "server.js"]
