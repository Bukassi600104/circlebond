# Generated React README
This README will guide you through the process of using the generated React SDK package for the connector `bondcircle`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `JavaScript README`, you can find it at [`dataconnect/README.md`](../README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@bondcircle/dataconnect/react` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#react).

# Table of Contents
- [**Overview**](#generated-react-readme)
- [**TanStack Query Firebase & TanStack React Query**](#tanstack-query-firebase-tanstack-react-query)
  - [*Package Installation*](#installing-tanstack-query-firebase-and-tanstack-react-query-packages)
  - [*Configuring TanStack Query*](#configuring-tanstack-query)
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

# TanStack Query Firebase & TanStack React Query
This SDK provides [React](https://react.dev/) hooks generated specific to your application, for the operations found in the connector `bondcircle`. These hooks are generated using [TanStack Query Firebase](https://react-query-firebase.invertase.dev/) by our partners at Invertase, a library built on top of [TanStack React Query v5](https://tanstack.com/query/v5/docs/framework/react/overview).

***You do not need to be familiar with Tanstack Query or Tanstack Query Firebase to use this SDK.*** However, you may find it useful to learn more about them, as they will empower you as a user of this Generated React SDK.

## Installing TanStack Query Firebase and TanStack React Query Packages
In order to use the React generated SDK, you must install the `TanStack React Query` and `TanStack Query Firebase` packages.
```bash
npm i --save @tanstack/react-query @tanstack-query-firebase/react
```
```bash
npm i --save firebase@latest # Note: React has a peer dependency on ^11.3.0
```

You can also follow the installation instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#tanstack-install), or the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react) and [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/installation).

## Configuring TanStack Query
In order to use the React generated SDK in your application, you must wrap your application's component tree in a `QueryClientProvider` component from TanStack React Query. None of your generated React SDK hooks will work without this provider.

```javascript
import { QueryClientProvider } from '@tanstack/react-query';

// Create a TanStack Query client instance
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <MyApplication />
    </QueryClientProvider>
  )
}
```

To learn more about `QueryClientProvider`, see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/quick-start) and the [TanStack Query Firebase documentation](https://invertase.docs.page/tanstack-query-firebase/react#usage).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `bondcircle`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@bondcircle/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#emulator-react-angular).

```javascript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@bondcircle/dataconnect';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) using the hooks provided from your generated React SDK.

# Queries

