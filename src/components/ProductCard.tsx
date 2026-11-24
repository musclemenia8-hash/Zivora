import React from 'react';
import { Heart, ShoppingBag } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Product } from '../types';
import { formatPrice } from '../utils/format';
import { MediaImage } from './MediaSlots';

interface ProductCardProps {
  product: Product;
  large?: boolean;
  showBestsellerLabel?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  large = false,
  showBestsellerLabel = false,
}) => {
  const { navigate, addToCart, toggleWishlist, isInWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);

  const handleOpenProduct = () => {
    navigate({ name: 'product', id: product.id });
  };

  return (
    <article className="group flex flex-col bg-[#F7F1E8] border border-[#B08D57]/25 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-12px_rgba(23,19,17,0.24)]">
      {/* Image Frame */}
      <div className="relative overflow-hidden bg-[#18120F]">
        <button
          type="button"
          onClick={handleOpenProduct}
          className="block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
          aria-label={`View ${product.name}`}
        >
          <MediaImage
            src={product.images[0]}
            alt={product.name}
            placeholderTitle={product.name}
            variant="dark"
            icon={product.group === 'Watches' ? 'watch' : 'jewellery'}
            className="w-full aspect-[4/5]"
            imgClassName="w-full h-full object-contain bg-[#18120F] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          />
        </button>

        {/* Minimal Wishlist Heart Icon */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          aria-label={wishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
          className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-xs transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79] ${
            wishlisted
              ? 'bg-[#B76E79] text-[#F7F1E8] shadow-sm'
              : 'bg-[#171311]/55 text-[#F7F1E8] hover:bg-[#B76E79] hover:text-[#F7F1E8]'
          }`}
        >
          <Heart className="w-4 h-4" strokeWidth={1.65} fill={wishlisted ? 'currentColor' : 'none'} />
        </button>
      </div>

      {/* Product Metadata & Actions */}
      <div className="flex flex-col flex-1 p-3.5 sm:p-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] sm:text-[11px] tracking-[0.16em] uppercase text-[#30231D]/65">
          <span>{product.category}</span>
          {(showBestsellerLabel || product.isBestseller) && (
            <>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#B76E79]">Best Seller</span>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={handleOpenProduct}
          className="mt-1.5 text-left focus:outline-none focus-visible:underline"
        >
          <h3
            className={`font-display font-semibold text-[#30231D] leading-snug group-hover:text-[#B76E79] transition-colors line-clamp-2 ${
              large ? 'text-lg sm:text-2xl' : 'text-base sm:text-xl'
            }`}
          >
            {product.name}
          </h3>
        </button>

        <p className="mt-1.5 text-xs sm:text-sm font-medium tracking-wide text-[#30231D]/85 tabular-nums">
          {formatPrice(product.price)}
        </p>

        <div className="mt-auto pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => addToCart(product.id, 1)}
            disabled={!product.available}
            className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 text-[11px] font-medium tracking-[0.1em] uppercase bg-[#171311] text-[#F7F1E8] hover:bg-[#30231D] disabled:opacity-50 transition-colors whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
          >
            <ShoppingBag className="w-3.5 h-3.5 shrink-0" strokeWidth={1.6} />
            <span>{product.available ? 'Add to Cart' : 'Unavailable'}</span>
          </button>

          <button
            type="button"
            onClick={handleOpenProduct}
            className="py-1.5 sm:px-2 text-xs font-medium text-[#30231D] hover:text-[#B76E79] underline underline-offset-4 decoration-[#B08D57]/60 hover:decoration-[#B76E79] transition-colors whitespace-nowrap text-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
};
