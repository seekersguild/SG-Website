import Image from "next/image";
import Link from "next/link";

import { CONTACT_EMAIL, LUMA_URL, socialLinks, tagline } from "../content/site";

/* Guild identity on the left, with site navigation and contact links on the right. */
const columns = [
  {
    title: "The guild",
    links: [
      { label: "About", href: "/about" },
      { label: "Programmes", href: "/programmes" },
      { label: "Impact", href: "/impact" },
    ],
  },
  {
    title: "Take part",
    links: [
      { label: "Get involved", href: "/join" },
      { label: "Questions", href: "/join#faq" },
      { label: "Partner with us", href: "/partners" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap footer__top">
        <div className="footer__brand">
          <Image src="/assets/seekersguild_logo.png" alt="" width={64} height={64} />
          <p className="footer__name">Seekers Guild</p>
          <p className="footer__tagline">{tagline}</p>
        </div>

        <nav className="footer__links" aria-label="Footer">
          {columns.map((column) => (
            <div key={column.title}>
              <h2>{column.title}</h2>
              <ul>
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="footer__connect">
            <h2>Connect</h2>
            <ul>
              <li>
                <a className="footer__email" href={`mailto:${CONTACT_EMAIL}`}>
                  {CONTACT_EMAIL}
                </a>
              </li>
              {socialLinks
                .filter((link) => link.href !== LUMA_URL)
                .map((link) => (
                  <li key={link.href}>
                    <a href={link.href} target="_blank" rel="noreferrer noopener">
                      {link.label}
                    </a>
                  </li>
                ))}
              <li>
                <a href={LUMA_URL} target="_blank" rel="noreferrer noopener">
                  Events on Luma
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div className="wrap footer__legal">
        <p>&copy; {new Date().getFullYear()} Seekers Guild</p>
        <Link href="/contact">Contact</Link>
        <a href="#main">Back to top</a>
      </div>
    </footer>
  );
}
