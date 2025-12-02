"use client";

import { createContext, useState, useEffect, ReactNode } from "react";

type Theme = "surf" | "farm" | "blend";

interface ThemeContextType {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({
    theme: "blend",
    setTheme: () => { },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<Theme>("blend");
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        // Load saved theme from localStorage
        const savedTheme = localStorage.getItem("surfarm-theme") as Theme;
        if (savedTheme && ["surf", "farm", "blend"].includes(savedTheme)) {
            setTheme(savedTheme);
        }
    }, []);

    useEffect(() => {
        if (!mounted) return;

        // Apply theme class to document
        document.documentElement.classList.remove("theme-farm", "theme-surf", "theme-blend");
        document.documentElement.classList.add(`theme-${theme}`);

        // Save to localStorage
        localStorage.setItem("surfarm-theme", theme);
    }, [theme, mounted]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
