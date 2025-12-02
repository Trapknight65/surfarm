"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <header className="w-full backdrop-blur-md sticky top-0 shadow-sm border-b border-gray-200 z-50 p-4">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20">
                    {/* Logo */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
                            <div className="neu-pressed w-12 h-12 rounded-full flex items-center justify-center">
                                <span className="text-accent text-xl">🌊</span>
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-accent font-extrabold">Surf</span>
                                <span className="text-text font-extrabold -mt-1">Farm</span>
                            </div>
                        </Link>
                    </div>
                    {/* Navigation */}
                    <nav className="hidden md:flex gap-4">
                        <Link
                            href="#about"
                            className="neu-btn px-6 py-3 text-text/80 hover:text-accent font-medium"
                        >
                            About
                        </Link>
                        <Link
                            href="#lessons"
                            className="neu-btn px-6 py-3 text-text/80 hover:text-accent font-medium"
                        >
                            Lessons
                        </Link>
                        <Link
                            href="#community"
                            className="neu-btn px-6 py-3 bg-accent text-white shadow-lg hover:shadow-xl"
                            style={{ boxShadow: '6px 6px 12px var(--neu-shadow-dark), -6px -6px 12px var(--neu-shadow-light)' }}
                        >
                            Join Us
                        </Link>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button className="md:hidden neu-btn p-3 rounded-full">
                        <svg className="w-6 h-6 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-pure-white border-t border-gray-200 shadow-lg">
                    <nav className="px-4 py-4 space-y-3">
                        {['about', 'lessons', 'community'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase()}`}
                                className="block py-2 text-base font-medium text-text hover:text-accent transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <Link
                            href="/contact"
                            className="block w-full text-center px-6 py-3 bg-accent text-white rounded-full font-semibold hover:bg-electric-blue transition-all shadow-md mt-4"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Join Us
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}