'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Monitor, MessageSquare, Scissors, BookOpen, Clock, Users, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export interface ProgramItem {
  id: string;
  titleKey: string;
  descKey: string;
  category: string;
  duration: string;
  capacity: string;
  modules: string[];
  image: string;
  icon: React.ElementType;
}

interface ProgramsProps {
  onApply: (programTitle: string) => void;
}

export default function Programs({ onApply }: ProgramsProps) {
  const { t, language } = useLanguage();

  const programsList: ProgramItem[] = [
    {
      id: 'computer-skills',
      titleKey: 'programs.computer.title',
      descKey: 'programs.computer.desc',
      category: language === 'hi' ? 'डिजिटल साक्षरता' : 'Digital Literacy',
      duration: language === 'hi' ? '3 महीने (निःशुल्क)' : '3 Months (Free)',
      capacity: '30 Students / Batch',
      modules: language === 'hi'
        ? ['कंप्यूटर की मूल बातें और टाइपिंग', 'एमएस ऑफिस और डेटा प्रविष्टि', 'ईमेल और वेब नेविगेशन', 'डिजिटल भुगतान और सुरक्षा']
        : ['Computer Fundamentals & Typing', 'MS Office & Data Entry', 'Email & Web Navigation', 'Digital Payments & Safety'],
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop',
      icon: Monitor,
    },
    {
      id: 'spoken-english',
      titleKey: 'programs.english.title',
      descKey: 'programs.english.desc',
      category: language === 'hi' ? 'करियर की तैयारी' : 'Career Readiness',
      duration: language === 'hi' ? '2 महीने (निःशुल्क)' : '2 Months (Free)',
      capacity: '25 Students / Batch',
      modules: language === 'hi'
        ? ['दैनिक बातचीत और प्रवाह', 'शब्दावली और उच्चारण', 'साक्षात्कार की तैयारी', 'आत्मविश्वास निर्माण कार्यशालाएं']
        : ['Daily Conversation & Fluency', 'Vocabulary & Pronunciation', 'Interview Preparation', 'Confidence Building Workshops'],
      image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
      icon: MessageSquare,
    },
    {
      id: 'womens-skill',
      titleKey: 'programs.women.title',
      descKey: 'programs.women.desc',
      category: language === 'hi' ? 'आजीविका एवं शिल्प' : 'Livelihood & Craft',
      duration: language === 'hi' ? '4 महीने (निःशुल्क)' : '4 Months (Free)',
      capacity: '40 Women / Batch',
      modules: language === 'hi'
        ? ['कपड़े की कटाई और सिलाई', 'कढ़ाई और डिज़ाइन', 'सिलाई मशीन का रखरखाव', 'स्वयं सहायता समूह और मूल्य निर्धारण']
        : ['Garment Cutting & Tailoring', 'Embroidery & Surface Design', 'Sewing Machine Maintenance', 'Self-Help Group & Pricing'],
      image: 'https://images.unsplash.com/photo-1617634667039-8e4cb277ab46?q=80&w=800&auto=format&fit=crop',
      icon: Scissors,
    },
    {
      id: 'board-coaching',
      titleKey: 'programs.coaching.title',
      descKey: 'programs.coaching.desc',
      category: language === 'hi' ? 'शैक्षणिक सहायता' : 'Academic Support',
      duration: language === 'hi' ? '3 महीने (निःशुल्क)' : '3 Months (Free)',
      capacity: '60 Students / Camp',
      modules: language === 'hi'
        ? ['कक्षा 10वीं यूपी बोर्ड तैयारी', 'कक्षा 12वीं विज्ञान और कला', 'मॉक टेस्ट सीरीज़ और उत्तर कुंजी', 'मुफ्त पाठ्यपुस्तक वितरण']
        : ['Class 10th UP Board Prep', 'Class 12th Science & Arts', 'Mock Test Series & Solution Keys', 'Free Textbook Distribution'],
      image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop',
      icon: BookOpen,
    },
  ];

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
              ? 'ग्रामीण निवासियों के लिए हमारे सभी पाठ्यक्रम 100% निःशुल्क हैं।'
              : 'All our courses are 100% free of charge for village residents, backed by study materials, certificates, and job placement assistance.'}
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {programsList.map((program, idx) => {
            const Icon = program.icon;
            const programTitle = t(program.titleKey);
            const programDesc = t(program.descKey);

            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-cream-100 rounded-3xl overflow-hidden border border-gold-500/20 hover:border-gold-500 hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Image Banner */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={program.image}
                      alt={programTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/20 to-transparent" />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="bg-maroon-700 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-sm border border-gold-500/30">
                        {program.category}
                      </span>
                      <span className="bg-white/90 backdrop-blur-md text-dark text-xs font-semibold px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
                        <Clock className="w-3.5 h-3.5 text-gold-600" />
                        {program.duration}
                      </span>
                    </div>

                    <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
                      <div className="w-9 h-9 rounded-xl bg-gold-500 text-dark flex items-center justify-center font-bold">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 sm:p-8">
                    <h3 className="font-serif font-bold text-2xl text-dark group-hover:text-maroon-700 transition-colors mb-3">
                      {programTitle}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-6">
                      {programDesc}
                    </p>

                    {/* Key Modules List */}
                    <div className="bg-white p-4 rounded-2xl border border-gold-500/15 mb-6">
                      <span className="text-xs font-bold uppercase tracking-wider text-gold-600 block mb-2">
                        {language === 'hi' ? 'पाठ्यक्रम मॉड्यूल:' : 'Key Curriculum Modules:'}
                      </span>
                      <div className="grid grid-cols-2 gap-2 text-xs text-dark/80 font-medium">
                        {program.modules.map((mod, mIdx) => (
                          <div key={mIdx} className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-maroon-700 shrink-0" />
                            <span className="truncate">{mod}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer Action Bar */}
                <div className="p-6 sm:p-8 pt-0 flex items-center justify-between gap-4 border-t border-gold-500/10">
                  <div className="flex items-center gap-1 text-xs text-muted font-medium">
                    <Users className="w-4 h-4 text-gold-600" />
                    <span>{program.capacity}</span>
                  </div>

                  <button
                    onClick={() => onApply(programTitle)}
                    className="btn-maroon-glow bg-maroon-700 hover:bg-maroon-800 text-white font-medium text-xs sm:text-sm px-5 py-2.5 rounded-full flex items-center gap-1.5 border border-gold-500/30"
                  >
                    <span>{language === 'hi' ? 'निःशुल्क आवेदन करें' : 'Apply / Enroll Free'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
