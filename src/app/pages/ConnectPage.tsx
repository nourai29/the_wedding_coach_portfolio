import { motion } from 'motion/react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Instagram, Mail, Phone } from 'lucide-react';
import { fadeInUp, staggerContainer, useScrollAnimation } from '../lib/animations';

const packageMap: Record<string, string> = {
  'on-the-day-coordination': 'On-the-Day Coordination',
  'wedding-day-coach': 'Wedding Day Coach',
  'wedding-planner': 'Wedding Planner',
};

export function ConnectPage() {
  const { ref, isInView } = useScrollAnimation(0.1);
  const [searchParams] = useSearchParams();
  const packageParam = searchParams.get('package') || '';
  const preselected = packageMap[packageParam] || '';
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle = {
    fontFamily: "'Tenor Sans', sans-serif",
    color: '#73555d',
    backgroundColor: 'transparent',
    borderBottom: '1px solid rgba(115, 85, 93, 0.3)',
    borderTop: 'none',
    borderLeft: 'none',
    borderRight: 'none',
    borderRadius: 0,
    padding: '12px 0',
    width: '100%',
    fontSize: '15px',
    outline: 'none',
  };

  const labelStyle = {
    fontFamily: "'Tenor Sans', sans-serif",
    fontSize: '11px',
    letterSpacing: '0.15em',
    color: '#73555d',
    textTransform: 'uppercase' as const,
    opacity: 0.7,
    marginBottom: '8px',
    display: 'block',
  };

  return (
    <div className="pt-20" style={{ backgroundColor: '#FFFBF1', minHeight: '100vh' }}>
      {/* Hero Banner */}
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer(0.15, 0.2)}
        className="text-center pt-16 pb-20 px-6"
        style={{
          backgroundColor: '#73555d',
        }}
      >
        <motion.p
          variants={fadeInUp}
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: '15px',
            letterSpacing: '0.25em',
            color: '#FFFBF1',
            textTransform: 'uppercase',
            fontWeight: 400,
            opacity: 0.6,
            marginBottom: '16px'
          }}
        >
          Get in Touch
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
            lineHeight: '1.2',
            color: '#FFFBF1',
            fontWeight: 500,
            marginBottom: '16px'
          }}
        >
          Let's Create Something Beautiful
        </motion.h1>
        <motion.p
          variants={fadeInUp}
          style={{
            fontFamily: "'Tenor Sans', sans-serif",
            fontSize: '15px',
            lineHeight: '1.8',
            color: '#FFFBF1',
            opacity: 0.6,
            maxWidth: '500px',
            margin: '0 auto'
          }}
        >
          We'd love to hear about your wedding plans. Reach out and let's start a conversation.
        </motion.p>
      </motion.div>

      {/* Form + Contact Section */}
      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-20">

        {/* Left — Form */}
        <div className="lg:col-span-3">
          {submitted ? (
            <div className="text-center py-20">
              <h2
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                  color: '#73555d',
                  marginBottom: '16px'
                }}
              >
                Thank You
              </h2>
              <p
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  fontSize: '15px',
                  lineHeight: '1.8',
                  color: '#73555d',
                  opacity: 0.8,
                }}
              >
                We've received your message and will be in touch within 24–48 hours. We can't wait to learn more about your special day.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label style={labelStyle}>Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="First & last name"
                    className="focus:border-[#73555d] placeholder:text-[#73555d]/40"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="focus:border-[#73555d] placeholder:text-[#73555d]/40"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+971 50 123 4567"
                    className="focus:border-[#73555d] placeholder:text-[#73555d]/40"
                    style={inputStyle}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Wedding Date (Estimated)</label>
                  <input
                    type="text"
                    placeholder="e.g. December 2026"
                    className="focus:border-[#73555d] placeholder:text-[#73555d]/40"
                    style={inputStyle}
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Package of Interest</label>
                <select
                  defaultValue={preselected}
                  className="focus:border-[#73555d]"
                  style={{
                    ...inputStyle,
                    cursor: 'pointer',
                    appearance: 'none',
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2373555d' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0 center',
                  }}
                >
                  <option value="" disabled>Select a package</option>
                  <option value="On-the-Day Coordination">On-the-Day Coordination</option>
                  <option value="Wedding Day Coach">Wedding Day Coach</option>
                  <option value="Wedding Planner">Wedding Planner</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Tell Us About Your Vision</label>
                <textarea
                  rows={5}
                  placeholder="Share anything you'd like us to know — your style, your venue ideas, your must-haves..."
                  className="focus:border-[#73555d] placeholder:text-[#73555d]/40 resize-none"
                  style={inputStyle}
                />
              </div>

              <button
                type="submit"
                className="w-full active:scale-95 px-8 py-4 uppercase tracking-[0.15em] text-[11px] hover:tracking-[0.25em] transition-all duration-500"
                style={{
                  fontFamily: "'Tenor Sans', sans-serif",
                  backgroundColor: '#73555d',
                  color: '#FFFBF1',
                  border: '1px solid #73555d',
                  transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#FFFBF1';
                  e.currentTarget.style.color = '#73555d';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = '#73555d';
                  e.currentTarget.style.color = '#FFFBF1';
                }}
              >
                Send Message
              </button>
            </form>
          )}
        </div>

        {/* Right — Contact Info */}
        <div className="lg:col-span-2">
          <div
            className="p-10 sticky top-28"
            style={{
              border: '1px solid rgba(115, 85, 93, 0.15)',
            }}
          >
            <h3
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: '1.5rem',
                color: '#73555d',
                marginBottom: '24px'
              }}
            >
              Other Ways to Reach Us
            </h3>
            <div className="w-10 h-px bg-[#73555d] opacity-30 mb-8" />

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <Mail size={18} strokeWidth={1} className="text-[#73555d] opacity-50 mt-0.5 flex-shrink-0" />
                <div>
                  <p style={{ ...labelStyle, marginBottom: '6px' }}>Email</p>
                  <a
                    href="mailto:info@twc-uae.com"
                    className="hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "'Tenor Sans', sans-serif", color: '#73555d', fontSize: '15px' }}
                  >
                    info@twc-uae.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone size={18} strokeWidth={1} className="text-[#73555d] opacity-50 mt-0.5 flex-shrink-0" />
                <div>
                  <p style={{ ...labelStyle, marginBottom: '6px' }}>Phone</p>
                  <a
                    href="tel:+971529463394"
                    className="hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "'Tenor Sans', sans-serif", color: '#73555d', fontSize: '15px' }}
                  >
                    +971 52 946 3394
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Instagram size={18} strokeWidth={1} className="text-[#73555d] opacity-50 mt-0.5 flex-shrink-0" />
                <div>
                  <p style={{ ...labelStyle, marginBottom: '6px' }}>Instagram</p>
                  <a
                    href="https://www.instagram.com/theweddingcoach.uae/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "'Tenor Sans', sans-serif", color: '#73555d', fontSize: '15px' }}
                  >
                    @theweddingcoach.uae
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
