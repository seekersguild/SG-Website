import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Reveal } from "./components/Reveal";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "./globals.css";
import { siteUrl } from "./site-url";

/* The brand's three typefaces (Seekers Guild visual identity): Cinzel for the
   guild's voice, Lora for long statements, Montserrat for everything read
   quickly. All self-hosted, so builds never depend on a font CDN. */
const cinzel = localFont({
  src: [{ path: "../public/fonts/Cinzel-latin.woff2", weight: "400 900", style: "normal" }],
  variable: "--font-cinzel",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

const lora = localFont({
  src: [
    { path: "../public/fonts/Lora-latin.woff2", weight: "400 700", style: "normal" },
    { path: "../public/fonts/Lora-Italic-latin.woff2", weight: "400 700", style: "italic" },
  ],
  variable: "--font-lora",
  display: "swap",
  // Lora is only used below the first screen; let the fonts above it load first.
  preload: false,
  fallback: ["Georgia", "serif"],
});

const montserrat = localFont({
  src: [{ path: "../public/fonts/Montserrat-latin.woff2", weight: "400 800", style: "normal" }],
  variable: "--font-montserrat",
  display: "swap",
  fallback: ["system-ui", "sans-serif"],
});

const description =
  "Seekers Guild is a student-led AI builder community in the Philippines, empowering curious and driven minds, especially from the provinces, through collaboration, real-world experiences and opportunities beyond the classroom.";

/* Icons come from app/icon.png and app/apple-icon.png; the share image from
   app/opengraph-image.tsx. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Seekers Guild: we seek those who seek",
    template: "%s | Seekers Guild",
  },
  description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: "Seekers Guild",
    title: "Seekers Guild: we seek those who seek",
    description,
    url: "/",
    locale: "en_PH",
  },
  twitter: {
    card: "summary_large_image",
    title: "Seekers Guild: we seek those who seek",
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#0f0f0f",
};

/* Runs before paint: marks the document as scripted so reveal states only
   apply when the observer that clears them will actually run. */
const jsFlag = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${lora.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <Reveal />
      </body>
    </html>
  );
}
