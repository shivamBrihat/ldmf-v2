'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import Modals from '@/components/Modals';
import { BookOpen, Clock, Users, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { IMAGES } from '@/lib/images';

interface CourseItem {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
}

export default function CoursesPage() {
  const { language } = useLanguage();
  const [courses, setCourses] = useState<CourseItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [applyOpen, setApplyOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState('Basic Computer Skills');

  useEffect(() => {
    async function fetchCourses() {
      try {
        const res = await fetch('/api/programs');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCourses(data);
            return;
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }

      // Default fallback courses with real event imagery
      setCourses([
        {
          id: 'c-1',
          title: language === 'hi' ? 'कंप्यूटर कौशल एवं डिजिटल साक्षरता' : 'Basic Computer Skills & Digital Literacy',
          description: language === 'hi' ? 'विंडोज, एमएस ऑफिस, इंटरनेट और ऑनलाइन सेवाओं का 3 महीने का व्यावहारिक प्रशिक्षण।' : 'Comprehensive 3-month course covering Windows, MS Office, internet browsing, and practical typing.',
          imageUrl: IMAGES.stock.computer,
        },
        {
          id: 'c-2',
          title: language === 'hi' ? 'स्पोकन इंग्लिश एवं संचार कौशल' : 'Spoken English & Communication',
          description: language === 'hi' ? 'धाराप्रवाह बोलने, साक्षात्कार की तैयारी और आत्मविश्वास बढ़ाने की कार्यशालाएँ।' : 'Fluency, vocabulary, public speaking, and confidence-building workshops for students.',
          imageUrl: IMAGES.stock.english,
        },
        {
          id: 'c-3',
          title: language === 'hi' ? 'महिला सिलाई एवं हस्तशिल्प प्रशिक्षण' : 'Women’s Vocational Tailoring & Handicrafts',
          description: language === 'hi' ? 'ग्रामीण महिलाओं को आर्थिक रूप से स्वावलंबी बनाने हेतु सिलाई और कटाई का प्रशिक्षण।' : 'Hands-on tailoring, embroidery, and handicrafts training equipped to help women earn sustainable livelihoods.',
          imageUrl: IMAGES.stock.tailoring,
        },
        {
          id: 'c-4',
          title: language === 'hi' ? 'बोर्ड परीक्षा सघन कोचिंग शिविर' : 'Board Exam Intensive Coaching Camps',
          description: language === 'hi' ? 'कक्षा 10वीं एवं 12वीं के छात्रों के लिए गणित, विज्ञान एवं अंग्रेजी में निःशुल्क ट्यूशन।' : 'Free intensive mentoring in core subjects for Class 10 & 12 state board students.',
          imageUrl: IMAGES.stock.coaching,
        },
      ]);
    }
    fetchCourses();
  }, [language]);

  const handleApplyClick = (title: string) => {
    setSelectedCourse(title);
    setApplyOpen(true);
  };

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      <PageHero
        eyebrow={language === 'hi' ? 'निःशुल्क शिक्षा एवं कौशल' : 'FREE COURSES & SKILLS'}
        title={language === 'hi' ? 'व्यावहारिक कौशल जो नए अवसर खोलते हैं' : 'Practical skills that open doors'}
        subtitle={language === 'hi' ? 'कंप्यूटर प्रशिक्षण, अंग्रेजी बोलना, महिला सिलाई एवं बोर्ड परीक्षा कोचिंग शिविर।' : 'Free educational courses designed to empower youth, women, and students across rural communities.'}
        imageUrl={IMAGES.pageHero.courses}
      />

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12 text-muted">Loading courses...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-3xl overflow-hidden shadow-card border border-gold-500/20 hover:border-gold-500 transition-all flex flex-col group p-6 sm:p-8"
              >
                {course.imageUrl && (
                  <div className="relative h-56 w-full rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={course.imageUrl}
                      alt={course.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="font-serif font-bold text-2xl text-dark group-hover:text-maroon-700 transition-colors mb-3">
                      {course.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-6">
                      {course.description}
                    </p>

                    <div className="space-y-2 mb-8 text-xs text-dark/80 font-medium">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                        <span>{language === 'hi' ? '100% नि:शुल्क अध्ययन सामग्री एवं लैब' : '100% Free learning materials & hands-on lab access'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-gold-600 shrink-0" />
                        <span>{language === 'hi' ? 'सफलतापूर्वक पूरा करने पर प्रमाण पत्र' : 'Recognized completion certificate issued'}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleApplyClick(course.title)}
                    className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-sm py-3 px-6 rounded-full flex items-center justify-center gap-2 transition-all shadow-md"
                  >
                    <span>{language === 'hi' ? 'रजिस्टर / रुचि दर्ज करें' : 'Register Interest'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />

      <Modals
        donateOpen={false}
        onDonateClose={() => {}}
        volunteerOpen={false}
        volunteerRole="Volunteer"
        onVolunteerClose={() => {}}
        applyOpen={applyOpen}
        selectedCourse={selectedCourse}
        onApplyClose={() => setApplyOpen(false)}
      />
    </main>
  );
}
