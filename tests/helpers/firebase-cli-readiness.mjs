import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const {
  DataConnectEmulator,
} = require("firebase-tools/lib/emulator/dataconnectEmulator.js");

export async function waitForLoopbackEmulator(
  input,
  { timeoutMs = 60_000, intervalMs = 200 } = {},
) {
  const url = new URL(input);
  if (
    url.protocol !== "http:" ||
    !["127.0.0.1", "localhost", "[::1]"].includes(url.hostname) ||
    url.username ||
    url.password ||
    url.pathname !== "/emulator/info" ||
    url.search ||
    url.hash
  ) {
    throw new Error(
      "Test emulator readiness requires an explicit loopback info endpoint.",
    );
  }
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(url, {
        redirect: "error",
        signal: AbortSignal.timeout(
          Math.max(1, Math.min(2000, deadline - Date.now())),
        ),
      });
      await response.arrayBuffer();
      if (response.ok) return;
    } catch {
      // Native startup may not have opened its HTTP listener yet.
    }
    const remaining = deadline - Date.now();
    if (remaining > 0) {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.min(intervalMs, remaining)),
      );
    }
  }
  throw new Error(
    "Local SQL Connect emulator did not become HTTP-ready within the test setup deadline.",
  );
}

const configure = DataConnectEmulator.prototype.connectToPostgres;
if (typeof configure !== "function") {
  throw new Error(
    "The locked Firebase CLI readiness integration is unsupported.",
  );
}

// shortcut: remove this CLI-only guard when Firebase waits for native HTTP before configuring PostgreSQL.
DataConnectEmulator.prototype.connectToPostgres = async function (...args) {
  const { host, port } = this.getInfo();
  const hostname =
    host === "0.0.0.0"
      ? "127.0.0.1"
      : host === "::"
        ? "[::1]"
        : host.includes(":")
          ? "[" + host + "]"
          : host;
  await waitForLoopbackEmulator(
    "http://" + hostname + ":" + port + "/emulator/info",
  );
  return configure.apply(this, args);
};
