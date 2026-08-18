/**
 * Screenshot slots for Studio projects.
 * Desktop / mobile / thumbnail / image are stored on the project record.
 * Capture automation already lives in scripts/capture-project-screenshots.mjs
 * (Playwright). Do not add Playwright to the app runtime in v0.1.
 */
export type ScreenshotSlot = "desktop" | "mobile" | "thumbnail" | "image";
