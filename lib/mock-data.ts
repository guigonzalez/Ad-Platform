export type Platform = "GOOGLE" | "META";
export type CampaignStatus = "ACTIVE" | "PAUSED" | "ENDED";
export type CampaignObjective = "TRAFFIC" | "LEADS" | "SALES" | "AWARENESS";

export interface Campaign {
  id: string;
  name: string;
  platform: Platform;
  status: CampaignStatus;
  objective: CampaignObjective;
  budget: number;
  dailyBudget: number;
  spent: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number; // percentage
  cpc: number; // dollars
  startDate: string;
  endDate?: string;
  groupId?: string; // Optional: ID of the campaign group this campaign belongs to
}

export interface CampaignGroup {
  id: string;
  name: string;
  description?: string;
  status: CampaignStatus;
  totalBudget: number; // Total budget for the entire group
  dailyBudgetLimit: number; // Shared daily budget limit across all campaigns
  spent: number; // Total spent across all campaigns
  campaignIds: string[]; // IDs of campaigns in this group
  createdAt: string;
  objective: CampaignObjective; // Primary objective for the group
}

export interface DailyMetric {
  date: string;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
}

export interface AutomationRule {
  id: string;
  name: string;
  enabled: boolean;
  trigger: {
    metric: "ctr" | "cpc" | "spend" | "conversions";
    operator: "<" | ">" | "=";
    value: number;
    duration?: number; // days
  };
  action: {
    type: "pause" | "reduce_budget" | "alert";
    value?: number;
  };
  appliesTo: "all" | string; // "all" or campaign ID
  lastRun?: string;
  timesTriggered: number;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  avatar?: string;
  joinedAt: string;
}

export interface ConnectedAccount {
  id: string;
  platform: Platform;
  accountId: string;
  accountName: string;
  status: "connected" | "disconnected" | "error";
  lastSync?: string;
}

export interface Organization {
  id: string;
  name: string;
  timezone: string;
  currency: string;
  members: TeamMember[];
  connectedAccounts: ConnectedAccount[];
}

