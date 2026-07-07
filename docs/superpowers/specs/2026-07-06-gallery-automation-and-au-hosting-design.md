# Kind Sisters — Gallery Automation + Australian Hosting

> **SUPERSEDED (2026-07-07)** by `2026-07-07-self-editable-cms-payload-au-hosting-design.md`.
> This SharePoint photo-sync automation solved only the gallery, via a back door, and did not
> meet the agreed requirement that Kind Sisters staff self-edit Blogs, Gallery, and Events
> without relying on GBIT. Replaced by a self-hosted Payload CMS. Kept for history.

Design doc. Author: GBIT Automation. Date: 2026-07-06.

## 1. Problem & goals

Jody adds photos to a SharePoint folder. Today, getting them onto the Kind Sisters
website is a manual job: download, optimise, rename, add to the gallery code, commit,
deploy. We want that to be automatic and hands-off.

A second requirement surfaced during design: Kind Sisters chose Australian hosting
(VentraIP) specifically for **data residency — their data should stay in Australia**.
The current live site does not honour this: it runs on Vercel (US company, US control
plane). Since we are changing how the site is built and served anyway, we resolve both
at once by moving the site to Australian hosting and building the automation on top of it.

**Goals**

1. When Jody uploads a photo to the Kind Sisters SharePoint "Photo Gallery" folder, it
   appears on the website gallery automatically, optimised for web, within ~30–60 minutes,
   with no human step.
2. The site and the automation run on Australian infrastructure (data residency).
3. Zero ongoing cost beyond hosting; no paid APIs.

**Non-goals**

- Migrating donor/newsletter data residency (Zeffy/Stripe are US; out of scope here — flag separately).
- AI-generated alt text (explicitly rejected; see decisions).
- Any change to the site's content or design beyond the gallery data refactor needed to
  make photo adds rebuild-free.

## 2. Decisions (locked in brainstorming)

| Decision | Choice | Rationale |
|---|---|---|
| Photo source | Kind Sisters SharePoint **"Photo Gallery"** folder | Where Jody already uploads; she controls it. |
| Graph access | **Entra app registration** in the Kind Sisters tenant, Microsoft Graph **`Sites.Selected`** (scoped to the one KS site), client-credentials flow | Gavin is Global Admin on the KS tenant. App-only, headless, least-privilege (one site, read-only). Cross-tenant friendly. |
| Hosting | **BinaryLane 2 GB, Perth** (1 vCPU, 2 GB RAM, 40 GB NVMe) — $9.80/mo ex-GST (~$10.78 inc) | Australian data residency (Perth = lowest latency for a Perth charity). Cheaper than the $18.33/mo VentraIP plan it can replace. Comfortably runs a small Next.js site + the cron. GBIT already operates BinaryLane and has provisioning runbooks. |
| Publish model | **Fully automatic** | Gavin's call. No review gate. |
| Alt text | **Derived from the filename** (strip extension, `-`/`_` → spaces, capitalise first letter) | No AI, no API cost. Tradeoff: caption quality depends on Jody naming files well — documented as her responsibility. |
| Optimisation | ImageMagick: `-auto-orient -resize '1600x1600>' -strip -quality 80`, JPEG output | Same pipeline already validated in the repo's gallery work. |
| Rebuild avoidance | Gallery manifest read at **runtime** (not build time); images are static assets in `public/` | Adding a photo becomes a pure file write — no Next.js rebuild on the 2 GB box. |

## 3. Architecture overview

```
Jody ──uploads──> SharePoint "Photo Gallery" (Kind Sisters M365, AU tenant)
                                │
                                │  Microsoft Graph (Sites.Selected, app-only)
                                ▼
        ┌──────────────  BinaryLane VPS (Perth, AU)  ──────────────┐
        │  cron (every 30 min):  gallery-sync                       │
        │    1. list folder via Graph                               │
        │    2. diff vs processed.json  → new photos                │
        │    3. download → ImageMagick optimise                     │
        │    4. write public/images/gallery/<slug>.jpg              │
        │    5. append {src,alt,w,h} to data/gallery.json           │
        │    6. update processed.json                               │
        │                                                           │
        │  Next.js (`next start`, PM2) ── reads data/gallery.json   │
        │      at runtime (revalidate ~60s)                         │
        │  nginx (TLS, Let's Encrypt) ── reverse proxy + static     │
        └───────────────────────────────────────────────────────────┘
                                │
                          kindsisters.org.au  (DNS → BinaryLane Perth IP)
```

