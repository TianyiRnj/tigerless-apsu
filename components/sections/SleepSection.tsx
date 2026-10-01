import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import type { ProgramContent } from "@/types/home";

/** Decorative patient-profile cards from the design, layered over the photo. */
function ProfilePreview() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-x-[1.3%] bottom-[13%] flex gap-[2%] xl:right-[1%] xl:bottom-[9.5%] xl:left-[2.5%] xl:gap-3"
    >
      <div className="flex-[378] rounded-xl bg-white px-2 pt-2 pb-3 shadow-[0_8px_24px_rgba(2,29,23,0.12)] xl:p-4">
        <p className="border-b border-dashed border-line pb-3.5 text-base leading-[1.16] font-medium text-ink xl:pb-3 xl:text-2xl">
          Olivia Gomes
        </p>
        <div className="mt-4 flex items-end justify-between gap-1 whitespace-nowrap">
          <p className="flex items-baseline gap-[clamp(2px,1vw,12px)]">
            <span className="text-base leading-[1.24] font-medium text-heading xl:text-[32px]">78</span>
            <span className="text-[clamp(10px,3vw,12px)] leading-[1.6] text-brand xl:text-lg">Normal</span>
          </p>
          <p className="flex items-baseline gap-[clamp(2px,1vw,12px)]">
            <span className="text-base leading-[1.24] font-medium text-heading xl:text-[32px]">89.5%</span>
            <span className="text-[clamp(10px,3vw,12px)] leading-[1.6] text-brand xl:text-lg">Progress</span>
          </p>
        </div>
      </div>
      <div className="flex flex-[185] flex-col rounded-xl bg-white px-2 pt-2 pb-3 shadow-[0_8px_24px_rgba(2,29,23,0.12)] xl:p-4">
        <p className="text-base leading-[1.16] font-medium whitespace-nowrap text-forest xl:text-2xl">Your profile</p>
        <div className="mt-auto h-1.5 rounded-full bg-[linear-gradient(90deg,#3b82f6,#1a8a79,#f59e0b,#ef4444)]" />
        <p className="mt-1.5 text-xs leading-[1.6] text-brand xl:text-lg">82%</p>
      </div>
    </div>
  );
}

export function SleepSection({ program }: { program: ProgramContent }) {
  return (
    <section id={program.id} aria-labelledby="sleep-title" className="page-container pt-8 lg:pt-20">
      <div className="relative overflow-hidden rounded-[20px] bg-tint-aqua lg:flex lg:min-h-[718px] lg:items-center lg:justify-end lg:overflow-visible lg:rounded-[32px]">
        <div className="relative z-10 p-3 lg:mr-8 lg:w-[46.6%] lg:px-8 lg:py-8">
          <h2 id="sleep-title" className="text-[32px] leading-[1.24] font-medium text-heading lg:text-[52px]">
            {program.title}
          </h2>
          <div className="mt-4 space-y-1 text-base leading-[1.6] lg:mt-8 lg:text-xl">
            {program.description?.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <CheckList
            items={program.points}
            iconClassName="text-gauge"
            className="mt-4 text-base leading-[1.6] lg:text-xl"
          />
          <div className="mt-6 border-t border-[#83f2ec] pt-6 lg:mt-8">
            <p className="text-[32px] leading-[1.16] font-medium text-heading">
              From <span className="text-[52px] leading-[1.24]">${program.price}</span>/mo
            </p>
            <Button
              href={program.cta.href}
              variant="secondary"
              size="responsive"
              withArrow
              fullWidth
              className="mt-4 lg:w-auto lg:justify-start"
            >
              {program.cta.label}
            </Button>
          </div>
        </div>
        <div className="relative mx-auto mt-2 w-full max-w-[336px] lg:absolute lg:bottom-0 lg:left-[1.3%] lg:mt-0 lg:w-[45.2%] lg:max-w-[596px]">
          <Image
            src={program.imageSrc}
            alt={program.imageAlt}
            width={596}
            height={752}
            sizes="(min-width: 1024px) 46vw, 336px"
            className="h-auto w-full"
          />
          <ProfilePreview />
        </div>
      </div>
    </section>
  );
}
