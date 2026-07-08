import type { CSSProperties } from "react";

const subguilds = [
  {
    name: "Alchemists",
    accent: "#05c56b",
    description: "DESC",
  },
  {
    name: "Merchants",
    accent: "#ffc35a",
    description: "DESC",
  },
  {
    name: "Artisans",
    accent: "#ff3038",
    description: "DESC",
  },
];

export default function SubguildsBoard() {
  return (
    <section className="subguilds-section" aria-label="Subguilds overview">
      <div className="subguilds-shell">
        <h1>SUBGUILDS</h1>

        <section className="featured-activities" aria-label="Featured activities">
          <h2>FEATURED ACTIVITIES</h2>
        </section>

        <div className="subguild-card-grid">
          {subguilds.map((subguild) => (
            <article className="subguild-card" key={subguild.name}>
              <div
                className="subguild-image-placeholder"
                style={{ "--subguild-accent": subguild.accent } as CSSProperties}
                aria-label={`${subguild.name} image placeholder`}
              />
              <h2>{subguild.name}</h2>
              <div className="subguild-desc-box">
                <p>{subguild.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
