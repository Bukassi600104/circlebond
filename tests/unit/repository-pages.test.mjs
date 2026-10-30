import assert from "node:assert/strict";
import test from "node:test";
import { loadTypescriptModule } from "../helpers/typescript-module.mjs";

const loader = (executeQuery) =>
  loadTypescriptModule("server/repositories/pages.ts", {
    "server-only": {},
    "@/server/firebase/data-connect": {
      getBondCircleDataConnect: () => ({ executeQuery }),
    },
  });

test("shared page reads retain scope and return every record beyond the connector default", async () => {
  const source = Array.from({ length: 401 }, (_, id) => ({ id }));
  const offsets = [];
  const { readAllRows } = await loader(async (operation, variables) => {
    assert.equal(operation, "ScopedPage");
    assert.equal(variables.circleId, "authorized-circle");
    offsets.push(variables.offset);
    return {
      data: { records: source.slice(variables.offset, variables.offset + 200) },
    };
  });
  const rows = await readAllRows(
    "ScopedPage",
    { circleId: "authorized-circle" },
    "records",
  );
  assert.equal(rows.length, 401);
  assert.equal(rows.at(-1).id, 400);
  assert.deepEqual(offsets, [0, 200, 400]);
});

test("missing fields and later page failures never yield a truncated success", async () => {
  for (const malformed of [true, false]) {
    const { readAllRows } = await loader(async (_, variables) => {
      if (malformed) return { data: {} };
      if (variables.offset) throw new Error("database unavailable");
      return {
        data: { records: Array.from({ length: 200 }, (_, id) => ({ id })) },
      };
    });
    await assert.rejects(readAllRows("ScopedPage", {}, "records"));
  }
});
