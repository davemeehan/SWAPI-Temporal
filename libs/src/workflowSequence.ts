import { QueryNotRegisteredError } from '@temporalio/client';
import { temporalClient } from './client';
import { SwapiRequest } from './schema';
import { workflowSequence } from './workflows';
import { WorkflowActivities } from './types';
import { wfIdPrefix } from './constants';

export async function startWorkflowSequence({
  requestId,
  activities,
}: {
  requestId: SwapiRequest['requestId'];
  activities: WorkflowActivities;
}) {
  const client = await temporalClient();
  await client.workflow.start(workflowSequence, {
    taskQueue: process.env.SWAPI_QUEUE_NAME,
    args: [activities],
    // in practice, use a meaningful business ID, like customerId or transactionId
    workflowId: `${wfIdPrefix}${requestId}`,
  });
}

export async function queryWorkflowSequence({
  requestId,
  runId,
}: SwapiRequest & { runId?: string }) {
  // Retry a few times if QueryNotRegisteredError is thrown
  // I'm not sure if it's a bug in the SDK or in the dev server
  // but occasionally the query will throw an exception that the query is not registered
  let failures = 0;
  let data;
  while (!data && failures < 3) {
    try {
      const client = await temporalClient();
      const handle = client.workflow.getHandle(
        `${wfIdPrefix}${requestId}`,
        runId
      );
      data = await handle.query('getWorkflowSequence', handle);
    } catch (e) {
      if (!(e instanceof QueryNotRegisteredError)) {
        throw e;
      }
      console.warn('CAUGHT: QueryNotRegisteredError, retrying...');
      failures++;
    }
  }
  return data;
}
