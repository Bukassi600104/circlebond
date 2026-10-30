import assert from "node:assert/strict";
import { createHash, randomUUID } from "node:crypto";
import { readFile } from "node:fs/promises";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";
import { getApps, initializeApp } from "firebase-admin/app";
import { getDataConnect } from "firebase-admin/data-connect";

assert.match(
  process.env.DATA_CONNECT_EMULATOR_HOST ?? "",
  /^127\.0\.0\.1:\d+$/,
  "Privacy E2E must run only against an explicit loopback Data Connect emulator.",
);
const app =
  getApps().find((candidate) => candidate.name === "account-privacy-e2e") ??
  initializeApp({ projectId: "bond-circle" }, "account-privacy-e2e");
const dataConnect = getDataConnect(
  {
    location: "europe-west2",
    serviceId: "bondcircle-service",
    connector: "bondcircle",
  },
  app,
);

const source = await readFile(
  new URL("../../server/repositories/account-privacy.ts", import.meta.url),
  "utf8",
);
const exports = {};
runInNewContext(
  ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText,
  {
    exports,
    Buffer,
    Error,
    require: (id) => {
      if (id === "server-only") return {};
      assert.equal(id, "@/server/firebase/data-connect");
      return { getBondCircleDataConnect: () => dataConnect };
    },
  },
);

test("persisted account export is self-scoped and privacy intake preserves shared records", async () => {
  const userId = `privacy-self-${randomUUID()}`;
  const otherId = `privacy-other-${randomUUID()}`;
  const operatorId = `privacy-owner-${randomUUID()}`;
  const acceptedAt = new Date().toISOString();
  for (const id of [userId, otherId, operatorId]) {
    await dataConnect.upsert("user", {
      id,
      displayName: "Privacy Test Member",
      email: `${id}@example.test`,
      termsAcceptedAt: acceptedAt,
      privacyAcceptedAt: acceptedAt,
    });
  }
  await dataConnect.upsert("ownerAdministrator", {
    userId: operatorId,
    role: "owner",
    status: "active",
  });
  const token = `privacy-test-token-${randomUUID()}`;
  await dataConnect.executeMutation("RegisterDeviceRegistration", {
    tokenId: createHash("sha256").update(token).digest("hex"),
    userId,
    token,
    platform: "android",
    updatedAt: new Date().toISOString(),
  });
  const circleId = randomUUID();
  await dataConnect.upsert("circle", {
    id: circleId,
    creatorId: userId,
    name: "Privacy export test circle",
    type: "gift",
    targetAmount: 10000,
    status: "active",
  });
  for (const id of [userId, otherId]) {
    await dataConnect.upsert("circleMembership", {
      circleId,
      userId: id,
      role: id === userId ? "creator" : "member",
    });
    await dataConnect.upsert("receipt", {
      id: randomUUID(),
      circleId,
      uploadedById: id,
      amount: 1000,
      note: id === userId ? "Own receipt note" : "Other member private receipt",
      imageUrl: "private",
      imageStoragePath: `receipts/${id}/private-image.jpg`,
      contentType: "image/jpeg",
    });
    await dataConnect.upsert("comment", {
      id: randomUUID(),
      circleId,
      authorId: id,
      body:
        id === userId ? "Own authored comment" : "Other member private comment",
    });
  }
  const exported = await exports.exportAccountData(userId);
  assert.equal(exported.profile.id, userId);
  assert.equal(exported.memberships.length, 1);
  assert.equal(exported.receipts.length, 1);
  assert.equal(exported.comments.length, 1);
  assert.doesNotMatch(
    JSON.stringify(exported),
    /Other member private|imageStoragePath|private-image\.jpg/,
  );
  assert.equal(JSON.stringify(exported).includes(token), false);

  const attempts = await Promise.all([
    exports.createPrivacyRequest(userId, "deletion"),
    exports.createPrivacyRequest(userId, "deletion"),
  ]);
  assert.equal(attempts[0].id, attempts[1].id);
  assert.equal((await exports.loadPrivacyRequests(userId)).length, 1);
  assert.equal((await exports.loadPrivacyRequests(otherId)).length, 0);
  await exports.acknowledgePrivacyRequest(attempts[0].id, operatorId);
  const queue = await exports.loadOwnerPrivacyRequests(0);
  assert.equal(
    queue.find((request) => request.id === attempts[0].id)?.status,
    "processing",
  );
  const overview = await dataConnect.executeQuery("GetOwnerPlatformOverview");
  const audit = overview.data.recentAdminActions.find(
    (event) => event.targetId === attempts[0].id,
  );
  assert.equal(audit.action, "privacy_request_acknowledged");
  assert.equal(audit.outcome, "succeeded");
  assert.equal(audit.purpose, "legal");
  assert.equal(audit.actor.id, operatorId);
  await assert.rejects(
    exports.acknowledgePrivacyRequest(`${randomUUID()}:deletion`, operatorId),
  );

  const afterRequest = await exports.exportAccountData(userId);
  assert.equal(afterRequest.profile.accountStatus, "active");
  assert.equal(afterRequest.memberships.length, 1);
  assert.equal(afterRequest.receipts.length, 1);
  const registrations = await dataConnect.executeQuery(
    "GetUserDeviceRegistrations",
    { userId },
  );
  assert.equal(
    registrations.data.deviceRegistrations.length,
    1,
    "Deletion intake must not claim to perform token removal or account erasure.",
  );
});
