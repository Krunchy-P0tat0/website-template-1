# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.

## Named Restore Points

Memorable keyphrases the user can use to ask me to roll back the project to a
specific past checkpoint. When the user says something like "revert to <name>"
or "go back to <name>", suggest a rollback to the matching checkpoint commit.

| Keyphrase         | Checkpoint commit                          | Captured state |
|-------------------|--------------------------------------------|----------------|
| `atelier-anchor`  | `1bd48e3227db3b4a22838f87d211e5ce57a569d8` | Aurelia & Co. site after: inquiry form office field removed, photos swapped to watermark-free Pexels/Unsplash sources, /privacy + /terms pages live, expanded /contact with vendor/careers/press sections, newsletter subscription popup wired to `/api/newsletter` and storing into `newsletter_subscriptions`. |

## Brand Voice Notes (Aurelia & Co.)

- **Luxury positioning** — limited number of events accepted per year. Every inquiry goes through a vetting/screening process (intro video call, etc.) before a project is confirmed.
- **Auto-reply tone (when built)** — must be a measured acknowledgement, not a confirmation. Wording should be along the lines of "your enquiry has reached our atelier and a member of our team will be in touch shortly to learn more." Never imply that the event is confirmed or that we will definitely produce it.
- **Notifications** — Telegram notifications are live for inquiries, newsletter signups, and vendor applications via `TELEGRAM_BOT_TOKEN` + `TELEGRAM_CHAT_ID` secrets.

## Imagery (Aurelia & Co.)

All site imagery is sourced from real photography on Pexels — no AI-rendered
local PNGs are referenced from JSX. All photos must show an event in progress
(never landmarks, empty landscapes, or tourist shots).

**Editorial brief**: "Vogue editorial meets best night of your life" — guests
laughing, dancing, toasting, or caught in a genuine moment. Mix of weddings,
galas, corporate VIP, and private parties. No empty setups; human energy first.

- `artifacts/aurelia/src/lib/realPhotos.ts` — single source of truth.
  - `destinationPhotos` — one unique URL per destination. Updated May 2026:
    fixed Tulum (landscape → forest ceremony), Rio (added Brazilian outdoor
    wedding), New York (celebration party energy), London (black-tie groom).
  - `scenes` — page-level imagery: heroHome (luxury reception centrepieces),
    weddingsService, corporateService, privateService, portfolio, journal, etc.
  - `accentPhotos` — backwards-compat alias for older imports.
- `artifacts/aurelia/src/lib/destinationContent.ts` — 27 archetype galleries
  (4 photos each). All completely rewritten May 2026: resolved all same-page
  hero/gallery conflicts (Dubai, London, Provence, Rio, Venice, etc.), removed
  landscapes, replaced empty-setup shots with event photography, added
  comments describing what each photo should show.
- No gallery photo ever repeats its destination's hero photo (same-page rule).
  Different archetypes may share a URL (different pages = acceptable).
- All URLs use Pexels' `?w=` resize parameter for responsive delivery.
- Local PNGs under `artifacts/aurelia/public/images/` are no longer used.

## Destination Detail Pages

- Each of the 41 destinations (37 event locations + 4 offices) has its own
  detail page at `/destinations/:slug` (e.g. `/destinations/lake-como`).
- Content lives in `artifacts/aurelia/src/lib/destinationContent.ts`:
  - 27 archetype galleries — coherent 4-photo sets grouped by event style
    (italianLake, caribbeanBeach, indianMandap, etc.). Photos within an
    archetype are visually/thematically similar by design.
  - Per-destination editorial: slug, hero, gallery, tagline, paragraphs,
    signature venues, season. Galleries are NEVER mixed across archetypes.
  - Exports: `destinationContent` (slug map), `allDestinationContent`,
    `slugify()`, `make()` helper, `archetypeGalleries`.
- Page component: `artifacts/aurelia/src/pages/destination-detail.tsx` —
  hero, tagline, story, 4-photo gallery, signature venues, stats, CTA,
  related destinations from same region.
- Map markers and the regional list on `destinations.tsx` now navigate to
  the detail pages (the old slide-over drawer was removed).

