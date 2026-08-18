export function safeAdminPath(next: string | null | undefined) {
  if (!next) return "/admin/dashboard";
  if (!next.startsWith("/admin")) return "/admin/dashboard";
  if (next.startsWith("//") || next.includes("://")) return "/admin/dashboard";
  if (next.startsWith("/admin/login")) return "/admin/dashboard";
  return next;
}
