import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

async function isAuthenticated(request: NextRequest) {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return payload?.role === 'admin';
}

export async function GET() {
  try {
    const timeline = await prisma.timelineEvent.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(timeline);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch timeline events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { year, description, order } = body;

    if (!year || !description) {
      return NextResponse.json({ error: 'Year and description are required' }, { status: 400 });
    }

    const newEvent = await prisma.timelineEvent.create({
      data: {
        year,
        description,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json(newEvent, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create timeline event' }, { status: 500 });
  }
}
