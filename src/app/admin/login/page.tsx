import type { Metadata } from "next";
import Image from "next/image";
import { LoginForm } from "@/components/studio/LoginForm";

export const metadata: Metadata = {
  title: "Entrar",
  robots: { index: false, follow: false },
};

type LoginPageProps = {
  searchParams: Promise<{ next?: string; reason?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;

  return (
    <div className="studio-login-field relative flex min-h-dvh items-center justify-center px-4 py-12">
      <div className="w-full max-w-[400px]">
        <div className="mb-10 flex flex-col items-center text-center">
          <Image
            src="/brand/logo-icon.webp"
            alt="Bensi Labs"
            width={56}
            height={56}
            priority
            className="h-14 w-14"
          />
          <h1 className="mt-6 text-2xl font-semibold tracking-[0.14em] text-foreground uppercase">
            Bensi Labs Studio
          </h1>
          <p className="mt-2 font-mono text-sm tracking-[0.18em] text-muted uppercase">
            Área administrativa
          </p>
        </div>

        <div className="rounded-[var(--radius-card)] border border-border bg-surface/80 p-6 md:p-7">
          <LoginForm nextPath={params.next} reason={params.reason} />
        </div>
      </div>
    </div>
  );
}
