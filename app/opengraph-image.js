import { ImageResponse } from "next/og";

import { profile } from "@/data/portfolio";

export const alt = "Dev Parmar — UI/UX Designer & Frontend Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time, so there is no binary OG asset to keep in sync
 * with the content. Satori (behind ImageResponse) needs explicit flex
 * layout on every container — plain block layout is not supported.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0c0c0e",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              width: "14px",
              height: "14px",
              borderRadius: "999px",
              backgroundColor: "#ededed",
            }}
          />
          <div
            style={{
              display: "flex",
              fontSize: "24px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#a1a1aa",
            }}
          >
            Portfolio
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              fontSize: "104px",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "#ededed",
            }}
          >
            {profile.name}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: "40px",
              color: "#a1a1aa",
            }}
          >
            {profile.headline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            borderTop: "1px solid #222225",
            paddingTop: "32px",
            fontSize: "26px",
            color: "#71717a",
          }}
        >
          User Research · Wireframing · Prototyping · Frontend
        </div>
      </div>
    ),
    size,
  );
}
