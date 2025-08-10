// 서버/클라이언트 겸용 fetch 유틸(확장 포인트)
export async function api(path: string, init?: RequestInit) {
    const res = await fetch(path, init);
    if (!res.ok) throw new Error("Request failed");
    return res.json();
  }
  