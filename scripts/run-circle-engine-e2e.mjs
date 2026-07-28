import { existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import { createConnection } from "node:net";

const root = resolve(import.meta.dirname, "..");
const portableRoot = join(root, ".tools", "temurin-jre21");
const env = { ...process.env };
env.XDG_CONFIG_HOME = join(root, ".firebase-config");
env.DATA_CONNECT_EMULATOR_HOST = "127.0.0.1:9399";

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
const testCommand = `"${process.execPath}" --test tests/e2e/circle-engine.test.mjs`;

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

const child = (await portIsOpen(9399))
  ? spawn(process.execPath, ["--test", "tests/e2e/circle-engine.test.mjs"], {
      cwd: root,
      env,
      stdio: "inherit",
      windowsHide: true,
    })
  : spawn(
      process.execPath,
      [
        firebaseCli,
        "emulators:exec",
        "--only",
        "dataconnect",
        "--project",
        "bond-circle",
        testCommand,
      ],
      { cwd: root, env, stdio: "inherit", windowsHide: true },
    );

child.on("exit", (code) => process.exit(code ?? 1));