// Generate mock campaigns
export const mockCampaigns: Campaign[] = [
  {
    id: "1",
    name: "Summer Sale 2024 - Facebook Feed",
    platform: "META",
    status: "ACTIVE",
    objective: "SALES",
    budget: 5000,
    dailyBudget: 150,
    spent: 3420,
    impressions: 245000,
    clicks: 5600,
    conversions: 142,
    ctr: 2.29,
    cpc: 0.61,
    startDate: "2024-01-15",
    endDate: "2024-02-29",
    groupId: "group-1",
  },
  {
    id: "2",
    name: "Summer Sale 2024 - Google Display",
    platform: "GOOGLE",
    status: "ACTIVE",
    objective: "SALES",
    budget: 3000,
    dailyBudget: 100,
    spent: 1850,
    impressions: 520000,
    clicks: 3100,
    conversions: 45,
    ctr: 0.60,
    cpc: 0.60,
    startDate: "2024-01-20",
    groupId: "group-1",
  },
  {
    id: "3",
    name: "Summer Sale 2024 - Instagram Stories",
    platform: "META",
    status: "ACTIVE",
    objective: "SALES",
    budget: 4500,
    dailyBudget: 180,
    spent: 2940,
    impressions: 85000,
    clicks: 2800,
    conversions: 98,
    ctr: 3.29,
    cpc: 1.05,
    startDate: "2024-01-10",
    groupId: "group-1",
  },
  {
    id: "4",
    name: "Q1 Lead Gen - Meta Stories",
    platform: "META",
    status: "ACTIVE",
    objective: "LEADS",
    budget: 2500,
    dailyBudget: 80,
    spent: 1680,
    impressions: 180000,
    clicks: 4320,
    conversions: 67,
    ctr: 2.40,
    cpc: 0.39,
    startDate: "2024-01-25",
    groupId: "group-2",
  },
  {
    id: "5",
    name: "Q1 Lead Gen - Google Search",
    platform: "GOOGLE",
    status: "ACTIVE",
    objective: "LEADS",
    budget: 1800,
    dailyBudget: 60,
    spent: 920,
    impressions: 92000,
    clicks: 1380,
    conversions: 28,
    ctr: 1.50,
    cpc: 0.67,
    startDate: "2024-01-12",
    groupId: "group-2",
  },
  {
    id: "6",
    name: "Holiday Brand - Google Shopping",
    platform: "GOOGLE",
    status: "PAUSED",
    objective: "AWARENESS",
    budget: 8000,
    dailyBudget: 200,
    spent: 7950,
    impressions: 650000,
    clicks: 13000,
    conversions: 385,
    ctr: 2.00,
    cpc: 0.61,
    startDate: "2023-12-01",
    endDate: "2023-12-31",
    groupId: "group-3",
  },
  {
    id: "7",
    name: "Holiday Brand - Meta Feed",
    platform: "META",
    status: "PAUSED",
    objective: "AWARENESS",
    budget: 3500,
    dailyBudget: 120,
    spent: 2100,
    impressions: 320000,
    clicks: 8960,
    conversions: 254,
    ctr: 2.80,
    cpc: 0.23,
    startDate: "2024-01-18",
    groupId: "group-3",
  },
  {
    id: "8",
    name: "Holiday Brand - YouTube Video",
    platform: "GOOGLE",
    status: "PAUSED",
    objective: "AWARENESS",
    budget: 2200,
    dailyBudget: 75,
    spent: 1350,
    impressions: 48000,
    clicks: 960,
    conversions: 42,
    ctr: 2.00,
    cpc: 1.41,
    startDate: "2024-01-22",
    groupId: "group-3",
  },
  {
    id: "9",
    name: "Video Campaign - YouTube",
    platform: "GOOGLE",
    status: "ACTIVE",
    objective: "AWARENESS",
    budget: 5500,
    dailyBudget: 175,
    spent: 3850,
    impressions: 1200000,
    clicks: 7200,
    conversions: 85,
    ctr: 0.60,
    cpc: 0.53,
    startDate: "2024-01-08",
  },
  {
    id: "10",
    name: "Flash Sale - Instagram Feed",
    platform: "META",
    status: "ACTIVE",
    objective: "SALES",
    budget: 1500,
    dailyBudget: 100,
    spent: 980,
    impressions: 145000,
    clicks: 3480,
    conversions: 89,
    ctr: 2.40,
    cpc: 0.28,
    startDate: "2024-01-28",
  },
  {
    id: "11",
    name: "B2B Lead Gen - LinkedIn (via Meta)",
    platform: "META",
    status: "PAUSED",
    objective: "LEADS",
    budget: 4000,
    dailyBudget: 135,
    spent: 2430,
    impressions: 125000,
    clicks: 1500,
    conversions: 35,
    ctr: 1.20,
    cpc: 1.62,
    startDate: "2024-01-14",
  },
  {
    id: "12",
    name: "Performance Max - Multi-Channel",
    platform: "GOOGLE",
    status: "ACTIVE",
    objective: "SALES",
    budget: 7500,
    dailyBudget: 250,
    spent: 5200,
    impressions: 480000,
    clicks: 9600,
    conversions: 298,
    ctr: 2.00,
    cpc: 0.54,
    startDate: "2024-01-05",
  },
  {
    id: "13",
    name: "Newsletter Signup - Meta Ads",
    platform: "META",
    status: "ACTIVE",
    objective: "LEADS",
    budget: 1200,
    dailyBudget: 40,
    spent: 720,
    impressions: 98000,
    clicks: 1960,
    conversions: 156,
    ctr: 2.00,
    cpc: 0.37,
    startDate: "2024-01-26",
  },
  {
    id: "14",
    name: "Competitor Targeting - Search",
    platform: "GOOGLE",
    status: "ACTIVE",
    objective: "TRAFFIC",
    budget: 2800,
    dailyBudget: 95,
    spent: 1710,
    impressions: 62000,
    clicks: 1860,
    conversions: 48,
    ctr: 3.00,
    cpc: 0.92,
    startDate: "2024-01-21",
  },
  {
    id: "15",
    name: "Seasonal Promotion - All Devices",
    platform: "META",
    status: "ACTIVE",
    objective: "SALES",
    budget: 4200,
    dailyBudget: 140,
    spent: 2940,
    impressions: 285000,
    clicks: 6840,
    conversions: 187,
    ctr: 2.40,
    cpc: 0.43,
    startDate: "2024-01-16",
  },
  {
    id: "16",
    name: "Webinar Registration - Google Ads",
    platform: "GOOGLE",
    status: "ENDED",
    objective: "LEADS",
    budget: 1500,
    dailyBudget: 100,
    spent: 1485,
    impressions: 78000,
    clicks: 1950,
    conversions: 124,
    ctr: 2.50,
    cpc: 0.76,
    startDate: "2024-01-01",
    endDate: "2024-01-15",
  },
  {
    id: "17",
    name: "Mobile Game Install - Meta",
    platform: "META",
    status: "ACTIVE",
    objective: "TRAFFIC",
    budget: 6000,
    dailyBudget: 200,
    spent: 4200,
    impressions: 950000,
    clicks: 28500,
    conversions: 1850,
    ctr: 3.00,
    cpc: 0.15,
    startDate: "2024-01-12",
  },
  {
    id: "18",
    name: "E-commerce Spring Sale - Shopping",
    platform: "GOOGLE",
    status: "PAUSED",
    objective: "SALES",
    budget: 3600,
    dailyBudget: 120,
    spent: 1920,
    impressions: 195000,
    clicks: 3900,
    conversions: 98,
    ctr: 2.00,
    cpc: 0.49,
    startDate: "2024-01-23",
  },
  {
    id: "19",
    name: "Brand Lift Study - Display Network",
    platform: "GOOGLE",
    status: "ACTIVE",
    objective: "AWARENESS",
    budget: 2500,
    dailyBudget: 85,
    spent: 1530,
    impressions: 680000,
    clicks: 4080,
    conversions: 32,
    ctr: 0.60,
    cpc: 0.38,
    startDate: "2024-01-19",
  },
  {
    id: "20",
    name: "Customer Reactivation - Meta Carousel",
    platform: "META",
    status: "ACTIVE",
    objective: "SALES",
    budget: 2000,
    dailyBudget: 65,
    spent: 1170,
    impressions: 152000,
    clicks: 3648,
    conversions: 94,
    ctr: 2.40,
    cpc: 0.32,
    startDate: "2024-01-24",
  },
];

