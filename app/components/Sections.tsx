import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { brand, culture, faqs, joinSteps, LUMA_URL, mission, pillars, programmeAnchor, programmes, socialLinks, vision } from "../content/site";
import { Events, NextGathering } from "./Events";
import { FaqList } from "./FaqList";
import { MagicCircle, Motes } from "./MagicCircle";
import { MagneticCompass } from "./MagneticCompass";
import { Facets, Flourish, YearDial } from "./Ornament";
import { ArtworkImage, Paint } from "./Paint";
export { Paint } from "./Paint";

/* Every section of the site, each self-contained, so the pages can arrange
   them by what the visitor is trying to do without restyling anything. */

const numerals = ["I", "II", "III", "IV", "V"];
const timesAYear: Record<string, number> = { Monthly: 12, Quarterly: 4, "Twice a year": 2, Yearly: 1 };

export function SectionHead({ id, title, tone = "light", level = 2 }: { id: string; title: string; tone?: "light" | "dark"; level?: 1 | 2 }) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className={`section-head section-head--${tone}`}>
      <Heading className="heading" id={id}>
        {title}
      </Heading>
      <Flourish />
    </div>
  );
}

/* The official Sigil and its meaning face the guild's introduction. */
export function WhoSection() {
  return (
    <section className="band band--sky band--cut who" id="who" aria-labelledby="who-title">
      <span className="paint paint--light" aria-hidden="true" data-paint-ready=""><span className="paint__img" /></span>
      <div className="wrap who__grid">
        <div className="who__side">
          <span className="who__field" aria-hidden="true" data-paint-ready="">
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
  );
}

export function VisionSection() {
  return (
    <section className="band band--blue band--cut band--cut-left vision" id="vision" aria-labelledby="vision-title">
      <span className="paint paint--light" aria-hidden="true" data-paint-ready=""><span className="paint__img" /></span>
      <span className="sky sky--stars" aria-hidden="true" />
      <div className="wrap split">
        <SectionHead id="vision-title" title="Our vision" tone="dark" level={1} />
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
  );
}

