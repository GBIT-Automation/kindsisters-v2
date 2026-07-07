# Runbook — Kind Sisters: move to BinaryLane (AU) + DNS cutover + VentraIP cancellation

Author: GBIT Automation. Date: 2026-07-07.
Companion to the spec `2026-07-07-self-editable-cms-payload-au-hosting-design.md` and the build
plan `2026-07-07-payload-cms-content-build.md`.

**Purpose:** provision Australian hosting, deploy the Next.js + Payload site, move DNS while
**keeping Microsoft 365 email working**, verify, then cancel VentraIP hosting to claim the refund.

**Golden rules**
1. **Email must never break.** Move DNS and verify mail *before* touching VentraIP.
2. **Do NOT cancel VentraIP until Jody gives explicit written go-ahead.** Also stay inside the
   45-day refund window from the renewal date.
3. **Cancel HOSTING, never the DOMAIN.** The domain is a separate product and must stay registered.
4. Verify at each gate before proceeding. Every step has a rollback.

---

## 0. Facts on file (verified 2026-07-07)

- **Domain:** `kindsisters.org.au`, registrant **Australian Kind Sisters Ltd** (ABN 66 666 996 738,
  contact Jody Rynski), registered via **VentraIP** (accredited registrar shown as Synergy
  Wholesale). Managed in VentraIP's **VIPControl**.
- **Current DNS nameservers:** `ns1.syd6.hostingplatform.net.au`, `ns2.syd6.hostingplatform.net.au`
  (VentraIP cPanel DNS — dies if the cPanel plan is cancelled).
- **Current website A record:** `110.232.143.14` (old VentraIP site — this is the record we change).
- **Email:** Microsoft 365. Records to **preserve exactly**:
  - `MX` → `kindsisters-org-au.mail.protection.outlook.com` (priority 0)
  - `TXT` (SPF) → `v=spf1 include:spf.protection.outlook.com -all`
  - `TXT` → `MS=ms29345075` (M365 verification)
  - `CNAME` `autodiscover` → `autodiscover.outlook.com`
  - No DKIM/DMARC currently configured (nothing to carry; consider adding later).

Re-run these before starting, in case anything changed:
```bash
dig +short NS kindsisters.org.au
dig +short MX kindsisters.org.au
dig +short TXT kindsisters.org.au
dig +short A kindsisters.org.au
dig +short CNAME autodiscover.kindsisters.org.au
```

---

## 1. Preconditions (gather before starting)

- [ ] **Jody's go-ahead** to move hosting (and, separately, to cancel VentraIP).
- [ ] **VentraIP VIPControl login** (holds both the domain and the hosting). Needed to change
  nameservers and to cancel hosting without touching the domain. Gavin handed Jody this login on
  2025-07-12; confirm who holds it now.
- [ ] **VentraIP renewal date** → compute the 45-day refund deadline. Record it here: `_______`.
- [ ] BinaryLane account (GBIT) with a payment method.
- [ ] The built site (from the build plan) passing `npm run build` locally.
- [ ] Decide the **DNS host** (Part D, Step 1).
- [ ] Decide the **backup destination** (Part C) — must be Australian.

---

## Part A — Provision the BinaryLane VPS (Perth)

- [ ] **A1.** Create a **Standard 2 GB, Perth** Ubuntu LTS VPS in BinaryLane. Record the public IP:
  `<BINARYLANE_IP>`. (Upgrade to 4 GB if RAM runs hot under Next.js + Payload later.)
- [ ] **A2.** First login, create a non-root sudo user, disable root SSH + password auth (key-only):
  ```bash
  adduser deploy && usermod -aG sudo deploy
  rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy
  sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin no/; s/^#\?PasswordAuthentication.*/PasswordAuthentication no/' /etc/ssh/sshd_config
  systemctl restart ssh
  ```
- [ ] **A3.** Firewall — allow only SSH/HTTP/HTTPS:
  ```bash
  sudo ufw allow OpenSSH && sudo ufw allow 80 && sudo ufw allow 443 && sudo ufw --force enable
  ```
- [ ] **A4.** Base packages + unattended security updates:
  ```bash
  sudo apt update && sudo apt -y upgrade
  sudo apt -y install nginx certbot python3-certbot-nginx git curl unattended-upgrades
  sudo dpkg-reconfigure -plow unattended-upgrades
  ```
- [ ] **A5.** Node LTS + PM2:
  ```bash
  curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
  sudo apt -y install nodejs
  sudo npm i -g pm2
  ```
- [ ] **A6.** App directory + media dir:
  ```bash
  sudo mkdir -p /var/www/kindsisters && sudo chown deploy:deploy /var/www/kindsisters
  mkdir -p /var/www/kindsisters/public/media
  ```

---

## Part B — Deploy the app

