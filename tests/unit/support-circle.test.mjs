import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  SUPPORT_TYPES,
  supportAmountVisibility,
  validateSupportPledge,
} from "../../server/circles/support.ts";

const root = new URL("../../", import.meta.url);

test("Support Circle includes every approved support type", () => {
  assert.deepEqual(SUPPORT_TYPES, [
    "burial_support",
    "medical_support",
    "emergency_support",
    "charity",
    "community_support",
    "family_support",
    "other",
  ]);
});

test("Support Circle privacy protects beneficiary, totals and individual amounts", () => {
  assert.deepEqual(
    supportAmountVisibility({
      isManager: false,
      isSelf: false,
      showTargetToMembers: false,
      showConfirmedTotalToMembers: false,
      hideIndividualAmounts: true,
    }),
    { target: false, confirmedTotal: false, individualAmount: false },
  );
  assert.deepEqual(
    supportAmountVisibility({
      isManager: false,
      isSelf: true,
      showTargetToMembers: false,
      showConfirmedTotalToMembers: false,
      hideIndividualAmounts: true,
    }),
    { target: false, confirmedTotal: false, individualAmount: true },
  );
  assert.deepEqual(
    supportAmountVisibility({
      isManager: true,
      isSelf: false,
      showTargetToMembers: false,
      showConfirmedTotalToMembers: false,
      hideIndividualAmounts: true,
    }),
    { target: true, confirmedTotal: true, individualAmount: true },
  );
});

test("Support pledges are positive whole-naira amounts", () => {
  assert.equal(validateSupportPledge(25000), 25000);
  assert.throws(() => validateSupportPledge(0), /valid support amount/i);
  assert.throws(() => validateSupportPledge(10.5), /valid support amount/i);
});

test("Support Circle persistence and privacy controls are wired server-side", async () => {
  const schema = await readFile(
    new URL("dataconnect/schema/schema.gql", root),
    "utf8",
  );
  const operations = await readFile(
    new URL("dataconnect/bondcircle/queries.gql", root),
    "utf8",
  );
  const repository = await readFile(
    new URL("server/repositories/support-circles.ts", root),
    "utf8",
  );
  const form = await readFile(
    new URL("components/support-circles/SupportCircleForm.tsx", root),
    "utf8",
  );
  const view = await readFile(
    new URL("components/support-circles/SupportCircleView.tsx", root),
    "utf8",
  );
  const createRoute = await readFile(
    new URL("app/api/circles/support/route.ts", root),
    "utf8",
  );
  const pledgeRoute = await readFile(
    new URL("app/api/circles/[circleId]/support/pledge/route.ts", root),
    "utf8",
  );
  const updateRoute = await readFile(
    new URL("app/api/circles/[circleId]/support/updates/route.ts", root),
    "utf8",
  );
  const completionRoute = await readFile(
    new URL("app/api/circles/[circleId]/support/complete/route.ts", root),
    "utf8",
  );
  const dashboardRepository = await readFile(
    new URL("server/repositories/dashboard.ts", root),
    "utf8",
  );
  const dashboardCard = await readFile(
    new URL("components/dashboard/DashboardCircleCard.tsx", root),
    "utf8",
  );

  for (const field of [
    "supportType",
    "beneficiaryName",
    "beneficiaryRelationship",
    "showBeneficiaryName",
    "showTargetToMembers",
    "showConfirmedTotalToMembers",
    "hideIndividualAmounts",
    "requireCreatorApproval",
    "completionType",
    "type SupportUpdate",
  ]) {
    assert.match(schema, new RegExp(field));
  }
  assert.match(operations, /query GetSupportCircleDetail/);
  assert.match(operations, /mutation ConfigureSupportCircle/);
  assert.match(operations, /mutation RecordSupportPledge/);
  assert.match(operations, /mutation CreateSupportUpdate/);
  assert.match(operations, /mutation SetSupportCompletionType/);
  assert.match(repository, /supportAmountVisibility/);
  assert.match(repository, /individualAmount[\s\S]*null/);
  assert.match(form, /name="showBeneficiaryName"/);
  assert.match(form, /name="requireCreatorApproval"/);
  assert.doesNotMatch(
    form,
    /\b(investment|lending|profit|guaranteed fundraising)\b/i,
  );
  assert.match(view, /Record support pledge/i);
  assert.match(view, /Publish update/i);
  assert.match(view, /Support delivered/i);
  assert.match(createRoute, /type:\s*"support"/);
  assert.match(pledgeRoute, /recordSupportPledge/);
  assert.match(updateRoute, /createSupportUpdate/);
  assert.match(completionRoute, /completionType:\s*"support_delivered"/);
  assert.match(dashboardRepository, /showTargetToMembers/);
  assert.match(dashboardRepository, /showConfirmedTotalToMembers/);
  assert.match(dashboardRepository, /targetAmount:\s*canSeeTarget[^?]*\?/);
  assert.match(
    dashboardRepository,
    /contributedAmount:\s*canSeeConfirmedTotal/,
  );
  assert.match(dashboardCard, /Contribution totals are private/);
  assert.match(dashboardCard, /circle\.progress !== null/);
});
