import works from "../content/monet.json";

export type ArtworkKey = keyof typeof works;

export function ArtworkImage({ artwork, className = "paint__img", priority = false, tone }: { artwork: ArtworkKey; className?: string; priority?: boolean; tone?: "royal" }) {
  const work = works[artwork];
  const source = (width: number, fallback: string) => tone ? `/images/monet/${work.id}-${tone}-${width}.webp` : fallback;
  // Cover sizing is driven by height too: a tall section can need more pixels
  // than its viewport width suggests. Never stretch the image's aspect ratio.
  const sizes = `max(100vw, ${Math.ceil(100 * work.width / work.height)}svh)`;
  return <img className={className} src={source(843, work.medium)} srcSet={`${source(640, work.small)} 640w, ${source(843, work.medium)} 843w, ${source(1686, work.large)} 1686w, ${source(3000, work.full)} ${work.fullWidth}w`} sizes={sizes} alt="" width={work.width} height={work.height} loading={priority ? "eager" : "lazy"} fetchPriority={priority ? "high" : "low"} decoding="async" />;
}

/* Explicit assignments make repeated artwork visible in review and testable.
   Local WebP assets need no live museum service, filters or scroll animation. */
export function Paint({ which, artwork, priority = false }: { which: "dark" | "dark-water" | "light"; artwork: ArtworkKey; priority?: boolean }) {
  return <span className={`paint paint--${which} paint--artwork`} data-artwork={artwork} data-artwork-id={works[artwork].id} aria-hidden="true"><ArtworkImage artwork={artwork} priority={priority} /></span>;
}
