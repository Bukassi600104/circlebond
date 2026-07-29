# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `bondcircle`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCurrentUser*](#getcurrentuser)
  - [*GetDashboardCircles*](#getdashboardcircles)
  - [*GetCircleEngineRecord*](#getcircleenginerecord)
  - [*GetCircleLifecycleSummary*](#getcirclelifecyclesummary)
  - [*FindUserByEmail*](#finduserbyemail)
  - [*GetGiftCircleDetail*](#getgiftcircledetail)
  - [*GetCircleAuditEntries*](#getcircleauditentries)
  - [*GetAsoEbiCircleDetail*](#getasoebicircledetail)
  - [*GetSupportCircleDetail*](#getsupportcircledetail)
  - [*GetInvitationByTokenHash*](#getinvitationbytokenhash)
  - [*GetCircleInvitations*](#getcircleinvitations)
  - [*GetInvitationAcceptances*](#getinvitationacceptances)
  - [*GetContributionWorkspace*](#getcontributionworkspace)
  - [*GetCircleCommunication*](#getcirclecommunication)
  - [*GetRecentCommentsByAuthor*](#getrecentcommentsbyauthor)
  - [*GetOpenCommentReportsByReporter*](#getopencommentreportsbyreporter)
  - [*GetActivityLogsForCircles*](#getactivitylogsforcircles)
  - [*GetUserNotifications*](#getusernotifications)
  - [*GetNotificationContext*](#getnotificationcontext)
  - [*GetNotificationDedupe*](#getnotificationdedupe)
  - [*GetRecentReminderNotifications*](#getrecentremindernotifications)
  - [*FindNotificationRecipientByEmail*](#findnotificationrecipientbyemail)
  - [*GetDeadlineNotificationCandidates*](#getdeadlinenotificationcandidates)
  - [*GetUserDeadlineNotificationCandidates*](#getuserdeadlinenotificationcandidates)
  - [*GetRetentionCandidates*](#getretentioncandidates)
  - [*GetCircleRetentionPayload*](#getcircleretentionpayload)
  - [*GetStoragePathReferences*](#getstoragepathreferences)
  - [*GetOwnerAdministrator*](#getowneradministrator)
  - [*GetUserAccountStatus*](#getuseraccountstatus)
  - [*GetOwnerPlatformOverview*](#getownerplatformoverview)
  - [*GetOwnerReportReview*](#getownerreportreview)
  - [*GetOwnerUserByIdentifier*](#getowneruserbyidentifier)
  - [*GetOwnerOperationalExport*](#getowneroperationalexport)
  - [*GetOwnerInvitation*](#getownerinvitation)
- [**Mutations**](#mutations)
  - [*UpsertCurrentUser*](#upsertcurrentuser)
  - [*CreateCircleDraft*](#createcircledraft)
  - [*UpdateCircleConfigurationWithAudit*](#updatecircleconfigurationwithaudit)
  - [*TransitionCircleWithAudit*](#transitioncirclewithaudit)
  - [*SetCircleCompletionTypeWithAudit*](#setcirclecompletiontypewithaudit)
  - [*AddCircleMemberWithAudit*](#addcirclememberwithaudit)
  - [*ConfigureGiftCircle*](#configuregiftcircle)
  - [*SetGiftMemberAllocation*](#setgiftmemberallocation)
  - [*ConfigureAsoEbiCircle*](#configureasoebicircle)
  - [*CreateAsoEbiTier*](#createasoebitier)
  - [*SelectAsoEbiTier*](#selectasoebitier)
  - [*UpdateAsoEbiFulfilment*](#updateasoebifulfilment)
  - [*ConfigureSupportCircle*](#configuresupportcircle)
  - [*RecordSupportPledge*](#recordsupportpledge)
  - [*SetSupportMemberAllocation*](#setsupportmemberallocation)
  - [*CreateSupportUpdate*](#createsupportupdate)
  - [*SetSupportCompletionType*](#setsupportcompletiontype)
  - [*CreateInvitation*](#createinvitation)
  - [*UpdateInvitationState*](#updateinvitationstate)
  - [*AcceptInvitationWithMembership*](#acceptinvitationwithmembership)
  - [*RequestInvitationApproval*](#requestinvitationapproval)
  - [*SubmitReceiptWithAudit*](#submitreceiptwithaudit)
  - [*ReplaceReceiptWithAudit*](#replacereceiptwithaudit)
  - [*ReviewReceiptWithAudit*](#reviewreceiptwithaudit)
  - [*ApproveInvitationMembership*](#approveinvitationmembership)
  - [*DeclineInvitation*](#declineinvitation)
  - [*RequestReplacementInvitation*](#requestreplacementinvitation)
  - [*CreateAnnouncementWithActivity*](#createannouncementwithactivity)
  - [*UpdateAnnouncementWithAudit*](#updateannouncementwithaudit)
  - [*DeleteAnnouncementWithAudit*](#deleteannouncementwithaudit)
  - [*SetCircleCommentsWithAudit*](#setcirclecommentswithaudit)
  - [*CreateCommentWithActivity*](#createcommentwithactivity)
  - [*DeleteOwnCommentWithAudit*](#deleteowncommentwithaudit)
  - [*ModerateCommentWithAudit*](#moderatecommentwithaudit)
  - [*ReportCommentWithAudit*](#reportcommentwithaudit)
  - [*RecordSystemActivity*](#recordsystemactivity)
  - [*CreateNotification*](#createnotification)
  - [*MarkNotificationRead*](#marknotificationread)
  - [*DismissNotification*](#dismissnotification)
  - [*MarkAllNotificationsRead*](#markallnotificationsread)
  - [*UpdateNotificationPreferences*](#updatenotificationpreferences)
  - [*SetCircleNotificationMute*](#setcirclenotificationmute)
  - [*CreateEmailDelivery*](#createemaildelivery)
  - [*CreateRetentionPurgeAttempt*](#createretentionpurgeattempt)
  - [*CompleteRetentionPurgeAttempt*](#completeretentionpurgeattempt)
  - [*PurgeInvitationAcceptances*](#purgeinvitationacceptances)
  - [*PurgeCircleSensitiveData*](#purgecirclesensitivedata)
  - [*RecordOperationalEvent*](#recordoperationalevent)
  - [*RecordOwnerAdminAudit*](#recordowneradminaudit)
  - [*ResolveOwnerCommentReport*](#resolveownercommentreport)
  - [*DismissOwnerCommentReport*](#dismissownercommentreport)
  - [*SuspendOwnerTargetUser*](#suspendownertargetuser)
  - [*RevokeCompromisedInvitation*](#revokecompromisedinvitation)
  - [*ProvisionOwnerAdministrator*](#provisionowneradministrator)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `bondcircle`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@bondcircle/dataconnect` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@bondcircle/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@bondcircle/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `bondcircle` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCurrentUser
You can execute the `GetCurrentUser` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getCurrentUser(options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCurrentUser(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetCurrentUserData, undefined>;

interface GetCurrentUserRef {
  ...
  (dc: DataConnect): QueryRef<GetCurrentUserData, undefined>;
}
export const getCurrentUserRef: GetCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCurrentUserRef:
```typescript
const name = getCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `GetCurrentUser` query has no variables.
### Return Type
Recall that executing the `GetCurrentUser` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCurrentUserData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCurrentUser } from '@bondcircle/dataconnect';


// Call the `getCurrentUser()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCurrentUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCurrentUser(dataConnect);

console.log(data.user);

// Or, you can use the `Promise` API.
getCurrentUser().then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetCurrentUser`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCurrentUserRef } from '@bondcircle/dataconnect';


// Call the `getCurrentUserRef()` function to get a reference to the query.
const ref = getCurrentUserRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCurrentUserRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetDashboardCircles
You can execute the `GetDashboardCircles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getDashboardCircles(options?: ExecuteQueryOptions): QueryPromise<GetDashboardCirclesData, undefined>;

interface GetDashboardCirclesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetDashboardCirclesData, undefined>;
}
export const getDashboardCirclesRef: GetDashboardCirclesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDashboardCircles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetDashboardCirclesData, undefined>;

interface GetDashboardCirclesRef {
  ...
  (dc: DataConnect): QueryRef<GetDashboardCirclesData, undefined>;
}
export const getDashboardCirclesRef: GetDashboardCirclesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDashboardCirclesRef:
```typescript
const name = getDashboardCirclesRef.operationName;
console.log(name);
```

### Variables
The `GetDashboardCircles` query has no variables.
### Return Type
Recall that executing the `GetDashboardCircles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDashboardCirclesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetDashboardCircles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDashboardCircles } from '@bondcircle/dataconnect';


// Call the `getDashboardCircles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDashboardCircles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDashboardCircles(dataConnect);

console.log(data.circleMemberships);

// Or, you can use the `Promise` API.
getDashboardCircles().then((response) => {
  const data = response.data;
  console.log(data.circleMemberships);
});
```

### Using `GetDashboardCircles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDashboardCirclesRef } from '@bondcircle/dataconnect';


// Call the `getDashboardCirclesRef()` function to get a reference to the query.
const ref = getDashboardCirclesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDashboardCirclesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circleMemberships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMemberships);
});
```

## GetCircleEngineRecord
You can execute the `GetCircleEngineRecord` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getCircleEngineRecord(vars: GetCircleEngineRecordVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleEngineRecordData, GetCircleEngineRecordVariables>;

interface GetCircleEngineRecordRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCircleEngineRecordVariables): QueryRef<GetCircleEngineRecordData, GetCircleEngineRecordVariables>;
}
export const getCircleEngineRecordRef: GetCircleEngineRecordRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCircleEngineRecord(dc: DataConnect, vars: GetCircleEngineRecordVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleEngineRecordData, GetCircleEngineRecordVariables>;

interface GetCircleEngineRecordRef {
  ...
  (dc: DataConnect, vars: GetCircleEngineRecordVariables): QueryRef<GetCircleEngineRecordData, GetCircleEngineRecordVariables>;
}
export const getCircleEngineRecordRef: GetCircleEngineRecordRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCircleEngineRecordRef:
```typescript
const name = getCircleEngineRecordRef.operationName;
console.log(name);
```

### Variables
The `GetCircleEngineRecord` query requires an argument of type `GetCircleEngineRecordVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCircleEngineRecordVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCircleEngineRecord` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCircleEngineRecordData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCircleEngineRecord`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCircleEngineRecord, GetCircleEngineRecordVariables } from '@bondcircle/dataconnect';

// The `GetCircleEngineRecord` query requires an argument of type `GetCircleEngineRecordVariables`:
const getCircleEngineRecordVars: GetCircleEngineRecordVariables = {
  circleId: ..., 
};

// Call the `getCircleEngineRecord()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCircleEngineRecord(getCircleEngineRecordVars);
// Variables can be defined inline as well.
const { data } = await getCircleEngineRecord({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCircleEngineRecord(dataConnect, getCircleEngineRecordVars);

console.log(data.circle);
console.log(data.circleMemberships);

// Or, you can use the `Promise` API.
getCircleEngineRecord(getCircleEngineRecordVars).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.circleMemberships);
});
```

### Using `GetCircleEngineRecord`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCircleEngineRecordRef, GetCircleEngineRecordVariables } from '@bondcircle/dataconnect';

// The `GetCircleEngineRecord` query requires an argument of type `GetCircleEngineRecordVariables`:
const getCircleEngineRecordVars: GetCircleEngineRecordVariables = {
  circleId: ..., 
};

// Call the `getCircleEngineRecordRef()` function to get a reference to the query.
const ref = getCircleEngineRecordRef(getCircleEngineRecordVars);
// Variables can be defined inline as well.
const ref = getCircleEngineRecordRef({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCircleEngineRecordRef(dataConnect, getCircleEngineRecordVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circle);
console.log(data.circleMemberships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.circleMemberships);
});
```

## GetCircleLifecycleSummary
You can execute the `GetCircleLifecycleSummary` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getCircleLifecycleSummary(vars: GetCircleLifecycleSummaryVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleLifecycleSummaryData, GetCircleLifecycleSummaryVariables>;

interface GetCircleLifecycleSummaryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCircleLifecycleSummaryVariables): QueryRef<GetCircleLifecycleSummaryData, GetCircleLifecycleSummaryVariables>;
}
export const getCircleLifecycleSummaryRef: GetCircleLifecycleSummaryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCircleLifecycleSummary(dc: DataConnect, vars: GetCircleLifecycleSummaryVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleLifecycleSummaryData, GetCircleLifecycleSummaryVariables>;

interface GetCircleLifecycleSummaryRef {
  ...
  (dc: DataConnect, vars: GetCircleLifecycleSummaryVariables): QueryRef<GetCircleLifecycleSummaryData, GetCircleLifecycleSummaryVariables>;
}
export const getCircleLifecycleSummaryRef: GetCircleLifecycleSummaryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCircleLifecycleSummaryRef:
```typescript
const name = getCircleLifecycleSummaryRef.operationName;
console.log(name);
```

### Variables
The `GetCircleLifecycleSummary` query requires an argument of type `GetCircleLifecycleSummaryVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCircleLifecycleSummaryVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCircleLifecycleSummary` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCircleLifecycleSummaryData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCircleLifecycleSummary`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCircleLifecycleSummary, GetCircleLifecycleSummaryVariables } from '@bondcircle/dataconnect';

// The `GetCircleLifecycleSummary` query requires an argument of type `GetCircleLifecycleSummaryVariables`:
const getCircleLifecycleSummaryVars: GetCircleLifecycleSummaryVariables = {
  circleId: ..., 
};

// Call the `getCircleLifecycleSummary()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCircleLifecycleSummary(getCircleLifecycleSummaryVars);
// Variables can be defined inline as well.
const { data } = await getCircleLifecycleSummary({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCircleLifecycleSummary(dataConnect, getCircleLifecycleSummaryVars);

console.log(data.circle);
console.log(data.circleMemberships);
console.log(data.activityLogs);

// Or, you can use the `Promise` API.
getCircleLifecycleSummary(getCircleLifecycleSummaryVars).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.circleMemberships);
  console.log(data.activityLogs);
});
```

### Using `GetCircleLifecycleSummary`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCircleLifecycleSummaryRef, GetCircleLifecycleSummaryVariables } from '@bondcircle/dataconnect';

// The `GetCircleLifecycleSummary` query requires an argument of type `GetCircleLifecycleSummaryVariables`:
const getCircleLifecycleSummaryVars: GetCircleLifecycleSummaryVariables = {
  circleId: ..., 
};

// Call the `getCircleLifecycleSummaryRef()` function to get a reference to the query.
const ref = getCircleLifecycleSummaryRef(getCircleLifecycleSummaryVars);
// Variables can be defined inline as well.
const ref = getCircleLifecycleSummaryRef({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCircleLifecycleSummaryRef(dataConnect, getCircleLifecycleSummaryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circle);
console.log(data.circleMemberships);
console.log(data.activityLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.circleMemberships);
  console.log(data.activityLogs);
});
```

## FindUserByEmail
You can execute the `FindUserByEmail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
findUserByEmail(vars: FindUserByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<FindUserByEmailData, FindUserByEmailVariables>;

interface FindUserByEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: FindUserByEmailVariables): QueryRef<FindUserByEmailData, FindUserByEmailVariables>;
}
export const findUserByEmailRef: FindUserByEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
findUserByEmail(dc: DataConnect, vars: FindUserByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<FindUserByEmailData, FindUserByEmailVariables>;

interface FindUserByEmailRef {
  ...
  (dc: DataConnect, vars: FindUserByEmailVariables): QueryRef<FindUserByEmailData, FindUserByEmailVariables>;
}
export const findUserByEmailRef: FindUserByEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the findUserByEmailRef:
```typescript
const name = findUserByEmailRef.operationName;
console.log(name);
```

### Variables
The `FindUserByEmail` query requires an argument of type `FindUserByEmailVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface FindUserByEmailVariables {
  email: string;
}
```
### Return Type
Recall that executing the `FindUserByEmail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `FindUserByEmailData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `FindUserByEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, findUserByEmail, FindUserByEmailVariables } from '@bondcircle/dataconnect';

// The `FindUserByEmail` query requires an argument of type `FindUserByEmailVariables`:
const findUserByEmailVars: FindUserByEmailVariables = {
  email: ..., 
};

// Call the `findUserByEmail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await findUserByEmail(findUserByEmailVars);
// Variables can be defined inline as well.
const { data } = await findUserByEmail({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await findUserByEmail(dataConnect, findUserByEmailVars);

console.log(data.users);

// Or, you can use the `Promise` API.
findUserByEmail(findUserByEmailVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `FindUserByEmail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, findUserByEmailRef, FindUserByEmailVariables } from '@bondcircle/dataconnect';

// The `FindUserByEmail` query requires an argument of type `FindUserByEmailVariables`:
const findUserByEmailVars: FindUserByEmailVariables = {
  email: ..., 
};

// Call the `findUserByEmailRef()` function to get a reference to the query.
const ref = findUserByEmailRef(findUserByEmailVars);
// Variables can be defined inline as well.
const ref = findUserByEmailRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = findUserByEmailRef(dataConnect, findUserByEmailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetGiftCircleDetail
You can execute the `GetGiftCircleDetail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getGiftCircleDetail(vars: GetGiftCircleDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetGiftCircleDetailData, GetGiftCircleDetailVariables>;

interface GetGiftCircleDetailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetGiftCircleDetailVariables): QueryRef<GetGiftCircleDetailData, GetGiftCircleDetailVariables>;
}
export const getGiftCircleDetailRef: GetGiftCircleDetailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getGiftCircleDetail(dc: DataConnect, vars: GetGiftCircleDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetGiftCircleDetailData, GetGiftCircleDetailVariables>;

interface GetGiftCircleDetailRef {
  ...
  (dc: DataConnect, vars: GetGiftCircleDetailVariables): QueryRef<GetGiftCircleDetailData, GetGiftCircleDetailVariables>;
}
export const getGiftCircleDetailRef: GetGiftCircleDetailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getGiftCircleDetailRef:
```typescript
const name = getGiftCircleDetailRef.operationName;
console.log(name);
```

### Variables
The `GetGiftCircleDetail` query requires an argument of type `GetGiftCircleDetailVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetGiftCircleDetailVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that executing the `GetGiftCircleDetail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetGiftCircleDetailData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetGiftCircleDetail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getGiftCircleDetail, GetGiftCircleDetailVariables } from '@bondcircle/dataconnect';

// The `GetGiftCircleDetail` query requires an argument of type `GetGiftCircleDetailVariables`:
const getGiftCircleDetailVars: GetGiftCircleDetailVariables = {
  circleId: ..., 
};

// Call the `getGiftCircleDetail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getGiftCircleDetail(getGiftCircleDetailVars);
// Variables can be defined inline as well.
const { data } = await getGiftCircleDetail({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getGiftCircleDetail(dataConnect, getGiftCircleDetailVars);

console.log(data.circle);
console.log(data.circleMemberships);

// Or, you can use the `Promise` API.
getGiftCircleDetail(getGiftCircleDetailVars).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.circleMemberships);
});
```

### Using `GetGiftCircleDetail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getGiftCircleDetailRef, GetGiftCircleDetailVariables } from '@bondcircle/dataconnect';

// The `GetGiftCircleDetail` query requires an argument of type `GetGiftCircleDetailVariables`:
const getGiftCircleDetailVars: GetGiftCircleDetailVariables = {
  circleId: ..., 
};

// Call the `getGiftCircleDetailRef()` function to get a reference to the query.
const ref = getGiftCircleDetailRef(getGiftCircleDetailVars);
// Variables can be defined inline as well.
const ref = getGiftCircleDetailRef({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getGiftCircleDetailRef(dataConnect, getGiftCircleDetailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circle);
console.log(data.circleMemberships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.circleMemberships);
});
```

## GetCircleAuditEntries
You can execute the `GetCircleAuditEntries` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getCircleAuditEntries(vars: GetCircleAuditEntriesVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleAuditEntriesData, GetCircleAuditEntriesVariables>;

interface GetCircleAuditEntriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCircleAuditEntriesVariables): QueryRef<GetCircleAuditEntriesData, GetCircleAuditEntriesVariables>;
}
export const getCircleAuditEntriesRef: GetCircleAuditEntriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCircleAuditEntries(dc: DataConnect, vars: GetCircleAuditEntriesVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleAuditEntriesData, GetCircleAuditEntriesVariables>;

interface GetCircleAuditEntriesRef {
  ...
  (dc: DataConnect, vars: GetCircleAuditEntriesVariables): QueryRef<GetCircleAuditEntriesData, GetCircleAuditEntriesVariables>;
}
export const getCircleAuditEntriesRef: GetCircleAuditEntriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCircleAuditEntriesRef:
```typescript
const name = getCircleAuditEntriesRef.operationName;
console.log(name);
```

### Variables
The `GetCircleAuditEntries` query requires an argument of type `GetCircleAuditEntriesVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCircleAuditEntriesVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCircleAuditEntries` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCircleAuditEntriesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCircleAuditEntries`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCircleAuditEntries, GetCircleAuditEntriesVariables } from '@bondcircle/dataconnect';

// The `GetCircleAuditEntries` query requires an argument of type `GetCircleAuditEntriesVariables`:
const getCircleAuditEntriesVars: GetCircleAuditEntriesVariables = {
  circleId: ..., 
};

// Call the `getCircleAuditEntries()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCircleAuditEntries(getCircleAuditEntriesVars);
// Variables can be defined inline as well.
const { data } = await getCircleAuditEntries({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCircleAuditEntries(dataConnect, getCircleAuditEntriesVars);

console.log(data.circleAuditEntries);

// Or, you can use the `Promise` API.
getCircleAuditEntries(getCircleAuditEntriesVars).then((response) => {
  const data = response.data;
  console.log(data.circleAuditEntries);
});
```

### Using `GetCircleAuditEntries`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCircleAuditEntriesRef, GetCircleAuditEntriesVariables } from '@bondcircle/dataconnect';

// The `GetCircleAuditEntries` query requires an argument of type `GetCircleAuditEntriesVariables`:
const getCircleAuditEntriesVars: GetCircleAuditEntriesVariables = {
  circleId: ..., 
};

// Call the `getCircleAuditEntriesRef()` function to get a reference to the query.
const ref = getCircleAuditEntriesRef(getCircleAuditEntriesVars);
// Variables can be defined inline as well.
const ref = getCircleAuditEntriesRef({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCircleAuditEntriesRef(dataConnect, getCircleAuditEntriesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circleAuditEntries);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circleAuditEntries);
});
```

## GetAsoEbiCircleDetail
You can execute the `GetAsoEbiCircleDetail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getAsoEbiCircleDetail(vars: GetAsoEbiCircleDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetAsoEbiCircleDetailData, GetAsoEbiCircleDetailVariables>;

interface GetAsoEbiCircleDetailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetAsoEbiCircleDetailVariables): QueryRef<GetAsoEbiCircleDetailData, GetAsoEbiCircleDetailVariables>;
}
export const getAsoEbiCircleDetailRef: GetAsoEbiCircleDetailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getAsoEbiCircleDetail(dc: DataConnect, vars: GetAsoEbiCircleDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetAsoEbiCircleDetailData, GetAsoEbiCircleDetailVariables>;

interface GetAsoEbiCircleDetailRef {
  ...
  (dc: DataConnect, vars: GetAsoEbiCircleDetailVariables): QueryRef<GetAsoEbiCircleDetailData, GetAsoEbiCircleDetailVariables>;
}
export const getAsoEbiCircleDetailRef: GetAsoEbiCircleDetailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getAsoEbiCircleDetailRef:
```typescript
const name = getAsoEbiCircleDetailRef.operationName;
console.log(name);
```

### Variables
The `GetAsoEbiCircleDetail` query requires an argument of type `GetAsoEbiCircleDetailVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetAsoEbiCircleDetailVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that executing the `GetAsoEbiCircleDetail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetAsoEbiCircleDetailData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetAsoEbiCircleDetail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getAsoEbiCircleDetail, GetAsoEbiCircleDetailVariables } from '@bondcircle/dataconnect';

// The `GetAsoEbiCircleDetail` query requires an argument of type `GetAsoEbiCircleDetailVariables`:
const getAsoEbiCircleDetailVars: GetAsoEbiCircleDetailVariables = {
  circleId: ..., 
};

// Call the `getAsoEbiCircleDetail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getAsoEbiCircleDetail(getAsoEbiCircleDetailVars);
// Variables can be defined inline as well.
const { data } = await getAsoEbiCircleDetail({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getAsoEbiCircleDetail(dataConnect, getAsoEbiCircleDetailVars);

console.log(data.circle);
console.log(data.asoEbiTiers);
console.log(data.circleMemberships);

// Or, you can use the `Promise` API.
getAsoEbiCircleDetail(getAsoEbiCircleDetailVars).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.asoEbiTiers);
  console.log(data.circleMemberships);
});
```

### Using `GetAsoEbiCircleDetail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getAsoEbiCircleDetailRef, GetAsoEbiCircleDetailVariables } from '@bondcircle/dataconnect';

// The `GetAsoEbiCircleDetail` query requires an argument of type `GetAsoEbiCircleDetailVariables`:
const getAsoEbiCircleDetailVars: GetAsoEbiCircleDetailVariables = {
  circleId: ..., 
};

// Call the `getAsoEbiCircleDetailRef()` function to get a reference to the query.
const ref = getAsoEbiCircleDetailRef(getAsoEbiCircleDetailVars);
// Variables can be defined inline as well.
const ref = getAsoEbiCircleDetailRef({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getAsoEbiCircleDetailRef(dataConnect, getAsoEbiCircleDetailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circle);
console.log(data.asoEbiTiers);
console.log(data.circleMemberships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.asoEbiTiers);
  console.log(data.circleMemberships);
});
```

## GetSupportCircleDetail
You can execute the `GetSupportCircleDetail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getSupportCircleDetail(vars: GetSupportCircleDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetSupportCircleDetailData, GetSupportCircleDetailVariables>;

interface GetSupportCircleDetailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetSupportCircleDetailVariables): QueryRef<GetSupportCircleDetailData, GetSupportCircleDetailVariables>;
}
export const getSupportCircleDetailRef: GetSupportCircleDetailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getSupportCircleDetail(dc: DataConnect, vars: GetSupportCircleDetailVariables, options?: ExecuteQueryOptions): QueryPromise<GetSupportCircleDetailData, GetSupportCircleDetailVariables>;

interface GetSupportCircleDetailRef {
  ...
  (dc: DataConnect, vars: GetSupportCircleDetailVariables): QueryRef<GetSupportCircleDetailData, GetSupportCircleDetailVariables>;
}
export const getSupportCircleDetailRef: GetSupportCircleDetailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getSupportCircleDetailRef:
```typescript
const name = getSupportCircleDetailRef.operationName;
console.log(name);
```

### Variables
The `GetSupportCircleDetail` query requires an argument of type `GetSupportCircleDetailVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetSupportCircleDetailVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that executing the `GetSupportCircleDetail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetSupportCircleDetailData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetSupportCircleDetail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getSupportCircleDetail, GetSupportCircleDetailVariables } from '@bondcircle/dataconnect';

// The `GetSupportCircleDetail` query requires an argument of type `GetSupportCircleDetailVariables`:
const getSupportCircleDetailVars: GetSupportCircleDetailVariables = {
  circleId: ..., 
};

// Call the `getSupportCircleDetail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getSupportCircleDetail(getSupportCircleDetailVars);
// Variables can be defined inline as well.
const { data } = await getSupportCircleDetail({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getSupportCircleDetail(dataConnect, getSupportCircleDetailVars);

console.log(data.circle);
console.log(data.circleMemberships);
console.log(data.supportUpdates);

// Or, you can use the `Promise` API.
getSupportCircleDetail(getSupportCircleDetailVars).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.circleMemberships);
  console.log(data.supportUpdates);
});
```

### Using `GetSupportCircleDetail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getSupportCircleDetailRef, GetSupportCircleDetailVariables } from '@bondcircle/dataconnect';

// The `GetSupportCircleDetail` query requires an argument of type `GetSupportCircleDetailVariables`:
const getSupportCircleDetailVars: GetSupportCircleDetailVariables = {
  circleId: ..., 
};

// Call the `getSupportCircleDetailRef()` function to get a reference to the query.
const ref = getSupportCircleDetailRef(getSupportCircleDetailVars);
// Variables can be defined inline as well.
const ref = getSupportCircleDetailRef({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getSupportCircleDetailRef(dataConnect, getSupportCircleDetailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circle);
console.log(data.circleMemberships);
console.log(data.supportUpdates);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.circleMemberships);
  console.log(data.supportUpdates);
});
```

## GetInvitationByTokenHash
You can execute the `GetInvitationByTokenHash` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getInvitationByTokenHash(vars: GetInvitationByTokenHashVariables, options?: ExecuteQueryOptions): QueryPromise<GetInvitationByTokenHashData, GetInvitationByTokenHashVariables>;

interface GetInvitationByTokenHashRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInvitationByTokenHashVariables): QueryRef<GetInvitationByTokenHashData, GetInvitationByTokenHashVariables>;
}
export const getInvitationByTokenHashRef: GetInvitationByTokenHashRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getInvitationByTokenHash(dc: DataConnect, vars: GetInvitationByTokenHashVariables, options?: ExecuteQueryOptions): QueryPromise<GetInvitationByTokenHashData, GetInvitationByTokenHashVariables>;

interface GetInvitationByTokenHashRef {
  ...
  (dc: DataConnect, vars: GetInvitationByTokenHashVariables): QueryRef<GetInvitationByTokenHashData, GetInvitationByTokenHashVariables>;
}
export const getInvitationByTokenHashRef: GetInvitationByTokenHashRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getInvitationByTokenHashRef:
```typescript
const name = getInvitationByTokenHashRef.operationName;
console.log(name);
```

### Variables
The `GetInvitationByTokenHash` query requires an argument of type `GetInvitationByTokenHashVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetInvitationByTokenHashVariables {
  tokenHash: string;
}
```
### Return Type
Recall that executing the `GetInvitationByTokenHash` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetInvitationByTokenHashData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetInvitationByTokenHash`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getInvitationByTokenHash, GetInvitationByTokenHashVariables } from '@bondcircle/dataconnect';

// The `GetInvitationByTokenHash` query requires an argument of type `GetInvitationByTokenHashVariables`:
const getInvitationByTokenHashVars: GetInvitationByTokenHashVariables = {
  tokenHash: ..., 
};

// Call the `getInvitationByTokenHash()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getInvitationByTokenHash(getInvitationByTokenHashVars);
// Variables can be defined inline as well.
const { data } = await getInvitationByTokenHash({ tokenHash: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getInvitationByTokenHash(dataConnect, getInvitationByTokenHashVars);

console.log(data.invitations);

// Or, you can use the `Promise` API.
getInvitationByTokenHash(getInvitationByTokenHashVars).then((response) => {
  const data = response.data;
  console.log(data.invitations);
});
```

### Using `GetInvitationByTokenHash`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getInvitationByTokenHashRef, GetInvitationByTokenHashVariables } from '@bondcircle/dataconnect';

// The `GetInvitationByTokenHash` query requires an argument of type `GetInvitationByTokenHashVariables`:
const getInvitationByTokenHashVars: GetInvitationByTokenHashVariables = {
  tokenHash: ..., 
};

// Call the `getInvitationByTokenHashRef()` function to get a reference to the query.
const ref = getInvitationByTokenHashRef(getInvitationByTokenHashVars);
// Variables can be defined inline as well.
const ref = getInvitationByTokenHashRef({ tokenHash: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getInvitationByTokenHashRef(dataConnect, getInvitationByTokenHashVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.invitations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.invitations);
});
```

## GetCircleInvitations
You can execute the `GetCircleInvitations` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getCircleInvitations(vars: GetCircleInvitationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleInvitationsData, GetCircleInvitationsVariables>;

interface GetCircleInvitationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCircleInvitationsVariables): QueryRef<GetCircleInvitationsData, GetCircleInvitationsVariables>;
}
export const getCircleInvitationsRef: GetCircleInvitationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCircleInvitations(dc: DataConnect, vars: GetCircleInvitationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleInvitationsData, GetCircleInvitationsVariables>;

interface GetCircleInvitationsRef {
  ...
  (dc: DataConnect, vars: GetCircleInvitationsVariables): QueryRef<GetCircleInvitationsData, GetCircleInvitationsVariables>;
}
export const getCircleInvitationsRef: GetCircleInvitationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCircleInvitationsRef:
```typescript
const name = getCircleInvitationsRef.operationName;
console.log(name);
```

### Variables
The `GetCircleInvitations` query requires an argument of type `GetCircleInvitationsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCircleInvitationsVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCircleInvitations` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCircleInvitationsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCircleInvitations`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCircleInvitations, GetCircleInvitationsVariables } from '@bondcircle/dataconnect';

// The `GetCircleInvitations` query requires an argument of type `GetCircleInvitationsVariables`:
const getCircleInvitationsVars: GetCircleInvitationsVariables = {
  circleId: ..., 
};

// Call the `getCircleInvitations()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCircleInvitations(getCircleInvitationsVars);
// Variables can be defined inline as well.
const { data } = await getCircleInvitations({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCircleInvitations(dataConnect, getCircleInvitationsVars);

console.log(data.invitations);

// Or, you can use the `Promise` API.
getCircleInvitations(getCircleInvitationsVars).then((response) => {
  const data = response.data;
  console.log(data.invitations);
});
```

### Using `GetCircleInvitations`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCircleInvitationsRef, GetCircleInvitationsVariables } from '@bondcircle/dataconnect';

// The `GetCircleInvitations` query requires an argument of type `GetCircleInvitationsVariables`:
const getCircleInvitationsVars: GetCircleInvitationsVariables = {
  circleId: ..., 
};

// Call the `getCircleInvitationsRef()` function to get a reference to the query.
const ref = getCircleInvitationsRef(getCircleInvitationsVars);
// Variables can be defined inline as well.
const ref = getCircleInvitationsRef({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCircleInvitationsRef(dataConnect, getCircleInvitationsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.invitations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.invitations);
});
```

## GetInvitationAcceptances
You can execute the `GetInvitationAcceptances` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getInvitationAcceptances(vars: GetInvitationAcceptancesVariables, options?: ExecuteQueryOptions): QueryPromise<GetInvitationAcceptancesData, GetInvitationAcceptancesVariables>;

interface GetInvitationAcceptancesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetInvitationAcceptancesVariables): QueryRef<GetInvitationAcceptancesData, GetInvitationAcceptancesVariables>;
}
export const getInvitationAcceptancesRef: GetInvitationAcceptancesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getInvitationAcceptances(dc: DataConnect, vars: GetInvitationAcceptancesVariables, options?: ExecuteQueryOptions): QueryPromise<GetInvitationAcceptancesData, GetInvitationAcceptancesVariables>;

interface GetInvitationAcceptancesRef {
  ...
  (dc: DataConnect, vars: GetInvitationAcceptancesVariables): QueryRef<GetInvitationAcceptancesData, GetInvitationAcceptancesVariables>;
}
export const getInvitationAcceptancesRef: GetInvitationAcceptancesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getInvitationAcceptancesRef:
```typescript
const name = getInvitationAcceptancesRef.operationName;
console.log(name);
```

### Variables
The `GetInvitationAcceptances` query requires an argument of type `GetInvitationAcceptancesVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetInvitationAcceptancesVariables {
  invitationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetInvitationAcceptances` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetInvitationAcceptancesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetInvitationAcceptances`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getInvitationAcceptances, GetInvitationAcceptancesVariables } from '@bondcircle/dataconnect';

// The `GetInvitationAcceptances` query requires an argument of type `GetInvitationAcceptancesVariables`:
const getInvitationAcceptancesVars: GetInvitationAcceptancesVariables = {
  invitationId: ..., 
};

// Call the `getInvitationAcceptances()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getInvitationAcceptances(getInvitationAcceptancesVars);
// Variables can be defined inline as well.
const { data } = await getInvitationAcceptances({ invitationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getInvitationAcceptances(dataConnect, getInvitationAcceptancesVars);

console.log(data.invitationAcceptances);

// Or, you can use the `Promise` API.
getInvitationAcceptances(getInvitationAcceptancesVars).then((response) => {
  const data = response.data;
  console.log(data.invitationAcceptances);
});
```

### Using `GetInvitationAcceptances`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getInvitationAcceptancesRef, GetInvitationAcceptancesVariables } from '@bondcircle/dataconnect';

// The `GetInvitationAcceptances` query requires an argument of type `GetInvitationAcceptancesVariables`:
const getInvitationAcceptancesVars: GetInvitationAcceptancesVariables = {
  invitationId: ..., 
};

// Call the `getInvitationAcceptancesRef()` function to get a reference to the query.
const ref = getInvitationAcceptancesRef(getInvitationAcceptancesVars);
// Variables can be defined inline as well.
const ref = getInvitationAcceptancesRef({ invitationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getInvitationAcceptancesRef(dataConnect, getInvitationAcceptancesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.invitationAcceptances);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.invitationAcceptances);
});
```

## GetContributionWorkspace
You can execute the `GetContributionWorkspace` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getContributionWorkspace(vars: GetContributionWorkspaceVariables, options?: ExecuteQueryOptions): QueryPromise<GetContributionWorkspaceData, GetContributionWorkspaceVariables>;

interface GetContributionWorkspaceRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetContributionWorkspaceVariables): QueryRef<GetContributionWorkspaceData, GetContributionWorkspaceVariables>;
}
export const getContributionWorkspaceRef: GetContributionWorkspaceRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getContributionWorkspace(dc: DataConnect, vars: GetContributionWorkspaceVariables, options?: ExecuteQueryOptions): QueryPromise<GetContributionWorkspaceData, GetContributionWorkspaceVariables>;

interface GetContributionWorkspaceRef {
  ...
  (dc: DataConnect, vars: GetContributionWorkspaceVariables): QueryRef<GetContributionWorkspaceData, GetContributionWorkspaceVariables>;
}
export const getContributionWorkspaceRef: GetContributionWorkspaceRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getContributionWorkspaceRef:
```typescript
const name = getContributionWorkspaceRef.operationName;
console.log(name);
```

### Variables
The `GetContributionWorkspace` query requires an argument of type `GetContributionWorkspaceVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetContributionWorkspaceVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that executing the `GetContributionWorkspace` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetContributionWorkspaceData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetContributionWorkspace`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getContributionWorkspace, GetContributionWorkspaceVariables } from '@bondcircle/dataconnect';

// The `GetContributionWorkspace` query requires an argument of type `GetContributionWorkspaceVariables`:
const getContributionWorkspaceVars: GetContributionWorkspaceVariables = {
  circleId: ..., 
};

// Call the `getContributionWorkspace()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getContributionWorkspace(getContributionWorkspaceVars);
// Variables can be defined inline as well.
const { data } = await getContributionWorkspace({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getContributionWorkspace(dataConnect, getContributionWorkspaceVars);

console.log(data.circle);
console.log(data.circleMemberships);
console.log(data.receipts);

// Or, you can use the `Promise` API.
getContributionWorkspace(getContributionWorkspaceVars).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.circleMemberships);
  console.log(data.receipts);
});
```

### Using `GetContributionWorkspace`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getContributionWorkspaceRef, GetContributionWorkspaceVariables } from '@bondcircle/dataconnect';

// The `GetContributionWorkspace` query requires an argument of type `GetContributionWorkspaceVariables`:
const getContributionWorkspaceVars: GetContributionWorkspaceVariables = {
  circleId: ..., 
};

// Call the `getContributionWorkspaceRef()` function to get a reference to the query.
const ref = getContributionWorkspaceRef(getContributionWorkspaceVars);
// Variables can be defined inline as well.
const ref = getContributionWorkspaceRef({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getContributionWorkspaceRef(dataConnect, getContributionWorkspaceVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circle);
console.log(data.circleMemberships);
console.log(data.receipts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.circleMemberships);
  console.log(data.receipts);
});
```

## GetCircleCommunication
You can execute the `GetCircleCommunication` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getCircleCommunication(vars: GetCircleCommunicationVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleCommunicationData, GetCircleCommunicationVariables>;

interface GetCircleCommunicationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCircleCommunicationVariables): QueryRef<GetCircleCommunicationData, GetCircleCommunicationVariables>;
}
export const getCircleCommunicationRef: GetCircleCommunicationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCircleCommunication(dc: DataConnect, vars: GetCircleCommunicationVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleCommunicationData, GetCircleCommunicationVariables>;

interface GetCircleCommunicationRef {
  ...
  (dc: DataConnect, vars: GetCircleCommunicationVariables): QueryRef<GetCircleCommunicationData, GetCircleCommunicationVariables>;
}
export const getCircleCommunicationRef: GetCircleCommunicationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCircleCommunicationRef:
```typescript
const name = getCircleCommunicationRef.operationName;
console.log(name);
```

### Variables
The `GetCircleCommunication` query requires an argument of type `GetCircleCommunicationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCircleCommunicationVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCircleCommunication` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCircleCommunicationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCircleCommunication`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCircleCommunication, GetCircleCommunicationVariables } from '@bondcircle/dataconnect';

// The `GetCircleCommunication` query requires an argument of type `GetCircleCommunicationVariables`:
const getCircleCommunicationVars: GetCircleCommunicationVariables = {
  circleId: ..., 
};

// Call the `getCircleCommunication()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCircleCommunication(getCircleCommunicationVars);
// Variables can be defined inline as well.
const { data } = await getCircleCommunication({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCircleCommunication(dataConnect, getCircleCommunicationVars);

console.log(data.circle);
console.log(data.circleMemberships);
console.log(data.announcements);
console.log(data.comments);
console.log(data.commentReports);
console.log(data.activityLogs);

// Or, you can use the `Promise` API.
getCircleCommunication(getCircleCommunicationVars).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.circleMemberships);
  console.log(data.announcements);
  console.log(data.comments);
  console.log(data.commentReports);
  console.log(data.activityLogs);
});
```

### Using `GetCircleCommunication`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCircleCommunicationRef, GetCircleCommunicationVariables } from '@bondcircle/dataconnect';

// The `GetCircleCommunication` query requires an argument of type `GetCircleCommunicationVariables`:
const getCircleCommunicationVars: GetCircleCommunicationVariables = {
  circleId: ..., 
};

// Call the `getCircleCommunicationRef()` function to get a reference to the query.
const ref = getCircleCommunicationRef(getCircleCommunicationVars);
// Variables can be defined inline as well.
const ref = getCircleCommunicationRef({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCircleCommunicationRef(dataConnect, getCircleCommunicationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circle);
console.log(data.circleMemberships);
console.log(data.announcements);
console.log(data.comments);
console.log(data.commentReports);
console.log(data.activityLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.circleMemberships);
  console.log(data.announcements);
  console.log(data.comments);
  console.log(data.commentReports);
  console.log(data.activityLogs);
});
```

## GetRecentCommentsByAuthor
You can execute the `GetRecentCommentsByAuthor` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getRecentCommentsByAuthor(vars: GetRecentCommentsByAuthorVariables, options?: ExecuteQueryOptions): QueryPromise<GetRecentCommentsByAuthorData, GetRecentCommentsByAuthorVariables>;

interface GetRecentCommentsByAuthorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRecentCommentsByAuthorVariables): QueryRef<GetRecentCommentsByAuthorData, GetRecentCommentsByAuthorVariables>;
}
export const getRecentCommentsByAuthorRef: GetRecentCommentsByAuthorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getRecentCommentsByAuthor(dc: DataConnect, vars: GetRecentCommentsByAuthorVariables, options?: ExecuteQueryOptions): QueryPromise<GetRecentCommentsByAuthorData, GetRecentCommentsByAuthorVariables>;

interface GetRecentCommentsByAuthorRef {
  ...
  (dc: DataConnect, vars: GetRecentCommentsByAuthorVariables): QueryRef<GetRecentCommentsByAuthorData, GetRecentCommentsByAuthorVariables>;
}
export const getRecentCommentsByAuthorRef: GetRecentCommentsByAuthorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getRecentCommentsByAuthorRef:
```typescript
const name = getRecentCommentsByAuthorRef.operationName;
console.log(name);
```

### Variables
The `GetRecentCommentsByAuthor` query requires an argument of type `GetRecentCommentsByAuthorVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetRecentCommentsByAuthorVariables {
  circleId: UUIDString;
  authorId: string;
  since: TimestampString;
}
```
### Return Type
Recall that executing the `GetRecentCommentsByAuthor` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetRecentCommentsByAuthorData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetRecentCommentsByAuthorData {
  comments: ({
    createdAt: TimestampString;
  })[];
}
```
### Using `GetRecentCommentsByAuthor`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getRecentCommentsByAuthor, GetRecentCommentsByAuthorVariables } from '@bondcircle/dataconnect';

// The `GetRecentCommentsByAuthor` query requires an argument of type `GetRecentCommentsByAuthorVariables`:
const getRecentCommentsByAuthorVars: GetRecentCommentsByAuthorVariables = {
  circleId: ..., 
  authorId: ..., 
  since: ..., 
};

// Call the `getRecentCommentsByAuthor()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getRecentCommentsByAuthor(getRecentCommentsByAuthorVars);
// Variables can be defined inline as well.
const { data } = await getRecentCommentsByAuthor({ circleId: ..., authorId: ..., since: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getRecentCommentsByAuthor(dataConnect, getRecentCommentsByAuthorVars);

console.log(data.comments);

// Or, you can use the `Promise` API.
getRecentCommentsByAuthor(getRecentCommentsByAuthorVars).then((response) => {
  const data = response.data;
  console.log(data.comments);
});
```

### Using `GetRecentCommentsByAuthor`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getRecentCommentsByAuthorRef, GetRecentCommentsByAuthorVariables } from '@bondcircle/dataconnect';

// The `GetRecentCommentsByAuthor` query requires an argument of type `GetRecentCommentsByAuthorVariables`:
const getRecentCommentsByAuthorVars: GetRecentCommentsByAuthorVariables = {
  circleId: ..., 
  authorId: ..., 
  since: ..., 
};

// Call the `getRecentCommentsByAuthorRef()` function to get a reference to the query.
const ref = getRecentCommentsByAuthorRef(getRecentCommentsByAuthorVars);
// Variables can be defined inline as well.
const ref = getRecentCommentsByAuthorRef({ circleId: ..., authorId: ..., since: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getRecentCommentsByAuthorRef(dataConnect, getRecentCommentsByAuthorVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.comments);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.comments);
});
```

## GetOpenCommentReportsByReporter
You can execute the `GetOpenCommentReportsByReporter` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getOpenCommentReportsByReporter(vars: GetOpenCommentReportsByReporterVariables, options?: ExecuteQueryOptions): QueryPromise<GetOpenCommentReportsByReporterData, GetOpenCommentReportsByReporterVariables>;

interface GetOpenCommentReportsByReporterRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOpenCommentReportsByReporterVariables): QueryRef<GetOpenCommentReportsByReporterData, GetOpenCommentReportsByReporterVariables>;
}
export const getOpenCommentReportsByReporterRef: GetOpenCommentReportsByReporterRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOpenCommentReportsByReporter(dc: DataConnect, vars: GetOpenCommentReportsByReporterVariables, options?: ExecuteQueryOptions): QueryPromise<GetOpenCommentReportsByReporterData, GetOpenCommentReportsByReporterVariables>;

interface GetOpenCommentReportsByReporterRef {
  ...
  (dc: DataConnect, vars: GetOpenCommentReportsByReporterVariables): QueryRef<GetOpenCommentReportsByReporterData, GetOpenCommentReportsByReporterVariables>;
}
export const getOpenCommentReportsByReporterRef: GetOpenCommentReportsByReporterRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOpenCommentReportsByReporterRef:
```typescript
const name = getOpenCommentReportsByReporterRef.operationName;
console.log(name);
```

### Variables
The `GetOpenCommentReportsByReporter` query requires an argument of type `GetOpenCommentReportsByReporterVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOpenCommentReportsByReporterVariables {
  commentId: UUIDString;
  reporterId: string;
}
```
### Return Type
Recall that executing the `GetOpenCommentReportsByReporter` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOpenCommentReportsByReporterData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetOpenCommentReportsByReporterData {
  commentReports: ({
    id: UUIDString;
  } & CommentReport_Key)[];
}
```
### Using `GetOpenCommentReportsByReporter`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOpenCommentReportsByReporter, GetOpenCommentReportsByReporterVariables } from '@bondcircle/dataconnect';

// The `GetOpenCommentReportsByReporter` query requires an argument of type `GetOpenCommentReportsByReporterVariables`:
const getOpenCommentReportsByReporterVars: GetOpenCommentReportsByReporterVariables = {
  commentId: ..., 
  reporterId: ..., 
};

// Call the `getOpenCommentReportsByReporter()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOpenCommentReportsByReporter(getOpenCommentReportsByReporterVars);
// Variables can be defined inline as well.
const { data } = await getOpenCommentReportsByReporter({ commentId: ..., reporterId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOpenCommentReportsByReporter(dataConnect, getOpenCommentReportsByReporterVars);

console.log(data.commentReports);

// Or, you can use the `Promise` API.
getOpenCommentReportsByReporter(getOpenCommentReportsByReporterVars).then((response) => {
  const data = response.data;
  console.log(data.commentReports);
});
```

### Using `GetOpenCommentReportsByReporter`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOpenCommentReportsByReporterRef, GetOpenCommentReportsByReporterVariables } from '@bondcircle/dataconnect';

// The `GetOpenCommentReportsByReporter` query requires an argument of type `GetOpenCommentReportsByReporterVariables`:
const getOpenCommentReportsByReporterVars: GetOpenCommentReportsByReporterVariables = {
  commentId: ..., 
  reporterId: ..., 
};

// Call the `getOpenCommentReportsByReporterRef()` function to get a reference to the query.
const ref = getOpenCommentReportsByReporterRef(getOpenCommentReportsByReporterVars);
// Variables can be defined inline as well.
const ref = getOpenCommentReportsByReporterRef({ commentId: ..., reporterId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOpenCommentReportsByReporterRef(dataConnect, getOpenCommentReportsByReporterVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.commentReports);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.commentReports);
});
```

## GetActivityLogsForCircles
You can execute the `GetActivityLogsForCircles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getActivityLogsForCircles(vars: GetActivityLogsForCirclesVariables, options?: ExecuteQueryOptions): QueryPromise<GetActivityLogsForCirclesData, GetActivityLogsForCirclesVariables>;

interface GetActivityLogsForCirclesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetActivityLogsForCirclesVariables): QueryRef<GetActivityLogsForCirclesData, GetActivityLogsForCirclesVariables>;
}
export const getActivityLogsForCirclesRef: GetActivityLogsForCirclesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getActivityLogsForCircles(dc: DataConnect, vars: GetActivityLogsForCirclesVariables, options?: ExecuteQueryOptions): QueryPromise<GetActivityLogsForCirclesData, GetActivityLogsForCirclesVariables>;

interface GetActivityLogsForCirclesRef {
  ...
  (dc: DataConnect, vars: GetActivityLogsForCirclesVariables): QueryRef<GetActivityLogsForCirclesData, GetActivityLogsForCirclesVariables>;
}
export const getActivityLogsForCirclesRef: GetActivityLogsForCirclesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getActivityLogsForCirclesRef:
```typescript
const name = getActivityLogsForCirclesRef.operationName;
console.log(name);
```

### Variables
The `GetActivityLogsForCircles` query requires an argument of type `GetActivityLogsForCirclesVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetActivityLogsForCirclesVariables {
  circleIds: UUIDString[];
}
```
### Return Type
Recall that executing the `GetActivityLogsForCircles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetActivityLogsForCirclesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetActivityLogsForCircles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getActivityLogsForCircles, GetActivityLogsForCirclesVariables } from '@bondcircle/dataconnect';

// The `GetActivityLogsForCircles` query requires an argument of type `GetActivityLogsForCirclesVariables`:
const getActivityLogsForCirclesVars: GetActivityLogsForCirclesVariables = {
  circleIds: ..., 
};

// Call the `getActivityLogsForCircles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getActivityLogsForCircles(getActivityLogsForCirclesVars);
// Variables can be defined inline as well.
const { data } = await getActivityLogsForCircles({ circleIds: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getActivityLogsForCircles(dataConnect, getActivityLogsForCirclesVars);

console.log(data.activityLogs);

// Or, you can use the `Promise` API.
getActivityLogsForCircles(getActivityLogsForCirclesVars).then((response) => {
  const data = response.data;
  console.log(data.activityLogs);
});
```

### Using `GetActivityLogsForCircles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getActivityLogsForCirclesRef, GetActivityLogsForCirclesVariables } from '@bondcircle/dataconnect';

// The `GetActivityLogsForCircles` query requires an argument of type `GetActivityLogsForCirclesVariables`:
const getActivityLogsForCirclesVars: GetActivityLogsForCirclesVariables = {
  circleIds: ..., 
};

// Call the `getActivityLogsForCirclesRef()` function to get a reference to the query.
const ref = getActivityLogsForCirclesRef(getActivityLogsForCirclesVars);
// Variables can be defined inline as well.
const ref = getActivityLogsForCirclesRef({ circleIds: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getActivityLogsForCirclesRef(dataConnect, getActivityLogsForCirclesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.activityLogs);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.activityLogs);
});
```

## GetUserNotifications
You can execute the `GetUserNotifications` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getUserNotifications(vars: GetUserNotificationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserNotificationsData, GetUserNotificationsVariables>;

interface GetUserNotificationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserNotificationsVariables): QueryRef<GetUserNotificationsData, GetUserNotificationsVariables>;
}
export const getUserNotificationsRef: GetUserNotificationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserNotifications(dc: DataConnect, vars: GetUserNotificationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserNotificationsData, GetUserNotificationsVariables>;

interface GetUserNotificationsRef {
  ...
  (dc: DataConnect, vars: GetUserNotificationsVariables): QueryRef<GetUserNotificationsData, GetUserNotificationsVariables>;
}
export const getUserNotificationsRef: GetUserNotificationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserNotificationsRef:
```typescript
const name = getUserNotificationsRef.operationName;
console.log(name);
```

### Variables
The `GetUserNotifications` query requires an argument of type `GetUserNotificationsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserNotificationsVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `GetUserNotifications` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserNotificationsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserNotifications`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserNotifications, GetUserNotificationsVariables } from '@bondcircle/dataconnect';

// The `GetUserNotifications` query requires an argument of type `GetUserNotificationsVariables`:
const getUserNotificationsVars: GetUserNotificationsVariables = {
  userId: ..., 
};

// Call the `getUserNotifications()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserNotifications(getUserNotificationsVars);
// Variables can be defined inline as well.
const { data } = await getUserNotifications({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserNotifications(dataConnect, getUserNotificationsVars);

console.log(data.user);
console.log(data.notifications);
console.log(data.circleMemberships);

// Or, you can use the `Promise` API.
getUserNotifications(getUserNotificationsVars).then((response) => {
  const data = response.data;
  console.log(data.user);
  console.log(data.notifications);
  console.log(data.circleMemberships);
});
```

### Using `GetUserNotifications`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserNotificationsRef, GetUserNotificationsVariables } from '@bondcircle/dataconnect';

// The `GetUserNotifications` query requires an argument of type `GetUserNotificationsVariables`:
const getUserNotificationsVars: GetUserNotificationsVariables = {
  userId: ..., 
};

// Call the `getUserNotificationsRef()` function to get a reference to the query.
const ref = getUserNotificationsRef(getUserNotificationsVars);
// Variables can be defined inline as well.
const ref = getUserNotificationsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserNotificationsRef(dataConnect, getUserNotificationsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);
console.log(data.notifications);
console.log(data.circleMemberships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
  console.log(data.notifications);
  console.log(data.circleMemberships);
});
```

## GetNotificationContext
You can execute the `GetNotificationContext` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getNotificationContext(vars: GetNotificationContextVariables, options?: ExecuteQueryOptions): QueryPromise<GetNotificationContextData, GetNotificationContextVariables>;

interface GetNotificationContextRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetNotificationContextVariables): QueryRef<GetNotificationContextData, GetNotificationContextVariables>;
}
export const getNotificationContextRef: GetNotificationContextRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getNotificationContext(dc: DataConnect, vars: GetNotificationContextVariables, options?: ExecuteQueryOptions): QueryPromise<GetNotificationContextData, GetNotificationContextVariables>;

interface GetNotificationContextRef {
  ...
  (dc: DataConnect, vars: GetNotificationContextVariables): QueryRef<GetNotificationContextData, GetNotificationContextVariables>;
}
export const getNotificationContextRef: GetNotificationContextRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getNotificationContextRef:
```typescript
const name = getNotificationContextRef.operationName;
console.log(name);
```

### Variables
The `GetNotificationContext` query requires an argument of type `GetNotificationContextVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetNotificationContextVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that executing the `GetNotificationContext` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetNotificationContextData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetNotificationContext`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getNotificationContext, GetNotificationContextVariables } from '@bondcircle/dataconnect';

// The `GetNotificationContext` query requires an argument of type `GetNotificationContextVariables`:
const getNotificationContextVars: GetNotificationContextVariables = {
  circleId: ..., 
};

// Call the `getNotificationContext()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getNotificationContext(getNotificationContextVars);
// Variables can be defined inline as well.
const { data } = await getNotificationContext({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getNotificationContext(dataConnect, getNotificationContextVars);

console.log(data.circle);
console.log(data.circleMemberships);

// Or, you can use the `Promise` API.
getNotificationContext(getNotificationContextVars).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.circleMemberships);
});
```

### Using `GetNotificationContext`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getNotificationContextRef, GetNotificationContextVariables } from '@bondcircle/dataconnect';

// The `GetNotificationContext` query requires an argument of type `GetNotificationContextVariables`:
const getNotificationContextVars: GetNotificationContextVariables = {
  circleId: ..., 
};

// Call the `getNotificationContextRef()` function to get a reference to the query.
const ref = getNotificationContextRef(getNotificationContextVars);
// Variables can be defined inline as well.
const ref = getNotificationContextRef({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getNotificationContextRef(dataConnect, getNotificationContextVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circle);
console.log(data.circleMemberships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.circleMemberships);
});
```

## GetNotificationDedupe
You can execute the `GetNotificationDedupe` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getNotificationDedupe(vars: GetNotificationDedupeVariables, options?: ExecuteQueryOptions): QueryPromise<GetNotificationDedupeData, GetNotificationDedupeVariables>;

interface GetNotificationDedupeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetNotificationDedupeVariables): QueryRef<GetNotificationDedupeData, GetNotificationDedupeVariables>;
}
export const getNotificationDedupeRef: GetNotificationDedupeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getNotificationDedupe(dc: DataConnect, vars: GetNotificationDedupeVariables, options?: ExecuteQueryOptions): QueryPromise<GetNotificationDedupeData, GetNotificationDedupeVariables>;

interface GetNotificationDedupeRef {
  ...
  (dc: DataConnect, vars: GetNotificationDedupeVariables): QueryRef<GetNotificationDedupeData, GetNotificationDedupeVariables>;
}
export const getNotificationDedupeRef: GetNotificationDedupeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getNotificationDedupeRef:
```typescript
const name = getNotificationDedupeRef.operationName;
console.log(name);
```

### Variables
The `GetNotificationDedupe` query requires an argument of type `GetNotificationDedupeVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetNotificationDedupeVariables {
  recipientId: string;
  dedupeKey: string;
}
```
### Return Type
Recall that executing the `GetNotificationDedupe` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetNotificationDedupeData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetNotificationDedupeData {
  notifications: ({
    id: UUIDString;
  } & Notification_Key)[];
}
```
### Using `GetNotificationDedupe`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getNotificationDedupe, GetNotificationDedupeVariables } from '@bondcircle/dataconnect';

// The `GetNotificationDedupe` query requires an argument of type `GetNotificationDedupeVariables`:
const getNotificationDedupeVars: GetNotificationDedupeVariables = {
  recipientId: ..., 
  dedupeKey: ..., 
};

// Call the `getNotificationDedupe()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getNotificationDedupe(getNotificationDedupeVars);
// Variables can be defined inline as well.
const { data } = await getNotificationDedupe({ recipientId: ..., dedupeKey: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getNotificationDedupe(dataConnect, getNotificationDedupeVars);

console.log(data.notifications);

// Or, you can use the `Promise` API.
getNotificationDedupe(getNotificationDedupeVars).then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

### Using `GetNotificationDedupe`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getNotificationDedupeRef, GetNotificationDedupeVariables } from '@bondcircle/dataconnect';

// The `GetNotificationDedupe` query requires an argument of type `GetNotificationDedupeVariables`:
const getNotificationDedupeVars: GetNotificationDedupeVariables = {
  recipientId: ..., 
  dedupeKey: ..., 
};

// Call the `getNotificationDedupeRef()` function to get a reference to the query.
const ref = getNotificationDedupeRef(getNotificationDedupeVars);
// Variables can be defined inline as well.
const ref = getNotificationDedupeRef({ recipientId: ..., dedupeKey: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getNotificationDedupeRef(dataConnect, getNotificationDedupeVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.notifications);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

## GetRecentReminderNotifications
You can execute the `GetRecentReminderNotifications` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getRecentReminderNotifications(vars: GetRecentReminderNotificationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetRecentReminderNotificationsData, GetRecentReminderNotificationsVariables>;

interface GetRecentReminderNotificationsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRecentReminderNotificationsVariables): QueryRef<GetRecentReminderNotificationsData, GetRecentReminderNotificationsVariables>;
}
export const getRecentReminderNotificationsRef: GetRecentReminderNotificationsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getRecentReminderNotifications(dc: DataConnect, vars: GetRecentReminderNotificationsVariables, options?: ExecuteQueryOptions): QueryPromise<GetRecentReminderNotificationsData, GetRecentReminderNotificationsVariables>;

interface GetRecentReminderNotificationsRef {
  ...
  (dc: DataConnect, vars: GetRecentReminderNotificationsVariables): QueryRef<GetRecentReminderNotificationsData, GetRecentReminderNotificationsVariables>;
}
export const getRecentReminderNotificationsRef: GetRecentReminderNotificationsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getRecentReminderNotificationsRef:
```typescript
const name = getRecentReminderNotificationsRef.operationName;
console.log(name);
```

### Variables
The `GetRecentReminderNotifications` query requires an argument of type `GetRecentReminderNotificationsVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetRecentReminderNotificationsVariables {
  circleId: UUIDString;
  recipientId: string;
  since: TimestampString;
}
```
### Return Type
Recall that executing the `GetRecentReminderNotifications` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetRecentReminderNotificationsData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetRecentReminderNotificationsData {
  notifications: ({
    id: UUIDString;
  } & Notification_Key)[];
}
```
### Using `GetRecentReminderNotifications`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getRecentReminderNotifications, GetRecentReminderNotificationsVariables } from '@bondcircle/dataconnect';

// The `GetRecentReminderNotifications` query requires an argument of type `GetRecentReminderNotificationsVariables`:
const getRecentReminderNotificationsVars: GetRecentReminderNotificationsVariables = {
  circleId: ..., 
  recipientId: ..., 
  since: ..., 
};

// Call the `getRecentReminderNotifications()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getRecentReminderNotifications(getRecentReminderNotificationsVars);
// Variables can be defined inline as well.
const { data } = await getRecentReminderNotifications({ circleId: ..., recipientId: ..., since: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getRecentReminderNotifications(dataConnect, getRecentReminderNotificationsVars);

console.log(data.notifications);

// Or, you can use the `Promise` API.
getRecentReminderNotifications(getRecentReminderNotificationsVars).then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

### Using `GetRecentReminderNotifications`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getRecentReminderNotificationsRef, GetRecentReminderNotificationsVariables } from '@bondcircle/dataconnect';

// The `GetRecentReminderNotifications` query requires an argument of type `GetRecentReminderNotificationsVariables`:
const getRecentReminderNotificationsVars: GetRecentReminderNotificationsVariables = {
  circleId: ..., 
  recipientId: ..., 
  since: ..., 
};

// Call the `getRecentReminderNotificationsRef()` function to get a reference to the query.
const ref = getRecentReminderNotificationsRef(getRecentReminderNotificationsVars);
// Variables can be defined inline as well.
const ref = getRecentReminderNotificationsRef({ circleId: ..., recipientId: ..., since: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getRecentReminderNotificationsRef(dataConnect, getRecentReminderNotificationsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.notifications);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.notifications);
});
```

## FindNotificationRecipientByEmail
You can execute the `FindNotificationRecipientByEmail` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
findNotificationRecipientByEmail(vars: FindNotificationRecipientByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<FindNotificationRecipientByEmailData, FindNotificationRecipientByEmailVariables>;

interface FindNotificationRecipientByEmailRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: FindNotificationRecipientByEmailVariables): QueryRef<FindNotificationRecipientByEmailData, FindNotificationRecipientByEmailVariables>;
}
export const findNotificationRecipientByEmailRef: FindNotificationRecipientByEmailRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
findNotificationRecipientByEmail(dc: DataConnect, vars: FindNotificationRecipientByEmailVariables, options?: ExecuteQueryOptions): QueryPromise<FindNotificationRecipientByEmailData, FindNotificationRecipientByEmailVariables>;

interface FindNotificationRecipientByEmailRef {
  ...
  (dc: DataConnect, vars: FindNotificationRecipientByEmailVariables): QueryRef<FindNotificationRecipientByEmailData, FindNotificationRecipientByEmailVariables>;
}
export const findNotificationRecipientByEmailRef: FindNotificationRecipientByEmailRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the findNotificationRecipientByEmailRef:
```typescript
const name = findNotificationRecipientByEmailRef.operationName;
console.log(name);
```

### Variables
The `FindNotificationRecipientByEmail` query requires an argument of type `FindNotificationRecipientByEmailVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface FindNotificationRecipientByEmailVariables {
  email: string;
}
```
### Return Type
Recall that executing the `FindNotificationRecipientByEmail` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `FindNotificationRecipientByEmailData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `FindNotificationRecipientByEmail`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, findNotificationRecipientByEmail, FindNotificationRecipientByEmailVariables } from '@bondcircle/dataconnect';

// The `FindNotificationRecipientByEmail` query requires an argument of type `FindNotificationRecipientByEmailVariables`:
const findNotificationRecipientByEmailVars: FindNotificationRecipientByEmailVariables = {
  email: ..., 
};

// Call the `findNotificationRecipientByEmail()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await findNotificationRecipientByEmail(findNotificationRecipientByEmailVars);
// Variables can be defined inline as well.
const { data } = await findNotificationRecipientByEmail({ email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await findNotificationRecipientByEmail(dataConnect, findNotificationRecipientByEmailVars);

console.log(data.users);

// Or, you can use the `Promise` API.
findNotificationRecipientByEmail(findNotificationRecipientByEmailVars).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `FindNotificationRecipientByEmail`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, findNotificationRecipientByEmailRef, FindNotificationRecipientByEmailVariables } from '@bondcircle/dataconnect';

// The `FindNotificationRecipientByEmail` query requires an argument of type `FindNotificationRecipientByEmailVariables`:
const findNotificationRecipientByEmailVars: FindNotificationRecipientByEmailVariables = {
  email: ..., 
};

// Call the `findNotificationRecipientByEmailRef()` function to get a reference to the query.
const ref = findNotificationRecipientByEmailRef(findNotificationRecipientByEmailVars);
// Variables can be defined inline as well.
const ref = findNotificationRecipientByEmailRef({ email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = findNotificationRecipientByEmailRef(dataConnect, findNotificationRecipientByEmailVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

## GetDeadlineNotificationCandidates
You can execute the `GetDeadlineNotificationCandidates` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getDeadlineNotificationCandidates(vars: GetDeadlineNotificationCandidatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetDeadlineNotificationCandidatesData, GetDeadlineNotificationCandidatesVariables>;

interface GetDeadlineNotificationCandidatesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetDeadlineNotificationCandidatesVariables): QueryRef<GetDeadlineNotificationCandidatesData, GetDeadlineNotificationCandidatesVariables>;
}
export const getDeadlineNotificationCandidatesRef: GetDeadlineNotificationCandidatesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getDeadlineNotificationCandidates(dc: DataConnect, vars: GetDeadlineNotificationCandidatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetDeadlineNotificationCandidatesData, GetDeadlineNotificationCandidatesVariables>;

interface GetDeadlineNotificationCandidatesRef {
  ...
  (dc: DataConnect, vars: GetDeadlineNotificationCandidatesVariables): QueryRef<GetDeadlineNotificationCandidatesData, GetDeadlineNotificationCandidatesVariables>;
}
export const getDeadlineNotificationCandidatesRef: GetDeadlineNotificationCandidatesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getDeadlineNotificationCandidatesRef:
```typescript
const name = getDeadlineNotificationCandidatesRef.operationName;
console.log(name);
```

### Variables
The `GetDeadlineNotificationCandidates` query requires an argument of type `GetDeadlineNotificationCandidatesVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetDeadlineNotificationCandidatesVariables {
  from: DateString;
  to: DateString;
}
```
### Return Type
Recall that executing the `GetDeadlineNotificationCandidates` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetDeadlineNotificationCandidatesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetDeadlineNotificationCandidatesData {
  circles: ({
    id: UUIDString;
    name: string;
    type: string;
    deadline?: DateString | null;
  } & Circle_Key)[];
}
```
### Using `GetDeadlineNotificationCandidates`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getDeadlineNotificationCandidates, GetDeadlineNotificationCandidatesVariables } from '@bondcircle/dataconnect';

// The `GetDeadlineNotificationCandidates` query requires an argument of type `GetDeadlineNotificationCandidatesVariables`:
const getDeadlineNotificationCandidatesVars: GetDeadlineNotificationCandidatesVariables = {
  from: ..., 
  to: ..., 
};

// Call the `getDeadlineNotificationCandidates()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getDeadlineNotificationCandidates(getDeadlineNotificationCandidatesVars);
// Variables can be defined inline as well.
const { data } = await getDeadlineNotificationCandidates({ from: ..., to: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getDeadlineNotificationCandidates(dataConnect, getDeadlineNotificationCandidatesVars);

console.log(data.circles);

// Or, you can use the `Promise` API.
getDeadlineNotificationCandidates(getDeadlineNotificationCandidatesVars).then((response) => {
  const data = response.data;
  console.log(data.circles);
});
```

### Using `GetDeadlineNotificationCandidates`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getDeadlineNotificationCandidatesRef, GetDeadlineNotificationCandidatesVariables } from '@bondcircle/dataconnect';

// The `GetDeadlineNotificationCandidates` query requires an argument of type `GetDeadlineNotificationCandidatesVariables`:
const getDeadlineNotificationCandidatesVars: GetDeadlineNotificationCandidatesVariables = {
  from: ..., 
  to: ..., 
};

// Call the `getDeadlineNotificationCandidatesRef()` function to get a reference to the query.
const ref = getDeadlineNotificationCandidatesRef(getDeadlineNotificationCandidatesVars);
// Variables can be defined inline as well.
const ref = getDeadlineNotificationCandidatesRef({ from: ..., to: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getDeadlineNotificationCandidatesRef(dataConnect, getDeadlineNotificationCandidatesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circles);
});
```

## GetUserDeadlineNotificationCandidates
You can execute the `GetUserDeadlineNotificationCandidates` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getUserDeadlineNotificationCandidates(vars: GetUserDeadlineNotificationCandidatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserDeadlineNotificationCandidatesData, GetUserDeadlineNotificationCandidatesVariables>;

interface GetUserDeadlineNotificationCandidatesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserDeadlineNotificationCandidatesVariables): QueryRef<GetUserDeadlineNotificationCandidatesData, GetUserDeadlineNotificationCandidatesVariables>;
}
export const getUserDeadlineNotificationCandidatesRef: GetUserDeadlineNotificationCandidatesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserDeadlineNotificationCandidates(dc: DataConnect, vars: GetUserDeadlineNotificationCandidatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserDeadlineNotificationCandidatesData, GetUserDeadlineNotificationCandidatesVariables>;

interface GetUserDeadlineNotificationCandidatesRef {
  ...
  (dc: DataConnect, vars: GetUserDeadlineNotificationCandidatesVariables): QueryRef<GetUserDeadlineNotificationCandidatesData, GetUserDeadlineNotificationCandidatesVariables>;
}
export const getUserDeadlineNotificationCandidatesRef: GetUserDeadlineNotificationCandidatesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserDeadlineNotificationCandidatesRef:
```typescript
const name = getUserDeadlineNotificationCandidatesRef.operationName;
console.log(name);
```

### Variables
The `GetUserDeadlineNotificationCandidates` query requires an argument of type `GetUserDeadlineNotificationCandidatesVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserDeadlineNotificationCandidatesVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `GetUserDeadlineNotificationCandidates` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserDeadlineNotificationCandidatesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetUserDeadlineNotificationCandidates`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserDeadlineNotificationCandidates, GetUserDeadlineNotificationCandidatesVariables } from '@bondcircle/dataconnect';

// The `GetUserDeadlineNotificationCandidates` query requires an argument of type `GetUserDeadlineNotificationCandidatesVariables`:
const getUserDeadlineNotificationCandidatesVars: GetUserDeadlineNotificationCandidatesVariables = {
  userId: ..., 
};

// Call the `getUserDeadlineNotificationCandidates()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserDeadlineNotificationCandidates(getUserDeadlineNotificationCandidatesVars);
// Variables can be defined inline as well.
const { data } = await getUserDeadlineNotificationCandidates({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserDeadlineNotificationCandidates(dataConnect, getUserDeadlineNotificationCandidatesVars);

console.log(data.circleMemberships);

// Or, you can use the `Promise` API.
getUserDeadlineNotificationCandidates(getUserDeadlineNotificationCandidatesVars).then((response) => {
  const data = response.data;
  console.log(data.circleMemberships);
});
```

### Using `GetUserDeadlineNotificationCandidates`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserDeadlineNotificationCandidatesRef, GetUserDeadlineNotificationCandidatesVariables } from '@bondcircle/dataconnect';

// The `GetUserDeadlineNotificationCandidates` query requires an argument of type `GetUserDeadlineNotificationCandidatesVariables`:
const getUserDeadlineNotificationCandidatesVars: GetUserDeadlineNotificationCandidatesVariables = {
  userId: ..., 
};

// Call the `getUserDeadlineNotificationCandidatesRef()` function to get a reference to the query.
const ref = getUserDeadlineNotificationCandidatesRef(getUserDeadlineNotificationCandidatesVars);
// Variables can be defined inline as well.
const ref = getUserDeadlineNotificationCandidatesRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserDeadlineNotificationCandidatesRef(dataConnect, getUserDeadlineNotificationCandidatesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circleMemberships);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMemberships);
});
```

## GetRetentionCandidates
You can execute the `GetRetentionCandidates` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getRetentionCandidates(vars: GetRetentionCandidatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetRetentionCandidatesData, GetRetentionCandidatesVariables>;

interface GetRetentionCandidatesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetRetentionCandidatesVariables): QueryRef<GetRetentionCandidatesData, GetRetentionCandidatesVariables>;
}
export const getRetentionCandidatesRef: GetRetentionCandidatesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getRetentionCandidates(dc: DataConnect, vars: GetRetentionCandidatesVariables, options?: ExecuteQueryOptions): QueryPromise<GetRetentionCandidatesData, GetRetentionCandidatesVariables>;

interface GetRetentionCandidatesRef {
  ...
  (dc: DataConnect, vars: GetRetentionCandidatesVariables): QueryRef<GetRetentionCandidatesData, GetRetentionCandidatesVariables>;
}
export const getRetentionCandidatesRef: GetRetentionCandidatesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getRetentionCandidatesRef:
```typescript
const name = getRetentionCandidatesRef.operationName;
console.log(name);
```

### Variables
The `GetRetentionCandidates` query requires an argument of type `GetRetentionCandidatesVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetRetentionCandidatesVariables {
  now: TimestampString;
}
```
### Return Type
Recall that executing the `GetRetentionCandidates` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetRetentionCandidatesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetRetentionCandidatesData {
  circles: ({
    id: UUIDString;
    retentionDueAt?: TimestampString | null;
  } & Circle_Key)[];
}
```
### Using `GetRetentionCandidates`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getRetentionCandidates, GetRetentionCandidatesVariables } from '@bondcircle/dataconnect';

// The `GetRetentionCandidates` query requires an argument of type `GetRetentionCandidatesVariables`:
const getRetentionCandidatesVars: GetRetentionCandidatesVariables = {
  now: ..., 
};

// Call the `getRetentionCandidates()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getRetentionCandidates(getRetentionCandidatesVars);
// Variables can be defined inline as well.
const { data } = await getRetentionCandidates({ now: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getRetentionCandidates(dataConnect, getRetentionCandidatesVars);

console.log(data.circles);

// Or, you can use the `Promise` API.
getRetentionCandidates(getRetentionCandidatesVars).then((response) => {
  const data = response.data;
  console.log(data.circles);
});
```

### Using `GetRetentionCandidates`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getRetentionCandidatesRef, GetRetentionCandidatesVariables } from '@bondcircle/dataconnect';

// The `GetRetentionCandidates` query requires an argument of type `GetRetentionCandidatesVariables`:
const getRetentionCandidatesVars: GetRetentionCandidatesVariables = {
  now: ..., 
};

// Call the `getRetentionCandidatesRef()` function to get a reference to the query.
const ref = getRetentionCandidatesRef(getRetentionCandidatesVars);
// Variables can be defined inline as well.
const ref = getRetentionCandidatesRef({ now: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getRetentionCandidatesRef(dataConnect, getRetentionCandidatesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circles);
});
```

## GetCircleRetentionPayload
You can execute the `GetCircleRetentionPayload` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getCircleRetentionPayload(vars: GetCircleRetentionPayloadVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleRetentionPayloadData, GetCircleRetentionPayloadVariables>;

interface GetCircleRetentionPayloadRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCircleRetentionPayloadVariables): QueryRef<GetCircleRetentionPayloadData, GetCircleRetentionPayloadVariables>;
}
export const getCircleRetentionPayloadRef: GetCircleRetentionPayloadRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCircleRetentionPayload(dc: DataConnect, vars: GetCircleRetentionPayloadVariables, options?: ExecuteQueryOptions): QueryPromise<GetCircleRetentionPayloadData, GetCircleRetentionPayloadVariables>;

interface GetCircleRetentionPayloadRef {
  ...
  (dc: DataConnect, vars: GetCircleRetentionPayloadVariables): QueryRef<GetCircleRetentionPayloadData, GetCircleRetentionPayloadVariables>;
}
export const getCircleRetentionPayloadRef: GetCircleRetentionPayloadRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCircleRetentionPayloadRef:
```typescript
const name = getCircleRetentionPayloadRef.operationName;
console.log(name);
```

### Variables
The `GetCircleRetentionPayload` query requires an argument of type `GetCircleRetentionPayloadVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCircleRetentionPayloadVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that executing the `GetCircleRetentionPayload` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCircleRetentionPayloadData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetCircleRetentionPayload`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCircleRetentionPayload, GetCircleRetentionPayloadVariables } from '@bondcircle/dataconnect';

// The `GetCircleRetentionPayload` query requires an argument of type `GetCircleRetentionPayloadVariables`:
const getCircleRetentionPayloadVars: GetCircleRetentionPayloadVariables = {
  circleId: ..., 
};

// Call the `getCircleRetentionPayload()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCircleRetentionPayload(getCircleRetentionPayloadVars);
// Variables can be defined inline as well.
const { data } = await getCircleRetentionPayload({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCircleRetentionPayload(dataConnect, getCircleRetentionPayloadVars);

console.log(data.circle);
console.log(data.receipts);
console.log(data.circleMemberships);
console.log(data.asoEbiTiers);
console.log(data.retentionPurgeAttempts);
console.log(data.invitations);

// Or, you can use the `Promise` API.
getCircleRetentionPayload(getCircleRetentionPayloadVars).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.receipts);
  console.log(data.circleMemberships);
  console.log(data.asoEbiTiers);
  console.log(data.retentionPurgeAttempts);
  console.log(data.invitations);
});
```

### Using `GetCircleRetentionPayload`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCircleRetentionPayloadRef, GetCircleRetentionPayloadVariables } from '@bondcircle/dataconnect';

// The `GetCircleRetentionPayload` query requires an argument of type `GetCircleRetentionPayloadVariables`:
const getCircleRetentionPayloadVars: GetCircleRetentionPayloadVariables = {
  circleId: ..., 
};

// Call the `getCircleRetentionPayloadRef()` function to get a reference to the query.
const ref = getCircleRetentionPayloadRef(getCircleRetentionPayloadVars);
// Variables can be defined inline as well.
const ref = getCircleRetentionPayloadRef({ circleId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCircleRetentionPayloadRef(dataConnect, getCircleRetentionPayloadVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circle);
console.log(data.receipts);
console.log(data.circleMemberships);
console.log(data.asoEbiTiers);
console.log(data.retentionPurgeAttempts);
console.log(data.invitations);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circle);
  console.log(data.receipts);
  console.log(data.circleMemberships);
  console.log(data.asoEbiTiers);
  console.log(data.retentionPurgeAttempts);
  console.log(data.invitations);
});
```

## GetStoragePathReferences
You can execute the `GetStoragePathReferences` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getStoragePathReferences(vars: GetStoragePathReferencesVariables, options?: ExecuteQueryOptions): QueryPromise<GetStoragePathReferencesData, GetStoragePathReferencesVariables>;

interface GetStoragePathReferencesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStoragePathReferencesVariables): QueryRef<GetStoragePathReferencesData, GetStoragePathReferencesVariables>;
}
export const getStoragePathReferencesRef: GetStoragePathReferencesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStoragePathReferences(dc: DataConnect, vars: GetStoragePathReferencesVariables, options?: ExecuteQueryOptions): QueryPromise<GetStoragePathReferencesData, GetStoragePathReferencesVariables>;

interface GetStoragePathReferencesRef {
  ...
  (dc: DataConnect, vars: GetStoragePathReferencesVariables): QueryRef<GetStoragePathReferencesData, GetStoragePathReferencesVariables>;
}
export const getStoragePathReferencesRef: GetStoragePathReferencesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStoragePathReferencesRef:
```typescript
const name = getStoragePathReferencesRef.operationName;
console.log(name);
```

### Variables
The `GetStoragePathReferences` query requires an argument of type `GetStoragePathReferencesVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStoragePathReferencesVariables {
  path: string;
}
```
### Return Type
Recall that executing the `GetStoragePathReferences` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStoragePathReferencesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetStoragePathReferences`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStoragePathReferences, GetStoragePathReferencesVariables } from '@bondcircle/dataconnect';

// The `GetStoragePathReferences` query requires an argument of type `GetStoragePathReferencesVariables`:
const getStoragePathReferencesVars: GetStoragePathReferencesVariables = {
  path: ..., 
};

// Call the `getStoragePathReferences()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStoragePathReferences(getStoragePathReferencesVars);
// Variables can be defined inline as well.
const { data } = await getStoragePathReferences({ path: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStoragePathReferences(dataConnect, getStoragePathReferencesVars);

console.log(data.circles);
console.log(data.receipts);
console.log(data.circleMemberships);
console.log(data.fabricReferences);
console.log(data.giftReferences);

// Or, you can use the `Promise` API.
getStoragePathReferences(getStoragePathReferencesVars).then((response) => {
  const data = response.data;
  console.log(data.circles);
  console.log(data.receipts);
  console.log(data.circleMemberships);
  console.log(data.fabricReferences);
  console.log(data.giftReferences);
});
```

### Using `GetStoragePathReferences`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStoragePathReferencesRef, GetStoragePathReferencesVariables } from '@bondcircle/dataconnect';

// The `GetStoragePathReferences` query requires an argument of type `GetStoragePathReferencesVariables`:
const getStoragePathReferencesVars: GetStoragePathReferencesVariables = {
  path: ..., 
};

// Call the `getStoragePathReferencesRef()` function to get a reference to the query.
const ref = getStoragePathReferencesRef(getStoragePathReferencesVars);
// Variables can be defined inline as well.
const ref = getStoragePathReferencesRef({ path: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStoragePathReferencesRef(dataConnect, getStoragePathReferencesVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circles);
console.log(data.receipts);
console.log(data.circleMemberships);
console.log(data.fabricReferences);
console.log(data.giftReferences);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circles);
  console.log(data.receipts);
  console.log(data.circleMemberships);
  console.log(data.fabricReferences);
  console.log(data.giftReferences);
});
```

## GetOwnerAdministrator
You can execute the `GetOwnerAdministrator` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getOwnerAdministrator(vars: GetOwnerAdministratorVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerAdministratorData, GetOwnerAdministratorVariables>;

interface GetOwnerAdministratorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOwnerAdministratorVariables): QueryRef<GetOwnerAdministratorData, GetOwnerAdministratorVariables>;
}
export const getOwnerAdministratorRef: GetOwnerAdministratorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOwnerAdministrator(dc: DataConnect, vars: GetOwnerAdministratorVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerAdministratorData, GetOwnerAdministratorVariables>;

interface GetOwnerAdministratorRef {
  ...
  (dc: DataConnect, vars: GetOwnerAdministratorVariables): QueryRef<GetOwnerAdministratorData, GetOwnerAdministratorVariables>;
}
export const getOwnerAdministratorRef: GetOwnerAdministratorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOwnerAdministratorRef:
```typescript
const name = getOwnerAdministratorRef.operationName;
console.log(name);
```

### Variables
The `GetOwnerAdministrator` query requires an argument of type `GetOwnerAdministratorVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOwnerAdministratorVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `GetOwnerAdministrator` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOwnerAdministratorData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetOwnerAdministrator`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOwnerAdministrator, GetOwnerAdministratorVariables } from '@bondcircle/dataconnect';

// The `GetOwnerAdministrator` query requires an argument of type `GetOwnerAdministratorVariables`:
const getOwnerAdministratorVars: GetOwnerAdministratorVariables = {
  userId: ..., 
};

// Call the `getOwnerAdministrator()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOwnerAdministrator(getOwnerAdministratorVars);
// Variables can be defined inline as well.
const { data } = await getOwnerAdministrator({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOwnerAdministrator(dataConnect, getOwnerAdministratorVars);

console.log(data.ownerAdministrators);

// Or, you can use the `Promise` API.
getOwnerAdministrator(getOwnerAdministratorVars).then((response) => {
  const data = response.data;
  console.log(data.ownerAdministrators);
});
```

### Using `GetOwnerAdministrator`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOwnerAdministratorRef, GetOwnerAdministratorVariables } from '@bondcircle/dataconnect';

// The `GetOwnerAdministrator` query requires an argument of type `GetOwnerAdministratorVariables`:
const getOwnerAdministratorVars: GetOwnerAdministratorVariables = {
  userId: ..., 
};

// Call the `getOwnerAdministratorRef()` function to get a reference to the query.
const ref = getOwnerAdministratorRef(getOwnerAdministratorVars);
// Variables can be defined inline as well.
const ref = getOwnerAdministratorRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOwnerAdministratorRef(dataConnect, getOwnerAdministratorVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.ownerAdministrators);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.ownerAdministrators);
});
```

## GetUserAccountStatus
You can execute the `GetUserAccountStatus` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getUserAccountStatus(vars: GetUserAccountStatusVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserAccountStatusData, GetUserAccountStatusVariables>;

interface GetUserAccountStatusRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserAccountStatusVariables): QueryRef<GetUserAccountStatusData, GetUserAccountStatusVariables>;
}
export const getUserAccountStatusRef: GetUserAccountStatusRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserAccountStatus(dc: DataConnect, vars: GetUserAccountStatusVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserAccountStatusData, GetUserAccountStatusVariables>;

interface GetUserAccountStatusRef {
  ...
  (dc: DataConnect, vars: GetUserAccountStatusVariables): QueryRef<GetUserAccountStatusData, GetUserAccountStatusVariables>;
}
export const getUserAccountStatusRef: GetUserAccountStatusRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserAccountStatusRef:
```typescript
const name = getUserAccountStatusRef.operationName;
console.log(name);
```

### Variables
The `GetUserAccountStatus` query requires an argument of type `GetUserAccountStatusVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserAccountStatusVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `GetUserAccountStatus` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserAccountStatusData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserAccountStatusData {
  user?: {
    id: string;
    accountStatus: string;
  } & User_Key;
}
```
### Using `GetUserAccountStatus`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserAccountStatus, GetUserAccountStatusVariables } from '@bondcircle/dataconnect';

// The `GetUserAccountStatus` query requires an argument of type `GetUserAccountStatusVariables`:
const getUserAccountStatusVars: GetUserAccountStatusVariables = {
  userId: ..., 
};

// Call the `getUserAccountStatus()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserAccountStatus(getUserAccountStatusVars);
// Variables can be defined inline as well.
const { data } = await getUserAccountStatus({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserAccountStatus(dataConnect, getUserAccountStatusVars);

console.log(data.user);

// Or, you can use the `Promise` API.
getUserAccountStatus(getUserAccountStatusVars).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

### Using `GetUserAccountStatus`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserAccountStatusRef, GetUserAccountStatusVariables } from '@bondcircle/dataconnect';

// The `GetUserAccountStatus` query requires an argument of type `GetUserAccountStatusVariables`:
const getUserAccountStatusVars: GetUserAccountStatusVariables = {
  userId: ..., 
};

// Call the `getUserAccountStatusRef()` function to get a reference to the query.
const ref = getUserAccountStatusRef(getUserAccountStatusVars);
// Variables can be defined inline as well.
const ref = getUserAccountStatusRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserAccountStatusRef(dataConnect, getUserAccountStatusVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.user);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.user);
});
```

## GetOwnerPlatformOverview
You can execute the `GetOwnerPlatformOverview` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getOwnerPlatformOverview(options?: ExecuteQueryOptions): QueryPromise<GetOwnerPlatformOverviewData, undefined>;

interface GetOwnerPlatformOverviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetOwnerPlatformOverviewData, undefined>;
}
export const getOwnerPlatformOverviewRef: GetOwnerPlatformOverviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOwnerPlatformOverview(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetOwnerPlatformOverviewData, undefined>;

interface GetOwnerPlatformOverviewRef {
  ...
  (dc: DataConnect): QueryRef<GetOwnerPlatformOverviewData, undefined>;
}
export const getOwnerPlatformOverviewRef: GetOwnerPlatformOverviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOwnerPlatformOverviewRef:
```typescript
const name = getOwnerPlatformOverviewRef.operationName;
console.log(name);
```

### Variables
The `GetOwnerPlatformOverview` query has no variables.
### Return Type
Recall that executing the `GetOwnerPlatformOverview` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOwnerPlatformOverviewData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetOwnerPlatformOverview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOwnerPlatformOverview } from '@bondcircle/dataconnect';


// Call the `getOwnerPlatformOverview()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOwnerPlatformOverview();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOwnerPlatformOverview(dataConnect);

console.log(data.totalUsers);
console.log(data.usersByStatus);
console.log(data.totalCircles);
console.log(data.circlesByType);
console.log(data.circlesByStatus);
console.log(data.circlesByPlan);
console.log(data.invitationTotals);
console.log(data.uploadOutcomes);
console.log(data.reportStatuses);
console.log(data.authOutcomes);
console.log(data.emailOutcomes);
console.log(data.retentionCandidates);
console.log(data.retentionAttempts);
console.log(data.reportedComments);
console.log(data.activeInvitations);
console.log(data.recentAdminActions);

// Or, you can use the `Promise` API.
getOwnerPlatformOverview().then((response) => {
  const data = response.data;
  console.log(data.totalUsers);
  console.log(data.usersByStatus);
  console.log(data.totalCircles);
  console.log(data.circlesByType);
  console.log(data.circlesByStatus);
  console.log(data.circlesByPlan);
  console.log(data.invitationTotals);
  console.log(data.uploadOutcomes);
  console.log(data.reportStatuses);
  console.log(data.authOutcomes);
  console.log(data.emailOutcomes);
  console.log(data.retentionCandidates);
  console.log(data.retentionAttempts);
  console.log(data.reportedComments);
  console.log(data.activeInvitations);
  console.log(data.recentAdminActions);
});
```

### Using `GetOwnerPlatformOverview`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOwnerPlatformOverviewRef } from '@bondcircle/dataconnect';


// Call the `getOwnerPlatformOverviewRef()` function to get a reference to the query.
const ref = getOwnerPlatformOverviewRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOwnerPlatformOverviewRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.totalUsers);
console.log(data.usersByStatus);
console.log(data.totalCircles);
console.log(data.circlesByType);
console.log(data.circlesByStatus);
console.log(data.circlesByPlan);
console.log(data.invitationTotals);
console.log(data.uploadOutcomes);
console.log(data.reportStatuses);
console.log(data.authOutcomes);
console.log(data.emailOutcomes);
console.log(data.retentionCandidates);
console.log(data.retentionAttempts);
console.log(data.reportedComments);
console.log(data.activeInvitations);
console.log(data.recentAdminActions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.totalUsers);
  console.log(data.usersByStatus);
  console.log(data.totalCircles);
  console.log(data.circlesByType);
  console.log(data.circlesByStatus);
  console.log(data.circlesByPlan);
  console.log(data.invitationTotals);
  console.log(data.uploadOutcomes);
  console.log(data.reportStatuses);
  console.log(data.authOutcomes);
  console.log(data.emailOutcomes);
  console.log(data.retentionCandidates);
  console.log(data.retentionAttempts);
  console.log(data.reportedComments);
  console.log(data.activeInvitations);
  console.log(data.recentAdminActions);
});
```

## GetOwnerReportReview
You can execute the `GetOwnerReportReview` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getOwnerReportReview(vars: GetOwnerReportReviewVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerReportReviewData, GetOwnerReportReviewVariables>;

interface GetOwnerReportReviewRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOwnerReportReviewVariables): QueryRef<GetOwnerReportReviewData, GetOwnerReportReviewVariables>;
}
export const getOwnerReportReviewRef: GetOwnerReportReviewRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOwnerReportReview(dc: DataConnect, vars: GetOwnerReportReviewVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerReportReviewData, GetOwnerReportReviewVariables>;

interface GetOwnerReportReviewRef {
  ...
  (dc: DataConnect, vars: GetOwnerReportReviewVariables): QueryRef<GetOwnerReportReviewData, GetOwnerReportReviewVariables>;
}
export const getOwnerReportReviewRef: GetOwnerReportReviewRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOwnerReportReviewRef:
```typescript
const name = getOwnerReportReviewRef.operationName;
console.log(name);
```

### Variables
The `GetOwnerReportReview` query requires an argument of type `GetOwnerReportReviewVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOwnerReportReviewVariables {
  reportId: UUIDString;
}
```
### Return Type
Recall that executing the `GetOwnerReportReview` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOwnerReportReviewData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetOwnerReportReview`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOwnerReportReview, GetOwnerReportReviewVariables } from '@bondcircle/dataconnect';

// The `GetOwnerReportReview` query requires an argument of type `GetOwnerReportReviewVariables`:
const getOwnerReportReviewVars: GetOwnerReportReviewVariables = {
  reportId: ..., 
};

// Call the `getOwnerReportReview()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOwnerReportReview(getOwnerReportReviewVars);
// Variables can be defined inline as well.
const { data } = await getOwnerReportReview({ reportId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOwnerReportReview(dataConnect, getOwnerReportReviewVars);

console.log(data.commentReport);

// Or, you can use the `Promise` API.
getOwnerReportReview(getOwnerReportReviewVars).then((response) => {
  const data = response.data;
  console.log(data.commentReport);
});
```

### Using `GetOwnerReportReview`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOwnerReportReviewRef, GetOwnerReportReviewVariables } from '@bondcircle/dataconnect';

// The `GetOwnerReportReview` query requires an argument of type `GetOwnerReportReviewVariables`:
const getOwnerReportReviewVars: GetOwnerReportReviewVariables = {
  reportId: ..., 
};

// Call the `getOwnerReportReviewRef()` function to get a reference to the query.
const ref = getOwnerReportReviewRef(getOwnerReportReviewVars);
// Variables can be defined inline as well.
const ref = getOwnerReportReviewRef({ reportId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOwnerReportReviewRef(dataConnect, getOwnerReportReviewVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.commentReport);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.commentReport);
});
```

## GetOwnerUserByIdentifier
You can execute the `GetOwnerUserByIdentifier` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getOwnerUserByIdentifier(vars: GetOwnerUserByIdentifierVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerUserByIdentifierData, GetOwnerUserByIdentifierVariables>;

interface GetOwnerUserByIdentifierRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOwnerUserByIdentifierVariables): QueryRef<GetOwnerUserByIdentifierData, GetOwnerUserByIdentifierVariables>;
}
export const getOwnerUserByIdentifierRef: GetOwnerUserByIdentifierRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOwnerUserByIdentifier(dc: DataConnect, vars: GetOwnerUserByIdentifierVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerUserByIdentifierData, GetOwnerUserByIdentifierVariables>;

interface GetOwnerUserByIdentifierRef {
  ...
  (dc: DataConnect, vars: GetOwnerUserByIdentifierVariables): QueryRef<GetOwnerUserByIdentifierData, GetOwnerUserByIdentifierVariables>;
}
export const getOwnerUserByIdentifierRef: GetOwnerUserByIdentifierRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOwnerUserByIdentifierRef:
```typescript
const name = getOwnerUserByIdentifierRef.operationName;
console.log(name);
```

### Variables
The `GetOwnerUserByIdentifier` query requires an argument of type `GetOwnerUserByIdentifierVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOwnerUserByIdentifierVariables {
  userId: string;
  email: string;
}
```
### Return Type
Recall that executing the `GetOwnerUserByIdentifier` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOwnerUserByIdentifierData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetOwnerUserByIdentifier`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOwnerUserByIdentifier, GetOwnerUserByIdentifierVariables } from '@bondcircle/dataconnect';

// The `GetOwnerUserByIdentifier` query requires an argument of type `GetOwnerUserByIdentifierVariables`:
const getOwnerUserByIdentifierVars: GetOwnerUserByIdentifierVariables = {
  userId: ..., 
  email: ..., 
};

// Call the `getOwnerUserByIdentifier()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOwnerUserByIdentifier(getOwnerUserByIdentifierVars);
// Variables can be defined inline as well.
const { data } = await getOwnerUserByIdentifier({ userId: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOwnerUserByIdentifier(dataConnect, getOwnerUserByIdentifierVars);

console.log(data.userById);
console.log(data.usersByEmail);

// Or, you can use the `Promise` API.
getOwnerUserByIdentifier(getOwnerUserByIdentifierVars).then((response) => {
  const data = response.data;
  console.log(data.userById);
  console.log(data.usersByEmail);
});
```

### Using `GetOwnerUserByIdentifier`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOwnerUserByIdentifierRef, GetOwnerUserByIdentifierVariables } from '@bondcircle/dataconnect';

// The `GetOwnerUserByIdentifier` query requires an argument of type `GetOwnerUserByIdentifierVariables`:
const getOwnerUserByIdentifierVars: GetOwnerUserByIdentifierVariables = {
  userId: ..., 
  email: ..., 
};

// Call the `getOwnerUserByIdentifierRef()` function to get a reference to the query.
const ref = getOwnerUserByIdentifierRef(getOwnerUserByIdentifierVars);
// Variables can be defined inline as well.
const ref = getOwnerUserByIdentifierRef({ userId: ..., email: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOwnerUserByIdentifierRef(dataConnect, getOwnerUserByIdentifierVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.userById);
console.log(data.usersByEmail);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.userById);
  console.log(data.usersByEmail);
});
```

## GetOwnerOperationalExport
You can execute the `GetOwnerOperationalExport` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getOwnerOperationalExport(options?: ExecuteQueryOptions): QueryPromise<GetOwnerOperationalExportData, undefined>;

interface GetOwnerOperationalExportRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetOwnerOperationalExportData, undefined>;
}
export const getOwnerOperationalExportRef: GetOwnerOperationalExportRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOwnerOperationalExport(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<GetOwnerOperationalExportData, undefined>;

interface GetOwnerOperationalExportRef {
  ...
  (dc: DataConnect): QueryRef<GetOwnerOperationalExportData, undefined>;
}
export const getOwnerOperationalExportRef: GetOwnerOperationalExportRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOwnerOperationalExportRef:
```typescript
const name = getOwnerOperationalExportRef.operationName;
console.log(name);
```

### Variables
The `GetOwnerOperationalExport` query has no variables.
### Return Type
Recall that executing the `GetOwnerOperationalExport` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOwnerOperationalExportData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetOwnerOperationalExport`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOwnerOperationalExport } from '@bondcircle/dataconnect';


// Call the `getOwnerOperationalExport()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOwnerOperationalExport();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOwnerOperationalExport(dataConnect);

console.log(data.circles);
console.log(data.commentReports);
console.log(data.retentionPurgeAttempts);

// Or, you can use the `Promise` API.
getOwnerOperationalExport().then((response) => {
  const data = response.data;
  console.log(data.circles);
  console.log(data.commentReports);
  console.log(data.retentionPurgeAttempts);
});
```

### Using `GetOwnerOperationalExport`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOwnerOperationalExportRef } from '@bondcircle/dataconnect';


// Call the `getOwnerOperationalExportRef()` function to get a reference to the query.
const ref = getOwnerOperationalExportRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOwnerOperationalExportRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.circles);
console.log(data.commentReports);
console.log(data.retentionPurgeAttempts);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.circles);
  console.log(data.commentReports);
  console.log(data.retentionPurgeAttempts);
});
```

## GetOwnerInvitation
You can execute the `GetOwnerInvitation` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
getOwnerInvitation(vars: GetOwnerInvitationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerInvitationData, GetOwnerInvitationVariables>;

interface GetOwnerInvitationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetOwnerInvitationVariables): QueryRef<GetOwnerInvitationData, GetOwnerInvitationVariables>;
}
export const getOwnerInvitationRef: GetOwnerInvitationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getOwnerInvitation(dc: DataConnect, vars: GetOwnerInvitationVariables, options?: ExecuteQueryOptions): QueryPromise<GetOwnerInvitationData, GetOwnerInvitationVariables>;

interface GetOwnerInvitationRef {
  ...
  (dc: DataConnect, vars: GetOwnerInvitationVariables): QueryRef<GetOwnerInvitationData, GetOwnerInvitationVariables>;
}
export const getOwnerInvitationRef: GetOwnerInvitationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getOwnerInvitationRef:
```typescript
const name = getOwnerInvitationRef.operationName;
console.log(name);
```

### Variables
The `GetOwnerInvitation` query requires an argument of type `GetOwnerInvitationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetOwnerInvitationVariables {
  invitationId: UUIDString;
}
```
### Return Type
Recall that executing the `GetOwnerInvitation` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetOwnerInvitationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetOwnerInvitation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getOwnerInvitation, GetOwnerInvitationVariables } from '@bondcircle/dataconnect';

// The `GetOwnerInvitation` query requires an argument of type `GetOwnerInvitationVariables`:
const getOwnerInvitationVars: GetOwnerInvitationVariables = {
  invitationId: ..., 
};

// Call the `getOwnerInvitation()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getOwnerInvitation(getOwnerInvitationVars);
// Variables can be defined inline as well.
const { data } = await getOwnerInvitation({ invitationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getOwnerInvitation(dataConnect, getOwnerInvitationVars);

console.log(data.invitation);

// Or, you can use the `Promise` API.
getOwnerInvitation(getOwnerInvitationVars).then((response) => {
  const data = response.data;
  console.log(data.invitation);
});
```

### Using `GetOwnerInvitation`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getOwnerInvitationRef, GetOwnerInvitationVariables } from '@bondcircle/dataconnect';

// The `GetOwnerInvitation` query requires an argument of type `GetOwnerInvitationVariables`:
const getOwnerInvitationVars: GetOwnerInvitationVariables = {
  invitationId: ..., 
};

// Call the `getOwnerInvitationRef()` function to get a reference to the query.
const ref = getOwnerInvitationRef(getOwnerInvitationVars);
// Variables can be defined inline as well.
const ref = getOwnerInvitationRef({ invitationId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getOwnerInvitationRef(dataConnect, getOwnerInvitationVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.invitation);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.invitation);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `bondcircle` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertCurrentUser
You can execute the `UpsertCurrentUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
upsertCurrentUser(vars: UpsertCurrentUserVariables): MutationPromise<UpsertCurrentUserData, UpsertCurrentUserVariables>;

interface UpsertCurrentUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertCurrentUserVariables): MutationRef<UpsertCurrentUserData, UpsertCurrentUserVariables>;
}
export const upsertCurrentUserRef: UpsertCurrentUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
upsertCurrentUser(dc: DataConnect, vars: UpsertCurrentUserVariables): MutationPromise<UpsertCurrentUserData, UpsertCurrentUserVariables>;

interface UpsertCurrentUserRef {
  ...
  (dc: DataConnect, vars: UpsertCurrentUserVariables): MutationRef<UpsertCurrentUserData, UpsertCurrentUserVariables>;
}
export const upsertCurrentUserRef: UpsertCurrentUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertCurrentUserRef:
```typescript
const name = upsertCurrentUserRef.operationName;
console.log(name);
```

### Variables
The `UpsertCurrentUser` mutation requires an argument of type `UpsertCurrentUserVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertCurrentUserVariables {
  displayName: string;
  phone?: string | null;
  email?: string | null;
  profileImage?: string | null;
  termsAcceptedAt?: TimestampString | null;
  privacyAcceptedAt?: TimestampString | null;
}
```
### Return Type
Recall that executing the `UpsertCurrentUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertCurrentUserData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpsertCurrentUserData {
  user_upsert: User_Key;
}
```
### Using `UpsertCurrentUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertCurrentUser, UpsertCurrentUserVariables } from '@bondcircle/dataconnect';

// The `UpsertCurrentUser` mutation requires an argument of type `UpsertCurrentUserVariables`:
const upsertCurrentUserVars: UpsertCurrentUserVariables = {
  displayName: ..., 
  phone: ..., // optional
  email: ..., // optional
  profileImage: ..., // optional
  termsAcceptedAt: ..., // optional
  privacyAcceptedAt: ..., // optional
};

// Call the `upsertCurrentUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertCurrentUser(upsertCurrentUserVars);
// Variables can be defined inline as well.
const { data } = await upsertCurrentUser({ displayName: ..., phone: ..., email: ..., profileImage: ..., termsAcceptedAt: ..., privacyAcceptedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertCurrentUser(dataConnect, upsertCurrentUserVars);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
upsertCurrentUser(upsertCurrentUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

### Using `UpsertCurrentUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertCurrentUserRef, UpsertCurrentUserVariables } from '@bondcircle/dataconnect';

// The `UpsertCurrentUser` mutation requires an argument of type `UpsertCurrentUserVariables`:
const upsertCurrentUserVars: UpsertCurrentUserVariables = {
  displayName: ..., 
  phone: ..., // optional
  email: ..., // optional
  profileImage: ..., // optional
  termsAcceptedAt: ..., // optional
  privacyAcceptedAt: ..., // optional
};

// Call the `upsertCurrentUserRef()` function to get a reference to the mutation.
const ref = upsertCurrentUserRef(upsertCurrentUserVars);
// Variables can be defined inline as well.
const ref = upsertCurrentUserRef({ displayName: ..., phone: ..., email: ..., profileImage: ..., termsAcceptedAt: ..., privacyAcceptedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertCurrentUserRef(dataConnect, upsertCurrentUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_upsert);
});
```

## CreateCircleDraft
You can execute the `CreateCircleDraft` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createCircleDraft(vars: CreateCircleDraftVariables): MutationPromise<CreateCircleDraftData, CreateCircleDraftVariables>;

interface CreateCircleDraftRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCircleDraftVariables): MutationRef<CreateCircleDraftData, CreateCircleDraftVariables>;
}
export const createCircleDraftRef: CreateCircleDraftRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCircleDraft(dc: DataConnect, vars: CreateCircleDraftVariables): MutationPromise<CreateCircleDraftData, CreateCircleDraftVariables>;

interface CreateCircleDraftRef {
  ...
  (dc: DataConnect, vars: CreateCircleDraftVariables): MutationRef<CreateCircleDraftData, CreateCircleDraftVariables>;
}
export const createCircleDraftRef: CreateCircleDraftRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCircleDraftRef:
```typescript
const name = createCircleDraftRef.operationName;
console.log(name);
```

### Variables
The `CreateCircleDraft` mutation requires an argument of type `CreateCircleDraftVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateCircleDraft` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCircleDraftData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCircleDraftData {
  circle_insert: Circle_Key;
  circleMembership_insert: CircleMembership_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```
### Using `CreateCircleDraft`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCircleDraft, CreateCircleDraftVariables } from '@bondcircle/dataconnect';

// The `CreateCircleDraft` mutation requires an argument of type `CreateCircleDraftVariables`:
const createCircleDraftVars: CreateCircleDraftVariables = {
  creatorId: ..., 
  name: ..., 
  type: ..., 
  description: ..., 
  targetAmount: ..., 
  pricingPlan: ..., 
  memberLimit: ..., 
  activationPrice: ..., 
  deadline: ..., // optional
  eventDate: ..., // optional
  visibility: ..., 
  createdAt: ..., 
  updatedAt: ..., 
};

// Call the `createCircleDraft()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCircleDraft(createCircleDraftVars);
// Variables can be defined inline as well.
const { data } = await createCircleDraft({ creatorId: ..., name: ..., type: ..., description: ..., targetAmount: ..., pricingPlan: ..., memberLimit: ..., activationPrice: ..., deadline: ..., eventDate: ..., visibility: ..., createdAt: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCircleDraft(dataConnect, createCircleDraftVars);

console.log(data.circle_insert);
console.log(data.circleMembership_insert);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
createCircleDraft(createCircleDraftVars).then((response) => {
  const data = response.data;
  console.log(data.circle_insert);
  console.log(data.circleMembership_insert);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

### Using `CreateCircleDraft`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCircleDraftRef, CreateCircleDraftVariables } from '@bondcircle/dataconnect';

// The `CreateCircleDraft` mutation requires an argument of type `CreateCircleDraftVariables`:
const createCircleDraftVars: CreateCircleDraftVariables = {
  creatorId: ..., 
  name: ..., 
  type: ..., 
  description: ..., 
  targetAmount: ..., 
  pricingPlan: ..., 
  memberLimit: ..., 
  activationPrice: ..., 
  deadline: ..., // optional
  eventDate: ..., // optional
  visibility: ..., 
  createdAt: ..., 
  updatedAt: ..., 
};

// Call the `createCircleDraftRef()` function to get a reference to the mutation.
const ref = createCircleDraftRef(createCircleDraftVars);
// Variables can be defined inline as well.
const ref = createCircleDraftRef({ creatorId: ..., name: ..., type: ..., description: ..., targetAmount: ..., pricingPlan: ..., memberLimit: ..., activationPrice: ..., deadline: ..., eventDate: ..., visibility: ..., createdAt: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCircleDraftRef(dataConnect, createCircleDraftVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circle_insert);
console.log(data.circleMembership_insert);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circle_insert);
  console.log(data.circleMembership_insert);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

## UpdateCircleConfigurationWithAudit
You can execute the `UpdateCircleConfigurationWithAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateCircleConfigurationWithAudit(vars: UpdateCircleConfigurationWithAuditVariables): MutationPromise<UpdateCircleConfigurationWithAuditData, UpdateCircleConfigurationWithAuditVariables>;

interface UpdateCircleConfigurationWithAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCircleConfigurationWithAuditVariables): MutationRef<UpdateCircleConfigurationWithAuditData, UpdateCircleConfigurationWithAuditVariables>;
}
export const updateCircleConfigurationWithAuditRef: UpdateCircleConfigurationWithAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCircleConfigurationWithAudit(dc: DataConnect, vars: UpdateCircleConfigurationWithAuditVariables): MutationPromise<UpdateCircleConfigurationWithAuditData, UpdateCircleConfigurationWithAuditVariables>;

interface UpdateCircleConfigurationWithAuditRef {
  ...
  (dc: DataConnect, vars: UpdateCircleConfigurationWithAuditVariables): MutationRef<UpdateCircleConfigurationWithAuditData, UpdateCircleConfigurationWithAuditVariables>;
}
export const updateCircleConfigurationWithAuditRef: UpdateCircleConfigurationWithAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCircleConfigurationWithAuditRef:
```typescript
const name = updateCircleConfigurationWithAuditRef.operationName;
console.log(name);
```

### Variables
The `UpdateCircleConfigurationWithAudit` mutation requires an argument of type `UpdateCircleConfigurationWithAuditVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateCircleConfigurationWithAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCircleConfigurationWithAuditData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCircleConfigurationWithAuditData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `UpdateCircleConfigurationWithAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCircleConfigurationWithAudit, UpdateCircleConfigurationWithAuditVariables } from '@bondcircle/dataconnect';

// The `UpdateCircleConfigurationWithAudit` mutation requires an argument of type `UpdateCircleConfigurationWithAuditVariables`:
const updateCircleConfigurationWithAuditVars: UpdateCircleConfigurationWithAuditVariables = {
  circleId: ..., 
  actorId: ..., 
  action: ..., 
  status: ..., 
  name: ..., 
  description: ..., 
  targetAmount: ..., 
  pricingPlan: ..., 
  memberLimit: ..., 
  activationPrice: ..., 
  deadline: ..., // optional
  eventDate: ..., // optional
  visibility: ..., 
  updatedAt: ..., 
  materialChanges: ..., 
};

// Call the `updateCircleConfigurationWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCircleConfigurationWithAudit(updateCircleConfigurationWithAuditVars);
// Variables can be defined inline as well.
const { data } = await updateCircleConfigurationWithAudit({ circleId: ..., actorId: ..., action: ..., status: ..., name: ..., description: ..., targetAmount: ..., pricingPlan: ..., memberLimit: ..., activationPrice: ..., deadline: ..., eventDate: ..., visibility: ..., updatedAt: ..., materialChanges: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCircleConfigurationWithAudit(dataConnect, updateCircleConfigurationWithAuditVars);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
updateCircleConfigurationWithAudit(updateCircleConfigurationWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `UpdateCircleConfigurationWithAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCircleConfigurationWithAuditRef, UpdateCircleConfigurationWithAuditVariables } from '@bondcircle/dataconnect';

// The `UpdateCircleConfigurationWithAudit` mutation requires an argument of type `UpdateCircleConfigurationWithAuditVariables`:
const updateCircleConfigurationWithAuditVars: UpdateCircleConfigurationWithAuditVariables = {
  circleId: ..., 
  actorId: ..., 
  action: ..., 
  status: ..., 
  name: ..., 
  description: ..., 
  targetAmount: ..., 
  pricingPlan: ..., 
  memberLimit: ..., 
  activationPrice: ..., 
  deadline: ..., // optional
  eventDate: ..., // optional
  visibility: ..., 
  updatedAt: ..., 
  materialChanges: ..., 
};

// Call the `updateCircleConfigurationWithAuditRef()` function to get a reference to the mutation.
const ref = updateCircleConfigurationWithAuditRef(updateCircleConfigurationWithAuditVars);
// Variables can be defined inline as well.
const ref = updateCircleConfigurationWithAuditRef({ circleId: ..., actorId: ..., action: ..., status: ..., name: ..., description: ..., targetAmount: ..., pricingPlan: ..., memberLimit: ..., activationPrice: ..., deadline: ..., eventDate: ..., visibility: ..., updatedAt: ..., materialChanges: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCircleConfigurationWithAuditRef(dataConnect, updateCircleConfigurationWithAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
});
```

## TransitionCircleWithAudit
You can execute the `TransitionCircleWithAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
transitionCircleWithAudit(vars: TransitionCircleWithAuditVariables): MutationPromise<TransitionCircleWithAuditData, TransitionCircleWithAuditVariables>;

interface TransitionCircleWithAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: TransitionCircleWithAuditVariables): MutationRef<TransitionCircleWithAuditData, TransitionCircleWithAuditVariables>;
}
export const transitionCircleWithAuditRef: TransitionCircleWithAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
transitionCircleWithAudit(dc: DataConnect, vars: TransitionCircleWithAuditVariables): MutationPromise<TransitionCircleWithAuditData, TransitionCircleWithAuditVariables>;

interface TransitionCircleWithAuditRef {
  ...
  (dc: DataConnect, vars: TransitionCircleWithAuditVariables): MutationRef<TransitionCircleWithAuditData, TransitionCircleWithAuditVariables>;
}
export const transitionCircleWithAuditRef: TransitionCircleWithAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the transitionCircleWithAuditRef:
```typescript
const name = transitionCircleWithAuditRef.operationName;
console.log(name);
```

### Variables
The `TransitionCircleWithAudit` mutation requires an argument of type `TransitionCircleWithAuditVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `TransitionCircleWithAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `TransitionCircleWithAuditData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface TransitionCircleWithAuditData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```
### Using `TransitionCircleWithAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, transitionCircleWithAudit, TransitionCircleWithAuditVariables } from '@bondcircle/dataconnect';

// The `TransitionCircleWithAudit` mutation requires an argument of type `TransitionCircleWithAuditVariables`:
const transitionCircleWithAuditVars: TransitionCircleWithAuditVariables = {
  circleId: ..., 
  actorId: ..., 
  fromStatus: ..., 
  toStatus: ..., 
  updatedAt: ..., 
  completedAt: ..., // optional
  retentionDueAt: ..., // optional
  archiveAt: ..., // optional
  purgeAt: ..., // optional
};

// Call the `transitionCircleWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await transitionCircleWithAudit(transitionCircleWithAuditVars);
// Variables can be defined inline as well.
const { data } = await transitionCircleWithAudit({ circleId: ..., actorId: ..., fromStatus: ..., toStatus: ..., updatedAt: ..., completedAt: ..., retentionDueAt: ..., archiveAt: ..., purgeAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await transitionCircleWithAudit(dataConnect, transitionCircleWithAuditVars);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
transitionCircleWithAudit(transitionCircleWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

### Using `TransitionCircleWithAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, transitionCircleWithAuditRef, TransitionCircleWithAuditVariables } from '@bondcircle/dataconnect';

// The `TransitionCircleWithAudit` mutation requires an argument of type `TransitionCircleWithAuditVariables`:
const transitionCircleWithAuditVars: TransitionCircleWithAuditVariables = {
  circleId: ..., 
  actorId: ..., 
  fromStatus: ..., 
  toStatus: ..., 
  updatedAt: ..., 
  completedAt: ..., // optional
  retentionDueAt: ..., // optional
  archiveAt: ..., // optional
  purgeAt: ..., // optional
};

// Call the `transitionCircleWithAuditRef()` function to get a reference to the mutation.
const ref = transitionCircleWithAuditRef(transitionCircleWithAuditVars);
// Variables can be defined inline as well.
const ref = transitionCircleWithAuditRef({ circleId: ..., actorId: ..., fromStatus: ..., toStatus: ..., updatedAt: ..., completedAt: ..., retentionDueAt: ..., archiveAt: ..., purgeAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = transitionCircleWithAuditRef(dataConnect, transitionCircleWithAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

## SetCircleCompletionTypeWithAudit
You can execute the `SetCircleCompletionTypeWithAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
setCircleCompletionTypeWithAudit(vars: SetCircleCompletionTypeWithAuditVariables): MutationPromise<SetCircleCompletionTypeWithAuditData, SetCircleCompletionTypeWithAuditVariables>;

interface SetCircleCompletionTypeWithAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetCircleCompletionTypeWithAuditVariables): MutationRef<SetCircleCompletionTypeWithAuditData, SetCircleCompletionTypeWithAuditVariables>;
}
export const setCircleCompletionTypeWithAuditRef: SetCircleCompletionTypeWithAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setCircleCompletionTypeWithAudit(dc: DataConnect, vars: SetCircleCompletionTypeWithAuditVariables): MutationPromise<SetCircleCompletionTypeWithAuditData, SetCircleCompletionTypeWithAuditVariables>;

interface SetCircleCompletionTypeWithAuditRef {
  ...
  (dc: DataConnect, vars: SetCircleCompletionTypeWithAuditVariables): MutationRef<SetCircleCompletionTypeWithAuditData, SetCircleCompletionTypeWithAuditVariables>;
}
export const setCircleCompletionTypeWithAuditRef: SetCircleCompletionTypeWithAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setCircleCompletionTypeWithAuditRef:
```typescript
const name = setCircleCompletionTypeWithAuditRef.operationName;
console.log(name);
```

### Variables
The `SetCircleCompletionTypeWithAudit` mutation requires an argument of type `SetCircleCompletionTypeWithAuditVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetCircleCompletionTypeWithAuditVariables {
  circleId: UUIDString;
  actorId: string;
  completionType: string;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that executing the `SetCircleCompletionTypeWithAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetCircleCompletionTypeWithAuditData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetCircleCompletionTypeWithAuditData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `SetCircleCompletionTypeWithAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setCircleCompletionTypeWithAudit, SetCircleCompletionTypeWithAuditVariables } from '@bondcircle/dataconnect';

// The `SetCircleCompletionTypeWithAudit` mutation requires an argument of type `SetCircleCompletionTypeWithAuditVariables`:
const setCircleCompletionTypeWithAuditVars: SetCircleCompletionTypeWithAuditVariables = {
  circleId: ..., 
  actorId: ..., 
  completionType: ..., 
  updatedAt: ..., 
};

// Call the `setCircleCompletionTypeWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setCircleCompletionTypeWithAudit(setCircleCompletionTypeWithAuditVars);
// Variables can be defined inline as well.
const { data } = await setCircleCompletionTypeWithAudit({ circleId: ..., actorId: ..., completionType: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setCircleCompletionTypeWithAudit(dataConnect, setCircleCompletionTypeWithAuditVars);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
setCircleCompletionTypeWithAudit(setCircleCompletionTypeWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `SetCircleCompletionTypeWithAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setCircleCompletionTypeWithAuditRef, SetCircleCompletionTypeWithAuditVariables } from '@bondcircle/dataconnect';

// The `SetCircleCompletionTypeWithAudit` mutation requires an argument of type `SetCircleCompletionTypeWithAuditVariables`:
const setCircleCompletionTypeWithAuditVars: SetCircleCompletionTypeWithAuditVariables = {
  circleId: ..., 
  actorId: ..., 
  completionType: ..., 
  updatedAt: ..., 
};

// Call the `setCircleCompletionTypeWithAuditRef()` function to get a reference to the mutation.
const ref = setCircleCompletionTypeWithAuditRef(setCircleCompletionTypeWithAuditVars);
// Variables can be defined inline as well.
const ref = setCircleCompletionTypeWithAuditRef({ circleId: ..., actorId: ..., completionType: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setCircleCompletionTypeWithAuditRef(dataConnect, setCircleCompletionTypeWithAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
});
```

## AddCircleMemberWithAudit
You can execute the `AddCircleMemberWithAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
addCircleMemberWithAudit(vars: AddCircleMemberWithAuditVariables): MutationPromise<AddCircleMemberWithAuditData, AddCircleMemberWithAuditVariables>;

interface AddCircleMemberWithAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddCircleMemberWithAuditVariables): MutationRef<AddCircleMemberWithAuditData, AddCircleMemberWithAuditVariables>;
}
export const addCircleMemberWithAuditRef: AddCircleMemberWithAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addCircleMemberWithAudit(dc: DataConnect, vars: AddCircleMemberWithAuditVariables): MutationPromise<AddCircleMemberWithAuditData, AddCircleMemberWithAuditVariables>;

interface AddCircleMemberWithAuditRef {
  ...
  (dc: DataConnect, vars: AddCircleMemberWithAuditVariables): MutationRef<AddCircleMemberWithAuditData, AddCircleMemberWithAuditVariables>;
}
export const addCircleMemberWithAuditRef: AddCircleMemberWithAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addCircleMemberWithAuditRef:
```typescript
const name = addCircleMemberWithAuditRef.operationName;
console.log(name);
```

### Variables
The `AddCircleMemberWithAudit` mutation requires an argument of type `AddCircleMemberWithAuditVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddCircleMemberWithAuditVariables {
  circleId: UUIDString;
  actorId: string;
  memberId: string;
  role: string;
  createdAt: TimestampString;
}
```
### Return Type
Recall that executing the `AddCircleMemberWithAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddCircleMemberWithAuditData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddCircleMemberWithAuditData {
  circleMembership_insert: CircleMembership_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```
### Using `AddCircleMemberWithAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addCircleMemberWithAudit, AddCircleMemberWithAuditVariables } from '@bondcircle/dataconnect';

// The `AddCircleMemberWithAudit` mutation requires an argument of type `AddCircleMemberWithAuditVariables`:
const addCircleMemberWithAuditVars: AddCircleMemberWithAuditVariables = {
  circleId: ..., 
  actorId: ..., 
  memberId: ..., 
  role: ..., 
  createdAt: ..., 
};

// Call the `addCircleMemberWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addCircleMemberWithAudit(addCircleMemberWithAuditVars);
// Variables can be defined inline as well.
const { data } = await addCircleMemberWithAudit({ circleId: ..., actorId: ..., memberId: ..., role: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addCircleMemberWithAudit(dataConnect, addCircleMemberWithAuditVars);

console.log(data.circleMembership_insert);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
addCircleMemberWithAudit(addCircleMemberWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_insert);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

### Using `AddCircleMemberWithAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addCircleMemberWithAuditRef, AddCircleMemberWithAuditVariables } from '@bondcircle/dataconnect';

// The `AddCircleMemberWithAudit` mutation requires an argument of type `AddCircleMemberWithAuditVariables`:
const addCircleMemberWithAuditVars: AddCircleMemberWithAuditVariables = {
  circleId: ..., 
  actorId: ..., 
  memberId: ..., 
  role: ..., 
  createdAt: ..., 
};

// Call the `addCircleMemberWithAuditRef()` function to get a reference to the mutation.
const ref = addCircleMemberWithAuditRef(addCircleMemberWithAuditVars);
// Variables can be defined inline as well.
const ref = addCircleMemberWithAuditRef({ circleId: ..., actorId: ..., memberId: ..., role: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addCircleMemberWithAuditRef(dataConnect, addCircleMemberWithAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circleMembership_insert);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_insert);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

## ConfigureGiftCircle
You can execute the `ConfigureGiftCircle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
configureGiftCircle(vars: ConfigureGiftCircleVariables): MutationPromise<ConfigureGiftCircleData, ConfigureGiftCircleVariables>;

interface ConfigureGiftCircleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ConfigureGiftCircleVariables): MutationRef<ConfigureGiftCircleData, ConfigureGiftCircleVariables>;
}
export const configureGiftCircleRef: ConfigureGiftCircleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
configureGiftCircle(dc: DataConnect, vars: ConfigureGiftCircleVariables): MutationPromise<ConfigureGiftCircleData, ConfigureGiftCircleVariables>;

interface ConfigureGiftCircleRef {
  ...
  (dc: DataConnect, vars: ConfigureGiftCircleVariables): MutationRef<ConfigureGiftCircleData, ConfigureGiftCircleVariables>;
}
export const configureGiftCircleRef: ConfigureGiftCircleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the configureGiftCircleRef:
```typescript
const name = configureGiftCircleRef.operationName;
console.log(name);
```

### Variables
The `ConfigureGiftCircle` mutation requires an argument of type `ConfigureGiftCircleVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `ConfigureGiftCircle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ConfigureGiftCircleData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ConfigureGiftCircleData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `ConfigureGiftCircle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, configureGiftCircle, ConfigureGiftCircleVariables } from '@bondcircle/dataconnect';

// The `ConfigureGiftCircle` mutation requires an argument of type `ConfigureGiftCircleVariables`:
const configureGiftCircleVars: ConfigureGiftCircleVariables = {
  circleId: ..., 
  actorId: ..., 
  giftTitle: ..., 
  contributionMode: ..., 
  paymentBankName: ..., 
  paymentAccountName: ..., 
  paymentAccountNumber: ..., 
  imageUrl: ..., 
  imageStoragePath: ..., 
  updatedAt: ..., 
};

// Call the `configureGiftCircle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await configureGiftCircle(configureGiftCircleVars);
// Variables can be defined inline as well.
const { data } = await configureGiftCircle({ circleId: ..., actorId: ..., giftTitle: ..., contributionMode: ..., paymentBankName: ..., paymentAccountName: ..., paymentAccountNumber: ..., imageUrl: ..., imageStoragePath: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await configureGiftCircle(dataConnect, configureGiftCircleVars);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
configureGiftCircle(configureGiftCircleVars).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `ConfigureGiftCircle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, configureGiftCircleRef, ConfigureGiftCircleVariables } from '@bondcircle/dataconnect';

// The `ConfigureGiftCircle` mutation requires an argument of type `ConfigureGiftCircleVariables`:
const configureGiftCircleVars: ConfigureGiftCircleVariables = {
  circleId: ..., 
  actorId: ..., 
  giftTitle: ..., 
  contributionMode: ..., 
  paymentBankName: ..., 
  paymentAccountName: ..., 
  paymentAccountNumber: ..., 
  imageUrl: ..., 
  imageStoragePath: ..., 
  updatedAt: ..., 
};

// Call the `configureGiftCircleRef()` function to get a reference to the mutation.
const ref = configureGiftCircleRef(configureGiftCircleVars);
// Variables can be defined inline as well.
const ref = configureGiftCircleRef({ circleId: ..., actorId: ..., giftTitle: ..., contributionMode: ..., paymentBankName: ..., paymentAccountName: ..., paymentAccountNumber: ..., imageUrl: ..., imageStoragePath: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = configureGiftCircleRef(dataConnect, configureGiftCircleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
});
```

## SetGiftMemberAllocation
You can execute the `SetGiftMemberAllocation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
setGiftMemberAllocation(vars: SetGiftMemberAllocationVariables): MutationPromise<SetGiftMemberAllocationData, SetGiftMemberAllocationVariables>;

interface SetGiftMemberAllocationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetGiftMemberAllocationVariables): MutationRef<SetGiftMemberAllocationData, SetGiftMemberAllocationVariables>;
}
export const setGiftMemberAllocationRef: SetGiftMemberAllocationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setGiftMemberAllocation(dc: DataConnect, vars: SetGiftMemberAllocationVariables): MutationPromise<SetGiftMemberAllocationData, SetGiftMemberAllocationVariables>;

interface SetGiftMemberAllocationRef {
  ...
  (dc: DataConnect, vars: SetGiftMemberAllocationVariables): MutationRef<SetGiftMemberAllocationData, SetGiftMemberAllocationVariables>;
}
export const setGiftMemberAllocationRef: SetGiftMemberAllocationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setGiftMemberAllocationRef:
```typescript
const name = setGiftMemberAllocationRef.operationName;
console.log(name);
```

### Variables
The `SetGiftMemberAllocation` mutation requires an argument of type `SetGiftMemberAllocationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetGiftMemberAllocationVariables {
  circleId: UUIDString;
  memberId: string;
  expectedAmount: number;
  contributionStatus: string;
}
```
### Return Type
Recall that executing the `SetGiftMemberAllocation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetGiftMemberAllocationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetGiftMemberAllocationData {
  circleMembership_update?: CircleMembership_Key | null;
}
```
### Using `SetGiftMemberAllocation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setGiftMemberAllocation, SetGiftMemberAllocationVariables } from '@bondcircle/dataconnect';

// The `SetGiftMemberAllocation` mutation requires an argument of type `SetGiftMemberAllocationVariables`:
const setGiftMemberAllocationVars: SetGiftMemberAllocationVariables = {
  circleId: ..., 
  memberId: ..., 
  expectedAmount: ..., 
  contributionStatus: ..., 
};

// Call the `setGiftMemberAllocation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setGiftMemberAllocation(setGiftMemberAllocationVars);
// Variables can be defined inline as well.
const { data } = await setGiftMemberAllocation({ circleId: ..., memberId: ..., expectedAmount: ..., contributionStatus: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setGiftMemberAllocation(dataConnect, setGiftMemberAllocationVars);

console.log(data.circleMembership_update);

// Or, you can use the `Promise` API.
setGiftMemberAllocation(setGiftMemberAllocationVars).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
});
```

### Using `SetGiftMemberAllocation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setGiftMemberAllocationRef, SetGiftMemberAllocationVariables } from '@bondcircle/dataconnect';

// The `SetGiftMemberAllocation` mutation requires an argument of type `SetGiftMemberAllocationVariables`:
const setGiftMemberAllocationVars: SetGiftMemberAllocationVariables = {
  circleId: ..., 
  memberId: ..., 
  expectedAmount: ..., 
  contributionStatus: ..., 
};

// Call the `setGiftMemberAllocationRef()` function to get a reference to the mutation.
const ref = setGiftMemberAllocationRef(setGiftMemberAllocationVars);
// Variables can be defined inline as well.
const ref = setGiftMemberAllocationRef({ circleId: ..., memberId: ..., expectedAmount: ..., contributionStatus: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setGiftMemberAllocationRef(dataConnect, setGiftMemberAllocationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circleMembership_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
});
```

## ConfigureAsoEbiCircle
You can execute the `ConfigureAsoEbiCircle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
configureAsoEbiCircle(vars: ConfigureAsoEbiCircleVariables): MutationPromise<ConfigureAsoEbiCircleData, ConfigureAsoEbiCircleVariables>;

interface ConfigureAsoEbiCircleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ConfigureAsoEbiCircleVariables): MutationRef<ConfigureAsoEbiCircleData, ConfigureAsoEbiCircleVariables>;
}
export const configureAsoEbiCircleRef: ConfigureAsoEbiCircleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
configureAsoEbiCircle(dc: DataConnect, vars: ConfigureAsoEbiCircleVariables): MutationPromise<ConfigureAsoEbiCircleData, ConfigureAsoEbiCircleVariables>;

interface ConfigureAsoEbiCircleRef {
  ...
  (dc: DataConnect, vars: ConfigureAsoEbiCircleVariables): MutationRef<ConfigureAsoEbiCircleData, ConfigureAsoEbiCircleVariables>;
}
export const configureAsoEbiCircleRef: ConfigureAsoEbiCircleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the configureAsoEbiCircleRef:
```typescript
const name = configureAsoEbiCircleRef.operationName;
console.log(name);
```

### Variables
The `ConfigureAsoEbiCircle` mutation requires an argument of type `ConfigureAsoEbiCircleVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `ConfigureAsoEbiCircle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ConfigureAsoEbiCircleData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ConfigureAsoEbiCircleData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `ConfigureAsoEbiCircle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, configureAsoEbiCircle, ConfigureAsoEbiCircleVariables } from '@bondcircle/dataconnect';

// The `ConfigureAsoEbiCircle` mutation requires an argument of type `ConfigureAsoEbiCircleVariables`:
const configureAsoEbiCircleVars: ConfigureAsoEbiCircleVariables = {
  circleId: ..., 
  actorId: ..., 
  eventType: ..., 
  organizerName: ..., 
  paymentBankName: ..., 
  paymentAccountName: ..., 
  paymentAccountNumber: ..., 
  imageUrl: ..., 
  imageStoragePath: ..., 
  updatedAt: ..., 
};

// Call the `configureAsoEbiCircle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await configureAsoEbiCircle(configureAsoEbiCircleVars);
// Variables can be defined inline as well.
const { data } = await configureAsoEbiCircle({ circleId: ..., actorId: ..., eventType: ..., organizerName: ..., paymentBankName: ..., paymentAccountName: ..., paymentAccountNumber: ..., imageUrl: ..., imageStoragePath: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await configureAsoEbiCircle(dataConnect, configureAsoEbiCircleVars);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
configureAsoEbiCircle(configureAsoEbiCircleVars).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `ConfigureAsoEbiCircle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, configureAsoEbiCircleRef, ConfigureAsoEbiCircleVariables } from '@bondcircle/dataconnect';

// The `ConfigureAsoEbiCircle` mutation requires an argument of type `ConfigureAsoEbiCircleVariables`:
const configureAsoEbiCircleVars: ConfigureAsoEbiCircleVariables = {
  circleId: ..., 
  actorId: ..., 
  eventType: ..., 
  organizerName: ..., 
  paymentBankName: ..., 
  paymentAccountName: ..., 
  paymentAccountNumber: ..., 
  imageUrl: ..., 
  imageStoragePath: ..., 
  updatedAt: ..., 
};

// Call the `configureAsoEbiCircleRef()` function to get a reference to the mutation.
const ref = configureAsoEbiCircleRef(configureAsoEbiCircleVars);
// Variables can be defined inline as well.
const ref = configureAsoEbiCircleRef({ circleId: ..., actorId: ..., eventType: ..., organizerName: ..., paymentBankName: ..., paymentAccountName: ..., paymentAccountNumber: ..., imageUrl: ..., imageStoragePath: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = configureAsoEbiCircleRef(dataConnect, configureAsoEbiCircleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
});
```

## CreateAsoEbiTier
You can execute the `CreateAsoEbiTier` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createAsoEbiTier(vars: CreateAsoEbiTierVariables): MutationPromise<CreateAsoEbiTierData, CreateAsoEbiTierVariables>;

interface CreateAsoEbiTierRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAsoEbiTierVariables): MutationRef<CreateAsoEbiTierData, CreateAsoEbiTierVariables>;
}
export const createAsoEbiTierRef: CreateAsoEbiTierRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAsoEbiTier(dc: DataConnect, vars: CreateAsoEbiTierVariables): MutationPromise<CreateAsoEbiTierData, CreateAsoEbiTierVariables>;

interface CreateAsoEbiTierRef {
  ...
  (dc: DataConnect, vars: CreateAsoEbiTierVariables): MutationRef<CreateAsoEbiTierData, CreateAsoEbiTierVariables>;
}
export const createAsoEbiTierRef: CreateAsoEbiTierRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAsoEbiTierRef:
```typescript
const name = createAsoEbiTierRef.operationName;
console.log(name);
```

### Variables
The `CreateAsoEbiTier` mutation requires an argument of type `CreateAsoEbiTierVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateAsoEbiTier` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAsoEbiTierData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAsoEbiTierData {
  asoEbiTier_insert: AsoEbiTier_Key;
}
```
### Using `CreateAsoEbiTier`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAsoEbiTier, CreateAsoEbiTierVariables } from '@bondcircle/dataconnect';

// The `CreateAsoEbiTier` mutation requires an argument of type `CreateAsoEbiTierVariables`:
const createAsoEbiTierVars: CreateAsoEbiTierVariables = {
  tierId: ..., 
  circleId: ..., 
  name: ..., 
  price: ..., 
  fabricDescription: ..., 
  fabricImageUrl: ..., // optional
  fabricImageStoragePath: ..., // optional
  appreciationGiftName: ..., // optional
  appreciationGiftImageUrl: ..., // optional
  appreciationGiftImageStoragePath: ..., // optional
  availabilityNote: ..., // optional
  deliveryDetails: ..., // optional
  sortOrder: ..., 
  createdAt: ..., 
};

// Call the `createAsoEbiTier()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAsoEbiTier(createAsoEbiTierVars);
// Variables can be defined inline as well.
const { data } = await createAsoEbiTier({ tierId: ..., circleId: ..., name: ..., price: ..., fabricDescription: ..., fabricImageUrl: ..., fabricImageStoragePath: ..., appreciationGiftName: ..., appreciationGiftImageUrl: ..., appreciationGiftImageStoragePath: ..., availabilityNote: ..., deliveryDetails: ..., sortOrder: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAsoEbiTier(dataConnect, createAsoEbiTierVars);

console.log(data.asoEbiTier_insert);

// Or, you can use the `Promise` API.
createAsoEbiTier(createAsoEbiTierVars).then((response) => {
  const data = response.data;
  console.log(data.asoEbiTier_insert);
});
```

### Using `CreateAsoEbiTier`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAsoEbiTierRef, CreateAsoEbiTierVariables } from '@bondcircle/dataconnect';

// The `CreateAsoEbiTier` mutation requires an argument of type `CreateAsoEbiTierVariables`:
const createAsoEbiTierVars: CreateAsoEbiTierVariables = {
  tierId: ..., 
  circleId: ..., 
  name: ..., 
  price: ..., 
  fabricDescription: ..., 
  fabricImageUrl: ..., // optional
  fabricImageStoragePath: ..., // optional
  appreciationGiftName: ..., // optional
  appreciationGiftImageUrl: ..., // optional
  appreciationGiftImageStoragePath: ..., // optional
  availabilityNote: ..., // optional
  deliveryDetails: ..., // optional
  sortOrder: ..., 
  createdAt: ..., 
};

// Call the `createAsoEbiTierRef()` function to get a reference to the mutation.
const ref = createAsoEbiTierRef(createAsoEbiTierVars);
// Variables can be defined inline as well.
const ref = createAsoEbiTierRef({ tierId: ..., circleId: ..., name: ..., price: ..., fabricDescription: ..., fabricImageUrl: ..., fabricImageStoragePath: ..., appreciationGiftName: ..., appreciationGiftImageUrl: ..., appreciationGiftImageStoragePath: ..., availabilityNote: ..., deliveryDetails: ..., sortOrder: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAsoEbiTierRef(dataConnect, createAsoEbiTierVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.asoEbiTier_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.asoEbiTier_insert);
});
```

## SelectAsoEbiTier
You can execute the `SelectAsoEbiTier` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
selectAsoEbiTier(vars: SelectAsoEbiTierVariables): MutationPromise<SelectAsoEbiTierData, SelectAsoEbiTierVariables>;

interface SelectAsoEbiTierRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SelectAsoEbiTierVariables): MutationRef<SelectAsoEbiTierData, SelectAsoEbiTierVariables>;
}
export const selectAsoEbiTierRef: SelectAsoEbiTierRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
selectAsoEbiTier(dc: DataConnect, vars: SelectAsoEbiTierVariables): MutationPromise<SelectAsoEbiTierData, SelectAsoEbiTierVariables>;

interface SelectAsoEbiTierRef {
  ...
  (dc: DataConnect, vars: SelectAsoEbiTierVariables): MutationRef<SelectAsoEbiTierData, SelectAsoEbiTierVariables>;
}
export const selectAsoEbiTierRef: SelectAsoEbiTierRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the selectAsoEbiTierRef:
```typescript
const name = selectAsoEbiTierRef.operationName;
console.log(name);
```

### Variables
The `SelectAsoEbiTier` mutation requires an argument of type `SelectAsoEbiTierVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SelectAsoEbiTierVariables {
  circleId: UUIDString;
  memberId: string;
  tierId: UUIDString;
  expectedAmount: number;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that executing the `SelectAsoEbiTier` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SelectAsoEbiTierData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SelectAsoEbiTierData {
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```
### Using `SelectAsoEbiTier`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, selectAsoEbiTier, SelectAsoEbiTierVariables } from '@bondcircle/dataconnect';

// The `SelectAsoEbiTier` mutation requires an argument of type `SelectAsoEbiTierVariables`:
const selectAsoEbiTierVars: SelectAsoEbiTierVariables = {
  circleId: ..., 
  memberId: ..., 
  tierId: ..., 
  expectedAmount: ..., 
  updatedAt: ..., 
};

// Call the `selectAsoEbiTier()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await selectAsoEbiTier(selectAsoEbiTierVars);
// Variables can be defined inline as well.
const { data } = await selectAsoEbiTier({ circleId: ..., memberId: ..., tierId: ..., expectedAmount: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await selectAsoEbiTier(dataConnect, selectAsoEbiTierVars);

console.log(data.circleMembership_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
selectAsoEbiTier(selectAsoEbiTierVars).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

### Using `SelectAsoEbiTier`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, selectAsoEbiTierRef, SelectAsoEbiTierVariables } from '@bondcircle/dataconnect';

// The `SelectAsoEbiTier` mutation requires an argument of type `SelectAsoEbiTierVariables`:
const selectAsoEbiTierVars: SelectAsoEbiTierVariables = {
  circleId: ..., 
  memberId: ..., 
  tierId: ..., 
  expectedAmount: ..., 
  updatedAt: ..., 
};

// Call the `selectAsoEbiTierRef()` function to get a reference to the mutation.
const ref = selectAsoEbiTierRef(selectAsoEbiTierVars);
// Variables can be defined inline as well.
const ref = selectAsoEbiTierRef({ circleId: ..., memberId: ..., tierId: ..., expectedAmount: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = selectAsoEbiTierRef(dataConnect, selectAsoEbiTierVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circleMembership_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

## UpdateAsoEbiFulfilment
You can execute the `UpdateAsoEbiFulfilment` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateAsoEbiFulfilment(vars: UpdateAsoEbiFulfilmentVariables): MutationPromise<UpdateAsoEbiFulfilmentData, UpdateAsoEbiFulfilmentVariables>;

interface UpdateAsoEbiFulfilmentRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAsoEbiFulfilmentVariables): MutationRef<UpdateAsoEbiFulfilmentData, UpdateAsoEbiFulfilmentVariables>;
}
export const updateAsoEbiFulfilmentRef: UpdateAsoEbiFulfilmentRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAsoEbiFulfilment(dc: DataConnect, vars: UpdateAsoEbiFulfilmentVariables): MutationPromise<UpdateAsoEbiFulfilmentData, UpdateAsoEbiFulfilmentVariables>;

interface UpdateAsoEbiFulfilmentRef {
  ...
  (dc: DataConnect, vars: UpdateAsoEbiFulfilmentVariables): MutationRef<UpdateAsoEbiFulfilmentData, UpdateAsoEbiFulfilmentVariables>;
}
export const updateAsoEbiFulfilmentRef: UpdateAsoEbiFulfilmentRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAsoEbiFulfilmentRef:
```typescript
const name = updateAsoEbiFulfilmentRef.operationName;
console.log(name);
```

### Variables
The `UpdateAsoEbiFulfilment` mutation requires an argument of type `UpdateAsoEbiFulfilmentVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateAsoEbiFulfilmentVariables {
  circleId: UUIDString;
  actorId: string;
  memberId: string;
  status: string;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that executing the `UpdateAsoEbiFulfilment` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAsoEbiFulfilmentData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAsoEbiFulfilmentData {
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```
### Using `UpdateAsoEbiFulfilment`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAsoEbiFulfilment, UpdateAsoEbiFulfilmentVariables } from '@bondcircle/dataconnect';

// The `UpdateAsoEbiFulfilment` mutation requires an argument of type `UpdateAsoEbiFulfilmentVariables`:
const updateAsoEbiFulfilmentVars: UpdateAsoEbiFulfilmentVariables = {
  circleId: ..., 
  actorId: ..., 
  memberId: ..., 
  status: ..., 
  updatedAt: ..., 
};

// Call the `updateAsoEbiFulfilment()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAsoEbiFulfilment(updateAsoEbiFulfilmentVars);
// Variables can be defined inline as well.
const { data } = await updateAsoEbiFulfilment({ circleId: ..., actorId: ..., memberId: ..., status: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAsoEbiFulfilment(dataConnect, updateAsoEbiFulfilmentVars);

console.log(data.circleMembership_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
updateAsoEbiFulfilment(updateAsoEbiFulfilmentVars).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

### Using `UpdateAsoEbiFulfilment`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAsoEbiFulfilmentRef, UpdateAsoEbiFulfilmentVariables } from '@bondcircle/dataconnect';

// The `UpdateAsoEbiFulfilment` mutation requires an argument of type `UpdateAsoEbiFulfilmentVariables`:
const updateAsoEbiFulfilmentVars: UpdateAsoEbiFulfilmentVariables = {
  circleId: ..., 
  actorId: ..., 
  memberId: ..., 
  status: ..., 
  updatedAt: ..., 
};

// Call the `updateAsoEbiFulfilmentRef()` function to get a reference to the mutation.
const ref = updateAsoEbiFulfilmentRef(updateAsoEbiFulfilmentVars);
// Variables can be defined inline as well.
const ref = updateAsoEbiFulfilmentRef({ circleId: ..., actorId: ..., memberId: ..., status: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAsoEbiFulfilmentRef(dataConnect, updateAsoEbiFulfilmentVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circleMembership_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

## ConfigureSupportCircle
You can execute the `ConfigureSupportCircle` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
configureSupportCircle(vars: ConfigureSupportCircleVariables): MutationPromise<ConfigureSupportCircleData, ConfigureSupportCircleVariables>;

interface ConfigureSupportCircleRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ConfigureSupportCircleVariables): MutationRef<ConfigureSupportCircleData, ConfigureSupportCircleVariables>;
}
export const configureSupportCircleRef: ConfigureSupportCircleRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
configureSupportCircle(dc: DataConnect, vars: ConfigureSupportCircleVariables): MutationPromise<ConfigureSupportCircleData, ConfigureSupportCircleVariables>;

interface ConfigureSupportCircleRef {
  ...
  (dc: DataConnect, vars: ConfigureSupportCircleVariables): MutationRef<ConfigureSupportCircleData, ConfigureSupportCircleVariables>;
}
export const configureSupportCircleRef: ConfigureSupportCircleRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the configureSupportCircleRef:
```typescript
const name = configureSupportCircleRef.operationName;
console.log(name);
```

### Variables
The `ConfigureSupportCircle` mutation requires an argument of type `ConfigureSupportCircleVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `ConfigureSupportCircle` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ConfigureSupportCircleData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ConfigureSupportCircleData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `ConfigureSupportCircle`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, configureSupportCircle, ConfigureSupportCircleVariables } from '@bondcircle/dataconnect';

// The `ConfigureSupportCircle` mutation requires an argument of type `ConfigureSupportCircleVariables`:
const configureSupportCircleVars: ConfigureSupportCircleVariables = {
  circleId: ..., 
  actorId: ..., 
  supportType: ..., 
  beneficiaryName: ..., 
  beneficiaryRelationship: ..., // optional
  contributionMode: ..., 
  showBeneficiaryName: ..., 
  showTargetToMembers: ..., 
  showConfirmedTotalToMembers: ..., 
  hideIndividualAmounts: ..., 
  requireCreatorApproval: ..., 
  paymentBankName: ..., 
  paymentAccountName: ..., 
  paymentAccountNumber: ..., 
  imageUrl: ..., 
  imageStoragePath: ..., 
  updatedAt: ..., 
};

// Call the `configureSupportCircle()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await configureSupportCircle(configureSupportCircleVars);
// Variables can be defined inline as well.
const { data } = await configureSupportCircle({ circleId: ..., actorId: ..., supportType: ..., beneficiaryName: ..., beneficiaryRelationship: ..., contributionMode: ..., showBeneficiaryName: ..., showTargetToMembers: ..., showConfirmedTotalToMembers: ..., hideIndividualAmounts: ..., requireCreatorApproval: ..., paymentBankName: ..., paymentAccountName: ..., paymentAccountNumber: ..., imageUrl: ..., imageStoragePath: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await configureSupportCircle(dataConnect, configureSupportCircleVars);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
configureSupportCircle(configureSupportCircleVars).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `ConfigureSupportCircle`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, configureSupportCircleRef, ConfigureSupportCircleVariables } from '@bondcircle/dataconnect';

// The `ConfigureSupportCircle` mutation requires an argument of type `ConfigureSupportCircleVariables`:
const configureSupportCircleVars: ConfigureSupportCircleVariables = {
  circleId: ..., 
  actorId: ..., 
  supportType: ..., 
  beneficiaryName: ..., 
  beneficiaryRelationship: ..., // optional
  contributionMode: ..., 
  showBeneficiaryName: ..., 
  showTargetToMembers: ..., 
  showConfirmedTotalToMembers: ..., 
  hideIndividualAmounts: ..., 
  requireCreatorApproval: ..., 
  paymentBankName: ..., 
  paymentAccountName: ..., 
  paymentAccountNumber: ..., 
  imageUrl: ..., 
  imageStoragePath: ..., 
  updatedAt: ..., 
};

// Call the `configureSupportCircleRef()` function to get a reference to the mutation.
const ref = configureSupportCircleRef(configureSupportCircleVars);
// Variables can be defined inline as well.
const ref = configureSupportCircleRef({ circleId: ..., actorId: ..., supportType: ..., beneficiaryName: ..., beneficiaryRelationship: ..., contributionMode: ..., showBeneficiaryName: ..., showTargetToMembers: ..., showConfirmedTotalToMembers: ..., hideIndividualAmounts: ..., requireCreatorApproval: ..., paymentBankName: ..., paymentAccountName: ..., paymentAccountNumber: ..., imageUrl: ..., imageStoragePath: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = configureSupportCircleRef(dataConnect, configureSupportCircleVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
});
```

## RecordSupportPledge
You can execute the `RecordSupportPledge` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
recordSupportPledge(vars: RecordSupportPledgeVariables): MutationPromise<RecordSupportPledgeData, RecordSupportPledgeVariables>;

interface RecordSupportPledgeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordSupportPledgeVariables): MutationRef<RecordSupportPledgeData, RecordSupportPledgeVariables>;
}
export const recordSupportPledgeRef: RecordSupportPledgeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordSupportPledge(dc: DataConnect, vars: RecordSupportPledgeVariables): MutationPromise<RecordSupportPledgeData, RecordSupportPledgeVariables>;

interface RecordSupportPledgeRef {
  ...
  (dc: DataConnect, vars: RecordSupportPledgeVariables): MutationRef<RecordSupportPledgeData, RecordSupportPledgeVariables>;
}
export const recordSupportPledgeRef: RecordSupportPledgeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordSupportPledgeRef:
```typescript
const name = recordSupportPledgeRef.operationName;
console.log(name);
```

### Variables
The `RecordSupportPledge` mutation requires an argument of type `RecordSupportPledgeVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordSupportPledgeVariables {
  circleId: UUIDString;
  memberId: string;
  amount: number;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that executing the `RecordSupportPledge` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordSupportPledgeData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordSupportPledgeData {
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `RecordSupportPledge`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordSupportPledge, RecordSupportPledgeVariables } from '@bondcircle/dataconnect';

// The `RecordSupportPledge` mutation requires an argument of type `RecordSupportPledgeVariables`:
const recordSupportPledgeVars: RecordSupportPledgeVariables = {
  circleId: ..., 
  memberId: ..., 
  amount: ..., 
  updatedAt: ..., 
};

// Call the `recordSupportPledge()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordSupportPledge(recordSupportPledgeVars);
// Variables can be defined inline as well.
const { data } = await recordSupportPledge({ circleId: ..., memberId: ..., amount: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordSupportPledge(dataConnect, recordSupportPledgeVars);

console.log(data.circleMembership_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
recordSupportPledge(recordSupportPledgeVars).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `RecordSupportPledge`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordSupportPledgeRef, RecordSupportPledgeVariables } from '@bondcircle/dataconnect';

// The `RecordSupportPledge` mutation requires an argument of type `RecordSupportPledgeVariables`:
const recordSupportPledgeVars: RecordSupportPledgeVariables = {
  circleId: ..., 
  memberId: ..., 
  amount: ..., 
  updatedAt: ..., 
};

// Call the `recordSupportPledgeRef()` function to get a reference to the mutation.
const ref = recordSupportPledgeRef(recordSupportPledgeVars);
// Variables can be defined inline as well.
const ref = recordSupportPledgeRef({ circleId: ..., memberId: ..., amount: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordSupportPledgeRef(dataConnect, recordSupportPledgeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circleMembership_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
});
```

## SetSupportMemberAllocation
You can execute the `SetSupportMemberAllocation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
setSupportMemberAllocation(vars: SetSupportMemberAllocationVariables): MutationPromise<SetSupportMemberAllocationData, SetSupportMemberAllocationVariables>;

interface SetSupportMemberAllocationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetSupportMemberAllocationVariables): MutationRef<SetSupportMemberAllocationData, SetSupportMemberAllocationVariables>;
}
export const setSupportMemberAllocationRef: SetSupportMemberAllocationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setSupportMemberAllocation(dc: DataConnect, vars: SetSupportMemberAllocationVariables): MutationPromise<SetSupportMemberAllocationData, SetSupportMemberAllocationVariables>;

interface SetSupportMemberAllocationRef {
  ...
  (dc: DataConnect, vars: SetSupportMemberAllocationVariables): MutationRef<SetSupportMemberAllocationData, SetSupportMemberAllocationVariables>;
}
export const setSupportMemberAllocationRef: SetSupportMemberAllocationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setSupportMemberAllocationRef:
```typescript
const name = setSupportMemberAllocationRef.operationName;
console.log(name);
```

### Variables
The `SetSupportMemberAllocation` mutation requires an argument of type `SetSupportMemberAllocationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetSupportMemberAllocationVariables {
  circleId: UUIDString;
  memberId: string;
  expectedAmount: number;
  contributionStatus: string;
}
```
### Return Type
Recall that executing the `SetSupportMemberAllocation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetSupportMemberAllocationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetSupportMemberAllocationData {
  circleMembership_update?: CircleMembership_Key | null;
}
```
### Using `SetSupportMemberAllocation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setSupportMemberAllocation, SetSupportMemberAllocationVariables } from '@bondcircle/dataconnect';

// The `SetSupportMemberAllocation` mutation requires an argument of type `SetSupportMemberAllocationVariables`:
const setSupportMemberAllocationVars: SetSupportMemberAllocationVariables = {
  circleId: ..., 
  memberId: ..., 
  expectedAmount: ..., 
  contributionStatus: ..., 
};

// Call the `setSupportMemberAllocation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setSupportMemberAllocation(setSupportMemberAllocationVars);
// Variables can be defined inline as well.
const { data } = await setSupportMemberAllocation({ circleId: ..., memberId: ..., expectedAmount: ..., contributionStatus: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setSupportMemberAllocation(dataConnect, setSupportMemberAllocationVars);

console.log(data.circleMembership_update);

// Or, you can use the `Promise` API.
setSupportMemberAllocation(setSupportMemberAllocationVars).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
});
```

### Using `SetSupportMemberAllocation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setSupportMemberAllocationRef, SetSupportMemberAllocationVariables } from '@bondcircle/dataconnect';

// The `SetSupportMemberAllocation` mutation requires an argument of type `SetSupportMemberAllocationVariables`:
const setSupportMemberAllocationVars: SetSupportMemberAllocationVariables = {
  circleId: ..., 
  memberId: ..., 
  expectedAmount: ..., 
  contributionStatus: ..., 
};

// Call the `setSupportMemberAllocationRef()` function to get a reference to the mutation.
const ref = setSupportMemberAllocationRef(setSupportMemberAllocationVars);
// Variables can be defined inline as well.
const ref = setSupportMemberAllocationRef({ circleId: ..., memberId: ..., expectedAmount: ..., contributionStatus: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setSupportMemberAllocationRef(dataConnect, setSupportMemberAllocationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circleMembership_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
});
```

## CreateSupportUpdate
You can execute the `CreateSupportUpdate` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createSupportUpdate(vars: CreateSupportUpdateVariables): MutationPromise<CreateSupportUpdateData, CreateSupportUpdateVariables>;

interface CreateSupportUpdateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateSupportUpdateVariables): MutationRef<CreateSupportUpdateData, CreateSupportUpdateVariables>;
}
export const createSupportUpdateRef: CreateSupportUpdateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createSupportUpdate(dc: DataConnect, vars: CreateSupportUpdateVariables): MutationPromise<CreateSupportUpdateData, CreateSupportUpdateVariables>;

interface CreateSupportUpdateRef {
  ...
  (dc: DataConnect, vars: CreateSupportUpdateVariables): MutationRef<CreateSupportUpdateData, CreateSupportUpdateVariables>;
}
export const createSupportUpdateRef: CreateSupportUpdateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createSupportUpdateRef:
```typescript
const name = createSupportUpdateRef.operationName;
console.log(name);
```

### Variables
The `CreateSupportUpdate` mutation requires an argument of type `CreateSupportUpdateVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateSupportUpdateVariables {
  circleId: UUIDString;
  authorId: string;
  body: string;
  createdAt: TimestampString;
}
```
### Return Type
Recall that executing the `CreateSupportUpdate` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateSupportUpdateData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateSupportUpdateData {
  supportUpdate_insert: SupportUpdate_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `CreateSupportUpdate`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createSupportUpdate, CreateSupportUpdateVariables } from '@bondcircle/dataconnect';

// The `CreateSupportUpdate` mutation requires an argument of type `CreateSupportUpdateVariables`:
const createSupportUpdateVars: CreateSupportUpdateVariables = {
  circleId: ..., 
  authorId: ..., 
  body: ..., 
  createdAt: ..., 
};

// Call the `createSupportUpdate()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createSupportUpdate(createSupportUpdateVars);
// Variables can be defined inline as well.
const { data } = await createSupportUpdate({ circleId: ..., authorId: ..., body: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createSupportUpdate(dataConnect, createSupportUpdateVars);

console.log(data.supportUpdate_insert);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
createSupportUpdate(createSupportUpdateVars).then((response) => {
  const data = response.data;
  console.log(data.supportUpdate_insert);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `CreateSupportUpdate`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createSupportUpdateRef, CreateSupportUpdateVariables } from '@bondcircle/dataconnect';

// The `CreateSupportUpdate` mutation requires an argument of type `CreateSupportUpdateVariables`:
const createSupportUpdateVars: CreateSupportUpdateVariables = {
  circleId: ..., 
  authorId: ..., 
  body: ..., 
  createdAt: ..., 
};

// Call the `createSupportUpdateRef()` function to get a reference to the mutation.
const ref = createSupportUpdateRef(createSupportUpdateVars);
// Variables can be defined inline as well.
const ref = createSupportUpdateRef({ circleId: ..., authorId: ..., body: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createSupportUpdateRef(dataConnect, createSupportUpdateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.supportUpdate_insert);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.supportUpdate_insert);
  console.log(data.circleAuditEntry_insert);
});
```

## SetSupportCompletionType
You can execute the `SetSupportCompletionType` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
setSupportCompletionType(vars: SetSupportCompletionTypeVariables): MutationPromise<SetSupportCompletionTypeData, SetSupportCompletionTypeVariables>;

interface SetSupportCompletionTypeRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetSupportCompletionTypeVariables): MutationRef<SetSupportCompletionTypeData, SetSupportCompletionTypeVariables>;
}
export const setSupportCompletionTypeRef: SetSupportCompletionTypeRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setSupportCompletionType(dc: DataConnect, vars: SetSupportCompletionTypeVariables): MutationPromise<SetSupportCompletionTypeData, SetSupportCompletionTypeVariables>;

interface SetSupportCompletionTypeRef {
  ...
  (dc: DataConnect, vars: SetSupportCompletionTypeVariables): MutationRef<SetSupportCompletionTypeData, SetSupportCompletionTypeVariables>;
}
export const setSupportCompletionTypeRef: SetSupportCompletionTypeRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setSupportCompletionTypeRef:
```typescript
const name = setSupportCompletionTypeRef.operationName;
console.log(name);
```

### Variables
The `SetSupportCompletionType` mutation requires an argument of type `SetSupportCompletionTypeVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetSupportCompletionTypeVariables {
  circleId: UUIDString;
  actorId: string;
  completionType: string;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that executing the `SetSupportCompletionType` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetSupportCompletionTypeData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetSupportCompletionTypeData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `SetSupportCompletionType`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setSupportCompletionType, SetSupportCompletionTypeVariables } from '@bondcircle/dataconnect';

// The `SetSupportCompletionType` mutation requires an argument of type `SetSupportCompletionTypeVariables`:
const setSupportCompletionTypeVars: SetSupportCompletionTypeVariables = {
  circleId: ..., 
  actorId: ..., 
  completionType: ..., 
  updatedAt: ..., 
};

// Call the `setSupportCompletionType()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setSupportCompletionType(setSupportCompletionTypeVars);
// Variables can be defined inline as well.
const { data } = await setSupportCompletionType({ circleId: ..., actorId: ..., completionType: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setSupportCompletionType(dataConnect, setSupportCompletionTypeVars);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
setSupportCompletionType(setSupportCompletionTypeVars).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `SetSupportCompletionType`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setSupportCompletionTypeRef, SetSupportCompletionTypeVariables } from '@bondcircle/dataconnect';

// The `SetSupportCompletionType` mutation requires an argument of type `SetSupportCompletionTypeVariables`:
const setSupportCompletionTypeVars: SetSupportCompletionTypeVariables = {
  circleId: ..., 
  actorId: ..., 
  completionType: ..., 
  updatedAt: ..., 
};

// Call the `setSupportCompletionTypeRef()` function to get a reference to the mutation.
const ref = setSupportCompletionTypeRef(setSupportCompletionTypeVars);
// Variables can be defined inline as well.
const ref = setSupportCompletionTypeRef({ circleId: ..., actorId: ..., completionType: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setSupportCompletionTypeRef(dataConnect, setSupportCompletionTypeVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
});
```

## CreateInvitation
You can execute the `CreateInvitation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createInvitation(vars: CreateInvitationVariables): MutationPromise<CreateInvitationData, CreateInvitationVariables>;

interface CreateInvitationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateInvitationVariables): MutationRef<CreateInvitationData, CreateInvitationVariables>;
}
export const createInvitationRef: CreateInvitationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createInvitation(dc: DataConnect, vars: CreateInvitationVariables): MutationPromise<CreateInvitationData, CreateInvitationVariables>;

interface CreateInvitationRef {
  ...
  (dc: DataConnect, vars: CreateInvitationVariables): MutationRef<CreateInvitationData, CreateInvitationVariables>;
}
export const createInvitationRef: CreateInvitationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createInvitationRef:
```typescript
const name = createInvitationRef.operationName;
console.log(name);
```

### Variables
The `CreateInvitation` mutation requires an argument of type `CreateInvitationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateInvitation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateInvitationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateInvitationData {
  invitation_insert: Invitation_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```
### Using `CreateInvitation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createInvitation, CreateInvitationVariables } from '@bondcircle/dataconnect';

// The `CreateInvitation` mutation requires an argument of type `CreateInvitationVariables`:
const createInvitationVars: CreateInvitationVariables = {
  circleId: ..., 
  invitedById: ..., 
  tokenHash: ..., 
  mode: ..., 
  recipientName: ..., // optional
  recipientEmail: ..., // optional
  recipientPhone: ..., // optional
  expectedAmount: ..., 
  requireApproval: ..., 
  maxUses: ..., 
  expiresAt: ..., 
  createdAt: ..., 
};

// Call the `createInvitation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createInvitation(createInvitationVars);
// Variables can be defined inline as well.
const { data } = await createInvitation({ circleId: ..., invitedById: ..., tokenHash: ..., mode: ..., recipientName: ..., recipientEmail: ..., recipientPhone: ..., expectedAmount: ..., requireApproval: ..., maxUses: ..., expiresAt: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createInvitation(dataConnect, createInvitationVars);

console.log(data.invitation_insert);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
createInvitation(createInvitationVars).then((response) => {
  const data = response.data;
  console.log(data.invitation_insert);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

### Using `CreateInvitation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createInvitationRef, CreateInvitationVariables } from '@bondcircle/dataconnect';

// The `CreateInvitation` mutation requires an argument of type `CreateInvitationVariables`:
const createInvitationVars: CreateInvitationVariables = {
  circleId: ..., 
  invitedById: ..., 
  tokenHash: ..., 
  mode: ..., 
  recipientName: ..., // optional
  recipientEmail: ..., // optional
  recipientPhone: ..., // optional
  expectedAmount: ..., 
  requireApproval: ..., 
  maxUses: ..., 
  expiresAt: ..., 
  createdAt: ..., 
};

// Call the `createInvitationRef()` function to get a reference to the mutation.
const ref = createInvitationRef(createInvitationVars);
// Variables can be defined inline as well.
const ref = createInvitationRef({ circleId: ..., invitedById: ..., tokenHash: ..., mode: ..., recipientName: ..., recipientEmail: ..., recipientPhone: ..., expectedAmount: ..., requireApproval: ..., maxUses: ..., expiresAt: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createInvitationRef(dataConnect, createInvitationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invitation_insert);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invitation_insert);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

## UpdateInvitationState
You can execute the `UpdateInvitationState` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateInvitationState(vars: UpdateInvitationStateVariables): MutationPromise<UpdateInvitationStateData, UpdateInvitationStateVariables>;

interface UpdateInvitationStateRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateInvitationStateVariables): MutationRef<UpdateInvitationStateData, UpdateInvitationStateVariables>;
}
export const updateInvitationStateRef: UpdateInvitationStateRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateInvitationState(dc: DataConnect, vars: UpdateInvitationStateVariables): MutationPromise<UpdateInvitationStateData, UpdateInvitationStateVariables>;

interface UpdateInvitationStateRef {
  ...
  (dc: DataConnect, vars: UpdateInvitationStateVariables): MutationRef<UpdateInvitationStateData, UpdateInvitationStateVariables>;
}
export const updateInvitationStateRef: UpdateInvitationStateRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateInvitationStateRef:
```typescript
const name = updateInvitationStateRef.operationName;
console.log(name);
```

### Variables
The `UpdateInvitationState` mutation requires an argument of type `UpdateInvitationStateVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateInvitationStateVariables {
  invitationId: UUIDString;
  actorId: string;
  circleId: UUIDString;
  state: string;
  openedAt?: TimestampString | null;
  revokedAt?: TimestampString | null;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that executing the `UpdateInvitationState` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateInvitationStateData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateInvitationStateData {
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `UpdateInvitationState`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateInvitationState, UpdateInvitationStateVariables } from '@bondcircle/dataconnect';

// The `UpdateInvitationState` mutation requires an argument of type `UpdateInvitationStateVariables`:
const updateInvitationStateVars: UpdateInvitationStateVariables = {
  invitationId: ..., 
  actorId: ..., 
  circleId: ..., 
  state: ..., 
  openedAt: ..., // optional
  revokedAt: ..., // optional
  updatedAt: ..., 
};

// Call the `updateInvitationState()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateInvitationState(updateInvitationStateVars);
// Variables can be defined inline as well.
const { data } = await updateInvitationState({ invitationId: ..., actorId: ..., circleId: ..., state: ..., openedAt: ..., revokedAt: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateInvitationState(dataConnect, updateInvitationStateVars);

console.log(data.invitation_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
updateInvitationState(updateInvitationStateVars).then((response) => {
  const data = response.data;
  console.log(data.invitation_update);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `UpdateInvitationState`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateInvitationStateRef, UpdateInvitationStateVariables } from '@bondcircle/dataconnect';

// The `UpdateInvitationState` mutation requires an argument of type `UpdateInvitationStateVariables`:
const updateInvitationStateVars: UpdateInvitationStateVariables = {
  invitationId: ..., 
  actorId: ..., 
  circleId: ..., 
  state: ..., 
  openedAt: ..., // optional
  revokedAt: ..., // optional
  updatedAt: ..., 
};

// Call the `updateInvitationStateRef()` function to get a reference to the mutation.
const ref = updateInvitationStateRef(updateInvitationStateVars);
// Variables can be defined inline as well.
const ref = updateInvitationStateRef({ invitationId: ..., actorId: ..., circleId: ..., state: ..., openedAt: ..., revokedAt: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateInvitationStateRef(dataConnect, updateInvitationStateVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invitation_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invitation_update);
  console.log(data.circleAuditEntry_insert);
});
```

## AcceptInvitationWithMembership
You can execute the `AcceptInvitationWithMembership` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
acceptInvitationWithMembership(vars: AcceptInvitationWithMembershipVariables): MutationPromise<AcceptInvitationWithMembershipData, AcceptInvitationWithMembershipVariables>;

interface AcceptInvitationWithMembershipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AcceptInvitationWithMembershipVariables): MutationRef<AcceptInvitationWithMembershipData, AcceptInvitationWithMembershipVariables>;
}
export const acceptInvitationWithMembershipRef: AcceptInvitationWithMembershipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
acceptInvitationWithMembership(dc: DataConnect, vars: AcceptInvitationWithMembershipVariables): MutationPromise<AcceptInvitationWithMembershipData, AcceptInvitationWithMembershipVariables>;

interface AcceptInvitationWithMembershipRef {
  ...
  (dc: DataConnect, vars: AcceptInvitationWithMembershipVariables): MutationRef<AcceptInvitationWithMembershipData, AcceptInvitationWithMembershipVariables>;
}
export const acceptInvitationWithMembershipRef: AcceptInvitationWithMembershipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the acceptInvitationWithMembershipRef:
```typescript
const name = acceptInvitationWithMembershipRef.operationName;
console.log(name);
```

### Variables
The `AcceptInvitationWithMembership` mutation requires an argument of type `AcceptInvitationWithMembershipVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `AcceptInvitationWithMembership` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AcceptInvitationWithMembershipData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AcceptInvitationWithMembershipData {
  circleMembership_insert: CircleMembership_Key;
  invitationAcceptance_insert: InvitationAcceptance_Key;
  circle_update?: Circle_Key | null;
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```
### Using `AcceptInvitationWithMembership`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, acceptInvitationWithMembership, AcceptInvitationWithMembershipVariables } from '@bondcircle/dataconnect';

// The `AcceptInvitationWithMembership` mutation requires an argument of type `AcceptInvitationWithMembershipVariables`:
const acceptInvitationWithMembershipVars: AcceptInvitationWithMembershipVariables = {
  invitationId: ..., 
  circleId: ..., 
  userId: ..., 
  role: ..., 
  expectedAmount: ..., 
  nextMemberCount: ..., 
  nextInvitationState: ..., 
  nextUseCount: ..., 
  respondedAt: ..., 
};

// Call the `acceptInvitationWithMembership()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await acceptInvitationWithMembership(acceptInvitationWithMembershipVars);
// Variables can be defined inline as well.
const { data } = await acceptInvitationWithMembership({ invitationId: ..., circleId: ..., userId: ..., role: ..., expectedAmount: ..., nextMemberCount: ..., nextInvitationState: ..., nextUseCount: ..., respondedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await acceptInvitationWithMembership(dataConnect, acceptInvitationWithMembershipVars);

console.log(data.circleMembership_insert);
console.log(data.invitationAcceptance_insert);
console.log(data.circle_update);
console.log(data.invitation_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
acceptInvitationWithMembership(acceptInvitationWithMembershipVars).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_insert);
  console.log(data.invitationAcceptance_insert);
  console.log(data.circle_update);
  console.log(data.invitation_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

### Using `AcceptInvitationWithMembership`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, acceptInvitationWithMembershipRef, AcceptInvitationWithMembershipVariables } from '@bondcircle/dataconnect';

// The `AcceptInvitationWithMembership` mutation requires an argument of type `AcceptInvitationWithMembershipVariables`:
const acceptInvitationWithMembershipVars: AcceptInvitationWithMembershipVariables = {
  invitationId: ..., 
  circleId: ..., 
  userId: ..., 
  role: ..., 
  expectedAmount: ..., 
  nextMemberCount: ..., 
  nextInvitationState: ..., 
  nextUseCount: ..., 
  respondedAt: ..., 
};

// Call the `acceptInvitationWithMembershipRef()` function to get a reference to the mutation.
const ref = acceptInvitationWithMembershipRef(acceptInvitationWithMembershipVars);
// Variables can be defined inline as well.
const ref = acceptInvitationWithMembershipRef({ invitationId: ..., circleId: ..., userId: ..., role: ..., expectedAmount: ..., nextMemberCount: ..., nextInvitationState: ..., nextUseCount: ..., respondedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = acceptInvitationWithMembershipRef(dataConnect, acceptInvitationWithMembershipVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circleMembership_insert);
console.log(data.invitationAcceptance_insert);
console.log(data.circle_update);
console.log(data.invitation_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_insert);
  console.log(data.invitationAcceptance_insert);
  console.log(data.circle_update);
  console.log(data.invitation_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

## RequestInvitationApproval
You can execute the `RequestInvitationApproval` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
requestInvitationApproval(vars: RequestInvitationApprovalVariables): MutationPromise<RequestInvitationApprovalData, RequestInvitationApprovalVariables>;

interface RequestInvitationApprovalRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RequestInvitationApprovalVariables): MutationRef<RequestInvitationApprovalData, RequestInvitationApprovalVariables>;
}
export const requestInvitationApprovalRef: RequestInvitationApprovalRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
requestInvitationApproval(dc: DataConnect, vars: RequestInvitationApprovalVariables): MutationPromise<RequestInvitationApprovalData, RequestInvitationApprovalVariables>;

interface RequestInvitationApprovalRef {
  ...
  (dc: DataConnect, vars: RequestInvitationApprovalVariables): MutationRef<RequestInvitationApprovalData, RequestInvitationApprovalVariables>;
}
export const requestInvitationApprovalRef: RequestInvitationApprovalRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the requestInvitationApprovalRef:
```typescript
const name = requestInvitationApprovalRef.operationName;
console.log(name);
```

### Variables
The `RequestInvitationApproval` mutation requires an argument of type `RequestInvitationApprovalVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RequestInvitationApprovalVariables {
  invitationId: UUIDString;
  circleId: UUIDString;
  userId: string;
  respondedAt: TimestampString;
}
```
### Return Type
Recall that executing the `RequestInvitationApproval` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RequestInvitationApprovalData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RequestInvitationApprovalData {
  invitationAcceptance_insert: InvitationAcceptance_Key;
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `RequestInvitationApproval`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, requestInvitationApproval, RequestInvitationApprovalVariables } from '@bondcircle/dataconnect';

// The `RequestInvitationApproval` mutation requires an argument of type `RequestInvitationApprovalVariables`:
const requestInvitationApprovalVars: RequestInvitationApprovalVariables = {
  invitationId: ..., 
  circleId: ..., 
  userId: ..., 
  respondedAt: ..., 
};

// Call the `requestInvitationApproval()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await requestInvitationApproval(requestInvitationApprovalVars);
// Variables can be defined inline as well.
const { data } = await requestInvitationApproval({ invitationId: ..., circleId: ..., userId: ..., respondedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await requestInvitationApproval(dataConnect, requestInvitationApprovalVars);

console.log(data.invitationAcceptance_insert);
console.log(data.invitation_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
requestInvitationApproval(requestInvitationApprovalVars).then((response) => {
  const data = response.data;
  console.log(data.invitationAcceptance_insert);
  console.log(data.invitation_update);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `RequestInvitationApproval`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, requestInvitationApprovalRef, RequestInvitationApprovalVariables } from '@bondcircle/dataconnect';

// The `RequestInvitationApproval` mutation requires an argument of type `RequestInvitationApprovalVariables`:
const requestInvitationApprovalVars: RequestInvitationApprovalVariables = {
  invitationId: ..., 
  circleId: ..., 
  userId: ..., 
  respondedAt: ..., 
};

// Call the `requestInvitationApprovalRef()` function to get a reference to the mutation.
const ref = requestInvitationApprovalRef(requestInvitationApprovalVars);
// Variables can be defined inline as well.
const ref = requestInvitationApprovalRef({ invitationId: ..., circleId: ..., userId: ..., respondedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = requestInvitationApprovalRef(dataConnect, requestInvitationApprovalVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invitationAcceptance_insert);
console.log(data.invitation_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invitationAcceptance_insert);
  console.log(data.invitation_update);
  console.log(data.circleAuditEntry_insert);
});
```

## SubmitReceiptWithAudit
You can execute the `SubmitReceiptWithAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
submitReceiptWithAudit(vars: SubmitReceiptWithAuditVariables): MutationPromise<SubmitReceiptWithAuditData, SubmitReceiptWithAuditVariables>;

interface SubmitReceiptWithAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitReceiptWithAuditVariables): MutationRef<SubmitReceiptWithAuditData, SubmitReceiptWithAuditVariables>;
}
export const submitReceiptWithAuditRef: SubmitReceiptWithAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
submitReceiptWithAudit(dc: DataConnect, vars: SubmitReceiptWithAuditVariables): MutationPromise<SubmitReceiptWithAuditData, SubmitReceiptWithAuditVariables>;

interface SubmitReceiptWithAuditRef {
  ...
  (dc: DataConnect, vars: SubmitReceiptWithAuditVariables): MutationRef<SubmitReceiptWithAuditData, SubmitReceiptWithAuditVariables>;
}
export const submitReceiptWithAuditRef: SubmitReceiptWithAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the submitReceiptWithAuditRef:
```typescript
const name = submitReceiptWithAuditRef.operationName;
console.log(name);
```

### Variables
The `SubmitReceiptWithAudit` mutation requires an argument of type `SubmitReceiptWithAuditVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `SubmitReceiptWithAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SubmitReceiptWithAuditData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SubmitReceiptWithAuditData {
  receipt_insert: Receipt_Key;
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```
### Using `SubmitReceiptWithAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, submitReceiptWithAudit, SubmitReceiptWithAuditVariables } from '@bondcircle/dataconnect';

// The `SubmitReceiptWithAudit` mutation requires an argument of type `SubmitReceiptWithAuditVariables`:
const submitReceiptWithAuditVars: SubmitReceiptWithAuditVariables = {
  receiptId: ..., 
  circleId: ..., 
  uploaderId: ..., 
  amount: ..., 
  note: ..., // optional
  imageUrl: ..., 
  imageStoragePath: ..., 
  contentType: ..., 
  status: ..., 
  overpaymentAmount: ..., 
  submittedAt: ..., 
};

// Call the `submitReceiptWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await submitReceiptWithAudit(submitReceiptWithAuditVars);
// Variables can be defined inline as well.
const { data } = await submitReceiptWithAudit({ receiptId: ..., circleId: ..., uploaderId: ..., amount: ..., note: ..., imageUrl: ..., imageStoragePath: ..., contentType: ..., status: ..., overpaymentAmount: ..., submittedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await submitReceiptWithAudit(dataConnect, submitReceiptWithAuditVars);

console.log(data.receipt_insert);
console.log(data.circleMembership_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
submitReceiptWithAudit(submitReceiptWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.receipt_insert);
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

### Using `SubmitReceiptWithAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, submitReceiptWithAuditRef, SubmitReceiptWithAuditVariables } from '@bondcircle/dataconnect';

// The `SubmitReceiptWithAudit` mutation requires an argument of type `SubmitReceiptWithAuditVariables`:
const submitReceiptWithAuditVars: SubmitReceiptWithAuditVariables = {
  receiptId: ..., 
  circleId: ..., 
  uploaderId: ..., 
  amount: ..., 
  note: ..., // optional
  imageUrl: ..., 
  imageStoragePath: ..., 
  contentType: ..., 
  status: ..., 
  overpaymentAmount: ..., 
  submittedAt: ..., 
};

// Call the `submitReceiptWithAuditRef()` function to get a reference to the mutation.
const ref = submitReceiptWithAuditRef(submitReceiptWithAuditVars);
// Variables can be defined inline as well.
const ref = submitReceiptWithAuditRef({ receiptId: ..., circleId: ..., uploaderId: ..., amount: ..., note: ..., imageUrl: ..., imageStoragePath: ..., contentType: ..., status: ..., overpaymentAmount: ..., submittedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = submitReceiptWithAuditRef(dataConnect, submitReceiptWithAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.receipt_insert);
console.log(data.circleMembership_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.receipt_insert);
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

## ReplaceReceiptWithAudit
You can execute the `ReplaceReceiptWithAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
replaceReceiptWithAudit(vars: ReplaceReceiptWithAuditVariables): MutationPromise<ReplaceReceiptWithAuditData, ReplaceReceiptWithAuditVariables>;

interface ReplaceReceiptWithAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReplaceReceiptWithAuditVariables): MutationRef<ReplaceReceiptWithAuditData, ReplaceReceiptWithAuditVariables>;
}
export const replaceReceiptWithAuditRef: ReplaceReceiptWithAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
replaceReceiptWithAudit(dc: DataConnect, vars: ReplaceReceiptWithAuditVariables): MutationPromise<ReplaceReceiptWithAuditData, ReplaceReceiptWithAuditVariables>;

interface ReplaceReceiptWithAuditRef {
  ...
  (dc: DataConnect, vars: ReplaceReceiptWithAuditVariables): MutationRef<ReplaceReceiptWithAuditData, ReplaceReceiptWithAuditVariables>;
}
export const replaceReceiptWithAuditRef: ReplaceReceiptWithAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the replaceReceiptWithAuditRef:
```typescript
const name = replaceReceiptWithAuditRef.operationName;
console.log(name);
```

### Variables
The `ReplaceReceiptWithAudit` mutation requires an argument of type `ReplaceReceiptWithAuditVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `ReplaceReceiptWithAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReplaceReceiptWithAuditData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReplaceReceiptWithAuditData {
  receipt_update?: Receipt_Key | null;
  receipt_insert: Receipt_Key;
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```
### Using `ReplaceReceiptWithAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, replaceReceiptWithAudit, ReplaceReceiptWithAuditVariables } from '@bondcircle/dataconnect';

// The `ReplaceReceiptWithAudit` mutation requires an argument of type `ReplaceReceiptWithAuditVariables`:
const replaceReceiptWithAuditVars: ReplaceReceiptWithAuditVariables = {
  receiptId: ..., 
  replacedReceiptId: ..., 
  circleId: ..., 
  uploaderId: ..., 
  amount: ..., 
  note: ..., // optional
  imageUrl: ..., 
  imageStoragePath: ..., 
  contentType: ..., 
  status: ..., 
  overpaymentAmount: ..., 
  submittedAt: ..., 
};

// Call the `replaceReceiptWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await replaceReceiptWithAudit(replaceReceiptWithAuditVars);
// Variables can be defined inline as well.
const { data } = await replaceReceiptWithAudit({ receiptId: ..., replacedReceiptId: ..., circleId: ..., uploaderId: ..., amount: ..., note: ..., imageUrl: ..., imageStoragePath: ..., contentType: ..., status: ..., overpaymentAmount: ..., submittedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await replaceReceiptWithAudit(dataConnect, replaceReceiptWithAuditVars);

console.log(data.receipt_update);
console.log(data.receipt_insert);
console.log(data.circleMembership_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
replaceReceiptWithAudit(replaceReceiptWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.receipt_update);
  console.log(data.receipt_insert);
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

### Using `ReplaceReceiptWithAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, replaceReceiptWithAuditRef, ReplaceReceiptWithAuditVariables } from '@bondcircle/dataconnect';

// The `ReplaceReceiptWithAudit` mutation requires an argument of type `ReplaceReceiptWithAuditVariables`:
const replaceReceiptWithAuditVars: ReplaceReceiptWithAuditVariables = {
  receiptId: ..., 
  replacedReceiptId: ..., 
  circleId: ..., 
  uploaderId: ..., 
  amount: ..., 
  note: ..., // optional
  imageUrl: ..., 
  imageStoragePath: ..., 
  contentType: ..., 
  status: ..., 
  overpaymentAmount: ..., 
  submittedAt: ..., 
};

// Call the `replaceReceiptWithAuditRef()` function to get a reference to the mutation.
const ref = replaceReceiptWithAuditRef(replaceReceiptWithAuditVars);
// Variables can be defined inline as well.
const ref = replaceReceiptWithAuditRef({ receiptId: ..., replacedReceiptId: ..., circleId: ..., uploaderId: ..., amount: ..., note: ..., imageUrl: ..., imageStoragePath: ..., contentType: ..., status: ..., overpaymentAmount: ..., submittedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = replaceReceiptWithAuditRef(dataConnect, replaceReceiptWithAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.receipt_update);
console.log(data.receipt_insert);
console.log(data.circleMembership_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.receipt_update);
  console.log(data.receipt_insert);
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

## ReviewReceiptWithAudit
You can execute the `ReviewReceiptWithAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
reviewReceiptWithAudit(vars: ReviewReceiptWithAuditVariables): MutationPromise<ReviewReceiptWithAuditData, ReviewReceiptWithAuditVariables>;

interface ReviewReceiptWithAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReviewReceiptWithAuditVariables): MutationRef<ReviewReceiptWithAuditData, ReviewReceiptWithAuditVariables>;
}
export const reviewReceiptWithAuditRef: ReviewReceiptWithAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reviewReceiptWithAudit(dc: DataConnect, vars: ReviewReceiptWithAuditVariables): MutationPromise<ReviewReceiptWithAuditData, ReviewReceiptWithAuditVariables>;

interface ReviewReceiptWithAuditRef {
  ...
  (dc: DataConnect, vars: ReviewReceiptWithAuditVariables): MutationRef<ReviewReceiptWithAuditData, ReviewReceiptWithAuditVariables>;
}
export const reviewReceiptWithAuditRef: ReviewReceiptWithAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reviewReceiptWithAuditRef:
```typescript
const name = reviewReceiptWithAuditRef.operationName;
console.log(name);
```

### Variables
The `ReviewReceiptWithAudit` mutation requires an argument of type `ReviewReceiptWithAuditVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `ReviewReceiptWithAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReviewReceiptWithAuditData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReviewReceiptWithAuditData {
  receipt_update?: Receipt_Key | null;
  circleMembership_update?: CircleMembership_Key | null;
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```
### Using `ReviewReceiptWithAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reviewReceiptWithAudit, ReviewReceiptWithAuditVariables } from '@bondcircle/dataconnect';

// The `ReviewReceiptWithAudit` mutation requires an argument of type `ReviewReceiptWithAuditVariables`:
const reviewReceiptWithAuditVars: ReviewReceiptWithAuditVariables = {
  receiptId: ..., 
  circleId: ..., 
  uploaderId: ..., 
  reviewerId: ..., 
  receiptStatus: ..., 
  rejectionReason: ..., // optional
  reviewedAt: ..., 
  membershipStatus: ..., 
  nextConfirmedAmount: ..., 
  nextCircleContributedAmount: ..., 
  auditAction: ..., 
  materialChanges: ..., 
};

// Call the `reviewReceiptWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reviewReceiptWithAudit(reviewReceiptWithAuditVars);
// Variables can be defined inline as well.
const { data } = await reviewReceiptWithAudit({ receiptId: ..., circleId: ..., uploaderId: ..., reviewerId: ..., receiptStatus: ..., rejectionReason: ..., reviewedAt: ..., membershipStatus: ..., nextConfirmedAmount: ..., nextCircleContributedAmount: ..., auditAction: ..., materialChanges: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reviewReceiptWithAudit(dataConnect, reviewReceiptWithAuditVars);

console.log(data.receipt_update);
console.log(data.circleMembership_update);
console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
reviewReceiptWithAudit(reviewReceiptWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.receipt_update);
  console.log(data.circleMembership_update);
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

### Using `ReviewReceiptWithAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reviewReceiptWithAuditRef, ReviewReceiptWithAuditVariables } from '@bondcircle/dataconnect';

// The `ReviewReceiptWithAudit` mutation requires an argument of type `ReviewReceiptWithAuditVariables`:
const reviewReceiptWithAuditVars: ReviewReceiptWithAuditVariables = {
  receiptId: ..., 
  circleId: ..., 
  uploaderId: ..., 
  reviewerId: ..., 
  receiptStatus: ..., 
  rejectionReason: ..., // optional
  reviewedAt: ..., 
  membershipStatus: ..., 
  nextConfirmedAmount: ..., 
  nextCircleContributedAmount: ..., 
  auditAction: ..., 
  materialChanges: ..., 
};

// Call the `reviewReceiptWithAuditRef()` function to get a reference to the mutation.
const ref = reviewReceiptWithAuditRef(reviewReceiptWithAuditVars);
// Variables can be defined inline as well.
const ref = reviewReceiptWithAuditRef({ receiptId: ..., circleId: ..., uploaderId: ..., reviewerId: ..., receiptStatus: ..., rejectionReason: ..., reviewedAt: ..., membershipStatus: ..., nextConfirmedAmount: ..., nextCircleContributedAmount: ..., auditAction: ..., materialChanges: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reviewReceiptWithAuditRef(dataConnect, reviewReceiptWithAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.receipt_update);
console.log(data.circleMembership_update);
console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.receipt_update);
  console.log(data.circleMembership_update);
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

## ApproveInvitationMembership
You can execute the `ApproveInvitationMembership` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
approveInvitationMembership(vars: ApproveInvitationMembershipVariables): MutationPromise<ApproveInvitationMembershipData, ApproveInvitationMembershipVariables>;

interface ApproveInvitationMembershipRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ApproveInvitationMembershipVariables): MutationRef<ApproveInvitationMembershipData, ApproveInvitationMembershipVariables>;
}
export const approveInvitationMembershipRef: ApproveInvitationMembershipRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
approveInvitationMembership(dc: DataConnect, vars: ApproveInvitationMembershipVariables): MutationPromise<ApproveInvitationMembershipData, ApproveInvitationMembershipVariables>;

interface ApproveInvitationMembershipRef {
  ...
  (dc: DataConnect, vars: ApproveInvitationMembershipVariables): MutationRef<ApproveInvitationMembershipData, ApproveInvitationMembershipVariables>;
}
export const approveInvitationMembershipRef: ApproveInvitationMembershipRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the approveInvitationMembershipRef:
```typescript
const name = approveInvitationMembershipRef.operationName;
console.log(name);
```

### Variables
The `ApproveInvitationMembership` mutation requires an argument of type `ApproveInvitationMembershipVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `ApproveInvitationMembership` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ApproveInvitationMembershipData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ApproveInvitationMembershipData {
  circleMembership_insert: CircleMembership_Key;
  invitationAcceptance_update?: InvitationAcceptance_Key | null;
  circle_update?: Circle_Key | null;
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```
### Using `ApproveInvitationMembership`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, approveInvitationMembership, ApproveInvitationMembershipVariables } from '@bondcircle/dataconnect';

// The `ApproveInvitationMembership` mutation requires an argument of type `ApproveInvitationMembershipVariables`:
const approveInvitationMembershipVars: ApproveInvitationMembershipVariables = {
  invitationId: ..., 
  circleId: ..., 
  actorId: ..., 
  userId: ..., 
  role: ..., 
  expectedAmount: ..., 
  nextMemberCount: ..., 
  nextInvitationState: ..., 
  nextUseCount: ..., 
  respondedAt: ..., 
};

// Call the `approveInvitationMembership()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await approveInvitationMembership(approveInvitationMembershipVars);
// Variables can be defined inline as well.
const { data } = await approveInvitationMembership({ invitationId: ..., circleId: ..., actorId: ..., userId: ..., role: ..., expectedAmount: ..., nextMemberCount: ..., nextInvitationState: ..., nextUseCount: ..., respondedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await approveInvitationMembership(dataConnect, approveInvitationMembershipVars);

console.log(data.circleMembership_insert);
console.log(data.invitationAcceptance_update);
console.log(data.circle_update);
console.log(data.invitation_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
approveInvitationMembership(approveInvitationMembershipVars).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_insert);
  console.log(data.invitationAcceptance_update);
  console.log(data.circle_update);
  console.log(data.invitation_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

### Using `ApproveInvitationMembership`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, approveInvitationMembershipRef, ApproveInvitationMembershipVariables } from '@bondcircle/dataconnect';

// The `ApproveInvitationMembership` mutation requires an argument of type `ApproveInvitationMembershipVariables`:
const approveInvitationMembershipVars: ApproveInvitationMembershipVariables = {
  invitationId: ..., 
  circleId: ..., 
  actorId: ..., 
  userId: ..., 
  role: ..., 
  expectedAmount: ..., 
  nextMemberCount: ..., 
  nextInvitationState: ..., 
  nextUseCount: ..., 
  respondedAt: ..., 
};

// Call the `approveInvitationMembershipRef()` function to get a reference to the mutation.
const ref = approveInvitationMembershipRef(approveInvitationMembershipVars);
// Variables can be defined inline as well.
const ref = approveInvitationMembershipRef({ invitationId: ..., circleId: ..., actorId: ..., userId: ..., role: ..., expectedAmount: ..., nextMemberCount: ..., nextInvitationState: ..., nextUseCount: ..., respondedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = approveInvitationMembershipRef(dataConnect, approveInvitationMembershipVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circleMembership_insert);
console.log(data.invitationAcceptance_update);
console.log(data.circle_update);
console.log(data.invitation_update);
console.log(data.circleAuditEntry_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_insert);
  console.log(data.invitationAcceptance_update);
  console.log(data.circle_update);
  console.log(data.invitation_update);
  console.log(data.circleAuditEntry_insert);
  console.log(data.activityLog_insert);
});
```

## DeclineInvitation
You can execute the `DeclineInvitation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
declineInvitation(vars: DeclineInvitationVariables): MutationPromise<DeclineInvitationData, DeclineInvitationVariables>;

interface DeclineInvitationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeclineInvitationVariables): MutationRef<DeclineInvitationData, DeclineInvitationVariables>;
}
export const declineInvitationRef: DeclineInvitationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
declineInvitation(dc: DataConnect, vars: DeclineInvitationVariables): MutationPromise<DeclineInvitationData, DeclineInvitationVariables>;

interface DeclineInvitationRef {
  ...
  (dc: DataConnect, vars: DeclineInvitationVariables): MutationRef<DeclineInvitationData, DeclineInvitationVariables>;
}
export const declineInvitationRef: DeclineInvitationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the declineInvitationRef:
```typescript
const name = declineInvitationRef.operationName;
console.log(name);
```

### Variables
The `DeclineInvitation` mutation requires an argument of type `DeclineInvitationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeclineInvitationVariables {
  invitationId: UUIDString;
  circleId: UUIDString;
  userId: string;
  state: string;
  respondedAt: TimestampString;
}
```
### Return Type
Recall that executing the `DeclineInvitation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeclineInvitationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeclineInvitationData {
  invitationAcceptance_insert: InvitationAcceptance_Key;
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `DeclineInvitation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, declineInvitation, DeclineInvitationVariables } from '@bondcircle/dataconnect';

// The `DeclineInvitation` mutation requires an argument of type `DeclineInvitationVariables`:
const declineInvitationVars: DeclineInvitationVariables = {
  invitationId: ..., 
  circleId: ..., 
  userId: ..., 
  state: ..., 
  respondedAt: ..., 
};

// Call the `declineInvitation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await declineInvitation(declineInvitationVars);
// Variables can be defined inline as well.
const { data } = await declineInvitation({ invitationId: ..., circleId: ..., userId: ..., state: ..., respondedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await declineInvitation(dataConnect, declineInvitationVars);

console.log(data.invitationAcceptance_insert);
console.log(data.invitation_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
declineInvitation(declineInvitationVars).then((response) => {
  const data = response.data;
  console.log(data.invitationAcceptance_insert);
  console.log(data.invitation_update);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `DeclineInvitation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, declineInvitationRef, DeclineInvitationVariables } from '@bondcircle/dataconnect';

// The `DeclineInvitation` mutation requires an argument of type `DeclineInvitationVariables`:
const declineInvitationVars: DeclineInvitationVariables = {
  invitationId: ..., 
  circleId: ..., 
  userId: ..., 
  state: ..., 
  respondedAt: ..., 
};

// Call the `declineInvitationRef()` function to get a reference to the mutation.
const ref = declineInvitationRef(declineInvitationVars);
// Variables can be defined inline as well.
const ref = declineInvitationRef({ invitationId: ..., circleId: ..., userId: ..., state: ..., respondedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = declineInvitationRef(dataConnect, declineInvitationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invitationAcceptance_insert);
console.log(data.invitation_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invitationAcceptance_insert);
  console.log(data.invitation_update);
  console.log(data.circleAuditEntry_insert);
});
```

## RequestReplacementInvitation
You can execute the `RequestReplacementInvitation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
requestReplacementInvitation(vars: RequestReplacementInvitationVariables): MutationPromise<RequestReplacementInvitationData, RequestReplacementInvitationVariables>;

interface RequestReplacementInvitationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RequestReplacementInvitationVariables): MutationRef<RequestReplacementInvitationData, RequestReplacementInvitationVariables>;
}
export const requestReplacementInvitationRef: RequestReplacementInvitationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
requestReplacementInvitation(dc: DataConnect, vars: RequestReplacementInvitationVariables): MutationPromise<RequestReplacementInvitationData, RequestReplacementInvitationVariables>;

interface RequestReplacementInvitationRef {
  ...
  (dc: DataConnect, vars: RequestReplacementInvitationVariables): MutationRef<RequestReplacementInvitationData, RequestReplacementInvitationVariables>;
}
export const requestReplacementInvitationRef: RequestReplacementInvitationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the requestReplacementInvitationRef:
```typescript
const name = requestReplacementInvitationRef.operationName;
console.log(name);
```

### Variables
The `RequestReplacementInvitation` mutation requires an argument of type `RequestReplacementInvitationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RequestReplacementInvitationVariables {
  invitationId: UUIDString;
  circleId: UUIDString;
  actorId: string;
  requestedAt: TimestampString;
}
```
### Return Type
Recall that executing the `RequestReplacementInvitation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RequestReplacementInvitationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RequestReplacementInvitationData {
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `RequestReplacementInvitation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, requestReplacementInvitation, RequestReplacementInvitationVariables } from '@bondcircle/dataconnect';

// The `RequestReplacementInvitation` mutation requires an argument of type `RequestReplacementInvitationVariables`:
const requestReplacementInvitationVars: RequestReplacementInvitationVariables = {
  invitationId: ..., 
  circleId: ..., 
  actorId: ..., 
  requestedAt: ..., 
};

// Call the `requestReplacementInvitation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await requestReplacementInvitation(requestReplacementInvitationVars);
// Variables can be defined inline as well.
const { data } = await requestReplacementInvitation({ invitationId: ..., circleId: ..., actorId: ..., requestedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await requestReplacementInvitation(dataConnect, requestReplacementInvitationVars);

console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
requestReplacementInvitation(requestReplacementInvitationVars).then((response) => {
  const data = response.data;
  console.log(data.circleAuditEntry_insert);
});
```

### Using `RequestReplacementInvitation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, requestReplacementInvitationRef, RequestReplacementInvitationVariables } from '@bondcircle/dataconnect';

// The `RequestReplacementInvitation` mutation requires an argument of type `RequestReplacementInvitationVariables`:
const requestReplacementInvitationVars: RequestReplacementInvitationVariables = {
  invitationId: ..., 
  circleId: ..., 
  actorId: ..., 
  requestedAt: ..., 
};

// Call the `requestReplacementInvitationRef()` function to get a reference to the mutation.
const ref = requestReplacementInvitationRef(requestReplacementInvitationVars);
// Variables can be defined inline as well.
const ref = requestReplacementInvitationRef({ invitationId: ..., circleId: ..., actorId: ..., requestedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = requestReplacementInvitationRef(dataConnect, requestReplacementInvitationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleAuditEntry_insert);
});
```

## CreateAnnouncementWithActivity
You can execute the `CreateAnnouncementWithActivity` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createAnnouncementWithActivity(vars: CreateAnnouncementWithActivityVariables): MutationPromise<CreateAnnouncementWithActivityData, CreateAnnouncementWithActivityVariables>;

interface CreateAnnouncementWithActivityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateAnnouncementWithActivityVariables): MutationRef<CreateAnnouncementWithActivityData, CreateAnnouncementWithActivityVariables>;
}
export const createAnnouncementWithActivityRef: CreateAnnouncementWithActivityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createAnnouncementWithActivity(dc: DataConnect, vars: CreateAnnouncementWithActivityVariables): MutationPromise<CreateAnnouncementWithActivityData, CreateAnnouncementWithActivityVariables>;

interface CreateAnnouncementWithActivityRef {
  ...
  (dc: DataConnect, vars: CreateAnnouncementWithActivityVariables): MutationRef<CreateAnnouncementWithActivityData, CreateAnnouncementWithActivityVariables>;
}
export const createAnnouncementWithActivityRef: CreateAnnouncementWithActivityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createAnnouncementWithActivityRef:
```typescript
const name = createAnnouncementWithActivityRef.operationName;
console.log(name);
```

### Variables
The `CreateAnnouncementWithActivity` mutation requires an argument of type `CreateAnnouncementWithActivityVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateAnnouncementWithActivity` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateAnnouncementWithActivityData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateAnnouncementWithActivityData {
  announcement_insert: Announcement_Key;
  activityLog_insert: ActivityLog_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `CreateAnnouncementWithActivity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createAnnouncementWithActivity, CreateAnnouncementWithActivityVariables } from '@bondcircle/dataconnect';

// The `CreateAnnouncementWithActivity` mutation requires an argument of type `CreateAnnouncementWithActivityVariables`:
const createAnnouncementWithActivityVars: CreateAnnouncementWithActivityVariables = {
  announcementId: ..., 
  announcementEntityId: ..., 
  activityId: ..., 
  circleId: ..., 
  authorId: ..., 
  title: ..., 
  body: ..., 
  pinned: ..., 
  important: ..., // optional
  commentsEnabled: ..., 
  createdAt: ..., 
};

// Call the `createAnnouncementWithActivity()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createAnnouncementWithActivity(createAnnouncementWithActivityVars);
// Variables can be defined inline as well.
const { data } = await createAnnouncementWithActivity({ announcementId: ..., announcementEntityId: ..., activityId: ..., circleId: ..., authorId: ..., title: ..., body: ..., pinned: ..., important: ..., commentsEnabled: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createAnnouncementWithActivity(dataConnect, createAnnouncementWithActivityVars);

console.log(data.announcement_insert);
console.log(data.activityLog_insert);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
createAnnouncementWithActivity(createAnnouncementWithActivityVars).then((response) => {
  const data = response.data;
  console.log(data.announcement_insert);
  console.log(data.activityLog_insert);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `CreateAnnouncementWithActivity`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createAnnouncementWithActivityRef, CreateAnnouncementWithActivityVariables } from '@bondcircle/dataconnect';

// The `CreateAnnouncementWithActivity` mutation requires an argument of type `CreateAnnouncementWithActivityVariables`:
const createAnnouncementWithActivityVars: CreateAnnouncementWithActivityVariables = {
  announcementId: ..., 
  announcementEntityId: ..., 
  activityId: ..., 
  circleId: ..., 
  authorId: ..., 
  title: ..., 
  body: ..., 
  pinned: ..., 
  important: ..., // optional
  commentsEnabled: ..., 
  createdAt: ..., 
};

// Call the `createAnnouncementWithActivityRef()` function to get a reference to the mutation.
const ref = createAnnouncementWithActivityRef(createAnnouncementWithActivityVars);
// Variables can be defined inline as well.
const ref = createAnnouncementWithActivityRef({ announcementId: ..., announcementEntityId: ..., activityId: ..., circleId: ..., authorId: ..., title: ..., body: ..., pinned: ..., important: ..., commentsEnabled: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createAnnouncementWithActivityRef(dataConnect, createAnnouncementWithActivityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.announcement_insert);
console.log(data.activityLog_insert);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.announcement_insert);
  console.log(data.activityLog_insert);
  console.log(data.circleAuditEntry_insert);
});
```

## UpdateAnnouncementWithAudit
You can execute the `UpdateAnnouncementWithAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateAnnouncementWithAudit(vars: UpdateAnnouncementWithAuditVariables): MutationPromise<UpdateAnnouncementWithAuditData, UpdateAnnouncementWithAuditVariables>;

interface UpdateAnnouncementWithAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateAnnouncementWithAuditVariables): MutationRef<UpdateAnnouncementWithAuditData, UpdateAnnouncementWithAuditVariables>;
}
export const updateAnnouncementWithAuditRef: UpdateAnnouncementWithAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateAnnouncementWithAudit(dc: DataConnect, vars: UpdateAnnouncementWithAuditVariables): MutationPromise<UpdateAnnouncementWithAuditData, UpdateAnnouncementWithAuditVariables>;

interface UpdateAnnouncementWithAuditRef {
  ...
  (dc: DataConnect, vars: UpdateAnnouncementWithAuditVariables): MutationRef<UpdateAnnouncementWithAuditData, UpdateAnnouncementWithAuditVariables>;
}
export const updateAnnouncementWithAuditRef: UpdateAnnouncementWithAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateAnnouncementWithAuditRef:
```typescript
const name = updateAnnouncementWithAuditRef.operationName;
console.log(name);
```

### Variables
The `UpdateAnnouncementWithAudit` mutation requires an argument of type `UpdateAnnouncementWithAuditVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `UpdateAnnouncementWithAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateAnnouncementWithAuditData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateAnnouncementWithAuditData {
  announcement_update?: Announcement_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `UpdateAnnouncementWithAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateAnnouncementWithAudit, UpdateAnnouncementWithAuditVariables } from '@bondcircle/dataconnect';

// The `UpdateAnnouncementWithAudit` mutation requires an argument of type `UpdateAnnouncementWithAuditVariables`:
const updateAnnouncementWithAuditVars: UpdateAnnouncementWithAuditVariables = {
  announcementId: ..., 
  circleId: ..., 
  actorId: ..., 
  title: ..., 
  body: ..., 
  pinned: ..., 
  important: ..., // optional
  commentsEnabled: ..., 
  updatedAt: ..., 
  materialChanges: ..., 
};

// Call the `updateAnnouncementWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateAnnouncementWithAudit(updateAnnouncementWithAuditVars);
// Variables can be defined inline as well.
const { data } = await updateAnnouncementWithAudit({ announcementId: ..., circleId: ..., actorId: ..., title: ..., body: ..., pinned: ..., important: ..., commentsEnabled: ..., updatedAt: ..., materialChanges: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateAnnouncementWithAudit(dataConnect, updateAnnouncementWithAuditVars);

console.log(data.announcement_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
updateAnnouncementWithAudit(updateAnnouncementWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.announcement_update);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `UpdateAnnouncementWithAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateAnnouncementWithAuditRef, UpdateAnnouncementWithAuditVariables } from '@bondcircle/dataconnect';

// The `UpdateAnnouncementWithAudit` mutation requires an argument of type `UpdateAnnouncementWithAuditVariables`:
const updateAnnouncementWithAuditVars: UpdateAnnouncementWithAuditVariables = {
  announcementId: ..., 
  circleId: ..., 
  actorId: ..., 
  title: ..., 
  body: ..., 
  pinned: ..., 
  important: ..., // optional
  commentsEnabled: ..., 
  updatedAt: ..., 
  materialChanges: ..., 
};

// Call the `updateAnnouncementWithAuditRef()` function to get a reference to the mutation.
const ref = updateAnnouncementWithAuditRef(updateAnnouncementWithAuditVars);
// Variables can be defined inline as well.
const ref = updateAnnouncementWithAuditRef({ announcementId: ..., circleId: ..., actorId: ..., title: ..., body: ..., pinned: ..., important: ..., commentsEnabled: ..., updatedAt: ..., materialChanges: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateAnnouncementWithAuditRef(dataConnect, updateAnnouncementWithAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.announcement_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.announcement_update);
  console.log(data.circleAuditEntry_insert);
});
```

## DeleteAnnouncementWithAudit
You can execute the `DeleteAnnouncementWithAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteAnnouncementWithAudit(vars: DeleteAnnouncementWithAuditVariables): MutationPromise<DeleteAnnouncementWithAuditData, DeleteAnnouncementWithAuditVariables>;

interface DeleteAnnouncementWithAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteAnnouncementWithAuditVariables): MutationRef<DeleteAnnouncementWithAuditData, DeleteAnnouncementWithAuditVariables>;
}
export const deleteAnnouncementWithAuditRef: DeleteAnnouncementWithAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteAnnouncementWithAudit(dc: DataConnect, vars: DeleteAnnouncementWithAuditVariables): MutationPromise<DeleteAnnouncementWithAuditData, DeleteAnnouncementWithAuditVariables>;

interface DeleteAnnouncementWithAuditRef {
  ...
  (dc: DataConnect, vars: DeleteAnnouncementWithAuditVariables): MutationRef<DeleteAnnouncementWithAuditData, DeleteAnnouncementWithAuditVariables>;
}
export const deleteAnnouncementWithAuditRef: DeleteAnnouncementWithAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteAnnouncementWithAuditRef:
```typescript
const name = deleteAnnouncementWithAuditRef.operationName;
console.log(name);
```

### Variables
The `DeleteAnnouncementWithAudit` mutation requires an argument of type `DeleteAnnouncementWithAuditVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteAnnouncementWithAuditVariables {
  announcementId: UUIDString;
  announcementEntityId: string;
  circleId: UUIDString;
  actorId: string;
  deletedAt: TimestampString;
}
```
### Return Type
Recall that executing the `DeleteAnnouncementWithAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteAnnouncementWithAuditData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteAnnouncementWithAuditData {
  announcement_update?: Announcement_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `DeleteAnnouncementWithAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteAnnouncementWithAudit, DeleteAnnouncementWithAuditVariables } from '@bondcircle/dataconnect';

// The `DeleteAnnouncementWithAudit` mutation requires an argument of type `DeleteAnnouncementWithAuditVariables`:
const deleteAnnouncementWithAuditVars: DeleteAnnouncementWithAuditVariables = {
  announcementId: ..., 
  announcementEntityId: ..., 
  circleId: ..., 
  actorId: ..., 
  deletedAt: ..., 
};

// Call the `deleteAnnouncementWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteAnnouncementWithAudit(deleteAnnouncementWithAuditVars);
// Variables can be defined inline as well.
const { data } = await deleteAnnouncementWithAudit({ announcementId: ..., announcementEntityId: ..., circleId: ..., actorId: ..., deletedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteAnnouncementWithAudit(dataConnect, deleteAnnouncementWithAuditVars);

console.log(data.announcement_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
deleteAnnouncementWithAudit(deleteAnnouncementWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.announcement_update);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `DeleteAnnouncementWithAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteAnnouncementWithAuditRef, DeleteAnnouncementWithAuditVariables } from '@bondcircle/dataconnect';

// The `DeleteAnnouncementWithAudit` mutation requires an argument of type `DeleteAnnouncementWithAuditVariables`:
const deleteAnnouncementWithAuditVars: DeleteAnnouncementWithAuditVariables = {
  announcementId: ..., 
  announcementEntityId: ..., 
  circleId: ..., 
  actorId: ..., 
  deletedAt: ..., 
};

// Call the `deleteAnnouncementWithAuditRef()` function to get a reference to the mutation.
const ref = deleteAnnouncementWithAuditRef(deleteAnnouncementWithAuditVars);
// Variables can be defined inline as well.
const ref = deleteAnnouncementWithAuditRef({ announcementId: ..., announcementEntityId: ..., circleId: ..., actorId: ..., deletedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteAnnouncementWithAuditRef(dataConnect, deleteAnnouncementWithAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.announcement_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.announcement_update);
  console.log(data.circleAuditEntry_insert);
});
```

## SetCircleCommentsWithAudit
You can execute the `SetCircleCommentsWithAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
setCircleCommentsWithAudit(vars: SetCircleCommentsWithAuditVariables): MutationPromise<SetCircleCommentsWithAuditData, SetCircleCommentsWithAuditVariables>;

interface SetCircleCommentsWithAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetCircleCommentsWithAuditVariables): MutationRef<SetCircleCommentsWithAuditData, SetCircleCommentsWithAuditVariables>;
}
export const setCircleCommentsWithAuditRef: SetCircleCommentsWithAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setCircleCommentsWithAudit(dc: DataConnect, vars: SetCircleCommentsWithAuditVariables): MutationPromise<SetCircleCommentsWithAuditData, SetCircleCommentsWithAuditVariables>;

interface SetCircleCommentsWithAuditRef {
  ...
  (dc: DataConnect, vars: SetCircleCommentsWithAuditVariables): MutationRef<SetCircleCommentsWithAuditData, SetCircleCommentsWithAuditVariables>;
}
export const setCircleCommentsWithAuditRef: SetCircleCommentsWithAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setCircleCommentsWithAuditRef:
```typescript
const name = setCircleCommentsWithAuditRef.operationName;
console.log(name);
```

### Variables
The `SetCircleCommentsWithAudit` mutation requires an argument of type `SetCircleCommentsWithAuditVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetCircleCommentsWithAuditVariables {
  circleId: UUIDString;
  actorId: string;
  commentsEnabled: boolean;
  materialChanges: string;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that executing the `SetCircleCommentsWithAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetCircleCommentsWithAuditData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetCircleCommentsWithAuditData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `SetCircleCommentsWithAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setCircleCommentsWithAudit, SetCircleCommentsWithAuditVariables } from '@bondcircle/dataconnect';

// The `SetCircleCommentsWithAudit` mutation requires an argument of type `SetCircleCommentsWithAuditVariables`:
const setCircleCommentsWithAuditVars: SetCircleCommentsWithAuditVariables = {
  circleId: ..., 
  actorId: ..., 
  commentsEnabled: ..., 
  materialChanges: ..., 
  updatedAt: ..., 
};

// Call the `setCircleCommentsWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setCircleCommentsWithAudit(setCircleCommentsWithAuditVars);
// Variables can be defined inline as well.
const { data } = await setCircleCommentsWithAudit({ circleId: ..., actorId: ..., commentsEnabled: ..., materialChanges: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setCircleCommentsWithAudit(dataConnect, setCircleCommentsWithAuditVars);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
setCircleCommentsWithAudit(setCircleCommentsWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `SetCircleCommentsWithAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setCircleCommentsWithAuditRef, SetCircleCommentsWithAuditVariables } from '@bondcircle/dataconnect';

// The `SetCircleCommentsWithAudit` mutation requires an argument of type `SetCircleCommentsWithAuditVariables`:
const setCircleCommentsWithAuditVars: SetCircleCommentsWithAuditVariables = {
  circleId: ..., 
  actorId: ..., 
  commentsEnabled: ..., 
  materialChanges: ..., 
  updatedAt: ..., 
};

// Call the `setCircleCommentsWithAuditRef()` function to get a reference to the mutation.
const ref = setCircleCommentsWithAuditRef(setCircleCommentsWithAuditVars);
// Variables can be defined inline as well.
const ref = setCircleCommentsWithAuditRef({ circleId: ..., actorId: ..., commentsEnabled: ..., materialChanges: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setCircleCommentsWithAuditRef(dataConnect, setCircleCommentsWithAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
});
```

## CreateCommentWithActivity
You can execute the `CreateCommentWithActivity` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createCommentWithActivity(vars: CreateCommentWithActivityVariables): MutationPromise<CreateCommentWithActivityData, CreateCommentWithActivityVariables>;

interface CreateCommentWithActivityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateCommentWithActivityVariables): MutationRef<CreateCommentWithActivityData, CreateCommentWithActivityVariables>;
}
export const createCommentWithActivityRef: CreateCommentWithActivityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCommentWithActivity(dc: DataConnect, vars: CreateCommentWithActivityVariables): MutationPromise<CreateCommentWithActivityData, CreateCommentWithActivityVariables>;

interface CreateCommentWithActivityRef {
  ...
  (dc: DataConnect, vars: CreateCommentWithActivityVariables): MutationRef<CreateCommentWithActivityData, CreateCommentWithActivityVariables>;
}
export const createCommentWithActivityRef: CreateCommentWithActivityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCommentWithActivityRef:
```typescript
const name = createCommentWithActivityRef.operationName;
console.log(name);
```

### Variables
The `CreateCommentWithActivity` mutation requires an argument of type `CreateCommentWithActivityVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateCommentWithActivity` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCommentWithActivityData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCommentWithActivityData {
  comment_insert: Comment_Key;
  activityLog_insert: ActivityLog_Key;
}
```
### Using `CreateCommentWithActivity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCommentWithActivity, CreateCommentWithActivityVariables } from '@bondcircle/dataconnect';

// The `CreateCommentWithActivity` mutation requires an argument of type `CreateCommentWithActivityVariables`:
const createCommentWithActivityVars: CreateCommentWithActivityVariables = {
  commentId: ..., 
  commentEntityId: ..., 
  activityId: ..., 
  circleId: ..., 
  authorId: ..., 
  announcementId: ..., // optional
  parentCommentId: ..., // optional
  body: ..., 
  createdAt: ..., 
};

// Call the `createCommentWithActivity()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCommentWithActivity(createCommentWithActivityVars);
// Variables can be defined inline as well.
const { data } = await createCommentWithActivity({ commentId: ..., commentEntityId: ..., activityId: ..., circleId: ..., authorId: ..., announcementId: ..., parentCommentId: ..., body: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCommentWithActivity(dataConnect, createCommentWithActivityVars);

console.log(data.comment_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
createCommentWithActivity(createCommentWithActivityVars).then((response) => {
  const data = response.data;
  console.log(data.comment_insert);
  console.log(data.activityLog_insert);
});
```

### Using `CreateCommentWithActivity`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCommentWithActivityRef, CreateCommentWithActivityVariables } from '@bondcircle/dataconnect';

// The `CreateCommentWithActivity` mutation requires an argument of type `CreateCommentWithActivityVariables`:
const createCommentWithActivityVars: CreateCommentWithActivityVariables = {
  commentId: ..., 
  commentEntityId: ..., 
  activityId: ..., 
  circleId: ..., 
  authorId: ..., 
  announcementId: ..., // optional
  parentCommentId: ..., // optional
  body: ..., 
  createdAt: ..., 
};

// Call the `createCommentWithActivityRef()` function to get a reference to the mutation.
const ref = createCommentWithActivityRef(createCommentWithActivityVars);
// Variables can be defined inline as well.
const ref = createCommentWithActivityRef({ commentId: ..., commentEntityId: ..., activityId: ..., circleId: ..., authorId: ..., announcementId: ..., parentCommentId: ..., body: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCommentWithActivityRef(dataConnect, createCommentWithActivityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.comment_insert);
console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.comment_insert);
  console.log(data.activityLog_insert);
});
```

## DeleteOwnCommentWithAudit
You can execute the `DeleteOwnCommentWithAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
deleteOwnCommentWithAudit(vars: DeleteOwnCommentWithAuditVariables): MutationPromise<DeleteOwnCommentWithAuditData, DeleteOwnCommentWithAuditVariables>;

interface DeleteOwnCommentWithAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteOwnCommentWithAuditVariables): MutationRef<DeleteOwnCommentWithAuditData, DeleteOwnCommentWithAuditVariables>;
}
export const deleteOwnCommentWithAuditRef: DeleteOwnCommentWithAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteOwnCommentWithAudit(dc: DataConnect, vars: DeleteOwnCommentWithAuditVariables): MutationPromise<DeleteOwnCommentWithAuditData, DeleteOwnCommentWithAuditVariables>;

interface DeleteOwnCommentWithAuditRef {
  ...
  (dc: DataConnect, vars: DeleteOwnCommentWithAuditVariables): MutationRef<DeleteOwnCommentWithAuditData, DeleteOwnCommentWithAuditVariables>;
}
export const deleteOwnCommentWithAuditRef: DeleteOwnCommentWithAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteOwnCommentWithAuditRef:
```typescript
const name = deleteOwnCommentWithAuditRef.operationName;
console.log(name);
```

### Variables
The `DeleteOwnCommentWithAudit` mutation requires an argument of type `DeleteOwnCommentWithAuditVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteOwnCommentWithAuditVariables {
  commentId: UUIDString;
  commentEntityId: string;
  circleId: UUIDString;
  actorId: string;
  deletedAt: TimestampString;
}
```
### Return Type
Recall that executing the `DeleteOwnCommentWithAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteOwnCommentWithAuditData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteOwnCommentWithAuditData {
  comment_update?: Comment_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `DeleteOwnCommentWithAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteOwnCommentWithAudit, DeleteOwnCommentWithAuditVariables } from '@bondcircle/dataconnect';

// The `DeleteOwnCommentWithAudit` mutation requires an argument of type `DeleteOwnCommentWithAuditVariables`:
const deleteOwnCommentWithAuditVars: DeleteOwnCommentWithAuditVariables = {
  commentId: ..., 
  commentEntityId: ..., 
  circleId: ..., 
  actorId: ..., 
  deletedAt: ..., 
};

// Call the `deleteOwnCommentWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteOwnCommentWithAudit(deleteOwnCommentWithAuditVars);
// Variables can be defined inline as well.
const { data } = await deleteOwnCommentWithAudit({ commentId: ..., commentEntityId: ..., circleId: ..., actorId: ..., deletedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteOwnCommentWithAudit(dataConnect, deleteOwnCommentWithAuditVars);

console.log(data.comment_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
deleteOwnCommentWithAudit(deleteOwnCommentWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.comment_update);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `DeleteOwnCommentWithAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteOwnCommentWithAuditRef, DeleteOwnCommentWithAuditVariables } from '@bondcircle/dataconnect';

// The `DeleteOwnCommentWithAudit` mutation requires an argument of type `DeleteOwnCommentWithAuditVariables`:
const deleteOwnCommentWithAuditVars: DeleteOwnCommentWithAuditVariables = {
  commentId: ..., 
  commentEntityId: ..., 
  circleId: ..., 
  actorId: ..., 
  deletedAt: ..., 
};

// Call the `deleteOwnCommentWithAuditRef()` function to get a reference to the mutation.
const ref = deleteOwnCommentWithAuditRef(deleteOwnCommentWithAuditVars);
// Variables can be defined inline as well.
const ref = deleteOwnCommentWithAuditRef({ commentId: ..., commentEntityId: ..., circleId: ..., actorId: ..., deletedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteOwnCommentWithAuditRef(dataConnect, deleteOwnCommentWithAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.comment_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.comment_update);
  console.log(data.circleAuditEntry_insert);
});
```

## ModerateCommentWithAudit
You can execute the `ModerateCommentWithAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
moderateCommentWithAudit(vars: ModerateCommentWithAuditVariables): MutationPromise<ModerateCommentWithAuditData, ModerateCommentWithAuditVariables>;

interface ModerateCommentWithAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ModerateCommentWithAuditVariables): MutationRef<ModerateCommentWithAuditData, ModerateCommentWithAuditVariables>;
}
export const moderateCommentWithAuditRef: ModerateCommentWithAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
moderateCommentWithAudit(dc: DataConnect, vars: ModerateCommentWithAuditVariables): MutationPromise<ModerateCommentWithAuditData, ModerateCommentWithAuditVariables>;

interface ModerateCommentWithAuditRef {
  ...
  (dc: DataConnect, vars: ModerateCommentWithAuditVariables): MutationRef<ModerateCommentWithAuditData, ModerateCommentWithAuditVariables>;
}
export const moderateCommentWithAuditRef: ModerateCommentWithAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the moderateCommentWithAuditRef:
```typescript
const name = moderateCommentWithAuditRef.operationName;
console.log(name);
```

### Variables
The `ModerateCommentWithAudit` mutation requires an argument of type `ModerateCommentWithAuditVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ModerateCommentWithAuditVariables {
  commentId: UUIDString;
  circleId: UUIDString;
  actorId: string;
  reason: string;
  moderatedAt: TimestampString;
}
```
### Return Type
Recall that executing the `ModerateCommentWithAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ModerateCommentWithAuditData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ModerateCommentWithAuditData {
  comment_update?: Comment_Key | null;
  commentReport_updateMany: number;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `ModerateCommentWithAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, moderateCommentWithAudit, ModerateCommentWithAuditVariables } from '@bondcircle/dataconnect';

// The `ModerateCommentWithAudit` mutation requires an argument of type `ModerateCommentWithAuditVariables`:
const moderateCommentWithAuditVars: ModerateCommentWithAuditVariables = {
  commentId: ..., 
  circleId: ..., 
  actorId: ..., 
  reason: ..., 
  moderatedAt: ..., 
};

// Call the `moderateCommentWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await moderateCommentWithAudit(moderateCommentWithAuditVars);
// Variables can be defined inline as well.
const { data } = await moderateCommentWithAudit({ commentId: ..., circleId: ..., actorId: ..., reason: ..., moderatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await moderateCommentWithAudit(dataConnect, moderateCommentWithAuditVars);

console.log(data.comment_update);
console.log(data.commentReport_updateMany);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
moderateCommentWithAudit(moderateCommentWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.comment_update);
  console.log(data.commentReport_updateMany);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `ModerateCommentWithAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, moderateCommentWithAuditRef, ModerateCommentWithAuditVariables } from '@bondcircle/dataconnect';

// The `ModerateCommentWithAudit` mutation requires an argument of type `ModerateCommentWithAuditVariables`:
const moderateCommentWithAuditVars: ModerateCommentWithAuditVariables = {
  commentId: ..., 
  circleId: ..., 
  actorId: ..., 
  reason: ..., 
  moderatedAt: ..., 
};

// Call the `moderateCommentWithAuditRef()` function to get a reference to the mutation.
const ref = moderateCommentWithAuditRef(moderateCommentWithAuditVars);
// Variables can be defined inline as well.
const ref = moderateCommentWithAuditRef({ commentId: ..., circleId: ..., actorId: ..., reason: ..., moderatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = moderateCommentWithAuditRef(dataConnect, moderateCommentWithAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.comment_update);
console.log(data.commentReport_updateMany);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.comment_update);
  console.log(data.commentReport_updateMany);
  console.log(data.circleAuditEntry_insert);
});
```

## ReportCommentWithAudit
You can execute the `ReportCommentWithAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
reportCommentWithAudit(vars: ReportCommentWithAuditVariables): MutationPromise<ReportCommentWithAuditData, ReportCommentWithAuditVariables>;

interface ReportCommentWithAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ReportCommentWithAuditVariables): MutationRef<ReportCommentWithAuditData, ReportCommentWithAuditVariables>;
}
export const reportCommentWithAuditRef: ReportCommentWithAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
reportCommentWithAudit(dc: DataConnect, vars: ReportCommentWithAuditVariables): MutationPromise<ReportCommentWithAuditData, ReportCommentWithAuditVariables>;

interface ReportCommentWithAuditRef {
  ...
  (dc: DataConnect, vars: ReportCommentWithAuditVariables): MutationRef<ReportCommentWithAuditData, ReportCommentWithAuditVariables>;
}
export const reportCommentWithAuditRef: ReportCommentWithAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the reportCommentWithAuditRef:
```typescript
const name = reportCommentWithAuditRef.operationName;
console.log(name);
```

### Variables
The `ReportCommentWithAudit` mutation requires an argument of type `ReportCommentWithAuditVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ReportCommentWithAuditVariables {
  reportId: UUIDString;
  commentId: UUIDString;
  commentEntityId: string;
  circleId: UUIDString;
  reporterId: string;
  reason: string;
  createdAt: TimestampString;
}
```
### Return Type
Recall that executing the `ReportCommentWithAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ReportCommentWithAuditData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ReportCommentWithAuditData {
  commentReport_insert: CommentReport_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```
### Using `ReportCommentWithAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, reportCommentWithAudit, ReportCommentWithAuditVariables } from '@bondcircle/dataconnect';

// The `ReportCommentWithAudit` mutation requires an argument of type `ReportCommentWithAuditVariables`:
const reportCommentWithAuditVars: ReportCommentWithAuditVariables = {
  reportId: ..., 
  commentId: ..., 
  commentEntityId: ..., 
  circleId: ..., 
  reporterId: ..., 
  reason: ..., 
  createdAt: ..., 
};

// Call the `reportCommentWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await reportCommentWithAudit(reportCommentWithAuditVars);
// Variables can be defined inline as well.
const { data } = await reportCommentWithAudit({ reportId: ..., commentId: ..., commentEntityId: ..., circleId: ..., reporterId: ..., reason: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await reportCommentWithAudit(dataConnect, reportCommentWithAuditVars);

console.log(data.commentReport_insert);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
reportCommentWithAudit(reportCommentWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.commentReport_insert);
  console.log(data.circleAuditEntry_insert);
});
```

### Using `ReportCommentWithAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, reportCommentWithAuditRef, ReportCommentWithAuditVariables } from '@bondcircle/dataconnect';

// The `ReportCommentWithAudit` mutation requires an argument of type `ReportCommentWithAuditVariables`:
const reportCommentWithAuditVars: ReportCommentWithAuditVariables = {
  reportId: ..., 
  commentId: ..., 
  commentEntityId: ..., 
  circleId: ..., 
  reporterId: ..., 
  reason: ..., 
  createdAt: ..., 
};

// Call the `reportCommentWithAuditRef()` function to get a reference to the mutation.
const ref = reportCommentWithAuditRef(reportCommentWithAuditVars);
// Variables can be defined inline as well.
const ref = reportCommentWithAuditRef({ reportId: ..., commentId: ..., commentEntityId: ..., circleId: ..., reporterId: ..., reason: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = reportCommentWithAuditRef(dataConnect, reportCommentWithAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.commentReport_insert);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.commentReport_insert);
  console.log(data.circleAuditEntry_insert);
});
```

## RecordSystemActivity
You can execute the `RecordSystemActivity` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
recordSystemActivity(vars: RecordSystemActivityVariables): MutationPromise<RecordSystemActivityData, RecordSystemActivityVariables>;

interface RecordSystemActivityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordSystemActivityVariables): MutationRef<RecordSystemActivityData, RecordSystemActivityVariables>;
}
export const recordSystemActivityRef: RecordSystemActivityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordSystemActivity(dc: DataConnect, vars: RecordSystemActivityVariables): MutationPromise<RecordSystemActivityData, RecordSystemActivityVariables>;

interface RecordSystemActivityRef {
  ...
  (dc: DataConnect, vars: RecordSystemActivityVariables): MutationRef<RecordSystemActivityData, RecordSystemActivityVariables>;
}
export const recordSystemActivityRef: RecordSystemActivityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordSystemActivityRef:
```typescript
const name = recordSystemActivityRef.operationName;
console.log(name);
```

### Variables
The `RecordSystemActivity` mutation requires an argument of type `RecordSystemActivityVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordSystemActivityVariables {
  activityId: UUIDString;
  circleId: UUIDString;
  actorId: string;
  eventType: string;
  entityId: string;
  metadata: string;
  createdAt: TimestampString;
}
```
### Return Type
Recall that executing the `RecordSystemActivity` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordSystemActivityData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordSystemActivityData {
  activityLog_insert: ActivityLog_Key;
}
```
### Using `RecordSystemActivity`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordSystemActivity, RecordSystemActivityVariables } from '@bondcircle/dataconnect';

// The `RecordSystemActivity` mutation requires an argument of type `RecordSystemActivityVariables`:
const recordSystemActivityVars: RecordSystemActivityVariables = {
  activityId: ..., 
  circleId: ..., 
  actorId: ..., 
  eventType: ..., 
  entityId: ..., 
  metadata: ..., 
  createdAt: ..., 
};

// Call the `recordSystemActivity()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordSystemActivity(recordSystemActivityVars);
// Variables can be defined inline as well.
const { data } = await recordSystemActivity({ activityId: ..., circleId: ..., actorId: ..., eventType: ..., entityId: ..., metadata: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordSystemActivity(dataConnect, recordSystemActivityVars);

console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
recordSystemActivity(recordSystemActivityVars).then((response) => {
  const data = response.data;
  console.log(data.activityLog_insert);
});
```

### Using `RecordSystemActivity`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordSystemActivityRef, RecordSystemActivityVariables } from '@bondcircle/dataconnect';

// The `RecordSystemActivity` mutation requires an argument of type `RecordSystemActivityVariables`:
const recordSystemActivityVars: RecordSystemActivityVariables = {
  activityId: ..., 
  circleId: ..., 
  actorId: ..., 
  eventType: ..., 
  entityId: ..., 
  metadata: ..., 
  createdAt: ..., 
};

// Call the `recordSystemActivityRef()` function to get a reference to the mutation.
const ref = recordSystemActivityRef(recordSystemActivityVars);
// Variables can be defined inline as well.
const ref = recordSystemActivityRef({ activityId: ..., circleId: ..., actorId: ..., eventType: ..., entityId: ..., metadata: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordSystemActivityRef(dataConnect, recordSystemActivityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.activityLog_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.activityLog_insert);
});
```

## CreateNotification
You can execute the `CreateNotification` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createNotification(vars: CreateNotificationVariables): MutationPromise<CreateNotificationData, CreateNotificationVariables>;

interface CreateNotificationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateNotificationVariables): MutationRef<CreateNotificationData, CreateNotificationVariables>;
}
export const createNotificationRef: CreateNotificationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createNotification(dc: DataConnect, vars: CreateNotificationVariables): MutationPromise<CreateNotificationData, CreateNotificationVariables>;

interface CreateNotificationRef {
  ...
  (dc: DataConnect, vars: CreateNotificationVariables): MutationRef<CreateNotificationData, CreateNotificationVariables>;
}
export const createNotificationRef: CreateNotificationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createNotificationRef:
```typescript
const name = createNotificationRef.operationName;
console.log(name);
```

### Variables
The `CreateNotification` mutation requires an argument of type `CreateNotificationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateNotification` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateNotificationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateNotificationData {
  notification_insert: Notification_Key;
}
```
### Using `CreateNotification`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createNotification, CreateNotificationVariables } from '@bondcircle/dataconnect';

// The `CreateNotification` mutation requires an argument of type `CreateNotificationVariables`:
const createNotificationVars: CreateNotificationVariables = {
  notificationId: ..., 
  recipientId: ..., 
  circleId: ..., // optional
  type: ..., 
  title: ..., 
  body: ..., 
  deepLink: ..., 
  dedupeKey: ..., 
  createdAt: ..., 
};

// Call the `createNotification()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createNotification(createNotificationVars);
// Variables can be defined inline as well.
const { data } = await createNotification({ notificationId: ..., recipientId: ..., circleId: ..., type: ..., title: ..., body: ..., deepLink: ..., dedupeKey: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createNotification(dataConnect, createNotificationVars);

console.log(data.notification_insert);

// Or, you can use the `Promise` API.
createNotification(createNotificationVars).then((response) => {
  const data = response.data;
  console.log(data.notification_insert);
});
```

### Using `CreateNotification`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createNotificationRef, CreateNotificationVariables } from '@bondcircle/dataconnect';

// The `CreateNotification` mutation requires an argument of type `CreateNotificationVariables`:
const createNotificationVars: CreateNotificationVariables = {
  notificationId: ..., 
  recipientId: ..., 
  circleId: ..., // optional
  type: ..., 
  title: ..., 
  body: ..., 
  deepLink: ..., 
  dedupeKey: ..., 
  createdAt: ..., 
};

// Call the `createNotificationRef()` function to get a reference to the mutation.
const ref = createNotificationRef(createNotificationVars);
// Variables can be defined inline as well.
const ref = createNotificationRef({ notificationId: ..., recipientId: ..., circleId: ..., type: ..., title: ..., body: ..., deepLink: ..., dedupeKey: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createNotificationRef(dataConnect, createNotificationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.notification_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.notification_insert);
});
```

## MarkNotificationRead
You can execute the `MarkNotificationRead` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
markNotificationRead(vars: MarkNotificationReadVariables): MutationPromise<MarkNotificationReadData, MarkNotificationReadVariables>;

interface MarkNotificationReadRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkNotificationReadVariables): MutationRef<MarkNotificationReadData, MarkNotificationReadVariables>;
}
export const markNotificationReadRef: MarkNotificationReadRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
markNotificationRead(dc: DataConnect, vars: MarkNotificationReadVariables): MutationPromise<MarkNotificationReadData, MarkNotificationReadVariables>;

interface MarkNotificationReadRef {
  ...
  (dc: DataConnect, vars: MarkNotificationReadVariables): MutationRef<MarkNotificationReadData, MarkNotificationReadVariables>;
}
export const markNotificationReadRef: MarkNotificationReadRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the markNotificationReadRef:
```typescript
const name = markNotificationReadRef.operationName;
console.log(name);
```

### Variables
The `MarkNotificationRead` mutation requires an argument of type `MarkNotificationReadVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MarkNotificationReadVariables {
  notificationId: UUIDString;
  recipientId: string;
  readAt: TimestampString;
}
```
### Return Type
Recall that executing the `MarkNotificationRead` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarkNotificationReadData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarkNotificationReadData {
  notification_updateMany: number;
}
```
### Using `MarkNotificationRead`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, markNotificationRead, MarkNotificationReadVariables } from '@bondcircle/dataconnect';

// The `MarkNotificationRead` mutation requires an argument of type `MarkNotificationReadVariables`:
const markNotificationReadVars: MarkNotificationReadVariables = {
  notificationId: ..., 
  recipientId: ..., 
  readAt: ..., 
};

// Call the `markNotificationRead()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await markNotificationRead(markNotificationReadVars);
// Variables can be defined inline as well.
const { data } = await markNotificationRead({ notificationId: ..., recipientId: ..., readAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await markNotificationRead(dataConnect, markNotificationReadVars);

console.log(data.notification_updateMany);

// Or, you can use the `Promise` API.
markNotificationRead(markNotificationReadVars).then((response) => {
  const data = response.data;
  console.log(data.notification_updateMany);
});
```

### Using `MarkNotificationRead`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, markNotificationReadRef, MarkNotificationReadVariables } from '@bondcircle/dataconnect';

// The `MarkNotificationRead` mutation requires an argument of type `MarkNotificationReadVariables`:
const markNotificationReadVars: MarkNotificationReadVariables = {
  notificationId: ..., 
  recipientId: ..., 
  readAt: ..., 
};

// Call the `markNotificationReadRef()` function to get a reference to the mutation.
const ref = markNotificationReadRef(markNotificationReadVars);
// Variables can be defined inline as well.
const ref = markNotificationReadRef({ notificationId: ..., recipientId: ..., readAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = markNotificationReadRef(dataConnect, markNotificationReadVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.notification_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.notification_updateMany);
});
```

## DismissNotification
You can execute the `DismissNotification` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
dismissNotification(vars: DismissNotificationVariables): MutationPromise<DismissNotificationData, DismissNotificationVariables>;

interface DismissNotificationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DismissNotificationVariables): MutationRef<DismissNotificationData, DismissNotificationVariables>;
}
export const dismissNotificationRef: DismissNotificationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
dismissNotification(dc: DataConnect, vars: DismissNotificationVariables): MutationPromise<DismissNotificationData, DismissNotificationVariables>;

interface DismissNotificationRef {
  ...
  (dc: DataConnect, vars: DismissNotificationVariables): MutationRef<DismissNotificationData, DismissNotificationVariables>;
}
export const dismissNotificationRef: DismissNotificationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the dismissNotificationRef:
```typescript
const name = dismissNotificationRef.operationName;
console.log(name);
```

### Variables
The `DismissNotification` mutation requires an argument of type `DismissNotificationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DismissNotificationVariables {
  notificationId: UUIDString;
  recipientId: string;
  dismissedAt: TimestampString;
}
```
### Return Type
Recall that executing the `DismissNotification` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DismissNotificationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DismissNotificationData {
  notification_updateMany: number;
}
```
### Using `DismissNotification`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, dismissNotification, DismissNotificationVariables } from '@bondcircle/dataconnect';

// The `DismissNotification` mutation requires an argument of type `DismissNotificationVariables`:
const dismissNotificationVars: DismissNotificationVariables = {
  notificationId: ..., 
  recipientId: ..., 
  dismissedAt: ..., 
};

// Call the `dismissNotification()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await dismissNotification(dismissNotificationVars);
// Variables can be defined inline as well.
const { data } = await dismissNotification({ notificationId: ..., recipientId: ..., dismissedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await dismissNotification(dataConnect, dismissNotificationVars);

console.log(data.notification_updateMany);

// Or, you can use the `Promise` API.
dismissNotification(dismissNotificationVars).then((response) => {
  const data = response.data;
  console.log(data.notification_updateMany);
});
```

### Using `DismissNotification`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, dismissNotificationRef, DismissNotificationVariables } from '@bondcircle/dataconnect';

// The `DismissNotification` mutation requires an argument of type `DismissNotificationVariables`:
const dismissNotificationVars: DismissNotificationVariables = {
  notificationId: ..., 
  recipientId: ..., 
  dismissedAt: ..., 
};

// Call the `dismissNotificationRef()` function to get a reference to the mutation.
const ref = dismissNotificationRef(dismissNotificationVars);
// Variables can be defined inline as well.
const ref = dismissNotificationRef({ notificationId: ..., recipientId: ..., dismissedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = dismissNotificationRef(dataConnect, dismissNotificationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.notification_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.notification_updateMany);
});
```

## MarkAllNotificationsRead
You can execute the `MarkAllNotificationsRead` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
markAllNotificationsRead(vars: MarkAllNotificationsReadVariables): MutationPromise<MarkAllNotificationsReadData, MarkAllNotificationsReadVariables>;

interface MarkAllNotificationsReadRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: MarkAllNotificationsReadVariables): MutationRef<MarkAllNotificationsReadData, MarkAllNotificationsReadVariables>;
}
export const markAllNotificationsReadRef: MarkAllNotificationsReadRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
markAllNotificationsRead(dc: DataConnect, vars: MarkAllNotificationsReadVariables): MutationPromise<MarkAllNotificationsReadData, MarkAllNotificationsReadVariables>;

interface MarkAllNotificationsReadRef {
  ...
  (dc: DataConnect, vars: MarkAllNotificationsReadVariables): MutationRef<MarkAllNotificationsReadData, MarkAllNotificationsReadVariables>;
}
export const markAllNotificationsReadRef: MarkAllNotificationsReadRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the markAllNotificationsReadRef:
```typescript
const name = markAllNotificationsReadRef.operationName;
console.log(name);
```

### Variables
The `MarkAllNotificationsRead` mutation requires an argument of type `MarkAllNotificationsReadVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface MarkAllNotificationsReadVariables {
  recipientId: string;
  readAt: TimestampString;
}
```
### Return Type
Recall that executing the `MarkAllNotificationsRead` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `MarkAllNotificationsReadData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface MarkAllNotificationsReadData {
  notification_updateMany: number;
}
```
### Using `MarkAllNotificationsRead`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, markAllNotificationsRead, MarkAllNotificationsReadVariables } from '@bondcircle/dataconnect';

// The `MarkAllNotificationsRead` mutation requires an argument of type `MarkAllNotificationsReadVariables`:
const markAllNotificationsReadVars: MarkAllNotificationsReadVariables = {
  recipientId: ..., 
  readAt: ..., 
};

// Call the `markAllNotificationsRead()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await markAllNotificationsRead(markAllNotificationsReadVars);
// Variables can be defined inline as well.
const { data } = await markAllNotificationsRead({ recipientId: ..., readAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await markAllNotificationsRead(dataConnect, markAllNotificationsReadVars);

console.log(data.notification_updateMany);

// Or, you can use the `Promise` API.
markAllNotificationsRead(markAllNotificationsReadVars).then((response) => {
  const data = response.data;
  console.log(data.notification_updateMany);
});
```

### Using `MarkAllNotificationsRead`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, markAllNotificationsReadRef, MarkAllNotificationsReadVariables } from '@bondcircle/dataconnect';

// The `MarkAllNotificationsRead` mutation requires an argument of type `MarkAllNotificationsReadVariables`:
const markAllNotificationsReadVars: MarkAllNotificationsReadVariables = {
  recipientId: ..., 
  readAt: ..., 
};

// Call the `markAllNotificationsReadRef()` function to get a reference to the mutation.
const ref = markAllNotificationsReadRef(markAllNotificationsReadVars);
// Variables can be defined inline as well.
const ref = markAllNotificationsReadRef({ recipientId: ..., readAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = markAllNotificationsReadRef(dataConnect, markAllNotificationsReadVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.notification_updateMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.notification_updateMany);
});
```

## UpdateNotificationPreferences
You can execute the `UpdateNotificationPreferences` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
updateNotificationPreferences(vars: UpdateNotificationPreferencesVariables): MutationPromise<UpdateNotificationPreferencesData, UpdateNotificationPreferencesVariables>;

interface UpdateNotificationPreferencesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateNotificationPreferencesVariables): MutationRef<UpdateNotificationPreferencesData, UpdateNotificationPreferencesVariables>;
}
export const updateNotificationPreferencesRef: UpdateNotificationPreferencesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateNotificationPreferences(dc: DataConnect, vars: UpdateNotificationPreferencesVariables): MutationPromise<UpdateNotificationPreferencesData, UpdateNotificationPreferencesVariables>;

interface UpdateNotificationPreferencesRef {
  ...
  (dc: DataConnect, vars: UpdateNotificationPreferencesVariables): MutationRef<UpdateNotificationPreferencesData, UpdateNotificationPreferencesVariables>;
}
export const updateNotificationPreferencesRef: UpdateNotificationPreferencesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateNotificationPreferencesRef:
```typescript
const name = updateNotificationPreferencesRef.operationName;
console.log(name);
```

### Variables
The `UpdateNotificationPreferences` mutation requires an argument of type `UpdateNotificationPreferencesVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateNotificationPreferencesVariables {
  userId: string;
  emailNotifications: boolean;
  browserPushNotifications: boolean;
  commentNotifications: boolean;
  contributionReminders: boolean;
  circleUpdateNotifications: boolean;
  marketingCommunication: boolean;
}
```
### Return Type
Recall that executing the `UpdateNotificationPreferences` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateNotificationPreferencesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateNotificationPreferencesData {
  user_update?: User_Key | null;
}
```
### Using `UpdateNotificationPreferences`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateNotificationPreferences, UpdateNotificationPreferencesVariables } from '@bondcircle/dataconnect';

// The `UpdateNotificationPreferences` mutation requires an argument of type `UpdateNotificationPreferencesVariables`:
const updateNotificationPreferencesVars: UpdateNotificationPreferencesVariables = {
  userId: ..., 
  emailNotifications: ..., 
  browserPushNotifications: ..., 
  commentNotifications: ..., 
  contributionReminders: ..., 
  circleUpdateNotifications: ..., 
  marketingCommunication: ..., 
};

// Call the `updateNotificationPreferences()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateNotificationPreferences(updateNotificationPreferencesVars);
// Variables can be defined inline as well.
const { data } = await updateNotificationPreferences({ userId: ..., emailNotifications: ..., browserPushNotifications: ..., commentNotifications: ..., contributionReminders: ..., circleUpdateNotifications: ..., marketingCommunication: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateNotificationPreferences(dataConnect, updateNotificationPreferencesVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
updateNotificationPreferences(updateNotificationPreferencesVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `UpdateNotificationPreferences`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateNotificationPreferencesRef, UpdateNotificationPreferencesVariables } from '@bondcircle/dataconnect';

// The `UpdateNotificationPreferences` mutation requires an argument of type `UpdateNotificationPreferencesVariables`:
const updateNotificationPreferencesVars: UpdateNotificationPreferencesVariables = {
  userId: ..., 
  emailNotifications: ..., 
  browserPushNotifications: ..., 
  commentNotifications: ..., 
  contributionReminders: ..., 
  circleUpdateNotifications: ..., 
  marketingCommunication: ..., 
};

// Call the `updateNotificationPreferencesRef()` function to get a reference to the mutation.
const ref = updateNotificationPreferencesRef(updateNotificationPreferencesVars);
// Variables can be defined inline as well.
const ref = updateNotificationPreferencesRef({ userId: ..., emailNotifications: ..., browserPushNotifications: ..., commentNotifications: ..., contributionReminders: ..., circleUpdateNotifications: ..., marketingCommunication: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateNotificationPreferencesRef(dataConnect, updateNotificationPreferencesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## SetCircleNotificationMute
You can execute the `SetCircleNotificationMute` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
setCircleNotificationMute(vars: SetCircleNotificationMuteVariables): MutationPromise<SetCircleNotificationMuteData, SetCircleNotificationMuteVariables>;

interface SetCircleNotificationMuteRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SetCircleNotificationMuteVariables): MutationRef<SetCircleNotificationMuteData, SetCircleNotificationMuteVariables>;
}
export const setCircleNotificationMuteRef: SetCircleNotificationMuteRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
setCircleNotificationMute(dc: DataConnect, vars: SetCircleNotificationMuteVariables): MutationPromise<SetCircleNotificationMuteData, SetCircleNotificationMuteVariables>;

interface SetCircleNotificationMuteRef {
  ...
  (dc: DataConnect, vars: SetCircleNotificationMuteVariables): MutationRef<SetCircleNotificationMuteData, SetCircleNotificationMuteVariables>;
}
export const setCircleNotificationMuteRef: SetCircleNotificationMuteRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the setCircleNotificationMuteRef:
```typescript
const name = setCircleNotificationMuteRef.operationName;
console.log(name);
```

### Variables
The `SetCircleNotificationMute` mutation requires an argument of type `SetCircleNotificationMuteVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SetCircleNotificationMuteVariables {
  circleId: UUIDString;
  userId: string;
  notificationsMuted: boolean;
}
```
### Return Type
Recall that executing the `SetCircleNotificationMute` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SetCircleNotificationMuteData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SetCircleNotificationMuteData {
  circleMembership_update?: CircleMembership_Key | null;
}
```
### Using `SetCircleNotificationMute`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, setCircleNotificationMute, SetCircleNotificationMuteVariables } from '@bondcircle/dataconnect';

// The `SetCircleNotificationMute` mutation requires an argument of type `SetCircleNotificationMuteVariables`:
const setCircleNotificationMuteVars: SetCircleNotificationMuteVariables = {
  circleId: ..., 
  userId: ..., 
  notificationsMuted: ..., 
};

// Call the `setCircleNotificationMute()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await setCircleNotificationMute(setCircleNotificationMuteVars);
// Variables can be defined inline as well.
const { data } = await setCircleNotificationMute({ circleId: ..., userId: ..., notificationsMuted: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await setCircleNotificationMute(dataConnect, setCircleNotificationMuteVars);

console.log(data.circleMembership_update);

// Or, you can use the `Promise` API.
setCircleNotificationMute(setCircleNotificationMuteVars).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
});
```

### Using `SetCircleNotificationMute`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, setCircleNotificationMuteRef, SetCircleNotificationMuteVariables } from '@bondcircle/dataconnect';

// The `SetCircleNotificationMute` mutation requires an argument of type `SetCircleNotificationMuteVariables`:
const setCircleNotificationMuteVars: SetCircleNotificationMuteVariables = {
  circleId: ..., 
  userId: ..., 
  notificationsMuted: ..., 
};

// Call the `setCircleNotificationMuteRef()` function to get a reference to the mutation.
const ref = setCircleNotificationMuteRef(setCircleNotificationMuteVars);
// Variables can be defined inline as well.
const ref = setCircleNotificationMuteRef({ circleId: ..., userId: ..., notificationsMuted: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = setCircleNotificationMuteRef(dataConnect, setCircleNotificationMuteVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.circleMembership_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
});
```

## CreateEmailDelivery
You can execute the `CreateEmailDelivery` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createEmailDelivery(vars: CreateEmailDeliveryVariables): MutationPromise<CreateEmailDeliveryData, CreateEmailDeliveryVariables>;

interface CreateEmailDeliveryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateEmailDeliveryVariables): MutationRef<CreateEmailDeliveryData, CreateEmailDeliveryVariables>;
}
export const createEmailDeliveryRef: CreateEmailDeliveryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createEmailDelivery(dc: DataConnect, vars: CreateEmailDeliveryVariables): MutationPromise<CreateEmailDeliveryData, CreateEmailDeliveryVariables>;

interface CreateEmailDeliveryRef {
  ...
  (dc: DataConnect, vars: CreateEmailDeliveryVariables): MutationRef<CreateEmailDeliveryData, CreateEmailDeliveryVariables>;
}
export const createEmailDeliveryRef: CreateEmailDeliveryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createEmailDeliveryRef:
```typescript
const name = createEmailDeliveryRef.operationName;
console.log(name);
```

### Variables
The `CreateEmailDelivery` mutation requires an argument of type `CreateEmailDeliveryVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `CreateEmailDelivery` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateEmailDeliveryData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateEmailDeliveryData {
  emailDelivery_insert: EmailDelivery_Key;
}
```
### Using `CreateEmailDelivery`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createEmailDelivery, CreateEmailDeliveryVariables } from '@bondcircle/dataconnect';

// The `CreateEmailDelivery` mutation requires an argument of type `CreateEmailDeliveryVariables`:
const createEmailDeliveryVars: CreateEmailDeliveryVariables = {
  deliveryId: ..., 
  notificationId: ..., // optional
  recipientId: ..., // optional
  eventType: ..., 
  destinationMasked: ..., 
  status: ..., 
  providerMessageId: ..., // optional
  failureReason: ..., // optional
  createdAt: ..., 
};

// Call the `createEmailDelivery()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createEmailDelivery(createEmailDeliveryVars);
// Variables can be defined inline as well.
const { data } = await createEmailDelivery({ deliveryId: ..., notificationId: ..., recipientId: ..., eventType: ..., destinationMasked: ..., status: ..., providerMessageId: ..., failureReason: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createEmailDelivery(dataConnect, createEmailDeliveryVars);

console.log(data.emailDelivery_insert);

// Or, you can use the `Promise` API.
createEmailDelivery(createEmailDeliveryVars).then((response) => {
  const data = response.data;
  console.log(data.emailDelivery_insert);
});
```

### Using `CreateEmailDelivery`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createEmailDeliveryRef, CreateEmailDeliveryVariables } from '@bondcircle/dataconnect';

// The `CreateEmailDelivery` mutation requires an argument of type `CreateEmailDeliveryVariables`:
const createEmailDeliveryVars: CreateEmailDeliveryVariables = {
  deliveryId: ..., 
  notificationId: ..., // optional
  recipientId: ..., // optional
  eventType: ..., 
  destinationMasked: ..., 
  status: ..., 
  providerMessageId: ..., // optional
  failureReason: ..., // optional
  createdAt: ..., 
};

// Call the `createEmailDeliveryRef()` function to get a reference to the mutation.
const ref = createEmailDeliveryRef(createEmailDeliveryVars);
// Variables can be defined inline as well.
const ref = createEmailDeliveryRef({ deliveryId: ..., notificationId: ..., recipientId: ..., eventType: ..., destinationMasked: ..., status: ..., providerMessageId: ..., failureReason: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createEmailDeliveryRef(dataConnect, createEmailDeliveryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.emailDelivery_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.emailDelivery_insert);
});
```

## CreateRetentionPurgeAttempt
You can execute the `CreateRetentionPurgeAttempt` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
createRetentionPurgeAttempt(vars: CreateRetentionPurgeAttemptVariables): MutationPromise<CreateRetentionPurgeAttemptData, CreateRetentionPurgeAttemptVariables>;

interface CreateRetentionPurgeAttemptRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateRetentionPurgeAttemptVariables): MutationRef<CreateRetentionPurgeAttemptData, CreateRetentionPurgeAttemptVariables>;
}
export const createRetentionPurgeAttemptRef: CreateRetentionPurgeAttemptRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createRetentionPurgeAttempt(dc: DataConnect, vars: CreateRetentionPurgeAttemptVariables): MutationPromise<CreateRetentionPurgeAttemptData, CreateRetentionPurgeAttemptVariables>;

interface CreateRetentionPurgeAttemptRef {
  ...
  (dc: DataConnect, vars: CreateRetentionPurgeAttemptVariables): MutationRef<CreateRetentionPurgeAttemptData, CreateRetentionPurgeAttemptVariables>;
}
export const createRetentionPurgeAttemptRef: CreateRetentionPurgeAttemptRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createRetentionPurgeAttemptRef:
```typescript
const name = createRetentionPurgeAttemptRef.operationName;
console.log(name);
```

### Variables
The `CreateRetentionPurgeAttempt` mutation requires an argument of type `CreateRetentionPurgeAttemptVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CreateRetentionPurgeAttemptVariables {
  attemptId: UUIDString;
  circleId: UUIDString;
  attemptNumber: number;
  startedAt: TimestampString;
}
```
### Return Type
Recall that executing the `CreateRetentionPurgeAttempt` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateRetentionPurgeAttemptData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateRetentionPurgeAttemptData {
  retentionPurgeAttempt_insert: RetentionPurgeAttempt_Key;
}
```
### Using `CreateRetentionPurgeAttempt`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createRetentionPurgeAttempt, CreateRetentionPurgeAttemptVariables } from '@bondcircle/dataconnect';

// The `CreateRetentionPurgeAttempt` mutation requires an argument of type `CreateRetentionPurgeAttemptVariables`:
const createRetentionPurgeAttemptVars: CreateRetentionPurgeAttemptVariables = {
  attemptId: ..., 
  circleId: ..., 
  attemptNumber: ..., 
  startedAt: ..., 
};

// Call the `createRetentionPurgeAttempt()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createRetentionPurgeAttempt(createRetentionPurgeAttemptVars);
// Variables can be defined inline as well.
const { data } = await createRetentionPurgeAttempt({ attemptId: ..., circleId: ..., attemptNumber: ..., startedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createRetentionPurgeAttempt(dataConnect, createRetentionPurgeAttemptVars);

console.log(data.retentionPurgeAttempt_insert);

// Or, you can use the `Promise` API.
createRetentionPurgeAttempt(createRetentionPurgeAttemptVars).then((response) => {
  const data = response.data;
  console.log(data.retentionPurgeAttempt_insert);
});
```

### Using `CreateRetentionPurgeAttempt`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createRetentionPurgeAttemptRef, CreateRetentionPurgeAttemptVariables } from '@bondcircle/dataconnect';

// The `CreateRetentionPurgeAttempt` mutation requires an argument of type `CreateRetentionPurgeAttemptVariables`:
const createRetentionPurgeAttemptVars: CreateRetentionPurgeAttemptVariables = {
  attemptId: ..., 
  circleId: ..., 
  attemptNumber: ..., 
  startedAt: ..., 
};

// Call the `createRetentionPurgeAttemptRef()` function to get a reference to the mutation.
const ref = createRetentionPurgeAttemptRef(createRetentionPurgeAttemptVars);
// Variables can be defined inline as well.
const ref = createRetentionPurgeAttemptRef({ attemptId: ..., circleId: ..., attemptNumber: ..., startedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createRetentionPurgeAttemptRef(dataConnect, createRetentionPurgeAttemptVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.retentionPurgeAttempt_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.retentionPurgeAttempt_insert);
});
```

## CompleteRetentionPurgeAttempt
You can execute the `CompleteRetentionPurgeAttempt` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
completeRetentionPurgeAttempt(vars: CompleteRetentionPurgeAttemptVariables): MutationPromise<CompleteRetentionPurgeAttemptData, CompleteRetentionPurgeAttemptVariables>;

interface CompleteRetentionPurgeAttemptRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: CompleteRetentionPurgeAttemptVariables): MutationRef<CompleteRetentionPurgeAttemptData, CompleteRetentionPurgeAttemptVariables>;
}
export const completeRetentionPurgeAttemptRef: CompleteRetentionPurgeAttemptRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
completeRetentionPurgeAttempt(dc: DataConnect, vars: CompleteRetentionPurgeAttemptVariables): MutationPromise<CompleteRetentionPurgeAttemptData, CompleteRetentionPurgeAttemptVariables>;

interface CompleteRetentionPurgeAttemptRef {
  ...
  (dc: DataConnect, vars: CompleteRetentionPurgeAttemptVariables): MutationRef<CompleteRetentionPurgeAttemptData, CompleteRetentionPurgeAttemptVariables>;
}
export const completeRetentionPurgeAttemptRef: CompleteRetentionPurgeAttemptRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the completeRetentionPurgeAttemptRef:
```typescript
const name = completeRetentionPurgeAttemptRef.operationName;
console.log(name);
```

### Variables
The `CompleteRetentionPurgeAttempt` mutation requires an argument of type `CompleteRetentionPurgeAttemptVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface CompleteRetentionPurgeAttemptVariables {
  attemptId: UUIDString;
  status: string;
  deletedFileCount: number;
  skippedSharedFileCount: number;
  failureReason?: string | null;
  nextRetryAt?: TimestampString | null;
  completedAt: TimestampString;
}
```
### Return Type
Recall that executing the `CompleteRetentionPurgeAttempt` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CompleteRetentionPurgeAttemptData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CompleteRetentionPurgeAttemptData {
  retentionPurgeAttempt_update?: RetentionPurgeAttempt_Key | null;
}
```
### Using `CompleteRetentionPurgeAttempt`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, completeRetentionPurgeAttempt, CompleteRetentionPurgeAttemptVariables } from '@bondcircle/dataconnect';

// The `CompleteRetentionPurgeAttempt` mutation requires an argument of type `CompleteRetentionPurgeAttemptVariables`:
const completeRetentionPurgeAttemptVars: CompleteRetentionPurgeAttemptVariables = {
  attemptId: ..., 
  status: ..., 
  deletedFileCount: ..., 
  skippedSharedFileCount: ..., 
  failureReason: ..., // optional
  nextRetryAt: ..., // optional
  completedAt: ..., 
};

// Call the `completeRetentionPurgeAttempt()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await completeRetentionPurgeAttempt(completeRetentionPurgeAttemptVars);
// Variables can be defined inline as well.
const { data } = await completeRetentionPurgeAttempt({ attemptId: ..., status: ..., deletedFileCount: ..., skippedSharedFileCount: ..., failureReason: ..., nextRetryAt: ..., completedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await completeRetentionPurgeAttempt(dataConnect, completeRetentionPurgeAttemptVars);

console.log(data.retentionPurgeAttempt_update);

// Or, you can use the `Promise` API.
completeRetentionPurgeAttempt(completeRetentionPurgeAttemptVars).then((response) => {
  const data = response.data;
  console.log(data.retentionPurgeAttempt_update);
});
```

### Using `CompleteRetentionPurgeAttempt`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, completeRetentionPurgeAttemptRef, CompleteRetentionPurgeAttemptVariables } from '@bondcircle/dataconnect';

// The `CompleteRetentionPurgeAttempt` mutation requires an argument of type `CompleteRetentionPurgeAttemptVariables`:
const completeRetentionPurgeAttemptVars: CompleteRetentionPurgeAttemptVariables = {
  attemptId: ..., 
  status: ..., 
  deletedFileCount: ..., 
  skippedSharedFileCount: ..., 
  failureReason: ..., // optional
  nextRetryAt: ..., // optional
  completedAt: ..., 
};

// Call the `completeRetentionPurgeAttemptRef()` function to get a reference to the mutation.
const ref = completeRetentionPurgeAttemptRef(completeRetentionPurgeAttemptVars);
// Variables can be defined inline as well.
const ref = completeRetentionPurgeAttemptRef({ attemptId: ..., status: ..., deletedFileCount: ..., skippedSharedFileCount: ..., failureReason: ..., nextRetryAt: ..., completedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = completeRetentionPurgeAttemptRef(dataConnect, completeRetentionPurgeAttemptVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.retentionPurgeAttempt_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.retentionPurgeAttempt_update);
});
```

## PurgeInvitationAcceptances
You can execute the `PurgeInvitationAcceptances` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
purgeInvitationAcceptances(vars: PurgeInvitationAcceptancesVariables): MutationPromise<PurgeInvitationAcceptancesData, PurgeInvitationAcceptancesVariables>;

interface PurgeInvitationAcceptancesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: PurgeInvitationAcceptancesVariables): MutationRef<PurgeInvitationAcceptancesData, PurgeInvitationAcceptancesVariables>;
}
export const purgeInvitationAcceptancesRef: PurgeInvitationAcceptancesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
purgeInvitationAcceptances(dc: DataConnect, vars: PurgeInvitationAcceptancesVariables): MutationPromise<PurgeInvitationAcceptancesData, PurgeInvitationAcceptancesVariables>;

interface PurgeInvitationAcceptancesRef {
  ...
  (dc: DataConnect, vars: PurgeInvitationAcceptancesVariables): MutationRef<PurgeInvitationAcceptancesData, PurgeInvitationAcceptancesVariables>;
}
export const purgeInvitationAcceptancesRef: PurgeInvitationAcceptancesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the purgeInvitationAcceptancesRef:
```typescript
const name = purgeInvitationAcceptancesRef.operationName;
console.log(name);
```

### Variables
The `PurgeInvitationAcceptances` mutation requires an argument of type `PurgeInvitationAcceptancesVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface PurgeInvitationAcceptancesVariables {
  invitationId: UUIDString;
}
```
### Return Type
Recall that executing the `PurgeInvitationAcceptances` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PurgeInvitationAcceptancesData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface PurgeInvitationAcceptancesData {
  invitationAcceptance_deleteMany: number;
}
```
### Using `PurgeInvitationAcceptances`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, purgeInvitationAcceptances, PurgeInvitationAcceptancesVariables } from '@bondcircle/dataconnect';

// The `PurgeInvitationAcceptances` mutation requires an argument of type `PurgeInvitationAcceptancesVariables`:
const purgeInvitationAcceptancesVars: PurgeInvitationAcceptancesVariables = {
  invitationId: ..., 
};

// Call the `purgeInvitationAcceptances()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await purgeInvitationAcceptances(purgeInvitationAcceptancesVars);
// Variables can be defined inline as well.
const { data } = await purgeInvitationAcceptances({ invitationId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await purgeInvitationAcceptances(dataConnect, purgeInvitationAcceptancesVars);

console.log(data.invitationAcceptance_deleteMany);

// Or, you can use the `Promise` API.
purgeInvitationAcceptances(purgeInvitationAcceptancesVars).then((response) => {
  const data = response.data;
  console.log(data.invitationAcceptance_deleteMany);
});
```

### Using `PurgeInvitationAcceptances`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, purgeInvitationAcceptancesRef, PurgeInvitationAcceptancesVariables } from '@bondcircle/dataconnect';

// The `PurgeInvitationAcceptances` mutation requires an argument of type `PurgeInvitationAcceptancesVariables`:
const purgeInvitationAcceptancesVars: PurgeInvitationAcceptancesVariables = {
  invitationId: ..., 
};

// Call the `purgeInvitationAcceptancesRef()` function to get a reference to the mutation.
const ref = purgeInvitationAcceptancesRef(purgeInvitationAcceptancesVars);
// Variables can be defined inline as well.
const ref = purgeInvitationAcceptancesRef({ invitationId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = purgeInvitationAcceptancesRef(dataConnect, purgeInvitationAcceptancesVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invitationAcceptance_deleteMany);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invitationAcceptance_deleteMany);
});
```

## PurgeCircleSensitiveData
You can execute the `PurgeCircleSensitiveData` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
purgeCircleSensitiveData(vars: PurgeCircleSensitiveDataVariables): MutationPromise<PurgeCircleSensitiveDataData, PurgeCircleSensitiveDataVariables>;

interface PurgeCircleSensitiveDataRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: PurgeCircleSensitiveDataVariables): MutationRef<PurgeCircleSensitiveDataData, PurgeCircleSensitiveDataVariables>;
}
export const purgeCircleSensitiveDataRef: PurgeCircleSensitiveDataRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
purgeCircleSensitiveData(dc: DataConnect, vars: PurgeCircleSensitiveDataVariables): MutationPromise<PurgeCircleSensitiveDataData, PurgeCircleSensitiveDataVariables>;

interface PurgeCircleSensitiveDataRef {
  ...
  (dc: DataConnect, vars: PurgeCircleSensitiveDataVariables): MutationRef<PurgeCircleSensitiveDataData, PurgeCircleSensitiveDataVariables>;
}
export const purgeCircleSensitiveDataRef: PurgeCircleSensitiveDataRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the purgeCircleSensitiveDataRef:
```typescript
const name = purgeCircleSensitiveDataRef.operationName;
console.log(name);
```

### Variables
The `PurgeCircleSensitiveData` mutation requires an argument of type `PurgeCircleSensitiveDataVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface PurgeCircleSensitiveDataVariables {
  circleId: UUIDString;
  purgeAt: TimestampString;
}
```
### Return Type
Recall that executing the `PurgeCircleSensitiveData` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `PurgeCircleSensitiveDataData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `PurgeCircleSensitiveData`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, purgeCircleSensitiveData, PurgeCircleSensitiveDataVariables } from '@bondcircle/dataconnect';

// The `PurgeCircleSensitiveData` mutation requires an argument of type `PurgeCircleSensitiveDataVariables`:
const purgeCircleSensitiveDataVars: PurgeCircleSensitiveDataVariables = {
  circleId: ..., 
  purgeAt: ..., 
};

// Call the `purgeCircleSensitiveData()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await purgeCircleSensitiveData(purgeCircleSensitiveDataVars);
// Variables can be defined inline as well.
const { data } = await purgeCircleSensitiveData({ circleId: ..., purgeAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await purgeCircleSensitiveData(dataConnect, purgeCircleSensitiveDataVars);

console.log(data.commentReport_deleteMany);
console.log(data.comment_deleteMany);
console.log(data.announcement_deleteMany);
console.log(data.supportUpdate_deleteMany);
console.log(data.receipt_deleteMany);
console.log(data.invitation_deleteMany);
console.log(data.notification_deleteMany);
console.log(data.circleMembership_deleteMany);
console.log(data.asoEbiTier_deleteMany);
console.log(data.circle_update);

// Or, you can use the `Promise` API.
purgeCircleSensitiveData(purgeCircleSensitiveDataVars).then((response) => {
  const data = response.data;
  console.log(data.commentReport_deleteMany);
  console.log(data.comment_deleteMany);
  console.log(data.announcement_deleteMany);
  console.log(data.supportUpdate_deleteMany);
  console.log(data.receipt_deleteMany);
  console.log(data.invitation_deleteMany);
  console.log(data.notification_deleteMany);
  console.log(data.circleMembership_deleteMany);
  console.log(data.asoEbiTier_deleteMany);
  console.log(data.circle_update);
});
```

### Using `PurgeCircleSensitiveData`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, purgeCircleSensitiveDataRef, PurgeCircleSensitiveDataVariables } from '@bondcircle/dataconnect';

// The `PurgeCircleSensitiveData` mutation requires an argument of type `PurgeCircleSensitiveDataVariables`:
const purgeCircleSensitiveDataVars: PurgeCircleSensitiveDataVariables = {
  circleId: ..., 
  purgeAt: ..., 
};

// Call the `purgeCircleSensitiveDataRef()` function to get a reference to the mutation.
const ref = purgeCircleSensitiveDataRef(purgeCircleSensitiveDataVars);
// Variables can be defined inline as well.
const ref = purgeCircleSensitiveDataRef({ circleId: ..., purgeAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = purgeCircleSensitiveDataRef(dataConnect, purgeCircleSensitiveDataVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.commentReport_deleteMany);
console.log(data.comment_deleteMany);
console.log(data.announcement_deleteMany);
console.log(data.supportUpdate_deleteMany);
console.log(data.receipt_deleteMany);
console.log(data.invitation_deleteMany);
console.log(data.notification_deleteMany);
console.log(data.circleMembership_deleteMany);
console.log(data.asoEbiTier_deleteMany);
console.log(data.circle_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.commentReport_deleteMany);
  console.log(data.comment_deleteMany);
  console.log(data.announcement_deleteMany);
  console.log(data.supportUpdate_deleteMany);
  console.log(data.receipt_deleteMany);
  console.log(data.invitation_deleteMany);
  console.log(data.notification_deleteMany);
  console.log(data.circleMembership_deleteMany);
  console.log(data.asoEbiTier_deleteMany);
  console.log(data.circle_update);
});
```

## RecordOperationalEvent
You can execute the `RecordOperationalEvent` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
recordOperationalEvent(vars: RecordOperationalEventVariables): MutationPromise<RecordOperationalEventData, RecordOperationalEventVariables>;

interface RecordOperationalEventRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordOperationalEventVariables): MutationRef<RecordOperationalEventData, RecordOperationalEventVariables>;
}
export const recordOperationalEventRef: RecordOperationalEventRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordOperationalEvent(dc: DataConnect, vars: RecordOperationalEventVariables): MutationPromise<RecordOperationalEventData, RecordOperationalEventVariables>;

interface RecordOperationalEventRef {
  ...
  (dc: DataConnect, vars: RecordOperationalEventVariables): MutationRef<RecordOperationalEventData, RecordOperationalEventVariables>;
}
export const recordOperationalEventRef: RecordOperationalEventRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordOperationalEventRef:
```typescript
const name = recordOperationalEventRef.operationName;
console.log(name);
```

### Variables
The `RecordOperationalEvent` mutation requires an argument of type `RecordOperationalEventVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RecordOperationalEventVariables {
  category: string;
  eventType: string;
  outcome: string;
  reasonCode?: string | null;
  circleId?: UUIDString | null;
  createdAt: TimestampString;
}
```
### Return Type
Recall that executing the `RecordOperationalEvent` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordOperationalEventData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordOperationalEventData {
  operationalEvent_insert: OperationalEvent_Key;
}
```
### Using `RecordOperationalEvent`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordOperationalEvent, RecordOperationalEventVariables } from '@bondcircle/dataconnect';

// The `RecordOperationalEvent` mutation requires an argument of type `RecordOperationalEventVariables`:
const recordOperationalEventVars: RecordOperationalEventVariables = {
  category: ..., 
  eventType: ..., 
  outcome: ..., 
  reasonCode: ..., // optional
  circleId: ..., // optional
  createdAt: ..., 
};

// Call the `recordOperationalEvent()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordOperationalEvent(recordOperationalEventVars);
// Variables can be defined inline as well.
const { data } = await recordOperationalEvent({ category: ..., eventType: ..., outcome: ..., reasonCode: ..., circleId: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordOperationalEvent(dataConnect, recordOperationalEventVars);

console.log(data.operationalEvent_insert);

// Or, you can use the `Promise` API.
recordOperationalEvent(recordOperationalEventVars).then((response) => {
  const data = response.data;
  console.log(data.operationalEvent_insert);
});
```

### Using `RecordOperationalEvent`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordOperationalEventRef, RecordOperationalEventVariables } from '@bondcircle/dataconnect';

// The `RecordOperationalEvent` mutation requires an argument of type `RecordOperationalEventVariables`:
const recordOperationalEventVars: RecordOperationalEventVariables = {
  category: ..., 
  eventType: ..., 
  outcome: ..., 
  reasonCode: ..., // optional
  circleId: ..., // optional
  createdAt: ..., 
};

// Call the `recordOperationalEventRef()` function to get a reference to the mutation.
const ref = recordOperationalEventRef(recordOperationalEventVars);
// Variables can be defined inline as well.
const ref = recordOperationalEventRef({ category: ..., eventType: ..., outcome: ..., reasonCode: ..., circleId: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordOperationalEventRef(dataConnect, recordOperationalEventVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.operationalEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.operationalEvent_insert);
});
```

## RecordOwnerAdminAudit
You can execute the `RecordOwnerAdminAudit` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
recordOwnerAdminAudit(vars: RecordOwnerAdminAuditVariables): MutationPromise<RecordOwnerAdminAuditData, RecordOwnerAdminAuditVariables>;

interface RecordOwnerAdminAuditRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RecordOwnerAdminAuditVariables): MutationRef<RecordOwnerAdminAuditData, RecordOwnerAdminAuditVariables>;
}
export const recordOwnerAdminAuditRef: RecordOwnerAdminAuditRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
recordOwnerAdminAudit(dc: DataConnect, vars: RecordOwnerAdminAuditVariables): MutationPromise<RecordOwnerAdminAuditData, RecordOwnerAdminAuditVariables>;

interface RecordOwnerAdminAuditRef {
  ...
  (dc: DataConnect, vars: RecordOwnerAdminAuditVariables): MutationRef<RecordOwnerAdminAuditData, RecordOwnerAdminAuditVariables>;
}
export const recordOwnerAdminAuditRef: RecordOwnerAdminAuditRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the recordOwnerAdminAuditRef:
```typescript
const name = recordOwnerAdminAuditRef.operationName;
console.log(name);
```

### Variables
The `RecordOwnerAdminAudit` mutation requires an argument of type `RecordOwnerAdminAuditVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
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
```
### Return Type
Recall that executing the `RecordOwnerAdminAudit` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RecordOwnerAdminAuditData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RecordOwnerAdminAuditData {
  ownerAdminAuditEvent_insert: OwnerAdminAuditEvent_Key;
}
```
### Using `RecordOwnerAdminAudit`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, recordOwnerAdminAudit, RecordOwnerAdminAuditVariables } from '@bondcircle/dataconnect';

// The `RecordOwnerAdminAudit` mutation requires an argument of type `RecordOwnerAdminAuditVariables`:
const recordOwnerAdminAuditVars: RecordOwnerAdminAuditVariables = {
  actorId: ..., 
  action: ..., 
  targetType: ..., 
  targetId: ..., 
  purpose: ..., 
  outcome: ..., 
  metadata: ..., 
  createdAt: ..., 
};

// Call the `recordOwnerAdminAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await recordOwnerAdminAudit(recordOwnerAdminAuditVars);
// Variables can be defined inline as well.
const { data } = await recordOwnerAdminAudit({ actorId: ..., action: ..., targetType: ..., targetId: ..., purpose: ..., outcome: ..., metadata: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await recordOwnerAdminAudit(dataConnect, recordOwnerAdminAuditVars);

console.log(data.ownerAdminAuditEvent_insert);

// Or, you can use the `Promise` API.
recordOwnerAdminAudit(recordOwnerAdminAuditVars).then((response) => {
  const data = response.data;
  console.log(data.ownerAdminAuditEvent_insert);
});
```

### Using `RecordOwnerAdminAudit`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, recordOwnerAdminAuditRef, RecordOwnerAdminAuditVariables } from '@bondcircle/dataconnect';

// The `RecordOwnerAdminAudit` mutation requires an argument of type `RecordOwnerAdminAuditVariables`:
const recordOwnerAdminAuditVars: RecordOwnerAdminAuditVariables = {
  actorId: ..., 
  action: ..., 
  targetType: ..., 
  targetId: ..., 
  purpose: ..., 
  outcome: ..., 
  metadata: ..., 
  createdAt: ..., 
};

// Call the `recordOwnerAdminAuditRef()` function to get a reference to the mutation.
const ref = recordOwnerAdminAuditRef(recordOwnerAdminAuditVars);
// Variables can be defined inline as well.
const ref = recordOwnerAdminAuditRef({ actorId: ..., action: ..., targetType: ..., targetId: ..., purpose: ..., outcome: ..., metadata: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = recordOwnerAdminAuditRef(dataConnect, recordOwnerAdminAuditVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.ownerAdminAuditEvent_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.ownerAdminAuditEvent_insert);
});
```

## ResolveOwnerCommentReport
You can execute the `ResolveOwnerCommentReport` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
resolveOwnerCommentReport(vars: ResolveOwnerCommentReportVariables): MutationPromise<ResolveOwnerCommentReportData, ResolveOwnerCommentReportVariables>;

interface ResolveOwnerCommentReportRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ResolveOwnerCommentReportVariables): MutationRef<ResolveOwnerCommentReportData, ResolveOwnerCommentReportVariables>;
}
export const resolveOwnerCommentReportRef: ResolveOwnerCommentReportRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
resolveOwnerCommentReport(dc: DataConnect, vars: ResolveOwnerCommentReportVariables): MutationPromise<ResolveOwnerCommentReportData, ResolveOwnerCommentReportVariables>;

interface ResolveOwnerCommentReportRef {
  ...
  (dc: DataConnect, vars: ResolveOwnerCommentReportVariables): MutationRef<ResolveOwnerCommentReportData, ResolveOwnerCommentReportVariables>;
}
export const resolveOwnerCommentReportRef: ResolveOwnerCommentReportRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the resolveOwnerCommentReportRef:
```typescript
const name = resolveOwnerCommentReportRef.operationName;
console.log(name);
```

### Variables
The `ResolveOwnerCommentReport` mutation requires an argument of type `ResolveOwnerCommentReportVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ResolveOwnerCommentReportVariables {
  reportId: UUIDString;
  reportStatus: string;
  commentId: UUIDString;
  commentStatus: string;
  deletionReason?: string | null;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that executing the `ResolveOwnerCommentReport` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ResolveOwnerCommentReportData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ResolveOwnerCommentReportData {
  commentReport_update?: CommentReport_Key | null;
  comment_update?: Comment_Key | null;
}
```
### Using `ResolveOwnerCommentReport`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, resolveOwnerCommentReport, ResolveOwnerCommentReportVariables } from '@bondcircle/dataconnect';

// The `ResolveOwnerCommentReport` mutation requires an argument of type `ResolveOwnerCommentReportVariables`:
const resolveOwnerCommentReportVars: ResolveOwnerCommentReportVariables = {
  reportId: ..., 
  reportStatus: ..., 
  commentId: ..., 
  commentStatus: ..., 
  deletionReason: ..., // optional
  updatedAt: ..., 
};

// Call the `resolveOwnerCommentReport()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await resolveOwnerCommentReport(resolveOwnerCommentReportVars);
// Variables can be defined inline as well.
const { data } = await resolveOwnerCommentReport({ reportId: ..., reportStatus: ..., commentId: ..., commentStatus: ..., deletionReason: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await resolveOwnerCommentReport(dataConnect, resolveOwnerCommentReportVars);

console.log(data.commentReport_update);
console.log(data.comment_update);

// Or, you can use the `Promise` API.
resolveOwnerCommentReport(resolveOwnerCommentReportVars).then((response) => {
  const data = response.data;
  console.log(data.commentReport_update);
  console.log(data.comment_update);
});
```

### Using `ResolveOwnerCommentReport`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, resolveOwnerCommentReportRef, ResolveOwnerCommentReportVariables } from '@bondcircle/dataconnect';

// The `ResolveOwnerCommentReport` mutation requires an argument of type `ResolveOwnerCommentReportVariables`:
const resolveOwnerCommentReportVars: ResolveOwnerCommentReportVariables = {
  reportId: ..., 
  reportStatus: ..., 
  commentId: ..., 
  commentStatus: ..., 
  deletionReason: ..., // optional
  updatedAt: ..., 
};

// Call the `resolveOwnerCommentReportRef()` function to get a reference to the mutation.
const ref = resolveOwnerCommentReportRef(resolveOwnerCommentReportVars);
// Variables can be defined inline as well.
const ref = resolveOwnerCommentReportRef({ reportId: ..., reportStatus: ..., commentId: ..., commentStatus: ..., deletionReason: ..., updatedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = resolveOwnerCommentReportRef(dataConnect, resolveOwnerCommentReportVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.commentReport_update);
console.log(data.comment_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.commentReport_update);
  console.log(data.comment_update);
});
```

## DismissOwnerCommentReport
You can execute the `DismissOwnerCommentReport` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
dismissOwnerCommentReport(vars: DismissOwnerCommentReportVariables): MutationPromise<DismissOwnerCommentReportData, DismissOwnerCommentReportVariables>;

interface DismissOwnerCommentReportRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DismissOwnerCommentReportVariables): MutationRef<DismissOwnerCommentReportData, DismissOwnerCommentReportVariables>;
}
export const dismissOwnerCommentReportRef: DismissOwnerCommentReportRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
dismissOwnerCommentReport(dc: DataConnect, vars: DismissOwnerCommentReportVariables): MutationPromise<DismissOwnerCommentReportData, DismissOwnerCommentReportVariables>;

interface DismissOwnerCommentReportRef {
  ...
  (dc: DataConnect, vars: DismissOwnerCommentReportVariables): MutationRef<DismissOwnerCommentReportData, DismissOwnerCommentReportVariables>;
}
export const dismissOwnerCommentReportRef: DismissOwnerCommentReportRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the dismissOwnerCommentReportRef:
```typescript
const name = dismissOwnerCommentReportRef.operationName;
console.log(name);
```

### Variables
The `DismissOwnerCommentReport` mutation requires an argument of type `DismissOwnerCommentReportVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DismissOwnerCommentReportVariables {
  reportId: UUIDString;
}
```
### Return Type
Recall that executing the `DismissOwnerCommentReport` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DismissOwnerCommentReportData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DismissOwnerCommentReportData {
  commentReport_update?: CommentReport_Key | null;
}
```
### Using `DismissOwnerCommentReport`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, dismissOwnerCommentReport, DismissOwnerCommentReportVariables } from '@bondcircle/dataconnect';

// The `DismissOwnerCommentReport` mutation requires an argument of type `DismissOwnerCommentReportVariables`:
const dismissOwnerCommentReportVars: DismissOwnerCommentReportVariables = {
  reportId: ..., 
};

// Call the `dismissOwnerCommentReport()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await dismissOwnerCommentReport(dismissOwnerCommentReportVars);
// Variables can be defined inline as well.
const { data } = await dismissOwnerCommentReport({ reportId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await dismissOwnerCommentReport(dataConnect, dismissOwnerCommentReportVars);

console.log(data.commentReport_update);

// Or, you can use the `Promise` API.
dismissOwnerCommentReport(dismissOwnerCommentReportVars).then((response) => {
  const data = response.data;
  console.log(data.commentReport_update);
});
```

### Using `DismissOwnerCommentReport`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, dismissOwnerCommentReportRef, DismissOwnerCommentReportVariables } from '@bondcircle/dataconnect';

// The `DismissOwnerCommentReport` mutation requires an argument of type `DismissOwnerCommentReportVariables`:
const dismissOwnerCommentReportVars: DismissOwnerCommentReportVariables = {
  reportId: ..., 
};

// Call the `dismissOwnerCommentReportRef()` function to get a reference to the mutation.
const ref = dismissOwnerCommentReportRef(dismissOwnerCommentReportVars);
// Variables can be defined inline as well.
const ref = dismissOwnerCommentReportRef({ reportId: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = dismissOwnerCommentReportRef(dataConnect, dismissOwnerCommentReportVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.commentReport_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.commentReport_update);
});
```

## SuspendOwnerTargetUser
You can execute the `SuspendOwnerTargetUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
suspendOwnerTargetUser(vars: SuspendOwnerTargetUserVariables): MutationPromise<SuspendOwnerTargetUserData, SuspendOwnerTargetUserVariables>;

interface SuspendOwnerTargetUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SuspendOwnerTargetUserVariables): MutationRef<SuspendOwnerTargetUserData, SuspendOwnerTargetUserVariables>;
}
export const suspendOwnerTargetUserRef: SuspendOwnerTargetUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
suspendOwnerTargetUser(dc: DataConnect, vars: SuspendOwnerTargetUserVariables): MutationPromise<SuspendOwnerTargetUserData, SuspendOwnerTargetUserVariables>;

interface SuspendOwnerTargetUserRef {
  ...
  (dc: DataConnect, vars: SuspendOwnerTargetUserVariables): MutationRef<SuspendOwnerTargetUserData, SuspendOwnerTargetUserVariables>;
}
export const suspendOwnerTargetUserRef: SuspendOwnerTargetUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the suspendOwnerTargetUserRef:
```typescript
const name = suspendOwnerTargetUserRef.operationName;
console.log(name);
```

### Variables
The `SuspendOwnerTargetUser` mutation requires an argument of type `SuspendOwnerTargetUserVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SuspendOwnerTargetUserVariables {
  userId: string;
  reasonCode: string;
  suspendedAt: TimestampString;
}
```
### Return Type
Recall that executing the `SuspendOwnerTargetUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SuspendOwnerTargetUserData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SuspendOwnerTargetUserData {
  user_update?: User_Key | null;
}
```
### Using `SuspendOwnerTargetUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, suspendOwnerTargetUser, SuspendOwnerTargetUserVariables } from '@bondcircle/dataconnect';

// The `SuspendOwnerTargetUser` mutation requires an argument of type `SuspendOwnerTargetUserVariables`:
const suspendOwnerTargetUserVars: SuspendOwnerTargetUserVariables = {
  userId: ..., 
  reasonCode: ..., 
  suspendedAt: ..., 
};

// Call the `suspendOwnerTargetUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await suspendOwnerTargetUser(suspendOwnerTargetUserVars);
// Variables can be defined inline as well.
const { data } = await suspendOwnerTargetUser({ userId: ..., reasonCode: ..., suspendedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await suspendOwnerTargetUser(dataConnect, suspendOwnerTargetUserVars);

console.log(data.user_update);

// Or, you can use the `Promise` API.
suspendOwnerTargetUser(suspendOwnerTargetUserVars).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

### Using `SuspendOwnerTargetUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, suspendOwnerTargetUserRef, SuspendOwnerTargetUserVariables } from '@bondcircle/dataconnect';

// The `SuspendOwnerTargetUser` mutation requires an argument of type `SuspendOwnerTargetUserVariables`:
const suspendOwnerTargetUserVars: SuspendOwnerTargetUserVariables = {
  userId: ..., 
  reasonCode: ..., 
  suspendedAt: ..., 
};

// Call the `suspendOwnerTargetUserRef()` function to get a reference to the mutation.
const ref = suspendOwnerTargetUserRef(suspendOwnerTargetUserVars);
// Variables can be defined inline as well.
const ref = suspendOwnerTargetUserRef({ userId: ..., reasonCode: ..., suspendedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = suspendOwnerTargetUserRef(dataConnect, suspendOwnerTargetUserVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_update);
});
```

## RevokeCompromisedInvitation
You can execute the `RevokeCompromisedInvitation` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
revokeCompromisedInvitation(vars: RevokeCompromisedInvitationVariables): MutationPromise<RevokeCompromisedInvitationData, RevokeCompromisedInvitationVariables>;

interface RevokeCompromisedInvitationRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RevokeCompromisedInvitationVariables): MutationRef<RevokeCompromisedInvitationData, RevokeCompromisedInvitationVariables>;
}
export const revokeCompromisedInvitationRef: RevokeCompromisedInvitationRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
revokeCompromisedInvitation(dc: DataConnect, vars: RevokeCompromisedInvitationVariables): MutationPromise<RevokeCompromisedInvitationData, RevokeCompromisedInvitationVariables>;

interface RevokeCompromisedInvitationRef {
  ...
  (dc: DataConnect, vars: RevokeCompromisedInvitationVariables): MutationRef<RevokeCompromisedInvitationData, RevokeCompromisedInvitationVariables>;
}
export const revokeCompromisedInvitationRef: RevokeCompromisedInvitationRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the revokeCompromisedInvitationRef:
```typescript
const name = revokeCompromisedInvitationRef.operationName;
console.log(name);
```

### Variables
The `RevokeCompromisedInvitation` mutation requires an argument of type `RevokeCompromisedInvitationVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RevokeCompromisedInvitationVariables {
  invitationId: UUIDString;
  revokedAt: TimestampString;
}
```
### Return Type
Recall that executing the `RevokeCompromisedInvitation` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RevokeCompromisedInvitationData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RevokeCompromisedInvitationData {
  invitation_update?: Invitation_Key | null;
}
```
### Using `RevokeCompromisedInvitation`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, revokeCompromisedInvitation, RevokeCompromisedInvitationVariables } from '@bondcircle/dataconnect';

// The `RevokeCompromisedInvitation` mutation requires an argument of type `RevokeCompromisedInvitationVariables`:
const revokeCompromisedInvitationVars: RevokeCompromisedInvitationVariables = {
  invitationId: ..., 
  revokedAt: ..., 
};

// Call the `revokeCompromisedInvitation()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await revokeCompromisedInvitation(revokeCompromisedInvitationVars);
// Variables can be defined inline as well.
const { data } = await revokeCompromisedInvitation({ invitationId: ..., revokedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await revokeCompromisedInvitation(dataConnect, revokeCompromisedInvitationVars);

console.log(data.invitation_update);

// Or, you can use the `Promise` API.
revokeCompromisedInvitation(revokeCompromisedInvitationVars).then((response) => {
  const data = response.data;
  console.log(data.invitation_update);
});
```

### Using `RevokeCompromisedInvitation`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, revokeCompromisedInvitationRef, RevokeCompromisedInvitationVariables } from '@bondcircle/dataconnect';

// The `RevokeCompromisedInvitation` mutation requires an argument of type `RevokeCompromisedInvitationVariables`:
const revokeCompromisedInvitationVars: RevokeCompromisedInvitationVariables = {
  invitationId: ..., 
  revokedAt: ..., 
};

// Call the `revokeCompromisedInvitationRef()` function to get a reference to the mutation.
const ref = revokeCompromisedInvitationRef(revokeCompromisedInvitationVars);
// Variables can be defined inline as well.
const ref = revokeCompromisedInvitationRef({ invitationId: ..., revokedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = revokeCompromisedInvitationRef(dataConnect, revokeCompromisedInvitationVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.invitation_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invitation_update);
});
```

## ProvisionOwnerAdministrator
You can execute the `ProvisionOwnerAdministrator` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect/index.d.ts](./index.d.ts):
```typescript
provisionOwnerAdministrator(vars: ProvisionOwnerAdministratorVariables): MutationPromise<ProvisionOwnerAdministratorData, ProvisionOwnerAdministratorVariables>;

interface ProvisionOwnerAdministratorRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: ProvisionOwnerAdministratorVariables): MutationRef<ProvisionOwnerAdministratorData, ProvisionOwnerAdministratorVariables>;
}
export const provisionOwnerAdministratorRef: ProvisionOwnerAdministratorRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
provisionOwnerAdministrator(dc: DataConnect, vars: ProvisionOwnerAdministratorVariables): MutationPromise<ProvisionOwnerAdministratorData, ProvisionOwnerAdministratorVariables>;

interface ProvisionOwnerAdministratorRef {
  ...
  (dc: DataConnect, vars: ProvisionOwnerAdministratorVariables): MutationRef<ProvisionOwnerAdministratorData, ProvisionOwnerAdministratorVariables>;
}
export const provisionOwnerAdministratorRef: ProvisionOwnerAdministratorRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the provisionOwnerAdministratorRef:
```typescript
const name = provisionOwnerAdministratorRef.operationName;
console.log(name);
```

### Variables
The `ProvisionOwnerAdministrator` mutation requires an argument of type `ProvisionOwnerAdministratorVariables`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface ProvisionOwnerAdministratorVariables {
  userId: string;
  createdAt: TimestampString;
}
```
### Return Type
Recall that executing the `ProvisionOwnerAdministrator` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ProvisionOwnerAdministratorData`, which is defined in [dataconnect/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ProvisionOwnerAdministratorData {
  ownerAdministrator_upsert: OwnerAdministrator_Key;
}
```
### Using `ProvisionOwnerAdministrator`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, provisionOwnerAdministrator, ProvisionOwnerAdministratorVariables } from '@bondcircle/dataconnect';

// The `ProvisionOwnerAdministrator` mutation requires an argument of type `ProvisionOwnerAdministratorVariables`:
const provisionOwnerAdministratorVars: ProvisionOwnerAdministratorVariables = {
  userId: ..., 
  createdAt: ..., 
};

// Call the `provisionOwnerAdministrator()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await provisionOwnerAdministrator(provisionOwnerAdministratorVars);
// Variables can be defined inline as well.
const { data } = await provisionOwnerAdministrator({ userId: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await provisionOwnerAdministrator(dataConnect, provisionOwnerAdministratorVars);

console.log(data.ownerAdministrator_upsert);

// Or, you can use the `Promise` API.
provisionOwnerAdministrator(provisionOwnerAdministratorVars).then((response) => {
  const data = response.data;
  console.log(data.ownerAdministrator_upsert);
});
```

### Using `ProvisionOwnerAdministrator`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, provisionOwnerAdministratorRef, ProvisionOwnerAdministratorVariables } from '@bondcircle/dataconnect';

// The `ProvisionOwnerAdministrator` mutation requires an argument of type `ProvisionOwnerAdministratorVariables`:
const provisionOwnerAdministratorVars: ProvisionOwnerAdministratorVariables = {
  userId: ..., 
  createdAt: ..., 
};

// Call the `provisionOwnerAdministratorRef()` function to get a reference to the mutation.
const ref = provisionOwnerAdministratorRef(provisionOwnerAdministratorVars);
// Variables can be defined inline as well.
const ref = provisionOwnerAdministratorRef({ userId: ..., createdAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = provisionOwnerAdministratorRef(dataConnect, provisionOwnerAdministratorVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.ownerAdministrator_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.ownerAdministrator_upsert);
});
```

