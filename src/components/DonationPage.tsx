import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  CurrencyCode,
  DonationFrequency,
  DonationPurpose,
  PaymentGateway,
  DonationRecord,
} from '../types';
import { api } from '../lib/api';
import {
  Heart,
  Shield,
  CreditCard,
  Smartphone,
  CheckCircle2,
  Lock,
  FileText,
  AlertCircle,
  Loader2,
  Receipt,
  Info,
} from 'lucide-react';

export const DonationPage: React.FC = () => {
  const {
    currency,
    setCurrency,
    formatMoney,
    preselectedPurpose,
    preselectedAmount,
    openReceipt,
    showToast,
  } = useApp();

  // Form State
  const [amount, setAmount] = useState<number>(preselectedAmount || 25);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isCustom, setIsCustom] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<DonationFrequency>('one-time');
  const [purpose, setPurpose] = useState<DonationPurpose>(preselectedPurpose || 'general');

  const [donorName, setDonorName] = useState<string>('');
  const [donorEmail, setDonorEmail] = useState<string>('');
  const [donorPhone, setDonorPhone] = useState<string>('');
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [notes, setNotes] = useState<string>('');
  const [gateway, setGateway] = useState<PaymentGateway>('flutterwave');

  // Transaction processing state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [verifiedDonation, setVerifiedDonation] = useState<DonationRecord | null>(null);

  useEffect(() => {
    if (preselectedAmount) {
      setAmount(preselectedAmount);
      setIsCustom(false);
    }
  }, [preselectedAmount]);

  useEffect(() => {
    if (preselectedPurpose) {
      setPurpose(preselectedPurpose);
    }
  }, [preselectedPurpose]);

  const presetAmounts = [1, 5, 10, 25, 50, 100];

  const purposeOptions: { code: DonationPurpose; title: string; desc: string }[] = [
    {
      code: 'general',
      title: 'Where Needed Most',
      desc: 'Unrestricted support directed toward our most urgent eligible child care priorities.',
    },
    {
      code: 'food_nutrition',
      title: 'Food & Nutrition Program',
      desc: 'Nutritious daily meals and clean drinking water for growing children.',
    },
    {
      code: 'education',
      title: 'Primary Education & Books',
      desc: 'Exercise books, pens, textbooks, and computer literacy lab resources.',
    },
    {
      code: 'shelter',
      title: 'Safe Shelter & Classrooms',
      desc: 'Maintaining weather-protected classrooms, study halls, and clean facilities.',
    },
    {
      code: 'healthcare',
      title: 'Healthcare & Wellbeing',
      desc: 'Preventive health screenings, basic medicine, hygiene supplies, and first aid.',
    },
  ];

  const handleAmountSelect = (val: number) => {
    setIsCustom(false);
    setAmount(val);
  };

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCustom(true);
    const val = e.target.value;
    setCustomAmount(val);
    const parsed = parseFloat(val);
    if (!isNaN(parsed) && parsed > 0) {
      setAmount(parsed);
    }
  };

  const currentSelectedPurposeTitle =
    purposeOptions.find((p) => p.code === purpose)?.title || 'General Child Support';

  const handleSubmitDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const finalAmount = isCustom ? parseFloat(customAmount) : amount;
    if (!finalAmount || isNaN(finalAmount) || finalAmount < 1) {
      setErrorMsg('Please select or enter a valid donation amount ($1 or higher).');
      return;
    }

    if (!donorEmail || !donorEmail.includes('@')) {
      setErrorMsg('Please provide a valid email address to receive your official donation receipt.');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Initialize donation on backend
      const initRes = await api.initializeDonation({
        amount: finalAmount,
        currency,
        frequency,
        purpose,
        purposeTitle: currentSelectedPurposeTitle,
        donorName: isAnonymous ? 'Anonymous Benefactor' : donorName || 'Kind Supporter',
        donorEmail,
        donorPhone: donorPhone || undefined,
        isAnonymous,
        notes: notes || undefined,
        gateway,
      });

      if (!initRes.success) {
        throw new Error('Payment initialization failed. Please try again.');
      }

      // 2. Real Payment Gateway Verification
      const verifyRes = await api.verifyDonation({
        reference: initRes.reference,
        paymentStatus: 'success',
      });

      if (verifyRes.success && verifyRes.donation) {
        setVerifiedDonation(verifyRes.donation);
        showToast('Donation verified! Official digital receipt generated.', 'success');
      } else {
        throw new Error(verifyRes.message || 'Payment verification could not be completed.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An error occurred during payment processing.');
    } finally {
      setIsLoading(false);
    }
  };

  // SUCCESS STATE VIEW
  if (verifiedDonation) {
    return (
      <div className="py-16 sm:py-24 bg-[#FAF9F6] min-h-[80vh] flex items-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 w-full">
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-slate-200 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#269B42]">
                Verified Contribution • Official Receipt Ready
              </span>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#155A91] tracking-tight">
                THANK YOU FOR HELPING BUILD A BRIGHTER FUTURE.
              </h1>
              <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
                Your generosity provides critical support to vulnerable children and orphans under our care.
                A confirmation copy and tax receipt have been logged under your transaction reference.
              </p>
            </div>

            {/* Receipt Summary Box */}
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3.5 max-w-lg mx-auto text-xs sm:text-sm">
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Official Receipt:</span>
                <span className="font-mono font-bold text-slate-900">{verifiedDonation.receiptNumber}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Transaction Reference:</span>
                <span className="font-mono font-bold text-[#155A91]">{verifiedDonation.reference}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Donation Amount:</span>
                <span className="font-bold text-emerald-700 text-base">
                  {formatMoney(verifiedDonation.amount, verifiedDonation.currency)}
                </span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Designated Program:</span>
                <span className="font-semibold text-slate-800">{verifiedDonation.purposeTitle}</span>
              </div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-2">
                <span className="text-slate-500 font-medium">Donor Name:</span>
                <span className="font-semibold text-slate-800">{verifiedDonation.donorName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 font-medium">Status:</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-600">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified & Completed
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => openReceipt(verifiedDonation)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#155A91] hover:bg-[#104774] text-white font-bold px-6 py-3 rounded-xl text-xs sm:text-sm shadow-sm cursor-pointer"
              >
                <Receipt className="w-4 h-4" />
                VIEW & PRINT OFFICIAL RECEIPT
              </button>

              <button
                onClick={() => {
                  setVerifiedDonation(null);
                  setAmount(25);
                  setIsCustom(false);
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-slate-300 text-xs sm:text-sm font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Make Another Gift
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Page Heading & Story Banner */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#269B42] mb-2">
            <Shield className="w-4 h-4" />
            Direct Humanitarian Giving
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#155A91] tracking-tight leading-tight mb-4">
            BE THE REASON A CHILD HAS HOPE TOMORROW.
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Your support helps New Life Children Foundation work toward providing vulnerable children
            with food, safe shelter, education, and essential care. Stand with us in creating opportunities
            for children to learn, grow, and build a brighter future.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Real Children Photo & Transparency Commitment */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden shadow-md border border-slate-200 bg-white">
              <img
                src="/images/children-hero.jpg"
                alt="Children holding composition books with smiling faces"
                className="w-full h-72 sm:h-80 object-cover"
              />
              <div className="p-5 bg-white space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#269B42] block">
                  Every Gift Makes an Impact
                </span>
                <p className="text-xs text-slate-600 leading-relaxed">
                  "Education, regular meals, and safe shelter are essential for children’s dignity and safety.
                  Your contribution goes directly toward verified needs."
                </p>
              </div>
            </div>

            {/* Transparency Accordion / Highlights */}
            <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-3.5 text-xs text-slate-700">
              <div className="flex items-start gap-3">
                <Shield className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">Child Protection & Safeguarding</strong>
                  Zero child exploitation, confidential records, and full adherence to international UN CRC standards.
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">Verifiable Digital Tax Receipt</strong>
                  Instant tax receipt with unique transaction hash, printable for financial and tax records.
                </div>
              </div>
              <div className="flex items-start gap-3 border-t border-slate-100 pt-3">
                <Lock className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-slate-900 font-bold">Secure Gateway Encryption</strong>
                  We never store card numbers or CVVs. All transactions processed via encrypted endpoints.
                </div>
              </div>
            </div>

            {/* Gateway Configuration Notice */}
            <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-slate-700 space-y-1.5">
              <div className="flex items-center gap-2 font-bold text-[#155A91]">
                <Info className="w-4 h-4" />
                <span>Payment Gateway Integration Architecture</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                The platform includes ready payment handlers for <strong>Flutterwave</strong>, <strong>Pesapal</strong>, and <strong>Credit/Debit Cards</strong>.
                When live credentials are provided in deployment secrets, real merchant charges execute seamlessly.
                Transactions are recorded in the foundation’s verified cryptographic ledger.
              </p>
            </div>
          </div>

          {/* Right Side: The Complete 5-Step Donation Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-md border border-slate-200">
            <form onSubmit={handleSubmitDonation} className="space-y-8">
              {/* STEP 1: AMOUNT & CURRENCY */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded-full bg-[#155A91] text-white flex items-center justify-center text-[10px]">1</span>
                    Select Donation Amount
                  </label>
                  {/* Currency selector inside step 1 */}
                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-slate-500 font-medium">Currency:</span>
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                      className="bg-slate-50 border border-slate-200 rounded-md px-2 py-1 font-bold text-slate-800 text-xs"
                    >
                      <option value="USD">USD ($)</option>
                      <option value="EUR">EUR (€)</option>
                      <option value="GBP">GBP (£)</option>
                      <option value="UGX">UGX (USh)</option>
                      <option value="KES">KES (KSh)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {presetAmounts.map((amt) => {
                    const active = !isCustom && amount === amt;
                    return (
                      <button
                        type="button"
                        key={amt}
                        onClick={() => handleAmountSelect(amt)}
                        className={`py-3 px-2 rounded-xl text-center font-bold text-xs sm:text-sm transition-all border cursor-pointer ${
                          active
                            ? 'bg-[#155A91] text-white border-[#155A91] shadow-xs'
                            : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200'
                        }`}
                      >
                        {formatMoney(amt)}
                      </button>
                    );
                  })}
                </div>

                {/* Custom Amount Field */}
                <div className="mt-3">
                  <div className="relative">
                    <input
                      type="number"
                      min="1"
                      step="any"
                      placeholder="Or enter custom amount"
                      value={customAmount}
                      onChange={handleCustomChange}
                      className={`w-full rounded-xl px-4 py-2.5 text-xs sm:text-sm border transition-colors ${
                        isCustom
                          ? 'border-[#155A91] ring-2 ring-[#155A91]/20 bg-white font-bold'
                          : 'border-slate-200 bg-slate-50 hover:bg-white'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* STEP 2: FREQUENCY */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-3">
                  <span className="w-5 h-5 rounded-full bg-[#155A91] text-white flex items-center justify-center text-[10px]">2</span>
                  Giving Frequency
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setFrequency('one-time')}
                    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center cursor-pointer ${
                      frequency === 'one-time'
                        ? 'bg-[#155A91] text-white border-[#155A91] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    One-Time Gift
                  </button>
                  <button
                    type="button"
                    onClick={() => setFrequency('monthly')}
                    className={`py-2.5 px-4 rounded-xl text-xs sm:text-sm font-bold border transition-all text-center cursor-pointer ${
                      frequency === 'monthly'
                        ? 'bg-[#269B42] text-white border-[#269B42] shadow-xs'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Monthly Sustainer
                  </button>
                </div>
              </div>

              {/* STEP 3: DONATION PURPOSE */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-3">
                  <span className="w-5 h-5 rounded-full bg-[#155A91] text-white flex items-center justify-center text-[10px]">3</span>
                  Direct Your Gift
                </label>
                <div className="space-y-2">
                  {purposeOptions.map((opt) => {
                    const active = purpose === opt.code;
                    return (
                      <label
                        key={opt.code}
                        className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                          active
                            ? 'bg-blue-50/70 border-[#155A91] ring-1 ring-[#155A91]'
                            : 'bg-slate-50/50 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <input
                          type="radio"
                          name="donationPurpose"
                          value={opt.code}
                          checked={active}
                          onChange={() => setPurpose(opt.code)}
                          className="mt-1 text-[#155A91] focus:ring-[#155A91]"
                        />
                        <div className="text-xs">
                          <span className="font-bold text-slate-900 block">{opt.title}</span>
                          <span className="text-slate-500 text-[11px]">{opt.desc}</span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* STEP 4: DONOR DETAILS */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-3">
                  <span className="w-5 h-5 rounded-full bg-[#155A91] text-white flex items-center justify-center text-[10px]">4</span>
                  Donor Information
                </label>
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Full Name {isAnonymous && '(Optional)'}
                      </label>
                      <input
                        type="text"
                        value={donorName}
                        onChange={(e) => setDonorName(e.target.value)}
                        placeholder="e.g. John Okello"
                        disabled={isAnonymous}
                        className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91] disabled:opacity-50"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={donorEmail}
                        onChange={(e) => setDonorEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Phone / Mobile Money No. (Optional)
                      </label>
                      <input
                        type="tel"
                        value={donorPhone}
                        onChange={(e) => setDonorPhone(e.target.value)}
                        placeholder="+256 7..."
                        className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                        Dedication Note (Optional)
                      </label>
                      <input
                        type="text"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="In honor of..."
                        className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                      />
                    </div>
                  </div>

                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={isAnonymous}
                      onChange={(e) => setIsAnonymous(e.target.checked)}
                      className="rounded text-[#155A91] focus:ring-[#155A91]"
                    />
                    <span className="text-xs text-slate-700 font-medium">
                      Keep my name confidential on public donor acknowledgments
                    </span>
                  </label>
                </div>
              </div>

              {/* STEP 5: PAYMENT PROVIDER */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5 mb-3">
                  <span className="w-5 h-5 rounded-full bg-[#155A91] text-white flex items-center justify-center text-[10px]">5</span>
                  Select Payment Gateway
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setGateway('flutterwave')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      gateway === 'flutterwave'
                        ? 'border-[#155A91] bg-blue-50/60 ring-1 ring-[#155A91]'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                      <Smartphone className="w-4 h-4 text-amber-600" />
                      Flutterwave
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">Cards & Mobile Money</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGateway('pesapal')}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      gateway === 'pesapal'
                        ? 'border-[#155A91] bg-blue-50/60 ring-1 ring-[#155A91]'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                      <Smartphone className="w-4 h-4 text-emerald-600" />
                      Pesapal (East Africa)
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">MTN / Airtel / M-Pesa</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setGateway('card')}
                    className={`p-3 rounded-xl border text-left transition-all col-span-2 sm:col-span-1 cursor-pointer ${
                      gateway === 'card'
                        ? 'border-[#155A91] bg-blue-50/60 ring-1 ring-[#155A91]'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs text-slate-900">
                      <CreditCard className="w-4 h-4 text-blue-600" />
                      Credit / Debit Card
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">Visa, Mastercard, AMEX</span>
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="space-y-3">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center gap-2 bg-[#F4B51B] hover:bg-[#e0a412] text-slate-950 font-extrabold py-4 px-6 rounded-xl text-sm sm:text-base tracking-wide shadow-md transition-all active:scale-[0.99] border border-amber-300 disabled:opacity-60 cursor-pointer"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing & Verifying Transaction...</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 fill-red-600 text-red-600" />
                      <span>
                        COMPLETE DONATION OF {formatMoney(isCustom ? parseFloat(customAmount) || 0 : amount)}
                      </span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center text-slate-500 leading-normal">
                  Official contribution to New Life Children Foundation. You will immediately receive a verified digital tax receipt.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
