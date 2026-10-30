import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";
import { getApps, initializeApp } from "firebase-admin/app";
import { getDataConnect } from "firebase-admin/data-connect";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

assert.ok(
  /^(127\.0\.0\.1|localhost|\[::1\]):\d+$/.test(
    process.env.DATA_CONNECT_EMULATOR_HOST ?? "",
  ),
  "Dashboard database acceptance requires an explicit loopback emulator.",
);
const app =
  getApps().find((app) => app.name === "dashboard-e2e") ??
  initializeApp({ projectId: "bond-circle" }, "dashboard-e2e");
const db = getDataConnect(
  {
    location: "europe-west2",
    serviceId: "bondcircle-service",
    connector: "bondcircle",
  },
  app,
);

test("actual dashboard query scopes before limiting and retrieves more than200 personal circles", async () => {
  const self = `dashboard-self-${randomUUID()}`;
  const other = `dashboard-other-${randomUUID()}`;
  await db.upsertMany(
    "user",
    [self, other].map((id) => ({
      id,
      displayName: "Synthetic dashboard user",
    })),
  );
  const rows = Array.from({ length: 302 }, (_, i) => ({
    id: randomUUID(),
    creatorId: i < 201 ? self : other,
    name: "Synthetic dashboard circle",
    type: "gift",
    targetAmount: 1000,
    memberCount: 75,
    status: "active",
  }));
  await db.upsertMany("circle", rows);
  await db.upsertMany(
    "circleMembership",
    rows.map((row, i) => ({
      circleId: row.id,
      userId: row.creatorId,
      role: "creator",
      membershipStatus: "joined",
      joinedAt: new Date(Date.UTC(2098, 0, 1) + i * 1000).toISOString(),
    })),
  );
  const repo = await loadTypescriptModule("server/repositories/dashboard.ts", {
    "server-only": {},
    "@/lib/logger": { logger: { error() {} } },
    "@/server/firebase/data-connect": { getBondCircleDataConnect: () => db },
  });
  const result = await repo.loadDashboardCircles(self);
  assert.equal(result.length, 201);
  assert.equal(new Set(result.map((row) => row.id)).size, 201);
  assert.ok(result.some((row) => row.id === rows[0].id));
  assert.ok(
    result.every((row) => row.createdByCurrentUser && row.memberCount === 75),
  );
  assert.equal(
    result.some((row) => rows.slice(201).some((other) => other.id === row.id)),
    false,
  );
});
