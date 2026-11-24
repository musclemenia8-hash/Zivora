import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { PRODUCTS } from '../data/products';
import { AppView, CartItem, Product } from '../types';

const CART_STORAGE_KEY = 'zivora_by_stuti_cart_v1';
const WISHLIST_STORAGE_KEY = 'zivora_by_stuti_wishlist_v1';

interface ToastState {
  id: number;
  message: string;
}

interface StoreContextValue {
  view: AppView;
  navigate: (next: AppView) => void;
  navigateHash: (hash: string) => void;
  goBack: () => void;
  canGoBack: boolean;
  isDrawerOpen: boolean;
  setIsDrawerOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  cart: CartItem[];
  cartCount: number;
  wishlist: string[];
  wishlistCount: number;
  addToCart: (productId: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  moveWishlistToCart: (productId: string) => void;
  getProductById: (productId: string) => Product | undefined;
  toast: ToastState | null;
  dismissToast: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

function parseHashToView(hash: string): AppView {
  const cleaned = hash.replace(/^#\/?/, '');
  if (!cleaned) return { name: 'home' };

  const [pathPart, queryPart] = cleaned.split('?');
  const segments = pathPart.split('/').filter(Boolean);

  if (segments[0] === 'category' && segments[1]) {
    return { name: 'category', slug: decodeURIComponent(segments[1]) };
  }
  if (segments[0] === 'bestsellers') {
    return { name: 'bestsellers' };
  }
  if (segments[0] === 'featured') {
    return { name: 'featured' };
  }
  if (segments[0] === 'products') {
    return { name: 'all-products' };
  }
  if (segments[0] === 'product' && segments[1]) {
    return { name: 'product', id: decodeURIComponent(segments[1]) };
  }
  if (segments[0] === 'cart') {
    return { name: 'cart' };
  }
  if (segments[0] === 'wishlist') {
    return { name: 'wishlist' };
  }
  if (segments[0] === 'checkout') {
    const params = new URLSearchParams(queryPart || '');
    const mode = params.get('mode');
    const id = params.get('id') || undefined;
    const qtyRaw = Number(params.get('qty') || '1');
    const qty = Number.isFinite(qtyRaw) && qtyRaw >= 1 ? Math.floor(qtyRaw) : 1;
    if (mode === 'buynow' && id) {
      return { name: 'checkout', buyNowProductId: id, buyNowQuantity: qty };
    }
    return { name: 'checkout' };
  }
  if (segments[0] === 'contact') {
    return { name: 'contact' };
  }

  return { name: 'home' };
}

function viewToHash(view: AppView): string {
  switch (view.name) {
    case 'home':
      return '#/';
    case 'category':
      return `#/category/${encodeURIComponent(view.slug)}`;
    case 'bestsellers':
      return '#/bestsellers';
    case 'featured':
      return '#/featured';
    case 'all-products':
      return '#/products';
    case 'product':
      return `#/product/${encodeURIComponent(view.id)}`;
    case 'cart':
      return '#/cart';
    case 'wishlist':
      return '#/wishlist';
    case 'checkout':
      if (view.buyNowProductId) {
        const qty = view.buyNowQuantity && view.buyNowQuantity >= 1 ? view.buyNowQuantity : 1;
        return `#/checkout?mode=buynow&id=${encodeURIComponent(view.buyNowProductId)}&qty=${qty}`;
      }
      return '#/checkout';
    case 'contact':
      return '#/contact';
  }
}

function readStoredCart(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(CART_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is CartItem =>
        typeof item?.productId === 'string' &&
        typeof item?.quantity === 'number' &&
        item.quantity >= 1 &&
        PRODUCTS.some((p) => p.id === item.productId)
    );
  } catch {
    return [];
  }
}

function readStoredWishlist(): string[] {
  try {
    const raw = window.localStorage.getItem(WISHLIST_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (id): id is string => typeof id === 'string' && PRODUCTS.some((p) => p.id === id)
    );
  } catch {
    return [];
  }
}

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [view, setView] = useState<AppView>(() =>
    typeof window !== 'undefined' ? parseHashToView(window.location.hash) : { name: 'home' }
  );
  const [historyTrail, setHistoryTrail] = useState<string[]>(() => [
    typeof window !== 'undefined' ? (window.location.hash || '#/') : '#/',
  ]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>(() =>
    typeof window !== 'undefined' ? readStoredCart() : []
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    typeof window !== 'undefined' ? readStoredWishlist() : []
  );
  const [toast, setToast] = useState<ToastState | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const currentHash = window.location.hash || '#/';
      setView(parseHashToView(currentHash));
      setHistoryTrail((prev) => {
        if (prev[prev.length - 1] === currentHash) return prev;
        return [...prev, currentHash];
      });
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // Ignore storage quota errors
    }
  }, [cart]);

  useEffect(() => {
    try {
      window.localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    } catch {
      // Ignore storage quota errors
    }
  }, [wishlist]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (message: string) => {
    setToast({ id: Date.now(), message });
  };

  const navigate = (next: AppView) => {
    const nextHash = viewToHash(next);
    setIsDrawerOpen(false);
    if (window.location.hash !== nextHash) {
      window.location.hash = nextHash;
    } else {
      setView(next);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateHash = (hash: string) => {
    setIsDrawerOpen(false);
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      setView(parseHashToView(hash));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const canGoBack = historyTrail.length > 1;

  const goBack = () => {
    setIsDrawerOpen(false);
    if (historyTrail.length > 1) {
      const nextTrail = historyTrail.slice(0, -1);
      const previousHash = nextTrail[nextTrail.length - 1] || '#/';
      setHistoryTrail(nextTrail);
      if (window.location.hash !== previousHash) {
        window.location.hash = previousHash;
      } else {
        setView(parseHashToView(previousHash));
      }
      return;
    }
    navigate({ name: 'home' });
  };

  const addToCart = (productId: string, quantity = 1) => {
    const qty = Math.max(1, Math.floor(quantity));
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    setCart((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === productId ? { ...item, quantity: item.quantity + qty } : item
        );
      }
      return [...prev, { productId, quantity: qty }];
    });
    showToast(`Added "${product.name}" to Shopping Bag`);
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    const qty = Math.max(1, Math.floor(quantity));
    setCart((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity: qty } : item))
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.productId !== productId));
    showToast('Removed item from Shopping Bag');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        if (product) showToast(`Removed "${product.name}" from Wishlist`);
        return prev.filter((id) => id !== productId);
      }
      if (product) showToast(`Saved "${product.name}" to Wishlist`);
      return [...prev, productId];
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const moveWishlistToCart = (productId: string) => {
    addToCart(productId, 1);
    setWishlist((prev) => prev.filter((id) => id !== productId));
  };

  const getProductById = (productId: string) => PRODUCTS.find((p) => p.id === productId);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const wishlistCount = wishlist.length;

  return (
    <StoreContext.Provider
      value={{
        view,
        navigate,
        navigateHash,
        goBack,
        canGoBack,
        isDrawerOpen,
        setIsDrawerOpen,
        searchQuery,
        setSearchQuery,
        cart,
        cartCount,
        wishlist,
        wishlistCount,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        getProductById,
        toast,
        dismissToast: () => setToast(null),
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error('useStore must be used inside StoreProvider');
  }
  return ctx;
}
