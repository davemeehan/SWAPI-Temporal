import { proxyActivities, defineQuery, setHandler } from '@temporalio/workflow';
import type * as activities from './activities';
import { type CriteriaType } from './schema';
import { applyFilter } from './rules';
import { WorkflowActivities } from './types';

export const activityFns = proxyActivities<typeof activities>({
  startToCloseTimeout: '5 minute',
});

export const getWorkflowSequence = defineQuery('getWorkflowSequence');

export async function workflowSequence(activities: WorkflowActivities) {
  let data = {};
  setHandler(getWorkflowSequence, () => data);

  const allActivities = Object.entries(activities) as [
    keyof typeof activityFns,
    CriteriaType
  ][];
  for (const activity of allActivities) {
    const [key, rulesFilter] = activity;
    const activityData = await activityFns[key]();
    data[key] = applyFilter(activityData, rulesFilter);

    console.log(`resolved activityData ${key}`, data[key]);
  }
  return data;
}
