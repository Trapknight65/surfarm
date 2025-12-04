/**
 * Author: Allan Deschamps
 * Surf Farm - Mission Cards Component
 */
'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Leaf, Waves, HeartHandshake, ArrowRight } from 'lucide-react';

const cards = [
    {
        id: 'mission',
        title: 'Our Mission',
        description: 'Cultivating organic habits and surf culture in Costa da Caparica.',
        icon: Leaf,
        href: '/mission',
        color: 'from-green-400/20 to-emerald-600/20',
        hoverColor: 'group-hover:from-green-400/30 group-hover:to-emerald-600/30',
    },
    {
        id: 'surf',
        title: 'Surf',
        description: 'Book lessons and track your progress with our dashboard.',
        icon: Waves,
        href: '/surf',
        color: 'from-blue-400/20 to-cyan-600/20',
        hoverColor: 'group-hover:from-blue-400/30 group-hover:to-cyan-600/30',
    },
    {
        id: 'join',
        title: 'Join Us',
        description: 'Volunteer, donate, or join our community initiatives.',
        icon: HeartHandshake,
        href: '/join',
        color: 'from-orange-400/20 to-red-600/20',
        hoverColor: 'group-hover:from-orange-400/30 group-hover:to-red-600/30',
    },
];

const MissionCards = () => {
    return (
        <section
            id="mission-cards"
            className="min-h-screen w-full flex items-center justify-center relative overflow-hidden scroll-snap-start bg-[#e0e5ec] py-12 md:py-16 lg:py-20"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-8 md:mb-12 lg:mb-16 text-gray-900"
                >
                    Welcome to Surf Farm
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.2, duration: 0.6 }}
                        >
                            <Link href={card.href} className="block h-full">
                                <motion.div
                                    whileHover={{
                                        scale: 0.95,
                                        boxShadow: [
                                            '0 0 20px rgba(59, 130, 246, 0.3)',
                                            '0 0 30px rgba(34, 197, 94, 0.4)',
                                            '0 0 20px rgba(59, 130, 246, 0.3)',
                                        ]
                                    }}
                                    whileTap={{ scale: 0.9 }}
                                    transition={{
                                        boxShadow: {
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }
                                    }}
                                    className={`group relative h-full p-6 md:p-8 rounded-3xl neumorphic overflow-hidden transition-all duration-300 hover:neumorphic-pressed min-h-[280px] sm:min-h-[320px]`}
                                >
                                    {/* Background Gradient - Subtle overlay */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${card.color} opacity-20 group-hover:opacity-30 transition-opacity duration-500`}
                                    />

                                    <div className="relative z-10 flex flex-col h-full items-center text-center">
                                        <div className="mb-4 md:mb-6 p-3 md:p-4 rounded-full bg-gray-100 shadow-inner group-hover:scale-110 transition-transform duration-500">
                                            <card.icon className="w-8 h-8 md:w-10 md:h-10 text-gray-700" />
                                        </div>

                                        <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">
                                            {card.title}
                                        </h3>

                                        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 flex-grow">
                                            {card.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 group-hover:gap-4 transition-all duration-300">
                                            Explore
                                            <ArrowRight className="w-4 h-4" />
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default MissionCards;
