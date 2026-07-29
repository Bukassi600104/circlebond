import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  ADMIN_PURPOSES,
  OPERATIONAL_REPORTS,
  SUSPENSION_REASONS,
  assertAdminPurpose,
  assertOperationalReport,
  assertSuspensionReason,
  csvCell,
} from "../../server/owner/rules.ts";

test("Milestone 14 restricts administrative purposes, actions and exports", () => {
  assert.deepEqual(ADMIN_PURPOSES, ["support", "fraud", "security", "legal"]);
  assert.deepEqual(SUSPENSION_REASONS, [
    "abuse",
    "fraud_risk",
    "security_compromise",
    "legal_requirement",
  ]);
  assert.deepEqual(OPERATIONAL_REPORTS, [
    "platform_summary",
    "abuse_operations",
    "retention_operations",
  ]);
  assert.doesNotThrow(() => assertAdminPurpose("security"));
  assert.doesNotThrow(() => assertSuspensionReason("abuse"));
  assert.doesNotThrow(() => assertOperationalReport("platform_summary"));
  assert.throws(() => assertAdminPurpose("curiosity"), /approved/i);
  assert.throws(() => assertSuspensionReason("annoying"), /valid/i);
  assert.throws(() => assertOperationalReport("private_receipts"), /approved/i);
});

test("operational CSV cells cannot execute spreadsheet formulas", () => {
  assert.equal(csvCell('=HYPERLINK("bad")'), '"\'=HYPERLINK(""bad"")"');
  assert.equal(csvCell("+cmd"), '"\'+cmd"');
  assert.equal(csvCell("safe"), '"safe"');
});

test("owner administration has separate access and no public registration", async () => {
  const auth = await readFile("server/owner/auth.ts", "utf8");
  const layout = await readFile("app/owner/layout.tsx", "utf8");
  const page = await readFile("app/owner/page.tsx", "utf8");
  const provisioning = await readFile("scripts/provision-owner.mjs", "utf8");

  assert.match(auth, /getOwnerAdministrator/);
  assert.match(auth, /sign-in\?next=%2Fowner/);
  assert.match(layout, /requireOwnerSession/);
  assert.match(page, /loadOwnerOverview/);
  assert.match(page, /robots:\s*{[\s\S]*index:\s*false/);
  assert.match(provisioning, /emailVerified/);
  assert.match(provisioning, /ProvisionOwnerAccount/);
  assert.match(provisioning, /displayName/);
  assert.doesNotMatch(provisioning, /process\.env\.OWNER_EMAIL/);
});

test("every owner mutation is CSRF-protected, owner-authorized and audited", async () => {
  const actionRoute = await readFile("app/api/owner/actions/route.ts", "utf8");
  const searchRoute = await readFile(
    "app/api/owner/user-search/route.ts",
    "utf8",
  );
  const exportRoute = await readFile("app/api/owner/export/route.ts", "utf8");

  for (const route of [actionRoute, searchRoute, exportRoute]) {
    assert.match(route, /assertTrustedMutation/);
    assert.match(route, /readOwnerSession/);
    assert.match(route, /recordOwnerAudit/);
  }
  assert.match(actionRoute, /revealReportedComment/);
  assert.match(actionRoute, /suspendOwnerTarget/);
  assert.match(actionRoute, /revokeCompromisedInvite/);
  assert.match(actionRoute, /outcome: "failed"/);
});

test("sensitive content is purpose-limited and excluded from overview and exports", async () => {
  const operations = await readFile(
    "dataconnect/bondcircle/queries.gql",
    "utf8",
  );
  const repository = await readFile("server/repositories/owner.ts", "utf8");
  const dashboard = await readFile(
    "components/owner/OwnerDashboard.tsx",
    "utf8",
  );

  const overview = operations.slice(
    operations.indexOf("query GetOwnerPlatformOverview"),
    operations.indexOf("query GetOwnerReportReview"),
  );
  const exportOperation = operations.slice(
    operations.indexOf("query GetOwnerOperationalExport"),
    operations.indexOf("mutation RecordOperationalEvent"),
  );
  assert.doesNotMatch(overview, /\n\s+body\n/);
  assert.doesNotMatch(overview, /imageStoragePath|paymentAccountNumber|token/);
  assert.doesNotMatch(
    exportOperation,
    /body|imageStoragePath|paymentAccountNumber|recipientEmail|token/,
  );
  assert.match(repository, /sensitive_comment_reviewed/);
  assert.match(repository, /purpose: input\.purpose/);
  assert.match(
    dashboard,
    /Comment text remains concealed until an approved-purpose/i,
  );
});

test("account suspension and compromised invite revocation enforce safeguards", async () => {
  const repository = await readFile("server/repositories/owner.ts", "utf8");
  const session = await readFile("server/auth/index.ts", "utf8");

  assert.match(repository, /cannot suspend itself/i);
  assert.match(repository, /owner administrator cannot be suspended/i);
  assert.match(repository, /updateUser\(input\.userId, { disabled: true }\)/);
  assert.match(repository, /revokeRefreshTokens/);
  assert.match(repository, /Only an active invitation can be revoked/);
  assert.match(repository, /RevokeCompromisedInvitation/);
  assert.match(session, /GetUserAccountStatus/);
  assert.match(session, /accountStatus !== "active"/);
});

test("safe operational upload telemetry is connected to all upload flows", async () => {
  const files = [
    "app/api/circles/[circleId]/receipts/route.ts",
    "app/api/circles/gift/route.ts",
    "app/api/circles/aso-ebi/route.ts",
    "app/api/circles/support/route.ts",
  ];
  for (const file of files) {
    const source = await readFile(file, "utf8");
    assert.match(source, /recordUploadOutcome/);
    assert.match(source, /outcome: "succeeded"/);
    assert.match(source, /outcome: "failed"/);
  }
  const telemetry = await readFile(
    "server/repositories/operational-events.ts",
    "utf8",
  );
  assert.doesNotMatch(
    telemetry,
    /email|displayName|imageStoragePath|paymentAccount/,
  );
  assert.match(telemetry, /operationalReasonCode/);
});
