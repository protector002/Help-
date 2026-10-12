import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../lib/api';
import {
  Heart,
  Users,
  Handshake,
  Share2,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';

export const VolunteerPage: React.FC = () => {
  const { startDonation, showToast } = useApp();

  // Tab: volunteer vs partnership
  const [activeTab, setActiveTab] = useState<'volunteer' | 'partner'>('volunteer');

  // Volunteer form state
  const [volFullName, setVolFullName] = useState('');
  const [volEmail, setVolEmail] = useState('');
  const [volPhone, setVolPhone] = useState('');
  const [volCountry, setVolCountry] = useState('Uganda');
  const [volSkills, setVolSkills] = useState('');
  const [volAvailability, setVolAvailability] = useState('Weekends (3-5 hrs/week)');
  const [volInterest, setVolInterest] = useState('Primary Tutoring & Reading');
  const [volSafeguarding, setVolSafeguarding] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Partnership form state
  const [partOrg, setPartOrg] = useState('');
  const [partContact, setPartContact] = useState('');
  const [partEmail, setPartEmail] = useState('');
  const [partType, setPartType] = useState('Educational Materials / Books');
  const [partProposal, setPartProposal] = useState('');

  const handleVolunteerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!volFullName || !volEmail || !volSkills) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    if (!volSafeguarding) {
      setErrorMsg('You must review and agree to our Child Safeguarding Code of Conduct.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.submitVolunteer({
        fullName: volFullName,
        email: volEmail,
        phone: volPhone,
        country: volCountry,
        skills: volSkills,
        availability: volAvailability,
        areaOfInterest: volInterest,
        safeguardingAgreed: volSafeguarding,
      });

      if (res.success) {
        setSubmittedSuccess(true);
        showToast('Application submitted! Our safeguarding committee will contact you.', 'success');
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePartnerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!partOrg || !partEmail || !partProposal) {
      showToast('Please provide your organization name, email, and proposal summary', 'error');
      return;
    }
    showToast('Partnership proposal received! Our directorate will reach out.', 'success');
    setPartOrg('');
    setPartContact('');
    setPartEmail('');
    setPartProposal('');
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#269B42] mb-2">
            <Users className="w-4 h-4 text-[#155A91]" />
            Join Our Mission
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#155A91] tracking-tight leading-tight mb-4">
            STAND TOGETHER FOR VULNERABLE CHILDREN.
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            There are many ways to walk alongside our children: through financial sponsorship,
            skills-based volunteering, institutional partnerships, and raising awareness.
          </p>
        </div>

        {/* 4 Opportunities Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Heart className="w-5 h-5 fill-amber-500" />
              </div>
              <h3 className="text-base font-bold text-slate-900">1. DONATE</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Contribute financially toward hot meals, educational materials, and facility maintenance.
              </p>
            </div>
            <button
              onClick={() => startDonation('general', 25)}
              className="mt-6 w-full text-center py-2 px-3 rounded-lg bg-[#F4B51B] text-slate-900 font-bold text-xs cursor-pointer"
            >
              Donate Now
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#155A91] flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">2. VOLUNTEER</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Offer your teaching, computer training, first aid, or administrative skills to support our programs.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('volunteer');
                document.getElementById('action-forms')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-6 w-full text-center py-2 px-3 rounded-lg bg-[#155A91] text-white font-bold text-xs cursor-pointer"
            >
              Apply to Volunteer
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#269B42] flex items-center justify-center">
                <Handshake className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">3. PARTNER WITH US</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Collaborate with schools, NGOs, healthcare clinics, or corporate sponsors on joint impact initiatives.
              </p>
            </div>
            <button
              onClick={() => {
                setActiveTab('partner');
                document.getElementById('action-forms')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="mt-6 w-full text-center py-2 px-3 rounded-lg bg-emerald-700 text-white font-bold text-xs cursor-pointer"
            >
              Partner With Us
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                <Share2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900">4. SPREAD THE WORD</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Share our verified campaigns and reports with friends, colleagues, and compassionate community networks.
              </p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard?.writeText(window.location.origin);
                showToast('Website link copied to clipboard! Share with your friends.', 'info');
              }}
              className="mt-6 w-full text-center py-2 px-3 rounded-lg border border-slate-300 text-slate-700 font-bold text-xs hover:bg-slate-50 cursor-pointer"
            >
              Share Campaign
            </button>
          </div>
        </div>

        {/* Action Forms Section */}
        <div id="action-forms" className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
          {/* Tabs */}
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-8">
            <button
              onClick={() => setActiveTab('volunteer')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'volunteer'
                  ? 'bg-[#155A91] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Volunteer Application
            </button>
            <button
              onClick={() => setActiveTab('partner')}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeTab === 'partner'
                  ? 'bg-[#269B42] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Organizational Partnership
            </button>
          </div>

          {activeTab === 'volunteer' ? (
            submittedSuccess ? (
              <div className="p-8 text-center space-y-4 max-w-lg mx-auto">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Application Received</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Thank you for offering your heart and skills to New Life Children Foundation.
                  In accordance with our child protection regulations, all applicants undergo
                  background verification before beginning any engagement.
                </p>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 cursor-pointer"
                >
                  Submit another application
                </button>
              </div>
            ) : (
              <form onSubmit={handleVolunteerSubmit} className="space-y-6 max-w-2xl">
                <div className="space-y-1">
                  <h3 className="text-xl font-bold text-slate-900">Volunteer Application Form</h3>
                  <p className="text-xs text-slate-500">
                    We invite passionate individuals with teaching, medical, technical, or logistical skills.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Full Legal Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={volFullName}
                      onChange={(e) => setVolFullName(e.target.value)}
                      placeholder="Jane Nakato"
                      className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={volEmail}
                      onChange={(e) => setVolEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number</label>
                    <input
                      type="tel"
                      value={volPhone}
                      onChange={(e) => setVolPhone(e.target.value)}
                      placeholder="+256 700..."
                      className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Country / City of Residence</label>
                    <input
                      type="text"
                      value={volCountry}
                      onChange={(e) => setVolCountry(e.target.value)}
                      className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Area of Interest</label>
                    <select
                      value={volInterest}
                      onChange={(e) => setVolInterest(e.target.value)}
                      className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                    >
                      <option value="Primary Tutoring & Reading">Primary Tutoring & Reading</option>
                      <option value="Computer Lab & ICT Training">Computer Lab & ICT Training</option>
                      <option value="Healthcare & Health Screening">Healthcare & Health Screening</option>
                      <option value="Meal Preparation & Nutrition">Meal Preparation & Nutrition</option>
                      <option value="Facility Repairs & Painting">Facility Repairs & Painting</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Availability</label>
                    <input
                      type="text"
                      value={volAvailability}
                      onChange={(e) => setVolAvailability(e.target.value)}
                      placeholder="e.g. Saturdays, 4 hrs"
                      className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Skills, Background & Experience <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={volSkills}
                    onChange={(e) => setVolSkills(e.target.value)}
                    placeholder="Briefly describe your profession, skills, or prior community work..."
                    className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                  />
                </div>

                {/* Mandatory Safeguarding Checkbox */}
                <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-2">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      required
                      checked={volSafeguarding}
                      onChange={(e) => setVolSafeguarding(e.target.checked)}
                      className="mt-0.5 rounded text-[#155A91] focus:ring-[#155A91]"
                    />
                    <div className="text-xs text-slate-800 leading-normal">
                      <strong className="block font-bold text-slate-900">
                        Mandatory Child Safeguarding Agreement
                      </strong>
                      I agree to abide by New Life Children Foundation's zero-tolerance child protection policy.
                      I understand that volunteers do not receive unsupervised access to children and must undergo identity verification.
                    </div>
                  </label>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#155A91] hover:bg-[#104774] text-white font-bold py-3 px-8 rounded-xl text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Application...</span>
                    </>
                  ) : (
                    <span>Submit Volunteer Application</span>
                  )}
                </button>
              </form>
            )
          ) : (
            /* Partnership Form */
            <form onSubmit={handlePartnerSubmit} className="space-y-6 max-w-2xl">
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-slate-900">Partner With New Life Children Foundation</h3>
                <p className="text-xs text-slate-500">
                  We welcome institutional alignments with schools, healthcare clinics, donors, and responsible civic groups.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Organization / Entity Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={partOrg}
                    onChange={(e) => setPartOrg(e.target.value)}
                    placeholder="e.g. Global Health Initiative"
                    className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#269B42]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Official Contact Person
                  </label>
                  <input
                    type="text"
                    value={partContact}
                    onChange={(e) => setPartContact(e.target.value)}
                    placeholder="Dr. Samuel Mukasa"
                    className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#269B42]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={partEmail}
                    onChange={(e) => setPartEmail(e.target.value)}
                    placeholder="partner@org.org"
                    className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#269B42]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Partnership Category
                  </label>
                  <select
                    value={partType}
                    onChange={(e) => setPartType(e.target.value)}
                    className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#269B42]"
                  >
                    <option value="Educational Materials / Books">Educational Materials / Books</option>
                    <option value="Healthcare & Medical Supplies">Healthcare & Medical Supplies</option>
                    <option value="Infrastructure & Classroom Grants">Infrastructure & Classroom Grants</option>
                    <option value="Vocational ICT Hardware">Vocational ICT Hardware</option>
                    <option value="Nutritional Food Support">Nutritional Food Support</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Proposed Collaboration Overview <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={partProposal}
                  onChange={(e) => setPartProposal(e.target.value)}
                  placeholder="Outline the scope and objective of your partnership interest..."
                  className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#269B42]"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#269B42] hover:bg-[#1f8036] text-white font-bold py-3 px-8 rounded-xl text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
              >
                <span>Submit Partnership Proposal</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
