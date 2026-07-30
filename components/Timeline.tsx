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
    async function fetchTimeline() {
      try {
        const res = await fetch('/api/timeline');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setMilestones(
              data.map((m: any) => ({
                id: m.id,
                year: m.year,
                title: m.title,
                badge: m.badge,
                description: m.description,
              }))
            );
            return;
          }
        }
      } catch (error) {
        console.error('Failed to fetch dynamic timeline:', error);
      }

      // Fallback defaults matching screenshot details
      setMilestones([
        {
          year: '2020',
          title: 'Foundation Registered',
          badge: '2020',
          description: 'Foundation registered in memory of Smt. Lagni Devi.',
        },
        {
          year: '2021',
          title: 'First Free Education Camp',
          badge: '50 STUDENTS',
          description: 'First free education camp; 50 students from 3 villages coached for board exams.',
        },
        {
          year: '2022',
          title: 'Healthcare Expansion',
          badge: '15 CAMPS',
          description: 'Expanded to healthcare camps, conducting 15 rural medical drives.',
        },
        {
          year: '2023',
          title: 'Women’s Vocational Skills Center',
          badge: '50+ MACHINES',
          description: 'Initiated Vocational Skill Center, distributing 50+ sewing machines.',
        },
        {
          year: '2024',
          title: '1,500+ Lives Impacted',
          badge: 'MILESTONE',
          description: 'Reached milestone of 1,500+ lives impacted across Eastern UP.',
        },
      ]);
    }

    fetchTimeline();
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
              ? 'एक अनौपचारिक बरामदा कक्षा से लेकर 10 जिलों तक पहुँचने वाले एक पंजीकृत फाउंडेशन तक - यहाँ बताया गया है कि हम कैसे कदम दर कदम बढ़े।'
              : 'From an informal verandah classroom to a registered foundation reaching 10 districts—here is how we grew step by step.'}
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
