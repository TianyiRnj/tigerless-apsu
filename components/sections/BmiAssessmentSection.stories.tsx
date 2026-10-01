import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { homePageContent } from "@/data/home";

import { BmiAssessmentSection } from "./BmiAssessmentSection";

const meta = {
  title: "Sections/BmiAssessmentSection",
  component: BmiAssessmentSection,
  args: { content: homePageContent.bmi },
  globals: { viewport: { value: "desktop" } },
  parameters: { layout: "fullscreen" },
  decorators: [(Story) => <div className="py-8"><Story /></div>],
} satisfies Meta<typeof BmiAssessmentSection>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Untouched form: no score is shown until Calculate succeeds. */
export const Default: Story = {
  args: { initialState: "default" },
};

/** Calculate pressed with empty fields. */
export const ErrorState: Story = {
  name: "Error",
  args: { initialState: "error" },
};

/** The fixed demo result shown after a valid submit (not a calculated value). */
export const Result: Story = {
  args: { initialState: "result" },
};
