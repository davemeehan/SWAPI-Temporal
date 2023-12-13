import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { SwapiRequest } from '@libs/schema';
import { queryWorkflowSequence } from '@libs/workflowSequence';

const RunIdSchema = z.string().uuid().optional();

export async function GET(
  request: NextRequest,
  { params }: { params: { requestId: SwapiRequest['requestId'] } }
) {
  const runId = RunIdSchema.parse(request.nextUrl.searchParams.get('runId'));
  const data = await queryWorkflowSequence({
    requestId: params.requestId,
    runId,
  });
  return NextResponse.json(data, { status: 200 });
}
