import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';

const navLinks = [
  { title: 'About Us', path: '/' },
  { title: 'Packages', path: '/packages' },
  { title: 'Portfolio', path: '/portfolio' },
  { title: 'Venues', path: '/venues' },
  { title: 'Connect', path: '/contact' },
];

export function Header() {
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 10);

      if (currentY < 10) {
        setVisible(true);
      } else if (currentY < lastScrollY.current) {
        // Scrolling up
        setVisible(true);
      } else if (currentY > lastScrollY.current && currentY > 80) {
        // Scrolling down past header height
        setVisible(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <div className="flex justify-between items-center h-24">
            <div className="flex-shrink-0">
              <Link to="/">
                <img className="h-12" src="/src/assets/TWC_logo.png" alt="The Wedding Coach" />
              </Link>
            </div>
            <nav className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-sans text-sm tracking-widest uppercase hover:underline underline-offset-4 transition-all duration-300"
                  style={{ color: '#73555d', fontFamily: "'Tenor Sans', sans-serif" }}
                >
                  {link.title}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </motion.header>
    </>
  );
}
