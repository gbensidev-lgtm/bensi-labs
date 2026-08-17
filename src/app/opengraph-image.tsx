import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Bensi Labs — Sites, Aplicações, IA e Automação";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#0F1115",
          color: "#EDEDED",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: 28,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "#2563EB",
          }}
        >
          Bensi Labs
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "24px", maxWidth: 980 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Transformamos ideias em produtos digitais.
          </div>
          <div style={{ fontSize: 26, lineHeight: 1.5, color: "#9CA3AF" }}>
            Sites, landing pages, aplicações e soluções com IA e automação.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 20,
            color: "#9CA3AF",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span>AI Product Studio</span>
          <span>bensilabs.dev</span>
        </div>
      </div>
    ),
    size,
  );
}
