import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { signToken, ADMIN_COOKIE_NAME } from '@/lib/auth';

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

    // 1. Direct Hardcoded Admin Fallback Check
    if (
      (inputUser === 'admin' && inputPass === 'admin123') ||
      (inputUser === 'vipulchauhaniimt@gmail.com' && inputPass === 'Qwert12345@')
    ) {
      isAuthenticated = true;
    }

    // 2. Check Primary Environment Variable Hash
    const primaryUser = (process.env.ADMIN_USERNAME || 'admin').toLowerCase();
    const primaryHash = process.env.ADMIN_PASSWORD_HASH;

    if (!isAuthenticated && inputUser === primaryUser && primaryHash) {
      if (await bcrypt.compare(inputPass, primaryHash)) {
        isAuthenticated = true;
        authenticatedUser = primaryUser;
      }
    }

    // 3. Check Alt Environment Variable Hash
    const altUser = (process.env.ADMIN_ALT_USERNAME || 'admin').toLowerCase();
    const altHash = process.env.ADMIN_ALT_PASSWORD_HASH;

    if (!isAuthenticated && inputUser === altUser && altHash) {
      if (await bcrypt.compare(inputPass, altHash)) {
        isAuthenticated = true;
        authenticatedUser = altUser;
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
      { success: true, redirectUrl: '/login/admin' },
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
