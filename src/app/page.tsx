'use client';

import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import MissionCards from '@/components/MissionCards';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSlider />
      <MissionCards />
      <Footer />
    </main>
  );
}
