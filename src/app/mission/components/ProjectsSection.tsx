'use client';

import { motion } from 'framer-motion';
import { Sprout, Leaf, Droplets, Sun } from 'lucide-react';

export interface Project {
    id: string;
    title: string;
    category: 'farming' | 'eco-system' | 'community';
    status: 'active' | 'planning' | 'completed';
    description: string;
    icon: any;
    image: string;
}

export const projects: Project[] = [
    {
        id: '1',
        title: 'Organic Garden Expansion',
        category: 'farming',
        status: 'active',
        description: 'Doubling our vegetable production area to supply local schools with fresh organic produce.',
        icon: Sprout,
        image: 'https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: '2',
        title: 'Water Recycling System',
        category: 'eco-system',
        status: 'active',
        description: 'Implementing a greywater filtration system to irrigate our surf camp gardens.',
        icon: Droplets,
        image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb7d5b43?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: '3',
        title: 'Solar Energy Transition',
        category: 'eco-system',
        status: 'planning',
        description: 'Installing solar panels to power 80% of our facility operations by 2026.',
        icon: Sun,
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=1000'
    },
    {
        id: '4',
        title: 'Permaculture Workshop',
        category: 'community',
        status: 'active',
        description: 'Weekly educational sessions teaching locals how to build sustainable food forests.',
        icon: Leaf,
        image: 'https://images.unsplash.com/photo-1591857177580-dc82b9e4e119?auto=format&fit=crop&q=80&w=1000'
    }
];

export default function ProjectsSection() {
    return (
        <section className="py-12" id="projects">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Current Projects</h2>
                    <p className="text-gray-600 mt-2">Innovating for a sustainable future</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-3xl bg-white shadow-lg hover:shadow-xl transition-all"
                    >
                        <div className="absolute inset-0">
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        </div>

                        <div className="relative p-6 h-64 flex flex-col justify-end text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-1.5 bg-green-500/20 backdrop-blur-md rounded-lg">
                                    <project.icon className="w-4 h-4 text-green-300" />
                                </div>
                                <span className="text-xs font-bold uppercase tracking-wider text-green-300">
                                    {project.category}
                                </span>
                                <span className={`ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${project.status === 'active' ? 'bg-green-500 text-white' :
                                        project.status === 'planning' ? 'bg-amber-500 text-white' :
                                            'bg-blue-500 text-white'
                                    }`}>
                                    {project.status}
                                </span>
                            </div>

                            <h3 className="text-xl font-bold mb-2 group-hover:text-green-300 transition-colors">
                                {project.title}
                            </h3>
                            <p className="text-sm text-gray-200 line-clamp-2">
                                {project.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
