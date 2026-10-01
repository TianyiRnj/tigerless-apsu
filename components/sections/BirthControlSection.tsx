import Image from "next/image";

import { Button } from "@/components/ui/Button";
import { CheckList } from "@/components/ui/CheckList";
import type { ProgramContent } from "@/types/home";

export function BirthControlSection({ program }: { program: ProgramContent }) {
  return (
    <section id={program.id} aria-labelledby="birth-control-title" className="page-container pt-[60px] lg:pt-[120px]">
      <div className="relative overflow-hidden rounded-[20px] bg-tint-pink lg:flex lg:min-h-[718px] lg:items-center lg:overflow-visible lg:rounded-[32px]">
        <div className="relative z-10 p-3 lg:w-[52%] lg:py-8 lg:pl-16">
          <h2
            id="birth-control-title"
            className="text-[32px] leading-[1.24] font-medium text-balance text-heading lg:max-w-[562px] lg:text-[52px]"
          >
            {program.title}
          </h2>
          {/* The mobile design omits the description, so it only appears in the desktop layout. */}
          {program.description?.map((paragraph) => (
            <p key={paragraph} className="mt-8 hidden text-xl leading-[1.6] lg:block">
              {paragraph}
            </p>
          ))}
          <CheckList items={program.points} className="mt-4 text-base leading-[1.6] lg:text-xl" />
          <div className="mt-6 border-t border-[#ffc0ff] pt-6 lg:mt-8">
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
        <Image
          src={program.imageSrc}
          alt={program.imageAlt}
          width={405}
          height={751}
          sizes="(min-width: 1024px) 31vw, 215px"
          className="mx-auto mt-2 h-auto w-[215px] lg:absolute lg:right-[5.2%] lg:bottom-0 lg:mt-0 lg:w-[30.7%] lg:max-w-[405px]"
        />
      </div>
    </section>
  );
}
