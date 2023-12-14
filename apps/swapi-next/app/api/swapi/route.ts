import { SwapiRequestSchema } from '@libs/schema';
import { startWorkflowSequence } from '@libs/workflowSequence';
import { removeEmptyFilters } from './removeEmptyFilters';

export async function POST(request: Request) {
  const json = await request.json();
  const { requestId, ...rest } = SwapiRequestSchema.parse(json);
  const activities = removeEmptyFilters(rest);
  await startWorkflowSequence({
    requestId,
    activities,
  });
  return new Response(null, { status: 201 });
}
