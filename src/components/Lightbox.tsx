import React, { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, ShieldCheck, Heart } from 'lucide-react';

export const Lightbox: React.FC = () => {
  const { lightboxPhoto, closeLightbox, startDonation } = useApp();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeLightbox();
      }
    };
    if (lightboxPhoto) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [lightboxPhoto, closeLightbox]);

  if (!lightboxPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeLightbox}
    >
      <div
        className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 z-20 bg-black/60 hover:bg-black/90 text-white p-2.5 rounded-full transition-colors cursor-pointer"
          aria-label="Close image viewer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Image Display */}
        <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden min-h-[300px] sm:min-h-[460px]">
          <img
            src={lightboxPhoto.url}
            alt={lightboxPhoto.title}
            className="w-full h-full object-contain max-h-[70vh]"
          />
        </div>

        {/* Caption & Safeguarding Details */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-white/10">
          <div className="space-y-1 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                {lightboxPhoto.category}
              </span>
              <span className="text-white/40">·</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-400 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Dignity Verified
              </span>
            </div>
            <h3 className="text-lg font-bold text-white leading-tight">
              {lightboxPhoto.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {lightboxPhoto.caption}
            </p>
          </div>

          <button
            onClick={() => {
              closeLightbox();
              startDonation('general', 25);
            }}
            className="inline-flex items-center gap-2 bg-[#F4B51B] hover:bg-[#e0a412] text-slate-950 font-bold px-5 py-2.5 rounded-xl text-xs flex-shrink-0 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-red-600 text-red-600" />
            Support This Work
          </button>
        </div>
      </div>
    </div>
  );
};
