# SOLD × Puture-style — Parity System (Phase 0–1 deliverable)

## Reference inventory (puture.co.kr/en, observed 2026-10-29)
Sections: Welcome hero → About manifesto (highlight blocks) → Service cards ×3 → Work list (award-led) → Process (pinned, terminal text, % counter) → Studio (layer stack) → Contact. Fixed bottom-left chapter indicator, top-right nav with "+" boxes, blue CTA. Background: perspective grid plane with "+" markers, starfield, electric-blue light beam right, glossy 3D blue icon tiles (WebGL).
Replaced (not copied): all Puture assets/3D — rebuilt as original CSS-3D tiles, CSS grid plane, SVG mark. Puture copy not reused.

## Tokens (src/index.css :root, src/lib/motion.ts)
- Colour: bg #03060F, bg-2 #070D1E, ink #F4F6FB / #C3CBDA / #A9B4C8, line rgba(255,255,255,.1), blue #2D6BFF, blue-2 #5B8CFF, blue-3 #7DA2FF, deep #1A47C9, card #FFF / ink #0B1220
- Type: Hanken Grotesk 300–600 (fallback Helvetica Neue, Arial), JetBrains Mono for chips/labels/terminal
  - hero clamp(3.4rem, 9.2vw, 10rem) / lh .98 / -0.045em · page-title clamp(3rem, 8vw, 8.5rem) · section clamp(2.2rem, 4.6vw, 4.6rem) / -0.035em · manifesto clamp(1.9rem, 4.4vw, 4.4rem) · mono labels 11px / .2em
- Spacing: container 1440px, gutter clamp(20px, 4.2vw, 72px); sections py-28 → md:py-40; grid unit 120px (scene), 22px (cards)
- Motion: ease-out [0.16,1,0.3,1], ease-io [0.65,0,0.35,1]; durations 0.45 / 0.8 / 1.15s; stagger chars .018s, lines .09s, items .08s; reveal y 28px; viewport once, amount .15
- Z layers: scene 0 · content 10 · chapter 40 · mobile menu 45 · nav 50 · preloader 100
- Breakpoints: Tailwind sm 640 / md 768 / lg 1024 (pinned + parallax only ≥1024)

## Motion map
Preloader 0→100 counter (1.1s, once per session) → curtain clip-path lift (0.95s) → hero masked line reveal + tiles pop-in (staggered .06s) → scroll: hero parallax/fade, tiles tilt in 3D (rotateX 0→38°), grid plane scrolls at 0.25×, beam drifts.
Section titles: per-char blur/fade rise. Manifesto: blue highlight blocks wipe in (scaleX). Service cards rise with rotateX 18→0. Works: hover swaps sticky image via clip-path wipe. Method: 360vh pinned, 4 steps, terminal lines type in, % counter. Marquee 70s linear.
Mobile/tablet (<1024): no Lenis on touch, no pin (stacked cards), no pointer parallax, fewer tiles. prefers-reduced-motion stops marquee/stars/float + Lenis.

## URL map (sold.com.sg preserved)
| Legacy URL | New route | Action |
|---|---|---|
| / | / | kept |
| /studio/ | /studio/ | kept |
| /services/ (+ #ai-process) | /services/ | kept (anchor kept on method section) |
| /works/ | /works/ | kept |
| /works/{koba, radiant-health, moms-up, quotz, sccci, nine-social, sunwheel, selleys-flyer, nippon-paint-sumo-buddies, saughtandfound, nippon-paint-b2b, homerenoguru, idental} | same | kept (template) |
| /contact/ | /contact/ | kept |
| /index.html | / | client redirect |
| /assets/images/* | /assets/images/* | same filenames kept |
Unknown URLs render a crawlable 404 page with links. Server-side 301s for any URL not listed need hosting-level config at go-live.
