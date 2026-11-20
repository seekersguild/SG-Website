import type { CSSProperties } from "react";

/* The guild's compass, drawn from the logo's own geometry (two S arcs, an
   inner ring with its two spurs, the four long points and the hub) in a
   low-poly style: flat facets in place of curves. It is the
   site's only illustration, reused at every scale so the whole site reads
   as one mark. All coordinates live in a 600 x 600 box centred on 300,300;
   angles are screen degrees (0 = east, clockwise). */

const C = 300;
const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)].map((n) => +n.toFixed(2)) as [number, number];
};
const pt = (r: number, deg: number) => polar(r, deg).join(" ");

/* Low-poly: every curve is a run of flat facets, every point a few flat-shaded
   triangles. Tones step through a small set of flat colours (classes f1..f4
   for gold, s1..s4 for the star), never a gradient. */

// A curved band between two radii, cut into straight-edged facets.
function band(r1: number, r2: number, from: number, to: number, step: number) {
  const span = (to - from + 360) % 360 || 360;
  const n = Math.max(1, Math.round(span / step));
  return Array.from({ length: n }, (_, i) => {
    const a = from + (span * i) / n;
    const b = from + (span * (i + 1)) / n;
    // Two triangles per segment, the diagonal alternating, as in low-poly art.
    return i % 2
      ? [`${pt(r2, a)} ${pt(r2, b)} ${pt(r1, a)}`, `${pt(r2, b)} ${pt(r1, b)} ${pt(r1, a)}`]
      : [`${pt(r2, a)} ${pt(r1, b)} ${pt(r1, a)}`, `${pt(r2, a)} ${pt(r2, b)} ${pt(r1, b)}`];
  }).flat();
}

// A regular polygon of n sides.
const ngon = (r: number, n: number, offset = 0) =>
  Array.from({ length: n }, (_, i) => pt(r, offset + (360 * i) / n)).join(" ");

// One compass point as four facets: each half split across its spine.
function point(r: number, deg: number, half: number) {
  const tip = pt(r, deg);
  const mid = pt(r * 0.42, deg);
  const left = pt(half, deg - 90);
  const right = pt(half, deg + 90);
  return [
    { cls: "s1", points: `${tip} ${right} ${mid}` },
    { cls: "s2", points: `${mid} ${right} ${C} ${C}` },
    { cls: "s3", points: `${tip} ${mid} ${left}` },
    { cls: "s4", points: `${mid} ${C} ${C} ${left}` },
  ];
}

// A straight bar of the given width between two points, as one facet.
function bar(from: [number, number], to: [number, number], width: number) {
  const [dx, dy] = [to[0] - from[0], to[1] - from[1]];
  const len = Math.hypot(dx, dy);
  const [nx, ny] = [(-dy / len) * (width / 2), (dx / len) * (width / 2)];
  const f = (x: number, y: number) => `${+x.toFixed(2)} ${+y.toFixed(2)}`;
  return `${f(from[0] + nx, from[1] + ny)} ${f(to[0] + nx, to[1] + ny)} ${f(to[0] - nx, to[1] - ny)} ${f(from[0] - nx, from[1] - ny)}`;
}

// A fixed, uneven run of tones so neighbouring facets never repeat in step.
const TONES = [1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3, 2];
// A plain SVG arc path, used for the masks that draw the bands in.
function arc(r: number, from: number, to: number) {
  const [x1, y1] = polar(r, from);
  const [x2, y2] = polar(r, to);
  const sweep = (to - from + 360) % 360 > 180 ? 1 : 0;
  return `M${x1} ${y1} A${r} ${r} 0 ${sweep} 1 ${x2} ${y2}`;
}

const tone = (i: number) => `f${TONES[i % TONES.length]}`;

const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
const cardinals = [270, 0, 90, 180].map((d) => point(272, d, 24));
const diagonals = [315, 45, 135, 225].map((d) => point(156, d, 15));
const arcs = [band(193, 219, 172, 328, 13), band(193, 219, 352, 148, 13)];
const ring = band(123, 133, 0, 360, 22.5);

