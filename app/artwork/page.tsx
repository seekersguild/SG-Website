import type { Metadata } from "next";
import { Paint } from "../components/Paint";
import works from "../content/monet.json";

export const metadata: Metadata = {
  title: "Artwork credits",
  description: "Claude Monet paintings used throughout the Seekers Guild website, with museum sources and public-domain image credits.",
  alternates: { canonical: "/artwork" },
};

export default function ArtworkCredits() {
  return (
    <section className="band band--sky artwork-credits" aria-labelledby="page-title">
      <Paint which="light" artwork="artwork-opening" priority />
      <div className="wrap">
        <h1 className="heading" id="page-title">Artwork credits</h1>
        <p>The paintings throughout this website are by Claude Monet, from the Art Institute of Chicago’s public-domain collection. Each section uses a different work. Images are resized and shown beneath a colour wash.</p>
        <p><a className="text-link" href="https://www.artic.edu/open-access/open-access-images">Art Institute of Chicago Open Access</a></p>
        <dl className="artwork-credits__list">
          {Object.entries(works).map(([section, work]) => (
            <div key={section}>
              <dt><a className="text-link" href={work.source}>{work.title}</a> <span>({work.date})</span></dt>
              <dd>{section.replaceAll("-", " ")} · {work.museum} · {work.license}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
