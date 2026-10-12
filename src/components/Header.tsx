import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { PageRoute, CurrencyCode } from '../types';
import { Menu, X, Heart, Shield, Lock, Mail } from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    currency,
    setCurrency,
    isAdmin,
    startDonation,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'About Us', page: 'about' },
    { label: 'Our Children', page: 'children' },
    { label: 'Our Programs', page: 'programs' },
    { label: 'Our Facilities', page: 'facilities' },
    { label: 'Our Impact', page: 'impact' },
    { label: 'Get Involved', page: 'volunteer' },
    { label: 'Contact Us', page: 'contact' },
  ];

  const handleNav = (page: PageRoute) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Banner: Verification, Tagline, & Quick Contact */}
      <div className="bg-[#155A91] text-white text-xs font-medium py-1.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-amber-300 font-semibold tracking-wider uppercase text-[11px]">
              <Shield className="w-3.5 h-3.5" />
              SAFE CHILDREN • BRIGHTER FUTURES
            </span>
            <span className="hidden md:inline text-white/40">|</span>
            <span className="hidden md:inline text-white/90">
              International Child Protection & Community Care
            </span>
          </div>

          <div className="flex items-center gap-4 text-white/90">
            <a
              href="mailto:contact@newlifechildrenfoundation.org"
              className="hidden sm:inline-flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Mail className="w-3 h-3" />
              contact@newlifechildrenfoundation.org
            </a>
            <span className="hidden sm:inline text-white/40">|</span>
            
            {/* Currency Switcher */}
            <div className="flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-[11px]">
              <span className="text-white/70">Currency:</span>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                className="bg-transparent text-white font-semibold focus:outline-none cursor-pointer"
                aria-label="Select Currency"
              >
                <option value="USD" className="text-slate-900">USD ($)</option>
                <option value="EUR" className="text-slate-900">EUR (€)</option>
                <option value="GBP" className="text-slate-900">GBP (£)</option>
                <option value="UGX" className="text-slate-900">UGX (USh)</option>
                <option value="KES" className="text-slate-900">KES (KSh)</option>
              </select>
            </div>

            {/* Admin entry point link */}
            <button
              onClick={() => handleNav('admin')}
              className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded transition-colors ${
                isAdmin
                  ? 'bg-emerald-600 text-white font-semibold'
                  : 'text-white/70 hover:text-white hover:bg-white/10'
              }`}
              title={isAdmin ? 'Admin Console (Authenticated)' : 'Administrator Login'}
            >
              <Lock className="w-3 h-3" />
              <span>{isAdmin ? 'Admin Portal' : 'Staff'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div
        className={`w-full transition-all duration-200 border-b ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-slate-200/80 py-2.5'
            : 'bg-white border-slate-100 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo & Brand Name */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 text-left group focus-visible:outline-2 focus-visible:outline-[#155A91] rounded-lg"
          >
            <div className="relative w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border border-slate-200 bg-white p-0.5 shadow-xs flex-shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/images/foundation-logo.jpg"
                alt="New Life Children Foundation Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <div>
              <span className="block text-base sm:text-lg font-extrabold text-[#155A91] tracking-tight leading-tight">
                NEW LIFE CHILDREN <span className="text-[#269B42]">FOUNDATION</span>
              </span>
              <span className="block text-[11px] font-semibold text-slate-500 tracking-wider uppercase">
                Safe Children • Brighter Futures
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((item) => {
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors relative ${
                    isActive
                      ? 'text-[#155A91] font-semibold bg-blue-50/70'
                      : 'text-slate-700 hover:text-[#155A91] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#155A91] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Donate Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNav('donate')}
              className="inline-flex items-center gap-2 bg-[#F4B51B] hover:bg-[#e0a412] text-slate-900 font-bold px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-[0.98] border border-amber-400 text-sm tracking-wide"
            >
              <Heart className="w-4 h-4 fill-red-600 text-red-600" />
              DONATE NOW
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => handleNav('donate')}
              className="sm:hidden inline-flex items-center gap-1.5 bg-[#F4B51B] text-slate-900 font-bold px-3 py-1.5 rounded-md text-xs border border-amber-400"
            >
              <Heart className="w-3.5 h-3.5 fill-red-600 text-red-600" />
              DONATE
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-700 hover:text-slate-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[102px] bg-white border-b border-slate-200 shadow-xl max-h-[calc(100vh-102px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200">
          <div className="px-4 py-4 space-y-1 divide-y divide-slate-100">
            <div className="space-y-1 pb-3">
              {navLinks.map((item) => {
                const isActive = currentPage === item.page;
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNav(item.page)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors flex items-center justify-between ${
                      isActive
                        ? 'bg-blue-50 text-[#155A91] font-bold'
                        : 'text-slate-800 hover:bg-slate-50'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#155A91]" />}
                  </button>
                );
              })}
            </div>

            <div className="pt-3 pb-2 space-y-3">
              <button
                onClick={() => handleNav('donate')}
                className="w-full flex items-center justify-center gap-2 bg-[#F4B51B] hover:bg-[#e0a412] text-slate-900 font-bold py-3 px-4 rounded-lg shadow-sm text-sm"
              >
                <Heart className="w-4 h-4 fill-red-600 text-red-600" />
                DONATE TO SUPPORT OUR CHILDREN
              </button>

              <div className="flex items-center justify-between text-xs text-slate-600 px-2 py-2 bg-slate-50 rounded-lg">
                <span>Selected Currency:</span>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                  className="bg-white border border-slate-300 rounded px-2 py-1 font-semibold text-slate-800"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="UGX">UGX (USh)</option>
                  <option value="KES">KES (KSh)</option>
                </select>
              </div>

              <button
                onClick={() => handleNav('admin')}
                className="w-full flex items-center justify-center gap-2 text-xs font-semibold text-slate-600 hover:text-slate-900 py-2 border border-slate-200 rounded-lg"
              >
                <Lock className="w-3.5 h-3.5" />
                {isAdmin ? 'Access Administrative Dashboard' : 'Staff / Admin Portal'}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
