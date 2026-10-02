import Image from "next/image";

import { CareFeatureCard } from "@/components/cards/CareFeatureCard";
import { CarouselArrows } from "@/components/ui/CarouselArrows";
import type { CareFeaturesContent, Feature } from "@/types/home";

const TRACK_ID = "care-track";

/** Decorative chat preview layered over the provider-support phone mockup. */
function ProviderChat({ avatarSrc }: { avatarSrc: string }) {
  // The design reuses the provider's face as the chat avatar; crop it from the phone mockup.
  const avatar = (size: string) => (
    <span className={`relative shrink-0 ${size}`}>
      <span className="relative block size-full overflow-hidden rounded-full bg-white">
        <Image
          src={avatarSrc}
          alt=""
          fill
          sizes="80px"
          className="origin-[47.5%_34%] scale-[2.8] object-cover object-[47%_30%]"
        />
      </span>
      <span className="absolute right-0 bottom-0 size-[5px] rounded-full border border-white bg-gauge" />
    </span>
  );

  return (
    <div
      aria-hidden="true"
      className="absolute top-[290px] left-[97px] w-[220px] rounded-xl bg-[#eaf7ee] px-[9px] pt-[9px] pb-2 text-[8px] shadow-[0_8px_24px_rgba(2,34,39,0.12)] lg:top-[412px] lg:left-[143px]"
    >
      <div className="flex items-center gap-1.5">
        <svg viewBox="0 0 14 14" className="size-3.5 text-[#91a699]" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
          <path d="M8.5 3.5 5 7l3.5 3.5" />
        </svg>
        {avatar("size-7")}
        <div className="leading-[1.4]">
          <p className="text-heading">Dr. Helena Fox</p>
          <p className="text-[7px] text-brand">Online</p>
        </div>
        <svg viewBox="0 0 34 14" className="ml-auto h-3.5 w-[34px] text-ink" fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round">
          <path d="M3.4 1.6h2l1 2.6-1.3.9a6.2 6.2 0 0 0 3.8 3.8l.9-1.3 2.6 1v2a1.3 1.3 0 0 1-1.4 1.3A9.6 9.6 0 0 1 2 3a1.3 1.3 0 0 1 1.4-1.4Z" />
          <rect x="22.5" y="3" width="8" height="8" rx="1.5" />
          <path d="m30.5 6 2.6-1.6v5.2L30.5 8" />
        </svg>
      </div>
      <div className="mt-2 flex items-center gap-2 text-body">
        <span className="h-px flex-1 bg-line" />
        Today
        <span className="h-px flex-1 bg-line" />
      </div>
      <div className="mt-2 flex items-end gap-2">
        {avatar("size-[18px]")}
        <div className="flex-1 rounded-md bg-white/60 p-1.5 leading-[1.24]">
          <p className="text-graphite">Dr. Helena Fox</p>
          <p className="mt-0.5 text-[#69706c]">Hello! How are you feeling today?</p>
          <p className="text-right text-body">10:00 AM</p>
        </div>
      </div>
      <div className="mt-1.5 ml-[26px] rounded-md bg-ink p-1.5 leading-[1.24] text-white">
        <p>I’m feeling fine, thank you! Just want to follow up on my recent tests.</p>
        <p className="mt-0.5 text-right">10:00 AM</p>
      </div>
    </div>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  switch (feature.id) {
    case "provider-support":
      return (
        <CareFeatureCard
          feature={feature}
          variant="cutout"
          sizes="(min-width: 1024px) 320px, 245px"
          mediaClassName="bottom-0 left-1/2 aspect-[320/528] w-[245px] -translate-x-1/2 lg:w-[320px]"
        >
          <ProviderChat avatarSrc={feature.imageSrc} />
        </CareFeatureCard>
      );
    case "fda-options":
      return (
        <CareFeatureCard
          feature={feature}
          variant="cutout"
          sizes="(min-width: 1024px) 373px, 326px"
          mediaClassName="right-0 bottom-[60px] aspect-[373/341] w-[326px] lg:bottom-[76px] lg:left-[10px] lg:w-[373px]"
        />
      );
    case "free-shipping":
      // This photo has transparent margins; enlarge its box so they fall outside the card.
      return (
        <CareFeatureCard
          feature={feature}
          variant="photo"
          sizes="(min-width: 1024px) 420px, 370px"
          mediaClassName="-inset-x-[5.5%] -top-[3%] -bottom-[4%]"
        />
      );
    default:
      return <CareFeatureCard feature={feature} variant="photo" sizes="(min-width: 1024px) 382px, 333px" />;
  }
}

export function CareFeaturesSection({ content }: { content: CareFeaturesContent }) {
  return (
    <section aria-labelledby="care-title" className="pt-[60px] pb-14 lg:pt-[200px] lg:pb-[120px]">
      <div className="page-container flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2
          id="care-title"
          className="text-[32px] leading-[1.24] font-medium text-ink lg:max-w-[9.2em] lg:text-[52px]"
        >
          {content.title}
        </h2>
        <CarouselArrows targetId={TRACK_ID} className="self-end" />
      </div>

      <ul
        id={TRACK_ID}
        aria-label={content.title}
        // Side padding matches the page-container offset so the first card lines up with the content column.
        className="mt-6 flex snap-x snap-mandatory scroll-px-[max(clamp(1.25rem,4vw,3.75rem),calc((100%-82.5rem)/2))] gap-3 overflow-x-auto px-[max(clamp(1.25rem,4vw,3.75rem),calc((100%-82.5rem)/2))] [scrollbar-width:none] lg:page-container lg:mt-12 lg:gap-6 lg:scroll-px-0 lg:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {content.features.map((feature) => (
          <li key={feature.id} className="shrink-0 snap-start">
            <FeatureCard feature={feature} />
          </li>
        ))}
      </ul>
    </section>
  );
}
