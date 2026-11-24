import React from 'react';
import { ExternalLink, MessageCircle, Phone } from 'lucide-react';
import { BRAND } from '../config/brand';
import { MEDIA_ASSETS } from '../config/media';
import { JEWELLERY_CATEGORIES, WATCH_CATEGORIES } from '../data/categories';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';
import { LogoSlot, MediaVideo } from './MediaSlots';

export const Footer: React.FC = () => {
  const { navigate, view } = useStore();

  const hasBestsellers = PRODUCTS.some((p) => p.isBestseller && p.available);

  const scrollToSection = (sectionId: string) => {
    if (view.name !== 'home') {
      navigate({ name: 'home' });
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#171311] text-[#F7F1E8] border-t border-[#B08D57]/35">
      {/* Separate Cinematic Footer Video Section — Zero Side Blank Spaces or Inner Padding */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16">
        <MediaVideo
          src={MEDIA_ASSETS.footerVideo}
          label={BRAND.name}
          className="w-full aspect-[21/9]"
        />
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-4">
              <LogoSlot src={MEDIA_ASSETS.logo} alt={`${BRAND.name} Logo`} size="footer" />
              <div>
                <h2 className="font-display text-2xl sm:text-3xl font-semibold tracking-wide text-[#D9C3A0]">
                  {BRAND.name}
                </h2>
                <p className="text-xs text-[#B08D57] tracking-[0.18em] uppercase">
                  {BRAND.businessType}
                </p>
              </div>
            </div>
            <p className="font-editorial italic text-lg text-[#F7F1E8]/90">{BRAND.tagline}</p>
            <p className="text-xs sm:text-sm text-[#D9C3A0]/75 max-w-sm leading-relaxed">
              Curated luxury jewellery and watches catalogue with direct WhatsApp ordering.
            </p>
          </div>

          {/* ABOUT */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#B08D57] font-semibold mb-4">
              About
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F7F1E8]/85">
              <li>
                <button
                  type="button"
                  onClick={() => scrollToSection('main-showcase')}
                  className="hover:text-[#B76E79] transition-colors text-left"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => navigate({ name: 'all-products' })}
                  className="hover:text-[#B76E79] transition-colors text-left"
                >
                  Our Collection
                </button>
              </li>
            </ul>
          </div>

          {/* SHOP — Populated Categories Only */}
          <div>
            <h3 className="text-xs uppercase tracking-[0.2em] text-[#B08D57] font-semibold mb-4">
              Shop
            </h3>
            <ul className="space-y-2.5 text-sm text-[#F7F1E8]/85">
              {JEWELLERY_CATEGORIES.length > 0 && (
                <li>
                  <button
                    type="button"
                    onClick={() => navigate({ name: 'category', slug: 'jewellery' })}
                    className="hover:text-[#B76E79] transition-colors text-left"
                  >
                    Jewellery
                  </button>
                </li>
              )}
              {WATCH_CATEGORIES.length > 0 && (
                <li>
                  <button
                    type="button"
                    onClick={() => navigate({ name: 'category', slug: 'watches' })}
                    className="hover:text-[#B76E79] transition-colors text-left"
                  >
                    Watches
                  </button>
                </li>
              )}
              {hasBestsellers && (
                <li>
                  <button
                    type="button"
                    onClick={() => navigate({ name: 'bestsellers' })}
                    className="hover:text-[#B76E79] transition-colors text-left"
                  >
                    Bestsellers
                  </button>
                </li>
              )}
              <li>
                <button
                  type="button"
                  onClick={() => navigate({ name: 'all-products' })}
                  className="hover:text-[#B76E79] transition-colors text-left"
                >
                  All Products
                </button>
              </li>
            </ul>
          </div>

          {/* CUSTOMER SUPPORT & CONNECT */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#B08D57] font-semibold mb-4">
                Customer Support
              </h3>
              <ul className="space-y-2.5 text-sm text-[#F7F1E8]/85">
                <li>
                  <button
                    type="button"
                    onClick={() => navigate({ name: 'contact' })}
                    className="hover:text-[#B76E79] transition-colors text-left"
                  >
                    Contact Us
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => scrollToSection('faq-section')}
                    className="hover:text-[#B76E79] transition-colors text-left"
                  >
                    FAQs
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => navigate({ name: 'checkout' })}
                    className="hover:text-[#B76E79] transition-colors text-left"
                  >
                    WhatsApp Ordering
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#B08D57] font-semibold mb-3">
                Connect
              </h3>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#D9C3A0]">
                <li>
                  <a
                    href={`tel:${BRAND.phone}`}
                    className="inline-flex items-center gap-2 hover:text-[#F7F1E8] transition-colors tabular-nums"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#B76E79] shrink-0" />
                    <span>Phone: {BRAND.phone}</span>
                  </a>
                </li>
                <li>
                  <a
                    href={BRAND.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 hover:text-[#F7F1E8] transition-colors tabular-nums"
                  >
                    <MessageCircle className="w-3.5 h-3.5 text-[#B76E79] shrink-0" />
                    <span>WhatsApp: {BRAND.whatsappDisplay}</span>
                  </a>
                </li>
                <li>
                  {BRAND.facebookUrl ? (
                    <a
                      href={BRAND.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 hover:text-[#F7F1E8] transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5 text-[#B76E79] shrink-0" />
                      <span>Facebook: {BRAND.facebookPageName}</span>
                    </a>
                  ) : (
                    <span className="text-[#D9C3A0]/85">
                      Facebook: {BRAND.facebookPageName}
                    </span>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 pt-6 border-t border-[#B08D57]/25 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#D9C3A0]/75">
          <p>© {BRAND.copyrightYear} {BRAND.name}. All Rights Reserved.</p>
          <p className="text-[#B76E79] font-editorial italic text-sm">{BRAND.tagline}</p>
        </div>
      </div>
    </footer>
  );
};
