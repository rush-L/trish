import { Fraunces, Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";

// Editorial display serif — headlines, chapter titles, pull quotes.
export const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600", "700"],
});

// High-contrast serif — ghost RMP monogram only.
export const playfair = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ghost",
  weight: ["400"],
});

// Neutral grotesque — UI, body, labels.
export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
});

// Monospace — data, metrics, kicker labels.
export const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
  weight: ["400", "500", "600"],
});
