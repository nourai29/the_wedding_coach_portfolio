import { useEffect, useCallback, useState, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { COLORS } from '../lib/tokens';

interface LightboxProps {
  images: { src: string; caption?: string }[];
  currentIndex: number | null;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({ images, currentIndex, onClose, onNavigate }: LightboxProps) {
  const isOpen = currentIndex !== null;
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const handlePrev = useCallback(() => {
    if (currentIndex !== null && currentIndex > 0) onNavigate(currentIndex - 1);
  }, [currentIndex, onNavigate]);

  const handleNext = useCallback(() => {
    if (currentIndex !== null && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
  }, [currentIndex, images.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      else if (e.key === 'ArrowRight') handleNext();
      else if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragStartX(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (dragStartX === null) return;
    const diff = e.clientX - dragStartX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) handlePrev();
      else handleNext();
    }
    setDragStartX(null);
  };

  if (!isOpen) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            className="fixed inset-0 z-[100]"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)', backdropFilter: 'blur(8px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
        </Dialog.Overlay>
        <Dialog.Content
          className="fixed inset-0 z-[101] flex items-center justify-center outline-none"
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
        >
          {/* Close button */}
          <Dialog.Close asChild>
            <button
              className="absolute top-6 right-6 z-10 p-2 text-white/60 hover:text-white transition-colors duration-300"
              aria-label="Close lightbox"
            >
              <X size={28} strokeWidth={1} />
            </button>
          </Dialog.Close>

          {/* Navigation arrows */}
          {currentIndex > 0 && (
            <button
              onClick={(e) => { e.stopPropagation(); handlePrev(); }}
              className="absolute left-4 md:left-8 z-10 p-3 text-white/50 hover:text-white transition-colors duration-300"
              aria-label="Previous image"
            >
              <ChevronLeft size={32} strokeWidth={1} />
            </button>
          )}
          {currentIndex < images.length - 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="absolute right-4 md:right-8 z-10 p-3 text-white/50 hover:text-white transition-colors duration-300"
              aria-label="Next image"
            >
              <ChevronRight size={32} strokeWidth={1} />
            </button>
          )}

          {/* Image */}
          <div ref={imageRef} className="relative max-w-[90vw] max-h-[85vh]">
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={images[currentIndex].src}
                alt={images[currentIndex].caption || `Image ${currentIndex + 1}`}
                className="max-w-full max-h-[85vh] object-contain mx-auto select-none"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                draggable={false}
              />
            </AnimatePresence>
          </div>

          {/* Counter + caption */}
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <p
              style={{
                fontFamily: "'Tenor Sans', sans-serif",
                fontSize: '13px',
                letterSpacing: '0.15em',
                color: 'rgba(255, 255, 255, 0.5)',
              }}
            >
              {currentIndex + 1} / {images.length}
            </p>
            {images[currentIndex].caption && (
              <p
                className="mt-2"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '15px',
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontStyle: 'italic',
                }}
              >
                {images[currentIndex].caption}
              </p>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
