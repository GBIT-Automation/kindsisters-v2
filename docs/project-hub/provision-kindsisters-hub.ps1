<#
  Provision the Kind Sisters project hub on gbit26.sharepoint.com
  Author: GBIT Automation

  Run interactively (same PnP app you use for the AE SharePoint work):
    Connect-PnPOnline -Url https://gbit26.sharepoint.com -Interactive -ClientId <GBIT-PnP client id>
  then run this script. It is safe to re-run: existing items are skipped.

  Creates:
    - Communication site  /sites/KindSisters  (the central repository)
    - Document library folders (Guides, Specs, Artifacts, Emails, Assets, Reports)
    - "Project Log" list (timeline + to-do + status, printable as a client report)
    - Populates the Project Log with the work done + open items to date
#>

$ErrorActionPreference = 'Stop'
$clientId = '<GBIT-PnP client id>'   # same app id used for the AE SharePoint work
$hubUrl   = 'https://gbit26.sharepoint.com/sites/KindSisters'

# --- 1. Create the site ---
# Connect to the tenant ADMIN centre for site creation.
Connect-PnPOnline -Url 'https://gbit26-admin.sharepoint.com' -Interactive -ClientId $clientId
try {
  New-PnPSite -Type CommunicationSite -Title 'Kind Sisters — Project Hub' -Url $hubUrl `
    -Description 'GBIT Automation project hub and repository for the Kind Sisters website.'
  Write-Host 'Site created:' $hubUrl
} catch {
  Write-Host 'Site create skipped (likely already exists):' $_.Exception.Message
}

# --- 2. Connect to the new site ---
Connect-PnPOnline -Url $hubUrl -Interactive -ClientId $clientId

# --- 3. Document library folder structure (default "Documents" library) ---
$folders = @(
  '01 Guides',
  '02 Specs and Runbooks',
  '03 Artifacts and Links',
  '04 Emails',
  '05 Assets',
  '06 Client Reports'
)
foreach ($f in $folders) {
  Resolve-PnPFolder -SiteRelativePath "Shared Documents/$f" | Out-Null
  Write-Host 'Folder ready:' $f
}

# --- 4. Project Log list ---
if (-not (Get-PnPList -Identity 'Project Log' -ErrorAction SilentlyContinue)) {
  New-PnPList -Title 'Project Log' -Template GenericList -OnQuickLaunch | Out-Null
  Add-PnPField -List 'Project Log' -DisplayName 'Log Date'  -InternalName 'LogDate'   -Type DateTime -AddToDefaultView | Out-Null
  Add-PnPField -List 'Project Log' -DisplayName 'Category'  -InternalName 'Category'   -Type Choice -Choices 'Build','Content','Hosting','Payments','Comms','Admin','Blocker' -AddToDefaultView | Out-Null
  Add-PnPField -List 'Project Log' -DisplayName 'Status'    -InternalName 'LogStatus'  -Type Choice -Choices 'Done','In progress','Blocked','To do' -AddToDefaultView | Out-Null
  Add-PnPField -List 'Project Log' -DisplayName 'Notes'     -InternalName 'LogNotes'   -Type Note -AddToDefaultView | Out-Null
  Write-Host 'Project Log list created.'
} else {
  Write-Host 'Project Log list already exists, skipping.'
}

# --- 5. Populate the Project Log (Title = the activity) ---
$log = @(
  @{ D='2025-11-09'; T='Website discovery interview with Jody';                         C='Admin';    S='Done';        N='Requirements, brand, scope captured.' }
  @{ D='2026-05-01'; T='Kick-off meeting with Jody (Teams)';                            C='Admin';    S='Done';        N='Confirmed direction; M365 Business Standard via Connecting Up.' }
  @{ D='2026-04-01'; T='Initial Next.js website build';                                 C='Build';    S='Done';        N='Course version rebuilt into a modern Next.js app.' }
  @{ D='2026-07-01'; T='Switched donations and newsletter to Zeffy';                    C='Payments'; S='Done';        N='Free for charities, keeps 100 percent, auto tax receipts. Fixed Projects nav dropdown. Deployed to kindsisters-v2.vercel.app.' }
  @{ D='2026-07-02'; T='Applied content updates and real testimonials';                 C='Content';  S='Done';        N='12 April brief; testimonials and gallery from Jody.' }
  @{ D='2026-07-13'; T='Built self-editable CMS (Payload)';                             C='Build';    S='Done';        N='Blog, Gallery, Events, Testimonials. Roles, drafts, trash, version history. Branch feature/payload-cms.' }
  @{ D='2026-07-13'; T='Branded and polished the admin panel';                          C='Build';    S='Done';        N='KS logo, card icons, min 1200px uploads, lightbox and animation fixes.' }
  @{ D='2026-07-13'; T='Installed the real Zeffy donation form (AUD)';                  C='Payments'; S='Done';        N='Embed live on the donate page; CSP updated.' }
  @{ D='2026-07-13'; T='Prepared Australian hosting move (BinaryLane)';                 C='Hosting';  S='Done';        N='Standalone build verified; cutover runbook written (preserves M365 email).' }
  @{ D='2026-07-13'; T='Created shared list binarylane@kindsisters.org.au';             C='Comms';    S='Done';        N='Jody owner, Gavin member. Account emails reach both.' }
  @{ D='2026-07-13'; T='Created the Kind Sisters CMS user guide (PDF)';                 C='Content';  S='Done';        N='16-page branded guide for Jody and staff.' }
  @{ D='2026-07-16'; T='Jody to create the BinaryLane account (KS card)';               C='Hosting';  S='Blocked';     N='Only Jody can add the payment card. Details taken by phone.' }
  @{ D='2026-07-16'; T='Deploy the CMS to BinaryLane Perth and seed content';           C='Hosting';  S='To do';       N='After the account exists.' }
  @{ D='2026-07-16'; T='Zeffy newsletter form URL from Jody';                           C='Payments'; S='Blocked';     N='Newsletter sign-up still shows a placeholder until Jody builds the form.' }
  @{ D='2026-07-16'; T='DNS cutover preserving Microsoft 365 email';                    C='Hosting';  S='To do';       N='Move DNS, verify email before touching VentraIP.' }
  @{ D='2026-07-16'; T='Cancel VentraIP hosting (keep the domain)';                     C='Hosting';  S='To do';       N='Gated on Jody go-ahead and the 45-day refund window.' }
  @{ D='2026-07-16'; T='Push the branch and take the new site live';                    C='Build';    S='To do';       N='After review and Jody sign-off.' }
)
foreach ($e in $log) {
  Add-PnPListItem -List 'Project Log' -Values @{
    Title = $e.T; LogDate = $e.D; Category = $e.C; LogStatus = $e.S; LogNotes = $e.N
  } | Out-Null
  Write-Host 'Logged:' $e.T
}

Write-Host ''
Write-Host 'Done. Hub:' $hubUrl
