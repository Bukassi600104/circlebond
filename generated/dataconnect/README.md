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
  - [*GetAsoEbiCircleDetail*](#getasoebicircledetail)
  - [*GetSupportCircleDetail*](#getsupportcircledetail)
  - [*GetInvitationByTokenHash*](#getinvitationbytokenhash)
  - [*GetCircleInvitations*](#getcircleinvitations)
  - [*GetInvitationAcceptances*](#getinvitationacceptances)
  - [*GetContributionWorkspace*](#getcontributionworkspace)
- [**Mutations**](#mutations)
  - [*UpsertCurrentUser*](#upsertcurrentuser)
  - [*CreateCircleDraft*](#createcircledraft)
  - [*UpdateCircleConfigurationWithAudit*](#updatecircleconfigurationwithaudit)
  - [*TransitionCircleWithAudit*](#transitioncirclewithaudit)
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

// Or, you can use the `Promise` API.
selectAsoEbiTier(selectAsoEbiTierVars).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
updateAsoEbiFulfilment(updateAsoEbiFulfilmentVars).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
createInvitation(createInvitationVars).then((response) => {
  const data = response.data;
  console.log(data.invitation_insert);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.invitation_insert);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
acceptInvitationWithMembership(acceptInvitationWithMembershipVars).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_insert);
  console.log(data.invitationAcceptance_insert);
  console.log(data.circle_update);
  console.log(data.invitation_update);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_insert);
  console.log(data.invitationAcceptance_insert);
  console.log(data.circle_update);
  console.log(data.invitation_update);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
submitReceiptWithAudit(submitReceiptWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.receipt_insert);
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.receipt_insert);
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
replaceReceiptWithAudit(replaceReceiptWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.receipt_update);
  console.log(data.receipt_insert);
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.receipt_update);
  console.log(data.receipt_insert);
  console.log(data.circleMembership_update);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
reviewReceiptWithAudit(reviewReceiptWithAuditVars).then((response) => {
  const data = response.data;
  console.log(data.receipt_update);
  console.log(data.circleMembership_update);
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.receipt_update);
  console.log(data.circleMembership_update);
  console.log(data.circle_update);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
approveInvitationMembership(approveInvitationMembershipVars).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_insert);
  console.log(data.invitationAcceptance_update);
  console.log(data.circle_update);
  console.log(data.invitation_update);
  console.log(data.circleAuditEntry_insert);
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

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.circleMembership_insert);
  console.log(data.invitationAcceptance_update);
  console.log(data.circle_update);
  console.log(data.invitation_update);
  console.log(data.circleAuditEntry_insert);
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

