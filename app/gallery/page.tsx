'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { X, ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { galleryManifest, CATEGORY_ORDER, CATEGORY_LABELS, captionFor } from '@/lib/gallery';
import { IMAGES } from '@/lib/images';

interface DbGalleryItem {
  id: string;
  imageUrl: string;
  caption?: string | null;
  category?: string | null;
}

interface GalleryItem {
  id: string;
  src: string;
  caption: string;
  categoryKey: string;
  blurDataURL?: string;
}

const PAGE_SIZE = 24;

export default function GalleryPage() {
  const { language } = useLanguage();
  const lang = language === 'hi' ? 'hi' : 'en';
  const [dbItems, setDbItems] = useState<DbGalleryItem[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Admin-added photos come from the DB; the event photo archive comes from the static manifest.
  useEffect(() => {
    fetch('/api/gallery')
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => {
        if (Array.isArray(data)) setDbItems(data);
      })
      .catch((err) => console.error('Failed to fetch gallery:', err));
  }, []);

  const images = useMemo<GalleryItem[]>(() => {
    const manifestSrcs = new Set(galleryManifest.map((m) => m.src));
    const uploaded = dbItems
      .filter((d) => d.imageUrl && !manifestSrcs.has(d.imageUrl))
      .map((d) => ({
        id: d.id,
        src: d.imageUrl,
        caption: d.caption || '',
        categoryKey: `db:${d.category || 'General'}`,
      }));
    const archive = galleryManifest.map((m) => ({
      id: m.id,
      src: m.src,
      caption: captionFor(m.id, m.category, lang),
      categoryKey: m.category,
      blurDataURL: m.blurDataURL,
    }));
    return [...uploaded, ...archive];
  }, [dbItems, lang]);

  const categories = useMemo(() => {
    const present = new Set(images.map((i) => i.categoryKey));
    return [
      { key: 'all', label: lang === 'hi' ? 'सभी' : 'All' },
      ...CATEGORY_ORDER.filter((c) => present.has(c)).map((c) => ({ key: c, label: CATEGORY_LABELS[c][lang] })),
      ...Array.from(present)
        .filter((k) => k.startsWith('db:'))
        .map((k) => ({ key: k, label: k.slice(3) })),
    ];
  }, [images, lang]);

  const filteredImages = useMemo(
    () => (activeCategory === 'all' ? images : images.filter((img) => img.categoryKey === activeCategory)),
    [images, activeCategory]
  );
  const visibleImages = filteredImages.slice(0, visibleCount);
  const lightboxImage = lightboxIndex !== null ? filteredImages[lightboxIndex] : null;

  const selectCategory = (key: string) => {
    setActiveCategory(key);
    setVisibleCount(PAGE_SIZE);
  };

  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i - 1 + filteredImages.length) % filteredImages.length));
  }, [filteredImages.length]);

  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? i : (i + 1) % filteredImages.length));
  }, [filteredImages.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxIndex(null);
      if (e.key === 'ArrowLeft') showPrev();
      if (e.key === 'ArrowRight') showNext();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, showPrev, showNext]);

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      <PageHero
        eyebrow={language === 'hi' ? 'फोटो गैलरी' : 'PHOTO GALLERY'}
        title={language === 'hi' ? 'हमारी यात्रा के यादगार पल' : 'Moments from our journey'}
        subtitle={language === 'hi' ? 'लगनीधारा कवि सम्मेलन 1.0 एवं लगनीरत्न सम्मान समारोह, हंसराज महाविद्यालय, दिल्ली विश्वविद्यालय की झलकियां।' : 'Highlights from Lagni Dhara Kavi Sammelan 1.0 & Lagni Ratna Samman Samaroh at Hansraj College, Delhi University.'}
        imageUrl={IMAGES.pageHero.gallery}
      />

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => selectCategory(cat.key)}
              className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-full border transition-all cursor-pointer ${
                activeCategory === cat.key
                  ? 'bg-maroon-700 text-white border-maroon-700 shadow-md'
                  : 'bg-white text-dark/80 border-gold-500/30 hover:border-maroon-700 hover:text-maroon-700'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <p className="text-center text-xs sm:text-sm text-muted mb-10">
          {language === 'hi'
            ? `${filteredImages.length} में से ${visibleImages.length} तस्वीरें`
            : `Showing ${visibleImages.length} of ${filteredImages.length} photos`}
        </p>

        {/* Gallery Grid */}
        {filteredImages.length === 0 ? (
          <div className="text-center py-12 text-muted">No images found for this category.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {visibleImages.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="relative h-64 w-full rounded-3xl overflow-hidden shadow-card border border-gold-500/20 group cursor-pointer bg-cream-200 text-left"
              >
                <Image
                  src={item.src}
                  alt={item.caption || 'Gallery Image'}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  placeholder={item.blurDataURL ? 'blur' : 'empty'}
                  blurDataURL={item.blurDataURL}
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
              </button>
            ))}
          </div>
        )}

        {visibleCount < filteredImages.length && (
          <div className="flex justify-center mt-12">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
              className="bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-sm px-8 py-3 rounded-full shadow-md transition-colors"
            >
              {language === 'hi'
                ? `और तस्वीरें देखें (${filteredImages.length - visibleCount} शेष)`
                : `Load more photos (${filteredImages.length - visibleCount} remaining)`}
            </button>
          </div>
        )}
      </section>

      {/* Lightbox Modal */}
      {lightboxImage && lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-dark/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-4 right-4 z-10 bg-maroon-700 text-white p-2 rounded-full hover:bg-maroon-800 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative w-full max-w-5xl h-[70vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              key={lightboxImage.src}
              src={lightboxImage.src}
              alt={lightboxImage.caption || 'Full view'}
              fill
              sizes="(max-width: 1024px) 100vw, 1024px"
              placeholder={lightboxImage.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={lightboxImage.blurDataURL}
              className="object-contain"
              priority
            />
          </div>

          {filteredImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showPrev();
                }}
                className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-maroon-700 text-white p-3 rounded-full transition-colors"
                aria-label="Previous photo"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  showNext();
                }}
                className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-maroon-700 text-white p-3 rounded-full transition-colors"
                aria-label="Next photo"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          <div className="mt-4 text-center text-white" onClick={(e) => e.stopPropagation()}>
            {lightboxImage.caption && (
              <p className="font-serif font-semibold text-base sm:text-lg">{lightboxImage.caption}</p>
            )}
            <p className="text-xs text-white/60 mt-1">
              {lightboxIndex + 1} / {filteredImages.length}
            </p>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
