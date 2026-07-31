'use client';

import React, { useState } from 'react';
import { X, Heart, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ModalsProps {
  donateOpen: boolean;
  onDonateClose: () => void;
  volunteerOpen: boolean;
  volunteerRole: 'Volunteer' | 'Mentor';
  onVolunteerClose: () => void;
  applyOpen: boolean;
  selectedCourse: string;
  onApplyClose: () => void;
}

export default function Modals({
  donateOpen,
  onDonateClose,
  volunteerOpen,
  volunteerRole,
  onVolunteerClose,
  applyOpen,
  selectedCourse,
  onApplyClose,
}: ModalsProps) {
  const { t, language } = useLanguage();

  // Donate state
  const [amount, setAmount] = useState<string>('1000');
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donateSubmitted, setDonateSubmitted] = useState(false);
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPan, setDonorPan] = useState('');

  // Volunteer state
  const [volunteerSubmitted, setVolunteerSubmitted] = useState(false);
  const [vName, setVName] = useState('');
  const [vPhone, setVPhone] = useState('');
  const [vEmail, setVEmail] = useState('');

  // Apply state
  const [applySubmitted, setApplySubmitted] = useState(false);
  const [appStudentName, setAppStudentName] = useState('');
  const [appVillage, setAppVillage] = useState('');
  const [appPhone, setAppPhone] = useState('');
  const [appEmail, setAppEmail] = useState('');

  const handleDonateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setDonateSubmitted(true);
  };

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: vName,
          email: vEmail || null,
          message: `[Volunteer/Mentor Enrollment]\nRole: ${volunteerRole}\nPhone: ${vPhone}${vEmail ? `\nEmail: ${vEmail}` : ''}`,
        }),
      });
    } catch (err) {
      console.error('Failed to submit volunteer details:', err);
    }
    setVolunteerSubmitted(true);
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: appStudentName,
          email: appEmail || null,
          message: `[Free Course Admission Enrollment]\nCourse: ${selectedCourse || 'Free Course'}\nVillage & District: ${appVillage}\nPhone: ${appPhone}${appEmail ? `\nEmail: ${appEmail}` : ''}`,
        }),
      });
    } catch (err) {
      console.error('Failed to submit enrollment details:', err);
    }
    setApplySubmitted(true);
  };

  return (
    <>
      {/* 1. DONATE MODAL */}
      {donateOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-cream-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gold-500/30 relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => {
                setDonateSubmitted(false);
                onDonateClose();
              }}
              className="absolute top-5 right-5 text-muted hover:text-dark p-2 rounded-full hover:bg-gold-500/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!donateSubmitted ? (
              <form onSubmit={handleDonateSubmit} className="space-y-6">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-maroon-700 text-gold-400 flex items-center justify-center mx-auto mb-3 shadow-md">
                    <Heart className="w-6 h-6 fill-white text-maroon-700" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-dark">
                    {language === 'hi' ? 'आज ही योगदान दें' : 'Make a Difference Today'}
                  </h3>
                  <p className="text-xs text-muted mt-1">
                    {t('donate.taxNote')}
                  </p>
                </div>

                {/* Amount Preset Selector */}
                <div>
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider mb-2">
                    {language === 'hi' ? 'दान राशि चुनें (INR)' : 'Select Donation Amount (INR)'}
                  </label>
                  <div className="grid grid-cols-4 gap-2 mb-3">
                    {['500', '1000', '2500', '5000'].map((amt) => (
                      <button
                        key={amt}
                        type="button"
                        onClick={() => {
                          setAmount(amt);
                          setCustomAmount('');
                        }}
                        className={`py-2.5 rounded-xl font-bold text-sm border transition-all ${
                          amount === amt && !customAmount
                            ? 'bg-maroon-700 text-white border-gold-500 shadow-md'
                            : 'bg-white text-dark border-gold-500/30 hover:border-gold-500'
                        }`}
                      >
                        ₹{amt}
                      </button>
                    ))}
                  </div>
                  <input
                    type="number"
                    placeholder={language === 'hi' ? 'या अन्य राशि दर्ज करें ₹' : 'Or enter custom amount in ₹'}
                    value={customAmount}
                    onChange={(e) => {
                      setCustomAmount(e.target.value);
                      setAmount(e.target.value);
                    }}
                    className="w-full bg-white border border-gold-500/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-maroon-700"
                  />
                </div>

                {/* Donor Details */}
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-dark uppercase tracking-wider">
                    {language === 'hi' ? 'दाता विवरण (80G रसीद हेतु)' : 'Donor Details (for 80G Receipt)'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={language === 'hi' ? 'पूरा नाम' : 'Full Name'}
                    value={donorName}
                    onChange={(e) => setDonorName(e.target.value)}
                    className="w-full bg-white border border-gold-500/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-maroon-700"
                  />
                  <input
                    type="email"
                    required
                    placeholder={language === 'hi' ? 'ईमेल पता' : 'Email Address'}
                    value={donorEmail}
                    onChange={(e) => setDonorEmail(e.target.value)}
                    className="w-full bg-white border border-gold-500/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-maroon-700"
                  />
                  <input
                    type="text"
                    placeholder={language === 'hi' ? 'पैन नंबर (वैकल्पिक)' : 'PAN Number (Optional)'}
                    value={donorPan}
                    onChange={(e) => setDonorPan(e.target.value.toUpperCase())}
                    className="w-full bg-white border border-gold-500/30 rounded-xl px-4 py-2.5 text-sm uppercase focus:outline-none focus:border-maroon-700"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-maroon-glow bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-base py-3.5 rounded-full flex items-center justify-center gap-2 border border-gold-500/30"
                >
                  <ShieldCheck className="w-5 h-5 text-gold-400" />
                  <span>{language === 'hi' ? `₹${amount || '1000'} का भुगतान करें` : `Proceed to Pay ₹${amount || '1000'}`}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-dark">
                  {language === 'hi' ? `धन्यवाद, ${donorName || 'दाता'}!` : `Thank You, ${donorName || 'Generous Donor'}!`}
                </h3>
                <p className="text-sm text-muted">
                  {language === 'hi'
                    ? `आपका ₹${amount || '1000'} का योगदान सफल रहा। रसीद आपके ईमेल पर भेजी जाएगी।`
                    : `Your contribution of ₹${amount || '1000'} has been simulated successfully. An 80G tax receipt confirmation will be sent to your email.`}
                </p>
                <button
                  onClick={() => {
                    setDonateSubmitted(false);
                    onDonateClose();
                  }}
                  className="bg-maroon-700 text-white font-semibold text-sm px-6 py-2.5 rounded-full"
                >
                  {language === 'hi' ? 'बंद करें' : 'Close Window'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. VOLUNTEER / MENTOR MODAL */}
      {volunteerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-cream-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gold-500/30 relative">
            <button
              onClick={() => {
                setVolunteerSubmitted(false);
                onVolunteerClose();
              }}
              className="absolute top-5 right-5 text-muted hover:text-dark p-2 rounded-full hover:bg-gold-500/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!volunteerSubmitted ? (
              <form onSubmit={handleVolunteerSubmit} className="space-y-5">
                <div className="text-center">
                  <div className="w-12 h-12 rounded-2xl bg-gold-500/20 text-gold-600 flex items-center justify-center mx-auto mb-3">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-2xl text-dark">
                    {volunteerRole === 'Mentor' ? t('donate.mentor') : t('donate.volunteer')}
                  </h3>
                  <p className="text-xs text-muted mt-1">
                    {volunteerRole === 'Mentor'
                      ? (language === 'hi' ? 'ग्रामीण छात्रों के साथ अपना ज्ञान साझा करें' : 'Share your expertise with rural students virtually')
                      : (language === 'hi' ? 'उत्तर प्रदेश में शिविरों के दौरान सहायता करें' : 'Help on ground during weekend camps in Uttar Pradesh')}
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase mb-1">{language === 'hi' ? 'आपका पूरा नाम' : 'Your Full Name'}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anjali Sharma"
                      value={vName}
                      onChange={(e) => setVName(e.target.value)}
                      className="w-full bg-white border border-gold-500/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-maroon-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase mb-1">{language === 'hi' ? 'फोन नंबर' : 'Phone Number'}</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 00000"
                      value={vPhone}
                      onChange={(e) => setVPhone(e.target.value)}
                      className="w-full bg-white border border-gold-500/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-maroon-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase mb-1">{language === 'hi' ? 'ईमेल पता (वैकल्पिक)' : 'Email Address (Optional)'}</label>
                    <input
                      type="email"
                      placeholder="e.g. anjali@example.com"
                      value={vEmail}
                      onChange={(e) => setVEmail(e.target.value)}
                      className="w-full bg-white border border-gold-500/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-maroon-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase mb-1">{language === 'hi' ? 'शहर / जिला' : 'City / District'}</label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'hi' ? 'जैसे: ग्रामीण क्षेत्र, शहर या रिमोट' : 'e.g. Rural area, City, or Remote'}
                      className="w-full bg-white border border-gold-500/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-maroon-700"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-sm py-3.5 rounded-full flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'hi' ? 'आवेदन जमा करें' : 'Submit Application'}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-dark">
                  {language === 'hi' ? 'फाउंडेशन परिवार में आपका स्वागत है!' : 'Welcome to the LDMF Family!'}
                </h3>
                <p className="text-sm text-muted">
                  {language === 'hi'
                    ? `धन्यवाद ${vName}। हमारी टीम 48 घंटों के भीतर आपसे संपर्क करेगी।`
                    : `Thank you, ${vName}. Our volunteer coordinator will reach out to ${vPhone} within 48 hours.`}
                </p>
                <button
                  onClick={() => {
                    setVolunteerSubmitted(false);
                    onVolunteerClose();
                  }}
                  className="bg-maroon-700 text-white font-semibold text-sm px-6 py-2 rounded-full"
                >
                  {language === 'hi' ? 'बंद करें' : 'Close'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 3. COURSE APPLICATION MODAL */}
      {applyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-cream-100 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gold-500/30 relative">
            <button
              onClick={() => {
                setApplySubmitted(false);
                onApplyClose();
              }}
              className="absolute top-5 right-5 text-muted hover:text-dark p-2 rounded-full hover:bg-gold-500/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!applySubmitted ? (
              <form onSubmit={handleApplySubmit} className="space-y-5">
                <div className="text-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gold-600 bg-gold-500/10 px-3 py-1 rounded-full">
                    {language === 'hi' ? 'निःशुल्क प्रवेश फॉर्म' : 'FREE ADMISSION FORM'}
                  </span>
                  <h3 className="font-serif font-bold text-2xl text-dark mt-2">
                    {selectedCourse || 'Free Program'}
                  </h3>
                  <p className="text-xs text-muted mt-1">
                    {language === 'hi' ? 'कोई शुल्क नहीं · अध्ययन सामग्री शामिल' : 'No tuition fees required · Free study material included'}
                  </p>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase mb-1">{language === 'hi' ? 'छात्र / आवेदक का नाम' : 'Student / Applicant Name'}</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pooja Yadav"
                      value={appStudentName}
                      onChange={(e) => setAppStudentName(e.target.value)}
                      className="w-full bg-white border border-gold-500/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-maroon-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase mb-1">{language === 'hi' ? 'गाँव एवं जिला' : 'Village & District'}</label>
                    <input
                      type="text"
                      required
                      placeholder={language === 'hi' ? 'जैसे: गाँव, जिला' : 'e.g. Village, District'}
                      value={appVillage}
                      onChange={(e) => setAppVillage(e.target.value)}
                      className="w-full bg-white border border-gold-500/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-maroon-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase mb-1">{language === 'hi' ? 'संपर्क फोन नंबर' : 'Contact Phone Number'}</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={appPhone}
                      onChange={(e) => setAppPhone(e.target.value)}
                      className="w-full bg-white border border-gold-500/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-maroon-700"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-dark uppercase mb-1">{language === 'hi' ? 'ईमेल पता (वैकल्पिक)' : 'Email Address (Optional)'}</label>
                    <input
                      type="email"
                      placeholder="e.g. pooja@example.com"
                      value={appEmail}
                      onChange={(e) => setAppEmail(e.target.value)}
                      className="w-full bg-white border border-gold-500/30 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-maroon-700"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-maroon-700 hover:bg-maroon-800 text-white font-bold text-sm py-3.5 rounded-full flex items-center justify-center gap-2"
                >
                  <span>{language === 'hi' ? 'निःशुल्क नामांकन जमा करें' : 'Submit Free Enrollment'}</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-serif font-bold text-2xl text-dark">
                  {language === 'hi' ? 'आवेदन प्राप्त हुआ!' : 'Application Received!'}
                </h3>
                <p className="text-sm text-muted">
                  {language === 'hi'
                    ? `प्रिय ${appStudentName}, ${selectedCourse} के लिए आपकी सीट पंजीकृत कर ली गई है।`
                    : `Dear ${appStudentName}, your seat for ${selectedCourse} has been provisionally registered. Our center lead will contact you shortly.`}
                </p>
                <button
                  onClick={() => {
                    setApplySubmitted(false);
                    onApplyClose();
                  }}
                  className="bg-maroon-700 text-white font-semibold text-sm px-6 py-2 rounded-full"
                >
                  {language === 'hi' ? 'पूर्ण' : 'Done'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
