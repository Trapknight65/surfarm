/**
 * Author: Allan Deschamps
 * Partner Logo Carousel Component
 */
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function PartnerLogoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const partners = [
        { name: 'Ocean Care Foundation', logo: '🌊' },
        { name: 'Green Wave Collective', logo: '🌿' },
        { name: 'Local Harvest Co-op', logo: '🌾' },
        { name: 'Sustainable Surf Alliance', logo: '🏄' },
        { name: 'Eco Farm Network', logo: '🌱' },
        { name: 'Coastal Community Trust', logo: '🏖️' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % partners.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [partners.length]);

    return (
        <div className="bg-white/70 p-4 md:p-6 rounded-xl">
            {/* All logos displayed horizontally */}
            <div className="flex justify-center items-center gap-4 md:gap-6 lg:gap-8 flex-wrap">
                {partners.map((partner, index) => (
                    <motion.div
                        key={index}
                        animate={{
                            opacity: index === currentIndex ? 1 : 0.3,
                            scale: index === currentIndex ? 1.2 : 1
                        }}
                        transition={{ duration: 0.5 }}
                        className="text-3xl md:text-4xl lg:text-5xl cursor-pointer touch-target"
                        title={partner.name}
                        onClick={() => setCurrentIndex(index)}
                    >
                        {partner.logo}
                    </motion.div>
                ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
                {partners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-amber-700 w-6' : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}
