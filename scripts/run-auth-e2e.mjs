import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { createConnection } from "node:net";

const root = resolve(import.meta.dirname, "..");
const portableRoot = join(root, ".tools", "temurin-jre21");
const env = { ...process.env };
env.XDG_CONFIG_HOME = join(root, ".firebase-config");

if (!env.JAVA_HOME && existsSync(portableRoot)) {
  const distribution = readdirSync(portableRoot, { withFileTypes: true }).find(
    (entry) => entry.isDirectory(),
  );
  if (distribution) {
    env.JAVA_HOME = join(portableRoot, distribution.name);
    env.PATH = `${join(env.JAVA_HOME, "bin")};${env.PATH ?? ""}`;
  }
}

const firebaseCli = join(
  root,
  "node_modules",
  "firebase-tools",
  "lib",
  "bin",
  "firebase.js",
);
const testCommand = `"${process.execPath}" --test tests/e2e/authentication.test.mjs`;

function portIsOpen(port) {
  return new Promise((resolvePort) => {
    const socket = createConnection({ host: "127.0.0.1", port });
    socket.once("connect", () => {
      socket.destroy();
      resolvePort(true);
    });
    socket.once("error", () => resolvePort(false));
  });
}

env.FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9099";
env.DATA_CONNECT_EMULATOR_HOST = "127.0.0.1:9399";
env.NEXT_PUBLIC_USE_FIREBASE_EMULATORS = "true";

const missingEmulators = [];
if (!(await portIsOpen(9099))) missingEmulators.push("auth");
if (!(await portIsOpen(9399))) missingEmulators.push("dataconnect");

let child;
if (missingEmulators.length === 0) {
  child = spawn(
    process.execPath,
    ["--test", "tests/e2e/authentication.test.mjs"],
    { cwd: root, env, stdio: "inherit", windowsHide: true },
  );
} else {
  child = spawn(
    process.execPath,
    [
      firebaseCli,
      "emulators:exec",
      "--only",
      missingEmulators.join(","),
      "--project",
      "bond-circle",
      testCommand,
    ],
    { cwd: root, env, stdio: "inherit", windowsHide: true },
  );
}

child.on("exit", (code) => process.exit(code ?? 1));
