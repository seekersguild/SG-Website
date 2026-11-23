/* The two moving rings use pre-rendered textures of the authored vector art.
   The compass card stays live SVG so north never rotates. Rebuild the textures
   with node scripts/bake-compass-rings.cjs after changing the source artwork. */
const at = (r: number, deg: number) => {
  const a = (deg * Math.PI) / 180;
  return [+(300 + r * Math.cos(a)).toFixed(2), +(300 + r * Math.sin(a)).toFixed(2)];
};
const cardinals = [
  { deg: -90, letter: "N" },
  { deg: 0, letter: "E" },
  { deg: 90, letter: "S" },
  { deg: 180, letter: "W" },
].map(({ deg, letter }) => {
  const [x, y] = at(204, deg);
  return { letter, x, y };
});
const numerals = [30, 60, 120, 150, 210, 240, 300, 330].map((bearing) => {
  const [x, y] = at(204, bearing - 90);
  return { bearing, x, y };
});

function Ring({ kind }: { kind: "bezel" | "scan" }) {
  return (
    <span className={`mc-layer mc-${kind}`}>
      <img
        src={`/images/compass-${kind}-1200.webp`}
        srcSet={`/images/compass-${kind}-600.webp 600w, /images/compass-${kind}-1200.webp 1200w, /images/compass-${kind}-1800.webp 1800w`}
        sizes="(max-width: 860px) min(136vw, 780px), 640px"
        width={1800}
        height={1800}
        alt=""
        decoding="async"
        draggable={false}
      />
    </span>
  );
}

export function MagicCircle({ className = "" }: { className?: string }) {
  return (
    <div className={`magic-circle ${className}`} aria-hidden="true">
      <Ring kind="bezel" />
      <Ring kind="scan" />
      <span className="mc-layer">
        <svg viewBox="0 0 600 600" focusable="false">
          {cardinals.map((c) => (
            <text key={c.letter} x={c.x} y={c.y} className="mc-cardinal">{c.letter}</text>
          ))}
          {numerals.map((n) => (
            <text key={n.bearing} x={n.x} y={n.y} className="mc-numeral">{n.bearing}</text>
          ))}
        </svg>
      </span>
    </div>
  );
}

/* Static specks of light, drawn as two tiled textures. */
export function Motes({ className = "" }: { className?: string }) {
  return (
    <div className={`motes ${className}`} aria-hidden="true">
      <span className="motes__layer motes__layer--near" />
      <span className="motes__layer motes__layer--far" />
    </div>
  );
}
