"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ExtraStep, ReferencesStep, ReviewStep } from "@/components/intake/final-steps";
import { IntakeError } from "@/components/intake/fields";
import { CompanyStep, ProblemStep, SpecificStep, TypeStep } from "@/components/intake/steps";
import { INTAKE_STEPS } from "@/lib/intake/options";
import { emptyAnswers, type IntakeAnswers, type ProjectType } from "@/lib/intake/types";
import { validateStep } from "@/lib/intake/validate";

const TOTAL = INTAKE_STEPS.length;

export function IntakeFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [projectType, setProjectType] = useState<ProjectType | "">("");
  const [answers, setAnswers] = useState<IntakeAnswers>(emptyAnswers);
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [honeypot, setHoneypot] = useState("");

  const current = INTAKE_STEPS[step];
  const progress = ((step + 1) / TOTAL) * 100;

  function goNext() {
    const message = validateStep(step, projectType, answers);
    if (message) {
      setError(message);
      return;
    }
    setError("");
    setStep((value) => Math.min(value + 1, TOTAL - 1));
  }

  function goBack() {
    setError("");
    setStep((value) => Math.max(value - 1, 0));
  }

  async function submit() {
    const message = validateStep(0, projectType, answers) || validateStep(1, projectType, answers) || validateStep(2, projectType, answers) || validateStep(3, projectType, answers);
    if (message) {
      setError(message);
      return;
    }

    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          projectType,
          answers,
          website_confirm: honeypot,
        }),
      });

      if (!response.ok) {
        setError("Não foi possível enviar o projeto. Tente novamente em instantes.");
        setPending(false);
        return;
      }

      router.push("/briefing/enviado");
    } catch {
      setError("Não foi possível enviar o projeto. Tente novamente em instantes.");
      setPending(false);
    }
  }

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8">
        <p className="font-mono text-xs tracking-[0.2em] text-muted uppercase">
          {String(step + 1).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
        </p>
        <div className="mt-3 h-px bg-border">
          <div className="h-px bg-primary transition-[width] duration-300" style={{ width: `${progress}%` }} />
        </div>
        <h1 className="mt-6 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">{current.title}</h1>
        {step === 0 ? (
          <p className="mt-3 text-base leading-relaxed text-muted">
            Que tipo de projeto você está buscando? Escolha a opção mais próxima. Se ainda não tiver certeza, começamos pelo problema.
          </p>
        ) : null}
      </div>

      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (step === TOTAL - 1) {
            void submit();
            return;
          }
          goNext();
        }}
        className="space-y-8"
      >
        <div className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden="true">
          <label>
            Website confirm
            <input
              tabIndex={-1}
              autoComplete="off"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
            />
          </label>
        </div>

        {step === 0 ? <TypeStep value={projectType} onChange={setProjectType} /> : null}
        {step === 1 ? <CompanyStep answers={answers} onChange={setAnswers} /> : null}
        {step === 2 ? <ProblemStep answers={answers} onChange={setAnswers} /> : null}
        {step === 3 ? (
          <SpecificStep projectType={projectType} answers={answers} onChange={setAnswers} />
        ) : null}
        {step === 4 ? <ReferencesStep answers={answers} onChange={setAnswers} /> : null}
        {step === 5 ? <ExtraStep answers={answers} onChange={setAnswers} /> : null}
        {step === 6 ? <ReviewStep projectType={projectType} answers={answers} /> : null}

        <IntakeError message={error} />

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
          {step > 0 ? (
            <button
              type="button"
              onClick={goBack}
              className="inline-flex min-h-11 cursor-pointer items-center text-sm text-muted transition-colors hover:text-foreground"
            >
              Voltar
            </button>
          ) : (
            <span />
          )}
          <button
            type="submit"
            disabled={pending}
            className="inline-flex min-h-11 cursor-pointer items-center justify-center rounded-[var(--radius-button)] border border-primary/25 bg-primary/10 px-5 text-sm font-medium text-foreground transition-colors hover:border-primary/50 hover:bg-primary/18 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {pending ? "Enviando…" : step === TOTAL - 1 ? "Enviar projeto" : "Continuar"}
          </button>
        </div>
      </form>
    </div>
  );
}
