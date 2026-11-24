import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* The link preview shown when the site is shared on Facebook, Messenger,
   LinkedIn and X. It matches the site: the night painting with the motto in
   bold Cinzel gold on the left, and on the right the hero's compass on the
   faceted sapphire field used in Who we are and How to join.

   The assets in app/_og are made from the site's own files (the generator
   cannot read WOFF2 or WebP): the fonts are static cuts of the site's variable
   Cinzel and Montserrat, night.jpg is the hero painting with its dark wash
   baked in, and compass.png is the hero compass captured on transparency. */
export const alt = "Seekers Guild: we seek those who seek. A student-led community in the Philippines.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const W = 1200;
const H = 630;
const FIELD = 470; // width of the sapphire field at its widest
const SLANT = 90; // how far the field's left edge leans

/* The bezel's faceted sapphire, drawn as one SVG and cut on a slant. */
function facetField() {
  const cols = 7;
  const rows = 7;
  const w = FIELD / cols;
  const h = H / rows;
  const jitter = (x: number, y: number) => ((Math.abs(Math.sin(x * 12.9898 + y * 78.233)) * 43758.5453) % 1) * 0.28;
  const pt = (c: number, r: number) => {
    const x = c * w + (c === 0 || c === cols ? 0 : jitter(c, r) * w);
    const y = r * h + (r === 0 || r === rows ? 0 : jitter(r + 3, c + 7) * h);
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  };
  const tones = ["#062f6c", "#053576", "#073c85", "#04295e"];
  let paths = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const a = pt(c, r), b = pt(c + 1, r), d = pt(c, r + 1), e = pt(c + 1, r + 1);
      const flip = (c + r) % 2 === 0;
      const t1 = flip ? `${a} ${b} ${e}` : `${a} ${b} ${d}`;
      const t2 = flip ? `${a} ${e} ${d}` : `${b} ${e} ${d}`;
      const f1 = tones[(c * 3 + r * 5) % 4];
      const f2 = tones[(c * 7 + r * 2 + 1) % 4];
      paths += `<polygon points="${t1}" fill="${f1}" stroke="${f1}" stroke-width="0.6"/><polygon points="${t2}" fill="${f2}" stroke="${f2}" stroke-width="0.6"/>`;
    }
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${FIELD}" height="${H}" viewBox="0 0 ${FIELD} ${H}"><defs><clipPath id="c"><polygon points="${SLANT},0 ${FIELD},0 ${FIELD},${H} 0,${H}"/></clipPath></defs><g clip-path="url(#c)"><rect width="${FIELD}" height="${H}" fill="#053576"/>${paths}</g></svg>`;
  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export default async function OpengraphImage() {
  const dir = join(process.cwd(), "app", "_og");
  const [cinzel, montserrat, night, compass, logo] = await Promise.all([
    readFile(join(dir, "Cinzel-Bold.ttf")),
    readFile(join(dir, "Montserrat-Medium.ttf")),
    readFile(join(dir, "night.jpg")),
    readFile(join(dir, "compass.png")),
    readFile(join(dir, "logo.png")),
  ]);
  const src = (data: Buffer, type: string) => `data:${type};base64,${data.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: W, height: H, display: "flex", position: "relative", background: "#020d24" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src(night, "image/jpeg")} width={W} height={H} alt="" style={{ position: "absolute", left: 0, top: 0 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={facetField()} width={FIELD} height={H} alt="" style={{ position: "absolute", right: 0, top: 0 }} />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src(compass, "image/png")}
          width={400}
          height={400}
          alt=""
          style={{ position: "absolute", right: FIELD / 2 - 200 - SLANT / 4 + 14, top: (H - 400) / 2 }}
        />

        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: W - FIELD,
            height: H,
            padding: "0 24px 0 80px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={src(logo, "image/png")} width={52} height={52} alt="" />
            <span style={{ fontFamily: "Cinzel", fontSize: 26, color: "#fdfefe", letterSpacing: 1 }}>Seekers Guild</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 40,
              fontFamily: "Cinzel",
              fontSize: 64,
              lineHeight: 1.04,
              color: "#ffcd03",
              letterSpacing: 1,
            }}
          >
            <span>WE SEEK THOSE</span>
            <span>WHO SEEK</span>
          </div>
          <div style={{ display: "flex", width: 112, height: 2, marginTop: 34, background: "#ffcd03" }} />
          <span style={{ marginTop: 28, fontFamily: "Montserrat", fontSize: 26, lineHeight: 1.45, color: "rgba(253,254,254,0.92)" }}>
            A student-led community in the Philippines for curious and driven minds.
          </span>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cinzel", data: cinzel, weight: 700, style: "normal" },
        { name: "Montserrat", data: montserrat, weight: 500, style: "normal" },
      ],
    },
  );
}
