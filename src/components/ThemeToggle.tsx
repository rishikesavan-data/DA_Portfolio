import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/switch";
import {
  applyTheme,
  isDaytime,
  type ThemeMode,
} from "@/lib/theme-utils";

const ThemeToggle = () => {
  const [mode, setMode] = useState<ThemeMode>("auto");
  const [isDark, setIsDark] = useState(false);

  const updateFromAuto = useCallback((silent = false) => {
    const day = isDaytime();
    const shouldBeDark = !day;
    
    setIsDark((prev) => {
      if (prev !== shouldBeDark) {
        applyTheme(shouldBeDark);
        // Sync other toggles if this update happened automatically
        if (!silent) {
          window.dispatchEvent(
            new CustomEvent("sync-theme-toggle", {
              detail: { newMode: "auto", newIsDark: shouldBeDark },
            })
          );
        }
        return shouldBeDark;
      }
      return prev;
    });
  }, []);

  useEffect(() => {
    // Listen for sync events from other toggle instances
    const handleSync = (e: Event) => {
      const customEvent = e as CustomEvent;
      const { newMode, newIsDark } = customEvent.detail;
      setMode(newMode);
      setIsDark(newIsDark);
    };
    window.addEventListener("sync-theme-toggle", handleSync);

    // Initial check on mount
    updateFromAuto(true);

    return () => window.removeEventListener("sync-theme-toggle", handleSync);
  }, [updateFromAuto]);

  useEffect(() => {
    if (mode !== "auto") return;
    // Check every second to ensure real-time transition at threshold hour
    const id = setInterval(() => updateFromAuto(false), 1000);
    return () => clearInterval(id);
  }, [mode, updateFromAuto]);

  const handleToggle = (checked: boolean) => {
    const newMode = checked ? "dark" : "light";
    setIsDark(checked);
    setMode(newMode);
    applyTheme(checked);
    
    // Sync other instances
    window.dispatchEvent(
      new CustomEvent("sync-theme-toggle", {
        detail: { newMode, newIsDark: checked },
      })
    );
  };

  const handleAuto = () => {
    setMode("auto");
    const day = isDaytime();
    const shouldBeDark = !day;
    setIsDark(shouldBeDark);
    applyTheme(shouldBeDark);
    
    // Update other instances to auto mode
    window.dispatchEvent(
      new CustomEvent("sync-theme-toggle", {
        detail: { newMode: "auto", newIsDark: shouldBeDark },
      })
    );
  };

  return (
    <div className="inline-flex items-center gap-2">
      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 glass-panel hover-lift glow-border"
        onClick={() => handleToggle(!isDark)}
        aria-label="Toggle dark mode"
      >
        <div className="hidden text-xs font-medium text-muted-foreground md:inline">
          {mode === "auto" ? "Auto" : isDark ? "Dark" : "Light"}
        </div>
        <div className="flex items-center gap-2">
          <Sun
            size={16}
            className={`text-yellow-400 transition-opacity ${isDark ? "opacity-0" : "opacity-100"}`}
          />
          <Moon
            size={16}
            className={`text-blue-300 transition-opacity ${isDark ? "opacity-100" : "opacity-0"}`}
          />
          <Switch checked={isDark} onCheckedChange={handleToggle} />
        </div>
      </button>
      {mode !== "auto" && (
        <button
          type="button"
          onClick={handleAuto}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors underline underline-offset-2"
        >
          Auto
        </button>
      )}
    </div>
  );
};

export default ThemeToggle;
