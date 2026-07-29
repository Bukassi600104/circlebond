# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useGetCurrentUser, useGetRecentAbuseAttempts, useRecordAbuseAttempt, useGetConsumedAuthChallenge, useConsumeAuthChallenge, useUpsertCurrentUser, useGetDashboardCircles, useGetCircleEngineRecord, useGetCircleLifecycleSummary, useFindUserByEmail } from '@bondcircle/dataconnect/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useGetCurrentUser();

const { data, isPending, isSuccess, isError, error } = useGetRecentAbuseAttempts(getRecentAbuseAttemptsVars);

const { data, isPending, isSuccess, isError, error } = useRecordAbuseAttempt(recordAbuseAttemptVars);

const { data, isPending, isSuccess, isError, error } = useGetConsumedAuthChallenge(getConsumedAuthChallengeVars);

const { data, isPending, isSuccess, isError, error } = useConsumeAuthChallenge(consumeAuthChallengeVars);

const { data, isPending, isSuccess, isError, error } = useUpsertCurrentUser(upsertCurrentUserVars);

const { data, isPending, isSuccess, isError, error } = useGetDashboardCircles();

const { data, isPending, isSuccess, isError, error } = useGetCircleEngineRecord(getCircleEngineRecordVars);

const { data, isPending, isSuccess, isError, error } = useGetCircleLifecycleSummary(getCircleLifecycleSummaryVars);

const { data, isPending, isSuccess, isError, error } = useFindUserByEmail(findUserByEmailVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { getCurrentUser, getRecentAbuseAttempts, recordAbuseAttempt, getConsumedAuthChallenge, consumeAuthChallenge, upsertCurrentUser, getDashboardCircles, getCircleEngineRecord, getCircleLifecycleSummary, findUserByEmail } from '@bondcircle/dataconnect';


// Operation GetCurrentUser: 
const { data } = await GetCurrentUser(dataConnect);

// Operation GetRecentAbuseAttempts:  For variables, look at type GetRecentAbuseAttemptsVars in ../index.d.ts
const { data } = await GetRecentAbuseAttempts(dataConnect, getRecentAbuseAttemptsVars);

// Operation RecordAbuseAttempt:  For variables, look at type RecordAbuseAttemptVars in ../index.d.ts
const { data } = await RecordAbuseAttempt(dataConnect, recordAbuseAttemptVars);

// Operation GetConsumedAuthChallenge:  For variables, look at type GetConsumedAuthChallengeVars in ../index.d.ts
const { data } = await GetConsumedAuthChallenge(dataConnect, getConsumedAuthChallengeVars);

// Operation ConsumeAuthChallenge:  For variables, look at type ConsumeAuthChallengeVars in ../index.d.ts
const { data } = await ConsumeAuthChallenge(dataConnect, consumeAuthChallengeVars);

// Operation UpsertCurrentUser:  For variables, look at type UpsertCurrentUserVars in ../index.d.ts
const { data } = await UpsertCurrentUser(dataConnect, upsertCurrentUserVars);

// Operation GetDashboardCircles: 
const { data } = await GetDashboardCircles(dataConnect);

// Operation GetCircleEngineRecord:  For variables, look at type GetCircleEngineRecordVars in ../index.d.ts
const { data } = await GetCircleEngineRecord(dataConnect, getCircleEngineRecordVars);

// Operation GetCircleLifecycleSummary:  For variables, look at type GetCircleLifecycleSummaryVars in ../index.d.ts
const { data } = await GetCircleLifecycleSummary(dataConnect, getCircleLifecycleSummaryVars);

// Operation FindUserByEmail:  For variables, look at type FindUserByEmailVars in ../index.d.ts
const { data } = await FindUserByEmail(dataConnect, findUserByEmailVars);


```