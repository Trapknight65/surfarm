/**
 * Author: Allan Deschamps
 * Surf Farm - Page Navigation Component
 */
'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { LucideIcon, Compass, ChevronLeft } from 'lucide-react';
import { useState } from 'react';

interface NavigationCard {
    title: string;
    href: string;
    icon: LucideIcon;
}

interface PageNavigationProps {
    cards: NavigationCard[];
}

const PageNavigation = ({ cards }: PageNavigationProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const toggleMenu = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <>
            {/* Mobile: Expandable Menu with Compass Button */}
            <div className="md:hidden fixed bottom-32 -translate-y-1/2 right-4 z-40">
                {/* Toggle Button */}
                <motion.button
                    onClick={toggleMenu}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="bg-gradient-to-br from-green-400 to-blue-500 p-3.5 rounded-xl shadow-2xl touch-target mb-3 border-2 border-white/30"
                    aria-label="Toggle page navigation"
                >
                    <motion.div
                        animate={{
                            rotate: isExpanded ? 180 : 0,
                            scale: isExpanded ? 0.9 : 1
                        }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                        {isExpanded ? (
                            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={3} />
                        ) : (
                            <Compass className="w-5 h-5 text-white" strokeWidth={2.5} />
                        )}
                    </motion.div>
                </motion.button>

                {/* Expandable Menu */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ opacity: 0, x: 20, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            className="bg-gradient-to-br from-green-400 to-blue-600 rounded-xl"
                        >
                            <div className="glass p-2 rounded-xl shadow-xl">
                                <div className="flex flex-col gap-2">
                                    {cards.map((card, index) => (
                                        <motion.div
                                            key={card.href}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ delay: index * 0.05, duration: 0.2 }}
                                        >
                                            <Link href={card.href} onClick={() => setIsExpanded(false)}>
                                                <motion.div
                                                    whileHover={{ scale: 1.05, x: -2 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    className="w-[100px] h-[70px] bg-white/50 rounded-lg flex flex-col items-center justify-center gap-1.5 hover:bg-white/70 transition-colors cursor-pointer shadow-sm hover:neumorphic-pressed touch-target"
                                                >
                                                    <card.icon className="w-5 h-5 text-gray-700" />
                                                    <span className="text-xs font-semibold text-gray-800">
                                                        {card.title}
                                                    </span>
                                                </motion.div>
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Desktop: Always Visible Navigation - Horizontal at Bottom */}
            <div className="hidden md:block fixed bottom-6 right-6 -translate-x-1/2 z-40 bg-gradient-to-br from-green-400 to-blue-600 rounded-2xl">
                <div className="glass p-3 rounded-2xl shadow-xl">
                    <div className="flex flex-row gap-3">
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.href}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <Link href={card.href}>
                                    <motion.div
                                        whileHover={{ scale: 1.05, y: -2 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="w-[120px] h-[80px] bg-white/50 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-white/70 transition-colors cursor-pointer shadow-sm hover:neumorphic-pressed touch-target"
                                    >
                                        <card.icon className="w-6 h-6 text-gray-700" />
                                        <span className="text-xs font-semibold text-gray-800">
                                            {card.title}
                                        </span>
                                    </motion.div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default PageNavigation;
