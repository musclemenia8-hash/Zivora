import React from 'react';
import { ArrowRight } from 'lucide-react';
import { BRAND } from '../config/brand';
import { MEDIA_ASSETS } from '../config/media';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { MainCinematicShowcase } from '../components/MainCinematicShowcase';
import { MediaImage, MediaVideo } from '../components/MediaSlots';
import { ProductCard } from '../components/ProductCard';
import { ProductCatalogue } from '../components/ProductCatalogue';
import { CustomerReviewsSection, FaqSection } from '../components/ReviewsAndFaq';
import { ShopByCategory } from '../components/ShopByCategory';

export const HomePage: React.FC = () => {
  const { navigate } = useStore();

  const bestsellers = PRODUCTS.filter((p) => p.isBestseller && p.available);
  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured && p.available).slice(0, 6);

  return (
    <main>
      {/* 2. FIRST LUXURY HERO BANNER */}
      <section aria-label="Primary Luxury Banner" className="bg-[#171311] border-b border-[#B08D57]/25">
        <div className="max-w-7xl mx-auto">
          {MEDIA_ASSETS.banners.banner1 ? (
            <img
              src={MEDIA_ASSETS.banners.banner1}
              alt={`${BRAND.name} Collection`}
              referrerPolicy="no-referrer"
              className="w-full h-auto object-contain block"
            />
          ) : (
            <div className="relative overflow-hidden py-16 sm:py-22 lg:py-26 px-6 bg-[radial-gradient(ellipse_at_center,rgba(176,141,87,0.18)_0%,rgba(23,19,17,1)_72%)] text-center flex flex-col items-center justify-center">
              <div className="absolute inset-4 sm:inset-7 border border-[#B08D57]/25 pointer-events-none" />
              {MEDIA_ASSETS.logo && (
                <img
                  src={MEDIA_ASSETS.logo}
                  alt={BRAND.name}
                  referrerPolicy="no-referrer"
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-contain mb-6 shadow-[0_16px_48px_rgba(0,0,0,0.7)]"
                />
              )}
              <p className="text-[11px] uppercase tracking-[0.32em] text-[#B08D57] font-medium">
                {BRAND.businessType}
              </p>
              <h1 className="mt-2.5 font-display text-4xl sm:text-6xl lg:text-7xl font-medium tracking-wide text-[#F7F1E8] text-balance">
                {BRAND.name}
              </h1>
              <p className="mt-3 font-editorial italic text-xl sm:text-2xl text-[#D9C3A0]">
                {BRAND.tagline}
              </p>
              <button
                type="button"
                onClick={() => navigate({ name: 'all-products' })}
                className="mt-8 inline-flex items-center gap-2.5 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] bg-[#B08D57] text-[#171311] hover:bg-[#D9C3A0] transition-colors"
              >
                <span>Explore Collection</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* 3 & 4. MAIN CINEMATIC VIDEO SHOWCASE & THREE PHOTOGRAPHS */}
      <MainCinematicShowcase />

      {/* 5. SHOP BY CATEGORY (Populated Categories Only) */}
      <ShopByCategory />

      {/* 6. CATEGORY VIDEO SECTION */}
      <section aria-label="Collection Film" className="bg-[#171311] py-12 sm:py-16 border-y border-[#B08D57]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#B76E79] font-medium">
              Atelier Craftsmanship
            </p>
            <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-medium text-[#F7F1E8]">
              Jewellery &amp; Timepieces in Motion
            </h2>
          </div>
          <MediaVideo
            src={MEDIA_ASSETS.categoryVideo}
            label="Jewellery & Timepieces"
            className="w-full aspect-[16/9]"
          />
        </div>
      </section>

      {/* 7. SECOND LUXURY BANNER */}
      <section aria-label="Editorial Showcase Banner" className="bg-[#30231D]">
        <div className="max-w-7xl mx-auto">
          <MediaImage
            src={MEDIA_ASSETS.banners.banner2}
            alt={`${BRAND.name} Editorial Showcase`}
            placeholderTitle={BRAND.name}
            variant="champagne"
            icon="banner"
            className="w-full aspect-[16/7] sm:aspect-[16/6]"
            imgClassName="w-full h-full object-contain"
          />
        </div>
      </section>

      {/* 8. BESTSELLERS */}
      {bestsellers.length > 0 && (
        <section className="py-16 sm:py-22 bg-[#D9C3A0]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-[#B76E79] font-semibold">
                  Most Admired
                </p>
                <h2 className="mt-1.5 font-display text-4xl sm:text-5xl font-semibold text-[#30231D] text-balance">
                  Bestsellers
                </h2>
              </div>
              <button
                type="button"
                onClick={() => navigate({ name: 'bestsellers' })}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium tracking-wider uppercase text-[#30231D] hover:text-[#B76E79] transition-colors whitespace-nowrap self-start sm:self-auto"
              >
                <span>View All Bestsellers</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-7">
              {bestsellers.map((product) => (
                <ProductCard key={product.id} product={product} showBestsellerLabel />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 9. FEATURED MASTERPIECES — ELEVATED LUXURY SHOWCASE */}
      {featuredProducts.length > 0 && (
        <section className="py-16 sm:py-24 bg-[#F7F1E8] border-y border-[#B08D57]/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
              <p className="text-[11px] uppercase tracking-[0.3em] text-[#B76E79] font-semibold">
                Signature Atelier Selection
              </p>
              <h2 className="mt-2 font-display text-4xl sm:text-5xl font-semibold text-[#30231D] text-balance">
                Featured Masterpieces
              </h2>
              <div className="mt-4 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-[#B08D57]/60" />
                <span className="w-1.5 h-1.5 rotate-45 bg-[#B76E79]" />
                <span className="h-px w-12 bg-[#B08D57]/60" />
              </div>
              <p className="mt-4 text-sm text-[#30231D]/75 leading-relaxed">
                Curated pieces from the {BRAND.name} collection selected for timeless radiance and poise.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} large />
              ))}
            </div>

            <div className="mt-12 text-center">
              <button
                type="button"
                onClick={() => navigate({ name: 'featured' })}
                className="inline-flex items-center gap-2 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.18em] border border-[#30231D]/35 text-[#30231D] hover:bg-[#171311] hover:text-[#F7F1E8] hover:border-[#171311] transition-colors"
              >
                <span>Explore Featured Masterpieces</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* 10. FEATURED SECTION VIDEO */}
      <section aria-label="Featured Masterpieces Film" className="bg-[#171311] py-12 sm:py-16 border-b border-[#B08D57]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#B76E79] font-medium">
              Atelier Spotlight
            </p>
            <h2 className="mt-1.5 font-display text-3xl sm:text-4xl font-medium text-[#F7F1E8]">
              Featured Masterpieces Film
            </h2>
          </div>
          <MediaVideo
            src={MEDIA_ASSETS.featuredVideo}
            label="Featured Masterpieces"
            className="w-full aspect-[16/9]"
          />
        </div>
      </section>

      {/* 11. THIRD LUXURY BANNER */}
      <section aria-label="Heritage Banner" className="bg-[#30231D]">
        <div className="max-w-7xl mx-auto">
          <MediaImage
            src={MEDIA_ASSETS.banners.banner3}
            alt={`${BRAND.name} Heritage Banner`}
            placeholderTitle={BRAND.name}
            variant="dark"
            icon="banner"
            className="w-full aspect-[16/7] sm:aspect-[16/6]"
            imgClassName="w-full h-full object-contain"
          />
        </div>
      </section>

      {/* 12. ALL PRODUCTS CATALOGUE */}
      <ProductCatalogue
        id="all-products-section"
        title="All Products"
        subtitle="Complete Catalogue"
      />

      {/* 13. CUSTOMER REVIEWS */}
      <CustomerReviewsSection />

      {/* 14. FAQ */}
      <FaqSection />
    </main>
  );
};
