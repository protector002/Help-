import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Building, Maximize2, Heart } from 'lucide-react';
import { FacilityItem } from '../types';

export const FacilitiesShowcase: React.FC = () => {
  const { facilities, openLightbox, startDonation } = useApp();
  const [selectedFacility, setSelectedFacility] = useState<FacilityItem>(facilities[0] || null);

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#155A91] mb-2">
            <Building className="w-4 h-4 text-[#269B42]" />
            Our School Grounds & Infrastructure
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#155A91] tracking-tight leading-tight mb-4">
            A PLACE TO LEARN. A PLACE TO GROW. A PLACE TO BELONG.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Every child deserves an environment where learning is encouraged, essential needs are considered,
            and personal development is supported. Through our work and available facilities, we aim to help
            create safe, supportive environments where children can pursue education and build the foundations
            for a brighter future.
          </p>
        </div>

        {/* Interactive Facilities Display */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Large Image & Feature Card */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white group">
              <div className="relative h-[340px] sm:h-[420px] lg:h-[460px] w-full overflow-hidden">
                <img
                  src={selectedFacility?.image || facilities[0]?.image}
                  alt={selectedFacility?.title || 'Facility view'}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent" />

                {/* Lightbox trigger */}
                <button
                  onClick={() =>
                    openLightbox({
                      id: selectedFacility.id,
                      url: selectedFacility.image,
                      title: selectedFacility.title,
                      caption: selectedFacility.caption,
                      category: 'facilities',
                      aspectRatio: 'landscape',
                      isApproved: true,
                      safeguardingVerified: true,
                    })
                  }
                  className="absolute top-4 right-4 bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-lg text-white transition-colors cursor-pointer"
                  title="Expand photograph"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>

                {/* Overlaid Title & Category */}
                <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded bg-[#269B42] text-[11px] font-bold uppercase tracking-wider text-white">
                      {selectedFacility?.categoryLabel}
                    </span>
                    <span className="text-xs text-amber-300 font-medium">
                      Status: Fully Operational
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white">
                    {selectedFacility?.title}
                  </h3>
                </div>
              </div>

              {/* Description body */}
              <div className="p-6 bg-white border-t border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {selectedFacility?.description}
                  </p>
                  <span className="text-xs text-slate-500 font-medium block">
                    Campus Zone: {selectedFacility?.generalLocation}
                  </span>
                </div>

                <button
                  onClick={() => startDonation('shelter', 50)}
                  className="flex-shrink-0 inline-flex items-center gap-2 bg-[#155A91] hover:bg-[#104774] text-white font-bold px-4 py-2.5 rounded-lg text-xs shadow-xs cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 text-amber-300" />
                  Support Facility Repairs
                </button>
              </div>
            </div>
          </div>

          {/* Right Thumbnails / Category Selector */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Select Facility Area
            </h3>

            {facilities.map((fac) => {
              const isSelected = selectedFacility?.id === fac.id;
              return (
                <button
                  key={fac.id}
                  onClick={() => setSelectedFacility(fac)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center gap-3.5 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#155A91] shadow-md ring-2 ring-[#155A91]/20'
                      : 'bg-white/80 border-slate-200 hover:border-slate-300 hover:bg-white'
                  }`}
                >
                  <div className="w-20 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-slate-200">
                    <img
                      src={fac.image}
                      alt={fac.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-bold text-[#269B42] uppercase tracking-wider block">
                      {fac.categoryLabel}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-800 truncate">
                      {fac.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">
                      {fac.caption}
                    </p>
                  </div>
                </button>
              );
            })}

            <div className="pt-2">
              <button
                onClick={() => startDonation('shelter', 50)}
                className="w-full flex items-center justify-center gap-2 bg-[#F4B51B] hover:bg-[#e0a412] text-slate-900 font-bold py-3 px-4 rounded-xl shadow-xs text-sm border border-amber-300 cursor-pointer"
              >
                <Heart className="w-4 h-4 fill-red-600 text-red-600" />
                HELP US SUPPORT OUR FACILITIES
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
