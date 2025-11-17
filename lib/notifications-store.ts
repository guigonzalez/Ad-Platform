import { create } from "zustand";
import { persist } from "zustand/middleware";

export type NotificationType =
  | "campaign_created"
  | "campaign_paused"
  | "campaign_resumed"
  | "automation_triggered"
  | "automation_created"
  | "budget_alert"
  | "performance_alert"
  | "team_member_added"
  | "billing_update";

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  metadata?: {
    campaignId?: string;
    campaignName?: string;
    automationId?: string;
    automationName?: string;
    amount?: number;
    metric?: string;
    value?: number;
  };
}

interface NotificationsState {
  notifications: Notification[];
  unreadCount: number;

  // Actions
  addNotification: (notification: Omit<Notification, "id" | "timestamp" | "read">) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  clearAll: () => void;
}

// Mock notifications for demo
const mockNotifications: Notification[] = [
  {
    id: "notif-1",
    type: "campaign_created",
    title: "Campaign Created",
    message: "Summer Sale Campaign has been successfully created and is now active.",
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: "/dashboard/campaigns",
    metadata: {
      campaignId: "1",
      campaignName: "Summer Sale Campaign",
    },
  },
  {
    id: "notif-2",
    type: "automation_triggered",
    title: "Automation Rule Triggered",
    message: "Low CTR Alert paused Fall Collection Ads due to CTR below 1.5%.",
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: "/dashboard/automations",
    metadata: {
      automationName: "Low CTR Alert",
      campaignName: "Fall Collection Ads",
      metric: "CTR",
      value: 1.2,
    },
  },
  {
    id: "notif-3",
    type: "budget_alert",
    title: "Budget Alert",
    message: "Tech Gadgets Campaign has reached 80% of daily budget ($120 of $150).",
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    read: false,
    actionUrl: "/dashboard/campaigns",
    metadata: {
      campaignName: "Tech Gadgets Campaign",
      amount: 120,
    },
  },
  {
    id: "notif-4",
    type: "performance_alert",
    title: "High Performance",
    message: "Holiday Promo is performing 45% above expected conversion rate!",
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionUrl: "/dashboard/campaigns",
    metadata: {
      campaignName: "Holiday Promo",
      metric: "Conversion Rate",
      value: 45,
    },
  },
  {
    id: "notif-5",
    type: "automation_created",
    title: "Automation Created",
    message: "New automation rule 'Budget Optimizer' has been created.",
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    read: true,
    actionUrl: "/dashboard/automations",
    metadata: {
      automationName: "Budget Optimizer",
    },
  },
];

export const useNotifications = create<NotificationsState>()(
  persist(
    (set) => ({
      notifications: mockNotifications,
      unreadCount: mockNotifications.filter((n) => !n.read).length,

      addNotification: (notification) =>
        set((state) => {
          const newNotification: Notification = {
            ...notification,
            id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            read: false,
          };

          return {
            notifications: [newNotification, ...state.notifications],
            unreadCount: state.unreadCount + 1,
          };
        }),

      markAsRead: (id) =>
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          if (!notification || notification.read) return state;

          return {
            notifications: state.notifications.map((n) =>
              n.id === id ? { ...n, read: true } : n
            ),
            unreadCount: state.unreadCount - 1,
          };
        }),

      markAllAsRead: () =>
        set((state) => ({
          notifications: state.notifications.map((n) => ({ ...n, read: true })),
          unreadCount: 0,
        })),

      deleteNotification: (id) =>
        set((state) => {
          const notification = state.notifications.find((n) => n.id === id);
          return {
            notifications: state.notifications.filter((n) => n.id !== id),
            unreadCount: notification && !notification.read
              ? state.unreadCount - 1
              : state.unreadCount,
          };
        }),

      clearAll: () =>
        set({
          notifications: [],
          unreadCount: 0,
        }),
    }),
    {
      name: "notifications-storage",
    }
  )
);
