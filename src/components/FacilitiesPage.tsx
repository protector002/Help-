import React from 'react';
import { useApp } from '../context/AppContext';
import { Building, Heart, Maximize2, CheckCircle2, ShieldCheck } from 'lucide-react';

export const FacilitiesPage: React.FC = () => {
  const { facilities, openLightbox, startDonation } = useApp();

  return (
    <div className="py-12 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#155A91] mb-2">
            <Building className="w-4 h-4 text-[#269B42]" />
            Educational Infrastructure
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#155A91] tracking-tight leading-tight mb-4">
            A PLACE TO LEARN. A PLACE TO GROW. A PLACE TO BELONG.
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Safe physical environments are the cornerstone of effective education and child protection.
            Explore the real school buildings, covered walkways, study halls, and computer stations
            utilized daily by New Life Children Foundation.
          </p>
        </div>

        {/* Detailed Facilities Cards */}
        <div className="space-y-12">
          {facilities.map((fac, idx) => (
            <div
              key={fac.id}
              className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs grid grid-cols-1 lg:grid-cols-12 gap-8 items-center ${
                idx % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image Column */}
              <div className={`lg:col-span-6 relative rounded-2xl overflow-hidden shadow-sm group ${idx % 2 === 1 ? 'lg:order-2' : ''}`}>
                <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                  <img
                    src={fac.image}
                    alt={fac.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                  
                  <button
                    onClick={() =>
                      openLightbox({
                        id: fac.id,
                        url: fac.image,
                        title: fac.title,
                        caption: fac.caption,
                        category: 'facilities',
                        aspectRatio: 'landscape',
                        isApproved: true,
                        safeguardingVerified: true,
                      })
                    }
                    className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-lg text-white cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-300 block">
                      {fac.categoryLabel}
                    </span>
                    <h3 className="text-lg font-bold text-white">{fac.title}</h3>
                  </div>
                </div>
              </div>

              {/* Description Column */}
              <div className={`lg:col-span-6 space-y-4 ${idx % 2 === 1 ? 'lg:order-1' : ''}`}>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#269B42] uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  Fully Active Learning Zone
                </div>

                <h3 className="text-2xl font-extrabold text-[#155A91] tracking-tight">
                  {fac.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {fac.description}
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                  <strong className="text-slate-800 block">Facility Notes:</strong>
                  <p>{fac.caption}</p>
                  <span className="text-slate-500 block pt-1 font-medium">Campus Designation: {fac.generalLocation}</span>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => startDonation('shelter', 50)}
                    className="inline-flex items-center gap-2 bg-[#F4B51B] hover:bg-[#e0a412] text-slate-900 font-bold px-5 py-2.5 rounded-xl text-xs shadow-xs border border-amber-300 cursor-pointer"
                  >
                    <Heart className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                    Help Support Facility Maintenance
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Protection & Non-Disclosure Notice */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-start gap-3 text-xs text-slate-600">
          <ShieldCheck className="w-5 h-5 text-[#269B42] flex-shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            In accordance with international child safeguarding directives, exact GPS coordinates
            and vulnerable children’s private accommodation quarters are kept strictly confidential
            to prevent outside exploitation and ensure student safety.
          </p>
        </div>
      </div>
    </div>
  );
};
