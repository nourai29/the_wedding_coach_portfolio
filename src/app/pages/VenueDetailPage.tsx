import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { venues } from '../../venues';

// Helper function to get image URLs correctly for Vite
const getImageUrl = (imagePath: string) => {
  // imagePath comes like 'src/assets/portfolio/Anantara_Santorini_1.jpg' or 'src/assets/venues/logo.svg'
  // We need a path relative to the current file for new URL()
  // This assumes VenueDetailPage.tsx is in src/app/pages/
  // So, from src/app/pages/ to src/assets/ is ../../assets/
  const relativePath = imagePath.replace('src/', ''); // 'assets/portfolio/Anantara_Santorini_1.jpg'
  return new URL(`../../${relativePath}`, import.meta.url).href;
};

export function VenueDetailPage() {
  const { venueId } = useParams<{ venueId: string }>();
  const venue = venues.find((v) => v.id === venueId);

  if (!venue) {
    return <div>Venue not found</div>;
  }

  return (
    <div className="pt-20" style={{ backgroundColor: '#FFFBF1', minHeight: '100vh' }}>
      <div className="p-8 pb-16 max-w-7xl mx-auto">
        {/* Back to All Venues link */}
        <Link 
          to="/venues" 
          className="inline-block mb-8 text-lg hover:underline transition-all duration-300"
          style={{ 
            fontFamily: "'Tenor Sans', sans-serif", 
            color: '#73555d',
            letterSpacing: '0.05em'
          }}
        >
          &larr; Back to All Venues
        </Link>

        {/* Venue Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start mb-12">
          {/* Using getImageUrl for logo as well for consistency */}
          <img 
            src={getImageUrl(venue.logo)} 
            alt={venue.name} 
            className="w-48 h-auto object-contain mb-6 md:mb-0 md:mr-8" 
          />
          <div>
            <h1 
              className="text-4xl font-bold mb-2"
              style={{
                fontFamily: "'Playfair Display', serif",
                color: '#73555d',
                lineHeight: '1.2'
              }}
            >
              {venue.name}
            </h1>
            <p 
              className="text-lg"
              style={{
                fontFamily: "'Tenor Sans', sans-serif",
                color: '#73555d',
                opacity: 0.8
              }}
            >
              A breathtaking backdrop for your unforgettable moments.
            </p>
          </div>
        </div>

        {/* Photo Wall Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {venue.images.map((image, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden group cursor-pointer aspect-square" // aspect-square to maintain ratio
              whileHover={{ 
                scale: 1.05, 
                boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.15)'
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <img 
                src={getImageUrl(image)} 
                alt={`${venue.name} ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
              {/* Overlay on hover */}
              <motion.div
                className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <p 
                  className="text-white text-center text-lg p-4"
                  style={{ fontFamily: "'Tenor Sans', sans-serif" }}
                >
                  View Photo
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
