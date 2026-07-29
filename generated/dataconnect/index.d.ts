import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AbuseAttempt_Key {
  id: UUIDString;
  __typename?: 'AbuseAttempt_Key';
}

export interface AcceptInvitationWithMembershipData {
  circleMembership_insert: CircleMembership_Key;
  invitationAcceptance_insert: InvitationAcceptance_Key;
  circle_update?: Circle_Key | null;
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}

export interface AcceptInvitationWithMembershipVariables {
  invitationId: UUIDString;
  circleId: UUIDString;
  userId: string;
  role: string;
  expectedAmount: number;
  nextMemberCount: number;
  nextInvitationState: string;
  nextUseCount: number;
  respondedAt: TimestampString;
}

export interface ActivityLog_Key {
  id: UUIDString;
  __typename?: 'ActivityLog_Key';
}

export interface AddCircleMemberWithAuditData {
  circleMembership_insert: CircleMembership_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}

export interface AddCircleMemberWithAuditVariables {
  circleId: UUIDString;
  actorId: string;
  memberId: string;
  role: string;
  createdAt: TimestampString;
}

export interface Announcement_Key {
  id: UUIDString;
  __typename?: 'Announcement_Key';
}

export interface ApproveInvitationMembershipData {
  circleMembership_insert: CircleMembership_Key;
  invitationAcceptance_update?: InvitationAcceptance_Key | null;
  circle_update?: Circle_Key | null;
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}

export interface ApproveInvitationMembershipVariables {
  invitationId: UUIDString;
  circleId: UUIDString;
  actorId: string;
  userId: string;
  role: string;
  expectedAmount: number;
  nextMemberCount: number;
  nextInvitationState: string;
  nextUseCount: number;
  respondedAt: TimestampString;
}

export interface AsoEbiTier_Key {
  id: UUIDString;
  __typename?: 'AsoEbiTier_Key';
}

export interface AuthAuditEvent_Key {
  id: UUIDString;
  __typename?: 'AuthAuditEvent_Key';
}

export interface CircleAuditEntry_Key {
  id: UUIDString;
  __typename?: 'CircleAuditEntry_Key';
}

export interface CircleMembership_Key {
  circleId: UUIDString;
  userId: string;
  __typename?: 'CircleMembership_Key';
}

export interface Circle_Key {
  id: UUIDString;
  __typename?: 'Circle_Key';
}

export interface CommentReport_Key {
  id: UUIDString;
  __typename?: 'CommentReport_Key';
}

export interface Comment_Key {
  id: UUIDString;
  __typename?: 'Comment_Key';
}

export interface CompleteRetentionPurgeAttemptData {
  retentionPurgeAttempt_update?: RetentionPurgeAttempt_Key | null;
}

export interface CompleteRetentionPurgeAttemptVariables {
  attemptId: UUIDString;
  status: string;
  deletedFileCount: number;
  skippedSharedFileCount: number;
  failureReason?: string | null;
  nextRetryAt?: TimestampString | null;
  completedAt: TimestampString;
}

export interface ConfigureAsoEbiCircleData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface ConfigureAsoEbiCircleVariables {
  circleId: UUIDString;
  actorId: string;
  eventType: string;
  organizerName: string;
  paymentBankName: string;
  paymentAccountName: string;
  paymentAccountNumber: string;
  imageUrl: string;
  imageStoragePath: string;
  updatedAt: TimestampString;
}

export interface ConfigureGiftCircleData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface ConfigureGiftCircleVariables {
  circleId: UUIDString;
  actorId: string;
  giftTitle: string;
  contributionMode: string;
  paymentBankName: string;
  paymentAccountName: string;
  paymentAccountNumber: string;
  imageUrl: string;
  imageStoragePath: string;
  updatedAt: TimestampString;
}

export interface ConfigureSupportCircleData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface ConfigureSupportCircleVariables {
  circleId: UUIDString;
  actorId: string;
  supportType: string;
  beneficiaryName: string;
  beneficiaryRelationship?: string | null;
  contributionMode: string;
  showBeneficiaryName: boolean;
  showTargetToMembers: boolean;
  showConfirmedTotalToMembers: boolean;
  hideIndividualAmounts: boolean;
  requireCreatorApproval: boolean;
  paymentBankName: string;
  paymentAccountName: string;
  paymentAccountNumber: string;
  imageUrl: string;
  imageStoragePath: string;
  updatedAt: TimestampString;
}

export interface ConsumeAuthChallengeData {
  consumedAuthChallenge_insert: ConsumedAuthChallenge_Key;
}

export interface ConsumeAuthChallengeVariables {
  challengeHash: string;
  consumedAt: TimestampString;
}

export interface ConsumedAuthChallenge_Key {
  challengeHash: string;
  __typename?: 'ConsumedAuthChallenge_Key';
}

