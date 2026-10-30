import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import * as rules from "../../server/communication/rules.ts";
import * as supportRules from "../../server/circles/support.ts";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

const circleId = "authorized-circle";
const timestamp = "2026-10-30T10:00:00Z";
const member = (id, role = "member") => ({
  role,
  membershipStatus: "joined",
  expectedAmount: 1000,
  confirmedAmount: 500,
  pledgedAmount: 0,
  contributionStatus: "part_paid",
  user: { id, displayName: id, email: null },
});
const comment = (index) => ({
  id: "comment-" + index,
  body: "Comment " + index,
  status: "visible",
  announcementId: null,
  parentCommentId: null,
  createdAt: timestamp,
  updatedAt: timestamp,
  author: { id: "self", displayName: "Self" },
});
const announcement = (index) => ({
  id: "announcement-" + index,
  title: "Update " + index,
  body: "News",
  pinned: false,
  important: false,
  commentsEnabled: true,
  createdAt: timestamp,
  updatedAt: timestamp,
  author: { id: "organizer", displayName: "Organizer" },
});
const pricing = {
  entitlementContextForStoredCircle: (circle) => circle,
  hasEntitlement: () => true,
  assertEntitlement: () => {},
};

async function fixture({
  role = "creator",
  joined = true,
  fail,
  malformed,
  type = "gift",
} = {}) {
  const comments = Array.from({ length: 401 }, (_, i) => comment(i));
  // Preserve deleted parents as placeholders even when their child is on a later page.
  comments[0].status = "deleted_by_author";
  comments[300].parentCommentId = comments[0].id;
  const announcements = Array.from({ length: 401 }, (_, i) => announcement(i));
  const commentReports = Array.from({ length: 201 }, (_, i) => ({
    id: "report-" + i,
    reason: "Please review",
    status: "open",
    createdAt: timestamp,
    comment: { id: "comment-300" },
    reporter: { id: "reporter", displayName: "Reporter" },
  }));
  const supportUpdates = Array.from({ length: 401 }, (_, i) => ({
    id: "update-" + i,
    body: "Support update " + i,
    createdAt: timestamp,
    author: { id: "organizer", displayName: "Organizer" },
  }));
  const circle = {
    id: circleId,
    name: "History",
    type,
    status: "active",
    commentsEnabled: true,
    memberLimit: 100,
    pricingPlan: "premium",
    pricingModelVersion: "model_specific_v1",
    creator: { id: "self" },
    showBeneficiaryName: false,
    beneficiaryName: "Private",
    showTargetToMembers: false,
    showConfirmedTotalToMembers: false,
    hideIndividualAmounts: true,
    targetAmount: 1000,
    contributedAmount: 500,
  };
  const context = {
    circle,
    circleMemberships: joined ? [member("self", role), member("other")] : [],
    activityLogs: [],
    supportUpdates: supportUpdates.slice(0, 100),
  };
  const collections = {
    GetCircleCommentsPage: { comments },
    GetCircleAnnouncementsPage: { announcements },
    GetCircleCommentReportsPage: { commentReports },
    GetSupportUpdatesPage: { supportUpdates },
  };
  const calls = [];
  const mutations = [];
  const connector = {
    executeQuery: async (operation, input) => {
      calls.push({ operation, ...input });
      if (operation === "GetOpenCommentReportsByReporter") {
        assert.equal(input.commentId, "comment-301");
        assert.equal(input.reporterId, "self");
        return { data: { commentReports: [] } };
      }
      if (operation === "GetActivityLogsForCircles") {
        assert.equal(
          JSON.stringify(input.circleIds),
          JSON.stringify([circleId]),
        );
        return {
          data: {
            activityLogs: context.activityLogs.map((row) => ({
              ...row,
              circle,
            })),
          },
        };
      }
      assert.equal(input.circleId, circleId);
      if (
        ["GetCircleCommunicationContext", "GetSupportCircleDetail"].includes(
          operation,
        )
      ) {
        return { data: context };
      }
      if (operation === "GetRecentCommentsByAuthor")
        return { data: { comments: [] } };
      assert.ok(collections[operation], "Unexpected operation: " + operation);
      if (input.offset === 200 && fail === operation)
        throw new Error("Later page failed");
      if (input.offset === 200 && malformed === operation) return { data: {} };
      const [field, rows] = Object.entries(collections[operation])[0];
      return {
        data: { [field]: rows.slice(input.offset, input.offset + 200) },
      };
    },
    executeMutation: async (operation, input) => {
      mutations.push({ operation, ...input });
    },
  };
  const dataConnect = { getBondCircleDataConnect: () => connector };
  const pages = await loadTypescriptModule("server/repositories/pages.ts", {
    "server-only": {},
    "@/server/firebase/data-connect": dataConnect,
  });
  const common = {
    "server-only": {},
    "@/server/firebase/data-connect": dataConnect,
    "@/server/repositories/pages": pages,
    "@/server/pricing": pricing,
  };
  const communication = await loadTypescriptModule(
    "server/repositories/communication.ts",
    {
      ...common,
      "node:crypto": { randomUUID: () => "generated-id" },
      "@/server/communication/rules": rules,
      "@/server/repositories/dashboard": {
        loadDashboardCircles: async () => [
          { id: circleId, membershipStatus: joined ? "joined" : "invited" },
        ],
      },
      "@/server/repositories/notifications": {
        safelyEmitNotification: async () => {},
      },
    },
  );
  const support = await loadTypescriptModule(
    "server/repositories/support-circles.ts",
    {
      ...common,
      "@/server/circles/support": supportRules,
    },
  );
  return {
    communication,
    support,
    calls,
    mutations,
    comments,
    announcements,
    context,
  };
}

