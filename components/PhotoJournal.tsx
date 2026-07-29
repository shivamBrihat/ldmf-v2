'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowUpRight, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

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

      // Default fallback photos
      setPhotos([
        {
          imageUrl: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=800&auto=format&fit=crop',
          caption: language === 'hi' ? 'कक्षा में अध्ययन करते ग्रामीण बच्चे' : 'A shared moment · Digital Literacy',
          category: 'PHOTO COLLECTION',
          offsetClass: '',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
          caption: language === 'hi' ? 'निःशुल्क गाँव स्वास्थ्य जाँच शिविर' : 'A shared moment · Medical Camp',
          category: 'PHOTO COLLECTION',
          offsetClass: 'lg:mt-10',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
          caption: language === 'hi' ? 'महिला सिलाई एवं कौशल प्रशिक्षण' : 'A shared moment · Skill Training',
          category: 'PHOTO COLLECTION',
          offsetClass: '',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
          caption: language === 'hi' ? 'ग्राम स्वच्छता एवं स्वच्छता किट वितरण' : 'A shared moment · Hygiene Drive',
          category: 'PHOTO COLLECTION',
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
