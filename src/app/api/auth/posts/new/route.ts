// 관리자만 글 작성. 프론트의 HTTP-only 쿠키를 백엔드로 전달(Authorization 헤더)해 위임
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const token = cookies().get("access_token")?.value;
  if (!token) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const payload = await req.json();
  const backend = process.env.BACKEND_URL!;
  const r = await fetch(`${backend}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 백엔드에서 JWT 인증
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(payload),
  });

  const data = await r.json().catch(()=>({}));
  return NextResponse.json(data, { status: r.status });
}

