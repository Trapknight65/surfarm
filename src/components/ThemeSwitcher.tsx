"use client";

import { useContext } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function ThemeSwitcher() {
    const { theme, setTheme } = useContext(ThemeContext);

    const themes = [
        { id: "surf", label: "Surf", color: "#00B4D8", emoji: "🌊" },
        { id: "farm", label: "Farm", color: "#4CAF50", emoji: "🌱" },
        { id: "blend", label: "Blend", color: "#2E7D6E", emoji: "🌿" },
    ] as const;

    return (
        <div className="fixed bottom-6 right-6 z-50">
            <div className="neu-convex p-3 rounded-full backdrop-blur-sm">
                <div className="flex gap-2">
                    {themes.map((t) => (
                        <button
                            key={t.id}
                            onClick={() => setTheme(t.id)}
                            className={`px-5 py-3 rounded-full font-medium transition-all ripple ${theme === t.id
                                    ? "neu-pressed scale-105"
                                    : "neu-btn hover:scale-105"
                                }`}
                            style={{
                                background: theme === t.id ? `linear-gradient(135deg, ${t.color}15, ${t.color}05)` : undefined,
                            }}
                            aria-label={`Switch to ${t.label} theme`}
                        >
                            <span className="text-2xl">{t.emoji}</span>
                            <span className={`ml-2 text-sm font-semibold ${theme === t.id ? 'text-accent' : 'text-text/60'}`}>
                                {t.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
