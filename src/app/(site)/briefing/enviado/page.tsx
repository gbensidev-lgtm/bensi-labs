import type { Metadata } from "next";
import Link from "next/link";
import { MagneticButton } from "@/components/MagneticButton";

export const metadata: Metadata = {
  title: "Recebemos seu projeto — Bensi Labs",
  robots: { index: false, follow: false },
};

export default function BriefingSentPage() {
  return (
    <div className="flex min-h-dvh items-center pt-24 pb-20">
      <div className="container max-w-2xl">
        <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
          Recebemos seu projeto.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Obrigado por compartilhar sua ideia com a Bensi Labs.
        </p>
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          Vamos analisar as informações enviadas e entender a melhor forma de transformar essa necessidade em uma solução digital.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <MagneticButton href="/" variant="primary">
            Voltar ao site
          </MagneticButton>
          <Link
            href="/#contact"
            className="inline-flex min-h-11 items-center text-sm text-muted hover:text-foreground"
          >
            Falar no WhatsApp
          </Link>
        </div>
      </div>
    </div>
  );
}
