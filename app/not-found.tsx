import Link from "next/link";

import { PageHero } from "./components/PageHero";
import { sectionNav } from "./content/site";

export default function NotFound() {
  return (
    <PageHero
     
      title="Off the map"
      intro="This page is not on the chart. It may have moved, or the address may have a typo."
    >
      <Link className="button button--gold" href="/">
        Back to the home page
      </Link>
      {sectionNav.map((item) => (
        <Link className="button button--line" href={item.href} key={item.href}>
          {item.label}
        </Link>
      ))}
    </PageHero>
  );
}
