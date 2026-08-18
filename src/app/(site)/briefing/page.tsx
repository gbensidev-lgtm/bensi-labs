import type { Metadata } from "next";
import { IntakeFlow } from "@/components/intake/IntakeFlow";

export const metadata: Metadata = {
  title: "Começar um projeto — Bensi Labs",
  description:
    "Conte o que você precisa. A Bensi Labs analisa o problema e transforma a necessidade em uma solução digital.",
};

export default function BriefingPage() {
  return (
    <div className="border-t border-border/40 pt-24 pb-20 md:pt-28 md:pb-28">
      <div className="container">
        <p className="mb-10 max-w-xl text-sm leading-relaxed text-muted">
          O site apresenta a Bensi Labs. Este fluxo coleta o contexto do seu projeto. As informações ficam no ambiente operacional privado do estúdio.
        </p>
        <IntakeFlow />
      </div>
    </div>
  );
}