Build **off-box** (the 2 GB VPS should not run `next build`). Build locally or in CI, ship the
Next.js **standalone** output.

- [ ] **B1.** Ensure `next.config.ts` has `output: 'standalone'` (add it if missing; commit).
- [ ] **B2.** Build locally: `npm ci && npm run build`.
- [ ] **B3.** Ship the standalone build + static + public to the VPS:
  ```bash
  rsync -az --delete .next/standalone/ deploy@<BINARYLANE_IP>:/var/www/kindsisters/
  rsync -az .next/static/ deploy@<BINARYLANE_IP>:/var/www/kindsisters/.next/static/
  rsync -az public/ deploy@<BINARYLANE_IP>:/var/www/kindsisters/public/
  ```
  > Do **not** `--delete` the remote `public/media` on later deploys — it holds uploaded images.
  > Rsync `public/` without `--delete`, or exclude `media`: `--exclude 'media'`.
- [ ] **B4.** On the VPS, create `/var/www/kindsisters/.env` (mode 600, never in git):
  ```
  PAYLOAD_SECRET=<long-random-string>
  DATABASE_URL=file:/var/www/kindsisters/kindsisters.db
  NODE_ENV=production
  ```
  ```bash
  chmod 600 /var/www/kindsisters/.env
  ```
- [ ] **B5.** Start with PM2 (standalone server entry is `server.js`):
  ```bash
  cd /var/www/kindsisters && pm2 start server.js --name kindsisters && pm2 save && pm2 startup
  ```
  App now listens on `127.0.0.1:3000`.
- [ ] **B6.** Create the first admin user: browse to `http://<BINARYLANE_IP>:3000/admin` via an SSH
  tunnel (`ssh -L 3000:127.0.0.1:3000 deploy@<BINARYLANE_IP>`) and register the admin. Then run the
  seed (`npx tsx scripts/seed-content.mjs` on the box, or seed before shipping the DB).
- [ ] **B7.** nginx reverse proxy — `/etc/nginx/sites-available/kindsisters`:
  ```nginx
  server {
    server_name kindsisters.org.au www.kindsisters.org.au;
    client_max_body_size 25M;                      # allow photo uploads
    location /media/ { alias /var/www/kindsisters/public/media/; expires 30d; }
    location / {
      proxy_pass http://127.0.0.1:3000;
      proxy_set_header Host $host;
      proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
      proxy_set_header X-Forwarded-Proto $scheme;
    }
  }
  ```
  ```bash
  sudo ln -s /etc/nginx/sites-available/kindsisters /etc/nginx/sites-enabled/
  sudo nginx -t && sudo systemctl reload nginx
  ```
- [ ] **B8.** TLS — issue the certificate **using a temporary test hostname first** (so we don't
  need DNS pointed yet). Once DNS is cut over (Part D), run certbot for the real domain:
  ```bash
  sudo certbot --nginx -d kindsisters.org.au -d www.kindsisters.org.au
  ```
  (Run this in Part D, after the A record points here. Certbot auto-renews.)
- [ ] **B9.** Verify the app on the box before DNS: `curl -H 'Host: kindsisters.org.au' http://127.0.0.1:3000`
  returns the homepage HTML; `/admin` loads; a test upload writes to `public/media`.

---

## Part C — Backups (before go-live)

The site now has a **database + uploaded media** — back both up, to an **Australian** destination.

- [ ] **C1.** Nightly script `/usr/local/bin/ks-backup.sh` (runs at 02:30 **AWST** = 18:30 UTC):
  ```bash
  #!/usr/bin/env bash
  set -euo pipefail
  ts=$(date +%F)
  dest=/var/backups/kindsisters
  mkdir -p "$dest"
  sqlite3 /var/www/kindsisters/kindsisters.db ".backup '$dest/db-$ts.sqlite'"
  tar -czf "$dest/media-$ts.tgz" -C /var/www/kindsisters/public media
  find "$dest" -type f -mtime +14 -delete            # keep 14 days
  # off-site: sync $dest to a second AU location (BinaryLane snapshot / second region / AU object store)
  ```
  ```bash
  sudo chmod +x /usr/local/bin/ks-backup.sh
  echo '30 18 * * * root /usr/local/bin/ks-backup.sh' | sudo tee /etc/cron.d/ks-backup
  ```
- [ ] **C2.** Also enable BinaryLane **automated snapshots/backups** on the VPS as a second layer.
- [ ] **C3.** **Test a restore** on a scratch box: restore `db-*.sqlite` + untar media, boot the app,
  confirm content loads. Do not skip this.

---

## Part D — DNS cutover (preserve M365 email)

**This is the critical section. Do it carefully and verify email before Part E.**

