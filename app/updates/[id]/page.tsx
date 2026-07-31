'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface UpdateItem {
  id: string;
  title: string;
  content: string;
  imageUrl?: string;
  publishedAt: string;
}

export default function UpdateDetailPage({ params }: { params: { id: string } }) {
  const { language } = useLanguage();
  const [update, setUpdate] = useState<UpdateItem | null>(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fallbackUpdates = language === 'hi' ? [
      {
        id: '1',
        title: 'निःशुल्क डिजिटल साक्षरता लैब की शुरुआत',
        content: `ग्रामीण समुदायों के युवाओं को आधुनिक तकनीक और डिजिटल कौशल से सशक्त बनाने के लिए हमारी नई कंप्यूटर लैब का आधिकारिक तौर पर उद्घाटन किया गया है।

इस लैब का मुख्य उद्देश्य बुनियादी कंप्यूटर साक्षरता, इंटरनेट सुरक्षा, डिजिटल वित्तीय साक्षरता और माइक्रोसॉफ्ट ऑफिस जैसे महत्वपूर्ण कौशल प्रदान करना है। यहाँ प्रवेश लेने वाले सभी छात्रों को पूरी तरह से मुफ्त शिक्षा दी जाएगी ताकि वे तकनीकी रूप से आत्मनिर्भर बन सकें।

हमारा उद्देश्य है कि हर युवा कंप्यूटर और डिजिटल उपकरणों का उपयोग करने में सक्षम हो, जिससे उन्हें रोजगार के बेहतर अवसर मिल सकें।`,
        publishedAt: '2025-10-15T00:00:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: '2',
        title: 'महिला सिलाई बैच का दीक्षांत समारोह',
        content: `हमारे व्यावसायिक सिलाई एवं हस्तशिल्प केंद्र से तीन महीने का प्रशिक्षण पूरा करने वाली ग्रामीण महिलाओं के नए बैच का दीक्षांत समारोह आयोजित किया गया।

इस प्रशिक्षण के दौरान महिलाओं को विभिन्न प्रकार की सिलाई, कढ़ाई, फैशन डिजाइनिंग और छोटे व्यवसाय प्रबंधन से संबंधित कौशल सिखाए गए। बैच की सभी सफल महिलाओं को आत्मनिर्भर बनने और अपने घरों से ही रोजगार शुरू करने के लिए उपहार स्वरूप सिलाई मशीनें और टूलकिट प्रदान किए गए हैं।

फाउंडेशन का यह प्रयास महिलाओं को आर्थिक रूप से स्वावलंबी बनाने की दिशा में एक महत्वपूर्ण कदम है।`,
        publishedAt: '2025-08-20T00:00:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: '3',
        title: 'बोर्ड परीक्षा सघन कोचिंग शिविर शुरू',
        content: `आगामी बोर्ड परीक्षाओं की तैयारी कर रहे ग्रामीण और वंचित पृष्ठभूमि के 10वीं और 12वीं कक्षा के छात्रों के लिए फाउंडेशन ने अपना वार्षिक तीन-दिवसीय सघन कोचिंग शिविर शुरू किया है।

इस शिविर में अनुभवी शिक्षकों द्वारा गणित, विज्ञान, अंग्रेजी और सामाजिक विज्ञान जैसे कठिन विषयों की विशेष कक्षाएं ली जा रही हैं। इसके साथ ही छात्रों को समय प्रबंधन, परीक्षा के तनाव को कम करने और उत्तर लिखने की प्रभावी तकनीकों के बारे में भी मार्गदर्शन दिया जा रहा है।

हमारा मुख्य लक्ष्य है कि आर्थिक तंगी के कारण कोई भी मेधावी छात्र पीछे न छूटे और वे बोर्ड परीक्षाओं में उत्कृष्ट अंक प्राप्त कर सकें।`,
        publishedAt: '2025-06-05T00:00:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: '4',
        title: 'सामुदायिक नेत्र एवं स्वास्थ्य शिविर आयोजित',
        content: `बुजुर्गों, बच्चों और ग्रामीण परिवारों के लिए फाउंडेशन की ओर से एक दिवसीय विशाल सामान्य स्वास्थ्य एवं नेत्र जाँच शिविर का आयोजन सफलतापूर्वक संपन्न हुआ।

शिविर में डॉक्टरों की एक विशेष टीम ने आँखों की मुफ्त जाँच, रक्तचाप परीक्षण और सामान्य स्वास्थ्य परामर्श दिए। शिविर के दौरान जरूरतमंद मरीजों को निःशुल्क दवाइयाँ और चश्मे वितरित किए गए, तथा गंभीर बीमारियों के लिए आगे के उपचार की सलाह दी गई।

फाउंडेशन समय-समय पर ग्रामीण इलाकों में इस प्रकार के शिविरों का आयोजन करता रहेगा ताकि स्वास्थ्य सुविधाएं हर घर तक पहुँच सकें।`,
        publishedAt: '2025-04-12T00:00:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: '5',
        title: 'अंग्रेजी और संचार कौशल कार्यशाला',
        content: `युवाओं के आत्मविश्वास को बढ़ाने और उनके रोजगार के अवसरों को बेहतर बनाने के लिए फाउंडेशन ने स्पोकन इंग्लिश एवं संचार कौशल कार्यशाला का आयोजन किया।

इस कार्यशाला में छात्रों को रोजमर्रा की अंग्रेजी बोलने, सार्वजनिक भाषण, व्यक्तित्व विकास और साक्षात्कार की तैयारियों के बारे में सिखाया गया। कार्यशाला में व्यावहारिक गतिविधियों और संवाद सत्रों के माध्यम से छात्रों ने झिझक दूर कर बोलना सीखा।

यह कार्यक्रम युवाओं को आज के प्रतिस्पर्धी दौर में आगे बढ़ने के लिए आवश्यक जीवन कौशल प्रदान करने के हमारे संकल्प का हिस्सा है।`,
        publishedAt: '2025-02-18T00:00:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: '6',
        title: 'शीतकालीन राहत एवं सामग्री वितरण',
        content: `सर्दियों के मौसम में जरूरतमंद ग्रामीण परिवारों और स्कूली बच्चों की सहायता के लिए फाउंडेशन द्वारा शीतकालीन राहत सामग्री का वितरण किया गया।

इस अभियान के तहत 150 से अधिक जरूरतमंद परिवारों को कंबल, गर्म कपड़े और छोटे बच्चों को स्कूल बैग एवं लेखन सामग्री वितरित की गई। इस प्रयास का मुख्य उद्देश्य सर्दियों में ग्रामीण परिवारों को राहत पहुँचाना और बच्चों की पढ़ाई को निरंतर जारी रखना है।

हम इस पुनीत कार्य में सहयोग देने वाले सभी स्वयंसेवकों का दिल से आभार व्यक्त करते हैं।`,
        publishedAt: '2024-12-05T00:00:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
      }
    ] : [
      {
        id: '1',
        title: 'Free Digital Literacy Lab Launched',
        content: `We have officially inaugurated our new computer training lab, dedicated to empowering rural youth with critical digital literacy and technical skills.

The lab offers structured training in basic computer operations, internet safety, digital financial services, and productivity tools like Microsoft Office. All courses are completely free of charge, ensuring that students from all economic backgrounds can build a strong digital foundation.

By bridging the digital divide, we aim to prepare the village youth for modern job opportunities and academic advancement.`,
        publishedAt: '2025-10-15T00:00:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: '2',
        title: 'Women’s Tailoring Graduation Ceremony',
        content: `A graduation ceremony was held to celebrate the latest batch of rural women who successfully completed our three-month vocational tailoring and crafts program.

Throughout the course, these women learned dress designing, embroidery, and basic entrepreneurship skills. To help them start their own home-based tailoring services immediately, every graduate was gifted a new sewing machine and basic tailoring kit.

This initiative is a major milestone in our commitment to fostering economic self-reliance and financial independence among rural women.`,
        publishedAt: '2025-08-20T00:00:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: '3',
        title: 'Board Exam Intensive Coaching Camps Start',
        content: `To support Class 10 and 12 students from economically weaker sections preparing for their upcoming board examinations, the foundation has launched its annual coaching camps.

Over three months, experienced instructors will conduct intensive revision classes for critical subjects like Mathematics, Science, English, and Social Studies. Students will also receive mentorship on exam time management, stress reduction, and effective writing techniques.

Our objective is to ensure that financial hardships do not stand in the way of high-achieving students reaching their potential.`,
        publishedAt: '2025-06-05T00:00:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: '4',
        title: 'Free Community Eye & Health Camp Organized',
        content: `A large-scale free health checkup and eye consultation camp was organized for elderly citizens, children, and families in rural communities.

A visiting team of healthcare specialists provided comprehensive eye testing, blood pressure checks, and general medical advice. Necessary medicines and corrective spectacles were distributed to patients free of cost.

The foundation regularly organizes these medical camps to ensure quality healthcare and wellness reaches the most remote areas.`,
        publishedAt: '2025-04-12T00:00:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: '5',
        title: 'Spoken English & Communication Workshop',
        content: `The foundation organized a special Spoken English and Communication Skills workshop to build self-confidence and enhance the career prospects of local village youth.

The curriculum focused on everyday English conversation, public speaking, personality development, and interview preparation. Interactive group activities and speaking drills helped students overcome hesitation.

Equipping youth with strong language skills is part of our mission to prepare them for modern professional careers.`,
        publishedAt: '2025-02-18T00:00:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=800&auto=format&fit=crop',
      },
      {
        id: '6',
        title: 'Winter Support and Material Distribution',
        content: `In response to the cold weather, the foundation launched its winter relief drive to distribute essential materials to school-going children and rural families.

Over 150 families received warm blankets and clothing, while children were provided with school bags and stationery kits to support their continued education.

We extend our deep gratitude to all volunteers and well-wishers whose hard work made this support drive possible.`,
        publishedAt: '2024-12-05T00:00:00.000Z',
        imageUrl: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
      }
    ];

    async function fetchDetail() {
      try {
        const res = await fetch(`/api/updates/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setUpdate(data);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error(err);
      }

      // Check if ID belongs to our fallback list
      const matched = fallbackUpdates.find(u => u.id === params.id);
      setUpdate(matched || null);
      setLoading(false);
    }
    fetchDetail();
  }, [params.id, language]);

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Link
          href="/updates"
          className="inline-flex items-center gap-2 text-xs font-bold text-maroon-700 hover:text-maroon-800 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'hi' ? 'वापस अपडेट्स पर जाएँ' : 'Back to all updates'}</span>
        </Link>

        {loading ? (
          <div className="py-12 text-center text-muted">Loading article...</div>
        ) : !update ? (
          <div className="py-12 text-center text-muted">Article not found.</div>
        ) : (
          <article className="bg-white rounded-3xl p-6 sm:p-10 shadow-card border border-gold-500/20">
            <div className="flex items-center gap-2 text-xs text-gold-600 font-bold mb-3 uppercase tracking-wider">
              <Calendar className="w-4 h-4" />
              <span>{new Date(update.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>

            <h1 className="font-serif font-bold text-3xl sm:text-4xl text-dark leading-tight mb-6">
              {update.title}
            </h1>

            {update.imageUrl && (
              <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden mb-8 shadow-sm">
                <Image
                  src={update.imageUrl}
                  alt={update.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="prose prose-stone max-w-none text-base text-dark/90 leading-relaxed whitespace-pre-line">
              {update.content}
            </div>
          </article>
        )}
      </div>

      <Footer />
    </main>
  );
}
