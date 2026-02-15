import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef, useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials } from '../../assets/testimonials';
import { MagneticArrowButton } from './MagneticArrowButton';

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

export function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer}
      className="relative py-16"
      style={{
        backgroundColor: '#FFFBF1',
        paddingLeft: '15vw',
        paddingRight: '15vw',
      }}
    >
      <motion.div
        variants={fadeInUp}
        className="text-center relative z-10"
      >
        <p
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: '14px',
            letterSpacing: '0.2em',
            color: '#73555d',
            textTransform: 'uppercase',
            opacity: 0.8,
            marginBottom: '12px',
          }}
        >
          Kind Words
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: '1.2',
            color: '#73555d',
            fontWeight: 500,
            marginBottom: '48px'
          }}
        >
          What Our Couples Say
        </h2>
        <div className="flex items-center max-w-4xl mx-auto">
          {/* Left arrow — fixed position outside content */}
          <div className="flex-shrink-0">
            <MagneticArrowButton onClick={handlePrev} className="p-2">
              <ArrowLeft className="w-6 h-6 text-[#73555d]" strokeWidth={0.5} />
            </MagneticArrowButton>
          </div>

          {/* Quote content */}
          <div className="flex-1 px-8 md:px-12 min-h-[200px] flex flex-col justify-center">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <p
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: '18px',
                  lineHeight: '1.8',
                  color: '#73555d',
                  fontWeight: 300,
                  opacity: 0.8,
                  marginBottom: '16px'
                }}
              >
                "{testimonials[activeIndex].quote}"
              </p>
              <p
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: '14px',
                  lineHeight: '1.8',
                  color: '#73555d',
                  fontWeight: 400,
                  letterSpacing: '0.1em'
                }}
              >
                - {testimonials[activeIndex].author}
              </p>
            </motion.div>
          </div>

          {/* Right arrow — fixed position outside content */}
          <div className="flex-shrink-0">
            <MagneticArrowButton onClick={handleNext} className="p-2">
              <ArrowRight className="w-6 h-6 text-[#73555d]" strokeWidth={0.5} />
            </MagneticArrowButton>
          </div>
        </div>

        <div className="flex justify-center space-x-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                activeIndex === index ? 'bg-[#73555d]' : 'bg-gray-300'
              }`}
            ></button>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
}
