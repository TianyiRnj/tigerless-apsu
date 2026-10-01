import type { Metadata } from "next";
import type { ReactNode } from "react";

import { interTight, workSans } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apsu — Healthcare that speaks your language",
  description:
    "Care in the language you think in. US-licensed physicians, AI translates your consultation.",
};

type RootLayoutProps = Readonly<{
  children: ReactNode;
}>;

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${workSans.variable} ${interTight.variable}`}>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only rounded-full bg-ink px-5 py-3 text-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
