import { spawn } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { createConnection } from "node:net";
import { join, resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const env = { ...process.env };
const portableRoot = join(root, ".tools", "temurin-jre21");

if (!env.JAVA_HOME && existsSync(portableRoot)) {
  const distribution = readdirSync(portableRoot, {
    withFileTypes: true,
  }).find((entry) => entry.isDirectory());
  if (distribution) {
    env.JAVA_HOME = join(portableRoot, distribution.name);
    env.PATH = `${join(env.JAVA_HOME, "bin")};${env.PATH ?? ""}`;
  }
}

env.XDG_CONFIG_HOME = join(root, ".firebase-config");
env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
env.DATA_CONNECT_EMULATOR_HOST = "127.0.0.1:9399";
env.STORAGE_EMULATOR_HOST = "http://127.0.0.1:9199";
env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS = "true";
env.AUTH_EMAIL_OTP_MODE = "development";

function portIsOpen(port) {
  return new Promise((resolvePort) => {
    const socket = createConnection({ host: "127.0.0.1", port });
    socket.once("connect", () => {
      socket.destroy();
      resolvePort(true);
    });
    socket.once("error", () => resolvePort(false));
    socket.setTimeout(750, () => {
      socket.destroy();
      resolvePort(false);
    });
  });
}

export async function waitForPort(port, timeoutMs = 120_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    if (await portIsOpen(port)) return;
    await new Promise((resolveWait) => setTimeout(resolveWait, 500));
  }
  throw new Error(`Development service on port ${port} did not start.`);
}

const children = new Set();
let closing = false;

function stopChildren(exitCode = 0) {
  if (closing) return;
  closing = true;
  for (const child of children) {
    if (!child.killed) child.kill("SIGINT");
  }
  setTimeout(() => process.exit(exitCode), 500).unref();
}

process.once("SIGINT", () => stopChildren(0));
process.once("SIGTERM", () => stopChildren(0));

const missingEmulators = [];
if (!(await portIsOpen(9099))) missingEmulators.push("auth");
if (!(await portIsOpen(9399))) missingEmulators.push("dataconnect");
if (!(await portIsOpen(9199))) missingEmulators.push("storage");

let emulator;
if (missingEmulators.length > 0) {
  const firebaseCli = join(
    root,
    "node_modules",
    "firebase-tools",
    "lib",
    "bin",
    "firebase.js",
  );
  emulator = spawn(
    process.execPath,
    [
      firebaseCli,
      "emulators:start",
      "--only",
      missingEmulators.join(","),
      "--project",
      "bond-circle",
    ],
    { cwd: root, env, stdio: "inherit", windowsHide: true },
  );
  children.add(emulator);
  emulator.once("exit", (code) => {
    children.delete(emulator);
    if (!closing) stopChildren(code ?? 1);
  });
}

await waitForPort(9099);
await waitForPort(9399);
await waitForPort(9199);

const nextCli = join(root, "node_modules", "next", "dist", "bin", "next");
const nextArgs =
  process.argv.length > 2
    ? process.argv.slice(2)
    : ["--hostname", "127.0.0.1", "--port", "3000"];
const next = spawn(process.execPath, [nextCli, "dev", ...nextArgs], {
  cwd: root,
  env,
  stdio: "inherit",
  windowsHide: true,
});
children.add(next);
next.once("exit", (code) => {
  children.delete(next);
  stopChildren(code ?? 0);
});
