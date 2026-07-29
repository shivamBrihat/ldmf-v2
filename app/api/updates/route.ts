import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/lib/auth-server';

export async function GET() {
  try {
    const updates = await prisma.update.findMany({
      orderBy: { publishedAt: 'desc' },
    });
    return NextResponse.json(updates);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch updates' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const isAdmin = await verifyAdminRequest(request);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content, imageUrl, publishedAt } = body;

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const update = await prisma.update.create({
      data: {
        title,
        content,
        imageUrl: imageUrl || null,
        publishedAt: publishedAt ? new Date(publishedAt) : new Date(),
      },
    });

    return NextResponse.json(update, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create update' }, { status: 500 });
  }
}
