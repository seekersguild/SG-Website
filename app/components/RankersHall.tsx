"use client";

import { useState } from "react";

type RankerCard = {
  id: string;
  label: string;
};

const rankers: RankerCard[] = Array.from({ length: 10 }, (_, index) => ({
  id: `ranker-${index + 1}`,
  label: `Ranker ${index + 1}`,
}));

const council: RankerCard[] = Array.from({ length: 8 }, (_, index) => ({
  id: `council-${index + 1}`,
  label: `Council ${index + 1}`,
}));

export default function RankersHall() {
  const [selectedCard, setSelectedCard] = useState<RankerCard | null>(null);

  return (
    <section className="rankers-section" aria-label="Ranker's Hall">
      <div className="rankers-shell">
        <h1>RANKER&apos;S HALL</h1>

        <section className="rankers-banner" aria-label="Intro banner">
          <h2>INTRO BANNER</h2>
        </section>

        <div className="ranker-card-grid ranker-card-grid-primary">
          {rankers.map((card) => (
            <button className="ranker-card-button" key={card.id} type="button" onClick={() => setSelectedCard(card)}>
              <span>{card.label}</span>
            </button>
          ))}
        </div>

        <h2 className="council-heading">THE COUNCIL</h2>

        <div className="ranker-card-grid ranker-card-grid-council">
          {council.map((card) => (
            <button className="ranker-card-button council-card-button" key={card.id} type="button" onClick={() => setSelectedCard(card)}>
              <span>{card.label}</span>
            </button>
          ))}
        </div>
      </div>

      {selectedCard && (
        <div className="ranker-modal-backdrop" role="presentation" onClick={() => setSelectedCard(null)}>
          <section
            className="ranker-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedCard.label} details`}
            onClick={(event) => event.stopPropagation()}
          >
            <button className="ranker-modal-close" type="button" onClick={() => setSelectedCard(null)} aria-label="Close card details">
              x
            </button>

            <div className="ranker-modal-cards">
              <div className="ranker-modal-card">
                <span>{selectedCard.label}</span>
              </div>
              <div className="ranker-modal-card ranker-profile-card">
                <span>Profile Placeholder</span>
              </div>
            </div>

            <div className="ranker-modal-info">
              <div className="ranker-avatar-placeholder" aria-hidden="true" />
              <div>
                <h2>NICKNAME</h2>
                <p>INFOS/STORY</p>
              </div>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
