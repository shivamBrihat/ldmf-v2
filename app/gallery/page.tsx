'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { X, ZoomIn } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface GalleryItem {
  id: string;
  imageUrl: string;
  caption?: string;
  category?: string;
}

export default function GalleryPage() {
  const { language } = useLanguage();
  const [images, setImages] = useState<GalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [lightboxImage, setLightboxImage] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGallery() {
      try {
        const res = await fetch('/api/gallery');
        if (res.ok) {
          const data = await res.json();
          setImages(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchGallery();
  }, []);

  const categories = ['All', 'Education', 'Health Camps', 'Women Empowerment', 'Events'];

  const filteredImages = activeCategory === 'All'
    ? images
    : images.filter((img) => img.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      <PageHero
        eyebrow={language === 'hi' ? 'फोटो गैलरी' : 'PHOTO GALLERY'}
        title={language === 'hi' ? 'हमारी यात्रा के यादगार पल' : 'Moments from our journey'}
        subtitle={language === 'hi' ? 'कंप्यूटर लैब, सिलाई वर्कशॉप, स्वास्थ्य शिविरों और ग्रामीण कार्यक्रमों की तस्वीरें।' : 'Visual highlights of our educational workshops, healthcare drives, and community events across rural communities.'}
        imageUrl="https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop"
      />

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                activeCategory === cat
                  ? 'bg-maroon-700 text-white border-maroon-700 shadow-md'
                  : 'bg-white text-dark/80 border-gold-500/30 hover:border-maroon-700 hover:text-maroon-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="text-center py-12 text-muted">Loading gallery...</div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center py-12 text-muted">No images found for this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredImages.map((item) => (
              <div
                key={item.id}
                onClick={() => setLightboxImage(item)}
                className="relative h-64 w-full rounded-3xl overflow-hidden shadow-card border border-gold-500/20 group cursor-pointer"
              >
                <Image
                  src={item.imageUrl}
                  alt={item.caption || 'Gallery Image'}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4 text-white">
                  <span className="self-end bg-maroon-700/80 p-2 rounded-full text-gold-300">
                    <ZoomIn className="w-4 h-4" />
                  </span>
                  {item.caption && (
                    <span className="text-xs font-medium line-clamp-2 bg-dark/60 p-2 rounded-xl backdrop-blur-sm">
                      {item.caption}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-dark/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 border border-gold-500/30"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 bg-maroon-700 text-white p-2 rounded-full hover:bg-maroon-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative h-80 sm:h-[450px] w-full rounded-2xl overflow-hidden mb-4">
              <Image
                src={lightboxImage.imageUrl}
                alt={lightboxImage.caption || 'Full view'}
                fill
                className="object-contain bg-black/10"
              />
            </div>

            {lightboxImage.caption && (
              <p className="font-serif font-semibold text-center text-dark text-base sm:text-lg">
                {lightboxImage.caption}
              </p>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
