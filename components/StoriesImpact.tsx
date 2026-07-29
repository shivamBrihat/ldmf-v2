'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Tag } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function StoriesImpact() {
  const { language } = useLanguage();

  const featuredStory = {
    category: 'FOUNDATION JOURNAL',
    title: language === 'hi'
      ? 'ग्रामीण शिक्षा और डिजिटल साक्षरता से बदलती जिंदगियाँ'
      : 'Transforming Lives Through Free Education & Digital Literacy',
    excerpt: language === 'hi'
      ? 'आजमगढ़ और मऊ के 500 से अधिक बच्चों ने कंप्यूटर प्रशिक्षण और बोर्ड परीक्षा कोचिंग से अपना भविष्य संवारा है।'
      : 'Over 500 children across Azamgarh & Mau have built brighter careers through free computer training and board exam coaching.',
    date: 'March 2024',
    location: 'Azamgarh & Eastern UP',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=1200&auto=format&fit=crop',
    href: '#stories',
  };

  const sideStories = [
    {
      category: 'FOUNDATION JOURNAL',
      title: language === 'hi'
        ? 'सिलाई व कौशल विकास से आत्म-निर्भर बनतीं ग्रामीण महिलाएँ'
        : 'Empowering Rural Women with Vocational Tailoring Skills',
      date: 'February 2024',
      location: 'Ballia District Drive',
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
      href: '#stories',
    },
    {
      category: 'FOUNDATION JOURNAL',
      title: language === 'hi'
        ? 'दूरस्थ गाँवों तक निःशुल्क स्वास्थ्य देखभाल और नेत्र जाँच शिविर'
        : 'Bringing Free Specialist Healthcare & Eye Checkups to Remote Villages',
      date: 'January 2024',
      location: 'Mau & Ballia Camps',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
      href: '#stories',
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-cream-100/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="eyebrow-line mb-3">
              <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-600">
                {language === 'hi' ? 'कहानी एवं प्रभाव' : 'STORIES & IMPACT'}
              </span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-dark leading-tight">
              {language === 'hi' ? 'ज़मीन से जुड़े परिवर्तन की कहानियाँ' : 'Stories of change, close to the ground.'}
            </h2>
          </div>

          <a
            href="#stories"
            className="inline-flex items-center gap-1.5 font-semibold text-xs sm:text-sm text-maroon-700 hover:text-maroon-800 border-b-2 border-gold-500 pb-0.5 transition-all group shrink-0"
          >
            <span>{language === 'hi' ? 'सभी अपडेट देखें' : 'All updates'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* Asymmetrical Journal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Large Featured Story Card */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 flex flex-col group cursor-pointer"
          >
            <a href={featuredStory.href} className="block overflow-hidden rounded-3xl mb-5 shadow-card border border-gold-500/20 relative h-[320px] sm:h-[400px] w-full">
              <Image
                src={featuredStory.image}
                alt={featuredStory.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-dark/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between text-xs">
                <span className="bg-maroon-700 text-gold-300 font-bold px-3 py-1 rounded-full border border-gold-500/30 uppercase tracking-widest text-[10px]">
                  {featuredStory.location}
                </span>
                <span className="text-cream-200/90 font-medium">{featuredStory.date}</span>
              </div>
            </a>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-gold-600 block mb-1">
                {featuredStory.category}
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-dark group-hover:text-maroon-700 transition-colors mb-3 leading-snug">
                {featuredStory.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {featuredStory.excerpt}
              </p>
            </div>
          </motion.div>

          {/* Right Side 2 Stacked Cards */}
          <div className="lg:col-span-5 space-y-8">
            {sideStories.map((story, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 * (idx + 1) }}
                className="flex flex-col group cursor-pointer"
              >
                <a href={story.href} className="block overflow-hidden rounded-3xl mb-4 shadow-sm border border-gold-500/20 relative h-[200px] sm:h-[220px] w-full">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-[11px]">
                    <span className="bg-maroon-700/90 text-gold-300 font-semibold px-2.5 py-0.5 rounded-full border border-gold-500/20">
                      {story.location}
                    </span>
                    <span className="text-cream-200/90">{story.date}</span>
                  </div>
                </a>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 block mb-1">
                    {story.category}
                  </span>
                  <h4 className="font-serif font-bold text-xl text-dark group-hover:text-maroon-700 transition-colors leading-snug">
                    {story.title}
                  </h4>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
