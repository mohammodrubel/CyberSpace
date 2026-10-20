import { cookies } from "next/headers";

export const BACKEND_URL = process.env.BACKEND_URL ?? "http://localhost:3001";
export const COOKIE_NAME = "auth-token";

export interface JwtUser {
  id: string;
  email: string;
  name: string;
  role: string;
  exp: number;
  iat: number;
}

function decodeJwt(token: string): JwtUser | null {
  try {
    const payload = token.split(".")[1];
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf-8"));
    if (!decoded?.id || !decoded?.email) return null;
    if (decoded.exp && decoded.exp * 1000 < Date.now()) return null;
    return decoded as JwtUser;
  } catch {
    return null;
  }
}

export async function getAuthToken(): Promise<string | null> {
  const jar = await cookies();
  return jar.get(COOKIE_NAME)?.value ?? null;
}

export async function getServerSession(): Promise<JwtUser | null> {
  const token = await getAuthToken();
  if (!token) return null;
  return decodeJwt(token);
}
