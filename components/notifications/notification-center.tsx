"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useNotifications, type NotificationType } from "@/lib/notifications-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Megaphone,
  Zap,
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  Check,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

const notificationIcons: Record<NotificationType, React.ReactNode> = {
  campaign_created: <Megaphone className="w-5 h-5" />,
  campaign_paused: <Megaphone className="w-5 h-5" />,
  campaign_resumed: <Megaphone className="w-5 h-5" />,
  automation_triggered: <Zap className="w-5 h-5" />,
  automation_created: <Zap className="w-5 h-5" />,
  budget_alert: <DollarSign className="w-5 h-5" />,
  performance_alert: <TrendingUp className="w-5 h-5" />,
  team_member_added: <Users className="w-5 h-5" />,
  billing_update: <CreditCard className="w-5 h-5" />,
};

const notificationColors: Record<NotificationType, string> = {
  campaign_created: "bg-green-500",
  campaign_paused: "bg-orange-500",
  campaign_resumed: "bg-blue-500",
  automation_triggered: "bg-purple-500",
  automation_created: "bg-purple-500",
  budget_alert: "bg-yellow-500",
  performance_alert: "bg-green-500",
  team_member_added: "bg-blue-500",
  billing_update: "bg-pink-500",
};

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationCenter({ isOpen, onClose }: NotificationCenterProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification } =
    useNotifications();
  const panelRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={panelRef}
      className="absolute right-0 mt-2 w-96 bg-white border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden z-50"
    >
      {/* Header */}
      <div className="p-4 border-b-2 border-black bg-gradient-to-r from-purple-50 to-pink-50">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-bold text-gray-900">Notifications</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            {unreadCount} unread {unreadCount === 1 ? "notification" : "notifications"}
          </p>
          {unreadCount > 0 && (
            <Button
              size="sm"
              variant="ghost"
              onClick={markAllAsRead}
              className="text-xs"
            >
              Mark all as read
            </Button>
          )}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[32rem] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full border-2 border-gray-300 flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-600 font-medium">All caught up!</p>
            <p className="text-sm text-gray-500 mt-1">No new notifications</p>
          </div>
        ) : (
          <div className="divide-y-2 divide-gray-100">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notification.read ? "bg-purple-50/30" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className={`w-10 h-10 ${
                      notificationColors[notification.type]
                    } rounded-xl border-2 border-black flex items-center justify-center text-white flex-shrink-0`}
                  >
                    {notificationIcons[notification.type]}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <h4 className="text-sm font-bold text-gray-900">
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-purple-500 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-gray-500">
                        {formatDistanceToNow(new Date(notification.timestamp), {
                          addSuffix: true,
                        })}
                      </p>
                      <div className="flex items-center gap-1">
                        {!notification.read && (
                          <button
                            onClick={() => markAsRead(notification.id)}
                            className="p-1 hover:bg-gray-200 rounded transition-colors"
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4 text-gray-600" />
                          </button>
                        )}
                        <button
                          onClick={() => deleteNotification(notification.id)}
                          className="p-1 hover:bg-red-100 rounded transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                    </div>
                    {notification.actionUrl && (
                      <Link href={notification.actionUrl}>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="mt-2 text-xs"
                          onClick={() => {
                            markAsRead(notification.id);
                            onClose();
                          }}
                        >
                          View Details →
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="p-3 border-t-2 border-black bg-gray-50 text-center">
          <Link href="/dashboard/notifications" onClick={onClose}>
            <Button size="sm" variant="ghost" className="text-sm">
              View All Notifications
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}
