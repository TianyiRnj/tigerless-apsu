"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";

import { ArrowRingIcon } from "@/components/ui/Icon";
import type { BmiContent } from "@/types/home";

// UI-state demo only: nothing is calculated from the inputs.
type Status = "default" | "error" | "result";
type Unit = "imperial" | "metric";

interface MeasureField {
  id: string;
  unit: string;
  label: string;
}

// Inputs shown for each unit system. Switching systems swaps the inputs and clears them.
const fieldsByUnit: Record<Unit, { height: MeasureField[]; weight: MeasureField }> = {
  imperial: {
    height: [
      { id: "feet", unit: "ft", label: "feet" },
      { id: "inches", unit: "in", label: "inches" },
    ],
    weight: { id: "pounds", unit: "lbs", label: "pounds" },
  },
  metric: {
    height: [{ id: "centimeters", unit: "cm", label: "centimeters" }],
    weight: { id: "kilograms", unit: "kg", label: "kilograms" },
  },
};

// Static gauge geometry from the design: the filled arc covers the right half of the ring.
const RADIUS = 94;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const CAP = 4; // round line caps extend each end by half the stroke width
const ACTIVE_ARC = `${CIRCUMFERENCE / 2 - 2 * CAP} ${CIRCUMFERENCE}`;
const TRACK_ARC = `0 ${(CIRCUMFERENCE * 190) / 360 + CAP} ${(CIRCUMFERENCE * 160) / 360 - 2 * CAP} ${CIRCUMFERENCE}`;

const labelClasses = "text-sm leading-none xl:text-base";
const pillClasses =
  "flex h-10 items-center rounded-full border border-line px-4 transition-colors hover:border-rule has-focus-visible:outline-2 has-focus-visible:outline-offset-3 has-focus-visible:outline-brand xl:h-[52px]";

function SortGlyph() {
  return (
    <svg viewBox="0 0 11 18" aria-hidden="true" className="mx-1.5 h-4 w-2.5 shrink-0 xl:mx-[6.5px] xl:h-[18px] xl:w-[11px]">
      <path fill="#758c7d" d="M5.5 0 11 6.5H0L5.5 0Zm0 18L0 11.5h11L5.5 18Z" />
    </svg>
  );
}

