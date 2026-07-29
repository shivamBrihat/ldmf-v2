'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Heart, Globe, Menu, X, ArrowUpRight, Phone, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface NavbarProps {
  onDonateClick: () => void;
}

export default function Navbar({ onDonateClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.about'), href: '#about' },
    { name: t('nav.ourWork'), href: '#programs' },
    { name: t('nav.stories'), href: '#stories' },
    { name: t('nav.getInvolved'), href: '#get-involved' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream-100/95 backdrop-blur-md shadow-md py-3 border-b border-gold-500/20'
          : 'bg-cream-100 py-4 border-b border-gold-500/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo */}
          <a href="#" className="flex items-center group">
            <Image
              src="/images/logo.webp"
              alt="Lagni Devi Memorial Foundation Logo"
              width={220}
              height={60}
              className="h-10 sm:h-12 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-dark/80 hover:text-maroon-700 font-medium text-sm transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-gold-500 hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-4">
            {/* Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-gold-500/40 text-maroon-700 hover:bg-gold-500/10 transition-colors cursor-pointer"
              title={language === 'en' ? 'Switch to Hindi / हिंदी में बदलें' : 'Switch to English'}
            >
              <Globe className="w-3.5 h-3.5 text-gold-600" />
              <span>{language === 'en' ? 'हिंदी' : 'EN'}</span>
            </button>

            {/* Donate CTA Button */}
            <button
              onClick={onDonateClick}
              className="btn-maroon-glow bg-maroon-700 hover:bg-maroon-800 text-white font-medium text-sm px-6 py-2.5 rounded-full flex items-center gap-2 border border-gold-500/30"
            >
              <Heart className="w-4 h-4 fill-white text-maroon-700" />
              <span>{t('nav.donate')}</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={toggleLanguage}
              className="p-2 text-maroon-700 font-bold text-xs border border-gold-500/40 rounded-full px-2.5"
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-maroon-700 rounded-lg hover:bg-gold-500/10 focus:outline-none"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[70px] z-50 bg-cream-100/98 backdrop-blur-xl border-t border-gold-500/20 px-6 py-8 flex flex-col justify-between overflow-y-auto animate-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6">
            <div className="pb-4 border-b border-gold-500/20">
              <span className="text-xs uppercase tracking-widest text-gold-600 font-bold">
                {language === 'hi' ? 'नेविगेशन' : 'Navigation'}
              </span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-serif font-semibold text-dark hover:text-maroon-700 py-1 flex items-center justify-between border-b border-dark/5"
              >
                <span>{link.name}</span>
                <ArrowUpRight className="w-4 h-4 text-gold-600" />
              </a>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gold-500/20 flex flex-col gap-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onDonateClick();
              }}
              className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-medium text-base py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg"
            >
              <Heart className="w-5 h-5 fill-white text-maroon-700" />
              <span>{t('nav.donate')}</span>
            </button>
            <div className="flex justify-around pt-2 text-xs text-muted">
              <a href="tel:+919876543210" className="flex items-center gap-1 hover:text-maroon-700">
                <Phone className="w-3.5 h-3.5 text-gold-600" />
                <span>+91 98765 43210</span>
              </a>
              <a href="mailto:contact@ldmf.org" className="flex items-center gap-1 hover:text-maroon-700">
                <Mail className="w-3.5 h-3.5 text-gold-600" />
                <span>contact@ldmf.org</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
