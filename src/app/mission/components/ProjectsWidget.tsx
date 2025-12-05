'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Sprout, ChevronRight } from 'lucide-react';
import { Project } from './ProjectsSection';

interface ProjectsWidgetProps {
    projects: Project[];
    onClick: () => void;
}

export default function ProjectsWidget({ projects, onClick }: ProjectsWidgetProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % projects.length);
        }, 5000); // Slightly slower rotation than events
        return () => clearInterval(timer);
    }, [projects.length]);

    const currentProject = projects[currentIndex];

    return (
        <motion.div
            onClick={onClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden lg:flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-700 px-4 py-2 rounded-full cursor-pointer shadow-lg hover:shadow-xl transition-all border border-white/20"
        >
            <div className="flex items-center gap-2">
                <div className="bg-white/20 p-1 rounded-full">
                    <Sprout className="w-3 h-3 text-white" />
                </div>
                <div className="flex flex-col">
                    <span className="text-[9px] text-green-100 font-bold uppercase tracking-wider leading-none mb-0.5">
                        Eco Projects
                    </span>
                    <div className="h-4 overflow-hidden relative w-40">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentProject.id}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -20, opacity: 0 }}
                                transition={{ duration: 0.3 }}
                                className="absolute inset-0 flex items-center"
                            >
                                <span className="text-xs font-bold text-white truncate">
                                    {currentProject.title}
                                </span>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
