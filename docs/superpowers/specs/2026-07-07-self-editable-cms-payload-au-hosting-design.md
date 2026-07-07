# Kind Sisters — Self-editable site (Payload CMS on Australian hosting)

Design doc. Author: GBIT Automation. Date: 2026-07-07.

**Supersedes** `2026-07-06-gallery-automation-and-au-hosting-design.md`. The SharePoint
photo-sync automation in that doc is dropped: it solved only the gallery, via a back door,
and did not meet the actual agreement. This design meets it directly.

## 1. Problem & goals

A core agreement with Kind Sisters was that **Jody, or other staff, can easily update the
website themselves — Blogs, Photo Gallery, and Events — without relying on a third party
(GBIT)**. The site as currently built does not meet this: content is hardcoded in the Next.js
code, so every change goes through GBIT. Separately, Kind Sisters requires **Australian data
residency** (the reason they chose VentraIP).

This design adds a self-editable CMS to the existing Next.js site and self-hosts it in
Australia, satisfying both requirements at once.

**Goals**
1. Jody (and other named staff) create, edit, and publish **Blog posts, Events, and Gallery
   photos** themselves through a simple admin screen, no code, from any browser.
2. Photos are optimised for web automatically on upload.
3. All content and its database live on **Australian** infrastructure.
4. Kind Sisters is **not reliant on GBIT** for day-to-day content.

**Non-goals**
- Making every marketing page (Home, About, Programs, Contact) editable in v1. Those stay
  developer-maintained; the agreement names Blogs, Gallery, Events. (Can be added later.)
- Donor/newsletter data residency (Zeffy/Stripe are US) — out of scope, flagged separately.

## 2. Decisions

| Decision | Choice | Rationale |
|---|---|---|
| CMS | **Payload CMS 3** | Runs *inside* the existing Next.js app (App Router). TypeScript. Open-source, self-hostable. Ships a friendly admin UI, user accounts + roles, and built-in image optimisation. No SaaS lock-in, no per-seat fees. |
| Editable content types (v1) | **Blog Posts, Events, Gallery** (+ Testimonials, optional) | Exactly what was agreed. Marketing pages stay coded in v1. |
| Database | **SQLite** (start), upgrade path to **Postgres** | SQLite keeps the box light and cheap and is fine for a low-traffic charity. Postgres if volume/roles grow. |
| Hosting | **BinaryLane Perth** VPS. Start **2 GB** (~$10.78/mo inc-GST); bump to **4 GB** (~$21.56) if tight | Australian data residency (Perth = low latency). 2 GB + SQLite runs Next.js + Payload for this scale; 4 GB is the comfort tier. |
| Media storage | VPS local disk, served via nginx/Next; **auto-resized on upload** (Payload + sharp) | Keeps images in Australia; no external CDN needed at this scale. |
| Auth | Payload users + roles (**admin**, **editor**) | Jody = admin; other staff = editors. Self-service, revocable. |
| Photo alt text | Entered in the upload form (with the filename pre-filled as a starting caption) | Meets accessibility/SEO; editor can improve it. Replaces the "filename-only" automation approach. |

## 3. What this looks like to Jody (the point of the whole thing)

Jody goes to **`kindsisters.org.au/admin`** and logs in. She sees a simple sidebar:
**Blog Posts, Events, Gallery, Testimonials.**

- **To add a blog post:** click *Blog Posts → Create New* → type a title, drag in a photo,
  write the article in a normal rich-text editor (bold, headings, links, images), set a
  publish date, click **Publish**. It's live on the site's blog immediately.
- **To add a gallery photo:** click *Gallery → Create New* → drag the photo in (it is
  optimised for web automatically), adjust the caption, **Publish**. It appears in the
  gallery on its own. No SharePoint, no waiting on GBIT.
- **To add an event:** click *Events → Create New* → title, date, location, description,
  image, **Publish**. It shows on the Events page.
- **Drafts:** she can save without publishing and come back later.
- **Other staff:** each gets their own login; GBIT can add or remove editors.

No code, no developer, works from any browser or phone. That is the "non-reliant on a third
party" outcome the agreement called for.

## 4. Architecture

```
        ┌──────────────  BinaryLane VPS (Perth, AU)  ──────────────┐
        │  One Next.js app (PM2), TWO faces:                        │
        │   • public site  (SSR/ISR — reads content from Payload)   │
        │   • /admin       (Payload editing UI, login-protected)    │
        │                                                           │
        │  Payload local API  ─────►  SQLite database (on disk)     │
        │  Uploaded media  ─────────►  /media (auto-resized)        │
        │  nginx (TLS, Let's Encrypt) reverse-proxy + static media  │
        │  nightly backup: DB dump + media  ──► off-site (AU)       │
        └───────────────────────────────────────────────────────────┘
                                │
                       kindsisters.org.au  (DNS → BinaryLane Perth IP)
```

