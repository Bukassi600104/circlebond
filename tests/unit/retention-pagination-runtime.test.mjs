import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";
import * as rules from "../../server/retention/rules.ts";

const now = new Date("2026-10-30T12:00:00.000Z");
const circleId = "retention-circle";
const pathFor = (id) => `receipts/${circleId}/member/${id}.png`;

async function harness({
  receiptCount = 0,
  invitationCount = 0,
  membershipCount = 1,
  tierCount = 0,
  failPage,
  transformPage = (page) => page,
  shared = new Set(),
  failDelete,
  status = "archived",
} = {}) {
  const records = {
    receipts: Array.from({ length: receiptCount }, (_, i) => ({
      id: `receipt-${i + 1}`,
      imageStoragePath: pathFor(i + 1),
    })),
    invitations: Array.from({ length: invitationCount }, (_, i) => ({
      id: `invitation-${i + 1}`,
    })),
    circleMemberships: Array.from({ length: membershipCount }, (_, i) => ({
      receiptStoragePath:
        membershipCount === 1
          ? receiptCount
            ? pathFor(receiptCount)
            : null
          : pathFor(`legacy-${i + 1}`),
    })),
    asoEbiTiers: Array.from({ length: tierCount }, (_, i) => ({
      fabricImageStoragePath: `circles/${circleId}/fabric/${i}.png`,
      appreciationGiftImageStoragePath: `circles/${circleId}/gift/${i}.png`,
    })),
  };
  const state = {
    circle: {
      id: circleId,
      type: "gift",
      status,
      retentionDueAt: "2026-09-01T00:00:00.000Z",
      purgeAt: null,
    },
    retentionPurgeAttempts: [],
  };
  const calls = [];
  const deleted = [];
  const acceptedInvitations = [];
  let purged = false;
  const db = {
    executeQuery: async (operation, variables) => {
      calls.push({ operation, ...variables });
      if (operation === "GetCircleRetentionState") return { data: state };
      if (operation === "GetCircleRetentionPayload")
        return {
          data: {
            ...state,
            ...Object.fromEntries(
              Object.entries(records).map(([key, rows]) => [
                key,
                rows.slice(0, 100),
              ]),
            ),
          },
        };
      if (operation === "GetCircleRetentionPage") {
        assert.equal(variables.circleId, circleId);
        if (variables.offset === failPage)
          throw new Error("private query failure");
        return {
          data: transformPage(
            Object.fromEntries(
              Object.entries(records).map(([key, rows]) => [
                key,
                rows.slice(variables.offset, variables.offset + 100),
              ]),
            ),
            variables.offset,
          ),
        };
      }
      if (
        operation === "GetRetentionExternalStorageReferences" ||
        operation === "GetStoragePathReferences"
      ) {
        if (operation === "GetRetentionExternalStorageReferences")
          assert.equal(variables.circleId, circleId);
        const receipts = shared.has(variables.path)
          ? [
              { id: "same-1", circle: { id: circleId } },
              { id: "same-2", circle: { id: circleId } },
              { id: "foreign-3", circle: { id: "other-circle" } },
            ]
          : [];
        return {
          data: {
            circles: [],
            receipts:
              operation === "GetRetentionExternalStorageReferences"
                ? receipts.filter((row) => row.circle.id !== variables.circleId)
                : receipts.slice(0, 2),
            circleMemberships: [],
            fabricReferences: [],
            giftReferences: [],
          },
        };
      }
      throw new Error(`Unexpected operation ${operation}`);
    },
    executeMutation: async (operation, variables) => {
      calls.push({ operation, ...variables });
      if (operation === "PurgeInvitationAcceptances")
        acceptedInvitations.push(variables.invitationId);
      if (operation === "PurgeCircleSensitiveData") purged = true;
      return { data: {} };
    },
  };
  const repo = await loadTypescriptModule("server/repositories/retention.ts", {
    "server-only": {},
    "node:crypto": { randomUUID },
    "@/lib/logger": { logger: { info() {}, error() {} } },
    "@/server/firebase/data-connect": { getBondCircleDataConnect: () => db },
    "@/server/retention/rules": rules,
    "@/server/firebase/admin": {
      getFirebaseAdminStorage: () => ({
        bucket: () => ({
          file: (path) => ({
            delete: async (options) => {
              calls.push({ operation: "deleteFile", path });
              assert.equal(options.ignoreNotFound, true);
              if (path === failDelete)
                throw new Error("private storage failure");
              deleted.push(path);
            },
            exists: async () => [false],
          }),
        }),
      }),
    },
  });
  return {
    run: () => repo.purgeEligibleCircle(circleId, now),
    calls,
    deleted,
    acceptedInvitations,
    wasPurged: () => purged,
  };
}

