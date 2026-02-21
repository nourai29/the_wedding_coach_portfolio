import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { portfolioImages } from '../../portfolio';
import { fadeInUp, staggerContainer, useScrollAnimation } from '../lib/animations';
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

// Package tile data with curated editorial portfolio images
const packageTiles = [
  {
    label: 'ON-THE-DAY COORDINATION',
    title: 'Seamless Presence',
    subtitle: 'For couples who\'ve planned it all and want to fully live it.',
    image: portfolioImages[20], // Aisha & Kamil — emotional couple shot
  },
  {
    label: 'WEDDING DAY COACH',
    title: 'Guided Confidence',
    subtitle: 'Expert insight to refine your vision and elevate every detail.',
    image: portfolioImages[7],  // Anantara — golden-hour elegance
  },
  {
    label: 'WEDDING PLANNER',
    title: 'Complete Curation',
    subtitle: 'From first inspiration to final dance — every detail thoughtfully orchestrated.',
    image: portfolioImages[27], // Ollie & Marina — candid emotion
  },
];

const tileVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.15 + i * 0.15,
      duration: 0.7,
      ease: [0.25, 1, 0.5, 1],
    },
  }),
};

export function ServicesSection() {
  const { ref, isInView } = useScrollAnimation(0.08, true);

  return (
    <section
      className="relative overflow-hidden"
      style={{ backgroundColor: '#FFFBF1' }}
    >
      {/* Elegant Banner Header */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={staggerContainer(0.12, 0.1)}
        className="relative text-center pt-0 pb-20 md:pb-28 px-6"
      >
        {/* Subtle background texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(115, 85, 93, 0.02) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <motion.div variants={fadeInUp} className="relative">
          <p
            style={{
              fontFamily: FONTS.body,
              fontSize: '12px',
              letterSpacing: '0.35em',
              color: COLORS.roseGold,
              textTransform: 'uppercase',
              fontWeight: 400,
              marginBottom: '24px',
            }}
          >
            Our Packages
          </p>

          <h2
            style={{
              fontFamily: FONTS.display,
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              lineHeight: '1.15',
              color: '#73555d',
              fontWeight: 400,
              marginBottom: '20px',
            }}
          >
            Crafted for Your Special Day
          </h2>

          <p
            className="max-w-lg mx-auto"
            style={{
              fontFamily: FONTS.body,
              fontSize: '16px',
              lineHeight: '2',
              color: '#73555d',
              fontWeight: 300,
              opacity: 0.65,
              marginBottom: '40px',
            }}
          >
            Three distinct levels of support — thoughtfully designed
            to honour your vision.
          </p>

          <Link
            to="/packages"
            className="inline-block px-10 py-3.5 tracking-[0.18em] uppercase text-[11px] transition-all duration-600 active:scale-[0.97]"
            style={{
              fontFamily: FONTS.body,
              color: '#73555d',
              border: '1px solid rgba(115, 85, 93, 0.25)',
              backgroundColor: 'transparent',
              transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.brand;
              e.currentTarget.style.color = COLORS.cream;
              e.currentTarget.style.borderColor = COLORS.brand;
              e.currentTarget.style.letterSpacing = '0.24em';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = '#73555d';
              e.currentTarget.style.borderColor = 'rgba(115, 85, 93, 0.25)';
              e.currentTarget.style.letterSpacing = '0.18em';
            }}
          >
            View Packages
          </Link>
        </motion.div>
      </motion.div>

      {/* Three Premium Package Tiles */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 pb-20 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {packageTiles.map((tile, index) => (
            <motion.div
              key={index}
              custom={index}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              variants={tileVariant}
            >
              <Link
                to="/packages"
                className="group relative block overflow-hidden"
                style={{ aspectRatio: '3 / 4' }}
              >
                {/* Portfolio image */}
                <img
                  src={getImageUrl(tile.image.src)}
                  alt={tile.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
                  style={{
                    filter: 'saturate(0.75) brightness(1.02) contrast(0.97)',
                    transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                />

                {/* Warm tone overlay */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(180deg, rgba(183, 110, 121, 0.03) 0%, rgba(115, 85, 93, 0.04) 100%)',
                  }}
                />

                {/* Bottom gradient for text */}
                <div
                  className="absolute inset-0 pointer-events-none transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(
                      180deg,
                      transparent 30%,
                      rgba(115, 85, 93, 0.08) 50%,
                      rgba(115, 85, 93, 0.35) 70%,
                      rgba(115, 85, 93, 0.7) 100%
                    )`,
                  }}
                />

                {/* Hover: image zoom + deeper overlay */}
                <div
                  className="absolute inset-0 bg-[#73555d]/0 group-hover:bg-[#73555d]/10 transition-all duration-600"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)' }}
                />

                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-7 md:p-8 z-10 flex flex-col justify-end items-start">
                  <p
                    className="mb-2"
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: '10px',
                      letterSpacing: '0.25em',
                      color: 'rgba(255, 251, 241, 0.6)',
                      textTransform: 'uppercase',
                      fontWeight: 400,
                      textAlign: 'left',
                    }}
                  >
                    {tile.title}
                  </p>

                  <h3
                    className="mb-2"
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                      lineHeight: '1.2',
                      color: COLORS.cream,
                      fontWeight: 400,
                      textAlign: 'left',
                      minHeight: '2.4em',
                      display: 'flex',
                      alignItems: 'flex-end',
                    }}
                  >
                    {tile.label}
                  </h3>

                  <p
                    className="transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: '14px',
                      lineHeight: '1.7',
                      color: 'rgba(255, 251, 241, 0.8)',
                      fontWeight: 300,
                      maxWidth: '280px',
                      minHeight: '48px',
                    }}
                  >
                    {tile.subtitle}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
