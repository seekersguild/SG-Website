const codexRules = [
  {
    title: "RULE 1",
    body: "Huwag lalabas na kita yung strap ng Bra. Sit amet consectetur adipisicing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
  },
  {
    title: "RULE 2",
    body: "Wag pilitin ang feelings if di ka nya gusto. Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
  },
  {
    title: "RULE 3",
    body: "Wag papalipas ng gutom. Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
  },
  {
    title: "RULE N",
    body: "Matulog ka ng maaga. Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet consectetur adipiscing elit quisque faucibus ex. Adipiscing elit quisque faucibus ex sapien vitae pellentesque.",
  },
  {
    title: "RULE N",
    body: "missyubibi",
  },
];

export default function CodexBoard() {
  return (
    <section className="codex-section" aria-label="Guild codex">
      <div className="codex-shell">
        <h1>CODEX</h1>

        <section className="codex-banner" aria-label="Intro banner">
          <h2>INTRO BANNER</h2>
        </section>

        <div className="codex-rule-list">
          {codexRules.map((rule, index) => (
            <article className="codex-rule" key={`${rule.title}-${index}`}>
              <h2>{rule.title}</h2>
              <p>{rule.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
