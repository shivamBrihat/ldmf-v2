'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { useLanguage } from '@/context/LanguageContext';

export default function PrivacyPage() {
  const { language } = useLanguage();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPrivacy() {
      try {
        const res = await fetch('/api/site-content/privacy_policy');
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
    fetchPrivacy();
  }, []);

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      <PageHero
        eyebrow="PRIVACY & DATA PROTECTION"
        title={language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
        subtitle={language === 'hi' ? 'आपकी जानकारी की सुरक्षा के प्रति हमारी प्रतिबद्धता।' : 'Our commitment to protecting the privacy of our donors, volunteers, and visitors.'}
      />

      <section className="py-12 md:py-20 max-w-3xl mx-auto px-4 sm:px-6">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-gold-500/20 shadow-card">
          {loading ? (
            <div className="text-center py-8 text-muted">Loading Privacy Policy...</div>
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
