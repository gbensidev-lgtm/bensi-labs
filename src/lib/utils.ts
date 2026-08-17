import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const navLinks = [
  { label: "Projetos", href: "#projects" },
  { label: "Serviços", href: "#services" },
  { label: "Sobre", href: "#about" },
  { label: "Contato", href: "#contact" },
] as const;
