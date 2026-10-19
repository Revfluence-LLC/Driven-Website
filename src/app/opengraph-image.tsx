import { ImageResponse } from "next/og";

export const alt = "Speedometer app and free online GPS speedometer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 90px",
          background: "radial-gradient(ellipse at 70% 50%, #0b2a33 0%, #0A0E14 65%)",
          color: "#DFE2EB",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 620 }}>
          <div style={{ fontSize: 26, letterSpacing: 8, color: "#00E5FF", fontWeight: 700 }}>DRIVEN</div>
          <div style={{ fontSize: 72, fontWeight: 800, color: "#fff", lineHeight: 1.05, marginTop: 24 }}>
            Track your speed with precision
          </div>
          <div style={{ fontSize: 30, color: "#BAC9CC", marginTop: 24 }}>
            Free online speedometer · iPhone app with HUD, alerts &amp; trips
          </div>
        </div>
        <div
          style={{
            width: 340,
            height: 340,
            borderRadius: 340,
            border: "14px solid #00E5FF",
            borderBottomColor: "#31353C",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 80px rgba(0,229,255,0.35)",
          }}
        >
          <div style={{ fontSize: 140, fontWeight: 800, color: "#fff", lineHeight: 1 }}>72</div>
          <div style={{ fontSize: 28, letterSpacing: 8, color: "#00E5FF" }}>MPH</div>
        </div>
      </div>
    ),
    size
  );
}
