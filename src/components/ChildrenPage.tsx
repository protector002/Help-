import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Maximize2, Shield, Heart, Filter } from 'lucide-react';

export const ChildrenPage: React.FC = () => {
  const { gallery, openLightbox, startDonation } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Photographs' },
    { id: 'education', label: 'Education & ICT' },
    { id: 'nutrition', label: 'Food & Nutrition' },
    { id: 'facilities', label: 'Classrooms & Campus' },
  ];

  const filteredPhotos =
    activeCategory === 'all'
      ? gallery
      : gallery.filter((item) => item.category === activeCategory);

  return (
    <div className="py-12 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#269B42] mb-2">
            <Shield className="w-4 h-4 text-[#155A91]" />
            Dignity & Authentic Photography
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#155A91] tracking-tight leading-tight mb-4">
            STORIES OF HOPE, RESILIENCE, AND DIGNITY.
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Every child supported by New Life Children Foundation has potential waiting to be nurtured.
            These genuine photographs capture our students, classrooms, daily nutrition, and digital learning
            initiatives in action.
          </p>
        </div>

        {/* Filter Bar (Accessible buttons) */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-4">
          <span className="text-xs font-bold text-slate-500 mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Filter by:
          </span>
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  active
                    ? 'bg-[#155A91] text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Editorial Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(photo)}
              className={`group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between ${
                photo.featured ? 'sm:col-span-2' : ''
              }`}
            >
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-100">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity" />

                <div className="absolute top-3 right-3 bg-white/20 hover:bg-white/30 backdrop-blur-md p-2 rounded-lg text-white">
                  <Maximize2 className="w-4 h-4" />
                </div>

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-amber-300 block mb-0.5">
                    {photo.category}
                  </span>
                  <h3 className="text-base font-bold text-white leading-tight">
                    {photo.title}
                  </h3>
                </div>
              </div>

              <div className="p-4 bg-white border-t border-slate-100 flex items-center justify-between text-xs">
                <p className="text-slate-600 line-clamp-2 pr-2">
                  {photo.caption}
                </p>
                <span className="text-[11px] font-bold text-[#155A91] group-hover:underline flex-shrink-0">
                  Expand
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Child Privacy Banner */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Shield className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
            <div className="text-xs text-slate-600 leading-relaxed">
              <strong className="text-slate-900 font-bold block">Strict Safeguarding & Consent Framework</strong>
              Identifiable photographs are published strictly with appropriate institutional consent and safeguarding clearance.
              We never disclose exact home addresses, private family circumstances, or sensitive medical history.
            </div>
          </div>

          <button
            onClick={() => startDonation('general', 25)}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#F4B51B] hover:bg-[#e0a412] text-slate-900 font-bold px-6 py-2.5 rounded-xl text-xs border border-amber-300 shadow-xs cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-red-600 text-red-600" />
            DONATE TO SUPPORT OUR CHILDREN
          </button>
        </div>
      </div>
    </div>
  );
};
