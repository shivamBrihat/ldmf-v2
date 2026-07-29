import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/lib/auth-server';

export async function GET(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  try {
    const item = await prisma.siteContent.findUnique({
      where: { key: params.key },
    });
    if (!item) {
      return NextResponse.json({ error: 'Content not found' }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch content' }, { status: 500 });
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { key: string } }
) {
  const isAdmin = await verifyAdminRequest(request);
  if (!isAdmin) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, content } = body;

    const updated = await prisma.siteContent.upsert({
      where: { key: params.key },
      update: {
        ...(title && { title }),
        ...(content !== undefined && { content }),
      },
      create: {
        key: params.key,
        title: title || params.key,
        content: content || '',
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update site content' }, { status: 500 });
  }
}
