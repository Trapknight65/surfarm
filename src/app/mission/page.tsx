'use client';

import Header from '@/components/Header';
import PageNavigation from '@/components/PageNavigation';
import { Waves, HeartHandshake } from 'lucide-react';

export default function MissionPage() {
    return (
        <main className="min-h-screen bg-green-50">
            <Header />
            <PageNavigation
                cards={[
                    { title: 'Surf', href: '/surf', icon: Waves },
                    { title: 'Join Us', href: '/join', icon: HeartHandshake }
                ]}
            />
            <div className="pt-32 px-6 max-w-7xl mx-auto pb-20">
                <h1 className="text-5xl md:text-7xl font-bold mb-8 text-gray-900">Our Mission</h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Content */}
                    <div className="flex-1 prose prose-lg prose-green max-w-none glass p-8 rounded-3xl">
                        <p className="text-xl text-gray-700 leading-relaxed mb-6">
                            At Surf Farm, we believe in the symbiotic relationship between the land and the sea.
                            Located in the beautiful Costa da Caparica, Portugal, we are cultivating a community
                            rooted in organic habits and sustainable surf culture.
                        </p>
                        <p className="text-xl text-gray-700 leading-relaxed">
                            Our goal is to plant seeds of change—both literally in our gardens and metaphorically
                            in the minds of our visitors. Through surfing, we connect with nature's power; through
                            farming, we connect with its nurturing cycles.
                        </p>
                    </div>

                    {/* Photo Board */}
                    <div className="w-full lg:w-auto flex-shrink-0">
                        <div className="glass p-4 rounded-2xl">
                            <div className="grid grid-cols-3 gap-2">
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
                                    <div
                                        key={i}
                                        className="w-[90px] h-[90px] bg-gradient-to-br from-green-200 to-blue-200 rounded-lg flex items-center justify-center text-gray-600 text-sm font-medium hover:scale-105 transition-transform cursor-pointer"
                                    >
                                        Photo {i}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
