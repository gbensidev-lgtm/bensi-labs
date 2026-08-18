export type ActivityAction =
  | "login"
  | "logout"
  | "project.create"
  | "project.update"
  | "project.delete"
  | "creative.create"
  | "creative.update"
  | "creative.export"
  | "creative.delete";

type ActivityInput = {
  action: ActivityAction;
  entityType?: "project" | "creative" | "template";
  entityId?: string;
};

export async function recordActivity(input: ActivityInput) {
  void input;
  // Reserved for Studio v0.2 — login, edits, exports and deletions.
}
