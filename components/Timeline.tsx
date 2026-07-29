'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface TimelineItem {
  id?: string;
  year: string;
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
                description: m.description,
              }))
            );
            return;
          }
        }
      } catch (error) {
        console.error('Failed to fetch dynamic timeline:', error);
      }

      // Fallback default
      setMilestones([
        { year: '2020', description: t('timeline.2020') },
        { year: '2021', description: t('timeline.2021') },
        { year: '2022', description: t('timeline.2022') },
        { year: '2023', description: t('timeline.2023') },
        { year: '2024', description: t('timeline.2024') },
      ]);
    }

    fetchTimeline();
  }, [language, t]);

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
            {language === 'hi' ? 'निरंतर सेवा के मील के पत्थर' : 'Milestones of Dedicated Service'}
          </h2>
          <p className="text-base sm:text-lg text-muted">
            {language === 'hi'
              ? 'एक साधारण स्मरण प्रयास से बढ़कर 10 से अधिक जिलों में विस्तृत सामुदायिक अभियान तक का सफर।'
              : 'From a simple memorial tribute in Azamgarh to a multi-district outreach across Eastern UP.'}
          </p>
        </div>

        {/* Timeline Desktop & Mobile Grid */}
        <div className="relative border-l-2 border-gold-500/30 ml-4 sm:ml-32 space-y-12 pl-6 sm:pl-10">
          {milestones.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative group"
            >
              {/* Year Badge floating left on desktop */}
              <div className="sm:absolute sm:-left-44 sm:top-1 font-serif font-bold text-2xl text-maroon-700 sm:text-right w-28 mb-2 sm:mb-0">
                {item.year}
              </div>

              {/* Node Icon on Timeline Line */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-gold-500 group-hover:bg-maroon-700 group-hover:scale-125 transition-all shadow-md" />

              {/* Content Box */}
              <div className="bg-white rounded-2xl p-6 shadow-soft-xl border border-gold-500/20 hover:border-gold-500 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                  <h3 className="font-serif font-bold text-lg text-dark">
                    {language === 'hi' ? `${item.year} की उपलब्धि` : `${item.year} Milestone`}
                  </h3>
                </div>
                <p className="text-sm text-muted leading-relaxed">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
