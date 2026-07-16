#!/usr/bin/env python3
"""
Export a WhatsApp conversation from the native Mac app into the project hub.

The Mac WhatsApp store (ChatStorage.sqlite) is a plain Core Data SQLite DB, not
encrypted at rest, so no special permission is needed. This copies it (so the
live DB is never touched), pulls one contact's conversation, and writes a
readable HTML transcript plus a CSV.

Usage:
    python3 export-whatsapp.py "Jody" [output_dir]

Author: GBIT Automation.
"""
import sqlite3, shutil, os, sys, csv, html, datetime, tempfile

CONTACT = sys.argv[1] if len(sys.argv) > 1 else "Jody"
OUTDIR = sys.argv[2] if len(sys.argv) > 2 else "comms-exports"
WA = os.path.expanduser(
    "~/Library/Group Containers/group.net.whatsapp.WhatsApp.shared"
)
AWST = datetime.timezone(datetime.timedelta(hours=8))  # Perth, no DST
CORE_EPOCH = 978307200  # Core Data (2001-01-01) -> Unix

os.makedirs(OUTDIR, exist_ok=True)

# Copy the DB (+ wal/shm) so we read a consistent, non-live snapshot.
tmp = tempfile.mkdtemp()
for ext in ("", "-wal", "-shm"):
    src = os.path.join(WA, "ChatStorage.sqlite" + ext)
    if os.path.exists(src):
        shutil.copy2(src, os.path.join(tmp, "ChatStorage.sqlite" + ext))
con = sqlite3.connect(os.path.join(tmp, "ChatStorage.sqlite"))
cur = con.cursor()

cur.execute(
    "SELECT Z_PK, ZPARTNERNAME, ZCONTACTJID FROM ZWACHATSESSION "
    "WHERE ZPARTNERNAME LIKE ? ORDER BY ZPARTNERNAME",
    (f"%{CONTACT}%",),
)
sessions = cur.fetchall()
if not sessions:
    print(f"No WhatsApp conversation found matching '{CONTACT}'.")
    sys.exit(1)

partner = sessions[0][1]
rows = []
for pk, name, jid in sessions:
    cur.execute(
        "SELECT ZMESSAGEDATE, ZISFROMME, ZPUSHNAME, ZTEXT, ZMESSAGETYPE, ZMEDIAITEM "
        "FROM ZWAMESSAGE WHERE ZCHATSESSION=? ORDER BY ZMESSAGEDATE",
        (pk,),
    )
    for zdate, fromme, push, text, mtype, media in cur.fetchall():
        ts = (
            datetime.datetime.fromtimestamp((zdate or 0) + CORE_EPOCH, AWST)
            if zdate
            else None
        )
        # ZPUSHNAME is unreliable (often a junk blob); use the conversation
        # partner's name for received messages.
        sender = "Gavin" if fromme == 1 else name
        if text:
            body = text
        elif media:
            body = "[media / attachment]"
        else:
            body = "[non-text message]"
        rows.append((ts, sender, int(fromme or 0), body))
con.close()
shutil.rmtree(tmp, ignore_errors=True)

rows.sort(key=lambda r: r[0] or datetime.datetime.min.replace(tzinfo=AWST))
safe = partner.lower().replace(" ", "-")
csv_path = os.path.join(OUTDIR, f"{safe}-whatsapp.csv")
html_path = os.path.join(OUTDIR, f"{safe}-whatsapp.html")

with open(csv_path, "w", newline="") as f:
    w = csv.writer(f)
    w.writerow(["Timestamp (AWST)", "Sender", "Direction", "Message"])
    for ts, sender, fromme, body in rows:
        w.writerow([
            ts.strftime("%Y-%m-%d %H:%M:%S") if ts else "",
            sender,
            "sent" if fromme else "received",
            body,
        ])

exported = datetime.datetime.now(AWST).strftime("%d %B %Y, %I:%M %p")
bubbles = []
last_day = None
for ts, sender, fromme, body in rows:
    day = ts.strftime("%A, %d %B %Y") if ts else ""
    if day != last_day:
        bubbles.append(f'<div class="day">{html.escape(day)}</div>')
        last_day = day
    side = "me" if fromme else "them"
    when = ts.strftime("%I:%M %p") if ts else ""
    bubbles.append(
        f'<div class="row {side}"><div class="bubble">'
        f'<div class="who">{html.escape(sender)}</div>'
        f'<div class="text">{html.escape(body)}</div>'
        f'<div class="time">{when}</div></div></div>'
    )

doc = f"""<!doctype html><html><head><meta charset="utf-8"><style>
body{{font-family:-apple-system,"Segoe UI",Roboto,Arial,sans-serif;background:#ECE5DD;margin:0;color:#111}}
.head{{background:#075E54;color:#fff;padding:20px 28px}}
.head h1{{margin:0;font-size:19pt}}
.head .sub{{opacity:.85;font-size:10.5pt;margin-top:4px}}
.wrap{{max-width:760px;margin:0 auto;padding:18px 20px}}
.day{{text-align:center;margin:16px 0}}
.day{{display:block}}
.day span,.day{{background:#d7e7d0;color:#4a5a4a;font-size:9pt;padding:4px 12px;border-radius:10px;display:inline-block}}
.row{{display:flex;margin:6px 0}}
.row.me{{justify-content:flex-end}}
.bubble{{max-width:72%;padding:8px 12px;border-radius:10px;box-shadow:0 1px 1px rgba(0,0,0,.1);font-size:11pt;line-height:1.45}}
.row.them .bubble{{background:#fff}}
.row.me .bubble{{background:#DCF8C6}}
.who{{font-size:8.5pt;font-weight:700;color:#075E54;margin-bottom:2px}}
.row.me .who{{color:#4a7a2a}}
.text{{white-space:pre-wrap}}
.time{{font-size:8pt;color:#888;text-align:right;margin-top:3px}}
</style></head><body>
<div class="head"><h1>WhatsApp — {html.escape(partner)}</h1>
<div class="sub">{len(rows)} messages &nbsp;•&nbsp; exported {exported} &nbsp;•&nbsp; Kind Sisters project &nbsp;•&nbsp; GBIT Automation</div></div>
<div class="wrap">{''.join(bubbles)}</div>
</body></html>"""

with open(html_path, "w") as f:
    f.write(doc)

print(f"Exported {len(rows)} messages with {partner}")
print(f"  CSV:  {csv_path}")
print(f"  HTML: {html_path}")
