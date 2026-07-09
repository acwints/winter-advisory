# Winter Advisory Site

This repo is the public Winter Advisory website and intake surface.
It contains the marketing site, the terminal-style prospect chat, and the
contact/inquiry flow.

It is not the main Winter Advisory operating system.

## Canonical HQ

If you are looking for the real Winter Advisory HQ, portfolio coordination, or
shared operating state, start here instead:

- HQ repo: `/Users/andrewwinter/Documents/GitHub/winter/hq`
- Winter Advisory instance: `/Users/andrewwinter/Documents/GitHub/winter/hq/instances/winter-advisory`

That HQ instance is the system of record for:

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
