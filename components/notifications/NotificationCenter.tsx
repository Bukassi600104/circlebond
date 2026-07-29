"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  CheckCheck,
  ExternalLink,
  Mail,
  MessageCircle,
  Volume2,
  X,
} from "lucide-react";
import type {
  NotificationWorkspace,
  UserNotification,
} from "@/features/notifications";

async function csrfToken() {
  const response = await fetch("/api/auth/csrf", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to start a secure request.");
  return ((await response.json()) as { csrfToken: string }).csrfToken;
}

const dateTime = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Lagos",
});

function dayKey(value: string) {
  const date = new Date(value);
  const now = new Date();
  const lagosDate = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
  }).format(date);
  const today = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
  }).format(now);
  const yesterdayDate = new Date(now);
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterday = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Africa/Lagos",
  }).format(yesterdayDate);
  if (lagosDate === today) return "Today";
  if (lagosDate === yesterday) return "Yesterday";
  return "Earlier";
}

function groupNotifications(notifications: UserNotification[]) {
  return ["Today", "Yesterday", "Earlier"].map((label) => ({
    label,
    notifications: notifications.filter(
      (notification) => dayKey(notification.createdAt) === label,
    ),
  }));
}

export function NotificationCenter({
  workspace,
}: {
  workspace: NotificationWorkspace;
}) {
  const router = useRouter();
  const [notifications, setNotifications] = useState(workspace.notifications);
  const [preferences, setPreferences] = useState(workspace.preferences);
  const [mutedCircles, setMutedCircles] = useState(workspace.mutedCircles);
  const [busy, setBusy] = useState("");
  const [message, setMessage] = useState("");

  async function mutate(path: string, method: "PATCH" | "POST", body?: object) {
    const csrf = await csrfToken();
    const response = await fetch(path, {
      method,
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrf,
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    const result = (await response.json()) as { error?: string };
    if (!response.ok) throw new Error(result.error ?? "Please try again.");
  }

  async function updateNotification(
    notification: UserNotification,
    action: "read" | "dismiss",
  ) {
    setBusy(notification.id);
    setMessage("");
    try {
      await mutate(`/api/notifications/${notification.id}`, "PATCH", {
        action,
      });
      if (action === "dismiss") {
        setNotifications((items) =>
          items.filter((item) => item.id !== notification.id),
        );
      } else {
        setNotifications((items) =>
          items.map((item) =>
            item.id === notification.id
              ? { ...item, readAt: new Date().toISOString() }
              : item,
          ),
        );
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy("");
    }
  }

  async function markAllRead() {
    setBusy("all");
    setMessage("");
    try {
      await mutate("/api/notifications/read-all", "POST");
      const readAt = new Date().toISOString();
      setNotifications((items) =>
        items.map((item) => ({ ...item, readAt: item.readAt ?? readAt })),
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy("");
    }
  }

  async function openNotification(notification: UserNotification) {
    if (!notification.readAt) {
      await updateNotification(notification, "read");
    }
    router.push(notification.deepLink);
  }

  async function savePreferences(event: FormEvent) {
    event.preventDefault();
    setBusy("preferences");
    setMessage("");
    try {
      await mutate("/api/notifications/preferences", "PATCH", preferences);
      setMessage("Notification preferences saved.");
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy("");
    }
  }

  async function toggleMute(circleId: string, muted: boolean) {
    setBusy(`mute:${circleId}`);
    setMessage("");
    try {
      await mutate(`/api/circles/${circleId}/notifications/mute`, "PATCH", {
        muted,
      });
      setMutedCircles((circles) =>
        circles.map((circle) =>
          circle.id === circleId ? { ...circle, muted } : circle,
        ),
      );
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Please try again.");
    } finally {
      setBusy("");
    }
  }

  const unreadCount = notifications.filter(
    (notification) => !notification.readAt,
  ).length;

  return (
    <section className="bc-notification-page">
      <header>
        <div>
          <Link href="/account">← Dashboard</Link>
          <h1>Notifications</h1>
          <p>
            Meaningful updates from your circles, grouped by when they arrived.
          </p>
        </div>
        {unreadCount > 0 && (
          <button type="button" onClick={markAllRead} disabled={busy === "all"}>
            <CheckCheck size={16} aria-hidden="true" />
            {busy === "all" ? "Updating…" : "Mark all read"}
          </button>
        )}
      </header>

      {message && (
        <p className="bc-notification-message" role="status">
          {message}
        </p>
      )}

      <div className="bc-notification-layout">
        <div className="bc-notification-feed">
          {!notifications.length ? (
            <div className="bc-notification-empty">
              <span>
                <Bell size={25} aria-hidden="true" />
              </span>
              <h2>No notifications</h2>
              <p>Important circle updates will appear here.</p>
            </div>
          ) : (
            groupNotifications(notifications).map(
              (group) =>
                group.notifications.length > 0 && (
                  <section key={group.label}>
                    <h2>{group.label}</h2>
                    <ul>
                      {group.notifications.map((notification) => (
                        <li
                          key={notification.id}
                          className={notification.readAt ? "" : "is-unread"}
                        >
                          <span className="bc-notification-icon">
                            <Bell size={17} aria-hidden="true" />
                          </span>
                          <div>
                            <strong>{notification.title}</strong>
                            <p>{notification.body}</p>
                            <small>
                              {dateTime.format(
                                new Date(notification.createdAt),
                              )}
                              {notification.circleName
                                ? ` · ${notification.circleName}`
                                : ""}
                            </small>
                          </div>
                          <footer>
                            <button
                              type="button"
                              className="bc-notification-open"
                              onClick={() => openNotification(notification)}
                              disabled={busy === notification.id}
                            >
                              Open
                              <ExternalLink size={13} aria-hidden="true" />
                            </button>
                            {!notification.readAt && (
                              <button
                                type="button"
                                onClick={() =>
                                  updateNotification(notification, "read")
                                }
                                disabled={busy === notification.id}
                              >
                                Read
                              </button>
                            )}
                            <button
                              type="button"
                              aria-label={`Dismiss ${notification.title}`}
                              onClick={() =>
                                updateNotification(notification, "dismiss")
                              }
                              disabled={busy === notification.id}
                            >
                              <X size={14} aria-hidden="true" />
                            </button>
                          </footer>
                        </li>
                      ))}
                    </ul>
                  </section>
                ),
            )
          )}
        </div>

        <aside className="bc-notification-settings">
          <form onSubmit={savePreferences}>
            <header>
              <Mail size={17} aria-hidden="true" />
              <div>
                <h2>Preferences</h2>
                <p>Choose which updates you receive.</p>
              </div>
            </header>
            {(
              [
                [
                  "emailNotifications",
                  "Critical emails",
                  "Invitations, rejected receipts, deadlines and completion.",
                ],
                [
                  "commentNotifications",
                  "Comments and replies",
                  "Replies to comments you have written.",
                ],
                [
                  "contributionReminders",
                  "Contribution reminders",
                  "Reminders selected by circle managers.",
                ],
                [
                  "circleUpdateNotifications",
                  "Circle updates",
                  "Announcements, delivery, deadlines and completion.",
                ],
                [
                  "marketingCommunication",
                  "Marketing communication",
                  "Optional BondCircle product news.",
                ],
              ] as const
            ).map(([key, label, detail]) => (
              <label key={key}>
                <span>
                  <strong>{label}</strong>
                  <small>{detail}</small>
                </span>
                <input
                  type="checkbox"
                  checked={preferences[key]}
                  onChange={(event) =>
                    setPreferences((current) => ({
                      ...current,
                      [key]: event.target.checked,
                    }))
                  }
                />
              </label>
            ))}
            <label className="is-disabled">
              <span>
                <strong>Browser push</strong>
                <small>
                  Available after permission and delivery reliability checks.
                </small>
              </span>
              <input
                type="checkbox"
                checked={preferences.browserPushNotifications}
                disabled
                readOnly
              />
            </label>
            <button type="submit" disabled={busy === "preferences"}>
              {busy === "preferences" ? "Saving…" : "Save preferences"}
            </button>
            <p className="bc-push-note">
              Browser push remains off until its permission and delivery service
              pass the production reliability gate.
            </p>
          </form>

          <section>
            <header>
              <Volume2 size={17} aria-hidden="true" />
              <div>
                <h2>Muted circles</h2>
                <p>Mute or restore all notifications for a circle.</p>
              </div>
            </header>
            {!mutedCircles.length ? (
              <p>You have not joined a circle yet.</p>
            ) : (
              mutedCircles.map((circle) => (
                <label key={circle.id}>
                  <span>
                    <strong>{circle.name}</strong>
                    <small>{circle.type.replace("-", " ")} circle</small>
                  </span>
                  <input
                    type="checkbox"
                    checked={!circle.muted}
                    aria-label={`Notifications for ${circle.name}`}
                    disabled={busy === `mute:${circle.id}`}
                    onChange={(event) =>
                      toggleMute(circle.id, !event.target.checked)
                    }
                  />
                </label>
              ))
            )}
          </section>

          <div className="bc-notification-privacy">
            <MessageCircle size={16} aria-hidden="true" />
            Notification previews never include private receipt images, amounts,
            bank details, or rejection reasons.
          </div>
        </aside>
      </div>
    </section>
  );
}
