/**
 * Author: Allan Deschamps
 * Equipment Donation Form Component
 */
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function EquipmentDonationForm() {
    const [formData, setFormData] = useState({
        type: '', condition: '', description: '', name: '', email: '', phone: '', consent: false
    });

    const handleSubmit = () => {
        console.log('Equipment Donation:', formData);
        // Handle submission
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-4"
        >
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Equipment Type</label>
                    <select
                        value={formData.type}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 text-sm"
                    >
                        <option value="">Select...</option>
                        <option value="surfboard">Surfboard</option>
                        <option value="wetsuit">Wetsuit</option>
                        <option value="bodyboard">Bodyboard</option>
                        <option value="fins">Fins/Leash</option>
                        <option value="other">Other</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Condition</label>
                    <select
                        value={formData.condition}
                        onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                        className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 text-sm"
                    >
                        <option value="">Select...</option>
                        <option value="new">Like New</option>
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="repair">Needs Repair</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 resize-none text-sm"
                    rows={3}
                    placeholder="Brand, size, details..."
                />
            </div>

            <div className="space-y-3">
                <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 text-sm"
                    placeholder="Your Name"
                />
                <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 text-sm"
                    placeholder="Email"
                />
                <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 text-sm"
                    placeholder="Phone (Optional)"
                />
            </div>

            <div className="pt-1">
                <label className="flex items-start gap-3 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-1 w-4 h-4 rounded border-gray-300 text-amber-700 focus:ring-amber-600"
                    />
                    <span className="text-xs text-gray-600">
                        I agree to the <a href="#" className="text-amber-700 hover:underline">Privacy Policy</a>.
                    </span>
                </label>
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                disabled={!formData.consent || !formData.type}
                className={`w-full py-3 rounded-xl font-bold transition-all ${formData.consent && formData.type
                    ? 'bg-amber-700 text-white hover:bg-amber-800 shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }`}
            >
                Submit Equipment Donation
            </motion.button>
        </motion.div>
    );
}
