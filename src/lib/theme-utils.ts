export type ThemeMode = "auto" | "light" | "dark";

const LIGHT_START_HOUR = 6;  // 6:00 AM
const LIGHT_END_HOUR = 18;   // 6:00 PM

export function getStoredTheme(): ThemeMode {
  const stored = window.localStorage.getItem("theme") as ThemeMode | null;
  if (stored === "auto" || stored === "light" || stored === "dark") return stored;
  return "auto";
}

export function setStoredTheme(mode: ThemeMode) {
  window.localStorage.setItem("theme", mode);
}

/** Light theme: 6:00 AM - 6:00 PM. Dark theme: 6:00 PM - 6:00 AM. */
export function isDaytime(): boolean {
  const now = new Date();
  const hour = now.getHours();
  return hour >= LIGHT_START_HOUR && hour < LIGHT_END_HOUR;
}

export function applyTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  window.dispatchEvent(
    new CustomEvent("theme-change", { detail: { isDark } }),
  );
}
