/* The elemental circle around the compass: rings of light, rune ticks, and the
   guild's own taglines engraved along the ring. It turns very slowly.
   Built as two stacked SVG layers that each rotate whole, so the GPU moves
   them instead of the CPU redrawing the ring every frame. */
export function MagicCircle({ className = "" }: { className?: string }) {
  const ticks = Array.from({ length: 48 }, (_, i) => i * 7.5);
  return (
    <div className={`magic-circle ${className}`} aria-hidden="true">
      <svg className="mc-layer mc-outer" viewBox="0 0 600 600" focusable="false">
        <defs>
          <path id="mc-text" d="M300 300 m-252 0 a252 252 0 1 1 504 0 a252 252 0 1 1 -504 0" />
        </defs>
        <circle cx="300" cy="300" r="288" className="mc-ring mc-ring--soft" />
        <circle cx="300" cy="300" r="272" className="mc-ring" />
        {ticks.map((d) => (
          <line
            key={d}
            x1={300 + 272 * Math.cos((d * Math.PI) / 180)}
            y1={300 + 272 * Math.sin((d * Math.PI) / 180)}
            x2={300 + (d % 45 === 0 ? 290 : 280) * Math.cos((d * Math.PI) / 180)}
            y2={300 + (d % 45 === 0 ? 290 : 280) * Math.sin((d * Math.PI) / 180)}
            className={d % 45 === 0 ? "mc-tick mc-tick--major" : "mc-tick"}
          />
        ))}
        <text className="mc-text">
          <textPath href="#mc-text" startOffset="0">
            We seek those who seek ✦ Guided by curiosity, bound by purpose ✦ We begin with why, then we build ✦ Onward, fellow seeker ✦
          </textPath>
        </text>
        <circle cx="300" cy="300" r="232" className="mc-ring mc-ring--soft" />
      </svg>
      <svg className="mc-layer mc-inner" viewBox="0 0 600 600" focusable="false">
        <polygon points="300,96 476,402 124,402" className="mc-ring mc-ring--soft" />
        <polygon points="300,504 124,198 476,198" className="mc-ring mc-ring--soft" />
      </svg>
    </div>
  );
}

/* Slow motes of light drifting upward: deterministic positions, CSS motion. */
export function Motes({ count = 18, className = "" }: { count?: number; className?: string }) {
  const motes = Array.from({ length: count }, (_, i) => ({
    left: (i * 53) % 100,
    delay: (i * 1.7) % 12,
    duration: 10 + ((i * 7) % 9),
    size: 2 + (i % 3),
  }));
  return (
    <div className={`motes ${className}`} aria-hidden="true">
      {motes.map((m, i) => (
        <span
          key={i}
          style={{
            left: `${m.left}%`,
            width: m.size,
            height: m.size,
            animationDelay: `${m.delay}s`,
            animationDuration: `${m.duration}s`,
          }}
        />
      ))}
    </div>
  );
}
