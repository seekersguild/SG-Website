"use client";

import { useMemo, useState } from "react";

const categories = ["Events", "Hackathons", "Workshops", "Recreational", "Online Learning"] as const;

type Category = (typeof categories)[number];

const questCopy: Record<Category, { title: string; description: string; date: string }[]> = categories.reduce(
  (copy, category) => ({
    ...copy,
    [category]: Array.from({ length: 12 }, (_, index) => ({
      title: `${category} ${index + 1}`,
      description: "short description",
      date: "Month/XX/XXXX",
    })),
  }),
  {} as Record<Category, { title: string; description: string; date: string }[]>,
);

export default function QuestBoard() {
  const [activeCategory, setActiveCategory] = useState<Category>("Events");
  const quests = useMemo(() => questCopy[activeCategory], [activeCategory]);

  return (
    <section className="quest-board-section" aria-label="Quest categories">
      <div className="quest-folder">
        <div className="quest-tabs" role="tablist" aria-label="Quest filters">
          {categories.map((category) => (
            <button
              className={`quest-tab ${activeCategory === category ? "active" : ""}`}
              key={category}
              type="button"
              role="tab"
              aria-selected={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              {category.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="quest-panel" role="tabpanel">
          <div className="quest-grid">
            {quests.map((quest, index) => (
              <article className="quest-card" key={`${activeCategory}-${quest.title}-${index}`}>
                <div className="quest-image-placeholder" aria-label={`${quest.title} image placeholder`} />
                <div className="quest-card-meta">
                  <h2>{quest.title}</h2>
                  <time>{quest.date}</time>
                </div>
                <p>{quest.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
