'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface UpdateItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
}

export default function UpdateDetailPage({ params }: { params: { id: string } }) {
  const { language } = useLanguage();
  const [update, setUpdate] = useState<UpdateItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/updates/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setUpdate(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [params.id]);

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          href="/updates"
          className="inline-flex items-center gap-2 text-xs font-bold text-maroon-700 hover:text-maroon-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'वापस अपडेट्स पर जाएँ' : 'Back to all updates'}</span>
        </Link>

        {loading ? (
          <div className="py-12 text-center text-muted">Loading article...</div>
        ) : !update ? (
          <div className="py-12 text-center text-muted">Article not found.</div>
        ) : (
          <article className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-gold-500/20">
            <div className="flex items-center gap-2 text-xs text-gold-600 font-bold mb-3 uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>{new Date(update.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-dark leading-tight mb-6">
              {update.title}
            </h1>

            {update.imageUrl && (
              <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-sm">
                <Image
                  src={update.imageUrl}
                  alt={update.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose prose-stone max-w-none text-base text-dark/90 leading-relaxed whitespace-pre-line">
              {update.content}
            </div>
          </article>
        )}
      </div>

      <Footer />
    </main>
  );
}
