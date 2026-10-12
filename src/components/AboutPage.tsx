import React from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Heart, Eye, Target, CheckCircle2, Award } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { startDonation } = useApp();

  const values = [
    {
      title: 'Compassion',
      desc: 'Putting the emotional, physical, and developmental needs of every child at the center of all decisions.',
    },
    {
      title: 'Integrity',
      desc: 'Upholding uncompromising moral standards and honest reporting in all community engagements.',
    },
    {
      title: 'Child Protection',
      desc: 'Enforcing zero tolerance for abuse, strict safeguarding protocols, and unyielding privacy preservation.',
    },
    {
      title: 'Transparency',
      desc: 'Ensuring donors, partners, and communities have clear visibility into how every dollar is utilized.',
    },
    {
      title: 'Equality',
      desc: 'Championing equal opportunities for girls, boys, and children with diverse developmental needs.',
    },
    {
      title: 'Hope',
      desc: 'Cultivating resilience and self-worth so children believe in their ability to build a brighter future.',
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16 sm:space-y-24">
        {/* Hero Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#269B42]">
              <Shield className="w-4 h-4 text-[#155A91]" />
              About New Life Children Foundation
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#155A91] tracking-tight leading-tight">
              SAFE CHILDREN • BRIGHTER FUTURES
            </h1>
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
              New Life Children Foundation is dedicated to walking alongside vulnerable children, orphans,
              and marginalized youth. We believe every child deserves safety, nourishment, quality education,
              and unconditional dignity.
            </p>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-white">
              <img
                src="/images/children-hero.jpg"
                alt="Children of New Life Children Foundation"
                className="w-full h-80 object-cover"
              />
              <div className="p-4 bg-white text-center text-xs font-bold text-slate-600">
                Primary & Regional Child Support Community
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#155A91] flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#155A91]">OUR MISSION</h2>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              "To support vulnerable children by helping them access essential care, safe environments,
              education, and opportunities for a brighter future."
            </p>
          </div>

          <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[#269B42] flex items-center justify-center">
              <Eye className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#269B42]">OUR VISION</h2>
            <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
              "A future where every child has the opportunity to live safely, learn, grow, and reach their full potential."
            </p>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#155A91]">
              <span className="w-2 h-2 rounded-full bg-[#269B42]" />
              Our Foundation Story
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
              Rooted in Community Need, Driven by Care
            </h2>
            <div className="space-y-4 text-slate-700 leading-relaxed text-sm sm:text-base">
              <p>
                In many underserved communities across East Africa, vulnerable children and orphaned boys
                and girls face immense structural challenges: chronic food insecurity, lack of books and
                writing supplies, crumbling school physical infrastructure, and inadequate access to healthcare.
              </p>
              <p>
                New Life Children Foundation was established to directly intervene in these critical areas.
                Rather than treating symptoms in isolation, we focus on foundational needs: ensuring children have
                hot, wholesome meals to fuel their learning, clean classrooms with sturdy wooden desks, computer
                literacy stations for vocational competence, and a safe, protective haven where their rights are fiercely guarded.
              </p>
              <p>
                Today, with the support of dedicated community educators, volunteers, and international donors,
                we support hundreds of children each term, helping them grow into confident, educated, and self-reliant youth.
              </p>
            </div>
          </div>
        </div>

        {/* Our 6 Values */}
        <div>
          <div className="max-w-2xl mb-10">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#269B42] mb-2">
              <Award className="w-4 h-4" />
              Guiding Principles
            </div>
            <h2 className="text-3xl font-extrabold text-[#155A91] tracking-tight">
              OUR CORE VALUES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs space-y-2.5"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-[#269B42]" />
                  <h3 className="text-base font-bold text-slate-900">{v.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Child Safeguarding Commitment Box */}
        <div className="bg-[#EEF7EF] rounded-3xl p-8 sm:p-10 border border-[#269B42]/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-[#269B42] font-bold text-sm uppercase tracking-wider">
              <Shield className="w-5 h-5" />
              Child Safeguarding & Dignity Policy
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              Zero Tolerance for Child Abuse or Exploitation
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Every teacher, staff member, and volunteer undergoes thorough safeguarding verification.
              We do not publish identifying sensitive records or exploit children for fundraising purposes.
            </p>
          </div>

          <button
            onClick={() => startDonation('general', 25)}
            className="flex-shrink-0 inline-flex items-center gap-2 bg-[#F4B51B] hover:bg-[#e0a412] text-slate-900 font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-xs border border-amber-300 cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-red-600 text-red-600" />
            SUPPORT OUR WORK
          </button>
        </div>
      </div>
    </div>
  );
};
