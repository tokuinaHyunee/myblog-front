"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    setLoggedIn(document.cookie.includes("access_token="));
  }, []); //로그인 상태에 따라 버튼 변경

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setLoggedIn(false);
    location.href = "/";
  }; //클라이언트에서 쿠키 존재 여부로 체크

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between p-4">
        <Link href="/" className="text-lg font-bold">
          My Blog
        </Link>
        <nav className="flex gap-3">
          <Link href="/" className="hover:underline">
            Home
          </Link>
          {loggedIn ? (
            <>
              <Link href="/admin" className="hover:underline">
                Admin
              </Link>
              <Link href="/admin/new-post" className="hover:underline">
                Write
              </Link>
              <button
                onClick={handleLogout}
                className="rounded bg-gray-900 px-3 py-1 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="rounded bg-gray-900 px-3 py-1 text-white"
            >
              Admin Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
