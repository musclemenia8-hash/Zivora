import { CategoryInfo } from '../types';
import { PRODUCTS } from './products';

export const CATEGORIES: CategoryInfo[] = [
  // Jewellery
  {
    slug: 'necklaces',
    name: 'Necklaces',
    group: 'Jewellery',
    image: '/assets/aistudio/IMG_20261124_182705_b9c86e66.jpg',
    description: 'Curated necklace creations from Zivora By Stuti.',
  },
  {
    slug: 'rings',
    name: 'Rings',
    group: 'Jewellery',
    image: '/assets/aistudio/IMG_20261124_182938_dc183379.jpg',
    description: 'Signature rings presented in our Jewellery catalogue.',
  },
  {
    slug: 'bangles',
    name: 'Bangles',
    group: 'Jewellery',
    image: '',
    description: 'Traditional and contemporary bangle selections.',
  },
  {
    slug: 'earrings',
    name: 'Earrings',
    group: 'Jewellery',
    image: '/assets/aistudio/IMG_20261124_182436_f9d42b5d.jpg',
    description: 'Refined earrings curated for timeless poise.',
  },
  {
    slug: 'bracelets',
    name: 'Bracelets',
    group: 'Jewellery',
    image: '/assets/aistudio/IMG_20261124_182528_a1c6880a.jpg',
    description: 'Delicate and statement bracelet designs.',
  },
  {
    slug: 'jewellery-sets',
    name: 'Jewellery Sets',
    group: 'Jewellery',
    image: '/assets/aistudio/IMG_20261124_182738_06751fbd.jpg',
    description: 'Coordinated luxury jewellery sets for special occasions.',
  },
  {
    slug: 'pendants',
    name: 'Pendants',
    group: 'Jewellery',
    image: '',
    description: 'Graceful pendants crafted for everyday and occasion wear.',
  },

  // Watches
  {
    slug: 'mens-watches',
    name: "Men's Watches",
    group: 'Watches',
    image: '',
    description: "Distinguished men's timepieces in our collection.",
  },
  {
    slug: 'womens-watches',
    name: "Women's Watches",
    group: 'Watches',
    image: '',
    description: "Elegant women's timepieces designed to shine.",
  },
  {
    slug: 'luxury-watches',
    name: 'Luxury Watches',
    group: 'Watches',
    image: '',
    description: 'Statement luxury watches for connoisseurs.',
  },
  {
    slug: 'couple-watches',
    name: 'Couple Watches',
    group: 'Watches',
    image: '',
    description: 'Matched timepiece pairs curated for milestone moments.',
  },
  {
    slug: 'premium-watches',
    name: 'Premium Watches',
    group: 'Watches',
    image: '',
    description: 'Refined premium wristwear from Zivora By Stuti.',
  },
];

function hasValidProductsForCategory(slug: string): boolean {
  return PRODUCTS.some(
    (product) =>
      Boolean(product.id) &&
      Boolean(product.name) &&
      product.available &&
      product.categorySlug === slug
  );
}

/**
 * Dynamically derived categories containing at least one valid product.
 * Categories with zero products are automatically hidden everywhere on the site,
 * and reappear automatically as soon as products are added to src/data/products.ts.
 */
export function getPopulatedCategories(): CategoryInfo[] {
  return CATEGORIES.filter((cat) => hasValidProductsForCategory(cat.slug));
}

export function getPopulatedJewelleryCategories(): CategoryInfo[] {
  return getPopulatedCategories().filter((cat) => cat.group === 'Jewellery');
}

export function getPopulatedWatchCategories(): CategoryInfo[] {
  return getPopulatedCategories().filter((cat) => cat.group === 'Watches');
}

export function isCategoryPopulated(slug: string): boolean {
  if (slug === 'jewellery') {
    return getPopulatedJewelleryCategories().length > 0;
  }
  if (slug === 'watches') {
    return getPopulatedWatchCategories().length > 0;
  }
  return getPopulatedCategories().some((cat) => cat.slug === slug);
}

export const POPULATED_CATEGORIES = getPopulatedCategories();
export const JEWELLERY_CATEGORIES = getPopulatedJewelleryCategories();
export const WATCH_CATEGORIES = getPopulatedWatchCategories();
