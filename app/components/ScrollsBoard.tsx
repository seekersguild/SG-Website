const scrollSections = ["SECTION", "SECTION", "SECTION"];

export default function ScrollsBoard() {
  return (
    <section className="scrolls-section" aria-label="Scrolls overview">
      <div className="scrolls-shell">
        <h1>SCROLLS</h1>

        <section className="scrolls-featured" aria-label="Featured articles and art">
          <h2>
            FEATURED
            <span>ARTICLES / ART</span>
          </h2>
        </section>

        <div className="scroll-section-list">
          {scrollSections.map((section, sectionIndex) => (
            <section className="scroll-content-section" key={`${section}-${sectionIndex}`}>
              <header className="scroll-section-header">
                <h2>{section}</h2>
                <div className="scroll-divider" aria-hidden="true" />
                <span>&lt; 1/N &gt;</span>
              </header>

              <div className="scroll-card-grid">
                {Array.from({ length: 3 }, (_, cardIndex) => (
                  <article className="scroll-card" key={`${sectionIndex}-${cardIndex}`}>
                    <h3>TITLE</h3>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
