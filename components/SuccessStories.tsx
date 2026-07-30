'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface StoryItem {
  id?: string;
  personName: string;
  location: string;
  story: string;
  photoUrl?: string | null;
  program?: string;
  outcome?: string;
}

export default function SuccessStories() {
  const { t, language } = useLanguage();
  const [stories, setStories] = useState<StoryItem[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function fetchStories() {
      try {
        const res = await fetch('/api/stories');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setStories(
              data.map((s: any) => ({
                id: s.id,
                personName: s.personName,
                location: s.location,
                story: s.story.startsWith('“') ? s.story : `“${s.story}”`,
                photoUrl: s.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
                program: language === 'hi' ? 'फाउंडेशन लाभार्थी' : 'LDMF Program Beneficiary',
                outcome: language === 'hi' ? 'सफलता की कहानी' : 'IMPACT STORY',
              }))
            );
            return;
          }
        }
      } catch (error) {
        console.error('Failed to fetch dynamic stories:', error);
      }

      // Default fallback
      setStories([
        {
          personName: 'Priya Yadav',
          location: 'Azamgarh, UP',
          program: language === 'hi' ? 'कंप्यूटर साक्षरता स्नातक' : 'Basic Computer Skills Graduate',
          outcome: language === 'hi' ? 'लखनऊ में नौकरी प्राप्त की' : 'Secured Data Executive Job in Lucknow',
          story: `“${t('stories.priya')}”`,
          photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
        },
        {
          personName: 'Rahul Kumar',
          location: 'Mau District, UP',
          program: language === 'hi' ? 'कक्षा 10वीं बोर्ड छात्र' : 'Class 10th Coaching Camp Student',
          outcome: language === 'hi' ? 'विशेष योग्यता के साथ उत्तीर्ण' : 'Passed UP Board with 88% Distinction',
          story: `“${t('stories.rahul')}”`,
          photoUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
        },
        {
          personName: 'Sunita Devi',
          location: 'Ballia, UP',
          program: language === 'hi' ? 'सिलाई एवं कढ़ाई स्नातक' : 'Women’s Vocational Tailoring',
          outcome: language === 'hi' ? 'स्वयं की सिलाई दुकान' : 'Owner of Self-Started Village Boutique',
          story: `“${t('stories.sunita')}”`,
          photoUrl: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop',
        },
      ]);
    }

    fetchStories();
  }, [language, t]);

  const handleNext = () => {
    if (stories.length === 0) return;
    setActiveIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    if (stories.length === 0) return;
    setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const current = stories[activeIndex] || stories[0];

  if (!current) return null;

  return (
    <section id="stories" className="py-20 md:py-28 bg-cream-200/60 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-line justify-center mb-3">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-600">
              {t('stories.eyebrow')}
            </span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-dark leading-tight mb-4">
            {t('stories.headline')}
          </h2>
          <p className="text-base sm:text-lg text-muted">
            {language === 'hi'
              ? 'प्रत्येक आंकड़े के पीछे आत्म-सम्मान और स्वतंत्रता की एक वास्तविक कहानी है।'
              : 'Behind every stat is a real story of determination, dignity, and newfound independence.'}
          </p>
        </div>

        {/* Featured Testimonial Spotlight */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-soft-xl border border-gold-500/20 relative overflow-hidden">
            <Quote className="absolute top-6 right-8 w-24 h-24 text-gold-500/10 pointer-events-none" />

            <div className="w-full">
              {/* Story Content */}
              <div className="w-full">
                <div className="flex items-center gap-1 text-gold-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-maroon-700 ml-2 uppercase tracking-wider">
                    {current.outcome || 'IMPACT STORY'}
                  </span>
                </div>

                <p className="font-serif italic text-lg sm:text-xl text-dark leading-relaxed mb-6">
                  {current.story}
                </p>

                <div className="pt-4 border-t border-gold-500/15 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-maroon-700">
                      {current.personName}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted font-medium mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-600" />
                      <span>{current.location}</span>
                      {current.program && (
                        <>
                          <span>•</span>
                          <span className="text-gold-700 font-semibold">{current.program}</span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Carousel Nav Controls */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handlePrev}
                      className="w-10 h-10 rounded-full bg-cream-100 hover:bg-maroon-700 hover:text-white text-dark flex items-center justify-center transition-colors border border-gold-500/20"
                      aria-label="Previous story"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-10 h-10 rounded-full bg-cream-100 hover:bg-maroon-700 hover:text-white text-dark flex items-center justify-center transition-colors border border-gold-500/20"
                      aria-label="Next story"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stories Grid Selector thumbnails */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {stories.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`p-3.5 rounded-2xl border text-center transition-all duration-300 ${
                idx === activeIndex
                  ? 'bg-maroon-700 text-white border-gold-500 shadow-md scale-105'
                  : 'bg-white text-dark border-gold-500/20 hover:border-gold-500'
              }`}
            >
              <div className="overflow-hidden">
                <span className="text-xs font-bold block truncate">{item.personName}</span>
                <span className={`text-[10px] block truncate mt-0.5 ${idx === activeIndex ? 'text-gold-300' : 'text-muted'}`}>
                  {item.location}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
