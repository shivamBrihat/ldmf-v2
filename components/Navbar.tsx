'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, Globe, Menu, X, ArrowUpRight, LogIn } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface NavbarProps {
  onDonateClick?: () => void;
}

export default function Navbar({ onDonateClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const pathname = usePathname();

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

  // Unified Navbar links for all pages
  const navLinks = [
    { name: language === 'hi' ? 'होम' : 'Home', href: '/' },
    { name: language === 'hi' ? 'हमारे बारे में' : 'About', href: '/about' },
    { name: language === 'hi' ? 'अपडेट्स' : 'Updates', href: '/updates' },
    { name: language === 'hi' ? 'निःशुल्क कोर्स' : 'Free Courses', href: '/courses' },
    { name: language === 'hi' ? 'गतिविधियाँ' : 'Activities', href: '/activities' },
    { name: language === 'hi' ? 'गैलरी' : 'Gallery', href: '/gallery' },
    { name: language === 'hi' ? 'कार्यक्रम' : 'Events', href: '/events' },
    { name: language === 'hi' ? 'दान करें' : 'Donate', href: '/donate' },
    { name: language === 'hi' ? 'संपर्क करें' : 'Contact', href: '/contact' },
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
          <Link href="/" className="flex items-center group">
            <Image
              src="/images/logo.webp"
              alt="Lagni Devi Memorial Foundation Logo"
              width={220}
              height={60}
              className="h-10 sm:h-12 md:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-3.5 xl:gap-5">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`font-semibold text-[11px] xl:text-[13px] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-gold-500 after:transition-all whitespace-nowrap ${
                    isActive
                      ? 'text-maroon-700 font-bold after:w-full'
                      : 'text-dark/85 hover:text-maroon-700 after:w-0 hover:after:w-full'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons: Language toggle → Login → Donate */}
          <div className="hidden sm:flex items-center gap-2.5 sm:gap-3">
            {/* 1. Language Toggle Button */}
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border border-gold-500/40 text-maroon-700 hover:bg-gold-500/10 transition-colors cursor-pointer focus:ring-2 focus:ring-maroon-700/30 focus:outline-none"
              title={language === 'en' ? 'Switch to Hindi / हिंदी में बदलें' : 'Switch to English'}
              aria-label="Switch Language"
            >
              <Globe className="w-3.5 h-3.5 text-gold-600" />
              <span>{language === 'en' ? 'हिंदी' : 'EN'}</span>
            </button>

            {/* 3. Donate CTA Link (Filled Maroon) */}
            {onDonateClick ? (
              <button
                onClick={onDonateClick}
                className="btn-maroon-glow bg-maroon-700 hover:bg-maroon-800 text-white font-medium text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full flex items-center gap-1.5 border border-gold-500/30 focus:ring-2 focus:ring-maroon-700/30 focus:outline-none"
              >
                <Heart className="w-3.5 h-3.5 fill-white text-maroon-700" />
                <span>{language === 'hi' ? 'दान करें' : 'Donate'}</span>
              </button>
            ) : (
              <Link
                href="/donate"
                className="btn-maroon-glow bg-maroon-700 hover:bg-maroon-800 text-white font-medium text-xs sm:text-sm px-4 sm:px-5 py-2 rounded-full flex items-center gap-1.5 border border-gold-500/30 focus:ring-2 focus:ring-maroon-700/30 focus:outline-none"
              >
                <Heart className="w-3.5 h-3.5 fill-white text-maroon-700" />
                <span>{language === 'hi' ? 'दान करें' : 'Donate'}</span>
              </Link>
            )}
          </div>

          {/* Mobile header controls */}
          <div className="flex items-center gap-2 sm:hidden">
            <button
              onClick={toggleLanguage}
              className="p-1.5 text-maroon-700 font-bold text-xs border border-gold-500/40 rounded-full px-2.5"
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
          <div className="flex flex-col gap-4">
            <div className="pb-3 border-b border-gold-500/20">
              <span className="text-xs uppercase tracking-widest text-gold-600 font-bold">
                {language === 'hi' ? 'नेविगेशन' : 'Navigation'}
              </span>
            </div>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`text-base font-serif font-semibold py-1.5 flex items-center justify-between border-b border-dark/5 transition-colors ${
                    isActive ? 'text-maroon-700 font-bold' : 'text-dark hover:text-maroon-700'
                  }`}
                >
                  <span>{link.name}</span>
                  <ArrowUpRight className={`w-4 h-4 transition-colors ${isActive ? 'text-maroon-700' : 'text-gold-600'}`} />
                </Link>
              );
            })}
          </div>

          <div className="mt-8 pt-6 border-t border-gold-500/20 flex flex-col gap-3">


            <Link
              href="/donate"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-medium text-base py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg"
            >
              <Heart className="w-5 h-5 fill-white text-maroon-700" />
              <span>{language === 'hi' ? 'दान करें' : 'Donate'}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
