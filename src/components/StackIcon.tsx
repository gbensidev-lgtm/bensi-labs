import {
  siCss,
  siCursor,
  siGit,
  siGithub,
  siHtml5,
  siJavascript,
  siNextdotjs,
  siReact,
  siSupabase,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";
import type { StackItem } from "@/data/stack";
import { cn } from "@/lib/utils";

const brandIcons: Partial<Record<StackItem["icon"], SimpleIcon>> = {
  html5: siHtml5,
  css: siCss,
  javascript: siJavascript,
  typescript: siTypescript,
  react: siReact,
  nextdotjs: siNextdotjs,
  tailwindcss: siTailwindcss,
  git: siGit,
  github: siGithub,
  supabase: siSupabase,
  vercel: siVercel,
  cursor: siCursor,
};

/** VS Code is not in current simple-icons; brand mark path. */
function VsCodeMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path
        fill="#007ACC"
        d="M23.15 2.587 18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.478V3.523a1.5 1.5 0 0 0-.85-.936zM10.5 15.402V8.598l5.987 3.402z"
      />
    </svg>
  );
}

function ConceptMark({
  kind,
  className,
}: {
  kind: "llms" | "ai-apis";
  className?: string;
}) {
  if (kind === "llms") {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
        <path
          d="M12 3.5c-2.4 0-4.5 1.7-5.1 4.1A4.2 4.2 0 0 0 4 11.7c0 2.3 1.8 4.2 4.1 4.3h7.8A4.1 4.1 0 0 0 20 11.9c0-2-1.4-3.7-3.3-4.1A5 5 0 0 0 12 3.5Z"
          stroke="#7C3AED"
          strokeWidth="1.6"
        />
        <path
          d="M9 16.5v1.2c0 1.5 1.3 2.8 3 2.8s3-1.3 3-2.8v-1.2"
          stroke="#7C3AED"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" fill="none">
      <path
        d="M4.5 8.5 12 4l7.5 4.5v7L12 20l-7.5-4.5v-7Z"
        stroke="#2563EB"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M12 12 4.8 7.8M12 12l7.2-4.2M12 12v8"
        stroke="#2563EB"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

type StackIconProps = {
  icon: StackItem["icon"];
  className?: string;
};

export function StackIcon({ icon, className }: StackIconProps) {
  if (icon === "vscode") {
    return <VsCodeMark className={cn("size-7", className)} />;
  }

  if (icon === "llms" || icon === "ai-apis") {
    return <ConceptMark kind={icon} className={cn("size-7", className)} />;
  }

  const brand = brandIcons[icon];
  if (!brand) return null;

  // Logos with black brand fills disappear on the dark site surface.
  const darkBrand = ["000000", "181717"].includes(brand.hex.toUpperCase());
  const fill = darkBrand ? "#EDEDED" : `#${brand.hex}`;

  return (
    <svg
      viewBox="0 0 24 24"
      className={cn("size-7", className)}
      aria-hidden="true"
      fill={fill}
    >
      <path d={brand.path} />
    </svg>
  );
}
