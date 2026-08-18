import {
  APP_DATA_ORIGINS,
  APP_DATA_TYPES,
  APP_USERS,
  LANDING_INTEGRATIONS,
  LANDING_OBJECTIVES,
  PROJECT_TYPE_OPTIONS,
  SOCIAL_PROOF,
  TRAFFIC_SOURCES,
  WEBSITE_FEATURES,
  WEBSITE_OBJECTIVES,
  WEBSITE_PAGES,
} from "@/lib/intake/options";
import {
  FEATURE_PRIORITIES,
  FEATURE_PRIORITY_LABELS,
  PERMISSION_ACTIONS,
  PERMISSION_ACTION_LABELS,
  type IntakeAnswers,
  type ProjectType,
} from "@/lib/intake/types";
import { IntakeField, IntakeInput, IntakeTextarea, IntakeToggle } from "@/components/intake/fields";

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

function TypeMark({ type }: { type: ProjectType }) {
  const className = "h-5 w-5 text-primary";
  if (type === "website") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M3.5 9h17" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (type === "landing") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="7" y="3.5" width="10" height="17" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M9.5 8h5M9.5 11.5h5M10.5 16h3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    );
  }
  if (type === "application") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 9h16M8 9v10" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  }
  if (type === "ai") {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 4.5 13.7 10l5.8.4-4.5 3.6 1.5 5.5L12 16.3 7.5 19.5l1.5-5.5-4.5-3.6 5.8-.4L12 4.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9.8 9.6c.4-1.1 1.4-1.7 2.5-1.7 1.3 0 2.3.8 2.3 2.1 0 1.5-1.4 1.8-2.2 2.4-.5.4-.7.8-.7 1.6M12 17.2v.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export function TypeStep({
  value,
  onChange,
}: {
  value: ProjectType | "";
  onChange: (value: ProjectType) => void;
}) {
  return (
    <div className="grid gap-3">
      {PROJECT_TYPE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          aria-pressed={value === option.value}
          className={`flex cursor-pointer items-start gap-4 rounded-[var(--radius-card)] border px-4 py-4 text-left transition-colors duration-150 ${
            value === option.value
              ? "border-primary bg-primary/10"
              : "border-border bg-surface hover:border-primary/40"
          }`}
        >
          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-button)] border border-border bg-background">
            <TypeMark type={option.value} />
          </span>
          <span>
            <span className="block text-base font-medium text-foreground">{option.title}</span>
            <span className="mt-1 block text-sm leading-relaxed text-muted">{option.description}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

export function CompanyStep({
  answers,
  onChange,
}: {
  answers: IntakeAnswers;
  onChange: (next: IntakeAnswers) => void;
}) {
  const company = answers.company;
  function patch(partial: Partial<IntakeAnswers["company"]>) {
    onChange({ ...answers, company: { ...company, ...partial } });
  }

  return (
    <div className="grid gap-5">
      <IntakeField label="Nome da empresa" htmlFor="companyName" required>
        <IntakeInput
          id="companyName"
          name="companyName"
          autoComplete="organization"
          value={company.companyName}
          onChange={(event) => patch({ companyName: event.target.value })}
        />
      </IntakeField>
      <IntakeField label="Nome do responsável" htmlFor="contactName" required>
        <IntakeInput
          id="contactName"
          name="contactName"
          autoComplete="name"
          value={company.contactName}
          onChange={(event) => patch({ contactName: event.target.value })}
        />
      </IntakeField>
      <div className="grid gap-5 md:grid-cols-2">
        <IntakeField label="E-mail" htmlFor="email" required>
          <IntakeInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={company.email}
            onChange={(event) => patch({ email: event.target.value })}
          />
        </IntakeField>
        <IntakeField label="WhatsApp / telefone" htmlFor="phone" required>
          <IntakeInput
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            value={company.phone}
            onChange={(event) => patch({ phone: event.target.value })}
          />
        </IntakeField>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <IntakeField label="Site atual" htmlFor="website">
          <IntakeInput
            id="website"
            name="website"
            type="url"
            placeholder="https://"
            value={company.website}
            onChange={(event) => patch({ website: event.target.value })}
          />
        </IntakeField>
        <IntakeField label="Instagram / redes sociais" htmlFor="instagram">
          <IntakeInput
            id="instagram"
            name="instagram"
            value={company.instagram}
            onChange={(event) => patch({ instagram: event.target.value })}
          />
        </IntakeField>
      </div>
      <IntakeField label="Segmento" htmlFor="segment" required>
        <IntakeInput
          id="segment"
          name="segment"
          value={company.segment}
          onChange={(event) => patch({ segment: event.target.value })}
        />
      </IntakeField>
      <IntakeField label="O que sua empresa faz?" htmlFor="whatCompanyDoes">
        <IntakeTextarea
          id="whatCompanyDoes"
          value={company.whatCompanyDoes}
          onChange={(event) => patch({ whatCompanyDoes: event.target.value })}
        />
      </IntakeField>
      <IntakeField label="Qual é o principal produto ou serviço?" htmlFor="mainProduct">
        <IntakeTextarea
          id="mainProduct"
          value={company.mainProduct}
          onChange={(event) => patch({ mainProduct: event.target.value })}
        />
      </IntakeField>
      <IntakeField label="Quem é seu cliente ideal?" htmlFor="idealClient">
        <IntakeTextarea
          id="idealClient"
          value={company.idealClient}
          onChange={(event) => patch({ idealClient: event.target.value })}
        />
      </IntakeField>
    </div>
  );
}

export function ProblemStep({
  answers,
  onChange,
}: {
  answers: IntakeAnswers;
  onChange: (next: IntakeAnswers) => void;
}) {
  const problem = answers.problem;
  function patch(partial: Partial<IntakeAnswers["problem"]>) {
    onChange({ ...answers, problem: { ...problem, ...partial } });
  }

  return (
    <div className="grid gap-5">
      <IntakeField label="Por que você está buscando esse projeto agora?" htmlFor="whyNow" required>
        <IntakeTextarea
          id="whyNow"
          value={problem.whyNow}
          onChange={(event) => patch({ whyNow: event.target.value })}
        />
      </IntakeField>
      <IntakeField label="Qual problema você gostaria de resolver?" htmlFor="problem" required>
        <IntakeTextarea
          id="problem"
          value={problem.problem}
          onChange={(event) => patch({ problem: event.target.value })}
        />
      </IntakeField>
      <IntakeField label="Como esse problema é resolvido atualmente?" htmlFor="currentSolution">
        <IntakeTextarea
          id="currentSolution"
          value={problem.currentSolution}
          onChange={(event) => patch({ currentSolution: event.target.value })}
        />
      </IntakeField>
      <IntakeField label="O que não funciona bem na solução atual?" htmlFor="whatDoesntWork">
        <IntakeTextarea
          id="whatDoesntWork"
          value={problem.whatDoesntWork}
          onChange={(event) => patch({ whatDoesntWork: event.target.value })}
        />
      </IntakeField>
      <IntakeField label="Qual resultado você gostaria de alcançar?" htmlFor="desiredResult" required>
        <IntakeTextarea
          id="desiredResult"
          value={problem.desiredResult}
          onChange={(event) => patch({ desiredResult: event.target.value })}
        />
      </IntakeField>
      <IntakeField label="Como você saberia que o projeto deu certo?" htmlFor="successCriteria">
        <IntakeTextarea
          id="successCriteria"
          value={problem.successCriteria}
          onChange={(event) => patch({ successCriteria: event.target.value })}
        />
      </IntakeField>
    </div>
  );
}

function MultiGroup({
  label,
  options,
  values,
  onChange,
}: {
  label: string;
  options: { value: string; label: string }[];
  values: string[];
  onChange: (values: string[]) => void;
}) {
  return (
    <fieldset>
      <legend className="mb-3 text-sm font-medium text-foreground">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <IntakeToggle
            key={option.value}
            label={option.label}
            selected={values.includes(option.value)}
            onToggle={() => onChange(toggleValue(values, option.value))}
          />
        ))}
      </div>
    </fieldset>
  );
}