Editors and content never leave Australia. The public frontend keeps the current design; only
the Blog/Events/Gallery data comes from Payload instead of hardcoded files.

## 5. Content model (Payload collections)

- **Blog Posts** — `title`, `slug` (auto), `heroImage` (upload), `excerpt`, `body` (rich text),
  `author`, `publishedDate`, `status` (draft/published), SEO fields.
- **Events** — `title`, `date`, `location`, `description` (rich text), `image`, `status`.
- **Gallery** — `image` (upload, auto-resized), `alt/caption`, optional `tags`, `status`.
- **Testimonials** (optional, since these are already on the site) — `quote`, `role`, `date`.
- **Media** — Payload's upload collection; generates web-optimised sizes on upload (replaces the
  manual ImageMagick pipeline).
- **Users** — staff logins with `role` (admin/editor).

## 6. Frontend changes

- Re-wire the **blog, events, and gallery** routes to read from Payload's local API (same
  process, no network hop) with ISR/revalidation so published edits appear within seconds.
- The masonry gallery + lightbox (already built) stays; it reads Gallery items from Payload
  instead of `gallery.json`.
- Marketing pages (Home/About/Programs/Contact) unchanged in v1.

## 7. Migration

- **Seed the Gallery collection** with the existing optimised photos in
  `public/images/gallery/` (one-time import script).
- **Seed Testimonials** from the current data (already real content).
- Blogs and Events start empty; Jody adds them. (Jody has already written blog drafts and
  event write-ups — those can be first content.)
- Marketing copy stays in code.

## 8. Hosting, build, deploy

- BinaryLane Perth, Ubuntu LTS, Node LTS, PM2 running the Next.js/Payload app, nginx + Let's
  Encrypt TLS.
- **Build off-box** (CI or locally), rsync the standalone build, `pm2 reload`. The 2 GB box
  serves + runs the DB; it does not build.
- DB migrations run on deploy (Payload/drizzle migrations).

## 9. Security & operations (new responsibilities vs a static site)

A CMS has a login and a database, so it needs care a static site did not:
- `/admin` behind HTTPS; strong passwords; login rate-limiting; keep Payload patched.
- Non-root service user; ufw (22/80/443); SSH key-only; automatic security updates.
- **Backups (important for a charity's content):** nightly SQLite dump + `/media` sync to a
  second Australian location (or BinaryLane snapshots). Test a restore.
- Monitoring: uptime + disk/RAM 75% alerts to gavin@gbit.au.
- Media is user-uploaded: validate type/size on upload (Payload does this) to prevent abuse.

## 10. Error handling

- Failed image processing on upload → Payload surfaces the error to the editor; nothing is
  published half-done.
- DB unavailable → the site serves the last ISR-cached pages; admin shows an error; alert fires.
- Bad deploy → `pm2` keeps the previous process; roll back the build; DNS unaffected.

## 11. Testing / verification

- Content-type CRUD as an editor (create/edit/publish/unpublish each of Blog/Event/Gallery).
- Image upload produces optimised web sizes; alt text saved; renders correctly + no layout shift.
- Draft vs published visibility on the public site.
- Role check: an `editor` cannot manage users; an `admin` can.
- Backup + restore drill on staging.
- Full-page build + typecheck; visual check of blog/events/gallery pages.

## 12. Rollout

1. **Phase 1:** add Payload to the Next.js app; model collections; wire blog/events/gallery
   routes to Payload; seed gallery + testimonials. Verify on the current Vercel-hosted URL
   (SQLite file in the deployment) or a staging box.
2. **Phase 2:** provision BinaryLane Perth; deploy app + DB + media + backups; verify on a
   temporary hostname.
3. **Phase 3:** DNS cutover to BinaryLane **preserving the Microsoft 365 email records**;
   verify email + site; then **cancel VentraIP hosting within the 45-day refund window** and
   claim the refund (keep the domain registered).

Each phase is revertible (DNS rollback to Vercel; disable the box).

## 13. Cost

- BinaryLane 2 GB Perth: ~$10.78/mo inc-GST (~$129/yr) — cheaper than VentraIP's ~$220/yr;
  4 GB (~$21.56/mo) if headroom is needed. Payload + SQLite: no licence/SaaS fees.

## 14. Open items / prerequisites

- Confirm the BinaryLane tier (start 2 GB; watch RAM under Next.js + Payload; upgrade if needed).
- `TODO: VERIFY` the exact VentraIP renewal date → the 45-day refund deadline governs Phase 3.
- Decide backup destination (second BinaryLane region vs snapshots) — must be Australian.
- Confirm whether marketing pages should become editable later (Pages collection) — deferred.
- Domain stays registered (non-refundable); move DNS management so it survives cancelling the
  cPanel plan; preserve M365 MX/SPF/verification records.
