import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, root), "utf8");
}

test("all circle creation forms retain an iOS-safe mobile frame", async () => {
  const css = await source("app/dashboard.css");
  assert.match(
    css,
    /\.bc-gift-create input,[\s\S]*\.bc-gift-create select[\s\S]*font-size:\s*1rem/,
  );
  assert.match(css, /\.bc-tier-modal > section[\s\S]*max-width:/);
  assert.match(
    css,
    /@media \(max-width: 30rem\)[\s\S]*\.bc-tier-modal footer[\s\S]*grid-template-columns:\s*1fr/,
  );
  const asoOverride = css.lastIndexOf(".bc-aso-create input");
  const finalMobileGuard = css.lastIndexOf(".bc-circle-create-mobile-controls");
  assert.ok(
    finalMobileGuard > asoOverride,
    "the final iOS font-size guard must follow every circle-specific override",
  );
  assert.match(css.slice(finalMobileGuard), /font-size:\s*16px\s*!important/);
});

test("gift, Aso-Ebi and support creation accept secure invitations for non-members", async () => {
  const helper = await source("server/circles/initial-invitations.ts");
  assert.match(helper, /findUserByEmail/);
  assert.match(helper, /createCircleInvitation/);
  assert.match(helper, /emitNewInvitation/);
  assert.match(helper, /markInvitationSent/);

  for (const route of [
    "app/api/circles/gift/route.ts",
    "app/api/circles/aso-ebi/route.ts",
    "app/api/circles/support/route.ts",
  ]) {
    const contents = await source(route);
    assert.match(contents, /resolveInitialInvitees/);
    assert.match(contents, /sendInitialInvitations/);
    assert.doesNotMatch(contents, /does not have a BondCircle account yet/);
  }
});

test("invitation sharing carries context and new users register before joining", async () => {
  const rules = await source("server/invitations/rules.ts");
  const route = await source("app/api/circles/[circleId]/invitations/route.ts");
  const manager = await source("components/invitations/InvitationManager.tsx");
  const invitePage = await source("app/invite/[token]/page.tsx");

  assert.match(rules, /buildInvitationShareMessage/);
  assert.match(route, /shareMessage/);
  assert.match(manager, /generated\.shareMessage/);
  assert.match(manager, /Copy message/);
  assert.doesNotMatch(manager, /href=\{`sms:/);
  assert.match(invitePage, /redirect\(`\/register\?next=/);
});

test("every circle creation flow pauses on a secure copy and native-share step", async () => {
  const helper = await source("server/circles/initial-invitations.ts");
  const success = await source(
    "components/invitations/CircleCreationSuccess.tsx",
  );

  assert.match(helper, /createInitialShareInvitation/);
  assert.match(helper, /mode:\s*"open"/);
  assert.match(helper, /maxUses/);
  assert.match(helper, /shareStatus:\s*"unavailable"/);
  assert.match(success, /navigator\.clipboard\.writeText\(share\.link\)/);
  assert.match(
    success,
    /navigator\.clipboard\.writeText\(share\.shareMessage\)/,
  );
  assert.match(success, /navigator\.share/);
  assert.match(success, /Open circle/);

  for (const route of [
    "app/api/circles/gift/route.ts",
    "app/api/circles/aso-ebi/route.ts",
    "app/api/circles/support/route.ts",
  ]) {
    const contents = await source(route);
    assert.match(contents, /createInitialShareInvitation/);
    assert.match(contents, /share/);
  }

  for (const form of [
    "components/gift-circles/GiftCircleForm.tsx",
    "components/aso-ebi/AsoEbiCircleForm.tsx",
    "components/support-circles/SupportCircleForm.tsx",
  ]) {
    const contents = await source(form);
    assert.match(contents, /CircleCreationSuccess/);
    assert.match(contents, /data\.share/);
  }
});
