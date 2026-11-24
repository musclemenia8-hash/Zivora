import React from 'react';
import { ArrowRight } from 'lucide-react';
import {
  JEWELLERY_CATEGORIES,
  POPULATED_CATEGORIES,
  WATCH_CATEGORIES,
} from '../data/categories';
import { useStore } from '../context/StoreContext';
import { CategoryInfo } from '../types';
import { MediaImage } from './MediaSlots';

export const ShopByCategory: React.FC = () => {
  const { navigate } = useStore();

  const renderCategoryGrid = (items: CategoryInfo[], groupTitle: string, groupSlug: string) => {
    if (items.length === 0) return null;

    return (
      <div className="mt-14 first:mt-0">
        <div className="flex items-baseline justify-between gap-4 pb-3.5 border-b border-[#30231D]/15 mb-7">
          <h3 className="font-display text-2xl sm:text-3xl font-semibold tracking-wide text-[#30231D]">
            {groupTitle}
          </h3>
          <button
            type="button"
            onClick={() => navigate({ name: 'category', slug: groupSlug })}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-wider uppercase text-[#30231D] hover:text-[#B76E79] transition-colors whitespace-nowrap"
          >
            <span>Explore {groupTitle}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 2 cards per row on mobile */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-7">
          {items.map((cat) => (
            <button
              key={cat.slug}
              type="button"
              onClick={() => navigate({ name: 'category', slug: cat.slug })}
              className="group text-left bg-[#F7F1E8] border border-[#B08D57]/30 overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_42px_-16px_rgba(23,19,17,0.28)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
            >
              <MediaImage
                src={cat.image}
                alt={cat.name}
                placeholderTitle={cat.name}
                variant="dark"
                icon={cat.group === 'Watches' ? 'watch' : 'jewellery'}
                className="w-full aspect-[4/5]"
                imgClassName="w-full h-full object-contain bg-[#18120F] transition-transform duration-700 ease-out group-hover:scale-[1.035]"
              />
              <div className="p-3.5 sm:p-5 flex items-center justify-between gap-2 border-t border-[#B08D57]/25 bg-[#F7F1E8]">
                <div className="min-w-0">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-[#B08D57] font-medium">
                    {cat.group}
                  </span>
                  <span className="mt-0.5 block font-display text-lg sm:text-xl font-semibold text-[#30231D] group-hover:text-[#B76E79] transition-colors truncate">
                    {cat.name}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-[#B08D57] group-hover:text-[#B76E79] shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
              </div>
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="py-16 sm:py-22 bg-[#D9C3A0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-[11px] uppercase tracking-[0.28em] text-[#B76E79] font-semibold">
            Curated Collections
          </p>
          <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-[#30231D] text-balance">
            Shop by Category
          </h2>
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="h-px w-10 bg-[#B08D57]/60" />
            <span className="w-1.5 h-1.5 rotate-45 bg-[#B76E79]" />
            <span className="h-px w-10 bg-[#B08D57]/60" />
          </div>
        </div>

        {POPULATED_CATEGORIES.length === 0 ? (
          <div className="max-w-xl mx-auto bg-[#F7F1E8] border border-[#B08D57]/30 p-10 text-center">
            <p className="font-display text-2xl font-semibold text-[#30231D]">
              Collections Coming Soon
            </p>
            <p className="mt-2 text-sm text-[#30231D]/75">
              Curated jewellery and watch categories will appear here as pieces are added to the catalogue.
            </p>
          </div>
        ) : (
          <>
            {renderCategoryGrid(JEWELLERY_CATEGORIES, 'Jewellery', 'jewellery')}
            {renderCategoryGrid(WATCH_CATEGORIES, 'Watches', 'watches')}
          </>
        )}
      </div>
    </section>
  );
};
