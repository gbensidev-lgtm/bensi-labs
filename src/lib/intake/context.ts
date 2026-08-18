import {
  APP_DATA_ORIGINS,
  APP_DATA_TYPES,
  APP_USERS,
  BUDGET_RANGES,
  LANDING_INTEGRATIONS,
  LANDING_OBJECTIVES,
  MATERIAL_TYPES,
  optionLabel,
  optionLabels,
  SOCIAL_PROOF,
  SOURCE_OPTIONS,
  TRAFFIC_SOURCES,
  WEBSITE_FEATURES,
  WEBSITE_OBJECTIVES,
  WEBSITE_PAGES,
} from "@/lib/intake/options";
import {
  FEATURE_PRIORITY_LABELS,
  PERMISSION_ACTION_LABELS,
  PROJECT_TYPE_LABELS,
  type BriefingStatus,
  type IntakeAnswers,
  type ProjectType,
} from "@/lib/intake/types";
import type { Client, ProjectDocumentInput } from "@/lib/studio/types";

function line(value: string | undefined) {
  const text = value?.trim();
  return text ? text : "PENDING";
}

function list(values: string[]) {
  return values.length ? values.map((value) => `- ${value}`).join("\n") : "NOT DEFINED";
}

function joinOther(values: string[], other: string) {
  const extra = other.trim();
  return extra && !values.includes(extra) ? [...values, extra] : values;
}

function featuresBlock(answers: IntakeAnswers) {
  const items = answers.application.features.filter((item) => item.name.trim() || item.description.trim());
  if (!items.length) return "NOT DEFINED";
  return items
    .map((item) => {
      const name = item.name.trim() || "PENDING";
      const description = item.description.trim() || "PENDING";
      const owner = item.owner.trim() || "PENDING";
      return `### ${name}\n\n- Descrição: ${description}\n- Usuário responsável: ${owner}\n- Prioridade: ${FEATURE_PRIORITY_LABELS[item.priority]}`;
    })
    .join("\n\n");
}

function permissionsBlock(answers: IntakeAnswers) {
  const roles = Object.entries(answers.application.permissions).filter(([, actions]) => actions.length);
  if (!roles.length) return "NOT DEFINED";
  return roles
    .map(([role, actions]) => {
      const label = optionLabel(APP_USERS, role);
      const actionLabels = actions.map((action) => PERMISSION_ACTION_LABELS[action]).join(", ");
      return `- ${label}: ${actionLabels || "PENDING"}`;
    })
    .join("\n");
}

function referencesBlock(answers: IntakeAnswers) {
  const likes = answers.references.likes.filter((item) => item.url.trim() || item.why.trim());
  const likeText = likes.length
    ? likes
        .map((item) => `- ${item.url.trim() || "PENDING"}${item.why.trim() ? ` — ${item.why.trim()}` : ""}`)
        .join("\n")
    : "NOT DEFINED";

  const dislike = answers.references.dislikeUrl.trim() || answers.references.dislikeWhy.trim()
    ? `- ${answers.references.dislikeUrl.trim() || "PENDING"}${
        answers.references.dislikeWhy.trim() ? ` — ${answers.references.dislikeWhy.trim()}` : ""
      }`
    : "NOT DEFINED";

  return `## Referências que gosta\n\n${likeText}\n\n## Referências que não gosta\n\n${dislike}`;
}

function materialsBlock(answers: IntakeAnswers) {
  if (!answers.materials.length) return "NOT DEFINED";
  return answers.materials
    .map((item) => {
      const label = optionLabel(MATERIAL_TYPES, item.type) || item.name || item.type;
      return `- ${label} · status: ${item.status}`;
    })
    .join("\n");
}

