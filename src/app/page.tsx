/**
 * Author: Allan Deschamps
 * Surf Farm - Home Page
 */
'use client';

import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import DesktopEventsWidget from '@/app/join/components/DesktopEventsWidget';
import ProjectsWidget from '@/app/mission/components/ProjectsWidget';
import ProjectsModal from '@/app/mission/components/ProjectsModal';
import { projects } from '@/app/mission/components/ProjectsSection';
import { events } from '@/app/join/components/EventsSection';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { WeatherWidget } from '@/components/Header';
import MobileEventsListModal from '@/app/join/components/MobileEventsListModal';
import MissionCards from '@/components/MissionCards';

export default function Home() {
  const router = useRouter();
  const [showProjects, setShowProjects] = useState(false);
  const [showEventsList, setShowEventsList] = useState(false);

  return (
    <main className="relative">
      <Header
        customRightWidget={({ openForecastModal }) => (
          <div className="flex items-center gap-4">
            <DesktopEventsWidget
              events={events}
              onClick={() => setShowEventsList(true)}
            />
            <ProjectsWidget
              projects={projects}
              onClick={() => setShowProjects(true)}
            />
            <WeatherWidget onClick={openForecastModal} />
          </div>
        )}
      />
      <ProjectsModal
        isOpen={showProjects}
        onClose={() => setShowProjects(false)}
      />
      <MobileEventsListModal
        isOpen={showEventsList}
        onClose={() => setShowEventsList(false)}
        events={events}
        onEventSelect={() => { }} // No-op for now or redirect to join page specific event
      />
      <HeroSlider />
      <MissionCards />
    </main>
  );
}
