'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Calendar, ChevronRight } from 'lucide-react';
import { Event } from './EventCard';

interface DesktopEventsWidgetProps {
    events: Event[];
    onClick: () => void;
}

export default function DesktopEventsWidget({ events, onClick }: DesktopEventsWidgetProps) {
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
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-700 px-4 py-2 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all border border-white/20"
        >
            <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1 rounded-full">
                    <Calendar className="w-3 h-3 text-white" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] text-amber-100 font-bold uppercase tracking-wider leading-none mb-0.5">
                        Upcoming Events
                    </span>
                    <div className="h-4 overflow-hidden relative w-40">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentEvent.id}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 flex items-center"
                            >
                                <span className="text-xs font-bold text-white truncate">
                                    {currentEvent.title}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>

            <div className="w-px h-8 bg-white/20 mx-1" />

            <div className="flex items-center gap-1 text-white/90 group-hover:text-white transition-colors">
                <span className="text-xs font-semibold">View All</span>
                <ChevronRight className="w-4 h-4" />
            </div>
        </motion.div>
    );
}
