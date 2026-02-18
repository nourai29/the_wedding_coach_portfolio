// Design tokens for The Wedding Coach
export const COLORS = {
  brand: '#73555d',
  cream: '#FFFBF1',
  roseGold: '#B76E79',
  roseGoldLight: '#D4A0A7',
  brandAlpha: (opacity: number) => `rgba(115, 85, 93, ${opacity})`,
  roseGoldAlpha: (opacity: number) => `rgba(183, 110, 121, ${opacity})`,
} as const;

export const FONTS = {
  display: "'Playfair Display', serif",
  body: "'Tenor Sans', sans-serif",
} as const;

export const EASE_LUXURY = [0.25, 1, 0.5, 1] as const;