export interface CreateAnnouncementWithActivityData {
  announcement_insert: Announcement_Key;
  activityLog_insert: ActivityLog_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface CreateAnnouncementWithActivityVariables {
  announcementId: UUIDString;
  announcementEntityId: string;
  activityId: UUIDString;
  circleId: UUIDString;
  authorId: string;
  title: string;
  body: string;
  pinned: boolean;
  important?: boolean;
  commentsEnabled: boolean;
  createdAt: TimestampString;
}

export interface CreateAsoEbiTierData {
  asoEbiTier_insert: AsoEbiTier_Key;
}

export interface CreateAsoEbiTierVariables {
  tierId: UUIDString;
  circleId: UUIDString;
  name: string;
  price: number;
  fabricDescription: string;
  fabricImageUrl?: string | null;
  fabricImageStoragePath?: string | null;
  appreciationGiftName?: string | null;
  appreciationGiftImageUrl?: string | null;
  appreciationGiftImageStoragePath?: string | null;
  availabilityNote?: string | null;
  deliveryDetails?: string | null;
  sortOrder: number;
  createdAt: TimestampString;
}

export interface CreateCircleDraftData {
  circle_insert: Circle_Key;
  circleMembership_insert: CircleMembership_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}

export interface CreateCircleDraftVariables {
  creatorId: string;
  name: string;
  type: string;
  description: string;
  targetAmount: number;
  pricingPlan: string;
  memberLimit: number;
  activationPrice: number;
  deadline?: DateString | null;
  eventDate?: DateString | null;
  visibility: string;
  createdAt: TimestampString;
  updatedAt: TimestampString;
}

export interface CreateCommentWithActivityData {
  comment_insert: Comment_Key;
  activityLog_insert: ActivityLog_Key;
}

export interface CreateCommentWithActivityVariables {
  commentId: UUIDString;
  commentEntityId: string;
  activityId: UUIDString;
  circleId: UUIDString;
  authorId: string;
  announcementId?: UUIDString | null;
  parentCommentId?: UUIDString | null;
  body: string;
  createdAt: TimestampString;
}

export interface CreateEmailDeliveryData {
  emailDelivery_insert: EmailDelivery_Key;
}

export interface CreateEmailDeliveryVariables {
  deliveryId: UUIDString;
  notificationId?: UUIDString | null;
  recipientId?: string | null;
  eventType: string;
  destinationMasked: string;
  status: string;
  providerMessageId?: string | null;
  failureReason?: string | null;
  createdAt: TimestampString;
}

export interface CreateInvitationData {
  invitation_insert: Invitation_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}

export interface CreateInvitationVariables {
  circleId: UUIDString;
  invitedById: string;
  tokenHash: string;
  mode: string;
  recipientName?: string | null;
  recipientEmail?: string | null;
  recipientPhone?: string | null;
  expectedAmount: number;
  requireApproval: boolean;
  maxUses: number;
  expiresAt: TimestampString;
  createdAt: TimestampString;
}

export interface CreateNotificationData {
  notification_insert: Notification_Key;
}

export interface CreateNotificationVariables {
  notificationId: UUIDString;
  recipientId: string;
  circleId?: UUIDString | null;
  type: string;
  title: string;
  body: string;
  deepLink: string;
  dedupeKey: string;
  createdAt: TimestampString;
}

export interface CreateRetentionPurgeAttemptData {
  retentionPurgeAttempt_insert: RetentionPurgeAttempt_Key;
}

export interface CreateRetentionPurgeAttemptVariables {
  attemptId: UUIDString;
  circleId: UUIDString;
  attemptNumber: number;
  startedAt: TimestampString;
}

export interface CreateSupportUpdateData {
  supportUpdate_insert: SupportUpdate_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface CreateSupportUpdateVariables {
  circleId: UUIDString;
  authorId: string;
  body: string;
  createdAt: TimestampString;
}

export interface DeclineInvitationData {
  invitationAcceptance_insert: InvitationAcceptance_Key;
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface DeclineInvitationVariables {
  invitationId: UUIDString;
  circleId: UUIDString;
  userId: string;
  state: string;
  respondedAt: TimestampString;
}

export interface DeleteAnnouncementWithAuditData {
  announcement_update?: Announcement_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface DeleteAnnouncementWithAuditVariables {
  announcementId: UUIDString;
  announcementEntityId: string;
  circleId: UUIDString;
  actorId: string;
  deletedAt: TimestampString;
}

export interface DeleteOwnCommentWithAuditData {
  comment_update?: Comment_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface DeleteOwnCommentWithAuditVariables {
  commentId: UUIDString;
  commentEntityId: string;
  circleId: UUIDString;
  actorId: string;
  deletedAt: TimestampString;
}

export interface DismissNotificationData {
  notification_updateMany: number;
}

export interface DismissNotificationVariables {
  notificationId: UUIDString;
  recipientId: string;
  dismissedAt: TimestampString;
}

export interface DismissOwnerCommentReportData {
  commentReport_update?: CommentReport_Key | null;
}

export interface DismissOwnerCommentReportVariables {
  reportId: UUIDString;
}

export interface EmailDelivery_Key {
  id: UUIDString;
  __typename?: 'EmailDelivery_Key';
}

export interface FindNotificationRecipientByEmailData {
  users: ({
    id: string;
    displayName: string;
    email?: string | null;
    emailNotifications: boolean;
    commentNotifications: boolean;
    contributionReminders: boolean;
    circleUpdateNotifications: boolean;
  } & User_Key)[];
}

export interface FindNotificationRecipientByEmailVariables {
  email: string;
}

export interface FindUserByEmailData {
  users: ({
    id: string;
    displayName: string;
    email?: string | null;
    profileImage?: string | null;
    termsAcceptedAt?: TimestampString | null;
    privacyAcceptedAt?: TimestampString | null;
  } & User_Key)[];
}

export interface FindUserByEmailVariables {
  email: string;
}

export interface GetActivityLogsForCirclesData {
  activityLogs: ({
    id: UUIDString;
    eventType: string;
    entityId: string;
    metadata: string;
    createdAt: TimestampString;
    circle: {
      id: UUIDString;
      name: string;
      type: string;
    } & Circle_Key;
      actor?: {
        id: string;
        displayName: string;
      } & User_Key;
  } & ActivityLog_Key)[];
}

export interface GetActivityLogsForCirclesVariables {
  circleIds: UUIDString[];
}

export interface GetAsoEbiCircleDetailData {
  circle?: {
    id: UUIDString;
    name: string;
    type: string;
    description: string;
    imageUrl?: string | null;
    imageStoragePath?: string | null;
    eventType?: string | null;
    organizerName?: string | null;
    paymentBankName?: string | null;
    paymentAccountName?: string | null;
    paymentAccountNumber?: string | null;
    memberLimit: number;
    memberCount: number;
    pricingPlan: string;
    contributedAmount: number;
    eventDate?: DateString | null;
    status: string;
    completionType?: string | null;
    completedAt?: TimestampString | null;
    retentionDueAt?: TimestampString | null;
    archiveAt?: TimestampString | null;
    purgeAt?: TimestampString | null;
    creator: {
      id: string;
    } & User_Key;
  } & Circle_Key;
    asoEbiTiers: ({
      id: UUIDString;
      name: string;
      price: number;
      fabricDescription: string;
      fabricImageUrl?: string | null;
      fabricImageStoragePath?: string | null;
      appreciationGiftName?: string | null;
      appreciationGiftImageUrl?: string | null;
      appreciationGiftImageStoragePath?: string | null;
      availabilityNote?: string | null;
      deliveryDetails?: string | null;
      sortOrder: number;
    } & AsoEbiTier_Key)[];
      circleMemberships: ({
        role: string;
        membershipStatus: string;
        contributionStatus: string;
        fulfilmentStatus: string;
        expectedAmount: number;
        confirmedAmount: number;
        selectedAsoEbiTier?: {
          id: UUIDString;
          name: string;
          price: number;
        } & AsoEbiTier_Key;
          user: {
            id: string;
            displayName: string;
            email?: string | null;
            profileImage?: string | null;
          } & User_Key;
      })[];
}

export interface GetAsoEbiCircleDetailVariables {
  circleId: UUIDString;
}

export interface GetCircleAuditEntriesData {
  circleAuditEntries: ({
    id: UUIDString;
    action: string;
    fromStatus?: string | null;
    toStatus?: string | null;
    materialChanges: string;
    createdAt: TimestampString;
    actor: {
      id: string;
    } & User_Key;
  } & CircleAuditEntry_Key)[];
}

export interface GetCircleAuditEntriesVariables {
  circleId: UUIDString;
}

export interface GetCircleCommunicationData {
  circle?: {
    id: UUIDString;
    name: string;
    type: string;
    status: string;
    commentsEnabled: boolean;
    creator: {
      id: string;
    } & User_Key;
  } & Circle_Key;
    circleMemberships: ({
      role: string;
      membershipStatus: string;
      expectedAmount: number;
      confirmedAmount: number;
      user: {
        id: string;
        displayName: string;
        profileImage?: string | null;
      } & User_Key;
    })[];
      announcements: ({
        id: UUIDString;
        title: string;
        body: string;
        pinned: boolean;
        important: boolean;
        commentsEnabled: boolean;
        createdAt: TimestampString;
        updatedAt: TimestampString;
        author: {
          id: string;
          displayName: string;
        } & User_Key;
      } & Announcement_Key)[];
        comments: ({
          id: UUIDString;
          announcementId?: UUIDString | null;
          parentCommentId?: UUIDString | null;
          body: string;
          status: string;
          deletionReason?: string | null;
          createdAt: TimestampString;
          updatedAt: TimestampString;
          deletedAt?: TimestampString | null;
          author: {
            id: string;
            displayName: string;
            profileImage?: string | null;
          } & User_Key;
        } & Comment_Key)[];
          commentReports: ({
            id: UUIDString;
            reason: string;
            status: string;
            createdAt: TimestampString;
            comment: {
              id: UUIDString;
            } & Comment_Key;
              reporter: {
                id: string;
                displayName: string;
              } & User_Key;
          } & CommentReport_Key)[];
            activityLogs: ({
              id: UUIDString;
              eventType: string;
              entityId: string;
              metadata: string;
              createdAt: TimestampString;
              actor?: {
                id: string;
                displayName: string;
              } & User_Key;
            } & ActivityLog_Key)[];
}

export interface GetCircleCommunicationVariables {
  circleId: UUIDString;
}

export interface GetCircleEngineRecordData {
  circle?: {
    id: UUIDString;
    name: string;
    type: string;
    description: string;
    targetAmount: number;
    pricingPlan: string;
    memberLimit: number;
    activationPrice: number;
    deadline?: DateString | null;
    eventDate?: DateString | null;
    status: string;
    visibility: string;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    completedAt?: TimestampString | null;
    retentionDueAt?: TimestampString | null;
    archiveAt?: TimestampString | null;
    purgeAt?: TimestampString | null;
    creator: {
      id: string;
    } & User_Key;
  } & Circle_Key;
    circleMemberships: ({
      role: string;
      membershipStatus: string;
      user: {
        id: string;
      } & User_Key;
    })[];
}

export interface GetCircleEngineRecordVariables {
  circleId: UUIDString;
}

export interface GetCircleInvitationsData {
  invitations: ({
    id: UUIDString;
    mode: string;
    recipientName?: string | null;
    recipientEmail?: string | null;
    recipientPhone?: string | null;
    expectedAmount: number;
    requireApproval: boolean;
    state: string;
    maxUses: number;
    useCount: number;
    expiresAt: TimestampString;
    createdAt: TimestampString;
    updatedAt: TimestampString;
  } & Invitation_Key)[];
}

export interface GetCircleInvitationsVariables {
  circleId: UUIDString;
}

export interface GetCircleLifecycleSummaryData {
  circle?: {
    id: UUIDString;
    name: string;
    type: string;
    status: string;
    completionType?: string | null;
    memberCount: number;
    pricingPlan: string;
    createdAt: TimestampString;
    completedAt?: TimestampString | null;
    retentionDueAt?: TimestampString | null;
    archiveAt?: TimestampString | null;
    purgeAt?: TimestampString | null;
    creator: {
      id: string;
    } & User_Key;
  } & Circle_Key;
    circleMemberships: ({
      user: {
        id: string;
      } & User_Key;
    })[];
      activityLogs: ({
        id: UUIDString;
        eventType: string;
        createdAt: TimestampString;
        actor?: {
          id: string;
          displayName: string;
        } & User_Key;
      } & ActivityLog_Key)[];
}

export interface GetCircleLifecycleSummaryVariables {
  circleId: UUIDString;
}

export interface GetCircleRetentionPayloadData {
  circle?: {
    id: UUIDString;
    type: string;
    status: string;
    retentionDueAt?: TimestampString | null;
    purgeAt?: TimestampString | null;
    imageStoragePath?: string | null;
  } & Circle_Key;
    receipts: ({
      id: UUIDString;
      imageStoragePath: string;
    } & Receipt_Key)[];
      circleMemberships: ({
        receiptStoragePath?: string | null;
      })[];
        asoEbiTiers: ({
          fabricImageStoragePath?: string | null;
          appreciationGiftImageStoragePath?: string | null;
        })[];
          retentionPurgeAttempts: ({
            attemptNumber: number;
            status: string;
            startedAt: TimestampString;
            nextRetryAt?: TimestampString | null;
          })[];
            invitations: ({
              id: UUIDString;
            } & Invitation_Key)[];
}

export interface GetCircleRetentionPayloadVariables {
  circleId: UUIDString;
}

export interface GetConsumedAuthChallengeData {
  consumedAuthChallenge?: {
    challengeHash: string;
  } & ConsumedAuthChallenge_Key;
}

export interface GetConsumedAuthChallengeVariables {
  challengeHash: string;
}

export interface GetContributionWorkspaceData {
  circle?: {
    id: UUIDString;
    name: string;
    type: string;
    targetAmount: number;
    contributedAmount: number;
    status: string;
    creator: {
      id: string;
    } & User_Key;
  } & Circle_Key;
    circleMemberships: ({
      role: string;
      membershipStatus: string;
      contributionStatus: string;
      expectedAmount: number;
      confirmedAmount: number;
      user: {
        id: string;
        displayName: string;
        profileImage?: string | null;
      } & User_Key;
    })[];
      receipts: ({
        id: UUIDString;
        amount: number;
        note?: string | null;
        imageUrl: string;
        imageStoragePath: string;
        contentType: string;
        status: string;
        overpaymentAmount: number;
        replacementOfId?: UUIDString | null;
        rejectionReason?: string | null;
        submittedAt: TimestampString;
        reviewedAt?: TimestampString | null;
        uploadedBy: {
          id: string;
          displayName: string;
        } & User_Key;
          reviewedBy?: {
            id: string;
            displayName: string;
          } & User_Key;
      } & Receipt_Key)[];
}

export interface GetContributionWorkspaceVariables {
  circleId: UUIDString;
}

export interface GetCurrentUserData {
  user?: {
    id: string;
    displayName: string;
    phone?: string | null;
    email?: string | null;
    profileImage?: string | null;
    termsAcceptedAt?: TimestampString | null;
    privacyAcceptedAt?: TimestampString | null;
    createdAt: TimestampString;
  } & User_Key;
}

export interface GetDashboardCirclesData {
  circleMemberships: ({
    role: string;
    membershipStatus: string;
    user: {
      id: string;
    } & User_Key;
      circle: {
        id: UUIDString;
        name: string;
        type: string;
        imageUrl?: string | null;
        targetAmount: number;
        contributedAmount: number;
        showTargetToMembers: boolean;
        showConfirmedTotalToMembers: boolean;
        memberCount: number;
        memberLimit: number;
        deadline?: DateString | null;
        eventDate?: DateString | null;
        status: string;
        createdAt: TimestampString;
        updatedAt: TimestampString;
        creator: {
          id: string;
        } & User_Key;
      } & Circle_Key;
  })[];
}

export interface GetDeadlineNotificationCandidatesData {
  circles: ({
    id: UUIDString;
    name: string;
    type: string;
    deadline?: DateString | null;
  } & Circle_Key)[];
}

export interface GetDeadlineNotificationCandidatesVariables {
  from: DateString;
  to: DateString;
}

export interface GetGiftCircleDetailData {
  circle?: {
    id: UUIDString;
    name: string;
    type: string;
    description: string;
    imageUrl?: string | null;
    imageStoragePath?: string | null;
    giftTitle?: string | null;
    contributionMode?: string | null;
    paymentBankName?: string | null;
    paymentAccountName?: string | null;
    paymentAccountNumber?: string | null;
    targetAmount: number;
    contributedAmount: number;
    memberCount: number;
    memberLimit: number;
    pricingPlan: string;
    deadline?: DateString | null;
    status: string;
    completionType?: string | null;
    completedAt?: TimestampString | null;
    retentionDueAt?: TimestampString | null;
    archiveAt?: TimestampString | null;
    purgeAt?: TimestampString | null;
    creator: {
      id: string;
    } & User_Key;
  } & Circle_Key;
    circleMemberships: ({
      role: string;
      membershipStatus: string;
      contributionStatus: string;
      expectedAmount: number;
      pledgedAmount: number;
      confirmedAmount: number;
      receiptSubmittedAt?: TimestampString | null;
      user: {
        id: string;
        displayName: string;
        email?: string | null;
        profileImage?: string | null;
      } & User_Key;
    })[];
}

export interface GetGiftCircleDetailVariables {
  circleId: UUIDString;
}

export interface GetInvitationAcceptancesData {
  invitationAcceptances: ({
    status: string;
    createdAt: TimestampString;
    respondedAt?: TimestampString | null;
    user: {
      id: string;
      displayName: string;
      email?: string | null;
      phone?: string | null;
      profileImage?: string | null;
    } & User_Key;
  })[];
}

export interface GetInvitationAcceptancesVariables {
  invitationId: UUIDString;
}

export interface GetInvitationByTokenHashData {
  invitations: ({
    id: UUIDString;
    tokenHash: string;
    mode: string;
    recipientName?: string | null;
    recipientEmail?: string | null;
    recipientPhone?: string | null;
    expectedAmount: number;
    requireApproval: boolean;
    state: string;
    maxUses: number;
    useCount: number;
    expiresAt: TimestampString;
    openedAt?: TimestampString | null;
    acceptedAt?: TimestampString | null;
    revokedAt?: TimestampString | null;
    createdAt: TimestampString;
    updatedAt: TimestampString;
    circle: {
      id: UUIDString;
      name: string;
      type: string;
      description: string;
      imageUrl?: string | null;
      memberCount: number;
      memberLimit: number;
      status: string;
      requireCreatorApproval: boolean;
      contributionMode?: string | null;
      targetAmount: number;
      creator: {
        id: string;
        displayName: string;
      } & User_Key;
    } & Circle_Key;
      invitedBy: {
        id: string;
        displayName: string;
      } & User_Key;
        acceptedBy?: {
          id: string;
        } & User_Key;
  } & Invitation_Key)[];
}

export interface GetInvitationByTokenHashVariables {
  tokenHash: string;
}

export interface GetNotificationContextData {
  circle?: {
    id: UUIDString;
    name: string;
    type: string;
    status: string;
    deadline?: DateString | null;
    creator: {
      id: string;
      displayName: string;
      email?: string | null;
      emailNotifications: boolean;
      commentNotifications: boolean;
      contributionReminders: boolean;
      circleUpdateNotifications: boolean;
    } & User_Key;
  } & Circle_Key;
    circleMemberships: ({
      role: string;
      notificationsMuted: boolean;
      expectedAmount: number;
      confirmedAmount: number;
      user: {
        id: string;
        displayName: string;
        email?: string | null;
        emailNotifications: boolean;
        commentNotifications: boolean;
        contributionReminders: boolean;
        circleUpdateNotifications: boolean;
      } & User_Key;
    })[];
}

export interface GetNotificationContextVariables {
  circleId: UUIDString;
}

export interface GetNotificationDedupeData {
  notifications: ({
    id: UUIDString;
  } & Notification_Key)[];
}

export interface GetNotificationDedupeVariables {
  recipientId: string;
  dedupeKey: string;
}

export interface GetOpenCommentReportsByReporterData {
  commentReports: ({
    id: UUIDString;
  } & CommentReport_Key)[];
}

export interface GetOpenCommentReportsByReporterVariables {
  commentId: UUIDString;
  reporterId: string;
}

export interface GetOwnerAdministratorData {
  ownerAdministrators: ({
    role: string;
    status: string;
    user: {
      id: string;
      displayName: string;
      email?: string | null;
      accountStatus: string;
    } & User_Key;
  })[];
}

export interface GetOwnerAdministratorVariables {
  userId: string;
}

export interface GetOwnerInvitationData {
  invitation?: {
    id: UUIDString;
    state: string;
    expiresAt: TimestampString;
    circle: {
      id: UUIDString;
    } & Circle_Key;
  } & Invitation_Key;
}

export interface GetOwnerInvitationVariables {
  invitationId: UUIDString;
}

export interface GetOwnerOperationalExportData {
  circles: ({
    id: UUIDString;
    type: string;
    status: string;
    pricingPlan: string;
    memberCount: number;
    createdAt: TimestampString;
    completedAt?: TimestampString | null;
    retentionDueAt?: TimestampString | null;
    purgeAt?: TimestampString | null;
  } & Circle_Key)[];
    commentReports: ({
      id: UUIDString;
      reason: string;
      status: string;
      createdAt: TimestampString;
      circle: {
        id: UUIDString;
        type: string;
      } & Circle_Key;
    } & CommentReport_Key)[];
      retentionPurgeAttempts: ({
        id: UUIDString;
        status: string;
        attemptNumber: number;
        deletedFileCount: number;
        skippedSharedFileCount: number;
        failureReason?: string | null;
        startedAt: TimestampString;
        completedAt?: TimestampString | null;
        circle: {
          id: UUIDString;
          type: string;
        } & Circle_Key;
      } & RetentionPurgeAttempt_Key)[];
}

export interface GetOwnerPlatformOverviewData {
  totalUsers: ({
    _count: number;
  })[];
    usersByStatus: ({
      accountStatus: string;
      _count: number;
    })[];
      totalCircles: ({
        _count: number;
      })[];
        circlesByType: ({
          type: string;
          _count: number;
        })[];
          circlesByStatus: ({
            status: string;
            _count: number;
          })[];
            circlesByPlan: ({
              pricingPlan: string;
              _count: number;
            })[];
              invitationTotals: ({
                _count: number;
                acceptedAt_count: number;
              })[];
                uploadOutcomes: ({
                  outcome: string;
                  _count: number;
                })[];
                  reportStatuses: ({
                    status: string;
                    _count: number;
                  })[];
                    authOutcomes: ({
                      outcome: string;
                      _count: number;
                    })[];
                      emailOutcomes: ({
                        status: string;
                        _count: number;
                      })[];
                        retentionCandidates: ({
                          _count: number;
                        })[];
                          retentionAttempts: ({
                            id: UUIDString;
                            status: string;
                            attemptNumber: number;
                            deletedFileCount: number;
                            skippedSharedFileCount: number;
                            failureReason?: string | null;
                            nextRetryAt?: TimestampString | null;
                            startedAt: TimestampString;
                            completedAt?: TimestampString | null;
                            circle: {
                              id: UUIDString;
                              type: string;
                              status: string;
                              retentionDueAt?: TimestampString | null;
                            } & Circle_Key;
                          } & RetentionPurgeAttempt_Key)[];
                            reportedComments: ({
                              id: UUIDString;
                              reason: string;
                              status: string;
                              createdAt: TimestampString;
                              reporter: {
                                id: string;
                                displayName: string;
                              } & User_Key;
                                comment: {
                                  id: UUIDString;
                                  status: string;
                                  author: {
                                    id: string;
                                    displayName: string;
                                    accountStatus: string;
                                  } & User_Key;
                                } & Comment_Key;
                                  circle: {
                                    id: UUIDString;
                                    name: string;
                                    type: string;
                                  } & Circle_Key;
                            } & CommentReport_Key)[];
                              activeInvitations: ({
                                id: UUIDString;
                                mode: string;
                                state: string;
                                useCount: number;
                                maxUses: number;
                                expiresAt: TimestampString;
                                createdAt: TimestampString;
                                circle: {
                                  id: UUIDString;
                                  name: string;
                                  type: string;
                                } & Circle_Key;
                                  invitedBy: {
                                    id: string;
                                    displayName: string;
                                  } & User_Key;
                              } & Invitation_Key)[];
                                recentAdminActions: ({
                                  id: UUIDString;
                                  action: string;
                                  targetType: string;
                                  targetId: string;
                                  purpose: string;
                                  outcome: string;
                                  metadata: string;
                                  createdAt: TimestampString;
                                  actor: {
                                    id: string;
                                    displayName: string;
                                  } & User_Key;
                                } & OwnerAdminAuditEvent_Key)[];
}

export interface GetOwnerReportReviewData {
  commentReport?: {
    id: UUIDString;
    reason: string;
    status: string;
    createdAt: TimestampString;
    reporter: {
      id: string;
      displayName: string;
    } & User_Key;
      comment: {
        id: UUIDString;
        body: string;
        status: string;
        createdAt: TimestampString;
        author: {
          id: string;
          displayName: string;
          accountStatus: string;
        } & User_Key;
      } & Comment_Key;
        circle: {
          id: UUIDString;
          name: string;
          type: string;
        } & Circle_Key;
  } & CommentReport_Key;
}

export interface GetOwnerReportReviewVariables {
  reportId: UUIDString;
}

export interface GetOwnerUserByIdentifierData {
  userById?: {
    id: string;
    displayName: string;
    email?: string | null;
    accountStatus: string;
    suspendedAt?: TimestampString | null;
  } & User_Key;
    usersByEmail: ({
      id: string;
      displayName: string;
      email?: string | null;
      accountStatus: string;
      suspendedAt?: TimestampString | null;
    } & User_Key)[];
}

export interface GetOwnerUserByIdentifierVariables {
  userId: string;
  email: string;
}

export interface GetRecentAbuseAttemptsData {
  abuseAttempts: ({
    id: UUIDString;
    occurredAt: TimestampString;
  } & AbuseAttempt_Key)[];
}

export interface GetRecentAbuseAttemptsVariables {
  bucketKey: string;
  since: TimestampString;
}

export interface GetRecentCommentsByAuthorData {
  comments: ({
    createdAt: TimestampString;
  })[];
}

export interface GetRecentCommentsByAuthorVariables {
  circleId: UUIDString;
  authorId: string;
  since: TimestampString;
}

export interface GetRecentReminderNotificationsData {
  notifications: ({
    id: UUIDString;
  } & Notification_Key)[];
}

export interface GetRecentReminderNotificationsVariables {
  circleId: UUIDString;
  recipientId: string;
  since: TimestampString;
}

export interface GetRetentionCandidatesData {
  circles: ({
    id: UUIDString;
    retentionDueAt?: TimestampString | null;
  } & Circle_Key)[];
}

export interface GetRetentionCandidatesVariables {
  now: TimestampString;
}

export interface GetStoragePathReferencesData {
  circles: ({
    id: UUIDString;
  } & Circle_Key)[];
    receipts: ({
      id: UUIDString;
      circle: {
        id: UUIDString;
      } & Circle_Key;
    } & Receipt_Key)[];
      circleMemberships: ({
        circle: {
          id: UUIDString;
        } & Circle_Key;
      })[];
        fabricReferences: ({
          id: UUIDString;
          circle: {
            id: UUIDString;
          } & Circle_Key;
        } & AsoEbiTier_Key)[];
          giftReferences: ({
            id: UUIDString;
            circle: {
              id: UUIDString;
            } & Circle_Key;
          } & AsoEbiTier_Key)[];
}

export interface GetStoragePathReferencesVariables {
  path: string;
}

export interface GetSupportCircleDetailData {
  circle?: {
    id: UUIDString;
    name: string;
    type: string;
    description: string;
    imageUrl?: string | null;
    imageStoragePath?: string | null;
    supportType?: string | null;
    beneficiaryName?: string | null;
    beneficiaryRelationship?: string | null;
    showBeneficiaryName: boolean;
    showTargetToMembers: boolean;
    showConfirmedTotalToMembers: boolean;
    hideIndividualAmounts: boolean;
    requireCreatorApproval: boolean;
    completionType?: string | null;
    contributionMode?: string | null;
    paymentBankName?: string | null;
    paymentAccountName?: string | null;
    paymentAccountNumber?: string | null;
    targetAmount: number;
    contributedAmount: number;
    memberCount: number;
    memberLimit: number;
    pricingPlan: string;
    deadline?: DateString | null;
    status: string;
    completedAt?: TimestampString | null;
    retentionDueAt?: TimestampString | null;
    archiveAt?: TimestampString | null;
    purgeAt?: TimestampString | null;
    creator: {
      id: string;
    } & User_Key;
  } & Circle_Key;
    circleMemberships: ({
      role: string;
      membershipStatus: string;
      contributionStatus: string;
      expectedAmount: number;
      pledgedAmount: number;
      confirmedAmount: number;
      user: {
        id: string;
        displayName: string;
        email?: string | null;
        profileImage?: string | null;
      } & User_Key;
    })[];
      supportUpdates: ({
        id: UUIDString;
        body: string;
        createdAt: TimestampString;
        author: {
          id: string;
          displayName: string;
        } & User_Key;
      } & SupportUpdate_Key)[];
}

export interface GetSupportCircleDetailVariables {
  circleId: UUIDString;
}

export interface GetUserAccountStatusData {
  user?: {
    id: string;
    accountStatus: string;
  } & User_Key;
}

export interface GetUserAccountStatusVariables {
  userId: string;
}

export interface GetUserDeadlineNotificationCandidatesData {
  circleMemberships: ({
    circle: {
      id: UUIDString;
      name: string;
      status: string;
      deadline?: DateString | null;
    } & Circle_Key;
  })[];
}

export interface GetUserDeadlineNotificationCandidatesVariables {
  userId: string;
}

export interface GetUserNotificationsData {
  user?: {
    id: string;
    emailNotifications: boolean;
    browserPushNotifications: boolean;
    commentNotifications: boolean;
    contributionReminders: boolean;
    circleUpdateNotifications: boolean;
    marketingCommunication: boolean;
  } & User_Key;
    notifications: ({
      id: UUIDString;
      type: string;
      title: string;
      body: string;
      deepLink: string;
      readAt?: TimestampString | null;
      createdAt: TimestampString;
      circle?: {
        id: UUIDString;
        name: string;
        type: string;
      } & Circle_Key;
    } & Notification_Key)[];
      circleMemberships: ({
        notificationsMuted: boolean;
        membershipStatus: string;
        circle: {
          id: UUIDString;
          name: string;
          type: string;
        } & Circle_Key;
      })[];
}

export interface GetUserNotificationsVariables {
  userId: string;
}

export interface InvitationAcceptance_Key {
  invitationId: UUIDString;
  userId: string;
  __typename?: 'InvitationAcceptance_Key';
}

export interface Invitation_Key {
  id: UUIDString;
  __typename?: 'Invitation_Key';
}

export interface MarkAllNotificationsReadData {
  notification_updateMany: number;
}

export interface MarkAllNotificationsReadVariables {
  recipientId: string;
  readAt: TimestampString;
}

export interface MarkNotificationReadData {
  notification_updateMany: number;
}

export interface MarkNotificationReadVariables {
  notificationId: UUIDString;
  recipientId: string;
  readAt: TimestampString;
}

export interface ModerateCommentWithAuditData {
  comment_update?: Comment_Key | null;
  commentReport_updateMany: number;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface ModerateCommentWithAuditVariables {
  commentId: UUIDString;
  circleId: UUIDString;
  actorId: string;
  reason: string;
  moderatedAt: TimestampString;
}

export interface Notification_Key {
  id: UUIDString;
  __typename?: 'Notification_Key';
}

export interface OperationalEvent_Key {
  id: UUIDString;
  __typename?: 'OperationalEvent_Key';
}

export interface OwnerAdminAuditEvent_Key {
  id: UUIDString;
  __typename?: 'OwnerAdminAuditEvent_Key';
}

export interface OwnerAdministrator_Key {
  userId: string;
  __typename?: 'OwnerAdministrator_Key';
}

export interface ProvisionOwnerAccountData {
  user_upsert: User_Key;
  ownerAdministrator_upsert: OwnerAdministrator_Key;
}

export interface ProvisionOwnerAccountVariables {
  userId: string;
  displayName: string;
  email: string;
  createdAt: TimestampString;
}

export interface ProvisionOwnerAdministratorData {
  ownerAdministrator_upsert: OwnerAdministrator_Key;
}

export interface ProvisionOwnerAdministratorVariables {
  userId: string;
  createdAt: TimestampString;
}

export interface PurgeCircleSensitiveDataData {
  commentReport_deleteMany: number;
  comment_deleteMany: number;
  announcement_deleteMany: number;
  supportUpdate_deleteMany: number;
  receipt_deleteMany: number;
  invitation_deleteMany: number;
  notification_deleteMany: number;
  circleMembership_deleteMany: number;
  asoEbiTier_deleteMany: number;
  circle_update?: Circle_Key | null;
}

export interface PurgeCircleSensitiveDataVariables {
  circleId: UUIDString;
  purgeAt: TimestampString;
}

export interface PurgeInvitationAcceptancesData {
  invitationAcceptance_deleteMany: number;
}

export interface PurgeInvitationAcceptancesVariables {
  invitationId: UUIDString;
}

export interface Receipt_Key {
  id: UUIDString;
  __typename?: 'Receipt_Key';
}

export interface RecordAbuseAttemptData {
  abuseAttempt_insert: AbuseAttempt_Key;
}

export interface RecordAbuseAttemptVariables {
  id: UUIDString;
  bucketKey: string;
  occurredAt: TimestampString;
}

export interface RecordOperationalEventData {
  operationalEvent_insert: OperationalEvent_Key;
}

export interface RecordOperationalEventVariables {
  category: string;
  eventType: string;
  outcome: string;
  reasonCode?: string | null;
  circleId?: UUIDString | null;
  createdAt: TimestampString;
}

export interface RecordOwnerAdminAuditData {
  ownerAdminAuditEvent_insert: OwnerAdminAuditEvent_Key;
}

export interface RecordOwnerAdminAuditVariables {
  actorId: string;
  action: string;
  targetType: string;
  targetId: string;
  purpose: string;
  outcome: string;
  metadata: string;
  createdAt: TimestampString;
}

export interface RecordSupportPledgeData {
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface RecordSupportPledgeVariables {
  circleId: UUIDString;
  memberId: string;
  amount: number;
  updatedAt: TimestampString;
}

export interface RecordSystemActivityData {
  activityLog_insert: ActivityLog_Key;
}

export interface RecordSystemActivityVariables {
  activityId: UUIDString;
  circleId: UUIDString;
  actorId: string;
  eventType: string;
  entityId: string;
  metadata: string;
  createdAt: TimestampString;
}

export interface ReplaceReceiptWithAuditData {
  receipt_update?: Receipt_Key | null;
  receipt_insert: Receipt_Key;
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}

export interface ReplaceReceiptWithAuditVariables {
  receiptId: UUIDString;
  replacedReceiptId: UUIDString;
  circleId: UUIDString;
  uploaderId: string;
  amount: number;
  note?: string | null;
  imageUrl: string;
  imageStoragePath: string;
  contentType: string;
  status: string;
  overpaymentAmount: number;
  submittedAt: TimestampString;
}

export interface ReportCommentWithAuditData {
  commentReport_insert: CommentReport_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface ReportCommentWithAuditVariables {
  reportId: UUIDString;
  commentId: UUIDString;
  commentEntityId: string;
  circleId: UUIDString;
  reporterId: string;
  reason: string;
  createdAt: TimestampString;
}

export interface RequestInvitationApprovalData {
  invitationAcceptance_insert: InvitationAcceptance_Key;
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface RequestInvitationApprovalVariables {
  invitationId: UUIDString;
  circleId: UUIDString;
  userId: string;
  respondedAt: TimestampString;
}

export interface RequestReplacementInvitationData {
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface RequestReplacementInvitationVariables {
  invitationId: UUIDString;
  circleId: UUIDString;
  actorId: string;
  requestedAt: TimestampString;
}

export interface ResolveOwnerCommentReportData {
  commentReport_update?: CommentReport_Key | null;
  comment_update?: Comment_Key | null;
}

export interface ResolveOwnerCommentReportVariables {
  reportId: UUIDString;
  reportStatus: string;
  commentId: UUIDString;
  commentStatus: string;
  deletionReason?: string | null;
  updatedAt: TimestampString;
}

export interface RetentionPurgeAttempt_Key {
  id: UUIDString;
  __typename?: 'RetentionPurgeAttempt_Key';
}

export interface ReviewReceiptWithAuditData {
  receipt_update?: Receipt_Key | null;
  circleMembership_update?: CircleMembership_Key | null;
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}

export interface ReviewReceiptWithAuditVariables {
  receiptId: UUIDString;
  circleId: UUIDString;
  uploaderId: string;
  reviewerId: string;
  receiptStatus: string;
  rejectionReason?: string | null;
  reviewedAt: TimestampString;
  membershipStatus: string;
  nextConfirmedAmount: number;
  nextCircleContributedAmount: number;
  auditAction: string;
  materialChanges: string;
}

export interface RevokeCompromisedInvitationData {
  invitation_update?: Invitation_Key | null;
}

export interface RevokeCompromisedInvitationVariables {
  invitationId: UUIDString;
  revokedAt: TimestampString;
}

export interface SelectAsoEbiTierData {
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}

export interface SelectAsoEbiTierVariables {
  circleId: UUIDString;
  memberId: string;
  tierId: UUIDString;
  expectedAmount: number;
  updatedAt: TimestampString;
}

export interface SetCircleCommentsWithAuditData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface SetCircleCommentsWithAuditVariables {
  circleId: UUIDString;
  actorId: string;
  commentsEnabled: boolean;
  materialChanges: string;
  updatedAt: TimestampString;
}

export interface SetCircleCompletionTypeWithAuditData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface SetCircleCompletionTypeWithAuditVariables {
  circleId: UUIDString;
  actorId: string;
  completionType: string;
  updatedAt: TimestampString;
}

export interface SetCircleNotificationMuteData {
  circleMembership_update?: CircleMembership_Key | null;
}

export interface SetCircleNotificationMuteVariables {
  circleId: UUIDString;
  userId: string;
  notificationsMuted: boolean;
}

export interface SetGiftMemberAllocationData {
  circleMembership_update?: CircleMembership_Key | null;
}

export interface SetGiftMemberAllocationVariables {
  circleId: UUIDString;
  memberId: string;
  expectedAmount: number;
  contributionStatus: string;
}

export interface SetSupportCompletionTypeData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface SetSupportCompletionTypeVariables {
  circleId: UUIDString;
  actorId: string;
  completionType: string;
  updatedAt: TimestampString;
}

export interface SetSupportMemberAllocationData {
  circleMembership_update?: CircleMembership_Key | null;
}

export interface SetSupportMemberAllocationVariables {
  circleId: UUIDString;
  memberId: string;
  expectedAmount: number;
  contributionStatus: string;
}

export interface SubmitReceiptWithAuditData {
  receipt_insert: Receipt_Key;
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}

export interface SubmitReceiptWithAuditVariables {
  receiptId: UUIDString;
  circleId: UUIDString;
  uploaderId: string;
  amount: number;
  note?: string | null;
  imageUrl: string;
  imageStoragePath: string;
  contentType: string;
  status: string;
  overpaymentAmount: number;
  submittedAt: TimestampString;
}

export interface SupportUpdate_Key {
  id: UUIDString;
  __typename?: 'SupportUpdate_Key';
}

export interface SuspendOwnerTargetUserData {
  user_update?: User_Key | null;
}

export interface SuspendOwnerTargetUserVariables {
  userId: string;
  reasonCode: string;
  suspendedAt: TimestampString;
}

export interface TransitionCircleWithAuditData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}

export interface TransitionCircleWithAuditVariables {
  circleId: UUIDString;
  actorId: string;
  fromStatus: string;
  toStatus: string;
  updatedAt: TimestampString;
  completedAt?: TimestampString | null;
  retentionDueAt?: TimestampString | null;
  archiveAt?: TimestampString | null;
  purgeAt?: TimestampString | null;
}

export interface UpdateAnnouncementWithAuditData {
  announcement_update?: Announcement_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface UpdateAnnouncementWithAuditVariables {
  announcementId: UUIDString;
  circleId: UUIDString;
  actorId: string;
  title: string;
  body: string;
  pinned: boolean;
  important?: boolean;
  commentsEnabled: boolean;
  updatedAt: TimestampString;
  materialChanges: string;
}

export interface UpdateAsoEbiFulfilmentData {
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}

export interface UpdateAsoEbiFulfilmentVariables {
  circleId: UUIDString;
  actorId: string;
  memberId: string;
  status: string;
  updatedAt: TimestampString;
}

export interface UpdateCircleConfigurationWithAuditData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface UpdateCircleConfigurationWithAuditVariables {
  circleId: UUIDString;
  actorId: string;
  action: string;
  status: string;
  name: string;
  description: string;
  targetAmount: number;
  pricingPlan: string;
  memberLimit: number;
  activationPrice: number;
  deadline?: DateString | null;
  eventDate?: DateString | null;
  visibility: string;
  updatedAt: TimestampString;
  materialChanges: string;
}

export interface UpdateInvitationStateData {
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface UpdateInvitationStateVariables {
  invitationId: UUIDString;
  actorId: string;
  circleId: UUIDString;
  state: string;
  openedAt?: TimestampString | null;
  revokedAt?: TimestampString | null;
  updatedAt: TimestampString;
}

export interface UpdateNotificationPreferencesData {
  user_update?: User_Key | null;
}

export interface UpdateNotificationPreferencesVariables {
  userId: string;
  emailNotifications: boolean;
  browserPushNotifications: boolean;
  commentNotifications: boolean;
  contributionReminders: boolean;
  circleUpdateNotifications: boolean;
  marketingCommunication: boolean;
}

export interface UpsertCurrentUserData {
  user_upsert: User_Key;
}

export interface UpsertCurrentUserVariables {
  displayName: string;
  phone?: string | null;
  email?: string | null;
  profileImage?: string | null;
  termsAcceptedAt?: TimestampString | null;
  privacyAcceptedAt?: TimestampString | null;
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface GetCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
  operationName: string;
}
export const getCurrentUserRef: GetCurrentUserRef;

export function getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;
export function getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetRecentAbuseAttemptsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRecentAbuseAttemptsVariables): QueryRef<GetRecentAbuseAttemptsData, GetRecentAbuseAttemptsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetRecentAbuseAttemptsVariables): QueryRef<GetRecentAbuseAttemptsData, GetRecentAbuseAttemptsVariables>;
  operationName: string;
}
export const getRecentAbuseAttemptsRef: GetRecentAbuseAttemptsRef;

export function getRecentAbuseAttempts(vars: GetRecentAbuseAttemptsVariables, options?: ExecuteQueryOptions): QueryPromise<GetRecentAbuseAttemptsData, GetRecentAbuseAttemptsVariables>;
export function getRecentAbuseAttempts(dc: DataConnect, vars: GetRecentAbuseAttemptsVariables, options?: ExecuteQueryOptions): QueryPromise<GetRecentAbuseAttemptsData, GetRecentAbuseAttemptsVariables>;

interface RecordAbuseAttemptRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordAbuseAttemptVariables): MutationRef<RecordAbuseAttemptData, RecordAbuseAttemptVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordAbuseAttemptVariables): MutationRef<RecordAbuseAttemptData, RecordAbuseAttemptVariables>;
  operationName: string;
}
export const recordAbuseAttemptRef: RecordAbuseAttemptRef;

export function recordAbuseAttempt(vars: RecordAbuseAttemptVariables): MutationPromise<RecordAbuseAttemptData, RecordAbuseAttemptVariables>;
export function recordAbuseAttempt(dc: DataConnect, vars: RecordAbuseAttemptVariables): MutationPromise<RecordAbuseAttemptData, RecordAbuseAttemptVariables>;

interface GetConsumedAuthChallengeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetConsumedAuthChallengeVariables): QueryRef<GetConsumedAuthChallengeData, GetConsumedAuthChallengeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetConsumedAuthChallengeVariables): QueryRef<GetConsumedAuthChallengeData, GetConsumedAuthChallengeVariables>;
  operationName: string;
}
export const getConsumedAuthChallengeRef: GetConsumedAuthChallengeRef;

export function getConsumedAuthChallenge(vars: GetConsumedAuthChallengeVariables, options?: ExecuteQueryOptions): QueryPromise<GetConsumedAuthChallengeData, GetConsumedAuthChallengeVariables>;
export function getConsumedAuthChallenge(dc: DataConnect, vars: GetConsumedAuthChallengeVariables, options?: ExecuteQueryOptions): QueryPromise<GetConsumedAuthChallengeData, GetConsumedAuthChallengeVariables>;

interface ConsumeAuthChallengeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ConsumeAuthChallengeVariables): MutationRef<ConsumeAuthChallengeData, ConsumeAuthChallengeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ConsumeAuthChallengeVariables): MutationRef<ConsumeAuthChallengeData, ConsumeAuthChallengeVariables>;
  operationName: string;
}
export const consumeAuthChallengeRef: ConsumeAuthChallengeRef;

