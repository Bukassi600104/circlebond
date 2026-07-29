"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  Edit3,
  Flag,
  LockKeyhole,
  Megaphone,
  MessageCircle,
  MoreHorizontal,
  Pin,
  PinOff,
  Reply,
  Send,
  ShieldAlert,
  Trash2,
  X,
} from "lucide-react";
import { ActivityFeed } from "@/components/activity/ActivityFeed";
import type { Announcement } from "@/features/announcements";
import type { CircleComment } from "@/features/comments";
import type { CircleCommunication as CircleCommunicationData } from "@/server/repositories/communication";

const dateTime = new Intl.DateTimeFormat("en-NG", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Africa/Lagos",
});

type Tab = "announcements" | "comments" | "activity";

async function csrfToken() {
  const response = await fetch("/api/auth/csrf", { cache: "no-store" });
  if (!response.ok) throw new Error("Unable to start a secure request.");
  return ((await response.json()) as { csrfToken: string }).csrfToken;
}

function Avatar({ comment }: { comment: CircleComment }) {
  return comment.authorImage ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={comment.authorImage} alt="" />
  ) : (
    <span>{comment.authorName.charAt(0).toUpperCase()}</span>
  );
}

function CommentBody({ comment }: { comment: CircleComment }) {
  if (comment.status === "deleted") {
    return <p className="bc-comment-removed">Comment deleted by its author.</p>;
  }
  if (comment.status === "moderated") {
    return <p className="bc-comment-removed">Comment removed by moderation.</p>;
  }
  return <p>{comment.body}</p>;
}

