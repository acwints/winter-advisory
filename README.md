# Winter Advisory Site

This repo is the public Winter Advisory website and intake surface.
It contains the marketing site, the terminal-style prospect chat, and the
contact/inquiry flow.

It is not the main Winter Advisory operating system.

## Canonical Holding Company OS

If you are looking for the Winter Advisory holding company OS (built on Paperclip), portfolio coordination, or
shared operating state, start here instead:

- OS repo: `/Users/andrewwinter/Documents/GitHub/winter/winter-os` (GitHub: `acwints/winter-os`)
- Winter Advisory instance: `/Users/andrewwinter/Documents/GitHub/winter/winter-os/instances/winter-advisory`

That Paperclip instance is the system of record for:

- portfolio priorities
- operating briefs and routines
- reports and scorecards
- agent roles and coordination rules
- links out to product repos and support assets

This repo should stay focused on the public-facing site.

## What This Repo Owns

- homepage and public positioning
- contact page and inquiry capture
- terminal-style intake experience
- public-site analytics and attribution

## Local Development

Run the site locally:

```bash
npm run dev
```

Then open `http://localhost:3000`.

## Key Paths

- `src/app/page.tsx`: homepage
- `src/app/contact/page.tsx`: contact page
- `src/app/api/intake-agent/route.ts`: prospect chat intake agent
- `src/app/api/contact/route.ts`: inquiry submission pipeline
- `src/components/TerminalInterface.tsx`: terminal UI

## Routing Rule For Agents

If a request is about Winter Advisory strategy, portfolio coordination, daily
operating review, or cross-business prioritization, use the HQ paths above
instead of this repo.

## Inquiry Delivery to the Holding Company OS

The public website remains separately deployable. `/api/contact` can send each
inquiry to the canonical Paperclip decision inbox as an unassigned backlog issue.
It does not approve work, wake an agent, or authorize contacting the visitor.
Submitted text is explicitly marked untrusted and included as quoted data for
private review.

Set all three **server-only** environment variables to enable this integration:

```dotenv
WINTER_OS_URL=https://your-private-os.example.com
WINTER_OS_COMPANY_ID=your-winter-advisory-company-uuid
WINTER_OS_INTAKE_TOKEN=your-server-side-api-token
```

Use an intake identity authorized to create decisions in that company. The
adapter sends `Authorization: Bearer <token>` to
`POST /api/companies/:companyId/decisions`. Never use `NEXT_PUBLIC_` variables for
these settings. The visitor cannot select the destination, company, credentials,
assignee, approval state, or action scope. Set `WINTER_OS_URL` to the server origin only (no `/api` or other path prefix).
The server requires HTTPS; HTTP on
localhost, 127.0.0.1, or ::1 is accepted for local nonproduction development only.
Redirects are rejected, and requests time out after 10 seconds.

When **all** OS variables are absent, the existing Google Sheets pipeline remains
available through `GOOGLE_CLIENT_EMAIL`, `GOOGLE_PRIVATE_KEY`, and
`GOOGLE_SHEET_ID` (the `Contact` tab, columns A:R). Values are written as raw text.
Partial OS configuration is an error. When the OS is configured but fails, the
public endpoint returns a generic delivery failure and does **not** silently
switch to Sheets. Only a valid OS acknowledgment matching the configured company and submitted
origin produces `{ "success": true }`;
private issue IDs, URLs, credentials, and backend errors are never returned.

The browser generates a submission UUID for each logical form submission and
retains it on a retry; changing the form creates a new submission ID. The server
combines this UUID with a digest of the normalized payload, so even a reused UUID
with changed content creates a distinct decision. Chat
submissions without a UUID use a SHA-256 digest of the exact normalized allowed
fields, so identical chat retries deduplicate. Origins are namespaced
`public-intake:`. Identical chat submissions remain the same canonical decision;
a changed payload creates a new one. Deduplication requires the OS endpoint's
company-scoped origin uniqueness.

Inputs have field-specific length limits (10,000 characters for the workflow;
200 for names; 254 for email), and requests over 40 KB are rejected. Inquiry
content and transport errors are not logged by the contact pipeline.

Run adapter checks with Node 22.18+ (native TypeScript support):

```bash
npm run test:intake
npm run typecheck
npm run build
```

These checks use mocked delivery only; no test sends a real inquiry. Setting up
production credentials and deploying either application are separate operations.
