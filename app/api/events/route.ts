import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/lib/auth-server';

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      orderBy: { eventDate: 'asc' },
    });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdminRequest(request);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, eventDate, location, imageUrl, isUpcoming } = body;

    if (!title || !description || !eventDate) {
      return NextResponse.json({ error: 'Title, description, and event date are required' }, { status: 400 });
    }

    const event = await prisma.event.create({
      data: {
        title,
        description,
        eventDate: new Date(eventDate),
        location: location || null,
        imageUrl: imageUrl || null,
        isUpcoming: isUpcoming !== undefined ? Boolean(isUpcoming) : true,
      },
    });

    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}
