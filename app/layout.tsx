import type { Metadata } from 'next';
import { Playfair_Display, Inter, Noto_Sans_Devanagari } from 'next/font/google';
import { LanguageProvider } from '@/context/LanguageContext';
import './globals.css';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
});

const devanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-devanagari',
});

export const metadata: Metadata = {
  title: 'Lagni Devi Memorial Foundation | In Her Memory. For Her People.',
  description: 'Lagni Devi Memorial Foundation (LDMF) is an NGO empowering rural communities in Uttar Pradesh through free education, women skill development, and accessible healthcare.',
  keywords: [
    'Lagni Devi Memorial Foundation',
    'NGO Uttar Pradesh',
    'Azamgarh NGO',
    'Women Skill Development',
    'Free Computer Education',
    'Rural Healthcare Camps India',
    'Smt Lagni Devi'
  ],
  authors: [{ name: 'Lagni Devi Memorial Foundation' }],
  openGraph: {
    title: 'Lagni Devi Memorial Foundation — In Her Memory. For Her People.',
    description: 'Empowering rural communities through education, women empowerment, and healthcare.',
    url: 'https://ldmf.org',
    siteName: 'Lagni Devi Memorial Foundation',
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable} ${devanagari.variable} scroll-smooth`}>
      <body className="bg-cream-100 text-dark antialiased font-sans selection:bg-gold-500 selection:text-white">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
