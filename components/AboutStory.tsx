'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote, HeartHandshake, Award, Compass } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutStory() {
  const { t, language } = useLanguage();

  const principles = [
    {
      icon: HeartHandshake,
      title: language === 'hi' ? 'स्मरण' : 'Remembering',
      desc: language === 'hi' ? 'श्रीमती लगनी देवी की निस्वार्थ भावना को जीवित रखना।' : 'Keeping Smt. Lagni Devi’s selfless spirit alive through active community service.',
    },
    {
      icon: Award,
      title: language === 'hi' ? 'सम्मान' : 'Honouring',
      desc: language === 'hi' ? 'समान शिक्षा और स्वास्थ्य अवसर प्रदान कर मानव गरिमा को बनाए रखना।' : 'Upholding human dignity by providing equal educational and healthcare opportunities.',
    },
    {
      icon: Compass,
      title: language === 'hi' ? 'सेवा' : 'Serving',
      desc: language === 'hi' ? 'ग्रामीण उत्तर प्रदेश के वंचित परिवारों तक करुणा के साथ पहुँचना।' : 'Reaching the most underserved families across rural Uttar Pradesh with warmth.',
    },
  ];

  return (
    <section id="about" className="py-20 md:py-28 bg-white relative overflow-hidden">
      {/* Background Subtle Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-cream-200/50 -z-10 clip-path-slant" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column Image with Framed Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative h-[480px] sm:h-[540px] rounded-3xl overflow-hidden shadow-2xl border-4 border-cream-200">
                <Image
                  src="/images/lagni-devi-image.png"
                  alt="Smt. Lagni Devi portrait"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-top hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 via-transparent to-transparent" />
                
                <div className="absolute bottom-40 left-6 right-6 text-white z-10">
                  <span className="text-gold-400 text-xs font-semibold uppercase tracking-widest block mb-1">
                    {language === 'hi' ? 'पावन स्मृति में' : 'IN SACRED MEMORY'}
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
                    Smt. Lagni Devi
                  </h3>
                  <p className="text-cream-200 text-xs sm:text-sm mt-0.5">
                    1945 – 2019 · Rampur, Azamgarh (UP)
                  </p>
                </div>
              </div>

              {/* Floating Quote Box */}
              <div className="absolute -bottom-8 -right-4 sm:-right-8 bg-maroon-700 text-white p-6 rounded-2xl shadow-xl max-w-xs border border-gold-500/30">
                <Quote className="w-8 h-8 text-gold-400 mb-2 opacity-80" />
                <p className="font-serif italic text-sm text-cream-100 leading-relaxed">
                  {language === 'hi'
                    ? '“शिक्षा विशेषाधिकार प्राप्त लोगों के लिए विलासिता नहीं है; यह हर घर का अधिकार है।”'
                    : '“Education is not a luxury for the privileged; it is the warm light every home deserves.”'}
                </p>
                <span className="text-xs text-gold-300 font-medium block mt-3 text-right">
                  — Smt. Lagni Devi
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column Text Biography */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            {/* Section Eyebrow */}
            <div className="eyebrow-line mb-3">
              <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-600">
                {t('about.eyebrow')}
              </span>
            </div>

            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-dark leading-tight mb-6">
              {t('about.headline')}
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-muted leading-relaxed">
              <p>{t('about.body')}</p>
            </div>

            {/* Guiding Principles Cards */}
            <div className="mt-8 pt-8 border-t border-gold-500/20 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {principles.map((item, idx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={idx}
                    className="bg-cream-100 p-4 rounded-2xl border border-gold-500/20 hover:border-gold-500 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-gold-500/10 flex items-center justify-center text-gold-600 mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="font-serif font-bold text-maroon-700 text-base mb-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-muted leading-normal">
                      {item.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
