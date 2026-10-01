import { Inter_Tight, Work_Sans } from "next/font/google";

export const workSans = Work_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-work-sans",
  display: "swap",
});

// Only used for the styled "Apsu" wordmark.
export const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: "700",
  variable: "--font-inter-tight",
  display: "swap",
});
