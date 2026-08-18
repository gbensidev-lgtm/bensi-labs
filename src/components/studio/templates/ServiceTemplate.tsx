import { CREATIVE_HEIGHT, CREATIVE_WIDTH } from "@/components/studio/templates/ProjectCaseTemplate";

export type ServiceData = {
  headline: string;
  description: string;
  categoryLabel: string;
  cta: string;
  siteUrl: string;
};

const canvas: React.CSSProperties = {
  width: CREATIVE_WIDTH,
  height: CREATIVE_HEIGHT,
  background: "#0F1115",
  color: "#EDEDED",
  position: "relative",
  overflow: "hidden",
  fontFamily: "var(--font-space-grotesk), 'Space Grotesk', sans-serif",
  display: "flex",
  flexDirection: "column",
  padding: "72px 68px 56px",
  boxSizing: "border-box",
};

export function ServiceTemplate({ data }: { data: ServiceData }) {
  const lines = data.headline
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <article style={canvas}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(42,47,56,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(42,47,56,0.35) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
          maskImage: "radial-gradient(circle at 18% 70%, black 12%, transparent 72%)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: -80,
          bottom: -40,
          width: 520,
          height: 520,
          background: "radial-gradient(circle, rgba(124,58,237,0.16), transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <header style={{ position: "relative", display: "flex", alignItems: "center", gap: 16 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/brand/logo-icon.webp"
          alt=""
          width={48}
          height={48}
          style={{ width: 48, height: 48 }}
          crossOrigin="anonymous"
        />
        <p
          style={{
            margin: 0,
            fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
            fontSize: 18,
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "#EDEDED",
          }}
        >
          Bensi Labs
        </p>
      </header>

      <p
        style={{
          position: "relative",
          margin: "64px 0 0",
          fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
          fontSize: 16,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#2563EB",
        }}
      >
        Services
      </p>

      <h1
        style={{
          position: "relative",
          margin: "28px 0 0",
          fontSize: lines.join(" ").length > 22 ? 72 : 88,
          lineHeight: 0.92,
          letterSpacing: "-0.035em",
          fontWeight: 700,
          whiteSpace: "pre-line",
        }}
      >
        {lines.length > 0 ? lines.join("\n") : "Landing\npages"}
      </h1>

      <p
        style={{
          position: "relative",
          margin: "40px 0 0",
          maxWidth: 720,
          fontSize: 28,
          lineHeight: 1.35,
          color: "#9CA3AF",
        }}
      >
        {data.description}
      </p>

      <div style={{ position: "relative", marginTop: "auto" }}>
        <div style={{ height: 1, width: 96, background: "linear-gradient(90deg, #2563EB, #7C3AED)" }} />
        <p
          style={{
            margin: "28px 0 0",
            fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
            fontSize: 16,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#EDEDED",
          }}
        >
          {data.categoryLabel}
        </p>
        <footer
          style={{
            marginTop: 40,
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            gap: 24,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 20,
              fontWeight: 600,
              color: "#2563EB",
              letterSpacing: "0.04em",
            }}
          >
            {data.cta ? `${data.cta} →` : " "}
          </p>
          <p
            style={{
              margin: 0,
              fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
              fontSize: 14,
              letterSpacing: "0.12em",
              color: "#9CA3AF",
            }}
          >
            {data.siteUrl}
          </p>
        </footer>
      </div>
    </article>
  );
}
