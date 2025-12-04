/**
 * Author: Allan Deschamps
 * Volunteer Photo Carousel Component
 */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function VolunteerPhotoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const photos = [
        { id: 1, alt: 'Volunteers surfing', color: 'from-blue-400 to-cyan-500' },
        { id: 2, alt: 'Community farming', color: 'from-green-400 to-emerald-500' },
        { id: 3, alt: 'Beach cleanup', color: 'from-amber-400 to-orange-500' },
        { id: 4, alt: 'Surf lessons', color: 'from-purple-400 to-pink-500' },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % photos.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [photos.length]);

    return (
        <div className="hidden md:block mt-6 md:mt-8">
            <div className="relative h-48 md:h-64 lg:h-80 rounded-2xl overflow-hidden">
                {photos.map((photo, index) => (
                    <motion.div
                        key={photo.id}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: index === currentIndex ? 1 : 0,
                            scale: index === currentIndex ? 1 : 1.1
                        }}
                        transition={{ duration: 0.7 }}
                        className={`absolute inset-0 bg-gradient-to-br ${photo.color} flex items-center justify-center`}
                    >
                        <div className="text-white text-center p-8">
                            <p className="text-4xl md:text-6xl mb-4">📸</p>
                            <p className="text-lg md:text-xl font-semibold">{photo.alt}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Navigation Dots */}
            <div className="flex justify-center gap-2 mt-4">
                {photos.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`h-2 rounded-full transition-all ${index === currentIndex ? 'bg-amber-700 w-8' : 'bg-gray-300 w-2'
                            }`}
                        aria-label={`Go to photo ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
}
