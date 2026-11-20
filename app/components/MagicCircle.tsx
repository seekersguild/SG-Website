/* The instrument around the compass, in three layers: a low-poly bezel
   (many-sided rules, a ring of flat facets carrying the guild's taglines, a
   degree scale) turning slowly one way; a scanner ring turning the other; and
   a still compass card with the cardinal letters and faint degree numerals.
   The technical touches stay quiet: thin, low-contrast, never the focus. */
const at = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [+(300 + r * Math.cos(a)).toFixed(2), +(300 + r * Math.sin(a)).toFixed(2)];
};
const p = (r: number, deg: number) => at(r, deg).join(" ");

const SIDES = 24;
const ngon = (r: number) => Array.from({ length: SIDES }, (_, i) => p(r, (360 * i) / SIDES)).join(" ");

// The band behind the taglines: each side cut into two triangles, in an
// uneven run of four close navy tones.
const TONES = [1, 3, 2, 4, 2, 1, 4, 3, 1, 2, 4];
const facets = Array.from({ length: SIDES }, (_, i) => {
  const a = (360 * i) / SIDES;
  const b = (360 * (i + 1)) / SIDES;
  const [o1, o2, i1, i2] = [p(266, a), p(266, b), p(222, a), p(222, b)];
  return i % 2 ? [`${o1} ${o2} ${i1}`, `${o2} ${i2} ${i1}`] : [`${o1} ${i2} ${i1}`, `${o1} ${o2} ${i2}`];
})
  .flat()
  .map((points, i) => ({ i, points, tone: TONES[i % TONES.length] }));

// One tick per 5 degrees; longer every 15, longest at the cardinal points.
const ticks = Array.from({ length: 72 }, (_, i) => i * 5).map((deg) => {
  const kind = deg % 90 === 0 ? "cardinal" : deg % 15 === 0 ? "major" : "minor";
  const inner = kind === "cardinal" ? 266 : kind === "major" ? 275 : 281;
  const [x1, y1] = at(287, deg);
  const [x2, y2] = at(inner, deg);
  return { deg, kind, x1, y1, x2, y2 };
});

// Screen degrees: -90 is north.
const cardinals = [
  { deg: -90, letter: "N" },
  { deg: 0, letter: "E" },
  { deg: 90, letter: "S" },
  { deg: 180, letter: "W" },
].map(({ deg, letter }) => {
  const [x, y] = at(204, deg);
  return { letter, x, y };
});

// The compass card's degree numerals, every 30 degrees between the letters.
const numerals = [30, 60, 120, 150, 210, 240, 300, 330].map((bearing) => {
  const [x, y] = at(204, bearing - 90);
  return { bearing, x, y };
});

// The scanner ring: a dashed track with a few bright arcs, each capped by a node.
const scanArcs = [
  { from: -60, to: -20 },
  { from: 40, to: 54 },
  { from: 150, to: 178 },
  { from: 236, to: 244 },
];
const arcPath = (r: number, from: number, to: number) => {
  const [x1, y1] = at(r, from);
  const [x2, y2] = at(r, to);
  return `M${x1} ${y1} A${r} ${r} 0 0 1 ${x2} ${y2}`;
};

export function MagicCircle({ className = "" }: { className?: string }) {
  return (
    <div className={`magic-circle ${className}`} aria-hidden="true">
      {/* Bezel: turns slowly clockwise. */}
      <svg className="mc-layer mc-bezel" viewBox="0 0 600 600" focusable="false">
        <defs>
          <path id="mc-text" d="M300 300 m-239 0 a239 239 0 1 1 478 0 a239 239 0 1 1 -478 0" />
        </defs>
        {facets.map((f) => (
          <polygon key={f.i} points={f.points} className={`mc-facet mc-facet--${f.tone}`} />
        ))}
        <polygon points={ngon(292)} className="mc-rule" />
        {ticks.map((t) => (
          <line key={t.deg} x1={t.x1} y1={t.y1} x2={t.x2} y2={t.y2} className={`mc-tick mc-tick--${t.kind}`} />
        ))}
        <polygon points={ngon(266)} className="mc-rule mc-rule--fine" />
        <text className="mc-text">
          <textPath href="#mc-text" startOffset="0">
            We seek those who seek ✦ Guided by curiosity, bound by purpose ✦ We begin with why, then we build ✦ Onward, fellow seeker ✦
          </textPath>
        </text>
        <polygon points={ngon(222)} className="mc-rule mc-rule--fine" />
      </svg>

      {/* Scanner: turns the other way, a little faster. */}
      <svg className="mc-layer mc-scan" viewBox="0 0 600 600" focusable="false">
        <circle cx="300" cy="300" r="184" className="mc-track" />
        {scanArcs.map((s) => {
          const [x, y] = at(184, s.to);
          return (
            <g key={s.from}>
              <path d={arcPath(184, s.from, s.to)} className="mc-scan__arc" />
              <circle cx={x} cy={y} r="2" className="mc-node" />
            </g>
          );
        })}
      </svg>

      {/* Compass card: still, so north always reads as north. */}
      <svg className="mc-layer" viewBox="0 0 600 600" focusable="false">
        {cardinals.map((c) => (
          <text key={c.letter} x={c.x} y={c.y} className="mc-cardinal">
            {c.letter}
          </text>
        ))}
        {numerals.map((n) => (
          <text key={n.bearing} x={n.x} y={n.y} className="mc-numeral">
            {n.bearing}
          </text>
        ))}
      </svg>
    </div>
  );
}

/* Slow motes of light drifting upward: two tiled layers of dots (see
   .motes in globals.css), each sliding up by exactly one tile and looping.
   Two GPU-moved layers instead of a box per mote, so they cost next to
   nothing on any device. */
export function Motes({ className = "" }: { className?: string }) {
  return (
    <div className={`motes ${className}`} aria-hidden="true">
      <span className="motes__layer motes__layer--near" />
      <span className="motes__layer motes__layer--far" />
    </div>
  );
}
