"use client";
// 글 작성 폼: /api/posts/new 로 POST
import { useState } from "react";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumb] = useState("");
  const [content, setContent] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    const res = await fetch("/api/posts/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content, thumbnailUrl }),
    });
    if (res.ok) {
      setMsg("등록되었습니다.");
      setTitle(""); setThumb(""); setContent("");
    } else {
      const data = await res.json().catch(()=>({}));
      setMsg(data?.message || "실패했습니다.");
    }
  };

  return (
    <div className="mx-auto mt-6 max-w-2xl rounded border bg-white p-4">
      <h1 className="mb-4 text-xl font-bold">새 글 작성</h1>
      <form onSubmit={submit} className="flex flex-col gap-3">
        <input className="rounded border p-2" placeholder="제목" value={title} onChange={(e)=>setTitle(e.target.value)} required />
        <input className="rounded border p-2" placeholder="썸네일 URL(선택)" value={thumbnailUrl} onChange={(e)=>setThumb(e.target.value)} />
        <textarea className="min-h-[200px] rounded border p-2" placeholder="내용" value={content} onChange={(e)=>setContent(e.target.value)} required />
        <button className="rounded bg-gray-900 p-2 text-white">등록</button>
      </form>
      {msg && <p className="mt-3 text-sm text-gray-700">{msg}</p>}
    </div>
  );
}
