export type PageRoute = 
  | 'home'
  | 'about'
  | 'children'
  | 'programs'
  | 'facilities'
  | 'impact'
  | 'volunteer'
  | 'contact'
  | 'donate'
  | 'admin'
  | 'safeguarding-policy'
  | 'privacy-policy';

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'UGX' | 'KES';

export type DonationFrequency = 'one-time' | 'monthly';

export type DonationPurpose = 
  | 'food_nutrition'
  | 'education'
  | 'shelter'
  | 'healthcare'
  | 'general';

export type PaymentGateway = 'flutterwave' | 'pesapal' | 'card' | 'mobile_money' | 'paypal';

export type PaymentStatus = 'pending' | 'verified_success' | 'failed' | 'refunded';

export interface DonationRecord {
  id: string;
  reference: string;
  amount: number;
  currency: CurrencyCode;
  frequency: DonationFrequency;
  purpose: DonationPurpose;
  purposeTitle: string;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  isAnonymous: boolean;
  notes?: string;
  gateway: PaymentGateway;
  status: PaymentStatus;
  createdAt: string;
  verifiedAt?: string;
  transactionHash?: string;
  receiptNumber: string;
}

export interface ProgramItem {
  id: string;
  title: string;
  category: string;
  description: string;
  fullDetails: string;
  status: 'active' | 'planned' | 'urgent';
  image: string;
  imageAlt: string;
  beneficiariesCount: number;
  fundsTarget?: number;
  fundsRaised?: number;
  purposeCode: DonationPurpose;
}

export interface FacilityItem {
  id: string;
  title: string;
  category: 'educational' | 'classrooms' | 'veranda' | 'vocational' | 'community';
  categoryLabel: string;
  image: string;
  caption: string;
  description: string;
  status: 'operational' | 'needs_renovation' | 'expansion_planned';
  generalLocation: string;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  category: 'children' | 'education' | 'facilities' | 'nutrition' | 'community';
  aspectRatio: 'landscape' | 'portrait' | 'square';
  isApproved: boolean;
  safeguardingVerified: boolean;
  featured?: boolean;
}

export interface ImpactStats {
  childrenSupported: number;
  mealsProvidedMonthly: number;
  classroomsOperating: number;
  computerWorkstations: number;
  volunteersEngaged: number;
  lastUpdated: string;
  isVerified: boolean;
}

export interface VolunteerApplication {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  skills: string;
  availability: string;
  areaOfInterest: string;
  safeguardingAgreed: boolean;
  status: 'pending' | 'reviewed' | 'approved' | 'archived';
  submittedAt: string;
  notes?: string;
}

export interface PartnershipInquiry {
  id: string;
  organizationName: string;
  contactPerson: string;
  email: string;
  phone?: string;
  partnershipType: string;
  proposal: string;
  status: 'pending' | 'reviewed' | 'contacted';
  submittedAt: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  isSafeguardingConcern: boolean;
  status: 'unread' | 'read' | 'replied';
  submittedAt: string;
}

export interface SiteSettings {
  organizationName: string;
  tagline: string;
  phone: string;
  email: string;
  safeguardingEmail: string;
  location: string;
  emergencyPhone: string;
  flutterwaveConfigured: boolean;
  pesapalConfigured: boolean;
  paypalConfigured: boolean;
  customSuggestedAmounts: number[];
}
