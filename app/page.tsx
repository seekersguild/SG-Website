import { Events, JoinDockFromLuma } from "./components/Events";
import { MagneticCompass } from "./components/MagneticCompass";
import { StructuredData } from "./components/StructuredData";
import { MagicCircle, Motes } from "./components/MagicCircle";
import { Flourish, Ornate } from "./components/Ornament";
import { RailDots } from "./components/Rail";
import { brand, culture, faqs, joinSteps, LUMA_URL, mission, pillars, programmes, socialLinks, vision } from "./content/site";

const numerals = ["I", "II", "III", "IV", "V"];

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
      <link
        rel="preload"
        as="image"
        href="/images/paint-dark-1200.webp"
        imageSrcSet="/images/paint-dark-1200.webp 1x, /images/paint-dark-2400.webp 2x"
        media="(max-width: 760px) and (min-aspect-ratio: 13001/25000)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/paint-dark-1200.webp"
        imageSrcSet="/images/paint-dark-1200.webp 1x, /images/paint-dark-2400.webp 2x, /images/paint-dark-tall.webp 3x"
        media="(max-width: 760px) and (max-aspect-ratio: 13/25)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/paint-dark-2000.webp"
        imageSrcSet="/images/paint-dark-2000.webp 1x, /images/paint-dark-2880.webp 2x"
        media="(min-width: 761px) and (max-width: 2000px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/paint-dark-2880.webp"
        imageSrcSet="/images/paint-dark-2880.webp 1x, /images/paint-dark-3840.webp 2x"
        media="(min-width: 2001px) and (max-width: 2880px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/images/paint-dark-3840.webp"
        media="(min-width: 2881px)"
        fetchPriority="high"
      />

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
              <a className="button button--gold" href={LUMA_URL} target="_blank" rel="noreferrer noopener">
                Join a gathering
              </a>
              <a className="button button--line" href="#who">
                Who we are
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are: the Sigil of Seeking. */}
      <section className="band band--sky band--cut who" id="who" aria-labelledby="who-title">
        <Paint which="light" />
        <div className="wrap who__grid">
          <div>
            <Ornate as="blockquote" className="ornate--light who__sigil">
              <p className="who__quote">&ldquo;{brand.sigil.quote}&rdquo;</p>
              <p className="who__answer">{brand.sigil.answer}</p>
              <p className="who__source">The Sigil of Seeking</p>
            </Ornate>
          </div>
          <div className="who__copy">
            <SectionHead id="who-title" title="Who we are" />
            <p className="lead">
              {brand.who}
            </p>
            <p>
              We welcome technology, business, creative and events enthusiasts from colleges and senior high schools, especially, but not
              limited to, those from the provinces. Membership is free. We seek those who seek.
            </p>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="band band--blue band--cut band--cut-left vision" id="vision" aria-labelledby="vision-title">
        <Paint which="light" />
        <span className="sky sky--stars" aria-hidden="true" />
        <div className="wrap vision__inner">
          <SectionHead id="vision-title" title="Our vision" tone="dark" />
          <p className="vision__statement">
            {vision.lead}
          </p>
          <div className="vision__body">
            {vision.body.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="band band--sky band--cut mission" id="mission" aria-labelledby="mission-title">
        <Paint which="light" />
        <div className="wrap">
          <SectionHead id="mission-title" title="Our mission" />
          <ul className="mission__list rail" id="mission-rail">
            {mission.map((item, index) => (
              <li key={item.lead}>
                <Ornate className="ornate--light mission__card">
                  <span className="medallion" aria-hidden="true">
                    {numerals[index]}
                  </span>
                  <h3 className="mission__lead">{item.lead.replace(/,$/, "")}</h3>
                  <p>{item.body.charAt(0).toUpperCase() + item.body.slice(1)}</p>
                </Ornate>
              </li>
            ))}
          </ul>
          <RailDots target="mission-rail" count={mission.length} label="Mission cards" />
        </div>
      </section>

      {/* Pillars */}
      <section className="band band--night band--cut band--cut-left pillars" id="pillars" aria-labelledby="pillars-title">
        <Paint which="dark-water" />
        <span className="sky sky--stars" aria-hidden="true" />
        <div className="wrap">
          <SectionHead id="pillars-title" title="Five pillars" tone="dark" />
          <ul className="pillars__grid rail" id="pillars-rail">
            {pillars.map((pillar, index) => (
              <li key={pillar.title}>
                <Ornate className="ornate--dark pillar">
                  <span className="pillar__n" aria-hidden="true">
                    <span>{numerals[index]}</span>
                  </span>
                  <h3 className="pillar__title">{pillar.title}</h3>
                  <p className="pillar__body">{pillar.body}</p>
                </Ornate>
              </li>
            ))}
          </ul>
          <RailDots target="pillars-rail" count={pillars.length} label="Pillar cards" />
        </div>
      </section>

      {/* Culture */}
      <section className="band band--royal band--cut culture" id="culture" aria-labelledby="culture-title">
        <Paint which="light" />
        <span className="sky sky--stars" aria-hidden="true" />
        <div className="wrap">
          <SectionHead id="culture-title" title="Our culture" tone="dark" />
          {/* On phones and tablets the frame shows and the values read as one
              list; on desktop the frame steps aside and they sit in a grid. */}
          <Ornate className="ornate--dark culture__panel">
            <ul className="culture__grid">
              {culture.map((value) => (
                <li key={value} className="value">
                  <span className="value__gem" aria-hidden="true" />
                  <span className="value__text">{value}</span>
                </li>
              ))}
            </ul>
          </Ornate>
        </div>
      </section>

      {/* Programmes */}
      <section className="band band--sky band--cut band--cut-left programmes" id="programmes" aria-labelledby="programmes-title">
        <Paint which="light" />
        <div className="wrap">
          <SectionHead id="programmes-title" title="What we do" />
          <ul className="programmes__grid rail" id="programmes-rail">
            {programmes.map((programme) => (
              <li key={programme.name}>
                <Ornate className="ornate--light programme">
                  <p className="programme__cadence">{programme.cadence}</p>
                  <h3 className="programme__name">{programme.name}</h3>
                  <p className="programme__body">{programme.body}</p>
                  <p className="programme__access">{programme.access}</p>
                </Ornate>
              </li>
            ))}
          </ul>
          <RailDots target="programmes-rail" count={programmes.length} label="Programme cards" />
        </div>
      </section>

      {/* Events */}
      <section className="band band--night band--cut events" id="events" aria-labelledby="events-title">
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
        <div className="wrap">
          <SectionHead id="join-title" title="How to join" tone="dark" />
          <p className="join__intro">
            Membership is free. There is no fee and no donation; what the guild asks for is curiosity and contribution.
          </p>
          <ol className="join__steps">
            {joinSteps.map((step, index) => (
              <li key={step.title} className="join__step">
                <span className="medallion" aria-hidden="true">
                  {numerals[index]}
                </span>
                <h3 className="join__title">{step.title}</h3>
                <p>{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="actions join__actions">
            <a className="button button--gold" href={LUMA_URL} target="_blank" rel="noreferrer noopener">
              Find the next Open Table
            </a>
            <a className="button button--line" href={socialLinks[0].href} target="_blank" rel="noreferrer noopener">
              Message us on Facebook
            </a>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="band band--sky band--cut faq" id="faq" aria-labelledby="faq-title">
        <Paint which="light" />
        <div className="wrap faq__grid">
          <SectionHead id="faq-title" title="Questions" />
          <div className="faq__list">
            {faqs.map((item) => (
              <details className="faq__item" key={item.q}>
                <summary className="faq__q">
                  <span>{item.q}</span>
                  <span className="faq__icon" aria-hidden="true" />
                </summary>
                <p className="faq__a">{item.a}</p>
              </details>
            ))}
          </div>
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
          <MagicCircle className="close__circle" />
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
              <a className="button button--gold" href={LUMA_URL} target="_blank" rel="noreferrer noopener">
                See upcoming gatherings
              </a>
              <a className="button button--line" href="#join">
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
