/**
 * Author: Allan Deschamps
 * Surf Farm - Join Us Page
 */
'use client';

import Header from '@/components/Header';
import PageNavigation from '@/components/PageNavigation';
import { Leaf, Waves, Heart, MessageCircle, Instagram } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const donationAmounts = [1, 5, 10, 25, 50, 100];

// Donation Counter Component
function DonationCounter({ targetAmount }: { targetAmount: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = targetAmount / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= targetAmount) {
                setCount(targetAmount);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [targetAmount]);

    return (
        <p className="text-3xl font-bold text-amber-800">
            €{count.toLocaleString()}
        </p>
    );
}

// Partner Logo Carousel Component
function PartnerLogoCarousel() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const partners = [
        { name: 'Ocean Care Foundation', logo: '🌊' },
        { name: 'Green Wave Collective', logo: '🌿' },
        { name: 'Local Harvest Co-op', logo: '🌾' },
        { name: 'Sustainable Surf Alliance', logo: '🏄' },
        { name: 'Eco Farm Network', logo: '🌱' },
        { name: 'Coastal Community Trust', logo: '🏖️' }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % partners.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [partners.length]);

    return (
        <div className="bg-white/70 p-6 rounded-xl">
            {/* All logos displayed horizontally */}
            <div className="flex justify-center items-center gap-8">
                {partners.map((partner, index) => (
                    <motion.div
                        key={index}
                        animate={{
                            opacity: index === currentIndex ? 1 : 0.3,
                            scale: index === currentIndex ? 1.3 : 1
                        }}
                        transition={{ duration: 0.5 }}
                        className="text-5xl cursor-pointer"
                        title={partner.name}
                        onClick={() => setCurrentIndex(index)}
                    >
                        {partner.logo}
                    </motion.div>
                ))}
            </div>

            {/* Carousel Indicators */}
            <div className="flex justify-center gap-2 mt-6">
                {partners.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all ${index === currentIndex ? 'bg-amber-700 w-6' : 'bg-gray-300'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default function JoinPage() {
    const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
    const [customAmount, setCustomAmount] = useState('');
    const [activeSection, setActiveSection] = useState('volunteer');
    const [donationType, setDonationType] = useState<'money' | 'equipment'>('money');

    const handleAmountSelect = (amount: number) => {
        setSelectedAmount(amount);
        setCustomAmount('');
    };

    const handleCustomAmount = (value: string) => {
        setCustomAmount(value);
        setSelectedAmount(null);
    };

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const offset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            const sections = ['volunteer', 'donate', 'partner'];
            const scrollPosition = window.scrollY + 200;

            for (const sectionId of sections) {
                const element = document.getElementById(sectionId);
                if (element) {
                    const { offsetTop, offsetHeight } = element;
                    if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                        setActiveSection(sectionId);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <main className="min-h-screen bg-amber-50">
            <Header />
            <PageNavigation
                cards={[
                    { title: 'Our Mission', href: '/mission', icon: Leaf },
                    { title: 'Surf', href: '/surf', icon: Waves }
                ]}
            />
            <div className="pt-32 px-6 max-w-6xl mx-auto pb-20 relative">
                <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900">Join Us</h1>

                <div className="flex gap-8">
                    <div className="flex-1 space-y-6">
                        <motion.div
                            id="volunteer"
                            className="glass p-8 rounded-3xl scroll-mt-32"
                            animate={{
                                scale: activeSection === 'volunteer' ? 1.02 : 1,
                                boxShadow: activeSection === 'volunteer'
                                    ? '0 20px 50px rgba(120, 53, 15, 0.3)'
                                    : '0 10px 30px rgba(0, 0, 0, 0.1)'
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-3xl font-bold mb-6 text-gray-900">Volunteer</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <VolunteerBenefits />
                                <div><VolunteerForm /></div>
                            </div>
                        </motion.div>

                        <motion.div
                            id="donate"
                            className="glass p-8 rounded-3xl scroll-mt-32"
                            animate={{
                                scale: activeSection === 'donate' ? 1.02 : 1,
                                boxShadow: activeSection === 'donate'
                                    ? '0 20px 50px rgba(120, 53, 15, 0.3)'
                                    : '0 10px 30px rgba(0, 0, 0, 0.1)'
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                    <div className="flex items-center gap-2 mb-4">
                                        <Heart className="w-6 h-6 text-amber-800" />
                                        <h3 className="text-2xl font-bold text-gray-900">Make a Donation</h3>
                                    </div>

                                    {/* Donation Type Toggle */}
                                    <div className="flex p-1 bg-gray-200 rounded-xl mb-6">
                                        <button
                                            onClick={() => setDonationType('money')}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${donationType === 'money'
                                                ? 'bg-white text-amber-800 shadow-sm'
                                                : 'text-gray-600 hover:text-gray-800'
                                                }`}
                                        >
                                            Money
                                        </button>
                                        <button
                                            onClick={() => setDonationType('equipment')}
                                            className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${donationType === 'equipment'
                                                ? 'bg-white text-amber-800 shadow-sm'
                                                : 'text-gray-600 hover:text-gray-800'
                                                }`}
                                        >
                                            Equipment
                                        </button>
                                    </div>

                                    {donationType === 'money' ? (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="grid grid-cols-3 gap-3 mb-4">
                                                {donationAmounts.map((amount) => (
                                                    <motion.button
                                                        key={amount}
                                                        whileHover={{ scale: 1.05 }}
                                                        whileTap={{ scale: 0.95 }}
                                                        onClick={() => handleAmountSelect(amount)}
                                                        className={`p-4 rounded-xl font-bold transition-all ${selectedAmount === amount
                                                            ? 'bg-amber-700 text-white shadow-lg'
                                                            : 'bg-white/70 hover:bg-white text-gray-800'
                                                            }`}
                                                    >
                                                        €{amount}
                                                    </motion.button>
                                                ))}
                                            </div>

                                            <div className="mb-4">
                                                <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                    Or enter custom amount
                                                </label>
                                                <div className="relative">
                                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600 font-bold">€</span>
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        value={customAmount}
                                                        onChange={(e) => handleCustomAmount(e.target.value)}
                                                        placeholder="0"
                                                        className="w-full pl-8 pr-4 py-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 font-semibold"
                                                    />
                                                </div>
                                            </div>

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                disabled={!selectedAmount && !customAmount}
                                                className={`w-full py-3 rounded-xl font-bold transition-all ${selectedAmount || customAmount
                                                    ? 'bg-amber-700 text-white hover:bg-amber-800 shadow-lg'
                                                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    }`}
                                            >
                                                {selectedAmount || customAmount
                                                    ? `Donate €${selectedAmount || customAmount}`
                                                    : 'Select an amount'}
                                            </motion.button>
                                        </motion.div>
                                    ) : (
                                        <EquipmentDonationForm />
                                    )}
                                </div>

                                <div className="flex flex-col justify-center">
                                    <h2 className="text-3xl font-bold mb-4 text-gray-900">Donate</h2>
                                    <p className="text-xl text-gray-700 leading-relaxed">
                                        Support our mission to create a sustainable surf and farm community.
                                        Every contribution helps us grow.
                                    </p>

                                    {/* Donation Counter */}
                                    <div className="mt-6 bg-amber-100 p-4 rounded-xl">
                                        <p className="text-sm text-gray-600 mb-1">Total Donations This Year</p>
                                        <DonationCounter targetAmount={45678} />
                                    </div>

                                    <div className="mt-4 space-y-2">
                                        <p className="text-sm text-gray-600">✓ 100% of donations go directly to our programs</p>
                                        <p className="text-sm text-gray-600">✓ Tax-deductible receipts available</p>
                                        <p className="text-sm text-gray-600">✓ Secure payment processing</p>
                                    </div>

                                    {/* Contact Buttons */}
                                    <div className="flex gap-3 mt-6">
                                        <motion.a
                                            href="https://wa.me/351912345678"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 flex items-center justify-center gap-2 p-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors cursor-pointer shadow-md"
                                        >
                                            <MessageCircle className="w-5 h-5" />
                                            <span className="font-semibold text-sm">WhatsApp</span>
                                        </motion.a>

                                        <motion.a
                                            href="https://instagram.com/surffarm"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="flex-1 flex items-center justify-center gap-2 p-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-colors cursor-pointer shadow-md"
                                        >
                                            <Instagram className="w-5 h-5" />
                                            <span className="font-semibold text-sm">Instagram</span>
                                        </motion.a>
                                    </div>

                                    {/* Yearly Report Download */}
                                    <motion.a
                                        href="/reports/2024-annual-report.pdf"
                                        download
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-white/70 hover:bg-white rounded-xl text-sm font-semibold text-gray-700 transition-colors"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        Download 2024 Annual Report
                                    </motion.a>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            id="partner"
                            className="glass p-8 rounded-3xl scroll-mt-32"
                            animate={{
                                scale: activeSection === 'partner' ? 1.02 : 1,
                                boxShadow: activeSection === 'partner'
                                    ? '0 20px 50px rgba(120, 53, 15, 0.3)'
                                    : '0 10px 30px rgba(0, 0, 0, 0.1)'
                            }}
                            transition={{ duration: 0.3 }}
                        >
                            <h2 className="text-3xl font-bold mb-6 text-gray-900">Partner With Us</h2>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <div className="lg:col-span-2">
                                    <PartnershipForm />
                                </div>

                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold text-gray-900 mb-4">Partner Testimonials</h3>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white/70 p-4 rounded-xl">
                                        <p className="text-sm text-gray-700 italic mb-2">"Working with Surf Farm has been an incredible experience. Their commitment to sustainability is inspiring."</p>
                                        <p className="text-xs font-semibold text-gray-900">- Ocean Care Foundation</p>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white/70 p-4 rounded-xl">
                                        <p className="text-sm text-gray-700 italic mb-2">"A true partnership that benefits both our communities and the environment."</p>
                                        <p className="text-xs font-semibold text-gray-900">- Green Wave Collective</p>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white/70 p-4 rounded-xl">
                                        <p className="text-sm text-gray-700 italic mb-2">"Surf Farm's innovative approach to community building sets them apart."</p>
                                        <p className="text-xs font-semibold text-gray-900">- Local Harvest Co-op</p>
                                    </motion.div>
                                </div>
                            </div>

                            {/* Partner Logo Carousel - Full Width at Bottom */}
                            <div className="mt-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">Our Partners</h3>
                                <PartnerLogoCarousel />
                            </div>
                        </motion.div>
                    </div>

                    <div className="hidden lg:block w-48">
                        <div className="sticky top-32 space-y-2">
                            <h3 className="text-sm font-bold text-gray-900 mb-4 px-4">Quick Navigation</h3>

                            <button
                                onClick={() => scrollToSection('volunteer')}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeSection === 'volunteer'
                                    ? 'bg-amber-700 text-white shadow-lg'
                                    : 'bg-white/70 text-gray-700 hover:bg-white'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${activeSection === 'volunteer' ? 'bg-white' : 'bg-amber-700'
                                        }`} />
                                    <span className="font-semibold text-sm">Volunteer</span>
                                </div>
                            </button>

                            <button
                                onClick={() => scrollToSection('donate')}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeSection === 'donate'
                                    ? 'bg-amber-700 text-white shadow-lg'
                                    : 'bg-white/70 text-gray-700 hover:bg-white'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${activeSection === 'donate' ? 'bg-white' : 'bg-amber-700'
                                        }`} />
                                    <span className="font-semibold text-sm">Donate</span>
                                </div>
                            </button>

                            <button
                                onClick={() => scrollToSection('partner')}
                                className={`w-full text-left px-4 py-3 rounded-xl transition-all ${activeSection === 'partner'
                                    ? 'bg-amber-700 text-white shadow-lg'
                                    : 'bg-white/70 text-gray-700 hover:bg-white'
                                    }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className={`w-2 h-2 rounded-full ${activeSection === 'partner' ? 'bg-white' : 'bg-amber-700'
                                        }`} />
                                    <span className="font-semibold text-sm">Partner</span>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function VolunteerBenefits() {
    const [progress, setProgress] = useState(0);
    const benefits = [
        { icon: '🌊', title: 'Surf Skills Development', description: 'Free surf lessons and coaching from experienced instructors to improve your technique.' },
        { icon: '🌱', title: 'Sustainable Living Knowledge', description: 'Learn organic farming, permaculture, and eco-friendly practices hands-on.' },
        { icon: '🤝', title: 'Community Connection', description: 'Join a vibrant community of like-minded individuals passionate about sustainability.' },
        { icon: '📜', title: 'Experience & References', description: 'Build your resume with meaningful volunteer experience and professional references.' }
    ];

    useEffect(() => {
        const duration = 3140 * benefits.length;
        const startTime = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const newProgress = Math.min((elapsed / duration) * 100, 100);
            setProgress(newProgress);

            if (newProgress >= 100) clearInterval(interval);
        }, 50);

        return () => clearInterval(interval);
    }, [benefits.length]);

    return (
        <div className="space-y-6">
            <p className="text-xl text-gray-700 leading-relaxed">
                Help us maintain our gardens, teach surf lessons, or organize community events.
                Your time and skills make a real difference.
            </p>

            <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">What You'll Gain</h3>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mb-6">
                    <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: `${progress}%` }}
                        className="h-full bg-gradient-to-r from-amber-600 to-amber-800"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {benefits.map((benefit, index) => {
                        const itemProgress = ((progress - (index * 25)) / 25) * 100;
                        const isVisible = itemProgress > 0;

                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0.3 }}
                                animate={{ opacity: isVisible ? 1 : 0.3 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white/70 p-4 rounded-xl"
                            >
                                <h4 className="font-bold text-gray-900 mb-2">{benefit.icon} {benefit.title}</h4>
                                <p className="text-sm text-gray-700">{benefit.description}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function VolunteerForm() {
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
        <div className="bg-white/50 p-6 rounded-2xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Sign Up to Volunteer</h3>

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
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Availability</label>
                        <select value={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.value })} className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800">
                            <option value="">Select...</option>
                            <option value="weekdays">Weekdays</option>
                            <option value="weekends">Weekends</option>
                            <option value="flexible">Flexible</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Areas of Interest</label>
                        <div className="space-y-2">
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
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Previous Experience (Optional)</label>
                        <textarea value={formData.experience} onChange={(e) => setFormData({ ...formData, experience: e.target.value })} className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800 resize-none" rows={6} placeholder="Tell us about any relevant experience..." />
                    </div>
                </motion.div>
            )}

            {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                        <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800" placeholder="Your name" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                        <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800" placeholder="email@example.com" />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full p-3 rounded-xl bg-white/70 border-2 border-transparent focus:border-amber-600 focus:outline-none text-gray-800" placeholder="+351 123 456 789" />
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
                                I agree to the <a href="#" className="text-amber-700 hover:underline">Privacy Policy</a> and consent to having my data processed for volunteering purposes.
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
                    {step === totalSteps ? 'Submit Application' : 'Next'}
                </motion.button>
            </div>
        </div>
    );
}

function PartnershipForm() {
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

function EquipmentDonationForm() {
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
