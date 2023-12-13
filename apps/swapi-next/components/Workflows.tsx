'use client';
import { temporal } from '@temporalio/proto';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import WorkflowList from './WorkflowList';
const queryClient = new QueryClient();
export function Workflows({
  rows,
}: {
  rows: temporal.api.workflowservice.v1.ListWorkflowExecutionsResponse;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <WorkflowList rows={rows} />
    </QueryClientProvider>
  );
}
