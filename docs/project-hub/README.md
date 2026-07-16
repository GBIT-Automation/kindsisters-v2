# Kind Sisters — SharePoint Project Hub

The central repository for the Kind Sisters website project, on
`gbit26.sharepoint.com/sites/KindSisters`. Author: GBIT Automation.

## What it holds
- **Documents** library, foldered:
  - `01 Guides` — the CMS user guide and how-tos
  - `02 Specs and Runbooks` — design docs, the BinaryLane cutover runbook
  - `03 Artifacts and Links` — pointers to the live artifacts (CMS branch, guide PDF, Zeffy form)
  - `04 Emails` — archived client emails + attachments
  - `05 Assets` — logos, photos, brand
  - `06 Client Reports` — printable status reports
- **Project Log** list — the timeline, to-do, and status. Printable as a client report.

## Provisioning (you run this)
The Microsoft connector cannot create SharePoint sites or lists, so this is done
with PnP PowerShell, run interactively (same app you use for the AE SharePoint work):

```powershell
Connect-PnPOnline -Url https://gbit26-admin.sharepoint.com -Interactive -ClientId <GBIT-PnP client id>
# then run:
./provision-kindsisters-hub.ps1
```

Set `$clientId` at the top of the script to the GBIT-PnP app id. Safe to re-run.

## Communication capture model
- **Emails + attachments** — pulled from Outlook (Microsoft tools) into `04 Emails`.
- **Apple Messages (iMessage/SMS)** — needs Full Disk Access on iTerm, then exported
  from `~/Library/Messages/chat.db` (filter by contact) into `04 Emails` as PDF/CSV.
- **WhatsApp** — no reliable automated read. Use WhatsApp's built-in Export Chat, or
  forward key messages to a KS mailbox (then auto-archived). See the session notes.

## Populating documents
Once the site exists, the guide PDF, specs, and runbook are uploaded into the
matching folders (via the connector or an added PnP step).
