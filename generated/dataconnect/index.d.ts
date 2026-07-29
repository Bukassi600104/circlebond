import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




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
    contributedAmount: number;
    eventDate?: DateString | null;
    status: string;
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
    memberLimit: number;
    deadline?: DateString | null;
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

export interface GetOpenCommentReportsByReporterData {
  commentReports: ({
    id: UUIDString;
  } & CommentReport_Key)[];
}

export interface GetOpenCommentReportsByReporterVariables {
  commentId: UUIDString;
  reporterId: string;
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
    memberLimit: number;
    deadline?: DateString | null;
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

export interface InvitationAcceptance_Key {
  invitationId: UUIDString;
  userId: string;
  __typename?: 'InvitationAcceptance_Key';
}

export interface Invitation_Key {
  id: UUIDString;
  __typename?: 'Invitation_Key';
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

export interface Receipt_Key {
  id: UUIDString;
  __typename?: 'Receipt_Key';
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