export function consumeAuthChallenge(vars: ConsumeAuthChallengeVariables): MutationPromise<ConsumeAuthChallengeData, ConsumeAuthChallengeVariables>;
export function consumeAuthChallenge(dc: DataConnect, vars: ConsumeAuthChallengeVariables): MutationPromise<ConsumeAuthChallengeData, ConsumeAuthChallengeVariables>;

interface UpsertCurrentUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCurrentUserVariables): MutationRef<UpsertCurrentUserData, UpsertCurrentUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpsertCurrentUserVariables): MutationRef<UpsertCurrentUserData, UpsertCurrentUserVariables>;
  operationName: string;
}
export const upsertCurrentUserRef: UpsertCurrentUserRef;

export function upsertCurrentUser(vars: UpsertCurrentUserVariables): MutationPromise<UpsertCurrentUserData, UpsertCurrentUserVariables>;
export function upsertCurrentUser(dc: DataConnect, vars: UpsertCurrentUserVariables): MutationPromise<UpsertCurrentUserData, UpsertCurrentUserVariables>;

interface GetDashboardCirclesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetDashboardCirclesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetDashboardCirclesData, undefined>;
  operationName: string;
}
export const getDashboardCirclesRef: GetDashboardCirclesRef;

export function getDashboardCircles(options?: ExecuteQueryOptions): QueryPromise<GetDashboardCirclesData, undefined>;
export function getDashboardCircles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetDashboardCirclesData, undefined>;

