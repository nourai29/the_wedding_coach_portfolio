import { motion } from 'motion/react';
import { useInView } from 'motion/react';
import { useRef } from 'react';

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

const team = [
  {
    name: 'Sally',
    role: 'Client Relations & Operations',
    description:
      'Sally leads the business as the primary client-facing and operational director, guiding couples through every stage of their journey with clarity, reassurance, and care. With a background in high-profile events, she oversees all weddings from concept to completion, ensuring each detail is thoughtfully managed and every wedding day feels calm, seamless, and truly enjoyed.',
  },
  {
    name: 'Charlotte',
    role: 'Planning & Creative Direction',
    description:
      'Working primarily behind the scenes, Charlotte leads the planning, creative development, and project management, bringing structure, balance, and precision to each wedding. Her composed approach and meticulous attention to detail ensure every wedding is carefully considered, lovingly planned, and flawlessly prepared.',
  },
];

export function MeetTheTeam() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer}
      className="relative py-20"
      style={{
        backgroundColor: '#FFFBF1',
        paddingLeft: '15vw',
        paddingRight: '15vw',
      }}
    >
      <motion.div variants={fadeInUp} className="text-center mb-16">
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
          The Team
        </p>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            lineHeight: '1.2',
            color: '#73555d',
            fontWeight: 500,
          }}
        >
          Meet Sally & Charlotte
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16"
      >
        {team.map((member, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            className="p-10 border transition-all duration-300"
            style={{
              border: '1px solid rgba(115, 85, 93, 0.15)',
              backgroundColor: '#FFFBF1',
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.5rem',
                color: '#73555d',
                fontWeight: 500,
                marginBottom: '4px',
              }}
            >
              {member.name}
            </h3>
            <p
              style={{
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: '11px',
                letterSpacing: '0.15em',
                color: '#73555d',
                textTransform: 'uppercase',
                opacity: 0.6,
                marginBottom: '20px',
              }}
            >
              {member.role}
            </p>
            <div
              className="w-10 mb-6"
              style={{
                height: '0.5px',
                backgroundColor: '#73555d',
                opacity: 0.3,
              }}
            />
            <p
              style={{
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: '14px',
                lineHeight: '1.8',
                color: '#73555d',
                opacity: 0.75,
              }}
            >
              {member.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
