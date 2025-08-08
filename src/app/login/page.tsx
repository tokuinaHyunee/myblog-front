"use client";
// 로그인 폼
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      location.href = "/admin";
    } else {
      const data = await res.json().catch(() => ({}));
      setErr(data?.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="mx-auto mt-10 max-w-md rounded-lg border bg-white p-6">
      <h1 className="mb-4 text-2xl font-bold">관리자 로그인</h1>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <input
          className="rounded border p-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="rounded border p-2"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {err && <p className="text-sm text-red-600">{err}</p>}
        <button className="rounded bg-gray-900 p-2 text-white">로그인</button>
      </form>
    </div>
  );
}
