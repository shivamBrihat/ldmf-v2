'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Team from '@/components/Team';
import Timeline from '@/components/Timeline';
import Vision from '@/components/Vision';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      {/* 1. Full-Width Maroon Hero Header */}
      <section className="bg-maroon-700 text-white py-16 sm:py-20 px-4 text-center border-b-4 border-gold-500 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-3 relative z-10">
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-wide">
            {language === 'hi' ? 'हमारे बारे में' : 'About Us'}
          </h1>
          <p className="text-sm sm:text-base text-gold-300 font-medium tracking-wide">
            {language === 'hi'
              ? 'श्रीमती लगनी देवी की स्मृति में — सेवा के अटूट संकल्प के साथ'
              : 'In memory of Smt. Lagni Devi — with a resolve to serve'}
          </p>
        </div>
      </section>

      {/* 2. Her Story & Memorial Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
          {/* Left Column: Memorial Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-maroon-700/5 rounded-3xl p-8 sm:p-10 border border-maroon-700/15 shadow-card flex flex-col items-center justify-center text-center space-y-5 relative">
              {/* LD Avatar / Image Circle */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-lg border-2 border-gold-500/50 relative">
                <Image
                  src="/images/lagni-devi-image.png"
                  alt="Smt. Lagni Devi"
                  fill
                  sizes="(max-width: 768px) 128px, 144px"
                  className="object-cover object-top"
                />
              </div>

              <div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-maroon-700">
                  Smt. Lagni Devi
                </h3>
              </div>

              <div className="w-12 h-0.5 bg-gold-500/40" />

              <p className="text-xs text-muted italic max-w-xs leading-relaxed">
                {language === 'hi'
                  ? '"सच्ची सेवा वही है जो बिना किसी स्वार्थ के सबसे ज़रूरतमंदों तक पहुँचे।"'
                  : '"True service is reaching out to those in need with unconditional compassion and dignity."'}
              </p>
            </div>
          </div>

          {/* Right Column: Her Story Prose */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                {language === 'hi' ? 'हमारा उद्देश्य' : 'OUR MISSION'}
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-maroon-700">
                {language === 'hi' ? 'हमारी कहानी' : 'Our Story'}
              </h2>
            </div>

            <div className="prose prose-stone max-w-none text-sm sm:text-base text-dark/85 leading-relaxed space-y-4">
              <p>
                {language === 'hi'
                  ? 'लगनी देवी मेमोरियल फाउंडेशन ग्रामीण समुदायों के सशक्तिकरण के लिए समर्पित एक गैर-लाभकारी संगठन है। हमारा मुख्य ध्यान मुफ्त शिक्षा, व्यावसायिक प्रशिक्षण प्रदान करने और सामुदायिक कल्याण कार्यक्रमों के आयोजन पर है।'
                  : 'Lagni Devi Memorial Foundation is a grassroots non-profit organisation dedicated to community empowerment. We focus on providing free education, vocational training, and organizing community welfare events.'}
              </p>

              <p>
                {language === 'hi'
                  ? 'हमारे मुख्य कार्यक्रमों में बुनियादी कंप्यूटर कौशल और डिजिटल साक्षरता, अंग्रेजी बोलना और संचार, महिलाओं के लिए सिलाई और हस्तशिल्प प्रशिक्षण, तथा बोर्ड परीक्षा कोचिंग शिविर शामिल हैं ताकि युवाओं और महिलाओं को सशक्त बनाया जा सके।'
                  : 'Our core programs include Basic Computer Skills & Digital Literacy, Spoken English & Communication, Women\'s Vocational Tailoring & Handicrafts, and Board Exam Intensive Coaching Camps to help youth and women build sustainable livelihoods.'}
              </p>

              <p>
                {language === 'hi'
                  ? 'अपने विभिन्न कार्यक्रमों के माध्यम से, हम वंचित समुदायों में व्यवस्थित सकारात्मक बदलाव और समान विकास के अवसर लाने का प्रयास करते हैं।'
                  : 'Through our various programs, we strive to bring systematic positive change and equal growth opportunities to underserved communities.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Pillars */}
      <Vision />

      {/* 4. Leadership Team - Commented Out
      <Team />
      */}

      {/* 5. Journey Timeline */}
      <Timeline />

      <Footer />
    </main>
  );
}