export function SpecificStep({
  projectType,
  answers,
  onChange,
}: {
  projectType: ProjectType | "";
  answers: IntakeAnswers;
  onChange: (next: IntakeAnswers) => void;
}) {
  if (projectType === "website") {
    const website = answers.website;
    const patch = (partial: Partial<IntakeAnswers["website"]>) =>
      onChange({ ...answers, website: { ...website, ...partial } });

    return (
      <div className="grid gap-8">
        <MultiGroup
          label="Qual é o principal objetivo do site?"
          options={WEBSITE_OBJECTIVES}
          values={website.objectives}
          onChange={(objectives) => patch({ objectives })}
        />
        {website.objectives.includes("other") ? (
          <IntakeField label="Qual outro objetivo?" htmlFor="websiteObjectiveOther">
            <IntakeInput
              id="websiteObjectiveOther"
              value={website.objectiveOther}
              onChange={(event) => patch({ objectiveOther: event.target.value })}
            />
          </IntakeField>
        ) : null}
        <MultiGroup
          label="Quais páginas você imagina?"
          options={WEBSITE_PAGES}
          values={website.pages}
          onChange={(pages) => patch({ pages })}
        />
        {website.pages.includes("other") ? (
          <IntakeField label="Qual outra página?" htmlFor="websitePagesOther">
            <IntakeInput
              id="websitePagesOther"
              value={website.pagesOther}
              onChange={(event) => patch({ pagesOther: event.target.value })}
            />
          </IntakeField>
        ) : null}
        <MultiGroup
          label="Funcionalidades"
          options={WEBSITE_FEATURES}
          values={website.features}
          onChange={(features) => patch({ features })}
        />
        {website.features.includes("other") ? (
          <IntakeField label="Qual outra funcionalidade?" htmlFor="websiteFeaturesOther">
            <IntakeInput
              id="websiteFeaturesOther"
              value={website.featuresOther}
              onChange={(event) => patch({ featuresOther: event.target.value })}
            />
          </IntakeField>
        ) : null}
        <div className="grid gap-5">
          <IntakeField label="Os textos já existem?" htmlFor="textsExist">
            <select
              id="textsExist"
              className="min-h-12 w-full rounded-[var(--radius-button)] border border-border bg-surface px-4 text-sm"
              value={website.textsExist}
              onChange={(event) => patch({ textsExist: event.target.value as IntakeAnswers["website"]["textsExist"] })}
            >
              <option value="">Selecionar</option>
              <option value="yes">Sim</option>
              <option value="partial">Parcialmente</option>
              <option value="no">Não</option>
            </select>
          </IntakeField>
          <IntakeField label="As imagens já existem?" htmlFor="imagesExist">
            <select
              id="imagesExist"
              className="min-h-12 w-full rounded-[var(--radius-button)] border border-border bg-surface px-4 text-sm"
              value={website.imagesExist}
              onChange={(event) => patch({ imagesExist: event.target.value as IntakeAnswers["website"]["imagesExist"] })}
            >
              <option value="">Selecionar</option>
              <option value="yes">Sim</option>
              <option value="partial">Parcialmente</option>
              <option value="no">Não</option>
            </select>
          </IntakeField>
          <IntakeField label="Existe vídeo?" htmlFor="hasVideo">
            <select
              id="hasVideo"
              className="min-h-12 w-full rounded-[var(--radius-button)] border border-border bg-surface px-4 text-sm"
              value={website.hasVideo}
              onChange={(event) => patch({ hasVideo: event.target.value as IntakeAnswers["website"]["hasVideo"] })}
            >
              <option value="">Selecionar</option>
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </select>
          </IntakeField>
          <IntakeField label="Existe identidade visual?" htmlFor="hasIdentity">
            <select
              id="hasIdentity"
              className="min-h-12 w-full rounded-[var(--radius-button)] border border-border bg-surface px-4 text-sm"
              value={website.hasIdentity}
              onChange={(event) => patch({ hasIdentity: event.target.value as IntakeAnswers["website"]["hasIdentity"] })}
            >
              <option value="">Selecionar</option>
              <option value="yes">Sim</option>
              <option value="partial">Parcialmente</option>
              <option value="no">Não</option>
            </select>
          </IntakeField>
          <IntakeField label="Existe manual da marca?" htmlFor="hasBrandManual">
            <select
              id="hasBrandManual"
              className="min-h-12 w-full rounded-[var(--radius-button)] border border-border bg-surface px-4 text-sm"
              value={website.hasBrandManual}
              onChange={(event) => patch({ hasBrandManual: event.target.value as IntakeAnswers["website"]["hasBrandManual"] })}
            >
              <option value="">Selecionar</option>
              <option value="yes">Sim</option>
              <option value="no">Não</option>
            </select>
          </IntakeField>
        </div>
        {answers.company.website ? (
          <>
            <IntakeField label="O que você gostaria de manter no site atual?" htmlFor="keepFromCurrent">
              <IntakeTextarea
                id="keepFromCurrent"
                value={website.keepFromCurrent}
                onChange={(event) => patch({ keepFromCurrent: event.target.value })}
              />
            </IntakeField>
            <IntakeField label="O que gostaria de mudar?" htmlFor="changeFromCurrent">
              <IntakeTextarea
                id="changeFromCurrent"
                value={website.changeFromCurrent}
                onChange={(event) => patch({ changeFromCurrent: event.target.value })}
              />
            </IntakeField>
          </>
        ) : null}
      </div>
    );
  }

  if (projectType === "landing") {
    const landing = answers.landing;
    const patch = (partial: Partial<IntakeAnswers["landing"]>) =>
      onChange({ ...answers, landing: { ...landing, ...partial } });

    return (
      <div className="grid gap-5">
        <IntakeField label="O que será divulgado?" htmlFor="offer" required>
          <IntakeTextarea id="offer" value={landing.offer} onChange={(event) => patch({ offer: event.target.value })} />
        </IntakeField>
        <IntakeField label="Qual produto ou serviço está sendo promovido?" htmlFor="product">
          <IntakeInput id="product" value={landing.product} onChange={(event) => patch({ product: event.target.value })} />
        </IntakeField>
        <IntakeField label="Qual é o principal benefício para o cliente?" htmlFor="mainBenefit">
          <IntakeTextarea id="mainBenefit" value={landing.mainBenefit} onChange={(event) => patch({ mainBenefit: event.target.value })} />
        </IntakeField>
        <IntakeField label="Quem deve chegar nessa página?" htmlFor="audience">
          <IntakeTextarea id="audience" value={landing.audience} onChange={(event) => patch({ audience: event.target.value })} />
        </IntakeField>
        <MultiGroup
          label="De onde as pessoas virão?"
          options={TRAFFIC_SOURCES}
          values={landing.trafficSources}
          onChange={(trafficSources) => patch({ trafficSources })}
        />
        {landing.trafficSources.includes("other") ? (
          <IntakeField label="Qual outra origem?" htmlFor="trafficOther">
            <IntakeInput id="trafficOther" value={landing.trafficOther} onChange={(event) => patch({ trafficOther: event.target.value })} />
          </IntakeField>
        ) : null}
        <MultiGroup
          label="Objetivo da página"
          options={LANDING_OBJECTIVES}
          values={landing.objectives}
          onChange={(objectives) => patch({ objectives })}
        />
        <IntakeField label="Qual ação o visitante deve realizar?" htmlFor="cta" required>
          <IntakeInput id="cta" value={landing.cta} onChange={(event) => patch({ cta: event.target.value })} />
        </IntakeField>
        <IntakeField label="Se existir formulário, quais dados precisam ser coletados?" htmlFor="formFields">
          <IntakeTextarea id="formFields" value={landing.formFields} onChange={(event) => patch({ formFields: event.target.value })} />
        </IntakeField>
        <MultiGroup
          label="Para onde os dados devem ser enviados?"
          options={LANDING_INTEGRATIONS}
          values={landing.integrations}
          onChange={(integrations) => patch({ integrations })}
        />
        {landing.integrations.includes("other") ? (
          <IntakeField label="Qual outra integração?" htmlFor="integrationsOther">
            <IntakeInput id="integrationsOther" value={landing.integrationsOther} onChange={(event) => patch({ integrationsOther: event.target.value })} />
          </IntakeField>
        ) : null}
        <MultiGroup
          label="Existe prova social?"
          options={SOCIAL_PROOF}
          values={landing.socialProof}
          onChange={(socialProof) => patch({ socialProof })}
        />
      </div>
    );
  }

  if (projectType === "application") {
    const application = answers.application;
    const patch = (partial: Partial<IntakeAnswers["application"]>) =>
      onChange({ ...answers, application: { ...application, ...partial } });

    return (
      <div className="grid gap-6">
        <IntakeField label="Que processo você gostaria de transformar em sistema?" htmlFor="processToSystemize" required>
          <IntakeTextarea
            id="processToSystemize"
            value={application.processToSystemize}
            onChange={(event) => patch({ processToSystemize: event.target.value })}
          />
        </IntakeField>
        <IntakeField label="Como esse processo funciona hoje, passo a passo?" htmlFor="currentProcess">
          <IntakeTextarea
            id="currentProcess"
            value={application.currentProcess}
            onChange={(event) => patch({ currentProcess: event.target.value })}
          />
        </IntakeField>
        <MultiGroup
          label="Quem utilizará o sistema?"
          options={APP_USERS}
          values={application.users}
          onChange={(users) => patch({ users })}
        />
        {application.users.includes("other") ? (
          <IntakeField label="Qual outro perfil?" htmlFor="usersOther">
            <IntakeInput id="usersOther" value={application.usersOther} onChange={(event) => patch({ usersOther: event.target.value })} />
          </IntakeField>
        ) : null}

        <div>
          <p className="mb-3 text-sm font-medium text-foreground">O que você precisa conseguir fazer dentro do sistema?</p>
          <div className="grid gap-4">
            {application.features.map((feature, index) => (
              <div key={index} className="grid gap-3 rounded-[var(--radius-card)] border border-border p-4">
                <IntakeField label="Nome" htmlFor={`feature-name-${index}`}>
                  <IntakeInput
                    id={`feature-name-${index}`}
                    value={feature.name}
                    onChange={(event) => {
                      const features = application.features.slice();
                      features[index] = { ...feature, name: event.target.value };
                      patch({ features });
                    }}
                  />
                </IntakeField>
                <IntakeField label="Descrição" htmlFor={`feature-desc-${index}`}>
                  <IntakeTextarea
                    id={`feature-desc-${index}`}
                    className="min-h-24"
                    value={feature.description}
                    onChange={(event) => {
                      const features = application.features.slice();
                      features[index] = { ...feature, description: event.target.value };
                      patch({ features });
                    }}
                  />
                </IntakeField>
                <div className="grid gap-3 md:grid-cols-2">
                  <IntakeField label="Usuário responsável" htmlFor={`feature-owner-${index}`}>
                    <IntakeInput
                      id={`feature-owner-${index}`}
                      value={feature.owner}
                      onChange={(event) => {
                        const features = application.features.slice();
                        features[index] = { ...feature, owner: event.target.value };
                        patch({ features });
                      }}
                    />
                  </IntakeField>
                  <IntakeField label="Prioridade" htmlFor={`feature-priority-${index}`}>
                    <select
                      id={`feature-priority-${index}`}
                      className="min-h-12 w-full rounded-[var(--radius-button)] border border-border bg-surface px-4 text-sm"
                      value={feature.priority}
                      onChange={(event) => {
                        const features = application.features.slice();
                        features[index] = {
                          ...feature,
                          priority: event.target.value as (typeof FEATURE_PRIORITIES)[number],
                        };
                        patch({ features });
                      }}
                    >
                      {FEATURE_PRIORITIES.map((priority) => (
                        <option key={priority} value={priority}>
                          {FEATURE_PRIORITY_LABELS[priority]}
                        </option>
                      ))}
                    </select>
                  </IntakeField>
                </div>
                {application.features.length > 1 ? (
                  <button
                    type="button"
                    className="w-fit text-sm text-muted hover:text-foreground"
                    onClick={() => patch({ features: application.features.filter((_, item) => item !== index) })}
                  >
                    Remover funcionalidade
                  </button>
                ) : null}
              </div>
            ))}
          </div>
          <button
            type="button"
            className="mt-3 text-sm text-primary hover:text-foreground"
            onClick={() =>
              patch({
                features: [...application.features, { name: "", description: "", owner: "", priority: "medium" }],
              })
            }
          >
            Adicionar funcionalidade
          </button>
        </div>

        <MultiGroup
          label="Quais dados serão utilizados?"
          options={APP_DATA_TYPES}
          values={application.dataTypes}
          onChange={(dataTypes) => patch({ dataTypes })}
        />
        <MultiGroup
          label="Origem dos dados"
          options={APP_DATA_ORIGINS}
          values={application.dataOrigins}
          onChange={(dataOrigins) => patch({ dataOrigins })}
        />
        <IntakeField label="Quais sistemas precisam conversar com a aplicação?" htmlFor="appIntegrations">
          <IntakeTextarea
            id="appIntegrations"
            value={application.integrations}
            onChange={(event) => patch({ integrations: event.target.value })}
          />
        </IntakeField>

        {application.users.length ? (
          <fieldset>
            <legend className="mb-3 text-sm font-medium text-foreground">Permissões por perfil</legend>
            <div className="overflow-x-auto border border-border">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="border-b border-border bg-background font-mono text-xs tracking-[0.12em] text-muted uppercase">
                  <tr>
                    <th className="px-3 py-3 font-medium">Perfil</th>
                    {PERMISSION_ACTIONS.map((action) => (
                      <th key={action} className="px-3 py-3 font-medium">
                        {PERMISSION_ACTION_LABELS[action]}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {application.users.map((role) => {
                    const selected = application.permissions[role] ?? [];
                    const label = APP_USERS.find((item) => item.value === role)?.label ?? role;
                    return (
                      <tr key={role} className="border-b border-border last:border-b-0">
                        <td className="px-3 py-3">{label}</td>
                        {PERMISSION_ACTIONS.map((action) => (
                          <td key={action} className="px-3 py-3">
                            <input
                              type="checkbox"
                              checked={selected.includes(action)}
                              onChange={() => {
                                const next = toggleValue(selected, action) as typeof selected;
                                patch({
                                  permissions: { ...application.permissions, [role]: next },
                                });
                              }}
                              aria-label={`${label}: ${PERMISSION_ACTION_LABELS[action]}`}
                            />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </fieldset>
        ) : null}
      </div>
    );
  }

  if (projectType === "ai") {
    const ai = answers.ai;
    const patch = (partial: Partial<IntakeAnswers["ai"]>) => onChange({ ...answers, ai: { ...ai, ...partial } });

    return (
      <div className="grid gap-5">
        <IntakeField label="Qual tarefa ou processo você gostaria de automatizar?" htmlFor="aiProcess" required>
          <IntakeTextarea id="aiProcess" value={ai.process} onChange={(event) => patch({ process: event.target.value })} />
        </IntakeField>
        <IntakeField label="Com que frequência isso acontece?" htmlFor="frequency">
          <IntakeInput id="frequency" value={ai.frequency} onChange={(event) => patch({ frequency: event.target.value })} />
        </IntakeField>
        <IntakeField label="Quanto tempo aproximadamente é gasto hoje?" htmlFor="timeSpent">
          <IntakeInput id="timeSpent" value={ai.timeSpent} onChange={(event) => patch({ timeSpent: event.target.value })} />
        </IntakeField>
        <IntakeField label="Como essa tarefa é realizada atualmente?" htmlFor="aiCurrent">
          <IntakeTextarea id="aiCurrent" value={ai.currentProcess} onChange={(event) => patch({ currentProcess: event.target.value })} />
        </IntakeField>
        <IntakeField label="Quais ferramentas fazem parte do processo?" htmlFor="systems">
          <IntakeTextarea id="systems" value={ai.systems} onChange={(event) => patch({ systems: event.target.value })} />
        </IntakeField>
        <IntakeField label="Quais informações entram no processo?" htmlFor="dataIn">
          <IntakeTextarea id="dataIn" value={ai.dataIn} onChange={(event) => patch({ dataIn: event.target.value })} />
        </IntakeField>
        <IntakeField label="O que deveria acontecer automaticamente?" htmlFor="expectedResult" required>
          <IntakeTextarea id="expectedResult" value={ai.expectedResult} onChange={(event) => patch({ expectedResult: event.target.value })} />
        </IntakeField>
        <IntakeField label="Existe alguma decisão que atualmente depende de análise humana?" htmlFor="humanDecision">
          <IntakeTextarea id="humanDecision" value={ai.humanDecision} onChange={(event) => patch({ humanDecision: event.target.value })} />
        </IntakeField>
        <IntakeField
          label="Se possível, descreva um exemplo real de como esse processo acontece hoje."
          htmlFor="realExample"
        >
          <IntakeTextarea id="realExample" value={ai.realExample} onChange={(event) => patch({ realExample: event.target.value })} />
        </IntakeField>
      </div>
    );
  }

  const unsure = answers.unsure;
  const patch = (partial: Partial<IntakeAnswers["unsure"]>) => onChange({ ...answers, unsure: { ...unsure, ...partial } });

  return (
    <div className="grid gap-5">
      <IntakeField label="O que mais ajudaria você agora?" htmlFor="whatWouldHelp" required>
        <IntakeTextarea
          id="whatWouldHelp"
          value={unsure.whatWouldHelp}
          onChange={(event) => patch({ whatWouldHelp: event.target.value })}
        />
      </IntakeField>
      <IntakeField label="Você já tem algo em mente, mesmo que ainda não esteja claro?" htmlFor="hasSomethingInMind">
        <IntakeTextarea
          id="hasSomethingInMind"
          value={unsure.hasSomethingInMind}
          onChange={(event) => patch({ hasSomethingInMind: event.target.value })}
        />
      </IntakeField>
      <IntakeField label="Existe algum processo que consome tempo demais hoje?" htmlFor="timeConsumingProcess">
        <IntakeTextarea
          id="timeConsumingProcess"
          value={unsure.timeConsumingProcess}
          onChange={(event) => patch({ timeConsumingProcess: event.target.value })}
        />
      </IntakeField>
    </div>
  );
}
