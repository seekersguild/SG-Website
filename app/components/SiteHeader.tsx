"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LUMA_URL, sectionNav } from "../content/site";

/* One plain bar: the mark, four section links, one action. It turns solid
   once the page moves, tucks away while reading down, returns on any upward
   scroll, and marks the section being read. */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);
  const lastY = useRef(0);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    let frame = 0;
    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const y = window.scrollY;
        setSolid(y > 24);
        if (y > 480 && y > lastY.current + 4) setHidden(true);
        else if (y < lastY.current - 4 || y <= 480) setHidden(false);
        lastY.current = y;
      });
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
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
    <header className="site-header" data-solid={solid || menuOpen ? "" : undefined} data-hidden={hidden && !menuOpen ? "" : undefined}>
      <div className="site-header__bar">
        <Link className="wordmark" href="/" aria-label="Seekers Guild, home">
          <Image src="/assets/seekersguild_logo.png" alt="" width={40} height={40} priority />
          <span>Seekers Guild</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <ul>
            {sectionNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(item.href) ? "location" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <a className="button button--gold site-header__action" href={LUMA_URL} target="_blank" rel="noreferrer noopener">
          Join a gathering
        </a>

        <button
          ref={menuButton}
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </div>

      <div className="mobile-menu" id="mobile-menu" data-open={menuOpen ? "" : undefined} inert={!menuOpen}>
        <nav aria-label="Mobile">
          <ul>
            {sectionNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(item.href) ? "location" : undefined} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <a className="button button--gold button--wide" href={LUMA_URL} target="_blank" rel="noreferrer noopener">
          Join a gathering on Luma
        </a>
      </div>
    </header>
  );
}
