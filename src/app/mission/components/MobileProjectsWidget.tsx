'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sprout } from 'lucide-react';
import { Project } from './ProjectsSection';

interface MobileProjectsWidgetProps {
    projects: Project[];
    onClick: () => void;
}

export default function MobileProjectsWidget({ projects, onClick }: MobileProjectsWidgetProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % projects.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [projects.length]);

    const currentProject = projects[currentIndex];

    return (
        <motion.div
            onClick={onClick}
            className="flex items-center gap-2 bg-gradient-to-r from-green-500/90 to-emerald-600/90 px-3 py-1.5 rounded-full backdrop-blur-md cursor-pointer shadow-lg border border-white/20"
            whileTap={{ scale: 0.95 }}
        >
            <div className="flex items-center gap-1">
                <Sprout className="w-3 h-3 text-white" />
                <div className="h-4 overflow-hidden relative w-32">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentProject.id}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -20, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 flex items-center"
                        >
                            <span className="text-[10px] font-bold text-white truncate">
                                {currentProject.title}
                            </span>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
}
