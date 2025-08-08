// 서버 컴포넌트에서 쿠키 접근 도우미(고급 로직 확장을 위해)
import { cookies } from "next/headers";
export function getAccessToken() {
  return cookies().get("access_token")?.value;
}
