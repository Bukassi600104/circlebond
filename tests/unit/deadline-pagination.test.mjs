import assert from "node:assert/strict";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

test("scheduled deadlines process every page beyond the first 200 circles", async () => {
  const offsets = [];
  const processed = [];
  const candidates = Array.from({ length: 501 }, (_, i) => ({
    id: `circle-${i}`,
    deadline: "2026-10-31",
  }));
  const repo = await loadTypescriptModule(
    "server/repositories/notifications.ts",
    {
      "server-only": {},
      "node:crypto": {},
      "@/lib/logger": {},
      "@/server/notifications/email": {},
      "@/lib/circle-pricing": {},
      "@/server/pricing": {},
      "@/server/notifications/rules": {},
      "@/server/firebase/data-connect": {
        getBondCircleDataConnect: () => ({
          executeQuery: async (operation, input) => {
            if (operation === "GetDeadlineNotificationCandidates") {
              assert.equal(input.from, "2026-10-30");
              assert.equal(input.to, "2026-11-02");
              offsets.push(input.offset);
              return {
                data: {
                  circles: candidates.slice(input.offset, input.offset + 200),
                },
              };
            }
            assert.equal(operation, "GetNotificationContext");
            processed.push(input.circleId);
            return {
              data: {
                circle: { id: input.circleId, creator: { id: "creator" } },
                circleMemberships: [],
              },
            };
          },
        }),
      },
    },
  );
  assert.equal(
    (await repo.processDeadlineNotifications(new Date("2026-10-30T08:00:00Z")))
      .processed,
    501,
  );
  assert.deepEqual(offsets, [0, 200, 400]);
  assert.equal(new Set(processed).size, 501);
  assert.equal(processed.at(-1), "circle-500");
});
