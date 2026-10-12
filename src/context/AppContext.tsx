import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import {
  PageRoute,
  CurrencyCode,
  ProgramItem,
  FacilityItem,
  GalleryPhoto,
  ImpactStats,
  SiteSettings,
  DonationRecord,
  DonationPurpose,
} from '../types';
import { api } from '../lib/api';
import {
  INITIAL_PROGRAMS,
  INITIAL_FACILITIES,
  INITIAL_GALLERY,
  INITIAL_IMPACT,
  INITIAL_SETTINGS,
} from '../lib/initialData';

interface ToastInfo {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface AppContextType {
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatMoney: (amount: number, curr?: CurrencyCode) => string;
  currencyRate: (curr: CurrencyCode) => number;
  programs: ProgramItem[];
  facilities: FacilityItem[];
  gallery: GalleryPhoto[];
  impact: ImpactStats;
  settings: SiteSettings;
  // Donation intent
  preselectedPurpose: DonationPurpose;
  preselectedAmount: number;
  startDonation: (purpose?: DonationPurpose, amount?: number) => void;
  // Modals
  lightboxPhoto: GalleryPhoto | null;
  openLightbox: (photo: GalleryPhoto) => void;
  closeLightbox: () => void;
  activeReceipt: DonationRecord | null;
  openReceipt: (record: DonationRecord) => void;
  closeReceipt: () => void;
  activePolicyModal: 'safeguarding' | 'privacy' | null;
  openPolicyModal: (type: 'safeguarding' | 'privacy') => void;
  closePolicyModal: () => void;
  // Admin auth
  isAdmin: boolean;
  adminToken: string | null;
  loginAdmin: (password: string) => Promise<boolean>;
  logoutAdmin: () => void;
  // Notifications
  toasts: ToastInfo[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
  removeToast: (id: string) => void;
  refreshData: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Exchange rates relative to 1 USD
const RATES: Record<CurrencyCode, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  UGX: 3750,
  KES: 130,
};

const SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  UGX: 'UGX ',
  KES: 'KES ',
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<PageRoute>('home');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [programs, setPrograms] = useState<ProgramItem[]>(INITIAL_PROGRAMS);
  const [facilities, setFacilities] = useState<FacilityItem[]>(INITIAL_FACILITIES);
  const [gallery, setGallery] = useState<GalleryPhoto[]>(INITIAL_GALLERY);
  const [impact, setImpact] = useState<ImpactStats>(INITIAL_IMPACT);
  const [settings, setSettings] = useState<SiteSettings>(INITIAL_SETTINGS);

  const [preselectedPurpose, setPreselectedPurpose] = useState<DonationPurpose>('general');
  const [preselectedAmount, setPreselectedAmount] = useState<number>(25);

  const [lightboxPhoto, setLightboxPhoto] = useState<GalleryPhoto | null>(null);
  const [activeReceipt, setActiveReceipt] = useState<DonationRecord | null>(null);
  const [activePolicyModal, setActivePolicyModal] = useState<'safeguarding' | 'privacy' | null>(null);

  const [adminToken, setAdminToken] = useState<string | null>(() => {
    return localStorage.getItem('nlcf_admin_token') || null;
  });
  const isAdmin = Boolean(adminToken);

  const [toasts, setToasts] = useState<ToastInfo[]>([]);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      const validRoutes: PageRoute[] = [
        'home', 'about', 'children', 'programs', 'facilities',
        'impact', 'volunteer', 'contact', 'donate', 'admin',
        'safeguarding-policy', 'privacy-policy'
      ];
      if (validRoutes.includes(hash)) {
        setCurrentPageState(hash);
      }
    };

    if (window.location.hash) {
      handleHashChange();
    }
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const setCurrentPage = (page: PageRoute) => {
    setCurrentPageState(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const refreshData = async () => {
    try {
      const [progs, facs, gals, imp, sets] = await Promise.all([
        api.getPrograms(),
        api.getFacilities(),
        api.getGallery(),
        api.getImpact(),
        api.getSettings(),
      ]);
      setPrograms(progs);
      setFacilities(facs);
      setGallery(gals);
      setImpact(imp);
      setSettings(sets);
    } catch (e) {
      console.warn('Initial fetch defaulted to seeded state');
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const currencyRate = (curr: CurrencyCode) => RATES[curr] || 1;

  const formatMoney = (amountInUSD: number, targetCurr?: CurrencyCode): string => {
    const curr = targetCurr || currency;
    const rate = RATES[curr];
    const converted = amountInUSD * rate;
    const symbol = SYMBOLS[curr];

    if (curr === 'UGX' || curr === 'KES') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toLocaleString(undefined, {
      minimumFractionDigits: Number.isInteger(converted) ? 0 : 2,
      maximumFractionDigits: 2,
    })}`;
  };

  const startDonation = (purpose: DonationPurpose = 'general', amount: number = 25) => {
    setPreselectedPurpose(purpose);
    setPreselectedAmount(amount);
    setCurrentPage('donate');
  };

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loginAdmin = async (password: string): Promise<boolean> => {
    try {
      const res = await api.adminLogin(password);
      if (res.success && res.token) {
        setAdminToken(res.token);
        localStorage.setItem('nlcf_admin_token', res.token);
        showToast('Administrator authenticated successfully', 'success');
        return true;
      }
      showToast('Invalid administrator password', 'error');
      return false;
    } catch (err: any) {
      showToast(err.message || 'Login failed', 'error');
      return false;
    }
  };

  const logoutAdmin = () => {
    setAdminToken(null);
    localStorage.removeItem('nlcf_admin_token');
    showToast('Logged out of administrative console', 'info');
    setCurrentPage('home');
  };

  return (
    <AppContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        currency,
        setCurrency,
        formatMoney,
        currencyRate,
        programs,
        facilities,
        gallery,
        impact,
        settings,
        preselectedPurpose,
        preselectedAmount,
        startDonation,
        lightboxPhoto,
        openLightbox: (photo) => setLightboxPhoto(photo),
        closeLightbox: () => setLightboxPhoto(null),
        activeReceipt,
        openReceipt: (rec) => setActiveReceipt(rec),
        closeReceipt: () => setActiveReceipt(null),
        activePolicyModal,
        openPolicyModal: (type) => setActivePolicyModal(type),
        closePolicyModal: () => setActivePolicyModal(null),
        isAdmin,
        adminToken,
        loginAdmin,
        logoutAdmin,
        toasts,
        showToast,
        removeToast,
        refreshData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
