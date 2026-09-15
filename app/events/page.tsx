'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Calendar, MapPin, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { IMAGES } from '@/lib/images';

interface EventItem {
  id: string;
  title: string;
  description: string;
  eventDate: string;
  location?: string;
  imageUrl?: string;
  isUpcoming: boolean;
}

export default function EventsPage() {
  const { language } = useLanguage();
  const [events, setEvents] = useState<EventItem[]>([]);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Bypass database fetch to prevent loading dynamic/seeded location strings and old 2024 dates
    setEvents([
      {
        id: 'evt-0',
        title: language === 'hi' ? 'लगनीधारा कवि सम्मेलन 1.0 सह लगनीरत्न सम्मान समारोह' : 'Lagni Dhara Kavi Sammelan 1.0 & Lagni Ratna Samman Samaroh',
        description: language === 'hi'
          ? 'हंसराज महाविद्यालय सभागार, दिल्ली विश्वविद्यालय में आयोजित भव्य सांस्कृतिक एवं सामाजिक सम्मान समारोह, जहाँ प्रख्यात साहित्यकारों और समाजसेवियों को सम्मानित किया गया।'
          : 'Grand cultural and social awards ceremony at Hansraj College Auditorium, Delhi University, honoring eminent literary icons and grassroots changemakers.',
        eventDate: '2026-08-01T15:00:00.000Z',
        location: language === 'hi' ? 'हंसराज महाविद्यालय, दिल्ली विश्वविद्यालय' : 'Hansraj College Auditorium, Delhi University',
        imageUrl: IMAGES.events.kaviSammelan,
        isUpcoming: false,
      },
      {
        id: 'evt-1',
        title: language === 'hi' ? 'दीप प्रज्ज्वलन एवं ग्रामीण स्वास्थ्य कल्याण अभियान' : 'Ceremonial Deep Prajjwalan & Rural Welfare Drive',
        description: language === 'hi'
          ? 'नेत्र विशेषज्ञों और सामान्य चिकित्सकों के सहयोग से निःशुल्क स्वास्थ्य शिविर लगाना और जरूरतमंद ग्रामीणों को दवाइयां उपलब्ध कराना।'
          : 'Comprehensive health screening, dental checkups, and free vision glasses distribution by visiting specialists.',
        eventDate: '2026-08-25T10:00:00.000Z',
        location: language === 'hi' ? 'ग्रामीण स्वास्थ्य केंद्र' : 'Rural Health Center',
        imageUrl: IMAGES.events.deepPrajjwalan,
        isUpcoming: true,
      },
      {
        id: 'evt-2',
        title: language === 'hi' ? 'कंप्यूटर साक्षरता एवं राष्ट्रीय साहित्य सम्मान समारोह' : 'Digital Literacy & National Citation Ceremony',
        description: language === 'hi'
          ? 'मूल कंप्यूटर साक्षरता पाठ्यक्रम और व्यावसायिक प्रशिक्षण पूरा करने वाले ग्रामीण युवाओं और महिलाओं को सम्मानित करना।'
          : 'Celebrating rural youth and women who completed their basic computer literacy and vocational training courses.',
        eventDate: '2026-09-12T11:00:00.000Z',
        location: language === 'hi' ? 'छात्र शिक्षण केंद्र' : 'Student Learning Centre',
        imageUrl: IMAGES.events.nationalCitation,
        isUpcoming: true,
      },
      {
        id: 'evt-3',
        title: language === 'hi' ? 'ग्राम स्वच्छता एवं युवा स्वयंसेवक अभियान' : 'Village Cleanliness & Youth Volunteer Drive',
        description: language === 'hi'
          ? 'सामुदायिक स्तर पर स्वच्छता अभियान का आयोजन और स्थानीय गांवों में पर्यावरण अनुकूल कचरा पात्रों का वितरण।'
          : 'Organizing community-wide sanitation drive and distributing eco-friendly dustbins across local villages.',
        eventDate: '2026-06-15T09:00:00.000Z',
        location: language === 'hi' ? 'ग्रामीण गाँव समुदाय' : 'Rural Village Communities',
        imageUrl: IMAGES.stock.sanitation,
        isUpcoming: false,
      },
    ]);
    setLoading(false);
  }, [language]);

  const upcomingEvents = events.filter((e) => e.isUpcoming || new Date(e.eventDate) >= new Date());
  const pastEvents = events.filter((e) => !e.isUpcoming && new Date(e.eventDate) < new Date());

  const displayedEvents = tab === 'upcoming' ? upcomingEvents : pastEvents;

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      <PageHero
        eyebrow={language === 'hi' ? 'ग्रामीण कार्यक्रम' : 'FOUNDATION EVENTS'}
        title={language === 'hi' ? 'बदलाव लाने में हमारे साथ जुड़ें' : 'Join us in making a difference'}
        subtitle={language === 'hi' ? 'स्वास्थ्य शिविर, दीक्षांत समारोह, कौशल वितरण और स्वच्छता अभियानों में भाग लें।' : 'Explore our upcoming health camps, graduation ceremonies, and past community drives.'}
        imageUrl={IMAGES.pageHero.events}
      />

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Toggle Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white p-1.5 rounded-full border border-gold-500/30 shadow-sm flex items-center gap-2">
            <button
              onClick={() => setTab('upcoming')}
              className={`text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full transition-all cursor-pointer ${
                tab === 'upcoming'
                  ? 'bg-maroon-700 text-white shadow-md'
                  : 'text-dark/80 hover:text-maroon-700'
              }`}
            >
              {language === 'hi' ? 'आगामी कार्यक्रम' : 'Upcoming Events'} ({upcomingEvents.length})
            </button>
            <button
              onClick={() => setTab('past')}
              className={`text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-full transition-all cursor-pointer ${
                tab === 'past'
                  ? 'bg-maroon-700 text-white shadow-md'
                  : 'text-dark/80 hover:text-maroon-700'
              }`}
            >
              {language === 'hi' ? 'विगत कार्यक्रम' : 'Past Events'} ({pastEvents.length})
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted">Loading events...</div>
        ) : displayedEvents.length === 0 ? (
          <div className="text-center py-12 text-muted">No {tab} events found.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {displayedEvents.map((evt) => (
              <div
                key={evt.id}
                className="bg-white rounded-3xl p-6 sm:p-8 shadow-card border border-gold-500/20 hover:border-gold-500 transition-all flex flex-col justify-between group"
              >
                <div>
                  {evt.imageUrl && (
                    <div className="relative h-48 w-full rounded-2xl overflow-hidden mb-6">
                      <Image
                        src={evt.imageUrl}
                        alt={evt.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  )}

                  <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-gold-600 mb-3">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-gold-600" />
                      <span>{new Date(evt.eventDate).toLocaleDateString(language === 'hi' ? 'hi-IN' : 'en-IN', { year: 'numeric', month: 'long' })}</span>
                    </div>

                    {evt.location && (
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4 text-gold-600" />
                        <span>{evt.location}</span>
                      </div>
                    )}
                  </div>

                  <h3 className="font-serif font-bold text-2xl text-dark group-hover:text-maroon-700 transition-colors mb-3">
                    {evt.title}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed mb-6">
                    {evt.description}
                  </p>
                </div>

                <Link
                  href="/contact"
                  className="w-full bg-maroon-700/10 hover:bg-maroon-700 text-maroon-700 hover:text-white font-semibold text-xs py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all border border-maroon-700/20"
                >
                  <span>{tab === 'upcoming' ? (language === 'hi' ? 'भाग लें / संपर्क करें' : 'RSVP & Attend Event') : (language === 'hi' ? 'पूछताछ / संपर्क करें' : 'Inquire / Contact Us')}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