function MeasureInput({
  field,
  groupLabel,
  value,
  onChange,
}: {
  field: MeasureField;
  groupLabel: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className={`${pillClasses} bg-field`}>
      <span className="sr-only">
        {groupLabel} in {field.label}
      </span>
      <input
        type="number"
        inputMode="decimal"
        min={0}
        placeholder="0"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full min-w-0 [appearance:textfield] bg-transparent text-sm leading-[1.6] text-heading outline-none placeholder:text-heading xl:text-lg [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
      />
      <SortGlyph />
      <span aria-hidden="true" className="text-sm leading-[1.6] text-unit xl:text-lg">
        {field.unit}
      </span>
    </label>
  );
}

interface BmiAssessmentSectionProps {
  content: BmiContent;
  /** Initial UI state; lets Storybook show each state without interaction. */
  initialState?: Status;
}

export function BmiAssessmentSection({ content, initialState = "default" }: BmiAssessmentSectionProps) {
  const [status, setStatus] = useState<Status>(initialState);
  const [unit, setUnit] = useState<Unit>("imperial");
  const [values, setValues] = useState<Record<string, string>>({});
  const [sex, setSex] = useState(content.sexOptions[1] ?? "");

  const fields = fieldsByUnit[unit];
  const showResult = status === "result";

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const complete = [...fields.height, fields.weight].every((field) => values[field.id]?.trim());
    setStatus(complete ? "result" : "error");
  }

  function changeUnit(next: Unit) {
    setUnit(next);
    setValues({});
    setStatus("default");
  }

  function setValue(id: string, value: string) {
    setValues((current) => ({ ...current, [id]: value }));
  }

  return (
    <section aria-labelledby="bmi-title" className="page-container mt-8">
      <div className="xl:rounded-3xl xl:bg-white xl:p-3">
        <div className="relative isolate overflow-hidden rounded-xl p-3 xl:rounded-2xl xl:px-16 xl:py-10">
          {/* The supplied photo has transparent margins; the oversized box keeps them out of view. */}
          <div className="absolute -inset-x-[1%] -top-[1.5%] -bottom-[3%] -z-20">
            <Image
              src={content.backgroundSrc}
              alt=""
              fill
              sizes="(min-width: 1280px) 1320px, 100vw"
              className="object-cover"
            />
          </div>
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[#3c3a3a99]" />

          <form
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby="bmi-title"
            className="mx-auto grid max-w-[555px] rounded-[10px] border border-[#bcffe6] bg-white p-3 [grid-template-areas:'intro'_'result'_'fields'] xl:max-w-none xl:grid-cols-[555fr_589fr] xl:gap-x-6 xl:rounded-none xl:border-0 xl:bg-transparent xl:p-0 xl:[grid-template-areas:'intro_result'_'fields_result']"
          >
            <div className="[grid-area:intro] xl:rounded-t-2xl xl:border-x xl:border-t xl:border-[#bcffe6] xl:bg-white xl:px-[25px] xl:pt-[25px]">
              <div className="hidden justify-between text-base leading-[1.32] tracking-[2px] text-brand xl:flex">
                <p>{content.eyebrow}</p>
                <p>{content.badge}</p>
              </div>
              <h2
                id="bmi-title"
                className="text-lg leading-[1.28] font-medium text-heading xl:mt-3 xl:max-w-[320px] xl:text-2xl xl:leading-[1.16]"
              >
                {content.title}
              </h2>
              {/* The error replaces the instruction line, so the layout height never changes. */}
              {status === "error" ? (
                <p role="alert" className="mt-2 text-sm leading-[1.6] text-[#b42318] xl:mt-4 xl:text-lg">
                  {content.errorMessage}
                </p>
              ) : (
                <p className="mt-2 text-sm leading-[1.6] xl:mt-4 xl:text-lg">{content.instructions}</p>
              )}
            </div>

            <div className="mt-6 [grid-area:fields] xl:mt-0 xl:rounded-b-2xl xl:border-x xl:border-b xl:border-[#bcffe6] xl:bg-white xl:px-[25px] xl:pb-[25px]">
              <fieldset className="hidden xl:block">
                <legend className="sr-only">Units</legend>
                <div className="-mt-1 inline-flex gap-1 rounded-full border border-ink p-[3.5px]">
                  {(["imperial", "metric"] as const).map((option) => (
                    <label
                      key={option}
                      className="flex h-[43px] w-[83px] cursor-pointer items-center justify-center rounded-full text-sm leading-[1.6] font-medium text-ink transition-colors hover:bg-ink/5 active:bg-ink/10 has-checked:bg-ink has-checked:text-white has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-brand"
                    >
                      <input
                        type="radio"
                        name="bmi-unit"
                        value={option}
                        checked={unit === option}
                        onChange={() => changeUnit(option)}
                        className="sr-only"
                      />
                      {content.unitLabels[option]}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-2 xl:mt-4 xl:grid-cols-[258fr_235fr] xl:gap-3">
                <fieldset>
                  <legend className={labelClasses}>{content.fieldLabels.height}</legend>
                  <div className="mt-2 grid grid-cols-2 gap-3">
                    {fields.height.map((field) => (
                      <div key={field.id} className={fields.height.length === 1 ? "col-span-2" : ""}>
                        <MeasureInput
                          field={field}
                          groupLabel={content.fieldLabels.height}
                          value={values[field.id] ?? ""}
                          onChange={(value) => setValue(field.id, value)}
                        />
                      </div>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend className={labelClasses}>{content.fieldLabels.weight}</legend>
                  <div className="mt-2">
                    <MeasureInput
                      field={fields.weight}
                      groupLabel={content.fieldLabels.weight}
                      value={values[fields.weight.id] ?? ""}
                      onChange={(value) => setValue(fields.weight.id, value)}
                    />
                  </div>
                </fieldset>
              </div>

              <fieldset className="mt-3 xl:mt-4">
                <legend className={labelClasses}>{content.fieldLabels.sex}</legend>
                <div className="mt-2 grid grid-cols-2 gap-3 xl:w-[258px]">
                  {content.sexOptions.map((option) => (
                    <label
                      key={option}
                      className={`${pillClasses} cursor-pointer gap-1 text-base leading-[1.6] text-heading xl:text-lg`}
                    >
                      <input
                        type="radio"
                        name="bmi-sex"
                        value={option}
                        checked={sex === option}
                        onChange={() => setSex(option)}
                        className="size-[21.5px] shrink-0 appearance-none rounded-full border-[1.5px] border-rule bg-white shadow-[inset_0_0_0_3.5px_#fff] transition-colors outline-none checked:border-ink checked:bg-ink"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </fieldset>

              <button
                type="submit"
                className="mt-6 h-11 w-full rounded-full bg-ink text-lg text-white transition hover:bg-ink-hover active:scale-[0.98] active:bg-ink-active xl:h-14"
              >
                {content.submitLabel}
              </button>
            </div>

            <div className="mt-1 [grid-area:result] xl:mt-0 xl:self-end xl:rounded-2xl xl:border xl:border-[#0c1b2e14] xl:bg-white xl:px-[25px] xl:py-[33px]">
              <div className="relative mx-auto size-[138px] xl:size-[217px]">
                <svg viewBox="0 0 217 217" aria-hidden="true" className="size-full">
                  <circle cx="108.5" cy="108.5" r="108" fill="none" stroke="#a0a0a1" strokeDasharray="4 4" />
                  <g transform="rotate(-90 108.5 108.5)" fill="none" stroke="#009269" strokeWidth="8" strokeLinecap="round">
                    <circle
                      cx="108.5"
                      cy="108.5"
                      r={RADIUS}
                      strokeOpacity="0.2"
                      strokeDasharray={showResult ? TRACK_ARC : undefined}
                    />
                    <circle
                      cx="108.5"
                      cy="108.5"
                      r={RADIUS}
                      strokeDasharray={ACTIVE_ARC}
                      strokeDashoffset={-CAP}
                      className={`transition-opacity duration-200 ${showResult ? "opacity-100" : "opacity-0"}`}
                    />
                  </g>
                </svg>
                <div aria-live="polite" className="absolute inset-0 flex flex-col items-center justify-center text-center text-graphite">
                  <p className="text-5xl leading-[1.24] xl:text-[56px]">{showResult ? content.demoScore : "—"}</p>
                  <p className="text-xs leading-[1.32] xl:max-w-[89px] xl:text-lg">
                    <span className="xl:hidden">{content.scoreLabelShort}</span>
                    <span className="hidden xl:inline">{content.scoreLabel}</span>
                  </p>
                </div>
              </div>

              <div className="mt-8 hidden xl:block">
                <div className="h-1.5 rounded-full bg-[linear-gradient(90deg,#3b82f6,#1a8a79,#f59e0b,#ef4444)]" />
                <ul className="mt-3 flex justify-between text-xs leading-none text-muted">
                  {content.legend.map((item) => (
                    <li key={item.label} className="whitespace-nowrap">
                      {item.label}
                      <span className="ml-1">{item.range}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={content.optionsLink.href}
                  className="group mt-6 inline-flex items-center gap-2 rounded-sm text-base leading-[1.24] text-ink underline-offset-4 transition-colors hover:text-brand hover:underline active:text-ink-active"
                >
                  {content.optionsLink.label}
                  <ArrowRingIcon className="size-6 transition-transform group-hover:translate-x-0.5" />
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
