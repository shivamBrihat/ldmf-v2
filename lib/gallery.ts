import manifest from '@/data/gallery-manifest.json';

export type GalleryCategory =
  | 'welcome'
  | 'inauguration'
  | 'speeches'
  | 'audience'
  | 'awards'
  | 'saints'
  | 'group';

export interface ManifestImage {
  id: string;
  src: string;
  width: number;
  height: number;
  category: GalleryCategory;
  featured: boolean;
  blurDataURL: string;
}

export const galleryManifest = manifest as ManifestImage[];

type Lang = 'en' | 'hi';

export const CATEGORY_ORDER: GalleryCategory[] = [
  'awards',
  'inauguration',
  'speeches',
  'saints',
  'welcome',
  'audience',
  'group',
];

export const CATEGORY_LABELS: Record<GalleryCategory, Record<Lang, string>> = {
  awards: { en: 'Lagni Ratna Samman', hi: 'लगनीरत्न सम्मान' },
  inauguration: { en: 'Deep Prajjwalan', hi: 'दीप प्रज्ज्वलन' },
  speeches: { en: 'Speeches & Poetry', hi: 'उद्बोधन एवं काव्य पाठ' },
  saints: { en: 'Saints & Blessings', hi: 'संत समागम एवं आशीर्वाद' },
  welcome: { en: 'Welcome & Arrivals', hi: 'स्वागत एवं आगमन' },
  audience: { en: 'Audience', hi: 'दर्शक दीर्घा' },
  group: { en: 'Group Photos & Book Launch', hi: 'सामूहिक चित्र एवं पुस्तक विमोचन' },
};

const CATEGORY_CAPTIONS: Record<GalleryCategory, Record<Lang, string>> = {
  awards: { en: 'Lagni Ratna Samman — honouring poets & writers', hi: 'लगनीरत्न सम्मान — कवियों एवं साहित्यकारों का सम्मान' },
  inauguration: { en: 'Ceremonial lamp lighting at Kavi Sammelan 1.0', hi: 'कवि सम्मेलन 1.0 में दीप प्रज्ज्वलन' },
  speeches: { en: 'Addresses and poetry recitals on stage', hi: 'मंच से उद्बोधन एवं काव्य पाठ' },
  saints: { en: 'Revered saints grace the ceremony', hi: 'पूज्य संतों का सान्निध्य एवं अभिनंदन' },
  welcome: { en: 'Welcoming guests to Hansraj College', hi: 'हंसराज महाविद्यालय में अतिथियों का स्वागत' },
  audience: { en: 'A packed auditorium at Kavi Sammelan 1.0', hi: 'कवि सम्मेलन 1.0 में उपस्थित श्रोतागण' },
  group: { en: 'Guests and honourees together on stage', hi: 'मंच पर अतिथि एवं सम्मानित जन' },
};

// Specific captions for shots whose content is known precisely.
const IMAGE_CAPTIONS: Record<string, Record<Lang, string>> = {
  IMG_2106: { en: 'Lagni Ratna awardees at Kavi Sammelan 1.0', hi: 'कवि सम्मेलन 1.0 के लगनीरत्न सम्मानित रचनाकार' },
  IMG_2104: { en: 'Lagni Ratna awardees with foundation trustees', hi: 'न्यासियों के साथ लगनीरत्न सम्मानित रचनाकार' },
  IMG_2105: { en: 'Lagni Ratna awardees with foundation trustees', hi: 'न्यासियों के साथ लगनीरत्न सम्मानित रचनाकार' },
  IMG_1947: { en: 'Saints and guests light the ceremonial lamp', hi: 'संतों एवं अतिथियों द्वारा दीप प्रज्ज्वलन' },
  IMG_1948: { en: 'Deep Prajjwalan by honoured guests', hi: 'सम्मानित अतिथियों द्वारा दीप प्रज्ज्वलन' },
  IMG_1890: { en: 'Saints arrive under the ceremonial chhatra', hi: 'छत्र के साथ पूज्य संतों का आगमन' },
  IMG_2045: { en: 'Honouring Ms. Sonam Mishra', hi: 'सुश्री सोनम मिश्रा का सम्मान' },
  IMG_2044: { en: 'Honouring Ms. Sonam Mishra', hi: 'सुश्री सोनम मिश्रा का सम्मान' },
  IMG_2164: { en: 'Rashtriya Sahitya Gaurav Samman 2026', hi: 'राष्ट्रीय साहित्य गौरव सम्मान 2026' },
  IMG_2165: { en: 'Rashtriya Sahitya Bhushan Samman 2026', hi: 'राष्ट्रीय साहित्य भूषण सम्मान 2026' },
  IMG_2048: { en: 'Book launch on stage', hi: 'मंच पर पुस्तक विमोचन' },
  IMG_2049: { en: 'Book launch on stage', hi: 'मंच पर पुस्तक विमोचन' },
  IMG_2063: { en: 'A packed auditorium at Hansraj College', hi: 'हंसराज महाविद्यालय का खचाखच भरा सभागार' },
  IMG_1886: { en: 'The stage set for Kavi Sammelan 1.0', hi: 'कवि सम्मेलन 1.0 के लिए सजा मंच' },
  IMG_1885: { en: 'The stage set for Kavi Sammelan 1.0', hi: 'कवि सम्मेलन 1.0 के लिए सजा मंच' },
  IMG_2050: { en: 'Address at Kavi Sammelan 1.0', hi: 'कवि सम्मेलन 1.0 में उद्बोधन' },
  IMG_1927: { en: 'Welcoming guests with tilak', hi: 'तिलक लगाकर अतिथियों का स्वागत' },
  IMG_1954: { en: 'Guests gather after the lamp lighting', hi: 'दीप प्रज्ज्वलन के पश्चात अतिथिगण' },
  IMG_2117: { en: 'Sadhvi honoured under the ceremonial chhatra', hi: 'छत्र के नीचे पूज्य साध्वी का सम्मान' },
  IMG_2121: { en: 'Lagni Ratna Samman to Mr. Sarfaraz Warsi', hi: 'श्री सरफ़राज़ वारसी को लगनीरत्न सम्मान' },
  IMG_1967: { en: 'Saints and guests in the front row', hi: 'अग्रिम पंक्ति में पूज्य संत एवं अतिथि' },
  IMG_2029: { en: 'Honoured saints and trustees on stage', hi: 'मंच पर पूज्य संत एवं न्यासी' },
  IMG_2032: { en: 'Namaste between saints and hosts', hi: 'संतों एवं आयोजकों का अभिवादन' },
  IMG_2015: { en: 'A guest speaker addresses the audience', hi: 'श्रोताओं को संबोधित करती अतिथि वक्ता' },
};

export function captionFor(id: string, category: GalleryCategory, lang: Lang) {
  return IMAGE_CAPTIONS[id]?.[lang] ?? CATEGORY_CAPTIONS[category][lang];
}
