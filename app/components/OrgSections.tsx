import Link from "next/link";

import { getEvents } from "../content/events";
import { atAGlance, audience, CONTACT_EMAIL, ecosystem, LUMA_URL, partnerReasons, partners, partnershipTiers, socialLinks } from "../content/site";
import { Paint, SectionHead } from "./Sections";

/* The sections that present the guild as an organisation. Each appears on
   exactly one page, where it belongs:
     Home        At a glance
     Partners    Why partner, Who you reach, Ways to partner
     Impact      Our work so far, Partner ecosystem
     Get involved  Ways to get involved
     Contact     the contact list, inside the page's opening
   Each reuses a layout the site already has (mission rows, pillar columns,
   the culture list) so the pages read as one site. */

/* One short line under a heading, saying what the section is for. */
function Lead({ children, tone = "light" }: { children: string; tone?: "light" | "dark" }) {
  return <p className={`section-lead section-lead--${tone}`}>{children}</p>;
}

/* Home: the guild's record in numbers (Community Overview 2026), plus the
   gatherings hosted, counted live from Luma. */
export async function AtAGlanceSection() {
  const { previous } = await getEvents();
  const [foundation, ...reach] = atAGlance;
  const stats = [...reach, ...(previous.length ? [{ value: String(previous.length), label: "Gatherings hosted" }] : [])];
  return (
    <section className="band band--blue band--cut band--cut-left glance" id="at-a-glance" aria-labelledby="glance-title">
      <Paint which="light" artwork="home-glance" />
      <span className="sky sky--stars" aria-hidden="true" />
      <div className="wrap">
        <div className="glance__head">
          <div>
            <SectionHead id="glance-title" title="Seekers making their mark" tone="dark" />
            <p className="glance__since">Student-led since April {foundation.value}.</p>
          </div>
          <Link className="text-link glance__more" href="/impact">
            See the guild in action
          </Link>
        </div>
        <dl className="glance__stats">
            {stats.map((stat) => (
              <div key={stat.label} className="glance__stat">
                <dt>{stat.label}</dt>
                <dd>{stat.value}</dd>
              </div>
            ))}
        </dl>
      </div>
    </section>
  );
}

