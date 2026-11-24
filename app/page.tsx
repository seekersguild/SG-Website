import Image from "next/image";

import { Events, JoinDockFromLuma } from "./components/Events";
import { FaqList } from "./components/FaqList";
import { MagneticCompass } from "./components/MagneticCompass";
import { StructuredData } from "./components/StructuredData";
import { MagicCircle, Motes } from "./components/MagicCircle";
import { Facets, Flourish, YearDial } from "./components/Ornament";
import { brand, culture, faqs, joinSteps, LUMA_URL, mission, pillars, programmes, socialLinks, vision } from "./content/site";

const numerals = ["I", "II", "III", "IV", "V"];

/* How many times a year each programme cadence comes round, for its dial. */
const timesAYear: Record<string, number> = { Monthly: 12, Quarterly: 4, "Twice a year": 2, Yearly: 1 };

function SectionHead({ id, title, tone = "light" }: { id: string; title: string; tone?: "light" | "dark" }) {
  return (
    <div className={`section-head section-head--${tone}`}>
      <h2 className="heading" id={id}>
        {title}
      </h2>
      <Flourish />
    </div>
  );
}

/* A static painting laid into each section as its atmosphere. */
function Paint({ which }: { which: "dark" | "dark-water" | "light" }) {
  return (
    <span className={`paint paint--${which}`} aria-hidden="true">
      <span className="paint__img" />
    </span>
  );
}

