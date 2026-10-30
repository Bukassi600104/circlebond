# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useGetAccountExportPage, useGetAccountPrivacyRequests, useCreateAccountPrivacyRequest, useGetOwnerPrivacyRequests, useAcknowledgeAccountPrivacyRequest, useGetCircleCommunicationContext, useGetCircleAnnouncementsPage, useGetCircleCommentsPage, useGetCircleCommentReportsPage, useGetSupportUpdatesPage } from '@bondcircle/dataconnect/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useGetAccountExportPage(getAccountExportPageVars);

const { data, isPending, isSuccess, isError, error } = useGetAccountPrivacyRequests(getAccountPrivacyRequestsVars);

const { data, isPending, isSuccess, isError, error } = useCreateAccountPrivacyRequest(createAccountPrivacyRequestVars);

const { data, isPending, isSuccess, isError, error } = useGetOwnerPrivacyRequests(getOwnerPrivacyRequestsVars);

const { data, isPending, isSuccess, isError, error } = useAcknowledgeAccountPrivacyRequest(acknowledgeAccountPrivacyRequestVars);

const { data, isPending, isSuccess, isError, error } = useGetCircleCommunicationContext(getCircleCommunicationContextVars);

const { data, isPending, isSuccess, isError, error } = useGetCircleAnnouncementsPage(getCircleAnnouncementsPageVars);

const { data, isPending, isSuccess, isError, error } = useGetCircleCommentsPage(getCircleCommentsPageVars);

const { data, isPending, isSuccess, isError, error } = useGetCircleCommentReportsPage(getCircleCommentReportsPageVars);

const { data, isPending, isSuccess, isError, error } = useGetSupportUpdatesPage(getSupportUpdatesPageVars);

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
import { getAccountExportPage, getAccountPrivacyRequests, createAccountPrivacyRequest, getOwnerPrivacyRequests, acknowledgeAccountPrivacyRequest, getCircleCommunicationContext, getCircleAnnouncementsPage, getCircleCommentsPage, getCircleCommentReportsPage, getSupportUpdatesPage } from '@bondcircle/dataconnect';


// Operation GetAccountExportPage:  For variables, look at type GetAccountExportPageVars in ../index.d.ts
const { data } = await GetAccountExportPage(dataConnect, getAccountExportPageVars);

// Operation GetAccountPrivacyRequests:  For variables, look at type GetAccountPrivacyRequestsVars in ../index.d.ts
const { data } = await GetAccountPrivacyRequests(dataConnect, getAccountPrivacyRequestsVars);

// Operation CreateAccountPrivacyRequest:  For variables, look at type CreateAccountPrivacyRequestVars in ../index.d.ts
const { data } = await CreateAccountPrivacyRequest(dataConnect, createAccountPrivacyRequestVars);

// Operation GetOwnerPrivacyRequests:  For variables, look at type GetOwnerPrivacyRequestsVars in ../index.d.ts
const { data } = await GetOwnerPrivacyRequests(dataConnect, getOwnerPrivacyRequestsVars);

// Operation AcknowledgeAccountPrivacyRequest:  For variables, look at type AcknowledgeAccountPrivacyRequestVars in ../index.d.ts
const { data } = await AcknowledgeAccountPrivacyRequest(dataConnect, acknowledgeAccountPrivacyRequestVars);

// Operation GetCircleCommunicationContext:  For variables, look at type GetCircleCommunicationContextVars in ../index.d.ts
const { data } = await GetCircleCommunicationContext(dataConnect, getCircleCommunicationContextVars);

// Operation GetCircleAnnouncementsPage:  For variables, look at type GetCircleAnnouncementsPageVars in ../index.d.ts
const { data } = await GetCircleAnnouncementsPage(dataConnect, getCircleAnnouncementsPageVars);

// Operation GetCircleCommentsPage:  For variables, look at type GetCircleCommentsPageVars in ../index.d.ts
const { data } = await GetCircleCommentsPage(dataConnect, getCircleCommentsPageVars);

// Operation GetCircleCommentReportsPage:  For variables, look at type GetCircleCommentReportsPageVars in ../index.d.ts
const { data } = await GetCircleCommentReportsPage(dataConnect, getCircleCommentReportsPageVars);

// Operation GetSupportUpdatesPage:  For variables, look at type GetSupportUpdatesPageVars in ../index.d.ts
const { data } = await GetSupportUpdatesPage(dataConnect, getSupportUpdatesPageVars);


```