'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Linkedin, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface TeamMemberItem {
  id?: string;
  name: string;
  role: string;
  photoUrl: string;
  bio?: string;
}

export default function Team() {
  const { t, language } = useLanguage();
  const [teamMembers, setTeamMembers] = useState<TeamMemberItem[]>([]);

  useEffect(() => {
    async function fetchTeam() {
      try {
        const res = await fetch('/api/team');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setTeamMembers(
              data.map((m: any) => ({
                id: m.id,
                name: m.name,
                role: m.role,
                photoUrl: m.photoUrl,
                bio: m.bio || (language === 'hi' ? 'सामुदायिक सेवा एवं ग्रामीण कल्याण में समर्पित कार्यकर्ता।' : 'Dedicated community leader & advocate for rural empowerment.'),
              }))
            );
            return;
          }
        }
      } catch (error) {
        console.error('Failed to fetch dynamic team:', error);
      }

      // Default fallback
      setTeamMembers([
        {
          name: 'Shri Rajeev Chauhan',
          role: t('team.role.founder'),
          bio: language === 'hi' ? 'सेवानिवृत्त शिक्षाविद एवं सामाजिक अधिवक्ता, यूपी में 35 से अधिक वर्षों का सामुदायिक नेतृत्व।' : 'Retired educationist & social advocate with 35+ years of community leadership in UP.',
          photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop',
        },
        {
          name: 'Smt. Sunita Chauhan',
          role: t('team.role.secretary'),
          bio: language === 'hi' ? 'महिला आर्थिक सशक्तिकरण में विशेषज्ञता प्राप्त ग्रामीण विकास रणनीतिकार।' : 'Dedicated rural development strategist specializing in women economic empowerment.',
          photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=600&auto=format&fit=crop',
        },
        {
          name: 'Shri Amit Kumar Singh',
          role: t('team.role.treasurer'),
          bio: language === 'hi' ? 'पारदर्शी 80G शासन और दाता जवाबदेही की देखरेख करने वाले वित्तीय सलाहकार।' : 'Financial consultant overseeing transparent 80G governance and donor accountability.',
          photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600&auto=format&fit=crop',
        },
        {
          name: 'Dr. Preeti Sharma',
          role: t('team.role.eduDirector'),
          bio: language === 'hi' ? 'पूर्व विश्वविद्यालय व्याख्याता, मुफ्त कंप्यूटर साक्षरता और कोचिंग कार्यक्रमों का संचालन।' : 'Former university lecturer driving free computer literacy & coaching programs.',
          photoUrl: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=600&auto=format&fit=crop',
        },
      ]);
    }

    fetchTeam();
  }, [language, t]);

  return (
    <section className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="eyebrow-line justify-center mb-3">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest text-gold-600">
              {t('team.eyebrow')}
            </span>
          </div>
          <h2 className="font-serif font-bold text-3xl sm:text-4xl md:text-5xl text-dark leading-tight mb-4">
            {t('team.headline')}
          </h2>
          <p className="text-base sm:text-lg text-muted">
            {language === 'hi'
              ? 'श्रीमती लगनी देवी के दृष्टिकोण को सम्मानित करने के लिए समर्पित शिक्षाविद, बुजुर्ग और स्वास्थ्य नेता।'
              : 'Our governing body comprises dedicated educators, community elders, and healthcare leaders working voluntarily to honor Smt. Lagni Devi\'s vision.'}
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-cream-100/70 rounded-3xl p-6 border border-gold-500/20 hover:border-gold-500 hover:shadow-card transition-all duration-300 group flex flex-col items-center text-center"
            >
              {/* Photo Frame */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden mb-5 border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={member.photoUrl}
                  alt={member.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                />
              </div>

              {/* Name & Role */}
              <h3 className="font-serif font-bold text-xl text-dark group-hover:text-maroon-700 transition-colors">
                {member.name}
              </h3>
              <span className="text-xs font-semibold text-gold-600 uppercase tracking-wider mt-1 mb-3">
                {member.role}
              </span>
              <p className="text-xs text-muted leading-relaxed mb-4">
                {member.bio}
              </p>

              {/* Action Icons */}
              <div className="mt-auto flex items-center gap-3 pt-3 border-t border-gold-500/15 w-full justify-center">
                <a
                  href={`mailto:contact@ldmf.org?subject=Query%20for%20${encodeURIComponent(member.name)}`}
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-muted hover:text-maroon-700 hover:bg-gold-500/20 transition-colors border border-gold-500/20"
                  title={`Contact ${member.name}`}
                >
                  <Mail className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-muted hover:text-maroon-700 hover:bg-gold-500/20 transition-colors border border-gold-500/20"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