interface GetCircleEngineRecordRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCircleEngineRecordVariables): QueryRef<GetCircleEngineRecordData, GetCircleEngineRecordVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCircleEngineRecordVariables): QueryRef<GetCircleEngineRecordData, GetCircleEngineRecordVariables>;
  operationName: string;
}
export const getCircleEngineRecordRef: GetCircleEngineRecordRef;

export function getCircleEngineRecord(vars: GetCircleEngineRecordVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleEngineRecordData, GetCircleEngineRecordVariables>;
export function getCircleEngineRecord(dc: DataConnect, vars: GetCircleEngineRecordVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleEngineRecordData, GetCircleEngineRecordVariables>;

interface GetCircleLifecycleSummaryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCircleLifecycleSummaryVariables): QueryRef<GetCircleLifecycleSummaryData, GetCircleLifecycleSummaryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCircleLifecycleSummaryVariables): QueryRef<GetCircleLifecycleSummaryData, GetCircleLifecycleSummaryVariables>;
  operationName: string;
}
export const getCircleLifecycleSummaryRef: GetCircleLifecycleSummaryRef;

export function getCircleLifecycleSummary(vars: GetCircleLifecycleSummaryVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleLifecycleSummaryData, GetCircleLifecycleSummaryVariables>;
export function getCircleLifecycleSummary(dc: DataConnect, vars: GetCircleLifecycleSummaryVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleLifecycleSummaryData, GetCircleLifecycleSummaryVariables>;

interface FindUserByEmailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: FindUserByEmailVariables): QueryRef<FindUserByEmailData, FindUserByEmailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: FindUserByEmailVariables): QueryRef<FindUserByEmailData, FindUserByEmailVariables>;
  operationName: string;
}
export const findUserByEmailRef: FindUserByEmailRef;

export function findUserByEmail(vars: FindUserByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<FindUserByEmailData, FindUserByEmailVariables>;
export function findUserByEmail(dc: DataConnect, vars: FindUserByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<FindUserByEmailData, FindUserByEmailVariables>;

interface GetGiftCircleDetailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGiftCircleDetailVariables): QueryRef<GetGiftCircleDetailData, GetGiftCircleDetailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetGiftCircleDetailVariables): QueryRef<GetGiftCircleDetailData, GetGiftCircleDetailVariables>;
  operationName: string;
}
export const getGiftCircleDetailRef: GetGiftCircleDetailRef;

export function getGiftCircleDetail(vars: GetGiftCircleDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetGiftCircleDetailData, GetGiftCircleDetailVariables>;
export function getGiftCircleDetail(dc: DataConnect, vars: GetGiftCircleDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetGiftCircleDetailData, GetGiftCircleDetailVariables>;

interface GetCircleAuditEntriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCircleAuditEntriesVariables): QueryRef<GetCircleAuditEntriesData, GetCircleAuditEntriesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCircleAuditEntriesVariables): QueryRef<GetCircleAuditEntriesData, GetCircleAuditEntriesVariables>;
  operationName: string;
}
export const getCircleAuditEntriesRef: GetCircleAuditEntriesRef;

export function getCircleAuditEntries(vars: GetCircleAuditEntriesVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleAuditEntriesData, GetCircleAuditEntriesVariables>;
export function getCircleAuditEntries(dc: DataConnect, vars: GetCircleAuditEntriesVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleAuditEntriesData, GetCircleAuditEntriesVariables>;

interface CreateCircleDraftRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCircleDraftVariables): MutationRef<CreateCircleDraftData, CreateCircleDraftVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCircleDraftVariables): MutationRef<CreateCircleDraftData, CreateCircleDraftVariables>;
  operationName: string;
}
export const createCircleDraftRef: CreateCircleDraftRef;

export function createCircleDraft(vars: CreateCircleDraftVariables): MutationPromise<CreateCircleDraftData, CreateCircleDraftVariables>;
export function createCircleDraft(dc: DataConnect, vars: CreateCircleDraftVariables): MutationPromise<CreateCircleDraftData, CreateCircleDraftVariables>;

interface UpdateCircleConfigurationWithAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCircleConfigurationWithAuditVariables): MutationRef<UpdateCircleConfigurationWithAuditData, UpdateCircleConfigurationWithAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCircleConfigurationWithAuditVariables): MutationRef<UpdateCircleConfigurationWithAuditData, UpdateCircleConfigurationWithAuditVariables>;
  operationName: string;
}
export const updateCircleConfigurationWithAuditRef: UpdateCircleConfigurationWithAuditRef;

export function updateCircleConfigurationWithAudit(vars: UpdateCircleConfigurationWithAuditVariables): MutationPromise<UpdateCircleConfigurationWithAuditData, UpdateCircleConfigurationWithAuditVariables>;
export function updateCircleConfigurationWithAudit(dc: DataConnect, vars: UpdateCircleConfigurationWithAuditVariables): MutationPromise<UpdateCircleConfigurationWithAuditData, UpdateCircleConfigurationWithAuditVariables>;

interface TransitionCircleWithAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: TransitionCircleWithAuditVariables): MutationRef<TransitionCircleWithAuditData, TransitionCircleWithAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: TransitionCircleWithAuditVariables): MutationRef<TransitionCircleWithAuditData, TransitionCircleWithAuditVariables>;
  operationName: string;
}
export const transitionCircleWithAuditRef: TransitionCircleWithAuditRef;

export function transitionCircleWithAudit(vars: TransitionCircleWithAuditVariables): MutationPromise<TransitionCircleWithAuditData, TransitionCircleWithAuditVariables>;
export function transitionCircleWithAudit(dc: DataConnect, vars: TransitionCircleWithAuditVariables): MutationPromise<TransitionCircleWithAuditData, TransitionCircleWithAuditVariables>;

interface SetCircleCompletionTypeWithAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetCircleCompletionTypeWithAuditVariables): MutationRef<SetCircleCompletionTypeWithAuditData, SetCircleCompletionTypeWithAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetCircleCompletionTypeWithAuditVariables): MutationRef<SetCircleCompletionTypeWithAuditData, SetCircleCompletionTypeWithAuditVariables>;
  operationName: string;
}
export const setCircleCompletionTypeWithAuditRef: SetCircleCompletionTypeWithAuditRef;

