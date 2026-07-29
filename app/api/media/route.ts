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
    const media = await prisma.mediaCoverage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(media);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch media coverage items' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { outlet, headline, articleUrl } = body;

    if (!outlet || !headline) {
      return NextResponse.json({ error: 'Outlet and headline are required' }, { status: 400 });
    }

    const newMedia = await prisma.mediaCoverage.create({
      data: {
        outlet,
        headline,
        articleUrl: articleUrl || null,
      },
    });

    return NextResponse.json(newMedia, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create media coverage entry' }, { status: 500 });
  }
}
