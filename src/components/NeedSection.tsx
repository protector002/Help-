import React from 'react';
import { useApp } from '../context/AppContext';
import { Utensils, Home, BookOpen, HeartPulse, ArrowUpRight } from 'lucide-react';
import { DonationPurpose } from '../types';

export const NeedSection: React.FC = () => {
  const { startDonation } = useApp();

  const needs: {
    title: string;
    description: string;
    image: string;
    icon: React.ReactNode;
    color: string;
    purpose: DonationPurpose;
  }[] = [
    {
      title: 'FOOD AND NUTRITION',
      description: 'Nutritious meals and access to clean drinking water are essential for children’s health, development, and learning.',
      image: '/images/meal-program.jpg',
      icon: <Utensils className="w-5 h-5 text-amber-600" />,
      color: 'bg-amber-50 text-amber-700',
      purpose: 'food_nutrition',
    },
    {
      title: 'SAFE SHELTER',
      description: 'A safe and stable environment can provide children with greater protection, security, and opportunities to grow.',
      image: '/images/facility-exterior.jpg',
      icon: <Home className="w-5 h-5 text-blue-600" />,
      color: 'bg-blue-50 text-blue-700',
      purpose: 'shelter',
    },
    {
      title: 'EDUCATION',
      description: 'Learning materials, suitable educational environments, and access to education can help children develop their abilities and pursue their ambitions.',
      image: '/images/computer-lab.jpg',
      icon: <BookOpen className="w-5 h-5 text-emerald-600" />,
      color: 'bg-emerald-50 text-emerald-700',
      purpose: 'education',
    },
    {
      title: 'CARE AND WELLBEING',
      description: 'Clothing, hygiene supplies, healthcare access, emotional support, and appropriate protection contribute to children’s wellbeing.',
      image: '/images/classroom-hall.jpg',
      icon: <HeartPulse className="w-5 h-5 text-rose-600" />,
      color: 'bg-rose-50 text-rose-700',
      purpose: 'healthcare',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#269B42] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#155A91]" />
            The Need We Address
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#155A91] tracking-tight leading-tight mb-4">
            NO CHILD SHOULD HAVE TO FACE LIFE’S CHALLENGES ALONE.
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Access to food, safe shelter, education, and essential care can make an important difference
            in a child’s life. For vulnerable children and families, these necessities may be difficult to
            obtain without community support. New Life Children Foundation seeks to bring people together
            to help address these needs and create opportunities for children to thrive.
          </p>
        </div>

        {/* Four Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {needs.map((item) => (
            <div
              key={item.title}
              className="group rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                {/* Photo container */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 p-2 rounded-lg bg-white/90 backdrop-blur-xs shadow-xs">
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 space-y-2.5">
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Action */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => startDonation(item.purpose, 25)}
                  className="w-full inline-flex items-center justify-between text-xs font-bold text-[#155A91] hover:text-[#269B42] py-2 border-t border-slate-100 transition-colors cursor-pointer"
                >
                  <span>Support this essential need</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
