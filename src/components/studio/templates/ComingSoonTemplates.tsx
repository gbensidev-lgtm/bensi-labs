export function EducationalTemplate() {
  return (
    <article className="relative flex h-[675px] w-[540px] flex-col justify-between overflow-hidden bg-background p-10 text-foreground">
      <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">Bensi Labs</p>
      <div>
        <p className="font-mono text-xs tracking-[0.22em] text-muted uppercase">Insight / 01</p>
        <h1 className="mt-5 text-4xl leading-[1.05] font-bold tracking-tight">
          Sua empresa
          <br />
          ainda depende
          <br />
          de planilhas?
        </h1>
      </div>
      <p className="max-w-sm text-lg leading-snug text-muted">
        Talvez o problema não seja a planilha.
        <br />
        Talvez seja o processo.
      </p>
    </article>
  );
}

export function BrandTemplate() {
  return (
    <article className="relative flex h-[675px] w-[540px] flex-col items-center justify-center overflow-hidden bg-background p-10 text-center text-foreground">
      <p className="font-mono text-xs tracking-[0.28em] text-primary uppercase">Bensi Labs</p>
      <h1 className="mt-8 text-4xl font-bold tracking-tight">Brand / Announcement</h1>
      <p className="mt-4 text-muted">Em breve.</p>
    </article>
  );
}
