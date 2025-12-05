'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, ChevronRight } from 'lucide-react';
import { Event } from './EventCard';

interface MobileEventsListModalProps {
    isOpen: boolean;
    onClose: () => void;
    events: Event[];
    onEventSelect: (event: Event) => void;
}

export default function MobileEventsListModal({ isOpen, onClose, events, onEventSelect }: MobileEventsListModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="fixed bottom-0 left-0 right-0 lg:inset-0 lg:flex lg:items-center lg:justify-center lg:p-4 z-50 pointer-events-none"
                    >
                        <motion.div
                            className="bg-white rounded-t-3xl lg:rounded-3xl w-full lg:max-w-2xl max-h-[85vh] flex flex-col shadow-2xl pointer-events-auto"
                            initial={{ scale: 1 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 1 }}
                        >
                            {/* Header */}
                            <div className="p-5 border-b border-gray-100 flex items-center justify-between bg-white rounded-t-3xl lg:rounded-t-3xl sticky top-0 z-10">
                                <div>
                                    <h2 className="text-xl font-bold text-gray-900">Upcoming Events</h2>
                                    <p className="text-xs text-gray-500 mt-0.5">Join our community activities</p>
                                </div>
                                <button
                                    onClick={onClose}
                                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-gray-600" />
                                </button>
                            </div>

                            {/* List */}
                            <div className="overflow-y-auto p-4 space-y-3 pb-8">
                                {events.map((event) => (
                                    <motion.div
                                        key={event.id}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => onEventSelect(event)}
                                        className="flex gap-4 p-3 bg-white border border-gray-100 rounded-2xl shadow-sm active:shadow-md transition-all cursor-pointer hover:border-amber-200 hover:shadow-md"
                                    >
                                        {/* Image Thumb */}
                                        <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-gray-100">
                                            <img
                                                src={event.image}
                                                alt={event.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>

                                        {/* Content */}
                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                            <div className="flex items-start justify-between gap-2">
                                                <h3 className="font-bold text-gray-900 text-sm line-clamp-2 leading-tight mb-1">
                                                    {event.title}
                                                </h3>
                                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${event.type === 'market' ? 'bg-orange-100 text-orange-700' :
                                                    event.type === 'giveaway' ? 'bg-green-100 text-green-700' :
                                                        event.type === 'concert' ? 'bg-purple-100 text-purple-700' :
                                                            'bg-blue-100 text-blue-700'
                                                    }`}>
                                                    {event.type}
                                                </span>
                                            </div>

                                            <div className="space-y-1 mt-1">
                                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                    <Calendar className="w-3.5 h-3.5 text-cyan-600" />
                                                    <span className="truncate">{event.date}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                                                    <MapPin className="w-3.5 h-3.5 text-cyan-600" />
                                                    <span className="truncate">{event.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center text-gray-300">
                                            <ChevronRight className="w-5 h-5" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
