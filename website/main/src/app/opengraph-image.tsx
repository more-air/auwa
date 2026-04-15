import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AUWA | Everything has kokoro";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0d0f1a",
        }}
      >
        <div
          style={{
            fontSize: 72,
            letterSpacing: "0.25em",
            color: "#ffffff",
            fontFamily: "serif",
          }}
        >
          AUWA
        </div>
        <div
          style={{
            fontSize: 20,
            color: "rgba(255,255,255,0.5)",
            marginTop: 24,
            letterSpacing: "0.06em",
          }}
        >
          Japanese philosophical awareness applied to modern life
        </div>
      </div>
    ),
    { ...size }
  );
}
