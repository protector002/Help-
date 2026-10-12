import React from 'react';
import { useApp } from '../context/AppContext';
import { X, Shield, Lock } from 'lucide-react';

export const PolicyModals: React.FC = () => {
  const { activePolicyModal, closePolicyModal } = useApp();

  if (!activePolicyModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs overflow-y-auto"
      onClick={closePolicyModal}
    >
      <div
        className="relative max-w-2xl w-full bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 my-8 space-y-6 max-h-[85vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closePolicyModal}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-800 p-2 rounded-full hover:bg-slate-100 cursor-pointer"
          aria-label="Close policy modal"
        >
          <X className="w-5 h-5" />
        </button>

        {activePolicyModal === 'safeguarding' ? (
          <div className="space-y-4 text-slate-700 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-[#155A91] pb-2 border-b border-slate-200">
              <Shield className="w-6 h-6 text-[#269B42]" />
              <h2 className="text-xl font-bold text-slate-900">
                Child Safeguarding & Protection Policy
              </h2>
            </div>

            <p className="font-semibold text-slate-900">
              New Life Children Foundation operates with a strict, uncompromising zero-tolerance policy against any form of child abuse, neglect, exploitation, or discrimination.
            </p>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">1. Core Safeguarding Commitments</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>Every child under our care has an inalienable right to safety, dignity, and respect regardless of gender, background, or ability.</li>
                <li>All staff, teachers, visitors, and volunteers must undergo police background clearance and safeguarding vetting prior to engagement.</li>
                <li>No volunteer or visitor is permitted unsupervised or private access to children.</li>
              </ul>

              <h3 className="font-bold text-slate-900 text-sm">2. Image & Identity Non-Exploitation</h3>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
                <li>Photographs are taken and published solely with verified institutional consent and respect for children's dignity.</li>
                <li>We prohibit the dissemination of images portraying children in distressing, degrading, or compromised states for fundraising.</li>
                <li>Full legal names, home residences, medical records, and precise geo-locations are strictly withheld from public materials.</li>
              </ul>

              <h3 className="font-bold text-slate-900 text-sm">3. Confidential Reporting Mechanism</h3>
              <p className="text-slate-600">
                Anyone with a suspicion or concern regarding a child's safety is required to notify our designated Child Protection Committee immediately via <strong className="text-slate-900">safeguarding@newlifechildrenfoundation.org</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={closePolicyModal}
                className="px-5 py-2.5 rounded-xl bg-[#155A91] text-white font-bold text-xs cursor-pointer"
              >
                Close Policy
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-slate-700 text-xs sm:text-sm">
            <div className="flex items-center gap-2.5 text-[#155A91] pb-2 border-b border-slate-200">
              <Lock className="w-6 h-6 text-[#155A91]" />
              <h2 className="text-xl font-bold text-slate-900">
                Donor Privacy & Data Protection Policy
              </h2>
            </div>

            <p className="font-semibold text-slate-900">
              New Life Children Foundation respects the privacy of all benefactors, volunteers, and website visitors.
            </p>

            <div className="space-y-3">
              <h3 className="font-bold text-slate-900 text-sm">1. Collection of Donor Data</h3>
              <p className="text-slate-600">
                We collect donor contact details solely to generate tax-deductible receipts, verify transactions, and provide official progress updates. We never sell, rent, or trade donor lists to third parties.
              </p>

              <h3 className="font-bold text-slate-900 text-sm">2. Payment Security & Processing</h3>
              <p className="text-slate-600">
                Payment transactions are processed through encrypted payment gateway connections (such as Flutterwave, Pesapal, or card networks). Raw payment card numbers and CVV codes are never stored on our servers.
              </p>

              <h3 className="font-bold text-slate-900 text-sm">3. Opt-out & Information Access</h3>
              <p className="text-slate-600">
                Donors may choose to give anonymously, request removal from communication lists, or request records of their charitable contributions at any time by contacting our office.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end">
              <button
                onClick={closePolicyModal}
                className="px-5 py-2.5 rounded-xl bg-[#155A91] text-white font-bold text-xs cursor-pointer"
              >
                Close Policy
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
