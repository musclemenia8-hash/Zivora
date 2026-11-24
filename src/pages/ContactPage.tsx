import React, { useState } from 'react';
import { ArrowLeft, ExternalLink, MessageCircle, Phone } from 'lucide-react';
import { BRAND } from '../config/brand';
import { useStore } from '../context/StoreContext';

export const ContactPage: React.FC = () => {
  const { navigate } = useStore();
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendDirectMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      setError('Please enter your name and enquiry message.');
      return;
    }
    setError('');
    const formatted = `Hello ${BRAND.name},\nName: ${name.trim()}\nEnquiry: ${message.trim()}`;
    window.open(
      `${BRAND.whatsappUrl}?text=${encodeURIComponent(formatted)}`,
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <main className="min-h-[70vh] bg-[#D9C3A0] py-8 sm:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <button
          type="button"
          onClick={() => navigate({ name: 'home' })}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium text-[#30231D] hover:text-[#B76E79] transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          {/* Brand Contact Info */}
          <div className="md:col-span-5 bg-[#171311] text-[#F7F1E8] border border-[#B08D57]/40 p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-[#B76E79] font-medium">
                Connect With Us
              </p>
              <h1 className="mt-1 font-display text-3xl sm:text-4xl font-semibold text-[#D9C3A0]">
                {BRAND.name}
              </h1>
              <p className="mt-1 text-xs uppercase tracking-wider text-[#B08D57]">{BRAND.businessType}</p>
              <p className="mt-3 font-display italic text-lg text-[#F7F1E8]/90">
                {BRAND.tagline}
              </p>

              <div className="mt-8 space-y-5 text-sm">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#B08D57]">Phone</p>
                  <a
                    href={`tel:${BRAND.phone}`}
                    className="mt-1 inline-flex items-center gap-2 text-[#F7F1E8] hover:text-[#B76E79] transition-colors tabular-nums"
                  >
                    <Phone className="w-4 h-4 text-[#B76E79]" />
                    <span>{BRAND.phone}</span>
                  </a>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-[#B08D57]">WhatsApp</p>
                  <a
                    href={BRAND.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 inline-flex items-center gap-2 text-[#F7F1E8] hover:text-[#B76E79] transition-colors tabular-nums"
                  >
                    <MessageCircle className="w-4 h-4 text-[#B76E79]" />
                    <span>{BRAND.whatsappDisplay}</span>
                  </a>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-[#B08D57]">Facebook Page</p>
                  {BRAND.facebookUrl ? (
                    <a
                      href={BRAND.facebookUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-flex items-center gap-2 text-[#F7F1E8] hover:text-[#B76E79] transition-colors"
                    >
                      <ExternalLink className="w-4 h-4 text-[#B76E79]" />
                      <span>{BRAND.facebookPageName}</span>
                    </a>
                  ) : (
                    <p className="mt-1 text-[#D9C3A0]">{BRAND.facebookPageName}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Direct WhatsApp Enquiry Form */}
          <form
            onSubmit={handleSendDirectMessage}
            className="md:col-span-7 bg-[#F7F1E8] border border-[#B08D57]/35 p-6 sm:p-8 space-y-5"
          >
            <div>
              <h2 className="font-display text-2xl sm:text-3xl font-semibold text-[#30231D]">
                Send a Direct WhatsApp Enquiry
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#30231D]/75">
                Have a question about any jewellery piece or watch? Write your message below to open a chat on WhatsApp.
              </p>
            </div>

            <div>
              <label htmlFor="contactName" className="block text-xs font-semibold uppercase tracking-wider text-[#30231D] mb-1.5">
                Your Name *
              </label>
              <input
                id="contactName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full h-11 px-3.5 text-sm bg-white border border-[#B08D57]/40 text-[#30231D] focus:outline-none focus:border-[#B76E79]"
              />
            </div>

            <div>
              <label htmlFor="contactMsg" className="block text-xs font-semibold uppercase tracking-wider text-[#30231D] mb-1.5">
                Your Message *
              </label>
              <textarea
                id="contactMsg"
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share the product name or enquiry you would like to ask about..."
                className="w-full p-3.5 text-sm bg-white border border-[#B08D57]/40 text-[#30231D] focus:outline-none focus:border-[#B76E79]"
              />
            </div>

            {error && <p className="text-xs font-medium text-[#9B5661]">{error}</p>}

            <button
              type="submit"
              className="w-full h-12 px-6 inline-flex items-center justify-center gap-2 bg-[#171311] text-[#F7F1E8] text-sm font-medium hover:bg-[#30231D] transition-colors"
            >
              <MessageCircle className="w-4 h-4 text-[#B76E79]" />
              <span>Message on WhatsApp</span>
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};
