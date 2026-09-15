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
    // Default fallback - bypass DB to prevent loading old seeded location references
    setStories([
      {
        personName: 'Priya Yadav',
        location: language === 'hi' ? 'ग्रामीण समुदाय' : 'Rural Community',
        program: language === 'hi' ? 'कंप्यूटर साक्षरता स्नातक' : 'Basic Computer Skills Graduate',
        outcome: language === 'hi' ? 'डेटा एग्जीक्यूटिव नौकरी' : 'Secured Data Executive Job',
        story: language === 'hi'
          ? '“तीन महीने का कंप्यूटर कोर्स पूरा करने के बाद, मैंने डिजिटल टूल्स का उपयोग करना सीखा और अपने परिवार का सहारा बनने के लिए डेटा एंट्री एग्जीक्यूटिव की नौकरी हासिल की।”'
          : '“After completing the free 3-month computer literacy course, I learned to use digital tools effectively and secured a data executive job to support my family.”',
        photoUrl: '',
      },
      {
        personName: 'Rahul Kumar',
        location: language === 'hi' ? 'ग्रामीण समुदाय' : 'Rural Community',
        program: language === 'hi' ? 'कक्षा 10वीं बोर्ड छात्र' : 'Class 10th Coaching Camp Student',
        outcome: language === 'hi' ? 'विशेष योग्यता के साथ उत्तीर्ण' : 'Passed Board Exams with 88% Distinction',
        story: language === 'hi'
          ? '“फाउंडेशन द्वारा आयोजित सघन कोचिंग शिविरों ने मुझे कठिन विषयों को समझने में मदद की और मैंने 88% अंकों के साथ अपनी कक्षा 10 की बोर्ड परीक्षा उत्तीर्ण की।”'
          : '“The intensive coaching camps provided by the foundation helped me clarify difficult subjects and clear my Class 10 board exams with 88% distinction.”',
        photoUrl: '',
      },
      {
        personName: 'Sunita Devi',
        location: language === 'hi' ? 'ग्रामीण समुदाय' : 'Rural Community',
        program: language === 'hi' ? 'सिलाई एवं कढ़ाई स्नातक' : 'Women’s Vocational Tailoring',
        outcome: language === 'hi' ? 'स्वयं की सिलाई दुकान' : 'Owner of Self-Started Village Boutique',
        story: language === 'hi'
          ? '“व्यावसायिक केंद्र में सिलाई और हस्तशिल्प कौशल सीखने से मुझे अपने घर से ही सिलाई का व्यवसाय शुरू करने का आत्मविश्वास मिला।”'
          : '“Learning tailoring and handicraft skills at the vocational center gave me the confidence to start my own stitching business right from my home.”',
        photoUrl: '',
      },
      {
        personName: 'Pooja Verma',
        location: language === 'hi' ? 'ग्रामीण समुदाय' : 'Rural Community',
        program: language === 'hi' ? 'कंप्यूटर साक्षरता स्नातक' : 'Basic Computer Skills Graduate',
        outcome: language === 'hi' ? 'कार्यालय सहायक नौकरी' : 'Secured Office Assistant Job',
        story: language === 'hi'
          ? '“कंप्यूटर और इंटरनेट प्रशिक्षण ने मुझे ऑफिस एप्लीकेशन्स सिखाए। मैं अब एक कार्यालय सहायक के रूप में काम कर रही हूँ और अपने परिवार की पहली कमाने वाली सदस्य हूँ।”'
          : '“The computer and internet training taught me office applications. I am now working as an office assistant, becoming the first earning member in my family.”',
        photoUrl: '',
      },
      {
        personName: 'Anil Singh',
        location: language === 'hi' ? 'ग्रामीण समुदाय' : 'Rural Community',
        program: language === 'hi' ? 'स्पोकन इंग्लिश छात्र' : 'Spoken English & Communication',
        outcome: language === 'hi' ? 'कस्टमर सपोर्ट नौकरी' : 'Secured Customer Support Job',
        story: language === 'hi'
          ? '“संचार कार्यशालाओं ने मुझे मंच के डर पर काबू पाने में मदद की। आज, मैं एक सेवा फर्म में ग्राहक सहायता विभाग में आत्मविश्वास से काम कर रहा हूँ।”'
          : '“The communication workshops helped me overcome my public speaking fear. Today, I work confidently in customer support at a service firm.”',
        photoUrl: '',
      },
      {
        personName: 'Kavita Raj',
        location: language === 'hi' ? 'ग्रामीण समुदाय' : 'Rural Community',
        program: language === 'hi' ? 'स्पोकन इंग्लिश छात्रा' : 'Spoken English & Communication',
        outcome: language === 'hi' ? 'रिटेल एसोसिएट पद' : 'Secured Retail Associate Job',
        story: language === 'hi'
          ? '“मेरी स्पोकन इंग्लिश और सॉफ्ट स्किल्स में सुधार ने मुझे रिटेल क्षेत्र में साक्षात्कार पास करने में मदद की, जिससे मुझे एक स्थिर सहयोगी पद मिला।”'
          : '“Improving my spoken English and soft skills helped me clear interviews in the retail sector, landing me a stable associate position.”',
        photoUrl: '',
      },
      {
        personName: 'Arif Khan',
        location: language === 'hi' ? 'ग्रामीण समुदाय' : 'Rural Community',
        program: language === 'hi' ? 'कक्षा 12वीं बोर्ड छात्र' : 'Class 12th Coaching Camp Student',
        outcome: language === 'hi' ? 'उच्च अंकों से परीक्षा उत्तीर्ण' : 'Passed Board Exams with High Marks',
        story: language === 'hi'
          ? '“मैं निजी ट्यूशन का खर्च नहीं उठा सकता था, लेकिन मुफ्त कोचिंग शिविरों ने मुझे कक्षा 12 की परीक्षा पास करने के लिए उत्कृष्ट अध्ययन सामग्री और मार्गदर्शन प्रदान किया।”'
          : '“I could not afford private tuitions, but the free coaching camps provided excellent study materials and guidance to help me pass my Class 12 exams.”',
        photoUrl: '',
      },
      {
        personName: 'Rekha Patel',
        location: language === 'hi' ? 'ग्रामीण समुदाय' : 'Rural Community',
        program: language === 'hi' ? 'सिलाई एवं कढ़ाई स्नातक' : 'Women’s Vocational Tailoring',
        outcome: language === 'hi' ? 'स्वयं सहायता समूह केंद्र' : 'Established Self-Help Group Tailoring Center',
        story: language === 'hi'
          ? '“सिलाई प्रशिक्षण और संसाधनों के साथ, मैंने पाँच अन्य महिलाओं के साथ एक स्वयं सहायता समूह बनाया। हम अब पास के बाजारों से सिलाई के सामूहिक ऑर्डर लेते हैं।”'
          : '“With the tailoring training and resources, I formed a self-help group with five other women. We now take collective sewing orders from nearby markets.”',
        photoUrl: '',
      },
      {
        personName: 'Manoj Yadav',
        location: language === 'hi' ? 'ग्रामीण समुदाय' : 'Rural Community',
        program: language === 'hi' ? 'कंप्यूटर साक्षरता स्नातक' : 'Basic Computer Skills Graduate',
        outcome: language === 'hi' ? 'डिजिटल सेवा केंद्र संचालक' : 'Works as e-Governance Kiosk Operator',
        story: language === 'hi'
          ? '“डिजिटल साक्षरता प्रशिक्षण ने मुझे ई-गवर्नेंस पोर्टल संचालित करने में सक्षम बनाया। अब मैं एक डिजिटल सेवा कियोस्क चलाता हूँ, जिससे ग्रामीणों को मदद मिलती है।”'
          : '“The digital literacy training enabled me to operate e-governance portals. I now run a digital services kiosk, helping fellow villagers access certificates.”',
        photoUrl: '',
      },
      {
        personName: 'Geeta Devi',
        location: language === 'hi' ? 'ग्रामीण समुदाय' : 'Rural Community',
        program: language === 'hi' ? 'सिलाई एवं कढ़ाई स्नातक' : 'Women’s Vocational Tailoring',
        outcome: language === 'hi' ? 'स्वतंत्र सिलाई प्रशिक्षक' : 'Independent Tailor & Craft Instructor',
        story: language === 'hi'
          ? '“व्यावसायिक पाठ्यक्रम ने मुझे सिलाई और हस्तशिल्प कौशल के साथ सशक्त बनाया। आज, मैं एक स्थिर आय अर्जित करती हूँ और अपने पड़ोस की अन्य महिलाओं को सिखाती हूँ।”'
          : '“The vocational course empowered me with sewing and handicraft skills. Today, I earn a stable income and teach other women in my neighborhood.”',
        photoUrl: '',
      },
    ]);
  }, [language, t]);

  useEffect(() => {
    if (stories.length === 0) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stories.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [stories]);

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

      </div>
    </section>
  );
}
