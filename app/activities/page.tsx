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
    async function fetchActivities() {
      try {
        const res = await fetch('/api/activities');
        if (res.ok) {
          const data = await res.json();
          setActivities(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchActivities();
  }, []);

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      <PageHero
        eyebrow={language === 'hi' ? 'सामुदायिक गतिविधियाँ' : 'COMMUNITY ACTIVITIES'}
        title={language === 'hi' ? 'दिशानिर्देश, गरिमा और देखभाल पर बनी पहल' : 'Community initiatives built on care and solidarity'}
        subtitle={language === 'hi' ? 'ग्राम स्वच्छता अभियान, निःशुल्क स्वास्थ्य शिविर और आपातकालीन राहत कार्य।' : 'Discover our ground activities across villages in Azamgarh, Mau, Ballia, and Jaunpur districts.'}
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
