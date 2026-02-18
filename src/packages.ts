export interface PackageFeature {
  text: string;
  isIncluded: boolean; // Use this to determine if it should have a checkmark/dot
}

export interface Package {
  name: string;
  role: string;
  description: string;
  iconName: 'Calendar' | 'Compass' | 'Gem';
  features: PackageFeature[];
  isMostPopular?: boolean;
}

export const packages: Package[] = [
  {
    name: 'ON-THE-DAY COORDINATION',
    role: 'Professional Execution',
    iconName: 'Calendar',
    description: "Imagine waking up on your wedding day knowing every detail has been lovingly arranged. You've crafted the vision — we ensure it unfolds flawlessly, so you can be fully present for every precious moment.",
    features: [
      { text: 'Pre-Wedding Support (2-4 weeks prior)', isIncluded: true },
      { text: 'Venue walkthrough', isIncluded: true },
      { text: 'Supplier confirmations', isIncluded: true },
      { text: 'Detailed wedding day timeline and run sheet', isIncluded: true },
      { text: 'Wedding Day Coordination', isIncluded: true },
      { text: 'Full management of suppliers, deliveries, setup, and schedule', isIncluded: true },
      { text: 'Bridal party, officiant, and guest support', isIncluded: true },
      { text: 'On-the-day troubleshooting and problem solving', isIncluded: true },
      { text: 'Post-Wedding Wrap-Up', isIncluded: true },
      { text: 'Return of personal and valuable items', isIncluded: true },
      { text: 'Supplier pack-down coordination and final payments if required', isIncluded: true },
    ],
  },
  {
    name: 'WEDDING DAY COACH',
    role: 'Expert Guidance',
    iconName: 'Compass',
    description: "Picture having a trusted confidante by your side throughout the entire journey — someone who understands your vision, anticipates your needs, and brings calm to every decision. That's the peace of mind we offer.",
    features: [
      { text: 'Everything in On-the-Day Coordination', isIncluded: true },
      { text: 'Unlimited planning support', isIncluded: true },
      { text: 'Management of timelines, logistics, venues, and suppliers', isIncluded: true },
      { text: 'Access to our trusted supplier network and preferential rates', isIncluded: true },
      { text: 'Unlimited venue visits and detailed floor plan creation', isIncluded: true },
      { text: 'Ongoing coaching to ensure confidence and clarity', isIncluded: true },
    ],
    isMostPopular: true,
  },
  {
    name: 'WEDDING PLANNER',
    role: 'Complete Creative Direction',
    iconName: 'Gem',
    description: "Close your eyes and see it — the flowers, the light, the laughter. Now imagine handing that dream to someone who will pour their heart into making it real, from the first spark of inspiration to the last dance.",
    features: [
      { text: 'Everything in Wedding Day Coach', isIncluded: true },
      { text: 'Bespoke wedding concept creation and mood board', isIncluded: true },
      { text: 'Design and styling across décor, florals, lighting, stationery, and entertainment', isIncluded: true },
      { text: 'Budget planning, tracking, and guidance', isIncluded: true },
      { text: 'Venue sourcing and supplier management, including negotiation', isIncluded: true },
      { text: 'Wedding rehearsal coordination', isIncluded: true },
      { text: 'Full wedding day execution and post-wedding wrap-up', isIncluded: true },
    ],
  },
];
