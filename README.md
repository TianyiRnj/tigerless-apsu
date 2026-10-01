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
ai-logs/            AI session transcripts (see ai-logs/README.md)
```

- **Server Components by default.** Only four client components exist, each because it owns state or needs a browser API:
  - `MobileMenu`: open state and the native `<dialog>`
  - `Accordion`: which item is open
  - `BmiAssessmentSection`: form and UI state
  - `CarouselArrows`: calls `scrollBy`
- **Small client islands.** The care-feature carousel itself is server-rendered markup. Only its two arrow buttons are a client island.
- **Decorations stay local.** One-off decorative pieces live inside the section that owns them: the provider chat bubble, the sleep profile cards, the BMI gauge, and the CTA watermark.

## Data contracts

`types/home.ts` is written as the response a future homepage API could return, and is meant to be read first.

- `HomePageContent` is composed of section contracts: `HeroContent`, `HowItWorksContent`, `ProgramContent`, `BmiContent`, `TestimonialsContent`, `FaqContent`, `FooterContent`, `LegalContent`, and so on.
- `Testimonial` is a discriminated union (`kind: "quote" | "photo"`), so a photo testimonial can't carry a quote and rating by accident.
- `FaqItem.answer` is required.
- Prices are numbers; the "From $X/mo" text is formatted in the components.
- Navigation and CTAs share one minimal shape, `{ label, href? }`. A missing `href` means the design shows the item but no destination exists yet (see Known limitations).
- The contract contains no layout data: no colors, variants, or positions. Card tints, chip highlighting and decorative content are presentation choices made in the components.

`data/home.ts` provides the mock content with `satisfies HomePageContent`, which type-checks the data while keeping literal types. All major visible copy lives there; components mostly render typed props.

## Responsive approach

- **Mobile-first Tailwind**, CSS only. There is no JavaScript layout logic and no separate desktop/mobile DOM trees.
- **Breakpoints:**
  - `lg` (1024px): two-column compositions (program panels, FAQ, testimonials) and desktop typography.
  - `xl` (1280px): desktop navigation, three treatment cards in a row, and the two-panel BMI layout. These switch later because they need the extra width. The header's nav was measured to need about 1100px, so switching at 1280px leaves slack, and nav items are `whitespace-nowrap`.
- **Content column:** `page-container` is 1320px max with fluid gutters (20px on phones, 60px at 1440). Above 1440 the content stays centered while full-bleed bands (ticker, footer, carousel, white frames) stretch.
- **Overflow:**
  - Decorative bands that intentionally overflow (language chips, ticker, CTA watermark, footer logo) clip themselves.
  - Images that overflow a panel on purpose (the program models) have matching section spacing.
  - Full-width buttons wrap their label rather than overflow at 320px.
- **Verification:** the desktop page measures exactly the board height (10155px), and section tops are within a few pixels of the spec. A temporary script (not part of the repo) swept every 10px from 320 to 1920 for page overflow, escaped elements, overflowing controls and nav wrapping.

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
- `prefers-reduced-motion` is respected everywhere (see below).

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

**Kept as designed:**
- "Easy Manager Treatment" and "David L"
- all original colors, including the hero-claim teal `#21AC88`
- the shared medication image
- the differences between the desktop and mobile boards: the mobile board omits the Birth Control description, the weight-loss and FAQ eyebrows, the BMI unit toggle, legend and options link, and uses "Your Score" instead of "Your BMI Score"

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
| Header and menu nav links | Brand green + underline | Ink | Same ring | — |
| Footer links | White + underline | Mint `#B8D9C6` | White ring | Items without a destination are plain text, with no states |
| Icon buttons (menu, close, carousel arrows) | Ring fills with ink; the icon turns white | `scale(0.94)` | Same ring | — |
| FAQ item | Closed: question and chevron ring turn brand green. Open header darkens slightly | Closed: tinted background. Open: darker green | Same ring | Chevron rotates 180° (200ms); answer reveals by grid-row transition (250ms) |
| BMI inputs and radio pills | Border `#CDDCD3` → `#AFC1B6` | — | Ring around the whole pill | Selected radio is filled ink; the error message (red text) appears only after an invalid submit |
| BMI unit toggle | 5% ink tint | 10% ink tint | Ring around the segment | Selected segment is ink with white text |
| "See your GLP-1 Options" | Brand green + underline; arrow nudge | Darker ink | Same ring | — |
| Mobile menu | — | — | — | Fades in over 200ms; page scroll locked while open |
| Trust ticker | Pauses | — | Not focusable | Continuous 40s linear CSS loop that resumes when the pointer leaves. There is no pause button, so it does not claim WCAG 2.2.2 compliance |
| Skip link | — | — | Appears top-left | — |

**Reduced motion:** with `prefers-reduced-motion: reduce`, transitions collapse to about 0ms, the ticker stops and shows statically, anchor scrolling is instant, and the carousel arrows jump instead of gliding.

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
- manual transcript export

The complete, unedited session transcripts are added to [`ai-logs/`](ai-logs/) by the author through manual export. [`ai-logs/README.md`](ai-logs/README.md) lists the expected files. If a transcript is not in that folder, it has not been added yet.

## Reference files

The assignment PDF, the element-spec PDF and the full-page screenshots stay local and are git-ignored by exact name:

- `Front-End Take-Home Assignment (1).pdf`
- `detailed-element-spec.pdf`
- `home-desktop.png`
- `home-mobile.png`
- `menu-mobile.png`
- `weight-loss-mobile.png`

Runtime assets under `public/` are tracked normally.

## Known limitations

- **No flow behind action buttons.** Login, Get started, Start a free consultation, and the birth control / sleep consult CTAs are real buttons, but no flow exists behind them.
- **Items without destinations are plain text.** About Apsu, Blogs, Terms, Privacy Policy, Medication Safety Information, Terms & Conditions, and the social icons are shown because the design shows them. No destinations were supplied, so there are no fake links or invented routes.
- **The BMI section is a UI-state demo, not a medical calculator.** A valid submit shows the design's fixed result (56). Nothing is calculated, units are not converted, and the sex selection is visual only.
- **FAQ answers 2–4 are composed** from existing design copy (see above).
- **The ticker only pauses on hover.** There is no pause button or keyboard pause.
- **The chat-bubble avatar** reuses the supplied provider photo.
- **Non-Latin language chips** (Korean, Chinese, Hindi, Russian, Arabic) use system fonts because Work Sans doesn't include those scripts.
