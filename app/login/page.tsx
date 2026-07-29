'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Loader2, ArrowLeft, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username.trim() || !password.trim()) {
      setError('Please fill in all required fields.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Invalid username or password');
        setLoading(false);
        return;
      }

      if (data.success && data.redirectUrl) {
        router.push(data.redirectUrl);
        router.refresh();
      }
    } catch (err) {
      setError('Network error. Please try again later.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FDFBF7] flex flex-col justify-center items-center p-4 sm:p-6 relative overflow-hidden font-sans selection:bg-[#C9A227] selection:text-white">
      {/* Decorative ambient background glows */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#C9A227]/10 rounded-full filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#7A1F2B]/5 rounded-full filter blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <div className="w-[90%] sm:w-full max-w-md relative z-10 flex flex-col items-start">
        {/* Back to Main Site Link (Top-Left of Card) */}
        <a
          href="/"
          className="inline-flex items-center gap-2 text-sm text-[#6B6B6B] hover:text-[#7A1F2B] hover:underline font-medium mb-4 transition-colors no-underline cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          <span>Back to Main Site</span>
        </a>

        {/* Centered Login Card with Framer Motion Entrance */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="w-full bg-white rounded-2xl p-6 sm:p-10 shadow-lg border border-[#E5E5E5]"
        >
          {/* Brand Header */}
          <div className="text-center mb-6">
            <Image
              src="/images/logo.webp"
              alt="Lagni Devi Memorial Foundation Logo"
              width={220}
              height={60}
              className="h-12 w-auto object-contain mx-auto mb-2"
              priority
            />
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#C9A227] uppercase tracking-widest block text-center">
              Remembering | Honouring | Serving
            </span>

            {/* SECURE ADMIN PORTAL Eyebrow */}
            <div className="eyebrow-line justify-center mt-5 mb-1">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C9A227]">
                SECURE ADMIN PORTAL
              </span>
            </div>

            {/* Admin Login Heading */}
            <h1 className="font-serif font-bold text-2xl sm:text-3xl text-[#1A1A1A] mt-1">
              Admin Login
            </h1>
          </div>

          {/* Error Alert Box */}
          {error && (
            <div className="mb-6 p-3.5 bg-red-50 border-l-4 border-red-600 text-red-800 rounded-xl text-xs font-medium animate-in fade-in duration-200">
              {error}
            </div>
          )}

          {/* Credentials Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username or Email Field */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                <User className="w-4 h-4 text-[#6B6B6B]" />
                <span>Username or Email</span>
              </label>
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-white border border-[#E5E5E5] rounded-lg px-4 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#7A1F2B] focus:ring-2 focus:ring-[#7A1F2B]/20 transition-all"
                disabled={loading}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-bold text-[#1A1A1A] uppercase tracking-wider mb-2">
                <Lock className="w-4 h-4 text-[#6B6B6B]" />
                <span>Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full bg-white border border-[#E5E5E5] rounded-lg pl-4 pr-12 py-3 text-sm text-[#1A1A1A] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#7A1F2B] focus:ring-2 focus:ring-[#7A1F2B]/20 transition-all"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors focus:outline-none"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login to Dashboard Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#7A1F2B] hover:bg-[#5f1822] active:scale-[0.99] text-white font-semibold text-sm py-3.5 px-6 rounded-full flex items-center justify-center gap-2 border border-[#C9A227]/30 transition-all shadow-md mt-6 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-[#C9A227]" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-[#C9A227]" />
                  <span>Login to Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Footer Security Note */}
          <div className="mt-6 pt-4 border-t border-[#E5E5E5]/60 text-center">
            <p className="text-xs text-[#6B6B6B] flex items-center justify-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#C9A227] shrink-0" />
              <span>Encrypted HTTP-Only Session · Restricted NGO Access</span>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
