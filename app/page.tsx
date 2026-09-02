import type { CSSProperties, ReactNode } from "react";

import Image from "next/image";

import { InteractiveCompass } from "./components/InteractiveCompass";
import { SmoothAnchors } from "./smooth-anchors";

const navItems = [
  ["Mission", "#mission"],
  ["Vision", "#vision"],
  ["Pillars", "#pillars"],
  ["Culture", "#culture"],
];

const missionItems = [
  {
    lead: "Empower students from all walks of life",
    body: "especially those from the provinces and underserved sectors, to take ownership of their lifelong learning, leadership, and future by bridging access to opportunities, events, and collaborative spaces across Manila and other major hubs.",
  },
  {
    lead: "Equip seekers with transformative, real-world experiences",
    body: "that transcend the boundaries of textbooks through cross-functional projects, idea exchanges, student-led initiatives, and immersive learning journeys that spark bold action.",
  },
  {
    lead: "Foster a vibrant, purpose-driven community",
    body: "of passionate minds and courageous leaders united across disciplines, institutes, and regions by shared leadership, inclusive collaboration, and a culture of mentorship and lifelong learning.",
  },
];

const pillars = [
  {
    numeral: "I",
    title: "Purpose-Driven Collaboration",
    body: "We begin with why. Every project, event, and alliance is rooted in meaningful goals that align with the vision of impact and growth.",
  },
  {
    numeral: "II",
    title: "Inclusive Community Culture",
    body: "We create a safe, welcoming space where diversity is celebrated, respect is non-negotiable, and everyone feels a sense of belonging.",
  },
  {
    numeral: "III",
    title: "Decentralized Empowerment",
    body: "Leadership is shared, not reserved. Every guild, member, and initiative has the power to lead, decide, and shape the community's direction. We value all voices, especially the bold, the curious, and the wildly imaginative, because every idea holds potential when heard.",
  },
  {
    numeral: "IV",
    title: "Open Knowledge Exchange",
    body: "We freely share valuable ideas, insights, and learnings across campuses and disciplines, because when knowledge flows, innovation grows.",
  },
  {
    numeral: "V",
    title: "Continuous Learning & Development",
    body: "We value lifelong growth, both technical and personal. Curiosity, mentorship, and self-improvement fuel our journey forward.",
  },
];

