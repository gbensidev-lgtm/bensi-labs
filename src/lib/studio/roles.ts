export const STUDIO_ROLES = ["ADMIN", "EDITOR", "CLIENT"] as const;

export type StudioRole = (typeof STUDIO_ROLES)[number];

export function canAccessStudio(role: StudioRole) {
  return role === "ADMIN" || role === "EDITOR";
}

export function canManageStudio(role: StudioRole) {
  return role === "ADMIN";
}
