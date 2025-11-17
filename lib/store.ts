import { create } from "zustand";
import {
  type Campaign,
  type CampaignGroup,
  type AutomationRule,
  type TeamMember,
  type Organization,
  mockCampaigns,
  mockCampaignGroups,
  mockAutomationRules,
  mockOrganization,
} from "./mock-data";
import { useNotifications } from "./notifications-store";

interface AppState {
  // Data
  campaigns: Campaign[];
  campaignGroups: CampaignGroup[];
  automationRules: AutomationRule[];
  organization: Organization;

  // Campaign actions
  pauseCampaign: (id: string) => void;
  resumeCampaign: (id: string) => void;
  deleteCampaign: (id: string) => void;
  updateCampaignBudget: (id: string, dailyBudget: number) => void;
  createCampaign: (campaign: Omit<Campaign, "id">) => void;
  duplicateCampaign: (id: string) => void;

  // Campaign Group actions
  createCampaignGroup: (group: Omit<CampaignGroup, "id" | "createdAt" | "spent">) => void;
  updateCampaignGroup: (id: string, updates: Partial<CampaignGroup>) => void;
  deleteCampaignGroup: (id: string) => void;
  assignCampaignToGroup: (campaignId: string, groupId: string | null) => void;
  pauseCampaignGroup: (id: string) => void;
  resumeCampaignGroup: (id: string) => void;

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
  campaignGroups: mockCampaignGroups,
  automationRules: mockAutomationRules,
  organization: mockOrganization,

  // Campaign actions
  pauseCampaign: (id) =>
    set((state) => {
      const campaign = state.campaigns.find((c) => c.id === id);
      if (campaign) {
        useNotifications.getState().addNotification({
          type: "campaign_paused",
          title: "Campaign Paused",
          message: `${campaign.name} has been paused successfully.`,
          actionUrl: "/dashboard/campaigns",
          metadata: {
            campaignId: campaign.id,
            campaignName: campaign.name,
          },
        });
      }
      return {
        campaigns: state.campaigns.map((c) =>
          c.id === id ? { ...c, status: "PAUSED" as const } : c
        ),
      };
    }),

