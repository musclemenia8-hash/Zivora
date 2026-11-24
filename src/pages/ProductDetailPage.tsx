import React, { useMemo, useRef, useState } from 'react';
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  ZoomIn,
  X,
} from 'lucide-react';
import { BRAND } from '../config/brand';
import { PRODUCTS } from '../data/products';
import { CUSTOMER_REVIEWS } from '../data/reviews';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/format';
import { MediaImage } from '../components/MediaSlots';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  productId: string;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ productId }) => {
  const { navigate, addToCart, toggleWishlist, isInWishlist } = useStore();

  const product = PRODUCTS.find((p) => p.id === productId);
  const [selectedImageIdx, setSelectedImageIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const relatedProducts = useMemo(() => {
    if (!product) return [];
    return PRODUCTS.filter((p) => p.id !== product.id && p.group === product.group).slice(0, 4);
  }, [product]);

  const productReviews = useMemo(() => {
    if (!product) return [];
    return CUSTOMER_REVIEWS.filter((r) => !r.productId || r.productId === product.id);
  }, [product]);

  if (!product) {
    return (
      <main className="min-h-[65vh] bg-[#D9C3A0] py-16 px-4">
        <div className="max-w-xl mx-auto bg-[#F7F1E8] border border-[#B08D57]/35 p-8 text-center">
          <h1 className="font-display text-3xl font-semibold text-[#30231D]">Product Not Found</h1>
          <p className="mt-2 text-sm text-[#30231D]/75">
            The selected catalogue item could not be found.
          </p>
          <button
            type="button"
            onClick={() => navigate({ name: 'home' })}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 text-xs font-medium bg-[#171311] text-[#F7F1E8] hover:bg-[#30231D]"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </button>
        </div>
      </main>
    );
  }

  const images = product.images.length > 0 ? product.images : [''];
  const safeImageIdx = Math.min(selectedImageIdx, images.length - 1);
  const wishlisted = isInWishlist(product.id);

  const handlePrevImage = () => {
    setSelectedImageIdx((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleNextImage = () => {
    setSelectedImageIdx((prev) => (prev + 1) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || images.length <= 1) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    if (delta > 40) {
      handlePrevImage();
    } else if (delta < -40) {
      handleNextImage();
    }
    touchStartX.current = null;
  };

  const handleWhatsAppEnquiry = () => {
    const message = [
      `Hello ${BRAND.name},`,
      `I would like to enquire about this product:`,
      `• Product: ${product.name}`,
      `• Product ID: ${product.id}`,
      `• Category: ${product.category}`,
      `• Price: ${formatPrice(product.price)}`,
      `• Quantity: ${quantity}`,
    ].join('\n');

    window.open(
      `${BRAND.whatsappUrl}?text=${encodeURIComponent(message)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <main className="bg-[#D9C3A0] pb-16">
      {/* Top Breadcrumb Bar */}
      <div className="bg-[#171311] text-[#F7F1E8] border-b border-[#B08D57]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate({ name: 'home' })}
            className="inline-flex items-center gap-2 text-xs text-[#D9C3A0] hover:text-[#F7F1E8] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-[#D9C3A0]/75">
            <button
              type="button"
              onClick={() => navigate({ name: 'category', slug: product.categorySlug })}
              className="hover:text-[#F7F1E8] transition-colors"
            >
              {product.category}
            </button>
            <span aria-hidden="true">/</span>
            <span className="text-[#F7F1E8] truncate max-w-[180px] sm:max-w-xs">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Main PDP Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Left: Gallery with Mobile Swipe & Zoom */}
          <div className="lg:col-span-6 space-y-3">
            <div
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              className="relative bg-[#F7F1E8] border border-[#B08D57]/35 overflow-hidden group"
            >
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                className="block w-full text-left focus:outline-none"
                aria-label="Open enlarged product photograph"
              >
                <MediaImage
                  src={images[safeImageIdx]}
                  alt={`${product.name} — View ${safeImageIdx + 1}`}
                  placeholderTitle={product.name}
                  variant="dark"
                  icon={product.group === 'Watches' ? 'watch' : 'jewellery'}
                  className="w-full aspect-[4/5]"
                  imgClassName="w-full h-full object-contain bg-[#18120F] transition-transform duration-500 ease-out group-hover:scale-[1.03] cursor-zoom-in"
                />
              </button>

              {/* Zoom Trigger */}
              <button
                type="button"
                onClick={() => setIsZoomOpen(true)}
                aria-label="Zoom product photograph"
                className="absolute bottom-3 right-3 w-10 h-10 bg-[#171311]/85 text-[#F7F1E8] border border-[#B08D57]/45 flex items-center justify-center hover:bg-[#171311] transition-colors"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              {/* Prev / Next Gallery Arrows */}
              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrevImage}
                    aria-label="Previous image"
                    className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#F7F1E8]/90 text-[#30231D] border border-[#B08D57]/40 flex items-center justify-center hover:bg-[#171311] hover:text-[#F7F1E8] transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNextImage}
                    aria-label="Next image"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#F7F1E8]/90 text-[#30231D] border border-[#B08D57]/40 flex items-center justify-center hover:bg-[#171311] hover:text-[#F7F1E8] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3">
              {images.map((imgSrc, idx) => (
                <button
                  key={`${product.id}-thumb-${idx}`}
                  type="button"
                  onClick={() => setSelectedImageIdx(idx)}
                  aria-label={`Select photograph ${idx + 1}`}
                  className={`border overflow-hidden transition-all ${
                    idx === safeImageIdx
                      ? 'border-[#B76E79] ring-1 ring-[#B76E79]'
                      : 'border-[#B08D57]/30 opacity-80 hover:opacity-100'
                  }`}
                >
                  <MediaImage
                    src={imgSrc}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    placeholderTitle={product.name}
                    variant="dark"
                    icon={product.group === 'Watches' ? 'watch' : 'jewellery'}
                    className="w-full aspect-[4/5]"
                    imgClassName="w-full h-full object-contain bg-[#18120F]"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Contiguous Purchase Module */}
          <div className="lg:col-span-6 bg-[#F7F1E8] border border-[#B08D57]/35 p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.18em] text-[#30231D]/70">
                <span>{product.group}</span>
                <span aria-hidden="true">·</span>
                <span>{product.category}</span>
                {product.isBestseller && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#B76E79] font-semibold">Best Seller</span>
                  </>
                )}
              </div>

              <h1 className="mt-2 font-display text-3xl sm:text-4xl font-semibold text-[#30231D] leading-tight">
                {product.name}
              </h1>

              <p className="mt-3 text-xl sm:text-2xl font-semibold text-[#30231D] tabular-nums">
                {formatPrice(product.price)}
              </p>

              <p className="mt-1 text-xs text-[#30231D]/70">
                Availability:{' '}
                <span className="font-medium text-[#30231D]">
                  {product.available ? 'Available in Catalogue' : 'Currently Unavailable'}
                </span>
              </p>
            </div>

            <div className="pt-4 border-t border-[#B08D57]/25">
              <p className="text-sm sm:text-base text-[#30231D]/85 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Available Specifications */}
            {product.specifications.length > 0 && (
              <div className="pt-4 border-t border-[#B08D57]/25">
                <h2 className="text-xs uppercase tracking-[0.18em] text-[#B08D57] font-semibold mb-3">
                  Available Specifications
                </h2>
                <dl className="divide-y divide-[#B08D57]/20 border border-[#B08D57]/25 bg-[#D9C3A0]/15">
                  <div className="px-4 py-2.5 flex items-center justify-between text-sm">
                    <dt className="text-[#30231D]/70">Catalogue ID</dt>
                    <dd className="font-medium text-[#30231D] tabular-nums">{product.id}</dd>
                  </div>
                  {product.specifications.map((spec) => (
                    <div
                      key={spec.label}
                      className="px-4 py-2.5 flex items-center justify-between text-sm"
                    >
                      <dt className="text-[#30231D]/70">{spec.label}</dt>
                      <dd className="font-medium text-[#30231D]">{spec.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="pt-4 border-t border-[#B08D57]/25">
              <label className="block text-xs uppercase tracking-[0.18em] text-[#30231D]/75 font-semibold mb-2.5">
                Quantity
              </label>
              <div className="inline-flex items-center border border-[#B08D57]/45 bg-white/80">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  className="w-11 h-11 flex items-center justify-center text-[#30231D] hover:bg-[#D9C3A0]/40 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span
                  aria-live="polite"
                  className="w-12 text-center text-sm font-semibold text-[#30231D] tabular-nums"
                >
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                  className="w-11 h-11 flex items-center justify-center text-[#30231D] hover:bg-[#D9C3A0]/40 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => addToCart(product.id, quantity)}
                  disabled={!product.available}
                  className="h-12 px-5 inline-flex items-center justify-center gap-2 text-sm font-medium bg-[#171311] text-[#F7F1E8] hover:bg-[#30231D] disabled:opacity-50 transition-colors"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  type="button"
                  onClick={() =>
                    navigate({
                      name: 'checkout',
                      buyNowProductId: product.id,
                      buyNowQuantity: quantity,
                    })
                  }
                  disabled={!product.available}
                  className="h-12 px-5 inline-flex items-center justify-center gap-2 text-sm font-medium bg-[#B76E79] text-[#F7F1E8] hover:bg-[#9B5661] disabled:opacity-50 transition-colors"
                >
                  <span>Buy Now</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => toggleWishlist(product.id)}
                  className={`h-11 px-4 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-medium border transition-colors ${
                    wishlisted
                      ? 'bg-[#B76E79]/15 border-[#B76E79] text-[#B76E79]'
                      : 'border-[#B08D57]/50 text-[#30231D] hover:border-[#30231D]'
                  }`}
                >
                  <Heart className="w-4 h-4" fill={wishlisted ? 'currentColor' : 'none'} />
                  <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppEnquiry}
                  className="h-11 px-4 inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-medium border border-[#30231D] text-[#30231D] hover:bg-[#171311] hover:text-[#F7F1E8] transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Enquiry</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Genuine Customer Reviews for Product */}
        <section className="mt-12 sm:mt-16 bg-[#F7F1E8] border border-[#B08D57]/30 p-6 sm:p-8">
          <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#30231D]">
            Customer Reviews
          </h2>
          {productReviews.length === 0 ? (
            <p className="mt-2 text-sm text-[#30231D]/75">
              No verified customer reviews have been added for this piece yet.
            </p>
          ) : (
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
              {productReviews.map((review) => (
                <article
                  key={review.id}
                  className="p-4 border border-[#B08D57]/25 bg-[#D9C3A0]/20"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="font-display text-lg font-semibold text-[#30231D]">
                      {review.customerName}
                    </span>
                    <div className="flex items-center gap-0.5 text-[#B08D57]">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className="w-3.5 h-3.5"
                          fill={i < review.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-[#30231D]/85">{review.text}</p>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-12 sm:mt-16">
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#30231D] mb-6">
              Related Pieces
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Image Zoom Lightbox Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 bg-[#171311]/90 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Zoomed product photograph"
        >
          <button
            type="button"
            onClick={() => setIsZoomOpen(false)}
            aria-label="Close zoom view"
            className="absolute top-4 right-4 w-11 h-11 bg-[#F7F1E8] text-[#171311] flex items-center justify-center hover:bg-[#D9C3A0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-lg w-full bg-[#18120F] border border-[#B08D57]/50 overflow-hidden">
            <MediaImage
              src={images[safeImageIdx]}
              alt={`${product.name} Zoom View`}
              placeholderTitle={product.name}
              variant="dark"
              icon={product.group === 'Watches' ? 'watch' : 'jewellery'}
              className="w-full aspect-[4/5]"
              imgClassName="w-full h-full object-contain bg-[#18120F]"
            />
          </div>
        </div>
      )}
    </main>
  );
};
