import Link from "next/link";
import { CONTACT_EMAIL, partners } from "../content/site";
import { partnershipContact, partnershipOptions, partnershipProgrammes } from "../content/partnership";
import { Paint, SectionHead } from "./Sections";

export function PartnershipOpening() {
  return (
    <section className="band band--night band--cut page-opening partnership-opening" aria-labelledby="page-title">
      <Paint which="dark" artwork="partners-opening" priority />
      <div className="wrap">
        <div className="partnership-opening__layout">
          <div className="partnership-opening__copy">
            <SectionHead id="page-title" title="Partner with us" tone="dark" level={1} />
            <p className="partnership-opening__statement">Give curious minds a place to build.</p>
            <p>Work alongside students, founders and young builders across the Philippines, especially from the provinces. Your support can open a door: a place to meet, a mentor to learn from or the tools to build a first project.</p>
            <div className="actions partnership-opening__actions">
              <a className="button" href="#partnership-contact">Discuss a partnership</a>
              <a className="text-link" href="#opportunities">Explore the programmes</a>
            </div>
          </div>
          <aside className="partnership-opening__evidence" aria-labelledby="partnership-evidence-title">
            <h2 id="partnership-evidence-title">A community already at work</h2>
            <div>
              <p>Founded in April 2025. <strong>200+ members reached</strong> and <strong>10+ institutions and industry partners.</strong></p>
              <p className="partnership-source">Historical figures from our 2026 Community Overview.</p>
            </div>
            <p>Gold Partner at AWS Student Community Day Mega Manila 2025, an event involving students from more than 20 universities.</p>
            <Link className="text-link" href="/impact">See our impact</Link>
          </aside>
        </div>
        <p className="partnership-opening__partners">Our partner ecosystem includes {partners.map((partner) => partner.name).join(", ")}.</p>
      </div>
    </section>
  );
}

export function PartnershipProgrammes() {
  return (
    <section className="band band--sky band--cut band--cut-left partnership-programmes" id="opportunities" data-scroll-anchor="opportunities-title" aria-labelledby="opportunities-title">
      <Paint which="light" artwork="partners-why" />
      <div className="wrap">
        <div className="partnership-reading-layout">
          <div className="partnership-reading-intro">
            <SectionHead id="opportunities-title" title="Where you can make a difference" />
            <p className="partnership-intro">Choose the people you want to work with. We’ll find a meaningful role for your team.</p>
          </div>
        <div className="partnership-programmes__list">
          {partnershipProgrammes.map((programme) => <article className="partnership-programme" key={programme.name}>
            <div>
              <h3>{programme.name}</h3>
              <p className="partnership-programme__format">{programme.format}</p>
            </div>
            <p>{programme.description}</p>
            <dl>
              <div><dt>Ways to support</dt><dd>{programme.contribution}</dd></div>
              <div><dt>Why get involved</dt><dd>{programme.opportunity}</dd></div>
            </dl>
          </article>)}
        </div>
        </div>
        <p className="partnership-programmes__more">For outreach, workshops and the rest of the calendar, <Link className="text-link" href="/programmes">explore our programmes</Link>.</p>
      </div>
    </section>
  );
}

export function PartnershipOptions() {
  return (
    <section className="band band--royal band--cut partnership-options" id="tiers" data-scroll-anchor="tiers-title" aria-labelledby="tiers-title">
      <Paint which="light" artwork="partners-audience" />
      <div className="wrap">
        <div className="partnership-reading-layout">
          <div className="partnership-reading-intro">
            <SectionHead id="tiers-title" title="Ways to partner" tone="dark" />
            <p className="partnership-intro">Start with one gathering. Stay for the journey. Choose a commitment that works for your organisation.</p>
          </div>
        <div className="partnership-options__list">
          {partnershipOptions.map((option) => <article className="partnership-option" key={option.name}>
            <h3 className="partnership-option__name">{option.name}</h3>
            <p className="partnership-option__scope">{option.scope}</p>
            <p className="partnership-option__body">{option.contribution} {option.opportunity}</p>
          </article>)}
        </div>
        </div>
        <div className="partnership-options__note">
          <h3>A partnership built around shared goals.</h3>
          <p>We’ll agree the details together: brand visibility, promotion, speaking or mentoring, and community activities. Reporting can include attendance or content engagement where data is available.</p>
        </div>
        <div className="partnership-contact" id="partnership-contact" data-scroll-target="" data-scroll-anchor="partnership-contact-title">
          <div>
            <h3 id="partnership-contact-title">Let’s make something happen.</h3>
            <p>Have a programme in mind? Tell us your goals, what you can bring and when you’d like to start.</p>
          </div>
          <div className="partnership-contact__details">
            <a className="button" href={`mailto:${CONTACT_EMAIL}?subject=Partnership%20with%20Seekers%20Guild`}>Discuss a partnership</a>
            <p>{partnershipContact.name}<br /><span>{partnershipContact.role}</span><br /><a className="text-link" href={partnershipContact.phoneHref}>{partnershipContact.phone}</a></p>
          </div>
        </div>
      </div>
    </section>
  );
}
