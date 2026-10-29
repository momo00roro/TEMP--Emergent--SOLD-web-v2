# PRD — SOLD AI Studio (Puture-style rebuild)

## Original problem statement
High-Fidelity Puture-Style Rebuild for Sold Singapore: web marketing site rebuild replicating the Puture (https://puture.co.kr/en/) experience as closely as possible on desktop, adapting sold.com.sg content and SEO structure, motion simplification allowed on mobile. Phase 1: public site + enquiry/contact forms only. Phase 2: CMS editing. Preserve trust/social proof, SEO/content pages, brand messaging; keep factual content, rewrite messaging into the new flow; preserve URL structure. Stack: React + TypeScript, FastAPI, MongoDB; Lenis smooth scroll; motion-heavy desktop.
User choices: Puture URL https://puture.co.kr/en/; enquiries saved + emailed to hello@sold.com.sg; new look-alike visuals (no Puture files); first build = homepage, key service pages and contact.

## Architecture
- Frontend: CRA + craco, TypeScript (.tsx), Tailwind + tokenized CSS (src/index.css), framer-motion, Lenis. Content in src/lib/content.ts (ready to move to CMS).
- Backend: FastAPI `/api/enquiries` (validation, honeypot, min-fill-time, per-IP rate limit 5/10min) → MongoDB `enquiries` → async email via Emergent managed Resend (email_service.py) to ENQUIRY_NOTIFY_EMAIL; email_status stored per enquiry.
- SEO: static head + JSON-LD + noscript, per-route title/description/canonical (Seo.tsx), robots.txt, sitemap.xml, llms.txt. Docs: /app/docs/parity-system.md (tokens, motion map, URL map).

## Personas
Brand/marketing leads evaluating a design partner; search visitors landing on service/work pages; prospects needing proof before enquiring.

## Implemented (2026-10-29)
- Home: preloader, kinetic hero (masked lines, CSS-3D tiles, parallax, scroll tilt), trust bar (10 client logos + awards) right under hero, manifesto with highlight blocks, studio intro + counters, 7 service cards + CTA card, works list with sticky clip-wipe preview, pinned AI-first method (desktop) / stacked (mobile), 6 testimonials, editorial marquee, contact section with form
- Pages: /studio/, /services/ (anchors per service), /works/, /works/:slug (13 legacy slugs), /contact/, 404
- Global: nav with + boxes & mobile menu, chapter indicator, fixed grid/beam scene, footer
- Enquiry API + Mongo storage verified; email send wired but currently refused with `insufficient_credits` (owner credits)

## Backlog
- P0: Top up Emergent credits so enquiry emails deliver; attach sold.com.sg domain + server 301s for any extra legacy URLs
- P1: Full case-study content per work page; Phase 2 CMS (admin login, editable sections/testimonials/works, enquiry inbox)
- P2: Analytics hooks, CRM integration, booking flow, multilingual
