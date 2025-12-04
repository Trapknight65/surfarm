/**
 * Author: Allan Deschamps
 * Surf Farm - Hero Slider Component
 */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Waves, Wind, Sprout } from 'lucide-react';

export const slides = [
    {
        id: 1,
        title: 'Grounded out the blue',
        subtitle: 'Surf farm, a seed planted by the ocean',
        icon: Waves,
        gradientId: 'blue-gradient',
        gradientColors: ['#0c4a6e', '#075985', '#0369a1'], // Deep sea blue gradient
        bgColor: 'bg-gradient-to-br from-blue-50 via-cyan-50 to-blue-100',
    },
    {
        id: 2,
        title: 'Just pure surf',
        subtitle: 'Book a lesson',
        icon: Wind,
        gradientId: 'clear-blue-gradient',
        gradientColors: ['#bae6fd', '#e0f2fe', '#f0f9ff'], // Clear sky gradient
        bgColor: 'bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-100',
    },
    {
        id: 3,
        title: 'A fertile social fabric',
        subtitle: 'Plant your seed',
        icon: Sprout,
        gradientId: 'green-brown-gradient',
        gradientColors: ['#15803d', '#16a34a', '#166534'], // Earth green gradient
        bgColor: 'bg-gradient-to-br from-green-50 via-lime-50 to-emerald-100',
    },
];

const HeroSlider = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => {
                if (prev === slides.length - 1) {
                    clearInterval(timer);
                    setTimeout(() => {
                        handleScrollToMission();
                    }, 2000);
                    return prev;
                }
                return prev + 1;
            });
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    const handleScrollToMission = () => {
        const missionCards = document.getElementById('mission-cards');
        if (missionCards) {
            missionCards.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="h-screen w-full relative overflow-hidden bg-gray-900">
            {/* SVG Definitions for Gradients */}
            <svg width="0" height="0" className="absolute">
                <defs>
                    {slides.map((slide) => (
                        <linearGradient key={slide.gradientId} id={slide.gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                            <motion.stop
                                offset="0%"
                                stopColor={slide.gradientColors[0]}
                                animate={{
                                    stopColor: [slide.gradientColors[0], slide.gradientColors[1], slide.gradientColors[0]],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.stop
                                offset="50%"
                                stopColor={slide.gradientColors[1]}
                                animate={{
                                    stopColor: [slide.gradientColors[1], slide.gradientColors[0], slide.gradientColors[1]],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                            <motion.stop
                                offset="100%"
                                stopColor={slide.gradientColors[2]}
                                animate={{
                                    stopColor: [slide.gradientColors[2], slide.gradientColors[1], slide.gradientColors[2]],
                                }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                            />
                        </linearGradient>
                    ))}
                </defs>
            </svg>

            <AnimatePresence>
                <motion.div
                    key={slides[currentSlide].id}
                    initial={{ y: '100%' }}
                    animate={{ y: '0%' }}
                    exit={{ y: '-100%' }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    className={`absolute inset-0 flex items-center justify-center ${slides[currentSlide].bgColor}`}
                >
                    <div className="relative z-10 text-center px-4 sm:px-6 max-w-5xl">
                        {/* Shimmering Icon - Responsive sizing with CSS */}
                        <motion.div
                            animate={{
                                y: [0, -20, 0],
                            }}
                            transition={{
                                duration: 3,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="mb-6 md:mb-8 flex justify-center"
                        >
                            {(() => {
                                const IconComponent = slides[currentSlide].icon;
                                return (
                                    <IconComponent
                                        size={120}
                                        strokeWidth={0.8}
                                        style={{
                                            stroke: `url(#${slides[currentSlide].gradientId})`,
                                            filter: 'drop-shadow(0 0 12px rgba(255, 255, 255, 0.4))',
                                            width: 'clamp(80px, 15vw, 180px)',
                                            height: 'clamp(80px, 15vw, 180px)'
                                        }}
                                        className="filter drop-shadow-xl"
                                    />
                                );
                            })()}
                        </motion.div>

                        {/* Title - Responsive typography */}
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.8 }}
                            className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold text-gray-900 mb-4 md:mb-6 text-shadow leading-tight"
                        >
                            {slides[currentSlide].title}
                        </motion.h1>

                        {/* Subtitle - Responsive typography */}
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gray-700 font-light tracking-wide"
                        >
                            {slides[currentSlide].subtitle}
                        </motion.p>

                        {/* Floating particles effect */}
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                opacity: [0.3, 0.6, 0.3],
                            }}
                            transition={{
                                duration: 4,
                                repeat: Infinity,
                                ease: 'easeInOut',
                            }}
                            className="absolute inset-0 -z-10"
                        >
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 md:w-64 md:h-64 bg-white/30 rounded-full blur-3xl" />
                            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 md:w-96 md:h-96 bg-white/20 rounded-full blur-3xl" />
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrow - Responsive sizing */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 cursor-pointer z-50"
                onClick={handleScrollToMission}
            >
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="text-gray-900 bg-white/30 p-3 md:p-4 rounded-full backdrop-blur-md hover:bg-white/50 transition-colors touch-target"
                >
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="md:w-6 md:h-6"
                    >
                        <path d="M12 5v14M19 12l-7 7-7-7" />
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default HeroSlider;
