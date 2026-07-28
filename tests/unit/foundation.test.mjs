import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../", import.meta.url);

test("Firebase-only foundation contains no active Prisma dependencies", async () => {
  const packageJson = JSON.parse(
    await readFile(new URL("package.json", root), "utf8"),
  );
  const dependencies = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
  };

  assert.equal(dependencies.prisma, undefined);
  assert.equal(dependencies["@prisma/client"], undefined);
  assert.ok(dependencies.firebase);
  assert.ok(dependencies["firebase-admin"]);
  assert.ok(dependencies["firebase-tools"]);
});

test("Firebase secrets are ignored while deploy topology remains reproducible", async () => {
  const gitignore = await readFile(new URL(".gitignore", root), "utf8");
  const firebaseRc = await readFile(new URL(".firebaserc", root), "utf8");
  const dataConnectConfig = await readFile(
    new URL("dataconnect/dataconnect.yaml", root),
    "utf8",
  );

  assert.match(gitignore, /^service-account\*\.json$/m);
  assert.match(gitignore, /^\.env\*$/m);
  assert.doesNotMatch(gitignore, /^\.firebaserc$/m);
  assert.doesNotMatch(gitignore, /^dataconnect\/dataconnect\.yaml$/m);
  assert.match(firebaseRc, /"default": "bond-circle"/);
  assert.match(dataConnectConfig, /serviceId: "bondcircle-service"/);
});
