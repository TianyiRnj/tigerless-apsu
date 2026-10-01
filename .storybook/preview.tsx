import type { Preview } from "@storybook/nextjs-vite";

import { interTight, workSans } from "../app/fonts";
import "../app/globals.css";

// Same as the root layout: the font variables live on <html> so the theme tokens resolve.
document.documentElement.classList.add(workSans.variable, interTight.variable);

const preview: Preview = {
  parameters: {
    layout: "padded",
    viewport: {
      options: {
        mobile: { name: "Mobile (375)", styles: { width: "375px", height: "800px" }, type: "mobile" },
        desktop: { name: "Desktop (1440)", styles: { width: "1440px", height: "900px" }, type: "desktop" },
      },
    },
  },
};

export default preview;
