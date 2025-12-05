'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, MapPin, Ticket, HeartHandshake, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Event } from './EventCard';

interface EventModalProps {
    event: Event | null;
    onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
    const [actionState, setActionState] = useState<'details' | 'ticket' | 'volunteer' | 'success'>('details');
    const [formData, setFormData] = useState({ name: '', email: '', count: 1 });

    if (!event) return null;

    const handleAction = (type: 'ticket' | 'volunteer') => {
        setActionState(type);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock submission
        setTimeout(() => {
            setActionState('success');
        }, 1000);
    };

    const resetModal = () => {
        setActionState('details');
        setFormData({ name: '', email: '', count: 1 });
        onClose();
    };

    return (
        <AnimatePresence>
            {event && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                        onClick={resetModal}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto w-full max-w-2xl h-fit max-h-[90vh] bg-white rounded-3xl shadow-2xl z-50 overflow-hidden flex flex-col"
                    >
                        {/* Header Image */}
                        <div className="h-48 md:h-64 relative shrink-0">
                            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                            <button
                                onClick={resetModal}
                                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-md"
                            >
                                <X className="w-6 h-6" />
                            </button>
                            <div className="absolute bottom-6 left-6 text-white">
                                <span className="px-3 py-1 rounded-full bg-cyan-500/80 backdrop-blur-md text-xs font-bold uppercase tracking-wider mb-2 inline-block">
                                    {event.type}
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold">{event.title}</h2>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                            {actionState === 'details' && (
                                <div className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl">
                                            <Calendar className="w-5 h-5 text-cyan-600" />
                                            <span className="font-medium">{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl">
                                            <Clock className="w-5 h-5 text-cyan-600" />
                                            <span className="font-medium">{event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-3 rounded-xl">
                                            <MapPin className="w-5 h-5 text-cyan-600" />
                                            <span className="font-medium">{event.location}</span>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">About Event</h3>
                                        <p className="text-gray-600 leading-relaxed">{event.description}</p>
                                    </div>

                                    <div className="flex gap-4 pt-4">
                                        <button
                                            onClick={() => handleAction('ticket')}
                                            className="flex-1 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                                        >
                                            <Ticket className="w-5 h-5" />
                                            Get Ticket
                                        </button>
                                        <button
                                            onClick={() => handleAction('volunteer')}
                                            className="flex-1 py-3 bg-white border-2 border-amber-500 text-amber-700 rounded-xl font-bold hover:bg-amber-50 transition-colors flex items-center justify-center gap-2"
                                        >
                                            <HeartHandshake className="w-5 h-5" />
                                            Offer Help
                                        </button>
                                    </div>
                                </div>
                            )}

                            {(actionState === 'ticket' || actionState === 'volunteer') && (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <h3 className="text-2xl font-bold text-gray-900">
                                            {actionState === 'ticket' ? 'Confirm Attendance' : 'Volunteer Sign Up'}
                                        </h3>
                                        <button
                                            type="button"
                                            onClick={() => setActionState('details')}
                                            className="text-sm text-gray-500 hover:text-gray-900 underline"
                                        >
                                            Back
                                        </button>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <input
                                            required
                                            type="text"
                                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                        <input
                                            required
                                            type="email"
                                            className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                        />
                                    </div>

                                    {actionState === 'ticket' && (
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Number of Tickets</label>
                                            <select
                                                className="w-full p-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-200 outline-none transition-all"
                                                value={formData.count}
                                                onChange={e => setFormData({ ...formData, count: Number(e.target.value) })}
                                            >
                                                {[1, 2, 3, 4, 5].map(n => (
                                                    <option key={n} value={n}>{n}</option>
                                                ))}
                                            </select>
                                        </div>
                                    )}

                                    <button
                                        type="submit"
                                        className={`w-full py-3 rounded-xl font-bold text-white shadow-lg mt-4 ${actionState === 'ticket'
                                                ? 'bg-gradient-to-r from-cyan-600 to-blue-600'
                                                : 'bg-gradient-to-r from-amber-500 to-orange-600'
                                            }`}
                                    >
                                        {actionState === 'ticket' ? 'Get Tickets' : 'Sign Up to Volunteer'}
                                    </button>
                                </form>
                            )}

                            {actionState === 'success' && (
                                <div className="text-center py-8">
                                    <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">You're All Set!</h3>
                                    <p className="text-gray-600 mb-8">
                                        We've sent a confirmation email to {formData.email}.
                                        {formData.name && ` Thanks, ${formData.name.split(' ')[0]}!`}
                                    </p>
                                    <button
                                        onClick={resetModal}
                                        className="px-8 py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-colors"
                                    >
                                        Close
                                    </button>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
