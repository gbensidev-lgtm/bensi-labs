export type StackCategory = {
  title: string;
  items: string[];
};

export const stackCategories: StackCategory[] = [
  {
    title: "Desenvolvimento",
    items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"],
  },
  {
    title: "IA",
    items: ["LLMs", "Engenharia de prompt", "Cursor", "APIs de IA"],
  },
  {
    title: "Ferramentas",
    items: ["Git", "GitHub", "Cursor", "VS Code", "Supabase", "Vercel"],
  },
];
