'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, MapPin, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ComingTogether() {
  const { language } = useLanguage();

  const events = [
    {
      month: 'AUG',
      day: '25',
      badge: 'UPCOMING',
      title: language === 'hi' ? 'निःशुल्क नेत्र एवं स्वास्थ्य जांच शिविर' : 'Free Eye Checkup & Medical Camp',
      details: language === 'hi' ? 'ग्रामीण स्वास्थ्य केंद्र' : 'Rural Health Center',
      href: '#get-involved',
    },
    {
      month: 'SEP',
      day: '12',
      badge: 'UPCOMING',
      title: language === 'hi' ? 'कंप्यूटर साक्षरता दीक्षांत समारोह' : 'Digital Literacy Graduation Ceremony',
      details: language === 'hi' ? 'एलडीएमएफ शिक्षा लैब' : 'LDMF Learning Lab',
      href: '#get-involved',
    },
    {
      month: 'OCT',
      day: '05',
      badge: 'UPCOMING',
      title: language === 'hi' ? 'महिला सिलाई किट एवं मशीन वितरण' : 'Women Vocational Sewing Kit Drive',
      details: language === 'hi' ? 'सामुदायिक व्यावसायिक केंद्र' : 'Community Vocational Center',
      href: '#get-involved',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-cream-100/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="eyebrow-line mb-3">
              <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-600">
                {language === 'hi' ? 'एक साथ आना' : 'COMING TOGETHER'}
              </span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-dark leading-tight">
              {language === 'hi' ? 'अगला कदम, एक साथ।' : 'The next step, together.'}
            </h2>
          </div>

          <a
            href="#get-involved"
            className="inline-flex items-center gap-1.5 font-semibold text-xs sm:text-sm text-maroon-700 hover:text-maroon-800 border-b-2 border-gold-500 pb-0.5 transition-all group shrink-0"
          >
            <span>{language === 'hi' ? 'सभी कार्यक्रम देखें' : 'All events'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 3 Event Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {events.map((evt, idx) => (
            <motion.a
              key={idx}
              href={evt.href}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-gold-500/20 hover:border-gold-500 hover:shadow-card transition-all duration-300 flex items-center gap-5 group"
            >
              {/* Date Icon Box */}
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-2xl bg-maroon-700/10 border border-maroon-700/20 text-maroon-700 flex items-center justify-center shrink-0 group-hover:bg-maroon-700 group-hover:text-white transition-all duration-300 shadow-sm">
                <Calendar className="w-6 h-6 group-hover:text-gold-300" />
              </div>

              {/* Event Content */}
              <div className="overflow-hidden">
                <div className="flex items-center gap-1.5 mb-1 text-gold-600">
                  <Sparkles className="w-3.5 h-3.5 shrink-0" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider">
                    {evt.badge}
                  </span>
                </div>
                <h3 className="font-serif font-bold text-lg text-dark group-hover:text-maroon-700 transition-colors leading-snug truncate">
                  {evt.title}
                </h3>
                <p className="text-xs text-muted mt-1 truncate">
                  {evt.details}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
