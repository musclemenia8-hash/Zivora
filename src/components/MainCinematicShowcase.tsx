import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { BRAND } from '../config/brand';
import { MEDIA_ASSETS } from '../config/media';
import { PRODUCTS } from '../data/products';
import { useStore } from '../context/StoreContext';

const VIDEO_ADVANCE_MS = 3200;
const PHOTO_SLIDE_MS = 3800;

export const MainCinematicShowcase: React.FC = () => {
  const { navigate } = useStore();

  const activeVideos = useMemo(
    () => MEDIA_ASSETS.mainVideos.filter((v) => Boolean(v.src)),
    []
  );

  const showcasePhotos = useMemo(() => {
    const customPhotos = MEDIA_ASSETS.showcasePhotos.filter((p) => Boolean(p.src));
    if (customPhotos.length >= 3) {
      return customPhotos.map((p) => ({ id: p.id, src: p.src, alt: BRAND.name }));
    }
    return PRODUCTS.slice(0, 6).map((p) => ({
      id: p.id,
      src: p.images[0],
      alt: p.name,
    }));
  }, []);

  const [videoIdx, setVideoIdx] = useState(0);
  const [photoSlideIdx, setPhotoSlideIdx] = useState(0);
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});
  const [videoRatios, setVideoRatios] = useState<Record<string, number>>({});
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const availableVideos = useMemo(
    () => activeVideos.filter((v) => !failedVideos[v.id]),
    [activeVideos, failedVideos]
  );

  const safeVideoIdx =
    availableVideos.length > 0 ? videoIdx % availableVideos.length : 0;

  const activeVideo = availableVideos[safeVideoIdx];
  const activeRatio = (activeVideo && videoRatios[activeVideo.id]) || 9 / 16;
  const isPortraitShowcase = activeRatio < 0.9;

  const advanceVideo = useCallback(() => {
    if (availableVideos.length <= 1) return;
    const nextIdx = (safeVideoIdx + 1) % availableVideos.length;
    const nextEl = videoRefs.current[nextIdx];

    if (nextEl && nextEl.readyState >= 2) {
      try {
        nextEl.currentTime = 0;
        nextEl.play().catch(() => {});
      } catch {
        // Ignore seek errors
      }
      setVideoIdx(nextIdx);
      return;
    }

    if (nextEl) {
      const onReady = () => {
        nextEl.removeEventListener('canplay', onReady);
        try {
          nextEl.currentTime = 0;
          nextEl.play().catch(() => {});
        } catch {
          // Ignore
        }
        setVideoIdx(nextIdx);
      };
      nextEl.addEventListener('canplay', onReady);
      nextEl.load();
    } else {
      setVideoIdx(nextIdx);
    }
  }, [availableVideos.length, safeVideoIdx]);

  useEffect(() => {
    const activeEl = videoRefs.current[safeVideoIdx];
    if (activeEl) {
      activeEl.play().catch(() => {});
    }
  }, [safeVideoIdx]);

  useEffect(() => {
    if (availableVideos.length <= 1) return;
    const timer = window.setInterval(() => {
      advanceVideo();
    }, VIDEO_ADVANCE_MS);
    return () => window.clearInterval(timer);
  }, [advanceVideo, availableVideos.length]);

  useEffect(() => {
    if (showcasePhotos.length <= 1) return;
    const timer = window.setInterval(() => {
      setPhotoSlideIdx((prev) => (prev + 1) % showcasePhotos.length);
    }, PHOTO_SLIDE_MS);
    return () => window.clearInterval(timer);
  }, [showcasePhotos.length]);

  const threeEditorialFrames = useMemo(() => {
    if (showcasePhotos.length === 0) return [];
    return [0, 1, 2].map(
      (offset) => showcasePhotos[(photoSlideIdx + offset) % showcasePhotos.length]
    );
  }, [photoSlideIdx, showcasePhotos]);

  return (
    <section
      id="main-showcase"
      className="bg-[#171311] text-[#F7F1E8] py-14 sm:py-20 border-b border-[#B08D57]/25"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Video Showcase — Exact Aspect Ratio Match (No Cropping, No Side Blank Spaces) */}
        {availableVideos.length > 0 && (
          <div
            className={
              isPortraitShowcase
                ? 'grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center'
                : 'space-y-8'
            }
          >
            {/* Editorial Narrative Column (pairs seamlessly alongside portrait film on desktop) */}
            <div
              className={
                isPortraitShowcase
                  ? 'lg:col-span-5 text-center lg:text-left space-y-5'
                  : 'text-center max-w-2xl mx-auto space-y-3'
              }
            >
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#B76E79] font-medium">
                {BRAND.name}
              </p>
              <h2 className="font-display text-3xl sm:text-5xl font-medium tracking-wide text-[#F7F1E8] text-balance leading-tight">
                The Signature Film
              </h2>
              <p className="font-editorial italic text-lg sm:text-xl text-[#D9C3A0]">
                {BRAND.tagline}
              </p>
              <p className="text-sm text-[#D9C3A0]/75 leading-relaxed max-w-md mx-auto lg:mx-0">
                Discover luminous jewellery and curated timepieces crafted to elevate every celebratory and everyday moment.
              </p>
              {isPortraitShowcase && (
                <div className="pt-2 flex flex-wrap justify-center lg:justify-start gap-3">
                  <button
                    type="button"
                    onClick={() => navigate({ name: 'featured' })}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] bg-[#B08D57] text-[#171311] hover:bg-[#D9C3A0] transition-colors"
                  >
                    <span>Featured Masterpieces</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate({ name: 'all-products' })}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-[0.18em] border border-[#B08D57]/45 text-[#F7F1E8] hover:border-[#D9C3A0] transition-colors"
                  >
                    <span>All Products</span>
                  </button>
                </div>
              )}
            </div>

            {/* Video Display Frame — Exact Native Aspect Ratio, Zero Inner Padding, Zero Side Blank Spaces */}
            <div className={isPortraitShowcase ? 'lg:col-span-7 flex justify-center' : 'w-full'}>
              <div
                className={`relative overflow-hidden bg-[#171311] shadow-[0_28px_64px_-22px_rgba(0,0,0,0.85)] ${
                  isPortraitShowcase ? 'w-full max-w-[390px] sm:max-w-[420px]' : 'w-full'
                }`}
                style={{ aspectRatio: String(activeRatio) }}
              >
                {availableVideos.map((video, idx) => {
                  const isActive = idx === safeVideoIdx;
                  return (
                    <video
                      key={video.id}
                      ref={(el) => {
                        videoRefs.current[idx] = el;
                      }}
                      src={video.src}
                      autoPlay={isActive}
                      muted
                      loop
                      playsInline
                      preload="auto"
                      onLoadedMetadata={(e) => {
                        const { videoWidth, videoHeight } = e.currentTarget;
                        if (videoWidth > 0 && videoHeight > 0) {
                          setVideoRatios((prev) => ({
                            ...prev,
                            [video.id]: videoWidth / videoHeight,
                          }));
                        }
                      }}
                      onError={() =>
                        setFailedVideos((prev) => ({ ...prev, [video.id]: true }))
                      }
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                        isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    />
                  );
                })}

                {/* Subtle Dot Indicators Only */}
                {availableVideos.length > 1 && (
                  <div className="absolute bottom-3.5 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#171311]/65 backdrop-blur-xs">
                    {availableVideos.map((video, idx) => (
                      <button
                        key={video.id}
                        type="button"
                        onClick={() => setVideoIdx(idx)}
                        aria-label={`Select scene ${idx + 1}`}
                        className={`rounded-full transition-all duration-300 ${
                          idx === safeVideoIdx
                            ? 'w-5 h-1.5 bg-[#D9C3A0]'
                            : 'w-1.5 h-1.5 bg-[#D9C3A0]/40 hover:bg-[#D9C3A0]/75'
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Three Editorial Photographs After Main Videos */}
        {threeEditorialFrames.length > 0 && (
          <div className="mt-12 sm:mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              {threeEditorialFrames.map((photo, slotIdx) => (
                <div
                  key={`campaign-slot-${slotIdx}`}
                  className="relative aspect-[4/5] bg-[#18120F] overflow-hidden shadow-lg"
                >
                  {showcasePhotos.map((candidate) => {
                    const visible = candidate.id === photo.id;
                    return (
                      <img
                        key={`${slotIdx}-${candidate.id}`}
                        src={candidate.src}
                        alt={candidate.alt}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className={`absolute inset-0 w-full h-full object-contain bg-[#18120F] transition-opacity duration-1000 ease-in-out ${
                          visible ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                        }`}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            {showcasePhotos.length > 1 && (
              <div className="mt-5 flex items-center justify-center gap-2">
                {showcasePhotos.map((photo, idx) => (
                  <button
                    key={`dot-${photo.id}`}
                    type="button"
                    onClick={() => setPhotoSlideIdx(idx)}
                    aria-label={`View showcase collection ${idx + 1}`}
                    className={`rounded-full transition-all duration-300 ${
                      idx === photoSlideIdx
                        ? 'w-5 h-1.5 bg-[#B08D57]'
                        : 'w-1.5 h-1.5 bg-[#D9C3A0]/35 hover:bg-[#D9C3A0]/70'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
