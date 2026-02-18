export interface Venue {
  id: string;
  name: string;
  logo: string;
  images: string[];
  location?: string;
  websiteUrl?: string;
}

export const venues: Venue[] = [
  {
    id: 'anantara-santorini',
    name: 'Anantara Santorini',
    location: 'Abu Dhabi, UAE',
    logo: 'src/assets/venues/Anantara Hotels & Resorts C.png', // Updated path
    images: [
      'src/assets/portfolio-optimized/Anantara_Santorini_1.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_2.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_3.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_4.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_5.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_6.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_7.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_8.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_9.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_10.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_11.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_12.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_13.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_14.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_15.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_E&H_1.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_E&H_2.webp',
      'src/assets/portfolio-optimized/Anantara_Santorini_E&H_3.webp',
    ],
  },
  {
    id: 'atlantis-the-royal',
    name: 'Atlantis The Royal',
    logo: 'src/assets/venues/Atlantis_the_Royal.png',
    images: [],
  },
  {
    id: 'aura-skypool',
    name: 'AURA SKYPOOL',
    logo: 'src/assets/venues/AURA SKYPOOL_idX8NoMRXb_1.svg',
    images: [],
  },
  {
    id: 'dubai-polo-equestrian-club',
    name: 'Dubai Polo & Equestrian Club',
    logo: 'src/assets/venues/duabi_polo_club.svg', // Updated path
    images: [],
  },
  {
    id: 'hyatt',
    name: 'Hyatt',
    logo: 'src/assets/venues/Hyatt-Logo.wine.svg',
    images: [],
  },
  {
    id: 'melia-hotels-international',
    name: 'Meliá Hotels International',
    logo: 'src/assets/venues/Meliá_Hotels_International_logo.svg',
    images: [],
  },
  {
    id: 'one-n-only-royal-mirage',
    name: 'One&Only Royal Mirage',
    location: 'Dubai, UAE',
    websiteUrl: 'https://www.oneandonlyresorts.com/royal-mirage',
    logo: 'src/assets/venues/one_n_only_royal_mirrage_logo.svg', // Updated path
    images: [
      'src/assets/portfolio-optimized/T&T-One&Only_Mirrage_1.webp',
      'src/assets/portfolio-optimized/T&T-One&Only_Mirrage_2.webp',
      'src/assets/portfolio-optimized/T&T-One&Only_Mirrage_3.webp',
      'src/assets/portfolio-optimized/T&T-One&Only_Mirrage_4.webp',
      'src/assets/portfolio-optimized/T&T-One&Only_Mirrage_5.webp',
    ],
  },
  {
    id: 'park-hyatt',
    name: 'Park Hyatt',
    location: 'Dubai, UAE',
    websiteUrl: 'https://www.hyatt.com/park-hyatt/dxbph-park-hyatt-dubai',
    logo: 'src/assets/venues/Hyatt-Logo.wine.svg',
    images: [
        'src/assets/portfolio-optimized/Park_Hyatt_1.webp',
        'src/assets/portfolio-optimized/Park_Hyatt_2.webp',
        'src/assets/portfolio-optimized/Park_Hyatt_3.webp',
        'src/assets/portfolio-optimized/Park_Haytt_4.webp',
        'src/assets/portfolio-optimized/Park_Hyatt_5.webp',
        'src/assets/portfolio-optimized/Park_Hyatt_6.webp',
        'src/assets/portfolio-optimized/Park_Hyatt_7.webp',
    ],
    },
    {
    id: 'saadiyat-beach-club',
    name: 'Saadiyat Beach Club',
    logo: 'src/assets/venues/saadiyat_beach_club.svg', // Updated path
    images: [],
    },
    {
    id: 'shangri-la-qaryat-al-beri',
    name: 'Shangri-La Qaryat Al Beri',
    logo: 'src/assets/venues/Shangri-La_Qaryat_Al_Beri_logo.webp',
    images: [],
    },
    {
    id: 'st-regis-downtown',
    name: 'St. Regis Downtown',
    logo: 'src/assets/venues/st_regis_downtown.png',
    images: [],
    },
    {
    id: 'the-farm-al-barari',
    name: 'The Farm, Al Barari',
    logo: 'src/assets/venues/the_farm_albarari.svg', // Updated path
    images: [],
    },
    {
    id: 'waldorf-astoria',
    name: 'Waldorf Astoria',
    logo: 'src/assets/venues/Waldorf-Astoria-Logo.svg', // Updated path
    images: [],
    },
];
