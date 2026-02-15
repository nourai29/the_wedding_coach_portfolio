import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Heart, Sparkles, Users } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25,
      delayChildren: 0.2
    }
  }
};

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

export function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const navigate = useNavigate();

  const handleExploreServicesClick = () => {
    navigate('/packages');
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
        paddingRight: '15vw'
      }}
    >
      {/* Section header */}
      <motion.div 
        variants={fadeInUp}
        className="mb-24 max-w-2xl"
      >
        <div 
          className="w-16 mb-8"
          style={{
            height: '0.5px',
            backgroundColor: '#73555d',
            opacity: 0.5
          }}
        />
        
        <h2 
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            lineHeight: '1.2',
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
          className="max-w-2xl mt-4"
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: '15px',
            lineHeight: '1.8',
            color: '#73555d',
            fontWeight: 300,
            opacity: 0.8
          }}
        >
          We offer flexible wedding planning packages designed to support you at every stage of your journey.
        </p>
      </motion.div>

      {/* Features grid - asymmetrical */}
      <motion.div 
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-20"
      >
        {features.map((feature, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="relative group p-8 border rounded-lg" // Removed hover:shadow-lg and transition-shadow
            style={{
                border: '1px solid rgba(115, 85, 93, 0.2)', // #73555D with 20% opacity
                backgroundColor: '#FFFBF1', // Ensure background color for shadow
            }}
            whileHover={{ 
                scale: 1.03, 
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)', // More pronounced shadow
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {/* Icon with circular border */}
            <div 
              className="mb-8 inline-flex items-center justify-center"
              style={{
                width: '72px',
                height: '72px',
                border: '0.5px solid #73555d',
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
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: '12px',
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
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: '15px',
                lineHeight: '1.8',
                color: '#73555d',
                fontWeight: 300,
                opacity: 0.7
              }}
            >
              {feature.description}
            </p>

            {/* Decorative corner accent */}
            <div 
              className="absolute -top-4 -right-4 opacity-0 group-hover:opacity-30 transition-opacity"
              style={{
                width: '40px',
                height: '40px',
                border: '0.5px solid #73555d',
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
        className="mt-24 text-center"
      >
        <MagneticButton variant="text" onClick={handleExploreServicesClick}>Explore Our Services</MagneticButton>
      </motion.div>
    </motion.section>
  );
}
