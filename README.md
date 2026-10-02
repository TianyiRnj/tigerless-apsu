# Apsu Homepage

A responsive implementation of the Apsu homepage take-home: Next.js (App Router), React, TypeScript (strict) and Tailwind CSS, built as a small component library plus one page.

- **Fidelity targets:** the 1440px desktop board and the 375px mobile board, including the mobile weight-loss / product / BMI board and the open mobile menu.
- **Integrity range:** 320px to 1920px, with no horizontal overflow, no wrapped navigation, and no overlapping or clipped content.

## Setup

```bash
npm install
npm run dev              # http://localhost:3000
npm run build            # production build (includes the TypeScript check)
npm run start            # serve the production build
npm run storybook        # component states at http://localhost:6006
npm run build-storybook  # static Storybook in storybook-static/
```

## Architecture

```
app/
  layout.tsx        root layout: fonts, metadata, skip link
  page.tsx          composes the sections in page order
  globals.css       Tailwind v4 theme tokens + the few global rules
  fonts.ts          next/font definitions (shared with Storybook)
components/
  ui/               reusable primitives: Button, IconButton, CheckList, Accordion, CarouselArrows, Icon
  cards/            repeated content cards: TreatmentCard, MedicationCard, CareFeatureCard, TestimonialCard
  layout/           page chrome: Header, MobileMenu, TrustBar, Footer
  sections/         one component per homepage section
types/home.ts       the content contract (future API shape)
data/home.ts        mock data that satisfies the contract
public/             supplied icons and images (unchanged)
.storybook/         Storybook config
ai-logs/            selected AI assistance JSONL
```

- **Server Components by default.** Only four client components exist, each because it owns state or needs a browser API:
  - `MobileMenu`: open state and the native `<dialog>`
  - `Accordion`: which item is open
  - `BmiAssessmentSection`: form and UI state
  - `CarouselArrows`: uses a clamped `scrollTo` call
- **Small client islands.** The care-feature carousel itself is server-rendered markup. Only its two arrow buttons are a client island.
- **Decorations stay local.** One-off decorative pieces live inside the section that owns them: the provider chat bubble, the sleep profile cards, the BMI gauge, and the CTA watermark.

## Data contracts

`types/home.ts` is written as the response a future homepage API could return, and is meant to be read first.

- `HomePageContent` is composed of section contracts: `HeroContent`, `HowItWorksContent`, `ProgramBaseContent`, `WeightLossProgramContent`, `PricedProgramContent`, `BmiContent`, `TestimonialsContent`, `FaqContent`, `FooterContent`, `LegalContent`, and so on.
- The program panels share `ProgramBaseContent`. Weight Loss (`WeightLossProgramContent`) requires an eyebrow and has no price. Birth Control and Sleep (`PricedProgramContent`) require a description and a price, so data for either that is missing its price fails the TypeScript check.
- `Testimonial` is a discriminated union (`kind: "quote" | "photo"`), so a photo testimonial can't carry a quote and rating by accident.
- `FaqItem.answer` is required.
- Prices are numbers; the "From $X/mo" text is formatted in the components.
- Links come in three shapes (see Known limitations for items without destinations):
  - `LinkItem` `{ label, href }`: `href` is required. Used for the Header and Mobile Menu navigation and the BMI options link.
  - `NavItem` `{ label, href? }`: `href` is optional. Used for Footer items, which render as plain text when there is no destination.
  - `Cta` `{ label, href? }`: `href` is optional. Without a destination the CTA renders as a real `<button>`.
- The contract contains no layout data: no colors, variants, or positions. Card tints, chip highlighting and decorative content are presentation choices made in the components.

`data/home.ts` provides the mock content with `satisfies HomePageContent`, which type-checks the data while keeping literal types. Dynamic homepage content comes from typed mock data. One-off, aria-hidden decorative mockup content remains co-located with the section that renders it.

## Responsive approach

- **Mobile-first Tailwind**, CSS only. There is no JavaScript layout logic and no separate desktop/mobile DOM trees.
- **Breakpoints:**
  - `sm` (640px): treatment cards become a balanced two-column layout with the third card centered; stacked testimonial cards gain enough height to preserve the portrait crop.
  - `md` (768px): testimonials become three compact columns, with smaller metadata and social badges only at this intermediate width.
  - `lg` (1024px): program panels and FAQ use two-column compositions, treatment cards become three columns, and desktop typography begins.
  - `xl` (1280px): desktop navigation, full-size treatment cards, and the two-panel BMI layout. The header's nav was measured to need about 1100px, so switching at 1280px leaves slack, and nav items are `whitespace-nowrap`.
