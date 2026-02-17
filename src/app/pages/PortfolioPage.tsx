import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { portfolioImages } from '../../portfolio';

// Eagerly import all portfolio images so Vite can resolve them
const imageModules = import.meta.glob('/src/assets/portfolio/*', { eager: true, import: 'default' }) as Record<string, string>;

// Build a normalized lookup: strip leading spaces from filenames for matching
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
      staggerChildren: 0.06,
      delayChildren: 0.2
    }
  }
};

// Assign editorial grid spans in a repeating pattern for visual variety
const spanPatterns = [
  'md:col-span-2 md:row-span-2', // large feature
  'md:row-span-2',               // tall
  '',                             // standard
  '',                             // standard
  'md:col-span-2',               // wide
  '',                             // standard
  '',                             // standard
  'md:row-span-2',               // tall
  'md:col-span-2',               // wide
  '',                             // standard
];

export function PortfolioPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <div className="pt-20" style={{ backgroundColor: '#FFFBF1' }}>
      <div className="pb-16" style={{ paddingLeft: '8vw', paddingRight: '8vw' }}>
        <div className="text-center mb-12 pt-8">
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
            Our Work
          </p>
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              lineHeight: '1.2',
              color: '#73555d',
              fontWeight: 500,
              marginBottom: '8px'
            }}
          >
            The Lookbook
          </h2>
          <p
            className="max-w-2xl mx-auto"
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: 'clamp(1rem, 2vw, 1.25rem)',
              lineHeight: '1.8',
              color: '#73555d',
              fontWeight: 300,
              opacity: 0.8,
              marginBottom: '48px'
            }}
          >
            A curated collection of the weddings we've had the honour of bringing to life.
          </p>
        </div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
          style={{ gridAutoRows: '180px' }}
        >
          {portfolioImages.map((image, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className={`relative overflow-hidden group cursor-pointer ${spanPatterns[index % spanPatterns.length]}`}
            >
              <img
                src={getImageUrl(image.src)}
                alt={image.alt}
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
              {/* Hover overlay with couple name */}
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
                    {image.coupleName}{image.location && `, ${image.location}`}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Want to Be in Our Lookbook? CTA */}
      <div
        className="py-24 text-center"
        style={{ backgroundColor: '#FFFBF1' }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              lineHeight: '1.2',
              color: '#73555d',
              fontWeight: 500,
              marginBottom: '16px'
            }}
          >
            Want to Be in Our Lookbook?
          </h2>
          <p
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#73555d',
              opacity: 0.8,
              marginBottom: '40px'
            }}
          >
            Let's plan a wedding that's worth remembering and sharing.
          </p>
          <Link
            to="/contact"
            className="inline-block px-12 py-4 tracking-[0.15em] uppercase text-[11px] transition-all duration-500"
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              backgroundColor: '#73555d',
              color: '#FFFBF1',
              transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFBF1';
              e.currentTarget.style.color = '#73555d';
              e.currentTarget.style.boxShadow = '0 0 0 1px #73555d';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#73555d';
              e.currentTarget.style.color = '#FFFBF1';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Start Your Journey
          </Link>
        </div>
      </div>
    </div>
  );
}
