export const CREATIVE_WIDTH = 1080;
export const CREATIVE_HEIGHT = 1350;

export type ProjectCaseData = {
  caseNumber: string;
  projectName: string;
  categoryLabel: string;
  title: string;
  description: string;
  cta: string;
  screenshotUrl: string | null;
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

const grid: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage:
    "linear-gradient(rgba(42,47,56,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(42,47,56,0.35) 1px, transparent 1px)",
  backgroundSize: "54px 54px",
  maskImage: "radial-gradient(circle at 50% 30%, black 20%, transparent 78%)",
  pointerEvents: "none",
};

function Corner({ style }: { style: React.CSSProperties }) {
  return (
    <span
      style={{
        position: "absolute",
        width: 18,
        height: 18,
        borderColor: "#2563EB",
        ...style,
      }}
    />
  );
}

export function ProjectCaseTemplate({ data }: { data: ProjectCaseData }) {
  const copy = data.title || data.description;
  const supporting = data.title && data.description ? data.description : "";

  return (
    <article style={canvas}>
      <div style={grid} />
      <div
        style={{
          position: "absolute",
          top: -120,
          right: -80,
          width: 420,
          height: 420,
          background: "radial-gradient(circle, rgba(37,99,235,0.18), transparent 68%)",
          pointerEvents: "none",
        }}
      />

      <header style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
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
        </div>
      </header>

      <p
        style={{
          position: "relative",
          margin: "48px 0 0",
          fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
          fontSize: 16,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "#2563EB",
        }}
      >
        Project / {data.caseNumber}
      </p>

      <h1
        style={{
          position: "relative",
          margin: "18px 0 0",
          fontSize: data.projectName.length > 18 ? 56 : 68,
          lineHeight: 0.95,
          letterSpacing: "-0.03em",
          fontWeight: 700,
        }}
      >
        {data.projectName}
      </h1>

      <p
        style={{
          position: "relative",
          margin: "20px 0 0",
          fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
          fontSize: 16,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          color: "#9CA3AF",
        }}
      >
        {data.categoryLabel}
      </p>

      <div
        style={{
          position: "relative",
          marginTop: 36,
          flex: 1,
          minHeight: 420,
          border: "1px solid #2A2F38",
          background: "#1C1F26",
          overflow: "hidden",
        }}
      >
        <Corner style={{ top: 10, left: 10, borderTop: "2px solid #2563EB", borderLeft: "2px solid #2563EB" }} />
        <Corner style={{ top: 10, right: 10, borderTop: "2px solid #2563EB", borderRight: "2px solid #2563EB" }} />
        <Corner style={{ bottom: 10, left: 10, borderBottom: "2px solid #2563EB", borderLeft: "2px solid #2563EB" }} />
        <Corner style={{ bottom: 10, right: 10, borderBottom: "2px solid #2563EB", borderRight: "2px solid #2563EB" }} />
        {data.screenshotUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={data.screenshotUrl}
            alt=""
            crossOrigin="anonymous"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "top center",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#9CA3AF",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              fontFamily: "var(--font-jetbrains-mono), 'JetBrains Mono', monospace",
              fontSize: 14,
            }}
          >
            Screenshot
          </div>
        )}
      </div>

      <p
        style={{
          position: "relative",
          margin: "32px 0 0",
          fontSize: 24,
          lineHeight: 1.35,
          maxWidth: 860,
          color: "#EDEDED",
        }}
      >
        {copy || " "}
      </p>
      {supporting ? (
        <p style={{ position: "relative", margin: "10px 0 0", fontSize: 18, lineHeight: 1.45, color: "#9CA3AF" }}>
          {supporting}
        </p>
      ) : null}

      <footer
        style={{
          position: "relative",
          marginTop: "auto",
          paddingTop: 28,
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
          {data.cta} →
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
    </article>
  );
}
