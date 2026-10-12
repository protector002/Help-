import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const MissionSection: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Mission Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#155A91]">
              <span className="w-2 h-2 rounded-full bg-[#269B42]" />
              Our Core Mission
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-4xl font-extrabold text-[#155A91] tracking-tight leading-tight">
              A BRIGHTER FUTURE BEGINS WITH SOMEONE WHO CARES.
            </h2>

            <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed">
              <p>
                Every child deserves the opportunity to grow up in a safe environment, receive an education,
                have enough to eat, and experience the care and encouragement needed to build a better future.
              </p>
              <p>
                <strong className="text-slate-900 font-semibold">New Life Children Foundation</strong> exists
                to support vulnerable children and help address these essential needs.
              </p>
              <p>
                Through compassionate support, responsible partnerships, and contributions from people who care,
                we aim to create opportunities for children to learn, grow, and thrive.
              </p>
            </div>

            {/* Core Commitments List */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-slate-700 font-medium">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#269B42] flex-shrink-0 mt-0.5" />
                <span>Nutritious daily meals & clean water</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#269B42] flex-shrink-0 mt-0.5" />
                <span>Primary schooling & digital literacy</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#269B42] flex-shrink-0 mt-0.5" />
                <span>Safe learning and shelter spaces</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-5 h-5 text-[#269B42] flex-shrink-0 mt-0.5" />
                <span>Child safeguarding & health protection</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={() => setCurrentPage('about')}
                className="inline-flex items-center gap-2 bg-[#155A91] hover:bg-[#104774] text-white font-bold px-6 py-3 rounded-lg shadow-sm hover:shadow transition-colors text-sm cursor-pointer"
              >
                <span>LEARN ABOUT OUR MISSION</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right Column: Authentic Facility Photo */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200/80 bg-white">
              <img
                src="/images/facility-exterior.jpg"
                alt="New Life Children Foundation school building exterior with colonnade covered walkway"
                className="w-full h-[380px] sm:h-[440px] object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-950/40 to-transparent p-5 text-white">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider mb-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Our Educational Facility
                </div>
                <p className="text-sm font-medium text-slate-100">
                  Classrooms, veranda walkways, and grounds maintained to offer children a peaceful, secure space to study.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
