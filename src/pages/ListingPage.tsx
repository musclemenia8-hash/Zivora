import React from 'react';
import { ArrowLeft } from 'lucide-react';
import {
  isCategoryPopulated,
  POPULATED_CATEGORIES,
} from '../data/categories';
import { useStore } from '../context/StoreContext';
import { MediaImage } from '../components/MediaSlots';
import { ProductCatalogue } from '../components/ProductCatalogue';

interface ListingPageProps {
  mode: 'category' | 'bestsellers' | 'featured' | 'all-products';
  categorySlug?: string;
}

export const ListingPage: React.FC<ListingPageProps> = ({ mode, categorySlug }) => {
  const { navigate } = useStore();

  const resolvedMode =
    mode === 'category' && categorySlug && !isCategoryPopulated(categorySlug)
      ? 'all-products'
      : mode;

  let title = 'All Products';
  let subtitle = 'Zivora By Stuti Catalogue';
  let description = 'Explore our complete collection of curated jewellery and watches.';
  let lockedSlug: string | undefined;
  let categoryImage: string | undefined;
  let parentGroup: 'Jewellery' | 'Watches' | undefined;

  if (resolvedMode === 'bestsellers') {
    title = 'Bestsellers';
    subtitle = 'Most Admired Selections';
    description = 'Signature creations from our shared catalogue.';
  } else if (resolvedMode === 'featured') {
    title = 'Featured Masterpieces';
    subtitle = 'Curated Showcase';
    description = 'Highlighted creations from Zivora By Stuti.';
  } else if (resolvedMode === 'category' && categorySlug) {
    if (categorySlug === 'jewellery') {
      title = 'Jewellery';
      subtitle = 'Fine Jewellery Collection';
      description = 'Curated pieces from our populated jewellery categories.';
      lockedSlug = 'jewellery';
    } else if (categorySlug === 'watches') {
      title = 'Watches';
      subtitle = 'Luxury Timepieces Collection';
      description = 'Curated pieces from our populated watch categories.';
      lockedSlug = 'watches';
    } else {
      const cat = POPULATED_CATEGORIES.find((c) => c.slug === categorySlug);
      title = cat ? cat.name : 'Collection';
      subtitle = cat ? cat.group : 'Collection';
      description = cat ? cat.description : 'Curated creations from Zivora By Stuti.';
      lockedSlug = categorySlug;
      categoryImage = cat?.image;
      parentGroup = cat?.group;
    }
  }

  return (
    <main className="min-h-[70vh] bg-[#D9C3A0]">
      {/* Page Header with Breadcrumb & Category Visual */}
      <div className="bg-[#171311] text-[#F7F1E8] border-b border-[#B08D57]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
            <button
              type="button"
              onClick={() => navigate({ name: 'home' })}
              className="inline-flex items-center gap-2 text-xs tracking-wider uppercase text-[#D9C3A0] hover:text-[#F7F1E8] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Home</span>
            </button>

            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-[#D9C3A0]/75">
              <button
                type="button"
                onClick={() => navigate({ name: 'home' })}
                className="hover:text-[#F7F1E8] transition-colors"
              >
                Home
              </button>
              {parentGroup && (
                <>
                  <span aria-hidden="true">/</span>
                  <button
                    type="button"
                    onClick={() => navigate({ name: 'category', slug: parentGroup.toLowerCase() })}
                    className="hover:text-[#F7F1E8] transition-colors"
                  >
                    {parentGroup}
                  </button>
                </>
              )}
              <span aria-hidden="true">/</span>
              <span className="text-[#F7F1E8]">{title}</span>
            </nav>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#B76E79] font-medium">
                {subtitle}
              </p>
              <h1 className="mt-1.5 font-display text-3xl sm:text-5xl font-semibold text-[#F7F1E8]">
                {title}
              </h1>
              <p className="mt-2 text-sm text-[#D9C3A0]/80 max-w-2xl">{description}</p>
            </div>

            {resolvedMode === 'category' &&
              lockedSlug &&
              lockedSlug !== 'jewellery' &&
              lockedSlug !== 'watches' && (
                <div className="w-28 sm:w-32 shrink-0 border border-[#B08D57]/35 overflow-hidden bg-[#18120F]">
                  <MediaImage
                    src={categoryImage}
                    alt={title}
                    placeholderTitle={title}
                    variant="dark"
                    icon={parentGroup === 'Watches' ? 'watch' : 'jewellery'}
                    className="w-full aspect-[4/5]"
                    imgClassName="w-full h-full object-contain bg-[#18120F]"
                  />
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Catalogue */}
      <ProductCatalogue
        title={title}
        lockedCategorySlug={lockedSlug}
        onlyBestsellers={resolvedMode === 'bestsellers'}
        onlyFeatured={resolvedMode === 'featured'}
        hideCategoryFilter={
          resolvedMode === 'category' &&
          !!lockedSlug &&
          lockedSlug !== 'jewellery' &&
          lockedSlug !== 'watches'
        }
      />
    </main>
  );
};
