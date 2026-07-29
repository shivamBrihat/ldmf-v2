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
    const stories = await prisma.successStory.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(stories);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch success stories' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { personName, location, story, photoUrl, order } = body;

    if (!personName || !location || !story) {
      return NextResponse.json({ error: 'Person name, location, and story are required' }, { status: 400 });
    }

    const newStory = await prisma.successStory.create({
      data: {
        personName,
        location,
        story,
        photoUrl: photoUrl || null,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json(newStory, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create success story' }, { status: 500 });
  }
}
