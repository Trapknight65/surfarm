'use client';

import { motion } from 'framer-motion';
import { Calendar, MapPin, Clock, Tag } from 'lucide-react';

export interface Event {
    id: string;
    title: string;
    type: 'market' | 'giveaway' | 'concert' | 'workshop';
    date: string;
    time: string;
    location: string;
    description: string;
    image: string;
    price: string;
}

interface EventCardProps {
    event: Event;
    onClick: (event: Event) => void;
}

const typeColors = {
    market: 'bg-orange-100 text-orange-700',
    giveaway: 'bg-green-100 text-green-700',
    concert: 'bg-purple-100 text-purple-700',
    workshop: 'bg-blue-100 text-blue-700'
};

const typeLabels = {
    market: 'Flea Market',
    giveaway: 'Giveaway',
    concert: 'Concert',
    workshop: 'Workshop'
};

export default function EventCard({ event, onClick }: EventCardProps) {
    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all cursor-pointer border border-gray-100"
            onClick={() => onClick(event)}
        >
            {/* Image Placeholder - In a real app, use Next.js Image */}
            <div className="h-48 bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 z-20">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${typeColors[event.type]}`}>
                        {typeLabels[event.type]}
                    </span>
                </div>
                <div className="absolute bottom-4 left-4 z-20 text-white">
                    <p className="font-bold text-lg">{event.price}</p>
                </div>
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">{event.title}</h3>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Calendar className="w-4 h-4 text-cyan-600" />
                        <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <Clock className="w-4 h-4 text-cyan-600" />
                        <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 text-sm">
                        <MapPin className="w-4 h-4 text-cyan-600" />
                        <span>{event.location}</span>
                    </div>
                </div>

                <button className="w-full py-2.5 rounded-xl bg-gray-50 text-cyan-700 font-semibold text-sm group-hover:bg-cyan-50 transition-colors">
                    View Details
                </button>
            </div>
        </motion.div>
    );
}
