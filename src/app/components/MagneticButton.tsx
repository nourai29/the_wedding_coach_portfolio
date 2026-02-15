import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'outlined' | 'text';
  className?: string;
}

export function MagneticButton({ children, onClick, variant = 'outlined', className }: MagneticButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    // Magnetic pull effect - move up to 12px
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const strength = Math.min(distance / 50, 1);
    
    setPosition({
      x: deltaX * strength * 0.3,
      y: deltaY * strength * 0.3
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  if (variant === 'text') {
    return (
      <motion.button
        ref={buttonRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        animate={{ x: position.x, y: position.y }}
        transition={{
          type: "spring",
          stiffness: 150,
          damping: 15,
          mass: 0.1
        }}
        className={twMerge("inline-flex items-center gap-3 tracking-[0.15em] uppercase text-[11px] text-[#73555d] hover:gap-4 transition-all", className)}
        style={{
          fontFamily: "'Tenor Sans', sans-serif",
          transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)'
        }}
      >
        {children}
        <ArrowRight className="w-4 h-4" />
      </motion.button>
    );
  }

  return (
    <motion.button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      animate={{ x: position.x, y: position.y }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1
      }}
      className={twMerge("rounded-full border border-[#73555d] px-12 py-4 tracking-[0.15em] uppercase text-[11px] text-[#73555d] hover:bg-[#73555d] hover:text-[#FFFBF1] transition-all duration-[600ms]", className)}
      style={{
        fontFamily: "'Tenor Sans', sans-serif",
        transitionTimingFunction: 'cubic-bezier(0.25, 1, 0.5, 1)',
      }}
    >
      {children}
    </motion.button>
  );
}
