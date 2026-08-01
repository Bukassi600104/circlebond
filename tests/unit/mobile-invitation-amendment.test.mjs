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

test("gift, Aso-Ebi and support creation do not process invitations", async () => {
  for (const route of [
    "app/api/circles/gift/route.ts",
    "app/api/circles/aso-ebi/route.ts",
    "app/api/circles/support/route.ts",
  ]) {
    const contents = await source(route);
    assert.doesNotMatch(contents, /resolveInitialInvitees/);
    assert.doesNotMatch(contents, /sendInitialInvitations/);
    assert.doesNotMatch(contents, /createInitialShareInvitation/);
    assert.doesNotMatch(contents, /form,\s*"invites"/);
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

test("every creation form opens its circle before invitations are offered", async () => {
  for (const form of [
    "components/gift-circles/GiftCircleForm.tsx",
    "components/aso-ebi/AsoEbiCircleForm.tsx",
    "components/support-circles/SupportCircleForm.tsx",
  ]) {
    const contents = await source(form);
    assert.match(
      contents,
      /router\.push\(`\/account\/circles\/\$\{data\.circleId\}`\)/,
    );
    assert.doesNotMatch(contents, /CircleCreationSuccess/);
    assert.doesNotMatch(contents, /Invite members|Invite supporters/);
    assert.doesNotMatch(contents, /form\.set\(\s*"invites"/);
  }
});

test("all circle pages own secure email, link, WhatsApp and native sharing", async () => {
  const manager = await source("components/invitations/InvitationManager.tsx");
  assert.match(manager, /mode === "open"/);
  assert.match(manager, /Copy message/);
  assert.match(manager, /navigator\.share/);
  assert.match(manager, /https:\/\/wa\.me/);
  assert.match(manager, /mailto:/);

  for (const view of [
    "components/gift-circles/GiftCircleView.tsx",
    "components/aso-ebi/AsoEbiCircleView.tsx",
    "components/support-circles/SupportCircleView.tsx",
  ]) {
    assert.match(await source(view), /<InvitationManager/);
  }
});

test("optional circle images cannot block creation when the bucket is absent", async () => {
  const helper = await source("server/uploads/circle-images.ts");
  assert.match(helper, /bucket\.exists\(\)/);
  assert.match(helper, /specified bucket does not exist/i);

  for (const route of [
    "app/api/circles/gift/route.ts",
    "app/api/circles/aso-ebi/route.ts",
    "app/api/circles/support/route.ts",
  ]) {
    const contents = await source(route);
    assert.match(contents, /circleImageStorageAvailable/);
    assert.match(contents, /CIRCLE_IMAGE_STORAGE_WARNING/);
  }

  for (const form of [
    "components/gift-circles/GiftCircleForm.tsx",
    "components/aso-ebi/AsoEbiCircleForm.tsx",
    "components/support-circles/SupportCircleForm.tsx",
  ]) {
    const contents = await source(form);
    assert.match(contents, /image \(optional\)/i);
  }
});
