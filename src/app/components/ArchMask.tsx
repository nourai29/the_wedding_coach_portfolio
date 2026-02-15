interface ArchMaskProps {
  src: string;
  alt: string;
  className?: string;
}

// Archway/Portal image mask with 500px top-rounded radius
export function ArchMask({ src, alt, className = '' }: ArchMaskProps) {
  return (
    <div 
      className={`overflow-hidden ${className}`}
      style={{
        borderTopLeftRadius: '500px',
        borderTopRightRadius: '500px'
      }}
    >
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover"
      />
    </div>
  );
}