export function setCircleCompletionTypeWithAudit(vars: SetCircleCompletionTypeWithAuditVariables): MutationPromise<SetCircleCompletionTypeWithAuditData, SetCircleCompletionTypeWithAuditVariables>;
export function setCircleCompletionTypeWithAudit(dc: DataConnect, vars: SetCircleCompletionTypeWithAuditVariables): MutationPromise<SetCircleCompletionTypeWithAuditData, SetCircleCompletionTypeWithAuditVariables>;

interface AddCircleMemberWithAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddCircleMemberWithAuditVariables): MutationRef<AddCircleMemberWithAuditData, AddCircleMemberWithAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddCircleMemberWithAuditVariables): MutationRef<AddCircleMemberWithAuditData, AddCircleMemberWithAuditVariables>;
  operationName: string;
}
export const addCircleMemberWithAuditRef: AddCircleMemberWithAuditRef;

export function addCircleMemberWithAudit(vars: AddCircleMemberWithAuditVariables): MutationPromise<AddCircleMemberWithAuditData, AddCircleMemberWithAuditVariables>;
export function addCircleMemberWithAudit(dc: DataConnect, vars: AddCircleMemberWithAuditVariables): MutationPromise<AddCircleMemberWithAuditData, AddCircleMemberWithAuditVariables>;

interface ConfigureGiftCircleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ConfigureGiftCircleVariables): MutationRef<ConfigureGiftCircleData, ConfigureGiftCircleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ConfigureGiftCircleVariables): MutationRef<ConfigureGiftCircleData, ConfigureGiftCircleVariables>;
  operationName: string;
}
export const configureGiftCircleRef: ConfigureGiftCircleRef;

export function configureGiftCircle(vars: ConfigureGiftCircleVariables): MutationPromise<ConfigureGiftCircleData, ConfigureGiftCircleVariables>;
export function configureGiftCircle(dc: DataConnect, vars: ConfigureGiftCircleVariables): MutationPromise<ConfigureGiftCircleData, ConfigureGiftCircleVariables>;

interface SetGiftMemberAllocationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetGiftMemberAllocationVariables): MutationRef<SetGiftMemberAllocationData, SetGiftMemberAllocationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetGiftMemberAllocationVariables): MutationRef<SetGiftMemberAllocationData, SetGiftMemberAllocationVariables>;
  operationName: string;
}
export const setGiftMemberAllocationRef: SetGiftMemberAllocationRef;

export function setGiftMemberAllocation(vars: SetGiftMemberAllocationVariables): MutationPromise<SetGiftMemberAllocationData, SetGiftMemberAllocationVariables>;
export function setGiftMemberAllocation(dc: DataConnect, vars: SetGiftMemberAllocationVariables): MutationPromise<SetGiftMemberAllocationData, SetGiftMemberAllocationVariables>;

interface GetAsoEbiCircleDetailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAsoEbiCircleDetailVariables): QueryRef<GetAsoEbiCircleDetailData, GetAsoEbiCircleDetailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetAsoEbiCircleDetailVariables): QueryRef<GetAsoEbiCircleDetailData, GetAsoEbiCircleDetailVariables>;
  operationName: string;
}
export const getAsoEbiCircleDetailRef: GetAsoEbiCircleDetailRef;

export function getAsoEbiCircleDetail(vars: GetAsoEbiCircleDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetAsoEbiCircleDetailData, GetAsoEbiCircleDetailVariables>;
export function getAsoEbiCircleDetail(dc: DataConnect, vars: GetAsoEbiCircleDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetAsoEbiCircleDetailData, GetAsoEbiCircleDetailVariables>;

interface ConfigureAsoEbiCircleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ConfigureAsoEbiCircleVariables): MutationRef<ConfigureAsoEbiCircleData, ConfigureAsoEbiCircleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ConfigureAsoEbiCircleVariables): MutationRef<ConfigureAsoEbiCircleData, ConfigureAsoEbiCircleVariables>;
  operationName: string;
}
export const configureAsoEbiCircleRef: ConfigureAsoEbiCircleRef;

export function configureAsoEbiCircle(vars: ConfigureAsoEbiCircleVariables): MutationPromise<ConfigureAsoEbiCircleData, ConfigureAsoEbiCircleVariables>;
export function configureAsoEbiCircle(dc: DataConnect, vars: ConfigureAsoEbiCircleVariables): MutationPromise<ConfigureAsoEbiCircleData, ConfigureAsoEbiCircleVariables>;

interface CreateAsoEbiTierRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAsoEbiTierVariables): MutationRef<CreateAsoEbiTierData, CreateAsoEbiTierVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAsoEbiTierVariables): MutationRef<CreateAsoEbiTierData, CreateAsoEbiTierVariables>;
  operationName: string;
}
export const createAsoEbiTierRef: CreateAsoEbiTierRef;

export function createAsoEbiTier(vars: CreateAsoEbiTierVariables): MutationPromise<CreateAsoEbiTierData, CreateAsoEbiTierVariables>;
export function createAsoEbiTier(dc: DataConnect, vars: CreateAsoEbiTierVariables): MutationPromise<CreateAsoEbiTierData, CreateAsoEbiTierVariables>;

interface SelectAsoEbiTierRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SelectAsoEbiTierVariables): MutationRef<SelectAsoEbiTierData, SelectAsoEbiTierVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SelectAsoEbiTierVariables): MutationRef<SelectAsoEbiTierData, SelectAsoEbiTierVariables>;
  operationName: string;
}
export const selectAsoEbiTierRef: SelectAsoEbiTierRef;

export function selectAsoEbiTier(vars: SelectAsoEbiTierVariables): MutationPromise<SelectAsoEbiTierData, SelectAsoEbiTierVariables>;
export function selectAsoEbiTier(dc: DataConnect, vars: SelectAsoEbiTierVariables): MutationPromise<SelectAsoEbiTierData, SelectAsoEbiTierVariables>;

interface UpdateAsoEbiFulfilmentRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAsoEbiFulfilmentVariables): MutationRef<UpdateAsoEbiFulfilmentData, UpdateAsoEbiFulfilmentVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAsoEbiFulfilmentVariables): MutationRef<UpdateAsoEbiFulfilmentData, UpdateAsoEbiFulfilmentVariables>;
  operationName: string;
}
export const updateAsoEbiFulfilmentRef: UpdateAsoEbiFulfilmentRef;

export function updateAsoEbiFulfilment(vars: UpdateAsoEbiFulfilmentVariables): MutationPromise<UpdateAsoEbiFulfilmentData, UpdateAsoEbiFulfilmentVariables>;
export function updateAsoEbiFulfilment(dc: DataConnect, vars: UpdateAsoEbiFulfilmentVariables): MutationPromise<UpdateAsoEbiFulfilmentData, UpdateAsoEbiFulfilmentVariables>;

interface GetSupportCircleDetailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSupportCircleDetailVariables): QueryRef<GetSupportCircleDetailData, GetSupportCircleDetailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetSupportCircleDetailVariables): QueryRef<GetSupportCircleDetailData, GetSupportCircleDetailVariables>;
  operationName: string;
}
export const getSupportCircleDetailRef: GetSupportCircleDetailRef;

export function getSupportCircleDetail(vars: GetSupportCircleDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetSupportCircleDetailData, GetSupportCircleDetailVariables>;
export function getSupportCircleDetail(dc: DataConnect, vars: GetSupportCircleDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetSupportCircleDetailData, GetSupportCircleDetailVariables>;

interface ConfigureSupportCircleRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ConfigureSupportCircleVariables): MutationRef<ConfigureSupportCircleData, ConfigureSupportCircleVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ConfigureSupportCircleVariables): MutationRef<ConfigureSupportCircleData, ConfigureSupportCircleVariables>;
  operationName: string;
}
export const configureSupportCircleRef: ConfigureSupportCircleRef;

export function configureSupportCircle(vars: ConfigureSupportCircleVariables): MutationPromise<ConfigureSupportCircleData, ConfigureSupportCircleVariables>;
export function configureSupportCircle(dc: DataConnect, vars: ConfigureSupportCircleVariables): MutationPromise<ConfigureSupportCircleData, ConfigureSupportCircleVariables>;

interface RecordSupportPledgeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordSupportPledgeVariables): MutationRef<RecordSupportPledgeData, RecordSupportPledgeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordSupportPledgeVariables): MutationRef<RecordSupportPledgeData, RecordSupportPledgeVariables>;
  operationName: string;
}
export const recordSupportPledgeRef: RecordSupportPledgeRef;

export function recordSupportPledge(vars: RecordSupportPledgeVariables): MutationPromise<RecordSupportPledgeData, RecordSupportPledgeVariables>;
export function recordSupportPledge(dc: DataConnect, vars: RecordSupportPledgeVariables): MutationPromise<RecordSupportPledgeData, RecordSupportPledgeVariables>;

interface SetSupportMemberAllocationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetSupportMemberAllocationVariables): MutationRef<SetSupportMemberAllocationData, SetSupportMemberAllocationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetSupportMemberAllocationVariables): MutationRef<SetSupportMemberAllocationData, SetSupportMemberAllocationVariables>;
  operationName: string;
}
export const setSupportMemberAllocationRef: SetSupportMemberAllocationRef;

export function setSupportMemberAllocation(vars: SetSupportMemberAllocationVariables): MutationPromise<SetSupportMemberAllocationData, SetSupportMemberAllocationVariables>;
export function setSupportMemberAllocation(dc: DataConnect, vars: SetSupportMemberAllocationVariables): MutationPromise<SetSupportMemberAllocationData, SetSupportMemberAllocationVariables>;

interface CreateSupportUpdateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSupportUpdateVariables): MutationRef<CreateSupportUpdateData, CreateSupportUpdateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateSupportUpdateVariables): MutationRef<CreateSupportUpdateData, CreateSupportUpdateVariables>;
  operationName: string;
}
export const createSupportUpdateRef: CreateSupportUpdateRef;

export function createSupportUpdate(vars: CreateSupportUpdateVariables): MutationPromise<CreateSupportUpdateData, CreateSupportUpdateVariables>;
export function createSupportUpdate(dc: DataConnect, vars: CreateSupportUpdateVariables): MutationPromise<CreateSupportUpdateData, CreateSupportUpdateVariables>;

interface SetSupportCompletionTypeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetSupportCompletionTypeVariables): MutationRef<SetSupportCompletionTypeData, SetSupportCompletionTypeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetSupportCompletionTypeVariables): MutationRef<SetSupportCompletionTypeData, SetSupportCompletionTypeVariables>;
  operationName: string;
}
export const setSupportCompletionTypeRef: SetSupportCompletionTypeRef;

export function setSupportCompletionType(vars: SetSupportCompletionTypeVariables): MutationPromise<SetSupportCompletionTypeData, SetSupportCompletionTypeVariables>;
export function setSupportCompletionType(dc: DataConnect, vars: SetSupportCompletionTypeVariables): MutationPromise<SetSupportCompletionTypeData, SetSupportCompletionTypeVariables>;

interface GetInvitationByTokenHashRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInvitationByTokenHashVariables): QueryRef<GetInvitationByTokenHashData, GetInvitationByTokenHashVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetInvitationByTokenHashVariables): QueryRef<GetInvitationByTokenHashData, GetInvitationByTokenHashVariables>;
  operationName: string;
}
export const getInvitationByTokenHashRef: GetInvitationByTokenHashRef;

export function getInvitationByTokenHash(vars: GetInvitationByTokenHashVariables, options?: ExecuteQueryOptions): QueryPromise<GetInvitationByTokenHashData, GetInvitationByTokenHashVariables>;
export function getInvitationByTokenHash(dc: DataConnect, vars: GetInvitationByTokenHashVariables, options?: ExecuteQueryOptions): QueryPromise<GetInvitationByTokenHashData, GetInvitationByTokenHashVariables>;

interface GetCircleInvitationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCircleInvitationsVariables): QueryRef<GetCircleInvitationsData, GetCircleInvitationsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCircleInvitationsVariables): QueryRef<GetCircleInvitationsData, GetCircleInvitationsVariables>;
  operationName: string;
}
export const getCircleInvitationsRef: GetCircleInvitationsRef;

export function getCircleInvitations(vars: GetCircleInvitationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleInvitationsData, GetCircleInvitationsVariables>;
export function getCircleInvitations(dc: DataConnect, vars: GetCircleInvitationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleInvitationsData, GetCircleInvitationsVariables>;

interface GetInvitationAcceptancesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInvitationAcceptancesVariables): QueryRef<GetInvitationAcceptancesData, GetInvitationAcceptancesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetInvitationAcceptancesVariables): QueryRef<GetInvitationAcceptancesData, GetInvitationAcceptancesVariables>;
  operationName: string;
}
export const getInvitationAcceptancesRef: GetInvitationAcceptancesRef;

export function getInvitationAcceptances(vars: GetInvitationAcceptancesVariables, options?: ExecuteQueryOptions): QueryPromise<GetInvitationAcceptancesData, GetInvitationAcceptancesVariables>;
export function getInvitationAcceptances(dc: DataConnect, vars: GetInvitationAcceptancesVariables, options?: ExecuteQueryOptions): QueryPromise<GetInvitationAcceptancesData, GetInvitationAcceptancesVariables>;

interface CreateInvitationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInvitationVariables): MutationRef<CreateInvitationData, CreateInvitationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateInvitationVariables): MutationRef<CreateInvitationData, CreateInvitationVariables>;
  operationName: string;
}
export const createInvitationRef: CreateInvitationRef;

export function createInvitation(vars: CreateInvitationVariables): MutationPromise<CreateInvitationData, CreateInvitationVariables>;
export function createInvitation(dc: DataConnect, vars: CreateInvitationVariables): MutationPromise<CreateInvitationData, CreateInvitationVariables>;

interface UpdateInvitationStateRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInvitationStateVariables): MutationRef<UpdateInvitationStateData, UpdateInvitationStateVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateInvitationStateVariables): MutationRef<UpdateInvitationStateData, UpdateInvitationStateVariables>;
  operationName: string;
}
export const updateInvitationStateRef: UpdateInvitationStateRef;

export function updateInvitationState(vars: UpdateInvitationStateVariables): MutationPromise<UpdateInvitationStateData, UpdateInvitationStateVariables>;
export function updateInvitationState(dc: DataConnect, vars: UpdateInvitationStateVariables): MutationPromise<UpdateInvitationStateData, UpdateInvitationStateVariables>;

interface AcceptInvitationWithMembershipRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AcceptInvitationWithMembershipVariables): MutationRef<AcceptInvitationWithMembershipData, AcceptInvitationWithMembershipVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AcceptInvitationWithMembershipVariables): MutationRef<AcceptInvitationWithMembershipData, AcceptInvitationWithMembershipVariables>;
  operationName: string;
}
export const acceptInvitationWithMembershipRef: AcceptInvitationWithMembershipRef;

export function acceptInvitationWithMembership(vars: AcceptInvitationWithMembershipVariables): MutationPromise<AcceptInvitationWithMembershipData, AcceptInvitationWithMembershipVariables>;
export function acceptInvitationWithMembership(dc: DataConnect, vars: AcceptInvitationWithMembershipVariables): MutationPromise<AcceptInvitationWithMembershipData, AcceptInvitationWithMembershipVariables>;

interface RequestInvitationApprovalRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RequestInvitationApprovalVariables): MutationRef<RequestInvitationApprovalData, RequestInvitationApprovalVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RequestInvitationApprovalVariables): MutationRef<RequestInvitationApprovalData, RequestInvitationApprovalVariables>;
  operationName: string;
}
export const requestInvitationApprovalRef: RequestInvitationApprovalRef;

export function requestInvitationApproval(vars: RequestInvitationApprovalVariables): MutationPromise<RequestInvitationApprovalData, RequestInvitationApprovalVariables>;
export function requestInvitationApproval(dc: DataConnect, vars: RequestInvitationApprovalVariables): MutationPromise<RequestInvitationApprovalData, RequestInvitationApprovalVariables>;

interface GetContributionWorkspaceRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetContributionWorkspaceVariables): QueryRef<GetContributionWorkspaceData, GetContributionWorkspaceVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetContributionWorkspaceVariables): QueryRef<GetContributionWorkspaceData, GetContributionWorkspaceVariables>;
  operationName: string;
}
export const getContributionWorkspaceRef: GetContributionWorkspaceRef;

export function getContributionWorkspace(vars: GetContributionWorkspaceVariables, options?: ExecuteQueryOptions): QueryPromise<GetContributionWorkspaceData, GetContributionWorkspaceVariables>;
export function getContributionWorkspace(dc: DataConnect, vars: GetContributionWorkspaceVariables, options?: ExecuteQueryOptions): QueryPromise<GetContributionWorkspaceData, GetContributionWorkspaceVariables>;

interface SubmitReceiptWithAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitReceiptWithAuditVariables): MutationRef<SubmitReceiptWithAuditData, SubmitReceiptWithAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SubmitReceiptWithAuditVariables): MutationRef<SubmitReceiptWithAuditData, SubmitReceiptWithAuditVariables>;
  operationName: string;
}
export const submitReceiptWithAuditRef: SubmitReceiptWithAuditRef;

export function submitReceiptWithAudit(vars: SubmitReceiptWithAuditVariables): MutationPromise<SubmitReceiptWithAuditData, SubmitReceiptWithAuditVariables>;
export function submitReceiptWithAudit(dc: DataConnect, vars: SubmitReceiptWithAuditVariables): MutationPromise<SubmitReceiptWithAuditData, SubmitReceiptWithAuditVariables>;

interface ReplaceReceiptWithAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReplaceReceiptWithAuditVariables): MutationRef<ReplaceReceiptWithAuditData, ReplaceReceiptWithAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReplaceReceiptWithAuditVariables): MutationRef<ReplaceReceiptWithAuditData, ReplaceReceiptWithAuditVariables>;
  operationName: string;
}
export const replaceReceiptWithAuditRef: ReplaceReceiptWithAuditRef;

export function replaceReceiptWithAudit(vars: ReplaceReceiptWithAuditVariables): MutationPromise<ReplaceReceiptWithAuditData, ReplaceReceiptWithAuditVariables>;
export function replaceReceiptWithAudit(dc: DataConnect, vars: ReplaceReceiptWithAuditVariables): MutationPromise<ReplaceReceiptWithAuditData, ReplaceReceiptWithAuditVariables>;

interface ReviewReceiptWithAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReviewReceiptWithAuditVariables): MutationRef<ReviewReceiptWithAuditData, ReviewReceiptWithAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReviewReceiptWithAuditVariables): MutationRef<ReviewReceiptWithAuditData, ReviewReceiptWithAuditVariables>;
  operationName: string;
}
export const reviewReceiptWithAuditRef: ReviewReceiptWithAuditRef;

export function reviewReceiptWithAudit(vars: ReviewReceiptWithAuditVariables): MutationPromise<ReviewReceiptWithAuditData, ReviewReceiptWithAuditVariables>;
export function reviewReceiptWithAudit(dc: DataConnect, vars: ReviewReceiptWithAuditVariables): MutationPromise<ReviewReceiptWithAuditData, ReviewReceiptWithAuditVariables>;

interface ApproveInvitationMembershipRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ApproveInvitationMembershipVariables): MutationRef<ApproveInvitationMembershipData, ApproveInvitationMembershipVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ApproveInvitationMembershipVariables): MutationRef<ApproveInvitationMembershipData, ApproveInvitationMembershipVariables>;
  operationName: string;
}
export const approveInvitationMembershipRef: ApproveInvitationMembershipRef;

export function approveInvitationMembership(vars: ApproveInvitationMembershipVariables): MutationPromise<ApproveInvitationMembershipData, ApproveInvitationMembershipVariables>;
export function approveInvitationMembership(dc: DataConnect, vars: ApproveInvitationMembershipVariables): MutationPromise<ApproveInvitationMembershipData, ApproveInvitationMembershipVariables>;

interface DeclineInvitationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeclineInvitationVariables): MutationRef<DeclineInvitationData, DeclineInvitationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeclineInvitationVariables): MutationRef<DeclineInvitationData, DeclineInvitationVariables>;
  operationName: string;
}
export const declineInvitationRef: DeclineInvitationRef;

export function declineInvitation(vars: DeclineInvitationVariables): MutationPromise<DeclineInvitationData, DeclineInvitationVariables>;
export function declineInvitation(dc: DataConnect, vars: DeclineInvitationVariables): MutationPromise<DeclineInvitationData, DeclineInvitationVariables>;

interface RequestReplacementInvitationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RequestReplacementInvitationVariables): MutationRef<RequestReplacementInvitationData, RequestReplacementInvitationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RequestReplacementInvitationVariables): MutationRef<RequestReplacementInvitationData, RequestReplacementInvitationVariables>;
  operationName: string;
}
export const requestReplacementInvitationRef: RequestReplacementInvitationRef;

export function requestReplacementInvitation(vars: RequestReplacementInvitationVariables): MutationPromise<RequestReplacementInvitationData, RequestReplacementInvitationVariables>;
export function requestReplacementInvitation(dc: DataConnect, vars: RequestReplacementInvitationVariables): MutationPromise<RequestReplacementInvitationData, RequestReplacementInvitationVariables>;

interface GetCircleCommunicationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCircleCommunicationVariables): QueryRef<GetCircleCommunicationData, GetCircleCommunicationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCircleCommunicationVariables): QueryRef<GetCircleCommunicationData, GetCircleCommunicationVariables>;
  operationName: string;
}
export const getCircleCommunicationRef: GetCircleCommunicationRef;

export function getCircleCommunication(vars: GetCircleCommunicationVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleCommunicationData, GetCircleCommunicationVariables>;
export function getCircleCommunication(dc: DataConnect, vars: GetCircleCommunicationVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleCommunicationData, GetCircleCommunicationVariables>;

interface GetRecentCommentsByAuthorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRecentCommentsByAuthorVariables): QueryRef<GetRecentCommentsByAuthorData, GetRecentCommentsByAuthorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetRecentCommentsByAuthorVariables): QueryRef<GetRecentCommentsByAuthorData, GetRecentCommentsByAuthorVariables>;
  operationName: string;
}
export const getRecentCommentsByAuthorRef: GetRecentCommentsByAuthorRef;

export function getRecentCommentsByAuthor(vars: GetRecentCommentsByAuthorVariables, options?: ExecuteQueryOptions): QueryPromise<GetRecentCommentsByAuthorData, GetRecentCommentsByAuthorVariables>;
export function getRecentCommentsByAuthor(dc: DataConnect, vars: GetRecentCommentsByAuthorVariables, options?: ExecuteQueryOptions): QueryPromise<GetRecentCommentsByAuthorData, GetRecentCommentsByAuthorVariables>;

interface GetOpenCommentReportsByReporterRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOpenCommentReportsByReporterVariables): QueryRef<GetOpenCommentReportsByReporterData, GetOpenCommentReportsByReporterVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOpenCommentReportsByReporterVariables): QueryRef<GetOpenCommentReportsByReporterData, GetOpenCommentReportsByReporterVariables>;
  operationName: string;
}
export const getOpenCommentReportsByReporterRef: GetOpenCommentReportsByReporterRef;

export function getOpenCommentReportsByReporter(vars: GetOpenCommentReportsByReporterVariables, options?: ExecuteQueryOptions): QueryPromise<GetOpenCommentReportsByReporterData, GetOpenCommentReportsByReporterVariables>;
export function getOpenCommentReportsByReporter(dc: DataConnect, vars: GetOpenCommentReportsByReporterVariables, options?: ExecuteQueryOptions): QueryPromise<GetOpenCommentReportsByReporterData, GetOpenCommentReportsByReporterVariables>;

interface GetActivityLogsForCirclesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetActivityLogsForCirclesVariables): QueryRef<GetActivityLogsForCirclesData, GetActivityLogsForCirclesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetActivityLogsForCirclesVariables): QueryRef<GetActivityLogsForCirclesData, GetActivityLogsForCirclesVariables>;
  operationName: string;
}
export const getActivityLogsForCirclesRef: GetActivityLogsForCirclesRef;

export function getActivityLogsForCircles(vars: GetActivityLogsForCirclesVariables, options?: ExecuteQueryOptions): QueryPromise<GetActivityLogsForCirclesData, GetActivityLogsForCirclesVariables>;
export function getActivityLogsForCircles(dc: DataConnect, vars: GetActivityLogsForCirclesVariables, options?: ExecuteQueryOptions): QueryPromise<GetActivityLogsForCirclesData, GetActivityLogsForCirclesVariables>;

interface CreateAnnouncementWithActivityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAnnouncementWithActivityVariables): MutationRef<CreateAnnouncementWithActivityData, CreateAnnouncementWithActivityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateAnnouncementWithActivityVariables): MutationRef<CreateAnnouncementWithActivityData, CreateAnnouncementWithActivityVariables>;
  operationName: string;
}
export const createAnnouncementWithActivityRef: CreateAnnouncementWithActivityRef;

export function createAnnouncementWithActivity(vars: CreateAnnouncementWithActivityVariables): MutationPromise<CreateAnnouncementWithActivityData, CreateAnnouncementWithActivityVariables>;
export function createAnnouncementWithActivity(dc: DataConnect, vars: CreateAnnouncementWithActivityVariables): MutationPromise<CreateAnnouncementWithActivityData, CreateAnnouncementWithActivityVariables>;

interface UpdateAnnouncementWithAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAnnouncementWithAuditVariables): MutationRef<UpdateAnnouncementWithAuditData, UpdateAnnouncementWithAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateAnnouncementWithAuditVariables): MutationRef<UpdateAnnouncementWithAuditData, UpdateAnnouncementWithAuditVariables>;
  operationName: string;
}
export const updateAnnouncementWithAuditRef: UpdateAnnouncementWithAuditRef;

export function updateAnnouncementWithAudit(vars: UpdateAnnouncementWithAuditVariables): MutationPromise<UpdateAnnouncementWithAuditData, UpdateAnnouncementWithAuditVariables>;
export function updateAnnouncementWithAudit(dc: DataConnect, vars: UpdateAnnouncementWithAuditVariables): MutationPromise<UpdateAnnouncementWithAuditData, UpdateAnnouncementWithAuditVariables>;

interface DeleteAnnouncementWithAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAnnouncementWithAuditVariables): MutationRef<DeleteAnnouncementWithAuditData, DeleteAnnouncementWithAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteAnnouncementWithAuditVariables): MutationRef<DeleteAnnouncementWithAuditData, DeleteAnnouncementWithAuditVariables>;
  operationName: string;
}
export const deleteAnnouncementWithAuditRef: DeleteAnnouncementWithAuditRef;

export function deleteAnnouncementWithAudit(vars: DeleteAnnouncementWithAuditVariables): MutationPromise<DeleteAnnouncementWithAuditData, DeleteAnnouncementWithAuditVariables>;
export function deleteAnnouncementWithAudit(dc: DataConnect, vars: DeleteAnnouncementWithAuditVariables): MutationPromise<DeleteAnnouncementWithAuditData, DeleteAnnouncementWithAuditVariables>;

interface SetCircleCommentsWithAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetCircleCommentsWithAuditVariables): MutationRef<SetCircleCommentsWithAuditData, SetCircleCommentsWithAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetCircleCommentsWithAuditVariables): MutationRef<SetCircleCommentsWithAuditData, SetCircleCommentsWithAuditVariables>;
  operationName: string;
}
export const setCircleCommentsWithAuditRef: SetCircleCommentsWithAuditRef;

export function setCircleCommentsWithAudit(vars: SetCircleCommentsWithAuditVariables): MutationPromise<SetCircleCommentsWithAuditData, SetCircleCommentsWithAuditVariables>;
export function setCircleCommentsWithAudit(dc: DataConnect, vars: SetCircleCommentsWithAuditVariables): MutationPromise<SetCircleCommentsWithAuditData, SetCircleCommentsWithAuditVariables>;

interface CreateCommentWithActivityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCommentWithActivityVariables): MutationRef<CreateCommentWithActivityData, CreateCommentWithActivityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateCommentWithActivityVariables): MutationRef<CreateCommentWithActivityData, CreateCommentWithActivityVariables>;
  operationName: string;
}
export const createCommentWithActivityRef: CreateCommentWithActivityRef;

export function createCommentWithActivity(vars: CreateCommentWithActivityVariables): MutationPromise<CreateCommentWithActivityData, CreateCommentWithActivityVariables>;
export function createCommentWithActivity(dc: DataConnect, vars: CreateCommentWithActivityVariables): MutationPromise<CreateCommentWithActivityData, CreateCommentWithActivityVariables>;

interface DeleteOwnCommentWithAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOwnCommentWithAuditVariables): MutationRef<DeleteOwnCommentWithAuditData, DeleteOwnCommentWithAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteOwnCommentWithAuditVariables): MutationRef<DeleteOwnCommentWithAuditData, DeleteOwnCommentWithAuditVariables>;
  operationName: string;
}
export const deleteOwnCommentWithAuditRef: DeleteOwnCommentWithAuditRef;

