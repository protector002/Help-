import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart, ArrowRight, Shield, BookOpen, Utensils, Home } from 'lucide-react';

export const Hero: React.FC = () => {
  const { setCurrentPage, startDonation } = useApp();

  return (
    <section className="relative w-full overflow-hidden bg-slate-900 text-white min-h-[580px] lg:min-h-[660px] flex items-center">
      {/* Background Photograph with Editorial Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/children-hero.jpg"
          alt="Children at New Life Children Foundation holding exercise books with smiles outside their classroom"
          className="w-full h-full object-cover object-center lg:object-[center_35%]"
          loading="eager"
        />
        {/* Editorial gradient overlay for maximum contrast and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/80 to-slate-950/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 w-full">
        <div className="max-w-2xl lg:max-w-3xl space-y-6">
          {/* Tagline kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#269B42]/90 backdrop-blur-sm text-white text-xs sm:text-sm font-bold tracking-wider uppercase shadow-xs">
            <Shield className="w-4 h-4 text-amber-300" />
            SAFE CHILDREN • BRIGHTER FUTURES
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold tracking-tight text-white leading-[1.15] drop-shadow-xs">
            EVERY CHILD DESERVES A SAFE HOME, A CHANCE TO LEARN, AND HOPE FOR TOMORROW.
          </h1>

          {/* Supporting Description */}
          <p className="text-base sm:text-lg md:text-xl text-slate-100/95 leading-relaxed font-normal max-w-2xl drop-shadow-xs">
            New Life Children Foundation supports vulnerable children and orphans by working to provide
            access to nutritious food, safe shelter, education, and compassionate care. Together, we can help
            create brighter opportunities for the children who need them most.
          </p>

          {/* Call to Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
            <button
              onClick={() => startDonation('general', 25)}
              className="inline-flex items-center justify-center gap-2.5 bg-[#F4B51B] hover:bg-[#e2a612] text-slate-950 font-extrabold px-6 py-3.5 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 active:scale-[0.98] text-base tracking-wide border border-amber-300 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-red-600 text-red-600 flex-shrink-0" />
              DONATE TO SUPPORT OUR CHILDREN
            </button>

            <button
              onClick={() => setCurrentPage('programs')}
              className="inline-flex items-center justify-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-md text-white font-semibold px-6 py-3.5 rounded-lg border border-white/30 transition-all text-base cursor-pointer"
            >
              <span>DISCOVER OUR WORK</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Trust Highlights Strip */}
          <div className="pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-200">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-amber-300 flex-shrink-0">
                <Utensils className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block font-bold text-white">Daily Meals</span>
                <span className="text-slate-300 text-[11px]">Nutritious feeding</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-amber-300 flex-shrink-0">
                <BookOpen className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block font-bold text-white">Classroom Education</span>
                <span className="text-slate-300 text-[11px]">Books & ICT skills</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-amber-300 flex-shrink-0">
                <Home className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block font-bold text-white">Safe Environments</span>
                <span className="text-slate-300 text-[11px]">Shelter & hygiene</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-emerald-400 flex-shrink-0">
                <Shield className="w-3.5 h-3.5" />
              </div>
              <div>
                <span className="block font-bold text-white">Child Protection</span>
                <span className="text-slate-300 text-[11px]">Strict safeguarding</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
