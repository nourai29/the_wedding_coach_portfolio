import { HeroSection } from '../components/HeroSection';
import { FeaturesSection } from '../components/FeaturesSection';
import { MeetTheTeam } from '../components/MeetTheTeam';
import { StatsSection } from '../components/StatsSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { PortfolioSection } from '../components/PortfolioSection';
import { ConnectSection } from '../components/ConnectSection';
import { Divider } from '../components/Divider';
import { useNavigate } from 'react-router-dom';

const venueLogos = [
  { src: 'src/assets/venues/Anantara Hotels & Resorts C.png' },
  { src: 'src/assets/venues/arabian_ranches_gold_club_logo_black.svg' },
  { src: 'src/assets/venues/Atlantis_the_Royal.png' },
  { src: 'src/assets/venues/AURA SKYPOOL_idX8NoMRXb_1.svg' },
  { src: 'src/assets/venues/duabi_polo_club.svg' },
  { src: 'src/assets/venues/Hyatt-Logo.wine.svg' },
  { src: 'src/assets/venues/Meliá_Hotels_International_logo.svg' },
  { src: 'src/assets/venues/One_n_Only_The_Palm-logo-white.png' },
  { src: 'src/assets/venues/Shangri-La_Qaryat_Al_Beri_logo.webp' },
  { src: 'src/assets/venues/Waldorf-Astoria-Logo.svg' },
  { src: 'src/assets/venues/one_n_only_royal_mirrage_logo.svg' },
  { src: 'src/assets/venues/saadiyat_beach_club.svg', scale: 1.8 },
  { src: 'src/assets/venues/st_regis_downtown.png' },
  { src: 'src/assets/venues/the_farm_albarari.svg' },
];

export function LandingPage() {
  const navigate = useNavigate();

  const handleCTAClick = () => {
    navigate('/contact');
  };

  return (
    <main className="relative z-10">
      <HeroSection onCTAClick={handleCTAClick} />

      <Divider />

      <MeetTheTeam />

      <Divider />

      <div id="about-us">
        <FeaturesSection />
      </div>

      <Divider />

      <StatsSection venueLogos={venueLogos} />

      <Divider />

      <TestimonialsSection />

      <Divider />

      <div id="portfolio">
        <PortfolioSection />
      </div>

      <Divider />

      <ConnectSection />
    </main>
  );
}
