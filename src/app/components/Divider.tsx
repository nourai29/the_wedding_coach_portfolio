export function Divider() {
  return (
    <div 
      className="flex items-center justify-center py-12"
      style={{
        backgroundColor: '#FFFBF1',
        paddingLeft: '15vw',
        paddingRight: '15vw'
      }}
    >
      <div 
        style={{
          width: '120px',
          height: '0.5px',
          background: 'linear-gradient(to right, transparent, #73555d, transparent)',
          opacity: 0.3
        }}
      />
      <div 
        style={{
          width: '6px',
          height: '6px',
          backgroundColor: '#73555d',
          borderRadius: '50%',
          opacity: 0.4,
          margin: '0 16px'
        }}
      />
      <div 
        style={{
          width: '120px',
          height: '0.5px',
          background: 'linear-gradient(to left, transparent, #73555d, transparent)',
          opacity: 0.3
        }}
      />
    </div>
  );
}
