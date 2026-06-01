import { site } from "./site";

/**
 * 메인 CTA용 mailto 링크. 제목·본문을 미리 채워 방문자의 입력 부담을 0으로.
 * (핸드오버 §3 — 입력 필드 0개)
 */
export function buildMailto(): string {
  const subject = `[${site.brand}] 바코드 아트 문의`;
  const body = [
    `안녕하세요, ${site.brand} 팀께.`,
    ``,
    `브랜드명: `,
    `제품 / SKU: `,
    ``,
    `바코드 파일 또는 제품 이미지를 첨부해 보냅니다. 베타로 시안 문의드립니다.`,
  ].join("\n");
  return `mailto:${site.email}?subject=${encodeURIComponent(
    subject,
  )}&body=${encodeURIComponent(body)}`;
}
