import Link from "next/link";

import { PageHero } from "./components/PageHero";

export default function NotFound() {
  return (
    <PageHero
      compass
      title="Off the map"
      intro="This page is not on the chart. It may have moved, or the address may have a typo."
    >
      <Link className="button" href="/">
        Back to the home page
      </Link>
    </PageHero>
  );
}
