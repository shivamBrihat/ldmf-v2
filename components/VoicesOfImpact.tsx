'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Quote } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function VoicesOfImpact() {
  const { language } = useLanguage();

  const mainQuote = {
    quote: language === 'hi'
      ? '"कंप्यूटर सीखने से मुझे नौकरी के लिए आवेदन करने का आत्मविश्वास मिला।"'
      : '"Learning computers gave me the confidence to apply for work."',
    author: language === 'hi' ? '— पाठ्यक्रम प्रतिभागी' : '— COURSE PARTICIPANT',
  };

  const sideQuotes = [
    {
      quote: language === 'hi'
        ? '"यहाँ, हम एक-दूसरे को आगे बढ़ने में मदद करते हैं।"'
        : '"Here, we help one another move forward."',
      author: language === 'hi' ? '— स्वयंसेवक' : '— VOLUNTEER',
    },
    {
      quote: language === 'hi'
        ? '"हमारे बच्चों को सीखने के लिए एक सुरक्षित, उत्साहजनक जगह मिली।"'
        : '"Our children found a safe, encouraging place to learn."',
      author: language === 'hi' ? '— अभिभावक' : '— PARENT',
    },
    {
      quote: language === 'hi'
        ? '"फाउंडेशन ने हमारे गाँव में नई आशा और अवसर प्रदान किए।"'
        : '"The foundation brought hope and opportunity to our village."',
      author: language === 'hi' ? '— ग्रामीण सदस्य' : '— COMMUNITY MEMBER',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-cream-100/50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column Text & Header */}
          <div className="lg:col-span-5">
            <div className="eyebrow-line mb-3">
              <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-600">
                {language === 'hi' ? 'प्रभाव की आवाज़' : 'VOICES OF IMPACT'}
              </span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-dark leading-tight mb-4">
              {language === 'hi' ? 'वास्तविक बदलाव, लोगों के अपने शब्दों में।' : 'Real change, in people’s own words.'}
            </h2>
            <p className="text-base text-muted leading-relaxed mb-6">
              {language === 'hi'
                ? 'हर कार्यक्रम के पीछे सीखने, आत्मविश्वास और एक नई संभावना की वास्तविक कहानी है।'
                : 'Behind every programme is a story of learning, confidence and a new possibility.'}
            </p>

            <a
              href="#stories"
              className="inline-flex items-center gap-1.5 font-semibold text-xs sm:text-sm text-maroon-700 hover:text-maroon-800 border-b-2 border-gold-500 pb-0.5 transition-all group"
            >
              <span>{language === 'hi' ? 'अधिक कहानियाँ पढ़ें' : 'Read more stories'}</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Column Quotes Grid */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Featured Tinted Quote Card */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="bg-maroon-700/5 rounded-3xl p-6 sm:p-8 border border-maroon-700/15 hover:border-maroon-700 transition-all duration-300 relative group shadow-sm"
            >
              <Quote className="w-6 h-6 text-gold-600 mb-3 rotate-180 opacity-80" />
              <p className="font-serif font-semibold text-xl sm:text-2xl text-dark leading-snug mb-4">
                {mainQuote.quote}
              </p>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-600 block">
                {mainQuote.author}
              </span>
            </motion.div>

            {/* Bottom 3 Grid Quotes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {sideQuotes.slice(0, 2).map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
                  className="bg-white rounded-3xl p-6 border border-gold-500/20 hover:border-gold-500 hover:shadow-card transition-all duration-300 flex flex-col justify-between"
                >
                  <div>
                    <Quote className="w-5 h-5 text-gold-600 mb-3 rotate-180 opacity-70" />
                    <p className="font-serif font-semibold text-base sm:text-lg text-dark leading-snug mb-4">
                      {item.quote}
                    </p>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 block mt-auto">
                    {item.author}
                  </span>
                </motion.div>
              ))}

              {/* 3rd Bottom Span Quote */}
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-3xl p-6 border border-gold-500/20 hover:border-gold-500 hover:shadow-card transition-all duration-300 flex flex-col justify-between sm:col-span-2"
              >
                <div>
                  <Quote className="w-5 h-5 text-gold-600 mb-3 rotate-180 opacity-70" />
                  <p className="font-serif font-semibold text-lg text-dark leading-snug mb-4">
                    {sideQuotes[2].quote}
                  </p>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 block">
                  {sideQuotes[2].author}
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
