import type { ReactNode } from "react";

/* The guild's ornament set, drawn once in SVG and reused:
   a filigree divider for headings, and gold corner flourishes for framed panels. */

export function Flourish({ className = "" }: { className?: string }) {
  return (
    <svg className={`flourish ${className}`} viewBox="0 0 240 24" aria-hidden="true" focusable="false">
      <path d="M0 12 H92" />
      <path d="M148 12 H240" />
      <path d="M92 12 C100 4 108 4 112 12 C108 20 100 20 92 12 Z" />
      <path d="M148 12 C140 4 132 4 128 12 C132 20 140 20 148 12 Z" />
      <path className="flourish__gem" d="M120 3 L127 12 L120 21 L113 12 Z" />
      <circle cx="84" cy="12" r="2" className="flourish__gem" />
      <circle cx="156" cy="12" r="2" className="flourish__gem" />
    </svg>
  );
}

/* The compass bezel's faceted sapphire, as a flat low-poly field. */
const facetTones = ["f-a", "f-b", "f-c", "f-d"];
const facets = (() => {
  const cols = 8;
  const rows = 6;
  const w = 600 / cols;
  const h = 600 / rows;
  // Corner points nudged so the facets read as cut, not gridded.
  const jitter = (x: number, y: number) => ((Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1) * 0.28;
  const pt = (c: number, r: number) => {
    const x = c * w + (c === 0 || c === cols ? 0 : jitter(c, r) * w);
    const y = r * h + (r === 0 || r === rows ? 0 : jitter(r + 3, c + 7) * h);
    return `${x.toFixed(1)} ${y.toFixed(1)}`;
  };
  const out: { d: string; tone: string }[] = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const a = pt(c, r), b = pt(c + 1, r), d = pt(c, r + 1), e = pt(c + 1, r + 1);
      const flip = (c + r) % 2 === 0;
      out.push({ d: flip ? `M${a} L${b} L${e} Z` : `M${a} L${b} L${d} Z`, tone: facetTones[(c * 3 + r * 5) % 4] });
      out.push({ d: flip ? `M${a} L${e} L${d} Z` : `M${b} L${e} L${d} Z`, tone: facetTones[(c * 7 + r * 2 + 1) % 4] });
    }
  }
  return out;
})();

export function Facets({ className = "" }: { className?: string }) {
  return (
    <svg className={`facets ${className}`} viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      {facets.map((f, i) => (
        <path key={i} d={f.d} className={f.tone} />
      ))}
    </svg>
  );
}


/* A year as a dial of twelve ticks; the gold ones mark how often a
   programme comes round (12 monthly, 4 quarterly, 2 twice a year, 1 yearly). */
export function YearDial({ times, className = "" }: { times: number; className?: string }) {
  const lit = new Set(Array.from({ length: times }, (_, i) => Math.round((i * 12) / times) % 12));
  return (
    <svg className={`dial ${className}`} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
      <circle cx="50" cy="50" r="47" className="dial__ring" />
      {Array.from({ length: 12 }, (_, i) => {
        const a = ((i * 30 - 90) * Math.PI) / 180;
        const on = lit.has(i);
        const r1 = on ? 31 : 36;
        return (
          <line
            key={i}
            x1={+(50 + r1 * Math.cos(a)).toFixed(2)}
            y1={+(50 + r1 * Math.sin(a)).toFixed(2)}
            x2={+(50 + 42 * Math.cos(a)).toFixed(2)}
            y2={+(50 + 42 * Math.sin(a)).toFixed(2)}
            className={on ? "dial__tick dial__tick--on" : "dial__tick"}
          />
        );
      })}
      <text x="50" y="51" className="dial__n" textAnchor="middle" dominantBaseline="central">
        {times}
      </text>
    </svg>
  );
}

function Corner() {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <path d="M2 46 V14 C2 7 7 2 14 2 H46" />
      <path d="M8 46 V18 C8 12 12 8 18 8 H46" className="corner__inner" />
      <path d="M14 14 L20 20" />
      <circle cx="14" cy="14" r="3" className="corner__gem" />
    </svg>
  );
}

/* A panel framed in gold, with a flourish at each corner. */
export function Ornate({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "li" | "blockquote" }) {
  return (
    <Tag className={`ornate ${className}`}>
      <span className="ornate__corner ornate__corner--tl">
        <Corner />
      </span>
      <span className="ornate__corner ornate__corner--tr">
        <Corner />
      </span>
      <span className="ornate__corner ornate__corner--bl">
        <Corner />
      </span>
      <span className="ornate__corner ornate__corner--br">
        <Corner />
      </span>
      {children}
    </Tag>
  );
}
