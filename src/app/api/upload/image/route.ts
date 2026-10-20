import { NextRequest, NextResponse } from "next/server";
import { getAuthToken, BACKEND_URL } from "@/lib/server-auth";

export async function POST(req: NextRequest) {
  const token = await getAuthToken();
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const contentType = req.headers.get("content-type") ?? "";
  const body = await req.blob();

  try {
    const res = await fetch(`${BACKEND_URL}/upload/image`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "content-type": contentType,
      },
      body,
    });
    return NextResponse.json(await res.json(), { status: res.status });
  } catch {
    return NextResponse.json({ error: "Upload failed" }, { status: 503 });
  }
}
