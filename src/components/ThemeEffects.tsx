"use client";

import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/contexts/ThemeContext";

export default function ThemeEffects() {
    const { theme } = useContext(ThemeContext);
    const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number; size: number }>>([]);

    useEffect(() => {
        // Generate particles based on theme
        if (theme === "surf") {
            // Water bubbles
            const bubbles = Array.from({ length: 15 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 8,
                size: 20 + Math.random() * 60,
            }));
            setParticles(bubbles);
        } else if (theme === "farm") {
            // Leaves
            const leaves = Array.from({ length: 10 }, (_, i) => ({
                id: i,
                left: Math.random() * 100,
                delay: Math.random() * 12,
                size: 15 + Math.random() * 25,
            }));
            setParticles(leaves);
        } else {
            setParticles([]);
        }
    }, [theme]);

    if (theme === "blend") return null;

    return (
        <div className="particle-container">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className={theme === "surf" ? "bubble" : "leaf"}
                    style={{
                        left: `${particle.left}%`,
                        width: `${particle.size}px`,
                        height: `${particle.size}px`,
                        animationDelay: `${particle.delay}s`,
                    }}
                />
            ))}
        </div>
    );
}
