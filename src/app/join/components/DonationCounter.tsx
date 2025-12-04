/**
 * Author: Allan Deschamps
 * Donation Counter Component
 */
'use client';

import { useState, useEffect } from 'react';

interface DonationCounterProps {
    targetAmount: number;
}

export default function DonationCounter({ targetAmount }: DonationCounterProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = targetAmount / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetAmount) {
                setCount(targetAmount);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [targetAmount]);

    return (
        <p className="hidden md:block text-3xl font-bold text-amber-800">
            €{count.toLocaleString()}
        </p>
    );
}
