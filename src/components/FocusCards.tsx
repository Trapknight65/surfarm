"use client";

import { Info, Calendar, Sprout } from 'lucide-react';

const sections = [
    {
        id: 1,
        title: "About Us",
        description: "Discover where ocean meets community. We're more than a surf school – we're a sustainable lifestyle.",
        icon: Info,
        color: "text-accent",
    },
    {
        id: 2,
        title: "Book a Lesson",
        description: "Experience pure surf with expert instructors. From beginners to advanced, we've got you covered.",
        icon: Calendar,
        color: "text-accent",
    },
    {
        id: 3,
        title: "Plant Your Seed",
        description: "Join our fertile social fabric. Build connections, grow together, and cultivate community.",
        icon: Sprout,
        color: "text-accent",
    },
];

export default function FocusCards() {
    return (
        <section className="py-20 px-6 bg-bg">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <div className="neu-convex inline-block px-8 py-4 rounded-full mb-6">
                        <h2 className="text-sm font-bold text-accent uppercase tracking-wider">Our Philosophy</h2>
                    </div>
                    <h3 className="text-4xl md:text-5xl font-bold text-text mb-4">Three Pillars of Surf Farm</h3>
                    <p className="text-xl text-text/60 max-w-2xl mx-auto">
                        Grounded in the ocean, pure in practice, fertile in community
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {sections.map((section, index) => (
                        <div
                            key={section.id}
                            className="neu-card group cursor-pointer"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            {/* Icon */}
                            <div className="neu-pressed w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                <section.icon size={32} className={section.color} />
                            </div>

                            {/* Content */}
                            <h4 className="text-2xl font-bold text-text mb-4">{section.title}</h4>
                            <p className="text-text/70 leading-relaxed">{section.description}</p>

                            {/* Learn More Link */}
                            <div className="mt-6 flex items-center gap-2 text-accent font-medium group-hover:gap-4 transition-all">
                                <span>Learn more</span>
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