function specificRequirements(type: ProjectType, answers: IntakeAnswers) {
  if (type === "website") {
    const objectives = joinOther(
      optionLabels(WEBSITE_OBJECTIVES, answers.website.objectives),
      answers.website.objectiveOther,
    );
    const pages = joinOther(optionLabels(WEBSITE_PAGES, answers.website.pages), answers.website.pagesOther);
    const features = joinOther(
      optionLabels(WEBSITE_FEATURES, answers.website.features),
      answers.website.featuresOther,
    );
    return [
      "## Site",
      "",
      "### Objetivo",
      "",
      list(objectives),
      "",
      "### Páginas",
      "",
      list(pages),
      "",
      "### Funcionalidades",
      "",
      list(features),
    ].join("\n");
  }

  if (type === "landing") {
    const traffic = joinOther(
      optionLabels(TRAFFIC_SOURCES, answers.landing.trafficSources),
      answers.landing.trafficOther,
    );
    const objectives = joinOther(
      optionLabels(LANDING_OBJECTIVES, answers.landing.objectives),
      answers.landing.objectiveOther,
    );
    const integrations = joinOther(
      optionLabels(LANDING_INTEGRATIONS, answers.landing.integrations),
      answers.landing.integrationsOther,
    );
    return [
      "## Landing Page",
      "",
      `### Oferta\n\n${line(answers.landing.offer)}`,
      "",
      `### Produto / serviço\n\n${line(answers.landing.product)}`,
      "",
      `### Benefício principal\n\n${line(answers.landing.mainBenefit)}`,
      "",
      `### Público\n\n${line(answers.landing.audience)}`,
      "",
      `### CTA\n\n${line(answers.landing.cta)}`,
      "",
      `### Origem do tráfego\n\n${list(traffic)}`,
      "",
      `### Objetivo\n\n${list(objectives)}`,
      "",
      `### Integrações\n\n${list(integrations)}`,
    ].join("\n");
  }

  if (type === "application") {
    const users = joinOther(optionLabels(APP_USERS, answers.application.users), answers.application.usersOther);
    const dataTypes = joinOther(
      optionLabels(APP_DATA_TYPES, answers.application.dataTypes),
      answers.application.dataOther,
    );
    const origins = joinOther(
      optionLabels(APP_DATA_ORIGINS, answers.application.dataOrigins),
      answers.application.dataOriginsOther,
    );
    return [
      "## Aplicação / Sistema",
      "",
      `### Processo a sistematizar\n\n${line(answers.application.processToSystemize)}`,
      "",
      `### Processo atual\n\n${line(answers.application.currentProcess)}`,
      "",
      `### Usuários\n\n${list(users)}`,
      "",
      `### Funcionalidades\n\n${featuresBlock(answers)}`,
      "",
      `### Dados\n\n${list(dataTypes)}`,
      "",
      `### Origem dos dados\n\n${list(origins)}`,
      "",
      `### Integrações\n\n${line(answers.application.integrations)}`,
      "",
      `### Permissões coletadas\n\n${permissionsBlock(answers)}`,
    ].join("\n");
  }

  if (type === "ai") {
    return [
      "## IA / Automação",
      "",
      `### Processo\n\n${line(answers.ai.process)}`,
      "",
      `### Frequência\n\n${line(answers.ai.frequency)}`,
      "",
      `### Tempo gasto hoje\n\n${line(answers.ai.timeSpent)}`,
      "",
      `### Processo atual\n\n${line(answers.ai.currentProcess)}`,
      "",
      `### Sistemas envolvidos\n\n${line(answers.ai.systems)}`,
      "",
      `### Dados de entrada\n\n${line(answers.ai.dataIn)}`,
      "",
      `### Resultado esperado\n\n${line(answers.ai.expectedResult)}`,
      "",
      `### Decisão humana\n\n${line(answers.ai.humanDecision)}`,
      "",
      `### Exemplo real\n\n${line(answers.ai.realExample)}`,
    ].join("\n");
  }

  return [
    "## Ainda não definido",
    "",
    `### O que mais ajudaria agora\n\n${line(answers.unsure.whatWouldHelp)}`,
    "",
    `### Já existe algo em mente\n\n${line(answers.unsure.hasSomethingInMind)}`,
    "",
    `### Processo que consome tempo\n\n${line(answers.unsure.timeConsumingProcess)}`,
  ].join("\n");
}

function audienceLine(type: ProjectType, answers: IntakeAnswers) {
  if (type === "landing") return line(answers.landing.audience);
  if (answers.company.idealClient.trim()) return answers.company.idealClient.trim();
  return "PENDING";
}

function integrationsLine(type: ProjectType, answers: IntakeAnswers) {
  if (type === "landing") {
    const items = joinOther(
      optionLabels(LANDING_INTEGRATIONS, answers.landing.integrations),
      answers.landing.integrationsOther,
    );
    return list(items);
  }
  if (type === "application") return line(answers.application.integrations);
  if (type === "ai") return line(answers.ai.systems);
  if (type === "website" && answers.website.features.includes("integrations")) {
    return line(answers.website.featuresOther) === "PENDING"
      ? "Integrações mencionadas no briefing. Detalhe: NOT DEFINED"
      : list(["Integrações"].concat(answers.website.featuresOther ? [answers.website.featuresOther] : []));
  }
  return "NOT DEFINED";
}

