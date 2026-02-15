import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { MagneticButton } from './MagneticButton';

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
      delayChildren: 0.3
    }
  }
};

interface HeroSectionProps {
  onCTAClick: () => void;
}

export function HeroSection({ onCTAClick }: HeroSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="relative flex items-center pt-32 pb-16 min-h-[50vh]"
      style={{
        backgroundColor: '#FFFBF1',
        paddingLeft: '15vw',
        paddingRight: '15vw'
      }}
    >
      <div className="w-full text-center">

        <motion.div
          variants={fadeInUp}
          className="mb-6"
        >
          <h1
            className="mb-6"
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 'clamp(2.5rem, 6vw, 5rem)',
              lineHeight: '1.1',
              letterSpacing: '0.02em',
              color: '#73555d',
              fontWeight: 500
            }}
          >
            Welcome to
            <br />
            The Wedding Coach
          </h1>

          <p
            className="mb-12 max-w-md mx-auto"
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: '15px',
              lineHeight: '1.8',
              color: '#73555d',
              fontWeight: 300,
              opacity: 0.8
            }}
          >
            We're Sally and Charlotte, and we're so glad you're here. We created The Wedding Coach to bring trust, clarity, and calm to your wedding day, so you can truly enjoy every moment.
          </p>

          <MagneticButton onClick={onCTAClick} className="transition-colors hover:bg-[#73555d] hover:text-[#FFFBF1]">Begin Your Journey</MagneticButton>
        </motion.div>
      </div>
    </motion.section>
  );
}
