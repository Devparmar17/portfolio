import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";

import ThemeProvider from "@/components/providers/ThemeProvider";
import { contact, profile, siteUrl, socials } from "@/data/portfolio";
import "./globals.css";

const description =
  "Dev Parmar is a UI/UX Designer and Frontend Developer with a Computer Engineering background — user research, user flows, wireframing, prototyping, and UI design in Figma, HTML, CSS, and JavaScript.";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Dev Parmar | UI/UX Designer & Frontend Developer",
    template: "%s | Dev Parmar",
  },
  description,
  applicationName: "Dev Parmar — Portfolio",
  authors: [{ name: profile.name }],
  creator: profile.name,
  publisher: profile.name,
  keywords: [
    "Dev Parmar",
    "UI/UX Designer",
    "Frontend Developer",
    "Product Design",
    "User Research",
    "Wireframing",
    "Prototyping",
    "Figma",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Dev Parmar — Portfolio",
    title: "Dev Parmar | UI/UX Designer & Frontend Developer",
    description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Dev Parmar | UI/UX Designer & Frontend Developer",
    description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "portfolio",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fdfdfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0c0c0e" },
  ],
};

/** Structured data so search engines can read the profile directly. */
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.headline,
  description: profile.summary,
  email: `mailto:${contact.email}`,
  telephone: contact.phoneHref,
  url: siteUrl,
  sameAs: socials
    .filter((s) => s.url && s.id !== "email")
    .map((s) => s.url),
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="font-sans antialiased">
        {/*
          Scroll-reveal elements are server-rendered at opacity 0 and animated
          in by Framer Motion. Without JS they would stay invisible, so force
          them visible instead.
        */}
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html:
                '[style*="opacity:0"]{opacity:1!important;transform:none!important}',
            }}
          />
        </noscript>

        <ThemeProvider>{children}</ThemeProvider>
        <script
          type="application/ld+json"
          // Static, locally-authored object — no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </body>
    </html>
  );
}
