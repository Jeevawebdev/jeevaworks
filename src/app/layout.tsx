import type { Metadata } from "next";
import { Fraunces, Manrope, Noto_Sans_Tamil } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n";
import "./globals.css";

const display = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
});

const body = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
});

const tamil = Noto_Sans_Tamil({
  variable: "--font-tamil",
  subsets: ["tamil"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jeevaworks.in"),
  title: {
    default: "JeevaWorks | Websites & Apps for Chennai Businesses",
    template: "%s | JeevaWorks",
  },
  description:
    "Chennai-based freelance developer building websites and apps for shops, clinics, schools and local businesses across Tamil Nadu. Clear pricing. Talk on WhatsApp.",
  keywords: [
    "website designer Chennai",
    "freelance web developer Chennai",
    "business website Tamil Nadu",
    "JeevaWorks",
    "jeevaworks.in",
  ],
  authors: [{ name: "Jeeva C" }],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://jeevaworks.in",
    siteName: "JeevaWorks",
    title: "JeevaWorks | Websites & Apps for Chennai Businesses",
    description:
      "Local developer. Clear packages. WhatsApp-first support for shops, clinics and rural businesses in Tamil Nadu.",
  },
  twitter: {
    card: "summary_large_image",
    title: "JeevaWorks",
    description: "Websites & apps for Chennai and Tamil Nadu businesses.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: "https://jeevaworks.in" },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "JeevaWorks",
  url: "https://jeevaworks.in",
  telephone: "+919344539265",
  email: "jeevawebdev1@gmail.com",
  areaServed: ["Chennai", "Tamil Nadu", "India"],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Chennai",
    addressRegion: "Tamil Nadu",
    addressCountry: "IN",
  },
  description:
    "Freelance websites and applications for Chennai and Tamil Nadu local businesses.",
  founder: {
    "@type": "Person",
    name: "Jeeva C",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-lang="en"
      className={`${display.variable} ${body.variable} ${tamil.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-[family-name:var(--font-body)] text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
