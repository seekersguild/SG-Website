"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { sectionNav } from "../content/site";

/* One plain bar: the mark, the page links, and one action for the site's
   main audience, organisations: Partner with us. It turns solid
   once the page moves, stays in view while reading, and marks the section
   being read. */
export function SiteHeader() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [solid, setSolid] = useState(false);
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
    // The overlay owns keyboard and assistive navigation while it is open.
    const background = [...document.querySelectorAll<HTMLElement>("main, .site-footer, .gathering-bar")];
    const previousInert = background.map((element) => element.inert);
    background.forEach((element) => { element.inert = true; });
    const menu = document.getElementById("mobile-menu");
    if (menu) menu.scrollTop = 0;
    const links = [...document.querySelectorAll<HTMLAnchorElement>("#mobile-menu a[href]")];
    links[0]?.focus({ preventScroll: true });
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
      if (event.key === "Tab") {
        const first = menuButton.current;
        const last = links.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("menu-lock");
      background.forEach((element, index) => { element.inert = previousInert[index]; });
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="site-header" data-solid={solid || menuOpen ? "" : undefined}>
      <div className="site-header__bar">
        <Link
          className="wordmark"
          href="/"
          prefetch={false}
          aria-label="Seekers Guild, back to top"
          onClick={(event) => {
            // On the home page the mark returns to the very top, and the
            // address drops any section hash. Elsewhere it navigates home.
            if (pathname !== "/" || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
            event.preventDefault();
            setMenuOpen(false);
            const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
            if (window.location.hash) history.replaceState(null, "", "/");
          }}
        >
          <Image src="/assets/seekersguild_logo.png" alt="" width={40} height={40} priority />
          <span>Seekers Guild</span>
        </Link>

        <nav className="site-nav" aria-label="Primary">
          <ul>
            {sectionNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link className="button site-header__action" href="/partners" aria-current={isActive("/partners") ? "page" : undefined}>
          Partner with us
        </Link>

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
                <Link href={item.href} aria-current={isActive(item.href) ? "page" : undefined} onClick={() => setMenuOpen(false)}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
