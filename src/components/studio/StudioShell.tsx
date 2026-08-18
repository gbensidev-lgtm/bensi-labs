"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  IconBriefings,
  IconClients,
  IconClose,
  IconCreatives,
  IconDashboard,
  IconMenu,
  IconProjects,
  IconSettings,
  IconTemplates,
} from "@/components/studio/icons";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: IconDashboard },
  { href: "/admin/clients", label: "Clientes", icon: IconClients },
  { href: "/admin/briefings", label: "Briefings", icon: IconBriefings },
  { href: "/admin/projects", label: "Projetos", icon: IconProjects },
  { href: "/admin/creatives", label: "Criativos", icon: IconCreatives },
  { href: "/admin/templates", label: "Templates", icon: IconTemplates },
  { href: "/admin/settings", label: "Configurações", icon: IconSettings },
];

function BrandMark() {
  return (
    <div className="flex items-center gap-3 px-1">
      <Image
        src="/brand/logo-icon.webp"
        alt=""
        width={36}
        height={36}
        className="h-9 w-9"
        priority
      />
      <div className="leading-none">
        <p className="text-sm font-bold tracking-[0.18em] text-foreground uppercase">Bensi</p>
        <p className="text-gradient-brand text-[11px] font-medium tracking-[0.32em] uppercase">Labs</p>
        <p className="mt-1 font-mono text-[10px] tracking-[0.28em] text-muted uppercase">Studio</p>
      </div>
    </div>
  );
}

function NavList({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Studio" className="flex flex-1 flex-col gap-1">
      {NAV.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex min-h-11 items-center gap-3 rounded-[var(--radius-button)] px-3 text-sm transition-colors duration-150",
              active
                ? "bg-primary/12 text-foreground"
                : "text-muted hover:bg-surface hover:text-foreground",
            )}
          >
            <Icon className={cn("h-4 w-4", active ? "text-primary" : "text-current")} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

function SignOutButton() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  async function signOut() {
    setPending(true);
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
    } finally {
      router.replace("/admin/login");
      router.refresh();
    }
  }

  return (
    <button
      type="button"
      onClick={signOut}
      disabled={pending}
      className="flex min-h-11 w-full cursor-pointer items-center rounded-[var(--radius-button)] px-3 text-sm text-muted transition-colors duration-150 hover:bg-surface hover:text-foreground disabled:opacity-50"
    >
      {pending ? "Saindo…" : "Sair"}
    </button>
  );
}

function SidebarFooter() {
  return (
    <div className="border-t border-border pt-4">
      <p className="px-3 font-mono text-[11px] tracking-[0.16em] text-muted uppercase">
        Bensi Labs Studio
      </p>
      <p className="mt-1 px-3 font-mono text-[11px] text-muted">v0.1</p>
      <div className="mt-3">
        <SignOutButton />
      </div>
    </div>
  );
}

export function StudioShell({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-dvh bg-background lg:grid lg:grid-cols-[240px_1fr]">
      <aside className="hidden border-r border-border bg-[#12151b] lg:flex lg:flex-col lg:px-4 lg:py-6">
        <BrandMark />
        <div className="mt-8 flex min-h-0 flex-1 flex-col">
          <NavList />
          <SidebarFooter />
        </div>
      </aside>

      <div className="flex min-h-dvh flex-col">
        <header className="flex items-center justify-between border-b border-border px-4 py-3 lg:hidden">
          <BrandMark />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-[var(--radius-button)] border border-border text-foreground"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <IconClose className="h-5 w-5" /> : <IconMenu className="h-5 w-5" />}
          </button>
        </header>

        {open ? (
          <div className="border-b border-border bg-[#12151b] px-4 py-4 lg:hidden">
            <NavList onNavigate={() => setOpen(false)} />
            <div className="mt-4">
              <SidebarFooter />
            </div>
          </div>
        ) : null}

        <div className="flex-1 px-4 py-6 md:px-8 md:py-8">{children}</div>
      </div>
    </div>
  );
}
