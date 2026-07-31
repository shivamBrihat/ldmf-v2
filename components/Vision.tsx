'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Scissors, Stethoscope, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Vision() {
  const { t, language } = useLanguage();

  const pillars = [
    {
      icon: GraduationCap,
      title: t('vision.point1'),
      subtitle: language === 'hi' ? 'ग्रामीण क्षेत्रों में युवाओं का विकास' : 'Nurturing Young Minds in Rural Areas',
      description: language === 'hi'
        ? 'वंचित बच्चों को मुफ्त ट्यूशन, कंप्यूटर साक्षरता, अध्ययन सामग्री और बोर्ड परीक्षा की तैयारी प्रदान करना।'
        : 'Providing free tuition, computer literacy, school supplies, and board exam preparation to underprivileged children across rural districts.',
      tag: language === 'hi' ? 'स्तंभ 01' : 'PILLAR 01',
    },
    {
      icon: Scissors,
      title: t('vision.point2'),
      subtitle: language === 'hi' ? 'आर्थिक आत्मनिर्भरता को बढ़ावा' : 'Fostering Economic Self-Reliance',
      description: language === 'hi'
        ? 'ग्रामीण महिलाओं को सिलाई, कढ़ाई और छोटे व्यवसाय प्रबंधन में सक्षम बनाना ताकि वे स्वतंत्र आय अर्जित कर सकें।'
        : 'Equipping rural women with professional tailoring, embroidery, handicraft, and micro-entrepreneurship skills so they can run independent businesses.',
      tag: language === 'hi' ? 'स्तंभ 02' : 'PILLAR 02',
    },
    {
      icon: Stethoscope,
      title: t('vision.point3'),
      subtitle: language === 'hi' ? 'द्वार पर सुलभ स्वास्थ्य सेवाएँ' : 'Accessible Healthcare at Doorsteps',
      description: language === 'hi'
        ? 'मुफ्त स्वास्थ्य जांच शिविर, नेत्र परीक्षण, दवा वितरण और स्वच्छता अभियान आयोजित करना।'
        : 'Organizing free health checkup camps, eye care screening, free medicine distribution, hygiene drives, and emergency crisis relief.',
      tag: language === 'hi' ? 'स्तंभ 03' : 'PILLAR 03',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-cream-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-line justify-center mb-3">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-600">
              {t('vision.eyebrow')}
            </span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-dark leading-tight mb-4">
            {language === 'hi' ? 'हमारे दृष्टिकोण के तीन प्रमुख स्तंभ' : 'The Three Pillars of Our Vision'}
          </h2>
          <p className="text-base sm:text-lg text-muted">
            {language === 'hi'
              ? 'हम ग्रामीण सशक्तिकरण, महिलाओं की आर्थिक स्वावलंबन और स्वास्थ्य देखभाल पर ध्यान केंद्रित करते हैं।'
              : 'We focus on holistic rural transformation by tackling root causes—empowering the next generation, supporting mothers, and safeguarding family health.'}
          </p>
        </div>

        {/* Vision Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white rounded-3xl p-8 shadow-card border border-gold-500/20 hover:border-gold-500 flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 relative overflow-hidden"
              >
                {/* Top Gold Accent Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-gold-400 via-gold-500 to-maroon-700 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div>
                  {/* Pillar Icon & Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-maroon-700 text-gold-400 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                      <Icon className="w-7 h-7" />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-gold-600 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
                      {pillar.tag}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-dark group-hover:text-maroon-700 transition-colors mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gold-600 mb-4">
                    {pillar.subtitle}
                  </p>
                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-6 border-t border-gold-500/15 flex items-center justify-between text-xs font-bold text-maroon-700 group-hover:text-gold-600 transition-colors">
                  <span>{language === 'hi' ? 'पहल देखें' : 'Explore Initiatives'}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