export function deleteOwnCommentWithAudit(vars: DeleteOwnCommentWithAuditVariables): MutationPromise<DeleteOwnCommentWithAuditData, DeleteOwnCommentWithAuditVariables>;
export function deleteOwnCommentWithAudit(dc: DataConnect, vars: DeleteOwnCommentWithAuditVariables): MutationPromise<DeleteOwnCommentWithAuditData, DeleteOwnCommentWithAuditVariables>;

interface ModerateCommentWithAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ModerateCommentWithAuditVariables): MutationRef<ModerateCommentWithAuditData, ModerateCommentWithAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ModerateCommentWithAuditVariables): MutationRef<ModerateCommentWithAuditData, ModerateCommentWithAuditVariables>;
  operationName: string;
}
export const moderateCommentWithAuditRef: ModerateCommentWithAuditRef;

export function moderateCommentWithAudit(vars: ModerateCommentWithAuditVariables): MutationPromise<ModerateCommentWithAuditData, ModerateCommentWithAuditVariables>;
export function moderateCommentWithAudit(dc: DataConnect, vars: ModerateCommentWithAuditVariables): MutationPromise<ModerateCommentWithAuditData, ModerateCommentWithAuditVariables>;

interface ReportCommentWithAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReportCommentWithAuditVariables): MutationRef<ReportCommentWithAuditData, ReportCommentWithAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ReportCommentWithAuditVariables): MutationRef<ReportCommentWithAuditData, ReportCommentWithAuditVariables>;
  operationName: string;
}
export const reportCommentWithAuditRef: ReportCommentWithAuditRef;

export function reportCommentWithAudit(vars: ReportCommentWithAuditVariables): MutationPromise<ReportCommentWithAuditData, ReportCommentWithAuditVariables>;
export function reportCommentWithAudit(dc: DataConnect, vars: ReportCommentWithAuditVariables): MutationPromise<ReportCommentWithAuditData, ReportCommentWithAuditVariables>;

interface RecordSystemActivityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordSystemActivityVariables): MutationRef<RecordSystemActivityData, RecordSystemActivityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordSystemActivityVariables): MutationRef<RecordSystemActivityData, RecordSystemActivityVariables>;
  operationName: string;
}
export const recordSystemActivityRef: RecordSystemActivityRef;

export function recordSystemActivity(vars: RecordSystemActivityVariables): MutationPromise<RecordSystemActivityData, RecordSystemActivityVariables>;
export function recordSystemActivity(dc: DataConnect, vars: RecordSystemActivityVariables): MutationPromise<RecordSystemActivityData, RecordSystemActivityVariables>;

interface GetUserNotificationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserNotificationsVariables): QueryRef<GetUserNotificationsData, GetUserNotificationsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserNotificationsVariables): QueryRef<GetUserNotificationsData, GetUserNotificationsVariables>;
  operationName: string;
}
export const getUserNotificationsRef: GetUserNotificationsRef;

export function getUserNotifications(vars: GetUserNotificationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserNotificationsData, GetUserNotificationsVariables>;
export function getUserNotifications(dc: DataConnect, vars: GetUserNotificationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserNotificationsData, GetUserNotificationsVariables>;

interface GetNotificationContextRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetNotificationContextVariables): QueryRef<GetNotificationContextData, GetNotificationContextVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetNotificationContextVariables): QueryRef<GetNotificationContextData, GetNotificationContextVariables>;
  operationName: string;
}
export const getNotificationContextRef: GetNotificationContextRef;

export function getNotificationContext(vars: GetNotificationContextVariables, options?: ExecuteQueryOptions): QueryPromise<GetNotificationContextData, GetNotificationContextVariables>;
export function getNotificationContext(dc: DataConnect, vars: GetNotificationContextVariables, options?: ExecuteQueryOptions): QueryPromise<GetNotificationContextData, GetNotificationContextVariables>;

interface GetNotificationDedupeRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetNotificationDedupeVariables): QueryRef<GetNotificationDedupeData, GetNotificationDedupeVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetNotificationDedupeVariables): QueryRef<GetNotificationDedupeData, GetNotificationDedupeVariables>;
  operationName: string;
}
export const getNotificationDedupeRef: GetNotificationDedupeRef;

export function getNotificationDedupe(vars: GetNotificationDedupeVariables, options?: ExecuteQueryOptions): QueryPromise<GetNotificationDedupeData, GetNotificationDedupeVariables>;
export function getNotificationDedupe(dc: DataConnect, vars: GetNotificationDedupeVariables, options?: ExecuteQueryOptions): QueryPromise<GetNotificationDedupeData, GetNotificationDedupeVariables>;

interface GetRecentReminderNotificationsRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRecentReminderNotificationsVariables): QueryRef<GetRecentReminderNotificationsData, GetRecentReminderNotificationsVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetRecentReminderNotificationsVariables): QueryRef<GetRecentReminderNotificationsData, GetRecentReminderNotificationsVariables>;
  operationName: string;
}
export const getRecentReminderNotificationsRef: GetRecentReminderNotificationsRef;

export function getRecentReminderNotifications(vars: GetRecentReminderNotificationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetRecentReminderNotificationsData, GetRecentReminderNotificationsVariables>;
export function getRecentReminderNotifications(dc: DataConnect, vars: GetRecentReminderNotificationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetRecentReminderNotificationsData, GetRecentReminderNotificationsVariables>;

interface FindNotificationRecipientByEmailRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: FindNotificationRecipientByEmailVariables): QueryRef<FindNotificationRecipientByEmailData, FindNotificationRecipientByEmailVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: FindNotificationRecipientByEmailVariables): QueryRef<FindNotificationRecipientByEmailData, FindNotificationRecipientByEmailVariables>;
  operationName: string;
}
export const findNotificationRecipientByEmailRef: FindNotificationRecipientByEmailRef;

export function findNotificationRecipientByEmail(vars: FindNotificationRecipientByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<FindNotificationRecipientByEmailData, FindNotificationRecipientByEmailVariables>;
export function findNotificationRecipientByEmail(dc: DataConnect, vars: FindNotificationRecipientByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<FindNotificationRecipientByEmailData, FindNotificationRecipientByEmailVariables>;

interface GetDeadlineNotificationCandidatesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDeadlineNotificationCandidatesVariables): QueryRef<GetDeadlineNotificationCandidatesData, GetDeadlineNotificationCandidatesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetDeadlineNotificationCandidatesVariables): QueryRef<GetDeadlineNotificationCandidatesData, GetDeadlineNotificationCandidatesVariables>;
  operationName: string;
}
export const getDeadlineNotificationCandidatesRef: GetDeadlineNotificationCandidatesRef;

export function getDeadlineNotificationCandidates(vars: GetDeadlineNotificationCandidatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetDeadlineNotificationCandidatesData, GetDeadlineNotificationCandidatesVariables>;
export function getDeadlineNotificationCandidates(dc: DataConnect, vars: GetDeadlineNotificationCandidatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetDeadlineNotificationCandidatesData, GetDeadlineNotificationCandidatesVariables>;

interface GetUserDeadlineNotificationCandidatesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserDeadlineNotificationCandidatesVariables): QueryRef<GetUserDeadlineNotificationCandidatesData, GetUserDeadlineNotificationCandidatesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserDeadlineNotificationCandidatesVariables): QueryRef<GetUserDeadlineNotificationCandidatesData, GetUserDeadlineNotificationCandidatesVariables>;
  operationName: string;
}
export const getUserDeadlineNotificationCandidatesRef: GetUserDeadlineNotificationCandidatesRef;

export function getUserDeadlineNotificationCandidates(vars: GetUserDeadlineNotificationCandidatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserDeadlineNotificationCandidatesData, GetUserDeadlineNotificationCandidatesVariables>;
export function getUserDeadlineNotificationCandidates(dc: DataConnect, vars: GetUserDeadlineNotificationCandidatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserDeadlineNotificationCandidatesData, GetUserDeadlineNotificationCandidatesVariables>;

interface CreateNotificationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNotificationVariables): MutationRef<CreateNotificationData, CreateNotificationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateNotificationVariables): MutationRef<CreateNotificationData, CreateNotificationVariables>;
  operationName: string;
}
export const createNotificationRef: CreateNotificationRef;

export function createNotification(vars: CreateNotificationVariables): MutationPromise<CreateNotificationData, CreateNotificationVariables>;
export function createNotification(dc: DataConnect, vars: CreateNotificationVariables): MutationPromise<CreateNotificationData, CreateNotificationVariables>;

interface MarkNotificationReadRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkNotificationReadVariables): MutationRef<MarkNotificationReadData, MarkNotificationReadVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: MarkNotificationReadVariables): MutationRef<MarkNotificationReadData, MarkNotificationReadVariables>;
  operationName: string;
}
export const markNotificationReadRef: MarkNotificationReadRef;

export function markNotificationRead(vars: MarkNotificationReadVariables): MutationPromise<MarkNotificationReadData, MarkNotificationReadVariables>;
export function markNotificationRead(dc: DataConnect, vars: MarkNotificationReadVariables): MutationPromise<MarkNotificationReadData, MarkNotificationReadVariables>;

interface DismissNotificationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DismissNotificationVariables): MutationRef<DismissNotificationData, DismissNotificationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DismissNotificationVariables): MutationRef<DismissNotificationData, DismissNotificationVariables>;
  operationName: string;
}
export const dismissNotificationRef: DismissNotificationRef;

export function dismissNotification(vars: DismissNotificationVariables): MutationPromise<DismissNotificationData, DismissNotificationVariables>;
export function dismissNotification(dc: DataConnect, vars: DismissNotificationVariables): MutationPromise<DismissNotificationData, DismissNotificationVariables>;

interface MarkAllNotificationsReadRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkAllNotificationsReadVariables): MutationRef<MarkAllNotificationsReadData, MarkAllNotificationsReadVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: MarkAllNotificationsReadVariables): MutationRef<MarkAllNotificationsReadData, MarkAllNotificationsReadVariables>;
  operationName: string;
}
export const markAllNotificationsReadRef: MarkAllNotificationsReadRef;

export function markAllNotificationsRead(vars: MarkAllNotificationsReadVariables): MutationPromise<MarkAllNotificationsReadData, MarkAllNotificationsReadVariables>;
export function markAllNotificationsRead(dc: DataConnect, vars: MarkAllNotificationsReadVariables): MutationPromise<MarkAllNotificationsReadData, MarkAllNotificationsReadVariables>;

interface UpdateNotificationPreferencesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateNotificationPreferencesVariables): MutationRef<UpdateNotificationPreferencesData, UpdateNotificationPreferencesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateNotificationPreferencesVariables): MutationRef<UpdateNotificationPreferencesData, UpdateNotificationPreferencesVariables>;
  operationName: string;
}
export const updateNotificationPreferencesRef: UpdateNotificationPreferencesRef;

export function updateNotificationPreferences(vars: UpdateNotificationPreferencesVariables): MutationPromise<UpdateNotificationPreferencesData, UpdateNotificationPreferencesVariables>;
export function updateNotificationPreferences(dc: DataConnect, vars: UpdateNotificationPreferencesVariables): MutationPromise<UpdateNotificationPreferencesData, UpdateNotificationPreferencesVariables>;

interface SetCircleNotificationMuteRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetCircleNotificationMuteVariables): MutationRef<SetCircleNotificationMuteData, SetCircleNotificationMuteVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SetCircleNotificationMuteVariables): MutationRef<SetCircleNotificationMuteData, SetCircleNotificationMuteVariables>;
  operationName: string;
}
export const setCircleNotificationMuteRef: SetCircleNotificationMuteRef;

export function setCircleNotificationMute(vars: SetCircleNotificationMuteVariables): MutationPromise<SetCircleNotificationMuteData, SetCircleNotificationMuteVariables>;
export function setCircleNotificationMute(dc: DataConnect, vars: SetCircleNotificationMuteVariables): MutationPromise<SetCircleNotificationMuteData, SetCircleNotificationMuteVariables>;

interface CreateEmailDeliveryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEmailDeliveryVariables): MutationRef<CreateEmailDeliveryData, CreateEmailDeliveryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateEmailDeliveryVariables): MutationRef<CreateEmailDeliveryData, CreateEmailDeliveryVariables>;
  operationName: string;
}
export const createEmailDeliveryRef: CreateEmailDeliveryRef;

export function createEmailDelivery(vars: CreateEmailDeliveryVariables): MutationPromise<CreateEmailDeliveryData, CreateEmailDeliveryVariables>;
export function createEmailDelivery(dc: DataConnect, vars: CreateEmailDeliveryVariables): MutationPromise<CreateEmailDeliveryData, CreateEmailDeliveryVariables>;

interface GetRetentionCandidatesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRetentionCandidatesVariables): QueryRef<GetRetentionCandidatesData, GetRetentionCandidatesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetRetentionCandidatesVariables): QueryRef<GetRetentionCandidatesData, GetRetentionCandidatesVariables>;
  operationName: string;
}
export const getRetentionCandidatesRef: GetRetentionCandidatesRef;

export function getRetentionCandidates(vars: GetRetentionCandidatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetRetentionCandidatesData, GetRetentionCandidatesVariables>;
export function getRetentionCandidates(dc: DataConnect, vars: GetRetentionCandidatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetRetentionCandidatesData, GetRetentionCandidatesVariables>;

interface GetCircleRetentionPayloadRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCircleRetentionPayloadVariables): QueryRef<GetCircleRetentionPayloadData, GetCircleRetentionPayloadVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCircleRetentionPayloadVariables): QueryRef<GetCircleRetentionPayloadData, GetCircleRetentionPayloadVariables>;
  operationName: string;
}
export const getCircleRetentionPayloadRef: GetCircleRetentionPayloadRef;

export function getCircleRetentionPayload(vars: GetCircleRetentionPayloadVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleRetentionPayloadData, GetCircleRetentionPayloadVariables>;
export function getCircleRetentionPayload(dc: DataConnect, vars: GetCircleRetentionPayloadVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleRetentionPayloadData, GetCircleRetentionPayloadVariables>;

interface GetStoragePathReferencesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStoragePathReferencesVariables): QueryRef<GetStoragePathReferencesData, GetStoragePathReferencesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStoragePathReferencesVariables): QueryRef<GetStoragePathReferencesData, GetStoragePathReferencesVariables>;
  operationName: string;
}
export const getStoragePathReferencesRef: GetStoragePathReferencesRef;

