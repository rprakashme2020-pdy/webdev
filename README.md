# Prakash — School Admission Engine + AI

Mobile-first Next.js 16 / React 19 / TypeScript / Tailwind one-page school marketing portfolio for Pondicherry and Chennai.

## Develop and verify

`npm ci`, `npm run dev`, `npm run typecheck`, `npm run lint`, `npm run build`.

The production build exports static HTML to `out/`. Vercel uses the committed `vercel.json` to build and serve that directory; no server or database is needed for this portfolio.

## Contact configuration

Edit `lib/config.ts` for phone, WhatsApp, website and portrait. Current numbers are copied from the existing portfolio. The admission checker adds the completed answers to the WhatsApp audit request without saving parent or school data.

## Analytics

Every conversion pushes `whatsapp_click`, `call_click`, `audit_click` or `ai_interest_click` with `cta_location` into `window.dataLayer` and emits `portfolio:conversion`. Connect your analytics provider to these hooks to collect reports; no analytics account is configured by this project.

## Demonstrations and claims

The AI conversation, CRM records and school comparison are explicitly fictional demonstrations. AI and CRM are service previews, not connected school systems. No testimonials, school client logos, partnerships or admission guarantees are claimed. The 14+ year experience statement was confirmed by Prakash.

The existing jobs page is preserved at `/jobs.html` and linked in the footer. The previous laptop website remains in the repository's historical static files for reference; the exported Next homepage is served in production.
