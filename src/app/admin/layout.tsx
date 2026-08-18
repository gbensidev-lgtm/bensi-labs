import type { Metadata } from "next";
import "./studio.css";

export const metadata: Metadata = {
  title: {
    default: "Bensi Labs Studio",
    template: "%s — Bensi Labs Studio",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-dvh bg-background">
      <div
        aria-hidden="true"
        dangerouslySetInnerHTML={{
          __html: `<!--
THESIS: Studio is an internal instrument, not a second marketing site — a dark workshop for operating the lab, refusing SaaS chrome and public-site storytelling.
OWN-WORLD: Near-black field, graphite rails, 1px technical lines, Electric Blue only on the live control. Space Grotesk + JetBrains Mono from the brand kit.
STORY: The founder signs in, sees the work, makes a Project Case, exports a post.
FIRST VIEWPORT: Login is a centered mark and two fields on near-black. Dashboard is a left rail, three counts, recent projects, and actions.
FORM: Operate / established Bensi Labs world / code-led / inherit-bensi-labs
FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
-->`,
        }}
      />
      {children}
    </div>
  );
}
