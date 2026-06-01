/**
 * 사이트 중앙 설정 — "채워야 할 값"을 전부 여기 모았습니다. (핸드오버 §7)
 * TODO 표시된 항목을 실제 값으로 교체하면 페이지 전체에 반영됩니다.
 */
export const site = {
  brand: "Off the Bars",

  // 문의 — 매일 확인하는 응대 주소 (콜드메일 발송 주소 offthebar.codes와 분리, 핸드오버 §6)
  email: "contact@offthebars.com",

  // 외부 링크 (비워두면 링크는 동작 안 함 — 채워주세요)
  instagram: "", // TODO: 예) https://instagram.com/offthebars
  notionUrl: "", // TODO: 팀 소개 노션 페이지 URL

  // 가격 (원) — 콜드아웃리치 카피 §4.2 기준
  price: {
    beta: 25000,
    regular: 49000,
    betaSlots: 10,
    leadTimeDays: 2,
  },

  // 사업자 정보 — 채운 항목만 푸터에 노출됩니다. (대표·번호는 사업자등록 후 채우면 자동 표시)
  business: {
    name: "Off the Bars",
    representative: "", // TODO: 대표자명 (사업자등록 후)
    registrationNumber: "", // TODO: 사업자등록번호 (사업자등록 후)
  },
} as const;

export function formatKRW(value: number): string {
  return value.toLocaleString("ko-KR") + "원";
}
