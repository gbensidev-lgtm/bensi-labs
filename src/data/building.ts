import type { ProjectStatus } from "./projects";

export type BuildingItem = {
  title: string;
  description: string;
  status: ProjectStatus;
  technology: string;
};

export const buildingItems: BuildingItem[] = [
  {
    title: "Dashboards e análise de dados",
    description:
      "Trabalhando em dashboards e análises de dados para empresas — visualização de métricas, leitura de informação e apoio à decisão no dia a dia.",
    status: "building",
    technology: "React · TypeScript · Data Visualization",
  },
];
