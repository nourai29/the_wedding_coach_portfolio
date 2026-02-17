import { Link } from 'react-router-dom';
import { Instagram } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundColor: '#73555d', color: '#FFFBF1' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* About Section */}
        <div>
          <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>The Wedding Coach</h3>
          <p className="text-sm leading-relaxed" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
            Luxury wedding planning and coordination based in Dubai, serving the UAE and worldwide, so you can truly enjoy your day.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Navigate</h3>
          <ul className="space-y-2" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
            <li><Link to="/" className="hover:underline">About Us</Link></li>
            <li><Link to="/packages" className="hover:underline">Packages</Link></li>
            <li><Link to="/portfolio" className="hover:underline">Portfolio</Link></li>
            <li><Link to="/venues" className="hover:underline">Venues</Link></li>
            <li><Link to="/contact" className="hover:underline">Get in Touch</Link></li>
          </ul>
        </div>

        {/* Contact Information */}
        <div>
          <h3 className="text-xl font-semibold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>Get in Touch</h3>
          <ul className="space-y-2" style={{ fontFamily: "'Tenor Sans', sans-serif" }}>
            <li>Email: <a href="mailto:info@twc-uae.com" className="hover:underline">info@twc-uae.com</a></li>
            <li>Phone: <a href="tel:+971529463394" className="hover:underline">0529463394</a></li>
            <li>
              <a href="https://www.instagram.com/theweddingcoach.uae" target="_blank" rel="noopener noreferrer" className="inline-block hover:opacity-70 transition-opacity duration-300">
                <Instagram size={20} />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