/* Partners: three reasons to partner, from the guild's own record. */
export function PartnerReasonsSection() {
  return (
    <section className="band band--sky band--cut reasons" id="why" aria-labelledby="why-title">
      <Paint which="light" artwork="partners-why" />
      <div className="wrap">
        <SectionHead id="why-title" title="Why partner with the guild" />
        <ol className="reasons__list">
          {partnerReasons.map((reason) => (
            <li key={reason.title} className="reason">
              <h3 className="reason__title">{reason.title}</h3>
              <p className="reason__body">{reason.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Partners: who is in the room. */
export function AudienceSection() {
  return (
    <section className="band band--royal band--cut band--cut-left audience" id="audience" aria-labelledby="audience-title">
      <Paint which="light" artwork="partners-audience" />
      <span className="sky sky--stars" aria-hidden="true" />
      <div className="wrap split">
        <div>
          <SectionHead id="audience-title" title="Who you reach" tone="dark" />
          <Lead tone="dark">The people guild programmes bring together, from college students to corporate innovation teams.</Lead>
        </div>
        <ul className="split__main values">
          {audience.map((role) => (
            <li key={role} className="value">
              {role}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Partners: the five tiers, laid out like the pillars. A tier lists its
   inclusions once the partnerships team adds them to site.ts. */
export function TiersSection() {
  return (
    <section className="band band--night band--cut tiers" id="tiers" aria-labelledby="tiers-title">
      <Paint which="dark-water" artwork="partners-tiers" />
      <span className="sky sky--stars" aria-hidden="true" />
      <div className="wrap">
        <SectionHead id="tiers-title" title="Ways to partner" tone="dark" />
        <Lead tone="dark">Five ways to back the guild, from a single gathering to the full year.</Lead>
        <ol className="pillars__row tiers__row">
          {partnershipTiers.map((tier) => (
            <li key={tier.name} className="pillar">
              <h3 className="pillar__title">{tier.name}</h3>
              <p className="pillar__body">{tier.scope}</p>
              {tier.benefits.length ? (
                <ul className="tier__benefits">
                  {tier.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              ) : null}
            </li>
          ))}
        </ol>
        <p className="tiers__note">
          The inclusions for each tier are agreed with you.{" "}
          <a className="text-link" href={`mailto:${CONTACT_EMAIL}?subject=Partnership%20packages`}>
            Ask for the current package sheet
          </a>
        </p>
      </div>
    </section>
  );
}

/* Impact: selected ecosystem involvement, as the mission's rows with the
   year in place of a numeral. */
export function EcosystemSection() {
  return (
    <section className="band band--sky ecosystem content-opening" id="record" aria-labelledby="page-title">
      <Paint which="light" artwork="impact-record" priority />
      <div className="wrap">
        <SectionHead id="page-title" title="Our impact" level={1} />
        <h2 className="content-opening__subhead" id="record-title">Our work so far</h2>
        <Lead>Selected events the guild has partnered on or taken part in.</Lead>
        <ol className="aims">
          {ecosystem.map((item) => (
            <li key={item.name} className="aim">
              <span className="aim__n aim__n--year">{item.year}</span>
              <h3 className="aim__lead">{item.name}</h3>
              <p className="aim__body">{item.detail}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Impact: the organisations that back the guild, strategic partner first. */
export function PartnersSection() {
  const ordered = [...partners].sort((a, b) => Number(b.relationship.startsWith("Strategic")) - Number(a.relationship.startsWith("Strategic")));
  return (
    <section className="band band--blue band--cut band--cut-left partners-list" id="partners" aria-labelledby="partners-title">
      <Paint which="light" artwork="impact-partners" />
      <span className="sky sky--stars" aria-hidden="true" />
      <div className="wrap">
        <SectionHead id="partners-title" title="Our partner ecosystem" tone="dark" />
        <ul className="ally-list">
          {ordered.map((partner) => (
            <li key={partner.name} className={partner.relationship.startsWith("Strategic") ? "ally ally--strategic" : "ally"}>
              <h3 className="ally__name">{partner.name}</h3>
              <p className="ally__relationship">{partner.relationship}</p>
              <p className="ally__body">{partner.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* Get involved: ways to take part, from attending once to backing the guild. */
export function WaysSection() {
  const ways = [
    { title: "Come to an Open Table", body: "Open to the public, every month. The easiest way to meet the guild before anything else.", href: LUMA_URL, cta: "Find the next one" },
    { title: "Become a member", body: "Free. You join on the endorsement of two existing members, after a short review.", href: "#join", cta: "See the steps" },
    { title: "Volunteer on Outreach", body: "The Outreach Program is volunteer-driven: the guild travels outside Manila to run workshops.", href: socialLinks[0].href, cta: "Message us to help" },
    { title: "Partner with the guild", body: "Organisations can back a single gathering, a programme, or the guild's full year.", href: "/partners", cta: "Ways to partner" },
  ];
  return (
    <section className="band band--night ways content-opening" id="ways" aria-labelledby="ways-title">
      <Paint which="dark-water" artwork="join-ways" priority />
      <span className="sky sky--stars" aria-hidden="true" />
      <div className="wrap">
        <SectionHead id="ways-title" title="Get involved" tone="dark" level={1} />
        <Lead tone="dark">Membership is free. It starts with one conversation at an Open Table.</Lead>
        <ol className="pillars__row pillars__row--four">
          {ways.map((way) => (
            <li key={way.title} className="pillar">
              <h2 className="pillar__title">{way.title}</h2>
              <p className="pillar__body">{way.body}</p>
              {way.href.startsWith("http") ? (
                <a className="text-link way__link" href={way.href} target="_blank" rel="noreferrer noopener">
                  {way.cta}
                </a>
              ) : way.href.startsWith("#") ? (
                <a className="text-link way__link" href={way.href}>
                  {way.cta}
                </a>
              ) : (
                <Link className="text-link way__link" href={way.href}>
                  {way.cta}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* Contact: the shared inbox and the guild's channels, each line plainly a
   link. It sits in the Contact page's opening, so the page is one band. */
export function ContactList() {
  const rows = [
    { label: "Email", value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
    { label: "Events", value: "Seekers Guild on Luma", href: LUMA_URL },
    ...socialLinks
      .filter((link) => link.label !== "Luma")
      // Each account by its handle; the full address is in the link.
      .map((link) => ({ label: link.label, value: `@${link.href.replace(/\/$/, "").split("/").pop()}`, href: link.href })),
  ];
  return (
    <ul className="contact__list" aria-label="Ways to reach the guild">
      {rows.map((row) => {
        const external = row.href.startsWith("http");
        return (
          <li key={row.label}>
            <a className="contact__row" href={row.href} {...(external ? { target: "_blank", rel: "noreferrer noopener" } : {})}>
              <span className="contact__label">{row.label}</span>
              <span className="contact__value">{row.label === "Email" ? <>{CONTACT_EMAIL.split("@")[0]}<wbr />@{CONTACT_EMAIL.split("@")[1]}</> : row.value}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
