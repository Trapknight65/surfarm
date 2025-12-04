/**
 * Author: Allan Deschamps
 * Volunteer Form Component
 */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function VolunteerForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '', availability: '', interests: [] as string[], experience: '', consent: false
    });

    const totalSteps = 3;
    const interestOptions = ['Garden Maintenance', 'Surf Instruction', 'Event Organization', 'Marketing/Social Media', 'Other'];

    const handleInterestToggle = (interest: string) => {
        setFormData(prev => ({
            ...prev,
            interests: prev.interests.includes(interest)
                ? prev.interests.filter(i => i !== interest)
                : [...prev.interests, interest]
        }));
    };

    return (
        <div className="bg-white/50 p-4 md:p-6 rounded-2xl">
            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Sign Up to Volunteer</h3>

            <div className="mb-4 md:mb-6">
                <div className="flex justify-between mb-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`flex-1 h-2 rounded-full mx-1 transition-all ${s <= step ? 'bg-amber-700' : 'bg-gray-300'}`} />
                    ))}
                </div>
                <p className="text-sm text-gray-600 text-center">Step {step} of {totalSteps}</p>
            </div>

            {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3 md:space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">Availability</label>
                        <select value={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.value })} className="w-full p-2.5 md:p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 text-sm md:text-base">
                            <option value="">Select...</option>
                            <option value="weekdays">Weekdays</option>
                            <option value="weekends">Weekends</option>
                            <option value="flexible">Flexible</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">Areas of Interest</label>
                        <div className="space-y-1.5 md:space-y-2">
                            {interestOptions.map((interest) => (
                                <label key={interest} className="flex items-center gap-2 cursor-pointer">
                                    <input type="checkbox" checked={formData.interests.includes(interest)} onChange={() => handleInterestToggle(interest)} className="w-4 h-4 rounded border-gray-300 text-amber-700 focus:ring-amber-600" />
                                    <span className="text-sm text-gray-700">{interest}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </motion.div>
            )}

            {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3 md:space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">Previous Experience (Optional)</label>
                        <textarea value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="w-full p-2.5 md:p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 resize-none text-sm md:text-base" rows={4} placeholder="Tell us about any relevant experience..." />
                    </div>
                </motion.div>
            )}

            {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-3 md:space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">Full Name *</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2.5 md:p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 text-sm md:text-base" placeholder="Your name" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">Email *</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-2.5 md:p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 text-sm md:text-base" placeholder="email@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5 md:mb-2">Phone</label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-2.5 md:p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 text-sm md:text-base" placeholder="+351 123 456 789" />
                    </div>
                    <div className="pt-1 md:pt-2">
                        <label className="flex items-start gap-2 md:gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.consent}
                                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                className="mt-0.5 md:mt-1 w-4 h-4 rounded border-gray-300 text-amber-700 focus:ring-amber-600"
                            />
                            <span className="text-xs md:text-sm text-gray-600">
                                I agree to the <a href="#" className="text-amber-700 hover:underline">Privacy Policy</a> and consent to having my data processed for volunteering purposes.
                            </span>
                        </label>
                    </div>
                </motion.div>
            )}

            <div className="flex gap-2 md:gap-3 mt-4 md:mt-6">
                {step > 1 && (
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStep(step - 1)} className="flex-1 py-2.5 md:py-3 rounded-xl bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-colors text-sm md:text-base">Previous</motion.button>
                )}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => step === totalSteps ? console.log('Submit', formData) : setStep(step + 1)}
                    disabled={step === totalSteps && !formData.consent}
                    className={`flex-1 py-2.5 md:py-3 rounded-xl font-semibold transition-colors text-sm md:text-base ${step === totalSteps && !formData.consent
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-amber-700 text-white hover:bg-amber-800'
                        }`}
                >
                    {step === totalSteps ? 'Submit Application' : 'Next'}
                </motion.button>
            </div>
        </div>
    );
}
