import { motion } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
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

// Randomized height classes for editorial variety
const heightClasses = ['h-[280px]', 'h-[360px]', 'h-[320px]', 'h-[400px]', 'h-[300px]'];

export function PortfolioPage() {
  return (
    <div className="pt-20" style={{ backgroundColor: '#FFFBF1' }}>
      <div className="p-8 pb-16 max-w-7xl mx-auto">
        <p
          className="text-center mb-2"
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: '1.8',
            color: '#73555d',
            fontWeight: 300,
            opacity: 0.8
          }}
        >
          OUR WORK
        </p>
        <h2
          className="text-center mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4vw, 2.5rem)',
            lineHeight: '1.2',
            color: '#73555d',
            fontWeight: 500
          }}
        >
          The Lookbook
        </h2>
        <p
          className="text-center max-w-2xl mx-auto mb-16"
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: '1.8',
            color: '#73555d',
            fontWeight: 300,
            opacity: 0.8
          }}
        >
          A curated collection of the weddings we've had the honour of bringing to life.
        </p>

        <ResponsiveMasonry
            columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
        >
            <Masonry gutter="8px">
                {portfolioImages.map((image, index) => (
                    <motion.div
                        key={index}
                        className={`relative overflow-hidden group cursor-pointer ${heightClasses[index % heightClasses.length]}`}
                        initial={{ scale: 1 }}
                        whileHover={{
                            boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
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
                                className="p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
                                style={{ transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)' }}
                            >
                                <p
                                    className="text-white"
                                    style={{
                                        fontFamily: "'Tenor Sans', sans-serif",
                                        fontSize: '13px',
                                        letterSpacing: '0.1em',
                                    }}
                                >
                                    {image.coupleName}{image.location && `, ${image.location}`}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </Masonry>
        </ResponsiveMasonry>
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
