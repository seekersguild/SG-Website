import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";

import { Ambient } from "./components/Ambient";
import { BootLoader } from "./components/BootLoader";
import { LoadingScreen } from "./components/LoadingScreen";
import { Magnetic } from "./components/Magnetic";
import { ScrollAccents } from "./components/ScrollAccents";
import { ScrollMotion } from "./components/ScrollMotion";
import { SectionNavigation } from "./components/SectionNavigation";
import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import "lenis/dist/lenis.css";
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

/* Icons are the approved guild mark in public/ (favicon.ico, 16/32px PNGs,
   apple-touch-icon); the share image comes from app/opengraph-image.tsx. */
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
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

/* Show the first-load mark before paint. Fail open after four seconds if
   hydration fails; keyboard use dismisses it immediately. With no JavaScript,
   the initial loader is hidden by default and the page stays readable. */
const jsFlag = `(()=>{const root=document.documentElement;root.classList.add('js');root.setAttribute('data-loading','');const ready=()=>{root.removeAttribute('data-loading');clearTimeout(timeout);window.removeEventListener('guild:ready',ready);window.removeEventListener('keydown',ready)};const timeout=setTimeout(ready,4000);window.addEventListener('guild:ready',ready);window.addEventListener('keydown',ready)})()`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${lora.variable} ${montserrat.variable}`} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
        <BootLoader>
          <LoadingScreen initial />
        </BootLoader>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <Ambient />
        <ScrollAccents />
        <ScrollMotion />
        <SectionNavigation />
        <Magnetic />
      </body>
    </html>
  );
}
