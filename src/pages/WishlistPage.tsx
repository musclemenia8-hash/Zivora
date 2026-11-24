import React from 'react';
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { formatPrice } from '../utils/format';
import { MediaImage } from '../components/MediaSlots';

export const WishlistPage: React.FC = () => {
  const {
    wishlist,
    getProductById,
    toggleWishlist,
    moveWishlistToCart,
    navigate,
  } = useStore();

  const savedProducts = wishlist
    .map((id) => getProductById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="min-h-[70vh] bg-[#D9C3A0] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#30231D]/20">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#B76E79] font-semibold">
              Saved Pieces
            </p>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-[#30231D]">
              Wishlist
            </h1>
          </div>
          <button
            type="button"
            onClick={() => navigate({ name: 'all-products' })}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#30231D] hover:text-[#B76E79] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Explore Catalogue</span>
          </button>
        </div>

        {savedProducts.length === 0 ? (
          <div className="bg-[#F7F1E8] border border-[#B08D57]/35 p-10 sm:p-14 text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 mx-auto border border-[#B08D57]/40 bg-[#D9C3A0]/25 text-[#B76E79] flex items-center justify-center mb-4">
              <Heart className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#30231D]">
              Your Wishlist is Empty
            </h2>
            <p className="mt-2 text-sm text-[#30231D]/75 max-w-md mx-auto">
              Tap the heart icon on any jewellery piece or watch to save it here for later.
            </p>
            <button
              type="button"
              onClick={() => navigate({ name: 'all-products' })}
              className="mt-6 px-6 py-3 text-xs sm:text-sm font-medium bg-[#171311] text-[#F7F1E8] hover:bg-[#30231D] transition-colors"
            >
              Browse All Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
            {savedProducts.map((product) => (
              <article
                key={product.id}
                className="bg-[#F7F1E8] border border-[#B08D57]/30 flex flex-col"
              >
                <button
                  type="button"
                  onClick={() => navigate({ name: 'product', id: product.id })}
                  className="block w-full text-left"
                >
                  <MediaImage
                    src={product.images[0]}
                    alt={product.name}
                    placeholderTitle={product.name}
                    variant="dark"
                    icon={product.group === 'Watches' ? 'watch' : 'jewellery'}
                    className="w-full aspect-[4/5]"
                    imgClassName="w-full h-full object-contain bg-[#18120F]"
                  />
                </button>

                <div className="p-3 sm:p-4 flex flex-col flex-1">
                  <span className="text-[11px] uppercase tracking-wider text-[#30231D]/65">
                    {product.category}
                  </span>
                  <button
                    type="button"
                    onClick={() => navigate({ name: 'product', id: product.id })}
                    className="mt-1 text-left font-display text-base sm:text-lg font-semibold text-[#30231D] hover:text-[#B76E79] transition-colors line-clamp-2"
                  >
                    {product.name}
                  </button>
                  <p className="mt-1 text-sm font-medium text-[#30231D] tabular-nums">
                    {formatPrice(product.price)}
                  </p>

                  <div className="mt-auto pt-3.5 space-y-2">
                    <button
                      type="button"
                      onClick={() => moveWishlistToCart(product.id)}
                      className="w-full py-2.5 px-3 inline-flex items-center justify-center gap-1.5 text-xs font-medium bg-[#171311] text-[#F7F1E8] hover:bg-[#30231D] transition-colors"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Move to Cart</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => navigate({ name: 'product', id: product.id })}
                        className="py-2 px-2 text-xs font-medium border border-[#B08D57]/45 text-[#30231D] hover:bg-[#D9C3A0]/30 transition-colors"
                      >
                        View
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleWishlist(product.id)}
                        className="py-2 px-2 inline-flex items-center justify-center gap-1 text-xs font-medium border border-[#B76E79]/45 text-[#B76E79] hover:bg-[#B76E79] hover:text-[#F7F1E8] transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};
