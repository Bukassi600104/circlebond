import assert from "node:assert/strict";
import { createServer } from "node:http";
import { createRequire } from "node:module";
import test from "node:test";
import { waitForLoopbackEmulator } from "../helpers/firebase-cli-readiness.mjs";

const require = createRequire(import.meta.url);
const {
  DataConnectEmulator,
} = require("firebase-tools/lib/emulator/dataconnectEmulator.js");

async function infoServer(handler) {
  const server = createServer(handler);
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return {
    port: server.address().port,
    url: "http://127.0.0.1:" + server.address().port + "/emulator/info",
    close: async () => {
      server.closeAllConnections();
      await new Promise((resolve) => server.close(resolve));
    },
  };
}

test("CLI waits for actual HTTP readiness then preserves its original configure call", async () => {
  let probes = 0;
  let ready = false;
  const server = await infoServer((request, response) => {
    assert.equal(request.url, "/emulator/info");
    ready = ++probes >= 3;
    response.writeHead(ready ? 200 : 503);
    response.end("{}");
  });
  const calls = [];
  try {
    const instance = {
      getInfo: () => ({ host: "127.0.0.1", port: server.port }),
      logger: { logLabeled() {} },
      emulatorClient: {
        configureEmulator: async (input) => {
          assert.equal(ready, true);
          calls.push(input);
        },
      },
    };
    const connection = new URL(
      "postgres://127.0.0.1:5432/synthetic?sslmode=disable",
    );
    assert.equal(
      await DataConnectEmulator.prototype.connectToPostgres.call(
        instance,
        connection,
        "synthetic",
        "synthetic-service",
      ),
      true,
    );
    assert.ok(probes >= 3);
    assert.deepEqual(calls, [
      {
        connectionString: connection.toString(),
        database: "synthetic",
        serviceId: "synthetic-service",
      },
    ]);
  } finally {
    await server.close();
  }
});

test("unready local HTTP endpoint fails at a bounded setup deadline", async () => {
  const server = await infoServer((request, response) => {
    response.writeHead(503);
    response.end("{}");
  });
  try {
    await assert.rejects(
      waitForLoopbackEmulator(server.url, { timeoutMs: 60, intervalMs: 5 }),
      /did not become HTTP-ready/,
    );
  } finally {
    await server.close();
  }
});

test("readiness refuses external, credential-bearing and redirected endpoints", async () => {
  for (const url of [
    "http://outside.invalid/emulator/info",
    "https://127.0.0.1:9399/emulator/info",
    "http://user:password@127.0.0.1:9399/emulator/info",
  ]) {
    await assert.rejects(waitForLoopbackEmulator(url), /explicit loopback/);
  }
  const server = await infoServer((request, response) => {
    response.writeHead(302, { location: "https://outside.invalid/" });
    response.end();
  });
  try {
    await assert.rejects(
      waitForLoopbackEmulator(server.url, { timeoutMs: 60, intervalMs: 5 }),
      /did not become HTTP-ready/,
    );
  } finally {
    await server.close();
  }
});
