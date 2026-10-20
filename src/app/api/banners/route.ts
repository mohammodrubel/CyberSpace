import { NextRequest, NextResponse } from "next/server";
import { getAuthToken, BACKEND_URL } from "@/lib/server-auth";

export async function GET() {
  try {
    const token = await getAuthToken();
    const res = await fetch(`${BACKEND_URL}/banners`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    });
    if (!res.ok) return NextResponse.json({ data: [] }, { status: res.status });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ data: [] }, { status: 503 });
  }
}

export async function POST(req: NextRequest) {
  const token = await getAuthToken();
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const res = await fetch(`${BACKEND_URL}/banners`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
