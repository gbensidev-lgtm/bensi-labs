"use client";

import { useActionState } from "react";
import { signIn, type SignInState } from "@/lib/studio/auth";
import { StudioButton, StudioField, StudioInput } from "@/components/studio/ui";

type LoginFormProps = {
  nextPath?: string;
  reason?: string;
};

export function LoginForm({ nextPath, reason }: LoginFormProps) {
  const initialError: SignInState =
    reason === "expired" ? { error: "Sessão expirada. Entre novamente." } : null;
  const [state, action, pending] = useActionState(signIn, initialError);

  return (
    <form action={action} className="space-y-5">
      <input type="hidden" name="next" value={nextPath || "/admin/dashboard"} />

      <StudioField label="E-mail" htmlFor="email">
        <StudioInput
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
        />
      </StudioField>

      <StudioField label="Senha" htmlFor="password">
        <StudioInput
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
        />
      </StudioField>

      {state?.error ? (
        <p className="text-sm text-[#f87171]" role="alert">
          {state.error}
        </p>
      ) : null}

      <StudioButton type="submit" disabled={pending} className="w-full">
        {pending ? "Entrando…" : "Entrar"}
      </StudioButton>
    </form>
  );
}
