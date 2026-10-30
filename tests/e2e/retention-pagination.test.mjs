import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import test from "node:test";
import { getApps, initializeApp } from "firebase-admin/app";
import { getDataConnect } from "firebase-admin/data-connect";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";
import * as rules from "../../server/retention/rules.ts";

assert.match(
  process.env.DATA_CONNECT_EMULATOR_HOST ?? "",
  /^127\.0\.0\.1:\d+$/,
  "Retention acceptance requires an explicit loopback Data Connect emulator.",
);
const app =
  getApps().find(
    (candidate) => candidate.name === "retention-pagination-e2e",
  ) ?? initializeApp({ projectId: "bond-circle" }, "retention-pagination-e2e");
const db = getDataConnect(
  {
    location: "europe-west2",
    serviceId: "bondcircle-service",
    connector: "bondcircle",
  },
  app,
);

test("real connector enumerates102 receipts/invitations and fails closed before retrying the purge", async () => {
  const userId = `retention-pages-${randomUUID()}`;
  const circleId = randomUUID();
  const now = new Date("2099-10-30T12:00:00.000Z");
  await db.upsert("user", {
    id: userId,
    displayName: "Synthetic retention user",
  });
  await db.upsert("circle", {
    id: circleId,
    creatorId: userId,
    name: "Synthetic paginated retention circle",
    type: "gift",
    targetAmount: 1000,
    status: "archived",
    retentionDueAt: "2099-09-01T00:00:00.000Z",
  });
  const receipts = Array.from({ length: 102 }, (_, i) => ({
    id: randomUUID(),
    circleId,
    uploadedById: userId,
    amount: 100,
    imageUrl: "https://example.test/private-receipt",
    imageStoragePath: `receipts/${circleId}/${userId}/${i + 1}.png`,
    contentType: "image/png",
  }));
  await db.upsertMany("receipt", receipts);
  await db.upsert("circleMembership", {
    circleId,
    userId,
    role: "creator",
    receiptStoragePath: receipts[101].imageStoragePath,
  });
  const invitations = Array.from({ length: 102 }, () => ({
    id: randomUUID(),
    circleId,
    invitedById: userId,
    tokenHash: randomUUID().replaceAll("-", "").padEnd(64, "0"),
    mode: "open",
    expiresAt: "2099-01-01T00:00:00.000Z",
  }));
  await db.upsertMany("invitation", invitations);
  await db.upsertMany(
    "invitationAcceptance",
    invitations.map(({ id }) => ({
      invitationId: id,
      userId,
      status: "accepted",
    })),
  );
  const pages = await Promise.all(
    [0, 100].map(
      async (offset) =>
        (await db.executeQuery("GetCircleRetentionPage", { circleId, offset }))
          .data,
    ),
  );
  assert.deepEqual(
    pages.map((page) => page.receipts.length),
    [100, 2],
  );
  assert.deepEqual(
    pages.map((page) => page.invitations.length),
    [100, 2],
  );
  assert.equal(
    new Set(pages.flatMap((page) => page.receipts.map((row) => row.id))).size,
    102,
  );

  const deleted = [];
  let failLaterPage = true;
  const repo = await loadTypescriptModule("server/repositories/retention.ts", {
    "server-only": {},
    "node:crypto": { randomUUID },
    "@/lib/logger": { logger: { info() {}, error() {} } },
    "@/server/retention/rules": rules,
    "@/server/firebase/data-connect": {
      getBondCircleDataConnect: () => ({
        executeQuery: (operation, variables) => {
          if (
            failLaterPage &&
            operation === "GetCircleRetentionPage" &&
            variables.offset === 100
          )
            throw new Error("Synthetic later-page outage");
          return db.executeQuery(operation, variables);
        },
        executeMutation: (operation, variables) =>
          db.executeMutation(operation, variables),
      }),
    },
    "@/server/firebase/admin": {
      getFirebaseAdminStorage: () => ({
        bucket: () => ({
          file: (path) => ({
            delete: async ({ ignoreNotFound }) => {
              assert.equal(ignoreNotFound, true);
              deleted.push(path);
            },
            exists: async () => [false],
          }),
        }),
      }),
    },
  });
  assert.equal(
    (await repo.purgeEligibleCircle(circleId, now)).status,
    "failed",
  );
  assert.equal(deleted.length, 0);
  const failedState = (
    await db.executeQuery("GetCircleRetentionState", { circleId })
  ).data;
  assert.equal(failedState.circle.status, "archived");
  assert.equal(failedState.circle.purgeAt, null);
  assert.equal(failedState.retentionPurgeAttempts[0].status, "failed");
  assert.equal(
    (await db.executeQuery("GetCircleRetentionPage", { circleId, offset: 100 }))
      .data.receipts.length,
    2,
  );

  failLaterPage = false;
  const result = await repo.purgeEligibleCircle(
    circleId,
    new Date(now.getTime() + 7 * 3600000),
  );
  assert.equal(result.status, "completed");
  assert.equal(result.deletedFileCount, 102);
  assert.equal(new Set(deleted).size, 102);
  assert.ok(deleted.includes(receipts[100].imageStoragePath));
  const purgedState = (
    await db.executeQuery("GetCircleRetentionState", { circleId })
  ).data;
  assert.equal(purgedState.circle.status, "purged");
  assert.ok(purgedState.circle.purgeAt);
  assert.equal(purgedState.retentionPurgeAttempts[0].status, "completed");
  const after = (
    await db.executeQuery("GetCircleRetentionPage", { circleId, offset: 0 })
  ).data;
  assert.equal(after.receipts.length, 0);
  assert.equal(after.invitations.length, 0);
  assert.equal(after.circleMemberships.length, 0);
  for (const invitation of invitations) {
    const acceptance = await db.executeQuery("GetInvitationAcceptances", {
      invitationId: invitation.id,
    });
    assert.equal(acceptance.data.invitationAcceptances.length, 0);
  }
});

test("external-reference query cannot hide another circle behind two same-circle receipts", async () => {
  const userId = `retention-shared-${randomUUID()}`;
  const circleId = randomUUID();
  const otherCircleId = randomUUID();
  const path = `receipts/${circleId}/${userId}/shared.png`;
  await db.upsert("user", {
    id: userId,
    displayName: "Synthetic shared-path user",
  });
  await db.upsertMany(
    "circle",
    [circleId, otherCircleId].map((id) => ({
      id,
      creatorId: userId,
      name: "Synthetic shared-path circle",
      type: "gift",
      targetAmount: 1000,
    })),
  );
  await db.upsertMany(
    "receipt",
    [circleId, circleId, otherCircleId].map((id) => ({
      id: randomUUID(),
      circleId: id,
      uploadedById: userId,
      amount: 100,
      imageUrl: "https://example.test/private-receipt",
      imageStoragePath: path,
      contentType: "image/png",
    })),
  );
  const refs = (
    await db.executeQuery("GetRetentionExternalStorageReferences", {
      circleId,
      path,
    })
  ).data;
  assert.equal(refs.receipts.length, 1);
  assert.equal(refs.receipts[0].circle.id, otherCircleId);
});
