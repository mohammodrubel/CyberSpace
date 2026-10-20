import { BACKEND_URL } from "@/lib/server-auth";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/settings`, { cache: "no-store" });
    if (!res.ok) return NextResponse.json({ data: [] }, { status: res.status });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ data: [] }, { status: 503 });
  }
}
