import { SwapiRequestSchema } from '@libs/schema';
import { startWorkflowSequence } from '@libs/workflowSequence';

export async function POST(request: Request) {
  const json = await request.json();
  const { requestId, ...activities } = SwapiRequestSchema.parse(json);
  await startWorkflowSequence({ requestId, activities });
  return new Response(null, { status: 201 });
}
