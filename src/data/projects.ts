export type ProjectStatus = "live" | "building" | "experiment";

export type ProjectPreview = "image" | "dashboard";

export type Project = {
  title: string;
  slug: string;
  description: string;
  category: string;
  tags: string[];
  technologies: string[];
  image?: string;
  preview?: ProjectPreview;
  status: ProjectStatus;
  url?: string;
  featured: boolean;
};

export const projects: Project[] = [
  {
    title: "Dashboard Comercial",
    slug: "dashboard-comercial",
    description:
      "Central de dados e indicadores para transformar planilhas e informações operacionais em decisões.",
    category: "Produto de dados",
    tags: ["DATA", "DASHBOARD", "ANALYTICS"],
    technologies: ["React", "TypeScript", "Data Visualization"],
    preview: "dashboard",
    status: "building",
    url: "#contact",
    featured: true,
  },
  {
    title: "Raquel Frizo",
    slug: "raquel-frizo",
    description:
      "Presença digital para estética facial — serviços, prova social e conversão direta via WhatsApp e Instagram.",
    category: "Produto digital",
    tags: ["SITE", "PRODUCT", "CONVERSION"],
    technologies: ["Next.js", "React", "Tailwind CSS"],
    image: "/projects/raquel-frizo.webp",
    preview: "image",
    status: "live",
    url: "https://www.raquelfrizo.com.br",
    featured: true,
  },
  {
    title: "Sello Docs",
    slug: "sello-docs",
    description:
      "Site institucional para consultoria em patrimônio cultural — acervos, serviços e atuação junto a museus e arquivos.",
    category: "Produto digital",
    tags: ["SITE", "INSTITUTIONAL", "CULTURE"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/projects/sello-docs.webp",
    preview: "image",
    status: "live",
    url: "https://sellodocs.com.br",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
