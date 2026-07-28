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

// Or, you can use the `Promise` API.
createCircleDraft(createCircleDraftVars).then((response) => {
  const data = response.data;
  console.log(data.circle_insert);
  console.log(data.circleMembership_insert);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circle_insert);
  console.log(data.circleMembership_insert);
  console.log(data.circleAuditEntry_insert);
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
  archiveAt: ..., // optional
  purgeAt: ..., // optional
};

// Call the `transitionCircleWithAudit()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await transitionCircleWithAudit(transitionCircleWithAuditVars);
// Variables can be defined inline as well.
const { data } = await transitionCircleWithAudit({ circleId: ..., actorId: ..., fromStatus: ..., toStatus: ..., updatedAt: ..., completedAt: ..., archiveAt: ..., purgeAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await transitionCircleWithAudit(dataConnect, transitionCircleWithAuditVars);

console.log(data.circle_update);
console.log(data.circleAuditEntry_insert);

// Or, you can use the `Promise` API.
transitionCircleWithAudit(transitionCircleWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
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
  archiveAt: ..., // optional
  purgeAt: ..., // optional
};

// Call the `transitionCircleWithAuditRef()` function to get a reference to the mutation.
const ref = transitionCircleWithAuditRef(transitionCircleWithAuditVars);
// Variables can be defined inline as well.
const ref = transitionCircleWithAuditRef({ circleId: ..., actorId: ..., fromStatus: ..., toStatus: ..., updatedAt: ..., completedAt: ..., archiveAt: ..., purgeAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = transitionCircleWithAuditRef(dataConnect, transitionCircleWithAuditVars);

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

// Or, you can use the `Promise` API.
addCircleMemberWithAudit(addCircleMemberWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_insert);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_insert);
  console.log(data.circleAuditEntry_insert);
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

