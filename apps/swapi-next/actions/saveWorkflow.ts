'use server';
import { startWorkflowSequence } from '@libs/workflowSequence';

export async function save(requestId, jobs, data: FormData) {
  // const requestId = data.get('name');
  // const jobs = data.get('jobs')?.split(',');
  console.log('save', { requestId, jobs });
  const activities = jobs?.map((j) => ({ [j]: {} })) ?? [];
  console.log('activities', activities);
  await startWorkflowSequence({ requestId, ...activities });
}
