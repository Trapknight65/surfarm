/**
 * Author: Allan Deschamps
 * Volunteer Benefits Component
 */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import VolunteerPhotoCarousel from './VolunteerPhotoCarousel';

export default function VolunteerBenefits() {
    const [progress, setProgress] = useState(0);
    const benefits = [
        { icon: '🌊', title: 'Surf Skills', shortTitle: 'Surf Skills', description: 'Free lessons from pro instructors.' },
        { icon: '🌱', title: 'Sustainability', shortTitle: 'Sustainability', description: 'Learn organic farming & eco practices.' },
        { icon: '🤝', title: 'Community', shortTitle: 'Community', description: 'Join passionate like-minded people.' },
        { icon: '📜', title: 'Experience', shortTitle: 'Experience', description: 'Build your resume with references.' }
    ];

    useEffect(() => {
        const duration = 3140 * benefits.length;
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) clearInterval(interval);
        }, 50);

        return () => clearInterval(interval);
    }, [benefits.length]);

    return (
        <div className="space-y-4 md:space-y-6">
            {/* Desktop: Show description */}
            <p className="hidden md:block text-lg lg:text-xl text-gray-700 leading-relaxed">
                Help us maintain our gardens, teach surf lessons, or organize community events.
                Your time and skills make a real difference.
            </p>

            <div className="space-y-3 md:space-y-4">
                <h3 className="text-xl md:text-2xl font-bold text-gray-900">What You'll Gain</h3>

                {/* Mobile: Loading bar with icons overlaid and titles below */}
                <div className="md:hidden space-y-3">
                    {/* Loading bar with overlaid icons */}
                    <div className="relative">
                        <div className="w-full h-12 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-gradient-to-r from-amber-600 to-amber-800"
                            />
                        </div>

                        {/* Icons overlaid on the bar */}
                        <div className="absolute inset-0 flex items-center justify-around px-2">
                            {benefits.map((benefit, index) => {
                                const itemProgress = ((progress - (index * 25)) / 25) * 100;
                                const isActive = itemProgress > 0;

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ scale: 0.8, opacity: 0.4 }}
                                        animate={{
                                            scale: isActive ? 1.2 : 0.8,
                                            opacity: isActive ? 1 : 0.4
                                        }}
                                        transition={{ duration: 0.5 }}
                                        className="text-2xl filter drop-shadow-lg"
                                    >
                                        {benefit.icon}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Titles below the bar */}
                    <div className="flex items-start justify-around gap-2">
                        {benefits.map((benefit, index) => {
                            const itemProgress = ((progress - (index * 25)) / 25) * 100;
                            const isActive = itemProgress > 0;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0.4, y: 5 }}
                                    animate={{
                                        opacity: isActive ? 1 : 0.4,
                                        y: isActive ? 0 : 5
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className="flex-1 text-center"
                                >
                                    <span className={`text-xs font-semibold leading-tight ${isActive ? 'text-gray-900' : 'text-gray-400'}`}>
                                        {benefit.shortTitle}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Desktop: Loading bar with icons overlaid and titles below */}
                <div className="hidden md:block space-y-4">
                    {/* Loading bar with overlaid icons */}
                    <div className="relative">
                        <div className="w-full h-16 bg-gray-200 rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: '0%' }}
                                animate={{ width: `${progress}%` }}
                                className="h-full bg-gradient-to-r from-amber-600 to-amber-800"
                            />
                        </div>

                        {/* Icons overlaid on the bar */}
                        <div className="absolute inset-0 flex items-center justify-around px-4">
                            {benefits.map((benefit, index) => {
                                const itemProgress = ((progress - (index * 25)) / 25) * 100;
                                const isActive = itemProgress > 0;

                                return (
                                    <motion.div
                                        key={index}
                                        initial={{ scale: 0.8, opacity: 0.4 }}
                                        animate={{
                                            scale: isActive ? 1.3 : 0.8,
                                            opacity: isActive ? 1 : 0.4
                                        }}
                                        transition={{ duration: 0.5 }}
                                        className="text-4xl filter drop-shadow-lg"
                                    >
                                        {benefit.icon}
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Titles and descriptions below the bar */}
                    <div className="grid grid-cols-4 gap-4">
                        {benefits.map((benefit, index) => {
                            const itemProgress = ((progress - (index * 25)) / 25) * 100;
                            const isActive = itemProgress > 0;

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0.4, y: 10 }}
                                    animate={{
                                        opacity: isActive ? 1 : 0.4,
                                        y: isActive ? 0 : 10
                                    }}
                                    transition={{ duration: 0.5 }}
                                    className="text-center"
                                >
                                    <h4 className={`font-bold text-sm mb-2 ${isActive ? 'text-gray-900' : 'text-gray-500'}`}>
                                        {benefit.title}
                                    </h4>
                                    <p className={`text-xs ${isActive ? 'text-gray-700' : 'text-gray-400'}`}>
                                        {benefit.description}
                                    </p>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Photo Carousel */}
                <VolunteerPhotoCarousel />
            </div>
        </div>
    );
}