export function CircleCommunication({
  workspace,
}: {
  workspace: CircleCommunicationData;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("announcements");
  const [announcementEditor, setAnnouncementEditor] = useState<string | null>(
    null,
  );
  const [selectedAnnouncementId, setSelectedAnnouncementId] = useState<
    string | null
  >(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [reporting, setReporting] = useState<string | null>(null);
  const [moderating, setModerating] = useState<string | null>(null);
  const [confirming, setConfirming] = useState<string | null>(null);
  const [busy, setBusy] = useState("");
  const [error, setError] = useState("");
  const readOnly = ["completed", "cancelled", "archived", "purged"].includes(
    workspace.circleStatus,
  );

  const selectedAnnouncement = workspace.announcements.find(
    (announcement) => announcement.id === selectedAnnouncementId,
  );
  const discussionComments = workspace.comments.filter(
    (comment) =>
      (comment.announcementId ?? null) === (selectedAnnouncementId ?? null),
  );
  const roots = discussionComments.filter(
    (comment) => comment.parentCommentId === null,
  );
  const replies = new Map<string, CircleComment[]>();
  for (const comment of discussionComments) {
    if (!comment.parentCommentId) continue;
    const items = replies.get(comment.parentCommentId) ?? [];
    items.push(comment);
    replies.set(comment.parentCommentId, items);
  }

  async function mutate(
    path: string,
    method: "POST" | "PATCH" | "DELETE",
    body: object | undefined,
    key: string,
  ) {
    setBusy(key);
    setError("");
    try {
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
      if (!response.ok) {
        throw new Error(result.error ?? "Please try again.");
      }
      router.refresh();
      return true;
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Please try again.");
      return false;
    } finally {
      setBusy("");
    }
  }

  async function submitAnnouncement(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const editing = workspace.announcements.find(
      (announcement) => announcement.id === announcementEditor,
    );
    const ok = await mutate(
      editing
        ? `/api/circles/${workspace.circleId}/announcements/${editing.id}`
        : `/api/circles/${workspace.circleId}/announcements`,
      editing ? "PATCH" : "POST",
      {
        title: String(form.get("title") ?? ""),
        body: String(form.get("body") ?? ""),
        pinned: form.get("pinned") === "on",
        commentsEnabled: form.get("commentsEnabled") === "on",
      },
      editing ? `announcement:${editing.id}` : "announcement:new",
    );
    if (ok) setAnnouncementEditor(null);
  }

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const ok = await mutate(
      `/api/circles/${workspace.circleId}/comments`,
      "POST",
      {
        body: String(form.get("body") ?? ""),
        announcementId: selectedAnnouncementId,
        parentCommentId: replyTo,
      },
      replyTo ? `reply:${replyTo}` : "comment:new",
    );
    if (ok) {
      event.currentTarget.reset();
      setReplyTo(null);
    }
  }

  function openDiscussion(announcement: Announcement) {
    setSelectedAnnouncementId(announcement.id);
    setTab("comments");
    setReplyTo(null);
  }

  function renderActionForm(
    comment: CircleComment,
    mode: "report" | "moderate",
  ) {
    const active = mode === "report" ? reporting : moderating;
    if (active !== comment.id) return null;
    return (
      <form
        className="bc-comment-action-form"
        onSubmit={async (event) => {
          event.preventDefault();
          const reason = String(
            new FormData(event.currentTarget).get("reason") ?? "",
          );
          const ok = await mutate(
            `/api/circles/${workspace.circleId}/comments/${comment.id}/${mode}`,
            "POST",
            { reason },
            `${mode}:${comment.id}`,
          );
          if (ok) {
            if (mode === "report") setReporting(null);
            else setModerating(null);
          }
        }}
      >
        <label>
          {mode === "report"
            ? "Why are you reporting this comment?"
            : "Reason for removing this comment"}
          <textarea name="reason" rows={2} maxLength={500} required />
        </label>
        <div>
          <button
            type="button"
            onClick={() =>
              mode === "report" ? setReporting(null) : setModerating(null)
            }
          >
            Cancel
          </button>
          <button type="submit" disabled={Boolean(busy)}>
            {busy === `${mode}:${comment.id}`
              ? "Submitting…"
              : mode === "report"
                ? "Submit report"
                : "Remove comment"}
          </button>
        </div>
      </form>
    );
  }

  function renderComment(comment: CircleComment, nested = false) {
    const own = comment.authorId === workspace.viewerId;
    const openReports = workspace.reports.filter(
      (report) => report.commentId === comment.id,
    );
    return (
      <article
        className={`bc-comment ${nested ? "is-reply" : ""}`}
        key={comment.id}
      >
        <div className="bc-comment__avatar">
          <Avatar comment={comment} />
        </div>
        <div className="bc-comment__content">
          <header>
            <strong>
              {comment.authorName}
              {own ? " (You)" : ""}
            </strong>
            <time dateTime={comment.createdAt}>
              {dateTime.format(new Date(comment.createdAt))}
            </time>
          </header>
          <CommentBody comment={comment} />
          {comment.status === "visible" ? (
            <footer>
              {!nested && !readOnly && workspace.commentsEnabled ? (
                <button type="button" onClick={() => setReplyTo(comment.id)}>
                  <Reply size={13} aria-hidden="true" /> Reply
                </button>
              ) : null}
              {own && !readOnly ? (
                confirming === `comment:${comment.id}` ? (
                  <>
                    <span>Delete this comment?</span>
                    <button
                      type="button"
                      disabled={Boolean(busy)}
                      onClick={() =>
                        void mutate(
                          `/api/circles/${workspace.circleId}/comments/${comment.id}`,
                          "DELETE",
                          undefined,
                          `delete-comment:${comment.id}`,
                        ).then((ok) => ok && setConfirming(null))
                      }
                    >
                      Delete
                    </button>
                    <button type="button" onClick={() => setConfirming(null)}>
                      Keep
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={() => setConfirming(`comment:${comment.id}`)}
                  >
                    <Trash2 size={13} aria-hidden="true" /> Delete
                  </button>
                )
              ) : null}
              {!own && !readOnly ? (
                <button
                  type="button"
                  onClick={() => {
                    setReporting(comment.id);
                    setModerating(null);
                  }}
                >
                  <Flag size={13} aria-hidden="true" /> Report
                </button>
              ) : null}
              {workspace.viewerCanManage && !own && !readOnly ? (
                <button
                  type="button"
                  onClick={() => {
                    setModerating(comment.id);
                    setReporting(null);
                  }}
                >
                  <ShieldAlert size={13} aria-hidden="true" /> Moderate
                </button>
              ) : null}
              {openReports.length ? (
                <span className="bc-comment-report-count">
                  {openReports.length} open{" "}
                  {openReports.length === 1 ? "report" : "reports"}
                </span>
              ) : null}
            </footer>
          ) : null}
          {renderActionForm(comment, "report")}
          {renderActionForm(comment, "moderate")}
          {!nested
            ? (replies.get(comment.id) ?? []).map((reply) =>
                renderComment(reply, true),
              )
            : null}
        </div>
      </article>
    );
  }

  return (
    <section className="bc-communication">
      <header className="bc-communication__header">
        <div>
          <span>STAY CONNECTED</span>
          <h2>Circle communication</h2>
          <p>Official updates, member discussion, and verified activity.</p>
        </div>
        {readOnly ? (
          <span className="bc-communication-readonly">
            <LockKeyhole size={14} aria-hidden="true" /> Read-only
          </span>
        ) : null}
      </header>

      <div className="bc-communication-tabs" role="tablist">
        {(
          [
            ["announcements", "Announcements", Megaphone],
            ["comments", "Comments", MessageCircle],
            ["activity", "Activity", MoreHorizontal],
          ] as const
        ).map(([id, label, Icon]) => (
          <button
            type="button"
            role="tab"
            key={id}
            aria-selected={tab === id}
            onClick={() => setTab(id)}
          >
            <Icon size={15} aria-hidden="true" /> {label}
          </button>
        ))}
      </div>

      {error ? (
        <p className="bc-communication-error" role="alert">
          {error}
        </p>
      ) : null}

      {tab === "announcements" ? (
        <section className="bc-announcements" role="tabpanel">
          <header>
            <div>
              <h3>Official announcements</h3>
              <p>Only the creator and co-admins can publish here.</p>
            </div>
            {workspace.viewerCanManage && !readOnly ? (
              <button
                type="button"
                onClick={() => setAnnouncementEditor("new")}
              >
                <Megaphone size={14} aria-hidden="true" /> New announcement
              </button>
            ) : null}
          </header>

          {announcementEditor ? (
            <form
              className="bc-announcement-editor"
              onSubmit={submitAnnouncement}
            >
              {(() => {
                const editing = workspace.announcements.find(
                  (announcement) => announcement.id === announcementEditor,
                );
                return (
                  <>
                    <header>
                      <h3>
                        {editing ? "Edit announcement" : "New announcement"}
                      </h3>
                      <button
                        type="button"
                        aria-label="Close announcement editor"
                        onClick={() => setAnnouncementEditor(null)}
                      >
                        <X size={15} aria-hidden="true" />
                      </button>
                    </header>
                    <label>
                      Title
                      <input
                        name="title"
                        defaultValue={editing?.title ?? ""}
                        minLength={3}
                        maxLength={100}
                        required
                      />
                    </label>
                    <label>
                      Message
                      <textarea
                        name="body"
                        defaultValue={editing?.body ?? ""}
                        rows={5}
                        maxLength={2000}
                        required
                      />
                    </label>
                    <div className="bc-announcement-options">
                      <label>
                        <input
                          name="pinned"
                          type="checkbox"
                          defaultChecked={editing?.pinned ?? false}
                        />
                        Pin announcement
                      </label>
                      <label>
                        <input
                          name="commentsEnabled"
                          type="checkbox"
                          defaultChecked={editing?.commentsEnabled ?? true}
                        />
                        Allow comments
                      </label>
                    </div>
                    <footer>
                      <button
                        type="button"
                        onClick={() => setAnnouncementEditor(null)}
                      >
                        Cancel
                      </button>
                      <button type="submit" disabled={Boolean(busy)}>
                        <Send size={14} aria-hidden="true" />
                        {busy.startsWith("announcement:")
                          ? "Saving…"
                          : editing
                            ? "Save changes"
                            : "Post announcement"}
                      </button>
                    </footer>
                  </>
                );
              })()}
            </form>
          ) : null}

          {workspace.announcements.length ? (
            <div className="bc-announcement-list">
              {workspace.announcements.map((announcement) => {
                const count = workspace.comments.filter(
                  (comment) => comment.announcementId === announcement.id,
                ).length;
                return (
                  <article
                    className={announcement.pinned ? "is-pinned" : ""}
                    key={announcement.id}
                  >
                    <header>
                      <div>
                        {announcement.pinned ? (
                          <span>
                            <Pin size={12} aria-hidden="true" /> Pinned
                          </span>
                        ) : null}
                        <h3>{announcement.title}</h3>
                      </div>
                      <small>Official</small>
                    </header>
                    <p>{announcement.body}</p>
                    <footer>
                      <span>
                        {announcement.authorName} ·{" "}
                        <time dateTime={announcement.createdAt}>
                          {dateTime.format(new Date(announcement.createdAt))}
                        </time>
                      </span>
                      <div>
                        <button
                          type="button"
                          onClick={() => openDiscussion(announcement)}
                        >
                          <MessageCircle size={13} aria-hidden="true" />
                          {count} {count === 1 ? "comment" : "comments"}
                        </button>
                        {workspace.viewerCanManage && !readOnly ? (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                void mutate(
                                  `/api/circles/${workspace.circleId}/announcements/${announcement.id}`,
                                  "PATCH",
                                  { pinned: !announcement.pinned },
                                  `pin:${announcement.id}`,
                                )
                              }
                            >
                              {announcement.pinned ? (
                                <PinOff size={13} aria-hidden="true" />
                              ) : (
                                <Pin size={13} aria-hidden="true" />
                              )}
                              {announcement.pinned ? "Unpin" : "Pin"}
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                void mutate(
                                  `/api/circles/${workspace.circleId}/announcements/${announcement.id}`,
                                  "PATCH",
                                  {
                                    commentsEnabled:
                                      !announcement.commentsEnabled,
                                  },
                                  `comments:${announcement.id}`,
                                )
                              }
                            >
                              {announcement.commentsEnabled
                                ? "Close comments"
                                : "Open comments"}
                            </button>
                            <button
                              type="button"
                              onClick={() =>
                                setAnnouncementEditor(announcement.id)
                              }
                            >
                              <Edit3 size={13} aria-hidden="true" /> Edit
                            </button>
                            {confirming ===
                            `announcement:${announcement.id}` ? (
                              <>
                                <span>Delete announcement?</span>
                                <button
                                  type="button"
                                  disabled={Boolean(busy)}
                                  onClick={() =>
                                    void mutate(
                                      `/api/circles/${workspace.circleId}/announcements/${announcement.id}`,
                                      "DELETE",
                                      undefined,
                                      `delete-announcement:${announcement.id}`,
                                    ).then((ok) => ok && setConfirming(null))
                                  }
                                >
                                  Delete
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setConfirming(null)}
                                >
                                  Keep
                                </button>
                              </>
                            ) : (
                              <button
                                type="button"
                                onClick={() =>
                                  setConfirming(
                                    `announcement:${announcement.id}`,
                                  )
                                }
                              >
                                <Trash2 size={13} aria-hidden="true" /> Delete
                              </button>
                            )}
                          </>
                        ) : null}
                      </div>
                    </footer>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="bc-communication-empty">
              <Megaphone size={22} aria-hidden="true" />
              <p>No announcements have been posted yet.</p>
            </div>
          )}
        </section>
      ) : null}

      {tab === "comments" ? (
        <section className="bc-comments" role="tabpanel">
          <header>
            <div>
              {selectedAnnouncement ? (
                <>
                  <button
                    type="button"
                    onClick={() => setSelectedAnnouncementId(null)}
                  >
                    ← Circle comments
                  </button>
                  <h3>{selectedAnnouncement.title}</h3>
                  <p>Discussion on this official announcement.</p>
                </>
              ) : (
                <>
                  <h3>Circle comments</h3>
                  <p>Plain-text discussion shared with circle members.</p>
                </>
              )}
            </div>
            {workspace.viewerCanManage && !readOnly ? (
              <button
                type="button"
                onClick={() =>
                  void mutate(
                    `/api/circles/${workspace.circleId}/comments/settings`,
                    "PATCH",
                    { commentsEnabled: !workspace.commentsEnabled },
                    "comment-settings",
                  )
                }
              >
                {workspace.commentsEnabled
                  ? "Disable circle comments"
                  : "Enable circle comments"}
              </button>
            ) : null}
          </header>

          {!readOnly &&
          workspace.commentsEnabled &&
          (selectedAnnouncement?.commentsEnabled ?? true) ? (
            <form className="bc-comment-composer" onSubmit={submitComment}>
              {replyTo ? (
                <div>
                  Replying to{" "}
                  {workspace.comments.find((item) => item.id === replyTo)
                    ?.authorName ?? "member"}
                  <button
                    type="button"
                    aria-label="Cancel reply"
                    onClick={() => setReplyTo(null)}
                  >
                    <X size={13} aria-hidden="true" />
                  </button>
                </div>
              ) : null}
              <label>
                <span>
                  {replyTo
                    ? "Write a reply"
                    : selectedAnnouncement
                      ? "Comment on this announcement"
                      : "Add a comment"}
                </span>
                <textarea
                  name="body"
                  rows={3}
                  maxLength={1000}
                  placeholder="Write a respectful plain-text comment…"
                  required
                />
              </label>
              <footer>
                <small>Up to 1,000 characters. No files or images.</small>
                <button type="submit" disabled={Boolean(busy)}>
                  <Send size={14} aria-hidden="true" />
                  {busy === "comment:new" || busy.startsWith("reply:")
                    ? "Posting…"
                    : replyTo
                      ? "Post reply"
                      : "Post comment"}
                </button>
              </footer>
            </form>
          ) : (
            <p className="bc-comments-closed">
              <LockKeyhole size={14} aria-hidden="true" />
              {readOnly
                ? "This circle is read-only."
                : "Comments are closed for this discussion."}
            </p>
          )}

          {roots.length ? (
            <div className="bc-comment-list">
              {roots.map((comment) => renderComment(comment))}
            </div>
          ) : (
            <div className="bc-communication-empty">
              <MessageCircle size={22} aria-hidden="true" />
              <p>No comments yet. Start the conversation.</p>
            </div>
          )}
        </section>
      ) : null}

      {tab === "activity" ? (
        <section className="bc-communication-activity" role="tabpanel">
          <header>
            <div>
              <h3>Verified activity</h3>
              <p>System-generated events cannot be edited by members.</p>
            </div>
          </header>
          <ActivityFeed events={workspace.activity} />
        </section>
      ) : null}
    </section>
  );
}
