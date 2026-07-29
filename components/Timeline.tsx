'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Sparkles, Heart, BookOpen, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Timeline() {
  const { t, language } = useLanguage();

  const milestones = [
    {
      year: '2020',
      title: language === 'hi' ? 'फाउंडेशन का पंजीकरण' : 'Foundation Registered',
      description: t('timeline.2020'),
      icon: Heart,
      stats: '2020',
    },
    {
      year: '2021',
      title: language === 'hi' ? 'पहला निःशुल्क शिक्षा शिविर' : 'First Free Education Camp',
      description: t('timeline.2021'),
      icon: BookOpen,
      stats: '50 Students',
    },
    {
      year: '2022',
      title: language === 'hi' ? '5 जिलों में विस्तार एवं स्वास्थ्य शिविर' : 'Expansion & First Village Health Camp',
      description: t('timeline.2022'),
      icon: Sparkles,
      stats: '5 Districts',
    },
    {
      year: '2023',
      title: language === 'hi' ? 'महिला कौशल विकास की शुरुआत' : 'Women’s Skill Development Launch',
      description: t('timeline.2023'),
      icon: Award,
      stats: 'Skills Center',
    },
    {
      year: '2024',
      title: language === 'hi' ? '500+ छात्र एवं 10 जिले' : '500+ Students & 10 Districts',
      description: t('timeline.2024'),
      icon: CheckCircle2,
      stats: '500+ Impacted',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-cream-200/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-line justify-center mb-3">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-600">
              {t('timeline.eyebrow')}
            </span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-dark leading-tight mb-4">
            {language === 'hi' ? 'हमारी प्रभाव और विकास की यात्रा' : 'Our Journey of Impact & Growth'}
          </h2>
          <p className="text-base sm:text-lg text-muted">
            {language === 'hi'
              ? 'एक छोटे से बरामदे से 10 जिलों तक पहुँचने का हमारा सफर।'
              : 'From an informal verandah classroom to a registered foundation reaching 10 districts—here is how we grew step by step.'}
          </p>
        </div>

        {/* Vertical Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold-400 via-maroon-700 to-gold-500 transform sm:-translate-x-1/2" />

          <div className="space-y-12 relative">
            {milestones.map((item, idx) => {
              const Icon = item.icon;
              const isEven = idx % 2 === 0;

              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className={`flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  } gap-6 sm:gap-0 relative`}
                >
                  {/* Timeline Dot Indicator */}
                  <div className="absolute left-4 sm:left-1/2 top-0 w-8 h-8 rounded-full bg-maroon-700 text-gold-400 border-4 border-white shadow-lg flex items-center justify-center transform -translate-x-1/2 z-10">
                    <Icon className="w-3.5 h-3.5" />
                  </div>

                  {/* Content Card Side */}
                  <div className="w-full sm:w-1/2 pl-12 sm:pl-0 sm:px-8">
                    <div className="bg-white p-6 sm:p-8 rounded-3xl shadow-card border border-gold-500/20 hover:border-gold-500 transition-all duration-300 group">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-serif text-3xl font-extrabold text-maroon-700">
                          {item.year}
                        </span>
                        <span className="text-[11px] font-bold uppercase tracking-wider text-gold-600 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
                          {item.stats}
                        </span>
                      </div>
                      <h3 className="font-serif font-bold text-xl text-dark group-hover:text-maroon-700 transition-colors mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm text-muted leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Empty side for layout balance */}
                  <div className="hidden sm:block sm:w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
