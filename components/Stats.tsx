'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { GraduationCap, MapPin, BookOpen, Calendar } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

function CountUpNumber({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const stepTime = 30;
      const totalSteps = duration / stepTime;
      const increment = value / totalSteps;

      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, stepTime);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-maroon-700">
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const { t, language } = useLanguage();

  const statsData = [
    {
      icon: GraduationCap,
      value: 500,
      suffix: '+',
      label: t('hero.stat1Label'),
      description: language === 'hi' ? 'निःशुल्क कंप्यूटर, अंग्रेजी और कोचिंग' : 'Free computer, English & board exam coaching',
    },
    {
      icon: MapPin,
      value: 10,
      suffix: '',
      label: t('hero.stat2Label'),
      description: language === 'hi' ? 'पूर्वी उत्तर प्रदेश क्षेत्र में' : 'Across Eastern Uttar Pradesh region',
    },
    {
      icon: BookOpen,
      value: 15,
      suffix: '',
      label: t('hero.stat3Label'),
      description: language === 'hi' ? 'कौशल विकास और स्वास्थ्य शिविर' : 'Skill development & health drives',
    },
    {
      icon: Calendar,
      value: 5,
      suffix: language === 'hi' ? ' वर्ष' : ' Years',
      label: t('hero.stat4Label'),
      description: language === 'hi' ? 'श्रीमती लगनी देवी की विरासत की निरंतरता' : 'Carrying forward Smt. Lagni Devi\'s legacy',
    },
  ];

  return (
    <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 sm:-mt-16 mb-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl p-6 sm:p-10 shadow-soft-xl border border-gold-500/20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-gold-500/15"
      >
        {statsData.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className={`flex flex-col items-center text-center ${
                idx !== 0 ? 'pt-6 sm:pt-0 sm:pl-6 lg:pl-8' : ''
              }`}
            >
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-600 mb-3 border border-gold-500/20">
                <Icon className="w-6 h-6 text-gold-600" />
              </div>
              <CountUpNumber value={stat.value} suffix={stat.suffix} />
              <h3 className="font-semibold text-dark text-base mt-2">
                {stat.label}
              </h3>
              <p className="text-xs text-muted mt-1 max-w-[200px]">
                {stat.description}
              </p>
            </div>
          );
        })}
      </motion.div>
    </section>
  );
}
