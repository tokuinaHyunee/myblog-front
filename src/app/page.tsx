// 서버 컴포넌트
import { headers } from "next/headers";

async function getPosts() {
  const base = `http://${headers().get("host")}`; // ex) localhost:3000
  const res = await fetch(`${base}/api/posts`, { cache: "no-store" });
  if (!res.ok) return [];
  return res.json();
}


export default async function HomePage() {
  const posts: Array<{ id: number; title: string; createdAt: string; thumbnailUrl?: string }> = await getPosts();

  return (
    <section className="mt-6">
      <h1 className="mb-4 text-2xl font-bold">최신 글</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {posts.map((p) => (
          <a key={p.id} href={`/#`} className="group overflow-hidden rounded-lg border bg-white">
            <div className="aspect-[16/9] bg-gray-200">
              {/* 썸네일 없으면 회색 박스 */}
              {p.thumbnailUrl && <img src={p.thumbnailUrl} alt="" className="h-full w-full object-cover" />}
            </div>
            <div className="p-3">
              <h2 className="line-clamp-2 font-semibold group-hover:underline">{p.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{new Date(p.createdAt).toLocaleDateString()}</p>
            </div>
          </a>
        ))}
        {posts.length === 0 && <p className="text-sm text-gray-500">아직 게시글이 없습니다.</p>}
      </div>
    </section>
  );
}
