"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LUMA_URL, sectionNav } from "../content/site";

/* One plain bar: the mark, the section links, one action. It turns solid
   once the page moves, stays in view while reading, and marks the section
   being read. */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let wasSolid = false;
    function onScroll() {
      const next = window.scrollY > 24;
      if (next === wasSolid) return;
      wasSolid = next;
      setSolid(next);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const sections = sectionNav
      .map((item) => document.getElementById(item.href.split("#")[1]))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setCurrent(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1101px)");
    const onChange = () => { if (wide.matches) setMenuOpen(false); };
    wide.addEventListener("change", onChange);
    return () => wide.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.documentElement.classList.add("menu-lock");
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("menu-lock");
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === "/" && current === href.split("#")[1];

  return (
    <header className="site-header" data-solid={solid || menuOpen ? "" : undefined}>
      <div className="site-header__bar">
        <Link className="wordmark" href="/" prefetch={false} aria-label="Seekers Guild, home">
          <Image src="/assets/seekersguild_logo.png" alt="" width={40} height={40} priority />
          <span>Seekers Guild</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <ul>
            {sectionNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} prefetch={false} aria-current={isActive(item.href) ? "location" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a className="button site-header__action" href={LUMA_URL} target="_blank" rel="noreferrer noopener">
          Join a gathering
        </a>

        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            <path className="menu-toggle__top" d="M4 8h16" />
            <path className="menu-toggle__bottom" d="M4 16h16" />
          </svg>
        </button>
      </div>

      <div className="mobile-menu" id="mobile-menu" data-open={menuOpen ? "" : undefined} inert={!menuOpen}>
        <nav aria-label="Mobile">
          <ul>
            {sectionNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} prefetch={false} aria-current={isActive(item.href) ? "location" : undefined} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a className="button button--wide" href={LUMA_URL} target="_blank" rel="noreferrer noopener">
          Join a gathering on Luma
        </a>
      </div>
    </header>
  );
}
