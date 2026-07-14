# Changelog

All notable changes to the System Hustle website and sales deck.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

---

## [Unreleased]

## [1.0.0] - 2026-07-14

Full redesign: dark SaaS-style site replaced with a boutique/editorial style
(cream paper, Fraunces serif + IBM Plex Mono, hairline rules, one accent
color). Backfilled in one session after the fact — see below for the full
scope, condensed from the working session.

### Added
- `index.html` — full rewrite. New sections: What You Get (value stack),
  How I Reach Your Market (The Sweep / The Watch — replaced an earlier
  "Three Layers" funnel model after a correction: it's two parallel
  processes, not a sequential narrowing), Why Most Outbound Fails
  (old-way-vs-new-way), A Signal In Practice (real unedited email exhibit —
  screenshots, not retyped text), What Lands On Your Calendar, Results
  (4 case studies), Who's Behind This + Next Step (merged), FAQ.
- Inline Cal.com booking widget (`Cal("init", ...)`, `inline` embed —
  always-expanded, not a popup-on-click) replacing a plain calendar link.
  Hero and post-Results CTAs scroll-anchor to it instead of leaving the page.
- Real photo (cropped to a transparent-background circle from a source JPEG
  that had a dark square background), LinkedIn, WhatsApp (wa.me link), and
  personal email surfaced in the About section and footer.
- FAQ risk-reversal ("commission-only?" objection) added as its own item —
  deliberately not hidden, since the objection is already the market-default
  expectation (this niche's competitors typically pitch pay-per-meeting), not
  something the page would be introducing to a visitor's mind.
- Risk-reversal / pilot framing pulled out of the FAQ into its own visible
  block right next to the booking widget, since it was the strongest
  objection-handler on the page and almost nobody opens FAQ accordions.
- `signal-deck.html` replaced — was an old, more aggressive/pain-agitation
  recruiting-only pitch deck ("Your BD pipeline is either feast or famine").
  Swapped for the same boutique-editorial deck built for and matching the
  site (8 print-paginated 16:9 slides, `@page` sized for a clean PDF export),
  updated with the same Sweep/Watch framing and pilot language as the site.
- PDF export of the deck at `C:\Users\79818\Documents\System Hustle -
  Company Deck.pdf`, generated via headless Chrome print-to-pdf (not a
  browser print dialog) so it reproduces exactly — 8 landscape pages.
- `drafts/index-boutique.html` and `drafts/signal-deck-boutique.html` kept
  as the review copies before each promotion to the live files — same
  content as `index.html` / `signal-deck.html` after every promotion, not a
  divergent branch.

### Changed
- Pricing language site-wide: the old FAQ said "pricing is tied to
  results — you pay based on the meetings we book, not a flat retainer, no
  long-term contracts" (pure pay-per-meeting/success-fee framing). This no
  longer matched the actual sales approach (paid pilot → retainer,
  scarcity-based: 1-2 new clients/quarter, long-term fit over one-off
  campaigns) — reworded everywhere pricing came up, without stating a number
  anywhere on the page (kept for the call).
- H2 section headlines: dropped from 900-weight/large size (fine in
  isolation on a single deck slide, "громоздкий"/heavy when repeated down a
  long scrolling page) to 600-weight/smaller — one loud moment (H1 hero),
  quiet section headers after that.
- Hero H1 reduced ~1.5x in size after it still read too heavy even after the
  H2 pass.
- Results section: went 4 → 7 case studies (added ForPlayers, Fabulingua,
  HelpCare AI from `templates/case-studies/_index.md`) → back to 4 on
  request, to match the deck 1:1. Case studies are licensed from a
  mentor/partner ("myoProcess"), used with permission — noted once during
  the session, not re-litigated per case added/removed.
- "If You Already Reach Out Yourself" (LinkedIn-split, priority-list table)
  removed from the site — judged as material for an already-warm lead on a
  call or in the deck, not for a cold visitor who hasn't decided to talk yet.
  Still present in the deck.
- FAQ Q1 reworded twice: "What if prospects don't respond to our
  messaging?" (ambiguous "our" — Leonid writes the messages himself, not a
  team) → "What if prospects just don't respond?" → "Cold outreach doesn't
  work anymore — why would this be different?" (final: plain-language
  objection framing instead of a vague hedge).
- FAQ Q2 reworded: "How is this different from other agencies?" implicitly
  categorized System Hustle as one more agency among agencies — changed to
  "Why not just hire a lead-gen agency instead?" with a concrete contrast
  (agencies: $4-5K retainer upfront, generic job-title blasts).
- FAQ items switched to native `<details name="faq-group">` so opening one
  closes the others (no JS needed — supported natively, not a popup/JS
  accordion).
- Voice convention fixed throughout: "I" for personal/trust moments (cover,
  About, confirmation/handoff language), "we" for process/methodology
  description — was drifting into repetitive "I did X. I did Y. I did Z."
  in early drafts.
- "A stack, not a subscription." (What You Get headline) → "What you get."
  — plainer, no clever-but-unclear wordplay.
- Real example message: originally a hand-typed monospace recreation of the
  Meredith→Angelo/Holle Baby Food email; replaced with the actual email
  client screenshots (sent message + reply) for a real trust signal instead
  of retyped text.
- LinkedIn deliverable description rewritten from "a ready-to-send LinkedIn
  list" (read as a plain contact list) to a positioned callout: "makes your
  existing LinkedIn outbound 2-3x sharper" — contact, opening message, both
  follow-ups, timed — plus phone numbers/cold-calling as another channel
  where findable.
- Signal type list (Funding/M&A/Leadership/Key Exit/Growth) moved from a
  standalone section at the bottom of "How I Reach Your Market" into The
  Watch column directly, always visible (not behind a `<details>` toggle) —
  was reading as an orphaned, disconnected block; also judged too important
  ("a real technology, not a detail") to hide behind a click most visitors
  won't make.
- Proof section repurposed: originally repeated the same 6-step mechanism
  explanation already covered by The Sweep/The Watch — replaced with "One
  real signal, start to finish," centered on the real exhibit images only,
  removing the redundant step list.
- Added `og:title`, `og:description`, `og:image` (temporarily the avatar —
  flagged as needing a real 1200x630 banner later), `og:url`,
  `twitter:card`, and a `<meta name="description">` — page previously had no
  link-preview metadata at all.
- Case-study section heading "Results On File" → "Results" (the "on file"
  dossier-style phrasing was left over from an earlier concept direction and
  read as confusing — "what file?" — once the visual style moved on from it).

### Fixed
- Avatar photo had a dark square background around the circular crop in the
  source file — re-cropped in Python/PIL to a transparent-background PNG,
  and downsized from 276KB to 79KB (500x500 → 240x240, plenty for a
  64-104px display size).
- Stray text fragment ("No account m...") that landed mid-way through the
  real exhibit email during manual editing of an earlier draft — removed.
