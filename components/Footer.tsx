'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail, Clock, Facebook, Twitter, Instagram, Youtube, Linkedin, ArrowUp } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Footer() {
  const { t, language } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-dark text-white pt-16 pb-8 border-t-4 border-gold-500 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Location Banner Card - Commented Out
        <div className="bg-maroon-900/90 rounded-3xl p-6 sm:p-8 mb-16 border border-gold-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gold-500 text-maroon-900 flex items-center justify-center shrink-0 shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-300 block">
                {t('contact.eyebrow')}
              </span>
              <h3 className="font-serif font-bold text-xl sm:text-2xl text-white mt-0.5">
                {t('contact.address')}
              </h3>
              <p className="text-xs text-cream-200/70 mt-1">
                {t('contact.hours')}
              </p>
            </div>
          </div>

          <a
            href="https://maps.google.com/?q=Azamgarh+Uttar+Pradesh"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white/10 hover:bg-white/20 text-gold-300 font-semibold text-xs py-3 px-6 rounded-full border border-gold-500/40 shrink-0 transition-colors"
          >
            {language === 'hi' ? 'मानचित्र देखें ↗' : 'Open Location Map ↗'}
          </a>
        </div>
        */}

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1: About Foundation */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/images/logo.webp"
                alt="Lagni Devi Memorial Foundation Logo"
                width={200}
                height={55}
                className="h-10 sm:h-12 w-auto object-contain bg-white/95 p-2 rounded-xl shadow-md"
              />
            </div>

            <p className="text-xs text-cream-200/70 leading-relaxed max-w-sm">
              {language === 'hi'
                ? 'लगनी देवी मेमोरियल फाउंडेशन (LDMF) पूर्वी उत्तर प्रदेश में मुफ्त शिक्षा, महिला कौशल विकास और ग्रामीण स्वास्थ्य सेवा के लिए समर्पित एक पंजीकृत सार्वजनिक धर्मार्थ ट्रस्ट है।'
                : 'Lagni Devi Memorial Foundation (LDMF) is a registered non-profit organization dedicated to empowering rural families through free education, women skill development, and village health care across Eastern Uttar Pradesh.'}
            </p>

            {/* Social links commented out
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold-500 hover:text-dark flex items-center justify-center text-cream-200 transition-colors" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold-500 hover:text-dark flex items-center justify-center text-cream-200 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold-500 hover:text-dark flex items-center justify-center text-cream-200 transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold-500 hover:text-dark flex items-center justify-center text-cream-200 transition-colors" aria-label="YouTube">
                <Youtube className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-white/10 hover:bg-gold-500 hover:text-dark flex items-center justify-center text-cream-200 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            */}
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-gold-400 uppercase tracking-widest">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/80">
              <li><Link href="/about" className="hover:text-gold-400 transition-colors">{language === 'hi' ? 'हमारे बारे में' : 'About Us'}</Link></li>
              <li><Link href="/updates" className="hover:text-gold-400 transition-colors">{language === 'hi' ? 'अपडेट्स' : 'Updates & Journal'}</Link></li>
              <li><Link href="/activities" className="hover:text-gold-400 transition-colors">{language === 'hi' ? 'गतिविधियाँ' : 'Community Activities'}</Link></li>
              <li><Link href="/gallery" className="hover:text-gold-400 transition-colors">{language === 'hi' ? 'गैलरी' : 'Photo Gallery'}</Link></li>
              <li><Link href="/events" className="hover:text-gold-400 transition-colors">{language === 'hi' ? 'कार्यक्रम' : 'Events'}</Link></li>
            </ul>
          </div>

          {/* Col 3: Programs */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-gold-400 uppercase tracking-widest">
              {t('footer.programs')}
            </h4>
            <ul className="space-y-2 text-xs text-cream-200/80">
              <li><Link href="/courses" className="hover:text-gold-400 transition-colors">{t('programs.computer.title')}</Link></li>
              <li><Link href="/courses" className="hover:text-gold-400 transition-colors">{t('programs.english.title')}</Link></li>
              <li><Link href="/courses" className="hover:text-gold-400 transition-colors">{t('programs.women.title')}</Link></li>
              <li><Link href="/courses" className="hover:text-gold-400 transition-colors">{t('programs.coaching.title')}</Link></li>
              {/* <li><Link href="/donate" className="hover:text-gold-400 transition-colors">{language === 'hi' ? 'सहयोग एवं दान' : 'Support & Donate'}</Link></li> */}
            </ul>
          </div>

          {/* Col 4: Contact Info */}
          <div className="space-y-3">
            <h4 className="font-serif font-bold text-sm text-gold-400 uppercase tracking-widest">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-2.5 text-xs text-cream-200/80">
              <li className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                <a href="tel:+919693027085" className="hover:text-gold-400 transition-colors">{t('contact.phone')}</a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-gold-500 shrink-0" />
                <a href="mailto:bankjankari2021@gmail.com" className="hover:text-gold-400 transition-colors">{t('contact.email')}</a>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-gold-500 shrink-0 mt-0.5" />
                <span>{t('contact.hours')}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream-200/60">
          <p>
            {t('footer.rights')}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="hover:text-gold-400 transition-colors">
              {language === 'hi' ? 'नियम और शर्तें' : 'Terms & Conditions'}
            </Link>
            <span>•</span>
            <Link href="/privacy" className="hover:text-gold-400 transition-colors">
              {language === 'hi' ? 'गोपनीयता नीति' : 'Privacy Policy'}
            </Link>
            <span>•</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/10 hover:bg-gold-500 hover:text-dark text-white transition-colors ml-2"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
