/**
 * Author: Allan Deschamps
 * Surf Farm - Page Navigation Component
 */
'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface NavigationCard {
    title: string;
    href: string;
    icon: LucideIcon;
}

interface PageNavigationProps {
    cards: NavigationCard[];
}

const PageNavigation = ({ cards }: PageNavigationProps) => {
    return (
        <div className="fixed bottom-6 right-6 z-40 bg-gradient-to-br from-green-400 to-blue-600 rounded-2xl">
            <div className="glass p-3 rounded-2xl shadow-xl">
                <div className="flex gap-3">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.href}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link href={card.href}>
                                <motion.div
                                    whileHover={{ scale: 1.05, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="w-[120px] h-[80px] bg-white/50 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-white/70 transition-colors cursor-pointer shadow-sm hover:neumorphic-pressed "
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
    );
};

export default PageNavigation;
