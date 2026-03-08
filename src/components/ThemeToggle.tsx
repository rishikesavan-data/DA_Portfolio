import { useCallback, useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "./ui/switch";
import {
  applyTheme,
  isDaytime,
  setStoredTheme,
  type ThemeMode,
} from "@/lib/theme-utils";

const ThemeToggle = () => {
  const [mode, setMode] = useState<ThemeMode>("auto");
  const [isDark, setIsDark] = useState(false);

  const updateFromAuto = useCallback(() => {
    const day = isDaytime();
    setIsDark(!day);
    applyTheme(!day);
  }, []);

  useEffect(() => {
    // Always start in Auto mode by default
    setMode("auto");
    updateFromAuto();
  }, [updateFromAuto]);

  useEffect(() => {
    if (mode !== "auto") return;
    const id = setInterval(updateFromAuto, 60_000);
    return () => clearInterval(id);
  }, [mode, updateFromAuto]);

  const handleToggle = (checked: boolean) => {
    setIsDark(checked);
    setMode(checked ? "dark" : "light");
    setStoredTheme(checked ? "dark" : "light");
    applyTheme(checked);
  };

  const handleAuto = () => {
    setMode("auto");
    setStoredTheme("auto");
    updateFromAuto();
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
