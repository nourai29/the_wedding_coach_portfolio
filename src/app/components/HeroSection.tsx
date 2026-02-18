import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { portfolioImages } from '../../portfolio';
import { COLORS, FONTS } from '../lib/tokens';

// Eagerly import all portfolio images so Vite can resolve them
const imageModules = import.meta.glob('/src/assets/portfolio-optimized/*', { eager: true, import: 'default' }) as Record<string, string>;

const normalizedImageMap: Record<string, string> = {};
for (const [key, url] of Object.entries(imageModules)) {
  const dir = key.substring(0, key.lastIndexOf('/') + 1);
  const filename = key.substring(key.lastIndexOf('/') + 1).trimStart();
  normalizedImageMap[`${dir}${filename}`] = url;
}

const getImageUrl = (imagePath: string) => {
  const key = `/${imagePath}`;
  return imageModules[key] || normalizedImageMap[key] || '';
};

// Curated hero slideshow images — best editorial shots
const heroSlides = [
  portfolioImages[20], // Aisha & Kamil
  portfolioImages[0],  // Anantara Santorini
  portfolioImages[27], // Ollie & Marina
  portfolioImages[42], // T&T Mirage
  portfolioImages[47], // Twiggy
];

interface HeroSectionProps {
  onCTAClick: () => void;
}

export function HeroSection({ onCTAClick }: HeroSectionProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((i) => (i + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Full-bleed background slideshow */}
      <AnimatePresence mode="sync">
        <motion.div
          key={currentSlide}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2.2, ease: [0.25, 1, 0.5, 1] }}
        >
          <img
            src={getImageUrl(heroSlides[currentSlide].src)}
            alt={heroSlides[currentSlide].alt}
            className="w-full h-full object-cover"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark gradient overlay for readability */}
      <div
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(
            180deg,
            rgba(115, 85, 93, 0.55) 0%,
            rgba(115, 85, 93, 0.35) 40%,
            rgba(115, 85, 93, 0.45) 70%,
            rgba(115, 85, 93, 0.75) 100%
          )`,
        }}
      />

      {/* Main content */}
      <div className="relative z-[3] flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1, ease: [0.25, 1, 0.5, 1] }}
            style={{
              fontFamily: FONTS.body,
              fontSize: '13px',
              letterSpacing: '0.35em',
              color: 'rgba(255, 255, 255, 0.9)',
              textTransform: 'uppercase',
              fontWeight: 400,
              marginBottom: '24px',
            }}
          >
            Effortless Elegance
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.2, ease: [0.25, 1, 0.5, 1] }}
            style={{
              fontFamily: FONTS.display,
              fontSize: 'clamp(3rem, 7vw, 6rem)',
              lineHeight: '1.05',
              letterSpacing: '0.02em',
              color: COLORS.cream,
              fontWeight: 500,
              marginBottom: '24px',
            }}
          >
            The Wedding Coach
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 1, ease: [0.25, 1, 0.5, 1] }}
            className="max-w-lg mx-auto"
            style={{
              fontFamily: FONTS.body,
              fontSize: '16px',
              lineHeight: '1.9',
              color: COLORS.cream,
              fontWeight: 300,
              opacity: 0.85,
              marginBottom: '48px',
            }}
          >
            We're Sally and Charlotte, and we're so glad you're here.
            We created The Wedding Coach to bring trust, clarity, and calm
            to your wedding day, so you can truly enjoy every moment.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            onClick={onCTAClick}
            className="px-14 py-4 tracking-[0.15em] uppercase text-[12px] transition-all duration-500 active:scale-95"
            style={{
              fontFamily: FONTS.body,
              color: COLORS.cream,
              border: '1px solid rgba(255, 251, 241, 0.5)',
              backgroundColor: 'transparent',
              transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.cream;
              e.currentTarget.style.color = COLORS.brand;
              e.currentTarget.style.letterSpacing = '0.25em';
              e.currentTarget.style.borderColor = COLORS.cream;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = COLORS.cream;
              e.currentTarget.style.letterSpacing = '0.15em';
              e.currentTarget.style.borderColor = 'rgba(255, 251, 241, 0.5)';
            }}
          >
            Begin Your Journey
          </motion.button>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-[3] flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className="transition-all duration-500"
            style={{
              width: currentSlide === index ? '28px' : '6px',
              height: '2px',
              backgroundColor: currentSlide === index
                ? COLORS.cream
                : 'rgba(255, 251, 241, 0.35)',
            }}
          />
        ))}
      </div>

      {/* Scroll-down indicator — clickable */}
      <motion.button
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[3] cursor-pointer"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        style={{ opacity: 0.5, color: COLORS.cream, background: 'none', border: 'none' }}
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }}
        aria-label="Scroll to next section"
      >
        <ChevronDown size={24} strokeWidth={1} />
      </motion.button>
    </section>
  );
}
