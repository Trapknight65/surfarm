/**
 * Author: Allan Deschamps
 * Surf Farm - Program Card Component
 */
'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';

interface ProgramCardProps {
    icon: LucideIcon;
    title: string;
    targetAudience: string;
    duration: string;
    benefits: string[];
    color: string;
    onBookClick: () => void;
}

const ProgramCard = ({
    icon: Icon,
    title,
    targetAudience,
    duration,
    benefits,
    color,
    onBookClick
}: ProgramCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02, y: -4 }}
            className="glass p-6 rounded-3xl h-full flex flex-col"
        >
            {/* Icon & Title */}
            <div className="flex items-center gap-3 mb-4">
                <div className={`p-3 rounded-xl ${color}`}>
                    <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">{title}</h3>
            </div>

            {/* Target Audience */}
            <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">Who it's for:</p>
                <p className="text-sm text-gray-600">{targetAudience}</p>
            </div>

            {/* Duration */}
            <div className="mb-4">
                <p className="text-sm font-semibold text-gray-700 mb-1">Session Details:</p>
                <p className="text-sm text-gray-600">{duration}</p>
            </div>

            {/* Benefits */}
            <div className="mb-6 flex-grow">
                <p className="text-sm font-semibold text-gray-700 mb-2">What's Included:</p>
                <ul className="space-y-2">
                    {benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-cyan-600 mt-0.5">✓</span>
                            <span>{benefit}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Book Button */}
            <motion.button
                onClick={onBookClick}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full py-3 rounded-xl font-semibold text-white shadow-lg transition-colors ${color} hover:opacity-90`}
            >
                Book Group Session
            </motion.button>
        </motion.div>
    );
};

export default ProgramCard;
