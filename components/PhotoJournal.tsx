'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { eventPhoto } from '@/lib/images';

interface PhotoItem {
  id?: string;
  imageUrl: string;
  caption: string;
  category?: string;
  offsetClass?: string;
}

export default function PhotoJournal() {
  const { language } = useLanguage();
  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            const offsets = ['', 'lg:mt-10', '', 'lg:mt-10'];
            setPhotos(
              data.slice(0, 4).map((img: any, idx: number) => ({
                id: img.id,
                imageUrl: img.imageUrl,
                caption: img.caption || (language === 'hi' ? 'एक साझा पल' : 'A shared moment'),
                category: img.category || 'PHOTO COLLECTION',
                offsetClass: offsets[idx % 4],
              }))
            );
            return;
          }
        }
      } catch (error) {
        console.error('Failed to fetch gallery for PhotoJournal:', error);
      }

      // Default fallback photos using real Foundation event moments
      setPhotos([
        {
          imageUrl: eventPhoto(1947),
          caption: language === 'hi' ? 'संतों एवं अतिथियों द्वारा दीप प्रज्ज्वलन' : 'Saints and guests light the ceremonial lamp',
          category: language === 'hi' ? 'दीप प्रज्ज्वलन' : 'INAUGURATION',
          offsetClass: '',
        },
        {
          imageUrl: eventPhoto(1890),
          caption: language === 'hi' ? 'छत्र के साथ पूज्य संतों का आगमन' : 'Saints arrive under the ceremonial chhatra',
          category: language === 'hi' ? 'संत समागम' : 'BLESSINGS',
          offsetClass: 'lg:mt-10',
        },
        {
          imageUrl: eventPhoto(2045),
          caption: language === 'hi' ? 'सुश्री सोनम मिश्रा का लगनीरत्न सम्मान' : 'Lagni Ratna Samman to Ms. Sonam Mishra',
          category: language === 'hi' ? 'लगनीरत्न' : 'LAGNI RATNA',
          offsetClass: '',
        },
        {
          imageUrl: eventPhoto(2164),
          caption: language === 'hi' ? 'राष्ट्रीय साहित्य गौरव सम्मान 2026' : 'Rashtriya Sahitya Gaurav Samman 2026',
          category: language === 'hi' ? 'साहित्य सम्मान' : 'RECOGNITION',
          offsetClass: 'lg:mt-10',
        },
      ]);
    }

    fetchGallery();
  }, [language]);

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-16 gap-4">
          <div>
            <div className="eyebrow-line mb-3">
              <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-600">
                {language === 'hi' ? 'फोटो जर्नल' : 'PHOTO JOURNAL'}
              </span>
            </div>
            <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-dark leading-tight">
              {language === 'hi' ? 'साथ बिताए यादगार पल।' : 'Moments made together.'}
            </h2>
          </div>

          <a
            href="#media"
            className="inline-flex items-center gap-1.5 font-semibold text-xs sm:text-sm text-maroon-700 hover:text-maroon-800 border-b-2 border-gold-500 pb-0.5 transition-all group shrink-0"
          >
            <span>{language === 'hi' ? 'गैलरी देखें' : 'Enter gallery'}</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* 4 Staggered Photo Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-start">
          {photos.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.12 }}
              className={`flex flex-col group cursor-pointer ${item.offsetClass}`}
            >
              {/* Photo Container */}
              <div className="relative h-[340px] sm:h-[380px] w-full rounded-3xl overflow-hidden shadow-card border border-gold-500/20 mb-3">
                <Image
                  src={item.imageUrl}
                  alt={item.caption}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent" />

                {/* Floating Centered Pill Badge */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <span className="bg-dark/40 backdrop-blur-md text-white font-bold text-[10px] uppercase tracking-widest px-4 py-2 rounded-full border border-white/20 shadow-lg whitespace-nowrap group-hover:bg-maroon-700 group-hover:border-gold-500 transition-all">
                    {item.category || 'PHOTO COLLECTION'}
                  </span>
                </div>
              </div>

              {/* Bottom Caption */}
              <span className="font-serif font-semibold text-base text-dark group-hover:text-maroon-700 transition-colors">
                {item.caption}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
