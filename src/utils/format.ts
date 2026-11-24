import { Product } from '../types';

export function formatPrice(price: number | null): string {
  if (price === null || Number.isNaN(price)) {
    return 'Price on Request';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
}

export function calculateOrderTotals(
  items: Array<{ product: Product; quantity: number }>
): {
  numericSubtotal: number;
  hasUnpricedItems: boolean;
  allUnpriced: boolean;
  formattedTotal: string;
} {
  let numericSubtotal = 0;
  let hasUnpricedItems = false;
  let pricedCount = 0;

  for (const item of items) {
    if (item.product.price !== null) {
      numericSubtotal += item.product.price * item.quantity;
      pricedCount += 1;
    } else {
      hasUnpricedItems = true;
    }
  }

  const allUnpriced = items.length > 0 && pricedCount === 0;

  let formattedTotal = 'Price on Request (Confirmed via WhatsApp)';
  if (!allUnpriced && !hasUnpricedItems) {
    formattedTotal = formatPrice(numericSubtotal);
  } else if (!allUnpriced && hasUnpricedItems) {
    formattedTotal = `${formatPrice(numericSubtotal)} + Price on Request items`;
  }

  return {
    numericSubtotal,
    hasUnpricedItems,
    allUnpriced,
    formattedTotal,
  };
}
