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
  FEATURE_PRIORITY_LABELS,
  PERMISSION_ACTION_LABELS,
  YES_NO_LABELS,
  type IntakeAnswers,
} from "@/lib/intake/types";

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-t border-border pt-8">
      <h2 className="text-lg font-medium text-foreground">{title}</h2>
      <div className="mt-4 space-y-4">{children}</div>
    </section>
  );
}

function Field({ label, value }: { label: string; value?: string | string[] | null }) {
  const text = Array.isArray(value)
    ? value.filter(Boolean).join(", ")
    : value?.trim() || "Não informado";

  return (
    <div>
      <p className="font-mono text-[11px] tracking-[0.14em] text-muted uppercase">{label}</p>
      <p className="mt-1 whitespace-pre-wrap text-sm leading-relaxed text-foreground">{text}</p>
    </div>
  );
}

function joinList(values: string[], other?: string) {
  const extra = other?.trim();
  return extra ? [...values, extra] : values;
}

export function BriefingView({
  answers,
  projectType,
}: {
  answers: IntakeAnswers;
  projectType: string;
}) {
  const company = answers.company;
  const problem = answers.problem;

  return (
    <div className="space-y-2">
      <Block title="Empresa">
        <Field label="Empresa" value={company.companyName} />
        <Field label="Responsável" value={company.contactName} />
        <Field label="E-mail" value={company.email} />
        <Field label="WhatsApp / telefone" value={company.phone} />
        <Field label="Site" value={company.website} />
        <Field label="Instagram / redes" value={company.instagram} />
        <Field label="Segmento" value={company.segment} />
        <Field label="O que a empresa faz" value={company.whatCompanyDoes} />
        <Field label="Produto ou serviço principal" value={company.mainProduct} />
        <Field label="Cliente ideal" value={company.idealClient} />
      </Block>

      <Block title="Problema">
        <Field label="Por que agora" value={problem.whyNow} />
        <Field label="Problema" value={problem.problem} />
        <Field label="Solução atual" value={problem.currentSolution} />
        <Field label="O que não funciona" value={problem.whatDoesntWork} />
        <Field label="Resultado desejado" value={problem.desiredResult} />
        <Field label="Critério de sucesso" value={problem.successCriteria} />
      </Block>

      {projectType === "website" ? (
        <Block title="Requisitos — Site">
          <Field
            label="Objetivo"
            value={joinList(optionLabels(WEBSITE_OBJECTIVES, answers.website.objectives), answers.website.objectiveOther)}
          />
          <Field
            label="Páginas"
            value={joinList(optionLabels(WEBSITE_PAGES, answers.website.pages), answers.website.pagesOther)}
          />
          <Field
            label="Funcionalidades"
            value={joinList(optionLabels(WEBSITE_FEATURES, answers.website.features), answers.website.featuresOther)}
          />
          <Field
            label="Textos"
            value={answers.website.textsExist ? CONTENT_STATE_LABELS[answers.website.textsExist] : ""}
          />
          <Field
            label="Imagens"
            value={answers.website.imagesExist ? CONTENT_STATE_LABELS[answers.website.imagesExist] : ""}
          />
          <Field label="Vídeo" value={answers.website.hasVideo ? YES_NO_LABELS[answers.website.hasVideo] : ""} />
          <Field
            label="Identidade visual"
            value={answers.website.hasIdentity ? CONTENT_STATE_LABELS[answers.website.hasIdentity] : ""}
          />
          <Field
            label="Manual da marca"
            value={answers.website.hasBrandManual ? YES_NO_LABELS[answers.website.hasBrandManual] : ""}
          />
          <Field label="Manter do site atual" value={answers.website.keepFromCurrent} />
          <Field label="Mudar no site atual" value={answers.website.changeFromCurrent} />
        </Block>
      ) : null}

      {projectType === "landing" ? (
        <Block title="Requisitos — Landing Page">
          <Field label="Oferta" value={answers.landing.offer} />
          <Field label="Produto / serviço" value={answers.landing.product} />
          <Field label="Benefício principal" value={answers.landing.mainBenefit} />
          <Field label="Público" value={answers.landing.audience} />
          <Field
            label="Origem do tráfego"
            value={joinList(optionLabels(TRAFFIC_SOURCES, answers.landing.trafficSources), answers.landing.trafficOther)}
          />
          <Field
            label="Objetivo"
            value={joinList(optionLabels(LANDING_OBJECTIVES, answers.landing.objectives), answers.landing.objectiveOther)}
          />
          <Field label="CTA" value={answers.landing.cta} />
          <Field label="Formulário" value={answers.landing.formFields} />
          <Field
            label="Integrações"
            value={joinList(optionLabels(LANDING_INTEGRATIONS, answers.landing.integrations), answers.landing.integrationsOther)}
          />
          <Field label="Prova social" value={optionLabels(SOCIAL_PROOF, answers.landing.socialProof)} />
        </Block>
      ) : null}

      {projectType === "application" ? (
        <Block title="Requisitos — Aplicação">
          <Field label="Processo" value={answers.application.processToSystemize} />
          <Field label="Processo atual" value={answers.application.currentProcess} />
          <Field
            label="Usuários"
            value={joinList(optionLabels(APP_USERS, answers.application.users), answers.application.usersOther)}
          />
          {answers.application.features
            .filter((item) => item.name || item.description)
            .map((item, index) => (
              <Field
                key={`${item.name}-${index}`}
                label={`Funcionalidade ${index + 1}`}
                value={`${item.name || "Sem nome"} — ${item.description || "PENDING"} · ${item.owner || "PENDING"} · ${FEATURE_PRIORITY_LABELS[item.priority]}`}
              />
            ))}
          <Field
            label="Dados"
            value={joinList(optionLabels(APP_DATA_TYPES, answers.application.dataTypes), answers.application.dataOther)}
          />
          <Field
            label="Origem dos dados"
            value={joinList(optionLabels(APP_DATA_ORIGINS, answers.application.dataOrigins), answers.application.dataOriginsOther)}
          />
          <Field label="Integrações" value={answers.application.integrations} />
          {Object.entries(answers.application.permissions).map(([role, actions]) => (
            <Field
              key={role}
              label={`Permissões · ${optionLabel(APP_USERS, role)}`}
              value={actions.map((action) => PERMISSION_ACTION_LABELS[action]).join(", ")}
            />
          ))}
        </Block>
      ) : null}

      {projectType === "ai" ? (
        <Block title="Requisitos — IA / Automação">
          <Field label="Processo" value={answers.ai.process} />
          <Field label="Frequência" value={answers.ai.frequency} />
          <Field label="Tempo gasto hoje" value={answers.ai.timeSpent} />
          <Field label="Como é feito hoje" value={answers.ai.currentProcess} />
          <Field label="Sistemas" value={answers.ai.systems} />
          <Field label="Dados de entrada" value={answers.ai.dataIn} />
          <Field label="Resultado esperado" value={answers.ai.expectedResult} />
          <Field label="Decisão humana" value={answers.ai.humanDecision} />
          <Field label="Exemplo real" value={answers.ai.realExample} />
        </Block>
      ) : null}

      {projectType === "unsure" ? (
        <Block title="Requisitos — Ainda não definido">
          <Field label="O que ajudaria agora" value={answers.unsure.whatWouldHelp} />
          <Field label="Já existe algo em mente" value={answers.unsure.hasSomethingInMind} />
          <Field label="Processo que consome tempo" value={answers.unsure.timeConsumingProcess} />
        </Block>
      ) : null}

      <Block title="Referências">
        {answers.references.likes
          .filter((item) => item.url || item.why)
          .map((item, index) => (
            <Field key={`${item.url}-${index}`} label={`Referência ${index + 1}`} value={`${item.url}${item.why ? ` — ${item.why}` : ""}`} />
          ))}
        <Field label="Exemplo que não gosta" value={`${answers.references.dislikeUrl}${answers.references.dislikeWhy ? ` — ${answers.references.dislikeWhy}` : ""}`} />
      </Block>

      <Block title="Materiais">
        <Field
          label="Declarados"
          value={answers.materials.map((item) => `${optionLabel(MATERIAL_TYPES, item.type)} (${item.status})`)}
        />
      </Block>

      <Block title="Informações adicionais">
        <Field label="Investimento" value={answers.budget ? optionLabel(BUDGET_RANGES, answers.budget) : ""} />
        <Field label="Prazo" value={answers.deadline} />
        <Field
          label="Como conheceu"
          value={
            answers.source
              ? `${optionLabel(SOURCE_OPTIONS, answers.source)}${answers.sourceOther ? ` — ${answers.sourceOther}` : ""}`
              : ""
          }
        />
        <Field label="Observações" value={answers.extra} />
      </Block>
    </div>
  );
}
