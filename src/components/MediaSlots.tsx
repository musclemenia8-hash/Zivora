import React, { useEffect, useState } from 'react';
import { Crown, Film, Sparkles, Watch } from 'lucide-react';
import { BRAND } from '../config/brand';

interface MediaImageProps {
  src?: string;
  alt: string;
  placeholderTitle?: string;
  variant?: 'ivory' | 'champagne' | 'dark';
  icon?: 'jewellery' | 'watch' | 'banner' | 'photo';
  className?: string;
  imgClassName?: string;
}

export const MediaImage: React.FC<MediaImageProps> = ({
  src,
  alt,
  placeholderTitle,
  variant = 'dark',
  icon = 'jewellery',
  className = '',
  imgClassName = 'w-full h-full object-contain bg-[#18120F]',
}) => {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  const showPlaceholder = !src || failed;

  const surfaceStyles =
    variant === 'dark'
      ? 'bg-gradient-to-b from-[#1D1714] via-[#171311] to-[#130F0E] text-[#F7F1E8]'
      : variant === 'champagne'
        ? 'bg-gradient-to-b from-[#E5D3B3] to-[#D9C3A0] text-[#30231D]'
        : 'bg-gradient-to-b from-[#FAF6EE] to-[#F7F1E8] text-[#30231D]';

  const IconComponent =
    icon === 'watch' ? Watch : icon === 'banner' ? Crown : Sparkles;

  return (
    <div className={`relative overflow-hidden ${surfaceStyles} ${className}`}>
      {!showPlaceholder && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={() => setFailed(true)}
          className={imgClassName}
        />
      )}

      {showPlaceholder && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-5 text-center select-none">
          <div
            className={`absolute inset-3 border pointer-events-none ${
              variant === 'dark' ? 'border-[#B08D57]/25' : 'border-[#B08D57]/35'
            }`}
          />
          <div
            className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center border mb-3 ${
              variant === 'dark'
                ? 'border-[#B08D57]/40 text-[#D9C3A0] bg-[#30231D]/35'
                : 'border-[#B08D57]/45 text-[#B08D57] bg-[#D9C3A0]/25'
            }`}
          >
            <IconComponent className="w-4 h-4 sm:w-5 sm:h-5" strokeWidth={1.35} />
          </div>
          {placeholderTitle && (
            <p
              className={`font-display text-base sm:text-lg font-medium tracking-wide leading-snug max-w-[85%] ${
                variant === 'dark' ? 'text-[#D9C3A0]' : 'text-[#30231D]'
              }`}
            >
              {placeholderTitle}
            </p>
          )}
          <span
            className={`mt-1 text-[10px] uppercase tracking-[0.22em] ${
              variant === 'dark' ? 'text-[#B08D57]/75' : 'text-[#30231D]/55'
            }`}
          >
            {BRAND.name}
          </span>
        </div>
      )}
    </div>
  );
};

interface MediaVideoProps {
  src?: string;
  label?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  onEnded?: () => void;
}

export const MediaVideo: React.FC<MediaVideoProps> = ({
  src,
  label,
  className = '',
  autoPlay = true,
  muted = true,
  loop = true,
  onEnded,
}) => {
  const [failed, setFailed] = useState(false);
  const [naturalRatio, setNaturalRatio] = useState<number | null>(null);

  useEffect(() => {
    setFailed(false);
    setNaturalRatio(null);
  }, [src]);

  const showPlaceholder = !src || failed;
  const isPortrait = naturalRatio !== null && naturalRatio < 0.85;

  return (
    <div
      className={`relative overflow-hidden bg-[#171311] text-[#F7F1E8] mx-auto ${
        isPortrait ? 'max-w-[420px]' : 'w-full'
      } ${showPlaceholder ? className : ''}`}
      style={!showPlaceholder && naturalRatio ? { aspectRatio: String(naturalRatio) } : undefined}
    >
      {!showPlaceholder && (
        <video
          key={src}
          src={src}
          autoPlay={autoPlay}
          muted={muted}
          loop={loop}
          playsInline
          preload="auto"
          onLoadedMetadata={(e) => {
            const { videoWidth, videoHeight } = e.currentTarget;
            if (videoWidth > 0 && videoHeight > 0) {
              setNaturalRatio(videoWidth / videoHeight);
            }
          }}
          onEnded={onEnded}
          onError={() => setFailed(true)}
          className="w-full h-full object-cover block"
        />
      )}

      {showPlaceholder && (
        <div className="w-full h-full min-h-[200px] sm:min-h-[280px] flex flex-col items-center justify-center p-6 text-center bg-[radial-gradient(circle_at_center,rgba(176,141,87,0.14)_0%,rgba(23,19,17,1)_72%)]">
          <div className="w-11 h-11 rounded-full flex items-center justify-center border border-[#B08D57]/40 bg-[#30231D]/40 text-[#D9C3A0] mb-3">
            <Film className="w-5 h-5" strokeWidth={1.35} />
          </div>
          {label && (
            <p className="font-display text-2xl sm:text-3xl font-medium tracking-wide text-[#F7F1E8]">
              {label}
            </p>
          )}
          <p className="mt-1.5 font-editorial italic text-sm sm:text-base text-[#D9C3A0]/80">
            {BRAND.tagline}
          </p>
        </div>
      )}
    </div>
  );
};

interface LogoSlotProps {
  src: string;
  alt: string;
  size?: 'navbar' | 'drawer' | 'footer';
}

export const LogoSlot: React.FC<LogoSlotProps> = ({ src, alt, size = 'navbar' }) => {
  const [failed, setFailed] = useState(false);

  const sizeClass =
    size === 'footer'
      ? 'w-14 h-14 sm:w-16 sm:h-16'
      : size === 'drawer'
        ? 'w-12 h-12'
        : 'w-12 h-12 sm:w-[52px] sm:h-[52px]';

  if (!src || failed) {
    return (
      <div
        aria-label={`${BRAND.name} Emblem`}
        className={`${sizeClass} shrink-0 rounded-full border border-[#B08D57]/60 bg-[#171311] text-[#D9C3A0] flex items-center justify-center font-display text-lg font-semibold select-none`}
      >
        Z
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={`${sizeClass} shrink-0 rounded-full object-contain bg-[#171311]`}
    />
  );
};