- [ ] **D1. Choose the DNS host** (must survive cancelling the cPanel plan). Options:
  - **VentraIP standalone DNS** in VIPControl (keeps everything with one AU provider; the domain
    stays with VentraIP, DNS zone moves off the cPanel-tied nameservers). Preferred for AU consistency.
  - **Cloudflare** (free, fast propagation, easy record UI). Note: DNS records are public routing
    info, not personal data, so residency is not a concern for the zone itself.
- [ ] **D2. Lower TTLs** on the current zone (in VIPControl) to 300s at least 24h before cutover, so
  a mistake reverts fast.
- [ ] **D3. Build the new zone** in the chosen DNS host and add **every** record before switching:
  | Type | Host | Value | Notes |
  |---|---|---|---|
  | A | `@` | `<BINARYLANE_IP>` | **the only changed record** (was 110.232.143.14) |
  | A or CNAME | `www` | `<BINARYLANE_IP>` / `kindsisters.org.au` | website |
  | MX | `@` | `kindsisters-org-au.mail.protection.outlook.com` (pri 0) | **email — copy exactly** |
  | TXT | `@` | `v=spf1 include:spf.protection.outlook.com -all` | SPF |
  | TXT | `@` | `MS=ms29345075` | M365 verification |
  | CNAME | `autodiscover` | `autodiscover.outlook.com` | Outlook autodiscover |
  Double-check the MX and both TXT records match Section 0 byte-for-byte.
- [ ] **D4. Switch the domain's nameservers** (in VIPControl, at the domain level) to the new DNS
  host's nameservers. Wait for propagation (minutes to a couple of hours with low TTL).
- [ ] **D5. Issue TLS** for the real domain now that A points to the box (Part B, Step B8).
- [ ] **D6. VERIFY — do not proceed until all pass:**
  ```bash
  dig +short NS kindsisters.org.au        # → new DNS host
  dig +short A kindsisters.org.au         # → <BINARYLANE_IP>
  dig +short MX kindsisters.org.au        # → ...mail.protection.outlook.com  (UNCHANGED)
  dig +short TXT kindsisters.org.au       # → SPF + MS= verification (UNCHANGED)
  ```
  - [ ] Website loads over HTTPS at `https://kindsisters.org.au` (the **new** site) and `/admin` works.
  - [ ] **Send a test email TO a @kindsisters.org.au address and reply FROM it.** Confirm both
    directions work. This is the email go/no-go gate.
  - [ ] Outlook/Exchange clients still connect (autodiscover intact).

**Rollback (Part D):** if email or the site misbehaves, revert the domain's nameservers to
`ns1/ns2.syd6.hostingplatform.net.au` (still live because VentraIP hosting is not cancelled yet).
With low TTL this restores the old state quickly.

---

## Part E — Cancel VentraIP hosting (gated)

**Only after:** Part D fully verified (email confirmed working) AND **Jody's explicit written
go-ahead** AND we are **within the 45-day refund window**.

- [ ] **E1.** Re-confirm the site + email have run cleanly on BinaryLane for a settling period
  (recommend 48h) with no issues.
- [ ] **E2.** Confirm in VIPControl that the **domain is a separate product** from the cPanel
  hosting, and that cancelling hosting will **not** cancel the domain. If unsure, lodge a billing
  eTicket to confirm before acting.
- [ ] **E3.** Lodge an **eTicket to VentraIP Accounts & Billing** requesting cancellation of the
  **cPanel hosting service only** and the **full refund** under the 45-day money-back guarantee.
  Reference the renewal date. Keep the domain.
- [ ] **E4.** Confirm in writing: hosting cancelled, **domain retained**, refund issued to the
  original payment method (not just account credit). Record the refund confirmation.
- [ ] **E5.** Post-cancellation checks (next day): `dig` still resolves (DNS moved off cPanel in
  Part D, so it survives); website + email still work; certbot renewal still scheduled.

---

## Post-cutover checklist

- [ ] `https://kindsisters.org.au` serves the new site; `www` redirects/resolves; TLS valid + auto-renew.
- [ ] Email send + receive confirmed; autodiscover working.
- [ ] `/admin` reachable; Jody + editor logins work; a test blog/gallery/event/testimonial
  publishes and appears on the site.
- [ ] Nightly backup ran; a restore was tested.
- [ ] Monitoring: uptime check on the domain; disk/RAM 75% alerts to gavin@gbit.au.
- [ ] VentraIP hosting cancelled, domain retained, refund confirmed.
- [ ] Update memory/project notes: hosting now BinaryLane Perth; DNS host = <chosen>; VentraIP
  hosting closed on <date>.

## Open items

- `TODO: VERIFY` the exact VentraIP renewal date → the 45-day deadline governs Part E timing.
- Consider adding **DKIM + DMARC** for kindsisters.org.au while in the DNS zone (improves email
  deliverability; not required for mail to flow).
- Confirm who currently holds the VIPControl login (Gavin handed it to Jody 2025-07-12).
