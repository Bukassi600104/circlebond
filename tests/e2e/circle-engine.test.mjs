import assert from "node:assert/strict";
import test from "node:test";
import { randomUUID } from "node:crypto";
import { getApps, initializeApp } from "firebase-admin/app";
import { getDataConnect } from "firebase-admin/data-connect";

const app =
  getApps().find((candidate) => candidate.name === "circle-engine-e2e") ??
  initializeApp({ projectId: "bond-circle" }, "circle-engine-e2e");
const dataConnect = getDataConnect(
  {
    location: "europe-west2",
    serviceId: "bondcircle-service",
    connector: "bondcircle",
  },
  app,
);

test("Firebase persists a draft, creator membership, transitions, and audit history atomically", async () => {
  const creatorId = `circle-test-${randomUUID()}`;
  await dataConnect.upsert("user", {
    id: creatorId,
    displayName: "Circle Engine Test",
    email: `${creatorId}@example.test`,
  });

  const timestamp = new Date().toISOString();
  const created = await dataConnect.executeMutation("CreateCircleDraft", {
    creatorId,
    name: "Firebase Engine Test",
    type: "gift",
    description: "Persistent Milestone 5 verification.",
    targetAmount: 50000,
    pricingPlan: "free",
    memberLimit: 3,
    activationPrice: 0,
    deadline: "2026-09-30",
    eventDate: null,
    visibility: "private",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  const circleId = created.data.circle_insert.id;

  const draft = await dataConnect.executeQuery("GetCircleEngineRecord", {
    circleId,
  });
  assert.equal(draft.data.circle.status, "draft");
  assert.equal(draft.data.circle.pricingPlan, "free");
  assert.equal(draft.data.circle.memberLimit, 3);
  assert.deepEqual(
    draft.data.circleMemberships.map(({ role, user }) => ({
      role,
      userId: user.id,
    })),
    [{ role: "creator", userId: creatorId }],
  );

  const publishedAt = new Date().toISOString();
  await dataConnect.executeMutation("TransitionCircleWithAudit", {
    circleId,
    actorId: creatorId,
    fromStatus: "draft",
    toStatus: "published",
    updatedAt: publishedAt,
    completedAt: null,
    archiveAt: null,
    purgeAt: null,
  });

  const published = await dataConnect.executeQuery("GetCircleEngineRecord", {
    circleId,
  });
  assert.equal(published.data.circle.status, "published");

  const audits = await dataConnect.executeQuery("GetCircleAuditEntries", {
    circleId,
  });
  assert.deepEqual(
    audits.data.circleAuditEntries.map((entry) => entry.action),
    ["draft_created", "status_changed"],
  );
});

test("Firebase persists an active Gift Circle, its allocation, image path, and member-ring status", async () => {
  const creatorId = `gift-test-${randomUUID()}`;
  await dataConnect.upsert("user", {
    id: creatorId,
    displayName: "Gift Circle Creator",
    email: `${creatorId}@example.test`,
  });

  const timestamp = new Date().toISOString();
  const created = await dataConnect.executeMutation("CreateCircleDraft", {
    creatorId,
    name: "Ada's Birthday Gift",
    type: "gift",
    description: "A complete Gift Circle persistence check.",
    targetAmount: 300000,
    pricingPlan: "free",
    memberLimit: 3,
    activationPrice: 0,
    deadline: "2026-08-30",
    eventDate: null,
    visibility: "private",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  const circleId = created.data.circle_insert.id;
  const imageStoragePath = `circles/${circleId}/gift/gift.png`;

  await dataConnect.executeMutation("ConfigureGiftCircle", {
    circleId,
    actorId: creatorId,
    giftTitle: "Premium Blender",
    contributionMode: "equal",
    paymentBankName: "Bond Test Bank",
    paymentAccountName: "Gift Circle Creator",
    paymentAccountNumber: "0123456789",
    imageUrl: `/api/circles/${circleId}/gift-image`,
    imageStoragePath,
    updatedAt: new Date().toISOString(),
  });
  await dataConnect.executeMutation("SetGiftMemberAllocation", {
    circleId,
    memberId: creatorId,
    expectedAmount: 300000,
    contributionStatus: "joined",
  });
  await dataConnect.executeMutation("TransitionCircleWithAudit", {
    circleId,
    actorId: creatorId,
    fromStatus: "draft",
    toStatus: "published",
    updatedAt: new Date().toISOString(),
    completedAt: null,
    archiveAt: null,
    purgeAt: null,
  });
  await dataConnect.executeMutation("TransitionCircleWithAudit", {
    circleId,
    actorId: creatorId,
    fromStatus: "published",
    toStatus: "active",
    updatedAt: new Date().toISOString(),
    completedAt: null,
    archiveAt: null,
    purgeAt: null,
  });

  const detail = await dataConnect.executeQuery("GetGiftCircleDetail", {
    circleId,
  });
  assert.equal(detail.data.circle.giftTitle, "Premium Blender");
  assert.equal(detail.data.circle.contributionMode, "equal");
  assert.equal(detail.data.circle.imageStoragePath, imageStoragePath);
  assert.equal(detail.data.circle.status, "active");
  assert.deepEqual(
    detail.data.circleMemberships.map((membership) => ({
      userId: membership.user.id,
      status: membership.contributionStatus,
      expectedAmount: membership.expectedAmount,
    })),
    [
      {
        userId: creatorId,
        status: "joined",
        expectedAmount: 300000,
      },
    ],
  );
});

test("Firebase persists an event-neutral Aso-Ebi Circle with custom tiers, selection and fulfilment", async () => {
  const creatorId = `aso-ebi-test-${randomUUID()}`;
  await dataConnect.upsert("user", {
    id: creatorId,
    displayName: "Aso-Ebi Organizer",
    email: `${creatorId}@example.test`,
  });
  const timestamp = new Date().toISOString();
  const created = await dataConnect.executeMutation("CreateCircleDraft", {
    creatorId,
    name: "Thanksgiving Celebration",
    type: "aso-ebi",
    description: "Event-neutral Aso-Ebi persistence verification.",
    targetAmount: 0,
    pricingPlan: "free",
    memberLimit: 3,
    activationPrice: 0,
    deadline: null,
    eventDate: "2026-11-22",
    visibility: "private",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  const circleId = created.data.circle_insert.id;
  await dataConnect.executeMutation("ConfigureAsoEbiCircle", {
    circleId,
    actorId: creatorId,
    eventType: "thanksgiving",
    organizerName: "Aso-Ebi Organizer",
    paymentBankName: "Bond Test Bank",
    paymentAccountName: "Aso-Ebi Organizer",
    paymentAccountNumber: "0123456789",
    imageUrl: `/api/circles/${circleId}/aso-ebi-image?asset=event`,
    imageStoragePath: `circles/${circleId}/aso-ebi/event.png`,
    updatedAt: new Date().toISOString(),
  });

  const classicId = randomUUID().replaceAll("-", "");
  const premiumId = randomUUID().replaceAll("-", "");
  for (const [sortOrder, tier] of [
    {
      id: classicId,
      name: "Classic",
      price: 25000,
      fabricDescription: "Emerald brocade",
      appreciationGiftName: "Mug",
    },
    {
      id: premiumId,
      name: "Premium",
      price: 110000,
      fabricDescription: "Premium lace",
      appreciationGiftName: "Gas cooker",
    },
  ].entries()) {
    await dataConnect.executeMutation("CreateAsoEbiTier", {
      tierId: tier.id,
      circleId,
      name: tier.name,
      price: tier.price,
      fabricDescription: tier.fabricDescription,
      fabricImageUrl: null,
      fabricImageStoragePath: null,
      appreciationGiftName: tier.appreciationGiftName,
      appreciationGiftImageUrl: null,
      appreciationGiftImageStoragePath: null,
      availabilityNote: "Available while stock lasts",
      deliveryDetails: "Collection point announced by organizer",
      sortOrder,
      createdAt: new Date().toISOString(),
    });
  }

  await dataConnect.executeMutation("SelectAsoEbiTier", {
    circleId,
    memberId: creatorId,
    tierId: premiumId,
    expectedAmount: 110000,
    updatedAt: new Date().toISOString(),
  });
  await dataConnect.executeMutation("UpdateAsoEbiFulfilment", {
    circleId,
    actorId: creatorId,
    memberId: creatorId,
    status: "paid",
    updatedAt: new Date().toISOString(),
  });
  await dataConnect.executeMutation("UpdateAsoEbiFulfilment", {
    circleId,
    actorId: creatorId,
    memberId: creatorId,
    status: "preparing",
    updatedAt: new Date().toISOString(),
  });

  const detail = await dataConnect.executeQuery("GetAsoEbiCircleDetail", {
    circleId,
  });
  assert.equal(detail.data.circle.eventType, "thanksgiving");
  assert.equal(detail.data.circle.organizerName, "Aso-Ebi Organizer");
  assert.equal(detail.data.asoEbiTiers.length, 2);
  assert.equal(
    detail.data.circleMemberships[0].selectedAsoEbiTier.id,
    premiumId,
  );
  assert.equal(detail.data.circleMemberships[0].expectedAmount, 110000);
  assert.equal(detail.data.circleMemberships[0].fulfilmentStatus, "preparing");
});

test("Firebase persists Support Circle privacy, pledges, updates and support-delivered completion", async () => {
  const creatorId = `support-test-${randomUUID()}`;
  await dataConnect.upsert("user", {
    id: creatorId,
    displayName: "Support Circle Organizer",
    email: `${creatorId}@example.test`,
  });
  const timestamp = new Date().toISOString();
  const created = await dataConnect.executeMutation("CreateCircleDraft", {
    creatorId,
    name: "Community Care",
    type: "support",
    description: "A respectful community support persistence check.",
    targetAmount: 150000,
    pricingPlan: "free",
    memberLimit: 3,
    activationPrice: 0,
    deadline: "2026-12-15",
    eventDate: null,
    visibility: "private",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  const circleId = created.data.circle_insert.id;
  await dataConnect.executeMutation("ConfigureSupportCircle", {
    circleId,
    actorId: creatorId,
    supportType: "community_support",
    beneficiaryName: "Private Community Member",
    beneficiaryRelationship: "Community member",
    contributionMode: "equal",
    showBeneficiaryName: false,
    showTargetToMembers: true,
    showConfirmedTotalToMembers: true,
    hideIndividualAmounts: true,
    requireCreatorApproval: true,
    paymentBankName: "Bond Test Bank",
    paymentAccountName: "Support Circle Organizer",
    paymentAccountNumber: "0123456789",
    imageUrl: `/api/circles/${circleId}/support-image`,
    imageStoragePath: `circles/${circleId}/support/support.png`,
    updatedAt: new Date().toISOString(),
  });
  await dataConnect.executeMutation("SetSupportMemberAllocation", {
    circleId,
    memberId: creatorId,
    expectedAmount: 50000,
    contributionStatus: "joined",
  });
  await dataConnect.executeMutation("RecordSupportPledge", {
    circleId,
    memberId: creatorId,
    amount: 50000,
    updatedAt: new Date().toISOString(),
  });
  await dataConnect.executeMutation("CreateSupportUpdate", {
    circleId,
    authorId: creatorId,
    body: "The first coordination update is now available.",
    createdAt: new Date().toISOString(),
  });
  for (const [fromStatus, toStatus] of [
    ["draft", "published"],
    ["published", "active"],
    ["active", "target_reached"],
    ["target_reached", "fulfilment"],
    ["fulfilment", "completed"],
  ]) {
    await dataConnect.executeMutation("TransitionCircleWithAudit", {
      circleId,
      actorId: creatorId,
      fromStatus,
      toStatus,
      updatedAt: new Date().toISOString(),
      completedAt: toStatus === "completed" ? new Date().toISOString() : null,
      archiveAt: null,
      purgeAt: null,
    });
  }
  await dataConnect.executeMutation("SetSupportCompletionType", {
    circleId,
    actorId: creatorId,
    completionType: "support_delivered",
    updatedAt: new Date().toISOString(),
  });

  const detail = await dataConnect.executeQuery("GetSupportCircleDetail", {
    circleId,
  });
  assert.equal(detail.data.circle.supportType, "community_support");
  assert.equal(detail.data.circle.showBeneficiaryName, false);
  assert.equal(detail.data.circle.requireCreatorApproval, true);
  assert.equal(detail.data.circle.completionType, "support_delivered");
  assert.equal(detail.data.circle.status, "completed");
  assert.equal(detail.data.circleMemberships[0].pledgedAmount, 50000);
  assert.equal(detail.data.circleMemberships[0].contributionStatus, "pledged");
  assert.equal(detail.data.supportUpdates.length, 1);
});

test("Firebase persists secure invitations, approvals, revocation and multi-circle membership", async () => {
  const creatorId = `invite-creator-${randomUUID()}`;
  const memberId = `invite-member-${randomUUID()}`;
  const pendingId = `invite-pending-${randomUUID()}`;
  for (const [id, displayName] of [
    [creatorId, "Invitation Creator"],
    [memberId, "Invited Member"],
    [pendingId, "Approval Member"],
  ]) {
    await dataConnect.upsert("user", {
      id,
      displayName,
      email: `${id}@example.test`,
    });
  }

  async function createCircle(name) {
    const createdAt = new Date().toISOString();
    const created = await dataConnect.executeMutation("CreateCircleDraft", {
      creatorId,
      name,
      type: "gift",
      description: "Invitation workflow persistence verification.",
      targetAmount: 90000,
      pricingPlan: "premium",
      memberLimit: 10,
      activationPrice: 5000,
      deadline: "2026-12-30",
      eventDate: null,
      visibility: "private",
      createdAt,
      updatedAt: createdAt,
    });
    return created.data.circle_insert.id;
  }

  async function createInvitation(
    circleId,
    tokenHash,
    requireApproval = false,
  ) {
    const createdAt = new Date().toISOString();
    const result = await dataConnect.executeMutation("CreateInvitation", {
      circleId,
      invitedById: creatorId,
      tokenHash,
      mode: "named",
      recipientName: "Invited member",
      recipientEmail: `${memberId}@example.test`,
      recipientPhone: null,
      expectedAmount: 30000,
      requireApproval,
      maxUses: 1,
      expiresAt: new Date(Date.now() + 86_400_000).toISOString(),
      createdAt,
    });
    return result.data.invitation_insert.id;
  }

  const firstCircleId = await createCircle("Secure Invitation Circle");
  const firstHash = randomUUID().replaceAll("-", "").padEnd(64, "0");
  const firstInvitationId = await createInvitation(firstCircleId, firstHash);
  await dataConnect.executeMutation("UpdateInvitationState", {
    invitationId: firstInvitationId,
    actorId: creatorId,
    circleId: firstCircleId,
    state: "sent",
    openedAt: null,
    revokedAt: null,
    updatedAt: new Date().toISOString(),
  });
  await dataConnect.executeMutation("AcceptInvitationWithMembership", {
    invitationId: firstInvitationId,
    circleId: firstCircleId,
    userId: memberId,
    role: "member",
    expectedAmount: 30000,
    nextMemberCount: 2,
    nextInvitationState: "accepted",
    nextUseCount: 1,
    respondedAt: new Date().toISOString(),
  });

  const approvalHash = randomUUID().replaceAll("-", "").padEnd(64, "1");
  const approvalInvitationId = await createInvitation(
    firstCircleId,
    approvalHash,
    true,
  );
  await dataConnect.executeMutation("RequestInvitationApproval", {
    invitationId: approvalInvitationId,
    circleId: firstCircleId,
    userId: pendingId,
    respondedAt: new Date().toISOString(),
  });
  await dataConnect.executeMutation("ApproveInvitationMembership", {
    invitationId: approvalInvitationId,
    circleId: firstCircleId,
    actorId: creatorId,
    userId: pendingId,
    role: "member",
    expectedAmount: 30000,
    nextMemberCount: 3,
    nextInvitationState: "accepted",
    nextUseCount: 1,
    respondedAt: new Date().toISOString(),
  });

  const revokedHash = randomUUID().replaceAll("-", "").padEnd(64, "2");
  const revokedInvitationId = await createInvitation(
    firstCircleId,
    revokedHash,
  );
  await dataConnect.executeMutation("UpdateInvitationState", {
    invitationId: revokedInvitationId,
    actorId: creatorId,
    circleId: firstCircleId,
    state: "revoked",
    openedAt: null,
    revokedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });

  const secondCircleId = await createCircle("Second Membership Circle");
  const secondHash = randomUUID().replaceAll("-", "").padEnd(64, "3");
  const secondInvitationId = await createInvitation(secondCircleId, secondHash);
  await dataConnect.executeMutation("AcceptInvitationWithMembership", {
    invitationId: secondInvitationId,
    circleId: secondCircleId,
    userId: memberId,
    role: "member",
    expectedAmount: 30000,
    nextMemberCount: 2,
    nextInvitationState: "accepted",
    nextUseCount: 1,
    respondedAt: new Date().toISOString(),
  });

  const firstCircle = await dataConnect.executeQuery("GetCircleEngineRecord", {
    circleId: firstCircleId,
  });
  assert.deepEqual(
    new Set(firstCircle.data.circleMemberships.map((item) => item.user.id)),
    new Set([creatorId, memberId, pendingId]),
  );
  const secondCircle = await dataConnect.executeQuery("GetCircleEngineRecord", {
    circleId: secondCircleId,
  });
  assert.deepEqual(
    new Set(secondCircle.data.circleMemberships.map((item) => item.user.id)),
    new Set([creatorId, memberId]),
  );
  const revoked = await dataConnect.executeQuery("GetInvitationByTokenHash", {
    tokenHash: revokedHash,
  });
  assert.equal(revoked.data.invitations[0].state, "revoked");
  const approval = await dataConnect.executeQuery("GetInvitationAcceptances", {
    invitationId: approvalInvitationId,
  });
  assert.equal(approval.data.invitationAcceptances[0].status, "accepted");
});
