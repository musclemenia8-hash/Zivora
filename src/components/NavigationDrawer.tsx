import React, { useEffect, useMemo } from 'react';
import { ChevronRight, X } from 'lucide-react';
import { BRAND } from '../config/brand';
import { MEDIA_ASSETS } from '../config/media';
import { JEWELLERY_CATEGORIES, WATCH_CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { AppView } from '../types';
import { LogoSlot } from './MediaSlots';

interface DrawerLink {
  label: string;
  view: AppView;
  indent?: boolean;
}

export const NavigationDrawer: React.FC = () => {
  const { isDrawerOpen, setIsDrawerOpen, navigate } = useStore();

  const drawerLinks = useMemo<DrawerLink[]>(() => {
    const links: DrawerLink[] = [{ label: 'Home', view: { name: 'home' } }];

    if (JEWELLERY_CATEGORIES.length > 0) {
      links.push({ label: 'Jewellery', view: { name: 'category', slug: 'jewellery' } });
      for (const cat of JEWELLERY_CATEGORIES) {
        links.push({
          label: cat.name,
          view: { name: 'category', slug: cat.slug },
          indent: true,
        });
      }
    }

    if (WATCH_CATEGORIES.length > 0) {
      links.push({ label: 'Watches', view: { name: 'category', slug: 'watches' } });
      for (const cat of WATCH_CATEGORIES) {
        links.push({
          label: cat.name,
          view: { name: 'category', slug: cat.slug },
          indent: true,
        });
      }
    }

    if (PRODUCTS.some((p) => p.isBestseller && p.available)) {
      links.push({ label: 'Bestsellers', view: { name: 'bestsellers' } });
    }

    if (PRODUCTS.some((p) => p.isFeatured && p.available)) {
      links.push({ label: 'Featured Masterpieces', view: { name: 'featured' } });
    }

    links.push({ label: 'All Products', view: { name: 'all-products' } });
    links.push({ label: 'Contact Us', view: { name: 'contact' } });

    return links;
  }, []);

  useEffect(() => {
    if (!isDrawerOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsDrawerOpen(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isDrawerOpen, setIsDrawerOpen]);

  if (!isDrawerOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex" role="dialog" aria-modal="true" aria-label="Store navigation">
      {/* Backdrop */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-[#171311]/75 backdrop-blur-xs transition-opacity"
      />

      {/* Drawer Panel */}
      <aside className="relative z-10 w-80 max-w-[85vw] h-full bg-[#171311] text-[#F7F1E8] border-r border-[#B08D57]/35 flex flex-col shadow-2xl">
        {/* Drawer Header */}
        <div className="px-5 py-4 border-b border-[#B08D57]/25 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <LogoSlot src={MEDIA_ASSETS.logo} alt={`${BRAND.name} Logo`} size="drawer" />
            <div className="min-w-0">
              <p className="font-display text-xl font-semibold text-[#F7F1E8] truncate">
                {BRAND.name}
              </p>
              <p className="text-xs text-[#D9C3A0] italic font-editorial truncate">{BRAND.tagline}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsDrawerOpen(false)}
            aria-label="Close navigation menu"
            className="w-10 h-10 flex items-center justify-center text-[#D9C3A0] hover:text-[#F7F1E8] transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto py-3 px-3">
          <ul className="space-y-0.5">
            {drawerLinks.map((item) => (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => navigate(item.view)}
                  className={`w-full flex items-center justify-between py-2.5 px-3 text-left transition-colors hover:bg-[#30231D]/70 hover:text-[#D9C3A0] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79] ${
                    item.indent
                      ? 'pl-7 text-xs sm:text-sm text-[#F7F1E8]/80'
                      : 'text-sm font-medium text-[#F7F1E8] border-b border-[#B08D57]/10'
                  }`}
                >
                  <span>{item.label}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-[#B08D57]/70 shrink-0" />
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Drawer Footer */}
        <div className="px-5 py-4 border-t border-[#B08D57]/25 bg-[#120E0D]">
          <p className="text-xs italic text-[#D9C3A0] font-editorial">{BRAND.tagline}</p>
          <p className="mt-1 text-xs text-[#F7F1E8]/70 tabular-nums">
            WhatsApp: {BRAND.whatsappDisplay}
          </p>
        </div>
      </aside>
    </div>
  );
};
