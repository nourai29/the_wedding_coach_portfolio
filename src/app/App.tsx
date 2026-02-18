import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import { Header } from './components/Header';
import { FilmGrainOverlay } from './components/FilmGrainOverlay';
import { GoboLighting } from './components/GoboLighting';
import { LandingPage } from './pages/LandingPage';
import { Footer } from './components/Footer';

// Lazy-load non-landing pages for faster initial load
const PortfolioPage = lazy(() => import('./pages/PortfolioPage').then(m => ({ default: m.PortfolioPage })));
const VenuesPage = lazy(() => import('./pages/VenuesPage').then(m => ({ default: m.VenuesPage })));
const VenueDetailPage = lazy(() => import('./pages/VenueDetailPage').then(m => ({ default: m.VenueDetailPage })));
const PackagesPage = lazy(() => import('./pages/PackagesPage').then(m => ({ default: m.PackagesPage })));
const ConnectPage = lazy(() => import('./pages/ConnectPage').then(m => ({ default: m.ConnectPage })));

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
        <Suspense fallback={<div className="min-h-screen" style={{ backgroundColor: '#FFFBF1' }} />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/venues" element={<VenuesPage />} />
            <Route path="/venues/:id" element={<VenueDetailPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/contact" element={<ConnectPage />} />
          </Routes>
        </Suspense>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
