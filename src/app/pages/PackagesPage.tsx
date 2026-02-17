import React, { useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { packages } from '../../packages';
import { Check } from 'lucide-react';
import brochurePdf from '../../assets/twc_brochure_2026.pdf';

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

const checklistItemStagger = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 1, 0.5, 1]
    }
  }
};

const packageSlug = (name: string) =>
  name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export function PackagesPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const navigate = useNavigate();

  return (
    <div className="pt-20" style={{ backgroundColor: '#FFFBF1' }}>
      <div className="p-8 pb-16">
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
          Our Services
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
          Our Packages
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
          Three thoughtfully designed packages to match where you are in your planning journey.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              ref={ref}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className={`relative flex flex-col items-center p-10 rounded-lg shadow-sm transition-all duration-300 ease-in-out ${
                pkg.isMostPopular ? 'border-2 border-[#73555D]' : 'border'
              }`}
              style={{
                backgroundColor: '#FFFBF1',
                padding: '40px',
                border: pkg.isMostPopular ? '2px solid #73555D' : '1px solid rgba(115, 85, 93, 0.2)',
              }}
              whileHover={{
                scale: 1.03,
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <h3
                className="mb-4 text-center sticky top-0 bg-[#FFFBF1] w-full py-2 z-10"
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: '28px',
                  letterSpacing: '0.15em',
                  color: '#73555d',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                {pkg.name}
              </h3>

              <p
                className="mb-4 text-center"
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: '16px',
                  fontStyle: 'italic',
                  color: '#73555d',
                  opacity: 0.9,
                }}
              >
                {pkg.role}
              </p>

              <div className="w-1/3 h-px bg-[#73555D] opacity-30 my-6" />

              <p
                className="mb-8 text-center"
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#73555d',
                  opacity: 0.7,
                }}
              >
                {pkg.description}
              </p>

              <p
                className="mb-4 self-start"
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: '12px',
                  letterSpacing: '0.1em',
                  color: '#73555d',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                }}
              >
                What's Included
              </p>

              <motion.ul
                className="text-left w-full space-y-3"
                variants={staggerContainer}
              >
                <AnimatePresence>
                  {isInView && pkg.features.map((feature, featIndex) => (
                    <motion.li
                      key={featIndex}
                      variants={checklistItemStagger}
                      className="flex items-start"
                      style={{
                        fontFamily: "'Tenor Sans', sans-serif",
                        fontSize: '14px',
                        color: '#73555d',
                        opacity: 0.8,
                      }}
                    >
                      <Check size={16} strokeWidth={1} className="flex-shrink-0 mr-2 text-[#73555D]" />
                      {feature.text}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>

              <button
                onClick={() => navigate(`/contact?package=${packageSlug(pkg.name)}`)}
                className="mt-10 w-full px-8 py-4 uppercase tracking-widest text-base font-medium rounded-md transition-colors duration-300
                           bg-transparent text-[#73555D] border border-[#73555D] hover:bg-[#73555D] hover:text-[#FFFBF1]"
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                }}
              >
                Let's Connect!
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Brochure Download Banner */}
      <div
        className="py-24 text-center"
        style={{ backgroundColor: '#73555d' }}
      >
        <div className="max-w-2xl mx-auto px-6">
          <h2
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2rem, 4vw, 2.5rem)',
              lineHeight: '1.2',
              color: '#FFFBF1',
              fontWeight: 500,
              marginBottom: '16px'
            }}
          >
            Want the Full Details?
          </h2>
          <p
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#FFFBF1',
              opacity: 0.7,
              marginBottom: '40px'
            }}
          >
            Download our brochure with complete package breakdowns and everything you need to know.
          </p>
          <a
            href={brochurePdf}
            download
            className="inline-flex items-center gap-3 px-12 py-4 tracking-[0.15em] uppercase text-[11px] transition-all duration-500"
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              backgroundColor: '#FFFBF1',
              color: '#73555d',
              transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFBF1';
            }}
          >
            <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
              <path d="M8 2V10M8 10L5 7M8 10L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            Download the Brochure
          </a>
        </div>
      </div>
    </div>
  );
}
