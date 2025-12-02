"use client";

import { Instagram, Facebook, Mail, MapPin } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="py-12 px-6 bg-bg border-t border-text/10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="neu-pressed w-12 h-12 rounded-full flex items-center justify-center">
                                <span className="text-accent text-xl">🌊</span>
                            </div>
                            <div className="flex flex-col leading-tight">
                                <span className="text-accent font-extrabold text-xl">Surf</span>
                                <span className="text-text font-extrabold text-xl -mt-1">Farm</span>
                            </div>
                        </div>
                        <p className="text-text/60 mb-4 max-w-sm">
                            Where ocean meets community. Experience the perfect blend of surfing and sustainable living.
                        </p>
                        <div className="flex items-center gap-2 text-text/60">
                            <MapPin size={18} />
                            <span>Ocean Beach, CA</span>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-bold text-text mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="#about" className="text-text/60 hover:text-accent transition-colors">About Us</Link></li>
                            <li><Link href="#lessons" className="text-text/60 hover:text-accent transition-colors">Lessons</Link></li>
                            <li><Link href="#community" className="text-text/60 hover:text-accent transition-colors">Community</Link></li>
                            <li><Link href="#contact" className="text-text/60 hover:text-accent transition-colors">Contact</Link></li>
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="font-bold text-text mb-4">Connect</h4>
                        <div className="flex gap-3">
                            <a href="#" className="neu-btn p-3 rounded-full hover:scale-110 transition-transform">
                                <Instagram size={20} className="text-accent" />
                            </a>
                            <a href="#" className="neu-btn p-3 rounded-full hover:scale-110 transition-transform">
                                <Facebook size={20} className="text-accent" />
                            </a>
                            <a href="mailto:hello@surfarm.com" className="neu-btn p-3 rounded-full hover:scale-110 transition-transform">
                                <Mail size={20} className="text-accent" />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-text/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-text/60 text-sm">
                        © {new Date().getFullYear()} Surf Farm. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-text/60">
                        <Link href="/privacy" className="hover:text-accent transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-accent transition-colors">Terms of Service</Link>
                        <Link href="/cookies" className="hover:text-accent transition-colors">Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
