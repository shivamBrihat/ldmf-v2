'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { HeartHandshake, Sparkles, MapPin } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ActivityItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export default function ActivitiesPage() {
  const { language } = useLanguage();
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Bypass database fetch to prevent loading dynamic/seeded location strings
    setActivities([
      {
        id: 'act-1',
        title: language === 'hi' ? 'ग्राम स्वच्छता एवं पर्यावरण जागरूकता अभियान' : 'Village Sanitation & Cleanliness Drives',
        description: language === 'hi'
          ? 'कचरा पृथक्करण, जल निकासी सफाई और सामुदायिक स्वामित्व को बढ़ावा देने के लिए ग्रामीण क्षेत्रों में साप्ताहिक स्वच्छता अभियान आयोजित करना।'
          : 'Organizing weekly clean-up drives across rural communities, promoting waste segregation, clean drainage, and community ownership.',
        imageUrl: 'https://images.unsplash.com/photo-1618477388954-7852f32655ec?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'act-2',
        title: language === 'hi' ? 'निःशुल्क सामान्य स्वास्थ्य एवं नेत्र जाँच शिविर' : 'Free General Health & Eye Checkup Camps',
        description: language === 'hi'
          ? 'नेत्र विशेषज्ञों और सामान्य चिकित्सकों के सहयोग से निःशुल्क स्वास्थ्य शिविर लगाना और जरूरतमंद ग्रामीणों को दवाइयां उपलब्ध कराना।'
          : 'Setting up periodic health and ophthalmology camps in coordination with specialist doctors, providing free consultations and basic medicines.',
        imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: 'act-3',
        title: language === 'hi' ? 'राहत सामग्री एवं आवश्यक संसाधन वितरण' : 'Relief Kits & Essential Welfare Distribution',
        description: language === 'hi'
          ? 'कठिन मौसम और संकट के समय ग्रामीण परिवारों को स्वच्छता किट, सर्दियों के कपड़े और राशन किट वितरित करना।'
          : 'Distributing hygiene kits, warm winter blankets, and essential dry ration packets to vulnerable families during winter months and seasonal crisis times.',
        imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
      },
    ]);
    setLoading(false);
  }, [language]);

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      <PageHero
        eyebrow={language === 'hi' ? 'सामुदायिक गतिविधियाँ' : 'COMMUNITY ACTIVITIES'}
        title={language === 'hi' ? 'दिशानिर्देश, गरिमा और देखभाल पर बनी पहल' : 'Community initiatives built on care and solidarity'}
        subtitle={language === 'hi' ? 'ग्राम स्वच्छता अभियान, निःशुल्क स्वास्थ्य शिविर और आपातकालीन राहत कार्य।' : 'Discover our ground activities, cleanliness drives, and welfare projects across rural areas.'}
        imageUrl="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop"
      />

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12 text-muted">Loading activities...</div>
        ) : (
          <div className="space-y-12">
            {activities.map((act, idx) => (
              <div
                key={act.id}
                className={`bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-gold-500/20 flex flex-col ${
                  idx % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-8 items-center`}
              >
                {act.imageUrl && (
                  <div className="relative h-64 sm:h-80 w-full lg:w-1/2 rounded-2xl overflow-hidden shadow-sm shrink-0">
                    <Image
                      src={act.imageUrl}
                      alt={act.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="flex-1 space-y-4">
                  <div className="inline-flex items-center gap-2 text-xs font-bold text-gold-600 bg-gold-500/10 px-3 py-1 rounded-full border border-gold-500/20">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{language === 'hi' ? 'सामुदायिक प्रभाव' : 'Field Initiative'}</span>
                  </div>

                  <h3 className="font-serif font-bold text-2xl sm:text-3xl text-dark">
                    {act.title}
                  </h3>

                  <p className="text-sm sm:text-base text-muted leading-relaxed">
                    {act.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