The React generated SDK provides Query hook functions that call and return [`useDataConnectQuery`](https://react-query-firebase.invertase.dev/react/data-connect/querying) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and the most recent data returned by the Query, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/querying).

TanStack React Query caches the results of your Queries, so using the same Query hook function in multiple places in your application allows the entire application to automatically see updates to that Query's data.

Query hooks execute their Queries automatically when called, and periodically refresh, unless you change the `queryOptions` for the Query. To learn how to stop a Query from automatically executing, including how to make a query "lazy", see the [TanStack React Query documentation](https://tanstack.com/query/latest/docs/framework/react/guides/disabling-queries).

To learn more about TanStack React Query's Queries, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/queries).

## Using Query Hooks
Here's a general overview of how to use the generated Query hooks in your code:

- If the Query has no variables, the Query hook function does not require arguments.
- If the Query has any required variables, the Query hook function will require at least one argument: an object that contains all the required variables for the Query.
- If the Query has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Query's variables are optional, the Query hook function does not require any arguments.
- Query hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Query hooks functions can be called with or without passing in an `options` argument of type `useDataConnectQueryOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/query-options).
  - ***Special case:***  If the Query has all optional variables and you would like to provide an `options` argument to the Query hook function without providing any variables, you must pass `undefined` where you would normally pass the Query's variables, and then may provide the `options` argument.

Below are examples of how to use the `bondcircle` connector's generated Query hook functions to execute each Query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## GetCurrentUser
You can execute the `GetCurrentUser` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetCurrentUser(dc: DataConnect, options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCurrentUser(options?: useDataConnectQueryOptions<GetCurrentUserData>): UseDataConnectQueryResult<GetCurrentUserData, undefined>;
```

### Variables
The `GetCurrentUser` Query has no variables.
### Return Type
Recall that calling the `GetCurrentUser` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCurrentUser` Query is of type `GetCurrentUserData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCurrentUser`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@bondcircle/dataconnect';
import { useGetCurrentUser } from '@bondcircle/dataconnect/react'

export default function GetCurrentUserComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCurrentUser();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCurrentUser(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCurrentUser(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCurrentUser(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.user);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetDashboardCircles
You can execute the `GetDashboardCircles` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetDashboardCircles(dc: DataConnect, options?: useDataConnectQueryOptions<GetDashboardCirclesData>): UseDataConnectQueryResult<GetDashboardCirclesData, undefined>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetDashboardCircles(options?: useDataConnectQueryOptions<GetDashboardCirclesData>): UseDataConnectQueryResult<GetDashboardCirclesData, undefined>;
```

### Variables
The `GetDashboardCircles` Query has no variables.
### Return Type
Recall that calling the `GetDashboardCircles` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetDashboardCircles` Query is of type `GetDashboardCirclesData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetDashboardCircles`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@bondcircle/dataconnect';
import { useGetDashboardCircles } from '@bondcircle/dataconnect/react'

export default function GetDashboardCirclesComponent() {
  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetDashboardCircles();

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetDashboardCircles(dataConnect);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetDashboardCircles(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetDashboardCircles(dataConnect, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circleMemberships);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCircleEngineRecord
You can execute the `GetCircleEngineRecord` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetCircleEngineRecord(dc: DataConnect, vars: GetCircleEngineRecordVariables, options?: useDataConnectQueryOptions<GetCircleEngineRecordData>): UseDataConnectQueryResult<GetCircleEngineRecordData, GetCircleEngineRecordVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCircleEngineRecord(vars: GetCircleEngineRecordVariables, options?: useDataConnectQueryOptions<GetCircleEngineRecordData>): UseDataConnectQueryResult<GetCircleEngineRecordData, GetCircleEngineRecordVariables>;
```

### Variables
The `GetCircleEngineRecord` Query requires an argument of type `GetCircleEngineRecordVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCircleEngineRecordVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCircleEngineRecord` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCircleEngineRecord` Query is of type `GetCircleEngineRecordData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCircleEngineRecord`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCircleEngineRecordVariables } from '@bondcircle/dataconnect';
import { useGetCircleEngineRecord } from '@bondcircle/dataconnect/react'

export default function GetCircleEngineRecordComponent() {
  // The `useGetCircleEngineRecord` Query hook requires an argument of type `GetCircleEngineRecordVariables`:
  const getCircleEngineRecordVars: GetCircleEngineRecordVariables = {
    circleId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCircleEngineRecord(getCircleEngineRecordVars);
  // Variables can be defined inline as well.
  const query = useGetCircleEngineRecord({ circleId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCircleEngineRecord(dataConnect, getCircleEngineRecordVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCircleEngineRecord(getCircleEngineRecordVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCircleEngineRecord(dataConnect, getCircleEngineRecordVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circle);
    console.log(query.data.circleMemberships);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCircleLifecycleSummary
You can execute the `GetCircleLifecycleSummary` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetCircleLifecycleSummary(dc: DataConnect, vars: GetCircleLifecycleSummaryVariables, options?: useDataConnectQueryOptions<GetCircleLifecycleSummaryData>): UseDataConnectQueryResult<GetCircleLifecycleSummaryData, GetCircleLifecycleSummaryVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCircleLifecycleSummary(vars: GetCircleLifecycleSummaryVariables, options?: useDataConnectQueryOptions<GetCircleLifecycleSummaryData>): UseDataConnectQueryResult<GetCircleLifecycleSummaryData, GetCircleLifecycleSummaryVariables>;
```

### Variables
The `GetCircleLifecycleSummary` Query requires an argument of type `GetCircleLifecycleSummaryVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCircleLifecycleSummaryVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCircleLifecycleSummary` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCircleLifecycleSummary` Query is of type `GetCircleLifecycleSummaryData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCircleLifecycleSummary`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCircleLifecycleSummaryVariables } from '@bondcircle/dataconnect';
import { useGetCircleLifecycleSummary } from '@bondcircle/dataconnect/react'

export default function GetCircleLifecycleSummaryComponent() {
  // The `useGetCircleLifecycleSummary` Query hook requires an argument of type `GetCircleLifecycleSummaryVariables`:
  const getCircleLifecycleSummaryVars: GetCircleLifecycleSummaryVariables = {
    circleId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCircleLifecycleSummary(getCircleLifecycleSummaryVars);
  // Variables can be defined inline as well.
  const query = useGetCircleLifecycleSummary({ circleId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCircleLifecycleSummary(dataConnect, getCircleLifecycleSummaryVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCircleLifecycleSummary(getCircleLifecycleSummaryVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCircleLifecycleSummary(dataConnect, getCircleLifecycleSummaryVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circle);
    console.log(query.data.circleMemberships);
    console.log(query.data.activityLogs);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## FindUserByEmail
You can execute the `FindUserByEmail` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useFindUserByEmail(dc: DataConnect, vars: FindUserByEmailVariables, options?: useDataConnectQueryOptions<FindUserByEmailData>): UseDataConnectQueryResult<FindUserByEmailData, FindUserByEmailVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useFindUserByEmail(vars: FindUserByEmailVariables, options?: useDataConnectQueryOptions<FindUserByEmailData>): UseDataConnectQueryResult<FindUserByEmailData, FindUserByEmailVariables>;
```

### Variables
The `FindUserByEmail` Query requires an argument of type `FindUserByEmailVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface FindUserByEmailVariables {
  email: string;
}
```
### Return Type
Recall that calling the `FindUserByEmail` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `FindUserByEmail` Query is of type `FindUserByEmailData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `FindUserByEmail`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, FindUserByEmailVariables } from '@bondcircle/dataconnect';
import { useFindUserByEmail } from '@bondcircle/dataconnect/react'

export default function FindUserByEmailComponent() {
  // The `useFindUserByEmail` Query hook requires an argument of type `FindUserByEmailVariables`:
  const findUserByEmailVars: FindUserByEmailVariables = {
    email: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useFindUserByEmail(findUserByEmailVars);
  // Variables can be defined inline as well.
  const query = useFindUserByEmail({ email: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useFindUserByEmail(dataConnect, findUserByEmailVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useFindUserByEmail(findUserByEmailVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useFindUserByEmail(dataConnect, findUserByEmailVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.users);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetGiftCircleDetail
You can execute the `GetGiftCircleDetail` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetGiftCircleDetail(dc: DataConnect, vars: GetGiftCircleDetailVariables, options?: useDataConnectQueryOptions<GetGiftCircleDetailData>): UseDataConnectQueryResult<GetGiftCircleDetailData, GetGiftCircleDetailVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetGiftCircleDetail(vars: GetGiftCircleDetailVariables, options?: useDataConnectQueryOptions<GetGiftCircleDetailData>): UseDataConnectQueryResult<GetGiftCircleDetailData, GetGiftCircleDetailVariables>;
```

### Variables
The `GetGiftCircleDetail` Query requires an argument of type `GetGiftCircleDetailVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetGiftCircleDetailVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that calling the `GetGiftCircleDetail` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetGiftCircleDetail` Query is of type `GetGiftCircleDetailData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetGiftCircleDetail`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetGiftCircleDetailVariables } from '@bondcircle/dataconnect';
import { useGetGiftCircleDetail } from '@bondcircle/dataconnect/react'

export default function GetGiftCircleDetailComponent() {
  // The `useGetGiftCircleDetail` Query hook requires an argument of type `GetGiftCircleDetailVariables`:
  const getGiftCircleDetailVars: GetGiftCircleDetailVariables = {
    circleId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetGiftCircleDetail(getGiftCircleDetailVars);
  // Variables can be defined inline as well.
  const query = useGetGiftCircleDetail({ circleId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetGiftCircleDetail(dataConnect, getGiftCircleDetailVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetGiftCircleDetail(getGiftCircleDetailVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetGiftCircleDetail(dataConnect, getGiftCircleDetailVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circle);
    console.log(query.data.circleMemberships);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCircleAuditEntries
You can execute the `GetCircleAuditEntries` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetCircleAuditEntries(dc: DataConnect, vars: GetCircleAuditEntriesVariables, options?: useDataConnectQueryOptions<GetCircleAuditEntriesData>): UseDataConnectQueryResult<GetCircleAuditEntriesData, GetCircleAuditEntriesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCircleAuditEntries(vars: GetCircleAuditEntriesVariables, options?: useDataConnectQueryOptions<GetCircleAuditEntriesData>): UseDataConnectQueryResult<GetCircleAuditEntriesData, GetCircleAuditEntriesVariables>;
```

### Variables
The `GetCircleAuditEntries` Query requires an argument of type `GetCircleAuditEntriesVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCircleAuditEntriesVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCircleAuditEntries` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCircleAuditEntries` Query is of type `GetCircleAuditEntriesData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCircleAuditEntries`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCircleAuditEntriesVariables } from '@bondcircle/dataconnect';
import { useGetCircleAuditEntries } from '@bondcircle/dataconnect/react'

export default function GetCircleAuditEntriesComponent() {
  // The `useGetCircleAuditEntries` Query hook requires an argument of type `GetCircleAuditEntriesVariables`:
  const getCircleAuditEntriesVars: GetCircleAuditEntriesVariables = {
    circleId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCircleAuditEntries(getCircleAuditEntriesVars);
  // Variables can be defined inline as well.
  const query = useGetCircleAuditEntries({ circleId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCircleAuditEntries(dataConnect, getCircleAuditEntriesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCircleAuditEntries(getCircleAuditEntriesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCircleAuditEntries(dataConnect, getCircleAuditEntriesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circleAuditEntries);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetAsoEbiCircleDetail
You can execute the `GetAsoEbiCircleDetail` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetAsoEbiCircleDetail(dc: DataConnect, vars: GetAsoEbiCircleDetailVariables, options?: useDataConnectQueryOptions<GetAsoEbiCircleDetailData>): UseDataConnectQueryResult<GetAsoEbiCircleDetailData, GetAsoEbiCircleDetailVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetAsoEbiCircleDetail(vars: GetAsoEbiCircleDetailVariables, options?: useDataConnectQueryOptions<GetAsoEbiCircleDetailData>): UseDataConnectQueryResult<GetAsoEbiCircleDetailData, GetAsoEbiCircleDetailVariables>;
```

### Variables
The `GetAsoEbiCircleDetail` Query requires an argument of type `GetAsoEbiCircleDetailVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetAsoEbiCircleDetailVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that calling the `GetAsoEbiCircleDetail` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetAsoEbiCircleDetail` Query is of type `GetAsoEbiCircleDetailData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetAsoEbiCircleDetail`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetAsoEbiCircleDetailVariables } from '@bondcircle/dataconnect';
import { useGetAsoEbiCircleDetail } from '@bondcircle/dataconnect/react'

export default function GetAsoEbiCircleDetailComponent() {
  // The `useGetAsoEbiCircleDetail` Query hook requires an argument of type `GetAsoEbiCircleDetailVariables`:
  const getAsoEbiCircleDetailVars: GetAsoEbiCircleDetailVariables = {
    circleId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetAsoEbiCircleDetail(getAsoEbiCircleDetailVars);
  // Variables can be defined inline as well.
  const query = useGetAsoEbiCircleDetail({ circleId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetAsoEbiCircleDetail(dataConnect, getAsoEbiCircleDetailVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetAsoEbiCircleDetail(getAsoEbiCircleDetailVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetAsoEbiCircleDetail(dataConnect, getAsoEbiCircleDetailVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circle);
    console.log(query.data.asoEbiTiers);
    console.log(query.data.circleMemberships);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetSupportCircleDetail
You can execute the `GetSupportCircleDetail` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetSupportCircleDetail(dc: DataConnect, vars: GetSupportCircleDetailVariables, options?: useDataConnectQueryOptions<GetSupportCircleDetailData>): UseDataConnectQueryResult<GetSupportCircleDetailData, GetSupportCircleDetailVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetSupportCircleDetail(vars: GetSupportCircleDetailVariables, options?: useDataConnectQueryOptions<GetSupportCircleDetailData>): UseDataConnectQueryResult<GetSupportCircleDetailData, GetSupportCircleDetailVariables>;
```

### Variables
The `GetSupportCircleDetail` Query requires an argument of type `GetSupportCircleDetailVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetSupportCircleDetailVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that calling the `GetSupportCircleDetail` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetSupportCircleDetail` Query is of type `GetSupportCircleDetailData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetSupportCircleDetail`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetSupportCircleDetailVariables } from '@bondcircle/dataconnect';
import { useGetSupportCircleDetail } from '@bondcircle/dataconnect/react'

export default function GetSupportCircleDetailComponent() {
  // The `useGetSupportCircleDetail` Query hook requires an argument of type `GetSupportCircleDetailVariables`:
  const getSupportCircleDetailVars: GetSupportCircleDetailVariables = {
    circleId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetSupportCircleDetail(getSupportCircleDetailVars);
  // Variables can be defined inline as well.
  const query = useGetSupportCircleDetail({ circleId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetSupportCircleDetail(dataConnect, getSupportCircleDetailVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetSupportCircleDetail(getSupportCircleDetailVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetSupportCircleDetail(dataConnect, getSupportCircleDetailVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circle);
    console.log(query.data.circleMemberships);
    console.log(query.data.supportUpdates);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetInvitationByTokenHash
You can execute the `GetInvitationByTokenHash` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetInvitationByTokenHash(dc: DataConnect, vars: GetInvitationByTokenHashVariables, options?: useDataConnectQueryOptions<GetInvitationByTokenHashData>): UseDataConnectQueryResult<GetInvitationByTokenHashData, GetInvitationByTokenHashVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetInvitationByTokenHash(vars: GetInvitationByTokenHashVariables, options?: useDataConnectQueryOptions<GetInvitationByTokenHashData>): UseDataConnectQueryResult<GetInvitationByTokenHashData, GetInvitationByTokenHashVariables>;
```

### Variables
The `GetInvitationByTokenHash` Query requires an argument of type `GetInvitationByTokenHashVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetInvitationByTokenHashVariables {
  tokenHash: string;
}
```
### Return Type
Recall that calling the `GetInvitationByTokenHash` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetInvitationByTokenHash` Query is of type `GetInvitationByTokenHashData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetInvitationByTokenHash`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetInvitationByTokenHashVariables } from '@bondcircle/dataconnect';
import { useGetInvitationByTokenHash } from '@bondcircle/dataconnect/react'

export default function GetInvitationByTokenHashComponent() {
  // The `useGetInvitationByTokenHash` Query hook requires an argument of type `GetInvitationByTokenHashVariables`:
  const getInvitationByTokenHashVars: GetInvitationByTokenHashVariables = {
    tokenHash: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetInvitationByTokenHash(getInvitationByTokenHashVars);
  // Variables can be defined inline as well.
  const query = useGetInvitationByTokenHash({ tokenHash: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetInvitationByTokenHash(dataConnect, getInvitationByTokenHashVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetInvitationByTokenHash(getInvitationByTokenHashVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetInvitationByTokenHash(dataConnect, getInvitationByTokenHashVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.invitations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCircleInvitations
You can execute the `GetCircleInvitations` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetCircleInvitations(dc: DataConnect, vars: GetCircleInvitationsVariables, options?: useDataConnectQueryOptions<GetCircleInvitationsData>): UseDataConnectQueryResult<GetCircleInvitationsData, GetCircleInvitationsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCircleInvitations(vars: GetCircleInvitationsVariables, options?: useDataConnectQueryOptions<GetCircleInvitationsData>): UseDataConnectQueryResult<GetCircleInvitationsData, GetCircleInvitationsVariables>;
```

### Variables
The `GetCircleInvitations` Query requires an argument of type `GetCircleInvitationsVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCircleInvitationsVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCircleInvitations` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCircleInvitations` Query is of type `GetCircleInvitationsData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCircleInvitations`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCircleInvitationsVariables } from '@bondcircle/dataconnect';
import { useGetCircleInvitations } from '@bondcircle/dataconnect/react'

export default function GetCircleInvitationsComponent() {
  // The `useGetCircleInvitations` Query hook requires an argument of type `GetCircleInvitationsVariables`:
  const getCircleInvitationsVars: GetCircleInvitationsVariables = {
    circleId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCircleInvitations(getCircleInvitationsVars);
  // Variables can be defined inline as well.
  const query = useGetCircleInvitations({ circleId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCircleInvitations(dataConnect, getCircleInvitationsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCircleInvitations(getCircleInvitationsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCircleInvitations(dataConnect, getCircleInvitationsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.invitations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetInvitationAcceptances
You can execute the `GetInvitationAcceptances` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetInvitationAcceptances(dc: DataConnect, vars: GetInvitationAcceptancesVariables, options?: useDataConnectQueryOptions<GetInvitationAcceptancesData>): UseDataConnectQueryResult<GetInvitationAcceptancesData, GetInvitationAcceptancesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetInvitationAcceptances(vars: GetInvitationAcceptancesVariables, options?: useDataConnectQueryOptions<GetInvitationAcceptancesData>): UseDataConnectQueryResult<GetInvitationAcceptancesData, GetInvitationAcceptancesVariables>;
```

### Variables
The `GetInvitationAcceptances` Query requires an argument of type `GetInvitationAcceptancesVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetInvitationAcceptancesVariables {
  invitationId: UUIDString;
}
```
### Return Type
Recall that calling the `GetInvitationAcceptances` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetInvitationAcceptances` Query is of type `GetInvitationAcceptancesData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetInvitationAcceptances`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetInvitationAcceptancesVariables } from '@bondcircle/dataconnect';
import { useGetInvitationAcceptances } from '@bondcircle/dataconnect/react'

export default function GetInvitationAcceptancesComponent() {
  // The `useGetInvitationAcceptances` Query hook requires an argument of type `GetInvitationAcceptancesVariables`:
  const getInvitationAcceptancesVars: GetInvitationAcceptancesVariables = {
    invitationId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetInvitationAcceptances(getInvitationAcceptancesVars);
  // Variables can be defined inline as well.
  const query = useGetInvitationAcceptances({ invitationId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetInvitationAcceptances(dataConnect, getInvitationAcceptancesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetInvitationAcceptances(getInvitationAcceptancesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetInvitationAcceptances(dataConnect, getInvitationAcceptancesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.invitationAcceptances);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetContributionWorkspace
You can execute the `GetContributionWorkspace` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetContributionWorkspace(dc: DataConnect, vars: GetContributionWorkspaceVariables, options?: useDataConnectQueryOptions<GetContributionWorkspaceData>): UseDataConnectQueryResult<GetContributionWorkspaceData, GetContributionWorkspaceVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetContributionWorkspace(vars: GetContributionWorkspaceVariables, options?: useDataConnectQueryOptions<GetContributionWorkspaceData>): UseDataConnectQueryResult<GetContributionWorkspaceData, GetContributionWorkspaceVariables>;
```

### Variables
The `GetContributionWorkspace` Query requires an argument of type `GetContributionWorkspaceVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetContributionWorkspaceVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that calling the `GetContributionWorkspace` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetContributionWorkspace` Query is of type `GetContributionWorkspaceData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetContributionWorkspace`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetContributionWorkspaceVariables } from '@bondcircle/dataconnect';
import { useGetContributionWorkspace } from '@bondcircle/dataconnect/react'

export default function GetContributionWorkspaceComponent() {
  // The `useGetContributionWorkspace` Query hook requires an argument of type `GetContributionWorkspaceVariables`:
  const getContributionWorkspaceVars: GetContributionWorkspaceVariables = {
    circleId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetContributionWorkspace(getContributionWorkspaceVars);
  // Variables can be defined inline as well.
  const query = useGetContributionWorkspace({ circleId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetContributionWorkspace(dataConnect, getContributionWorkspaceVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetContributionWorkspace(getContributionWorkspaceVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetContributionWorkspace(dataConnect, getContributionWorkspaceVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circle);
    console.log(query.data.circleMemberships);
    console.log(query.data.receipts);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCircleCommunication
You can execute the `GetCircleCommunication` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetCircleCommunication(dc: DataConnect, vars: GetCircleCommunicationVariables, options?: useDataConnectQueryOptions<GetCircleCommunicationData>): UseDataConnectQueryResult<GetCircleCommunicationData, GetCircleCommunicationVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCircleCommunication(vars: GetCircleCommunicationVariables, options?: useDataConnectQueryOptions<GetCircleCommunicationData>): UseDataConnectQueryResult<GetCircleCommunicationData, GetCircleCommunicationVariables>;
```

### Variables
The `GetCircleCommunication` Query requires an argument of type `GetCircleCommunicationVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCircleCommunicationVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCircleCommunication` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCircleCommunication` Query is of type `GetCircleCommunicationData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCircleCommunication`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCircleCommunicationVariables } from '@bondcircle/dataconnect';
import { useGetCircleCommunication } from '@bondcircle/dataconnect/react'

export default function GetCircleCommunicationComponent() {
  // The `useGetCircleCommunication` Query hook requires an argument of type `GetCircleCommunicationVariables`:
  const getCircleCommunicationVars: GetCircleCommunicationVariables = {
    circleId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCircleCommunication(getCircleCommunicationVars);
  // Variables can be defined inline as well.
  const query = useGetCircleCommunication({ circleId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCircleCommunication(dataConnect, getCircleCommunicationVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCircleCommunication(getCircleCommunicationVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCircleCommunication(dataConnect, getCircleCommunicationVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circle);
    console.log(query.data.circleMemberships);
    console.log(query.data.announcements);
    console.log(query.data.comments);
    console.log(query.data.commentReports);
    console.log(query.data.activityLogs);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetRecentCommentsByAuthor
You can execute the `GetRecentCommentsByAuthor` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetRecentCommentsByAuthor(dc: DataConnect, vars: GetRecentCommentsByAuthorVariables, options?: useDataConnectQueryOptions<GetRecentCommentsByAuthorData>): UseDataConnectQueryResult<GetRecentCommentsByAuthorData, GetRecentCommentsByAuthorVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetRecentCommentsByAuthor(vars: GetRecentCommentsByAuthorVariables, options?: useDataConnectQueryOptions<GetRecentCommentsByAuthorData>): UseDataConnectQueryResult<GetRecentCommentsByAuthorData, GetRecentCommentsByAuthorVariables>;
```

### Variables
The `GetRecentCommentsByAuthor` Query requires an argument of type `GetRecentCommentsByAuthorVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetRecentCommentsByAuthorVariables {
  circleId: UUIDString;
  authorId: string;
  since: TimestampString;
}
```
### Return Type
Recall that calling the `GetRecentCommentsByAuthor` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetRecentCommentsByAuthor` Query is of type `GetRecentCommentsByAuthorData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetRecentCommentsByAuthorData {
  comments: ({
    createdAt: TimestampString;
  })[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetRecentCommentsByAuthor`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetRecentCommentsByAuthorVariables } from '@bondcircle/dataconnect';
import { useGetRecentCommentsByAuthor } from '@bondcircle/dataconnect/react'

export default function GetRecentCommentsByAuthorComponent() {
  // The `useGetRecentCommentsByAuthor` Query hook requires an argument of type `GetRecentCommentsByAuthorVariables`:
  const getRecentCommentsByAuthorVars: GetRecentCommentsByAuthorVariables = {
    circleId: ..., 
    authorId: ..., 
    since: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetRecentCommentsByAuthor(getRecentCommentsByAuthorVars);
  // Variables can be defined inline as well.
  const query = useGetRecentCommentsByAuthor({ circleId: ..., authorId: ..., since: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetRecentCommentsByAuthor(dataConnect, getRecentCommentsByAuthorVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetRecentCommentsByAuthor(getRecentCommentsByAuthorVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetRecentCommentsByAuthor(dataConnect, getRecentCommentsByAuthorVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.comments);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetOpenCommentReportsByReporter
You can execute the `GetOpenCommentReportsByReporter` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetOpenCommentReportsByReporter(dc: DataConnect, vars: GetOpenCommentReportsByReporterVariables, options?: useDataConnectQueryOptions<GetOpenCommentReportsByReporterData>): UseDataConnectQueryResult<GetOpenCommentReportsByReporterData, GetOpenCommentReportsByReporterVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetOpenCommentReportsByReporter(vars: GetOpenCommentReportsByReporterVariables, options?: useDataConnectQueryOptions<GetOpenCommentReportsByReporterData>): UseDataConnectQueryResult<GetOpenCommentReportsByReporterData, GetOpenCommentReportsByReporterVariables>;
```

### Variables
The `GetOpenCommentReportsByReporter` Query requires an argument of type `GetOpenCommentReportsByReporterVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetOpenCommentReportsByReporterVariables {
  commentId: UUIDString;
  reporterId: string;
}
```
### Return Type
Recall that calling the `GetOpenCommentReportsByReporter` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetOpenCommentReportsByReporter` Query is of type `GetOpenCommentReportsByReporterData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetOpenCommentReportsByReporterData {
  commentReports: ({
    id: UUIDString;
  } & CommentReport_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetOpenCommentReportsByReporter`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetOpenCommentReportsByReporterVariables } from '@bondcircle/dataconnect';
import { useGetOpenCommentReportsByReporter } from '@bondcircle/dataconnect/react'

export default function GetOpenCommentReportsByReporterComponent() {
  // The `useGetOpenCommentReportsByReporter` Query hook requires an argument of type `GetOpenCommentReportsByReporterVariables`:
  const getOpenCommentReportsByReporterVars: GetOpenCommentReportsByReporterVariables = {
    commentId: ..., 
    reporterId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetOpenCommentReportsByReporter(getOpenCommentReportsByReporterVars);
  // Variables can be defined inline as well.
  const query = useGetOpenCommentReportsByReporter({ commentId: ..., reporterId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetOpenCommentReportsByReporter(dataConnect, getOpenCommentReportsByReporterVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetOpenCommentReportsByReporter(getOpenCommentReportsByReporterVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetOpenCommentReportsByReporter(dataConnect, getOpenCommentReportsByReporterVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.commentReports);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetActivityLogsForCircles
You can execute the `GetActivityLogsForCircles` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetActivityLogsForCircles(dc: DataConnect, vars: GetActivityLogsForCirclesVariables, options?: useDataConnectQueryOptions<GetActivityLogsForCirclesData>): UseDataConnectQueryResult<GetActivityLogsForCirclesData, GetActivityLogsForCirclesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetActivityLogsForCircles(vars: GetActivityLogsForCirclesVariables, options?: useDataConnectQueryOptions<GetActivityLogsForCirclesData>): UseDataConnectQueryResult<GetActivityLogsForCirclesData, GetActivityLogsForCirclesVariables>;
```

### Variables
The `GetActivityLogsForCircles` Query requires an argument of type `GetActivityLogsForCirclesVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetActivityLogsForCirclesVariables {
  circleIds: UUIDString[];
}
```
### Return Type
Recall that calling the `GetActivityLogsForCircles` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetActivityLogsForCircles` Query is of type `GetActivityLogsForCirclesData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetActivityLogsForCircles`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetActivityLogsForCirclesVariables } from '@bondcircle/dataconnect';
import { useGetActivityLogsForCircles } from '@bondcircle/dataconnect/react'

export default function GetActivityLogsForCirclesComponent() {
  // The `useGetActivityLogsForCircles` Query hook requires an argument of type `GetActivityLogsForCirclesVariables`:
  const getActivityLogsForCirclesVars: GetActivityLogsForCirclesVariables = {
    circleIds: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetActivityLogsForCircles(getActivityLogsForCirclesVars);
  // Variables can be defined inline as well.
  const query = useGetActivityLogsForCircles({ circleIds: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetActivityLogsForCircles(dataConnect, getActivityLogsForCirclesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetActivityLogsForCircles(getActivityLogsForCirclesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetActivityLogsForCircles(dataConnect, getActivityLogsForCirclesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.activityLogs);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUserNotifications
You can execute the `GetUserNotifications` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetUserNotifications(dc: DataConnect, vars: GetUserNotificationsVariables, options?: useDataConnectQueryOptions<GetUserNotificationsData>): UseDataConnectQueryResult<GetUserNotificationsData, GetUserNotificationsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserNotifications(vars: GetUserNotificationsVariables, options?: useDataConnectQueryOptions<GetUserNotificationsData>): UseDataConnectQueryResult<GetUserNotificationsData, GetUserNotificationsVariables>;
```

### Variables
The `GetUserNotifications` Query requires an argument of type `GetUserNotificationsVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserNotificationsVariables {
  userId: string;
}
```
### Return Type
Recall that calling the `GetUserNotifications` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserNotifications` Query is of type `GetUserNotificationsData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserNotifications`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserNotificationsVariables } from '@bondcircle/dataconnect';
import { useGetUserNotifications } from '@bondcircle/dataconnect/react'

export default function GetUserNotificationsComponent() {
  // The `useGetUserNotifications` Query hook requires an argument of type `GetUserNotificationsVariables`:
  const getUserNotificationsVars: GetUserNotificationsVariables = {
    userId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserNotifications(getUserNotificationsVars);
  // Variables can be defined inline as well.
  const query = useGetUserNotifications({ userId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserNotifications(dataConnect, getUserNotificationsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserNotifications(getUserNotificationsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserNotifications(dataConnect, getUserNotificationsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.user);
    console.log(query.data.notifications);
    console.log(query.data.circleMemberships);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetNotificationContext
You can execute the `GetNotificationContext` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetNotificationContext(dc: DataConnect, vars: GetNotificationContextVariables, options?: useDataConnectQueryOptions<GetNotificationContextData>): UseDataConnectQueryResult<GetNotificationContextData, GetNotificationContextVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetNotificationContext(vars: GetNotificationContextVariables, options?: useDataConnectQueryOptions<GetNotificationContextData>): UseDataConnectQueryResult<GetNotificationContextData, GetNotificationContextVariables>;
```

### Variables
The `GetNotificationContext` Query requires an argument of type `GetNotificationContextVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetNotificationContextVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that calling the `GetNotificationContext` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetNotificationContext` Query is of type `GetNotificationContextData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetNotificationContext`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetNotificationContextVariables } from '@bondcircle/dataconnect';
import { useGetNotificationContext } from '@bondcircle/dataconnect/react'

export default function GetNotificationContextComponent() {
  // The `useGetNotificationContext` Query hook requires an argument of type `GetNotificationContextVariables`:
  const getNotificationContextVars: GetNotificationContextVariables = {
    circleId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetNotificationContext(getNotificationContextVars);
  // Variables can be defined inline as well.
  const query = useGetNotificationContext({ circleId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetNotificationContext(dataConnect, getNotificationContextVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetNotificationContext(getNotificationContextVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetNotificationContext(dataConnect, getNotificationContextVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circle);
    console.log(query.data.circleMemberships);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetNotificationDedupe
You can execute the `GetNotificationDedupe` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetNotificationDedupe(dc: DataConnect, vars: GetNotificationDedupeVariables, options?: useDataConnectQueryOptions<GetNotificationDedupeData>): UseDataConnectQueryResult<GetNotificationDedupeData, GetNotificationDedupeVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetNotificationDedupe(vars: GetNotificationDedupeVariables, options?: useDataConnectQueryOptions<GetNotificationDedupeData>): UseDataConnectQueryResult<GetNotificationDedupeData, GetNotificationDedupeVariables>;
```

### Variables
The `GetNotificationDedupe` Query requires an argument of type `GetNotificationDedupeVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetNotificationDedupeVariables {
  recipientId: string;
  dedupeKey: string;
}
```
### Return Type
Recall that calling the `GetNotificationDedupe` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetNotificationDedupe` Query is of type `GetNotificationDedupeData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetNotificationDedupeData {
  notifications: ({
    id: UUIDString;
  } & Notification_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetNotificationDedupe`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetNotificationDedupeVariables } from '@bondcircle/dataconnect';
import { useGetNotificationDedupe } from '@bondcircle/dataconnect/react'

export default function GetNotificationDedupeComponent() {
  // The `useGetNotificationDedupe` Query hook requires an argument of type `GetNotificationDedupeVariables`:
  const getNotificationDedupeVars: GetNotificationDedupeVariables = {
    recipientId: ..., 
    dedupeKey: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetNotificationDedupe(getNotificationDedupeVars);
  // Variables can be defined inline as well.
  const query = useGetNotificationDedupe({ recipientId: ..., dedupeKey: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetNotificationDedupe(dataConnect, getNotificationDedupeVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetNotificationDedupe(getNotificationDedupeVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetNotificationDedupe(dataConnect, getNotificationDedupeVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.notifications);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetRecentReminderNotifications
You can execute the `GetRecentReminderNotifications` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetRecentReminderNotifications(dc: DataConnect, vars: GetRecentReminderNotificationsVariables, options?: useDataConnectQueryOptions<GetRecentReminderNotificationsData>): UseDataConnectQueryResult<GetRecentReminderNotificationsData, GetRecentReminderNotificationsVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetRecentReminderNotifications(vars: GetRecentReminderNotificationsVariables, options?: useDataConnectQueryOptions<GetRecentReminderNotificationsData>): UseDataConnectQueryResult<GetRecentReminderNotificationsData, GetRecentReminderNotificationsVariables>;
```

### Variables
The `GetRecentReminderNotifications` Query requires an argument of type `GetRecentReminderNotificationsVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetRecentReminderNotificationsVariables {
  circleId: UUIDString;
  recipientId: string;
  since: TimestampString;
}
```
### Return Type
Recall that calling the `GetRecentReminderNotifications` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetRecentReminderNotifications` Query is of type `GetRecentReminderNotificationsData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetRecentReminderNotificationsData {
  notifications: ({
    id: UUIDString;
  } & Notification_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetRecentReminderNotifications`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetRecentReminderNotificationsVariables } from '@bondcircle/dataconnect';
import { useGetRecentReminderNotifications } from '@bondcircle/dataconnect/react'

export default function GetRecentReminderNotificationsComponent() {
  // The `useGetRecentReminderNotifications` Query hook requires an argument of type `GetRecentReminderNotificationsVariables`:
  const getRecentReminderNotificationsVars: GetRecentReminderNotificationsVariables = {
    circleId: ..., 
    recipientId: ..., 
    since: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetRecentReminderNotifications(getRecentReminderNotificationsVars);
  // Variables can be defined inline as well.
  const query = useGetRecentReminderNotifications({ circleId: ..., recipientId: ..., since: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetRecentReminderNotifications(dataConnect, getRecentReminderNotificationsVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetRecentReminderNotifications(getRecentReminderNotificationsVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetRecentReminderNotifications(dataConnect, getRecentReminderNotificationsVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.notifications);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## FindNotificationRecipientByEmail
You can execute the `FindNotificationRecipientByEmail` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useFindNotificationRecipientByEmail(dc: DataConnect, vars: FindNotificationRecipientByEmailVariables, options?: useDataConnectQueryOptions<FindNotificationRecipientByEmailData>): UseDataConnectQueryResult<FindNotificationRecipientByEmailData, FindNotificationRecipientByEmailVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useFindNotificationRecipientByEmail(vars: FindNotificationRecipientByEmailVariables, options?: useDataConnectQueryOptions<FindNotificationRecipientByEmailData>): UseDataConnectQueryResult<FindNotificationRecipientByEmailData, FindNotificationRecipientByEmailVariables>;
```

### Variables
The `FindNotificationRecipientByEmail` Query requires an argument of type `FindNotificationRecipientByEmailVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface FindNotificationRecipientByEmailVariables {
  email: string;
}
```
### Return Type
Recall that calling the `FindNotificationRecipientByEmail` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `FindNotificationRecipientByEmail` Query is of type `FindNotificationRecipientByEmailData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `FindNotificationRecipientByEmail`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, FindNotificationRecipientByEmailVariables } from '@bondcircle/dataconnect';
import { useFindNotificationRecipientByEmail } from '@bondcircle/dataconnect/react'

export default function FindNotificationRecipientByEmailComponent() {
  // The `useFindNotificationRecipientByEmail` Query hook requires an argument of type `FindNotificationRecipientByEmailVariables`:
  const findNotificationRecipientByEmailVars: FindNotificationRecipientByEmailVariables = {
    email: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useFindNotificationRecipientByEmail(findNotificationRecipientByEmailVars);
  // Variables can be defined inline as well.
  const query = useFindNotificationRecipientByEmail({ email: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useFindNotificationRecipientByEmail(dataConnect, findNotificationRecipientByEmailVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useFindNotificationRecipientByEmail(findNotificationRecipientByEmailVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useFindNotificationRecipientByEmail(dataConnect, findNotificationRecipientByEmailVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.users);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetDeadlineNotificationCandidates
You can execute the `GetDeadlineNotificationCandidates` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetDeadlineNotificationCandidates(dc: DataConnect, vars: GetDeadlineNotificationCandidatesVariables, options?: useDataConnectQueryOptions<GetDeadlineNotificationCandidatesData>): UseDataConnectQueryResult<GetDeadlineNotificationCandidatesData, GetDeadlineNotificationCandidatesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetDeadlineNotificationCandidates(vars: GetDeadlineNotificationCandidatesVariables, options?: useDataConnectQueryOptions<GetDeadlineNotificationCandidatesData>): UseDataConnectQueryResult<GetDeadlineNotificationCandidatesData, GetDeadlineNotificationCandidatesVariables>;
```

### Variables
The `GetDeadlineNotificationCandidates` Query requires an argument of type `GetDeadlineNotificationCandidatesVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetDeadlineNotificationCandidatesVariables {
  from: DateString;
  to: DateString;
}
```
### Return Type
Recall that calling the `GetDeadlineNotificationCandidates` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetDeadlineNotificationCandidates` Query is of type `GetDeadlineNotificationCandidatesData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetDeadlineNotificationCandidatesData {
  circles: ({
    id: UUIDString;
    name: string;
    type: string;
    deadline?: DateString | null;
  } & Circle_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetDeadlineNotificationCandidates`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetDeadlineNotificationCandidatesVariables } from '@bondcircle/dataconnect';
import { useGetDeadlineNotificationCandidates } from '@bondcircle/dataconnect/react'

export default function GetDeadlineNotificationCandidatesComponent() {
  // The `useGetDeadlineNotificationCandidates` Query hook requires an argument of type `GetDeadlineNotificationCandidatesVariables`:
  const getDeadlineNotificationCandidatesVars: GetDeadlineNotificationCandidatesVariables = {
    from: ..., 
    to: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetDeadlineNotificationCandidates(getDeadlineNotificationCandidatesVars);
  // Variables can be defined inline as well.
  const query = useGetDeadlineNotificationCandidates({ from: ..., to: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetDeadlineNotificationCandidates(dataConnect, getDeadlineNotificationCandidatesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetDeadlineNotificationCandidates(getDeadlineNotificationCandidatesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetDeadlineNotificationCandidates(dataConnect, getDeadlineNotificationCandidatesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circles);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetUserDeadlineNotificationCandidates
You can execute the `GetUserDeadlineNotificationCandidates` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetUserDeadlineNotificationCandidates(dc: DataConnect, vars: GetUserDeadlineNotificationCandidatesVariables, options?: useDataConnectQueryOptions<GetUserDeadlineNotificationCandidatesData>): UseDataConnectQueryResult<GetUserDeadlineNotificationCandidatesData, GetUserDeadlineNotificationCandidatesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetUserDeadlineNotificationCandidates(vars: GetUserDeadlineNotificationCandidatesVariables, options?: useDataConnectQueryOptions<GetUserDeadlineNotificationCandidatesData>): UseDataConnectQueryResult<GetUserDeadlineNotificationCandidatesData, GetUserDeadlineNotificationCandidatesVariables>;
```

### Variables
The `GetUserDeadlineNotificationCandidates` Query requires an argument of type `GetUserDeadlineNotificationCandidatesVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetUserDeadlineNotificationCandidatesVariables {
  userId: string;
}
```
### Return Type
Recall that calling the `GetUserDeadlineNotificationCandidates` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetUserDeadlineNotificationCandidates` Query is of type `GetUserDeadlineNotificationCandidatesData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetUserDeadlineNotificationCandidates`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetUserDeadlineNotificationCandidatesVariables } from '@bondcircle/dataconnect';
import { useGetUserDeadlineNotificationCandidates } from '@bondcircle/dataconnect/react'

export default function GetUserDeadlineNotificationCandidatesComponent() {
  // The `useGetUserDeadlineNotificationCandidates` Query hook requires an argument of type `GetUserDeadlineNotificationCandidatesVariables`:
  const getUserDeadlineNotificationCandidatesVars: GetUserDeadlineNotificationCandidatesVariables = {
    userId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetUserDeadlineNotificationCandidates(getUserDeadlineNotificationCandidatesVars);
  // Variables can be defined inline as well.
  const query = useGetUserDeadlineNotificationCandidates({ userId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetUserDeadlineNotificationCandidates(dataConnect, getUserDeadlineNotificationCandidatesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserDeadlineNotificationCandidates(getUserDeadlineNotificationCandidatesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetUserDeadlineNotificationCandidates(dataConnect, getUserDeadlineNotificationCandidatesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circleMemberships);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetRetentionCandidates
You can execute the `GetRetentionCandidates` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetRetentionCandidates(dc: DataConnect, vars: GetRetentionCandidatesVariables, options?: useDataConnectQueryOptions<GetRetentionCandidatesData>): UseDataConnectQueryResult<GetRetentionCandidatesData, GetRetentionCandidatesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetRetentionCandidates(vars: GetRetentionCandidatesVariables, options?: useDataConnectQueryOptions<GetRetentionCandidatesData>): UseDataConnectQueryResult<GetRetentionCandidatesData, GetRetentionCandidatesVariables>;
```

### Variables
The `GetRetentionCandidates` Query requires an argument of type `GetRetentionCandidatesVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetRetentionCandidatesVariables {
  now: TimestampString;
}
```
### Return Type
Recall that calling the `GetRetentionCandidates` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetRetentionCandidates` Query is of type `GetRetentionCandidatesData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface GetRetentionCandidatesData {
  circles: ({
    id: UUIDString;
    retentionDueAt?: TimestampString | null;
  } & Circle_Key)[];
}
```

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetRetentionCandidates`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetRetentionCandidatesVariables } from '@bondcircle/dataconnect';
import { useGetRetentionCandidates } from '@bondcircle/dataconnect/react'

export default function GetRetentionCandidatesComponent() {
  // The `useGetRetentionCandidates` Query hook requires an argument of type `GetRetentionCandidatesVariables`:
  const getRetentionCandidatesVars: GetRetentionCandidatesVariables = {
    now: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetRetentionCandidates(getRetentionCandidatesVars);
  // Variables can be defined inline as well.
  const query = useGetRetentionCandidates({ now: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetRetentionCandidates(dataConnect, getRetentionCandidatesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetRetentionCandidates(getRetentionCandidatesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetRetentionCandidates(dataConnect, getRetentionCandidatesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circles);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetCircleRetentionPayload
You can execute the `GetCircleRetentionPayload` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetCircleRetentionPayload(dc: DataConnect, vars: GetCircleRetentionPayloadVariables, options?: useDataConnectQueryOptions<GetCircleRetentionPayloadData>): UseDataConnectQueryResult<GetCircleRetentionPayloadData, GetCircleRetentionPayloadVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetCircleRetentionPayload(vars: GetCircleRetentionPayloadVariables, options?: useDataConnectQueryOptions<GetCircleRetentionPayloadData>): UseDataConnectQueryResult<GetCircleRetentionPayloadData, GetCircleRetentionPayloadVariables>;
```

### Variables
The `GetCircleRetentionPayload` Query requires an argument of type `GetCircleRetentionPayloadVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetCircleRetentionPayloadVariables {
  circleId: UUIDString;
}
```
### Return Type
Recall that calling the `GetCircleRetentionPayload` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetCircleRetentionPayload` Query is of type `GetCircleRetentionPayloadData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetCircleRetentionPayload`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetCircleRetentionPayloadVariables } from '@bondcircle/dataconnect';
import { useGetCircleRetentionPayload } from '@bondcircle/dataconnect/react'

export default function GetCircleRetentionPayloadComponent() {
  // The `useGetCircleRetentionPayload` Query hook requires an argument of type `GetCircleRetentionPayloadVariables`:
  const getCircleRetentionPayloadVars: GetCircleRetentionPayloadVariables = {
    circleId: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetCircleRetentionPayload(getCircleRetentionPayloadVars);
  // Variables can be defined inline as well.
  const query = useGetCircleRetentionPayload({ circleId: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetCircleRetentionPayload(dataConnect, getCircleRetentionPayloadVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetCircleRetentionPayload(getCircleRetentionPayloadVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetCircleRetentionPayload(dataConnect, getCircleRetentionPayloadVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circle);
    console.log(query.data.receipts);
    console.log(query.data.circleMemberships);
    console.log(query.data.asoEbiTiers);
    console.log(query.data.retentionPurgeAttempts);
    console.log(query.data.invitations);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## GetStoragePathReferences
You can execute the `GetStoragePathReferences` Query using the following Query hook function, which is defined in [dataconnect/react/index.d.ts](./index.d.ts):

```javascript
useGetStoragePathReferences(dc: DataConnect, vars: GetStoragePathReferencesVariables, options?: useDataConnectQueryOptions<GetStoragePathReferencesData>): UseDataConnectQueryResult<GetStoragePathReferencesData, GetStoragePathReferencesVariables>;
```
You can also pass in a `DataConnect` instance to the Query hook function.
```javascript
useGetStoragePathReferences(vars: GetStoragePathReferencesVariables, options?: useDataConnectQueryOptions<GetStoragePathReferencesData>): UseDataConnectQueryResult<GetStoragePathReferencesData, GetStoragePathReferencesVariables>;
```

### Variables
The `GetStoragePathReferences` Query requires an argument of type `GetStoragePathReferencesVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface GetStoragePathReferencesVariables {
  path: string;
}
```
### Return Type
Recall that calling the `GetStoragePathReferences` Query hook function returns a `UseQueryResult` object. This object holds the state of your Query, including whether the Query is loading, has completed, or has succeeded/failed, and any data returned by the Query, among other things.

To check the status of a Query, use the `UseQueryResult.status` field. You can also check for pending / success / error status using the `UseQueryResult.isPending`, `UseQueryResult.isSuccess`, and `UseQueryResult.isError` fields.

To access the data returned by a Query, use the `UseQueryResult.data` field. The data for the `GetStoragePathReferences` Query is of type `GetStoragePathReferencesData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseQueryResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useQuery).

### Using `GetStoragePathReferences`'s Query hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, GetStoragePathReferencesVariables } from '@bondcircle/dataconnect';
import { useGetStoragePathReferences } from '@bondcircle/dataconnect/react'

export default function GetStoragePathReferencesComponent() {
  // The `useGetStoragePathReferences` Query hook requires an argument of type `GetStoragePathReferencesVariables`:
  const getStoragePathReferencesVars: GetStoragePathReferencesVariables = {
    path: ..., 
  };

  // You don't have to do anything to "execute" the Query.
  // Call the Query hook function to get a `UseQueryResult` object which holds the state of your Query.
  const query = useGetStoragePathReferences(getStoragePathReferencesVars);
  // Variables can be defined inline as well.
  const query = useGetStoragePathReferences({ path: ..., });

  // You can also pass in a `DataConnect` instance to the Query hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const query = useGetStoragePathReferences(dataConnect, getStoragePathReferencesVars);

  // You can also pass in a `useDataConnectQueryOptions` object to the Query hook function.
  const options = { staleTime: 5 * 1000 };
  const query = useGetStoragePathReferences(getStoragePathReferencesVars, options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectQueryOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = { staleTime: 5 * 1000 };
  const query = useGetStoragePathReferences(dataConnect, getStoragePathReferencesVars, options);

  // Then, you can render your component dynamically based on the status of the Query.
  if (query.isPending) {
    return <div>Loading...</div>;
  }

  if (query.isError) {
    return <div>Error: {query.error.message}</div>;
  }

  // If the Query is successful, you can access the data returned using the `UseQueryResult.data` field.
  if (query.isSuccess) {
    console.log(query.data.circles);
    console.log(query.data.receipts);
    console.log(query.data.circleMemberships);
    console.log(query.data.fabricReferences);
    console.log(query.data.giftReferences);
  }
  return <div>Query execution {query.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

# Mutations

The React generated SDK provides Mutations hook functions that call and return [`useDataConnectMutation`](https://react-query-firebase.invertase.dev/react/data-connect/mutations) hooks from TanStack Query Firebase.

Calling these hook functions will return a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, and the most recent data returned by the Mutation, among other things. To learn more about these hooks and how to use them, see the [TanStack Query Firebase documentation](https://react-query-firebase.invertase.dev/react/data-connect/mutations).

Mutation hooks do not execute their Mutations automatically when called. Rather, after calling the Mutation hook function and getting a `UseMutationResult` object, you must call the `UseMutationResult.mutate()` function to execute the Mutation.

To learn more about TanStack React Query's Mutations, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations).

## Using Mutation Hooks
Here's a general overview of how to use the generated Mutation hooks in your code:

- Mutation hook functions are not called with the arguments to the Mutation. Instead, arguments are passed to `UseMutationResult.mutate()`.
- If the Mutation has no variables, the `mutate()` function does not require arguments.
- If the Mutation has any required variables, the `mutate()` function will require at least one argument: an object that contains all the required variables for the Mutation.
- If the Mutation has some required and some optional variables, only required variables are necessary in the variables argument object, and optional variables may be provided as well.
- If all of the Mutation's variables are optional, the Mutation hook function does not require any arguments.
- Mutation hook functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.
- Mutation hooks also accept an `options` argument of type `useDataConnectMutationOptions`. To learn more about the `options` argument, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/guides/mutations#mutation-side-effects).
  - `UseMutationResult.mutate()` also accepts an `options` argument of type `useDataConnectMutationOptions`.
  - ***Special case:*** If the Mutation has no arguments (or all optional arguments and you wish to provide none), and you want to pass `options` to `UseMutationResult.mutate()`, you must pass `undefined` where you would normally pass the Mutation's arguments, and then may provide the options argument.

Below are examples of how to use the `bondcircle` connector's generated Mutation hook functions to execute each Mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#operations-react-angular).

## UpsertCurrentUser
You can execute the `UpsertCurrentUser` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useUpsertCurrentUser(options?: useDataConnectMutationOptions<UpsertCurrentUserData, FirebaseError, UpsertCurrentUserVariables>): UseDataConnectMutationResult<UpsertCurrentUserData, UpsertCurrentUserVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpsertCurrentUser(dc: DataConnect, options?: useDataConnectMutationOptions<UpsertCurrentUserData, FirebaseError, UpsertCurrentUserVariables>): UseDataConnectMutationResult<UpsertCurrentUserData, UpsertCurrentUserVariables>;
```

### Variables
The `UpsertCurrentUser` Mutation requires an argument of type `UpsertCurrentUserVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpsertCurrentUser` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpsertCurrentUser` Mutation is of type `UpsertCurrentUserData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpsertCurrentUserData {
  user_upsert: User_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpsertCurrentUser`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpsertCurrentUserVariables } from '@bondcircle/dataconnect';
import { useUpsertCurrentUser } from '@bondcircle/dataconnect/react'

export default function UpsertCurrentUserComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpsertCurrentUser();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpsertCurrentUser(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertCurrentUser(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpsertCurrentUser(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpsertCurrentUser` Mutation requires an argument of type `UpsertCurrentUserVariables`:
  const upsertCurrentUserVars: UpsertCurrentUserVariables = {
    displayName: ..., 
    phone: ..., // optional
    email: ..., // optional
    profileImage: ..., // optional
    termsAcceptedAt: ..., // optional
    privacyAcceptedAt: ..., // optional
  };
  mutation.mutate(upsertCurrentUserVars);
  // Variables can be defined inline as well.
  mutation.mutate({ displayName: ..., phone: ..., email: ..., profileImage: ..., termsAcceptedAt: ..., privacyAcceptedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(upsertCurrentUserVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.user_upsert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateCircleDraft
You can execute the `CreateCircleDraft` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateCircleDraft(options?: useDataConnectMutationOptions<CreateCircleDraftData, FirebaseError, CreateCircleDraftVariables>): UseDataConnectMutationResult<CreateCircleDraftData, CreateCircleDraftVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateCircleDraft(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCircleDraftData, FirebaseError, CreateCircleDraftVariables>): UseDataConnectMutationResult<CreateCircleDraftData, CreateCircleDraftVariables>;
```

### Variables
The `CreateCircleDraft` Mutation requires an argument of type `CreateCircleDraftVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateCircleDraft` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateCircleDraft` Mutation is of type `CreateCircleDraftData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateCircleDraftData {
  circle_insert: Circle_Key;
  circleMembership_insert: CircleMembership_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateCircleDraft`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateCircleDraftVariables } from '@bondcircle/dataconnect';
import { useCreateCircleDraft } from '@bondcircle/dataconnect/react'

export default function CreateCircleDraftComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateCircleDraft();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateCircleDraft(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateCircleDraft(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateCircleDraft(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateCircleDraft` Mutation requires an argument of type `CreateCircleDraftVariables`:
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
  mutation.mutate(createCircleDraftVars);
  // Variables can be defined inline as well.
  mutation.mutate({ creatorId: ..., name: ..., type: ..., description: ..., targetAmount: ..., pricingPlan: ..., memberLimit: ..., activationPrice: ..., deadline: ..., eventDate: ..., visibility: ..., createdAt: ..., updatedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createCircleDraftVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circle_insert);
    console.log(mutation.data.circleMembership_insert);
    console.log(mutation.data.circleAuditEntry_insert);
    console.log(mutation.data.activityLog_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateCircleConfigurationWithAudit
You can execute the `UpdateCircleConfigurationWithAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateCircleConfigurationWithAudit(options?: useDataConnectMutationOptions<UpdateCircleConfigurationWithAuditData, FirebaseError, UpdateCircleConfigurationWithAuditVariables>): UseDataConnectMutationResult<UpdateCircleConfigurationWithAuditData, UpdateCircleConfigurationWithAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateCircleConfigurationWithAudit(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCircleConfigurationWithAuditData, FirebaseError, UpdateCircleConfigurationWithAuditVariables>): UseDataConnectMutationResult<UpdateCircleConfigurationWithAuditData, UpdateCircleConfigurationWithAuditVariables>;
```

### Variables
The `UpdateCircleConfigurationWithAudit` Mutation requires an argument of type `UpdateCircleConfigurationWithAuditVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateCircleConfigurationWithAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateCircleConfigurationWithAudit` Mutation is of type `UpdateCircleConfigurationWithAuditData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateCircleConfigurationWithAuditData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateCircleConfigurationWithAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateCircleConfigurationWithAuditVariables } from '@bondcircle/dataconnect';
import { useUpdateCircleConfigurationWithAudit } from '@bondcircle/dataconnect/react'

export default function UpdateCircleConfigurationWithAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateCircleConfigurationWithAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateCircleConfigurationWithAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateCircleConfigurationWithAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateCircleConfigurationWithAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateCircleConfigurationWithAudit` Mutation requires an argument of type `UpdateCircleConfigurationWithAuditVariables`:
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
  mutation.mutate(updateCircleConfigurationWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., actorId: ..., action: ..., status: ..., name: ..., description: ..., targetAmount: ..., pricingPlan: ..., memberLimit: ..., activationPrice: ..., deadline: ..., eventDate: ..., visibility: ..., updatedAt: ..., materialChanges: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateCircleConfigurationWithAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circle_update);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## TransitionCircleWithAudit
You can execute the `TransitionCircleWithAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useTransitionCircleWithAudit(options?: useDataConnectMutationOptions<TransitionCircleWithAuditData, FirebaseError, TransitionCircleWithAuditVariables>): UseDataConnectMutationResult<TransitionCircleWithAuditData, TransitionCircleWithAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useTransitionCircleWithAudit(dc: DataConnect, options?: useDataConnectMutationOptions<TransitionCircleWithAuditData, FirebaseError, TransitionCircleWithAuditVariables>): UseDataConnectMutationResult<TransitionCircleWithAuditData, TransitionCircleWithAuditVariables>;
```

### Variables
The `TransitionCircleWithAudit` Mutation requires an argument of type `TransitionCircleWithAuditVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `TransitionCircleWithAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `TransitionCircleWithAudit` Mutation is of type `TransitionCircleWithAuditData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface TransitionCircleWithAuditData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `TransitionCircleWithAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, TransitionCircleWithAuditVariables } from '@bondcircle/dataconnect';
import { useTransitionCircleWithAudit } from '@bondcircle/dataconnect/react'

export default function TransitionCircleWithAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useTransitionCircleWithAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useTransitionCircleWithAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useTransitionCircleWithAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useTransitionCircleWithAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useTransitionCircleWithAudit` Mutation requires an argument of type `TransitionCircleWithAuditVariables`:
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
  mutation.mutate(transitionCircleWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., actorId: ..., fromStatus: ..., toStatus: ..., updatedAt: ..., completedAt: ..., retentionDueAt: ..., archiveAt: ..., purgeAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(transitionCircleWithAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circle_update);
    console.log(mutation.data.circleAuditEntry_insert);
    console.log(mutation.data.activityLog_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SetCircleCompletionTypeWithAudit
You can execute the `SetCircleCompletionTypeWithAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useSetCircleCompletionTypeWithAudit(options?: useDataConnectMutationOptions<SetCircleCompletionTypeWithAuditData, FirebaseError, SetCircleCompletionTypeWithAuditVariables>): UseDataConnectMutationResult<SetCircleCompletionTypeWithAuditData, SetCircleCompletionTypeWithAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSetCircleCompletionTypeWithAudit(dc: DataConnect, options?: useDataConnectMutationOptions<SetCircleCompletionTypeWithAuditData, FirebaseError, SetCircleCompletionTypeWithAuditVariables>): UseDataConnectMutationResult<SetCircleCompletionTypeWithAuditData, SetCircleCompletionTypeWithAuditVariables>;
```

### Variables
The `SetCircleCompletionTypeWithAudit` Mutation requires an argument of type `SetCircleCompletionTypeWithAuditVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SetCircleCompletionTypeWithAuditVariables {
  circleId: UUIDString;
  actorId: string;
  completionType: string;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that calling the `SetCircleCompletionTypeWithAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SetCircleCompletionTypeWithAudit` Mutation is of type `SetCircleCompletionTypeWithAuditData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SetCircleCompletionTypeWithAuditData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SetCircleCompletionTypeWithAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SetCircleCompletionTypeWithAuditVariables } from '@bondcircle/dataconnect';
import { useSetCircleCompletionTypeWithAudit } from '@bondcircle/dataconnect/react'

export default function SetCircleCompletionTypeWithAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSetCircleCompletionTypeWithAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSetCircleCompletionTypeWithAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetCircleCompletionTypeWithAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetCircleCompletionTypeWithAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSetCircleCompletionTypeWithAudit` Mutation requires an argument of type `SetCircleCompletionTypeWithAuditVariables`:
  const setCircleCompletionTypeWithAuditVars: SetCircleCompletionTypeWithAuditVariables = {
    circleId: ..., 
    actorId: ..., 
    completionType: ..., 
    updatedAt: ..., 
  };
  mutation.mutate(setCircleCompletionTypeWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., actorId: ..., completionType: ..., updatedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(setCircleCompletionTypeWithAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circle_update);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AddCircleMemberWithAudit
You can execute the `AddCircleMemberWithAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useAddCircleMemberWithAudit(options?: useDataConnectMutationOptions<AddCircleMemberWithAuditData, FirebaseError, AddCircleMemberWithAuditVariables>): UseDataConnectMutationResult<AddCircleMemberWithAuditData, AddCircleMemberWithAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAddCircleMemberWithAudit(dc: DataConnect, options?: useDataConnectMutationOptions<AddCircleMemberWithAuditData, FirebaseError, AddCircleMemberWithAuditVariables>): UseDataConnectMutationResult<AddCircleMemberWithAuditData, AddCircleMemberWithAuditVariables>;
```

### Variables
The `AddCircleMemberWithAudit` Mutation requires an argument of type `AddCircleMemberWithAuditVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface AddCircleMemberWithAuditVariables {
  circleId: UUIDString;
  actorId: string;
  memberId: string;
  role: string;
  createdAt: TimestampString;
}
```
### Return Type
Recall that calling the `AddCircleMemberWithAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AddCircleMemberWithAudit` Mutation is of type `AddCircleMemberWithAuditData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AddCircleMemberWithAuditData {
  circleMembership_insert: CircleMembership_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AddCircleMemberWithAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AddCircleMemberWithAuditVariables } from '@bondcircle/dataconnect';
import { useAddCircleMemberWithAudit } from '@bondcircle/dataconnect/react'

export default function AddCircleMemberWithAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAddCircleMemberWithAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAddCircleMemberWithAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddCircleMemberWithAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAddCircleMemberWithAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAddCircleMemberWithAudit` Mutation requires an argument of type `AddCircleMemberWithAuditVariables`:
  const addCircleMemberWithAuditVars: AddCircleMemberWithAuditVariables = {
    circleId: ..., 
    actorId: ..., 
    memberId: ..., 
    role: ..., 
    createdAt: ..., 
  };
  mutation.mutate(addCircleMemberWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., actorId: ..., memberId: ..., role: ..., createdAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(addCircleMemberWithAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circleMembership_insert);
    console.log(mutation.data.circleAuditEntry_insert);
    console.log(mutation.data.activityLog_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ConfigureGiftCircle
You can execute the `ConfigureGiftCircle` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useConfigureGiftCircle(options?: useDataConnectMutationOptions<ConfigureGiftCircleData, FirebaseError, ConfigureGiftCircleVariables>): UseDataConnectMutationResult<ConfigureGiftCircleData, ConfigureGiftCircleVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useConfigureGiftCircle(dc: DataConnect, options?: useDataConnectMutationOptions<ConfigureGiftCircleData, FirebaseError, ConfigureGiftCircleVariables>): UseDataConnectMutationResult<ConfigureGiftCircleData, ConfigureGiftCircleVariables>;
```

### Variables
The `ConfigureGiftCircle` Mutation requires an argument of type `ConfigureGiftCircleVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ConfigureGiftCircle` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ConfigureGiftCircle` Mutation is of type `ConfigureGiftCircleData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ConfigureGiftCircleData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ConfigureGiftCircle`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ConfigureGiftCircleVariables } from '@bondcircle/dataconnect';
import { useConfigureGiftCircle } from '@bondcircle/dataconnect/react'

export default function ConfigureGiftCircleComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useConfigureGiftCircle();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useConfigureGiftCircle(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useConfigureGiftCircle(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useConfigureGiftCircle(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useConfigureGiftCircle` Mutation requires an argument of type `ConfigureGiftCircleVariables`:
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
  mutation.mutate(configureGiftCircleVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., actorId: ..., giftTitle: ..., contributionMode: ..., paymentBankName: ..., paymentAccountName: ..., paymentAccountNumber: ..., imageUrl: ..., imageStoragePath: ..., updatedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(configureGiftCircleVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circle_update);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SetGiftMemberAllocation
You can execute the `SetGiftMemberAllocation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useSetGiftMemberAllocation(options?: useDataConnectMutationOptions<SetGiftMemberAllocationData, FirebaseError, SetGiftMemberAllocationVariables>): UseDataConnectMutationResult<SetGiftMemberAllocationData, SetGiftMemberAllocationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSetGiftMemberAllocation(dc: DataConnect, options?: useDataConnectMutationOptions<SetGiftMemberAllocationData, FirebaseError, SetGiftMemberAllocationVariables>): UseDataConnectMutationResult<SetGiftMemberAllocationData, SetGiftMemberAllocationVariables>;
```

### Variables
The `SetGiftMemberAllocation` Mutation requires an argument of type `SetGiftMemberAllocationVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SetGiftMemberAllocationVariables {
  circleId: UUIDString;
  memberId: string;
  expectedAmount: number;
  contributionStatus: string;
}
```
### Return Type
Recall that calling the `SetGiftMemberAllocation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SetGiftMemberAllocation` Mutation is of type `SetGiftMemberAllocationData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SetGiftMemberAllocationData {
  circleMembership_update?: CircleMembership_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SetGiftMemberAllocation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SetGiftMemberAllocationVariables } from '@bondcircle/dataconnect';
import { useSetGiftMemberAllocation } from '@bondcircle/dataconnect/react'

export default function SetGiftMemberAllocationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSetGiftMemberAllocation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSetGiftMemberAllocation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetGiftMemberAllocation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetGiftMemberAllocation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSetGiftMemberAllocation` Mutation requires an argument of type `SetGiftMemberAllocationVariables`:
  const setGiftMemberAllocationVars: SetGiftMemberAllocationVariables = {
    circleId: ..., 
    memberId: ..., 
    expectedAmount: ..., 
    contributionStatus: ..., 
  };
  mutation.mutate(setGiftMemberAllocationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., memberId: ..., expectedAmount: ..., contributionStatus: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(setGiftMemberAllocationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circleMembership_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ConfigureAsoEbiCircle
You can execute the `ConfigureAsoEbiCircle` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useConfigureAsoEbiCircle(options?: useDataConnectMutationOptions<ConfigureAsoEbiCircleData, FirebaseError, ConfigureAsoEbiCircleVariables>): UseDataConnectMutationResult<ConfigureAsoEbiCircleData, ConfigureAsoEbiCircleVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useConfigureAsoEbiCircle(dc: DataConnect, options?: useDataConnectMutationOptions<ConfigureAsoEbiCircleData, FirebaseError, ConfigureAsoEbiCircleVariables>): UseDataConnectMutationResult<ConfigureAsoEbiCircleData, ConfigureAsoEbiCircleVariables>;
```

### Variables
The `ConfigureAsoEbiCircle` Mutation requires an argument of type `ConfigureAsoEbiCircleVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ConfigureAsoEbiCircle` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ConfigureAsoEbiCircle` Mutation is of type `ConfigureAsoEbiCircleData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ConfigureAsoEbiCircleData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ConfigureAsoEbiCircle`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ConfigureAsoEbiCircleVariables } from '@bondcircle/dataconnect';
import { useConfigureAsoEbiCircle } from '@bondcircle/dataconnect/react'

export default function ConfigureAsoEbiCircleComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useConfigureAsoEbiCircle();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useConfigureAsoEbiCircle(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useConfigureAsoEbiCircle(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useConfigureAsoEbiCircle(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useConfigureAsoEbiCircle` Mutation requires an argument of type `ConfigureAsoEbiCircleVariables`:
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
  mutation.mutate(configureAsoEbiCircleVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., actorId: ..., eventType: ..., organizerName: ..., paymentBankName: ..., paymentAccountName: ..., paymentAccountNumber: ..., imageUrl: ..., imageStoragePath: ..., updatedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(configureAsoEbiCircleVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circle_update);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateAsoEbiTier
You can execute the `CreateAsoEbiTier` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateAsoEbiTier(options?: useDataConnectMutationOptions<CreateAsoEbiTierData, FirebaseError, CreateAsoEbiTierVariables>): UseDataConnectMutationResult<CreateAsoEbiTierData, CreateAsoEbiTierVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateAsoEbiTier(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAsoEbiTierData, FirebaseError, CreateAsoEbiTierVariables>): UseDataConnectMutationResult<CreateAsoEbiTierData, CreateAsoEbiTierVariables>;
```

### Variables
The `CreateAsoEbiTier` Mutation requires an argument of type `CreateAsoEbiTierVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateAsoEbiTier` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateAsoEbiTier` Mutation is of type `CreateAsoEbiTierData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateAsoEbiTierData {
  asoEbiTier_insert: AsoEbiTier_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateAsoEbiTier`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateAsoEbiTierVariables } from '@bondcircle/dataconnect';
import { useCreateAsoEbiTier } from '@bondcircle/dataconnect/react'

export default function CreateAsoEbiTierComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateAsoEbiTier();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateAsoEbiTier(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAsoEbiTier(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAsoEbiTier(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateAsoEbiTier` Mutation requires an argument of type `CreateAsoEbiTierVariables`:
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
  mutation.mutate(createAsoEbiTierVars);
  // Variables can be defined inline as well.
  mutation.mutate({ tierId: ..., circleId: ..., name: ..., price: ..., fabricDescription: ..., fabricImageUrl: ..., fabricImageStoragePath: ..., appreciationGiftName: ..., appreciationGiftImageUrl: ..., appreciationGiftImageStoragePath: ..., availabilityNote: ..., deliveryDetails: ..., sortOrder: ..., createdAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createAsoEbiTierVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.asoEbiTier_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SelectAsoEbiTier
You can execute the `SelectAsoEbiTier` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useSelectAsoEbiTier(options?: useDataConnectMutationOptions<SelectAsoEbiTierData, FirebaseError, SelectAsoEbiTierVariables>): UseDataConnectMutationResult<SelectAsoEbiTierData, SelectAsoEbiTierVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSelectAsoEbiTier(dc: DataConnect, options?: useDataConnectMutationOptions<SelectAsoEbiTierData, FirebaseError, SelectAsoEbiTierVariables>): UseDataConnectMutationResult<SelectAsoEbiTierData, SelectAsoEbiTierVariables>;
```

### Variables
The `SelectAsoEbiTier` Mutation requires an argument of type `SelectAsoEbiTierVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SelectAsoEbiTierVariables {
  circleId: UUIDString;
  memberId: string;
  tierId: UUIDString;
  expectedAmount: number;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that calling the `SelectAsoEbiTier` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SelectAsoEbiTier` Mutation is of type `SelectAsoEbiTierData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SelectAsoEbiTierData {
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SelectAsoEbiTier`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SelectAsoEbiTierVariables } from '@bondcircle/dataconnect';
import { useSelectAsoEbiTier } from '@bondcircle/dataconnect/react'

export default function SelectAsoEbiTierComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSelectAsoEbiTier();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSelectAsoEbiTier(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSelectAsoEbiTier(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSelectAsoEbiTier(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSelectAsoEbiTier` Mutation requires an argument of type `SelectAsoEbiTierVariables`:
  const selectAsoEbiTierVars: SelectAsoEbiTierVariables = {
    circleId: ..., 
    memberId: ..., 
    tierId: ..., 
    expectedAmount: ..., 
    updatedAt: ..., 
  };
  mutation.mutate(selectAsoEbiTierVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., memberId: ..., tierId: ..., expectedAmount: ..., updatedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(selectAsoEbiTierVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circleMembership_update);
    console.log(mutation.data.circleAuditEntry_insert);
    console.log(mutation.data.activityLog_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateAsoEbiFulfilment
You can execute the `UpdateAsoEbiFulfilment` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateAsoEbiFulfilment(options?: useDataConnectMutationOptions<UpdateAsoEbiFulfilmentData, FirebaseError, UpdateAsoEbiFulfilmentVariables>): UseDataConnectMutationResult<UpdateAsoEbiFulfilmentData, UpdateAsoEbiFulfilmentVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateAsoEbiFulfilment(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAsoEbiFulfilmentData, FirebaseError, UpdateAsoEbiFulfilmentVariables>): UseDataConnectMutationResult<UpdateAsoEbiFulfilmentData, UpdateAsoEbiFulfilmentVariables>;
```

### Variables
The `UpdateAsoEbiFulfilment` Mutation requires an argument of type `UpdateAsoEbiFulfilmentVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface UpdateAsoEbiFulfilmentVariables {
  circleId: UUIDString;
  actorId: string;
  memberId: string;
  status: string;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that calling the `UpdateAsoEbiFulfilment` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateAsoEbiFulfilment` Mutation is of type `UpdateAsoEbiFulfilmentData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateAsoEbiFulfilmentData {
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateAsoEbiFulfilment`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateAsoEbiFulfilmentVariables } from '@bondcircle/dataconnect';
import { useUpdateAsoEbiFulfilment } from '@bondcircle/dataconnect/react'

export default function UpdateAsoEbiFulfilmentComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateAsoEbiFulfilment();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateAsoEbiFulfilment(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateAsoEbiFulfilment(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateAsoEbiFulfilment(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateAsoEbiFulfilment` Mutation requires an argument of type `UpdateAsoEbiFulfilmentVariables`:
  const updateAsoEbiFulfilmentVars: UpdateAsoEbiFulfilmentVariables = {
    circleId: ..., 
    actorId: ..., 
    memberId: ..., 
    status: ..., 
    updatedAt: ..., 
  };
  mutation.mutate(updateAsoEbiFulfilmentVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., actorId: ..., memberId: ..., status: ..., updatedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateAsoEbiFulfilmentVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circleMembership_update);
    console.log(mutation.data.circleAuditEntry_insert);
    console.log(mutation.data.activityLog_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ConfigureSupportCircle
You can execute the `ConfigureSupportCircle` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useConfigureSupportCircle(options?: useDataConnectMutationOptions<ConfigureSupportCircleData, FirebaseError, ConfigureSupportCircleVariables>): UseDataConnectMutationResult<ConfigureSupportCircleData, ConfigureSupportCircleVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useConfigureSupportCircle(dc: DataConnect, options?: useDataConnectMutationOptions<ConfigureSupportCircleData, FirebaseError, ConfigureSupportCircleVariables>): UseDataConnectMutationResult<ConfigureSupportCircleData, ConfigureSupportCircleVariables>;
```

### Variables
The `ConfigureSupportCircle` Mutation requires an argument of type `ConfigureSupportCircleVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ConfigureSupportCircle` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ConfigureSupportCircle` Mutation is of type `ConfigureSupportCircleData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ConfigureSupportCircleData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ConfigureSupportCircle`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ConfigureSupportCircleVariables } from '@bondcircle/dataconnect';
import { useConfigureSupportCircle } from '@bondcircle/dataconnect/react'

export default function ConfigureSupportCircleComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useConfigureSupportCircle();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useConfigureSupportCircle(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useConfigureSupportCircle(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useConfigureSupportCircle(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useConfigureSupportCircle` Mutation requires an argument of type `ConfigureSupportCircleVariables`:
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
  mutation.mutate(configureSupportCircleVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., actorId: ..., supportType: ..., beneficiaryName: ..., beneficiaryRelationship: ..., contributionMode: ..., showBeneficiaryName: ..., showTargetToMembers: ..., showConfirmedTotalToMembers: ..., hideIndividualAmounts: ..., requireCreatorApproval: ..., paymentBankName: ..., paymentAccountName: ..., paymentAccountNumber: ..., imageUrl: ..., imageStoragePath: ..., updatedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(configureSupportCircleVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circle_update);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RecordSupportPledge
You can execute the `RecordSupportPledge` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useRecordSupportPledge(options?: useDataConnectMutationOptions<RecordSupportPledgeData, FirebaseError, RecordSupportPledgeVariables>): UseDataConnectMutationResult<RecordSupportPledgeData, RecordSupportPledgeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRecordSupportPledge(dc: DataConnect, options?: useDataConnectMutationOptions<RecordSupportPledgeData, FirebaseError, RecordSupportPledgeVariables>): UseDataConnectMutationResult<RecordSupportPledgeData, RecordSupportPledgeVariables>;
```

### Variables
The `RecordSupportPledge` Mutation requires an argument of type `RecordSupportPledgeVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RecordSupportPledgeVariables {
  circleId: UUIDString;
  memberId: string;
  amount: number;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that calling the `RecordSupportPledge` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RecordSupportPledge` Mutation is of type `RecordSupportPledgeData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RecordSupportPledgeData {
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RecordSupportPledge`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RecordSupportPledgeVariables } from '@bondcircle/dataconnect';
import { useRecordSupportPledge } from '@bondcircle/dataconnect/react'

export default function RecordSupportPledgeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRecordSupportPledge();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRecordSupportPledge(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRecordSupportPledge(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRecordSupportPledge(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRecordSupportPledge` Mutation requires an argument of type `RecordSupportPledgeVariables`:
  const recordSupportPledgeVars: RecordSupportPledgeVariables = {
    circleId: ..., 
    memberId: ..., 
    amount: ..., 
    updatedAt: ..., 
  };
  mutation.mutate(recordSupportPledgeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., memberId: ..., amount: ..., updatedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(recordSupportPledgeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circleMembership_update);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SetSupportMemberAllocation
You can execute the `SetSupportMemberAllocation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useSetSupportMemberAllocation(options?: useDataConnectMutationOptions<SetSupportMemberAllocationData, FirebaseError, SetSupportMemberAllocationVariables>): UseDataConnectMutationResult<SetSupportMemberAllocationData, SetSupportMemberAllocationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSetSupportMemberAllocation(dc: DataConnect, options?: useDataConnectMutationOptions<SetSupportMemberAllocationData, FirebaseError, SetSupportMemberAllocationVariables>): UseDataConnectMutationResult<SetSupportMemberAllocationData, SetSupportMemberAllocationVariables>;
```

### Variables
The `SetSupportMemberAllocation` Mutation requires an argument of type `SetSupportMemberAllocationVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SetSupportMemberAllocationVariables {
  circleId: UUIDString;
  memberId: string;
  expectedAmount: number;
  contributionStatus: string;
}
```
### Return Type
Recall that calling the `SetSupportMemberAllocation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SetSupportMemberAllocation` Mutation is of type `SetSupportMemberAllocationData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SetSupportMemberAllocationData {
  circleMembership_update?: CircleMembership_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SetSupportMemberAllocation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SetSupportMemberAllocationVariables } from '@bondcircle/dataconnect';
import { useSetSupportMemberAllocation } from '@bondcircle/dataconnect/react'

export default function SetSupportMemberAllocationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSetSupportMemberAllocation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSetSupportMemberAllocation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetSupportMemberAllocation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetSupportMemberAllocation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSetSupportMemberAllocation` Mutation requires an argument of type `SetSupportMemberAllocationVariables`:
  const setSupportMemberAllocationVars: SetSupportMemberAllocationVariables = {
    circleId: ..., 
    memberId: ..., 
    expectedAmount: ..., 
    contributionStatus: ..., 
  };
  mutation.mutate(setSupportMemberAllocationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., memberId: ..., expectedAmount: ..., contributionStatus: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(setSupportMemberAllocationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circleMembership_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateSupportUpdate
You can execute the `CreateSupportUpdate` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateSupportUpdate(options?: useDataConnectMutationOptions<CreateSupportUpdateData, FirebaseError, CreateSupportUpdateVariables>): UseDataConnectMutationResult<CreateSupportUpdateData, CreateSupportUpdateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateSupportUpdate(dc: DataConnect, options?: useDataConnectMutationOptions<CreateSupportUpdateData, FirebaseError, CreateSupportUpdateVariables>): UseDataConnectMutationResult<CreateSupportUpdateData, CreateSupportUpdateVariables>;
```

### Variables
The `CreateSupportUpdate` Mutation requires an argument of type `CreateSupportUpdateVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateSupportUpdateVariables {
  circleId: UUIDString;
  authorId: string;
  body: string;
  createdAt: TimestampString;
}
```
### Return Type
Recall that calling the `CreateSupportUpdate` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateSupportUpdate` Mutation is of type `CreateSupportUpdateData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateSupportUpdateData {
  supportUpdate_insert: SupportUpdate_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateSupportUpdate`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateSupportUpdateVariables } from '@bondcircle/dataconnect';
import { useCreateSupportUpdate } from '@bondcircle/dataconnect/react'

export default function CreateSupportUpdateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateSupportUpdate();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateSupportUpdate(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateSupportUpdate(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateSupportUpdate(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateSupportUpdate` Mutation requires an argument of type `CreateSupportUpdateVariables`:
  const createSupportUpdateVars: CreateSupportUpdateVariables = {
    circleId: ..., 
    authorId: ..., 
    body: ..., 
    createdAt: ..., 
  };
  mutation.mutate(createSupportUpdateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., authorId: ..., body: ..., createdAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createSupportUpdateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.supportUpdate_insert);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SetSupportCompletionType
You can execute the `SetSupportCompletionType` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useSetSupportCompletionType(options?: useDataConnectMutationOptions<SetSupportCompletionTypeData, FirebaseError, SetSupportCompletionTypeVariables>): UseDataConnectMutationResult<SetSupportCompletionTypeData, SetSupportCompletionTypeVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSetSupportCompletionType(dc: DataConnect, options?: useDataConnectMutationOptions<SetSupportCompletionTypeData, FirebaseError, SetSupportCompletionTypeVariables>): UseDataConnectMutationResult<SetSupportCompletionTypeData, SetSupportCompletionTypeVariables>;
```

### Variables
The `SetSupportCompletionType` Mutation requires an argument of type `SetSupportCompletionTypeVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SetSupportCompletionTypeVariables {
  circleId: UUIDString;
  actorId: string;
  completionType: string;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that calling the `SetSupportCompletionType` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SetSupportCompletionType` Mutation is of type `SetSupportCompletionTypeData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SetSupportCompletionTypeData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SetSupportCompletionType`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SetSupportCompletionTypeVariables } from '@bondcircle/dataconnect';
import { useSetSupportCompletionType } from '@bondcircle/dataconnect/react'

export default function SetSupportCompletionTypeComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSetSupportCompletionType();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSetSupportCompletionType(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetSupportCompletionType(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetSupportCompletionType(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSetSupportCompletionType` Mutation requires an argument of type `SetSupportCompletionTypeVariables`:
  const setSupportCompletionTypeVars: SetSupportCompletionTypeVariables = {
    circleId: ..., 
    actorId: ..., 
    completionType: ..., 
    updatedAt: ..., 
  };
  mutation.mutate(setSupportCompletionTypeVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., actorId: ..., completionType: ..., updatedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(setSupportCompletionTypeVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circle_update);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateInvitation
You can execute the `CreateInvitation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateInvitation(options?: useDataConnectMutationOptions<CreateInvitationData, FirebaseError, CreateInvitationVariables>): UseDataConnectMutationResult<CreateInvitationData, CreateInvitationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateInvitation(dc: DataConnect, options?: useDataConnectMutationOptions<CreateInvitationData, FirebaseError, CreateInvitationVariables>): UseDataConnectMutationResult<CreateInvitationData, CreateInvitationVariables>;
```

### Variables
The `CreateInvitation` Mutation requires an argument of type `CreateInvitationVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateInvitation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateInvitation` Mutation is of type `CreateInvitationData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateInvitationData {
  invitation_insert: Invitation_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateInvitation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateInvitationVariables } from '@bondcircle/dataconnect';
import { useCreateInvitation } from '@bondcircle/dataconnect/react'

export default function CreateInvitationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateInvitation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateInvitation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateInvitation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateInvitation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateInvitation` Mutation requires an argument of type `CreateInvitationVariables`:
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
  mutation.mutate(createInvitationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., invitedById: ..., tokenHash: ..., mode: ..., recipientName: ..., recipientEmail: ..., recipientPhone: ..., expectedAmount: ..., requireApproval: ..., maxUses: ..., expiresAt: ..., createdAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createInvitationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invitation_insert);
    console.log(mutation.data.circleAuditEntry_insert);
    console.log(mutation.data.activityLog_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateInvitationState
You can execute the `UpdateInvitationState` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateInvitationState(options?: useDataConnectMutationOptions<UpdateInvitationStateData, FirebaseError, UpdateInvitationStateVariables>): UseDataConnectMutationResult<UpdateInvitationStateData, UpdateInvitationStateVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateInvitationState(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateInvitationStateData, FirebaseError, UpdateInvitationStateVariables>): UseDataConnectMutationResult<UpdateInvitationStateData, UpdateInvitationStateVariables>;
```

### Variables
The `UpdateInvitationState` Mutation requires an argument of type `UpdateInvitationStateVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateInvitationState` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateInvitationState` Mutation is of type `UpdateInvitationStateData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateInvitationStateData {
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateInvitationState`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateInvitationStateVariables } from '@bondcircle/dataconnect';
import { useUpdateInvitationState } from '@bondcircle/dataconnect/react'

export default function UpdateInvitationStateComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateInvitationState();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateInvitationState(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateInvitationState(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateInvitationState(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateInvitationState` Mutation requires an argument of type `UpdateInvitationStateVariables`:
  const updateInvitationStateVars: UpdateInvitationStateVariables = {
    invitationId: ..., 
    actorId: ..., 
    circleId: ..., 
    state: ..., 
    openedAt: ..., // optional
    revokedAt: ..., // optional
    updatedAt: ..., 
  };
  mutation.mutate(updateInvitationStateVars);
  // Variables can be defined inline as well.
  mutation.mutate({ invitationId: ..., actorId: ..., circleId: ..., state: ..., openedAt: ..., revokedAt: ..., updatedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateInvitationStateVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invitation_update);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## AcceptInvitationWithMembership
You can execute the `AcceptInvitationWithMembership` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useAcceptInvitationWithMembership(options?: useDataConnectMutationOptions<AcceptInvitationWithMembershipData, FirebaseError, AcceptInvitationWithMembershipVariables>): UseDataConnectMutationResult<AcceptInvitationWithMembershipData, AcceptInvitationWithMembershipVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useAcceptInvitationWithMembership(dc: DataConnect, options?: useDataConnectMutationOptions<AcceptInvitationWithMembershipData, FirebaseError, AcceptInvitationWithMembershipVariables>): UseDataConnectMutationResult<AcceptInvitationWithMembershipData, AcceptInvitationWithMembershipVariables>;
```

### Variables
The `AcceptInvitationWithMembership` Mutation requires an argument of type `AcceptInvitationWithMembershipVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `AcceptInvitationWithMembership` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `AcceptInvitationWithMembership` Mutation is of type `AcceptInvitationWithMembershipData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface AcceptInvitationWithMembershipData {
  circleMembership_insert: CircleMembership_Key;
  invitationAcceptance_insert: InvitationAcceptance_Key;
  circle_update?: Circle_Key | null;
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `AcceptInvitationWithMembership`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, AcceptInvitationWithMembershipVariables } from '@bondcircle/dataconnect';
import { useAcceptInvitationWithMembership } from '@bondcircle/dataconnect/react'

export default function AcceptInvitationWithMembershipComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useAcceptInvitationWithMembership();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useAcceptInvitationWithMembership(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAcceptInvitationWithMembership(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useAcceptInvitationWithMembership(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useAcceptInvitationWithMembership` Mutation requires an argument of type `AcceptInvitationWithMembershipVariables`:
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
  mutation.mutate(acceptInvitationWithMembershipVars);
  // Variables can be defined inline as well.
  mutation.mutate({ invitationId: ..., circleId: ..., userId: ..., role: ..., expectedAmount: ..., nextMemberCount: ..., nextInvitationState: ..., nextUseCount: ..., respondedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(acceptInvitationWithMembershipVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circleMembership_insert);
    console.log(mutation.data.invitationAcceptance_insert);
    console.log(mutation.data.circle_update);
    console.log(mutation.data.invitation_update);
    console.log(mutation.data.circleAuditEntry_insert);
    console.log(mutation.data.activityLog_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RequestInvitationApproval
You can execute the `RequestInvitationApproval` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useRequestInvitationApproval(options?: useDataConnectMutationOptions<RequestInvitationApprovalData, FirebaseError, RequestInvitationApprovalVariables>): UseDataConnectMutationResult<RequestInvitationApprovalData, RequestInvitationApprovalVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRequestInvitationApproval(dc: DataConnect, options?: useDataConnectMutationOptions<RequestInvitationApprovalData, FirebaseError, RequestInvitationApprovalVariables>): UseDataConnectMutationResult<RequestInvitationApprovalData, RequestInvitationApprovalVariables>;
```

### Variables
The `RequestInvitationApproval` Mutation requires an argument of type `RequestInvitationApprovalVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RequestInvitationApprovalVariables {
  invitationId: UUIDString;
  circleId: UUIDString;
  userId: string;
  respondedAt: TimestampString;
}
```
### Return Type
Recall that calling the `RequestInvitationApproval` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RequestInvitationApproval` Mutation is of type `RequestInvitationApprovalData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RequestInvitationApprovalData {
  invitationAcceptance_insert: InvitationAcceptance_Key;
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RequestInvitationApproval`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RequestInvitationApprovalVariables } from '@bondcircle/dataconnect';
import { useRequestInvitationApproval } from '@bondcircle/dataconnect/react'

export default function RequestInvitationApprovalComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRequestInvitationApproval();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRequestInvitationApproval(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRequestInvitationApproval(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRequestInvitationApproval(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRequestInvitationApproval` Mutation requires an argument of type `RequestInvitationApprovalVariables`:
  const requestInvitationApprovalVars: RequestInvitationApprovalVariables = {
    invitationId: ..., 
    circleId: ..., 
    userId: ..., 
    respondedAt: ..., 
  };
  mutation.mutate(requestInvitationApprovalVars);
  // Variables can be defined inline as well.
  mutation.mutate({ invitationId: ..., circleId: ..., userId: ..., respondedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(requestInvitationApprovalVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invitationAcceptance_insert);
    console.log(mutation.data.invitation_update);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SubmitReceiptWithAudit
You can execute the `SubmitReceiptWithAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useSubmitReceiptWithAudit(options?: useDataConnectMutationOptions<SubmitReceiptWithAuditData, FirebaseError, SubmitReceiptWithAuditVariables>): UseDataConnectMutationResult<SubmitReceiptWithAuditData, SubmitReceiptWithAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSubmitReceiptWithAudit(dc: DataConnect, options?: useDataConnectMutationOptions<SubmitReceiptWithAuditData, FirebaseError, SubmitReceiptWithAuditVariables>): UseDataConnectMutationResult<SubmitReceiptWithAuditData, SubmitReceiptWithAuditVariables>;
```

### Variables
The `SubmitReceiptWithAudit` Mutation requires an argument of type `SubmitReceiptWithAuditVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `SubmitReceiptWithAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SubmitReceiptWithAudit` Mutation is of type `SubmitReceiptWithAuditData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SubmitReceiptWithAuditData {
  receipt_insert: Receipt_Key;
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SubmitReceiptWithAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SubmitReceiptWithAuditVariables } from '@bondcircle/dataconnect';
import { useSubmitReceiptWithAudit } from '@bondcircle/dataconnect/react'

export default function SubmitReceiptWithAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSubmitReceiptWithAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSubmitReceiptWithAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSubmitReceiptWithAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSubmitReceiptWithAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSubmitReceiptWithAudit` Mutation requires an argument of type `SubmitReceiptWithAuditVariables`:
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
  mutation.mutate(submitReceiptWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., circleId: ..., uploaderId: ..., amount: ..., note: ..., imageUrl: ..., imageStoragePath: ..., contentType: ..., status: ..., overpaymentAmount: ..., submittedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(submitReceiptWithAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.receipt_insert);
    console.log(mutation.data.circleMembership_update);
    console.log(mutation.data.circleAuditEntry_insert);
    console.log(mutation.data.activityLog_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReplaceReceiptWithAudit
You can execute the `ReplaceReceiptWithAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useReplaceReceiptWithAudit(options?: useDataConnectMutationOptions<ReplaceReceiptWithAuditData, FirebaseError, ReplaceReceiptWithAuditVariables>): UseDataConnectMutationResult<ReplaceReceiptWithAuditData, ReplaceReceiptWithAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReplaceReceiptWithAudit(dc: DataConnect, options?: useDataConnectMutationOptions<ReplaceReceiptWithAuditData, FirebaseError, ReplaceReceiptWithAuditVariables>): UseDataConnectMutationResult<ReplaceReceiptWithAuditData, ReplaceReceiptWithAuditVariables>;
```

### Variables
The `ReplaceReceiptWithAudit` Mutation requires an argument of type `ReplaceReceiptWithAuditVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ReplaceReceiptWithAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReplaceReceiptWithAudit` Mutation is of type `ReplaceReceiptWithAuditData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReplaceReceiptWithAuditData {
  receipt_update?: Receipt_Key | null;
  receipt_insert: Receipt_Key;
  circleMembership_update?: CircleMembership_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReplaceReceiptWithAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReplaceReceiptWithAuditVariables } from '@bondcircle/dataconnect';
import { useReplaceReceiptWithAudit } from '@bondcircle/dataconnect/react'

export default function ReplaceReceiptWithAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReplaceReceiptWithAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReplaceReceiptWithAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReplaceReceiptWithAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReplaceReceiptWithAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReplaceReceiptWithAudit` Mutation requires an argument of type `ReplaceReceiptWithAuditVariables`:
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
  mutation.mutate(replaceReceiptWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., replacedReceiptId: ..., circleId: ..., uploaderId: ..., amount: ..., note: ..., imageUrl: ..., imageStoragePath: ..., contentType: ..., status: ..., overpaymentAmount: ..., submittedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(replaceReceiptWithAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.receipt_update);
    console.log(mutation.data.receipt_insert);
    console.log(mutation.data.circleMembership_update);
    console.log(mutation.data.circleAuditEntry_insert);
    console.log(mutation.data.activityLog_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReviewReceiptWithAudit
You can execute the `ReviewReceiptWithAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useReviewReceiptWithAudit(options?: useDataConnectMutationOptions<ReviewReceiptWithAuditData, FirebaseError, ReviewReceiptWithAuditVariables>): UseDataConnectMutationResult<ReviewReceiptWithAuditData, ReviewReceiptWithAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReviewReceiptWithAudit(dc: DataConnect, options?: useDataConnectMutationOptions<ReviewReceiptWithAuditData, FirebaseError, ReviewReceiptWithAuditVariables>): UseDataConnectMutationResult<ReviewReceiptWithAuditData, ReviewReceiptWithAuditVariables>;
```

### Variables
The `ReviewReceiptWithAudit` Mutation requires an argument of type `ReviewReceiptWithAuditVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ReviewReceiptWithAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReviewReceiptWithAudit` Mutation is of type `ReviewReceiptWithAuditData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReviewReceiptWithAuditData {
  receipt_update?: Receipt_Key | null;
  circleMembership_update?: CircleMembership_Key | null;
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReviewReceiptWithAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReviewReceiptWithAuditVariables } from '@bondcircle/dataconnect';
import { useReviewReceiptWithAudit } from '@bondcircle/dataconnect/react'

export default function ReviewReceiptWithAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReviewReceiptWithAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReviewReceiptWithAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReviewReceiptWithAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReviewReceiptWithAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReviewReceiptWithAudit` Mutation requires an argument of type `ReviewReceiptWithAuditVariables`:
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
  mutation.mutate(reviewReceiptWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ receiptId: ..., circleId: ..., uploaderId: ..., reviewerId: ..., receiptStatus: ..., rejectionReason: ..., reviewedAt: ..., membershipStatus: ..., nextConfirmedAmount: ..., nextCircleContributedAmount: ..., auditAction: ..., materialChanges: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reviewReceiptWithAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.receipt_update);
    console.log(mutation.data.circleMembership_update);
    console.log(mutation.data.circle_update);
    console.log(mutation.data.circleAuditEntry_insert);
    console.log(mutation.data.activityLog_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ApproveInvitationMembership
You can execute the `ApproveInvitationMembership` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useApproveInvitationMembership(options?: useDataConnectMutationOptions<ApproveInvitationMembershipData, FirebaseError, ApproveInvitationMembershipVariables>): UseDataConnectMutationResult<ApproveInvitationMembershipData, ApproveInvitationMembershipVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useApproveInvitationMembership(dc: DataConnect, options?: useDataConnectMutationOptions<ApproveInvitationMembershipData, FirebaseError, ApproveInvitationMembershipVariables>): UseDataConnectMutationResult<ApproveInvitationMembershipData, ApproveInvitationMembershipVariables>;
```

### Variables
The `ApproveInvitationMembership` Mutation requires an argument of type `ApproveInvitationMembershipVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ApproveInvitationMembership` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ApproveInvitationMembership` Mutation is of type `ApproveInvitationMembershipData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ApproveInvitationMembershipData {
  circleMembership_insert: CircleMembership_Key;
  invitationAcceptance_update?: InvitationAcceptance_Key | null;
  circle_update?: Circle_Key | null;
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
  activityLog_insert: ActivityLog_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ApproveInvitationMembership`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ApproveInvitationMembershipVariables } from '@bondcircle/dataconnect';
import { useApproveInvitationMembership } from '@bondcircle/dataconnect/react'

export default function ApproveInvitationMembershipComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useApproveInvitationMembership();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useApproveInvitationMembership(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useApproveInvitationMembership(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useApproveInvitationMembership(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useApproveInvitationMembership` Mutation requires an argument of type `ApproveInvitationMembershipVariables`:
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
  mutation.mutate(approveInvitationMembershipVars);
  // Variables can be defined inline as well.
  mutation.mutate({ invitationId: ..., circleId: ..., actorId: ..., userId: ..., role: ..., expectedAmount: ..., nextMemberCount: ..., nextInvitationState: ..., nextUseCount: ..., respondedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(approveInvitationMembershipVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circleMembership_insert);
    console.log(mutation.data.invitationAcceptance_update);
    console.log(mutation.data.circle_update);
    console.log(mutation.data.invitation_update);
    console.log(mutation.data.circleAuditEntry_insert);
    console.log(mutation.data.activityLog_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeclineInvitation
You can execute the `DeclineInvitation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useDeclineInvitation(options?: useDataConnectMutationOptions<DeclineInvitationData, FirebaseError, DeclineInvitationVariables>): UseDataConnectMutationResult<DeclineInvitationData, DeclineInvitationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeclineInvitation(dc: DataConnect, options?: useDataConnectMutationOptions<DeclineInvitationData, FirebaseError, DeclineInvitationVariables>): UseDataConnectMutationResult<DeclineInvitationData, DeclineInvitationVariables>;
```

### Variables
The `DeclineInvitation` Mutation requires an argument of type `DeclineInvitationVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeclineInvitationVariables {
  invitationId: UUIDString;
  circleId: UUIDString;
  userId: string;
  state: string;
  respondedAt: TimestampString;
}
```
### Return Type
Recall that calling the `DeclineInvitation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeclineInvitation` Mutation is of type `DeclineInvitationData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeclineInvitationData {
  invitationAcceptance_insert: InvitationAcceptance_Key;
  invitation_update?: Invitation_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeclineInvitation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeclineInvitationVariables } from '@bondcircle/dataconnect';
import { useDeclineInvitation } from '@bondcircle/dataconnect/react'

export default function DeclineInvitationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeclineInvitation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeclineInvitation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeclineInvitation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeclineInvitation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeclineInvitation` Mutation requires an argument of type `DeclineInvitationVariables`:
  const declineInvitationVars: DeclineInvitationVariables = {
    invitationId: ..., 
    circleId: ..., 
    userId: ..., 
    state: ..., 
    respondedAt: ..., 
  };
  mutation.mutate(declineInvitationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ invitationId: ..., circleId: ..., userId: ..., state: ..., respondedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(declineInvitationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invitationAcceptance_insert);
    console.log(mutation.data.invitation_update);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RequestReplacementInvitation
You can execute the `RequestReplacementInvitation` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useRequestReplacementInvitation(options?: useDataConnectMutationOptions<RequestReplacementInvitationData, FirebaseError, RequestReplacementInvitationVariables>): UseDataConnectMutationResult<RequestReplacementInvitationData, RequestReplacementInvitationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRequestReplacementInvitation(dc: DataConnect, options?: useDataConnectMutationOptions<RequestReplacementInvitationData, FirebaseError, RequestReplacementInvitationVariables>): UseDataConnectMutationResult<RequestReplacementInvitationData, RequestReplacementInvitationVariables>;
```

### Variables
The `RequestReplacementInvitation` Mutation requires an argument of type `RequestReplacementInvitationVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface RequestReplacementInvitationVariables {
  invitationId: UUIDString;
  circleId: UUIDString;
  actorId: string;
  requestedAt: TimestampString;
}
```
### Return Type
Recall that calling the `RequestReplacementInvitation` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RequestReplacementInvitation` Mutation is of type `RequestReplacementInvitationData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RequestReplacementInvitationData {
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RequestReplacementInvitation`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RequestReplacementInvitationVariables } from '@bondcircle/dataconnect';
import { useRequestReplacementInvitation } from '@bondcircle/dataconnect/react'

export default function RequestReplacementInvitationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRequestReplacementInvitation();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRequestReplacementInvitation(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRequestReplacementInvitation(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRequestReplacementInvitation(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRequestReplacementInvitation` Mutation requires an argument of type `RequestReplacementInvitationVariables`:
  const requestReplacementInvitationVars: RequestReplacementInvitationVariables = {
    invitationId: ..., 
    circleId: ..., 
    actorId: ..., 
    requestedAt: ..., 
  };
  mutation.mutate(requestReplacementInvitationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ invitationId: ..., circleId: ..., actorId: ..., requestedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(requestReplacementInvitationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateAnnouncementWithActivity
You can execute the `CreateAnnouncementWithActivity` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateAnnouncementWithActivity(options?: useDataConnectMutationOptions<CreateAnnouncementWithActivityData, FirebaseError, CreateAnnouncementWithActivityVariables>): UseDataConnectMutationResult<CreateAnnouncementWithActivityData, CreateAnnouncementWithActivityVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateAnnouncementWithActivity(dc: DataConnect, options?: useDataConnectMutationOptions<CreateAnnouncementWithActivityData, FirebaseError, CreateAnnouncementWithActivityVariables>): UseDataConnectMutationResult<CreateAnnouncementWithActivityData, CreateAnnouncementWithActivityVariables>;
```

### Variables
The `CreateAnnouncementWithActivity` Mutation requires an argument of type `CreateAnnouncementWithActivityVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateAnnouncementWithActivity` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateAnnouncementWithActivity` Mutation is of type `CreateAnnouncementWithActivityData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateAnnouncementWithActivityData {
  announcement_insert: Announcement_Key;
  activityLog_insert: ActivityLog_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateAnnouncementWithActivity`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateAnnouncementWithActivityVariables } from '@bondcircle/dataconnect';
import { useCreateAnnouncementWithActivity } from '@bondcircle/dataconnect/react'

export default function CreateAnnouncementWithActivityComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateAnnouncementWithActivity();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateAnnouncementWithActivity(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAnnouncementWithActivity(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateAnnouncementWithActivity(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateAnnouncementWithActivity` Mutation requires an argument of type `CreateAnnouncementWithActivityVariables`:
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
  mutation.mutate(createAnnouncementWithActivityVars);
  // Variables can be defined inline as well.
  mutation.mutate({ announcementId: ..., announcementEntityId: ..., activityId: ..., circleId: ..., authorId: ..., title: ..., body: ..., pinned: ..., important: ..., commentsEnabled: ..., createdAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createAnnouncementWithActivityVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.announcement_insert);
    console.log(mutation.data.activityLog_insert);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateAnnouncementWithAudit
You can execute the `UpdateAnnouncementWithAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateAnnouncementWithAudit(options?: useDataConnectMutationOptions<UpdateAnnouncementWithAuditData, FirebaseError, UpdateAnnouncementWithAuditVariables>): UseDataConnectMutationResult<UpdateAnnouncementWithAuditData, UpdateAnnouncementWithAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateAnnouncementWithAudit(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateAnnouncementWithAuditData, FirebaseError, UpdateAnnouncementWithAuditVariables>): UseDataConnectMutationResult<UpdateAnnouncementWithAuditData, UpdateAnnouncementWithAuditVariables>;
```

### Variables
The `UpdateAnnouncementWithAudit` Mutation requires an argument of type `UpdateAnnouncementWithAuditVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateAnnouncementWithAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateAnnouncementWithAudit` Mutation is of type `UpdateAnnouncementWithAuditData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateAnnouncementWithAuditData {
  announcement_update?: Announcement_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateAnnouncementWithAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateAnnouncementWithAuditVariables } from '@bondcircle/dataconnect';
import { useUpdateAnnouncementWithAudit } from '@bondcircle/dataconnect/react'

export default function UpdateAnnouncementWithAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateAnnouncementWithAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateAnnouncementWithAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateAnnouncementWithAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateAnnouncementWithAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateAnnouncementWithAudit` Mutation requires an argument of type `UpdateAnnouncementWithAuditVariables`:
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
  mutation.mutate(updateAnnouncementWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ announcementId: ..., circleId: ..., actorId: ..., title: ..., body: ..., pinned: ..., important: ..., commentsEnabled: ..., updatedAt: ..., materialChanges: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateAnnouncementWithAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.announcement_update);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteAnnouncementWithAudit
You can execute the `DeleteAnnouncementWithAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteAnnouncementWithAudit(options?: useDataConnectMutationOptions<DeleteAnnouncementWithAuditData, FirebaseError, DeleteAnnouncementWithAuditVariables>): UseDataConnectMutationResult<DeleteAnnouncementWithAuditData, DeleteAnnouncementWithAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteAnnouncementWithAudit(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteAnnouncementWithAuditData, FirebaseError, DeleteAnnouncementWithAuditVariables>): UseDataConnectMutationResult<DeleteAnnouncementWithAuditData, DeleteAnnouncementWithAuditVariables>;
```

### Variables
The `DeleteAnnouncementWithAudit` Mutation requires an argument of type `DeleteAnnouncementWithAuditVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteAnnouncementWithAuditVariables {
  announcementId: UUIDString;
  announcementEntityId: string;
  circleId: UUIDString;
  actorId: string;
  deletedAt: TimestampString;
}
```
### Return Type
Recall that calling the `DeleteAnnouncementWithAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteAnnouncementWithAudit` Mutation is of type `DeleteAnnouncementWithAuditData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteAnnouncementWithAuditData {
  announcement_update?: Announcement_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteAnnouncementWithAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteAnnouncementWithAuditVariables } from '@bondcircle/dataconnect';
import { useDeleteAnnouncementWithAudit } from '@bondcircle/dataconnect/react'

export default function DeleteAnnouncementWithAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteAnnouncementWithAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteAnnouncementWithAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteAnnouncementWithAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteAnnouncementWithAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteAnnouncementWithAudit` Mutation requires an argument of type `DeleteAnnouncementWithAuditVariables`:
  const deleteAnnouncementWithAuditVars: DeleteAnnouncementWithAuditVariables = {
    announcementId: ..., 
    announcementEntityId: ..., 
    circleId: ..., 
    actorId: ..., 
    deletedAt: ..., 
  };
  mutation.mutate(deleteAnnouncementWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ announcementId: ..., announcementEntityId: ..., circleId: ..., actorId: ..., deletedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteAnnouncementWithAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.announcement_update);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SetCircleCommentsWithAudit
You can execute the `SetCircleCommentsWithAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useSetCircleCommentsWithAudit(options?: useDataConnectMutationOptions<SetCircleCommentsWithAuditData, FirebaseError, SetCircleCommentsWithAuditVariables>): UseDataConnectMutationResult<SetCircleCommentsWithAuditData, SetCircleCommentsWithAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSetCircleCommentsWithAudit(dc: DataConnect, options?: useDataConnectMutationOptions<SetCircleCommentsWithAuditData, FirebaseError, SetCircleCommentsWithAuditVariables>): UseDataConnectMutationResult<SetCircleCommentsWithAuditData, SetCircleCommentsWithAuditVariables>;
```

### Variables
The `SetCircleCommentsWithAudit` Mutation requires an argument of type `SetCircleCommentsWithAuditVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SetCircleCommentsWithAuditVariables {
  circleId: UUIDString;
  actorId: string;
  commentsEnabled: boolean;
  materialChanges: string;
  updatedAt: TimestampString;
}
```
### Return Type
Recall that calling the `SetCircleCommentsWithAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SetCircleCommentsWithAudit` Mutation is of type `SetCircleCommentsWithAuditData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SetCircleCommentsWithAuditData {
  circle_update?: Circle_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SetCircleCommentsWithAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SetCircleCommentsWithAuditVariables } from '@bondcircle/dataconnect';
import { useSetCircleCommentsWithAudit } from '@bondcircle/dataconnect/react'

export default function SetCircleCommentsWithAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSetCircleCommentsWithAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSetCircleCommentsWithAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetCircleCommentsWithAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetCircleCommentsWithAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSetCircleCommentsWithAudit` Mutation requires an argument of type `SetCircleCommentsWithAuditVariables`:
  const setCircleCommentsWithAuditVars: SetCircleCommentsWithAuditVariables = {
    circleId: ..., 
    actorId: ..., 
    commentsEnabled: ..., 
    materialChanges: ..., 
    updatedAt: ..., 
  };
  mutation.mutate(setCircleCommentsWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., actorId: ..., commentsEnabled: ..., materialChanges: ..., updatedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(setCircleCommentsWithAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circle_update);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateCommentWithActivity
You can execute the `CreateCommentWithActivity` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateCommentWithActivity(options?: useDataConnectMutationOptions<CreateCommentWithActivityData, FirebaseError, CreateCommentWithActivityVariables>): UseDataConnectMutationResult<CreateCommentWithActivityData, CreateCommentWithActivityVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateCommentWithActivity(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCommentWithActivityData, FirebaseError, CreateCommentWithActivityVariables>): UseDataConnectMutationResult<CreateCommentWithActivityData, CreateCommentWithActivityVariables>;
```

### Variables
The `CreateCommentWithActivity` Mutation requires an argument of type `CreateCommentWithActivityVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateCommentWithActivity` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateCommentWithActivity` Mutation is of type `CreateCommentWithActivityData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateCommentWithActivityData {
  comment_insert: Comment_Key;
  activityLog_insert: ActivityLog_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateCommentWithActivity`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateCommentWithActivityVariables } from '@bondcircle/dataconnect';
import { useCreateCommentWithActivity } from '@bondcircle/dataconnect/react'

export default function CreateCommentWithActivityComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateCommentWithActivity();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateCommentWithActivity(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateCommentWithActivity(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateCommentWithActivity(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateCommentWithActivity` Mutation requires an argument of type `CreateCommentWithActivityVariables`:
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
  mutation.mutate(createCommentWithActivityVars);
  // Variables can be defined inline as well.
  mutation.mutate({ commentId: ..., commentEntityId: ..., activityId: ..., circleId: ..., authorId: ..., announcementId: ..., parentCommentId: ..., body: ..., createdAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createCommentWithActivityVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.comment_insert);
    console.log(mutation.data.activityLog_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DeleteOwnCommentWithAudit
You can execute the `DeleteOwnCommentWithAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useDeleteOwnCommentWithAudit(options?: useDataConnectMutationOptions<DeleteOwnCommentWithAuditData, FirebaseError, DeleteOwnCommentWithAuditVariables>): UseDataConnectMutationResult<DeleteOwnCommentWithAuditData, DeleteOwnCommentWithAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDeleteOwnCommentWithAudit(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteOwnCommentWithAuditData, FirebaseError, DeleteOwnCommentWithAuditVariables>): UseDataConnectMutationResult<DeleteOwnCommentWithAuditData, DeleteOwnCommentWithAuditVariables>;
```

### Variables
The `DeleteOwnCommentWithAudit` Mutation requires an argument of type `DeleteOwnCommentWithAuditVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DeleteOwnCommentWithAuditVariables {
  commentId: UUIDString;
  commentEntityId: string;
  circleId: UUIDString;
  actorId: string;
  deletedAt: TimestampString;
}
```
### Return Type
Recall that calling the `DeleteOwnCommentWithAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DeleteOwnCommentWithAudit` Mutation is of type `DeleteOwnCommentWithAuditData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DeleteOwnCommentWithAuditData {
  comment_update?: Comment_Key | null;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DeleteOwnCommentWithAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DeleteOwnCommentWithAuditVariables } from '@bondcircle/dataconnect';
import { useDeleteOwnCommentWithAudit } from '@bondcircle/dataconnect/react'

export default function DeleteOwnCommentWithAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDeleteOwnCommentWithAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDeleteOwnCommentWithAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteOwnCommentWithAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDeleteOwnCommentWithAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDeleteOwnCommentWithAudit` Mutation requires an argument of type `DeleteOwnCommentWithAuditVariables`:
  const deleteOwnCommentWithAuditVars: DeleteOwnCommentWithAuditVariables = {
    commentId: ..., 
    commentEntityId: ..., 
    circleId: ..., 
    actorId: ..., 
    deletedAt: ..., 
  };
  mutation.mutate(deleteOwnCommentWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ commentId: ..., commentEntityId: ..., circleId: ..., actorId: ..., deletedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(deleteOwnCommentWithAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.comment_update);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ModerateCommentWithAudit
You can execute the `ModerateCommentWithAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useModerateCommentWithAudit(options?: useDataConnectMutationOptions<ModerateCommentWithAuditData, FirebaseError, ModerateCommentWithAuditVariables>): UseDataConnectMutationResult<ModerateCommentWithAuditData, ModerateCommentWithAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useModerateCommentWithAudit(dc: DataConnect, options?: useDataConnectMutationOptions<ModerateCommentWithAuditData, FirebaseError, ModerateCommentWithAuditVariables>): UseDataConnectMutationResult<ModerateCommentWithAuditData, ModerateCommentWithAuditVariables>;
```

### Variables
The `ModerateCommentWithAudit` Mutation requires an argument of type `ModerateCommentWithAuditVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface ModerateCommentWithAuditVariables {
  commentId: UUIDString;
  circleId: UUIDString;
  actorId: string;
  reason: string;
  moderatedAt: TimestampString;
}
```
### Return Type
Recall that calling the `ModerateCommentWithAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ModerateCommentWithAudit` Mutation is of type `ModerateCommentWithAuditData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ModerateCommentWithAuditData {
  comment_update?: Comment_Key | null;
  commentReport_updateMany: number;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ModerateCommentWithAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ModerateCommentWithAuditVariables } from '@bondcircle/dataconnect';
import { useModerateCommentWithAudit } from '@bondcircle/dataconnect/react'

export default function ModerateCommentWithAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useModerateCommentWithAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useModerateCommentWithAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useModerateCommentWithAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useModerateCommentWithAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useModerateCommentWithAudit` Mutation requires an argument of type `ModerateCommentWithAuditVariables`:
  const moderateCommentWithAuditVars: ModerateCommentWithAuditVariables = {
    commentId: ..., 
    circleId: ..., 
    actorId: ..., 
    reason: ..., 
    moderatedAt: ..., 
  };
  mutation.mutate(moderateCommentWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ commentId: ..., circleId: ..., actorId: ..., reason: ..., moderatedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(moderateCommentWithAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.comment_update);
    console.log(mutation.data.commentReport_updateMany);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## ReportCommentWithAudit
You can execute the `ReportCommentWithAudit` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useReportCommentWithAudit(options?: useDataConnectMutationOptions<ReportCommentWithAuditData, FirebaseError, ReportCommentWithAuditVariables>): UseDataConnectMutationResult<ReportCommentWithAuditData, ReportCommentWithAuditVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useReportCommentWithAudit(dc: DataConnect, options?: useDataConnectMutationOptions<ReportCommentWithAuditData, FirebaseError, ReportCommentWithAuditVariables>): UseDataConnectMutationResult<ReportCommentWithAuditData, ReportCommentWithAuditVariables>;
```

### Variables
The `ReportCommentWithAudit` Mutation requires an argument of type `ReportCommentWithAuditVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `ReportCommentWithAudit` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `ReportCommentWithAudit` Mutation is of type `ReportCommentWithAuditData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface ReportCommentWithAuditData {
  commentReport_insert: CommentReport_Key;
  circleAuditEntry_insert: CircleAuditEntry_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `ReportCommentWithAudit`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, ReportCommentWithAuditVariables } from '@bondcircle/dataconnect';
import { useReportCommentWithAudit } from '@bondcircle/dataconnect/react'

export default function ReportCommentWithAuditComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useReportCommentWithAudit();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useReportCommentWithAudit(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReportCommentWithAudit(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useReportCommentWithAudit(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useReportCommentWithAudit` Mutation requires an argument of type `ReportCommentWithAuditVariables`:
  const reportCommentWithAuditVars: ReportCommentWithAuditVariables = {
    reportId: ..., 
    commentId: ..., 
    commentEntityId: ..., 
    circleId: ..., 
    reporterId: ..., 
    reason: ..., 
    createdAt: ..., 
  };
  mutation.mutate(reportCommentWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ reportId: ..., commentId: ..., commentEntityId: ..., circleId: ..., reporterId: ..., reason: ..., createdAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(reportCommentWithAuditVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.commentReport_insert);
    console.log(mutation.data.circleAuditEntry_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## RecordSystemActivity
You can execute the `RecordSystemActivity` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useRecordSystemActivity(options?: useDataConnectMutationOptions<RecordSystemActivityData, FirebaseError, RecordSystemActivityVariables>): UseDataConnectMutationResult<RecordSystemActivityData, RecordSystemActivityVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useRecordSystemActivity(dc: DataConnect, options?: useDataConnectMutationOptions<RecordSystemActivityData, FirebaseError, RecordSystemActivityVariables>): UseDataConnectMutationResult<RecordSystemActivityData, RecordSystemActivityVariables>;
```

### Variables
The `RecordSystemActivity` Mutation requires an argument of type `RecordSystemActivityVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `RecordSystemActivity` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `RecordSystemActivity` Mutation is of type `RecordSystemActivityData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface RecordSystemActivityData {
  activityLog_insert: ActivityLog_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `RecordSystemActivity`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, RecordSystemActivityVariables } from '@bondcircle/dataconnect';
import { useRecordSystemActivity } from '@bondcircle/dataconnect/react'

export default function RecordSystemActivityComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useRecordSystemActivity();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useRecordSystemActivity(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRecordSystemActivity(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useRecordSystemActivity(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useRecordSystemActivity` Mutation requires an argument of type `RecordSystemActivityVariables`:
  const recordSystemActivityVars: RecordSystemActivityVariables = {
    activityId: ..., 
    circleId: ..., 
    actorId: ..., 
    eventType: ..., 
    entityId: ..., 
    metadata: ..., 
    createdAt: ..., 
  };
  mutation.mutate(recordSystemActivityVars);
  // Variables can be defined inline as well.
  mutation.mutate({ activityId: ..., circleId: ..., actorId: ..., eventType: ..., entityId: ..., metadata: ..., createdAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(recordSystemActivityVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.activityLog_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateNotification
You can execute the `CreateNotification` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateNotification(options?: useDataConnectMutationOptions<CreateNotificationData, FirebaseError, CreateNotificationVariables>): UseDataConnectMutationResult<CreateNotificationData, CreateNotificationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateNotification(dc: DataConnect, options?: useDataConnectMutationOptions<CreateNotificationData, FirebaseError, CreateNotificationVariables>): UseDataConnectMutationResult<CreateNotificationData, CreateNotificationVariables>;
```

### Variables
The `CreateNotification` Mutation requires an argument of type `CreateNotificationVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateNotification` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateNotification` Mutation is of type `CreateNotificationData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateNotificationData {
  notification_insert: Notification_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateNotification`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateNotificationVariables } from '@bondcircle/dataconnect';
import { useCreateNotification } from '@bondcircle/dataconnect/react'

export default function CreateNotificationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateNotification();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateNotification(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateNotification(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateNotification(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateNotification` Mutation requires an argument of type `CreateNotificationVariables`:
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
  mutation.mutate(createNotificationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ notificationId: ..., recipientId: ..., circleId: ..., type: ..., title: ..., body: ..., deepLink: ..., dedupeKey: ..., createdAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createNotificationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.notification_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## MarkNotificationRead
You can execute the `MarkNotificationRead` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useMarkNotificationRead(options?: useDataConnectMutationOptions<MarkNotificationReadData, FirebaseError, MarkNotificationReadVariables>): UseDataConnectMutationResult<MarkNotificationReadData, MarkNotificationReadVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useMarkNotificationRead(dc: DataConnect, options?: useDataConnectMutationOptions<MarkNotificationReadData, FirebaseError, MarkNotificationReadVariables>): UseDataConnectMutationResult<MarkNotificationReadData, MarkNotificationReadVariables>;
```

### Variables
The `MarkNotificationRead` Mutation requires an argument of type `MarkNotificationReadVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface MarkNotificationReadVariables {
  notificationId: UUIDString;
  recipientId: string;
  readAt: TimestampString;
}
```
### Return Type
Recall that calling the `MarkNotificationRead` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `MarkNotificationRead` Mutation is of type `MarkNotificationReadData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface MarkNotificationReadData {
  notification_updateMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `MarkNotificationRead`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, MarkNotificationReadVariables } from '@bondcircle/dataconnect';
import { useMarkNotificationRead } from '@bondcircle/dataconnect/react'

export default function MarkNotificationReadComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useMarkNotificationRead();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useMarkNotificationRead(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useMarkNotificationRead(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useMarkNotificationRead(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useMarkNotificationRead` Mutation requires an argument of type `MarkNotificationReadVariables`:
  const markNotificationReadVars: MarkNotificationReadVariables = {
    notificationId: ..., 
    recipientId: ..., 
    readAt: ..., 
  };
  mutation.mutate(markNotificationReadVars);
  // Variables can be defined inline as well.
  mutation.mutate({ notificationId: ..., recipientId: ..., readAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(markNotificationReadVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.notification_updateMany);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## DismissNotification
You can execute the `DismissNotification` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useDismissNotification(options?: useDataConnectMutationOptions<DismissNotificationData, FirebaseError, DismissNotificationVariables>): UseDataConnectMutationResult<DismissNotificationData, DismissNotificationVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useDismissNotification(dc: DataConnect, options?: useDataConnectMutationOptions<DismissNotificationData, FirebaseError, DismissNotificationVariables>): UseDataConnectMutationResult<DismissNotificationData, DismissNotificationVariables>;
```

### Variables
The `DismissNotification` Mutation requires an argument of type `DismissNotificationVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface DismissNotificationVariables {
  notificationId: UUIDString;
  recipientId: string;
  dismissedAt: TimestampString;
}
```
### Return Type
Recall that calling the `DismissNotification` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `DismissNotification` Mutation is of type `DismissNotificationData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface DismissNotificationData {
  notification_updateMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `DismissNotification`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, DismissNotificationVariables } from '@bondcircle/dataconnect';
import { useDismissNotification } from '@bondcircle/dataconnect/react'

export default function DismissNotificationComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useDismissNotification();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useDismissNotification(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDismissNotification(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useDismissNotification(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useDismissNotification` Mutation requires an argument of type `DismissNotificationVariables`:
  const dismissNotificationVars: DismissNotificationVariables = {
    notificationId: ..., 
    recipientId: ..., 
    dismissedAt: ..., 
  };
  mutation.mutate(dismissNotificationVars);
  // Variables can be defined inline as well.
  mutation.mutate({ notificationId: ..., recipientId: ..., dismissedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(dismissNotificationVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.notification_updateMany);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## MarkAllNotificationsRead
You can execute the `MarkAllNotificationsRead` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useMarkAllNotificationsRead(options?: useDataConnectMutationOptions<MarkAllNotificationsReadData, FirebaseError, MarkAllNotificationsReadVariables>): UseDataConnectMutationResult<MarkAllNotificationsReadData, MarkAllNotificationsReadVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useMarkAllNotificationsRead(dc: DataConnect, options?: useDataConnectMutationOptions<MarkAllNotificationsReadData, FirebaseError, MarkAllNotificationsReadVariables>): UseDataConnectMutationResult<MarkAllNotificationsReadData, MarkAllNotificationsReadVariables>;
```

### Variables
The `MarkAllNotificationsRead` Mutation requires an argument of type `MarkAllNotificationsReadVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface MarkAllNotificationsReadVariables {
  recipientId: string;
  readAt: TimestampString;
}
```
### Return Type
Recall that calling the `MarkAllNotificationsRead` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `MarkAllNotificationsRead` Mutation is of type `MarkAllNotificationsReadData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface MarkAllNotificationsReadData {
  notification_updateMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `MarkAllNotificationsRead`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, MarkAllNotificationsReadVariables } from '@bondcircle/dataconnect';
import { useMarkAllNotificationsRead } from '@bondcircle/dataconnect/react'

export default function MarkAllNotificationsReadComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useMarkAllNotificationsRead();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useMarkAllNotificationsRead(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useMarkAllNotificationsRead(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useMarkAllNotificationsRead(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useMarkAllNotificationsRead` Mutation requires an argument of type `MarkAllNotificationsReadVariables`:
  const markAllNotificationsReadVars: MarkAllNotificationsReadVariables = {
    recipientId: ..., 
    readAt: ..., 
  };
  mutation.mutate(markAllNotificationsReadVars);
  // Variables can be defined inline as well.
  mutation.mutate({ recipientId: ..., readAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(markAllNotificationsReadVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.notification_updateMany);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## UpdateNotificationPreferences
You can execute the `UpdateNotificationPreferences` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useUpdateNotificationPreferences(options?: useDataConnectMutationOptions<UpdateNotificationPreferencesData, FirebaseError, UpdateNotificationPreferencesVariables>): UseDataConnectMutationResult<UpdateNotificationPreferencesData, UpdateNotificationPreferencesVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useUpdateNotificationPreferences(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateNotificationPreferencesData, FirebaseError, UpdateNotificationPreferencesVariables>): UseDataConnectMutationResult<UpdateNotificationPreferencesData, UpdateNotificationPreferencesVariables>;
```

### Variables
The `UpdateNotificationPreferences` Mutation requires an argument of type `UpdateNotificationPreferencesVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `UpdateNotificationPreferences` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `UpdateNotificationPreferences` Mutation is of type `UpdateNotificationPreferencesData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface UpdateNotificationPreferencesData {
  user_update?: User_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `UpdateNotificationPreferences`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, UpdateNotificationPreferencesVariables } from '@bondcircle/dataconnect';
import { useUpdateNotificationPreferences } from '@bondcircle/dataconnect/react'

export default function UpdateNotificationPreferencesComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useUpdateNotificationPreferences();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useUpdateNotificationPreferences(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateNotificationPreferences(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useUpdateNotificationPreferences(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useUpdateNotificationPreferences` Mutation requires an argument of type `UpdateNotificationPreferencesVariables`:
  const updateNotificationPreferencesVars: UpdateNotificationPreferencesVariables = {
    userId: ..., 
    emailNotifications: ..., 
    browserPushNotifications: ..., 
    commentNotifications: ..., 
    contributionReminders: ..., 
    circleUpdateNotifications: ..., 
    marketingCommunication: ..., 
  };
  mutation.mutate(updateNotificationPreferencesVars);
  // Variables can be defined inline as well.
  mutation.mutate({ userId: ..., emailNotifications: ..., browserPushNotifications: ..., commentNotifications: ..., contributionReminders: ..., circleUpdateNotifications: ..., marketingCommunication: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(updateNotificationPreferencesVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.user_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## SetCircleNotificationMute
You can execute the `SetCircleNotificationMute` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useSetCircleNotificationMute(options?: useDataConnectMutationOptions<SetCircleNotificationMuteData, FirebaseError, SetCircleNotificationMuteVariables>): UseDataConnectMutationResult<SetCircleNotificationMuteData, SetCircleNotificationMuteVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useSetCircleNotificationMute(dc: DataConnect, options?: useDataConnectMutationOptions<SetCircleNotificationMuteData, FirebaseError, SetCircleNotificationMuteVariables>): UseDataConnectMutationResult<SetCircleNotificationMuteData, SetCircleNotificationMuteVariables>;
```

### Variables
The `SetCircleNotificationMute` Mutation requires an argument of type `SetCircleNotificationMuteVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface SetCircleNotificationMuteVariables {
  circleId: UUIDString;
  userId: string;
  notificationsMuted: boolean;
}
```
### Return Type
Recall that calling the `SetCircleNotificationMute` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `SetCircleNotificationMute` Mutation is of type `SetCircleNotificationMuteData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface SetCircleNotificationMuteData {
  circleMembership_update?: CircleMembership_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `SetCircleNotificationMute`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, SetCircleNotificationMuteVariables } from '@bondcircle/dataconnect';
import { useSetCircleNotificationMute } from '@bondcircle/dataconnect/react'

export default function SetCircleNotificationMuteComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useSetCircleNotificationMute();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useSetCircleNotificationMute(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetCircleNotificationMute(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useSetCircleNotificationMute(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useSetCircleNotificationMute` Mutation requires an argument of type `SetCircleNotificationMuteVariables`:
  const setCircleNotificationMuteVars: SetCircleNotificationMuteVariables = {
    circleId: ..., 
    userId: ..., 
    notificationsMuted: ..., 
  };
  mutation.mutate(setCircleNotificationMuteVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., userId: ..., notificationsMuted: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(setCircleNotificationMuteVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.circleMembership_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateEmailDelivery
You can execute the `CreateEmailDelivery` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateEmailDelivery(options?: useDataConnectMutationOptions<CreateEmailDeliveryData, FirebaseError, CreateEmailDeliveryVariables>): UseDataConnectMutationResult<CreateEmailDeliveryData, CreateEmailDeliveryVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateEmailDelivery(dc: DataConnect, options?: useDataConnectMutationOptions<CreateEmailDeliveryData, FirebaseError, CreateEmailDeliveryVariables>): UseDataConnectMutationResult<CreateEmailDeliveryData, CreateEmailDeliveryVariables>;
```

### Variables
The `CreateEmailDelivery` Mutation requires an argument of type `CreateEmailDeliveryVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CreateEmailDelivery` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateEmailDelivery` Mutation is of type `CreateEmailDeliveryData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateEmailDeliveryData {
  emailDelivery_insert: EmailDelivery_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateEmailDelivery`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateEmailDeliveryVariables } from '@bondcircle/dataconnect';
import { useCreateEmailDelivery } from '@bondcircle/dataconnect/react'

export default function CreateEmailDeliveryComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateEmailDelivery();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateEmailDelivery(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateEmailDelivery(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateEmailDelivery(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateEmailDelivery` Mutation requires an argument of type `CreateEmailDeliveryVariables`:
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
  mutation.mutate(createEmailDeliveryVars);
  // Variables can be defined inline as well.
  mutation.mutate({ deliveryId: ..., notificationId: ..., recipientId: ..., eventType: ..., destinationMasked: ..., status: ..., providerMessageId: ..., failureReason: ..., createdAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createEmailDeliveryVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.emailDelivery_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CreateRetentionPurgeAttempt
You can execute the `CreateRetentionPurgeAttempt` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useCreateRetentionPurgeAttempt(options?: useDataConnectMutationOptions<CreateRetentionPurgeAttemptData, FirebaseError, CreateRetentionPurgeAttemptVariables>): UseDataConnectMutationResult<CreateRetentionPurgeAttemptData, CreateRetentionPurgeAttemptVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCreateRetentionPurgeAttempt(dc: DataConnect, options?: useDataConnectMutationOptions<CreateRetentionPurgeAttemptData, FirebaseError, CreateRetentionPurgeAttemptVariables>): UseDataConnectMutationResult<CreateRetentionPurgeAttemptData, CreateRetentionPurgeAttemptVariables>;
```

### Variables
The `CreateRetentionPurgeAttempt` Mutation requires an argument of type `CreateRetentionPurgeAttemptVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface CreateRetentionPurgeAttemptVariables {
  attemptId: UUIDString;
  circleId: UUIDString;
  attemptNumber: number;
  startedAt: TimestampString;
}
```
### Return Type
Recall that calling the `CreateRetentionPurgeAttempt` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CreateRetentionPurgeAttempt` Mutation is of type `CreateRetentionPurgeAttemptData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CreateRetentionPurgeAttemptData {
  retentionPurgeAttempt_insert: RetentionPurgeAttempt_Key;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CreateRetentionPurgeAttempt`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CreateRetentionPurgeAttemptVariables } from '@bondcircle/dataconnect';
import { useCreateRetentionPurgeAttempt } from '@bondcircle/dataconnect/react'

export default function CreateRetentionPurgeAttemptComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCreateRetentionPurgeAttempt();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCreateRetentionPurgeAttempt(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateRetentionPurgeAttempt(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCreateRetentionPurgeAttempt(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCreateRetentionPurgeAttempt` Mutation requires an argument of type `CreateRetentionPurgeAttemptVariables`:
  const createRetentionPurgeAttemptVars: CreateRetentionPurgeAttemptVariables = {
    attemptId: ..., 
    circleId: ..., 
    attemptNumber: ..., 
    startedAt: ..., 
  };
  mutation.mutate(createRetentionPurgeAttemptVars);
  // Variables can be defined inline as well.
  mutation.mutate({ attemptId: ..., circleId: ..., attemptNumber: ..., startedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(createRetentionPurgeAttemptVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.retentionPurgeAttempt_insert);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## CompleteRetentionPurgeAttempt
You can execute the `CompleteRetentionPurgeAttempt` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
useCompleteRetentionPurgeAttempt(options?: useDataConnectMutationOptions<CompleteRetentionPurgeAttemptData, FirebaseError, CompleteRetentionPurgeAttemptVariables>): UseDataConnectMutationResult<CompleteRetentionPurgeAttemptData, CompleteRetentionPurgeAttemptVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
useCompleteRetentionPurgeAttempt(dc: DataConnect, options?: useDataConnectMutationOptions<CompleteRetentionPurgeAttemptData, FirebaseError, CompleteRetentionPurgeAttemptVariables>): UseDataConnectMutationResult<CompleteRetentionPurgeAttemptData, CompleteRetentionPurgeAttemptVariables>;
```

### Variables
The `CompleteRetentionPurgeAttempt` Mutation requires an argument of type `CompleteRetentionPurgeAttemptVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
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
Recall that calling the `CompleteRetentionPurgeAttempt` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `CompleteRetentionPurgeAttempt` Mutation is of type `CompleteRetentionPurgeAttemptData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface CompleteRetentionPurgeAttemptData {
  retentionPurgeAttempt_update?: RetentionPurgeAttempt_Key | null;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `CompleteRetentionPurgeAttempt`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, CompleteRetentionPurgeAttemptVariables } from '@bondcircle/dataconnect';
import { useCompleteRetentionPurgeAttempt } from '@bondcircle/dataconnect/react'

export default function CompleteRetentionPurgeAttemptComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = useCompleteRetentionPurgeAttempt();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = useCompleteRetentionPurgeAttempt(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCompleteRetentionPurgeAttempt(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = useCompleteRetentionPurgeAttempt(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `useCompleteRetentionPurgeAttempt` Mutation requires an argument of type `CompleteRetentionPurgeAttemptVariables`:
  const completeRetentionPurgeAttemptVars: CompleteRetentionPurgeAttemptVariables = {
    attemptId: ..., 
    status: ..., 
    deletedFileCount: ..., 
    skippedSharedFileCount: ..., 
    failureReason: ..., // optional
    nextRetryAt: ..., // optional
    completedAt: ..., 
  };
  mutation.mutate(completeRetentionPurgeAttemptVars);
  // Variables can be defined inline as well.
  mutation.mutate({ attemptId: ..., status: ..., deletedFileCount: ..., skippedSharedFileCount: ..., failureReason: ..., nextRetryAt: ..., completedAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(completeRetentionPurgeAttemptVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.retentionPurgeAttempt_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## PurgeInvitationAcceptances
You can execute the `PurgeInvitationAcceptances` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
usePurgeInvitationAcceptances(options?: useDataConnectMutationOptions<PurgeInvitationAcceptancesData, FirebaseError, PurgeInvitationAcceptancesVariables>): UseDataConnectMutationResult<PurgeInvitationAcceptancesData, PurgeInvitationAcceptancesVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
usePurgeInvitationAcceptances(dc: DataConnect, options?: useDataConnectMutationOptions<PurgeInvitationAcceptancesData, FirebaseError, PurgeInvitationAcceptancesVariables>): UseDataConnectMutationResult<PurgeInvitationAcceptancesData, PurgeInvitationAcceptancesVariables>;
```

### Variables
The `PurgeInvitationAcceptances` Mutation requires an argument of type `PurgeInvitationAcceptancesVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface PurgeInvitationAcceptancesVariables {
  invitationId: UUIDString;
}
```
### Return Type
Recall that calling the `PurgeInvitationAcceptances` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `PurgeInvitationAcceptances` Mutation is of type `PurgeInvitationAcceptancesData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
export interface PurgeInvitationAcceptancesData {
  invitationAcceptance_deleteMany: number;
}
```

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `PurgeInvitationAcceptances`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, PurgeInvitationAcceptancesVariables } from '@bondcircle/dataconnect';
import { usePurgeInvitationAcceptances } from '@bondcircle/dataconnect/react'

export default function PurgeInvitationAcceptancesComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = usePurgeInvitationAcceptances();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = usePurgeInvitationAcceptances(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = usePurgeInvitationAcceptances(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = usePurgeInvitationAcceptances(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `usePurgeInvitationAcceptances` Mutation requires an argument of type `PurgeInvitationAcceptancesVariables`:
  const purgeInvitationAcceptancesVars: PurgeInvitationAcceptancesVariables = {
    invitationId: ..., 
  };
  mutation.mutate(purgeInvitationAcceptancesVars);
  // Variables can be defined inline as well.
  mutation.mutate({ invitationId: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(purgeInvitationAcceptancesVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.invitationAcceptance_deleteMany);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

## PurgeCircleSensitiveData
You can execute the `PurgeCircleSensitiveData` Mutation using the `UseMutationResult` object returned by the following Mutation hook function (which is defined in [dataconnect/react/index.d.ts](./index.d.ts)):
```javascript
usePurgeCircleSensitiveData(options?: useDataConnectMutationOptions<PurgeCircleSensitiveDataData, FirebaseError, PurgeCircleSensitiveDataVariables>): UseDataConnectMutationResult<PurgeCircleSensitiveDataData, PurgeCircleSensitiveDataVariables>;
```
You can also pass in a `DataConnect` instance to the Mutation hook function.
```javascript
usePurgeCircleSensitiveData(dc: DataConnect, options?: useDataConnectMutationOptions<PurgeCircleSensitiveDataData, FirebaseError, PurgeCircleSensitiveDataVariables>): UseDataConnectMutationResult<PurgeCircleSensitiveDataData, PurgeCircleSensitiveDataVariables>;
```

### Variables
The `PurgeCircleSensitiveData` Mutation requires an argument of type `PurgeCircleSensitiveDataVariables`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:

```javascript
export interface PurgeCircleSensitiveDataVariables {
  circleId: UUIDString;
  purgeAt: TimestampString;
}
```
### Return Type
Recall that calling the `PurgeCircleSensitiveData` Mutation hook function returns a `UseMutationResult` object. This object holds the state of your Mutation, including whether the Mutation is loading, has completed, or has succeeded/failed, among other things.

To check the status of a Mutation, use the `UseMutationResult.status` field. You can also check for pending / success / error status using the `UseMutationResult.isPending`, `UseMutationResult.isSuccess`, and `UseMutationResult.isError` fields.

To execute the Mutation, call `UseMutationResult.mutate()`. This function executes the Mutation, but does not return the data from the Mutation.

To access the data returned by a Mutation, use the `UseMutationResult.data` field. The data for the `PurgeCircleSensitiveData` Mutation is of type `PurgeCircleSensitiveDataData`, which is defined in [dataconnect/index.d.ts](../index.d.ts). It has the following fields:
```javascript
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

To learn more about the `UseMutationResult` object, see the [TanStack React Query documentation](https://tanstack.com/query/v5/docs/framework/react/reference/useMutation).

### Using `PurgeCircleSensitiveData`'s Mutation hook function

```javascript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, PurgeCircleSensitiveDataVariables } from '@bondcircle/dataconnect';
import { usePurgeCircleSensitiveData } from '@bondcircle/dataconnect/react'

export default function PurgeCircleSensitiveDataComponent() {
  // Call the Mutation hook function to get a `UseMutationResult` object which holds the state of your Mutation.
  const mutation = usePurgeCircleSensitiveData();

  // You can also pass in a `DataConnect` instance to the Mutation hook function.
  const dataConnect = getDataConnect(connectorConfig);
  const mutation = usePurgeCircleSensitiveData(dataConnect);

  // You can also pass in a `useDataConnectMutationOptions` object to the Mutation hook function.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = usePurgeCircleSensitiveData(options);

  // You can also pass both a `DataConnect` instance and a `useDataConnectMutationOptions` object.
  const dataConnect = getDataConnect(connectorConfig);
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  const mutation = usePurgeCircleSensitiveData(dataConnect, options);

  // After calling the Mutation hook function, you must call `UseMutationResult.mutate()` to execute the Mutation.
  // The `usePurgeCircleSensitiveData` Mutation requires an argument of type `PurgeCircleSensitiveDataVariables`:
  const purgeCircleSensitiveDataVars: PurgeCircleSensitiveDataVariables = {
    circleId: ..., 
    purgeAt: ..., 
  };
  mutation.mutate(purgeCircleSensitiveDataVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., purgeAt: ..., });

  // You can also pass in a `useDataConnectMutationOptions` object to `UseMutationResult.mutate()`.
  const options = {
    onSuccess: () => { console.log('Mutation succeeded!'); }
  };
  mutation.mutate(purgeCircleSensitiveDataVars, options);

  // Then, you can render your component dynamically based on the status of the Mutation.
  if (mutation.isPending) {
    return <div>Loading...</div>;
  }

  if (mutation.isError) {
    return <div>Error: {mutation.error.message}</div>;
  }

  // If the Mutation is successful, you can access the data returned using the `UseMutationResult.data` field.
  if (mutation.isSuccess) {
    console.log(mutation.data.commentReport_deleteMany);
    console.log(mutation.data.comment_deleteMany);
    console.log(mutation.data.announcement_deleteMany);
    console.log(mutation.data.supportUpdate_deleteMany);
    console.log(mutation.data.receipt_deleteMany);
    console.log(mutation.data.invitation_deleteMany);
    console.log(mutation.data.notification_deleteMany);
    console.log(mutation.data.circleMembership_deleteMany);
    console.log(mutation.data.asoEbiTier_deleteMany);
    console.log(mutation.data.circle_update);
  }
  return <div>Mutation execution {mutation.isSuccess ? 'successful' : 'failed'}!</div>;
}
```

