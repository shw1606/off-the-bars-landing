import { CtaButton } from "@/components/cta-button";
import { buildMailto } from "@/lib/mailto";
import { site, formatKRW } from "@/lib/site";

export function Pricing() {
  const { beta, regular, betaSlots, leadTimeDays } = site.price;
  const includes = [
    "브랜드 톤 미감 바코드 디자인 1종",
    "스캔 작동 보장: 안 읽히면 전액 환불",
    "인쇄용 벡터 파일 (AI · EPS)",
    `납기: 영업일 ${leadTimeDays}일`,
  ];

  return (
    <section id="pricing" className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          가격 · 납기
        </h2>
        <p className="mt-3 text-sm text-muted">
          처음부터 투명하게. 폼도, 숨은 비용도 없습니다.
        </p>
      </div>

      <div className="mx-auto max-w-md rounded-2xl border border-ink/10 bg-card p-8 shadow-sm">
        <span className="inline-block rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
          베타 파트너 · {betaSlots}곳 한정
        </span>

        <div className="mt-5 flex items-baseline gap-2">
          <span className="text-4xl font-bold text-ink">
            {formatKRW(beta)}
          </span>
          <span className="text-sm text-muted">/ SKU</span>
        </div>
        <p className="mt-1 text-sm text-muted">
          정식가 <span className="line-through">{formatKRW(regular)}</span> ·
          베타 기간 한정가
        </p>

        <ul className="mt-6 space-y-3">
          {includes.map((t) => (
            <li key={t} className="flex items-start gap-2.5 text-sm text-ink">
              <span
                aria-hidden
                className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-ink text-[10px] leading-none text-background"
              >
                ✓
              </span>
              {t}
            </li>
          ))}
        </ul>

        <p className="mt-5 text-xs leading-relaxed text-muted">
          규격(막대·여백·대비)은 그대로 유지해 스캔을 보존합니다. 추가 SKU·수정
          범위는 메일로 협의해요.
        </p>

        <div className="mt-7">
          <CtaButton
            href={buildMailto()}
            event="cta_mailto_click"
            location="pricing"
            className="w-full"
          >
            바코드 보내고 시안 받기
          </CtaButton>
        </div>
      </div>
    </section>
  );
}
