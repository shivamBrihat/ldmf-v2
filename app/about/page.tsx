'use client';

import React from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Team from '@/components/Team';
import Timeline from '@/components/Timeline';
import Vision from '@/components/Vision';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      {/* 1. Full-Width Maroon Hero Header */}
      <section className="bg-maroon-700 text-white py-16 sm:py-20 px-4 text-center border-b-4 border-gold-500 relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-3 relative z-10">
          <h1 className="font-serif font-bold text-4xl sm:text-5xl md:text-6xl text-white tracking-wide">
            {language === 'hi' ? 'हमारे बारे में' : 'About Us'}
          </h1>
          <p className="text-sm sm:text-base text-gold-300 font-medium tracking-wide">
            {language === 'hi'
              ? 'श्रीमती लगनी देवी की स्मृति में — सेवा के अटूट संकल्प के साथ'
              : 'In memory of Smt. Lagni Devi — with a resolve to serve'}
          </p>
        </div>
      </section>

      {/* 2. Her Story & Memorial Section */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 items-center">
          {/* Left Column: Memorial Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-md bg-maroon-700/5 rounded-3xl p-8 sm:p-10 border border-maroon-700/15 shadow-card flex flex-col items-center justify-center text-center space-y-5 relative">
              {/* LD Avatar / Image Circle */}
              <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-lg border-2 border-gold-500/50 relative">
                <Image
                  src="/images/lagni-devi-image.png"
                  alt="Smt. Lagni Devi"
                  fill
                  sizes="(max-width: 768px) 128px, 144px"
                  className="object-cover object-top"
                />
              </div>

              <div>
                <h3 className="font-serif font-bold text-2xl sm:text-3xl text-maroon-700">
                  Smt. Lagni Devi
                </h3>
                <span className="text-xs font-mono font-semibold tracking-widest text-gold-600 uppercase block mt-1">
                  1945 – 2019
                </span>
              </div>

              <div className="w-12 h-0.5 bg-gold-500/40" />

              <p className="text-xs text-muted italic max-w-xs leading-relaxed">
                {language === 'hi'
                  ? '"सच्ची सेवा वही है जो बिना किसी स्वार्थ के सबसे ज़रूरतमंदों तक पहुँचे।"'
                  : '"True service is reaching out to those in need with unconditional compassion and dignity."'}
              </p>
            </div>
          </div>

          {/* Right Column: Her Story Prose */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-600 block mb-2">
                {language === 'hi' ? 'उनकी जीवन गाथा' : 'HER LEGACY'}
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-maroon-700">
                {language === 'hi' ? 'उनकी कहानी' : 'Her Story'}
              </h2>
            </div>

            <div className="prose prose-stone max-w-none text-sm sm:text-base text-dark/85 leading-relaxed space-y-4">
              <p>
                {language === 'hi'
                  ? 'श्रीमती लगनी देवी एक असाधारण महिला थीं, जिन्होंने अपना पूरा जीवन समाज और अपने समुदाय की सेवा में समर्पित कर दिया। उत्तर प्रदेश के एक छोटे से गाँव में जन्मी, उन्होंने सीमित संसाधनों के बावजूद कभी दूसरों की मदद करना नहीं छोड़ा।'
                  : 'Smt. Lagni Devi was an extraordinary woman who dedicated her entire life to serving her community. Born in a small village in Uttar Pradesh, she never stopped helping others despite limited resources.'}
              </p>

              <p>
                {language === 'hi'
                  ? 'बच्चों की शिक्षा और महिलाओं का सशक्तिकरण उनके दिल के सबसे करीब था। वह अपने घर पर गाँव के बच्चों को पढ़ाती थीं और महिलाओं को स्वावलंबी बनने व सिलाई कौशल सीखने के लिए प्रेरित करती थीं।'
                  : 'Children’s education and women’s empowerment were close to her heart. She would teach children at her home and motivate women toward self-employment.'}
              </p>

              <p>
                {language === 'hi'
                  ? '2019 में उनके निधन के बाद, उनके परिवार और ग्रामीण समुदाय ने उनकी इस पुनीत प्रेरणा को हमेशा जीवित रखने और पूर्वी उत्तर प्रदेश में व्यवस्थित सामाजिक बदलाव लाने के लिए लगनी देवी मेमोरियल फाउंडेशन (LDMF) की स्थापना की।'
                  : 'After her passing in 2019, her family and community established this foundation to keep her legacy alive and bring systematic positive change across rural Uttar Pradesh.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Vision & Pillars */}
      <Vision />

      {/* 4. Leadership Team - Commented Out
      <Team />
      */}

      {/* 5. Journey Timeline */}
      <Timeline />

      <Footer />
    </main>
  );
}
