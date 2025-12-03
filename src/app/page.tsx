/**
 * Author: Allan Deschamps
 * Surf Farm - Home Page
 */
'use client';

import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import MissionCards from '@/components/MissionCards';

export default function Home() {
  return (
    <main className="relative">
      <Header />
      <HeroSlider />
      <MissionCards />
    </main>
  );
}
