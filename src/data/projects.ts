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
      "Central de indicadores comerciais desenvolvida para transformar dados operacionais em uma visão clara da operação e apoiar decisões mais rápidas.",
    category: "DATA · DASHBOARD · AUTOMATION",
    tags: ["DATA", "DASHBOARD", "AUTOMATION"],
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
