import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyAdminRequest } from '@/lib/auth-server';

export async function GET() {
  try {
    const contents = await prisma.siteContent.findMany();
    return NextResponse.json(contents);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch site content' }, { status: 500 });
  }
}
