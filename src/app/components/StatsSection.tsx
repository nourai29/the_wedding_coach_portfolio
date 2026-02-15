import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Eagerly import all venue logos so Vite can resolve them
const venueModules = import.meta.glob('/src/assets/venues/*', { eager: true, import: 'default' }) as Record<string, string>;

const getVenueUrl = (path: string) => {
  return venueModules[`/${path}`] || '';
};

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.2,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.2
    }
  }
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [carouselIndex, setCarouselIndex] = useState(0);
  const logosPerPage = 4;
  const maxIndex = Math.max(0, venueLogos.length - logosPerPage);

  const handlePrev = () => setCarouselIndex((i) => Math.max(0, i - 1));
  const handleNext = () => setCarouselIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="relative"
      style={{ backgroundColor: '#FFFBF1' }}
    >
      {/* Stats */}
      <div className="py-20" style={{ paddingLeft: '15vw', paddingRight: '15vw' }}>
        <motion.div variants={fadeInUp} className="text-center mb-16">
          <p
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: '14px',
              letterSpacing: '0.2em',
              color: '#73555d',
              textTransform: 'uppercase',
              opacity: 0.8,
              marginBottom: '12px'
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

        <motion.div variants={staggerContainer} className="grid grid-cols-3 gap-8 max-w-3xl mx-auto">
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
                  color: '#73555d',
                  fontWeight: 500,
                  marginBottom: '12px'
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: '11px',
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

      {/* Venues Carousel */}
      <div className="py-16 border-t" style={{ borderColor: 'rgba(115, 85, 93, 0.1)', paddingLeft: '10vw', paddingRight: '10vw' }}>
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

        <motion.div variants={fadeInUp} className="relative flex items-center">
          {/* Left arrow */}
          <button
            onClick={handlePrev}
            disabled={carouselIndex === 0}
            className="flex-shrink-0 p-2 transition-opacity duration-300"
            style={{ color: '#73555d', opacity: carouselIndex === 0 ? 0.2 : 0.6 }}
          >
            <ChevronLeft size={20} strokeWidth={1} />
          </button>

          {/* Logos */}
          <div className="flex-1 overflow-hidden">
            <div
              className="flex items-center transition-transform duration-500"
              style={{
                transform: `translateX(-${carouselIndex * (100 / logosPerPage)}%)`,
                transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            >
              {venueLogos.map((logo, index) => {
                const scale = logo.scale || 1;
                return (
                  <div
                    key={index}
                    className="flex-shrink-0 flex items-center justify-center px-6"
                    style={{ width: `${100 / logosPerPage}%` }}
                  >
                    <img
                      src={getVenueUrl(logo.src)}
                      alt={`Venue ${index + 1}`}
                      className="w-auto object-contain opacity-40 hover:opacity-70 transition-opacity duration-300"
                      style={{ filter: 'grayscale(100%)', height: `${4 * scale}rem`, maxWidth: `${160 * scale}px` }}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={handleNext}
            disabled={carouselIndex >= maxIndex}
            className="flex-shrink-0 p-2 transition-opacity duration-300"
            style={{ color: '#73555d', opacity: carouselIndex >= maxIndex ? 0.2 : 0.6 }}
          >
            <ChevronRight size={20} strokeWidth={1} />
          </button>
        </motion.div>
      </div>
    </motion.section>
  );
}
