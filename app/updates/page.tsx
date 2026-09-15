'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { Calendar, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { IMAGES } from '@/lib/images';

interface UpdateItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
}

export default function UpdatesPage() {
  const { language } = useLanguage();
  const [updates, setUpdates] = useState<UpdateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fallbackUpdates = language === 'hi' ? [
      {
        id: '1',
        title: 'निःशुल्क डिजिटल साक्षरता लैब की शुरुआत',
        content: 'ग्रामीण युवाओं को आधुनिक तकनीक से जोड़ने के लिए हमारी नई कंप्यूटर लैब का उद्घाटन किया गया है, जहाँ निःशुल्क कंप्यूटर पाठ्यक्रम प्रदान किए जा रहे हैं।',
        publishedAt: '2025-10-15T00:00:00.000Z',
        imageUrl: IMAGES.stock.computer,
      },
      {
        id: '2',
        title: 'महिला सिलाई बैच का दीक्षांत समारोह',
        content: 'हमारे व्यावसायिक सिलाई केंद्र से प्रशिक्षण पूरा करने वाली महिलाओं को अपना रोजगार शुरू करने के लिए निःशुल्क सिलाई मशीनें और किट प्रदान किए गए।',
        publishedAt: '2025-08-20T00:00:00.000Z',
        imageUrl: IMAGES.stock.tailoring,
      },
      {
        id: '3',
        title: 'बोर्ड परीक्षा सघन कोचिंग शिविर शुरू',
        content: '10वीं और 12वीं कक्षा के छात्रों के लिए निःशुल्क तीन-दिवसीय बोर्ड परीक्षा सघन कोचिंग शिविर शुरू किए गए हैं ताकि वे आगामी परीक्षाओं में उत्कृष्ट प्रदर्शन कर सकें।',
        publishedAt: '2025-06-05T00:00:00.000Z',
        imageUrl: IMAGES.stock.coaching,
      },
      {
        id: '4',
        title: 'सामुदायिक नेत्र एवं स्वास्थ्य शिविर आयोजित',
        content: 'ग्रामीण बुजुर्गों और परिवारों के लिए एक विशाल निःशुल्क सामान्य स्वास्थ्य एवं नेत्र जाँच शिविर का आयोजन किया गया, जिसमें मुफ़्त दवाइयाँ वितरित की गईं।',
        publishedAt: '2025-04-12T00:00:00.000Z',
        imageUrl: IMAGES.stock.health,
      },
      {
        id: '5',
        title: 'अंग्रेजी और संचार कौशल कार्यशाला',
        content: 'ग्रामीण क्षेत्र के मेधावी छात्रों के लिए उनके आत्मविश्वास को बढ़ाने और साक्षात्कार की तैयारी के लिए स्पोकन इंग्लिश एवं संचार कार्यशाला का आयोजन हुआ।',
        publishedAt: '2025-02-18T00:00:00.000Z',
        imageUrl: IMAGES.stock.english,
      },
      {
        id: '6',
        title: 'शीतकालीन राहत एवं सामग्री वितरण',
        content: 'स्थानीय ग्रामीण क्षेत्रों में जरूरतमंद स्कूली बच्चों और परिवारों को गर्म वस्त्र, कंबल और पाठ्य सामग्री वितरित की गई।',
        publishedAt: '2024-12-05T00:00:00.000Z',
        imageUrl: IMAGES.stock.relief,
      }
    ] : [
      {
        id: '1',
        title: 'Free Digital Literacy Lab Launched',
        content: 'Inaugurated our new computer lab equipped with modern systems to offer free basic computer and digital literacy courses to local village youths.',
        publishedAt: '2025-10-15T00:00:00.000Z',
        imageUrl: IMAGES.stock.computer,
      },
      {
        id: '2',
        title: 'Women’s Tailoring Graduation Ceremony',
        content: 'Celebrated the graduation of our latest vocational tailoring batch. Trained women were provided with free sewing tools to launch their micro-businesses.',
        publishedAt: '2025-08-20T00:00:00.000Z',
        imageUrl: IMAGES.stock.tailoring,
      },
      {
        id: '3',
        title: 'Board Exam Intensive Coaching Camps Start',
        content: 'Launched our three-month intensive coaching camp series for Class 10 and 12 students to prepare them thoroughly for the board examinations.',
        publishedAt: '2025-06-05T00:00:00.000Z',
        imageUrl: IMAGES.stock.coaching,
      },
      {
        id: '4',
        title: 'Free Community Eye & Health Camp Organized',
        content: 'Successfully conducted a general health checkup and eye consultation camp for rural seniors and families, offering free basic medicines.',
        publishedAt: '2025-04-12T00:00:00.000Z',
        imageUrl: IMAGES.stock.health,
      },
      {
        id: '5',
        title: 'Spoken English & Communication Workshop',
        content: 'Organized interactive Spoken English workshops to empower local youth with communication skills, building confidence for job interviews.',
        publishedAt: '2025-02-18T00:00:00.000Z',
        imageUrl: IMAGES.stock.english,
      },
      {
        id: '6',
        title: 'Winter Support and Material Distribution',
        content: 'Distributed blankets, warm clothing, and school stationeries to children and families in rural communities for the winter season.',
        publishedAt: '2024-12-05T00:00:00.000Z',
        imageUrl: IMAGES.stock.relief,
      }
    ];

    async function fetchUpdates() {
      try {
        const res = await fetch('/api/updates');
        if (res.ok) {
          const data = await res.json();
          if (data && data.length > 0) {
            setUpdates(data);
          } else {
            setUpdates(fallbackUpdates);
          }
        } else {
          setUpdates(fallbackUpdates);
        }
      } catch (err) {
        console.error('Error fetching updates:', err);
        setUpdates(fallbackUpdates);
      } finally {
        setLoading(false);
      }
    }
    fetchUpdates();
  }, [language]);

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      <PageHero
        eyebrow={language === 'hi' ? 'समाचार एवं अपडेट्स' : 'UPDATES & NEWS'}
        title={language === 'hi' ? 'ज़मीन से जुड़े नवीनतम अपडेट्स' : 'Latest news and stories from the ground'}
        subtitle={language === 'hi' ? 'हमारे कंप्यूटर क्लास, महिला प्रशिक्षण शिविर और ग्रामीण पहलों के नए समाचार।' : 'Discover our latest field updates, village projects, and community developments.'}
        imageUrl={IMAGES.pageHero.updates}
      />

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {loading ? (
          <div className="text-center py-12 text-muted">Loading updates...</div>
        ) : updates.length === 0 ? (
          <div className="text-center py-12 text-muted">No updates available right now.</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {updates.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden shadow-card border border-gold-500/20 hover:border-gold-500 transition-all flex flex-col group"
              >
                {item.imageUrl && (
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={item.imageUrl}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 flex flex-col flex-grow justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-gold-600 font-semibold mb-2">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{new Date(item.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>

                    <h3 className="font-serif font-bold text-xl text-dark group-hover:text-maroon-700 transition-colors mb-3 line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-muted leading-relaxed line-clamp-3 mb-4">
                      {item.content}
                    </p>
                  </div>

                  <Link
                    href={`/updates/${item.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-maroon-700 hover:text-maroon-800 transition-colors mt-2"
                  >
                    <span>{language === 'hi' ? 'पूरा पढ़ें' : 'Read Full Story'}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}
