import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Maximize2, ShieldCheck } from 'lucide-react';

export const ChildrenGallery: React.FC = () => {
  const { openLightbox, startDonation, gallery } = useApp();

  const featured = gallery.find((g) => g.id === 'gal-1') || gallery[0];
  const supporting = gallery.filter((g) => g.id !== featured.id).slice(0, 3);

  return (
    <section className="py-16 sm:py-24 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#269B42] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#155A91]" />
            Our Children & Community
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#155A91] tracking-tight leading-tight mb-4">
            BEHIND EVERY SMILE IS A FUTURE WORTH FIGHTING FOR.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Every child has dreams, talents, and the potential to achieve great things.
            Our responsibility is to help create an environment where vulnerable children have
            opportunities to learn, grow, and feel supported. Your kindness can help us continue
            working toward that future.
          </p>
        </div>

        {/* Magazine-Style Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Large Featured Photograph */}
          <div className="lg:col-span-7 group relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-slate-100 cursor-pointer">
            <div
              onClick={() => openLightbox(featured)}
              className="relative w-full h-[380px] sm:h-[460px] lg:h-[500px] overflow-hidden"
            >
              <img
                src={featured.url}
                alt={featured.title}
                className="w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />
              
              {/* Zoom hint */}
              <div className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-lg text-white">
                <Maximize2 className="w-4 h-4" />
              </div>

              {/* Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1.5">
                <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Featured • Learning Together
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  {featured.title}
                </h3>
                <p className="text-sm text-slate-200 leading-relaxed max-w-xl">
                  {featured.caption}
                </p>
              </div>
            </div>
          </div>

          {/* Supporting Photographs Column */}
          <div className="lg:col-span-5 flex flex-col gap-5 justify-between">
            {supporting.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(item)}
                className="group relative rounded-xl overflow-hidden shadow-sm border border-slate-200 bg-slate-100 cursor-pointer flex-1 min-h-[140px]"
              >
                <div className="relative w-full h-full min-h-[150px] overflow-hidden">
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                  
                  <div className="absolute bottom-0 inset-x-0 p-4 text-white">
                    <span className="text-[11px] font-bold text-amber-300 uppercase tracking-wider block">
                      {idx === 0 ? 'Digital Skills' : idx === 1 ? 'Wholesome Nutrition' : 'Safe Facilities'}
                    </span>
                    <h4 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-200 line-clamp-1">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Safeguarding Notice & Call to Action */}
        <div className="mt-10 p-5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#269B42] flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-800 font-semibold block">Commitment to Dignity & Privacy</strong>
              All photographs represent actual beneficiaries and educational activities supported by the foundation.
              In accordance with our child protection framework, private records, medical files, and sensitive locations are strictly protected.
            </div>
          </div>

          <button
            onClick={() => startDonation('general', 25)}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#F4B51B] hover:bg-[#e0a412] text-slate-900 font-bold px-5 py-2.5 rounded-lg shadow-sm text-sm border border-amber-300 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-red-600 text-red-600" />
            HELP US SUPPORT MORE CHILDREN
          </button>
        </div>
      </div>
    </section>
  );
};
