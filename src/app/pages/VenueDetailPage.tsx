import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useState } from 'react';
import { venues } from '../../venues';
import { fadeInUp, staggerContainer, useScrollAnimation } from '../lib/animations';
import { Lightbox } from '../components/Lightbox';

// Eagerly import all portfolio images so Vite can resolve them
const imageModules = import.meta.glob('/src/assets/portfolio-optimized/*', { eager: true, import: 'default' }) as Record<string, string>;
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
  const { ref, isInView } = useScrollAnimation(0.1);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!venue) {
    return <div>Venue not found</div>;
  }

  const resolvedImages = venue.images.map((img) => ({
    src: getImageUrl(img),
    caption: venue.name,
  }));

  return (
    <div className="pt-20" style={{ backgroundColor: '#FFFBF1', minHeight: '100vh' }}>
      <div className="pb-16 px-4 md:px-[8vw]">
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
            loading="lazy"
            decoding="async"
            className="w-32 h-auto object-contain mx-auto mb-6 opacity-60"
            style={{ filter: 'saturate(0) brightness(1.1)' }}
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
          {venue.location && (
            <p
              style={{
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: '13px',
                letterSpacing: '0.15em',
                color: '#73555d',
                opacity: 0.6,
                textTransform: 'uppercase',
              }}
            >
              {venue.location}
            </p>
          )}
        </div>

        {/* Editorial Photo Wall */}
        {venue.images.length > 0 ? (
          <motion.div
            ref={ref}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={staggerContainer(0.08, 0.2)}
            className="grid grid-cols-2 md:grid-cols-4 gap-3"
            style={{ gridAutoRows: '200px' }}
          >
            {venue.images.map((image, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className={`relative overflow-hidden group cursor-pointer ${spanPatterns[index % spanPatterns.length]}`}
                onClick={() => setLightboxIndex(index)}
              >
                <img
                  src={getImageUrl(image)}
                  alt={`${venue.name} ${index + 1}`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-all duration-700"
                  style={{
                    filter: 'saturate(0) brightness(1.1)',
                    transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'saturate(1) brightness(1)';
                    e.currentTarget.style.transform = 'scale(1.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'saturate(0) brightness(1.1)';
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-500 flex items-end">
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

      {/* Lightbox */}
      <Lightbox
        images={resolvedImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  );
}
