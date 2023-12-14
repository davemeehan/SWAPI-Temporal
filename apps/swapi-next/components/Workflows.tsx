'use client';
import { temporal } from '@temporalio/proto';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WorkflowList from './WorkflowList';
import { Provider } from 'react-redux';
import store from '@swapi-next/store/store';
const queryClient = new QueryClient();
export function Workflows({
  rows,
}: {
  rows: temporal.api.workflowservice.v1.ListWorkflowExecutionsResponse;
}) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <WorkflowList rows={rows} />
      </QueryClientProvider>
    </Provider>
  );
}
