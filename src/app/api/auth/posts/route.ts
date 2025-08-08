// 백엔드 공개 목록 프록시 → 프론트 SSR에서 사용
import { NextResponse } from "next/server";
export async function GET() {
  const backend = process.env.BACKEND_URL!;
  try {
    const r = await fetch(`${backend}/posts/public`, { cache: "no-store" });
    const data = await r.json().catch(()=>[]);
    return NextResponse.json(data);
  } catch {
    return NextResponse.json([], { status: 200 });
  }
}
