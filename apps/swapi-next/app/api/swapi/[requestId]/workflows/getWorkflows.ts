import { SwapiRequest } from '@libs/schema';
import { temporalConnection } from '@libs/client';

export async function getWorkflows(
  requestId: SwapiRequest['requestId'],
  runId?: string
) {
  const connection = await temporalConnection();
  const response = await connection.workflowService.listWorkflowExecutions({
    namespace: 'default',
    pageSize: 10,
    query: `WorkflowId = "wf-id-${requestId}" ${
      runId ? `and RunId = "${runId}"` : ''
    }`,
  });
  return response;
}
