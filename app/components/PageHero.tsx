import type { ReactNode } from "react";

import { MagneticCompass } from "./MagneticCompass";

/* A plain opening for secondary pages (the 404): the title in the guild's
   gold, one sentence, and the compass. */
export function PageHero({ title, intro, children }: { title: string; intro: ReactNode; kicker?: string; children?: ReactNode }) {
  return (
    <section className="band band--deep hero hero--page" aria-labelledby="page-title">
      <MagneticCompass id="page-em" className="hero__compass" emblemClassName="emblem--hero" />
      <div className="wrap hero__inner">
        <h1 className="hero__title lines" id="page-title">
          <span className="line">
            <span data-line>{title}</span>
          </span>
        </h1>
        <div className="hero__foot">
          <p className="hero__lead">{intro}</p>
          {children ? <div className="actions">{children}</div> : null}
        </div>
      </div>
    </section>
  );
}
