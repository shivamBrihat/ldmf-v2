import { SignJWT, jwtVerify } from 'jose';

export const ADMIN_COOKIE_NAME = 'admin_session';

export interface AdminJWTPayload {
  username: string;
  role: 'admin';
  iat?: number;
  exp?: number;
}

function getJwtSecretKey(): Uint8Array {
  const secret = process.env.JWT_SECRET || 'fallback-secret-key-ldmf-admin-2026';
  return new TextEncoder().encode(secret);
}

/**
 * Sign a JWT token for admin session (valid for 8 hours)
 */
export async function signToken(username: string): Promise<string> {
  const secretKey = getJwtSecretKey();
  
  return new SignJWT({ username, role: 'admin' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(secretKey);
}

/**
 * Verify JWT token. Returns payload if valid, null if invalid/expired.
 */
export async function verifyToken(token: string): Promise<AdminJWTPayload | null> {
  try {
    const secretKey = getJwtSecretKey();
    const { payload } = await jwtVerify(token, secretKey, {
      algorithms: ['HS256'],
    });
    return payload as unknown as AdminJWTPayload;
  } catch (error) {
    return null;
  }
}
