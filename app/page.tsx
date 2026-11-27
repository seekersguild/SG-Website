import Link from "next/link";
import { MagicCircle, Motes } from "./components/MagicCircle";
import { MagneticCompass } from "./components/MagneticCompass";
import { AtAGlanceSection } from "./components/OrgSections";
import { CloseSection, GatheringsSection, Paint, WhoSection } from "./components/Sections";
import { StructuredData } from "./components/StructuredData";

/* The home page is the guild's pitch, read the way a partner decides:
   what it is, proof in numbers, who it is, that it is active right now, then
   one close for newcomers who want to take part.
   Every other section lives on the page it belongs to. */
export default function Home() {
  return (
    <>
      <StructuredData />

      {/* Opening: gold type on deep sapphire, the compass inside its circle of light. */}
      <section className="band band--night hero" aria-labelledby="page-title">
        <Paint which="dark" artwork="home-opening" priority />
        <span className="sky" aria-hidden="true" />
        <div className="hero__stage" aria-hidden="true" data-compass-face>
          <MagicCircle className="hero__circle" />
          <MagneticCompass id="hero-em" className="hero__compass" emblemClassName="emblem--hero" />
        </div>
        <Motes />
        <div className="wrap hero__inner">
          <h1 className="hero__title lines" id="page-title">
            <span className="line">
              <span data-line className="gold-text">
                We seek those
              </span>
            </span>
            <span className="line">
              <span data-line className="gold-text">
                who seek
              </span>
            </span>
          </h1>
          <div className="hero__foot">
            {/* Phones and portrait tablets read the short line; the full one is for wider screens. */}
            <p className="hero__lead hero__lead--short">A student-led community in the Philippines for curious and driven minds, especially from the provinces.</p>
            <p className="hero__lead hero__lead--full">
              Seekers Guild is a student-led community in the Philippines, founded in April 2025. We empower curious and driven minds,
              especially from the provinces, through collaboration, real-world experiences and opportunities beyond the classroom.
            </p>
            <div className="actions">
              <a className="button" href="#events">
                Join a gathering
              </a>
              <Link className="button" href="/impact">
                See our impact
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AtAGlanceSection />
      <WhoSection />
      <GatheringsSection next />
      <CloseSection />

    </>
  );
}
