'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface UpdateItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
}

export default function UpdatesPage() {
  const { language } = useLanguage();
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUpdates() {
      try {
        const res = await fetch('/api/updates');
        if (res.ok) {
          const data = await res.json();
          setUpdates(data);
        }
      } catch (err) {
        console.error('Error fetching updates:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchUpdates();
  }, []);

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      <PageHero
        eyebrow={language === 'hi' ? 'समाचार एवं अपडेट्स' : 'UPDATES & NEWS'}
        title={language === 'hi' ? 'ज़मीन से जुड़े नवीनतम अपडेट्स' : 'Latest news and stories from the ground'}
        subtitle={language === 'hi' ? 'हमारे कंप्यूटर क्लास, महिला प्रशिक्षण शिविर और ग्रामीण पहलों के नए समाचार।' : 'Discover our latest field updates, village projects, and community developments across Eastern UP.'}
        imageUrl="https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1000&auto=format&fit=crop"
      />

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12 text-muted">Loading updates...</div>
        ) : updates.length === 0 ? (
          <div className="text-center py-12 text-muted">No updates available right now.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {updates.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-card border border-gold-500/20 hover:border-gold-500 transition-all flex flex-col group"
              >
                {item.imageUrl && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-gold-600 font-semibold mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(item.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-dark group-hover:text-maroon-700 transition-colors mb-3 line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-4">
                      {item.content}
                    </p>
                  </div>

                  <Link
                    href={`/updates/${item.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-700 hover:text-maroon-800 transition-colors mt-2"
                  >
                    <span>{language === 'hi' ? 'पूरा पढ़ें' : 'Read Full Story'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
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
