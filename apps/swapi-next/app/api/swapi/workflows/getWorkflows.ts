import { temporalConnection } from '@libs/client';

export async function getWorkflows(type = 'workflowSequence') {
  const connection = await temporalConnection();
  const response = await connection.workflowService.listWorkflowExecutions({
    namespace: 'default',
    pageSize: 10,
    query: `WorkflowType = "${type}"`,
  });
  return response;
}
