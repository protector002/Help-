import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../lib/api';
import {
  DonationRecord,
  VolunteerApplication,
  ContactMessage,
} from '../types';
import {
  Lock,
  LogOut,
  DollarSign,
  Users,
  Mail,
  Layers,
  Key,
  RefreshCw,
  Search,
  Download,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    isAdmin,
    loginAdmin,
    logoutAdmin,
    adminToken,
    programs,
    gallery,
    settings,
    formatMoney,
    showToast,
  } = useApp();

  const [passwordInput, setPasswordInput] = useState('');
  const [activeTab, setActiveTab] = useState<'donations' | 'volunteers' | 'messages' | 'content' | 'gateways'>('donations');

  // Admin Data State
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Search & Filter
  const [donationSearch, setDonationSearch] = useState('');
  const [donationFilterPurpose, setDonationFilterPurpose] = useState('all');

  const loadAdminData = async () => {
    setLoadingData(true);
    try {
      const [dons, vols, msgs] = await Promise.all([
        api.getDonations(),
        api.getVolunteers(),
        api.getMessages(),
      ]);
      setDonations(dons);
      setVolunteers(vols);
      setMessages(msgs);
    } catch (err: any) {
      showToast('Error loading administrative records', 'error');
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (isAdmin) {
      loadAdminData();
    }
  }, [isAdmin, adminToken]);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginAdmin(passwordInput);
    setPasswordInput('');
  };

  // Export donations as CSV
  const exportDonationsCSV = () => {
    if (donations.length === 0) {
      showToast('No donation records to export', 'info');
      return;
    }
    const headers = 'Reference,Receipt,Amount,Currency,Frequency,Purpose,Donor Name,Donor Email,Gateway,Status,Date\n';
    const rows = donations
      .map(
        (d) =>
          `"${d.reference}","${d.receiptNumber}",${d.amount},"${d.currency}","${d.frequency}","${d.purposeTitle}","${d.donorName}","${d.donorEmail}","${d.gateway}","${d.status}","${d.createdAt}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `NLCF_Donations_Report_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    showToast('Donations report exported as CSV', 'success');
  };

  // Filtered donations
  const filteredDonations = donations.filter((d) => {
    const matchQuery =
      d.reference.toLowerCase().includes(donationSearch.toLowerCase()) ||
      d.donorName.toLowerCase().includes(donationSearch.toLowerCase()) ||
      d.donorEmail.toLowerCase().includes(donationSearch.toLowerCase()) ||
      d.receiptNumber.toLowerCase().includes(donationSearch.toLowerCase());
    const matchPurpose = donationFilterPurpose === 'all' || d.purpose === donationFilterPurpose;
    return matchQuery && matchPurpose;
  });

  const totalVerifiedRevenueUSD = donations
    .filter((d) => d.status === 'verified_success')
    .reduce((acc, curr) => acc + curr.amount, 0);

  // If NOT authenticated, show Login Screen
  if (!isAdmin) {
    return (
      <div className="py-20 sm:py-32 bg-[#FAF9F6] min-h-[75vh] flex items-center">
        <div className="max-w-md mx-auto px-4 w-full">
          <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-xl border border-slate-200 text-center space-y-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#155A91] flex items-center justify-center mx-auto">
              <Lock className="w-7 h-7" />
            </div>

            <div className="space-y-1.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#269B42]">
                Authorized Foundation Personnel Only
              </span>
              <h1 className="text-2xl font-extrabold text-[#155A91] tracking-tight">
                Staff & Admin Portal
              </h1>
              <p className="text-xs text-slate-500">
                Sign in to manage program contents, review donations, and inspect volunteer submissions.
              </p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Administrator Password
                </label>
                <input
                  type="password"
                  required
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="Enter administrator password..."
                  className="w-full rounded-xl px-4 py-2.5 text-xs border border-slate-300 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                />
              </div>

              <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-200 text-[11px] text-slate-600">
                Default authorization master key: <span className="font-mono font-bold text-slate-900">admin123</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#155A91] hover:bg-[#104774] text-white font-bold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Sign In to Admin Dashboard
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // AUTHENTICATED DASHBOARD VIEW
  return (
    <div className="py-10 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                Authenticated
              </span>
              <span className="text-xs text-slate-500">Role: Executive Administrator</span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#155A91] tracking-tight mt-1">
              New Life Children Foundation — Management Suite
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={loadAdminData}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 cursor-pointer"
              title="Refresh database records"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loadingData ? 'animate-spin' : ''}`} />
              <span>Sync</span>
            </button>
            <button
              onClick={logoutAdmin}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Quick Metrics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs font-medium text-slate-500">Total Verified Contributions</span>
            <div className="text-2xl font-black text-emerald-700">
              {formatMoney(totalVerifiedRevenueUSD)}
            </div>
            <span className="text-[11px] text-slate-400 block">{donations.length} transactions recorded</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs font-medium text-slate-500">Volunteer Applicants</span>
            <div className="text-2xl font-black text-[#155A91]">{volunteers.length}</div>
            <span className="text-[11px] text-slate-400 block">Safeguarding clearance required</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs font-medium text-slate-500">Inquiries & Safeguarding</span>
            <div className="text-2xl font-black text-amber-600">{messages.length}</div>
            <span className="text-[11px] text-slate-400 block">Inbound messages</span>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-1">
            <span className="text-xs font-medium text-slate-500">Active Programs</span>
            <div className="text-2xl font-black text-[#269B42]">{programs.length}</div>
            <span className="text-[11px] text-slate-400 block">Covering 248+ children</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
          <button
            onClick={() => setActiveTab('donations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'donations'
                ? 'bg-[#155A91] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            <span>Donations Ledger ({donations.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('volunteers')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'volunteers'
                ? 'bg-[#155A91] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Volunteers ({volunteers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'messages'
                ? 'bg-[#155A91] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Inbox & Safeguarding ({messages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('content')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'content'
                ? 'bg-[#155A91] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Content & Photos</span>
          </button>

          <button
            onClick={() => setActiveTab('gateways')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'gateways'
                ? 'bg-[#155A91] text-white shadow-xs'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <Key className="w-3.5 h-3.5" />
            <span>Gateway & API Setup</span>
          </button>
        </div>

        {/* TAB 1: DONATIONS LEDGER */}
        {activeTab === 'donations' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 flex-1 max-w-md">
                <div className="relative w-full">
                  <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    value={donationSearch}
                    onChange={(e) => setDonationSearch(e.target.value)}
                    placeholder="Search by reference, receipt, or donor..."
                    className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-xl bg-slate-50 focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#155A91]"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={donationFilterPurpose}
                  onChange={(e) => setDonationFilterPurpose(e.target.value)}
                  className="text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50 font-medium"
                >
                  <option value="all">All Programs</option>
                  <option value="food_nutrition">Food & Nutrition</option>
                  <option value="education">Education</option>
                  <option value="shelter">Shelter</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="general">Where Needed Most</option>
                </select>

                <button
                  onClick={exportDonationsCSV}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-[#269B42] hover:bg-[#1f8036] text-white transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3">Reference / Receipt</th>
                    <th className="p-3">Donor</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Purpose</th>
                    <th className="p-3">Gateway</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {filteredDonations.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="p-8 text-center text-slate-400">
                        No matching donation records found.
                      </td>
                    </tr>
                  ) : (
                    filteredDonations.map((d) => (
                      <tr key={d.id} className="hover:bg-slate-50/70">
                        <td className="p-3 font-mono">
                          <span className="font-bold text-[#155A91] block">{d.reference}</span>
                          <span className="text-[10px] text-slate-400">{d.receiptNumber}</span>
                        </td>
                        <td className="p-3">
                          <span className="font-semibold block">{d.donorName}</span>
                          <span className="text-[11px] text-slate-500">{d.donorEmail}</span>
                        </td>
                        <td className="p-3 font-bold text-emerald-700">
                          {formatMoney(d.amount, d.currency)}
                          <span className="block text-[10px] text-slate-400 font-normal">
                            {d.frequency}
                          </span>
                        </td>
                        <td className="p-3 font-medium">{d.purposeTitle}</td>
                        <td className="p-3 uppercase text-[11px] font-semibold text-slate-600">
                          {d.gateway}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                              d.status === 'verified_success'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}
                          >
                            {d.status === 'verified_success' ? 'Verified' : d.status}
                          </span>
                        </td>
                        <td className="p-3 text-[11px] text-slate-500 whitespace-nowrap">
                          {new Date(d.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 2: VOLUNTEERS */}
        {activeTab === 'volunteers' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Volunteer Applications</h2>
            <div className="space-y-4">
              {volunteers.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No volunteer applications currently pending.
                </div>
              ) : (
                volunteers.map((v) => (
                  <div
                    key={v.id}
                    className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-2 text-xs"
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                      <div>
                        <span className="text-sm font-bold text-slate-900 mr-2">{v.fullName}</span>
                        <span className="text-slate-500">{v.email} • {v.phone}</span>
                      </div>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                        Status: {v.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-slate-600 pt-1">
                      <div>
                        <strong className="text-slate-700 block">Interest:</strong>
                        <span>{v.areaOfInterest}</span>
                      </div>
                      <div>
                        <strong className="text-slate-700 block">Availability:</strong>
                        <span>{v.availability}</span>
                      </div>
                      <div>
                        <strong className="text-slate-700 block">Location:</strong>
                        <span>{v.country}</span>
                      </div>
                    </div>

                    <div className="bg-white p-3 rounded-lg border border-slate-200 text-slate-700">
                      <strong className="text-slate-900 block mb-0.5">Skills & Qualifications:</strong>
                      {v.skills}
                    </div>

                    {v.notes && (
                      <div className="text-[11px] text-emerald-800 bg-emerald-50 p-2 rounded border border-emerald-200">
                        <strong>Internal Committee Note:</strong> {v.notes}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 3: INBOX & SAFEGUARDING */}
        {activeTab === 'messages' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900">Contact Inquiries & Safeguarding Alerts</h2>
            <div className="space-y-4">
              {messages.length === 0 ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No unread messages in the foundation inbox.
                </div>
              ) : (
                messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-4 rounded-xl border text-xs space-y-2 ${
                      m.isSafeguardingConcern
                        ? 'bg-red-50/70 border-red-300'
                        : 'bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {m.isSafeguardingConcern && (
                          <span className="px-2 py-0.5 rounded text-[10px] font-extrabold bg-red-600 text-white uppercase">
                            Safeguarding Concern
                          </span>
                        )}
                        <span className="font-bold text-slate-900">{m.fullName}</span>
                        <span className="text-slate-500">({m.email})</span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {new Date(m.submittedAt).toLocaleString()}
                      </span>
                    </div>
                    <div className="font-semibold text-slate-800">{m.subject}</div>
                    <p className="text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                      {m.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB 4: CONTENT & PHOTOS */}
        {activeTab === 'content' && (
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-900">Foundation Photography Catalog</h2>
              <p className="text-xs text-slate-500">
                All photos represent verified activities at New Life Children Foundation.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {gallery.map((g) => (
                <div key={g.id} className="border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <div className="h-36 w-full overflow-hidden">
                    <img src={g.url} alt={g.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-3 space-y-1 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-slate-900 truncate">{g.title}</span>
                      <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-100 text-emerald-800">
                        Approved
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 line-clamp-2">{g.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: GATEWAYS & API CREDENTIALS */}
        {activeTab === 'gateways' && (
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-slate-900">Payment Gateway Configuration Status</h2>
              <p className="text-xs text-slate-500">
                Current status of live merchant APIs and environment secrets.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 text-sm">Flutterwave (East Africa / Pan-Africa)</div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      settings.flutterwaveConfigured
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {settings.flutterwaveConfigured ? 'LIVE MERCHANT ACTIVE' : 'Awaiting Live Secret Key'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Processes Credit/Debit Cards, MTN Mobile Money, Airtel Money, and Bank Transfers.
                  To activate live processing, add <code className="bg-slate-200 px-1 py-0.5 rounded">FLUTTERWAVE_SECRET_KEY</code> to your deployment secrets.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 text-sm">Pesapal (Mobile Money & Cards)</div>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      settings.pesapalConfigured
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {settings.pesapalConfigured ? 'LIVE MERCHANT ACTIVE' : 'Awaiting Live Credentials'}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Supports East African localized checkout via M-Pesa, Airtel Money, and card rails.
                  Configure with <code className="bg-slate-200 px-1 py-0.5 rounded">PESAPAL_CONSUMER_KEY</code> and <code className="bg-slate-200 px-1 py-0.5 rounded">PESAPAL_CONSUMER_SECRET</code>.
                </p>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="font-bold text-slate-900 text-sm">Cryptographic Ledger / Sandbox Engine</div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-extrabold uppercase bg-emerald-100 text-emerald-800">
                    OPERATIONAL (SHA-256)
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Generates verified unique transaction references, duplicate protection checks, and verifiable receipts.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
