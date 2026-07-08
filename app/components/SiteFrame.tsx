import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { Section, sections } from "../site-data";

type SiteFrameProps = {
  activeSlug?: string;
  title: string;
  children?: ReactNode;
  showHero?: boolean;
};

function Header({ activeSlug }: { activeSlug?: string }) {
  return (
    <header className="topbar">
      <Link className="brand-slot" href="/" aria-label="Seekers Guild home">
        <Image
          className="guild-logo"
          src="/assets/seekersguild_logo.png"
          alt="Seekers Guild"
          width={982}
          height={982}
          priority
        />
      </Link>

      <nav className="quest-nav" aria-label="Primary navigation">
        {sections.map((item: Section) => (
          <Link className={`nav-card ${activeSlug === item.slug ? "active" : ""}`} href={item.href} key={item.slug}>
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export default function SiteFrame({ activeSlug = "quests", title, children, showHero = true }: SiteFrameProps) {
  return (
    <main className="page-shell">
      <Header activeSlug={activeSlug} />

      {showHero && (
        <section className="hero-band">
          <h1>{title}</h1>
        </section>
      )}

      {children ?? (
        <>
          <section className="color-band band-one" aria-label="Landing section one" />
          <section className="color-band band-two" aria-label="Landing section two" />
          <section className="color-band band-three" aria-label="Landing section three" />
          <section className="color-band band-four" aria-label="Landing section four" />
          <section className="color-band band-five" aria-label="Landing section five" />
        </>
      )}
    </main>
  );
}
