import { motion } from 'motion/react';
import * as AvatarPrimitive from '@radix-ui/react-avatar';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, useScrollAnimation } from '../lib/animations';
import { COLORS, FONTS } from '../lib/tokens';

const team = [
  {
    name: 'Sally',
    initial: 'S',
    role: 'Client Relations & Operations',
    photo: undefined as string | undefined,
    description:
      'Sally leads the business as the primary client-facing and operational director, guiding couples through every stage of their journey with clarity, reassurance, and care. With a background in high-profile events, she oversees all weddings from concept to completion, ensuring each detail is thoughtfully managed and every wedding day feels calm, seamless, and truly enjoyed.',
    quote: '"Every couple deserves to feel completely at ease on the day they\'ve dreamed about."',
  },
  {
    name: 'Charlotte',
    initial: 'C',
    role: 'Planning & Creative Direction',
    photo: undefined as string | undefined,
    description:
      'Working primarily behind the scenes, Charlotte leads the planning, creative development, and project management, bringing structure, balance, and precision to each wedding. Her composed approach and meticulous attention to detail ensure every wedding is carefully considered, lovingly planned, and flawlessly prepared.',
    quote: '"The magic is in the details — the ones no one sees, but everyone feels."',
  },
];

const memberVariants = [fadeInLeft, fadeInRight];

export function MeetTheTeam() {
  const { ref, isInView } = useScrollAnimation(0.15);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={staggerContainer(0.2, 0.2)}
      className="relative pt-20 pb-10 px-6 md:px-[10vw]"
      style={{
        backgroundColor: '#FFFBF1',
      }}
    >
      <motion.div variants={fadeInUp} className="text-center mb-20">
        <p
          style={{
            fontFamily: FONTS.body,
            fontSize: '15px',
            letterSpacing: '0.25em',
            color: '#73555d',
            textTransform: 'uppercase',
            fontWeight: 400,
            marginBottom: '16px',
          }}
        >
          The Team
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
          Meet Sally & Charlotte
        </h2>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.25, 0.1)}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-16 max-w-5xl mx-auto"
      >
        {team.map((member, index) => (
          <motion.div
            key={index}
            variants={memberVariants[index]}
            className="relative p-10 text-center group transition-all duration-500"
            style={{
              border: '1px solid rgba(115, 85, 93, 0.12)',
              backgroundColor: '#FFFBF1',
            }}
          >
            {/* Decorative accent line — breaks out of card */}
            <div
              className="absolute -top-px hidden md:block"
              style={{
                left: index === 0 ? '-20px' : 'auto',
                right: index === 1 ? '-20px' : 'auto',
                width: '60px',
                height: '1px',
                backgroundColor: COLORS.roseGold,
                opacity: 0.4,
              }}
            />

            {/* Avatar */}
            <AvatarPrimitive.Root
              className="inline-flex items-center justify-center overflow-hidden rounded-full mb-6"
              style={{
                width: '96px',
                height: '96px',
                border: `2px solid ${COLORS.roseGoldLight}`,
              }}
            >
              {member.photo && (
                <AvatarPrimitive.Image
                  src={member.photo}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
              )}
              <AvatarPrimitive.Fallback
                className="flex items-center justify-center w-full h-full"
                style={{
                  backgroundColor: COLORS.roseGoldAlpha(0.15),
                  color: COLORS.roseGold,
                  fontFamily: FONTS.display,
                  fontSize: '2rem',
                  fontWeight: 500,
                }}
              >
                {member.initial}
              </AvatarPrimitive.Fallback>
            </AvatarPrimitive.Root>

            <h3
              style={{
                fontFamily: FONTS.display,
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
                fontFamily: FONTS.body,
                fontSize: '13px',
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
              className="w-10 mx-auto mb-6"
              style={{
                height: '0.5px',
                backgroundColor: COLORS.roseGold,
                opacity: 0.4,
              }}
            />
            <p
              style={{
                fontFamily: FONTS.body,
                fontSize: '15px',
                lineHeight: '1.9',
                color: '#73555d',
                opacity: 0.75,
                textAlign: 'left',
              }}
            >
              {member.description}
            </p>

            {/* Personal quote */}
            <p
              className="mt-6"
              style={{
                fontFamily: FONTS.display,
                fontSize: '1rem',
                fontStyle: 'italic',
                color: COLORS.roseGold,
                opacity: 0.8,
                lineHeight: '1.7',
              }}
            >
              {member.quote}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
