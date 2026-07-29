'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface MediaItem {
  id?: string;
  outlet: string;
  headline: string;
  articleUrl?: string | null;
  excerpt?: string;
  badge?: string;
  date?: string;
}

export default function MediaCoverage() {
  const { t, language } = useLanguage();
  const [mediaMentions, setMediaMentions] = useState<MediaItem[]>([]);

  useEffect(() => {
    async function fetchMedia() {
      try {
        const res = await fetch('/api/media');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setMediaMentions(
              data.map((m: any) => ({
                id: m.id,
                outlet: m.outlet,
                headline: m.headline,
                articleUrl: m.articleUrl || '#',
                excerpt: m.excerpt || (language === 'hi' ? 'पूर्वी उत्तर प्रदेश में हमारे सामाजिक प्रभाव की प्रमुख समाचार रिपोर्ट।' : 'Prominent news coverage highlighting our grass-roots social impact in UP.'),
                badge: language === 'hi' ? 'समाचार कवरेज' : 'NEWS COVERAGE',
                date: '2024 Coverage',
              }))
            );
            return;
          }
        }
      } catch (error) {
        console.error('Failed to fetch dynamic media:', error);
      }

      // Default fallback
      setMediaMentions([
        {
          outlet: 'Dainik Jagran',
          headline: language === 'hi' ? 'निःशुल्क शिक्षा शिविर से 200+ छात्र लाभान्वित' : 'Free Education Camp Empowers 200+ Rural Students',
          excerpt: t('media.dainikJagran'),
          badge: language === 'hi' ? 'प्रमुख समाचार' : 'TOP STORY',
          date: 'March 2024',
        },
        {
          outlet: 'Amar Ujala',
          headline: language === 'hi' ? '10 जिलों में निःशुल्क कार्यक्रमों का विस्तार' : 'Foundation Expands Free Programs to 10 Districts',
          excerpt: t('media.amarUjala'),
          badge: language === 'hi' ? 'क्षेत्रीय कवरेज' : 'REGIONAL COVERAGE',
          date: 'January 2024',
        },
        {
          outlet: 'Hindustan',
          headline: language === 'hi' ? '300+ ग्रामीण महिलाओं ने हासिल की आर्थिक स्वतंत्रता' : '300+ Rural Women Achieve Financial Independence',
          excerpt: t('media.hindustan'),
          badge: language === 'hi' ? 'विशेष रिपोर्ट' : 'FEATURE STORY',
          date: 'November 2023',
        },
        {
          outlet: 'The Hindu',
          headline: language === 'hi' ? 'पूर्वी यूपी में शैक्षणिक विभाजन को पाटना' : 'Bridging the Educational & Digital Divide in Eastern UP',
          excerpt: t('media.theHindu'),
          badge: language === 'hi' ? 'राष्ट्रीय कवरेज' : 'NATIONAL MEDIA',
          date: 'August 2023',
        },
      ]);
    }

    fetchMedia();
  }, [language, t]);

  return (
    <section id="media" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-line justify-center mb-3">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-600">
              {t('media.eyebrow')}
            </span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-dark leading-tight mb-4">
            {t('media.headline')}
          </h2>
          <p className="text-base sm:text-lg text-muted">
            {language === 'hi'
              ? 'प्रमुख समाचार पत्रों और मीडिया हाउस द्वारा हमारे कार्यों को सराहा गया है।'
              : 'Our grass-roots work in education, women empowerment, and healthcare has been featured across prominent newspapers.'}
          </p>
        </div>

        {/* Media Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mediaMentions.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-cream-100/70 p-6 sm:p-8 rounded-3xl border border-gold-500/20 hover:border-gold-500 hover:shadow-card transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Header Publication Strip */}
                <div className="flex items-center justify-between pb-4 border-b border-gold-500/15 mb-4">
                  <div className="flex items-center gap-2">
                    <Newspaper className="w-5 h-5 text-maroon-700" />
                    <div>
                      <h4 className="font-serif font-bold text-lg text-maroon-700 leading-none">
                        {item.outlet}
                      </h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-gold-600 bg-gold-500/10 px-2.5 py-1 rounded-full border border-gold-500/20">
                    {item.badge || 'MEDIA COVERAGE'}
                  </span>
                </div>

                {/* Headline & Quote Excerpt */}
                <h3 className="font-serif font-bold text-xl text-dark group-hover:text-maroon-700 transition-colors mb-3 leading-snug">
                  “{item.headline}”
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed mb-6">
                  {item.excerpt}
                </p>
              </div>

              {/* Footer Date & Link */}
              <div className="pt-4 border-t border-gold-500/15 flex items-center justify-between text-xs text-muted font-medium">
                <span>{item.date || 'Coverage'}</span>
                <a
                  href={item.articleUrl || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gold-600 font-bold group-hover:text-maroon-700 transition-colors"
                >
                  <span>{language === 'hi' ? 'प्रेस विज्ञप्ति पढ़ें' : 'Read Article'}</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
