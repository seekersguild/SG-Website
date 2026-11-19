import type { CSSProperties } from "react";

/* The guild's compass, drawn from the logo's own geometry: two S arcs, an
   inner ring with its two spurs, the four long points and the hub. It is the
   site's only illustration, reused at every scale so the whole site reads
   as one mark. All coordinates live in a 600 x 600 box centred on 300,300;
   angles are screen degrees (0 = east, clockwise). */

const C = 300;
const polar = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [C + r * Math.cos(a), C + r * Math.sin(a)].map((n) => +n.toFixed(2)) as [number, number];
};
const pt = (r: number, deg: number) => polar(r, deg).join(" ");

function arc(r: number, from: number, to: number) {
  const [x1, y1] = polar(r, from);
  const [x2, y2] = polar(r, to);
  const sweep = (to - from + 360) % 360 > 180 ? 1 : 0;
  return `M${x1} ${y1} A${r} ${r} 0 ${sweep} 1 ${x2} ${y2}`;
}

function point(r: number, deg: number, half: number) {
  return {
    light: `${pt(r, deg)} ${pt(half, deg + 90)} ${C} ${C}`,
    dark: `${pt(r, deg)} ${C} ${C} ${pt(half, deg - 90)}`,
  };
}

const ticks = Array.from({ length: 72 }, (_, i) => i * 5);
const cardinals = [270, 0, 90, 180].map((d) => point(272, d, 24));
const diagonals = [315, 45, 135, 225].map((d) => point(156, d, 15));

export function Emblem({
  className = "",
  needle = 0,
  showNeedle = true,
  style,
}: {
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

      <g className="em-arcs">
        <path className="em-arc" d={arc(206, 172, 328)} pathLength={1} />
        <path className="em-arc" d={arc(206, 352, 148)} pathLength={1} />
        <path className="em-hook" d={`M${pt(206, 172)} L${pt(164, 176)}`} />
        <path className="em-hook" d={`M${pt(206, 352)} L${pt(164, 356)}`} />
      </g>

      <g className="em-ring">
        <circle className="em-ring__line" cx={C} cy={C} r={128} pathLength={1} />
        <polygon className="em-spur" points={`${pt(152, 315)} ${pt(128, 307)} ${pt(128, 323)}`} />
        <polygon className="em-spur" points={`${pt(152, 135)} ${pt(128, 127)} ${pt(128, 143)}`} />
      </g>

      <g className="em-star">
        {diagonals.map((p, i) => (
          <g key={`d${i}`}>
            <polygon className="em-star__dim" points={p.light} />
            <polygon className="em-star__dimmer" points={p.dark} />
          </g>
        ))}
        {cardinals.map((p, i) => (
          <g key={`c${i}`}>
            <polygon className="em-star__light" points={p.light} />
            <polygon className="em-star__dark" points={p.dark} />
          </g>
        ))}
        <circle className="em-hub" cx={C} cy={C} r={30} />
        <circle className="em-hub__core" cx={C} cy={C} r={10} />
      </g>

      {showNeedle ? (
        <g className="em-needle" style={{ "--needle": `${needle}deg` } as CSSProperties}>
          <polygon className="em-needle__north" points={`${C} 78 ${C + 11} ${C} ${C - 11} ${C}`} />
          <polygon className="em-needle__south" points={`${C} 522 ${C + 11} ${C} ${C - 11} ${C}`} />
          <circle className="em-needle__hub" cx={C} cy={C} r={13} />
        </g>
      ) : null}
    </svg>
  );
}