  resumeCampaign: (id) =>
    set((state) => {
      const campaign = state.campaigns.find((c) => c.id === id);
      if (campaign) {
        useNotifications.getState().addNotification({
          type: "campaign_resumed",
          title: "Campaign Resumed",
          message: `${campaign.name} is now active and running.`,
          actionUrl: "/dashboard/campaigns",
          metadata: {
            campaignId: campaign.id,
            campaignName: campaign.name,
          },
        });
      }
      return {
        campaigns: state.campaigns.map((c) =>
          c.id === id ? { ...c, status: "ACTIVE" as const } : c
        ),
      };
    }),

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
    set((state) => {
      const newCampaign = {
        ...campaign,
        id: `new-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      };
      useNotifications.getState().addNotification({
        type: "campaign_created",
        title: "Campaign Created",
        message: `${newCampaign.name} has been created successfully and is now ${campaign.status === "ACTIVE" ? "active" : "paused"}.`,
        actionUrl: "/dashboard/campaigns",
        metadata: {
          campaignId: newCampaign.id,
          campaignName: newCampaign.name,
        },
      });
      return {
        campaigns: [...state.campaigns, newCampaign],
      };
    }),

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

  // Campaign Group actions
  createCampaignGroup: (group) =>
    set((state) => ({
      campaignGroups: [
        ...state.campaignGroups,
        {
          ...group,
          id: `group-${Date.now()}`,
          createdAt: new Date().toISOString(),
          spent: 0,
        },
      ],
    })),

  updateCampaignGroup: (id, updates) =>
    set((state) => ({
      campaignGroups: state.campaignGroups.map((g) =>
        g.id === id ? { ...g, ...updates } : g
      ),
    })),

  deleteCampaignGroup: (id) =>
    set((state) => ({
      campaignGroups: state.campaignGroups.filter((g) => g.id !== id),
      // Remove groupId from campaigns in this group
      campaigns: state.campaigns.map((c) =>
        c.groupId === id ? { ...c, groupId: undefined } : c
      ),
    })),

  assignCampaignToGroup: (campaignId, groupId) =>
    set((state) => {
      // Validate budget if assigning to a group
      if (groupId) {
        const group = state.campaignGroups.find((g) => g.id === groupId);
        const campaign = state.campaigns.find((c) => c.id === campaignId);

        if (group && campaign) {
          // Calculate total daily budget of campaigns in group (excluding this one)
          const groupCampaigns = state.campaigns.filter(
            (c) => c.groupId === groupId && c.id !== campaignId
          );
          const currentGroupBudget = groupCampaigns.reduce(
            (sum, c) => sum + c.dailyBudget,
            0
          );

          // Check if adding this campaign would exceed group limit
          if (currentGroupBudget + campaign.dailyBudget > group.dailyBudgetLimit) {
            useNotifications.getState().addNotification({
              type: "budget_exceeded",
              title: "Budget Limit Exceeded",
              message: `Cannot assign campaign. Group daily budget limit of $${group.dailyBudgetLimit} would be exceeded.`,
              actionUrl: "/dashboard/campaigns",
              metadata: {
                groupId: group.id,
                groupName: group.name,
              },
            });
            return state;
          }
        }
      }

      return {
        campaigns: state.campaigns.map((c) =>
          c.id === campaignId ? { ...c, groupId: groupId || undefined } : c
        ),
        // Update group's campaignIds
        campaignGroups: state.campaignGroups.map((g) => {
          if (g.id === groupId) {
            return {
              ...g,
              campaignIds: [...g.campaignIds.filter((id) => id !== campaignId), campaignId],
            };
          }
          // Remove from previous group
          return {
            ...g,
            campaignIds: g.campaignIds.filter((id) => id !== campaignId),
          };
        }),
      };
    }),

  pauseCampaignGroup: (id) =>
    set((state) => {
      const group = state.campaignGroups.find((g) => g.id === id);
      if (group) {
        useNotifications.getState().addNotification({
          type: "campaign_paused",
          title: "Campaign Group Paused",
          message: `${group.name} and all its campaigns have been paused.`,
          actionUrl: "/dashboard/campaigns",
          metadata: {
            groupId: group.id,
            groupName: group.name,
          },
        });
      }

      return {
        campaignGroups: state.campaignGroups.map((g) =>
          g.id === id ? { ...g, status: "PAUSED" as const } : g
        ),
        // Pause all campaigns in this group
        campaigns: state.campaigns.map((c) =>
          c.groupId === id ? { ...c, status: "PAUSED" as const } : c
        ),
      };
    }),

  resumeCampaignGroup: (id) =>
    set((state) => {
      const group = state.campaignGroups.find((g) => g.id === id);
      if (group) {
        useNotifications.getState().addNotification({
          type: "campaign_resumed",
          title: "Campaign Group Resumed",
          message: `${group.name} and all its campaigns are now active.`,
          actionUrl: "/dashboard/campaigns",
          metadata: {
            groupId: group.id,
            groupName: group.name,
          },
        });
      }

      return {
        campaignGroups: state.campaignGroups.map((g) =>
          g.id === id ? { ...g, status: "ACTIVE" as const } : g
        ),
        // Resume all campaigns in this group
        campaigns: state.campaigns.map((c) =>
          c.groupId === id ? { ...c, status: "ACTIVE" as const } : c
        ),
      };
    }),

  // Automation actions
  toggleAutomationRule: (id) =>
    set((state) => {
      const rule = state.automationRules.find((r) => r.id === id);
      if (rule && !rule.enabled) {
        // Only notify when enabling
        useNotifications.getState().addNotification({
          type: "automation_triggered",
          title: "Automation Rule Enabled",
          message: `${rule.name} is now active and monitoring your campaigns.`,
          actionUrl: "/dashboard/automations",
          metadata: {
            automationId: rule.id,
            automationName: rule.name,
          },
        });
      }
      return {
        automationRules: state.automationRules.map((r) =>
          r.id === id ? { ...r, enabled: !r.enabled } : r
        ),
      };
    }),

  createAutomationRule: (rule) =>
    set((state) => {
      const newRule = {
        ...rule,
        id: `rule-${Date.now()}`,
        timesTriggered: 0,
      };
      useNotifications.getState().addNotification({
        type: "automation_created",
        title: "Automation Rule Created",
        message: `${newRule.name} has been created and is now ${rule.enabled ? "active" : "inactive"}.`,
        actionUrl: "/dashboard/automations",
        metadata: {
          automationId: newRule.id,
          automationName: newRule.name,
        },
      });
      return {
        automationRules: [...state.automationRules, newRule],
      };
    }),

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
