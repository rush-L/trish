import type Lenis from "lenis";

/**
 * Shared handle to the app's single Lenis instance so components outside
 * SmoothScroll (e.g. the mobile chapter menu) can stop/start scrolling —
 * used to lock the page while a full-screen overlay is open.
 */
export const lenisController: { instance: Lenis | null } = { instance: null };
