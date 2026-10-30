import assert from "node:assert/strict";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

async function repository(executeQuery) {
  return loadTypescriptModule("server/repositories/notifications.ts", {
    "server-only": {},
    "node:crypto": {},
    "@/lib/logger": {},
    "@/server/notifications/email": {},
    "@/lib/circle-pricing": {},
    "@/server/pricing": {},
    "@/server/notifications/rules": {},
    "@/server/firebase/data-connect": {
      getBondCircleDataConnect: () => ({ executeQuery }),
    },
  });
}

for (const removeDuringRun of [false, true]) {
  test(`deadline cursor visits all pages with concurrent closure=${removeDuringRun}`, async () => {
    const cursors = [];
    const processed = [];
    const candidates = Array.from(
      { length: removeDuringRun ? 401 : 501 },
      (_, i) => ({
        id: `00000000-0000-0000-0000-${String(i).padStart(12, "0")}`,
        deadline: "2026-10-31",
      }),
    );
    let closed;
    const repo = await repository(async (operation, input) => {
      if (operation === "GetDeadlineNotificationCandidates") {
        assert.equal(input.from, "2026-10-30");
        assert.equal(input.to, "2026-11-02");
        assert.ok(input.after === null || typeof input.after === "string");
        cursors.push(input.after);
        return {
          data: {
            circles: candidates
              .filter(
                (row) =>
                  row.id !== closed &&
                  (input.after === null || row.id > input.after),
              )
              .slice(0, 200),
          },
        };
      }
      assert.equal(operation, "GetNotificationContext");
      processed.push(input.circleId);
      if (removeDuringRun) closed = candidates[0].id;
      return {
        data: {
          circle: { id: input.circleId, creator: { id: "creator" } },
          circleMemberships: [],
        },
      };
    });
    assert.equal(
      (
        await repo.processDeadlineNotifications(
          new Date("2026-10-30T08:00:00Z"),
        )
      ).processed,
      candidates.length,
    );
    assert.deepEqual(cursors, [null, candidates[199].id, candidates[399].id]);
    assert.equal(new Set(processed).size, candidates.length);
    assert.ok(processed.includes(candidates[200].id));
    assert.equal(processed.at(-1), candidates.at(-1).id);
  });
}

test("malformed native SQL candidate rows fail closed", async () => {
  const repo = await repository(async () => ({
    data: { circles: [{ id: 123, deadline: null }] },
  }));
  await assert.rejects(
    repo.processDeadlineNotifications(),
    /candidates are unavailable/,
  );
});
