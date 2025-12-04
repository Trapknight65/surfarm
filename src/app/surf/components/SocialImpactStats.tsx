/**
 * Author: Allan Deschamps
 * Surf Farm - Social Impact Statistics Component
 */
'use client';

import { motion } from 'framer-motion';
import { Users, Heart, Building2, TrendingUp } from 'lucide-react';
import { useState, useEffect } from 'react';

interface StatProps {
    icon: React.ElementType;
    value: number;
    label: string;
    suffix?: string;
}

const AnimatedCounter = ({ value, suffix = '' }: { value: number; suffix?: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    return (
        <span className="text-4xl md:text-5xl font-bold text-white">
            {count.toLocaleString()}{suffix}
        </span>
    );
};

const StatCard = ({ icon: Icon, value, label, suffix }: StatProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl text-center"
        >
            <Icon className="w-8 h-8 text-white mx-auto mb-3" />
            <AnimatedCounter value={value} suffix={suffix} />
            <p className="text-white/90 mt-2 text-sm md:text-base">{label}</p>
        </motion.div>
    );
};

const SocialImpactStats = () => {
    const stats = [
        { icon: Users, value: 450, label: 'Lives Impacted', suffix: '+' },
        { icon: Heart, value: 120, label: 'Group Sessions Held', suffix: '' },
        { icon: Building2, value: 15, label: 'Partner Organizations', suffix: '' },
        { icon: TrendingUp, value: 95, label: 'Success Rate', suffix: '%' }
    ];

    return (
        <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-8 md:p-12 rounded-3xl">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center mb-8"
            >
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                    Our Social Impact
                </h2>
                <p className="text-white/90 text-lg max-w-2xl mx-auto">
                    Building stronger communities through the power of surfing
                </p>
            </motion.div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <StatCard {...stat} />
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default SocialImpactStats;
