'use server';
import { startWorkflowSequence } from '@libs/workflowSequence';
import { removeEmptyFilters } from '@swapi-next/app/api/swapi/removeEmptyFilters';

export async function save(rules, requestId, jobs) {
  const activities = {};
  for (const job of jobs) {
    activities[job] = rules[job];
  }
  await startWorkflowSequence({
    requestId,
    activities: removeEmptyFilters(activities),
  });
}