test("communication returns all401 comments and announcements and201 manager reports", async () => {
  const f = await fixture();
  const result = await f.communication.loadCircleCommunication(
    circleId,
    "self",
  );
  assert.equal(result.comments.length, 401);
  assert.equal(result.announcements.length, 401);
  assert.equal(result.reports.length, 201);
  assert.equal(result.comments[0].body, null);
  assert.equal(result.comments[300].parentCommentId, "comment-0");
  assert.equal(result.comments[400].body, "Comment 400");
  for (const operation of [
    "GetCircleCommentsPage",
    "GetCircleAnnouncementsPage",
  ]) {
    assert.deepEqual(
      f.calls.filter((c) => c.operation === operation).map((c) => c.offset),
      [0, 200, 400],
    );
  }
});

test("comment301 remains available for replies, own deletion, moderation and reporting", async () => {
  for (const action of ["reply", "delete", "moderate", "report"]) {
    const f = await fixture();
    if (action === "reply") {
      await f.communication.createComment({
        circleId,
        authorId: "self",
        parentCommentId: "comment-301",
        body: "A reply",
      });
      assert.equal(f.mutations[0].parentCommentId, "comment-301");
    } else if (action === "delete") {
      await f.communication.deleteOwnComment({
        circleId,
        actorId: "self",
        commentId: "comment-301",
      });
    } else if (action === "moderate") {
      await f.communication.moderateComment({
        circleId,
        actorId: "self",
        commentId: "comment-301",
        reason: "Needs review",
      });
    } else {
      f.comments[301].author.id = "other";
      await f.communication.reportComment({
        circleId,
        reporterId: "self",
        commentId: "comment-301",
        reason: "Needs review",
      });
    }
    assert.equal(f.mutations.length, 1);
    assert.equal(
      f.mutations[0].commentId,
      action === "reply" ? "generated-id" : "comment-301",
    );
  }
});

test("newest and older-than100 announcements remain editable, deletable and discussable", async () => {
  for (const target of ["announcement-0", "announcement-300"]) {
    const f = await fixture();
    await f.communication.updateAnnouncement({
      circleId,
      actorId: "self",
      announcementId: target,
      title: "Edited news",
    });
    await f.communication.deleteAnnouncement({
      circleId,
      actorId: "self",
      announcementId: target,
    });
    await f.communication.createComment({
      circleId,
      authorId: "self",
      announcementId: target,
      body: "Question",
    });
    assert.equal(f.mutations.length, 3);
    assert.equal(f.mutations[0].announcementId, target);
    assert.equal(f.mutations[1].announcementId, target);
    assert.equal(f.mutations[2].announcementId, target);
  }
});

test("full history preserves membership, manager, author, discussion and read-only boundaries", async () => {
  const outsider = await fixture({ joined: false });
  assert.equal(
    await outsider.communication.loadCircleCommunication(circleId, "self"),
    null,
  );
  assert.equal(outsider.calls.length, 1);
  const f = await fixture({ role: "member" });
  const result = await f.communication.loadCircleCommunication(
    circleId,
    "self",
  );
  assert.equal(result.reports.length, 0);
  assert.ok(
    !f.calls.some((c) => c.operation === "GetCircleCommentReportsPage"),
  );
  await assert.rejects(
    f.communication.moderateComment({
      circleId,
      actorId: "self",
      commentId: "comment-301",
      reason: "Reason",
    }),
    /creator|co-admin/,
  );
  f.comments[301].author.id = "other";
  await assert.rejects(
    f.communication.deleteOwnComment({
      circleId,
      actorId: "self",
      commentId: "comment-301",
    }),
    /only your own/,
  );
  await assert.rejects(
    f.communication.createComment({
      circleId,
      authorId: "self",
      parentCommentId: "comment-0",
      body: "Deleted parent",
    }),
    /unavailable/,
  );
  f.comments[301].announcementId = "announcement-300";
  await assert.rejects(
    f.communication.createComment({
      circleId,
      authorId: "self",
      parentCommentId: "comment-301",
      body: "Wrong thread",
    }),
    /same discussion/,
  );
  f.context.circle.status = "archived";
  await assert.rejects(
    f.communication.createComment({
      circleId,
      authorId: "self",
      body: "Archived",
    }),
    /read-only/,
  );
  assert.equal(f.mutations.length, 0);
});

