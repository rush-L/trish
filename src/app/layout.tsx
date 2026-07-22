import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { fraunces, inter, jetbrains } from "@/lib/fonts";
import { profile } from "@/content/profile";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/ui/Cursor";
import "./globals.css";

const description = `${profile.fullName}, ${profile.credentialFull} — ${profile.statement}`;

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  alternates: { canonical: "/" },
  title: {
    default: `${profile.fullName} — ${profile.credentialFull}`,
    template: `%s — ${profile.fullName}`,
  },
  description,
  keywords: [
    "Registered Marketing Professional",
    "RMP",
    "Marketing Strategy",
    "Operations",
    "Business Innovation",
    "Leadership",
    "Data Analytics",
    profile.fullName,
  ],
  authors: [{ name: profile.fullName }],
  creator: profile.fullName,
  openGraph: {
    type: "profile",
    title: `${profile.fullName} — ${profile.credentialFull}`,
    description,
    siteName: profile.fullName,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.fullName} — ${profile.credentialFull}`,
    description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0e14",
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.fullName,
  jobTitle: profile.title,
  description: profile.statement,
  address: { "@type": "PostalAddress", addressLocality: profile.location },
  knowsAbout: [
    "Marketing Strategy",
    "Operations",
    "Business Innovation",
    "Data Analytics",
    "Leadership",
  ],
  hasCredential: profile.credentialFull,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body data-theme="dark" className="grain antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <Cursor />
        <SmoothScroll>{children}</SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
