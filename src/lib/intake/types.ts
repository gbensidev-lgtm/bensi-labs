export const PROJECT_TYPES = ["website", "landing", "application", "ai", "unsure"] as const;
export const BRIEFING_STATUSES = [
  "NEW",
  "REVIEWING",
  "CONTACTED",
  "QUALIFIED",
  "CONVERTED",
  "REJECTED",
  "ARCHIVED",
] as const;
export const FEATURE_PRIORITIES = ["high", "medium", "low"] as const;
export const MATERIAL_STATUSES = ["declared", "to_send", "unavailable"] as const;
export const PERMISSION_ACTIONS = ["view", "create", "edit", "delete", "approve"] as const;
export const CONTENT_STATES = ["", "yes", "no", "partial"] as const;
export const YES_NO_STATES = ["", "yes", "no"] as const;

export type ProjectType = (typeof PROJECT_TYPES)[number];
export type BriefingStatus = (typeof BRIEFING_STATUSES)[number];
export type FeaturePriority = (typeof FEATURE_PRIORITIES)[number];
export type MaterialStatus = (typeof MATERIAL_STATUSES)[number];
export type PermissionAction = (typeof PERMISSION_ACTIONS)[number];
export type ContentState = (typeof CONTENT_STATES)[number];
export type YesNoState = (typeof YES_NO_STATES)[number];

export type AppFeature = {
  name: string;
  description: string;
  owner: string;
  priority: FeaturePriority;
};

export type ReferenceLike = {
  url: string;
  why: string;
};

export type MaterialEntry = {
  name: string;
  type: string;
  status: MaterialStatus;
};

export type IntakeAnswers = {
  company: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    website: string;
    instagram: string;
    segment: string;
    whatCompanyDoes: string;
    mainProduct: string;
    idealClient: string;
  };
  problem: {
    whyNow: string;
    problem: string;
    currentSolution: string;
    whatDoesntWork: string;
    desiredResult: string;
    successCriteria: string;
  };
  website: {
    objectives: string[];
    objectiveOther: string;
    pages: string[];
    pagesOther: string;
    features: string[];
    featuresOther: string;
    textsExist: ContentState;
    imagesExist: ContentState;
    hasVideo: YesNoState;
    hasIdentity: ContentState;
    hasBrandManual: YesNoState;
    keepFromCurrent: string;
    changeFromCurrent: string;
  };
  landing: {
    offer: string;
    product: string;
    mainBenefit: string;
    audience: string;
    trafficSources: string[];
    trafficOther: string;
    objectives: string[];
    objectiveOther: string;
    cta: string;
    formFields: string;
    integrations: string[];
    integrationsOther: string;
    socialProof: string[];
  };
  application: {
    processToSystemize: string;
    currentProcess: string;
    users: string[];
    usersOther: string;
    features: AppFeature[];
    dataTypes: string[];
    dataOther: string;
    dataOrigins: string[];
    dataOriginsOther: string;
    integrations: string;
    permissions: Record<string, PermissionAction[]>;
  };
  ai: {
    process: string;
    frequency: string;
    timeSpent: string;
    currentProcess: string;
    systems: string;
    dataIn: string;
    expectedResult: string;
    humanDecision: string;
    realExample: string;
  };
  unsure: {
    whatWouldHelp: string;
    hasSomethingInMind: string;
    timeConsumingProcess: string;
  };
  references: {
    likes: ReferenceLike[];
    dislikeUrl: string;
    dislikeWhy: string;
  };
  materials: MaterialEntry[];
  budget: string;
  deadline: string;
  extra: string;
  source: string;
  sourceOther: string;
};

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  website: "Site",
  landing: "Landing Page",
  application: "Aplicação / Sistema",
  ai: "IA / Automação",
  unsure: "Ainda não tenho certeza",
};

export const BRIEFING_STATUS_LABELS: Record<BriefingStatus, string> = {
  NEW: "Novo",
  REVIEWING: "Em análise",
  CONTACTED: "Contatado",
  QUALIFIED: "Qualificado",
  CONVERTED: "Convertido",
  REJECTED: "Recusado",
  ARCHIVED: "Arquivado",
};

export const FEATURE_PRIORITY_LABELS: Record<FeaturePriority, string> = {
  high: "Alta",
  medium: "Média",
  low: "Baixa",
};

export const PERMISSION_ACTION_LABELS: Record<PermissionAction, string> = {
  view: "Visualizar",
  create: "Criar",
  edit: "Editar",
  delete: "Excluir",
  approve: "Aprovar",
};

export const CONTENT_STATE_LABELS: Record<Exclude<ContentState, "">, string> = {
  yes: "Sim",
  no: "Não",
  partial: "Parcialmente",
};

export const YES_NO_LABELS: Record<Exclude<YesNoState, "">, string> = {
  yes: "Sim",
  no: "Não",
};

export function emptyAnswers(): IntakeAnswers {
  return {
    company: {
      companyName: "",
      contactName: "",
      email: "",
      phone: "",
      website: "",
      instagram: "",
      segment: "",
      whatCompanyDoes: "",
      mainProduct: "",
      idealClient: "",
    },
    problem: {
      whyNow: "",
      problem: "",
      currentSolution: "",
      whatDoesntWork: "",
      desiredResult: "",
      successCriteria: "",
    },
    website: {
      objectives: [],
      objectiveOther: "",
      pages: [],
      pagesOther: "",
      features: [],
      featuresOther: "",
      textsExist: "",
      imagesExist: "",
      hasVideo: "",
      hasIdentity: "",
      hasBrandManual: "",
      keepFromCurrent: "",
      changeFromCurrent: "",
    },
    landing: {
      offer: "",
      product: "",
      mainBenefit: "",
      audience: "",
      trafficSources: [],
      trafficOther: "",
      objectives: [],
      objectiveOther: "",
      cta: "",
      formFields: "",
      integrations: [],
      integrationsOther: "",
      socialProof: [],
    },
    application: {
      processToSystemize: "",
      currentProcess: "",
      users: [],
      usersOther: "",
      features: [{ name: "", description: "", owner: "", priority: "medium" }],
      dataTypes: [],
      dataOther: "",
      dataOrigins: [],
      dataOriginsOther: "",
      integrations: "",
      permissions: {},
    },
    ai: {
      process: "",
      frequency: "",
      timeSpent: "",
      currentProcess: "",
      systems: "",
      dataIn: "",
      expectedResult: "",
      humanDecision: "",
      realExample: "",
    },
    unsure: {
      whatWouldHelp: "",
      hasSomethingInMind: "",
      timeConsumingProcess: "",
    },
    references: {
      likes: [{ url: "", why: "" }],
      dislikeUrl: "",
      dislikeWhy: "",
    },
    materials: [],
    budget: "",
    deadline: "",
    extra: "",
    source: "",
    sourceOther: "",
  };
}

export function isProjectType(value: unknown): value is ProjectType {
  return typeof value === "string" && PROJECT_TYPES.includes(value as ProjectType);
}

export function isBriefingStatus(value: unknown): value is BriefingStatus {
  return typeof value === "string" && BRIEFING_STATUSES.includes(value as BriefingStatus);
}
