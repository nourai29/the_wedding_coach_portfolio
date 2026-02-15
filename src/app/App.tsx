import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { Header } from './components/Header';
import { FilmGrainOverlay } from './components/FilmGrainOverlay';
import { GoboLighting } from './components/GoboLighting';
import { LandingPage } from './pages/LandingPage';
import { VenuesPage } from './pages/VenuesPage';
import { VenueDetailPage } from './pages/VenueDetailPage';
import { PortfolioPage } from './pages/PortfolioPage';
import { PackagesPage } from './pages/PackagesPage';
import { ConnectPage } from './pages/ConnectPage';
import { Footer } from './components/Footer';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="font-custom text-text-primary bg-background-primary">
        <Header />
        <FilmGrainOverlay />
        <GoboLighting />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/venues" element={<VenuesPage />} />
          <Route path="/venues/:id" element={<VenueDetailPage />} />
          <Route path="/packages" element={<PackagesPage />} />
          <Route path="/contact" element={<ConnectPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
