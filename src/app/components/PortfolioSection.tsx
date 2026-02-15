import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { portfolioImages } from '../../portfolio';

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
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Curated subset for the landing page editorial wall (array has indices 0-49)
const editorialImages = [
  { ...portfolioImages[20], span: 'md:col-span-2 md:row-span-2' }, // Aisha & Kamil
  { ...portfolioImages[25], span: 'md:row-span-2' }, // EOS00690
  { ...portfolioImages[30], span: '' }, // Park Hyatt 1
  { ...portfolioImages[47], span: '' }, // Twiggy 1
  { ...portfolioImages[27], span: 'md:col-span-2' }, // Ollie & Marina
  { ...portfolioImages[23], span: '' }, // EOS00554
  { ...portfolioImages[22], span: '' }, // DSC02678
  { ...portfolioImages[28], span: 'md:row-span-2' }, // Park Haytt 4
  { ...portfolioImages[21], span: 'md:col-span-2' }, // Aisha & Kamil 2
  { ...portfolioImages[41], span: '' }, // photo-262
];

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

export function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="relative py-16"
      style={{
        backgroundColor: '#FFFBF1',
        paddingLeft: '8vw',
        paddingRight: '8vw'
      }}
    >
      <motion.div variants={fadeInUp} className="text-center mb-12">
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
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: '1.2',
            letterSpacing: '0.02em',
            color: '#73555d',
            fontWeight: 500
          }}
        >
          The Portfolio
        </h2>
      </motion.div>

      {/* Editorial Grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
        style={{ gridAutoRows: '180px' }}
      >
        {editorialImages.map((image, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className={`relative overflow-hidden group cursor-pointer ${image.span}`}
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
              <div className="p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
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
                  {image.coupleName}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View Full Lookbook CTA */}
      <motion.div variants={fadeInUp} className="text-center mt-14">
        <Link
          to="/portfolio"
          className="inline-block px-12 py-4 tracking-[0.15em] uppercase text-[11px] border transition-all duration-500"
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            borderColor: '#73555d',
            color: '#73555d',
            transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#73555d';
            e.currentTarget.style.color = '#FFFBF1';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = '#73555d';
          }}
        >
          View Full Lookbook
        </Link>
      </motion.div>
    </motion.section>
  );
}
