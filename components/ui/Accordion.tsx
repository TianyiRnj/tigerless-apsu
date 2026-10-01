"use client";

import { useId, useState } from "react";

import type { FaqItem } from "@/types/home";

import { ChevronIcon } from "./Icon";

interface AccordionProps {
  items: FaqItem[];
  /** Item expanded on first render; defaults to the first item. Pass null to start collapsed. */
  defaultOpenId?: string | null;
}

export function Accordion({ items, defaultOpenId = items[0]?.id ?? null }: AccordionProps) {
  const [openId, setOpenId] = useState(defaultOpenId);
  const baseId = useId();

  return (
    <div className="flex flex-col gap-5">
      {items.map((item) => {
        const open = item.id === openId;
        const buttonId = `${baseId}-${item.id}-button`;
        const panelId = `${baseId}-${item.id}-panel`;

        return (
          <div
            key={item.id}
            className={`overflow-hidden rounded-xl transition-shadow ${
              open ? "bg-faq-panel shadow-[0_8px_24px_rgba(2,31,24,0.08)]" : "bg-white"
            }`}
          >
            <h3>
              <button
                id={buttonId}
                type="button"
                aria-expanded={open}
                aria-controls={panelId}
                onClick={() => setOpenId(open ? null : item.id)}
                className={`group flex w-full items-center justify-between gap-2 px-4 py-4 text-left text-xl leading-[1.16] font-medium transition-colors lg:gap-4 lg:px-6 lg:py-6 lg:text-2xl ${
                  open
                    ? "border-b border-dashed border-chip bg-faq text-white hover:bg-[#4f6a5a] active:bg-[#46604f]"
                    : "text-title hover:text-brand active:bg-faq-panel"
                }`}
              >
                <span>{item.question}</span>
                <span
                  aria-hidden="true"
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full bg-white transition-colors ${
                    open
                      ? "text-title"
                      : "border border-line text-[#858586] group-hover:border-brand group-hover:text-brand"
                  }`}
                >
                  <ChevronIcon
                    className={`size-6 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              inert={!open}
              className={`grid transition-[grid-template-rows] duration-250 ${
                open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="mt-1 bg-white px-4 py-4 text-base leading-[1.6] lg:p-6 lg:text-lg">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
