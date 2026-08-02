import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  GIFT_MEMBER_STATUSES,
  calculateEqualAllocations,
  calculateEqualSlotAllocations,
  pricingPlanForCapacity,
  validateCustomAllocations,
} from "../../server/circles/gift.ts";

const root = new URL("../../", import.meta.url);

test("equal split allocates the entire target without losing rounding units", () => {
  assert.deepEqual(calculateEqualAllocations(100, ["a", "b", "c"]), [
    { memberId: "a", expectedAmount: 34 },
    { memberId: "b", expectedAmount: 33 },
    { memberId: "c", expectedAmount: 33 },
  ]);
});

test("equal split uses planned circle capacity before every member joins", () => {
  assert.deepEqual(
    calculateEqualSlotAllocations(350, 10),
    [35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
  );
  assert.equal(pricingPlanForCapacity(3), "trial");
  assert.equal(pricingPlanForCapacity(10), "starter");
  assert.equal(pricingPlanForCapacity(30), "standard");
  assert.equal(pricingPlanForCapacity(100), "premium");
  assert.throws(() => pricingPlanForCapacity(101), /between 2 and 100/i);
});

test("custom contributions must exactly match the target", () => {
  const allocations = [
    { memberId: "creator", expectedAmount: 70000 },
    { memberId: "member", expectedAmount: 30000 },
  ];
  assert.deepEqual(validateCustomAllocations(100000, allocations), allocations);
  assert.throws(
    () => validateCustomAllocations(100001, allocations),
    /add up to the target/i,
  );
});

test("every approved Gift Circle member status is represented", () => {
  assert.deepEqual(GIFT_MEMBER_STATUSES, [
    "invited",
    "joined",
    "pledged",
    "receipt_submitted",
    "awaiting_confirmation",
    "part_paid",
    "paid",
    "declined",
    "removed",
  ]);
});

test("gift persistence and privacy boundaries are present", async () => {
  const schema = await readFile(
    new URL("dataconnect/schema/schema.gql", root),
    "utf8",
  );
  const operations = await readFile(
    new URL("dataconnect/bondcircle/queries.gql", root),
    "utf8",
  );
  const route = await readFile(
    new URL("app/api/circles/[circleId]/gift-image/route.ts", root),
    "utf8",
  );
  const view = await readFile(
    new URL("components/gift-circles/GiftCircleView.tsx", root),
    "utf8",
  );

  for (const field of [
    "giftTitle",
    "contributionMode",
    "expectedAmount",
    "pledgedAmount",
    "confirmedAmount",
    "receiptStoragePath",
  ]) {
    assert.match(schema, new RegExp(`${field}:`));
  }
  assert.match(operations, /query GetGiftCircleDetail/);
  assert.match(operations, /mutation ConfigureGiftCircle/);
  assert.match(route, /loadGiftCircle\(circleId, session\.uid\)/);
  assert.doesNotMatch(view, /receiptStoragePath/);
});

test("gift creation and overview expose capacity, open slots, and creator invites", async () => {
  const form = await readFile(
    new URL("components/gift-circles/GiftCircleForm.tsx", root),
    "utf8",
  );
  const route = await readFile(
    new URL("app/api/circles/gift/route.ts", root),
    "utf8",
  );
  const view = await readFile(
    new URL("components/gift-circles/GiftCircleView.tsx", root),
    "utf8",
  );
  const dashboardCard = await readFile(
    new URL("components/dashboard/DashboardCircleCard.tsx", root),
    "utf8",
  );
  const operations = await readFile(
    new URL("dataconnect/bondcircle/queries.gql", root),
    "utf8",
  );

  assert.match(form, /name="memberCapacity"/);
  assert.match(form, /including you/i);
  assert.match(route, /pricingFor\("gift", pricingPlan\)/);
  assert.match(route, /calculateEqualSlotAllocations/);
  assert.match(view, /Invite someone to member slot/);
  assert.match(view, /Send invites/);
  assert.match(view, /onClick=\{\(\) => setInviteManagerOpen\(true\)\}/);
  assert.match(view, /open=\{inviteManagerOpen\}/);
  assert.match(view, /onOpenChange=\{setInviteManagerOpen\}/);
  assert.match(dashboardCard, /Add people/);
  assert.match(
    operations,
    /query GetDashboardCircles[\s\S]*memberCount[\s\S]*memberLimit/,
  );
});

test("empty Gift Circle profile slots open the same secure invitation manager", async () => {
  const view = await readFile(
    new URL("components/gift-circles/GiftCircleView.tsx", root),
    "utf8",
  );
  const manager = await readFile(
    new URL("components/invitations/InvitationManager.tsx", root),
    "utf8",
  );

  assert.match(view, /aria-label=\{`Invite someone to member slot/);
  assert.match(view, /aria-haspopup="dialog"/);
  assert.match(manager, /open\?: boolean/);
  assert.match(manager, /onOpenChange\?: \(open: boolean\) => void/);
  assert.match(manager, /const isOpen = controlledOpen \?\? internalOpen/);
  assert.match(manager, /useEffect\(\(\) => \{[\s\S]*if \(!isOpen\) return/);
  assert.match(manager, /fetchInvitations\(circleId\)/);
});

test("Gift Circle capacity is tier-controlled and the editable field can be cleared", async () => {
  const form = await readFile(
    new URL("components/gift-circles/GiftCircleForm.tsx", root),
    "utf8",
  );
  const route = await readFile(
    new URL("app/api/circles/gift/route.ts", root),
    "utf8",
  );

  assert.match(form, /plansForCircle\("gift"\)/);
  assert.match(form, /name="pricingPlan"/);
  assert.match(form, /setMemberCapacity\(event\.target\.value\)/);
  assert.doesNotMatch(form, /Math\.max\(\s*2/);
  assert.match(form, /Upgrade to/);
  assert.match(route, /pricingFor\("gift", pricingPlan\)/);
  assert.doesNotMatch(route, /pricingPlanForCapacity\(memberCapacity\)/);
});

test("active Gift Circle keeps members still while a slow glow travels around the ring", async () => {
  const schema = await readFile(
    new URL("dataconnect/schema/schema.gql", root),
    "utf8",
  );
  const operations = await readFile(
    new URL("dataconnect/bondcircle/queries.gql", root),
    "utf8",
  );
  const form = await readFile(
    new URL("components/gift-circles/GiftCircleForm.tsx", root),
    "utf8",
  );
  const view = await readFile(
    new URL("components/gift-circles/GiftCircleView.tsx", root),
    "utf8",
  );
  const styles = await readFile(new URL("app/dashboard.css", root), "utf8");

  for (const field of [
    "paymentBankName",
    "paymentAccountName",
    "paymentAccountNumber",
  ]) {
    assert.match(schema, new RegExp(`${field}:`));
    assert.match(operations, new RegExp(field));
    assert.match(form, new RegExp(`name="${field}"`));
    assert.match(view, new RegExp(field));
  }
  assert.match(view, /Payment account/);
  assert.match(styles, /@keyframes bc-gift-ring-flow/);
  assert.match(
    styles,
    /\.bc-gift-stage__orbit[\s\S]*animation:\s*bc-gift-ring-flow\s+32s/,
  );
  assert.doesNotMatch(
    styles,
    /\.bc-gift-stage__member[\s\S]{0,500}animation:\s*bc-gift-member-flow/,
  );
  assert.doesNotMatch(styles, /@keyframes bc-gift-member-flow/);
  assert.match(
    styles,
    /\.bc-gift-stage__ring\s*\{[\s\S]*width:\s*min\(100%,\s*34rem\)[\s\S]*margin:\s*3rem auto/,
  );
  assert.match(styles, /\.bc-gift-stage__orbit\s*\{[\s\S]*inset:\s*14%/);
  assert.match(styles, /prefers-reduced-motion:\s*reduce/);
  assert.match(
    styles,
    /\.bc-gift-stage__gift\s*>\s*div[\s\S]*border-radius:\s*50%/,
  );
  assert.match(styles, /\.bc-gift-sidebar[\s\S]*position:\s*sticky/);
  assert.match(styles, /\.bc-gift-payment-sheet/);
});
