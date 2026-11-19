import Image from "next/image";
import Link from "next/link";

import { moreNav, sectionNav, socialLinks, tagline } from "../content/site";

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
          <div>
            <h2>On this page</h2>
            <ul>
              {[...sectionNav, ...moreNav].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2>Follow</h2>
            <ul>
              {socialLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} target="_blank" rel="noreferrer noopener">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      <div className="wrap footer__legal">
        <p>&copy; {new Date().getFullYear()} Seekers Guild</p>
        <a href="#main">Back to top</a>
      </div>
    </footer>
  );
}
