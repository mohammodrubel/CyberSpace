import { NextResponse } from "next/server";
import { getServerSession } from "@/lib/server-auth";

export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
  return NextResponse.json({ success: true, data: session });
}
