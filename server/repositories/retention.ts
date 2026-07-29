import "server-only";

import { randomUUID } from "node:crypto";
import { logger } from "@/lib/logger";
import { getFirebaseAdminStorage } from "@/server/firebase/admin";
import { getBondCircleDataConnect } from "@/server/firebase/data-connect";
import {
  RETENTION_RETRY_MS,
  assertPrivateStoragePath,
  isRetentionEligible,
} from "@/server/retention/rules";
import type { CircleState } from "@/server/circles/engine";

type RetentionPayload = {
  circle?: {
    id: string;
    type: string;
    status: string;
    retentionDueAt?: string | null;
    purgeAt?: string | null;
    imageStoragePath?: string | null;
  };
  receipts: Array<{ id: string; imageStoragePath: string }>;
  circleMemberships: Array<{ receiptStoragePath?: string | null }>;
  asoEbiTiers: Array<{
    fabricImageStoragePath?: string | null;
    appreciationGiftImageStoragePath?: string | null;
  }>;
  retentionPurgeAttempts: Array<{
    attemptNumber: number;
    status: string;
    startedAt?: string | null;
    nextRetryAt?: string | null;
  }>;
  invitations: Array<{ id: string }>;
};

type ReferenceQuery = {
  circles: Array<{ id: string }>;
  receipts: Array<{ id: string; circle: { id: string } }>;
  circleMemberships: Array<{ circle: { id: string } }>;
  fabricReferences: Array<{ id: string; circle: { id: string } }>;
  giftReferences: Array<{ id: string; circle: { id: string } }>;
};

async function isSharedStoragePath(path: string, circleId: string) {
  const response = await getBondCircleDataConnect().executeQuery<
    ReferenceQuery,
    { path: string }
  >("GetStoragePathReferences", { path });
  const referencingCircleIds = [
    ...response.data.circles.map((circle) => circle.id),
    ...response.data.receipts.map((receipt) => receipt.circle.id),
    ...response.data.circleMemberships.map(
      (membership) => membership.circle.id,
    ),
    ...response.data.fabricReferences.map((tier) => tier.circle.id),
    ...response.data.giftReferences.map((tier) => tier.circle.id),
  ];
  return referencingCircleIds.some((id) => id !== circleId);
}

async function loadRetentionPayload(circleId: string) {
  const response = await getBondCircleDataConnect().executeQuery<
    RetentionPayload,
    { circleId: string }
  >("GetCircleRetentionPayload", { circleId });
  return response.data;
}

function storagePaths(payload: RetentionPayload) {
  return [
    payload.circle?.imageStoragePath,
    ...payload.receipts.map((receipt) => receipt.imageStoragePath),
    ...payload.circleMemberships.map(
      (membership) => membership.receiptStoragePath,
    ),
    ...payload.asoEbiTiers.flatMap((tier) => [
      tier.fabricImageStoragePath,
      tier.appreciationGiftImageStoragePath,
    ]),
  ].filter((path): path is string => Boolean(path));
}

async function finishAttempt(input: {
  attemptId: string;
  status: "completed" | "failed";
  deletedFileCount: number;
  skippedSharedFileCount: number;
  failureReason?: string | null;
  nextRetryAt?: string | null;
}) {
  await getBondCircleDataConnect().executeMutation(
    "CompleteRetentionPurgeAttempt",
    {
      ...input,
      failureReason: input.failureReason?.slice(0, 500) ?? null,
      nextRetryAt: input.nextRetryAt ?? null,
      completedAt: new Date().toISOString(),
    },
  );
}

export async function purgeEligibleCircle(circleId: string, now = new Date()) {
  const payload = await loadRetentionPayload(circleId);
  const circle = payload.circle;
  if (
    !circle ||
    !isRetentionEligible(
      circle.status as CircleState,
      circle.retentionDueAt ?? null,
      circle.purgeAt ?? null,
      now,
    )
  ) {
    return { status: "skipped" as const };
  }
  const previous = payload.retentionPurgeAttempts[0];
  const runningAttemptIsFresh =
    previous?.status === "running" &&
    previous.startedAt &&
    now.getTime() - new Date(previous.startedAt).getTime() < 60 * 60 * 1000;
  if (
    runningAttemptIsFresh ||
    (previous?.status === "failed" &&
      previous.nextRetryAt &&
      new Date(previous.nextRetryAt).getTime() > now.getTime())
  ) {
    return { status: "deferred" as const };
  }

  const attemptId = randomUUID();
  const attemptNumber = (previous?.attemptNumber ?? 0) + 1;
  await getBondCircleDataConnect().executeMutation(
    "CreateRetentionPurgeAttempt",
    {
      attemptId,
      circleId,
      attemptNumber,
      startedAt: now.toISOString(),
    },
  );

  let deletedFileCount = 0;
  let skippedSharedFileCount = 0;
  try {
    for (const rawPath of new Set(storagePaths(payload))) {
      const path = assertPrivateStoragePath(rawPath);
      if (await isSharedStoragePath(path, circleId)) {
        skippedSharedFileCount += 1;
        continue;
      }
      const file = getFirebaseAdminStorage().bucket().file(path);
      await file.delete({ ignoreNotFound: true });
      const [exists] = await file.exists();
      if (exists) {
        throw new Error("A private storage file remained after deletion.");
      }
      deletedFileCount += 1;
    }

    for (const invitation of payload.invitations) {
      await getBondCircleDataConnect().executeMutation(
        "PurgeInvitationAcceptances",
        { invitationId: invitation.id },
      );
    }
    const purgeAt = new Date().toISOString();
    await getBondCircleDataConnect().executeMutation(
      "PurgeCircleSensitiveData",
      { circleId, purgeAt },
    );
    await finishAttempt({
      attemptId,
      status: "completed",
      deletedFileCount,
      skippedSharedFileCount,
    });
    logger.info("retention_purge_completed", {
      circleId,
      attemptNumber,
      deletedFileCount,
      skippedSharedFileCount,
    });
    return {
      status: "completed" as const,
      deletedFileCount,
      skippedSharedFileCount,
    };
  } catch (error) {
    const failureReason =
      error instanceof Error ? error.message : "Unknown retention failure";
    await finishAttempt({
      attemptId,
      status: "failed",
      deletedFileCount,
      skippedSharedFileCount,
      failureReason,
      nextRetryAt: new Date(now.getTime() + RETENTION_RETRY_MS).toISOString(),
    }).catch((loggingError) => {
      logger.error("retention_attempt_log_failed", {
        circleId,
        error: loggingError instanceof Error ? loggingError.message : "unknown",
      });
    });
    logger.error("retention_purge_alert", {
      circleId,
      attemptNumber,
      failureReason,
    });
    return { status: "failed" as const, failureReason };
  }
}

export async function processRetentionBatch(now = new Date()) {
  const response = await getBondCircleDataConnect().executeQuery<
    { circles: Array<{ id: string; retentionDueAt?: string | null }> },
    { now: string }
  >("GetRetentionCandidates", { now: now.toISOString() });
  const results = [];
  for (const circle of response.data.circles) {
    results.push(await purgeEligibleCircle(circle.id, now));
  }
  return {
    processed: results.length,
    completed: results.filter((result) => result.status === "completed").length,
    failed: results.filter((result) => result.status === "failed").length,
  };
}