- **Content column:** `page-container` is 1320px max with fluid gutters (20px on phones, 60px at 1440). Above 1440 the content stays centered while full-bleed bands (ticker, footer, carousel, white frames) stretch.
- **How It Works alignment:** from the `lg` breakpoint, both cards use the same fixed content offset so the "Human physicians" and "AI care assistant" headings stay level even though their checklists contain different numbers of items. The cards can still grow with wrapped content at narrower desktop widths.
- **Overflow:**
  - Decorative bands that intentionally overflow (language chips, ticker, CTA watermark, footer logo) clip themselves.
  - Images that overflow a panel on purpose (the program models) have matching section spacing.
  - Full-width buttons wrap their label rather than overflow at 320px.
- **Sticky navigation pill (self-designed scrolling behavior):** The white top of the Hero frame remains static in the normal document flow; only the existing rounded navigation pill stays visible while scrolling. At the top of the page, the pill keeps its original position, content, dimensions, controls, colors, and shadow. The behavior is CSS-only, with no hide/reveal animation, blur, resizing, or duplicate header. The pill sits 8px from the viewport top on mobile and 16px on desktop. Anchor targets use responsive `scroll-margin-top` values (5rem, increasing to 7.5rem from `lg`) so the floating pill does not cover section headings. The Header intentionally has no `id="top"`; the Apsu wordmarks keep `href="/#top"`, which uses the fragment's reserved top-of-document behavior to return to scroll position 0.
- **Verification:** the desktop page measures exactly the board height (10155px), and section tops are within a few pixels of the spec. Responsive checks cover phone, narrow tablet, tablet, small desktop and wide desktop widths; none create page-level horizontal overflow.

## Assets and images

- All raster images use `next/image`. Above-the-fold treatment images load eagerly; `priority` is deprecated in Next 16, so it is not used.
- The two medication cards intentionally share one image (`semaglutide.png`). The repeated treatment vial imagery is also intentional.
- The supplied trust icons are hard-coded white, so they are rendered as CSS masks tinted with `currentColor` (teal in the hero, white in the ticker). The files themselves are untouched.
- Small missing glyphs (arrows, chevron, check, star, globe, social logos) are inline SVG components in `components/ui/Icon.tsx`.
- The small "Apsu" wordmark and the CTA watermark are styled text. `apsu-logo.png` is only used for the large faded footer logo.
- **Alt text** is decided case by case:
  - decorative images use `alt=""`
  - images whose content is fully described by adjacent text use `alt=""` (the product vials, models, portrait)
  - informative care-feature photos get short descriptions
  - decorative icons are `aria-hidden`

## Accessibility

- One `h1`, a section heading hierarchy, landmarks (`header`, `nav`, `main`, `footer`), and a skip link.
- Native elements throughout:
  - `<a href>` for real on-page navigation
  - `<button>` for actions
  - plain text for items with neither
  - labelled inputs, with fieldsets and legends for the BMI groups
- The mobile menu is a native modal `<dialog>`, which provides the focus trap, Escape and focus return. The trigger exposes `aria-expanded` and `aria-controls`, and page scroll is locked while open.
- FAQ triggers use `aria-expanded` and `aria-controls`. Collapsed answers are `inert`.
- Every interactive element has a visible keyboard focus ring (2px brand outline, white on the footer).
- Language chips carry their `lang` attribute.
- The ticker is not a tab stop.
- `prefers-reduced-motion` removes transition and smooth-scroll effects; the language rows and trust ticker intentionally remain animated (see below).

## Design deviations

Only clear typos, broken content or misleading states were changed. All design colors, gradients and tints are kept exactly as specified.

