'use client';

import React, { useState } from 'react';
import { ArrowRight, X, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AnnouncementBarProps {
  onApplyClick?: () => void;
}

export default function AnnouncementBar({ onApplyClick }: AnnouncementBarProps) {
  const [isVisible, setIsVisible] = useState(true);
  const { t, language } = useLanguage();

  if (!isVisible) return null;

  return (
    <div className="bg-maroon-700 text-white py-2.5 px-4 text-xs md:text-sm font-medium transition-all relative z-50 border-b border-gold-500/20">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center justify-center gap-2 mx-auto text-center flex-wrap">
          <span className="inline-flex items-center gap-1 bg-gold-500/20 text-gold-300 text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border border-gold-500/40">
            <Sparkles className="w-3 h-3 text-gold-400 animate-pulse" />
            {language === 'hi' ? 'प्रवेश प्रारंभ' : 'Admissions Open'}
          </span>
          <span className="text-cream-100/90">
            {t('nav.announcement')}
          </span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="text-cream-200/70 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors shrink-0"
          aria-label="Dismiss announcement"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
