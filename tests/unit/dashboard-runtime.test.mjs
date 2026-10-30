import assert from "node:assert/strict";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

const membership = (userId, index) => ({
  user: { id: userId },
  role: "member",
  membershipStatus: "joined",
  circle: {
    id: `${userId}-${index}`,
    name: "Circle",
    type: "support",
    targetAmount: 1000,
    contributedAmount: 500,
    showTargetToMembers: false,
    showConfirmedTotalToMembers: false,
    memberCount: 175,
    memberLimit: 200,
    status: "active",
    createdAt: "2026-10-30",
    creator: { id: "organizer" },
  },
});

for (const ownCount of [1, 201]) {
  test(`dashboard scopes before the global100 window and loads all ${ownCount} personal memberships`, async () => {
    const rows = [
      ...Array.from({ length: 301 }, (_, i) => membership("other", i)),
      ...Array.from({ length: ownCount }, (_, i) => membership("self", i)),
    ];
    const offsets = [];
    const repo = await loadTypescriptModule(
      "server/repositories/dashboard.ts",
      {
        "server-only": {},
        "@/lib/logger": { logger: { error() {} } },
        "@/server/firebase/data-connect": {
          getBondCircleDataConnect: () => ({
            executeQuery: async (operation, variables) => {
              assert.equal(operation, "GetDashboardCirclesForUser");
              assert.equal(variables.userId, "self");
              offsets.push(variables.offset);
              return {
                data: {
                  circleMemberships: rows
                    .filter((row) => row.user.id === variables.userId)
                    .slice(variables.offset, variables.offset + 200),
                },
              };
            },
          }),
        },
      },
    );
    const result = await repo.loadDashboardCircles("self");
    assert.equal(result.length, ownCount);
    assert.equal(result.at(-1).id, `self-${ownCount - 1}`);
    assert.equal(result[0].memberCount, 175);
    assert.equal(result[0].targetAmount, null);
    assert.equal(result[0].contributedAmount, null);
    assert.equal(result[0].progress, null);
    assert.deepEqual(offsets, ownCount === 1 ? [0] : [0, 200]);
  });
}

test("a later dashboard page failure cannot return a misleading partial list", async () => {
  const repo = await loadTypescriptModule("server/repositories/dashboard.ts", {
    "server-only": {},
    "@/lib/logger": { logger: { error() {} } },
    "@/server/firebase/data-connect": {
      getBondCircleDataConnect: () => ({
        executeQuery: async (_, variables) => {
          if (variables.offset) throw new Error("database unavailable");
          return {
            data: {
              circleMemberships: Array.from({ length: 200 }, (_, i) =>
                membership("self", i),
              ),
            },
          };
        },
      }),
    },
  });
  await assert.rejects(
    repo.loadDashboardCircles("self"),
    (error) => error.name === "DashboardDataError",
  );
});