Everything from upload to serve stays in Australia. No US hop for the site or the photos.

## 4. Components

### 4.1 Hosting migration (Phase 1 — prerequisite)

- **VPS:** BinaryLane 2 GB, Perth, Ubuntu LTS.
- **Runtime:** Node LTS + PM2 running `next start`. **Build off-box** (in CI or on Gavin's
  Mac) and rsync the compiled output (`.next` + `public` + `package.json` + `node_modules`
  or a standalone build) to the VPS. The 2 GB box only serves; it never runs `next build`.
  Mitigates OOM risk on 2 GB.
- **Web server:** nginx as reverse proxy to `next start` (port 3000), TLS via Let's Encrypt
  (certbot, auto-renew). nginx serves `/images/gallery/*` and other `public/` assets directly.
- **DNS cutover:** point `kindsisters.org.au` A record to the BinaryLane Perth IP. Keep the
  Vercel deployment live until the VPS is verified, then cut over. Rollback = repoint DNS to Vercel.
- **Env/secrets on the box:** a root-owned `.env` (mode 600) holds the Entra app credentials
  (tenant id, client id, client secret) and the resolved KS site/drive/folder IDs. Never in git.

### 4.2 Gallery data refactor (Phase 1 — code change)

Today the gallery array lives inside `src/app/projects/page.tsx` (a client component, for the
lightbox). To allow rebuild-free photo adds:

- Extract the gallery list into a **manifest file** `data/gallery.json` (array of
  `{ src, alt, width, height }`).
- Make `src/app/projects/page.tsx` a **server component** that reads `data/gallery.json` from
  disk at request time (`fs.readFile`) with `export const revalidate = 60` (or `dynamic =
  'force-dynamic'`), and passes the array to a **client** `Gallery` component that keeps the
  existing masonry + lightbox behaviour.
- Result: the cron appends to `data/gallery.json` and drops the image into `public/`; the page
  reflects it within the revalidate window with no rebuild and no restart.

> This refactor is safe to ship to the current Vercel site first (behaviour identical), then it
> carries over to BinaryLane. It is the only site code change in this project.

### 4.3 Photo-sync job (Phase 2 — the automation)

A single Node script, `scripts/gallery-sync/sync.mjs`, run by cron on the VPS every 30 min
(plus a manual invocation for testing). Steps:

1. **Auth** — client-credentials token from Entra (`https://login.microsoftonline.com/{tenant}/oauth2/v2.0/token`,
   scope `https://graph.microsoft.com/.default`).
2. **List** — `GET /sites/{siteId}/drives/{driveId}/items/{folderId}/children`; keep image
   content types; ignore junk (`.crdownload`, zero-byte, non-images).
3. **Diff** — compare against local ledger `data/gallery-sync/processed.json` (keyed by Graph
   item id + `eTag`). New = not in ledger. Also skip if the target slug already exists in
   `public/images/gallery/` (dedupe against manual imports).
4. **Download** each new item (`/content`), to a temp path.
5. **Optimise** — `magick <in> -auto-orient -resize '1600x1600>' -strip -quality 80 public/images/gallery/<slug>.jpg`.
   Slug = filename, lowercased, spaces/underscores → `-`, unsafe chars stripped.
6. **Alt text** — filename minus extension, `-`/`_` → spaces, collapse whitespace, capitalise
   first letter.
7. **Dimensions** — `magick identify -format '%w %h'` for `width`/`height` (zero layout shift).
8. **Append** `{ src, alt, width, height }` to `data/gallery.json` (parse → push → write; keep
   deterministic key order).
9. **Record** the item in `processed.json`.

No git, no deploy, no rebuild. The running site picks up the new manifest on its next
revalidate. A **lock file** (`/tmp/gallery-sync.lock`) prevents overlapping runs.

## 5. Data flow & state

- **Source of truth for "what's live":** `data/gallery.json` on the VPS (also committed to git
  as the checked-in baseline; the cron's runtime edits are the live delta and are periodically
  reconciled back to git — see Operations).
- **Source of truth for "what's imported":** `data/gallery-sync/processed.json` on the VPS.
- **Images:** `public/images/gallery/` on the VPS (static).

## 6. Error handling & idempotency

