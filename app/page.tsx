'use client';

import React, { useState } from 'react';
import AnnouncementBar from '@/components/AnnouncementBar';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Stats from '@/components/Stats';
import WhatWeDo from '@/components/WhatWeDo';
import AboutStory from '@/components/AboutStory';
import Vision from '@/components/Vision';
import Timeline from '@/components/Timeline';
import Programs from '@/components/Programs';
import Community from '@/components/Community';
import MediaCoverage from '@/components/MediaCoverage';
import StoriesImpact from '@/components/StoriesImpact';
import PhotoJournal from '@/components/PhotoJournal';
import VoicesOfImpact from '@/components/VoicesOfImpact';
import SuccessStories from '@/components/SuccessStories';
import ComingTogether from '@/components/ComingTogether';
import Donate from '@/components/Donate';
import Footer from '@/components/Footer';
import Modals from '@/components/Modals';

export default function Home() {
  // Modal dialog states
  const [donateOpen, setDonateOpen] = useState(false);
  const [volunteerOpen, setVolunteerOpen] = useState(false);
  const [volunteerRole, setVolunteerRole] = useState<'Volunteer' | 'Mentor'>('Volunteer');
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string>('Basic Computer Skills');

  const handleOpenDonate = () => {
    setDonateOpen(true);
  };

  const handleOpenVolunteer = (role: 'Volunteer' | 'Mentor') => {
    setVolunteerRole(role);
    setVolunteerOpen(true);
  };

  const handleOpenApply = (courseTitle: string) => {
    setSelectedCourse(courseTitle);
    setApplyOpen(true);
  };

  return (
    <main className="min-h-screen bg-cream-100 font-sans selection:bg-gold-500 selection:text-white">
      {/* A. Top Announcement Bar */}
      <AnnouncementBar onApplyClick={() => handleOpenApply('Basic Computer Skills')} />

      {/* B. Sticky Navbar */}
      <Navbar onDonateClick={handleOpenDonate} />

      {/* C. Hero Section */}
      <Hero onDonateClick={handleOpenDonate} />

      {/* C2. 4-Column Stats Bar */}
      <Stats />

      {/* C3. What We Do Pillar Section */}
      <WhatWeDo />

      {/* D. Our Story / About Section */}
      <AboutStory />

      {/* E. Vision Section */}
      <Vision />

      {/* F. Leadership & Team Section - Commented Out
      <Team />
      */}

      {/* G. Timeline / Our Journey Section */}
      <Timeline />

      {/* H. Programs / Educational Courses Section */}
      <Programs onApply={handleOpenApply} />

      {/* I. Community Care & Relief Section */}
      <Community />

      {/* J. Media Coverage Section */}
      <MediaCoverage />

      {/* J2. Stories & Impact Journal Section */}
      <StoriesImpact />

      {/* J3. Photo Journal Gallery Grid */}
      <PhotoJournal />

      {/* J4. Voices Of Impact Quotes Section */}
      <VoicesOfImpact />

      {/* K. Success Stories Section */}
      <SuccessStories />

      {/* K2. Coming Together Upcoming Events Section */}
      <ComingTogether />

      {/* L. Get Involved / Donate Section */}
      <Donate
        onDonateModalOpen={handleOpenDonate}
        onVolunteerModalOpen={handleOpenVolunteer}
      />

      {/* M. Contact & Footer Section */}
      <Footer />

      {/* Interactive Modals */}
      <Modals
        donateOpen={donateOpen}
        onDonateClose={() => setDonateOpen(false)}
        volunteerOpen={volunteerOpen}
        volunteerRole={volunteerRole}
        onVolunteerClose={() => setVolunteerOpen(false)}
        applyOpen={applyOpen}
        selectedCourse={selectedCourse}
        onApplyClose={() => setApplyOpen(false)}
      />
    </main>
  );
}
