import { useState, useRef, MouseEvent } from 'react';
import { motion } from 'motion/react';
import { twMerge } from 'tailwind-merge';

interface MagneticArrowButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export function MagneticArrowButton({ children, onClick, className }: MagneticArrowButtonProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
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
      className={twMerge("p-2 transition-all", className)}
    >
      {children}
    </motion.button>
  );
}
