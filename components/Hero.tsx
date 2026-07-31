'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Heart, ArrowUpRight, Sparkles, BookOpen, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface HeroProps {
  onDonateClick: () => void;
}

export default function Hero({ onDonateClick }: HeroProps) {
  const { t, language } = useLanguage();

  return (
    <section className="relative pt-8 pb-20 md:pt-14 md:pb-28 overflow-hidden bg-gradient-to-b from-cream-100 via-cream-200 to-cream-100">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-gold-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-maroon-700/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col items-start"
          >
            {/* Eyebrow Label */}
            <div className="eyebrow-line mb-4">
              <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-600">
                {t('hero.eyebrow')}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif font-extrabold text-4xl sm:text-5xl md:text-6xl xl:text-7xl tracking-tight text-dark leading-[1.15] mb-6">
              <span className="text-maroon-700 block">
                {language === 'hi' ? 'उनकी स्मृति में।' : 'In Her Memory.'}
              </span>
              <span className="text-dark block italic font-normal">
                {language === 'hi' ? 'उनके लोगों के लिए।' : 'For Her People.'}
              </span>
            </h1>

            {/* Subtext */}
            <p className="text-base sm:text-lg md:text-xl text-muted leading-relaxed mb-8 max-w-2xl">
              {t('hero.subtext')}
            </p>

            {/* Call to Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {/* Commented Out Donate Button
              <button
                onClick={onDonateClick}
                className="btn-maroon-glow bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-base px-8 py-4 rounded-full flex items-center justify-center gap-2 border border-gold-500/30 w-full sm:w-auto"
              >
                <Heart className="w-5 h-5 fill-white text-maroon-700" />
                <span>{t('hero.donateNow')}</span>
              </button>
              */}

              <a
                href="#about"
                className="bg-white/80 hover:bg-white text-maroon-700 hover:text-maroon-800 font-semibold text-base px-8 py-4 rounded-full border-2 border-maroon-700/20 hover:border-maroon-700 flex items-center justify-center gap-2 transition-all shadow-sm w-full sm:w-auto"
              >
                <span>{t('hero.learnMore')}</span>
              </a>
            </div>

            {/* Trust Badges */}
            <div className="mt-10 pt-6 border-t border-gold-500/20 flex flex-wrap items-center gap-6 text-xs font-medium text-dark/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-gold-600" />
                <span>{language === 'hi' ? 'पंजीकृत एनजीओ (80G और 12A प्रमाणित)' : 'Registered NGO (80G & 12A Certified)'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-gold-600" />
                <span>{language === 'hi' ? 'आजमगढ़ और यूपी में प्रत्यक्ष प्रभाव' : '100% Direct Impact in Azamgarh & UP'}</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column Image Collage */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Arch-Shaped Image Frame */}
              <div className="relative w-full h-[420px] sm:h-[480px] rounded-t-[160px] rounded-b-3xl overflow-hidden shadow-2xl border-4 border-white bg-cream-200">
                <Image
                  src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000&auto=format&fit=crop"
                  alt="Rural Indian students smiling warmly in community learning context"
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/50 via-transparent to-transparent" />
              </div>

              {/* Overlapping Secondary Image - Children Studying */}
              <div className="absolute -bottom-6 -left-6 sm:-left-10 w-44 sm:w-56 h-44 sm:h-56 rounded-3xl overflow-hidden shadow-2xl border-4 border-white z-20">
                <Image
                  src="https://images.unsplash.com/photo-1516627145497-ae6968895b74?q=80&w=800&auto=format&fit=crop"
                  alt="Rural Indian child reading book happily outdoors"
                  fill
                  sizes="240px"
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>

              {/* Floating Foundation Story Badge Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -top-4 -right-4 sm:-right-6 glass-card p-4 rounded-2xl shadow-xl z-30 flex items-center gap-3 border border-gold-500/30 animate-float max-w-[210px]"
              >
                <div className="w-10 h-10 rounded-xl bg-maroon-700 flex items-center justify-center text-gold-400 shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-gold-600 block">
                    {language === 'hi' ? 'फाउंडेशन कहानी' : 'FOUNDATION STORY'}
                  </span>
                  <span className="text-xs font-semibold text-dark block leading-snug">
                    {language === 'hi' ? '50+ वर्षों की सेवा की निरंतरता' : 'Continuing 50+ years of service'}
                  </span>
                </div>
              </motion.div>

              {/* Decorative Accent Ribbon */}
              <div className="absolute -bottom-10 right-4 w-32 h-32 bg-gold-500/20 rounded-full filter blur-2xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
