import Image from "next/image";

import { CtaButton } from "@/components/cta-button";
import { buildMailto } from "@/lib/mailto";
import magpieBrewing from "@/assets/samples/magpie-brewing.jpg";
import { site, formatKRW } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-5 py-16 sm:py-24 lg:grid-cols-2">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-card px-3 py-1 text-xs font-medium text-muted">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            스캔되는 바코드 아트
          </span>

          <h1 className="mt-5 text-4xl font-bold leading-[1.12] tracking-tight text-ink sm:text-5xl">
            뺄 수 없는 바코드를,
            <br />
            브랜드의 일부로.
          </h1>

          <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
            식약처·유통이 요구해 뺄 수 없는 그 바코드를 브랜드 톤 일러스트로 다시
            그립니다. 막대와 여백 규격은 그대로 지키고, 실제 매장 POS에서
            스캔되는 것까지 책임집니다.
          </p>

          {/* 베타 가격 전면 노출 */}
          <div className="mt-7 inline-flex flex-wrap items-baseline gap-x-2.5 gap-y-1 rounded-xl border border-ink/10 bg-card px-4 py-3">
            <span className="text-xs font-semibold text-accent">
              베타 {site.price.betaSlots}곳 한정
            </span>
            <span className="text-2xl font-bold text-ink">
              {formatKRW(site.price.beta)}
            </span>
            <span className="text-sm text-muted">/ SKU</span>
            <span className="text-sm text-muted line-through">
              {formatKRW(site.price.regular)}
            </span>
          </div>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <CtaButton
              href={buildMailto()}
              event="cta_mailto_click"
              location="hero"
            >
              바코드 보내고 시안 받기
            </CtaButton>
            <CtaButton
              href={site.instagram || "#"}
              event="cta_instagram_click"
              location="hero"
              variant="secondary"
              external
            >
              인스타그램에서 더 보기
            </CtaButton>
          </div>
          <p className="mt-3 text-xs text-muted">
            입력 폼 없음 · 메일로 바코드 파일만 보내면 시작됩니다.
          </p>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[32px] bg-accent/5 blur-2xl" />
          <div className="overflow-hidden rounded-[24px] border border-ink/[0.06] shadow-sm">
            <Image
              src={magpieBrewing}
              alt="남산타워와 산, 새 실루엣이 이어지는 스카이라인 모티프 바코드 아트"
              sizes="(min-width: 1024px) 480px, 100vw"
              fetchPriority="high"
              className="aspect-[4/3] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
