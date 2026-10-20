import { NextRequest, NextResponse } from "next/server";
import { getAuthToken, BACKEND_URL } from "@/lib/server-auth";

export async function GET() {
  const token = await getAuthToken();
  const res = await fetch(`${BACKEND_URL}/settings`, {
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    cache: "no-store",
  });
  const data = await res.json();
  return NextResponse.json(data);
}

export async function PATCH(req: NextRequest) {
  const token = await getAuthToken();
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { key, value } = await req.json();
  const res = await fetch(`${BACKEND_URL}/settings/${key}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ value }),
  });
  const data = await res.json();
  if (!res.ok) return NextResponse.json({ error: data.message }, { status: res.status });
  return NextResponse.json(data);
}