// Generate last 30 days of metrics
const generateDailyMetrics = (): DailyMetric[] => {
  const metrics: DailyMetric[] = [];
  const today = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // Add some randomness but with an upward trend
    const baseImpressions = 80000 + (29 - i) * 2000;
    const baseClicks = 1800 + (29 - i) * 50;
    const baseSpend = 1400 + (29 - i) * 30;
    const baseConversions = 35 + (29 - i) * 1.5;

    metrics.push({
      date: date.toISOString().split("T")[0],
      impressions: Math.floor(baseImpressions + Math.random() * 20000),
      clicks: Math.floor(baseClicks + Math.random() * 400),
      spend: Math.floor(baseSpend + Math.random() * 300),
      conversions: Math.floor(baseConversions + Math.random() * 15),
    });
  }

  return metrics;
};

export const mockDailyMetrics = generateDailyMetrics();

// Aggregate metrics
export const mockAggregateMetrics = {
  totalSpend: mockCampaigns.reduce((sum, c) => sum + c.spent, 0),
  totalImpressions: mockCampaigns.reduce((sum, c) => sum + c.impressions, 0),
  totalClicks: mockCampaigns.reduce((sum, c) => sum + c.clicks, 0),
  totalConversions: mockCampaigns.reduce((sum, c) => sum + c.conversions, 0),
  avgCtr: mockCampaigns.reduce((sum, c) => sum + c.ctr, 0) / mockCampaigns.length,
  avgCpc: mockCampaigns.reduce((sum, c) => sum + c.cpc, 0) / mockCampaigns.length,
};

