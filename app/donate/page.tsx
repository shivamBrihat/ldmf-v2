'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Modals from '@/components/Modals';
import { Heart, CreditCard, QrCode, ShieldCheck, UserCheck, Award, Copy, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function DonatePage() {
  const { language } = useLanguage();
  const [donateOpen, setDonateOpen] = useState(false);
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [donateContent, setDonateContent] = useState('');

  useEffect(() => {
    async function fetchDonateInfo() {
      try {
        const res = await fetch('/api/site-content/donate_info');
        if (res.ok) {
          const data = await res.json();
          setDonateContent(data.content);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchDonateInfo();
  }, []);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('ldmf@sbi');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar onDonateClick={() => setDonateOpen(true)} />

      <PageHero
        eyebrow={language === 'hi' ? 'सहयोग एवं दान' : 'DONATE & SUPPORT'}
        title={language === 'hi' ? 'उनके मिशन में हमारे साथ जुड़ें' : 'Join us in her mission'}
        subtitle={language === 'hi' ? 'आपका हर योगदान ग्रामीण बच्चों की शिक्षा और महिलाओं के सिलाई कौशल को सशक्त बनाता है।' : 'Every contribution directly empowers rural education, women skill building, and health camps in Eastern UP.'}
        imageUrl="https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=1000&auto=format&fit=crop"
      />

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Dynamic Admin Text if available */}
        {donateContent && (
          <div
            className="bg-white rounded-3xl p-6 sm:p-8 mb-12 border border-gold-500/20 shadow-sm text-sm sm:text-base text-dark/90 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: donateContent }}
          />
        )}

        {/* 3 Ways to Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-3xl p-8 border border-gold-500/20 shadow-card flex flex-col justify-between group hover:border-gold-500 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-maroon-700/10 text-maroon-700 flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 fill-maroon-700 text-maroon-700" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-dark mb-2">
                {language === 'hi' ? 'आर्थिक दान' : 'Financial Donation'}
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-6">
                {language === 'hi'
                  ? 'छात्रों के लिए कंप्यूटर उपकरण, पाठ्य सामग्री और सिलाई मशीनों को स्पॉन्सर करें।'
                  : 'Sponsor computer workstations, sewing machines, or health kits directly.'}
              </p>
            </div>
            <button
              onClick={() => setDonateOpen(true)}
              className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-xs py-3 rounded-full shadow-md transition-all"
            >
              {language === 'hi' ? 'अभी दान करें' : 'Donate Now'}
            </button>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gold-500/20 shadow-card flex flex-col justify-between group hover:border-gold-500 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 text-gold-600 flex items-center justify-center mb-6">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-dark mb-2">
                {language === 'hi' ? 'स्वयंसेवक (Volunteer)' : 'Volunteer With Us'}
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-6">
                {language === 'hi'
                  ? 'हमारे आजमगढ़ और मऊ केंद्रों में बच्चों को पढ़ाएँ या स्वास्थ्य शिविरों में सहयोग करें।'
                  : 'Teach classes or assist doctors during our village health screening camps.'}
              </p>
            </div>
            <a
              href="/contact"
              className="w-full bg-dark hover:bg-maroon-900 text-white font-semibold text-xs py-3 rounded-full text-center transition-all"
            >
              {language === 'hi' ? 'स्वयंसेवक बनें' : 'Become a Volunteer'}
            </a>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-gold-500/20 shadow-card flex flex-col justify-between group hover:border-gold-500 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-maroon-700/10 text-maroon-700 flex items-center justify-center mb-6">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-2xl text-dark mb-2">
                {language === 'hi' ? 'मेंटर (Mentor)' : 'Become a Mentor'}
              </h3>
              <p className="text-xs text-muted leading-relaxed mb-6">
                {language === 'hi'
                  ? 'ग्रामीण युवाओं को करियर परामर्श और डिजिटल कौशल की दिशा में मार्गदर्शन प्रदान करें।'
                  : 'Provide career advice and guidance to rural students aiming for higher education.'}
              </p>
            </div>
            <a
              href="/contact"
              className="w-full border border-maroon-700 text-maroon-700 hover:bg-maroon-700/5 font-semibold text-xs py-3 rounded-full text-center transition-all"
            >
              {language === 'hi' ? 'मेंटरशिप शुरू करें' : 'Join as Mentor'}
            </a>
          </div>
        </div>

        {/* Bank & UPI Transfer Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Bank Account Details */}
          <div className="bg-white rounded-3xl p-8 border border-gold-500/30 shadow-card">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-600 flex items-center justify-center">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-xl text-dark">
                  {language === 'hi' ? 'बैंक ट्रांसफर विवरण' : 'Direct Bank Transfer'}
                </h3>
                <span className="text-xs text-gold-600 font-semibold">NEFT / RTGS / IMPS</span>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex justify-between py-2 border-b border-dark/5">
                <span className="text-muted">Account Name:</span>
                <span className="font-bold text-dark">Lagni Devi Memorial Foundation</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark/5">
                <span className="text-muted">Account Number:</span>
                <span className="font-mono font-bold text-maroon-700">409812345678</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark/5">
                <span className="text-muted">IFSC Code:</span>
                <span className="font-mono font-bold text-dark">SBIN0001234</span>
              </div>
              <div className="flex justify-between py-2 border-b border-dark/5">
                <span className="text-muted">Bank Name:</span>
                <span className="font-bold text-dark">State Bank of India (SBI)</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-muted">Branch:</span>
                <span className="font-bold text-dark">Azamgarh Main Branch, UP</span>
              </div>
            </div>
          </div>

          {/* UPI & 80G Tax Benefit */}
          <div className="bg-maroon-900 text-white rounded-3xl p-8 border border-gold-500/30 shadow-card flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gold-500 text-maroon-900 flex items-center justify-center">
                    <QrCode className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-serif font-bold text-xl text-white">
                      {language === 'hi' ? 'UPI आईडी भुगतान' : 'UPI Instant Pay'}
                    </h3>
                    <span className="text-xs text-gold-300">GPay, PhonePe, Paytm, BHIM</span>
                  </div>
                </div>
              </div>

              <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between border border-gold-500/30 mb-6">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-300 block">Official UPI ID</span>
                  <span className="font-mono font-bold text-lg text-white">ldmf@sbi</span>
                </div>
                <button
                  onClick={handleCopyUpi}
                  className="bg-gold-500 hover:bg-gold-400 text-maroon-900 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
                >
                  {copiedUpi ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedUpi ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 border border-white/10 flex items-start gap-3">
              <ShieldCheck className="w-6 h-6 text-gold-400 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed text-cream-200/90">
                <span className="font-bold text-gold-300 block mb-1">Section 80G Tax Benefit Eligible</span>
                Donations made to Lagni Devi Memorial Foundation are eligible for tax deduction under Section 80G of the Income Tax Act. Official receipts are issued promptly upon confirmation.
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      <Modals
        donateOpen={donateOpen}
        onDonateClose={() => setDonateOpen(false)}
        volunteerOpen={false}
        volunteerRole="Volunteer"
        onVolunteerClose={() => {}}
        applyOpen={false}
        selectedCourse=""
        onApplyClose={() => {}}
      />
    </main>
  );
}
