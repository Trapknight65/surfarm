"use client";

import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import FocusCards from '@/components/FocusCards';
import CTASection from '@/components/CTASection';
import Footer from '@/components/Footer';
import ThemeSwitcher from '@/components/ThemeSwitcher';
import ThemeEffects from '@/components/ThemeEffects';

export default function Home() {
  return (
    <div className="min-h-screen bg-bg relative overflow-x-hidden">
      {/* Background Effects */}
      <ThemeEffects />

      {/* Fixed Header */}
      <Header />

      {/* Main Content */}
      <main className="relative">
        {/* Hero Section - Full Screen */}
        <section id="home" className="relative">
          <HeroSlider />
        </section>

        {/* Content Sections with proper z-index */}
        <div className="relative z-10 bg-bg">
          {/* Three Pillars Section */}
          <section id="about">
            <FocusCards />
          </section>

          {/* Call to Action Section */}
          <section id="cta">
            <CTASection />
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </main>

      {/* Floating Theme Switcher */}
      <ThemeSwitcher />
    </div>
  );
}
