import { isProjectType, type IntakeAnswers, type ProjectType } from "@/lib/intake/types";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_TEXT = 4000;
const MAX_SHORT = 240;

function clipped(value: unknown, max = MAX_TEXT) {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

function required(value: string, message: string) {
  return value ? "" : message;
}

export function validateStep(
  step: number,
  projectType: ProjectType | "",
  answers: IntakeAnswers,
): string {
  if (step === 0) {
    return isProjectType(projectType) ? "" : "Escolha o tipo de projeto para continuar.";
  }

  if (step === 1) {
    const { company } = answers;
    return (
      required(company.companyName, "Informe o nome da empresa.") ||
      required(company.contactName, "Informe o nome do responsável.") ||
      required(company.email, "Informe um e-mail.") ||
      (EMAIL_PATTERN.test(company.email) ? "" : "Informe um e-mail válido.") ||
      required(company.phone, "Informe WhatsApp ou telefone.") ||
      required(company.segment, "Informe o segmento da empresa.")
    );
  }

  if (step === 2) {
    return (
      required(answers.problem.whyNow, "Conte por que você está buscando esse projeto agora.") ||
      required(answers.problem.problem, "Descreva o problema que você gostaria de resolver.") ||
      required(answers.problem.desiredResult, "Descreva o resultado que você gostaria de alcançar.")
    );
  }

  if (step === 3) {
    if (projectType === "website") {
      return answers.website.objectives.length
        ? ""
        : "Escolha pelo menos um objetivo para o site.";
    }
    if (projectType === "landing") {
      return (
        required(answers.landing.offer, "Descreva o que será divulgado.") ||
        required(answers.landing.cta, "Informe a ação principal que o visitante deve realizar.")
      );
    }
    if (projectType === "application") {
      return (
        required(
          answers.application.processToSystemize,
          "Descreva o processo que você gostaria de transformar em sistema.",
        ) ||
        (answers.application.users.length
          ? ""
          : "Informe quem vai utilizar o sistema.")
      );
    }
    if (projectType === "ai") {
      return (
        required(answers.ai.process, "Descreva a tarefa ou processo que você gostaria de automatizar.") ||
        required(answers.ai.expectedResult, "Descreva o que deveria acontecer automaticamente.")
      );
    }
    if (projectType === "unsure") {
      return required(
        answers.unsure.whatWouldHelp,
        "Conte o que mais ajudaria você agora.",
      );
    }
  }

  return "";
}

export function sanitizeAnswers(input: IntakeAnswers): IntakeAnswers {
  const likes = (input.references.likes ?? [])
    .map((item) => ({ url: clipped(item.url, 500), why: clipped(item.why, MAX_SHORT) }))
    .filter((item) => item.url || item.why);

  const features = (input.application.features ?? [])
    .map((item) => ({
      name: clipped(item.name, MAX_SHORT),
      description: clipped(item.description),
      owner: clipped(item.owner, MAX_SHORT),
      priority: item.priority === "high" || item.priority === "low" ? item.priority : "medium" as const,
    }))
    .filter((item) => item.name || item.description);

  const materials = (input.materials ?? [])
    .map((item) => ({
      name: clipped(item.name, MAX_SHORT),
      type: clipped(item.type, 80),
      status:
        item.status === "to_send" || item.status === "unavailable" ? item.status : "declared" as const,
    }))
    .filter((item) => item.type || item.name);

  return {
    company: {
      companyName: clipped(input.company.companyName, MAX_SHORT),
      contactName: clipped(input.company.contactName, MAX_SHORT),
      email: clipped(input.company.email, MAX_SHORT).toLowerCase(),
      phone: clipped(input.company.phone, 40),
      website: clipped(input.company.website, 500),
      instagram: clipped(input.company.instagram, 500),
      segment: clipped(input.company.segment, MAX_SHORT),
      whatCompanyDoes: clipped(input.company.whatCompanyDoes),
      mainProduct: clipped(input.company.mainProduct),
      idealClient: clipped(input.company.idealClient),
    },
    problem: {
      whyNow: clipped(input.problem.whyNow),
      problem: clipped(input.problem.problem),
      currentSolution: clipped(input.problem.currentSolution),
      whatDoesntWork: clipped(input.problem.whatDoesntWork),
      desiredResult: clipped(input.problem.desiredResult),
      successCriteria: clipped(input.problem.successCriteria),
    },
    website: {
      ...input.website,
      objectives: (input.website.objectives ?? []).slice(0, 20).map(String),
      objectiveOther: clipped(input.website.objectiveOther, MAX_SHORT),
      pages: (input.website.pages ?? []).slice(0, 20).map(String),
      pagesOther: clipped(input.website.pagesOther, MAX_SHORT),
      features: (input.website.features ?? []).slice(0, 20).map(String),
      featuresOther: clipped(input.website.featuresOther, MAX_SHORT),
      keepFromCurrent: clipped(input.website.keepFromCurrent),
      changeFromCurrent: clipped(input.website.changeFromCurrent),
    },
    landing: {
      ...input.landing,
      offer: clipped(input.landing.offer),
      product: clipped(input.landing.product),
      mainBenefit: clipped(input.landing.mainBenefit),
      audience: clipped(input.landing.audience),
      trafficSources: (input.landing.trafficSources ?? []).slice(0, 20).map(String),
      trafficOther: clipped(input.landing.trafficOther, MAX_SHORT),
      objectives: (input.landing.objectives ?? []).slice(0, 20).map(String),
      objectiveOther: clipped(input.landing.objectiveOther, MAX_SHORT),
      cta: clipped(input.landing.cta, MAX_SHORT),
      formFields: clipped(input.landing.formFields),
      integrations: (input.landing.integrations ?? []).slice(0, 20).map(String),
      integrationsOther: clipped(input.landing.integrationsOther, MAX_SHORT),
      socialProof: (input.landing.socialProof ?? []).slice(0, 20).map(String),
    },
    application: {
      ...input.application,
      processToSystemize: clipped(input.application.processToSystemize),
      currentProcess: clipped(input.application.currentProcess),
      users: (input.application.users ?? []).slice(0, 20).map(String),
      usersOther: clipped(input.application.usersOther, MAX_SHORT),
      features: features.length ? features : [],
      dataTypes: (input.application.dataTypes ?? []).slice(0, 20).map(String),
      dataOther: clipped(input.application.dataOther, MAX_SHORT),
      dataOrigins: (input.application.dataOrigins ?? []).slice(0, 20).map(String),
      dataOriginsOther: clipped(input.application.dataOriginsOther, MAX_SHORT),
      integrations: clipped(input.application.integrations),
      permissions: input.application.permissions ?? {},
    },
    ai: {
      process: clipped(input.ai.process),
      frequency: clipped(input.ai.frequency, MAX_SHORT),
      timeSpent: clipped(input.ai.timeSpent, MAX_SHORT),
      currentProcess: clipped(input.ai.currentProcess),
      systems: clipped(input.ai.systems),
      dataIn: clipped(input.ai.dataIn),
      expectedResult: clipped(input.ai.expectedResult),
      humanDecision: clipped(input.ai.humanDecision),
      realExample: clipped(input.ai.realExample),
    },
    unsure: {
      whatWouldHelp: clipped(input.unsure.whatWouldHelp),
      hasSomethingInMind: clipped(input.unsure.hasSomethingInMind),
      timeConsumingProcess: clipped(input.unsure.timeConsumingProcess),
    },
    references: {
      likes: likes.length ? likes : [],
      dislikeUrl: clipped(input.references.dislikeUrl, 500),
      dislikeWhy: clipped(input.references.dislikeWhy, MAX_SHORT),
    },
    materials,
    budget: clipped(input.budget, 80),
    deadline: clipped(input.deadline, MAX_SHORT),
    extra: clipped(input.extra),
    source: clipped(input.source, 80),
    sourceOther: clipped(input.sourceOther, MAX_SHORT),
  };
}
