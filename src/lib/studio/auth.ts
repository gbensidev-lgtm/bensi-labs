"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { safeAdminPath } from "@/lib/studio/paths";

export type SignInState = {
  error: string;
} | null;

export async function signIn(_prev: SignInState, formData: FormData): Promise<SignInState> {
  if (!isSupabaseConfigured()) {
    return { error: "Não foi possível entrar. Tente novamente mais tarde." };
  }

  const email = String(formData.get("email") || "").trim();
  const password = String(formData.get("password") || "");
  const next = safeAdminPath(String(formData.get("next") || ""));

  if (!email || !password) {
    return { error: "Não foi possível entrar. Verifique o e-mail e a senha." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    console.warn("[studio login]", error.code ?? "no_code", error.message);

    if (error.code === "email_not_confirmed" || /email not confirmed/i.test(error.message)) {
      return {
        error:
          "Este e-mail ainda não foi confirmado. No Supabase, desative Confirm email ou recrie o usuário com Auto Confirm User.",
      };
    }

    if (/invalid api key|jwt/i.test(error.message)) {
      return { error: "Não foi possível entrar. Tente novamente mais tarde." };
    }

    return { error: "Não foi possível entrar. Verifique o e-mail e a senha." };
  }

  redirect(next);
}