test("missing or failed later communication pages abort before any action mutation", async () => {
  for (const operation of [
    "GetCircleCommentsPage",
    "GetCircleAnnouncementsPage",
    "GetCircleCommentReportsPage",
  ]) {
    for (const failure of ["fail", "malformed"]) {
      const f = await fixture({ [failure]: operation });
      await assert.rejects(
        f.communication.deleteOwnComment({
          circleId,
          actorId: "self",
          commentId: "comment-301",
        }),
      );
      assert.equal(f.mutations.length, 0);
    }
  }
});

test("Support history includes every401 update and retains member privacy", async () => {
  const f = await fixture({ type: "support", role: "member" });
  f.context.circle.creator.id = "organizer";
  const result = await f.support.loadSupportCircle(circleId, "self");
  assert.equal(result.updates.length, 401);
  assert.equal(result.updates.at(-1).id, "update-400");
  assert.equal(result.beneficiaryName, null);
  assert.equal(result.targetAmount, null);
  assert.equal(
    result.members.find((m) => m.id === "other").confirmedAmount,
    null,
  );
  assert.equal(
    result.members.find((m) => m.id === "self").confirmedAmount,
    500,
  );
  assert.deepEqual(
    f.calls
      .filter((c) => c.operation === "GetSupportUpdatesPage")
      .map((c) => c.offset),
    [0, 200, 400],
  );
});

test("Support history rejects outsiders and later page failure without partial success", async () => {
  const outsider = await fixture({ type: "support", joined: false });
  assert.equal(
    await outsider.support.loadSupportCircle(circleId, "self"),
    null,
  );
  assert.equal(outsider.calls.length, 1);
  for (const failure of ["fail", "malformed"]) {
    const f = await fixture({
      type: "support",
      [failure]: "GetSupportUpdatesPage",
    });
    await assert.rejects(f.support.loadSupportCircle(circleId, "self"));
    assert.equal(f.mutations.length, 0);
  }
});

test("history operations retain circle scope, stable ordering, bounded pages and server-only access", async () => {
  const source = await readFile(
    "dataconnect/bondcircle/communication-pages.gql",
    "utf8",
  );
  const operations = source.split(/(?=query Get)/).slice(1);
  assert.equal(operations.length, 5);
  for (const operation of operations) {
    assert.match(operation, /@auth\(level: NO_ACCESS\)/);
    assert.match(operation, /circleId: \{ eq: \$circleId \}/);
    if (operation.includes("$offset")) {
      assert.match(operation, /limit: 200/);
      assert.match(operation, /offset: \$offset/);
      assert.match(operation, /\{ id: ASC \}/);
    }
  }
  assert.match(operations[1], /deletedAt: \{ isNull: true \}/);
  assert.doesNotMatch(operations[2], /status: \{ eq: "visible"/);
  assert.match(operations[3], /status: \{ eq: "open" \}/);
});

test("public circle and global activity never serialize private financial audit metadata", async () => {
  const f = await fixture({ role: "member", type: "support" });
  f.context.circle.creator = { id: "organizer" };
  const privateMetadata = JSON.stringify({
    amount: 918273645,
    fromConfirmedAmount: 1234,
    toConfirmedAmount: 918274879,
    rejectionReason: "Private review",
    targetAmount: 987654321,
    contributedAmount: 876543210,
  });
  f.context.activityLogs.push({
    id: "private-audit",
    eventType: "receipt_confirmed",
    metadata: privateMetadata,
    createdAt: timestamp,
    actor: { id: "organizer", displayName: "Organizer" },
  });
  const circle = await f.communication.loadCircleCommunication(
    circleId,
    "self",
  );
  const global = await f.communication.loadUserActivity("self");
  assert.equal(circle.viewerCanManage, false);
  for (const activity of [circle.activity, global]) {
    assert.equal(activity.length, 1);
    assert.equal(JSON.stringify(activity[0].metadata), "{}");
    assert.doesNotMatch(
      JSON.stringify(activity),
      /918273645|987654321|876543210|Private review/,
    );
  }
  assert.equal(
    f.context.activityLogs[0].metadata,
    privateMetadata,
    "Private audit records remain intact",
  );
});

test("global activity excludes circles where the viewer has not joined", async () => {
  const f = await fixture({ joined: false });
  assert.equal((await f.communication.loadUserActivity("self")).length, 0);
  assert.equal(
    f.calls.some((call) => call.operation === "GetActivityLogsForCircles"),
    false,
  );
});
