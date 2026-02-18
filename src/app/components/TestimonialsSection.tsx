import { motion } from 'motion/react';
import { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { testimonials } from '../../assets/testimonials';
import { MagneticArrowButton } from './MagneticArrowButton';
import { fadeInUp, staggerContainer, useScrollAnimation } from '../lib/animations';
import { COLORS, FONTS } from '../lib/tokens';

export function TestimonialsSection() {
  const { ref, isInView } = useScrollAnimation(0.2);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handlePrev = () => {
    setIsPaused(true);
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
    setTimeout(() => setIsPaused(false), 5000);
  };

  const handleNext = () => {
    setIsPaused(true);
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
    setTimeout(() => setIsPaused(false), 5000);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer()}
      className="relative py-20 px-6 md:px-[12vw]"
      style={{ backgroundColor: COLORS.brand }}
    >
      <motion.div
        variants={fadeInUp}
        className="text-center relative z-10"
      >
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: '13px',
            letterSpacing: '0.3em',
            color: COLORS.roseGoldLight,
            textTransform: 'uppercase',
            fontWeight: 400,
            marginBottom: '16px',
          }}
        >
          Kind Words
        </p>
        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: '1.2',
            color: COLORS.cream,
            fontWeight: 500,
            marginBottom: '56px'
          }}
        >
          What Our Couples Say
        </h2>

        {/* Testimonial Card */}
        <div
          className="max-w-3xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className="relative px-8 py-12 md:px-16 md:py-16"
            style={{
              border: '1px solid rgba(255, 251, 241, 0.1)',
              backgroundColor: 'rgba(255, 251, 241, 0.06)',
              borderRadius: '2px',
            }}
          >
            {/* Decorative quote mark */}
            <div
              className="absolute top-6 left-8 md:left-12"
              style={{
                fontFamily: FONTS.display,
                fontSize: '80px',
                lineHeight: '1',
                color: COLORS.roseGoldLight,
                opacity: 0.15,
              }}
            >
              &ldquo;
            </div>

            {/* Decorative top line */}
            <div
              className="w-12 h-px mx-auto mb-10"
              style={{ backgroundColor: COLORS.roseGold, opacity: 0.4 }}
            />

            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            >
              <p
                style={{
                  fontFamily: FONTS.display,
                  fontSize: 'clamp(16px, 2vw, 20px)',
                  lineHeight: '1.9',
                  color: COLORS.cream,
                  fontWeight: 400,
                  fontStyle: 'italic',
                  marginBottom: '28px',
                  opacity: 0.9,
                }}
              >
                "{testimonials[activeIndex].quote}"
              </p>

              {/* Decorative line before author */}
              <div
                className="w-8 h-px mx-auto mb-4"
                style={{ backgroundColor: COLORS.roseGoldLight, opacity: 0.3 }}
              />

              <p
                style={{
                  fontFamily: FONTS.body,
                  fontSize: '12px',
                  color: COLORS.roseGoldLight,
                  fontWeight: 400,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                }}
              >
                {testimonials[activeIndex].author}
              </p>
            </motion.div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-10 gap-8">
            <MagneticArrowButton onClick={handlePrev} className="p-2">
              <ArrowLeft className="w-5 h-5" strokeWidth={1} style={{ color: COLORS.cream }} />
            </MagneticArrowButton>

            <div className="flex space-x-3">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setActiveIndex(index);
                    setIsPaused(true);
                    setTimeout(() => setIsPaused(false), 5000);
                  }}
                  className="rounded-full transition-all duration-500"
                  style={{
                    width: activeIndex === index ? '24px' : '6px',
                    height: '6px',
                    backgroundColor: activeIndex === index ? COLORS.roseGoldLight : 'rgba(255, 251, 241, 0.25)',
                  }}
                />
              ))}
            </div>

            <MagneticArrowButton onClick={handleNext} className="p-2">
              <ArrowRight className="w-5 h-5" strokeWidth={1} style={{ color: COLORS.cream }} />
            </MagneticArrowButton>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