export function Emblem({
  id = "em",
  className = "",
  needle = 0,
  showNeedle = true,
  style,
}: {
  /* Prefix for the mask ids; unique per compass on the page. */
  id?: string;
  className?: string;
  needle?: number;
  showNeedle?: boolean;
  style?: CSSProperties;
}) {
  return (
    <svg className={`emblem ${className}`} viewBox="0 0 600 600" aria-hidden="true" focusable="false" style={style}>
      <g className="em-ticks">
        <circle className="em-line" cx={C} cy={C} r={286} pathLength={1} />
        {ticks.map((d) => (
          <line
            key={d}
            className={d % 45 === 0 ? "em-tick em-tick--major" : "em-tick"}
            x1={polar(d % 45 === 0 ? 262 : 274, d)[0]}
            y1={polar(d % 45 === 0 ? 262 : 274, d)[1]}
            x2={polar(282, d)[0]}
            y2={polar(282, d)[1]}
          />
        ))}
      </g>

      {/* The faceted bands are revealed through masks whose strokes can be
          drawn on, so the S and the ring still draw themselves in. */}
      <defs>
        <mask id={`${id}-arcs`} maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
          <path className="em-draw" d={`M${pt(164, 176)} ${arc(206, 172, 328).replace(/^M/, "L")}`} pathLength={1} />
          <path className="em-draw" d={`M${pt(164, 356)} ${arc(206, 352, 148).replace(/^M/, "L")}`} pathLength={1} />
        </mask>
        <mask id={`${id}-ring`} maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
          <circle className="em-draw em-draw--ring" cx={C} cy={C} r={140} pathLength={1} />
        </mask>
      </defs>

      <g className="em-arcs" mask={`url(#${id}-arcs)`}>
        {arcs.flatMap((facets, k) =>
          facets.map((f, i) => <polygon key={`a${k}-${i}`} className={`em-facet ${tone(i + k)}`} points={f} />),
        )}
        {/* The S hooks: a faceted wedge turning in from each arc's end. */}
        <polygon className="em-facet f2" points={bar(polar(206, 172), polar(164, 176), 26)} />
        <polygon className="em-facet f4" points={bar(polar(206, 352), polar(164, 356), 26)} />
      </g>

      <g className="em-ring" mask={`url(#${id}-ring)`}>
        {ring.map((f, i) => (
          <polygon key={`r${i}`} className={`em-facet ${tone(i)}`} points={f} />
        ))}
        <polygon className="em-facet f1" points={`${pt(154, 315)} ${pt(133, 306)} ${pt(133, 324)}`} />
        <polygon className="em-facet f3" points={`${pt(154, 135)} ${pt(133, 126)} ${pt(133, 144)}`} />
      </g>

      <g className="em-star">
        {[...diagonals, ...cardinals].map((facets, k) => (
          <g key={`p${k}`} className={k < 4 ? "em-point em-point--minor" : "em-point"}>
            {facets.map((f) => (
              <polygon key={f.cls} className={f.cls} points={f.points} />
            ))}
          </g>
        ))}
        <polygon className="em-hub" points={ngon(30, 8, 22.5)} />
        <polygon className="em-hub__core" points={ngon(10, 8, 22.5)} />
      </g>

      {showNeedle ? (
        <g className="em-needle" style={{ "--needle": `${needle}deg` } as CSSProperties}>
          <polygon className="em-needle__n1" points={`${C} 78 ${C} ${C} ${C - 11} ${C}`} />
          <polygon className="em-needle__n2" points={`${C} 78 ${C + 11} ${C} ${C} ${C}`} />
          <polygon className="em-needle__s1" points={`${C} 522 ${C} ${C} ${C - 11} ${C}`} />
          <polygon className="em-needle__s2" points={`${C} 522 ${C + 11} ${C} ${C} ${C}`} />
          <polygon className="em-needle__hub" points={ngon(13, 8, 22.5)} />
        </g>
      ) : null}
    </svg>
  );
}
