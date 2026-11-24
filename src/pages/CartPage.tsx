import React from 'react';
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { calculateOrderTotals, formatPrice } from '../utils/format';
import { MediaImage } from '../components/MediaSlots';

export const CartPage: React.FC = () => {
  const {
    cart,
    getProductById,
    updateCartQuantity,
    removeFromCart,
    navigate,
  } = useStore();

  const resolvedItems = cart
    .map((item) => {
      const product = getProductById(item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((entry): entry is NonNullable<typeof entry> => entry !== null);

  const totals = calculateOrderTotals(resolvedItems);

  return (
    <main className="min-h-[70vh] bg-[#D9C3A0] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#30231D]/20">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#B76E79] font-semibold">
              Your Selection
            </p>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-[#30231D]">
              Shopping Bag
            </h1>
          </div>
          <button
            type="button"
            onClick={() => navigate({ name: 'all-products' })}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#30231D] hover:text-[#B76E79] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue Shopping</span>
          </button>
        </div>

        {resolvedItems.length === 0 ? (
          <div className="bg-[#F7F1E8] border border-[#B08D57]/35 p-10 sm:p-14 text-center max-w-2xl mx-auto">
            <div className="w-14 h-14 mx-auto border border-[#B08D57]/40 bg-[#D9C3A0]/25 text-[#B08D57] flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#30231D]">
              Your Shopping Bag is Empty
            </h2>
            <p className="mt-2 text-sm text-[#30231D]/75 max-w-md mx-auto">
              Explore our curated Jewellery and Watches collections to add your chosen pieces.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => navigate({ name: 'all-products' })}
                className="px-6 py-3 text-xs sm:text-sm font-medium bg-[#171311] text-[#F7F1E8] hover:bg-[#30231D] transition-colors"
              >
                Explore All Products
              </button>
              <button
                type="button"
                onClick={() => navigate({ name: 'home' })}
                className="px-6 py-3 text-xs sm:text-sm font-medium border border-[#30231D]/40 text-[#30231D] hover:bg-[#D9C3A0]/40 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Cart Items List */}
            <div className="lg:col-span-8 space-y-4">
              {resolvedItems.map(({ product, quantity }) => {
                const lineTotal =
                  product.price !== null ? formatPrice(product.price * quantity) : 'Price on Request';
                return (
                  <article
                    key={product.id}
                    className="bg-[#F7F1E8] border border-[#B08D57]/30 p-4 sm:p-5 flex flex-col sm:flex-row gap-4 sm:items-center"
                  >
                    <button
                      type="button"
                      onClick={() => navigate({ name: 'product', id: product.id })}
                      className="w-24 h-24 sm:w-28 sm:h-28 shrink-0 border border-[#B08D57]/30 overflow-hidden"
                    >
                      <MediaImage
                        src={product.images[0]}
                        alt={product.name}
                        placeholderTitle={product.category}
                        variant="dark"
                        icon={product.group === 'Watches' ? 'watch' : 'jewellery'}
                        className="w-full h-full"
                        imgClassName="w-full h-full object-contain bg-[#18120F]"
                      />
                    </button>

                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] uppercase tracking-wider text-[#B08D57]">
                        {product.category} · {product.id}
                      </p>
                      <button
                        type="button"
                        onClick={() => navigate({ name: 'product', id: product.id })}
                        className="mt-0.5 text-left font-display text-xl font-semibold text-[#30231D] hover:text-[#B76E79] transition-colors"
                      >
                        {product.name}
                      </button>
                      <p className="mt-1 text-sm text-[#30231D]/80 tabular-nums">
                        Unit Price: {formatPrice(product.price)}
                      </p>
                    </div>

                    <div className="flex items-center justify-between sm:flex-col sm:items-end gap-3">
                      <div className="inline-flex items-center border border-[#B08D57]/45 bg-white/80">
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(product.id, Math.max(1, quantity - 1))}
                          aria-label={`Decrease quantity for ${product.name}`}
                          className="w-9 h-9 flex items-center justify-center text-[#30231D] hover:bg-[#D9C3A0]/40"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-10 text-center text-sm font-semibold tabular-nums">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateCartQuantity(product.id, quantity + 1)}
                          aria-label={`Increase quantity for ${product.name}`}
                          className="w-9 h-9 flex items-center justify-center text-[#30231D] hover:bg-[#D9C3A0]/40"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm sm:text-base font-semibold text-[#30231D] tabular-nums">
                          {lineTotal}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeFromCart(product.id)}
                          aria-label={`Remove ${product.name} from bag`}
                          className="p-2 text-[#30231D]/65 hover:text-[#B76E79] transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

            {/* Order Summary */}
            <aside className="lg:col-span-4 bg-[#171311] text-[#F7F1E8] border border-[#B08D57]/40 p-6 space-y-5">
              <h2 className="font-display text-2xl font-semibold text-[#D9C3A0]">
                Bag Summary
              </h2>

              <dl className="space-y-3 text-sm border-y border-[#B08D57]/25 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-[#D9C3A0]/80">Items</dt>
                  <dd className="tabular-nums font-medium">
                    {resolvedItems.reduce((sum, item) => sum + item.quantity, 0)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-[#D9C3A0]/80">Subtotal</dt>
                  <dd className="tabular-nums font-medium">{totals.formattedTotal}</dd>
                </div>
                <div className="flex items-center justify-between text-base pt-2 border-t border-[#B08D57]/20">
                  <dt className="font-semibold text-[#F7F1E8]">Total</dt>
                  <dd className="font-semibold text-[#D9C3A0] tabular-nums">
                    {totals.formattedTotal}
                  </dd>
                </div>
              </dl>

              <div className="space-y-3">
                <button
                  type="button"
                  onClick={() => navigate({ name: 'checkout' })}
                  className="w-full h-12 px-5 bg-[#B76E79] text-[#F7F1E8] text-sm font-medium hover:bg-[#9B5661] transition-colors"
                >
                  Proceed to Checkout
                </button>
                <button
                  type="button"
                  onClick={() => navigate({ name: 'all-products' })}
                  className="w-full h-11 px-5 border border-[#B08D57]/45 text-[#D9C3A0] text-xs sm:text-sm font-medium hover:text-[#F7F1E8] hover:border-[#F7F1E8] transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};
