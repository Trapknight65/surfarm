/**
 * Author: Allan Deschamps
 * Surf Farm - Surf Dashboard Page
 */
'use client';

import Header from '@/components/Header';
import PageNavigation from '@/components/PageNavigation';
import { Leaf, HeartHandshake, Instagram, MessageCircle, Calendar, User, Wind, Waves as WavesIcon, Droplets, Eye, Users, Globe, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ProgramCard from './components/ProgramCard';
import SocialImpactStats from './components/SocialImpactStats';
import GroupSessionBooking from './components/GroupSessionBooking';

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
    const [consent, setConsent] = useState(false);
    const [selectedProgram, setSelectedProgram] = useState<'kids' | 'refugees' | 'women' | null>(null);

    // Generate calendar days
    const calendarDays = Array.from({ length: 14 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() + i);
        return {
            day: date.getDate(),
            weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
            available: Math.random() > 0.3,
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

            <div className="pt-32 px-6 pb-20 max-w-[1800px] mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-900">Surf Dashboard</h1>

                {/* Social Surf Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center"
                >
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full mb-4">
                        <Heart className="w-5 h-5" />
                        <span className="font-semibold">Surf for All</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                        Building Community Through Waves
                    </h2>
                    <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                        Our social surf programs bring the joy and healing power of surfing to underserved communities.
                        Join us in making waves of positive change.
                    </p>
                </motion.div>

                {/* Social Impact Statistics */}
                <div className="mb-12">
                    <SocialImpactStats />
                </div>

                {/* Social Programs Section */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
                        Our Social Programs
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <ProgramCard
                            icon={Users}
                            title="Kids & Teens Surf Club"
                            targetAudience="Ages 8-17, all skill levels welcome"
                            duration="2-hour sessions, weekly programs available"
                            benefits={[
                                'Professional instruction & safety gear',
                                'Skill development & confidence building',
                                'Teamwork & ocean awareness',
                                'Equipment provided'
                            ]}
                            color="bg-gradient-to-br from-orange-400 to-red-500"
                            onBookClick={() => setSelectedProgram('kids')}
                        />
                        <ProgramCard
                            icon={Globe}
                            title="Refugees & Newcomers"
                            targetAudience="All ages, multilingual support available"
                            duration="Free 2-hour sessions, flexible scheduling"
                            benefits={[
                                'Completely FREE program',
                                'Community integration & healing',
                                'Multilingual instructors',
                                'All equipment provided'
                            ]}
                            color="bg-gradient-to-br from-green-400 to-emerald-500"
                            onBookClick={() => setSelectedProgram('refugees')}
                        />
                        <ProgramCard
                            icon={Heart}
                            title="Women's Empowerment"
                            targetAudience="Women-only environment, all levels"
                            duration="2-hour sessions, supportive community"
                            benefits={[
                                'Female instructors only',
                                'Confidence & strength building',
                                'Supportive sisterhood',
                                'Safe, inclusive space'
                            ]}
                            color="bg-gradient-to-br from-pink-400 to-purple-500"
                            onBookClick={() => setSelectedProgram('women')}
                        />
                    </div>
                </div>

                {/* Group Booking Modal */}
                <GroupSessionBooking
                    selectedProgram={selectedProgram}
                    onClose={() => setSelectedProgram(null)}
                />

                {/* Divider */}
                <div className="border-t-2 border-gray-200 my-12"></div>

                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">Individual Booking</h2>

                {/* Dashboard Grid */}
                <div className="grid grid-cols-12 gap-6">
                    {/* Left Column - Forecast & Instructors */}
                    <div className="col-span-12 lg:col-span-3 space-y-6">
                        {/* Surf Forecast */}
                        <div className="glass p-6 rounded-3xl">
                            <div className="flex items-center gap-2 mb-4">
                                <WavesIcon className="w-5 h-5 text-cyan-600" />
                                <h2 className="text-xl font-bold text-gray-900">Surf Forecast</h2>
                            </div>
                            <div className="space-y-3">
                                <div className="bg-white/70 p-3 rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <WavesIcon className="w-4 h-4 text-cyan-600" />
                                            <span className="text-sm text-gray-600">Waves</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">{forecastData.waveHeight}</p>
                                    </div>
                                </div>
                                <div className="bg-white/70 p-3 rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Wind className="w-4 h-4 text-cyan-600" />
                                            <span className="text-sm text-gray-600">Wind</span>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm font-bold text-gray-900">{forecastData.windSpeed}</p>
                                            <p className="text-xs text-gray-600">{forecastData.windDirection}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-white/70 p-3 rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Droplets className="w-4 h-4 text-cyan-600" />
                                            <span className="text-sm text-gray-600">Water</span>
                                        </div>
                                        <p className="text-sm font-bold text-gray-900">{forecastData.waterTemp}</p>
                                    </div>
                                </div>
                                <div className="bg-white/70 p-3 rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <Eye className="w-4 h-4 text-cyan-600" />
                                            <span className="text-sm text-gray-600">Rating</span>
                                        </div>
                                        <p className="text-sm font-bold text-cyan-600">{forecastData.rating}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Contact */}
                        <div className="glass p-6 rounded-3xl">
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Contact</h3>
                            <div className="space-y-3">
                                <motion.a
                                    href="https://wa.me/351912345678"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-3 p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors cursor-pointer"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    <div>
                                        <div className="font-bold text-sm">WhatsApp</div>
                                        <div className="text-xs opacity-90">Chat with us</div>
                                    </div>
                                </motion.a>

                                <motion.a
                                    href="https://instagram.com/surffarm"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors cursor-pointer"
                                >
                                    <Instagram className="w-5 h-5" />
                                    <div>
                                        <div className="font-bold text-sm">Instagram</div>
                                        <div className="text-xs opacity-90">Follow us</div>
                                    </div>
                                </motion.a>
                            </div>
                        </div>
                    </div>

                    {/* Center Column - Calendar & Booking */}
                    <div className="col-span-12 lg:col-span-6 space-y-6">
                        {/* Calendar */}
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
                        <div className="glass p-6 rounded-3xl">
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Available Times</h3>
                            {selectedDate !== null ? (
                                <div className="grid grid-cols-5 gap-3">
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
                            ) : (
                                <p className="text-gray-500 text-center py-8">Select a date to view available times</p>
                            )}
                        </div>

                        {/* Booking Summary */}
                        {selectedDate !== null && selectedTime && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="glass p-6 rounded-3xl"
                            >
                                <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Summary</h3>
                                <div className="bg-cyan-100 p-4 rounded-xl mb-4">
                                    <p className="text-sm text-gray-700 mb-1">
                                        <span className="font-semibold">Date:</span> {calendarDays[selectedDate].weekday}, {calendarDays[selectedDate].day}
                                    </p>
                                    <p className="text-sm text-gray-700">
                                        <span className="font-semibold">Time:</span> {selectedTime}
                                    </p>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-semibold text-gray-700 mb-2">Session Notes</label>
                                    <textarea
                                        value={sessionNotes}
                                        onChange={(e) => setSessionNotes(e.target.value)}
                                        placeholder="Goals, board preferences, focus areas..."
                                        className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-cyan-400 focus:outline-none resize-none text-sm text-gray-800 placeholder-gray-500"
                                        rows={3}
                                        maxLength={500}
                                    />
                                    <p className="text-xs text-gray-600 mt-1 text-right">
                                        {sessionNotes.length}/500
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={consent}
                                            onChange={(e) => setConsent(e.target.checked)}
                                            className="mt-1 w-4 h-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                                        />
                                        <span className="text-sm text-gray-600">
                                            I agree to the <a href="#" className="text-cyan-600 hover:underline">Privacy Policy</a> and consent to having my data processed for booking purposes.
                                        </span>
                                    </label>
                                </div>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={!consent}
                                    className={`w-full py-3 rounded-xl font-semibold transition-colors shadow-lg ${consent
                                        ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                >
                                    Confirm Booking
                                </motion.button>
                            </motion.div>
                        )}
                    </div>

                    {/* Right Column - Instructors */}
                    <div className="col-span-12 lg:col-span-3">
                        <div className="glass p-6 rounded-3xl">
                            <div className="flex items-center gap-2 mb-4">
                                <User className="w-6 h-6 text-cyan-600" />
                                <h2 className="text-xl font-bold text-gray-900">Our Instructors</h2>
                            </div>
                            <div className="space-y-3">
                                {instructors.map((instructor, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`p-4 rounded-xl ${instructor.available
                                            ? 'bg-white/70'
                                            : 'bg-gray-100 opacity-60'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <div>
                                                <h3 className="font-bold text-gray-900">{instructor.name}</h3>
                                                <p className="text-xs text-gray-600">{instructor.specialty}</p>
                                            </div>
                                            <span
                                                className={`text-xs font-semibold px-2 py-1 rounded-full ${instructor.available
                                                    ? 'bg-green-100 text-green-700'
                                                    : 'bg-gray-200 text-gray-500'
                                                    }`}
                                            >
                                                {instructor.available ? 'Available' : 'Booked'}
                                            </span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
