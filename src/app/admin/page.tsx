// 보호된 페이지: 미들웨어가 비로그인 접근을 차단
export default function AdminDashboard() {
    return (
      <div className="mt-6">
        <h1 className="text-2xl font-bold">관리자 대시보드</h1>
        <p className="mt-2 text-sm text-gray-600">여기서 글을 관리할 수 있습니다.</p>
        <div className="mt-4">
          <a href="/admin/new-post" className="rounded bg-gray-900 px-3 py-2 text-white">새 글 작성</a>
        </div>
      </div>
    );
  }
  