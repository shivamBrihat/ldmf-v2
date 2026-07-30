import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken, ADMIN_COOKIE_NAME } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const inputUser = username.trim().toLowerCase();
    const inputPass = password.trim();

    let isAuthenticated = false;
    let authenticatedUser = inputUser;

    // Check database for user credentials
    const user = await prisma.user.findUnique({
      where: { email: inputUser },
    });

    if (user) {
      const match = await bcrypt.compare(inputPass, user.password);
      if (match) {
        isAuthenticated = true;
        authenticatedUser = user.email;
      }
    }

    if (!isAuthenticated) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Create JWT Token for valid session
    const token = await signToken(authenticatedUser);

    // Create response with secure HTTP-only cookie and redirect to /login/admin
    const response = NextResponse.json(
      { success: true, redirectUrl: '/admin/dashboard' },
      { status: 200 }
    );

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 8 * 60 * 60, // 8 hours in seconds
      path: '/',
    });

    return response;
  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { error: 'An unexpected authentication error occurred' },
      { status: 500 }
    );
  }
}
