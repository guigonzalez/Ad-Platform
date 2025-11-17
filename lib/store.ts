import { create } from "zustand";
import {
  type Campaign,
  type AutomationRule,
  type TeamMember,
  type Organization,
  mockCampaigns,
  mockAutomationRules,
  mockOrganization,
} from "./mock-data";

interface AppState {
  // Data
  campaigns: Campaign[];
  automationRules: AutomationRule[];
  organization: Organization;

  // Campaign actions
  pauseCampaign: (id: string) => void;
  resumeCampaign: (id: string) => void;
  deleteCampaign: (id: string) => void;
  updateCampaignBudget: (id: string, dailyBudget: number) => void;
  createCampaign: (campaign: Omit<Campaign, "id">) => void;
  duplicateCampaign: (id: string) => void;

  // Automation actions
  toggleAutomationRule: (id: string) => void;
  createAutomationRule: (rule: Omit<AutomationRule, "id" | "timesTriggered">) => void;
  updateAutomationRule: (id: string, rule: Partial<AutomationRule>) => void;
  deleteAutomationRule: (id: string) => void;

  // Organization actions
  addTeamMember: (member: Omit<TeamMember, "id">) => void;
  removeTeamMember: (id: string) => void;
  updateTeamMemberRole: (id: string, role: TeamMember["role"]) => void;
}

export const useStore = create<AppState>((set) => ({
  // Initial state
  campaigns: mockCampaigns,
  automationRules: mockAutomationRules,
  organization: mockOrganization,

  // Campaign actions
  pauseCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.id === id ? { ...c, status: "PAUSED" as const } : c
      ),
    })),

  resumeCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.id === id ? { ...c, status: "ACTIVE" as const } : c
      ),
    })),

  deleteCampaign: (id) =>
    set((state) => ({
      campaigns: state.campaigns.filter((c) => c.id !== id),
    })),

  updateCampaignBudget: (id, dailyBudget) =>
    set((state) => ({
      campaigns: state.campaigns.map((c) =>
        c.id === id ? { ...c, dailyBudget } : c
      ),
    })),

  createCampaign: (campaign) =>
    set((state) => ({
      campaigns: [
        ...state.campaigns,
        {
          ...campaign,
          id: `new-${Date.now()}`,
        },
      ],
    })),

  duplicateCampaign: (id) =>
    set((state) => {
      const original = state.campaigns.find((c) => c.id === id);
      if (!original) return state;

      return {
        campaigns: [
          ...state.campaigns,
          {
            ...original,
            id: `dup-${Date.now()}`,
            name: `${original.name} (Copy)`,
            status: "PAUSED" as const,
            spent: 0,
            impressions: 0,
            clicks: 0,
            conversions: 0,
          },
        ],
      };
    }),

  // Automation actions
  toggleAutomationRule: (id) =>
    set((state) => ({
      automationRules: state.automationRules.map((r) =>
        r.id === id ? { ...r, enabled: !r.enabled } : r
      ),
    })),

  createAutomationRule: (rule) =>
    set((state) => ({
      automationRules: [
        ...state.automationRules,
        {
          ...rule,
          id: `rule-${Date.now()}`,
          timesTriggered: 0,
        },
      ],
    })),

  updateAutomationRule: (id, updates) =>
    set((state) => ({
      automationRules: state.automationRules.map((r) =>
        r.id === id ? { ...r, ...updates } : r
      ),
    })),

  deleteAutomationRule: (id) =>
    set((state) => ({
      automationRules: state.automationRules.filter((r) => r.id !== id),
    })),

  // Organization actions
  addTeamMember: (member) =>
    set((state) => ({
      organization: {
        ...state.organization,
        members: [
          ...state.organization.members,
          {
            ...member,
            id: `member-${Date.now()}`,
          },
        ],
      },
    })),

  removeTeamMember: (id) =>
    set((state) => ({
      organization: {
        ...state.organization,
        members: state.organization.members.filter((m) => m.id !== id),
      },
    })),

  updateTeamMemberRole: (id, role) =>
    set((state) => ({
      organization: {
        ...state.organization,
        members: state.organization.members.map((m) =>
          m.id === id ? { ...m, role } : m
        ),
      },
    })),
}));
