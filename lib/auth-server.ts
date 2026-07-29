import type { NextRequest } from 'next/server';
import { verifyToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

export async function verifyAdminRequest(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!token) return false;
  const payload = await verifyToken(token);
  return payload?.role === 'admin';
}
