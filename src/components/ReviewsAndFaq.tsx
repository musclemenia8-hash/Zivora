import React, { useState } from 'react';
import { ChevronDown, MessageSquareQuote, Star } from 'lucide-react';
import { FAQ_ITEMS } from '../data/faqs';
import { CUSTOMER_REVIEWS } from '../data/reviews';
import { MediaImage } from './MediaSlots';

export const CustomerReviewsSection: React.FC = () => {
  return (
    <section id="reviews-section" className="py-12 sm:py-16 bg-[#F7F1E8] border-t border-[#B08D57]/25">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-[#B76E79] font-semibold">
            Client Stories
          </p>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-[#30231D] text-balance">
            Customer Reviews
          </h2>
        </div>

        {CUSTOMER_REVIEWS.length === 0 ? (
          <div className="max-w-2xl mx-auto bg-[#D9C3A0]/30 border border-[#B08D57]/35 p-8 sm:p-10 text-center">
            <div className="w-12 h-12 mx-auto border border-[#B08D57]/45 bg-[#F7F1E8] text-[#B08D57] flex items-center justify-center mb-4">
              <MessageSquareQuote className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h3 className="font-display text-2xl font-semibold text-[#30231D]">
              Genuine Customer Reviews Coming Soon
            </h3>
            <p className="mt-2 text-sm text-[#30231D]/80 leading-relaxed max-w-lg mx-auto">
              Verified customer photographs and testimonials shared directly with Zivora By Stuti will be featured here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CUSTOMER_REVIEWS.map((review) => (
              <article
                key={review.id}
                className="bg-[#D9C3A0]/25 border border-[#B08D57]/30 p-5 sm:p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 shrink-0 overflow-hidden border border-[#B08D57]/40">
                      <MediaImage
                        src={review.customerPhoto}
                        alt={review.customerName}
                        placeholderTitle={review.customerName.slice(0, 2).toUpperCase()}
                        variant="champagne"
                        icon="photo"
                        className="w-full h-full"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg font-semibold text-[#30231D] truncate">
                        {review.customerName}
                      </h3>
                      <div className="flex items-center gap-1 text-[#B08D57]" aria-label={`${review.rating} out of 5 stars`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5"
                            fill={i < review.rating ? 'currentColor' : 'none'}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#30231D]/85 leading-relaxed">{review.text}</p>
                </div>
                {review.date && (
                  <p className="mt-4 text-xs text-[#30231D]/60">{review.date}</p>
                )}
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0]?.id ?? null);

  return (
    <section id="faq-section" className="py-12 sm:py-16 bg-[#D9C3A0] border-t border-[#B08D57]/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <p className="text-xs uppercase tracking-[0.22em] text-[#B76E79] font-semibold">
            Store Guide
          </p>
          <h2 className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-[#30231D] text-balance">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="bg-[#F7F1E8] border border-[#B08D57]/35 divide-y divide-[#B08D57]/25">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div key={item.id}>
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="w-full px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 text-left hover:bg-[#D9C3A0]/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B76E79]"
                >
                  <span className="font-display text-lg sm:text-xl font-semibold text-[#30231D]">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-[#B08D57] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-[#B76E79]' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 text-sm text-[#30231D]/85 leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