// Automation rules
export const mockAutomationRules: AutomationRule[] = [
  {
    id: "1",
    name: "Pause Low CTR Campaigns",
    enabled: true,
    trigger: {
      metric: "ctr",
      operator: "<",
      value: 1.0,
      duration: 3,
    },
    action: {
      type: "pause",
    },
    appliesTo: "all",
    lastRun: "2024-01-30T10:30:00Z",
    timesTriggered: 3,
  },
  {
    id: "2",
    name: "Alert on High Spend",
    enabled: true,
    trigger: {
      metric: "spend",
      operator: ">",
      value: 100,
    },
    action: {
      type: "alert",
    },
    appliesTo: "all",
    lastRun: "2024-01-30T14:00:00Z",
    timesTriggered: 12,
  },
  {
    id: "3",
    name: "Reduce Budget for High CPC",
    enabled: false,
    trigger: {
      metric: "cpc",
      operator: ">",
      value: 2.0,
      duration: 2,
    },
    action: {
      type: "reduce_budget",
      value: 20, // 20% reduction
    },
    appliesTo: "all",
    lastRun: "2024-01-28T08:00:00Z",
    timesTriggered: 1,
  },
  {
    id: "4",
    name: "Pause if No Conversions",
    enabled: true,
    trigger: {
      metric: "conversions",
      operator: "<",
      value: 1,
      duration: 7,
    },
    action: {
      type: "pause",
    },
    appliesTo: "all",
    lastRun: "2024-01-29T12:00:00Z",
    timesTriggered: 0,
  },
  {
    id: "5",
    name: "Alert on Excellent Performance",
    enabled: true,
    trigger: {
      metric: "ctr",
      operator: ">",
      value: 4.0,
    },
    action: {
      type: "alert",
    },
    appliesTo: "all",
    timesTriggered: 0,
  },
];

// Team members
export const mockTeamMembers: TeamMember[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@acmecorp.com",
    role: "admin",
    joinedAt: "2023-06-15",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@acmecorp.com",
    role: "editor",
    joinedAt: "2023-08-22",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@acmecorp.com",
    role: "editor",
    joinedAt: "2023-10-10",
  },
  {
    id: "4",
    name: "Sarah Williams",
    email: "sarah@acmecorp.com",
    role: "viewer",
    joinedAt: "2024-01-05",
  },
];

// Connected accounts
export const mockConnectedAccounts: ConnectedAccount[] = [
  {
    id: "1",
    platform: "GOOGLE",
    accountId: "123-456-7890",
    accountName: "ACME Corp Google Ads",
    status: "connected",
    lastSync: "2024-01-30T15:30:00Z",
  },
  {
    id: "2",
    platform: "META",
    accountId: "act_987654321",
    accountName: "ACME Corp Meta Business",
    status: "connected",
    lastSync: "2024-01-30T15:28:00Z",
  },
];

// Organization
export const mockOrganization: Organization = {
  id: "1",
  name: "ACME Corp",
  timezone: "America/New_York",
  currency: "USD",
  members: mockTeamMembers,
  connectedAccounts: mockConnectedAccounts,
};

// Mock Campaign Groups
export const mockCampaignGroups: CampaignGroup[] = [
  {
    id: "group-1",
    name: "Summer Sale 2024 - Multi-Platform",
    description: "Coordinated summer sale campaign across Meta and Google with shared budget",
    status: "ACTIVE",
    totalBudget: 15000,
    dailyBudgetLimit: 500,
    spent: 8420,
    campaignIds: ["1", "2", "3"],
    createdAt: "2024-01-15",
    objective: "SALES",
  },
  {
    id: "group-2",
    name: "Q1 Lead Generation",
    description: "Multi-asset lead generation campaigns for Q1",
    status: "ACTIVE",
    totalBudget: 12000,
    dailyBudgetLimit: 400,
    spent: 6890,
    campaignIds: ["4", "5"],
    createdAt: "2024-01-01",
    objective: "LEADS",
  },
  {
    id: "group-3",
    name: "Brand Awareness - Holiday",
    description: "Holiday season brand awareness across all channels",
    status: "PAUSED",
    totalBudget: 20000,
    dailyBudgetLimit: 650,
    spent: 12340,
    campaignIds: ["6", "7", "8"],
    createdAt: "2023-11-01",
    objective: "AWARENESS",
  },
];
