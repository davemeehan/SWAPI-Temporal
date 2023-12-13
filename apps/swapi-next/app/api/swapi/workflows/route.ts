import { NextResponse } from 'next/server';
import { getWorkflows } from './getWorkflows';

export async function GET() {
  const data = await getWorkflows();
  return NextResponse.json({ data });
}
