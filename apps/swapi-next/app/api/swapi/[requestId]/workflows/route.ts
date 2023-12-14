import { SwapiRequest } from '@libs/schema';
import { NextRequest, NextResponse } from 'next/server';
import { getWorkflows } from './getWorkflows';
import { wfIdPrefix } from '@libs/constants';

export async function GET(
  req: NextRequest,
  { params }: { params: { requestId: SwapiRequest['requestId'] } }
) {
  const searchParams = req.nextUrl.searchParams;
  const runId = searchParams.get('runId') ?? undefined;
  const data = await getWorkflows(`${wfIdPrefix}${params.requestId}`, runId);
  return NextResponse.json({ data });
}
