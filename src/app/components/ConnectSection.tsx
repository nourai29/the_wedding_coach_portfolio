import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { fadeInUp, staggerContainer, useScrollAnimation } from '../lib/animations';
import { COLORS, FONTS } from '../lib/tokens';

export function ConnectSection() {
  const { ref, isInView } = useScrollAnimation(0.2);
  const navigate = useNavigate();

  return (
    <motion.section
      id="connect"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer(0.15, 0.2)}
      className="relative py-32 text-center px-6 md:px-[15vw] overflow-hidden"
      style={{
        backgroundColor: COLORS.brand,
      }}
    >
      {/* Subtle dot pattern overlay on dark bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255, 251, 241, 0.03) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Decorative accent lines breaking out */}
      <div
        className="absolute top-0 left-[15%] hidden md:block"
        style={{
          width: '1px',
          height: '80px',
          background: `linear-gradient(to bottom, ${COLORS.roseGoldAlpha(0.4)}, transparent)`,
        }}
      />
      <div
        className="absolute top-0 right-[20%] hidden md:block"
        style={{
          width: '1px',
          height: '50px',
          background: `linear-gradient(to bottom, ${COLORS.roseGoldAlpha(0.25)}, transparent)`,
        }}
      />

      <motion.p
        variants={fadeInUp}
        style={{
          fontFamily: FONTS.body,
          fontSize: '13px',
          letterSpacing: '0.3em',
          color: COLORS.roseGoldLight,
          textTransform: 'uppercase',
          fontWeight: 400,
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        Your Story Begins
      </motion.p>
      <motion.h2
        variants={fadeInUp}
        style={{
          fontFamily: FONTS.display,
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          lineHeight: '1.15',
          color: COLORS.cream,
          fontWeight: 500,
          marginBottom: '20px',
          position: 'relative',
        }}
      >
        Let's Create Something
        <br />
        Beautiful Together
      </motion.h2>
      <motion.p
        variants={fadeInUp}
        className="max-w-md mx-auto"
        style={{
          fontFamily: FONTS.body,
          fontSize: '16px',
          lineHeight: '1.9',
          color: COLORS.cream,
          fontWeight: 300,
          opacity: 0.6,
          marginBottom: '48px',
          position: 'relative',
        }}
      >
        So you can truly enjoy your day.
      </motion.p>
      <motion.button
        variants={fadeInUp}
        onClick={() => navigate('/contact')}
        className="relative active:scale-95 px-14 py-4 tracking-[0.15em] uppercase text-[12px] hover:tracking-[0.25em] transition-all duration-500"
        style={{
          fontFamily: FONTS.body,
          backgroundColor: 'transparent',
          color: COLORS.cream,
          border: `1px solid rgba(255, 251, 241, 0.4)`,
          transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = COLORS.cream;
          e.currentTarget.style.color = COLORS.brand;
          e.currentTarget.style.borderColor = COLORS.cream;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = 'transparent';
          e.currentTarget.style.color = COLORS.cream;
          e.currentTarget.style.borderColor = 'rgba(255, 251, 241, 0.4)';
        }}
      >
        Start Your Journey
      </motion.button>
    </motion.section>
  );
}