const cultureItems = [
  "Diverse and Inclusive Environment",
  "Personal and Professional Development",
  "Adapt and Evolve",
  "Cross-Functional Collaboration",
  "Open and Transparent Communication",
  "Positive Impact on the World",
  "Embrace Failure as a Learning Opportunity",
  "Foster a Sense of Belonging",
  "Encourage Creativity in Problem-Solving",
  "Flat Hierarchy",
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/seekersguildcommunity",
    path: <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/seekersguild.community/",
    path: (
      <>
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/seekersguildcommunity/posts/?feedView=all",
    path: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
  {
    label: "Luma",
    href: "https://luma.com/user/seekersguild",
    path: (
      <path d="M12 2a5 5 0 0 1 5 5 5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1-5-5 5 5 0 0 1 5-5 5 5 0 0 1 5-5z" />
    ),
  },
];

function hexPoints(cx: number, cy: number, r: number) {
  return Array.from({ length: 6 }, (_, index) => {
    const angle = (Math.PI / 180) * (30 + index * 60);
    return `${cx + r * Math.cos(angle)},${cy + r * Math.sin(angle)}`;
  }).join(" ");
}

function HexMark() {
  return (
    <svg className="hex-mark" viewBox="0 0 24 28" aria-hidden="true">
      <polygon points="12,1 23,7.5 23,20.5 12,27 1,20.5 1,7.5" />
      <polygon points="12,8 17,11 17,17 12,20 7,17 7,11" />
    </svg>
  );
}

function HexNumeral({ numeral }: { numeral: string }) {
  return (
    <div className="hex-numeral">
      <svg viewBox="0 0 52 60" aria-hidden="true">
        <polygon points="26,1 51,15.5 51,44.5 26,59 1,44.5 1,15.5" />
        <polygon points="26,7 46,18.5 46,41.5 26,53 6,41.5 6,18.5" />
      </svg>
      <span>{numeral}</span>
    </div>
  );
}

/* Every figure is drawn in the same 200-unit square so the pieces below can
   be combined freely; CSS scales and places each one on the sheet. */
function Figure({ children, style }: { children: ReactNode; style: CSSProperties }) {
  return (
    <svg aria-hidden="true" className="draft-figure" style={style} viewBox="0 0 200 200">
      <g className="poly-ink">{children}</g>
    </svg>
  );
}

/* Circumscribing circle plus inscribed hexagon: the construction geometry a
   draughtsman leaves on the sheet rather than erasing. */
function HexPlate({ r = 84, inner = 0 }: { r?: number; inner?: number }) {
  return (
    <>
      <circle cx="100" cy="100" r={r} />
      <polygon points={hexPoints(100, 100, r)} />
      {inner > 0 ? <polygon points={hexPoints(100, 100, inner)} /> : null}
    </>
  );
}

function CentreCross({ r = 96 }: { r?: number }) {
  return (
    <>
      <path d={`M100 ${100 - r} V${100 + r}`} />
      <path d={`M${100 - r} 100 H${100 + r}`} />
    </>
  );
}

/* Three cells tessellated the way pointy-top hexagons actually pack:
   rows step 1.5r vertically and stagger by half a cell width. */
function HexCluster({ r = 40 }: { r?: number }) {
  const dx = (r * Math.sqrt(3)) / 2;
  return (
    <>
      <polygon points={hexPoints(100, 100 - 0.75 * r, r)} />
      <polygon points={hexPoints(100 - dx, 100 + 0.75 * r, r)} />
      <polygon points={hexPoints(100 + dx, 100 + 0.75 * r, r)} />
    </>
  );
}

/* Dimension line with witness lines running back toward the measured edge */
function DimensionLine() {
  return (
    <>
      <path d="M16 108 H184" />
      <path d="M16 96 V120" />
      <path d="M184 96 V120" />
      <path className="poly-dash" d="M16 62 V96" />
      <path className="poly-dash" d="M184 62 V96" />
    </>
  );
}

function SiteAtmosphere() {
  return (
    <div className="site-atmosphere" aria-hidden="true">
      <div className="site-grain" />
      <div className="site-lattice" />

      <div className="draft-sheet">
        <Figure style={{ top: "1%", left: "-7%", width: "clamp(260px, 30vw, 460px)" }}>
          <HexPlate inner={48} />
          <CentreCross />
          <path className="poly-dash" d="M32 44 L168 156" />
        </Figure>

        <Figure style={{ top: "4%", right: "-3%", width: "clamp(150px, 16vw, 250px)" }}>
          <HexPlate r={72} />
          <path className="poly-dash" d="M40 46 L172 132" />
        </Figure>

        <Figure style={{ top: "15%", right: "4%", width: "clamp(120px, 13vw, 190px)" }}>
          <DimensionLine />
        </Figure>

        <Figure style={{ top: "22%", left: "-5%", width: "clamp(200px, 22vw, 340px)" }}>
          <HexPlate r={80} inner={44} />
          <CentreCross r={92} />
        </Figure>

        <Figure style={{ top: "33%", right: "-6%", width: "clamp(220px, 25vw, 380px)" }}>
          <HexCluster r={44} />
        </Figure>

        <Figure style={{ top: "45%", left: "3%", width: "clamp(110px, 12vw, 170px)" }}>
          <circle cx="100" cy="100" r="60" />
          <CentreCross r={84} />
        </Figure>

        <Figure style={{ top: "54%", right: "2%", width: "clamp(180px, 20vw, 300px)" }}>
          <HexPlate r={78} />
          <path d="M100 100 L167 61" />
          <path className="poly-dash" d="M100 100 L100 22" />
        </Figure>

        <Figure style={{ top: "66%", left: "-6%", width: "clamp(230px, 26vw, 400px)" }}>
          <HexPlate r={86} inner={50} />
          <CentreCross />
        </Figure>

        <Figure style={{ top: "77%", right: "5%", width: "clamp(120px, 13vw, 190px)" }}>
          <DimensionLine />
        </Figure>

        <Figure style={{ top: "86%", left: "4%", width: "clamp(160px, 18vw, 270px)" }}>
          <HexCluster r={38} />
        </Figure>

        <Figure style={{ top: "94%", right: "-5%", width: "clamp(200px, 22vw, 340px)" }}>
          <HexPlate r={82} inner={46} />
          <path className="poly-dash" d="M28 52 L172 148" />
        </Figure>
      </div>
    </div>
  );
}

function ConstructionPlate({ className, dense = false }: { className: string; dense?: boolean }) {
  return (
    <svg className={className} viewBox="0 0 500 500" aria-hidden="true" focusable="false">
      <circle cx="250" cy="250" r="186" />
      <polygon points={hexPoints(250, 250, 186)} />
      <polygon points={hexPoints(250, 250, 140)} />
      <polygon points={hexPoints(250, 250, 104)} />
      <polygon points={hexPoints(250, 250, 52)} />
      <path d="M250 30 V470" />
      <path d="M30 250 H470" />
      <path d="M90 90 L410 410" />
      <path d="M410 90 L90 410" />
      <path className="poly-dash" d="M250 250 L418 148" />
      <circle cx="250" cy="250" r="7" />
      {dense ? (
        <>
          <circle cx="250" cy="250" r="220" />
          <polygon points={hexPoints(250, 250, 220)} />
          <path d="M250 22 V42" />
          <path d="M250 458 V478" />
          <path d="M22 250 H42" />
          <path d="M458 250 H478" />
          <circle cx="392" cy="108" r="34" />
          <polygon points={hexPoints(392, 108, 34)} />
        </>
      ) : null}
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <InteractiveCompass />
      <main className="site-shell">
        <SmoothAnchors />
        <SiteAtmosphere />

      <div className="first-screen" id="top">
        <header className="site-nav">
          <a className="site-brand" href="#top" aria-label="Back to top">
            <Image src="/assets/seekersguild_logo.png" alt="" width={982} height={982} priority />
            <div className="site-brand-text">
              <span>Seekers Guild</span>
            </div>
          </a>

          <nav className="nav-menu" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>
        </header>

        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-frame">
            <div className="hero-grid">
              <div className="hero-copy">
                <ConstructionPlate className="hero-construction hero-construction-left" dense />
                <div className="hero-copy-inner">
                  <div className="hero-intro">
                    <p className="eyebrow">Student-led guild for curious builders</p>
                    <h1 id="hero-title">Seekers Guild</h1>
                  </div>
                  <hr className="hero-divider" aria-hidden="true" />
                  <div className="hero-body">
                    <p className="hero-tagline">A compass for the curious, a home for the driven.</p>
                    <p className="hero-lede">
                      Built for students looking beyond the classroom, their usual circles, and the
                      opportunities immediately around them.
                    </p>
                  </div>
                  <div className="hero-actions">
                    <a className="button button-primary" href="#mission">
                      <span>Read Mission</span>
                    </a>
                    <a className="button button-secondary" href="#pillars">
                      <span>View Pillars</span>
                    </a>
                  </div>
                </div>
              </div>

              <aside className="guild-console" aria-label="Guild charter preview">
                <div className="console-header">
                  <span>Guild Charter</span>
                  <span>MMXXVI</span>
                </div>

                <div className="console-grid">
                  <section className="crest-chamber" aria-labelledby="season-title">
                    <div className="crest-ring" aria-hidden="true">
                      <Image
                        src="/assets/seekersguild_logo.png"
                        alt=""
                        width={982}
                        height={982}
                        priority
                      />
                    </div>
                    <div>
                      <p>Opening Chapter</p>
                      <h2 id="season-title">The charter is being written.</h2>
                    </div>
                  </section>

                  <div className="charter-body">
                    <p>
                      A house for seekers from every corner of the Philippines, especially the
                      provinces &mdash; looking past the classroom, their usual circles, and the
                      chances sitting immediately around them.
                    </p>
                    <div className="charter-next">
                      <p>Gatherings go up as they are set.</p>
                      <a
                        className="charter-cta"
                        href="https://luma.com/user/seekersguild"
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        <span>See what&apos;s next</span>
                      </a>
                    </div>
                  </div>

                  <nav className="charter-links" aria-label="Follow the guild">
                    {socialLinks.map((social) => (
                      <a
                        href={social.href}
                        key={social.label}
                        rel="noreferrer noopener"
                        target="_blank"
                      >
                        {social.label}
                      </a>
                    ))}
                  </nav>
                </div>
              </aside>
            </div>
          </div>
        </section>
      </div>

      <section className="content-section" id="mission" aria-labelledby="mission-title">
        <div className="section-heading">
          <HexMark />
          <h2 id="mission-title">Mission</h2>
        </div>
        <article className="panel mission-plate">
          <div className="panel-face">
            {missionItems.map((item) => (
              <p key={item.lead}>
                <strong>{item.lead}</strong> {item.body}
              </p>
            ))}
          </div>
        </article>
      </section>

      <section className="content-section" id="vision" aria-labelledby="vision-title">
        <div className="section-heading">
          <HexMark />
          <h2 id="vision-title">Vision</h2>
        </div>
        <article className="panel vision-panel">
          <div className="panel-face">
            <p className="vision-lead">
              To awaken a generation of inspired trailblazers, students transformed not by what
              school alone can offer, but by the exposure, experience, and empowerment they find
              beyond it.
            </p>
            <div className="vision-support">
              <p>
                We envision a decentralized guild where seekers from every corner of the
                Philippines, especially the provinces, rise as changemakers connected by shared
                knowledge, driven by purpose, and committed to giving back.
              </p>
              <p>
                In this future, curiosity becomes courage, access becomes opportunity, and every
                seeker finds the compass that points to the life they&apos;re meant to lead.
              </p>
            </div>
          </div>
        </article>
      </section>

      <section className="content-section" id="pillars" aria-labelledby="pillars-title">
        <div className="section-heading">
          <HexMark />
          <h2 id="pillars-title">Five Pillars</h2>
        </div>
        <div className="pillar-grid">
          {pillars.map((pillar) => (
            <article className="panel pillar-card" key={pillar.title}>
              <div className="panel-face">
                <HexNumeral numeral={pillar.numeral} />
                <h3>{pillar.title}</h3>
                <p>{pillar.body}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="content-section" id="culture" aria-labelledby="culture-title">
        <div className="section-heading">
          <HexMark />
          <h2 id="culture-title">Culture</h2>
        </div>
        <ul className="culture-list">
          {cultureItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <footer className="site-footer">
        <div className="footer-top">
          <div className="footer-identity">
            <a className="footer-brand" href="#top">
              <Image src="/assets/seekersguild_logo.png" alt="" width={982} height={982} />
              <span>Seekers Guild</span>
            </a>
            <p>A compass for the curious, a home for the driven.</p>
          </div>

          <nav className="footer-meta" aria-label="Footer navigation">
            <h2>Explore</h2>
            {navItems.map(([label, href]) => (
              <a href={href} key={label}>
                {label}
              </a>
            ))}
          </nav>

          <div className="footer-connect">
            <h2>Connect</h2>
            <div className="footer-social">
              {socialLinks.map((social) => (
                <a
                  aria-label={social.label}
                  href={social.href}
                  key={social.label}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    {social.path}
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="footer-base">
          <p>&copy; {new Date().getFullYear()} Seekers Guild</p>
          <p>Student-led guild for curious builders</p>
        </div>
      </footer>
      </main>
    </>
  );
}
