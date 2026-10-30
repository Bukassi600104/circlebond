import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import test from "node:test";
import { startDnsSink, E2E_EMAIL_DOMAIN } from "../helpers/dns-sink.mjs";

function child(preload, code, env) {
  return new Promise((resolve) => {
    execFile(
      process.execPath,
      ["--import", preload, "--input-type=module", "-e", code],
      { env: { ...process.env, ...env }, windowsHide: true },
      (error, stdout, stderr) =>
        resolve({ exitCode: error?.code ?? 0, stdout, stderr }),
    );
  });
}

test("actual child DNS resolves only the reserved fixture domain", async () => {
  const dns = await startDnsSink();
  try {
    const result = await child(
      dns.preload,
      [
        'import assert from "node:assert/strict";',
        'import { resolveMx } from "node:dns/promises";',
        "const records = await resolveMx(" +
          JSON.stringify(E2E_EMAIL_DOMAIN) +
          ");",
        "assert.equal(records.length, 1);",
        "assert.equal(records[0].priority, 10);",
        'assert.equal(records[0].exchange, "mail.bondcircle-e2e.test");',
        'await assert.rejects(resolveMx("outside.invalid"), error => error.code === "ENOTFOUND");',
      ].join("\n"),
      {
        FIREBASE_AUTH_EMULATOR_HOST: "127.0.0.1:9099",
        DATA_CONNECT_EMULATOR_HOST: "127.0.0.1:9399",
      },
    );
    assert.equal(result.exitCode, 0, result.stderr);
    assert.ok(
      dns.queries.some(
        ({ name, type }) => name === E2E_EMAIL_DOMAIN && type === 15,
      ),
    );
    assert.ok(dns.queries.some(({ name }) => name === "outside.invalid"));
  } finally {
    await dns.close();
  }
});

test("test DNS preload fails closed outside explicit local Auth and Data Connect", async () => {
  const dns = await startDnsSink();
  try {
    for (const env of [
      {
        FIREBASE_AUTH_EMULATOR_HOST: "",
        DATA_CONNECT_EMULATOR_HOST: "127.0.0.1:9399",
      },
      {
        FIREBASE_AUTH_EMULATOR_HOST: "remote.invalid:9099",
        DATA_CONNECT_EMULATOR_HOST: "127.0.0.1:9399",
      },
      {
        FIREBASE_AUTH_EMULATOR_HOST: "127.0.0.1:9099",
        DATA_CONNECT_EMULATOR_HOST: "remote.invalid:9399",
      },
    ]) {
      const result = await child(
        dns.preload,
        'throw new Error("Preload should have refused first");',
        env,
      );
      assert.notEqual(result.exitCode, 0);
      assert.match(
        result.stderr,
        /Test DNS requires explicit loopback Firebase emulators/,
      );
    }
    assert.equal(dns.queries.length, 0);
  } finally {
    await dns.close();
  }
});
