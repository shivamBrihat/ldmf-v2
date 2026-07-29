'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle: string;
  imageUrl?: string;
}

export default function PageHero({
  eyebrow = 'LAGNI DEVI MEMORIAL FOUNDATION',
  title,
  subtitle,
  imageUrl,
}: PageHeroProps) {
  return (
    <div className="bg-cream-100 border-b border-gold-500/20 py-12 md:py-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Text content */}
          <div className={imageUrl ? 'lg:col-span-7' : 'lg:col-span-12 max-w-3xl'}>
            <div className="eyebrow-line mb-3">
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-600">
                {eyebrow}
              </span>
            </div>
            <h1 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-dark leading-tight mb-4">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-muted leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Optional Right Side Hero Image */}
          {imageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-5 relative h-56 sm:h-72 w-full rounded-3xl overflow-hidden shadow-card border border-gold-500/30"
            >
              <Image
                src={imageUrl}
                alt={title}
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/30 via-transparent to-transparent" />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
