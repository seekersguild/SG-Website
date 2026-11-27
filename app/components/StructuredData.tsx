import { getEvents, type GuildEvent } from "../content/events";
import { brand, faqs, socialLinks, tagline } from "../content/site";
import { siteUrl } from "../site-url";

/* Machine-readable facts about the guild for search engines and AI answer
   engines: the organisation and the site on every page, the gatherings on
   What we do, and the FAQ on Join. Each mirrors what that page shows. */
export async function StructuredData({ events = false, faq = false }: { events?: boolean; faq?: boolean }) {
  const { upcoming, previous } = await getEvents();
  const orgId = `${siteUrl}/#organization`;

  const event = (e: GuildEvent) => ({
    "@type": "Event",
    name: e.title,
    url: e.url,
    startDate: e.start,
    ...(e.end ? { endDate: e.end } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    ...(e.venue
      ? { location: { "@type": "Place", name: e.venue, address: { "@type": "PostalAddress", streetAddress: e.venue, addressCountry: "PH" } } }
      : {}),
    ...(e.cover ? { image: [e.cover] } : {}),
    ...(e.free ? { isAccessibleForFree: true, offers: { "@type": "Offer", price: 0, priceCurrency: "PHP", url: e.url, availability: "https://schema.org/InStock" } } : {}),
    organizer: { "@id": orgId },
  });

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: "Seekers Guild",
        url: `${siteUrl}/`,
        logo: `${siteUrl}/assets/seekersguild_logo.png`,
        description: brand.pitch,
        slogan: tagline,
        foundingDate: "2025-04",
        areaServed: { "@type": "Country", name: "Philippines" },
        sameAs: socialLinks.map((l) => l.href),
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: "Seekers Guild",
        inLanguage: "en",
        publisher: { "@id": orgId },
      },
      ...(faq
        ? [
            {
              "@type": "FAQPage",
              "@id": `${siteUrl}/join#faq`,
              mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
            },
          ]
        : []),
      // Google requires a location for Event results; events without a public venue are left out here
      // (they still appear in the visible list).
      ...(events ? [...upcoming, ...previous].filter((e) => e.venue).map(event) : []),
    ],
  };

  // JSON-LD must not be able to close its own <script> tag.
  const json = JSON.stringify(graph).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
