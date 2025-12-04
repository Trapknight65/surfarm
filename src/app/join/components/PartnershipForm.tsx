/**
 * Author: Allan Deschamps
 * Partnership Form Component  
 */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function PartnershipForm() {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        organizationName: '', contactName: '', email: '', phone: '', partnershipType: '', message: '', consent: false
    });

    const totalSteps = 3;

    return (
        <div>
            <div className="mb-6">
                <div className="flex justify-between mb-2">
                    {[1, 2, 3].map((s) => (
                        <div key={s} className={`flex-1 h-2 rounded-full mx-1 transition-all ${s <= step ? 'bg-amber-700' : 'bg-gray-300'}`} />
                    ))}
                </div>
                <p className="text-sm text-gray-600 text-center">Step {step} of {totalSteps}</p>
            </div>

            {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Organization Name *</label>
                        <input type="text" value={formData.organizationName} onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })} className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800" placeholder="Your organization" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Contact Name *</label>
                        <input type="text" value={formData.contactName} onChange={(e) => setFormData({ ...formData, contactName: e.target.value })} className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800" placeholder="Your name" />
                    </div>
                </motion.div>
            )}

            {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800" placeholder="email@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800" placeholder="+351 123 456 789" />
                    </div>
                </motion.div>
            )}

            {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Partnership Type *</label>
                        <select value={formData.partnershipType} onChange={(e) => setFormData({ ...formData, partnershipType: e.target.value })} className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800">
                            <option value="">Select type...</option>
                            <option value="event">Event Collaboration</option>
                            <option value="sponsorship">Sponsorship</option>
                            <option value="education">Educational Program</option>
                            <option value="other">Other</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Message</label>
                        <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 resize-none" rows={4} placeholder="Tell us about your partnership idea..." />
                    </div>
                    <div className="pt-2">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={formData.consent}
                                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                className="mt-1 w-4 h-4 rounded border-gray-300 text-amber-700 focus:ring-amber-600"
                            />
                            <span className="text-sm text-gray-600">
                                I agree to the <a href="#" className="text-amber-700 hover:underline">Privacy Policy</a> and consent to having my data processed for partnership inquiries.
                            </span>
                        </label>
                    </div>
                </motion.div>
            )}

            <div className="flex gap-3 mt-6">
                {step > 1 && (
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStep(step - 1)} className="flex-1 py-3 rounded-xl bg-gray-300 text-gray-700 font-semibold hover:bg-gray-400 transition-colors">Previous</motion.button>
                )}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => step === totalSteps ? console.log('Submit', formData) : setStep(step + 1)}
                    disabled={step === totalSteps && !formData.consent}
                    className={`flex-1 py-3 rounded-xl font-semibold transition-colors ${step === totalSteps && !formData.consent
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-amber-700 text-white hover:bg-amber-800'
                        }`}
                >
                    {step === totalSteps ? 'Submit' : 'Next'}
                </motion.button>
            </div>
        </div>
    );
}
