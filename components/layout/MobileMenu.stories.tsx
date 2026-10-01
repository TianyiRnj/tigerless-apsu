import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { homePageContent } from "@/data/home";

import { MobileMenu } from "./MobileMenu";

const meta = {
  title: "Layout/MobileMenu",
  component: MobileMenu,
  args: { content: homePageContent.header },
  globals: { viewport: { value: "mobile" } },
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div className="flex justify-end bg-white p-5">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof MobileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Closed: Story = {
  args: { defaultOpen: false },
};

export const Open: Story = {
  args: { defaultOpen: true },
};
