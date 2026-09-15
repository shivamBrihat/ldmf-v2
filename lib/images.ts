// Single source of truth for site imagery (used by components and prisma/seed.ts).
// Real LDMF photos live in public/images/events (from Kavi Sammelan 1.0, 01 Aug 2026).
// Programme topics with no real photo yet use hand-picked Unsplash images.

export const eventPhoto = (n: number) => `/images/events/IMG_${n}.webp`;

const unsplash = (photoId: string) =>
  `https://images.unsplash.com/${photoId}?q=80&w=1600&auto=format&fit=crop`;

export const IMAGES = {
  hero: {
    main: eventPhoto(2106),
    inset: eventPhoto(1948),
  },
  pageHero: {
    gallery: eventPhoto(2104),
    events: eventPhoto(1886),
    updates: eventPhoto(2063),
    activities: eventPhoto(1927),
    courses: eventPhoto(2048),
    contact: eventPhoto(1875),
    donate: eventPhoto(1967),
  },
  events: {
    kaviSammelan: eventPhoto(2050),
    deepPrajjwalan: eventPhoto(1954),
    nationalCitation: eventPhoto(2164),
  },
  stock: {
    computer: unsplash('photo-1569653402334-2e98fbaa80ee'), // sunrise University — students in a computer lab
    english: unsplash('photo-1573894998033-c0cef4ed722b'), // Yogendra Singh — schoolgirls in class
    tailoring: unsplash('photo-1559557874-816b40a18d43'), // Syed Ali — woman at a hand-crank sewing machine
    coaching: unsplash('photo-1692269725827-699e04a11cdf'), // Swastik Arora — schoolboys reading at a desk
    health: unsplash('photo-1667577113456-34c59803de33'), // Bhupathi Srinu — women queueing at a clinic
    sanitation: unsplash('photo-1613501767902-96cf840115bf'), // Susmita Saha — sweeping a village street
    relief: unsplash('photo-1660015154403-0fd84e5d810d'), // katyayan gauniyal — community meal distribution
  },
} as const;
