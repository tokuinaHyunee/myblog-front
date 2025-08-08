//백엔드 /auth/login 으로 이메일/비밀번호 전달 → 토큰 수신 → HTTP-only 쿠키로 저장
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const backend = process.env.BACKEND_URL!;
  try {
    const r = await fetch(`${backend}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!r.ok) {
      const e = await r.json().catch(()=>({message:"Invalid"}));
      return NextResponse.json({ message: e.message || "Invalid credentials" }, { status: 401 });
    }

    // 백엔드 응답: { accessToken, refreshToken }
    const { accessToken, refreshToken } = await r.json();

    const res = NextResponse.json({ ok: true });
    // 보안 쿠키로 저장 (클라이언트 JS에서 읽히지 않음)
    res.cookies.set("access_token", accessToken, {
      httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60, // 1h
    });
    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7, // 7d
    });
    return res;
  } catch {
    return NextResponse.json({ message: "Auth server unreachable" }, { status: 502 });
  }
}
