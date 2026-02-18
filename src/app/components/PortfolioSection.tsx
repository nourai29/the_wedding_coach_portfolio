import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { portfolioImages } from '../../portfolio';
import { fadeInUp, scaleIn, staggerContainer, useScrollAnimation } from '../lib/animations';
import { COLORS, FONTS } from '../lib/tokens';

// Curated subset for the landing page editorial wall
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
  { ...portfolioImages[0], span: 'md:row-span-2' }, // Anantara 1
  { ...portfolioImages[42], span: 'md:col-span-2' }, // T&T Mirage 1
  { ...portfolioImages[7], span: '' }, // Anantara 2
  { ...portfolioImages[35], span: '' }, // Park Hyatt 6
  { ...portfolioImages[48], span: 'md:col-span-2 md:row-span-2' }, // Twiggy 2
  { ...portfolioImages[15], span: '' }, // Anantara E&H 1
];

// Eagerly import all portfolio images so Vite can resolve them
const imageModules = import.meta.glob('/src/assets/portfolio-optimized/*', { eager: true, import: 'default' }) as Record<string, string>;

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
  const { ref, isInView } = useScrollAnimation(0.1);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer(0.06, 0.15)}
      className="relative py-20 px-4 md:px-[6vw]"
      style={{
        backgroundColor: '#FFFBF1',
      }}
    >
      {/* Section header with editorial accent */}
      <motion.div variants={fadeInUp} className="text-center mb-14">
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: '13px',
            letterSpacing: '0.25em',
            color: COLORS.roseGold,
            textTransform: 'uppercase',
            opacity: 0.8,
            marginBottom: '12px'
          }}
        >
          Our Work
        </p>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: '1.15',
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
        className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3"
        style={{ gridAutoRows: '200px' }}
      >
        {editorialImages.map((image, index) => (
          <motion.div
            key={index}
            variants={scaleIn}
            className={`relative overflow-hidden group cursor-pointer ${image.span}`}
          >
            <img
              src={getImageUrl(image.src)}
              alt={image.alt}
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
            {/* Hover overlay with couple name */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-all duration-500 flex items-end">
              <div className="p-4 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                style={{ transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)' }}
              >
                <p
                  className="text-white"
                  style={{
                    fontFamily: FONTS.body,
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
      </div>

      {/* View Full Lookbook CTA */}
      <motion.div variants={fadeInUp} className="text-center mt-16">
        <Link
          to="/portfolio"
          className="inline-block active:scale-95 px-12 py-4 tracking-[0.15em] uppercase text-[12px] border hover:tracking-[0.25em] transition-all duration-500"
          style={{
            fontFamily: FONTS.body,
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
