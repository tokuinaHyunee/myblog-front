import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  const backend = process.env.BACKEND_URL!;
  const isProd = process.env.NODE_ENV === "production";

  try {
    const r = await fetch(`${backend}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!r.ok) {
      const e = await r.json().catch(() => ({ message: "Invalid credentials" }));
      return NextResponse.json({ message: e.message || "Invalid credentials" }, { status: 401 });
    }

    const { accessToken, refreshToken } = await r.json();

    // ★ 먼저 res 생성
    const res = NextResponse.json({ ok: true });

    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: isProd,      // 로컬(http)에서 false
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60,
    });
    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch {
    return NextResponse.json({ message: "Auth server unreachable" }, { status: 502 });
  }
}
