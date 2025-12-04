/**
 * Author: Allan Deschamps
 * Surf Farm - Join Us Page
 */
'use client';

import Header from '@/components/Header';
import PageNavigation from '@/components/PageNavigation';
import { Leaf, Waves, Heart, MessageCircle, Instagram, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

// Import local components
import DonationCounter from './components/DonationCounter';
import PartnerLogoCarousel from './components/PartnerLogoCarousel';
import VolunteerBenefits from './components/VolunteerBenefits';
import VolunteerForm from './components/VolunteerForm';
import PartnershipForm from './components/PartnershipForm';
import EquipmentDonationForm from './components/EquipmentDonationForm';

const donationAmounts = [1, 5, 10, 25, 50, 100];

export default function JoinPage() {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [activeSection, setActiveSection] = useState('volunteer');
    const [donationType, setDonationType] = useState<'money' | 'equipment'>('money');
    const [showPartnershipForm, setShowPartnershipForm] = useState(false);

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmountChange = (value: string) => {
        setCustomAmount(value);
        setSelectedAmount(null);
    };

    const navigationCards = [
        { title: 'Our Mission', href: '/', icon: Leaf },
        { title: 'Surf', href: '/surf', icon: Waves }
    ];

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(sectionId);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-amber-50">
            <Header />
            <PageNavigation cards={navigationCards} />

            {/* Desktop Quick Navigation Sidebar - With Labels */}
            <div className="hidden lg:block fixed right-6 top-1/2 -translate-y-1/2 z-30">
                <div className="glass rounded-2xl p-3 space-y-2">
                    {[
                        { id: 'volunteer', icon: Leaf, label: 'Volunteer' },
                        { id: 'donate', icon: Heart, label: 'Donate' },
                        { id: 'partner', icon: Waves, label: 'Partner' }
                    ].map(({ id, icon: Icon, label }) => (
                        <motion.button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            whileHover={{ scale: 1.05, x: 2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-full px-4 py-3 rounded-xl flex items-center gap-3 transition-all ${activeSection === id
                                ? 'bg-amber-700 text-white shadow-lg'
                                : 'bg-white/50 text-gray-700 hover:bg-white/70'
                                }`}
                            title={label}
                        >
                            <Icon className="w-5 h-5 flex-shrink-0" />
                            <span className="text-sm font-semibold whitespace-nowrap">{label}</span>
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Mobile Quick Navigation Sidebar - Icons Only (Right Side) */}
            <div className="lg:hidden fixed right-4 top-1/2 -translate-y-1/2 z-30">
                <div className="glass rounded-2xl p-2 space-y-2">
                    {[
                        { id: 'volunteer', icon: Leaf, label: 'Volunteer' },
                        { id: 'donate', icon: Heart, label: 'Donate' },
                        { id: 'partner', icon: Waves, label: 'Partner' }
                    ].map(({ id, icon: Icon, label }) => (
                        <motion.button
                            key={id}
                            onClick={() => scrollToSection(id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${activeSection === id
                                ? 'bg-amber-700 text-white shadow-lg'
                                : 'bg-white/50 text-gray-700 hover:bg-white/70'
                                }`}
                            title={label}
                        >
                            <Icon className="w-5 h-5" />
                        </motion.button>
                    ))}
                </div>
            </div>

            {/* Back Navigation */}
            <div className="fixed top-20 md:top-24 left-4 md:left-6 z-30">
                <div className="flex flex-col gap-2">
                    <Link href="/">
                        <motion.button
                            whileHover={{ scale: 1.05, x: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass px-3 md:px-4 py-2 md:py-2.5 rounded-xl flex items-center gap-2 hover:bg-white/70 transition-colors text-sm md:text-base"
                        >
                            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="font-semibold text-gray-700">Mission</span>
                        </motion.button>
                    </Link>
                    <Link href="/surf">
                        <motion.button
                            whileHover={{ scale: 1.05, x: -2 }}
                            whileTap={{ scale: 0.95 }}
                            className="glass px-3 md:px-4 py-2 md:py-2.5 rounded-xl flex items-center gap-2 hover:bg-white/70 transition-colors text-sm md:text-base"
                        >
                            <ArrowLeft className="w-4 h-4 md:w-5 md:h-5" />
                            <span className="font-semibold text-gray-700">Surf</span>
                        </motion.button>
                    </Link>
                </div>
            </div>

            <main className="pt-20 md:pt-24 pb-12 md:pb-20 px-4 sm:px-6 md:px-8">
                <div className="max-w-6xl mx-auto space-y-8 md:space-y-12">
                    {/* Page Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-3 md:space-y-4"
                    >
                        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                            Join Our Movement
                        </h1>
                        <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Be part of something bigger. Whether through volunteering, donations, or partnerships,
                            your contribution helps us create a sustainable future.
                        </p>
                    </motion.div>

                    {/* Volunteer Section */}
                    <motion.div
                        id="volunteer"
                        className="glass p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl scroll-mt-24 md:scroll-mt-32"
                        animate={{
                            scale: activeSection === 'volunteer' ? 1.02 : 1,
                            boxShadow: activeSection === 'volunteer'
                                ? '0 20px 50px rgba(120, 53, 15, 0.3)'
                                : '0 10px 30px rgba(0, 0, 0, 0.1)'
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900">Volunteer</h2>

                        {/* Mobile: Form first, then benefits */}
                        <div className="lg:hidden space-y-3 md:space-y-4">
                            <VolunteerForm />
                            <VolunteerBenefits />
                        </div>

                        {/* Desktop: Side by side layout */}
                        <div className="hidden lg:grid grid-cols-2 gap-8">
                            <VolunteerBenefits />
                            <VolunteerForm />
                        </div>
                    </motion.div>

                    {/* Donate Section */}
                    <motion.div
                        id="donate"
                        className="glass p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl scroll-mt-24 md:scroll-mt-32"
                        animate={{
                            scale: activeSection === 'donate' ? 1.02 : 1,
                            boxShadow: activeSection === 'donate'
                                ? '0 20px 50px rgba(120, 53, 15, 0.3)'
                                : '0 10px 30px rgba(0, 0, 0, 0.1)'
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900">Support Us</h2>

                        {/* Donation Type Selector */}
                        <div className="flex gap-2 md:gap-3 mb-6 md:mb-8">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setDonationType('money')}
                                className={`flex-1 py-2.5 md:py-3 px-4 md:px-6 rounded-xl font-semibold transition-all text-sm md:text-base ${donationType === 'money'
                                    ? 'bg-amber-700 text-white shadow-lg'
                                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                                    }`}
                            >
                                💰 Financial Support
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setDonationType('equipment')}
                                className={`flex-1 py-2.5 md:py-3 px-4 md:px-6 rounded-xl font-semibold transition-all text-sm md:text-base ${donationType === 'equipment'
                                    ? 'bg-amber-700 text-white shadow-lg'
                                    : 'bg-white/50 text-gray-700 hover:bg-white/70'
                                    }`}
                            >
                                🏄 Equipment Donation
                            </motion.button>
                        </div>

                        {donationType === 'money' ? (
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                                {/* Donation Impact */}
                                <div className="space-y-4 md:space-y-6">
                                    <div className="bg-white/70 p-4 md:p-6 rounded-xl">
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Your Impact</h3>
                                        <div className="space-y-3 md:space-y-4">
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl md:text-3xl">🌊</span>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm md:text-base">€10 - Surf Lesson</p>
                                                    <p className="text-xs md:text-sm text-gray-600">Provides one surf lesson for a local youth</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl md:text-3xl">🌱</span>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm md:text-base">€25 - Garden Supplies</p>
                                                    <p className="text-xs md:text-sm text-gray-600">Funds seeds and tools for our community garden</p>
                                                </div>
                                            </div>
                                            <div className="flex items-start gap-3">
                                                <span className="text-2xl md:text-3xl">🏖️</span>
                                                <div>
                                                    <p className="font-semibold text-gray-900 text-sm md:text-base">€50 - Beach Cleanup</p>
                                                    <p className="text-xs md:text-sm text-gray-600">Sponsors a full beach cleanup event</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Donation Counter */}
                                    <div className="hidden md:block bg-gradient-to-br from-amber-100 to-amber-200 p-4 md:p-6 rounded-xl text-center">
                                        <p className="text-sm md:text-base text-gray-700 mb-2">Total Raised This Month</p>
                                        <DonationCounter targetAmount={12450} />
                                        <p className="text-xs md:text-sm text-gray-600 mt-2">Goal: €15,000</p>
                                        <div className="w-full bg-gray-300 rounded-full h-2 md:h-3 mt-3 md:mt-4">
                                            <div className="bg-amber-700 h-2 md:h-3 rounded-full" style={{ width: '83%' }} />
                                        </div>
                                    </div>
                                </div>

                                {/* Donation Form */}
                                <div className="bg-white/50 p-4 md:p-6 rounded-2xl">
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Make a Donation</h3>

                                    {/* Amount Selection */}
                                    <div className="grid grid-cols-3 gap-2 md:gap-3 mb-4 md:mb-6">
                                        {donationAmounts.map((amount) => (
                                            <motion.button
                                                key={amount}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleAmountSelect(amount)}
                                                className={`py-2.5 md:py-3 px-3 md:px-4 rounded-xl font-bold transition-all text-sm md:text-base ${selectedAmount === amount
                                                    ? 'bg-amber-700 text-white shadow-lg'
                                                    : 'bg-white/70 text-gray-700 hover:bg-white'
                                                    }`}
                                            >
                                                €{amount}
                                            </motion.button>
                                        ))}
                                    </div>

                                    {/* Custom Amount */}
                                    <div className="mb-4 md:mb-6">
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">Custom Amount</label>
                                        <div className="relative">
                                            <span className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 text-gray-600 font-semibold text-sm md:text-base">€</span>
                                            <input
                                                type="number"
                                                value={customAmount}
                                                onChange={(e) => handleCustomAmountChange(e.target.value)}
                                                className="w-full pl-8 md:pl-10 pr-3 md:pr-4 py-2.5 md:py-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 text-sm md:text-base"
                                                placeholder="Enter amount"
                                            />
                                        </div>
                                    </div>

                                    {/* Donation Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={!selectedAmount && !customAmount}
                                        className={`w-full py-3 md:py-4 rounded-xl font-bold transition-all text-sm md:text-base ${selectedAmount || customAmount
                                            ? 'bg-amber-700 text-white hover:bg-amber-800 shadow-lg'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            }`}
                                    >
                                        Donate {selectedAmount ? `€${selectedAmount}` : customAmount ? `€${customAmount}` : 'Now'}
                                    </motion.button>

                                    <p className="text-xs text-gray-600 mt-3 md:mt-4 text-center">
                                        Secure payment powered by Stripe. Your donation is tax-deductible.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="max-w-2xl mx-auto">
                                <div className="bg-white/50 p-4 md:p-6 rounded-2xl">
                                    <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Donate Equipment</h3>
                                    <p className="text-sm md:text-base text-gray-700 mb-4 md:mb-6">
                                        Have surf equipment you no longer use? Donate it to help our community programs!
                                    </p>
                                    <EquipmentDonationForm />
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Partner Section */}
                    <motion.div
                        id="partner"
                        className="glass p-4 sm:p-6 md:p-8 rounded-2xl md:rounded-3xl scroll-mt-24 md:scroll-mt-32"
                        animate={{
                            scale: activeSection === 'partner' ? 1.02 : 1,
                            boxShadow: activeSection === 'partner'
                                ? '0 20px 50px rgba(120, 53, 15, 0.3)'
                                : '0 10px 30px rgba(0, 0, 0, 0.1)'
                        }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex items-center justify-between mb-4 md:mb-6">
                            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Partner With Us</h2>

                            {/* Mobile: Simple toggle button */}
                            <motion.button
                                onClick={() => setShowPartnershipForm(!showPartnershipForm)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="lg:hidden px-3 md:px-4 py-1.5 md:py-2 bg-amber-700 text-white rounded-lg font-semibold hover:bg-amber-800 transition-colors flex items-center gap-1.5 text-xs md:text-sm"
                            >
                                {showPartnershipForm ? (
                                    <>
                                        <ChevronUp className="w-4 h-4" />
                                        Hide Form
                                    </>
                                ) : (
                                    <>
                                        <ChevronDown className="w-4 h-4" />
                                        Show Form
                                    </>
                                )}
                            </motion.button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
                            {/* Partnership Info */}
                            <div className="space-y-4 md:space-y-6">
                                <p className="text-base md:text-lg text-gray-700 leading-relaxed">
                                    Join forces with Surf Farm to create meaningful impact in our community.
                                    We collaborate with organizations that share our values of sustainability and community empowerment.
                                </p>

                                <div className="space-y-3 md:space-y-4">
                                    <div className="bg-white/70 p-3 md:p-4 rounded-xl">
                                        <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">🤝 Event Collaboration</h4>
                                        <p className="text-xs md:text-sm text-gray-700">Co-host surf competitions, beach cleanups, and community events</p>
                                    </div>
                                    <div className="bg-white/70 p-3 md:p-4 rounded-xl">
                                        <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">💼 Corporate Sponsorship</h4>
                                        <p className="text-xs md:text-sm text-gray-700">Support our programs while gaining brand visibility</p>
                                    </div>
                                    <div className="bg-white/70 p-3 md:p-4 rounded-xl">
                                        <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">📚 Educational Programs</h4>
                                        <p className="text-xs md:text-sm text-gray-700">Partner on sustainability and ocean conservation education</p>
                                    </div>
                                </div>

                                {/* Partner Logos */}
                                <div>
                                    <h3 className="text-base md:text-lg font-bold text-gray-900 mb-3 md:mb-4">Our Partners</h3>
                                    <PartnerLogoCarousel />
                                </div>
                            </div>

                            {/* Mobile: Expandable Form */}
                            <AnimatePresence>
                                {showPartnershipForm && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0, y: -20 }}
                                        animate={{ opacity: 1, height: 'auto', y: 0 }}
                                        exit={{ opacity: 0, height: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="lg:hidden bg-white/50 p-4 md:p-6 rounded-2xl overflow-hidden"
                                    >
                                        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-3 md:mb-4">Partnership Inquiry</h3>
                                        <PartnershipForm />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Desktop: Flippable Card */}
                            <div className="hidden lg:block perspective-1000">
                                <motion.div
                                    className="relative w-full h-[600px] cursor-pointer"
                                    style={{ transformStyle: 'preserve-3d' }}
                                    animate={{ rotateY: showPartnershipForm ? 180 : 0 }}
                                    transition={{ duration: 0.6, ease: 'easeInOut' }}
                                    onClick={() => setShowPartnershipForm(!showPartnershipForm)}
                                >
                                    {/* Front of Card */}
                                    <div
                                        className="absolute inset-0 backface-hidden"
                                        style={{ backfaceVisibility: 'hidden' }}
                                    >
                                        <div className="h-full bg-gradient-to-br from-amber-100 to-amber-200 p-8 rounded-2xl flex flex-col items-center justify-center text-center space-y-6 shadow-xl">
                                            <motion.div
                                                animate={{ scale: [1, 1.1, 1] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >
                                                <Waves className="w-24 h-24 text-amber-700" />
                                            </motion.div>
                                            <h3 className="text-3xl font-bold text-gray-900">Ready to Partner?</h3>
                                            <p className="text-lg text-gray-700 max-w-md">
                                                Click this card to reveal our partnership inquiry form
                                            </p>
                                            <div className="flex items-center gap-2 text-amber-700 font-semibold">
                                                <span>Click to flip</span>
                                                <ChevronDown className="w-5 h-5 animate-bounce" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Back of Card */}
                                    <div
                                        className="absolute inset-0 backface-hidden"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)'
                                        }}
                                    >
                                        <div className="h-full bg-white/50 p-6 rounded-2xl overflow-y-auto">
                                            <div className="flex items-center justify-between mb-4">
                                                <h3 className="text-xl font-bold text-gray-900">Partnership Inquiry</h3>
                                                <span className="text-sm text-gray-600">Click to flip back</span>
                                            </div>
                                            <PartnershipForm />
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Social Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center space-y-3 md:space-y-4"
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900">Stay Connected</h3>
                        <div className="flex justify-center gap-4 md:gap-6">
                            {[
                                { icon: Instagram, label: 'Instagram' },
                                { icon: MessageCircle, label: 'WhatsApp' },
                                { icon: Heart, label: 'Newsletter' }
                            ].map(({ icon: Icon, label }) => (
                                <motion.a
                                    key={label}
                                    href="#"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="glass p-3 md:p-4 rounded-full hover:bg-white/70 transition-colors touch-target"
                                    aria-label={label}
                                >
                                    <Icon className="w-5 h-5 md:w-6 md:h-6 text-gray-700" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>
        </div>
    );
}
