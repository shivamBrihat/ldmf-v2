'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, Laptop, HeartHandshake, Award, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { IMAGES } from '@/lib/images';

interface ProgramsProps {
  onApply: (courseTitle: string) => void;
}

interface ProgramItem {
  id?: string;
  title: string;
  description: string;
  imageUrl?: string | null;
  badge?: string;
}

export default function Programs({ onApply }: ProgramsProps) {
  const { t, language } = useLanguage();
  const [programsList, setProgramsList] = useState<ProgramItem[]>([]);

  useEffect(() => {
    async function fetchPrograms() {
      try {
        const res = await fetch('/api/programs');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setProgramsList(
              data.map((p: any) => ({
                id: p.id,
                title: p.title,
                description: p.description,
                imageUrl: p.imageUrl || IMAGES.stock.computer,
                badge: language === 'hi' ? '100% मुफ्त' : '100% FREE',
              }))
            );
            return;
          }
        }
      } catch (error) {
        console.error('Failed to fetch dynamic programs:', error);
      }

      // Default fallback using real Foundation event moments
      setProgramsList([
        {
          title: t('programs.computer.title'),
          description: t('programs.computer.desc'),
          imageUrl: IMAGES.stock.computer,
          badge: language === 'hi' ? '100% मुफ्त' : '100% FREE',
        },
        {
          title: t('programs.english.title'),
          description: t('programs.english.desc'),
          imageUrl: IMAGES.stock.english,
          badge: language === 'hi' ? 'निःशुल्क प्रमाणपत्र' : 'FREE CERTIFICATE',
        },
        {
          title: t('programs.women.title'),
          description: t('programs.women.desc'),
          imageUrl: IMAGES.stock.tailoring,
          badge: language === 'hi' ? 'सशक्तिकरण' : 'SELF-RELIANT',
        },
        {
          title: t('programs.coaching.title'),
          description: t('programs.coaching.desc'),
          imageUrl: IMAGES.stock.coaching,
          badge: language === 'hi' ? 'बोर्ड परीक्षा' : 'UP BOARD',
        },
      ]);
    }

    fetchPrograms();
  }, [language, t]);

  return (
    <section id="programs" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-line justify-center mb-3">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-600">
              {t('programs.eyebrow')}
            </span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-dark leading-tight mb-4">
            {t('programs.headline')}
          </h2>
          <p className="text-base sm:text-lg text-muted">
            {language === 'hi'
              ? 'ग्रामीण बच्चों, युवाओं और महिलाओं के लिए निःशुल्क गुणवत्तापूर्ण शिक्षा और कौशल विकास।'
              : 'Our flagship community initiatives aim to eliminate barriers of poverty and distance by offering zero-cost, high-value education.'}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {programsList.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-cream-100/70 rounded-3xl overflow-hidden border border-gold-500/20 hover:border-gold-500 hover:shadow-card transition-all duration-300 flex flex-col sm:flex-row group"
            >
              {/* Left Image Cover */}
              <div className="relative h-52 sm:h-auto sm:w-5/12 overflow-hidden shrink-0">
                <Image
                  src={item.imageUrl || IMAGES.stock.computer}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-3 left-3 bg-maroon-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-gold-500/30">
                  {item.badge || '100% FREE'}
                </div>
              </div>

              {/* Right Content */}
              <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-serif font-bold text-xl sm:text-2xl text-dark group-hover:text-maroon-700 transition-colors mb-3">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-gold-500/15 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gold-600">
                    {language === 'hi' ? 'निःशुल्क अध्ययन सामग्री' : 'Zero Tuition Fee'}
                  </span>
                  <button
                    onClick={() => onApply(item.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-700 hover:text-maroon-800 transition-colors bg-gold-500/10 hover:bg-gold-500/20 px-3.5 py-2 rounded-full border border-gold-500/30"
                  >
                    <span>{language === 'hi' ? 'आवेदन करें' : 'Apply Free'}</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
