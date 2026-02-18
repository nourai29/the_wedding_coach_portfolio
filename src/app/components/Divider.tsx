import { COLORS } from '../lib/tokens';

export function Divider() {
  return (
    <div
      className="flex items-center justify-center py-6 px-6 md:px-[15vw]"
      style={{ backgroundColor: '#FFFBF1' }}
    >
      <div
        style={{
          flex: 1,
          maxWidth: '160px',
          height: '1px',
          background: `linear-gradient(to right, transparent, ${COLORS.roseGold})`,
          opacity: 0.4,
        }}
      />
      <div
        style={{
          width: '8px',
          height: '8px',
          backgroundColor: COLORS.roseGold,
          borderRadius: '50%',
          opacity: 0.5,
          margin: '0 20px',
        }}
      />
      <div
        style={{
          flex: 1,
          maxWidth: '160px',
          height: '1px',
          background: `linear-gradient(to left, transparent, ${COLORS.roseGold})`,
          opacity: 0.4,
        }}
      />
    </div>
  );
}
