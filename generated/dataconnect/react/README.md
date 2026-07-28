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
  - [*FindUserByEmail*](#finduserbyemail)
  - [*GetGiftCircleDetail*](#getgiftcircledetail)
  - [*GetCircleAuditEntries*](#getcircleauditentries)
- [**Mutations**](#mutations)
  - [*UpsertCurrentUser*](#upsertcurrentuser)
  - [*CreateCircleDraft*](#createcircledraft)
  - [*UpdateCircleConfigurationWithAudit*](#updatecircleconfigurationwithaudit)
  - [*TransitionCircleWithAudit*](#transitioncirclewithaudit)
  - [*AddCircleMemberWithAudit*](#addcirclememberwithaudit)
  - [*ConfigureGiftCircle*](#configuregiftcircle)
  - [*SetGiftMemberAllocation*](#setgiftmemberallocation)

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
    archiveAt: ..., // optional
    purgeAt: ..., // optional
  };
  mutation.mutate(transitionCircleWithAuditVars);
  // Variables can be defined inline as well.
  mutation.mutate({ circleId: ..., actorId: ..., fromStatus: ..., toStatus: ..., updatedAt: ..., completedAt: ..., archiveAt: ..., purgeAt: ..., });

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

