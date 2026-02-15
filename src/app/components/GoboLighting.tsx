// Gobo lighting effect - soft leaf/window shadows
export function GoboLighting() {
  return (
    <div className="fixed inset-0 pointer-events-none z-40 opacity-[0.08]">
      <div 
        className="absolute top-0 right-0 w-[800px] h-[800px]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 20%, #73555d 80%)',
          mixBlendMode: 'multiply',
          transform: 'rotate(-15deg)',
          filter: 'blur(80px)'
        }}
      />
      <div 
        className="absolute bottom-0 left-0 w-[600px] h-[600px]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, #73555d 90%)',
          mixBlendMode: 'multiply',
          transform: 'rotate(25deg)',
          filter: 'blur(60px)'
        }}
      />
    </div>
  );
}
