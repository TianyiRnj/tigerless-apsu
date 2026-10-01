import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  args: { children: "Start a free consultation", withArrow: true },
  argTypes: {
    variant: { control: "inline-radio", options: ["primary", "secondary", "outline"] },
    size: { control: "inline-radio", options: ["md", "lg", "responsive"] },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { variant: "primary", size: "lg" },
};

export const Secondary: Story = {
  args: { variant: "secondary", children: "See plans" },
  // Secondary buttons sit on the tinted program panels in the design.
  decorators: [(Story) => <div className="rounded-2xl bg-tint-mint p-6"><Story /></div>],
};

export const Outline: Story = {
  args: { variant: "outline", children: "Login", withArrow: false },
};

export const Disabled: Story = {
  args: { variant: "primary", size: "lg", disabled: true },
};
