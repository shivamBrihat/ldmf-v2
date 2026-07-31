'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, UserCheck, BookOpenCheck, Copy, Check, QrCode, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface DonateProps {
  onDonateModalOpen: () => void;
  onVolunteerModalOpen: (role: 'Volunteer' | 'Mentor') => void;
}

export default function Donate({ onDonateModalOpen, onVolunteerModalOpen }: DonateProps) {
  const { t, language } = useLanguage();
  const [copiedUpi, setCopiedUpi] = useState(false);
  const [copiedAccount, setCopiedAccount] = useState(false);

  const copyToClipboard = (text: string, type: 'upi' | 'account') => {
    navigator.clipboard.writeText(text);
    if (type === 'upi') {
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2000);
    } else {
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2000);
    }
  };

  const waysToHelp = [
    /*
    {
      icon: Heart,
      title: language === 'hi' ? '1. वित्तीय योगदान' : '1. Financial Contribution',
      desc: language === 'hi' ? 'छात्र अध्ययन किट, कंप्यूटर लैब या स्वास्थ्य सामग्री का समर्थन करें। 80G के तहत 100% कर छूट।' : 'Support student study kits, computer lab upkeep, or village medical supplies. 100% tax exempt under 80G.',
      actionText: t('donate.donate'),
      onClick: onDonateModalOpen,
    },
    */
    {
      icon: UserCheck,
      title: language === 'hi' ? 'मैदानी स्वयंसेवा' : 'Volunteer on Ground',
      desc: language === 'hi' ? 'हमारे सप्ताहांत शिक्षा या स्वास्थ्य शिविरों में शामिल हों और योगदान दें।' : 'Join our weekend education coaching or health camps in rural areas.',
      actionText: t('donate.volunteer'),
      onClick: () => onVolunteerModalOpen('Volunteer'),
    },
    {
      icon: BookOpenCheck,
      title: language === 'hi' ? 'वर्चुअल मार्गदर्शन' : 'Virtual Mentorship',
      desc: language === 'hi' ? 'ग्रामीण छात्रों को साप्ताहिक ऑनलाइन स्पोकन इंग्लिश या करियर काउंसलिंग सत्र प्रदान करें।' : 'Offer weekly online spoken English, career counseling, or digital skills sessions to rural students.',
      actionText: t('donate.mentor'),
      onClick: () => onVolunteerModalOpen('Mentor'),
    },
  ];

  return (
    <section id="get-involved" className="py-20 md:py-28 bg-maroon-700 text-white relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-maroon-950/40 rounded-full filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-line justify-center mb-3">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-300">
              {language === 'hi' ? 'एक स्थायी बदलाव लाएं' : 'MAKE A LASTING DIFFERENCE'}
            </span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-white leading-tight mb-4">
            {t('donate.headline')}
          </h2>
          <p className="text-base sm:text-lg text-cream-200/90">
            {language === 'hi'
              ? 'योगदान किया गया हर रुपया और स्वयंसेवा का हर घंटा ग्रामीण बच्चे या मां के लिए नई आशा लाता है।'
              : 'Every rupee contributed and every hour volunteered brings warm hope to a rural child or mother.'}
          </p>
        </div>

        {/* 3 Ways to Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
          {waysToHelp.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="glass-card-dark p-8 rounded-3xl flex flex-col justify-between group hover:border-gold-500 transition-all duration-300"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-gold-500/20 text-gold-300 flex items-center justify-center mb-6 border border-gold-500/30 group-hover:scale-110 transition-transform">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-cream-200/80 leading-relaxed mb-6">
                    {item.desc}
                  </p>
                </div>

                <button
                  onClick={item.onClick}
                  className="w-full bg-gold-500 hover:bg-gold-400 text-maroon-900 font-bold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all btn-gold-glow"
                >
                  <span>{item.actionText}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Direct Donation Details Box - Commented Out
        <div className="bg-cream-100 text-dark rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-gold-500/40">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-2 text-maroon-700 font-bold text-xs uppercase tracking-widest mb-2">
                <ShieldCheck className="w-4 h-4 text-gold-600" />
                <span>{t('donate.taxNote')}</span>
              </div>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-dark mb-4">
                {t('donate.bankTitle')} & UPI
              </h3>
              <p className="text-sm text-muted mb-6 leading-relaxed">
                {t('donate.taxNote')}
              </p>

              <div className="space-y-4">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gold-500/20 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-gold-600 block">
                      STATE BANK OF INDIA (AZAMGARH MAIN BRANCH)
                    </span>
                    <span className="font-mono text-sm sm:text-base font-bold text-dark block mt-0.5">
                      A/C: 40982314509 · IFSC: SBIN0000318
                    </span>
                    <span className="text-xs text-muted block">
                      {t('donate.accountName')}
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard('40982314509 / SBIN0000318', 'account')}
                    className="bg-cream-100 hover:bg-gold-500/20 text-maroon-700 font-semibold text-xs px-4 py-2 rounded-xl border border-gold-500/30 flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedAccount ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedAccount ? (language === 'hi' ? 'कॉपी हुआ' : 'Copied') : (language === 'hi' ? 'खाता जानकारी कॉपी करें' : 'Copy A/C Info')}</span>
                  </button>
                </div>

                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gold-500/20 flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold uppercase text-gold-600 block">
                      OFFICIAL VPA / UPI ID
                    </span>
                    <span className="font-mono text-base font-bold text-maroon-700 block mt-0.5">
                      {t('donate.upi')}
                    </span>
                    <span className="text-xs text-muted block">
                      {language === 'hi' ? 'GPay, PhonePe, Paytm, BHIM द्वारा स्वीकार्य' : 'Accepting GPay, PhonePe, Paytm, BHIM & all UPI apps'}
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard('ldmf@sbi', 'upi')}
                    className="bg-cream-100 hover:bg-gold-500/20 text-maroon-700 font-semibold text-xs px-4 py-2 rounded-xl border border-gold-500/30 flex items-center gap-1.5 transition-colors shrink-0"
                  >
                    {copiedUpi ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedUpi ? (language === 'hi' ? 'कॉपी हुआ' : 'Copied VPA') : (language === 'hi' ? 'UPI आईडी कॉपी करें' : 'Copy UPI ID')}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gold-500/20 text-center">
              <div className="w-12 h-12 rounded-full bg-gold-500/10 text-gold-600 flex items-center justify-center mb-3">
                <QrCode className="w-6 h-6" />
              </div>
              <h4 className="font-serif font-bold text-lg text-dark mb-1">
                {language === 'hi' ? 'स्कैन करें और दान करें' : 'Scan & Donate via UPI'}
              </h4>
              <p className="text-xs text-muted mb-4">
                {language === 'hi' ? 'GPay, PhonePe, Paytm या BHIM से स्कैन करें' : 'Scan with GPay, PhonePe, Paytm, or BHIM'}
              </p>

              <div className="p-3 bg-white border-2 border-dark rounded-xl mb-4 shadow-sm">
                <div className="w-36 h-36 bg-cream-100 flex items-center justify-center relative border border-dark/10 p-2">
                  <div className="w-full h-full grid grid-cols-6 grid-rows-6 gap-1 p-1">
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-transparent" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-gold-500 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-transparent" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-gold-500 rounded-sm" />
                    <div className="bg-transparent" />
                    <div className="bg-transparent" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-gold-500 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-transparent" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-gold-500 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-transparent" />
                    <div className="bg-maroon-700 rounded-sm" />
                    <div className="bg-maroon-700 rounded-sm" />
                  </div>
                </div>
              </div>

              <button
                onClick={onDonateModalOpen}
                className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-sm py-2.5 px-6 rounded-full flex items-center justify-center gap-2 border border-gold-500/30 shadow-md"
              >
                <Heart className="w-4 h-4 fill-white text-maroon-700" />
                <span>{language === 'hi' ? 'ऑनलाइन भुगतान गेटवे खोलें' : 'Open Instant Online Gateway'}</span>
              </button>
            </div>
          </div>
        </div>
        */ }
      </div>
    </section>
  );
}
