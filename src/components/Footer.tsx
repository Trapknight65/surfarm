'use client';

import { motion } from 'framer-motion';
import { Instagram, Twitter, Facebook, Mail } from 'lucide-react';
import Link from 'next/link';

const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Mail, href: 'mailto:hello@surffarm.com', label: 'Email' },
];

const Footer = () => {
    return (
        <footer className="w-full py-8 px-6 bg-[#e0e5ec] flex flex-col items-center justify-center relative z-10">
            <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-6">

                {/* Logo / Copyright */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-gray-600 font-medium"
                >
                    © {new Date().getFullYear()} Allan Deschamps. All rights reserved.
                </motion.div>

                {/* Social Icons */}
                <div className="flex items-center gap-6">
                    {socialLinks.map((social, index) => (
                        <motion.div
                            key={social.label}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <Link
                                href={social.href}
                                className="p-3 rounded-full neumorphic text-gray-600 hover:text-blue-500 hover:neumorphic-pressed transition-all duration-300 block"
                                aria-label={social.label}
                            >
                                <social.icon className="w-5 h-5" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
