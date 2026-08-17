export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Descoberta",
    description:
      "Entendemos o negócio, o problema, o público e o objetivo do projeto.",
  },
  {
    number: "02",
    title: "Estratégia",
    description:
      "Definimos estrutura, experiência, funcionalidades e prioridades.",
  },
  {
    number: "03",
    title: "Desenvolvimento",
    description:
      "Construímos a solução utilizando as tecnologias mais adequadas ao projeto.",
  },
  {
    number: "04",
    title: "Validação",
    description:
      "Testamos, ajustamos e refinamos a experiência antes da publicação.",
  },
  {
    number: "05",
    title: "Publicação",
    description:
      "Colocamos o projeto no ar e deixamos a solução preparada para evoluir.",
  },
];
