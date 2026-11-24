import React, { useMemo, useState } from 'react';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import {
  JEWELLERY_CATEGORIES,
  POPULATED_CATEGORIES,
  WATCH_CATEGORIES,
} from '../data/categories';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { ProductCard } from './ProductCard';

export type SortOption = 'featured' | 'newest' | 'price-asc' | 'price-desc';

interface ProductCatalogueProps {
  title: string;
  subtitle?: string;
  lockedCategorySlug?: string;
  onlyBestsellers?: boolean;
  onlyFeatured?: boolean;
  hideCategoryFilter?: boolean;
  id?: string;
}

export const ProductCatalogue: React.FC<ProductCatalogueProps> = ({
  title,
  subtitle,
  lockedCategorySlug,
  onlyBestsellers = false,
  onlyFeatured = false,
  hideCategoryFilter = false,
  id,
}) => {
  const { searchQuery, setSearchQuery } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const activeCategoryFilter = lockedCategorySlug || selectedCategory;

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const list = PRODUCTS.filter((product: Product) => {
      if (onlyBestsellers && !product.isBestseller) return false;
      if (onlyFeatured && !product.isFeatured) return false;

      if (activeCategoryFilter && activeCategoryFilter !== 'all') {
        if (activeCategoryFilter === 'jewellery') {
          if (product.group !== 'Jewellery') return false;
        } else if (activeCategoryFilter === 'watches') {
          if (product.group !== 'Watches') return false;
        } else if (product.categorySlug !== activeCategoryFilter) {
          return false;
        }
      }

      if (query) {
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesGroup = product.group.toLowerCase().includes(query);
        if (!matchesName && !matchesCategory && !matchesGroup) return false;
      }

      return true;
    });

    return [...list].sort((a, b) => {
      if (sortBy === 'newest') {
        return b.addedOrder - a.addedOrder;
      }
      if (sortBy === 'featured') {
        if (a.isFeatured !== b.isFeatured) return a.isFeatured ? -1 : 1;
        if (a.isBestseller !== b.isBestseller) return a.isBestseller ? -1 : 1;
        return b.addedOrder - a.addedOrder;
      }
      if (sortBy === 'price-asc') {
        if (a.price === null && b.price === null) return 0;
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return a.price - b.price;
      }
      if (sortBy === 'price-desc') {
        if (a.price === null && b.price === null) return 0;
        if (a.price === null) return 1;
        if (b.price === null) return -1;
        return b.price - a.price;
      }
      return 0;
    });
  }, [activeCategoryFilter, onlyBestsellers, onlyFeatured, searchQuery, sortBy]);

  const hasActiveFilters =
    searchQuery.trim() !== '' ||
    (!lockedCategorySlug && selectedCategory !== 'all') ||
    sortBy !== 'featured';

  const handleClearFilters = () => {
    setSearchQuery('');
    if (!lockedCategorySlug) {
      setSelectedCategory('all');
    }
    setSortBy('featured');
  };

  return (
    <section id={id} className="py-12 sm:py-16 bg-[#D9C3A0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            {subtitle && (
              <p className="text-xs uppercase tracking-[0.22em] text-[#B76E79] font-semibold">
                {subtitle}
              </p>
            )}
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-[#30231D] text-balance">
              {title}
            </h2>
          </div>

          <p className="text-xs sm:text-sm text-[#30231D]/75 tabular-nums">
            Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'piece' : 'pieces'}
          </p>
        </div>

        {/* Search, Category Filter, Sort & Clear Bar */}
        <div className="bg-[#F7F1E8] border border-[#B08D57]/30 p-3 sm:p-4 mb-6 sm:mb-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
            {/* Search input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-[#30231D]/55 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by product name or category..."
                aria-label="Filter catalogue by product name or category"
                className="w-full h-10 pl-9 pr-8 text-sm bg-white/75 border border-[#B08D57]/35 text-[#30231D] placeholder:text-[#30231D]/50 focus:outline-none focus:border-[#B76E79]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search query"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#30231D]/60 hover:text-[#30231D]"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category filter dropdown */}
            {!hideCategoryFilter && (
              <div className="md:col-span-3">
                <label className="sr-only" htmlFor={`${id || 'cat'}-filter`}>
                  Filter by category
                </label>
                <select
                  id={`${id || 'cat'}-filter`}
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full h-10 px-3 text-sm bg-white/75 border border-[#B08D57]/35 text-[#30231D] focus:outline-none focus:border-[#B76E79]"
                >
                  <option value="all">All Categories</option>
                  {JEWELLERY_CATEGORIES.length > 0 && (
                    <option value="jewellery">All Jewellery</option>
                  )}
                  {WATCH_CATEGORIES.length > 0 && (
                    <option value="watches">All Watches</option>
                  )}
                  {POPULATED_CATEGORIES.map((cat) => (
                    <option key={cat.slug} value={cat.slug}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Sort selector */}
            <div className={hideCategoryFilter ? 'md:col-span-5' : 'md:col-span-2'}>
              <label className="sr-only" htmlFor={`${id || 'sort'}-select`}>
                Sort products
              </label>
              <div className="relative">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#30231D]/60 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                <select
                  id={`${id || 'sort'}-select`}
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="w-full h-10 pl-8 pr-3 text-sm bg-white/75 border border-[#B08D57]/35 text-[#30231D] focus:outline-none focus:border-[#B76E79]"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>

            {/* Clear Filters */}
            <div className="md:col-span-2">
              <button
                type="button"
                onClick={handleClearFilters}
                disabled={!hasActiveFilters}
                className="w-full h-10 px-3 text-xs sm:text-sm font-medium border border-[#30231D]/30 text-[#30231D] hover:bg-[#171311] hover:text-[#F7F1E8] disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-[#30231D] transition-colors whitespace-nowrap"
              >
                Clear Filters
              </button>
            </div>
          </div>

          {/* Quick Category Filter Tabs (Desktop & Tablet friendly, scrollable on small) */}
          {!hideCategoryFilter && (
            <div className="mt-3 pt-3 border-t border-[#B08D57]/20 flex items-center gap-1.5 overflow-x-auto pb-1">
              <button
                type="button"
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 text-xs font-medium tracking-wide whitespace-nowrap shrink-0 transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-[#171311] text-[#F7F1E8]'
                    : 'bg-[#D9C3A0]/40 text-[#30231D] hover:bg-[#D9C3A0]/70'
                }`}
              >
                All
              </button>
              {JEWELLERY_CATEGORIES.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory('jewellery')}
                  className={`px-3.5 py-1.5 text-xs font-medium tracking-wide whitespace-nowrap shrink-0 transition-colors ${
                    selectedCategory === 'jewellery'
                      ? 'bg-[#171311] text-[#F7F1E8]'
                      : 'bg-[#D9C3A0]/40 text-[#30231D] hover:bg-[#D9C3A0]/70'
                  }`}
                >
                  Jewellery
                </button>
              )}
              {WATCH_CATEGORIES.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory('watches')}
                  className={`px-3.5 py-1.5 text-xs font-medium tracking-wide whitespace-nowrap shrink-0 transition-colors ${
                    selectedCategory === 'watches'
                      ? 'bg-[#171311] text-[#F7F1E8]'
                      : 'bg-[#D9C3A0]/40 text-[#30231D] hover:bg-[#D9C3A0]/70'
                  }`}
                >
                  Watches
                </button>
              )}
              {POPULATED_CATEGORIES.map((cat) => (
                <button
                  key={cat.slug}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-3.5 py-1.5 text-xs font-medium tracking-wide whitespace-nowrap shrink-0 transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-[#171311] text-[#F7F1E8]'
                      : 'bg-[#D9C3A0]/40 text-[#30231D] hover:bg-[#D9C3A0]/70'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Grid — 2 products per row on mobile */}
        {filteredProducts.length === 0 ? (
          <div className="bg-[#F7F1E8] border border-[#B08D57]/30 p-10 sm:p-14 text-center">
            <p className="font-display text-2xl sm:text-3xl font-semibold text-[#30231D]">
              {hasActiveFilters
                ? 'No matching pieces found'
                : 'Collection Additions Coming Soon'}
            </p>
            <p className="mt-2 text-sm text-[#30231D]/75 max-w-md mx-auto">
              {hasActiveFilters
                ? 'Try adjusting your search or clearing the active filters.'
                : 'Pieces for this category are currently being curated and will appear here once added to the Zivora By Stuti catalogue.'}
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="mt-5 px-6 py-2.5 text-xs font-medium tracking-wider uppercase bg-[#171311] text-[#F7F1E8] hover:bg-[#30231D] transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