| Original | Implemented | Reason |
|---|---|---|
| "Loss Weight In Your Way." | "Lose Weight In Your Way." | One-word typo fix ("Loss" → "Lose"); the rest of the heading is unchanged. |
| Footer group "Comapny" | "Company" | Typo. |
| BMI unit toggle "cm/kgs" | "cm/kg" | Unit typo. |
| Final CTA "Start free consultations" | "Start a free consultation" | Grammar; matches the hero CTA. |
| BMI result shows "56" while all inputs are 0 | "—" until Calculate is pressed with every field filled | Showing a personal result before any input is misleading. |
| BMI legend "<18.5 - 24.9" and "<25.0 - 29.9" | "18.5 - 24.9" and "25.0 - 29.9" | The stray "<" made the ranges wrong; only that symbol was removed. |
| Sleep: "Non-habit-forming Physician-prescribed For sensitive sleepers" | "Non-habit-forming, physician-prescribed for sensitive sleepers." | Capitalization and punctuation only; no words added. |
| Ticker "Cash-pay, No Issuance Needed" | "Cash-pay, No Insurance Needed" | Typo; the page's own wording elsewhere is "no insurance needed". |
| Merged language chip "Русскийالعربية" | Two chips: "Русский" and "العربية" | Two languages were merged into one chip. |
| Mobile menu shown as an inset rounded panel | Full-viewport native modal, with its controls aligned to the navigation bar | Uses the available space on small screens, preserves generous touch targets, and avoids clipped menu content at short viewport heights. The native `<dialog>` also provides modal focus behavior and Escape handling. |
| BMI unit selector omitted on mobile | Unit selector remains available at every viewport width | Mobile users should be able to choose imperial or metric units instead of being forced into one measurement system. Keeping the same control across layouts also makes the form behavior consistent. |

**Kept as designed:**
- "Easy Manager Treatment" and "David L"
- all original colors, including the hero-claim teal `#21AC88`
- the shared medication image
- the differences between the desktop and mobile boards that do not remove useful controls: the mobile board omits the Birth Control description, the weight-loss and FAQ eyebrows, the BMI legend and options link, and uses "Your Score" instead of "Your BMI Score"

**Implementation notes** (not design changes):
- FAQ answers 2–4 are not in the design. They are composed only from copy that appears elsewhere in it: the "40+ Languages" claim plus the chip list, "Cash-pay, no insurance needed", and the compounding sentence quoted from the footer disclaimer. Approved answers should replace them.
- `testimonials/customer.png` has the name, location and social icons baked into the bitmap. The card crops that strip off and renders the caption as live HTML over the design's gradient.
- `care/provider-support.png` contains only the phone. The chat bubble from the design is rebuilt in HTML/CSS, and its avatar reuses the same image cropped to the face.

## Interaction states and motion (self-designed)

The design has no hover or pressed states, so these follow one restrained system: about 200ms, `cubic-bezier(0, 0, 0.2, 1)`, no layout shift, and resting colors never change.

| Element | Hover | Pressed | Focus-visible | Other |
|---|---|---|---|---|
| Primary button | Ink `#102B1C` → `#1E4630`; the arrow disc nudges 2px right | `#0A1D12` + `scale(0.98)` | 2px `#00774D` outline, 3px offset | Disabled: 40% opacity, no pointer events |
| Secondary button ("See plans") | White → `#EEF5F1`; arrow nudge | `#E1ECE6` + `scale(0.98)` | Same ring | — |
| Outline button (Login) | 5% ink tint | 10% ink tint + `scale(0.98)` | Same ring | — |
| Brand/Home link (Apsu wordmark) | Brand green | Dark ink `#0A1D12` | Same ring (existing global brand outline) | Shared 200ms color transition |
| Header and menu nav links | Brand green + underline | Ink | Same ring | — |
| Footer links | White + underline | Mint `#B8D9C6` | White ring | Items without a destination are plain text, with no states |
| Icon buttons (menu, close, carousel arrows) | Ring fills with ink; the icon turns white | `scale(0.94)` | Same ring | — |
| FAQ item | Closed: question and chevron ring turn brand green. Open header darkens slightly | Closed: tinted background. Open: darker green | Same ring | Chevron rotates 180° (200ms); answer reveals by grid-row transition (250ms) |
| BMI inputs and radio pills | Border `#CDDCD3` → `#AFC1B6` | — | Ring around the whole pill | Selected radio is filled ink. After an invalid submit, the instruction line turns into a red error message in the same place, so the layout height never changes |
| BMI unit toggle | 5% ink tint | 10% ink tint | Ring around the segment | Selected segment is ink with white text |
| "See your GLP-1 Options" | Brand green + underline; arrow nudge | Darker ink | Same ring | — |
| Mobile menu | — | — | — | Fades in over 200ms; page scroll locked while open |
| Language chips | Pauses | — | Not focusable | Two continuous 32s CSS loops use three repeated groups to keep both edges filled, move in opposite directions on phone and desktop, and resume when the pointer leaves |
| Trust ticker | Pauses | — | Not focusable | Continuous 40s linear CSS loop that resumes when the pointer leaves. There is no pause button, so it does not claim WCAG 2.2.2 compliance |
| Skip link | — | — | Appears top-left | — |

