import { NextResponse } from "next/server";
import { BACKEND_URL } from "@/lib/server-auth";

export async function GET() {
  try {
    const res = await fetch(`${BACKEND_URL}/home-content`, { cache: "no-store" });
    if (!res.ok) return NextResponse.json({ data: [] }, { status: res.status });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json({ data: [] }, { status: 503 });
  }
}
