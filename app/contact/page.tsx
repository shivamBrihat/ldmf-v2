'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageHero from '@/components/PageHero';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { IMAGES } from '@/lib/images';

export default function ContactPage() {
  const { language } = useLanguage();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [contactInfoText, setContactInfoText] = useState('');

  useEffect(() => {
    async function fetchContactInfo() {
      try {
        const res = await fetch('/api/site-content/contact_info');
        if (res.ok) {
          const data = await res.json();
          setContactInfoText(data.content);
        }
      } catch (err) {
        console.error(err);
      }
    }
    fetchContactInfo();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setError(language === 'hi' ? 'कृपया सभी फ़ील्ड भरें' : 'Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
      } else {
        const data = await res.json();
        setError(data.error || 'Failed to submit message');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-cream-100 font-sans">
      <Navbar />

      <PageHero
        eyebrow={language === 'hi' ? 'संपर्क करें' : 'CONTACT US'}
        title={language === 'hi' ? 'हम आपसे सुनना पसंद करेंगे' : "We'd love to hear from you"}
        subtitle={language === 'hi' ? 'हमारे फाउंडेशन केंद्र पर पधारें या नीचे दिए गए फ़ॉर्म से संदेश भेजें।' : 'Reach out to our team for volunteering, course inquiries, health camps, or general support.'}
        imageUrl={IMAGES.pageHero.contact}
      />

      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Cards */}
          <div className="lg:col-span-5 space-y-8">
            <div className="bg-white rounded-3xl p-8 border border-gold-500/20 shadow-card space-y-6">
              <h3 className="font-serif font-bold text-2xl text-dark">
                {language === 'hi' ? 'फाउंडेशन संपर्क विवरण' : 'Foundation Details'}
              </h3>

              <div className="space-y-5 text-xs sm:text-sm">
                {/* Address block commented out
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-dark block">Address / पता</span>
                    <span className="text-muted leading-relaxed">
                      Village & Post Rampur, District Azamgarh, Uttar Pradesh, PIN 276001
                    </span>
                  </div>
                </div>
                */}

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-maroon-700/10 text-maroon-700 flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-dark block">Phone / फोन</span>
                    <a href="tel:+919693027085" className="text-maroon-700 font-semibold hover:underline">
                      +91 96930 27085
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gold-500/10 text-gold-600 flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-dark block">Email / ईमेल</span>
                    <a href="mailto:bankjankari2021@gmail.com" className="text-maroon-700 font-semibold hover:underline">
                      bankjankari2021@gmail.com
                    </a>
                  </div>
                </div>

                {/* Office Hours commented out
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-maroon-700/10 text-maroon-700 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-bold text-dark block">Office Hours / समय</span>
                    <span className="text-muted">Monday – Saturday, 9:00 AM – 5:00 PM</span>
                  </div>
                </div>
                */}
              </div>
            </div>

            {contactInfoText && (
              <div
                className="bg-cream-100 rounded-3xl p-6 border border-gold-500/20 text-xs text-muted leading-relaxed"
                dangerouslySetInnerHTML={{ __html: contactInfoText }}
              />
            )}
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-gold-500/20 shadow-card">
            <h3 className="font-serif font-bold text-2xl sm:text-3xl text-dark mb-2">
              {language === 'hi' ? 'हमें संदेश भेजें' : 'Send us a message'}
            </h3>
            <p className="text-xs sm:text-sm text-muted mb-8">
              {language === 'hi' ? 'नीचे अपना संदेश लिखें, हमारी टीम शीघ्र ही आपसे संपर्क करेगी।' : 'Fill out the form below and our team will get back to you promptly.'}
            </p>

            {submitted ? (
              <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-6 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="font-serif font-bold text-xl">
                  {language === 'hi' ? 'धन्यवाद! संदेश प्राप्त हुआ।' : 'Thank You! Message Received.'}
                </h4>
                <p className="text-xs text-emerald-700">
                  {language === 'hi' ? 'हम आपके संदेश की समीक्षा करेंगे और जल्द ही जवाब देंगे।' : 'Your message has been submitted to the foundation admin team.'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="bg-emerald-600 text-white font-semibold text-xs px-5 py-2 rounded-full hover:bg-emerald-700 transition-colors"
                >
                  {language === 'hi' ? 'एक और संदेश भेजें' : 'Send Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl p-4 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                    {language === 'hi' ? 'आपका नाम' : 'Your Full Name'} *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Singh"
                    className="w-full bg-cream-100/50 border border-gold-500/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700/30 focus:border-maroon-700 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                    {language === 'hi' ? 'ईमेल पता' : 'Email Address'} *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ramesh@gmail.com"
                    className="w-full bg-cream-100/50 border border-gold-500/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700/30 focus:border-maroon-700 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                    {language === 'hi' ? 'आपका संदेश' : 'Your Message'} *
                  </label>
                  <textarea
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={language === 'hi' ? 'अपना संदेश यहाँ लिखें...' : 'How can we help you or how would you like to get involved?'}
                    className="w-full bg-cream-100/50 border border-gold-500/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-maroon-700/30 focus:border-maroon-700 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-semibold text-sm py-3.5 rounded-full flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting...' : (language === 'hi' ? 'संदेश भेजें' : 'Send Message')}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
