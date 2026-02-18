import { motion } from 'motion/react';
import { Heart, Sparkles, Users } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { useNavigate } from 'react-router-dom';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, useScrollAnimation } from '../lib/animations';
import { COLORS, FONTS } from '../lib/tokens';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Heart className="w-6 h-6" />,
    title: "ON-THE-DAY COORDINATION",
    description: "For the couple who has woven their own narrative, we provide the seamless execution to honor your creation. We'll be there to manage every detail on the day, so you can be fully present."
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    title: "WEDDING DAY COACH",
    description: "A guiding hand for the discerning couple, we offer our expertise to perfect your vision and grant you peace of mind. We'll be your partners in planning, supporting you at every stage."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "WEDDING PLANNER",
    description: "A bespoke journey from the first whisper of an idea to the final dance, where every detail is a testament to your love story. We'll be with you every step of the way, from concept to completion."
  }
];

const cardVariants = [fadeInLeft, fadeInUp, fadeInRight];

export function FeaturesSection() {
  const { ref, isInView } = useScrollAnimation(0.15);
  const navigate = useNavigate();

  const handleExploreServicesClick = () => {
    navigate('/packages');
  };

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={staggerContainer(0.15, 0.2)}
      className="relative py-28 px-6 md:px-[10vw]"
      style={{
        backgroundColor: '#FFFBF1',
      }}
    >
      {/* Section header — left-aligned for editorial feel */}
      <motion.div
        variants={fadeInUp}
        className="mb-20 max-w-2xl"
      >
        <div
          className="w-16 mb-8"
          style={{
            height: '0.5px',
            backgroundColor: COLORS.roseGold,
            opacity: 0.5
          }}
        />

        <h2
          style={{
            fontFamily: FONTS.display,
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: '1.15',
            letterSpacing: '0.02em',
            color: '#73555d',
            fontWeight: 500
          }}
        >
          BESPOKE
          <br />
          EXPERIENCES
        </h2>
        <p
          className="max-w-xl mt-5"
          style={{
            fontFamily: FONTS.body,
            fontSize: '16px',
            lineHeight: '1.9',
            color: '#73555d',
            fontWeight: 300,
            opacity: 0.8
          }}
        >
          We offer flexible wedding planning packages designed to support you at every stage of your journey.
        </p>
      </motion.div>

      {/* Features grid — each card animates from a different direction */}
      <motion.div
        variants={staggerContainer(0.12, 0.1)}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={cardVariants[index]}
            className="relative group p-10 transition-all duration-500"
            style={{
              border: '1px solid rgba(115, 85, 93, 0.12)',
              backgroundColor: '#FFFBF1',
            }}
            whileHover={{
              y: -6,
              boxShadow: `0 16px 48px ${COLORS.roseGoldAlpha(0.1)}`,
              borderColor: COLORS.roseGoldAlpha(0.3),
            }}
            transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
          >
            {/* Icon with circular border — fills with rose gold on card hover */}
            <div
              className="mb-8 inline-flex items-center justify-center group-hover:bg-[#B76E79]/15"
              style={{
                width: '72px',
                height: '72px',
                border: `1px solid ${COLORS.roseGold}`,
                borderRadius: '50%',
                color: '#73555d',
                opacity: 0.6,
                transition: 'all 600ms cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            >
              {feature.icon}
            </div>

            {/* Title */}
            <h3
              className="mb-4"
              style={{
                fontFamily: FONTS.body,
                fontSize: '13px',
                letterSpacing: '0.15em',
                color: '#73555d',
                fontWeight: 400
              }}
            >
              {feature.title}
            </h3>

            {/* Description */}
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: '16px',
                lineHeight: '1.9',
                color: '#73555d',
                fontWeight: 300,
                opacity: 0.7
              }}
            >
              {feature.description}
            </p>

            {/* Decorative corner accent */}
            <div
              className="absolute -top-3 -right-3 opacity-0 group-hover:opacity-20 transition-opacity"
              style={{
                width: '40px',
                height: '40px',
                border: `0.5px solid ${COLORS.roseGold}`,
                borderRadius: '50%',
                transitionDuration: '600ms',
                transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)'
              }}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div
        variants={fadeInUp}
        className="mt-20 text-center"
      >
        <MagneticButton variant="text" onClick={handleExploreServicesClick}>Explore Our Services</MagneticButton>
      </motion.div>
    </motion.section>
  );
}
