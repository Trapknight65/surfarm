/**
 * Author: Allan Deschamps
 * Surf Farm - Mobile Booking Form Component
 */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { useState, useEffect } from 'react';

interface MobileBookingFormProps {
    isOpen: boolean;
    onClose: () => void;
    selectedDay?: string;
    selectedDate?: string;
}

const MobileBookingForm = ({ isOpen, onClose, selectedDay, selectedDate }: MobileBookingFormProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        participants: '1',
        experience: 'beginner',
        notes: ''
    });

    // Update form date when selectedDate changes
    useEffect(() => {
        if (selectedDate) {
            // Convert "Dec 5" format to YYYY-MM-DD format for date input
            const currentYear = new Date().getFullYear();
            const dateStr = `${selectedDate} ${currentYear}`;
            const parsedDate = new Date(dateStr);

            if (!isNaN(parsedDate.getTime())) {
                const formattedDate = parsedDate.toISOString().split('T')[0];
                setFormData(prev => ({ ...prev, date: formattedDate }));
            }
        }
    }, [selectedDate]);

    const timeSlots = [
        '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00'
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle form submission
        console.log('Booking submitted:', formData);
        alert('Booking request submitted! We\'ll contact you shortly.');
        onClose();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/60 z-[60] backdrop-blur-sm"
                        onClick={onClose}
                    />

                    {/* Form Modal */}
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        exit={{ y: '100%' }}
                        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                        className="fixed inset-x-0 bottom-0 top-20 md:top-auto md:inset-x-4 md:bottom-4 md:max-w-2xl md:mx-auto bg-white rounded-t-3xl md:rounded-3xl shadow-2xl z-[60] overflow-hidden"
                    >
                        <div className="flex flex-col h-full">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 md:p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl md:text-2xl font-bold text-white">Book Your Session</h2>
                                        {selectedDay && selectedDate && (
                                            <p className="text-white/90 text-sm mt-1">{selectedDay}, {selectedDate}</p>
                                        )}
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
                                        aria-label="Close booking form"
                                    >
                                        <X size={24} />
                                    </button>
                                </div>
                            </div>

                            {/* Form Content */}
                            <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-4 md:p-6">
                                <div className="space-y-4">
                                    {/* Name */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <User className="w-4 h-4" />
                                            Full Name *
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="John Doe"
                                            className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-cyan-400 focus:outline-none text-gray-900 placeholder-gray-500"
                                        />
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Mail className="w-4 h-4" />
                                            Email *
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="john@example.com"
                                            className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-cyan-400 focus:outline-none text-gray-900 placeholder-gray-500"
                                        />
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Phone className="w-4 h-4" />
                                            Phone *
                                        </label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required
                                            placeholder="+351 912 345 678"
                                            className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-cyan-400 focus:outline-none text-gray-900 placeholder-gray-500"
                                        />
                                    </div>

                                    {/* Date */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Calendar className="w-4 h-4" />
                                            Preferred Date *
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-cyan-400 focus:outline-none text-gray-900"
                                        />
                                    </div>

                                    {/* Time */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <Clock className="w-4 h-4" />
                                            Preferred Time *
                                        </label>
                                        <select
                                            name="time"
                                            value={formData.time}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-cyan-400 focus:outline-none text-gray-900"
                                        >
                                            <option value="">Select a time</option>
                                            {timeSlots.map((time) => (
                                                <option key={time} value={time}>{time}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Participants */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <User className="w-4 h-4" />
                                            Number of Participants *
                                        </label>
                                        <select
                                            name="participants"
                                            value={formData.participants}
                                            onChange={handleChange}
                                            required
                                            className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-cyan-400 focus:outline-none text-gray-900"
                                        >
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                                <option key={num} value={num}>{num} {num === 1 ? 'person' : 'people'}</option>
                                            ))}
                                        </select>
                                    </div>

                                    {/* Experience Level */}
                                    <div>
                                        <label className="text-sm font-semibold text-gray-700 mb-2 block">
                                            Experience Level *
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {['beginner', 'intermediate', 'advanced'].map((level) => (
                                                <label
                                                    key={level}
                                                    className={`p-3 rounded-xl text-center cursor-pointer transition-all ${formData.experience === level
                                                        ? 'bg-cyan-500 text-white'
                                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                        }`}
                                                >
                                                    <input
                                                        type="radio"
                                                        name="experience"
                                                        value={level}
                                                        checked={formData.experience === level}
                                                        onChange={handleChange}
                                                        className="sr-only"
                                                    />
                                                    <span className="text-sm font-semibold capitalize">{level}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Notes */}
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
                                            <MessageSquare className="w-4 h-4" />
                                            Additional Notes
                                        </label>
                                        <textarea
                                            name="notes"
                                            value={formData.notes}
                                            onChange={handleChange}
                                            placeholder="Any special requests or questions..."
                                            rows={3}
                                            className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-cyan-400 focus:outline-none resize-none text-gray-900 placeholder-gray-500"
                                        />
                                    </div>
                                </div>
                            </form>

                            {/* Footer */}
                            <div className="p-4 md:p-6 border-t border-gray-200 bg-gray-50">
                                <div className="flex gap-3">
                                    <motion.button
                                        type="button"
                                        whileTap={{ scale: 0.98 }}
                                        onClick={onClose}
                                        className="flex-1 py-3 px-6 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                                    >
                                        Cancel
                                    </motion.button>
                                    <motion.button
                                        type="submit"
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleSubmit}
                                        className="flex-1 py-3 px-6 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl font-semibold hover:from-cyan-600 hover:to-blue-600 transition-colors shadow-lg"
                                    >
                                        Submit Booking
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default MobileBookingForm;
