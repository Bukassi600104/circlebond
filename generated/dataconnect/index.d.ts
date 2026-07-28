import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddCircleMemberWithAuditData {
  circleMembership_insert: CircleMembership_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}

export interface AddCircleMemberWithAuditVariables {
  circleId: UUIDString;
  actorId: string;
  memberId: string;
  role: string;
  createdAt: TimestampString;
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

export interface CreateCircleDraftData {
  circle_insert: Circle_Key;
  circleMembership_insert: CircleMembership_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
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

export interface SetGiftMemberAllocationData {
  circleMembership_update?: CircleMembership_Key | null;
}

export interface SetGiftMemberAllocationVariables {
  circleId: UUIDString;
  memberId: string;
  expectedAmount: number;
  contributionStatus: string;
}

export interface TransitionCircleWithAuditData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
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