export function MissionSection() {
  return (
    <section className="band band--sky band--cut mission" id="mission" aria-labelledby="mission-title">
      <Paint which="light" artwork="about-mission" />
      <div className="wrap">
        <SectionHead id="mission-title" title="Our mission" />
        <ol className="aims">
          {mission.map((item, index) => (
            <li key={item.lead} className="aim">
              <span className="aim__n" aria-hidden="true">{numerals[index]}</span>
              <h3 className="aim__lead">{item.lead.replace(/,$/, "")}</h3>
              <p className="aim__body">{item.body.charAt(0).toUpperCase() + item.body.slice(1)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function PillarsSection() {
  return (
    <section className="band band--night band--cut band--cut-left pillars" id="pillars" aria-labelledby="pillars-title">
      <Paint which="dark-water" artwork="about-pillars" />
      <span className="sky sky--stars" aria-hidden="true" />
      <div className="wrap">
        <SectionHead id="pillars-title" title="Five pillars" tone="dark" />
        <ol className="pillars__row">
          {pillars.map((pillar, index) => (
            <li key={pillar.title} className="pillar">
              <span className="pillar__n" aria-hidden="true">{numerals[index]}</span>
              <h3 className="pillar__title">{pillar.title}</h3>
              <p className="pillar__body">{pillar.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function CultureSection() {
  return (
    <section className="band band--royal band--cut culture" id="culture" aria-labelledby="culture-title">
      <Paint which="light" artwork="about-culture" />
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
  );
}

/* Programmes, set like a timetable, one row per programme. */
export function ProgrammesSection() {
  return (
    <section className="band band--sky programmes content-opening" id="programmes" aria-labelledby="programmes-title" data-scroll-anchor="programmes-title">
      <Paint which="light" artwork="programmes-calendar" priority />
      <div className="wrap">
        <SectionHead id="programmes-title" title="Programmes" level={1} />
        <ul className="timetable">
          {programmes.map((programme) => (
            <li key={programme.name} className="programme" id={programmeAnchor(programme.name)} data-scroll-target>
              <div className="programme__when">
                {timesAYear[programme.cadence] ? <YearDial times={timesAYear[programme.cadence]} className="programme__dial" /> : null}
                <p className="programme__cadence">{programme.cadence}</p>
              </div>
              <div className="programme__main">
                <div className="programme__head">
                  <h2 className="programme__name">{programme.name}</h2>
                  <p className="programme__access">{programme.access}{programme.flagship ? " · Flagship programme" : ""}</p>
                </div>
                <div className="programme__text">
                  <p className="programme__body">{programme.body}</p>
                  <p className="programme__room">
                    <span>Participants:</span> {programme.room}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        <p className="programmes__more"><Link className="text-link" href="/impact#events">View upcoming gatherings</Link></p>
      </div>
    </section>
  );
}

/* Gatherings. On the home page only the next one; on Impact, the full
   archive as evidence. */
export function GatheringsSection({ next = false }: { next?: boolean }) {
  return (
    <section
      className={next ? "band band--night band--cut events events--next" : "band band--night band--cut events"}
      id="events"
      aria-labelledby="events-title"
      data-scroll-anchor="events-title"
    >
      <Paint which="dark-water" artwork={next ? "home-events" : "impact-events"} />
      <span className="sky sky--stars" aria-hidden="true" />
      <div className="wrap">
        <SectionHead id="events-title" title={next ? "Next gathering" : "Gatherings"} tone="dark" />
        {next ? (
          <NextGathering />
        ) : (
          <>
            <p className="events__intro">Every gathering is posted on Luma. Here is what is coming up, and what the guild has hosted so far.</p>
            <Events />
          </>
        )}
      </div>
    </section>
  );
}

export function JoinSection({ faqLink = false, title = "How to join" }: { faqLink?: boolean; title?: string }) {
  return (
    <section className="band band--blue band--cut band--cut-left join" id="join" aria-labelledby="join-title">
      <Paint which="light" artwork="join-steps" />
      <span className="sky sky--stars" aria-hidden="true" />
      {/* Mirrors Who we are: the steps open on the left, and the right half of
          the band is a field of faceted sapphire over the Monet, carrying
          the way in. */}
      <div className="wrap join__layout">
        <div className="join__main">
          <SectionHead id="join-title" title={title} tone="dark" />
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
            <ArtworkImage className="join__monet" artwork="join-steps" tone="royal" />
            <Facets />
          </span>
          <p className="join__free">Membership is free.</p>
          <p className="join__intro">There is no fee and no donation; what the guild asks for is curiosity and contribution.</p>
          <div className="actions join__actions">
            <a className="button" href={LUMA_URL} target="_blank" rel="noreferrer noopener">
              Find the next Open Table
            </a>
            <a className="text-link" href={socialLinks[0].href} target="_blank" rel="noreferrer noopener">
              Message us on Facebook
            </a>
          </div>
          {faqLink ? (
            <p className="join__more">
              <Link className="text-link" href="/join#faq">
                Questions before you come? Read the answers
              </Link>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

/* What a first Open Table is like, from the guild's own FAQ and programme
   notes, so a newcomer knows what to expect before they come. */
export function FirstVisitSection() {
  const facts = [
    "The last Sunday of every month, usually from 2:00 PM",
    "At a café in Metro Manila; the RSVP on Luma has the details",
    "Open to the public, with no pitch and no agenda",
    "Conversation with members and the core team",
    "You buy your own food and drinks",
    "Bring someone from another school",
  ];
  return (
    <section className="band band--royal band--cut first-visit" id="first-visit" aria-labelledby="first-visit-title">
      <Paint which="light" artwork="join-first-visit" />
      <span className="sky sky--stars" aria-hidden="true" />
      <div className="wrap split">
        <SectionHead id="first-visit-title" title="Your first Open Table" tone="dark" />
        <ul className="split__main values">
          {facts.map((fact) => (
            <li key={fact} className="value">
              {fact}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="band band--sky band--cut faq" id="faq" aria-labelledby="faq-title">
      <Paint which="light" artwork="join-faq" />
      <div className="wrap faq__grid">
        <SectionHead id="faq-title" title="Questions" />
        <FaqList items={faqs} />
      </div>
    </section>
  );
}

/* The home page's send-off: the opening's compass returns, larger and
   cropped by the edge, its needle swung round to point at the way on. */
export function CloseSection() {
  return (
    <section className="band band--night band--cut band--cut-left close" aria-labelledby="close-title">
      <Paint which="dark" artwork="home-close" />
      <span className="sky" aria-hidden="true" />
      <Motes className="motes--sparse" />
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
            <Link className="button" href="/join">
              Get involved
            </Link>
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
  );
}

/* The partnership page ends with one place to start an enquiry. */
export function NextStep({ id, title, lead, children }: { id: string; title: string; lead: string; children: ReactNode }) {
  return (
    <section className="band band--sky band--cut band--cut-left next-step" aria-labelledby={id}>
      <Paint which="light" artwork="partners-close" />
      <div className="wrap next-step__layout">
        <div className="next-step__copy">
          <h2 className="next-step__title" id={id}>
            {title}
          </h2>
          <Flourish className="next-step__flourish" />
          <p className="next-step__lead">{lead}</p>
        </div>
        <div className="next-step__side">
          <div className="actions">{children}</div>
        </div>
      </div>
    </section>
  );
}
