import { TreatmentCard } from "@/components/cards/TreatmentCard";
import { Button } from "@/components/ui/Button";
import { MaskIcon } from "@/components/ui/Icon";
import type { HeroContent, Language, Treatment } from "@/types/home";

const treatmentTints = ["bg-tint-mint", "bg-tint-pink", "bg-tint-aqua"];
const highlightedLanguages = new Set(["中文", "Português"]);
const chipFade =
  "[mask-image:linear-gradient(90deg,transparent,#000_40px,#000_calc(100%-40px),transparent)] lg:[mask-image:linear-gradient(90deg,transparent,#000_120px,#000_calc(100%-120px),transparent)]";

function GlobeIcon() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true" className="size-4 shrink-0 lg:size-5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10" cy="10" r="8.25" />
      <path d="M3 7.5h3.5l1.5 2-1 2.5 1.5 2.5V18M17 6.5h-3l-1.5 2.5 1.5 2h3M10 1.75v3l-1.5 1.5" />
    </svg>
  );
}

// Icons for the three hero claims, in the same order as the content.
const claimIcons = [
  <GlobeIcon key="globe" />,
  <MaskIcon key="stethoscope" src="/icons/trust/stethoscope.svg" className="size-4 lg:size-5" />,
  <MaskIcon key="truck" src="/icons/trust/truck.svg" className="size-4 lg:size-5" />,
];

/** One row of chips. Extra hidden copies on both sides fill the faded edges, as in the design. */
function ChipRow({ languages }: { languages: Language[] }) {
  return (
    <div className="flex justify-center gap-2 lg:gap-4">
      {[1, 0, 2].map((copy) => (
        <ul key={copy} aria-hidden={copy > 0 || undefined} className="flex shrink-0 gap-2 lg:gap-4">
          {languages.map((language) => (
            <li
              key={language.label}
              lang={language.lang}
              className={`flex h-8 items-center rounded-full border border-chip px-4 text-sm leading-[1.24] whitespace-nowrap lg:h-11 lg:px-8 lg:text-base ${
                highlightedLanguages.has(language.label) ? "bg-chip text-graphite" : "bg-page text-chip-text"
              }`}
            >
              {language.label}
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}

interface HeroSectionProps {
  hero: HeroContent;
  treatments: Treatment[];
}

export function HeroSection({ hero, treatments }: HeroSectionProps) {
  return (
    // Bottom half of the white frame started by the Header.
    <section
      aria-labelledby="hero-title"
      className="mx-3 rounded-b-[20px] bg-white px-2 pb-2 lg:mx-7 lg:rounded-b-[32px] lg:px-7 lg:pb-7"
    >
      <div className="mx-auto max-w-[1320px]">
        <div className="flex flex-col items-center px-3 pt-[50px] text-center lg:pt-20">
          <ul className="flex flex-wrap justify-center gap-x-3.5 gap-y-2 text-xs leading-[1.6] font-medium text-teal lg:gap-x-6 lg:text-sm">
            {hero.claims.map((claim, index) => (
              <li
                key={claim}
                // On phones the last claim sits on its own first row, as in the mobile design.
                className={`flex items-center gap-2 lg:py-1 ${index === 2 ? "order-first basis-full justify-center sm:order-none sm:basis-auto" : ""}`}
              >
                {claimIcons[index]}
                {claim}
              </li>
            ))}
          </ul>
          <h1
            id="hero-title"
            className="mt-3.5 max-w-[872px] text-[36px] leading-[1.25] font-medium text-ink lg:mt-3 lg:text-[72px] lg:leading-[1.1]"
          >
            {hero.title} <span className="text-brand">{hero.titleHighlight}</span>
          </h1>
          <p className="mt-4 text-base leading-[1.6] lg:text-xl">
            {hero.description.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </p>
          <Button href={hero.cta.href} size="lg" withArrow className="mt-6">
            {hero.cta.label}
          </Button>
        </div>

        <div className={`mx-auto mt-6 flex max-w-[1080px] flex-col gap-2 overflow-hidden lg:mt-8 lg:gap-4 ${chipFade}`}>
          <ChipRow languages={hero.languages.slice(0, 6)} />
          <ChipRow languages={hero.languages.slice(6)} />
        </div>

        <div className="mt-9 grid gap-6 lg:mt-14 xl:grid-cols-3">
          {treatments.map((treatment, index) => (
            <TreatmentCard key={treatment.id} treatment={treatment} className={treatmentTints[index]} />
          ))}
        </div>
      </div>
    </section>
  );
}
