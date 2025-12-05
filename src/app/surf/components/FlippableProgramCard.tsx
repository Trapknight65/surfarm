/**
 * Author: Allan Deschamps
 * Surf Farm - Flippable Program Card Component
 */
'use client';

import { motion } from 'framer-motion';
import { LucideIcon } from 'lucide-react';
import { useState } from 'react';

interface FlippableProgramCardProps {
    icon: LucideIcon;
    title: string;
    targetAudience: string;
    duration: string;
    benefits: string[];
    color: string;
    pricePerPerson: number;
    note?: string;
    programId: string;
}

const FlippableProgramCard = ({
    icon: Icon,
    title,
    targetAudience,
    duration,
    benefits,
    color,
    pricePerPerson,
    note,
    programId
}: FlippableProgramCardProps) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [groupSize, setGroupSize] = useState(8);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [consent, setConsent] = useState(false);

    const totalCost = pricePerPerson * groupSize;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Booking submitted:', {
            program: programId,
            groupSize,
            selectedDate,
            selectedTime,
            contactPerson,
            email,
            phone
        });
        // Reset form and close modal
        setIsFlipped(false);
        setGroupSize(8);
        setSelectedDate('');
        setSelectedTime('');
        setContactPerson('');
        setEmail('');
        setPhone('');
        setConsent(false);
    };

    return (
        <>
            {/* Small Card - Front Face */}
            {!isFlipped && (
                <div className="h-[250px] md:h-[300px]">
                    <motion.div
                        whileHover={{ scale: 1.05, y: -4 }}
                        onClick={() => setIsFlipped(true)}
                        className={`${color} p-6 md:p-8 rounded-3xl h-full flex flex-col items-center justify-center cursor-pointer shadow-xl`}
                    >
                        {/* Large Icon */}
                        <motion.div
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                            className="mb-4"
                        >
                            <Icon className="w-16 h-16 md:w-20 md:h-20 text-white" strokeWidth={1.5} />
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-base md:text-xl lg:text-2xl font-bold text-white text-center mb-3 px-2">
                            {title}
                        </h3>

                        {/* Click to Book Hint */}
                        <motion.div
                            animate={{ opacity: [0.5, 1, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="text-white/80 text-xs md:text-sm font-semibold"
                        >
                            Click to Book →
                        </motion.div>
                    </motion.div>
                </div>
            )}

            {/* Fullscreen Modal - Booking Form */}
            {isFlipped && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={() => setIsFlipped(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">{title}</h3>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsFlipped(false);
                                }}
                                className="text-gray-600 hover:text-gray-900 text-sm font-semibold"
                            >
                                ← Back
                            </button>
                        </div>

                        {/* Program Info Summary */}
                        <div className={`${color} p-4 rounded-xl mb-4`}>
                            <div className="flex items-center gap-2 mb-3">
                                <Icon className="w-5 h-5 text-white" />
                                <span className="text-white font-bold text-sm">{targetAudience}</span>
                            </div>
                            <div className="text-white text-xs space-y-1">
                                <p>📅 {duration}</p>
                                <p className="font-bold">
                                    {pricePerPerson === 0 ? '💚 100% FREE' : `💰 €${pricePerPerson} per person`}
                                </p>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Note */}
                            {note && (
                                <div className="bg-cyan-50 p-3 rounded-lg">
                                    <p className="text-xs font-semibold text-cyan-700 text-center">
                                        ℹ️ {note}
                                    </p>
                                </div>
                            )}

                            {/* Group Size */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Group Size (5-15)
                                </label>
                                <div className="flex items-center gap-3">
                                    <input
                                        type="range"
                                        min="5"
                                        max="15"
                                        value={groupSize}
                                        onChange={(e) => setGroupSize(parseInt(e.target.value))}
                                        className="flex-1"
                                    />
                                    <span className="text-xl font-bold text-cyan-600 w-10 text-center">
                                        {groupSize}
                                    </span>
                                </div>
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Date
                                    </label>
                                    <input
                                        type="date"
                                        value={selectedDate}
                                        onChange={(e) => setSelectedDate(e.target.value)}
                                        className="w-full p-2 text-sm rounded-lg bg-white border-2 border-gray-200 focus:border-cyan-400 focus:outline-none"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                                        Time
                                    </label>
                                    <select
                                        value={selectedTime}
                                        onChange={(e) => setSelectedTime(e.target.value)}
                                        className="w-full p-2 text-sm rounded-lg bg-white border-2 border-gray-200 focus:border-cyan-400 focus:outline-none"
                                        required
                                    >
                                        <option value="">Select</option>
                                        <option value="09:00">09:00</option>
                                        <option value="11:00">11:00</option>
                                        <option value="14:00">14:00</option>
                                        <option value="16:00">16:00</option>
                                    </select>
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Your Name
                                </label>
                                <input
                                    type="text"
                                    value={contactPerson}
                                    onChange={(e) => setContactPerson(e.target.value)}
                                    className="w-full p-2 text-sm rounded-lg bg-white border-2 border-gray-200 focus:border-cyan-400 focus:outline-none"
                                    placeholder="Full name"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full p-2 text-sm rounded-lg bg-white border-2 border-gray-200 focus:border-cyan-400 focus:outline-none"
                                    placeholder="your@email.com"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-2 text-sm rounded-lg bg-white border-2 border-gray-200 focus:border-cyan-400 focus:outline-none"
                                    placeholder="+351 XXX XXX XXX"
                                    required
                                />
                            </div>

                            {/* Pricing */}
                            <div className="bg-cyan-50 p-3 rounded-lg">
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-700">Group Size:</span>
                                    <span className="font-semibold">{groupSize} people</span>
                                </div>
                                <div className="flex justify-between text-sm mb-2">
                                    <span className="text-gray-700">Price/Person:</span>
                                    <span className="font-semibold">
                                        {pricePerPerson === 0 ? 'FREE' : `€${pricePerPerson}`}
                                    </span>
                                </div>
                                <div className="border-t border-cyan-200 pt-2 flex justify-between">
                                    <span className="font-bold text-gray-900">Total:</span>
                                    <span className="text-xl font-bold text-cyan-600">
                                        {totalCost === 0 ? 'FREE' : `€${totalCost}`}
                                    </span>
                                </div>
                            </div>

                            {/* Consent */}
                            <label className="flex items-start gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    className="mt-0.5 w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                                />
                                <span className="text-xs text-gray-600">
                                    I agree to the terms and consent to data processing
                                </span>
                            </label>

                            {/* Submit */}
                            <motion.button
                                type="submit"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={!consent}
                                className={`w-full py-3 rounded-xl font-bold text-white shadow-lg transition-all ${consent
                                        ? `${color} hover:opacity-90`
                                        : 'bg-gray-300 cursor-not-allowed'
                                    }`}
                            >
                                Request Booking
                            </motion.button>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </>
    );
};

export default FlippableProgramCard;
