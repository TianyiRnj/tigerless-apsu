import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { homePageContent } from "@/data/home";

import { Accordion } from "./Accordion";

const meta = {
  title: "UI/Accordion (FAQ)",
  component: Accordion,
  args: { items: homePageContent.faq.items },
  decorators: [(Story) => <div className="max-w-[760px]"><Story /></div>],
} satisfies Meta<typeof Accordion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: { defaultOpenId: null },
};

export const Open: Story = {
  args: { defaultOpenId: homePageContent.faq.items[0].id },
};
