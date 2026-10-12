import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Printer, CheckCircle2, Shield } from 'lucide-react';

export const ReceiptModal: React.FC = () => {
  const { activeReceipt, closeReceipt, formatMoney } = useApp();

  if (!activeReceipt) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs overflow-y-auto"
      onClick={closeReceipt}
    >
      <div
        className="relative max-w-2xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 my-8 print:m-0 print:border-none print:shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Action Bar (Hidden during print) */}
        <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex items-center justify-between print:hidden">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            Official Donation Certificate & Receipt
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#155A91] text-white text-xs font-bold rounded-lg hover:bg-[#104774] transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={closeReceipt}
              className="p-1.5 text-slate-500 hover:text-slate-800 rounded-lg hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div className="p-8 sm:p-10 space-y-6 text-slate-800">
          {/* Header with Logo */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-6">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-white border border-slate-200 p-1">
                <img
                  src="/images/foundation-logo.jpg"
                  alt="New Life Children Foundation"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-[#155A91] leading-tight">
                  NEW LIFE CHILDREN FOUNDATION
                </h2>
                <span className="text-xs font-bold text-[#269B42] uppercase tracking-wider block">
                  SAFE CHILDREN • BRIGHTER FUTURES
                </span>
                <span className="text-[11px] text-slate-500 block">
                  contact@newlifechildrenfoundation.org
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="inline-block px-2.5 py-1 rounded bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs">
                VERIFIED PAYMENT
              </span>
              <div className="text-[11px] text-slate-500 mt-1">
                Receipt #{activeReceipt.receiptNumber}
              </div>
            </div>
          </div>

          {/* Details Table */}
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
              <div>
                <span className="text-slate-500 text-xs block">Donor Name:</span>
                <strong className="text-slate-900 font-bold">{activeReceipt.donorName}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-xs block">Donor Email:</span>
                <strong className="text-slate-900 font-bold">{activeReceipt.donorEmail}</strong>
              </div>
              <div>
                <span className="text-slate-500 text-xs block">Date & Time:</span>
                <span className="text-slate-800">{new Date(activeReceipt.createdAt).toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 text-xs block">Giving Frequency:</span>
                <span className="text-slate-800 capitalize font-medium">{activeReceipt.frequency}</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 space-y-3">
              <div className="flex justify-between items-center text-sm border-b border-slate-100 pb-2">
                <span className="text-slate-600 font-medium">Designated Program</span>
                <span className="font-bold text-slate-900">{activeReceipt.purposeTitle}</span>
              </div>

              <div className="flex justify-between items-center text-base border-b border-slate-100 pb-2">
                <span className="text-slate-600 font-medium">Verified Contribution Amount</span>
                <span className="text-xl font-extrabold text-emerald-700">
                  {formatMoney(activeReceipt.amount, activeReceipt.currency)}
                </span>
              </div>

              <div className="flex justify-between items-center text-xs text-slate-500 pt-1">
                <span>Transaction Reference:</span>
                <span className="font-mono font-bold text-slate-700">{activeReceipt.reference}</span>
              </div>

              {activeReceipt.transactionHash && (
                <div className="flex justify-between items-center text-[11px] text-slate-400">
                  <span>Cryptographic Proof:</span>
                  <span className="font-mono">{activeReceipt.transactionHash}</span>
                </div>
              )}
            </div>
          </div>

          {/* Charitable Exemption Clause */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-600 leading-relaxed">
            <strong className="text-slate-800 font-bold block mb-1">
              Official Charitable Contribution Receipt
            </strong>
            Thank you for your generous gift. No goods or services were provided in exchange for this contribution other than intangible religious or charitable benefits. Please retain this receipt for your personal tax and donation records.
          </div>

          {/* Footer note */}
          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100 flex items-center justify-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#269B42]" />
            <span>New Life Children Foundation • Safe Children • Brighter Futures</span>
          </div>
        </div>
      </div>
    </div>
  );
};
