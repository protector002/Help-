import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, Utensils, BookOpen, Home, Sparkles } from 'lucide-react';
import { DonationPurpose } from '../types';

export const DonationCards: React.FC = () => {
  const { startDonation, formatMoney } = useApp();
  const [selectedQuickAmount, setSelectedQuickAmount] = useState<number>(25);

  const amounts = [5, 10, 25, 50, 100];

  const cards: {
    id: string;
    title: string;
    description: string;
    buttonLabel: string;
    purpose: DonationPurpose;
    icon: React.ReactNode;
    bannerColor: string;
  }[] = [
    {
      id: 'card-1',
      title: 'FEED A CHILD',
      description: 'Support food and nutrition initiatives providing wholesome daily meals and clean drinking water.',
      buttonLabel: 'SUPPORT FOOD PROGRAMS',
      purpose: 'food_nutrition',
      icon: <Utensils className="w-5 h-5 text-amber-600" />,
      bannerColor: 'border-t-4 border-amber-500',
    },
    {
      id: 'card-2',
      title: 'SUPPORT EDUCATION',
      description: 'Help provide educational materials, textbooks, writing notebooks, and computer lab equipment.',
      buttonLabel: 'SUPPORT EDUCATION',
      purpose: 'education',
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
      bannerColor: 'border-t-4 border-emerald-500',
    },
    {
      id: 'card-3',
      title: 'SUPPORT SAFE SHELTER',
      description: 'Help address essential accommodation, classroom repairs, and hygienic living needs.',
      buttonLabel: 'SUPPORT SHELTER',
      purpose: 'shelter',
      icon: <Home className="w-5 h-5 text-blue-600" />,
      bannerColor: 'border-t-4 border-blue-500',
    },
    {
      id: 'card-4',
      title: 'SUPPORT WHERE NEEDED MOST',
      description: 'Contribute toward the foundation’s most urgent eligible needs and emergency child support.',
      buttonLabel: 'DONATE NOW',
      purpose: 'general',
      icon: <Sparkles className="w-5 h-5 text-indigo-600" />,
      bannerColor: 'border-t-4 border-[#155A91]',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="max-w-3xl mb-12 text-center mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#269B42] mb-2">
            <Heart className="w-3.5 h-3.5 fill-red-500 text-red-500" />
            Every Gift Counts
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#155A91] tracking-tight leading-tight mb-4">
            YOUR GENEROSITY CAN HELP BUILD A BETTER TOMORROW.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Your support helps New Life Children Foundation work toward providing vulnerable children
            with food, safe shelter, educational opportunities, and essential care. Every contribution
            can support the foundation’s mission.
          </p>

          {/* Suggested Quick Amount Selector */}
          <div className="mt-8 inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-white rounded-xl border border-slate-200 shadow-xs">
            <span className="text-xs font-semibold text-slate-500 px-3">Quick amount:</span>
            {amounts.map((amt) => {
              const active = selectedQuickAmount === amt;
              return (
                <button
                  key={amt}
                  onClick={() => setSelectedQuickAmount(amt)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    active
                      ? 'bg-[#155A91] text-white shadow-xs'
                      : 'text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {formatMoney(amt)}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className={`bg-white rounded-2xl p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between border border-slate-200/90 ${card.bannerColor}`}
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shadow-2xs">
                  {card.icon}
                </div>

                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed min-h-[60px]">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 space-y-3">
                <div className="text-xs text-slate-500 font-medium">
                  Suggested: <span className="font-bold text-slate-900">{formatMoney(selectedQuickAmount)}</span>
                </div>

                <button
                  onClick={() => startDonation(card.purpose, selectedQuickAmount)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F4B51B] hover:bg-[#e0a412] text-slate-950 font-bold py-3 px-4 rounded-xl text-xs tracking-wide transition-all shadow-xs border border-amber-300 cursor-pointer"
                >
                  <Heart className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                  {card.buttonLabel}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
