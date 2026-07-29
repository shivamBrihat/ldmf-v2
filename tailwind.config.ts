import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#7A1F2B',
          50: '#FDF2F4',
          100: '#FBE4E8',
          200: '#F7CBD2',
          300: '#EEA2AE',
          400: '#E16C81',
          500: '#C9405B',
          600: '#A32943',
          700: '#7A1F2B',
          800: '#611721',
          900: '#4A1119',
          950: '#330B11',
        },
        gold: {
          DEFAULT: '#C9A227',
          50: '#FAF7EC',
          100: '#F4EBCE',
          200: '#E7D89C',
          300: '#DABF67',
          400: '#D2AB3B',
          500: '#C9A227',
          600: '#A47D1C',
          700: '#7B5A18',
          800: '#64471B',
          900: '#543C1C',
        },
        cream: {
          DEFAULT: '#FDFBF7',
          50: '#FFFFFF',
          100: '#FDFBF7',
          200: '#FAF5EE',
          300: '#F5ECE0',
          400: '#EADFCF',
          500: '#DBCBBA',
        },
        dark: '#1A1A1A',
        muted: '#6B6B6B',
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'soft-xl': '0 20px 40px -15px rgba(122, 31, 43, 0.08)',
        'card': '0 10px 30px -5px rgba(26, 26, 26, 0.05)',
        'gold-glow': '0 10px 30px -5px rgba(201, 162, 39, 0.3)',
      }
    },
  },
  plugins: [],
};
export default config;
