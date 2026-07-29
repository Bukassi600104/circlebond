# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useGetCurrentUser, useUpsertCurrentUser, useGetDashboardCircles, useGetCircleEngineRecord, useGetCircleLifecycleSummary, useFindUserByEmail, useGetGiftCircleDetail, useGetCircleAuditEntries, useCreateCircleDraft, useUpdateCircleConfigurationWithAudit } from '@bondcircle/dataconnect/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useGetCurrentUser();

const { data, isPending, isSuccess, isError, error } = useUpsertCurrentUser(upsertCurrentUserVars);

const { data, isPending, isSuccess, isError, error } = useGetDashboardCircles();

const { data, isPending, isSuccess, isError, error } = useGetCircleEngineRecord(getCircleEngineRecordVars);

const { data, isPending, isSuccess, isError, error } = useGetCircleLifecycleSummary(getCircleLifecycleSummaryVars);

const { data, isPending, isSuccess, isError, error } = useFindUserByEmail(findUserByEmailVars);

const { data, isPending, isSuccess, isError, error } = useGetGiftCircleDetail(getGiftCircleDetailVars);

const { data, isPending, isSuccess, isError, error } = useGetCircleAuditEntries(getCircleAuditEntriesVars);

const { data, isPending, isSuccess, isError, error } = useCreateCircleDraft(createCircleDraftVars);

const { data, isPending, isSuccess, isError, error } = useUpdateCircleConfigurationWithAudit(updateCircleConfigurationWithAuditVars);

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
import { getCurrentUser, upsertCurrentUser, getDashboardCircles, getCircleEngineRecord, getCircleLifecycleSummary, findUserByEmail, getGiftCircleDetail, getCircleAuditEntries, createCircleDraft, updateCircleConfigurationWithAudit } from '@bondcircle/dataconnect';


// Operation GetCurrentUser: 
const { data } = await GetCurrentUser(dataConnect);

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

// Operation GetGiftCircleDetail:  For variables, look at type GetGiftCircleDetailVars in ../index.d.ts
const { data } = await GetGiftCircleDetail(dataConnect, getGiftCircleDetailVars);

// Operation GetCircleAuditEntries:  For variables, look at type GetCircleAuditEntriesVars in ../index.d.ts
const { data } = await GetCircleAuditEntries(dataConnect, getCircleAuditEntriesVars);

// Operation CreateCircleDraft:  For variables, look at type CreateCircleDraftVars in ../index.d.ts
const { data } = await CreateCircleDraft(dataConnect, createCircleDraftVars);

// Operation UpdateCircleConfigurationWithAudit:  For variables, look at type UpdateCircleConfigurationWithAuditVars in ../index.d.ts
const { data } = await UpdateCircleConfigurationWithAudit(dataConnect, updateCircleConfigurationWithAuditVars);


```