'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { IMAGES } from '@/lib/images';

interface UpdateItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string | null;
  publishedAt: string;
}

export default function StoriesImpact() {
  const { language } = useLanguage();
  const [updates, setUpdates] = useState<UpdateItem[]>([]);

  useEffect(() => {
    // Default fallback - bypass DB to prevent loading old seeded location references
    setUpdates([]);
  }, []);

  // Default fallback items matching static designs
  const defaultFeatured = {
    id: 'featured',
    category: 'FOUNDATION JOURNAL',
    title: language === 'hi'
      ? 'ग्रामीण शिक्षा और डिजिटल साक्षरता से बदलती जिंदगियाँ'
      : 'Transforming Lives Through Free Education & Digital Literacy',
    excerpt: language === 'hi'
      ? 'ग्रामीण क्षेत्रों के बच्चों ने कंप्यूटर प्रशिक्षण और बोर्ड परीक्षा कोचिंग से अपना भविष्य संवारा है।'
      : 'Children across rural communities have built brighter careers through free computer training and board exam coaching.',
    date: 'March 2024',
    location: language === 'hi' ? 'ग्रामीण समुदाय' : 'Rural Communities',
    image: IMAGES.stock.computer,
    href: '/updates',
  };

  const defaultSideStories = [
    {
      id: 'side-1',
      category: 'FOUNDATION JOURNAL',
      title: language === 'hi'
        ? 'सिलाई व कौशल विकास से आत्म-निर्भर बनतीं ग्रामीण महिलाएँ'
        : 'Empowering Rural Women with Vocational Tailoring Skills',
      date: 'February 2024',
      location: language === 'hi' ? 'व्यावसायिक प्रशिक्षण अभियान' : 'Vocational Training Drive',
      image: IMAGES.stock.tailoring,
      href: '/updates',
    },
    {
      id: 'side-2',
      category: 'FOUNDATION JOURNAL',
      title: language === 'hi'
        ? 'दूरस्थ गाँवों तक निःशुल्क स्वास्थ्य देखभाल और नेत्र जाँच शिविर'
        : 'Bringing Free Specialist Healthcare & Eye Checkups to Remote Villages',
      date: 'January 2024',
      location: language === 'hi' ? 'सामुदायिक स्वास्थ्य शिविर' : 'Community Health Camps',
      image: IMAGES.stock.health,
      href: '/updates',
    },
  ];

  // Process dynamic data or fall back
  const hasDynamic = updates.length > 0;
  const featured = hasDynamic ? {
    id: updates[0].id,
    category: 'FOUNDATION JOURNAL',
    title: updates[0].title,
    excerpt: updates[0].content,
    date: new Date(updates[0].publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' }),
    location: language === 'hi' ? 'ग्रामीण समुदाय' : 'Rural Communities',
    image: updates[0].imageUrl || IMAGES.stock.computer,
    href: `/updates/${updates[0].id}`,
  } : defaultFeatured;

  const sideStories = hasDynamic
    ? updates.slice(1).map((u) => ({
        id: u.id,
        category: 'FOUNDATION JOURNAL',
        title: u.title,
        date: new Date(u.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' }),
        location: language === 'hi' ? 'ग्रामीण समुदाय' : 'Rural Communities',
        image: u.imageUrl || IMAGES.stock.health,
        href: `/updates/${u.id}`,
      }))
    : defaultSideStories;

  return (
    <section className="py-20 md:py-28 bg-[#FDFBF7] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <div className="eyebrow-line mb-3">
              <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-[#C9A227]">
                {language === 'hi' ? 'कहानी एवं प्रभाव' : 'STORIES & IMPACT'}
              </span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-[#1A1A1A] leading-tight">
              {language === 'hi' ? 'ज़मीन से जुड़े परिवर्तन की कहानियाँ' : 'Stories of change, close to the ground.'}
            </h2>
          </div>

          <Link
            href="/updates"
            className="inline-flex items-center gap-1.5 font-semibold text-xs sm:text-sm text-[#7A1F2B] hover:text-[#7A1F2B]/85 border-b-2 border-[#C9A227] pb-0.5 transition-all group shrink-0"
          >
            <span>{language === 'hi' ? 'सभी अपडेट देखें' : 'All updates'}</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </Link>
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
            <Link href={featured.href} className="block overflow-hidden rounded-3xl mb-5 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-stone-200/60 relative h-[320px] sm:h-[400px] w-full">
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white flex items-center justify-between text-xs">
                <span className="bg-[#7A1F2B] text-[#FDFBF7] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest text-[10px]">
                  {featured.location}
                </span>
                <span className="text-[#FDFBF7]/90 font-medium">{featured.date}</span>
              </div>
            </Link>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9A227] block mb-1">
                {featured.category}
              </span>
              <h3 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A] group-hover:text-[#7A1F2B] transition-colors mb-3 leading-snug">
                {featured.title}
              </h3>
              <p className="text-sm text-stone-600 leading-relaxed line-clamp-3">
                {featured.excerpt}
              </p>
            </div>
          </motion.div>

          {/* Right Side Stacked Cards */}
          <div className="lg:col-span-5 space-y-8">
            {sideStories.map((story, idx) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 * (idx + 1) }}
                className="flex flex-col group cursor-pointer"
              >
                <Link href={story.href} className="block overflow-hidden rounded-3xl mb-4 shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-stone-200/60 relative h-[200px] sm:h-[220px] w-full">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white flex items-center justify-between text-[11px]">
                    <span className="bg-[#7A1F2B]/90 text-[#FDFBF7] font-semibold px-2.5 py-0.5 rounded-full border border-white/10">
                      {story.location}
                    </span>
                    <span className="text-[#FDFBF7]/90">{story.date}</span>
                  </div>
                </Link>

                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#C9A227] block mb-1">
                    {story.category}
                  </span>
                  <h4 className="font-serif font-bold text-xl text-[#1A1A1A] group-hover:text-[#7A1F2B] transition-colors leading-snug">
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
