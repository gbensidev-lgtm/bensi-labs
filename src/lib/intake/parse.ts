import { emptyAnswers, FEATURE_PRIORITIES, MATERIAL_STATUSES, PERMISSION_ACTIONS, type IntakeAnswers, type MaterialStatus, type PermissionAction } from "@/lib/intake/types";

function asString(value: unknown) {
  return typeof value === "string" ? value : "";
}

function asStringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function asRecord(value: unknown) {
  return value && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : {};
}

export function parseAnswers(value: unknown): IntakeAnswers {
  const source = asRecord(value);
  const base = emptyAnswers();
  const company = asRecord(source.company);
  const problem = asRecord(source.problem);
  const website = asRecord(source.website);
  const landing = asRecord(source.landing);
  const application = asRecord(source.application);
  const ai = asRecord(source.ai);
  const unsure = asRecord(source.unsure);
  const references = asRecord(source.references);

  const permissions = asRecord(application.permissions);
  const parsedPermissions: Record<string, PermissionAction[]> = {};
  for (const [role, actions] of Object.entries(permissions)) {
    parsedPermissions[role] = asStringArray(actions).filter((action): action is PermissionAction =>
      PERMISSION_ACTIONS.includes(action as PermissionAction),
    );
  }

  return {
    company: {
      companyName: asString(company.companyName),
      contactName: asString(company.contactName),
      email: asString(company.email),
      phone: asString(company.phone),
      website: asString(company.website),
      instagram: asString(company.instagram),
      segment: asString(company.segment),
      whatCompanyDoes: asString(company.whatCompanyDoes),
      mainProduct: asString(company.mainProduct),
      idealClient: asString(company.idealClient),
    },
    problem: {
      whyNow: asString(problem.whyNow),
      problem: asString(problem.problem),
      currentSolution: asString(problem.currentSolution),
      whatDoesntWork: asString(problem.whatDoesntWork),
      desiredResult: asString(problem.desiredResult),
      successCriteria: asString(problem.successCriteria),
    },
    website: {
      ...base.website,
      objectives: asStringArray(website.objectives),
      objectiveOther: asString(website.objectiveOther),
      pages: asStringArray(website.pages),
      pagesOther: asString(website.pagesOther),
      features: asStringArray(website.features),
      featuresOther: asString(website.featuresOther),
      textsExist: asString(website.textsExist) as IntakeAnswers["website"]["textsExist"],
      imagesExist: asString(website.imagesExist) as IntakeAnswers["website"]["imagesExist"],
      hasVideo: asString(website.hasVideo) as IntakeAnswers["website"]["hasVideo"],
      hasIdentity: asString(website.hasIdentity) as IntakeAnswers["website"]["hasIdentity"],
      hasBrandManual: asString(website.hasBrandManual) as IntakeAnswers["website"]["hasBrandManual"],
      keepFromCurrent: asString(website.keepFromCurrent),
      changeFromCurrent: asString(website.changeFromCurrent),
    },
    landing: {
      ...base.landing,
      offer: asString(landing.offer),
      product: asString(landing.product),
      mainBenefit: asString(landing.mainBenefit),
      audience: asString(landing.audience),
      trafficSources: asStringArray(landing.trafficSources),
      trafficOther: asString(landing.trafficOther),
      objectives: asStringArray(landing.objectives),
      objectiveOther: asString(landing.objectiveOther),
      cta: asString(landing.cta),
      formFields: asString(landing.formFields),
      integrations: asStringArray(landing.integrations),
      integrationsOther: asString(landing.integrationsOther),
      socialProof: asStringArray(landing.socialProof),
    },
    application: {
      ...base.application,
      processToSystemize: asString(application.processToSystemize),
      currentProcess: asString(application.currentProcess),
      users: asStringArray(application.users),
      usersOther: asString(application.usersOther),
      features: Array.isArray(application.features)
        ? application.features.map((item) => {
            const feature = asRecord(item);
            const priority = FEATURE_PRIORITIES.includes(feature.priority as IntakeAnswers["application"]["features"][number]["priority"])
              ? (feature.priority as IntakeAnswers["application"]["features"][number]["priority"])
              : "medium";
            return {
              name: asString(feature.name),
              description: asString(feature.description),
              owner: asString(feature.owner),
              priority,
            };
          })
        : base.application.features,
      dataTypes: asStringArray(application.dataTypes),
      dataOther: asString(application.dataOther),
      dataOrigins: asStringArray(application.dataOrigins),
      dataOriginsOther: asString(application.dataOriginsOther),
      integrations: asString(application.integrations),
      permissions: parsedPermissions,
    },
    ai: {
      process: asString(ai.process),
      frequency: asString(ai.frequency),
      timeSpent: asString(ai.timeSpent),
      currentProcess: asString(ai.currentProcess),
      systems: asString(ai.systems),
      dataIn: asString(ai.dataIn),
      expectedResult: asString(ai.expectedResult),
      humanDecision: asString(ai.humanDecision),
      realExample: asString(ai.realExample),
    },
    unsure: {
      whatWouldHelp: asString(unsure.whatWouldHelp),
      hasSomethingInMind: asString(unsure.hasSomethingInMind),
      timeConsumingProcess: asString(unsure.timeConsumingProcess),
    },
    references: {
      likes: Array.isArray(references.likes)
        ? references.likes.map((item) => {
            const like = asRecord(item);
            return { url: asString(like.url), why: asString(like.why) };
          })
        : base.references.likes,
      dislikeUrl: asString(references.dislikeUrl),
      dislikeWhy: asString(references.dislikeWhy),
    },
    materials: Array.isArray(source.materials)
      ? source.materials.map((item) => {
          const material = asRecord(item);
          const status = MATERIAL_STATUSES.includes(material.status as MaterialStatus)
            ? (material.status as MaterialStatus)
            : "declared";
          return {
            name: asString(material.name),
            type: asString(material.type),
            status,
          };
        })
      : [],
    budget: asString(source.budget),
    deadline: asString(source.deadline),
    extra: asString(source.extra),
    source: asString(source.source),
    sourceOther: asString(source.sourceOther),
  };
}
