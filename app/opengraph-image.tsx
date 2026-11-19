import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* The link preview shown when the site is shared on Facebook, Messenger,
   LinkedIn and X: the guild's mark and motto on the dark painting. */
export const alt = "Seekers Guild: we seek those who seek";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const dir = join(process.cwd(), "app", "_og");
  const [cinzel, bg, logo] = await Promise.all([
    readFile(join(dir, "Cinzel-Regular.ttf")),
    readFile(join(dir, "painting.jpg")),
    readFile(join(dir, "logo.png")),
  ]);
  const bgSrc = `data:image/jpeg;base64,${bg.toString("base64")}`;
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", fontFamily: "Cinzel" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={bgSrc} width={1200} height={630} alt="" style={{ position: "absolute", inset: 0 }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(2,13,36,0.8)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 80px", gap: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={logoSrc} width={64} height={64} alt="" />
            <span style={{ fontSize: 30, color: "#fdfefe", letterSpacing: 2 }}>SEEKERS GUILD</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1.05, color: "#ffcd03", letterSpacing: 3 }}>
            <span>WE SEEK THOSE</span>
            <span>WHO SEEK</span>
          </div>
          <span style={{ fontSize: 28, color: "rgba(253,254,254,0.9)" }}>A student-led community in the Philippines</span>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Cinzel", data: cinzel, weight: 400, style: "normal" }] },
  );
}
