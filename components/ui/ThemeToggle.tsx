"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Button } from "@/components/form-contact/button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // Éviter l'hydratation mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="w-10 h-10 p-0 bg-background/50 border-border/50 hover:bg-accent/50"
      >
        <div className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="w-10 h-10 p-0 bg-background/50 border-border/50 hover:bg-accent/50 transition-all duration-300"
      title={`Basculer vers le mode ${theme === "light" ? "sombre" : "clair"}`}
    >
      {theme === "light" ? (
        <Moon className="h-4 w-4 text-foreground" />
      ) : (
        <Sun className="h-4 w-4 text-foreground" />
      )}
      <span className="sr-only">Basculer le thème</span>
    </Button>
  );
}

// Version avec dropdown pour plus d'options
export function ThemeToggleDropdown() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="w-10 h-10 p-0">
        <div className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="relative group">
      <Button
        variant="outline"
        size="sm"
        className="w-10 h-10 p-0 bg-background/50 border-border/50 hover:bg-accent/50 transition-all duration-300"
      >
        {theme === "light" ? (
          <Sun className="h-4 w-4" />
        ) : theme === "dark" ? (
          <Moon className="h-4 w-4" />
        ) : (
          <div className="h-4 w-4 rounded-full bg-gradient-to-r from-sun to-moon" />
        )}
      </Button>
      
      {/* Dropdown */}
      <div className="absolute right-0 top-12 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        <div className="p-1 min-w-[120px]">
          <button
            onClick={() => setTheme("light")}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
          >
            <Sun className="h-4 w-4" />
            Clair
          </button>
          <button
            onClick={() => setTheme("dark")}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
          >
            <Moon className="h-4 w-4" />
            Sombre
          </button>
          <button
            onClick={() => setTheme("system")}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent rounded-md transition-colors"
          >
            <div className="h-4 w-4 rounded-full bg-gradient-to-r from-yellow-400 to-blue-600" />
            Système
          </button>
        </div>
      </div>
    </div>
  );
}


