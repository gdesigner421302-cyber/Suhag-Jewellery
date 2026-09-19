import jhumkasImg from '../assets/images/gold_jhumkas_stand_1789770495201.jpg';
import necklaceImg from '../assets/images/polki_necklace_bust_1789770507175.jpg';
import ringImg from '../assets/images/antique_temple_ring_1789770517200.jpg';

export interface Product {
  id: string;
  number: number;
  name: string;
  category: 'Earrings' | 'Necklace' | 'Ring' | 'Bangles' | 'Bridal';
  price: number;
  formattedPrice: string;
  image: string;
  shortDesc: string;
  description: string;
  purity: string;
  metalWeight: string;
  gemstone: string;
  certification: string;
  inStock: boolean;
  tag: string;
}

export const BESTSELLER_PRODUCTS: Product[] = [
  {
    id: 'gold-jhumkas-01',
    number: 1,
    name: 'Gold Jhumkas',
    category: 'Earrings',
    price: 46500,
    formattedPrice: '₹46,500',
    image: jhumkasImg,
    shortDesc: 'Handcrafted in pure 22K gold on marble pedestal stand',
    description: 'Heritage Royal Jhumkas inspired by Peshwa court artistry. Cast in 22KT BIS Hallmarked yellow gold featuring hand-strung natural seed pearls and delicate filigree droplets.',
    purity: '22K BIS 916 Yellow Gold',
    metalWeight: '14.80 grams',
    gemstone: 'Natural Basra-style Seed Pearls',
    certification: 'BIS Hallmarked & Suhag Atelier Certified',
    inStock: true,
    tag: 'Bestseller #1'
  },
  {
    id: 'polki-necklace-02',
    number: 2,
    name: 'Polki Diamond Necklace',
    category: 'Necklace',
    price: 48500,
    formattedPrice: '₹48,500',
    image: necklaceImg,
    shortDesc: 'Uncut Polki diamonds on traditional gold jadau setting',
    description: 'A timeless royal choker crafted with syndicate uncut Polki diamonds set in pure gold foil. Adorned with emerald accents and handcrafted silk cord dori at the back.',
    purity: '22K Hallmarked Gold & 24K Jadau Foil',
    metalWeight: '22.40 grams',
    gemstone: 'Natural Uncut Polki Diamonds (4.20 cts)',
    certification: 'IGI Certified Polki & Suhag Hallmark',
    inStock: true,
    tag: 'Bestseller #2'
  },
  {
    id: 'temple-ring-03',
    number: 3,
    name: 'Antique Temple Ring',
    category: 'Ring',
    price: 45500,
    formattedPrice: '₹45,500',
    image: ringImg,
    shortDesc: 'Antique South Indian nagas motif with Burmese ruby core',
    description: 'An auspicious cocktail statement ring handcrafted by Bhiwandi master silversmiths and goldsmiths. Features an engraved Lakshmi floral medallion surrounded by antique gold beads.',
    purity: '22K Antique Matt Finish Gold',
    metalWeight: '12.10 grams',
    gemstone: 'Natural Pigeon-Blood Cabochon Ruby (1.85 cts)',
    certification: 'BIS Hallmarked & Gemological Lab Certified',
    inStock: true,
    tag: 'Bestseller #3'
  }
];

export const ALL_COLLECTIONS = [
  {
    id: 'heritage',
    title: 'The Bhiwandi Heritage Collection',
    tagline: 'Centuries of goldsmith artistry passed down generations',
    count: '38 Handcrafted Masterpieces'
  },
  {
    id: 'polki-bridal',
    title: 'Royal Polki & Kundan Jadau',
    tagline: 'Imperial uncut diamonds forged in pure gold foil',
    count: '24 Heirloom Sets'
  },
  {
    id: 'temple-gold',
    title: 'Antique Temple & Nagas Art',
    tagline: 'Sacred architectural jewelry with deep matte patina',
    count: '19 Auspicious Pieces'
  },
  {
    id: 'contemporary',
    title: 'Modern Solitaire & Gold Daily Luxury',
    tagline: 'Feather-light elegance designed for modern celebrations',
    count: '31 Everyday Jewels'
  }
];
