import React from 'react';
import { Check, X } from 'lucide-react';
import { Footer } from './components/Footer';
import { Navbar } from './components/Navbar';
import { NavigationDrawer } from './components/NavigationDrawer';
import { StoreProvider, useStore } from './context/StoreContext';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { ContactPage } from './pages/ContactPage';
import { HomePage } from './pages/HomePage';
import { ListingPage } from './pages/ListingPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WishlistPage } from './pages/WishlistPage';

const AppShell: React.FC = () => {
  const { view, toast, dismissToast } = useStore();

  const renderActiveView = () => {
    switch (view.name) {
      case 'home':
        return <HomePage />;
      case 'category':
        return <ListingPage key={`cat-${view.slug}`} mode="category" categorySlug={view.slug} />;
      case 'bestsellers':
        return <ListingPage key="bestsellers" mode="bestsellers" />;
      case 'featured':
        return <ListingPage key="featured" mode="featured" />;
      case 'all-products':
        return <ListingPage key="all-products" mode="all-products" />;
      case 'product':
        return <ProductDetailPage key={view.id} productId={view.id} />;
      case 'cart':
        return <CartPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'checkout':
        return (
          <CheckoutPage
            buyNowProductId={view.buyNowProductId}
            buyNowQuantity={view.buyNowQuantity}
          />
        );
      case 'contact':
        return <ContactPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#D9C3A0] text-[#30231D]">
      <Navbar />
      <NavigationDrawer />

      <div className="flex-1">{renderActiveView()}</div>

      <Footer />

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 right-4 z-50 max-w-sm bg-[#171311] text-[#F7F1E8] border border-[#B08D57]/50 px-4 py-3 shadow-xl flex items-center gap-3"
        >
          <Check className="w-4 h-4 text-[#B76E79] shrink-0" />
          <p className="text-xs sm:text-sm font-medium">{toast.message}</p>
          <button
            type="button"
            onClick={dismissToast}
            aria-label="Dismiss notification"
            className="text-[#D9C3A0]/70 hover:text-[#F7F1E8] ml-auto"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppShell />
    </StoreProvider>
  );
}
