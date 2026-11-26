import type { ReactNode } from "react";

import { MagicCircle } from "./MagicCircle";
import { MagneticCompass } from "./MagneticCompass";
import { Flourish } from "./Ornament";
import { Paint, type ArtworkKey } from "./Paint";

/* Shared semantics with a composition suited to each page. All content and
   navigation render on the server; the 404 alone brings back the compass. */
export function PageHero({
  title,
  intro,
  children,
  sections,
  aside,
  compass = false,
  variant = "partners",
  artwork,
}: {
  title: string;
  intro: ReactNode;
  children?: ReactNode;
  sections?: { label: string; href: string; detail?: string }[];
  aside?: ReactNode;
  compass?: boolean;
  variant?: "partners" | "contact";
  artwork?: ArtworkKey;
}) {
  if (!compass) {
    return (
      <section className={`band band--night page-opening page-opening--${variant}`} aria-labelledby="page-title">
        <Paint which="dark" artwork={artwork ?? `${variant}-opening`} priority />
        <div className="wrap page-opening__inner">
          <div className="page-opening__main">
            <div className="page-opening__masthead">
              <div>
                <h1 className="page-opening__title" id="page-title">{title}</h1>
                <Flourish className="page-opening__flourish" />
              </div>
            </div>
            <div className="page-opening__copy">
              <p className="page-opening__intro">{intro}</p>
              {children ? <div className="actions">{children}</div> : null}
            </div>
          </div>
          {aside ? <div className="page-opening__aside">{aside}</div> : null}
          {sections?.length ? <PageIndex sections={sections} /> : null}
        </div>
      </section>
    );
  }
  return (
    <section className="band band--night hero hero--page" aria-labelledby="page-title">
      <Paint which="dark" artwork="not-found" priority />
      <span className="sky" aria-hidden="true" />
      {compass ? (
        <div className="hero__stage" aria-hidden="true" data-compass-face>
          <MagicCircle className="hero__circle" />
          <MagneticCompass id="page-em" className="hero__compass" emblemClassName="emblem--hero" />
        </div>
      ) : null}
      <div className="wrap hero__inner page-hero">
        <div className="page-hero__main">
          <h1 className="hero__title lines" id="page-title">
            <span className="line">
              <span data-line className="gold-text">
                {title}
              </span>
            </span>
          </h1>
          <div className="hero__foot">
            <p className="hero__lead">{intro}</p>
            {children ? <div className="actions">{children}</div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}

/* The page's own sections, so a visitor can see the whole page at once and
   jump straight to the part they came for. */
function PageIndex({ sections }: { sections: { label: string; href: string; detail?: string }[] }) {
  return (
    <nav className="page-index" aria-label="On this page">
      <ul>
        {sections.map((section) => (
          <li key={section.href}>
            <a href={section.href}>
              <span><span className="page-index__label">{section.label}</span>{section.detail ? <small>{section.detail}</small> : null}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
