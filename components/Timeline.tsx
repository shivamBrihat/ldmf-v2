'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, BookOpen, Award, Sparkles, Milestone } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface TimelineItem {
  id?: string;
  year: string;
  title?: string;
  badge?: string;
  description: string;
}

export default function Timeline() {
  const { t, language } = useLanguage();
  const [milestones, setMilestones] = useState<TimelineItem[]>([]);

  useEffect(() => {
    const currentMilestones = language === 'hi' ? [
      {
        year: '2023',
        title: 'स्थापना एवं पंजीकरण',
        badge: '2023',
        description: 'फाउंडेशन का औपचारिक पंजीकरण किया गया और छात्रों की सहायता के लिए बोर्ड परीक्षा कोचिंग शिविरों की शुरुआत की गई।',
      },
      {
        year: '2024',
        title: 'महिला व्यावसायिक कौशल विकास',
        badge: 'सिलाई प्रशिक्षण',
        description: 'महिलाओं के आत्मनिर्भरता के लिए सिलाई और हस्तशिल्प प्रशिक्षण केंद्र की शुरुआत की गई।',
      },
      {
        year: '2025',
        title: 'कंप्यूटर और संचार प्रशिक्षण',
        badge: 'डिजिटल साक्षरता',
        description: 'डिजिटल शिक्षा को बढ़ावा देने के लिए कंप्यूटर लैब, बुनियादी कंप्यूटर कोर्स और स्पोकन इंग्लिश कक्षाएं शुरू की गईं।',
      },
      {
        year: '2026',
        title: 'सामुदायिक कल्याण और विस्तार',
        badge: '2026 तक',
        description: 'नए ग्रामीण क्षेत्रों में कल्याणकारी कार्यक्रमों, स्वास्थ्य शिविरों और कौशल विकास पाठ्यक्रमों का विस्तार किया गया।',
      }
    ] : [
      {
        year: '2023',
        title: 'Foundation Registered & Launched',
        badge: '2023',
        description: 'Officially registered the foundation and launched Board Exam Intensive Coaching Camps to support rural students.',
      },
      {
        year: '2024',
        title: 'Women\'s Skill Development',
        badge: 'Tailoring & Craft',
        description: 'Initiated the Women’s Vocational Tailoring & Handicrafts Center to foster self-employment.',
      },
      {
        year: '2025',
        title: 'Computer Skills & Spoken English',
        badge: 'Digital Literacy',
        description: 'Opened a dedicated computer lab for Basic Computer Skills and Spoken English classes.',
      },
      {
        year: '2026',
        title: 'Community Welfare & Expansion',
        badge: 'Until 2026',
        description: 'Expanded welfare events, free health camps, and vocational courses across new rural districts.',
      }
    ];
    setMilestones(currentMilestones);
  }, [language, t]);

  // Icons array to alternate or use based on index
  const icons = [Heart, BookOpen, Award, Sparkles, Milestone];

  return (
    <section className="py-20 md:py-28 bg-[#FDFBF7] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="eyebrow-line justify-center mb-3">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-[#C9A227]">
              {language === 'hi' ? 'हमारी यात्रा' : 'OUR JOURNEY'}
            </span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] leading-tight mb-4">
            {language === 'hi' ? 'प्रभाव और विकास की हमारी यात्रा' : 'Our Journey of Impact & Growth'}
          </h2>
          <p className="text-base sm:text-lg text-stone-600">
            {language === 'hi'
              ? 'समुदायों को सशक्त बनाना और स्थायी आजीविका का निर्माण करना—यहाँ हमारी कदम-दर-कदम प्रगति है।'
              : 'Empowering communities and building sustainable livelihoods—here is our step-by-step progress.'}
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Vertical Line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-[2px] bg-[#C9A227]/40 -translate-x-[1px] md:translate-x-0" />

          {/* Timeline Items */}
          <div className="space-y-12 md:space-y-16">
            {milestones.map((item, idx) => {
              const IconComponent = icons[idx % icons.length];
              const isEven = idx % 2 === 0;

              return (
                <div key={idx} className="relative flex flex-col md:flex-row items-stretch w-full">
                  {/* Left spacing/content on desktop */}
                  <div className={`hidden md:block w-1/2 pr-12 text-right ${isEven ? 'opacity-0 pointer-events-none' : ''}`}>
                    {!isEven && (
                      <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-stone-200/60 hover:border-[#C9A227]/40 transition-all duration-300 relative inline-block text-left w-full"
                      >
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <span className="font-serif font-bold text-3xl sm:text-4xl text-[#7A1F2B]">
                            {item.year}
                          </span>
                          {item.badge && (
                            <span className="px-3 py-1 bg-[#C9A227]/10 text-[#9E7A28] border border-[#C9A227]/30 rounded-full font-sans font-bold text-[10px] tracking-wider uppercase">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1A1A1A] mb-2">
                          {item.title || (language === 'hi' ? 'मील का पत्थर' : 'Milestone')}
                        </h3>
                        <p className="text-sm text-stone-600 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </div>

                  {/* Node Badge on Timeline Axis */}
                  <div className="absolute left-4 md:left-1/2 top-4 md:top-8 -translate-x-1/2 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[#7A1F2B] text-white border-4 border-white shadow-md">
                    <IconComponent className="w-3.5 h-3.5" />
                  </div>

                  {/* Right content on desktop (always visible on mobile) */}
                  <div className={`w-full md:w-1/2 pl-12 md:pl-12 ${!isEven ? 'md:opacity-0 md:pointer-events-none' : ''}`}>
                    {(isEven || typeof window === 'undefined') && (
                      <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-stone-200/60 hover:border-[#C9A227]/40 transition-all duration-300 relative text-left w-full"
                      >
                        <div className="flex items-center justify-between gap-4 mb-4">
                          <span className="font-serif font-bold text-3xl sm:text-4xl text-[#7A1F2B]">
                            {item.year}
                          </span>
                          {item.badge && (
                            <span className="px-3 py-1 bg-[#C9A227]/10 text-[#9E7A28] border border-[#C9A227]/30 rounded-full font-sans font-bold text-[10px] tracking-wider uppercase">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1A1A1A] mb-2">
                          {item.title || (language === 'hi' ? 'मील का पत्थर' : 'Milestone')}
                        </h3>
                        <p className="text-sm text-stone-600 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
