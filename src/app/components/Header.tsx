import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { COLORS } from '../lib/tokens';
import twcLogo from '../../assets/TWC_logo.png';

const navLinks = [
  { title: 'About Us', path: '/' },
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'Packages', path: '/packages' },
  { title: 'Venues', path: '/venues' },
];

const drawerLinks = [
  { title: 'About Us', path: '/' },
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'Packages', path: '/packages' },
  { title: 'Venues', path: '/venues' },
];

export function Header() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const lastScrollY = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);

      if (currentY < 10) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        setVisible(true);
      } else if (currentY > lastScrollY.current && currentY > 80) {
        setVisible(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  return (
    <>
      {/* Invisible hover zone at top of page */}
      <div
        className="fixed top-0 left-0 right-0 h-4 z-[51]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      />
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-[#FFFBF1]/80 shadow-md backdrop-blur-sm' : 'bg-[#FFFBF1]'
        }`}
        animate={{ y: (visible || hovered) ? 0 : -100 }}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20 md:h-24">
            <div className="flex-shrink-0">
              <Link to="/">
                <img className="h-10 md:h-12" src={twcLogo} alt="The Wedding Coach" />
              </Link>
            </div>
            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative font-sans text-sm tracking-widest uppercase transition-all duration-300 group"
                  style={{ color: '#73555d', fontFamily: "'Tenor Sans', sans-serif" }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = COLORS.roseGold; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = '#73555d'; }}
                >
                  {link.title}
                  <span
                    className="absolute left-0 -bottom-1 h-px w-0 group-hover:w-full transition-all duration-300"
                    style={{ backgroundColor: COLORS.roseGold }}
                  />
                </Link>
              ))}

              {/* CTA Button */}
              <button
                onClick={() => navigate('/contact')}
                className="px-6 py-2.5 tracking-[0.12em] uppercase text-[11px] transition-all duration-500"
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  backgroundColor: COLORS.brand,
                  color: COLORS.cream,
                  border: `1px solid ${COLORS.brand}`,
                  transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                  e.currentTarget.style.color = COLORS.brand;
                  e.currentTarget.style.letterSpacing = '0.18em';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = COLORS.brand;
                  e.currentTarget.style.color = COLORS.cream;
                  e.currentTarget.style.letterSpacing = '0.12em';
                }}
              >
                Get in Touch
              </button>
            </nav>
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 -mr-2"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open menu"
              style={{ color: '#73555d' }}
            >
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/30 z-[60]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
            />
            {/* Drawer panel */}
            <motion.div
              className="fixed top-0 right-0 bottom-0 w-[280px] z-[70] flex flex-col"
              style={{ backgroundColor: '#FFFBF1' }}
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
            >
              {/* Close button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Close menu"
                  style={{ color: '#73555d' }}
                >
                  <X size={24} strokeWidth={1.5} />
                </button>
              </div>
              {/* Nav links */}
              <nav className="flex flex-col px-8 space-y-2 flex-1">
                {drawerLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05, duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setDrawerOpen(false)}
                      className="block py-4 tracking-[0.15em] uppercase text-[13px] transition-opacity duration-300 hover:opacity-60"
                      style={{ color: '#73555d', fontFamily: "'Tenor Sans', sans-serif" }}
                    >
                      {link.title}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Mobile CTA at bottom */}
              <div className="px-8 pb-10">
                <button
                  onClick={() => { setDrawerOpen(false); navigate('/contact'); }}
                  className="w-full py-4 tracking-[0.15em] uppercase text-[12px] transition-all duration-500"
                  style={{
                    fontFamily: "'Tenor Sans', sans-serif",
                    backgroundColor: COLORS.brand,
                    color: COLORS.cream,
                    border: `1px solid ${COLORS.brand}`,
                  }}
                >
                  Get in Touch
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
