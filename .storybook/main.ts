import type { StorybookConfig } from "@storybook/nextjs-vite";

const config: StorybookConfig = {
  framework: "@storybook/nextjs-vite",
  stories: ["../components/**/*.stories.tsx"],
  staticDirs: ["../public"],
  typescript: {
    // Babel-based docgen parser (the framework default).
    reactDocgen: "react-docgen",
  },
};

export default config;
