'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, HeartHandshake, Zap, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function WhatWeDo() {
  const { language } = useLanguage();

  const initiatives = [
    {
      index: '01 →',
      title: language === 'hi' ? 'शिक्षा एवं कौशल' : 'Education',
      desc: language === 'hi' ? 'निःशुल्क शिक्षा और कौशल जो नए अवसर खोलते हैं।' : 'Free learning and skills that open doors.',
      icon: Sparkles,
      href: '#programs',
    },
    {
      index: '02 →',
      title: language === 'hi' ? 'सामुदायिक सेवा' : 'Community care',
      desc: language === 'hi' ? 'गरिमा, देखभाल और एकजुटता पर आधारित पहल।' : 'Initiatives built on dignity, care and solidarity.',
      icon: HeartHandshake,
      href: '#get-involved',
    },
    {
      index: '03 →',
      title: language === 'hi' ? 'विरासत एवं प्रेरणा' : 'Legacy',
      desc: language === 'hi' ? 'स्मरण को जीवंत प्रेरणा में बदलना।' : 'Turning remembrance into living inspiration.',
      icon: Zap,
      href: '#about',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="eyebrow-line mb-3">
              <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-600">
                {language === 'hi' ? 'हम क्या करते हैं' : 'WHAT WE DO'}
              </span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-dark leading-tight">
              {language === 'hi' ? 'लोगों के साथ, लोगों के लिए।' : 'With people, for people.'}
            </h2>
          </div>

          <a
            href="#programs"
            className="inline-flex items-center gap-1.5 font-semibold text-xs sm:text-sm text-maroon-700 hover:text-maroon-800 border-b-2 border-gold-500 pb-0.5 transition-all group shrink-0"
          >
            <span>{language === 'hi' ? 'सभी पहल देखें' : 'Explore all initiatives'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 3 Pillar Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {initiatives.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.a
                key={idx}
                href={item.href}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-cream-100/70 rounded-3xl p-8 border border-gold-500/20 hover:border-gold-500 hover:shadow-card transition-all duration-300 flex flex-col justify-between group h-64 relative overflow-hidden"
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-gold-500/10 text-gold-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-dark group-hover:text-maroon-700 transition-colors mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="text-xs font-bold text-gold-600 font-mono tracking-wider flex items-center gap-1 group-hover:text-maroon-700 transition-colors">
                  <span>{item.index}</span>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
