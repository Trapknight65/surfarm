'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import EventCard, { Event } from './EventCard';
import EventModal from './EventModal';

export const events: Event[] = [
    {
        id: '1',
        title: 'Community Flea Market',
        type: 'market',
        date: 'Sat, Dec 14',
        time: '10:00 AM - 4:00 PM',
        location: 'Surf Farm Main Grounds',
        description: 'Join us for our monthly flea market! Find vintage treasures, handmade crafts from local artisans, and delicious street food. All proceeds support our youth surf programs.',
        image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&q=80&w=1000',
        price: 'Free Entry'
    },
    {
        id: '2',
        title: 'Sunset Charity Concert',
        type: 'concert',
        date: 'Fri, Dec 20',
        time: '6:00 PM - 10:00 PM',
        location: 'Beachside Stage',
        description: 'An evening of live music featuring local bands "The Wave Riders" and "Ocean Soul". Enjoy the sunset, good vibes, and great company. Food and drinks available.',
        image: 'https://images.unsplash.com/photo-1459749411177-0473ef71607b?auto=format&fit=crop&q=80&w=1000',
        price: '€15 Donation'
    },
    {
        id: '3',
        title: 'Holiday Gear Giveaway',
        type: 'giveaway',
        date: 'Sun, Dec 22',
        time: '2:00 PM - 5:00 PM',
        location: 'Community Center',
        description: 'We are giving away refurbished surfboards and wetsuits to local families in need. Come by to pick up gear or donate your old equipment.',
        image: 'https://images.unsplash.com/photo-1502680390469-be75c86b636f?auto=format&fit=crop&q=80&w=1000',
        price: 'Free'
    },
    {
        id: '4',
        title: 'Sustainable Living Workshop',
        type: 'workshop',
        date: 'Sat, Jan 4',
        time: '11:00 AM - 1:00 PM',
        location: 'Eco Garden',
        description: 'Learn how to start your own organic garden and compost system. Hands-on workshop led by our head gardener. Seeds and starter kits provided.',
        image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=1000',
        price: '€10 Donation'
    }
];

export default function EventsSection() {
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    return (
        <section className="py-8" id="events">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Latest Events</h2>
                <button className="text-cyan-600 font-semibold hover:text-cyan-700 transition-colors">
                    View All Events →
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {events.map((event) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        onClick={setSelectedEvent}
                    />
                ))}
            </div>

            <EventModal
                event={selectedEvent}
                onClose={() => setSelectedEvent(null)}
            />
        </section>
    );
}
