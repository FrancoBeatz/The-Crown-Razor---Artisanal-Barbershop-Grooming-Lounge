export type ServiceCategory = 'haircut' | 'shave' | 'combo' | 'grooming' | 'vip';

export interface BarberService {
  id: string;
  name: string;
  category: ServiceCategory;
  price: number;
  durationMinutes: number;
  tagline: string;
  description: string;
  popular?: boolean;
  includes: string[];
}

export interface BarberProfile {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  specialty: string;
  bio: string;
  avatar: string;
  rating: number;
  cutsDelivered: string;
  availableDays: string[];
}

export interface LookbookItem {
  id: string;
  title: string;
  category: 'fades' | 'classic' | 'beards' | 'ritual';
  duration: string;
  price: string;
  barberName: string;
  description: string;
  tags: string[];
  imageUrl: string;
}

export interface ClientBooking {
  id: string;
  bookingRef: string;
  services: BarberService[];
  barber: BarberProfile | 'any';
  date: string; // YYYY-MM-DD
  timeSlot: string; // e.g. "14:30"
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  notes?: string;
  totalPrice: number;
  discountApplied?: number;
  promoCode?: string;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  serviceUsed: string;
  rating: number;
  date: string;
  comment: string;
}
