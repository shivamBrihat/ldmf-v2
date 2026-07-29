'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Sparkles, Stethoscope, HandHeart, CheckCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function Community() {
  const { t, language } = useLanguage();

  const initiatives = [
    {
      title: language === 'hi' ? 'ग्राम स्वच्छता अभियान' : 'Village Cleanliness & Hygiene Drives',
      location: 'Azamgarh & Mau',
      description: t('community.cleanliness'),
      highlights: language === 'hi' ? ['8 ग्राम पंचायतें', '1,200+ स्वच्छता किट', 'स्वच्छ जल जागरूकता'] : ['8 Gram Panchayats', '1,200+ Hygiene Kits', 'Clean Water Awareness'],
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=800&auto=format&fit=crop',
      icon: Sparkles,
    },
    {
      title: language === 'hi' ? 'निःशुल्क चिकित्सा एवं नेत्र शिविर' : 'Free Health & Eye Checkup Camps',
      location: 'Azamgarh, Ballia & Jaunpur',
      description: t('community.medical'),
      highlights: language === 'hi' ? ['500+ मरीज / शिविर', 'निःशुल्क दवाएं एवं चश्मे', 'विशेषज्ञ परामर्श'] : ['500+ Patients / Camp', 'Free Medicine & Spectacles', 'Specialist Consultations'],
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
      icon: Stethoscope,
    },
    {
      title: language === 'hi' ? 'सूखा राहत एवं संकट सहायता' : 'Crisis & Drought Relief Operations',
      location: 'Jaunpur & Neighboring Regions',
      description: t('community.crisis'),
      highlights: language === 'hi' ? ['सूखा राशन पैक', 'आपतकालीन जल आपूर्ति', 'तत्काल चिकित्सा सहायता'] : ['Dry Ration Packs', 'Emergency Water Supply', 'Immediate Medical Aid'],
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
      icon: HandHeart,
    },
  ];

  return (
    <section className="py-20 md:py-28 bg-cream-200/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-line justify-center mb-3">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-600">
              {t('community.eyebrow')}
            </span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-dark leading-tight mb-4">
            {language === 'hi' ? 'हर जरूरत में साथ खड़े' : 'Standing Together in Every Need'}
          </h2>
          <p className="text-base sm:text-lg text-muted">
            {language === 'hi'
              ? 'कक्षा की दीवारों से परे, हम स्वास्थ्य, पर्यावरण स्वच्छता की रक्षा करते हैं।'
              : 'Beyond classroom walls, we actively safeguard health, environmental hygiene, and provide rapid relief during natural distress in rural Eastern UP.'}
          </p>
        </div>

        {/* Initiatives Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {initiatives.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.15 }}
                className="bg-white rounded-3xl overflow-hidden shadow-card border border-gold-500/20 hover:border-gold-500 hover:shadow-soft-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Card Header Image */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
                    
                    <div className="absolute top-4 left-4">
                      <div className="w-10 h-10 rounded-xl bg-maroon-700 text-gold-400 flex items-center justify-center shadow-md border border-gold-500/30">
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <span className="text-[11px] font-semibold text-gold-300 uppercase tracking-widest block">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-8">
                    <h3 className="font-serif font-bold text-2xl text-dark group-hover:text-maroon-700 transition-colors mb-3">
                      {item.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2">
                      {item.highlights.map((h, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs font-semibold text-dark">
                          <CheckCircle className="w-4 h-4 text-gold-600 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 sm:p-8 pt-0">
                  <div className="w-full pt-4 border-t border-gold-500/15 flex items-center justify-between text-xs font-bold text-maroon-700">
                    <span>{language === 'hi' ? 'सक्रिय मैदानी कार्य' : 'Active Field Operations'}</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-ping" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
