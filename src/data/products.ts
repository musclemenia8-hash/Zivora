import { Product } from '../types';

/**
 * SHARED PRODUCT CATALOGUE SOURCE — ZIVORA BY STUTI
 * -------------------------------------------------
 * All sections (Bestsellers, Featured Masterpieces, Category Pages, All Products,
 * Search, Cart, Wishlist, and WhatsApp Checkout) read from this single list.
 *
 * Price Guide:
 * - Set `price: 1250` (a number in INR) to display formatted ₹ pricing and live totals.
 * - Keep `price: null` until official pricing is confirmed to display "Price on Request".
 */
export const PRODUCTS: Product[] = [
  // NECKLACES
  {
    id: 'ZBS-NCK-001',
    name: 'Pearl Zigzag Chain Necklace',
    category: 'Necklaces',
    categorySlug: 'necklaces',
    group: 'Jewellery',
    description:
      'Delicate zigzag link necklace accented with luminous spherical pearls along an adjustable chain, showcased by Zivora By Stuti.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182705_b9c86e66.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Necklaces' },
    ],
    isBestseller: true,
    isFeatured: true,
    isNewArrival: true,
    available: true,
    addedOrder: 16,
  },
  {
    id: 'ZBS-NCK-002',
    name: 'Oval Enamel Floral Necklace',
    category: 'Necklaces',
    categorySlug: 'necklaces',
    group: 'Jewellery',
    description:
      'Oval framed pendant necklace featuring botanical floral motif detailing on a sleek snake-style chain.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182758_653923fa.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Necklaces' },
    ],
    isBestseller: false,
    isFeatured: true,
    isNewArrival: true,
    available: true,
    addedOrder: 15,
  },

  // JEWELLERY SETS
  {
    id: 'ZBS-SET-001',
    name: 'Crimson Cushion Pendant & Stud Set',
    category: 'Jewellery Sets',
    categorySlug: 'jewellery-sets',
    group: 'Jewellery',
    description:
      'Coordinated square-cut crimson stone pendant necklace paired with matching four-prong stud earrings.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182738_06751fbd.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Jewellery Sets' },
      { label: 'Includes', value: 'Pendant Chain & Pair of Earrings' },
    ],
    isBestseller: true,
    isFeatured: true,
    isNewArrival: true,
    available: true,
    addedOrder: 14,
  },
  {
    id: 'ZBS-SET-002',
    name: 'Filigree Teardrop Pendant & Earrings Set',
    category: 'Jewellery Sets',
    categorySlug: 'jewellery-sets',
    group: 'Jewellery',
    description:
      'Ornate teardrop filigree pendant on a classic chain accompanied by matching leaf-drop earrings.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182900_5e607a4e.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Jewellery Sets' },
      { label: 'Includes', value: 'Pendant Necklace & Pair of Earrings' },
    ],
    isBestseller: false,
    isFeatured: true,
    isNewArrival: false,
    available: true,
    addedOrder: 13,
  },

  // RINGS
  {
    id: 'ZBS-RNG-001',
    name: 'Triple-Beaded Spiral Ring',
    category: 'Rings',
    categorySlug: 'rings',
    group: 'Jewellery',
    description:
      'Contemporary triple-row beaded spiral wrap ring from the Zivora By Stuti Rings collection.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182642_4a96da1d.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Rings' },
    ],
    isBestseller: false,
    isFeatured: false,
    isNewArrival: true,
    available: true,
    addedOrder: 12,
  },
  {
    id: 'ZBS-RNG-002',
    name: 'Antique Floral Motif Statement Ring',
    category: 'Rings',
    categorySlug: 'rings',
    group: 'Jewellery',
    description:
      'Sculpted multi-petal floral statement ring with intricate engraved detailing and beaded border.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182938_dc183379.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Rings' },
    ],
    isBestseller: false,
    isFeatured: true,
    isNewArrival: false,
    available: true,
    addedOrder: 11,
  },

  // EARRINGS
  {
    id: 'ZBS-EAR-001',
    name: 'Tulip Blossom Stud Earrings',
    category: 'Earrings',
    categorySlug: 'earrings',
    group: 'Jewellery',
    description:
      'Sculpted tulip silhouette earrings with sparkling leaf accents, presented by Zivora By Stuti.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182436_f9d42b5d.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Earrings' },
    ],
    isBestseller: true,
    isFeatured: false,
    isNewArrival: true,
    available: true,
    addedOrder: 10,
  },
  {
    id: 'ZBS-EAR-002',
    name: 'Ribbon Bow Long Drop Earrings',
    category: 'Earrings',
    categorySlug: 'earrings',
    group: 'Jewellery',
    description:
      'Slender drop earrings topped with a solitaire stud, delicate ribbon bow motif, and openwork sphere drop.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182448_97515a69.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Earrings' },
    ],
    isBestseller: false,
    isFeatured: false,
    isNewArrival: true,
    available: true,
    addedOrder: 9,
  },
  {
    id: 'ZBS-EAR-003',
    name: 'Circular Leopard-Accent Stud Earrings',
    category: 'Earrings',
    categorySlug: 'earrings',
    group: 'Jewellery',
    description:
      'Geometric round statement stud earrings framed in warm gold tones with bold spotted inlays.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182924_25cea701.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Earrings' },
    ],
    isBestseller: false,
    isFeatured: false,
    isNewArrival: false,
    available: true,
    addedOrder: 8,
  },
  {
    id: 'ZBS-EAR-004',
    name: 'Ivory Wing Butterfly Stud Earrings',
    category: 'Earrings',
    categorySlug: 'earrings',
    group: 'Jewellery',
    description:
      'Detailed butterfly stud earrings featuring pearlescent ivory wing inlays and golden vein framing.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182814_91ba06df.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Earrings' },
    ],
    isBestseller: false,
    isFeatured: false,
    isNewArrival: true,
    available: true,
    addedOrder: 7,
  },
  {
    id: 'ZBS-EAR-005',
    name: 'Pastel Enamel Butterfly Stud Earrings',
    category: 'Earrings',
    categorySlug: 'earrings',
    group: 'Jewellery',
    description:
      'Artistic butterfly stud earrings crafted with soft teal, ivory, and rose-pink enamel wings.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182828_9fe7a831.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Earrings' },
    ],
    isBestseller: false,
    isFeatured: false,
    isNewArrival: false,
    available: true,
    addedOrder: 6,
  },
  {
    id: 'ZBS-EAR-006',
    name: 'Sculpted Organic Hoop Earrings',
    category: 'Earrings',
    categorySlug: 'earrings',
    group: 'Jewellery',
    description:
      'Fluid, organically contoured hoop earrings with a high-polish finish for everyday and evening styling.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182844_7d55903a.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Earrings' },
    ],
    isBestseller: false,
    isFeatured: false,
    isNewArrival: false,
    available: true,
    addedOrder: 5,
  },

  // BRACELETS
  {
    id: 'ZBS-BRC-001',
    name: 'Peacock Motif Enamel Bracelet',
    category: 'Bracelets',
    categorySlug: 'bracelets',
    group: 'Jewellery',
    description:
      'Open-end statement bracelet detailed with royal blue enamel peacock motifs and sparkling stone accents.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182528_a1c6880a.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Bracelets' },
    ],
    isBestseller: true,
    isFeatured: true,
    isNewArrival: true,
    available: true,
    addedOrder: 4,
  },
  {
    id: 'ZBS-BRC-002',
    name: 'Floral Starburst Bracelet',
    category: 'Bracelets',
    categorySlug: 'bracelets',
    group: 'Jewellery',
    description:
      'Textured sleek cuff bracelet accented with a crimson-centered floral starburst motif.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182544_d899f170.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Bracelets' },
    ],
    isBestseller: false,
    isFeatured: false,
    isNewArrival: false,
    available: true,
    addedOrder: 3,
  },
  {
    id: 'ZBS-BRC-003',
    name: 'Twin-Band Floral Cuff Bracelet',
    category: 'Bracelets',
    categorySlug: 'bracelets',
    group: 'Jewellery',
    description:
      'Layered double-band cuff bracelet finished with sculptural bead terminals and a floral frame centerpiece.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182602_0cc6bd91.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Bracelets' },
    ],
    isBestseller: false,
    isFeatured: false,
    isNewArrival: false,
    available: true,
    addedOrder: 2,
  },
  {
    id: 'ZBS-BRC-004',
    name: 'Double-Heart Infinity Hinged Bracelet',
    category: 'Bracelets',
    categorySlug: 'bracelets',
    group: 'Jewellery',
    description:
      'Hinged oval bracelet sculpted with twin interlocking heart loops and flowing openwork curves.',
    price: null,
    images: ['/assets/aistudio/IMG_20261124_182622_c68cb198.jpg'],
    specifications: [
      { label: 'Collection', value: 'Zivora By Stuti' },
      { label: 'Category', value: 'Bracelets' },
    ],
    isBestseller: false,
    isFeatured: false,
    isNewArrival: false,
    available: true,
    addedOrder: 1,
  },
];
