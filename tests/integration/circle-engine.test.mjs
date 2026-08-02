import assert from "node:assert/strict";
import test from "node:test";
import {
  addCircleMember,
  createCircleDraft,
  transitionCircleState,
  updateCircleConfiguration,
  updateCircleDraft,
} from "../../server/circles/service.ts";

class MemoryCircleStore {
  circles = new Map();
  memberships = [];
  audits = [];

  async createDraft(circle, creatorId) {
    const stored = { ...circle, id: crypto.randomUUID(), creatorId };
    this.circles.set(stored.id, stored);
    this.memberships.push({
      circleId: stored.id,
      userId: creatorId,
      role: "creator",
      membershipStatus: "joined",
    });
    this.audits.push({
      circleId: stored.id,
      actorId: creatorId,
      action: "draft_created",
    });
    return stored;
  }

  async findById(circleId) {
    return this.circles.get(circleId) ?? null;
  }

  async roleFor(circleId, userId) {
    return (
      this.memberships.find(
        (item) => item.circleId === circleId && item.userId === userId,
      )?.role ?? null
    );
  }

  async updateConfiguration(circle, actorId, changes, auditAction) {
    const updated = { ...circle, ...changes };
    this.circles.set(circle.id, updated);
    this.audits.push({
      circleId: circle.id,
      actorId,
      action: auditAction,
    });
    return updated;
  }

  async transition(circle, actorId, nextStatus, timestamps) {
    const updated = { ...circle, status: nextStatus, ...timestamps };
    this.circles.set(circle.id, updated);
    this.audits.push({
      circleId: circle.id,
      actorId,
      action: "status_changed",
      fromStatus: circle.status,
      toStatus: nextStatus,
    });
    return updated;
  }

  async memberCount(circleId) {
    return this.memberships.filter((item) => item.circleId === circleId).length;
  }

  async addMember(circle, actorId, memberId, role) {
    this.memberships.push({
      circleId: circle.id,
      userId: memberId,
      role,
      membershipStatus: "invited",
    });
    this.audits.push({
      circleId: circle.id,
      actorId,
      action: "member_invited",
    });
  }
}

test("drafts resume, critical changes audit, limits hold, and cancellation locks activity", async () => {
  const store = new MemoryCircleStore();
  const draft = await createCircleDraft(
    "creator-1",
    {
      type: "gift",
      title: "Ada's Birthday Gift",
      description: "Shared birthday gift.",
      pricingPlan: "trial",
      visibility: "private",
      targetAmount: 300000,
      deadline: "2026-08-30",
      eventDate: null,
    },
    store,
  );

  assert.equal(draft.status, "draft");
  assert.equal(draft.memberLimit, 3);
  assert.equal(draft.activationPrice, 0);

  const resumed = await updateCircleDraft(
    "creator-1",
    draft.id,
    { description: "Updated while still a draft." },
    store,
  );
  assert.equal(resumed.description, "Updated while still a draft.");
  assert.equal(resumed.status, "draft");

  await addCircleMember("creator-1", draft.id, "member-1", "member", store);
  await addCircleMember("creator-1", draft.id, "member-2", "member", store);
  await assert.rejects(
    addCircleMember("creator-1", draft.id, "member-3", "member", store),
    /up to 3 total members/i,
  );

  const published = await transitionCircleState(
    "creator-1",
    draft.id,
    "published",
    store,
  );
  assert.equal(published.status, "published");
  const publishedUpdate = await updateCircleConfiguration(
    "creator-1",
    draft.id,
    { description: "A material change after publication." },
    store,
  );
  assert.equal(
    publishedUpdate.description,
    "A material change after publication.",
  );
  await assert.rejects(
    updateCircleConfiguration(
      "member-1",
      draft.id,
      { description: "Members cannot change configuration." },
      store,
    ),
    /permission/i,
  );
  await assert.rejects(
    transitionCircleState("member-1", draft.id, "active", store),
    /permission/i,
  );

  const active = await transitionCircleState(
    "creator-1",
    draft.id,
    "active",
    store,
  );
  const cancelled = await transitionCircleState(
    "creator-1",
    active.id,
    "cancelled",
    store,
  );
  assert.equal(cancelled.status, "cancelled");
  await assert.rejects(
    addCircleMember("creator-1", draft.id, "late-member", "member", store),
    /cannot accept/i,
  );

  assert.deepEqual(
    store.audits.map((entry) => entry.action),
    [
      "draft_created",
      "draft_updated",
      "member_invited",
      "member_invited",
      "status_changed",
      "configuration_updated",
      "status_changed",
      "status_changed",
    ],
  );
});
