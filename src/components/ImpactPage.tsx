import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  ShieldCheck,
  CheckCircle,
  Download,
  PieChart,
  Users,
  Utensils,
  BookOpen,
  Laptop,
  Heart,
  FileCheck,
} from 'lucide-react';

export const ImpactPage: React.FC = () => {
  const { impact, startDonation, showToast } = useApp();
  const [downloadingReport, setDownloadingReport] = useState<string | null>(null);

  const handleDownload = (reportName: string) => {
    setDownloadingReport(reportName);
    setTimeout(() => {
      setDownloadingReport(null);
      showToast(`Generated: ${reportName}. Official report downloaded.`, 'success');
    }, 1200);
  };

  const allocations = [
    { label: 'Direct Child Programs (Food, Tuition, Books, Healthcare)', percentage: 85, color: 'bg-[#269B42]' },
    { label: 'Facility Maintenance & Safe School Repairs', percentage: 10, color: 'bg-[#155A91]' },
    { label: 'Audited Governance & Safeguarding Administration', percentage: 5, color: 'bg-amber-500' },
  ];

  const milestones = [
    {
      date: 'Term 3 — October 2026',
      title: 'Vocational ICT Lab Skills Training Launched',
      desc: '12 desktop workstations installed and 65 older students trained in digital literacy, typing, and document creation.',
    },
    {
      date: 'Term 2 — July 2026',
      title: 'Nutritious Feeding Program Expanded',
      desc: 'Reached 5,200 wholesome hot meals served monthly across primary learning classes, reducing absenteeism by over 70%.',
    },
    {
      date: 'Term 1 — April 2026',
      title: 'Classroom Colonnade & Study Hall Roof Renovation',
      desc: 'Reinforced covered walkways, replaced damaged window panes, and added sturdy solid wooden exam tables.',
    },
  ];

  return (
    <div className="py-12 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#269B42] mb-2">
            <ShieldCheck className="w-4 h-4 text-[#155A91]" />
            Transparency & Governance
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#155A91] tracking-tight leading-tight mb-4">
            YOUR TRUST MATTERS AS MUCH AS YOUR SUPPORT.
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            We are dedicated to total transparency, clear financial integrity, and verified impact.
            Every donation directly supports real children, verified facilities, and tangible community programs.
          </p>
        </div>

        {/* Verified Key Metrics Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Verified Program Metrics (Updated {impact.lastUpdated})
            </h2>
            <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              <CheckCircle className="w-3 h-3" /> Field Audited
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#155A91] flex items-center justify-center mb-2">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-[#155A91]">
                {impact.childrenSupported}+
              </div>
              <div className="text-xs font-semibold text-slate-600">Children Supported</div>
              <div className="text-[10px] text-slate-400">Enrolled & Active</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-2">
                <Utensils className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">
                {impact.mealsProvidedMonthly.toLocaleString()}
              </div>
              <div className="text-xs font-semibold text-slate-600">Monthly Meals</div>
              <div className="text-[10px] text-slate-400">Nutritious hot food</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-2">
                <BookOpen className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600">
                {impact.classroomsOperating}
              </div>
              <div className="text-xs font-semibold text-slate-600">Classrooms Running</div>
              <div className="text-[10px] text-slate-400">Safe learning blocks</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-2">
                <Laptop className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">
                {impact.computerWorkstations}
              </div>
              <div className="text-xs font-semibold text-slate-600">PC Workstations</div>
              <div className="text-[10px] text-slate-400">Hands-on ICT training</div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1 col-span-2 md:col-span-1">
              <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center mb-2">
                <Heart className="w-4 h-4" />
              </div>
              <div className="text-2xl sm:text-3xl font-extrabold text-rose-600">
                {impact.volunteersEngaged}
              </div>
              <div className="text-xs font-semibold text-slate-600">Volunteers & Staff</div>
              <div className="text-[10px] text-slate-400">Safeguarding verified</div>
            </div>
          </div>
        </div>

        {/* Financial Transparency & Resource Allocation */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xs">
          <div className="max-w-2xl mb-8 space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#155A91]">
              <PieChart className="w-4 h-4 text-[#269B42]" />
              Fund Allocation Principle
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Where Your Donation Goes
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              We operate with lean administration so that the overwhelming majority of every dollar goes directly into meals, books, and child care.
            </p>
          </div>

          <div className="space-y-6">
            {/* Progress Bar Container */}
            <div className="h-5 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
              <div style={{ width: '85%' }} className="bg-[#269B42] h-full" title="85% Direct Programs" />
              <div style={{ width: '10%' }} className="bg-[#155A91] h-full" title="10% Facilities" />
              <div style={{ width: '5%' }} className="bg-amber-500 h-full" title="5% Administration" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
              {allocations.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  <span className={`w-3.5 h-3.5 rounded-full ${item.color} flex-shrink-0 mt-1`} />
                  <div>
                    <span className="text-2xl font-black text-slate-900 block">{item.percentage}%</span>
                    <span className="text-xs text-slate-600 leading-snug block">{item.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Project Updates & Milestones */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="text-2xl font-extrabold text-[#155A91] tracking-tight">
              Recent Program Updates & Field Progress
            </h2>
            <div className="space-y-6 border-l-2 border-slate-200 pl-6 ml-2">
              {milestones.map((m, idx) => (
                <div key={idx} className="relative space-y-1.5">
                  <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#155A91] ring-4 ring-white" />
                  <span className="text-xs font-bold text-[#269B42] uppercase tracking-wider block">
                    {m.date}
                  </span>
                  <h3 className="text-base font-bold text-slate-900">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Downloadable Verified Reports */}
          <div className="lg:col-span-5 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#155A91]">
              <FileCheck className="w-4 h-4 text-[#269B42]" />
              Official Published Documentation
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Download Verified Summaries
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              We make official activity summaries, child safeguarding charters, and allocation accounts accessible for public review.
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => handleDownload('NLCF_Term3_Impact_Report_2026.pdf')}
                disabled={Boolean(downloadingReport)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#155A91] hover:bg-blue-50/40 text-left transition-all text-xs font-semibold text-slate-800 cursor-pointer"
              >
                <span>Term 3 Field Impact & Feeding Report (2026)</span>
                <Download className="w-4 h-4 text-slate-400" />
              </button>

              <button
                onClick={() => handleDownload('NLCF_Child_Protection_Policy_2026.pdf')}
                disabled={Boolean(downloadingReport)}
                className="w-full flex items-center justify-between p-3.5 rounded-xl border border-slate-200 hover:border-[#155A91] hover:bg-blue-50/40 text-left transition-all text-xs font-semibold text-slate-800 cursor-pointer"
              >
                <span>Child Safeguarding Code of Conduct & Standards</span>
                <Download className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="pt-2">
              <button
                onClick={() => startDonation('general', 50)}
                className="w-full flex items-center justify-center gap-2 bg-[#F4B51B] hover:bg-[#e0a412] text-slate-900 font-bold py-3 px-4 rounded-xl text-xs border border-amber-300 cursor-pointer"
              >
                <Heart className="w-3.5 h-3.5 fill-red-600 text-red-600" />
                CONTRIBUTE TO OUR FIELD WORK
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
