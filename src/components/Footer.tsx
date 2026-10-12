import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageRoute } from '../types';
import { Shield, Mail, Phone, MapPin, Heart, ArrowRight, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, openPolicyModal, showToast } = useApp();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Thank you for subscribing to our official community updates!', 'success');
    setNewsletterEmail('');
  };

  const navTo = (page: PageRoute) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#155A91] text-white pt-16 pb-8 border-t border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Col 1 & 2: Branding & Identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-full overflow-hidden bg-white p-1 shadow-sm flex-shrink-0">
                <img
                  src="/images/foundation-logo.jpg"
                  alt="New Life Children Foundation"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="block text-xl font-extrabold text-white tracking-tight">
                  NEW LIFE CHILDREN <span className="text-[#64D878]">FOUNDATION</span>
                </span>
                <span className="block text-xs font-semibold text-amber-300 tracking-wider uppercase">
                  SAFE CHILDREN • BRIGHTER FUTURES
                </span>
              </div>
            </div>

            <p className="text-white/80 text-sm leading-relaxed max-w-md">
              Supporting vulnerable children and orphans through access to nutritious food,
              safe shelter, quality education, healthcare, and unconditional compassion.
              Every child deserves dignity, safety, and a real chance to thrive.
            </p>

            <div className="pt-2 flex items-center gap-2 text-xs text-amber-200">
              <Shield className="w-4 h-4 text-emerald-400 flex-shrink-0" />
              <span>Strict Child Safeguarding & International Non-Exploitation Standards</span>
            </div>
          </div>

          {/* Col 3: Navigation */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-4">
              Explore
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button onClick={() => navTo('home')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => navTo('about')} className="hover:text-white transition-colors">
                  About Our Mission
                </button>
              </li>
              <li>
                <button onClick={() => navTo('children')} className="hover:text-white transition-colors">
                  Our Children & Stories
                </button>
              </li>
              <li>
                <button onClick={() => navTo('programs')} className="hover:text-white transition-colors">
                  Our Programs
                </button>
              </li>
              <li>
                <button onClick={() => navTo('facilities')} className="hover:text-white transition-colors">
                  Our Facilities & School
                </button>
              </li>
              <li>
                <button onClick={() => navTo('impact')} className="hover:text-white transition-colors">
                  Impact & Transparency
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Ways to Help */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-4">
              Get Involved
            </h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button onClick={() => navTo('donate')} className="hover:text-white transition-colors flex items-center gap-1 font-semibold text-amber-200">
                  <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                  Donate to Programs
                </button>
              </li>
              <li>
                <button onClick={() => navTo('volunteer')} className="hover:text-white transition-colors">
                  Volunteer Application
                </button>
              </li>
              <li>
                <button onClick={() => navTo('volunteer')} className="hover:text-white transition-colors">
                  Institutional Partnerships
                </button>
              </li>
              <li>
                <button onClick={() => navTo('contact')} className="hover:text-white transition-colors">
                  Contact Foundation Office
                </button>
              </li>
              <li>
                <button onClick={() => openPolicyModal('safeguarding')} className="hover:text-white transition-colors text-xs text-emerald-300">
                  Child Protection Policy
                </button>
              </li>
              <li>
                <button onClick={() => openPolicyModal('privacy')} className="hover:text-white transition-colors text-xs text-white/70">
                  Privacy & Data Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter & Contact */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-amber-300 mb-4">
              Stay Connected
            </h3>
            <p className="text-xs text-white/80 leading-relaxed mb-3">
              Subscribe to verified quarterly progress reports and project updates.
            </p>

            {subscribed ? (
              <div className="flex items-center gap-2 p-2.5 rounded-lg bg-emerald-800/60 border border-emerald-500/40 text-xs text-emerald-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-300 flex-shrink-0" />
                <span>Subscribed! Thank you for walking alongside our children.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-xs text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-amber-300"
                    required
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1 bottom-1 px-2.5 bg-[#F4B51B] text-slate-900 rounded-md font-bold text-xs hover:bg-[#e0a412] transition-colors"
                    aria-label="Submit newsletter subscription"
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="mt-5 space-y-2 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-amber-300 flex-shrink-0 mt-0.5" />
                <span>East Africa / Uganda</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                <span>contact@newlifechildrenfoundation.org</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-amber-300 flex-shrink-0" />
                <span>+256 700 123 456 (General)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© {new Date().getFullYear()} New Life Children Foundation. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={() => openPolicyModal('safeguarding')} className="hover:text-white transition-colors">
              Child Safeguarding
            </button>
            <span>·</span>
            <button onClick={() => openPolicyModal('privacy')} className="hover:text-white transition-colors">
              Privacy & Cookies
            </button>
            <span>·</span>
            <button onClick={() => navTo('admin')} className="hover:text-white transition-colors">
              Staff Portal
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
