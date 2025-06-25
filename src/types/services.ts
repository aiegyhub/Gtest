import { LucideIcon } from "lucide-react";

export interface ServicePricing {
  startingPrice: number;
  currency: string;
  priceRange: string;
}

export interface ServiceAvailability {
  available24x7: boolean;
  emergencyService: boolean;
  advanceBookingRequired: boolean;
}

export interface ServiceMetadata {
  rating: number;
  reviewCount: number;
  popularity: number;
  tags: string[];
}

export interface AdditionalService {
  id: string;
  name: string;
  price: number;
}

export interface CalculatorConfig {
  baseMultiplier: number;
  areaMultiplier: number;
  urgencyMultipliers: {
    normal: number;
    urgent: number;
    emergency: number;
  };
  additionalServices: AdditionalService[];
}

export interface SubService {
  name: string;
  slug: string;
  description: string;
  pricing?: ServicePricing;
  estimatedDuration?: string;
}

export interface Service {
  name: string;
  slug: string;
  description: string;
  icon: LucideIcon;
  subServices: SubService[];
  pricing: ServicePricing;
  availability: ServiceAvailability;
  metadata: ServiceMetadata;
  category: ServiceCategory;
  calculatorConfig?: CalculatorConfig;
}

export enum ServiceCategory {
  CLEANING = "cleaning",
  MAINTENANCE = "maintenance",
  PEST_CONTROL = "pest-control",
  APPLIANCE_REPAIR = "appliance-repair",
  MOVING = "moving",
  INSULATION = "insulation",
  PLUMBING = "plumbing",
  LEAK_DETECTION = "leak-detection"
}

export interface Neighborhood {
  name: string;
  slug: string;
  description?: string;
}

export interface CityStats {
  customers: string;
  rating: number;
  responseTime: string;
  neighborhoods: number;
}

// Update City interface to match CityData structure
export interface City {
  name: string;
  slug: string;
  population: string;
  services: Service[]; // Changed from number to Service[]
  rating: number;
  image: string;
  description?: string;
  areas?: string[];
  neighborhoods: Neighborhood[];
  stats?: CityStats;
}

// New interfaces for phone number management system
export interface CityServiceContact {
  id: string;
  cityId: string;
  serviceId: string;
  phoneNumber: string;
  whatsappNumber?: string;
  contactName: string;
  isActive: boolean;
  isPrimary: boolean;
  workingHours: {
    start: string;
    end: string;
    days: string[];
  };
  priority: number;
  maxDailyCalls?: number;
  currentCallCount?: number;
}

export interface PhoneNumberAssignment {
  cityName: string;
  serviceName: string;
  contacts: CityServiceContact[];
}