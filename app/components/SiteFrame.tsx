"use client";

import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { Section, sections } from "../site-data";

type SiteFrameProps = {
  activeSlug?: string;
  title: string;
  children?: ReactNode;
  showHero?: boolean;
};

function Header({ activeSlug }: { activeSlug?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`topbar ${isMenuOpen ? "menu-open" : ""}`}>
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

      <button
        className="mobile-nav-toggle"
        type="button"
        aria-label={isMenuOpen ? "Close navigation" : "Open navigation"}
        aria-expanded={isMenuOpen}
        aria-controls="primary-navigation"
        onClick={() => setIsMenuOpen((open) => !open)}
      >
        <span aria-hidden="true" />
        <span aria-hidden="true" />
        <span aria-hidden="true" />
      </button>

      <nav className="quest-nav" id="primary-navigation" aria-label="Primary navigation">
        {sections.map((item: Section) => (
          <Link
            className={`nav-card ${activeSlug === item.slug ? "active" : ""}`}
            href={item.href}
            key={item.slug}
            onClick={() => setIsMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsVisible(window.scrollY > 420);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <button
      className={`scroll-top-button ${isVisible ? "visible" : ""}`}
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <Image
        className="scroll-top-icon"
        src="/assets/seekerguild_up.png"
        alt=""
        width={96}
        height={96}
        aria-hidden="true"
      />
    </button>
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

      <ScrollToTopButton />
    </main>
  );
}
