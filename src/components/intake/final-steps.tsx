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
  CONTENT_STATE_LABELS,
  PROJECT_TYPE_LABELS,
  YES_NO_LABELS,
  type IntakeAnswers,
  type ProjectType,
} from "@/lib/intake/types";
import { IntakeChoice, IntakeField, IntakeInput, IntakeTextarea, IntakeToggle } from "@/components/intake/fields";

function joinList(values: string[], other: string) {
  const extra = other.trim();
  return extra ? [...values, extra] : values;
}

function SummaryItem({ label, value }: { label: string; value?: string | string[] | null }) {
  const text = Array.isArray(value)
    ? value.filter(Boolean).join(", ")
    : value?.trim() || "Não informado";

  return (
    <div className="border-b border-border py-4 last:border-b-0">
      <p className="font-mono text-[11px] tracking-[0.16em] text-muted uppercase">{label}</p>
      <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground">{text}</p>
    </div>
  );
}

export function ReferencesStep({
  answers,
  onChange,
}: {
  answers: IntakeAnswers;
  onChange: (next: IntakeAnswers) => void;
}) {
  const likes = answers.references.likes;

  return (
    <div className="grid gap-8">
      <div>
        <p className="mb-3 text-sm font-medium text-foreground">
          Existem sites, aplicativos ou produtos que você gosta?
        </p>
        <div className="grid gap-4">
          {likes.map((item, index) => (
            <div key={index} className="grid gap-3 rounded-[var(--radius-card)] border border-border p-4">
              <IntakeField label="URL" htmlFor={`ref-url-${index}`}>
                <IntakeInput
                  id={`ref-url-${index}`}
                  type="url"
                  placeholder="https://"
                  value={item.url}
                  onChange={(event) => {
                    const next = likes.slice();
                    next[index] = { ...item, url: event.target.value };
                    onChange({ ...answers, references: { ...answers.references, likes: next } });
                  }}
                />
              </IntakeField>
              <IntakeField label="O que você gosta nessa referência?" htmlFor={`ref-why-${index}`}>
                <IntakeTextarea
                  id={`ref-why-${index}`}
                  className="min-h-24"
                  value={item.why}
                  onChange={(event) => {
                    const next = likes.slice();
                    next[index] = { ...item, why: event.target.value };
                    onChange({ ...answers, references: { ...answers.references, likes: next } });
                  }}
                />
              </IntakeField>
              {likes.length > 1 ? (
                <button
                  type="button"
                  className="w-fit text-sm text-muted hover:text-foreground"
                  onClick={() =>
                    onChange({
                      ...answers,
                      references: { ...answers.references, likes: likes.filter((_, itemIndex) => itemIndex !== index) },
                    })
                  }
                >
                  Remover referência
                </button>
              ) : null}
            </div>
          ))}
        </div>
        <button
          type="button"
          className="mt-3 text-sm text-primary hover:text-foreground"
          onClick={() =>
            onChange({
              ...answers,
              references: { ...answers.references, likes: [...likes, { url: "", why: "" }] },
            })
          }
        >
          Adicionar referência
        </button>
      </div>

      <IntakeField label="Existe algum exemplo que você não gosta?" htmlFor="dislikeUrl">
        <IntakeInput
          id="dislikeUrl"
          type="url"
          placeholder="https://"
          value={answers.references.dislikeUrl}
          onChange={(event) =>
            onChange({
              ...answers,
              references: { ...answers.references, dislikeUrl: event.target.value },
            })
          }
        />
      </IntakeField>
      <IntakeField label="O que você não gosta nesse exemplo?" htmlFor="dislikeWhy">
        <IntakeTextarea
          id="dislikeWhy"
          value={answers.references.dislikeWhy}
          onChange={(event) =>
            onChange({
              ...answers,
              references: { ...answers.references, dislikeWhy: event.target.value },
            })
          }
        />
      </IntakeField>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-foreground">Quais materiais você já tem?</legend>
        <p className="mb-4 text-sm text-muted">
          Nesta etapa registramos o que existe. O envio de arquivos poderá ser feito depois.
        </p>
        <div className="flex flex-wrap gap-2">
          {MATERIAL_TYPES.map((option) => {
            const selected = answers.materials.some((item) => item.type === option.value);
            return (
              <IntakeToggle
                key={option.value}
                label={option.label}
                selected={selected}
                onToggle={() => {
                  const materials = selected
                    ? answers.materials.filter((item) => item.type !== option.value)
                    : [...answers.materials, { name: option.label, type: option.value, status: "declared" as const }];
                  onChange({ ...answers, materials });
                }}
              />
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}

export function ExtraStep({
  answers,
  onChange,
}: {
  answers: IntakeAnswers;
  onChange: (next: IntakeAnswers) => void;
}) {
  return (
    <div className="grid gap-6">
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-foreground">Existe uma faixa de investimento prevista?</legend>
        <div className="grid gap-2">
          {BUDGET_RANGES.map((option) => (
            <IntakeChoice
              key={option.value}
              title={option.label}
              selected={answers.budget === option.value}
              onSelect={() => onChange({ ...answers, budget: option.value })}
            />
          ))}
        </div>
      </fieldset>
      <IntakeField label="Existe algum prazo ou data importante?" htmlFor="deadline">
        <IntakeInput
          id="deadline"
          value={answers.deadline}
          onChange={(event) => onChange({ ...answers, deadline: event.target.value })}
        />
      </IntakeField>
      <IntakeField label="Existe alguma informação importante que ainda não perguntamos?" htmlFor="extra">
        <IntakeTextarea
          id="extra"
          value={answers.extra}
          onChange={(event) => onChange({ ...answers, extra: event.target.value })}
        />
      </IntakeField>
      <fieldset>
        <legend className="mb-3 text-sm font-medium text-foreground">Como você conheceu a Bensi Labs?</legend>
        <div className="flex flex-wrap gap-2">
          {SOURCE_OPTIONS.map((option) => (
            <IntakeToggle
              key={option.value}
              label={option.label}
              selected={answers.source === option.value}
              onToggle={() => onChange({ ...answers, source: option.value })}
            />
          ))}
        </div>
      </fieldset>
      {answers.source === "other" ? (
        <IntakeField label="Onde nos conheceu?" htmlFor="sourceOther">
          <IntakeInput
            id="sourceOther"
            value={answers.sourceOther}
            onChange={(event) => onChange({ ...answers, sourceOther: event.target.value })}
          />
        </IntakeField>
      ) : null}
    </div>
  );
}

export function ReviewStep({
  projectType,
  answers,
}: {
  projectType: ProjectType | "";
  answers: IntakeAnswers;
}) {
  const typeLabel = projectType ? PROJECT_TYPE_LABELS[projectType] : "Não informado";
  const websiteObjectives = joinList(
    optionLabels(WEBSITE_OBJECTIVES, answers.website.objectives),
    answers.website.objectiveOther,
  );
  const landingObjectives = joinList(
    optionLabels(LANDING_OBJECTIVES, answers.landing.objectives),
    answers.landing.objectiveOther,
  );
  const features =
    projectType === "website"
      ? joinList(optionLabels(WEBSITE_FEATURES, answers.website.features), answers.website.featuresOther)
      : projectType === "application"
        ? answers.application.features.map((item) => item.name).filter(Boolean)
        : [];
  const integrations =
    projectType === "landing"
      ? joinList(optionLabels(LANDING_INTEGRATIONS, answers.landing.integrations), answers.landing.integrationsOther)
      : answers.application.integrations;
  const audience =
    projectType === "landing" ? answers.landing.audience : answers.company.idealClient;

  return (
    <div className="border border-border bg-surface/40 px-5 py-2">
      <h2 className="pt-4 text-lg font-medium text-foreground">Resumo do projeto</h2>
      <SummaryItem label="Empresa" value={answers.company.companyName} />
      <SummaryItem label="Responsável" value={`${answers.company.contactName} · ${answers.company.email}`} />
      <SummaryItem label="Tipo" value={typeLabel} />
      <SummaryItem label="Objetivo" value={answers.problem.desiredResult} />
      <SummaryItem label="Problema" value={answers.problem.problem} />
      <SummaryItem label="Público" value={audience} />
      {projectType === "website" ? (
        <>
          <SummaryItem label="Objetivo do site" value={websiteObjectives} />
          <SummaryItem label="Páginas" value={joinList(optionLabels(WEBSITE_PAGES, answers.website.pages), answers.website.pagesOther)} />
          <SummaryItem
            label="Conteúdo"
            value={[
              answers.website.textsExist ? `Textos: ${CONTENT_STATE_LABELS[answers.website.textsExist]}` : "",
              answers.website.imagesExist ? `Imagens: ${CONTENT_STATE_LABELS[answers.website.imagesExist]}` : "",
              answers.website.hasIdentity ? `Identidade: ${CONTENT_STATE_LABELS[answers.website.hasIdentity]}` : "",
              answers.website.hasVideo ? `Vídeo: ${YES_NO_LABELS[answers.website.hasVideo]}` : "",
            ].filter(Boolean)}
          />
        </>
      ) : null}
      {projectType === "landing" ? (
        <>
          <SummaryItem label="Oferta" value={answers.landing.offer} />
          <SummaryItem label="CTA" value={answers.landing.cta} />
          <SummaryItem label="Objetivo da landing" value={landingObjectives} />
          <SummaryItem label="Tráfego" value={joinList(optionLabels(TRAFFIC_SOURCES, answers.landing.trafficSources), answers.landing.trafficOther)} />
          <SummaryItem label="Prova social" value={optionLabels(SOCIAL_PROOF, answers.landing.socialProof)} />
        </>
      ) : null}
      {projectType === "application" ? (
        <>
          <SummaryItem label="Processo" value={answers.application.processToSystemize} />
          <SummaryItem label="Usuários" value={joinList(optionLabels(APP_USERS, answers.application.users), answers.application.usersOther)} />
          <SummaryItem label="Dados" value={joinList(optionLabels(APP_DATA_TYPES, answers.application.dataTypes), answers.application.dataOther)} />
          <SummaryItem label="Origem dos dados" value={joinList(optionLabels(APP_DATA_ORIGINS, answers.application.dataOrigins), answers.application.dataOriginsOther)} />
        </>
      ) : null}
      {projectType === "ai" ? (
        <>
          <SummaryItem label="Processo" value={answers.ai.process} />
          <SummaryItem label="Resultado automático" value={answers.ai.expectedResult} />
          <SummaryItem label="Sistemas" value={answers.ai.systems} />
        </>
      ) : null}
      {projectType === "unsure" ? (
        <SummaryItem label="O que ajudaria agora" value={answers.unsure.whatWouldHelp} />
      ) : null}
      {features.length ? <SummaryItem label="Funcionalidades" value={features} /> : null}
      <SummaryItem label="Integrações" value={integrations} />
      <SummaryItem
        label="Referências"
        value={answers.references.likes.map((item) => item.url).filter(Boolean)}
      />
      <SummaryItem
        label="Materiais"
        value={answers.materials.map((item) => optionLabel(MATERIAL_TYPES, item.type))}
      />
      <SummaryItem label="Investimento" value={answers.budget ? optionLabel(BUDGET_RANGES, answers.budget) : ""} />
      <SummaryItem label="Prazo" value={answers.deadline} />
    </div>
  );
}
