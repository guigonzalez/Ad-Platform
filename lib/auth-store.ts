import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  id: string;
  email: string;
  name: string;
  role: "owner" | "admin" | "member";
  avatar?: string;
  createdAt: string;
}

export interface Organization {
  id: string;
  name: string;
  slug: string;
  plan: "free" | "professional" | "enterprise";
  billingType: "card" | "invoice";
  taxId?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  invoiceEmail?: string;
  paymentStatus: "active" | "pending" | "overdue";
  createdAt: string;
}

interface AuthState {
  user: User | null;
  organization: Organization | null;
  isAuthenticated: boolean;
  isOnboarding: boolean;
  onboardingStep: number;

  // Auth actions
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;

  // Onboarding actions
  createOrganization: (data: {
    name: string;
    slug: string;
    plan: Organization["plan"];
  }) => void;
  setupBilling: (data: {
    billingType: "card" | "invoice";
    taxId?: string;
    address?: Organization["address"];
    invoiceEmail?: string;
  }) => void;
  completeOnboarding: () => void;
  setOnboardingStep: (step: number) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      organization: null,
      isAuthenticated: false,
      isOnboarding: false,
      onboardingStep: 1,

      login: async (email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        // Mock user data
        const user: User = {
          id: `user-${Date.now()}`,
          email,
          name: email.split("@")[0],
          role: "owner",
          createdAt: new Date().toISOString(),
        };

        set({ user, isAuthenticated: true });
      },

      signup: async (name: string, email: string, password: string) => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500));

        const user: User = {
          id: `user-${Date.now()}`,
          email,
          name,
          role: "owner",
          createdAt: new Date().toISOString(),
        };

        set({
          user,
          isAuthenticated: true,
          isOnboarding: true,
          onboardingStep: 1,
        });
      },

      logout: () => {
        set({
          user: null,
          organization: null,
          isAuthenticated: false,
          isOnboarding: false,
          onboardingStep: 1,
        });
      },

      createOrganization: (data) => {
        const organization: Organization = {
          id: `org-${Date.now()}`,
          name: data.name,
          slug: data.slug,
          plan: data.plan,
          billingType: "invoice", // Default for new orgs
          paymentStatus: "pending",
          createdAt: new Date().toISOString(),
        };

        set({ organization, onboardingStep: 2 });
      },

      setupBilling: (data) => {
        set((state) => ({
          organization: state.organization
            ? {
                ...state.organization,
                billingType: data.billingType,
                taxId: data.taxId,
                address: data.address,
                invoiceEmail: data.invoiceEmail,
                paymentStatus: data.billingType === "invoice" ? "pending" : "active",
              }
            : null,
          onboardingStep: 3,
        }));
      },

      completeOnboarding: () => {
        set({ isOnboarding: false, onboardingStep: 1 });
      },

      setOnboardingStep: (step) => {
        set({ onboardingStep: step });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
