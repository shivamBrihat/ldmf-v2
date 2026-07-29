'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useLanguage } from '@/context/LanguageContext';

export default function TermsPage() {
  const { language } = useLanguage();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTerms() {
      try {
        const res = await fetch('/api/site-content/terms_and_conditions');
        if (res.ok) {
          const data = await res.json();
          setContent(data.content);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchTerms();
  }, []);

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      <PageHero
        eyebrow="LEGAL & COMPLIANCE"
        title={language === 'hi' ? 'नियम और शर्तें' : 'Terms & Conditions'}
        subtitle={language === 'hi' ? 'लगनी देवी मेमोरियल फाउंडेशन की सेवाओं का उपयोग करने के नियम।' : 'Governing guidelines for interacting with Lagni Devi Memorial Foundation.'}
      />

      <section className="py-12 md:py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gold-500/20 shadow-card">
          {loading ? (
            <div className="text-center py-8 text-muted">Loading Terms & Conditions...</div>
          ) : (
            <div
              className="prose prose-maroon max-w-none text-dark/90 leading-relaxed text-sm sm:text-base space-y-6"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
