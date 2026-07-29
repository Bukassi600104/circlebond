import type {
  NotificationPreferences,
  NotificationType,
} from "@/server/notifications/rules";

export type UserNotification = {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  deepLink: string;
  readAt: string | null;
  createdAt: string;
  circleId: string | null;
  circleName: string | null;
  circleType: string | null;
};

export type NotificationWorkspace = {
  notifications: UserNotification[];
  preferences: NotificationPreferences;
  mutedCircles: Array<{
    id: string;
    name: string;
    type: string;
    muted: boolean;
  }>;
  unreadCount: number;
};

export type { NotificationPreferences, NotificationType };
