'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, Star, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function SuccessStories() {
  const { t, language } = useLanguage();

  const stories = [
    {
      name: 'Priya Yadav',
      location: 'Azamgarh, UP',
      program: language === 'hi' ? 'कंप्यूटर साक्षरता स्नातक' : 'Basic Computer Skills Graduate',
      outcome: language === 'hi' ? 'लखनऊ में नौकरी प्राप्त की' : 'Secured Data Executive Job in Lucknow',
      story: `“${t('stories.priya')}”`,
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Rahul Kumar',
      location: 'Mau District, UP',
      program: language === 'hi' ? 'कक्षा 10वीं बोर्ड छात्र' : 'Class 10th Coaching Camp Student',
      outcome: language === 'hi' ? 'विशेष योग्यता के साथ उत्तीर्ण' : 'Passed UP Board with 88% Distinction',
      story: `“${t('stories.rahul')}”`,
      image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Sunita Devi',
      location: 'Ballia, UP',
      program: language === 'hi' ? 'सिलाई एवं कढ़ाई स्नातक' : 'Women’s Vocational Tailoring',
      outcome: language === 'hi' ? 'स्वयं की सिलाई दुकान' : 'Owner of Self-Started Village Boutique',
      story: `“${t('stories.sunita')}”`,
      image: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Mohammed Arif’s Father',
      location: 'Azamgarh Rural',
      program: language === 'hi' ? 'स्वास्थ्य शिविर लाभार्थी' : 'Free Health & Cardiac Camp Beneficiary',
      outcome: language === 'hi' ? 'समय पर हृदय उपचार' : 'Received Timely Cardiac Care & Surgery Referral',
      story: `“${t('stories.arif')}”`,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Kavita Singh’s Daughter',
      location: 'Gorakhpur, UP',
      program: language === 'hi' ? 'स्पोकन इंग्लिश छात्रा' : 'Spoken English & Grooming Alumna',
      outcome: language === 'hi' ? 'अस्पताल में फ्रंट-डेस्क पद' : 'Front-Desk Executive at Regional Hospital',
      story: `“${t('stories.kavita')}”`,
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=600&auto=format&fit=crop',
    },
    {
      name: 'Dinesh Patel',
      location: 'Jaunpur, UP',
      program: language === 'hi' ? 'सूखा राहत लाभार्थी' : 'Drought Relief & Ration Recipient',
      outcome: language === 'hi' ? 'गाँव को खाद्यान्न सहायता' : 'Village Received Essential Food & Water Support',
      story: `“${t('stories.dinesh')}”`,
      image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?q=80&w=600&auto=format&fit=crop',
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  const current = stories[activeIndex];

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

            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              {/* Photo */}
              <div className="md:col-span-4 relative flex justify-center">
                <div className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-3xl overflow-hidden shadow-xl border-4 border-cream-200">
                  <Image
                    src={current.image}
                    alt={current.name}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              </div>

              {/* Story Content */}
              <div className="md:col-span-8">
                <div className="flex items-center gap-1 text-gold-500 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                  <span className="text-xs font-bold text-maroon-700 ml-2 uppercase tracking-wider">
                    {current.outcome}
                  </span>
                </div>

                <p className="font-serif italic text-lg sm:text-xl text-dark leading-relaxed mb-6">
                  {current.story}
                </p>

                <div className="pt-4 border-t border-gold-500/15 flex items-center justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-xl text-maroon-700">
                      {current.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted font-medium mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-gold-600" />
                      <span>{current.location}</span>
                      <span>•</span>
                      <span className="text-gold-700 font-semibold">{current.program}</span>
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
              className={`p-3 rounded-2xl border text-left transition-all duration-300 flex items-center gap-3 ${
                idx === activeIndex
                  ? 'bg-maroon-700 text-white border-gold-500 shadow-md scale-105'
                  : 'bg-white text-dark border-gold-500/20 hover:border-gold-500'
              }`}
            >
              <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 border border-white/40">
                <Image src={item.image} alt={item.name} fill sizes="40px" className="object-cover" />
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-bold block truncate">{item.name}</span>
                <span className={`text-[10px] block truncate ${idx === activeIndex ? 'text-gold-300' : 'text-muted'}`}>
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
