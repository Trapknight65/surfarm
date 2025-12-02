"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const slides = [
    {
        id: 1,
        title: "Grounded out the blue",
        subtitle: "Surf farm, seed planted by the ocean",
        emoji: "🌊",
    },
    {
        id: 2,
        title: "Just pure surf",
        subtitle: "Book a lesson",
        emoji: "🏄",
    },
    {
        id: 3,
        title: "A fertile social fabric",
        subtitle: "Plant your seed",
        emoji: "🌱",
    },
];

export default function HeroSlider() {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 overflow-hidden bg-bg z-10 flex items-center justify-center" >
            {/* Slides with AnimatePresence */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={slides[currentSlide].id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -50 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className="absolute inset-0"
                >
                    {/* Content */}
                    <div className=" text-center relative h-full px-6 z-10">
                        {/* Emoji Icon */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.4 }}
                            className="center neu-convex w-32 h-32 mx-auto flex items-center justify-center mb-8 text-7xl"
                        >
                            {slides[currentSlide].emoji}
                        </motion.div>

                        {/* Title Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="neu-card max-w-4xl mb-6"
                        >
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-text leading-tight">
                                {slides[currentSlide].title}
                            </h1>
                        </motion.div>

                        {/* Subtitle */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                            className="neu-flat px-8 py-4 rounded-full"
                        >
                            <p className="text-xl md:text-2xl lg:text-3xl text-text/70 font-light">
                                {slides[currentSlide].subtitle}
                            </p>
                        </motion.div>
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Navigation Dots */}
            <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-3 z-20 neu-flat px-6 py-3 rounded-full">
                {slides.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className={`rounded-full transition-all duration-300 ${index === currentSlide
                            ? 'neu-pressed w-12 h-4 bg-accent/20'
                            : 'neu-btn w-4 h-4'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>

            {/* Next Slide Indicator */}
            <motion.button
                onClick={nextSlide}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 neu-btn p-4 rounded-full"
                aria-label="Next slide"
            >
                <ChevronDown size={32} className="text-accent" />
            </motion.button>
        </section>
    );
}