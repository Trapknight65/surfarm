'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { Event } from './EventCard';

interface MobileEventsWidgetProps {
    events: Event[];
    onClick: () => void;
}

export default function MobileEventsWidget({ events, onClick }: MobileEventsWidgetProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % events.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [events.length]);

    const currentEvent = events[currentIndex];

    return (
        <motion.div
            onClick={onClick}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500/90 to-orange-600/90 px-3 py-1.5 rounded-full backdrop-blur-md cursor-pointer shadow-lg border border-white/20"
            whileTap={{ scale: 0.95 }}
        >
            <div className="flex items-center gap-1.5 min-w-0">
                <Calendar className="w-3.5 h-3.5 text-white shrink-0" />
                <div className="flex flex-col leading-none min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.span
                            key={currentEvent.id}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -10, opacity: 0 }}
                            className="text-[10px] font-bold text-white truncate max-w-[120px]"
                        >
                            {currentEvent.title}
                        </motion.span>
                    </AnimatePresence>
                    <span className="text-[9px] text-white/90 font-medium truncate">
                        {currentEvent.date}
                    </span>
                </div>
            </div>
            <ChevronRight className="w-3 h-3 text-white/70 shrink-0 ml-1" />
        </motion.div>
    );
}
