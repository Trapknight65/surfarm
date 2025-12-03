'use client';

import Header from '@/components/Header';
import PageNavigation from '@/components/PageNavigation';
import { Leaf, HeartHandshake, Instagram, MessageCircle, Calendar, User, Wind, Waves as WavesIcon, Droplets, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';

const instructors = [
    { name: 'João Silva', specialty: 'Beginner Lessons', available: true },
    { name: 'Maria Santos', specialty: 'Advanced Techniques', available: true },
    { name: 'Pedro Costa', specialty: 'Kids & Teens', available: false },
    { name: 'Ana Rodrigues', specialty: 'Longboard', available: true },
];

const timeSlots = [
    { time: '09:00', available: true },
    { time: '11:00', available: true },
    { time: '13:00', available: false },
    { time: '15:00', available: true },
    { time: '17:00', available: true },
];

// Mock forecast data
const forecastData = {
    waveHeight: '1.2 - 1.8m',
    windSpeed: '12 km/h',
    windDirection: 'NW',
    waterTemp: '18°C',
    tide: 'High at 14:30',
    visibility: 'Good',
    rating: '7/10'
};

export default function SurfPage() {
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [sessionNotes, setSessionNotes] = useState('');

    // Generate calendar days (simplified - showing next 14 days)
    const calendarDays = Array.from({ length: 14 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            day: date.getDate(),
            weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
            available: Math.random() > 0.3, // Random availability
        };
    });

    return (
        <main className="min-h-screen bg-cyan-50">
            <Header />
            <PageNavigation
                cards={[
                    { title: 'Our Mission', href: '/mission', icon: Leaf },
                    { title: 'Join Us', href: '/join', icon: HeartHandshake }
                ]}
            />

            <div className="pt-32 px-6 max-w-7xl mx-auto pb-20">
                <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900">Book a Surf Lesson</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Calendar Section */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass p-6 rounded-3xl">
                            <div className="flex items-center gap-2 mb-4">
                                <Calendar className="w-6 h-6 text-cyan-600" />
                                <h2 className="text-2xl font-bold text-gray-900">Select a Date</h2>
                            </div>
                            <div className="grid grid-cols-7 gap-2">
                                {calendarDays.map((day, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: day.available ? 1.05 : 1 }}
                                        whileTap={{ scale: day.available ? 0.95 : 1 }}
                                        onClick={() => day.available && setSelectedDate(index)}
                                        disabled={!day.available}
                                        className={`p-3 rounded-xl text-center transition-all ${selectedDate === index
                                            ? 'bg-cyan-500 text-white shadow-lg'
                                            : day.available
                                                ? 'bg-white/70 hover:bg-white text-gray-800'
                                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                                            }`}
                                    >
                                        <div className="text-xs font-medium">{day.weekday}</div>
                                        <div className="text-lg font-bold">{day.day}</div>
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Time Slots */}
                        {selectedDate !== null && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-6 rounded-3xl"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Available Times</h3>
                                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                                    {timeSlots.map((slot) => (
                                        <motion.button
                                            key={slot.time}
                                            whileHover={{ scale: slot.available ? 1.05 : 1 }}
                                            whileTap={{ scale: slot.available ? 0.95 : 1 }}
                                            onClick={() => slot.available && setSelectedTime(slot.time)}
                                            disabled={!slot.available}
                                            className={`p-3 rounded-xl font-semibold transition-all ${selectedTime === slot.time
                                                ? 'bg-cyan-500 text-white shadow-lg'
                                                : slot.available
                                                    ? 'bg-white/70 hover:bg-white text-gray-800'
                                                    : 'bg-gray-200 text-gray-400 cursor-not-allowed line-through'
                                                }`}
                                        >
                                            {slot.time}
                                        </motion.button>
                                    ))}
                                </div>
                            </motion.div>
                        )}

                        {/* Instructors List */}
                        <div className="glass p-6 rounded-3xl">
                            <div className="flex items-center gap-2 mb-4">
                                <User className="w-6 h-6 text-cyan-600" />
                                <h2 className="text-2xl font-bold text-gray-900">Our Instructors</h2>
                            </div>
                            <div className="space-y-3">
                                {instructors.map((instructor, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`p-4 rounded-xl flex items-center justify-between ${instructor.available
                                            ? 'bg-white/70'
                                            : 'bg-gray-100 opacity-60'
                                            }`}
                                    >
                                        <div>
                                            <h3 className="font-bold text-gray-900">{instructor.name}</h3>
                                            <p className="text-sm text-gray-600">{instructor.specialty}</p>
                                        </div>
                                        <span
                                            className={`text-xs font-semibold px-3 py-1 rounded-full ${instructor.available
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-gray-200 text-gray-500'
                                                }`}
                                        >
                                            {instructor.available ? 'Available' : 'Booked'}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Widget Sidebar */}
                    <div className="space-y-6">
                        <div className="glass p-6 rounded-3xl sticky top-32">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h3>
                            <div className="space-y-3">
                                <motion.a
                                    href="https://wa.me/351912345678"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 p-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors cursor-pointer"
                                >
                                    <MessageCircle className="w-6 h-6" />
                                    <div>
                                        <div className="font-bold">WhatsApp</div>
                                        <div className="text-sm opacity-90">Chat with us</div>
                                    </div>
                                </motion.a>

                                <motion.a
                                    href="https://instagram.com/surffarm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors cursor-pointer"
                                >
                                    <Instagram className="w-6 h-6" />
                                    <div>
                                        <div className="font-bold">Instagram</div>
                                        <div className="text-sm opacity-90">Follow us</div>
                                    </div>
                                </motion.a>
                            </div>

                            {/* Surf Forecast Widget */}
                            <div className="mt-6">
                                <div className="flex items-center gap-2 mb-3">
                                    <WavesIcon className="w-5 h-5 text-cyan-600" />
                                    <h3 className="text-lg font-bold text-gray-900">Surf Forecast</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-white/70 p-3 rounded-xl">
                                        <div className="flex items-center gap-1 mb-1">
                                            <WavesIcon className="w-3 h-3 text-cyan-600" />
                                            <span className="text-xs text-gray-600">Waves</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">{forecastData.waveHeight}</p>
                                    </div>
                                    <div className="bg-white/70 p-3 rounded-xl">
                                        <div className="flex items-center gap-1 mb-1">
                                            <Wind className="w-3 h-3 text-cyan-600" />
                                            <span className="text-xs text-gray-600">Wind</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">{forecastData.windSpeed}</p>
                                        <p className="text-xs text-gray-600">{forecastData.windDirection}</p>
                                    </div>
                                    <div className="bg-white/70 p-3 rounded-xl">
                                        <div className="flex items-center gap-1 mb-1">
                                            <Droplets className="w-3 h-3 text-cyan-600" />
                                            <span className="text-xs text-gray-600">Water</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">{forecastData.waterTemp}</p>
                                    </div>
                                    <div className="bg-white/70 p-3 rounded-xl">
                                        <div className="flex items-center gap-1 mb-1">
                                            <Eye className="w-3 h-3 text-cyan-600" />
                                            <span className="text-xs text-gray-600">Rating</span>
                                        </div>
                                        <p className="text-sm font-bold text-cyan-600">{forecastData.rating}</p>
                                    </div>
                                </div>
                            </div>

                            {selectedDate !== null && selectedTime && (
                                <>
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="mt-6 p-4 bg-cyan-100 rounded-xl"
                                    >
                                        <h4 className="font-bold text-gray-900 mb-2">Booking Summary</h4>
                                        <p className="text-sm text-gray-700">
                                            Date: {calendarDays[selectedDate].weekday}, {calendarDays[selectedDate].day}
                                        </p>
                                        <p className="text-sm text-gray-700">Time: {selectedTime}</p>
                                    </motion.div>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-4"
                                    >
                                        <h4 className="font-bold text-gray-900 mb-2">Session Notes</h4>
                                        <textarea
                                            value={sessionNotes}
                                            onChange={(e) => setSessionNotes(e.target.value)}
                                            placeholder="Goals, board preferences, focus areas..."
                                            className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-cyan-400 focus:outline-none resize-none text-sm text-gray-800 placeholder-gray-500"
                                            rows={3}
                                            maxLength={500}
                                        />
                                        <p className="text-xs text-gray-600 mt-1">
                                            {sessionNotes.length}/500
                                        </p>
                                    </motion.div>

                                    <button className="w-full mt-4 py-2 bg-cyan-600 text-white rounded-lg font-semibold hover:bg-cyan-700 transition-colors">
                                        Confirm Booking
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
