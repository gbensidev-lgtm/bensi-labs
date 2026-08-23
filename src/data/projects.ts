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
    title: "Central de Dashboards",
    slug: "central-dashboards",
    description:
      "Planilhas e relatórios de Power BI viram uma central de dashboards — um único lugar para a empresa acompanhar indicadores, com acesso para todo o time.",
    category: "DATA · DASHBOARD · ACCESS",
    tags: ["DATA", "DASHBOARD", "ACCESS"],
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
      "Presença digital para estética facial — desenvolvida para apresentar serviços, fortalecer a marca e direcionar clientes para WhatsApp e Instagram.",
    category: "WEBSITE · BRAND · DIGITAL EXPERIENCE",
    tags: ["WEBSITE", "BRAND", "DIGITAL EXPERIENCE"],
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
      "Site institucional para consultoria em patrimônio cultural — desenvolvido para apresentar serviços, atuação junto a museus e arquivos, e experiência de forma clara.",
    category: "WEBSITE · INSTITUTIONAL · DIGITAL PRESENCE",
    tags: ["WEBSITE", "INSTITUTIONAL", "DIGITAL PRESENCE"],
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    image: "/projects/sello-docs.webp",
    preview: "image",
    status: "live",
    url: "https://sellodocs.com.br",
    featured: true,
  },
];

export const featuredProjects = projects.filter((project) => project.featured);
