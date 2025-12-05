/**
 * Author: Allan Deschamps
 * Surf Farm - Group Session Booking Component
 */
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Users, Globe, Heart, UserPlus, Calendar, X } from 'lucide-react';
import { useState } from 'react';

interface GroupSessionBookingProps {
    selectedProgram: 'kids' | 'refugees' | 'women' | 'standard' | null;
    onClose: () => void;
}

const GroupSessionBooking = ({ selectedProgram, onClose }: GroupSessionBookingProps) => {
    const [groupSize, setGroupSize] = useState(8);
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [contactPerson, setContactPerson] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [specialRequirements, setSpecialRequirements] = useState('');
    const [consent, setConsent] = useState(false);

    const programs = {
        kids: {
            title: 'Kids & Teens Surf Club',
            icon: Users,
            color: 'from-orange-400 to-red-500',
            pricePerPerson: 0,
            note: 'FREE Social Program'
        },
        refugees: {
            title: 'Refugees & Newcomers Program',
            icon: Globe,
            color: 'from-green-400 to-emerald-500',
            pricePerPerson: 0,
            note: 'FREE Social Program'
        },
        women: {
            title: "Women's Empowerment Sessions",
            icon: Heart,
            color: 'from-pink-400 to-purple-500',
            pricePerPerson: 0,
            note: 'FREE Social Program'
        },
        standard: {
            title: 'Standard Group Session',
            icon: UserPlus,
            color: 'from-blue-400 to-cyan-500',
            pricePerPerson: 25,
            note: 'Group discounts available for 10+ participants'
        }
    };

    if (!selectedProgram) return null;

    const program = programs[selectedProgram];
    const totalCost = program.pricePerPerson * groupSize;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Handle booking submission
        console.log('Booking submitted:', {
            program: selectedProgram,
            groupSize,
            selectedDate,
            selectedTime,
            organizationName,
            contactPerson,
            email,
            phone,
            specialRequirements
        });
        onClose();
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, y: 20 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                >
                    {/* Header */}
                    <div className={`bg-gradient-to-r ${program.color} p-6 rounded-t-3xl relative`}>
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
                        >
                            <X className="w-5 h-5 text-white" />
                        </button>
                        <div className="flex items-center gap-3 text-white">
                            <program.icon className="w-8 h-8" />
                            <h2 className="text-2xl font-bold">{program.title}</h2>
                        </div>
                        <p className="text-white/90 mt-2">Book a group session for your community</p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        {/* Group Size */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Group Size (5-15 participants)
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    min="5"
                                    max="15"
                                    value={groupSize}
                                    onChange={(e) => setGroupSize(parseInt(e.target.value))}
                                    className="flex-1"
                                />
                                <span className="text-2xl font-bold text-cyan-600 w-12 text-center">
                                    {groupSize}
                                </span>
                            </div>
                        </div>

                        {/* Date & Time */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Preferred Date
                                </label>
                                <input
                                    type="date"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-cyan-400 focus:outline-none"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Preferred Time
                                </label>
                                <select
                                    value={selectedTime}
                                    onChange={(e) => setSelectedTime(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-cyan-400 focus:outline-none"
                                    required
                                >
                                    <option value="">Select time</option>
                                    <option value="09:00">09:00 AM</option>
                                    <option value="11:00">11:00 AM</option>
                                    <option value="14:00">02:00 PM</option>
                                    <option value="16:00">04:00 PM</option>
                                </select>
                            </div>
                        </div>

                        {/* Organization Details */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Organization/Group Name
                            </label>
                            <input
                                type="text"
                                value={organizationName}
                                onChange={(e) => setOrganizationName(e.target.value)}
                                className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-cyan-400 focus:outline-none"
                                placeholder="Your organization name"
                                required
                            />
                        </div>

                        {/* Contact Information */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Contact Person
                                </label>
                                <input
                                    type="text"
                                    value={contactPerson}
                                    onChange={(e) => setContactPerson(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-cyan-400 focus:outline-none"
                                    placeholder="Full name"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-cyan-400 focus:outline-none"
                                    placeholder="+351 XXX XXX XXX"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-cyan-400 focus:outline-none"
                                placeholder="your@email.com"
                                required
                            />
                        </div>

                        {/* Special Requirements */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Special Requirements (Optional)
                            </label>
                            <textarea
                                value={specialRequirements}
                                onChange={(e) => setSpecialRequirements(e.target.value)}
                                className="w-full p-3 rounded-xl bg-gray-50 border-2 border-transparent focus:border-cyan-400 focus:outline-none resize-none"
                                rows={3}
                                placeholder="Accessibility needs, language preferences, dietary restrictions..."
                            />
                        </div>

                        {/* Pricing Summary */}
                        <div className="bg-cyan-50 p-4 rounded-xl">
                            {program.note && (
                                <div className="mb-3 p-2 bg-white rounded-lg">
                                    <p className="text-sm font-semibold text-cyan-700 text-center">
                                        ℹ️ {program.note}
                                    </p>
                                </div>
                            )}
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-700">Group Size:</span>
                                <span className="font-semibold">{groupSize} participants</span>
                            </div>
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-gray-700">Price per Person:</span>
                                <span className="font-semibold">
                                    {program.pricePerPerson === 0 ? 'FREE' : `€${program.pricePerPerson}`}
                                </span>
                            </div>
                            <div className="border-t border-cyan-200 pt-2 mt-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-bold text-gray-900">Total Cost:</span>
                                    <span className="text-2xl font-bold text-cyan-600">
                                        {totalCost === 0 ? 'FREE' : `€${totalCost}`}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Consent */}
                        <div>
                            <label className="flex items-start gap-3 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={consent}
                                    onChange={(e) => setConsent(e.target.checked)}
                                    className="mt-1 w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                                />
                                <span className="text-sm text-gray-600">
                                    I agree to the terms and conditions and consent to having my data processed for booking purposes.
                                </span>
                            </label>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={!consent}
                            className={`w-full py-4 rounded-xl font-bold text-white shadow-lg transition-all ${consent
                                ? `bg-gradient-to-r ${program.color} hover:opacity-90`
                                : 'bg-gray-300 cursor-not-allowed'
                                }`}
                        >
                            Request Group Booking
                        </motion.button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default GroupSessionBooking;
