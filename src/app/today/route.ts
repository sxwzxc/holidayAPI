import { NextResponse } from "next/server";
import { getDayStatus } from "@/lib/holiday";

export const dynamic = "force-dynamic";

export function GET() {
  const { status } = getDayStatus(new Date());

  return new NextResponse(status, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
