"use client";

import { useState } from "react";
import Link from "next/link";
import { useNotifications, type NotificationType } from "@/lib/notifications-store";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Megaphone,
  Zap,
  DollarSign,
  TrendingUp,
  Users,
  CreditCard,
  Check,
  Trash2,
  CheckCheck,
  Filter,
  ArrowRight,
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

export default function NotificationsPage() {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, clearAll } =
    useNotifications();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filteredNotifications =
    filter === "unread" ? notifications.filter((n) => !n.read) : notifications;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">
            Stay updated with your campaigns and automations
          </p>
        </div>

        <div className="flex items-center gap-3">
          {unreadCount > 0 && (
            <Button variant="default" size="sm" onClick={markAllAsRead}>
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark all as read
            </Button>
          )}
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAll}>
              <Trash2 className="w-4 h-4 mr-2" />
              Clear all
            </Button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-purple-500 rounded-xl border-2 border-black flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Notifications</p>
                <p className="text-2xl font-black text-gray-900">{notifications.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-pink-500 rounded-xl border-2 border-black flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl font-black text-gray-900">{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500 rounded-xl border-2 border-black flex items-center justify-center">
                <CheckCheck className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Read</p>
                <p className="text-2xl font-black text-gray-900">
                  {notifications.length - unreadCount}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Filter className="w-5 h-5 text-gray-600" />
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant={filter === "all" ? "primary" : "ghost"}
                onClick={() => setFilter("all")}
              >
                All ({notifications.length})
              </Button>
              <Button
                size="sm"
                variant={filter === "unread" ? "primary" : "ghost"}
                onClick={() => setFilter("unread")}
              >
                Unread ({unreadCount})
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications List */}
      {filteredNotifications.length === 0 ? (
        <Card className="border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full border-2 border-gray-300 flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              {filter === "unread" ? "No unread notifications" : "No notifications"}
            </h3>
            <p className="text-gray-600">
              {filter === "unread"
                ? "You're all caught up! All notifications have been read."
                : "You don't have any notifications yet."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <Card
              key={notification.id}
              className={`border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${
                !notification.read ? "bg-purple-50/50" : "bg-white"
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div
                    className={`w-14 h-14 ${
                      notificationColors[notification.type]
                    } rounded-xl border-2 border-black flex items-center justify-center text-white flex-shrink-0`}
                  >
                    {notificationIcons[notification.type]}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg font-bold text-gray-900">
                            {notification.title}
                          </h3>
                          {!notification.read && (
                            <Badge className="bg-purple-500 text-white border-2 border-black">
                              New
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {notification.message}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => markAsRead(notification.id)}
                            title="Mark as read"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteNotification(notification.id)}
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <p className="text-sm text-gray-500">
                        {formatDistanceToNow(new Date(notification.timestamp), {
                          addSuffix: true,
                        })}
                      </p>
                      {notification.actionUrl && (
                        <Link href={notification.actionUrl}>
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() => markAsRead(notification.id)}
                          >
                            View Details
                            <ArrowRight className="w-4 h-4 ml-1" />
                          </Button>
                        </Link>
                      )}
                    </div>

                    {/* Metadata Display */}
                    {notification.metadata && (
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <div className="flex flex-wrap gap-2">
                          {notification.metadata.campaignName && (
                            <Badge variant="default" className="text-xs">
                              Campaign: {notification.metadata.campaignName}
                            </Badge>
                          )}
                          {notification.metadata.automationName && (
                            <Badge variant="default" className="text-xs">
                              Automation: {notification.metadata.automationName}
                            </Badge>
                          )}
                          {notification.metadata.metric && (
                            <Badge variant="default" className="text-xs">
                              {notification.metadata.metric}:{" "}
                              {notification.metadata.value}
                              {notification.metadata.metric?.includes("Rate") ? "%" : ""}
                            </Badge>
                          )}
                          {notification.metadata.amount && (
                            <Badge variant="default" className="text-xs">
                              Amount: ${notification.metadata.amount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
