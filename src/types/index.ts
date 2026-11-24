export type ParentGroup = 'Jewellery' | 'Watches';

export type CategorySlug =
  | 'necklaces'
  | 'rings'
  | 'bangles'
  | 'earrings'
  | 'bracelets'
  | 'jewellery-sets'
  | 'pendants'
  | 'mens-watches'
  | 'womens-watches'
  | 'luxury-watches'
  | 'couple-watches'
  | 'premium-watches';

export interface CategoryInfo {
  slug: CategorySlug;
  name: string;
  group: ParentGroup;
  image: string;
  description: string;
}

export interface ProductSpecification {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  categorySlug: CategorySlug;
  group: ParentGroup;
  description: string;
  /** Set numeric INR price (e.g. 14500) when ready, or keep null to show "Price on Request". */
  price: number | null;
  images: string[];
  specifications: ProductSpecification[];
  isBestseller: boolean;
  isFeatured: boolean;
  isNewArrival?: boolean;
  available: boolean;
  addedOrder: number;
}

export interface Review {
  id: string;
  productId?: string;
  customerName: string;
  customerPhoto?: string;
  rating: number;
  text: string;
  date?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CheckoutCustomer {
  fullName: string;
  mobile: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
}

export type AppView =
  | { name: 'home' }
  | { name: 'category'; slug: string }
  | { name: 'bestsellers' }
  | { name: 'featured' }
  | { name: 'all-products' }
  | { name: 'product'; id: string }
  | { name: 'cart' }
  | { name: 'wishlist' }
  | { name: 'checkout'; buyNowProductId?: string; buyNowQuantity?: number }
  | { name: 'contact' };