export function getStoragePathReferences(vars: GetStoragePathReferencesVariables, options?: ExecuteQueryOptions): QueryPromise<GetStoragePathReferencesData, GetStoragePathReferencesVariables>;
export function getStoragePathReferences(dc: DataConnect, vars: GetStoragePathReferencesVariables, options?: ExecuteQueryOptions): QueryPromise<GetStoragePathReferencesData, GetStoragePathReferencesVariables>;

interface CreateRetentionPurgeAttemptRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRetentionPurgeAttemptVariables): MutationRef<CreateRetentionPurgeAttemptData, CreateRetentionPurgeAttemptVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateRetentionPurgeAttemptVariables): MutationRef<CreateRetentionPurgeAttemptData, CreateRetentionPurgeAttemptVariables>;
  operationName: string;
}
export const createRetentionPurgeAttemptRef: CreateRetentionPurgeAttemptRef;

export function createRetentionPurgeAttempt(vars: CreateRetentionPurgeAttemptVariables): MutationPromise<CreateRetentionPurgeAttemptData, CreateRetentionPurgeAttemptVariables>;
export function createRetentionPurgeAttempt(dc: DataConnect, vars: CreateRetentionPurgeAttemptVariables): MutationPromise<CreateRetentionPurgeAttemptData, CreateRetentionPurgeAttemptVariables>;

interface CompleteRetentionPurgeAttemptRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CompleteRetentionPurgeAttemptVariables): MutationRef<CompleteRetentionPurgeAttemptData, CompleteRetentionPurgeAttemptVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CompleteRetentionPurgeAttemptVariables): MutationRef<CompleteRetentionPurgeAttemptData, CompleteRetentionPurgeAttemptVariables>;
  operationName: string;
}
export const completeRetentionPurgeAttemptRef: CompleteRetentionPurgeAttemptRef;

export function completeRetentionPurgeAttempt(vars: CompleteRetentionPurgeAttemptVariables): MutationPromise<CompleteRetentionPurgeAttemptData, CompleteRetentionPurgeAttemptVariables>;
export function completeRetentionPurgeAttempt(dc: DataConnect, vars: CompleteRetentionPurgeAttemptVariables): MutationPromise<CompleteRetentionPurgeAttemptData, CompleteRetentionPurgeAttemptVariables>;

interface PurgeInvitationAcceptancesRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: PurgeInvitationAcceptancesVariables): MutationRef<PurgeInvitationAcceptancesData, PurgeInvitationAcceptancesVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: PurgeInvitationAcceptancesVariables): MutationRef<PurgeInvitationAcceptancesData, PurgeInvitationAcceptancesVariables>;
  operationName: string;
}
export const purgeInvitationAcceptancesRef: PurgeInvitationAcceptancesRef;

export function purgeInvitationAcceptances(vars: PurgeInvitationAcceptancesVariables): MutationPromise<PurgeInvitationAcceptancesData, PurgeInvitationAcceptancesVariables>;
export function purgeInvitationAcceptances(dc: DataConnect, vars: PurgeInvitationAcceptancesVariables): MutationPromise<PurgeInvitationAcceptancesData, PurgeInvitationAcceptancesVariables>;

interface PurgeCircleSensitiveDataRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: PurgeCircleSensitiveDataVariables): MutationRef<PurgeCircleSensitiveDataData, PurgeCircleSensitiveDataVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: PurgeCircleSensitiveDataVariables): MutationRef<PurgeCircleSensitiveDataData, PurgeCircleSensitiveDataVariables>;
  operationName: string;
}
export const purgeCircleSensitiveDataRef: PurgeCircleSensitiveDataRef;

export function purgeCircleSensitiveData(vars: PurgeCircleSensitiveDataVariables): MutationPromise<PurgeCircleSensitiveDataData, PurgeCircleSensitiveDataVariables>;
export function purgeCircleSensitiveData(dc: DataConnect, vars: PurgeCircleSensitiveDataVariables): MutationPromise<PurgeCircleSensitiveDataData, PurgeCircleSensitiveDataVariables>;

interface GetOwnerAdministratorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOwnerAdministratorVariables): QueryRef<GetOwnerAdministratorData, GetOwnerAdministratorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOwnerAdministratorVariables): QueryRef<GetOwnerAdministratorData, GetOwnerAdministratorVariables>;
  operationName: string;
}
export const getOwnerAdministratorRef: GetOwnerAdministratorRef;

export function getOwnerAdministrator(vars: GetOwnerAdministratorVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerAdministratorData, GetOwnerAdministratorVariables>;
export function getOwnerAdministrator(dc: DataConnect, vars: GetOwnerAdministratorVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerAdministratorData, GetOwnerAdministratorVariables>;

interface GetUserAccountStatusRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserAccountStatusVariables): QueryRef<GetUserAccountStatusData, GetUserAccountStatusVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserAccountStatusVariables): QueryRef<GetUserAccountStatusData, GetUserAccountStatusVariables>;
  operationName: string;
}
export const getUserAccountStatusRef: GetUserAccountStatusRef;

export function getUserAccountStatus(vars: GetUserAccountStatusVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserAccountStatusData, GetUserAccountStatusVariables>;
export function getUserAccountStatus(dc: DataConnect, vars: GetUserAccountStatusVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserAccountStatusData, GetUserAccountStatusVariables>;

interface GetOwnerPlatformOverviewRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetOwnerPlatformOverviewData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetOwnerPlatformOverviewData, undefined>;
  operationName: string;
}
export const getOwnerPlatformOverviewRef: GetOwnerPlatformOverviewRef;

export function getOwnerPlatformOverview(options?: ExecuteQueryOptions): QueryPromise<GetOwnerPlatformOverviewData, undefined>;
export function getOwnerPlatformOverview(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetOwnerPlatformOverviewData, undefined>;

interface GetOwnerReportReviewRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOwnerReportReviewVariables): QueryRef<GetOwnerReportReviewData, GetOwnerReportReviewVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOwnerReportReviewVariables): QueryRef<GetOwnerReportReviewData, GetOwnerReportReviewVariables>;
  operationName: string;
}
export const getOwnerReportReviewRef: GetOwnerReportReviewRef;

export function getOwnerReportReview(vars: GetOwnerReportReviewVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerReportReviewData, GetOwnerReportReviewVariables>;
export function getOwnerReportReview(dc: DataConnect, vars: GetOwnerReportReviewVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerReportReviewData, GetOwnerReportReviewVariables>;

interface GetOwnerUserByIdentifierRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOwnerUserByIdentifierVariables): QueryRef<GetOwnerUserByIdentifierData, GetOwnerUserByIdentifierVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOwnerUserByIdentifierVariables): QueryRef<GetOwnerUserByIdentifierData, GetOwnerUserByIdentifierVariables>;
  operationName: string;
}
export const getOwnerUserByIdentifierRef: GetOwnerUserByIdentifierRef;

export function getOwnerUserByIdentifier(vars: GetOwnerUserByIdentifierVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerUserByIdentifierData, GetOwnerUserByIdentifierVariables>;
export function getOwnerUserByIdentifier(dc: DataConnect, vars: GetOwnerUserByIdentifierVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerUserByIdentifierData, GetOwnerUserByIdentifierVariables>;

interface GetOwnerOperationalExportRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetOwnerOperationalExportData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetOwnerOperationalExportData, undefined>;
  operationName: string;
}
export const getOwnerOperationalExportRef: GetOwnerOperationalExportRef;

export function getOwnerOperationalExport(options?: ExecuteQueryOptions): QueryPromise<GetOwnerOperationalExportData, undefined>;
export function getOwnerOperationalExport(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetOwnerOperationalExportData, undefined>;

interface RecordOperationalEventRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordOperationalEventVariables): MutationRef<RecordOperationalEventData, RecordOperationalEventVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordOperationalEventVariables): MutationRef<RecordOperationalEventData, RecordOperationalEventVariables>;
  operationName: string;
}
export const recordOperationalEventRef: RecordOperationalEventRef;

export function recordOperationalEvent(vars: RecordOperationalEventVariables): MutationPromise<RecordOperationalEventData, RecordOperationalEventVariables>;
export function recordOperationalEvent(dc: DataConnect, vars: RecordOperationalEventVariables): MutationPromise<RecordOperationalEventData, RecordOperationalEventVariables>;

interface RecordOwnerAdminAuditRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordOwnerAdminAuditVariables): MutationRef<RecordOwnerAdminAuditData, RecordOwnerAdminAuditVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RecordOwnerAdminAuditVariables): MutationRef<RecordOwnerAdminAuditData, RecordOwnerAdminAuditVariables>;
  operationName: string;
}
export const recordOwnerAdminAuditRef: RecordOwnerAdminAuditRef;

export function recordOwnerAdminAudit(vars: RecordOwnerAdminAuditVariables): MutationPromise<RecordOwnerAdminAuditData, RecordOwnerAdminAuditVariables>;
export function recordOwnerAdminAudit(dc: DataConnect, vars: RecordOwnerAdminAuditVariables): MutationPromise<RecordOwnerAdminAuditData, RecordOwnerAdminAuditVariables>;

interface ResolveOwnerCommentReportRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResolveOwnerCommentReportVariables): MutationRef<ResolveOwnerCommentReportData, ResolveOwnerCommentReportVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ResolveOwnerCommentReportVariables): MutationRef<ResolveOwnerCommentReportData, ResolveOwnerCommentReportVariables>;
  operationName: string;
}
export const resolveOwnerCommentReportRef: ResolveOwnerCommentReportRef;

export function resolveOwnerCommentReport(vars: ResolveOwnerCommentReportVariables): MutationPromise<ResolveOwnerCommentReportData, ResolveOwnerCommentReportVariables>;
export function resolveOwnerCommentReport(dc: DataConnect, vars: ResolveOwnerCommentReportVariables): MutationPromise<ResolveOwnerCommentReportData, ResolveOwnerCommentReportVariables>;

interface DismissOwnerCommentReportRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DismissOwnerCommentReportVariables): MutationRef<DismissOwnerCommentReportData, DismissOwnerCommentReportVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DismissOwnerCommentReportVariables): MutationRef<DismissOwnerCommentReportData, DismissOwnerCommentReportVariables>;
  operationName: string;
}
export const dismissOwnerCommentReportRef: DismissOwnerCommentReportRef;

export function dismissOwnerCommentReport(vars: DismissOwnerCommentReportVariables): MutationPromise<DismissOwnerCommentReportData, DismissOwnerCommentReportVariables>;
export function dismissOwnerCommentReport(dc: DataConnect, vars: DismissOwnerCommentReportVariables): MutationPromise<DismissOwnerCommentReportData, DismissOwnerCommentReportVariables>;

interface SuspendOwnerTargetUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SuspendOwnerTargetUserVariables): MutationRef<SuspendOwnerTargetUserData, SuspendOwnerTargetUserVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SuspendOwnerTargetUserVariables): MutationRef<SuspendOwnerTargetUserData, SuspendOwnerTargetUserVariables>;
  operationName: string;
}
export const suspendOwnerTargetUserRef: SuspendOwnerTargetUserRef;

export function suspendOwnerTargetUser(vars: SuspendOwnerTargetUserVariables): MutationPromise<SuspendOwnerTargetUserData, SuspendOwnerTargetUserVariables>;
export function suspendOwnerTargetUser(dc: DataConnect, vars: SuspendOwnerTargetUserVariables): MutationPromise<SuspendOwnerTargetUserData, SuspendOwnerTargetUserVariables>;

interface RevokeCompromisedInvitationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RevokeCompromisedInvitationVariables): MutationRef<RevokeCompromisedInvitationData, RevokeCompromisedInvitationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RevokeCompromisedInvitationVariables): MutationRef<RevokeCompromisedInvitationData, RevokeCompromisedInvitationVariables>;
  operationName: string;
}
export const revokeCompromisedInvitationRef: RevokeCompromisedInvitationRef;

export function revokeCompromisedInvitation(vars: RevokeCompromisedInvitationVariables): MutationPromise<RevokeCompromisedInvitationData, RevokeCompromisedInvitationVariables>;
export function revokeCompromisedInvitation(dc: DataConnect, vars: RevokeCompromisedInvitationVariables): MutationPromise<RevokeCompromisedInvitationData, RevokeCompromisedInvitationVariables>;

interface GetOwnerInvitationRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOwnerInvitationVariables): QueryRef<GetOwnerInvitationData, GetOwnerInvitationVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetOwnerInvitationVariables): QueryRef<GetOwnerInvitationData, GetOwnerInvitationVariables>;
  operationName: string;
}
export const getOwnerInvitationRef: GetOwnerInvitationRef;

export function getOwnerInvitation(vars: GetOwnerInvitationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerInvitationData, GetOwnerInvitationVariables>;
export function getOwnerInvitation(dc: DataConnect, vars: GetOwnerInvitationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerInvitationData, GetOwnerInvitationVariables>;

interface ProvisionOwnerAccountRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ProvisionOwnerAccountVariables): MutationRef<ProvisionOwnerAccountData, ProvisionOwnerAccountVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ProvisionOwnerAccountVariables): MutationRef<ProvisionOwnerAccountData, ProvisionOwnerAccountVariables>;
  operationName: string;
}
export const provisionOwnerAccountRef: ProvisionOwnerAccountRef;

export function provisionOwnerAccount(vars: ProvisionOwnerAccountVariables): MutationPromise<ProvisionOwnerAccountData, ProvisionOwnerAccountVariables>;
export function provisionOwnerAccount(dc: DataConnect, vars: ProvisionOwnerAccountVariables): MutationPromise<ProvisionOwnerAccountData, ProvisionOwnerAccountVariables>;

interface ProvisionOwnerAdministratorRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: ProvisionOwnerAdministratorVariables): MutationRef<ProvisionOwnerAdministratorData, ProvisionOwnerAdministratorVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: ProvisionOwnerAdministratorVariables): MutationRef<ProvisionOwnerAdministratorData, ProvisionOwnerAdministratorVariables>;
  operationName: string;
}
export const provisionOwnerAdministratorRef: ProvisionOwnerAdministratorRef;

export function provisionOwnerAdministrator(vars: ProvisionOwnerAdministratorVariables): MutationPromise<ProvisionOwnerAdministratorData, ProvisionOwnerAdministratorVariables>;
export function provisionOwnerAdministrator(dc: DataConnect, vars: ProvisionOwnerAdministratorVariables): MutationPromise<ProvisionOwnerAdministratorData, ProvisionOwnerAdministratorVariables>;

