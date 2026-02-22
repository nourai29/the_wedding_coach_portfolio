import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { packages } from '../../packages';
import { Check, Calendar, Compass, Gem } from 'lucide-react';
const brochurePdf = 'https://raw.githubusercontent.com/weddingdai-internal/twc_website/main/src/assets/TWC%20Wedding%20Packages.pdf';
import { fadeInUp, staggerContainer, useScrollAnimation } from '../lib/animations';
import { COLORS } from '../lib/tokens';

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

const packageIcons = [Calendar, Compass, Gem];

export function PackagesPage() {
  const { ref, isInView } = useScrollAnimation(0.1);
  const navigate = useNavigate();

  return (
    <div className="pt-20" style={{ backgroundColor: '#FFFBF1' }}>
      {/* Header */}
      <div className="text-center pt-8 pb-4 px-6">
        <p
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: '15px',
            letterSpacing: '0.25em',
            color: '#73555d',
            textTransform: 'uppercase',
            fontWeight: 400,
            marginBottom: '16px',
          }}
        >
          Our Services
        </p>
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: '1.2',
            color: '#73555d',
            fontWeight: 500,
            marginBottom: '16px',
          }}
        >
          Our Packages
        </h1>
        <p
          className="max-w-2xl mx-auto"
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: '15px',
            lineHeight: '1.8',
            color: '#73555d',
            fontWeight: 300,
            opacity: 0.8,
            marginBottom: '48px'
          }}
        >
          Three thoughtfully designed packages to match where you are in your planning journey.
        </p>
      </div>

      {/* Package Cards */}
      <div className="px-4 md:px-[8vw] pb-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              ref={ref}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={fadeInUp}
              className="relative flex flex-col items-center h-full transition-all duration-500"
              style={{
                padding: '40px 32px',
                border: pkg.isMostPopular
                  ? '1px solid rgba(115, 85, 93, 0.5)'
                  : '1px solid rgba(115, 85, 93, 0.15)',
              }}
              whileHover={{
                y: -4,
                boxShadow: `0 12px 40px ${COLORS.roseGoldAlpha(0.12)}`,
              }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              {pkg.isMostPopular && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2"
                  style={{
                    fontFamily: "'Tenor Sans', sans-serif",
                    fontSize: '10px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: '#FFFBF1',
                    backgroundColor: COLORS.roseGold,
                    padding: '4px 16px',
                  }}
                >
                  Most Popular
                </div>
              )}

              {/* Package Icon */}
              <div
                className="mb-5 inline-flex items-center justify-center"
                style={{
                  width: '56px',
                  height: '56px',
                  border: `1px solid ${COLORS.roseGold}`,
                  borderRadius: '50%',
                  color: COLORS.roseGold,
                }}
              >
                {React.createElement(packageIcons[index], { className: 'w-5 h-5' })}
              </div>

              <h3
                className="mb-3 text-center"
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: '14px',
                  letterSpacing: '0.2em',
                  color: '#73555d',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                }}
              >
                {pkg.name}
              </h3>

              <p
                className="mb-4 text-center"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  color: '#73555d',
                }}
              >
                {pkg.role}
              </p>

              <div className="w-10 h-px bg-[#73555D] opacity-25 my-6" />

              <p
                className="mb-8 text-center"
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#73555d',
                  opacity: 0.7,
                }}
              >
                {pkg.description}
              </p>

              <p
                className="mb-5 self-start"
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: '11px',
                  letterSpacing: '0.15em',
                  color: '#73555d',
                  textTransform: 'uppercase',
                  fontWeight: 400,
                  opacity: 0.5,
                }}
              >
                What's Included
              </p>

              <motion.ul
                className="text-left w-full space-y-3"
                variants={staggerContainer(0.15, 0.2)}
              >
                <AnimatePresence>
                  {isInView && pkg.features.map((feature, featIndex) => (
                    <motion.li
                      key={featIndex}
                      variants={checklistItemStagger}
                      className="flex items-start"
                      style={{
                        fontFamily: "'Tenor Sans', sans-serif",
                        fontSize: '13px',
                        lineHeight: '1.6',
                        color: '#73555d',
                        opacity: 0.75,
                      }}
                    >
                      <Check size={14} strokeWidth={1.5} className="flex-shrink-0 mr-3 mt-0.5" style={{ color: COLORS.roseGold }} />
                      {feature.text}
                    </motion.li>
                  ))}
                </AnimatePresence>
              </motion.ul>

              <div className="mt-auto pt-6">
                <button
                  onClick={() => navigate(`/contact?package=${packageSlug(pkg.name)}`)}
                  className="px-10 py-3.5 uppercase tracking-[0.15em] text-[11px] active:scale-[0.97] transition-all duration-500"
                  style={{
                    fontFamily: "'Tenor Sans', sans-serif",
                    backgroundColor: 'transparent',
                    color: '#73555d',
                    border: '1px solid #73555d',
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
                  Let's Connect!
                </button>
              </div>
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
          <p
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: '15px',
              letterSpacing: '0.25em',
              color: '#FFFBF1',
              textTransform: 'uppercase',
              fontWeight: 400,
              opacity: 0.5,
              marginBottom: '16px',
            }}
          >
            Learn More
          </p>
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
              opacity: 0.6,
              marginBottom: '40px'
            }}
          >
            Download our brochure with complete package breakdowns and everything you need to know.
          </p>
          <a
            href={brochurePdf}
            download
            className="inline-flex items-center gap-3 active:scale-95 px-12 py-4 tracking-[0.15em] uppercase text-[11px] hover:tracking-[0.25em] transition-all duration-500"
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
