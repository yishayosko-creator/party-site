# Project memory

## Product intent & audience

- Site selling printable party games for kids' birthday parties (Bingo cards, Trivia sheets, board games).
- Audience: parents/organizers planning kids' birthday celebrations.

## Brand personality & voice

- Festive, bright, playful, celebration-focused.
- Production-quality, polished — not cookie-cutter.

## Visual design & UX direction

- Tailwind CSS + Lucide React icons; `@/` path alias maps to `src/`.
- Hero showcase: 3-tile grid — top main image (kids birthday party), bottom-left image (balloons/decor), bottom-right styled printable product preview.
- Rounded corners (`rounded-2xl` / `rounded-3xl`); responsive grid stacks on mobile.
- Product preview built in-page as a real 25-cell Bingo grid with a star in the centre cell (not an image mockup).
- Imagery sourced from Pexels (photos of kids birthday parties, balloons/confetti).

## Decisions, constraints & rationale

- Printables preview is rendered as actual UI (25-cell grid) rather than a static image so the real product is showcased.
- Avoided hidden-cell grid workarounds that leave layout gaps; used a single 25-cell list instead.
- Typecheck, lint, and build all pass after hero changes.

## Open questions & assumptions

- Hero spacing and small-text legibility on the Bingo card preview are unverified in-browser.
- Assumed Pexels images are acceptable and properly licensed for production use.