test("purge deletes all102 receipts for one member and all102 invitation acceptances", async () => {
  const h = await harness({ receiptCount: 102, invitationCount: 102 });
  const result = await h.run();
  assert.equal(result.status, "completed");
  assert.equal(result.deletedFileCount, 102);
  assert.equal(new Set(h.deleted).size, 102);
  assert.ok(
    h.deleted.includes(pathFor(101)),
    "older replacement must not be orphaned",
  );
  assert.equal(h.acceptedInvitations.length, 102);
  assert.ok(h.acceptedInvitations.includes("invitation-102"));
  assert.equal(h.wasPurged(), true);
  assert.deepEqual(
    h.calls
      .filter((call) => call.operation === "GetCircleRetentionPage")
      .map((call) => call.offset),
    [0, 100],
  );
  assert.ok(
    h.calls.findLastIndex(
      (call) => call.operation === "GetCircleRetentionPage",
    ) < h.calls.findIndex((call) => call.operation === "deleteFile"),
    "all reads must finish before any deletion",
  );
});

test("all500 legacy membership paths and later tier images are enumerated", async () => {
  const h = await harness({ membershipCount: 500, tierCount: 101 });
  const result = await h.run();
  assert.equal(result.status, "completed");
  assert.equal(result.deletedFileCount, 702);
  assert.ok(h.deleted.includes(pathFor("legacy-500")));
  assert.ok(h.deleted.includes(`circles/${circleId}/gift/100.png`));
  assert.deepEqual(
    h.calls
      .filter((call) => call.operation === "GetCircleRetentionPage")
      .map((call) => call.offset),
    [0, 100, 200, 300, 400, 500],
  );
});

for (const [label, options] of [
  ["later receipt page fails", { receiptCount: 102, failPage: 100 }],
  ["later invitation page fails", { invitationCount: 102, failPage: 100 }],
  [
    "later page omits invitations",
    {
      receiptCount: 102,
      transformPage: (page, offset) => {
        if (offset === 100) delete page.invitations;
        return page;
      },
    },
  ],
  [
    "later page includes unsafe storage path",
    {
      receiptCount: 102,
      transformPage: (page, offset) => {
        if (offset === 100)
          page.receipts[0].imageStoragePath = "../private.png";
        return page;
      },
    },
  ],
]) {
  test(`${label}: fail closed before files or sensitive records are removed`, async () => {
    const h = await harness(options);
    const result = await h.run();
    assert.equal(result.status, "failed");
    assert.equal(result.failureReason, "RETENTION_PURGE_FAILED");
    assert.equal(h.deleted.length, 0);
    assert.equal(h.acceptedInvitations.length, 0);
    assert.equal(h.wasPurged(), false);
    const attempt = h.calls.find(
      (call) => call.operation === "CompleteRetentionPurgeAttempt",
    );
    assert.equal(attempt.status, "failed");
    assert.equal(attempt.deletedFileCount, 0);
    assert.equal(attempt.failureReason, "RETENTION_PURGE_FAILED");
    assert.equal(attempt.nextRetryAt, "2026-10-30T18:00:00.000Z");
  });
}

test("other-circle file remains protected behind repeated same-circle references", async () => {
  const h = await harness({
    receiptCount: 102,
    shared: new Set([pathFor(101)]),
  });
  const result = await h.run();
  assert.equal(result.status, "completed");
  assert.equal(result.skippedSharedFileCount, 1);
  assert.equal(result.deletedFileCount, 101);
  assert.equal(h.deleted.includes(pathFor(101)), false);
});

test("storage failure does not delete receipt metadata or mark purge completed", async () => {
  const h = await harness({ receiptCount: 102, failDelete: pathFor(101) });
  assert.equal((await h.run()).status, "failed");
  assert.equal(h.wasPurged(), false);
  assert.equal(h.acceptedInvitations.length, 0);
});

test("active circles remain untouched and do not enumerate records", async () => {
  const h = await harness({ status: "active", receiptCount: 102 });
  assert.equal((await h.run()).status, "skipped");
  assert.equal(h.calls.length, 1);
  assert.equal(h.deleted.length, 0);
});
