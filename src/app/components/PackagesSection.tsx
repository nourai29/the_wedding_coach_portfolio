import { motion } from 'motion/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Compass, Gem } from 'lucide-react';
import { packages } from '../../packages';
import { fadeInUp, staggerContainer, useScrollAnimation } from '../lib/animations';
import { COLORS, FONTS } from '../lib/tokens';

const iconMap = { Calendar, Compass, Gem } as const;

export function PackagesSection() {
  const { ref, isInView } = useScrollAnimation(0.15);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer(0.15, 0.2)}
      className="relative py-28 px-6 md:px-[10vw]"
      style={{ backgroundColor: '#FFFBF1' }}
    >
      <motion.div variants={fadeInUp} className="text-center mb-16">
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: '13px',
            letterSpacing: '0.3em',
            color: COLORS.roseGold,
            textTransform: 'uppercase',
            fontWeight: 400,
            marginBottom: '16px',
          }}
        >
          Our Services
        </p>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: '1.2',
            color: '#73555d',
            fontWeight: 500,
          }}
        >
          Tailored to Your Journey
        </h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 max-w-5xl mx-auto">
        {packages.map((pkg, index) => {
          const Icon = iconMap[pkg.iconName];
          const isFlipped = flippedIndex === index;
          return (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="cursor-pointer"
              style={{ perspective: '1000px', minHeight: '400px' }}
              onMouseEnter={() => setFlippedIndex(index)}
              onMouseLeave={() => setFlippedIndex(null)}
              onClick={() => setFlippedIndex(isFlipped ? null : index)}
            >
              <div
                className="relative w-full h-full transition-transform duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                {/* Front face */}
                <div
                  className="absolute inset-0 text-center p-8 md:p-10 flex flex-col items-center justify-center transition-shadow duration-500"
                  style={{
                    backfaceVisibility: 'hidden',
                    border: pkg.isMostPopular
                      ? `1px solid ${COLORS.roseGoldAlpha(0.5)}`
                      : '1px solid rgba(115, 85, 93, 0.12)',
                    backgroundColor: '#FFFBF1',
                    boxShadow: isFlipped ? 'none' : `0 0 0 0 ${COLORS.roseGoldAlpha(0)}`,
                  }}
                >
                  {/* Most Popular badge */}
                  {pkg.isMostPopular && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2"
                      style={{
                        fontFamily: FONTS.body,
                        fontSize: '10px',
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        color: COLORS.cream,
                        backgroundColor: COLORS.roseGold,
                        padding: '4px 16px',
                      }}
                    >
                      Most Popular
                    </div>
                  )}

                  {/* Icon */}
                  <div
                    className="mb-6 inline-flex items-center justify-center"
                    style={{
                      width: '64px',
                      height: '64px',
                      border: `1px solid ${COLORS.roseGold}`,
                      borderRadius: '50%',
                      color: COLORS.roseGold,
                    }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <h3
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: '13px',
                      letterSpacing: '0.2em',
                      color: '#73555d',
                      textTransform: 'uppercase',
                      fontWeight: 400,
                      marginBottom: '12px',
                    }}
                  >
                    {pkg.name}
                  </h3>

                  <p
                    style={{
                      fontFamily: FONTS.display,
                      fontSize: '1.1rem',
                      color: '#73555d',
                      fontStyle: 'italic',
                      marginBottom: '16px',
                    }}
                  >
                    {pkg.role}
                  </p>

                  <div
                    className="w-8 h-px mx-auto mb-6"
                    style={{ backgroundColor: COLORS.roseGold, opacity: 0.4 }}
                  />

                  <p
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: '15px',
                      lineHeight: '1.9',
                      color: '#73555d',
                      opacity: 0.7,
                    }}
                  >
                    {pkg.description}
                  </p>
                </div>

                {/* Back face */}
                <div
                  className="absolute inset-0 text-center p-8 md:p-10 flex flex-col items-center justify-center"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    border: `1px solid ${COLORS.roseGoldAlpha(0.3)}`,
                    backgroundColor: '#FFFBF1',
                  }}
                >
                  <h4
                    style={{
                      fontFamily: FONTS.body,
                      fontSize: '13px',
                      letterSpacing: '0.2em',
                      color: '#73555d',
                      textTransform: 'uppercase',
                      fontWeight: 400,
                      marginBottom: '20px',
                    }}
                  >
                    Key Highlights
                  </h4>
                  <ul className="text-left space-y-3 mb-8">
                    {pkg.features.slice(0, 4).map((feature, fi) => (
                      <li
                        key={fi}
                        className="flex items-start"
                        style={{
                          fontFamily: FONTS.body,
                          fontSize: '14px',
                          lineHeight: '1.6',
                          color: '#73555d',
                          opacity: 0.8,
                        }}
                      >
                        <span style={{ color: COLORS.roseGold, marginRight: '10px', flexShrink: 0 }}>&#10003;</span>
                        {feature.text}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/packages"
                    className="inline-block tracking-[0.1em] uppercase text-[12px] transition-all duration-300"
                    style={{
                      fontFamily: FONTS.body,
                      color: COLORS.roseGold,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.letterSpacing = '0.2em'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.letterSpacing = '0.1em'; }}
                  >
                    See Full Details &rarr;
                  </Link>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div variants={fadeInUp} className="text-center mt-16">
        <Link
          to="/packages"
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
          View All Packages
        </Link>
      </motion.div>
    </motion.section>
  );
}
