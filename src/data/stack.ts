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
    items: ["LLMs", "APIs de IA", "Cursor"],
  },
  {
    title: "Ferramentas",
    items: ["Git", "GitHub", "Cursor", "VS Code", "Supabase", "Vercel"],
  },
];
