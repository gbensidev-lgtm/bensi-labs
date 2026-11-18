export type StackCategory = {
  title: string;
  items: string[];
};

export type StackItem = {
  label: string;
  icon:
    | "html5"
    | "css"
    | "javascript"
    | "typescript"
    | "react"
    | "nextdotjs"
    | "tailwindcss"
    | "git"
    | "github"
    | "vscode"
    | "supabase"
    | "vercel"
    | "cursor"
    | "llms"
    | "ai-apis";
};

export const stackCategories: StackCategory[] = [
  {
    title: "Desenvolvimento",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "IA",
    items: ["LLMs", "APIs de IA", "Cursor"],
  },
  {
    title: "Ferramentas",
    items: ["Git", "GitHub", "Cursor", "VS Code", "Supabase", "Vercel"],
  },
];

export const stackItems: StackItem[] = [
  { label: "HTML", icon: "html5" },
  { label: "CSS", icon: "css" },
  { label: "JavaScript", icon: "javascript" },
  { label: "TypeScript", icon: "typescript" },
  { label: "React", icon: "react" },
  { label: "Next.js", icon: "nextdotjs" },
  { label: "Tailwind CSS", icon: "tailwindcss" },
  { label: "LLMs", icon: "llms" },
  { label: "APIs de IA", icon: "ai-apis" },
  { label: "Cursor", icon: "cursor" },
  { label: "Git", icon: "git" },
  { label: "GitHub", icon: "github" },
  { label: "VS Code", icon: "vscode" },
  { label: "Supabase", icon: "supabase" },
  { label: "Vercel", icon: "vercel" },
];