export default function Home() {
  return (
    <>
      <StructuredData />

      {/* The hero painting is a CSS background, so tell the browser about it up front, at the right size. */}
      <link rel="preload" as="image" href="/images/atmosphere-dark-small.webp" media="(max-width: 760px)" fetchPriority="high" />
      <link rel="preload" as="image" href="/images/atmosphere-dark-medium.webp" media="(min-width: 761px) and (max-width: 2000px)" fetchPriority="high" />
      <link rel="preload" as="image" href="/images/atmosphere-dark-large.webp" media="(min-width: 2001px)" fetchPriority="high" />

      {/* Opening: gold type on deep sapphire, the compass inside its circle of light. */}
      <section className="band band--night hero" aria-labelledby="page-title">
        <Paint which="dark" />
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
              <a className="button" href={LUMA_URL} target="_blank" rel="noreferrer noopener">
                Join a gathering
              </a>
              <a className="button" href="#who">
                Who we are
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* The official Sigil and its meaning face the guild's introduction. */}
      <section className="band band--sky band--cut who" id="who" aria-labelledby="who-title">
        <Paint which="light" />
        <div className="wrap who__grid">
          <div className="who__side">
            <span className="who__field" aria-hidden="true">
              <span className="who__monet" />
              <Facets />
            </span>
            <figure className="who__sigil">
              <Image
                className="who__logo"
                src="/assets/seekersguild_logo.png"
                alt="Seekers Guild"
                width={240}
                height={240}
                sizes="(max-width: 560px) 144px, (max-width: 860px) 168px, 240px"
              />
              <blockquote>
                <p className="who__quote">&ldquo;{brand.sigil.quote}&rdquo;</p>
                <p className="who__answer">{brand.sigil.answer}</p>
              </blockquote>
              <figcaption className="who__source">The Sigil of Seeking</figcaption>
            </figure>
          </div>
          <div className="who__copy">
            <SectionHead id="who-title" title="Who we are" />
            <p className="lead">{brand.who}</p>
            <p>
              We welcome technology, business, creative and events enthusiasts from colleges and senior high schools, especially, but not
              limited to, those from the provinces. We seek those who seek.
            </p>
          </div>
        </div>
      </section>

      {/* Vision: heading on the left, the statement carries the right. */}
      <section className="band band--blue band--cut band--cut-left vision" id="vision" aria-labelledby="vision-title">
        <Paint which="light" />
        <span className="sky sky--stars" aria-hidden="true" />
        <div className="wrap split">
          <SectionHead id="vision-title" title="Our vision" tone="dark" />
          <div className="split__main">
            <p className="vision__statement">{vision.lead}</p>
            <div className="vision__body">
              {vision.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission: three aims, each a row. */}
      <section className="band band--sky band--cut mission" id="mission" aria-labelledby="mission-title">
        <Paint which="light" />
        <div className="wrap">
          <SectionHead id="mission-title" title="Our mission" />
          <ol className="aims">
            {mission.map((item, index) => (
              <li key={item.lead} className="aim">
                <span className="aim__n" aria-hidden="true">
                  {numerals[index]}
                </span>
                <h3 className="aim__lead">{item.lead.replace(/,$/, "")}</h3>
                <p className="aim__body">{item.body.charAt(0).toUpperCase() + item.body.slice(1)}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Pillars: five columns side by side. */}
      <section className="band band--night band--cut band--cut-left pillars" id="pillars" aria-labelledby="pillars-title">
        <Paint which="dark-water" />
        <span className="sky sky--stars" aria-hidden="true" />
        <div className="wrap">
          <SectionHead id="pillars-title" title="Five pillars" tone="dark" />
          <ol className="pillars__row">
            {pillars.map((pillar, index) => (
              <li key={pillar.title} className="pillar">
                <span className="pillar__n" aria-hidden="true">
                  {numerals[index]}
                </span>
                <h3 className="pillar__title">{pillar.title}</h3>
                <p className="pillar__body">{pillar.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Culture: the values as a large serif list beside the heading. */}
      <section className="band band--royal band--cut culture" id="culture" aria-labelledby="culture-title">
        <Paint which="light" />
        <span className="sky sky--stars" aria-hidden="true" />
        <div className="wrap split">
          <SectionHead id="culture-title" title="Our culture" tone="dark" />
          <ul className="split__main values">
            {culture.map((value) => (
              <li key={value} className="value">
                {value}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Programmes: set like a timetable, one row per programme. */}
      <section className="band band--sky band--cut band--cut-left programmes" id="programmes" aria-labelledby="programmes-title" data-scroll-anchor="programmes-title">
        <Paint which="light" />
        <div className="wrap">
          <SectionHead id="programmes-title" title="What we do" />
          <ul className="timetable">
            {programmes.map((programme) => (
              <li key={programme.name} className="programme">
                <div className="programme__when">
                  <YearDial times={timesAYear[programme.cadence] ?? 1} className="programme__dial" />
                  <p className="programme__cadence">{programme.cadence}</p>
                </div>
                <div className="programme__main">
                  <div className="programme__head">
                    <h3 className="programme__name">{programme.name}</h3>
                    <p className="programme__access">{programme.access}</p>
                  </div>
                  <p className="programme__body">{programme.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Events */}
      <section className="band band--night band--cut events" id="events" aria-labelledby="events-title" data-scroll-anchor="events-title">
        <Paint which="dark-water" />
        <span className="sky sky--stars" aria-hidden="true" />
        <div className="wrap">
          <SectionHead id="events-title" title="Gatherings" tone="dark" />
          <p className="events__intro">
            Every gathering is posted on Luma. Here is what is coming up, and what the guild has hosted so far.
          </p>
          <Events />
        </div>
      </section>

      {/* Join */}
      <section className="band band--blue band--cut band--cut-left join" id="join" aria-labelledby="join-title">
        <Paint which="light" />
        <span className="sky sky--stars" aria-hidden="true" />
        {/* Mirrors Who we are: the steps open on the left, and the right half of
            the band is a field of faceted sapphire over the Monet, carrying
            the way in. */}
        <div className="wrap join__layout">
          <div className="join__main">
            <SectionHead id="join-title" title="How to join" tone="dark" />
            <ol className="join__steps">
              {joinSteps.map((step, index) => (
                <li key={step.title} className="join__step">
                  <span className="join__n" aria-hidden="true">
                    {numerals[index]}
                  </span>
                  <h3 className="join__title">{step.title}</h3>
                  <p>{step.body}</p>
                </li>
              ))}
            </ol>
          </div>
          <div className="join__side">
            <span className="join__slab join__field" aria-hidden="true">
              <span className="join__monet" />
              <Facets />
            </span>
            <p className="join__free">Membership is free.</p>
            <p className="join__intro">There is no fee and no donation; what the guild asks for is curiosity and contribution.</p>
            <div className="actions join__actions">
              <a className="button" href={LUMA_URL} target="_blank" rel="noreferrer noopener">
                Find the next Open Table
              </a>
              <a className="button" href={socialLinks[0].href} target="_blank" rel="noreferrer noopener">
                Message us on Facebook
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="band band--sky band--cut faq" id="faq" aria-labelledby="faq-title">
        <Paint which="light" />
        <div className="wrap faq__grid">
          <SectionHead id="faq-title" title="Questions" />
          <FaqList items={faqs} />
        </div>
      </section>

      {/* Close */}
      <section className="band band--night band--cut band--cut-left close" aria-labelledby="close-title">
        <Paint which="dark" />
        <span className="sky" aria-hidden="true" />
        <Motes className="motes--sparse" />
        {/* The opening's compass returns, larger and cropped by the edge, its
            needle swung round to point at the way on. */}
        <div className="close__compass" aria-hidden="true" data-compass-face>
          <MagicCircle className="close__circle" lazy />
          <MagneticCompass id="close-em" className="close__emblem" initialAngle={78} />
        </div>
        <div className="wrap close__inner">
          <div className="close__text">
            <h2 className="close__title gold-text" id="close-title">
              <span>Onward,</span> <span>fellow seeker</span>
            </h2>
            <Flourish className="close__flourish" />
            <p className="close__lead">
              {brand.motto} Gatherings go up on Luma as they are set; come to the next one and bring someone from another school.
            </p>
            <div className="actions">
              <a className="button" href={LUMA_URL} target="_blank" rel="noreferrer noopener">
                See upcoming gatherings
              </a>
              <a className="button" href="#join">
                How to join
              </a>
            </div>
            <div className="close__follow">
              <span className="close__follow-label">Follow the guild</span>
              <ul className="close__social">
                {socialLinks
                  .filter((link) => link.label !== "Luma")
                  .map((link) => (
                    <li key={link.label}>
                      <a href={link.href} target="_blank" rel="noreferrer noopener">
                        {link.label}
                      </a>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <JoinDockFromLuma />
    </>
  );
}
