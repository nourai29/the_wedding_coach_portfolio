import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PlusCircle } from 'lucide-react'; // Import PlusCircle icon
import { venues } from '../../venues';

export function VenuesPage() {
  const darkerCream = '#F0EEE6'; // 2% darker shade of #FFFBF1

  // Define the IDs of venues that should be clickable
  const clickableVenueIds = [
    'anantara-santorini',
    'park-hyatt',
    'one-n-only-royal-mirage',
  ];

  return (
    <div className="pt-20" style={{ backgroundColor: '#FFFBF1' }}>
      <div className="p-8 pb-16">
        <p
          className="text-center mb-2"
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', // Normal body font size
            lineHeight: '1.8',
            color: '#73555d',
            fontWeight: 300,
            opacity: 0.8
          }}
        >
          EXPLORE VENUES
        </p>
        <h2 
          className="text-center mb-4"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2rem, 4vw, 2.5rem)', // Approx 32pt
            lineHeight: '1.2',
            color: '#73555d',
            fontWeight: 500
          }}
        >
          Where We've Created Magic
        </h2>
        <p
          className="text-center max-w-2xl mx-auto mb-16"
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.25rem)', // Normal body font size
            lineHeight: '1.8',
            color: '#73555d',
            fontWeight: 300,
            opacity: 0.8
          }}
        >
          We've had the privilege of planning weddings at some of the UAE's most iconic venues.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {venues.map((venue) => {
            const isClickable = clickableVenueIds.includes(venue.id);
            const Wrapper = isClickable ? motion(Link) : motion.div;

            return (
              <Wrapper 
                key={venue.id} 
                {...(isClickable && { to: `/venues/${venue.id}` })}
                className={`block group relative overflow-hidden transition-all duration-300 ease-in-out ${
                  isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-70'
                }`}
                style={{ 
                  backgroundColor: '#FFFBF1', 
                  boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.05)',
                  transform: 'translateZ(0)', // Fix for shadow clipping
                  borderRadius: '8px',
                  aspectRatio: '1 / 1', // Ensure square aspect ratio for logos
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                whileHover={isClickable ? { scale: 1.02, boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' } : {}}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                {/* Background for hover effect */}
                <div 
                  className="absolute inset-0 transition-all duration-300 ease-in-out"
                  style={{ 
                    backgroundColor: '#FFFBF1',
                    opacity: 1,
                    transform: 'scale(1)',
                    transitionProperty: 'background-color, transform',
                  }}
                />
                <div 
                  className="absolute inset-0 transition-all duration-300 ease-in-out"
                  style={{ 
                    backgroundColor: darkerCream, 
                    opacity: 0,
                    transform: 'scale(1)',
                    transitionProperty: 'background-color, transform',
                  }}
                  group-hover="opacity-100 scale-105"
                />

                <img 
                  src={`/${venue.logo}`} 
                  alt={venue.name} 
                  className="relative z-10 w-full h-auto object-contain transition-transform duration-300 ease-in-out p-8" // Added p-8 here
                  group-hover="scale-105"
                />

                {isClickable && (
                  <motion.div
                    className="absolute bottom-4 right-4 z-20"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                  >
                    <PlusCircle size={28} style={{ color: '#73555d' }} />
                  </motion.div>
                )}
              </Wrapper>
            );
          })}
        </div>
      </div>
    </div>
  );
}
