import React, { useMemo, useState } from 'react';
import { ArrowLeft, MessageCircle, ShoppingBag } from 'lucide-react';
import { BRAND } from '../config/brand';
import { useStore } from '../context/StoreContext';
import { CheckoutCustomer } from '../types';
import { calculateOrderTotals, formatPrice } from '../utils/format';
import { MediaImage } from '../components/MediaSlots';

interface CheckoutPageProps {
  buyNowProductId?: string;
  buyNowQuantity?: number;
}

type FormErrors = Partial<Record<keyof CheckoutCustomer, string>>;

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  buyNowProductId,
  buyNowQuantity = 1,
}) => {
  const { cart, getProductById, navigate } = useStore();

  const [customer, setCustomer] = useState<CheckoutCustomer>({
    fullName: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pinCode: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [whatsappOpened, setWhatsappOpened] = useState(false);

  const isBuyNow = Boolean(buyNowProductId);

  const orderItems = useMemo(() => {
    if (buyNowProductId) {
      const product = getProductById(buyNowProductId);
      return product ? [{ product, quantity: Math.max(1, buyNowQuantity) }] : [];
    }
    return cart
      .map((item) => {
        const product = getProductById(item.productId);
        return product ? { product, quantity: item.quantity } : null;
      })
      .filter((entry): entry is NonNullable<typeof entry> => entry !== null);
  }, [buyNowProductId, buyNowQuantity, cart, getProductById]);

  const totals = calculateOrderTotals(orderItems);

  const validateForm = (): boolean => {
    const nextErrors: FormErrors = {};

    if (!customer.fullName.trim() || customer.fullName.trim().length < 2) {
      nextErrors.fullName = 'Please enter your full name.';
    }

    const digitsOnlyPhone = customer.mobile.replace(/\D/g, '');
    if (digitsOnlyPhone.length < 10 || digitsOnlyPhone.length > 13) {
      nextErrors.mobile = 'Please enter a valid 10-digit mobile number.';
    }

    if (!customer.address.trim() || customer.address.trim().length < 5) {
      nextErrors.address = 'Please enter your complete delivery address.';
    }

    if (!customer.city.trim()) {
      nextErrors.city = 'Please enter your city.';
    }

    if (!customer.state.trim()) {
      nextErrors.state = 'Please enter your state.';
    }

    const pinDigits = customer.pinCode.replace(/\D/g, '');
    if (pinDigits.length !== 6) {
      nextErrors.pinCode = 'Please enter a valid 6-digit PIN code.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleFieldChange = (field: keyof CheckoutCustomer, value: string) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSendWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderItems.length === 0) return;
    if (!validateForm()) return;

    const productLines = orderItems.map((item, idx) => {
      const unitStr = formatPrice(item.product.price);
      const lineStr =
        item.product.price !== null
          ? formatPrice(item.product.price * item.quantity)
          : 'Price on Request';
      return `${idx + 1}. ${item.product.name} (${item.product.id}) | Qty: ${item.quantity} | Unit: ${unitStr} | Line Total: ${lineStr}`;
    });

    const message = [
      `NEW ORDER — ${BRAND.name}`,
      `Order Type: ${isBuyNow ? 'Buy Now' : 'Shopping Bag Checkout'}`,
      ``,
      `CUSTOMER DETAILS:`,
      `Full Name: ${customer.fullName.trim()}`,
      `Mobile Number: ${customer.mobile.trim()}`,
      `Address: ${customer.address.trim()}`,
      `City: ${customer.city.trim()}`,
      `State: ${customer.state.trim()}`,
      `PIN Code: ${customer.pinCode.trim()}`,
      ``,
      `ORDER ITEMS:`,
      ...productLines,
      ``,
      `ORDER TOTAL: ${totals.formattedTotal}`,
    ].join('\n');

    const whatsappLink = `${BRAND.whatsappUrl}?text=${encodeURIComponent(message)}`;
    setWhatsappOpened(true);
    window.open(whatsappLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <main className="min-h-[75vh] bg-[#D9C3A0] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 sm:mb-8 pb-4 border-b border-[#30231D]/20">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#B76E79] font-semibold">
              WhatsApp Ordering
            </p>
            <h1 className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-[#30231D]">
              Checkout
            </h1>
          </div>
          <button
            type="button"
            onClick={() => navigate(isBuyNow && buyNowProductId ? { name: 'product', id: buyNowProductId } : { name: 'cart' })}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#30231D] hover:text-[#B76E79] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{isBuyNow ? 'Back to Product' : 'Back to Shopping Bag'}</span>
          </button>
        </div>

        {orderItems.length === 0 ? (
          <div className="bg-[#F7F1E8] border border-[#B08D57]/35 p-10 text-center max-w-xl mx-auto">
            <div className="w-14 h-14 mx-auto border border-[#B08D57]/40 bg-[#D9C3A0]/25 text-[#B08D57] flex items-center justify-center mb-4">
              <ShoppingBag className="w-6 h-6" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl font-semibold text-[#30231D]">
              No Products Selected for Checkout
            </h2>
            <p className="mt-2 text-sm text-[#30231D]/75">
              Please add jewellery or watches to your Shopping Bag or select Buy Now on any product page.
            </p>
            <button
              type="button"
              onClick={() => navigate({ name: 'all-products' })}
              className="mt-6 px-6 py-3 text-xs sm:text-sm font-medium bg-[#171311] text-[#F7F1E8] hover:bg-[#30231D] transition-colors"
            >
              Browse Catalogue
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Customer Details Form */}
            <form
              onSubmit={handleSendWhatsApp}
              noValidate
              className="lg:col-span-7 bg-[#F7F1E8] border border-[#B08D57]/35 p-6 sm:p-8 space-y-5"
            >
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#30231D]">
                  Customer Delivery Details
                </h2>
                <p className="mt-1 text-xs sm:text-sm text-[#30231D]/75">
                  Fill in your details below to generate your pre-filled WhatsApp order message for {BRAND.name}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label htmlFor="fullName" className="block text-xs font-semibold uppercase tracking-wider text-[#30231D] mb-1.5">
                    Full Name *
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    required
                    value={customer.fullName}
                    onChange={(e) => handleFieldChange('fullName', e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full h-11 px-3.5 text-sm bg-white border border-[#B08D57]/40 text-[#30231D] focus:outline-none focus:border-[#B76E79]"
                  />
                  {errors.fullName && (
                    <p className="mt-1 text-xs text-[#9B5661] font-medium">{errors.fullName}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="mobile" className="block text-xs font-semibold uppercase tracking-wider text-[#30231D] mb-1.5">
                    Mobile Number *
                  </label>
                  <input
                    id="mobile"
                    type="tel"
                    required
                    value={customer.mobile}
                    onChange={(e) => handleFieldChange('mobile', e.target.value)}
                    placeholder="10-digit mobile number"
                    className="w-full h-11 px-3.5 text-sm bg-white border border-[#B08D57]/40 text-[#30231D] tabular-nums focus:outline-none focus:border-[#B76E79]"
                  />
                  {errors.mobile && (
                    <p className="mt-1 text-xs text-[#9B5661] font-medium">{errors.mobile}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="address" className="block text-xs font-semibold uppercase tracking-wider text-[#30231D] mb-1.5">
                    Complete Address *
                  </label>
                  <textarea
                    id="address"
                    rows={3}
                    required
                    value={customer.address}
                    onChange={(e) => handleFieldChange('address', e.target.value)}
                    placeholder="House / Flat No., Building, Street, Landmark"
                    className="w-full p-3.5 text-sm bg-white border border-[#B08D57]/40 text-[#30231D] focus:outline-none focus:border-[#B76E79]"
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-[#9B5661] font-medium">{errors.address}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="city" className="block text-xs font-semibold uppercase tracking-wider text-[#30231D] mb-1.5">
                    City *
                  </label>
                  <input
                    id="city"
                    type="text"
                    required
                    value={customer.city}
                    onChange={(e) => handleFieldChange('city', e.target.value)}
                    placeholder="City"
                    className="w-full h-11 px-3.5 text-sm bg-white border border-[#B08D57]/40 text-[#30231D] focus:outline-none focus:border-[#B76E79]"
                  />
                  {errors.city && (
                    <p className="mt-1 text-xs text-[#9B5661] font-medium">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="state" className="block text-xs font-semibold uppercase tracking-wider text-[#30231D] mb-1.5">
                    State *
                  </label>
                  <input
                    id="state"
                    type="text"
                    required
                    value={customer.state}
                    onChange={(e) => handleFieldChange('state', e.target.value)}
                    placeholder="State"
                    className="w-full h-11 px-3.5 text-sm bg-white border border-[#B08D57]/40 text-[#30231D] focus:outline-none focus:border-[#B76E79]"
                  />
                  {errors.state && (
                    <p className="mt-1 text-xs text-[#9B5661] font-medium">{errors.state}</p>
                  )}
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="pinCode" className="block text-xs font-semibold uppercase tracking-wider text-[#30231D] mb-1.5">
                    PIN Code *
                  </label>
                  <input
                    id="pinCode"
                    type="text"
                    inputMode="numeric"
                    maxLength={6}
                    required
                    value={customer.pinCode}
                    onChange={(e) => handleFieldChange('pinCode', e.target.value)}
                    placeholder="6-digit PIN Code"
                    className="w-full h-11 px-3.5 text-sm bg-white border border-[#B08D57]/40 text-[#30231D] tabular-nums focus:outline-none focus:border-[#B76E79]"
                  />
                  {errors.pinCode && (
                    <p className="mt-1 text-xs text-[#9B5661] font-medium">{errors.pinCode}</p>
                  )}
                </div>
              </div>

              <div className="pt-2 space-y-3">
                <button
                  type="submit"
                  className="w-full h-12 px-6 inline-flex items-center justify-center gap-2.5 bg-[#171311] text-[#F7F1E8] text-sm font-semibold tracking-wider hover:bg-[#30231D] transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-[#B76E79]" />
                  <span>SEND ORDER ON WHATSAPP</span>
                </button>

                <p className="text-xs text-[#30231D]/75 leading-relaxed">
                  Clicking above opens WhatsApp ({BRAND.whatsappDisplay}) with your formatted order details. Please send the message manually inside WhatsApp to share your order with our store.
                </p>

                {whatsappOpened && (
                  <div className="p-3.5 bg-[#D9C3A0]/40 border border-[#B08D57]/50 text-xs text-[#30231D]">
                    WhatsApp has been opened in a new tab with your order summary. Please tap Send in WhatsApp to complete sending your message.
                  </div>
                )}
              </div>
            </form>

            {/* Complete Order Summary */}
            <aside className="lg:col-span-5 bg-[#171311] text-[#F7F1E8] border border-[#B08D57]/40 p-6 sm:p-7 space-y-5">
              <div className="flex items-center justify-between border-b border-[#B08D57]/25 pb-3">
                <h2 className="font-display text-2xl font-semibold text-[#D9C3A0]">
                  Order Summary
                </h2>
                <span className="text-xs text-[#D9C3A0]/75 tabular-nums">
                  {orderItems.reduce((sum, i) => sum + i.quantity, 0)} items
                </span>
              </div>

              <ul className="divide-y divide-[#B08D57]/20 max-h-[420px] overflow-y-auto pr-1">
                {orderItems.map(({ product, quantity }) => (
                  <li key={product.id} className="py-3.5 flex items-center gap-3.5">
                    <div className="w-16 h-16 shrink-0 border border-[#B08D57]/35 overflow-hidden">
                      <MediaImage
                        src={product.images[0]}
                        alt={product.name}
                        placeholderTitle={product.category}
                        variant="dark"
                        icon={product.group === 'Watches' ? 'watch' : 'jewellery'}
                        className="w-full h-full"
                        imgClassName="w-full h-full object-contain bg-[#18120F]"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-base font-semibold text-[#F7F1E8] truncate">
                        {product.name}
                      </p>
                      <p className="text-xs text-[#D9C3A0]/75 tabular-nums">
                        Qty: {quantity} · Unit: {formatPrice(product.price)}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-semibold text-[#D9C3A0] tabular-nums">
                        {product.price !== null
                          ? formatPrice(product.price * quantity)
                          : 'Price on Request'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-[#B08D57]/30 flex items-baseline justify-between gap-3">
                <span className="text-sm uppercase tracking-wider text-[#D9C3A0]">
                  Total Amount
                </span>
                <span className="font-display text-2xl font-semibold text-[#F7F1E8] tabular-nums">
                  {totals.formattedTotal}
                </span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  );
};