export function buildProjectDocuments(input: {
  client: Client;
  projectType: ProjectType;
  status: BriefingStatus | string;
  answers: IntakeAnswers;
}): ProjectDocumentInput[] {
  const { client, projectType, answers } = input;
  const typeLabel = PROJECT_TYPE_LABELS[projectType];
  const source = answers.source
    ? optionLabel(SOURCE_OPTIONS, answers.source) +
      (answers.source === "other" && answers.sourceOther ? ` — ${answers.sourceOther}` : "")
    : "NOT DEFINED";
  const budget = answers.budget ? optionLabel(BUDGET_RANGES, answers.budget) : "NOT DEFINED";

  const project = `# PROJECT

## Objetivo

${line(answers.problem.desiredResult)}

## Problema

${line(answers.problem.problem)}

## Público

${audienceLine(projectType, answers)}

## Solução

NOT DEFINED

## Escopo

${typeLabel}

## Status

PENDING

## Cliente

- Empresa: ${client.company_name}
- Responsável: ${client.contact_name}
- Segmento: ${client.segment}

## Por que agora

${line(answers.problem.whyNow)}

## Critério de sucesso

${line(answers.problem.successCriteria)}
`;

  const requirements = `# REQUIREMENTS

## Tipo de projeto

${typeLabel}

${specificRequirements(projectType, answers)}

## Resultado desejado

${line(answers.problem.desiredResult)}

## O que não funciona hoje

${line(answers.problem.whatDoesntWork)}

## Orçamento informado

${budget}

## Prazo informado

${line(answers.deadline)}
`;

  const design = `# DESIGN

## Identidade visual

${
  projectType === "website"
    ? `- Existe identidade visual: ${answers.website.hasIdentity || "PENDING"}
- Existe manual da marca: ${answers.website.hasBrandManual || "PENDING"}`
    : "PENDING"
}

${referencesBlock(answers)}

## Materiais

${materialsBlock(answers)}

## Direção

NOT DEFINED
`;

  const content = `# CONTENT

## Empresa

${line(answers.company.whatCompanyDoes)}

## Produto ou serviço principal

${line(answers.company.mainProduct)}

## Cliente ideal

${line(answers.company.idealClient)}

## Textos

${projectType === "website" ? answers.website.textsExist || "PENDING" : "PENDING"}

## Imagens

${projectType === "website" ? answers.website.imagesExist || "PENDING" : "PENDING"}

## Vídeo

${projectType === "website" ? answers.website.hasVideo || "PENDING" : "PENDING"}

${
  projectType === "landing"
    ? `## Oferta\n\n${line(answers.landing.offer)}\n\n## Benefício\n\n${line(answers.landing.mainBenefit)}\n\n## Prova social\n\n${list(optionLabels(SOCIAL_PROOF, answers.landing.socialProof))}`
    : ""
}

## Observações do cliente

${line(answers.extra)}
`;

  const integrations = `# INTEGRATIONS

## Sistemas e destinos

${integrationsLine(projectType, answers)}

## Origem dos dados

${
  projectType === "application"
    ? list(
        joinOther(
          optionLabels(APP_DATA_ORIGINS, answers.application.dataOrigins),
          answers.application.dataOriginsOther,
        ),
      )
    : "NOT DEFINED"
}

## Formulário / captura

${projectType === "landing" ? line(answers.landing.formFields) : "NOT DEFINED"}
`;

  const flows = `# USER-FLOWS

## Processo atual

${
  projectType === "application"
    ? line(answers.application.currentProcess)
    : projectType === "ai"
      ? line(answers.ai.currentProcess)
      : line(answers.problem.currentSolution)
}

## Usuários

${
  projectType === "application"
    ? list(joinOther(optionLabels(APP_USERS, answers.application.users), answers.application.usersOther))
    : audienceLine(projectType, answers)
}

## Fluxo proposto

NOT DEFINED
`;

  const decisions = `# DECISIONS

Nenhuma decisão interna registrada ainda.

## Tipo de projeto informado pelo cliente

${typeLabel}

## Fonte de captação

${source}

## Status

PENDING
`;

  const todo = `# TODO

## Discovery

PENDING

## Análise

PENDING

## Escopo

PENDING

## Entrega

PENDING
`;

  return [
    { slug: "PROJECT", title: "PROJECT.md", content: project.trim() + "\n" },
    { slug: "REQUIREMENTS", title: "REQUIREMENTS.md", content: requirements.trim() + "\n" },
    { slug: "DESIGN", title: "DESIGN.md", content: design.trim() + "\n" },
    { slug: "CONTENT", title: "CONTENT.md", content: content.trim() + "\n" },
    { slug: "INTEGRATIONS", title: "INTEGRATIONS.md", content: integrations.trim() + "\n" },
    { slug: "USER-FLOWS", title: "USER-FLOWS.md", content: flows.trim() + "\n" },
    { slug: "DECISIONS", title: "DECISIONS.md", content: decisions.trim() + "\n" },
    { slug: "TODO", title: "TODO.md", content: todo.trim() + "\n" },
  ];
}
