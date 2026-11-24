import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, Heart, Menu, Search, ShoppingBag, X } from 'lucide-react';
import { BRAND } from '../config/brand';
import { MEDIA_ASSETS } from '../config/media';
import { POPULATED_CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/format';
import { LogoSlot } from './MediaSlots';

export const Navbar: React.FC = () => {
  const {
    navigate,
    goBack,
    setIsDrawerOpen,
    searchQuery,
    setSearchQuery,
    cartCount,
    wishlistCount,
  } = useStore();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const normalizedQuery = searchQuery.trim().toLowerCase();

  useEffect(() => {
    if (isSearchOpen) {
      window.setTimeout(() => searchInputRef.current?.focus(), 60);
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isSearchOpen]);

  const matchingCategories = useMemo(() => {
    if (!normalizedQuery) return [];
    return POPULATED_CATEGORIES.filter(
      (cat) =>
        cat.name.toLowerCase().includes(normalizedQuery) ||
        cat.group.toLowerCase().includes(normalizedQuery)
    ).slice(0, 4);
  }, [normalizedQuery]);

  const matchingProducts = useMemo(() => {
    if (!normalizedQuery) return [];
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(normalizedQuery) ||
        p.category.toLowerCase().includes(normalizedQuery) ||
        p.group.toLowerCase().includes(normalizedQuery)
    ).slice(0, 6);
  }, [normalizedQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchOpen(false);
    navigate({ name: 'all-products' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#171311]/95 backdrop-blur-md border-b border-[#B08D57]/30 text-[#F7F1E8]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 h-16 sm:h-[72px] flex items-center justify-between gap-2">
        {/* LEFT: Three-line Hamburger Menu + Original Brand Logo & Wordmark */}
        <div className="flex items-center gap-2 sm:gap-3.5 min-w-0">
          <button
            type="button"
            onClick={() => setIsDrawerOpen(true)}
            aria-label="Open navigation menu"
            className="w-10 h-10 flex items-center justify-center text-[#D9C3A0] hover:text-[#F7F1E8] hover:bg-[#30231D]/55 transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
          >
            <Menu className="w-5 h-5" strokeWidth={1.6} />
          </button>

          <button
            type="button"
            onClick={() => navigate({ name: 'home' })}
            className="flex items-center gap-2.5 sm:gap-3 text-left min-w-0 py-1 pr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
          >
            <LogoSlot src={MEDIA_ASSETS.logo} alt={`${BRAND.name} Logo`} size="navbar" />
            <span className="font-display text-lg sm:text-2xl font-semibold tracking-[0.04em] text-[#F7F1E8] whitespace-nowrap truncate">
              {BRAND.name}
            </span>
          </button>
        </div>

        {/* RIGHT: Back Navigation + Wishlist + Search + Shopping Bag */}
        <div className="flex items-center gap-0.5 sm:gap-1.5 shrink-0">
          {/* Back Navigation */}
          <button
            type="button"
            onClick={goBack}
            aria-label="Go back"
            title="Back"
            className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#D9C3A0] hover:text-[#F7F1E8] hover:bg-[#30231D]/55 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
          >
            <ArrowLeft className="w-[18px] h-[18px]" strokeWidth={1.6} />
          </button>

          <span aria-hidden="true" className="hidden sm:block h-4 w-px bg-[#B08D57]/25 mx-0.5" />

          {/* Wishlist Heart */}
          <button
            type="button"
            onClick={() => navigate({ name: 'wishlist' })}
            aria-label={`Wishlist (${wishlistCount} saved)`}
            title="Wishlist"
            className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#D9C3A0] hover:text-[#F7F1E8] hover:bg-[#30231D]/55 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
          >
            <Heart className="w-[18px] h-[18px]" strokeWidth={1.6} />
            {wishlistCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-1 right-0.5 min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center bg-[#B76E79] text-[#F7F1E8] text-[9px] font-semibold tabular-nums"
              >
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Search Icon */}
          <button
            type="button"
            onClick={() => setIsSearchOpen((prev) => !prev)}
            aria-label={isSearchOpen ? 'Close search' : 'Search products'}
            aria-expanded={isSearchOpen}
            title="Search"
            className={`w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79] ${
              isSearchOpen
                ? 'text-[#B76E79] bg-[#30231D]/70'
                : 'text-[#D9C3A0] hover:text-[#F7F1E8] hover:bg-[#30231D]/55'
            }`}
          >
            {isSearchOpen ? (
              <X className="w-[18px] h-[18px]" strokeWidth={1.6} />
            ) : (
              <Search className="w-[18px] h-[18px]" strokeWidth={1.6} />
            )}
          </button>

          <span aria-hidden="true" className="hidden sm:block h-4 w-px bg-[#B08D57]/25 mx-0.5" />

          {/* Shopping Bag */}
          <button
            type="button"
            onClick={() => navigate({ name: 'cart' })}
            aria-label={`Shopping bag (${cartCount} items)`}
            title="Shopping Bag"
            className="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center text-[#D9C3A0] hover:text-[#F7F1E8] hover:bg-[#30231D]/55 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
          >
            <ShoppingBag className="w-[18px] h-[18px]" strokeWidth={1.6} />
            {cartCount > 0 && (
              <span
                aria-hidden="true"
                className="absolute top-1 right-0.5 min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center bg-[#B08D57] text-[#171311] text-[9px] font-semibold tabular-nums"
              >
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Expandable Luxury Search Bar & Live Results */}
      {isSearchOpen && (
        <div className="border-t border-[#B08D57]/25 bg-[#171311] px-3 sm:px-6 py-3.5">
          <div className="max-w-3xl mx-auto relative">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <Search className="w-4 h-4 text-[#D9C3A0]/70 absolute left-3.5 pointer-events-none" />
              <input
                ref={searchInputRef}
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name or category..."
                aria-label="Search by product name and category"
                className="w-full h-11 pl-10 pr-24 text-sm bg-[#241D1A] border border-[#B08D57]/40 text-[#F7F1E8] placeholder:text-[#D9C3A0]/55 focus:outline-none focus:border-[#B76E79] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-20 p-1 text-[#D9C3A0]/70 hover:text-[#F7F1E8]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1.5 h-8 px-3 text-xs font-medium tracking-wider uppercase bg-[#B08D57] text-[#171311] hover:bg-[#D9C3A0] transition-colors"
              >
                Search
              </button>
            </form>

            {normalizedQuery.length > 0 && (
              <div className="mt-2 bg-[#F7F1E8] text-[#30231D] border border-[#B08D57]/45 shadow-2xl max-h-80 overflow-y-auto">
                {matchingCategories.length > 0 && (
                  <div className="p-2.5 border-b border-[#B08D57]/20">
                    <p className="px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[#30231D]/60 font-semibold">
                      Categories
                    </p>
                    {matchingCategories.map((cat) => (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate({ name: 'category', slug: cat.slug });
                        }}
                        className="w-full text-left px-2.5 py-2 text-xs sm:text-sm hover:bg-[#D9C3A0]/35 flex items-center justify-between transition-colors"
                      >
                        <span className="font-medium">{cat.name}</span>
                        <span className="text-xs text-[#30231D]/60">{cat.group}</span>
                      </button>
                    ))}
                  </div>
                )}

                <div className="p-2.5">
                  <p className="px-2 py-1 text-[10px] uppercase tracking-[0.18em] text-[#30231D]/60 font-semibold">
                    Products
                  </p>
                  {matchingProducts.length === 0 ? (
                    <p className="px-2.5 py-2.5 text-xs sm:text-sm text-[#30231D]/70">
                      No matching pieces found for "{searchQuery}".
                    </p>
                  ) : (
                    matchingProducts.map((product) => (
                      <button
                        key={product.id}
                        type="button"
                        onClick={() => {
                          setIsSearchOpen(false);
                          navigate({ name: 'product', id: product.id });
                        }}
                        className="w-full text-left px-2.5 py-2 text-xs sm:text-sm hover:bg-[#D9C3A0]/35 flex items-center justify-between gap-3 transition-colors"
                      >
                        <div className="min-w-0">
                          <p className="font-display text-base font-semibold truncate">{product.name}</p>
                          <p className="text-[11px] text-[#30231D]/65">{product.category}</p>
                        </div>
                        <span className="text-xs font-medium tabular-nums shrink-0 text-[#B76E79]">
                          {formatPrice(product.price)}
                        </span>
                      </button>
                    ))
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsSearchOpen(false);
                    navigate({ name: 'all-products' });
                  }}
                  className="w-full py-2.5 px-3 text-xs font-medium tracking-wider uppercase text-center bg-[#171311] text-[#D9C3A0] hover:text-[#F7F1E8] transition-colors"
                >
                  View All Matching Results
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
