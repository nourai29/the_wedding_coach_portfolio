import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';

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

export function ConnectSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const navigate = useNavigate();

  return (
    <motion.section
      id="connect"
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={fadeInUp}
      className="relative py-24 text-center"
      style={{
        backgroundColor: '#FFFBF1',
        paddingLeft: '15vw',
        paddingRight: '15vw'
      }}
    >
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
        Ready?
      </p>
      <h2
        style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          lineHeight: '1.2',
          color: '#73555d',
          fontWeight: 500,
          marginBottom: '16px'
        }}
      >
        Let's Plan Your Perfect Day
      </h2>
      <p
        className="max-w-md mx-auto"
        style={{
          fontFamily: "'Tenor Sans', sans-serif",
          fontSize: '15px',
          lineHeight: '1.8',
          color: '#73555d',
          fontWeight: 300,
          opacity: 0.7,
          marginBottom: '40px'
        }}
      >
        So you can truly enjoy every moment.
      </p>
      <button
        onClick={() => navigate('/contact')}
        className="px-14 py-4 tracking-[0.15em] uppercase text-[11px] transition-all duration-500"
        style={{
          fontFamily: "'Tenor Sans', sans-serif",
          backgroundColor: '#73555d',
          color: '#FFFBF1',
          border: '1px solid #73555d',
          transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#FFFBF1';
          e.currentTarget.style.color = '#73555d';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#73555d';
          e.currentTarget.style.color = '#FFFBF1';
        }}
      >
        Start Your Journey
      </button>
    </motion.section>
  );
}
