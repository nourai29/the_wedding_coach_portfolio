import { motion } from 'motion/react';
import { useState } from 'react';
import { fadeInUp, staggerContainer, useScrollAnimation } from '../lib/animations';
import { COLORS } from '../lib/tokens';

// Eagerly import all venue logos so Vite can resolve them
const venueModules = import.meta.glob('/src/assets/venues/*', { eager: true, import: 'default' }) as Record<string, string>;

const getVenueUrl = (path: string) => {
  return venueModules[`/${path}`] || '';
};

interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "100+", label: "Weddings Planned" },
  { value: "15+", label: "Years of Experience" },
  { value: "15–550", label: "Guest Weddings" },
];

export interface VenueLogo {
  src: string;
  scale?: number;
}

interface StatsSectionProps {
  venueLogos: VenueLogo[];
}

export function StatsSection({ venueLogos }: StatsSectionProps) {
  const { ref, isInView } = useScrollAnimation(0.2);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer()}
      className="relative"
      style={{ backgroundColor: '#FFFBF1' }}
    >
      {/* Stats */}
      <div className="py-20 px-6 md:px-[15vw]">
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <p
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: '15px',
              letterSpacing: '0.25em',
              color: '#73555d',
              textTransform: 'uppercase',
              fontWeight: 400,
              marginBottom: '16px'
            }}
          >
            Our Story
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              lineHeight: '1.2',
              color: '#73555d',
              fontWeight: 500,
            }}
          >
            Every Couple Is Different
          </h2>
        </motion.div>

        <motion.div variants={staggerContainer()} className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="text-center"
            >
              <div
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                  lineHeight: '1',
                  color: COLORS.roseGold,
                  fontWeight: 500,
                  marginBottom: '12px'
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: '13px',
                  letterSpacing: '0.15em',
                  color: '#73555d',
                  textTransform: 'uppercase',
                  opacity: 0.6
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Venues — Continuous Infinite Carousel */}
      <div
        className="py-16 border-t overflow-hidden"
        style={{ borderColor: 'rgba(115, 85, 93, 0.1)' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div variants={fadeInUp} className="text-center mb-10">
          <p
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: '11px',
              letterSpacing: '0.2em',
              color: '#73555d',
              textTransform: 'uppercase',
              opacity: 0.6
            }}
          >
            Venues We've Worked With
          </p>
        </motion.div>

        <div
          className="venue-carousel-track flex items-center"
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {/* Render logos twice for seamless loop */}
          {[...venueLogos, ...venueLogos].map((logo, index) => {
            const scale = logo.scale || 1;
            return (
              <div
                key={index}
                className="flex-shrink-0 flex items-center justify-center"
                style={{ width: '220px', padding: '0 30px' }}
              >
                <img
                  src={getVenueUrl(logo.src)}
                  alt="Venue partner"
                  loading="lazy"
                  decoding="async"
                  className="w-auto object-contain transition-all duration-500"
                  style={{
                    filter: 'grayscale(100%)',
                    opacity: 0.35,
                    height: `${4.5 * scale}rem`,
                    maxWidth: `${180 * scale}px`,
                    transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.7';
                    e.currentTarget.style.filter = 'grayscale(50%)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '0.35';
                    e.currentTarget.style.filter = 'grayscale(100%)';
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
