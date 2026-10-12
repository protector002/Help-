import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { api } from '../lib/api';
import {
  Mail,
  Phone,
  MapPin,
  ShieldAlert,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast, openPolicyModal } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSafeguardingConcern, setIsSafeguardingConcern] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName || !email || !message) {
      setErrorMsg('Please provide your name, email, and message.');
      return;
    }

    setIsLoading(true);
    try {
      const res = await api.submitContact({
        fullName,
        email,
        subject: subject || (isSafeguardingConcern ? 'Confidential Safeguarding Report' : 'General Inquiry'),
        message,
        isSafeguardingConcern,
      });

      if (res.success) {
        setIsSent(true);
        showToast(
          isSafeguardingConcern
            ? 'Safeguarding report safely delivered to our protection officer.'
            : 'Message sent! Our team will get back to you shortly.',
          'success'
        );
      } else {
        throw new Error(res.message);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to send message.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="py-12 sm:py-20 bg-[#FAF9F6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#155A91] mb-2">
            <Mail className="w-4 h-4 text-[#269B42]" />
            Official Inquiries
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#155A91] tracking-tight leading-tight mb-4">
            WE ARE HERE TO LISTEN AND CONNECT.
          </h1>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Whether you have questions regarding our educational programs, wish to confirm a contribution,
            or need to file an urgent child protection inquiry, our team is accessible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Official Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
              <h2 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
                Foundation Office Details
              </h2>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#155A91] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">General Location</strong>
                    <span>East Africa / Uganda</span>
                    <span className="block text-[11px] text-slate-500">Regional Learning & Support Center</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#155A91] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">General Correspondence</strong>
                    <a
                      href="mailto:contact@newlifechildrenfoundation.org"
                      className="text-[#155A91] hover:underline font-medium"
                    >
                      contact@newlifechildrenfoundation.org
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#155A91] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Telephone Inquiries</strong>
                    <span>+256 700 123 456 (Office)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#155A91] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-semibold">Operating Hours</strong>
                    <span>Monday – Friday: 8:00 AM – 5:00 PM (EAT)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dedicated Safeguarding Pathway */}
            <div className="bg-red-50/70 border border-red-200 rounded-3xl p-6 space-y-3">
              <div className="flex items-center gap-2 text-red-800 font-bold text-sm">
                <ShieldAlert className="w-5 h-5 text-red-600" />
                <span>Restricted Child Protection Hotline</span>
              </div>
              <p className="text-xs text-red-700 leading-relaxed">
                If you have an urgent or confidential concern regarding a child's safety or wellbeing,
                you may flag your message below as a Safeguarding Concern or email our Child Protection Lead directly at:
              </p>
              <div className="text-xs font-mono font-bold text-red-900 bg-red-100/60 p-2 rounded-lg">
                safeguarding@newlifechildrenfoundation.org
              </div>
              <p className="text-[11px] text-red-600">
                All safeguarding notifications are reviewed within 4 hours by the designated oversight officer.
              </p>
            </div>
          </div>

          {/* Right Column: Contact & Safeguarding Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md">
            {isSent ? (
              <div className="text-center py-12 space-y-4 max-w-md mx-auto">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900">Message Received</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Thank you for reaching out to New Life Children Foundation.
                  A copy of your message has been logged, and an authorized representative will review it.
                </p>
                <button
                  onClick={() => {
                    setIsSent(false);
                    setFullName('');
                    setEmail('');
                    setSubject('');
                    setMessage('');
                    setIsSafeguardingConcern(false);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Send an Official Message</h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Please provide accurate contact details so we may respond appropriately.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jane Doe"
                      className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Your Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="jane@example.com"
                      className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Program inquiry, Donation receipt question"
                    className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full rounded-xl px-3.5 py-2.5 text-xs border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#155A91]"
                  />
                </div>

                {/* Safeguarding Concern Toggle */}
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isSafeguardingConcern}
                      onChange={(e) => setIsSafeguardingConcern(e.target.checked)}
                      className="mt-0.5 rounded text-red-600 focus:ring-red-500"
                    />
                    <div className="text-xs text-slate-800">
                      <span className="font-bold text-red-700 block">
                        Flag as Confidential Child Safeguarding Concern
                      </span>
                      <span className="text-slate-500 text-[11px]">
                        Routes this submission immediately with high priority to our designated Child Protection Committee.
                      </span>
                    </div>
                  </label>
                </div>

                {errorMsg && (
                  <div className="p-3 rounded-lg bg-red-50 text-red-700 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#155A91] hover:bg-[#104774] text-white font-bold py-3 px-8 rounded-xl text-xs sm:text-sm shadow-xs transition-colors disabled:opacity-60 cursor-pointer"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Sending message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Official Message</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-slate-500">
                    We process information strictly in line with our{' '}
                    <button
                      type="button"
                      onClick={() => openPolicyModal('privacy')}
                      className="text-[#155A91] underline cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                    .
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
