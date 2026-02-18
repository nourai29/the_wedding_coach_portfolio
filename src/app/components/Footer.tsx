import { Link, useLocation } from 'react-router-dom';
import { Instagram } from 'lucide-react';
import { COLORS } from '../lib/tokens';

const navLinks = [
  { to: '/', label: 'About Us' },
  { to: '/packages', label: 'Packages' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/venues', label: 'Venues' },
  { to: '/contact', label: 'Get in Touch' },
];

export function Footer() {
  const location = useLocation();

  return (
    <footer style={{ backgroundColor: '#73555d', color: '#FFFBF1' }}>
      {/* Main footer */}
      <div className="max-w-6xl mx-auto px-6 md:px-[8vw] py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 text-center md:text-left">
          {/* Brand */}
          <div>
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.25rem',
                fontWeight: 500,
                marginBottom: '20px',
                letterSpacing: '0.02em',
              }}
            >
              The Wedding Coach
            </h3>
            <p
              style={{
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: '13px',
                lineHeight: '1.9',
                opacity: 0.6,
              }}
            >
              Luxury wedding planning and coordination based in Dubai, serving the UAE and worldwide.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p
              style={{
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: '13px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: 0.4,
                marginBottom: '20px',
              }}
            >
              Navigate
            </p>
            <ul
              className="space-y-3"
              style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: '13px' }}
            >
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="inline-block opacity-60 hover:opacity-100 transition-all duration-500"
                    style={{
                      letterSpacing: '0.05em',
                      transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                    }}
                    onClick={(e) => {
                      if (link.to === '/' && location.pathname === '/') {
                        e.preventDefault();
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.letterSpacing = '0.12em';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.letterSpacing = '0.05em';
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p
              style={{
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: '13px',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                opacity: 0.4,
                marginBottom: '20px',
              }}
            >
              Get in Touch
            </p>
            <ul
              className="space-y-3"
              style={{ fontFamily: "'Tenor Sans', sans-serif", fontSize: '13px' }}
            >
              <li>
                <a
                  href="mailto:info@twc-uae.com"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  info@twc-uae.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+971529463394"
                  className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                >
                  +971 52 946 3394
                </a>
              </li>
              <li className="pt-2">
                <a
                  href="https://www.instagram.com/theweddingcoach.uae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block opacity-40 hover:opacity-100 transition-opacity duration-300"
                >
                  <Instagram size={18} strokeWidth={1} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom divider + copyright */}
        <div
          className="mt-16 pt-8 text-center"
          style={{ borderTop: `1px solid ${COLORS.roseGoldAlpha(0.3)}` }}
        >
          <p
            style={{
              fontFamily: "'Tenor Sans', sans-serif",
              fontSize: '12px',
              letterSpacing: '0.1em',
              opacity: 0.3,
            }}
          >
            &copy; {new Date().getFullYear()} The Wedding Coach. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
