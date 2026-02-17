import { useParams, Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { venues } from '../../venues';

// Eagerly import all portfolio images so Vite can resolve them
const imageModules = import.meta.glob('/src/assets/portfolio/*', { eager: true, import: 'default' }) as Record<string, string>;
const venueModules = import.meta.glob('/src/assets/venues/*', { eager: true, import: 'default' }) as Record<string, string>;

// Build a normalized lookup: strip leading spaces from filenames for matching
const normalizedImageMap: Record<string, string> = {};
for (const [key, url] of Object.entries(imageModules)) {
  const dir = key.substring(0, key.lastIndexOf('/') + 1);
  const filename = key.substring(key.lastIndexOf('/') + 1).trimStart();
  normalizedImageMap[`${dir}${filename}`] = url;
}

const getImageUrl = (imagePath: string) => {
  const key = `/${imagePath}`;
  return imageModules[key] || normalizedImageMap[key] || venueModules[key] || '';
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
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

// Editorial grid spans repeating pattern
const spanPatterns = [
  'md:col-span-2 md:row-span-2',
  'md:row-span-2',
  '',
  '',
  'md:col-span-2',
  '',
  '',
  'md:row-span-2',
  'md:col-span-2',
  '',
];

export function VenueDetailPage() {
  const { id } = useParams<{ id: string }>();
  const venue = venues.find((v) => v.id === id);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  if (!venue) {
    return <div>Venue not found</div>;
  }

  return (
    <div className="pt-20" style={{ backgroundColor: '#FFFBF1', minHeight: '100vh' }}>
      <div className="pb-16" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
        {/* Back to All Venues link */}
        <Link
          to="/venues"
          className="inline-block mb-8 pt-8 hover:underline transition-all duration-300"
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            color: '#73555d',
            fontSize: '13px',
            letterSpacing: '0.1em',
          }}
        >
          &larr; Back to All Venues
        </Link>

        {/* Venue Header */}
        <div className="text-center mb-12">
          <img
            src={getImageUrl(venue.logo)}
            alt={venue.name}
            className="w-32 h-auto object-contain mx-auto mb-6 opacity-60"
            style={{ filter: 'grayscale(100%)' }}
          />
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              lineHeight: '1.2',
              color: '#73555d',
              fontWeight: 500,
              marginBottom: '8px'
            }}
          >
            {venue.name}
          </h1>
          <p
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#73555d',
              opacity: 0.8,
            }}
          >
            A breathtaking backdrop for your unforgettable moments.
          </p>
        </div>

        {/* Editorial Photo Wall */}
        {venue.images.length > 0 ? (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            style={{ gridAutoRows: '180px' }}
          >
            {venue.images.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative overflow-hidden group cursor-pointer ${spanPatterns[index % spanPatterns.length]}`}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`${venue.name} ${index + 1}`}
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{
                    filter: 'grayscale(100%)',
                    transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%)';
                    e.currentTarget.style.transform = 'scale(1.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-500 flex items-end">
                  <div
                    className="p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                    style={{ transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)' }}
                  >
                    <p
                      className="text-white"
                      style={{
                        fontFamily: "'Tenor Sans', sans-serif",
                        fontSize: '11px',
                        letterSpacing: '0.15em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {venue.name}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p
            className="text-center py-16"
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              color: '#73555d',
              opacity: 0.5,
            }}
          >
            Gallery coming soon.
          </p>
        )}
      </div>
    </div>
  );
}
