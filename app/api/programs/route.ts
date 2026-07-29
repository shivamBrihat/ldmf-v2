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
    const programs = await prisma.program.findMany({
      orderBy: { order: 'asc' },
    });
    return NextResponse.json(programs);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch programs' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!(await isAuthenticated(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, imageUrl, order } = body;

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const newProgram = await prisma.program.create({
      data: {
        title,
        description,
        imageUrl: imageUrl || null,
        order: Number(order) || 0,
      },
    });

    return NextResponse.json(newProgram, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create program' }, { status: 500 });
  }
}
