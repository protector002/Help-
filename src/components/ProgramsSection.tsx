import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProgramItem } from '../types';
import { Heart, ArrowRight, X, Users, ShieldCheck } from 'lucide-react';

export const ProgramsSection: React.FC = () => {
  const { programs, startDonation } = useApp();
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  return (
    <section className="py-16 sm:py-24 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#269B42] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#155A91]" />
            Comprehensive Initiatives
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#155A91] tracking-tight leading-tight mb-4">
            WORKING TOGETHER TO MEET ESSENTIAL NEEDS.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Our initiatives are purposefully designed to address the foundational pillars of vulnerable
            children’s wellbeing: regular nutrition, quality education, secure learning facilities, healthcare,
            and unwavering child protection.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative h-52 w-full overflow-hidden bg-slate-100">
                  <img
                    src={prog.image}
                    alt={prog.imageAlt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider bg-white/95 text-slate-800 shadow-xs">
                      {prog.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
                      Active Program
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#155A91] transition-colors leading-snug">
                    {prog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {prog.description}
                  </p>

                  <div className="pt-2 flex items-center gap-2 text-xs text-slate-500">
                    <Users className="w-3.5 h-3.5 text-[#269B42]" />
                    <span>Serving {prog.beneficiariesCount} children regularly</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProgram(prog)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-slate-600 hover:text-[#155A91] transition-colors py-2 cursor-pointer"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => startDonation(prog.purposeCode, 25)}
                  className="inline-flex items-center gap-1.5 bg-[#F4B51B] hover:bg-[#e0a412] text-slate-900 font-bold px-3.5 py-2 rounded-lg text-xs shadow-xs border border-amber-300 transition-colors cursor-pointer"
                >
                  <Heart className="w-3 h-3 fill-red-600 text-red-600" />
                  Support Program
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Program Details Modal */}
        {selectedProgram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl border border-slate-200">
              <div className="relative h-56 sm:h-64 w-full">
                <img
                  src={selectedProgram.image}
                  alt={selectedProgram.title}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setSelectedProgram(null)}
                  className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <span className="px-3 py-1 rounded-md bg-[#269B42] text-white text-xs font-bold uppercase tracking-wider">
                    {selectedProgram.category}
                  </span>
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <h3 className="text-2xl font-extrabold text-[#155A91]">
                  {selectedProgram.title}
                </h3>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
                  {selectedProgram.fullDetails}
                </p>

                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-3 text-xs text-slate-600">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                  <span>
                    Direct community delivery with transparent financial tracking and strict child safeguarding standards.
                  </span>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedProgram(null)}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      const purpose = selectedProgram.purposeCode;
                      setSelectedProgram(null);
                      startDonation(purpose, 25);
                    }}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#F4B51B] hover:bg-[#e0a412] text-slate-900 font-extrabold px-6 py-2.5 rounded-lg text-xs tracking-wide border border-amber-300 shadow-sm cursor-pointer"
                  >
                    <Heart className="w-4 h-4 fill-red-600 text-red-600" />
                    SUPPORT THIS PROGRAM
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