- **Idempotent:** the ledger + slug-exists check mean re-running never double-imports.
- **Graph auth failure:** log and exit non-zero; retry next cron tick. No retry loop (per GBIT policy).
- **One bad image** (download/optimise fails): skip it, continue the rest, log; it stays absent
  from the ledger so it retries next run.
- **Malformed `gallery.json`:** the script validates JSON before writing; on parse failure it
  aborts without writing and logs, so a corrupt manifest never reaches the site.
- **Disk full / write error:** abort the item, log, alert (see monitoring).
- **No new photos:** silent no-op.
- **Logging:** append to `/var/log/gallery-sync.log` (or journald); rotate weekly.

## 7. Security

- Graph app is **read-only, single-site** (`Sites.Selected` granted only to the KS site). It
  cannot read anything else in the tenant.
- Client secret lives only in the root-owned `.env` (mode 600) on the VPS; never in git, never
  in logs. Rotate on exposure; note the Entra secret expiry and set a calendar reminder.
- The VPS runs the site as a non-root service user; nginx + Let's Encrypt standard hardening;
  ufw firewall (22/80/443 only); SSH key-only.

## 8. Setup (one-time, human)

**Gavin (dashboards — cannot be automated by GBIT tooling):**
1. Entra (Kind Sisters tenant): register app → add client secret → add Microsoft Graph
   application permission `Sites.Selected` → grant admin consent → grant the app **read**
   access to the specific KS site (Sites.Selected is per-site, granted via Graph or PowerShell).
2. Provision BinaryLane 2 GB Perth VPS; run the Next.js provisioning runbook (to be written,
   modelled on `gbit-cloud-infra/runbooks/01-provision-laravel-server.md`).
3. DNS: point `kindsisters.org.au` at the VPS after verification.
4. Decide whether to retire the VentraIP plan once email/domain dependencies are confirmed moved.

**Jody:** name gallery files descriptively before uploading (e.g.
`womens-community-connect-june-2026.jpg`) — the filename becomes the on-site caption. GBIT to
send her a short note explaining this.

## 9. Operations

- **Manifest reconciliation:** the cron edits `data/gallery.json` and `processed.json` live on
  the VPS. A weekly step (or the deploy process) commits those back to the git repo so the
  checked-in baseline stays current and a redeploy never loses added photos. Documented in the runbook.
- **Monitoring:** cron failure and disk/RAM at 75% → alert (email to gavin@gbit.au).
- **Deploy of site code changes:** build off-box → rsync → `pm2 reload`. The gallery manifest
  and images are preserved (not overwritten) on deploy.

## 10. Testing / verification

- **Manifest refactor:** build + typecheck; visually verify `/projects` gallery + lightbox
  unchanged on the current Vercel site before migrating.
- **Sync script (dry-run mode):** process + optimise into a temp dir, no manifest write, no
  ledger update — verify slugs, alt text, dimensions, dedupe on a known folder.
- **End-to-end on staging:** upload one new photo to the SharePoint folder → run the cron
  manually → confirm the optimised image lands in `public/images/gallery/`, the manifest gains
  a correct entry, and the page shows it after revalidate.
- **Idempotency:** run the cron twice with no new photos → no changes, clean exit.
- **Failure injection:** feed a corrupt/zero-byte file → confirm it is skipped and the manifest
  is untouched.

## 11. Rollout plan

1. **Phase 1a:** gallery data refactor (manifest + server/client split), shipped to the current
   Vercel site. Low risk, behaviour-identical.
2. **Phase 1b:** provision BinaryLane Perth VPS; deploy the site; verify on a temporary hostname;
   DNS cutover; retire Vercel once stable.
3. **Phase 2:** Entra app + sync script + cron; dry-run; enable; end-to-end test with a real upload.

Each phase is independently revertible (DNS rollback to Vercel; disable cron).

## 12. Open items / prerequisites

- `TODO: VERIFY` what the VentraIP cPanel currently hosts (domain registration? email?) before
  assuming it can be retired — draft a note to Jody.
- Entra `Sites.Selected` per-site grant requires resolving the KS site id (one-time discovery
  with Gavin's GA credentials).
- Confirm the KS M365 tenant's own data region is Australian (SharePoint residency) — otherwise
  the source photos already sit outside AU and that should be surfaced to Jody.
- Data-residency gap for donor/newsletter data (Zeffy/Stripe US) is out of scope here but should
  be raised with Jody as a separate item.