**Reduced motion:** with `prefers-reduced-motion: reduce`, transitions collapse to about 0ms, anchor scrolling is instant, and the carousel arrows jump instead of gliding. The language rows and trust ticker continue their default loops and still pause on hover.

## Storybook

`npm run storybook` renders the production components with the real mock data and the real Tailwind styles. Every component with internal state has one story per state:

| Component | Stories |
|---|---|
| `Layout/MobileMenu` | Closed, Open |
| `UI/Accordion (FAQ)` | Closed, Open |
| `Sections/BmiAssessmentSection` | Default, Error, Result |
| `UI/Button` | Primary, Secondary, Outline, Disabled |

- **State props:** `MobileMenu` (`defaultOpen`) and `Accordion` (`defaultOpenId`) take ordinary initial-state props. `BmiAssessmentSection` takes an optional `initialState` so each state can be shown without interaction.
- **Carousel:** it has no React UI state (native scroll plus `scrollBy`), so it has no stories.
- **Versions:** Storybook uses `@storybook/nextjs-vite`. The versions were chosen at install time (Storybook 10.6 with Vite 8) and are pinned by `package-lock.json`. Docgen uses `react-docgen`.

## AI usage

- **OpenAI Codex / ChatGPT:** initialized or helped initialize the project scaffold, reviewed the assignment, reviewed the supplied designs and assets, and helped develop and review the implementation plan.
- **Claude Code (Claude Opus 5.5):** developed the detailed implementation plan; wrote the data contracts, mock data, components, sections, Storybook setup and stories, and this documentation; and ran the visual comparison and responsive checks.

**Decisions made or changed by the author during review:**
- the simplified scope and minimal contracts
- the BMI being a UI-state demo
- keeping all design colors
- the exact deviation list, including "Lose Weight In Your Way."
- the ticker behavior
- the link and button semantics
- the git-ignored references

The interviewer approved a selected project-relevant record instead of complete raw transcripts. [`ai-logs/AI_LOG.jsonl`](ai-logs/AI_LOG.jsonl) retains the key planning, implementation, debugging, review, and verification messages in a curated JSONL conversation.

## Reference files

The assignment PDF, element-spec PDF and design screenshots stay together in the local `references/` directory. The whole directory is git-ignored and is not part of the submission:

- `references/Front-End Take-Home Assignment (1).pdf`
- `references/detailed-element-spec.pdf`
- `references/home-desktop.png`
- `references/home-mobile.png`
- `references/menu-mobile.png`
- `references/weight-loss-mobile.png`

Runtime assets under `public/` are tracked normally.

## Known limitations

- **No flow behind action buttons.** Login, Get started, Start a free consultation, and the birth control / sleep consult CTAs are real buttons, but no flow exists behind them.
- **Items without destinations are plain text.** About Apsu, Blogs, Terms, Privacy Policy, Medication Safety Information, Terms & Conditions, and the social icons are shown because the design shows them. No destinations were supplied, so there are no fake links or invented routes.
- **The BMI section is a UI-state demo, not a medical calculator.** A valid submit shows the design's fixed result (56). Nothing is calculated, units are not converted, and the sex selection is visual only.
- **FAQ answers 2–4 are composed** from existing design copy (see above).
- **The language rows and ticker only pause on hover.** There is no pause button or keyboard pause.
- **The chat-bubble avatar** reuses the supplied provider photo.
- **Non-Latin language chips** (Korean, Chinese, Hindi, Russian, Arabic) use system fonts because Work Sans doesn't include those scripts.
