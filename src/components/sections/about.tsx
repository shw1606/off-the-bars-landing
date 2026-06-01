import { CtaButton } from "@/components/cta-button";
import { site } from "@/lib/site";

export function About() {
  return (
    <section className="border-t border-line bg-card/50">
      <div className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            팀 소개
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {site.brand}는 한국 인디 브랜드가 바코드 아트를 부담 없이 쓸 수 있게
            만드는 작은 팀입니다. 일본·미국에서 20년 검증된 방식을, 합리적인
            가격과 스캔 보증으로 가져왔습니다.
          </p>
          <div className="mt-7">
            <CtaButton
              href={site.notionUrl || "#"}
              event="cta_notion_click"
              location="about"
              variant="secondary"
              external
            >
              팀 · 작업 방식 자세히 보기
            </CtaButton>
          </div>
        </div>
      </div>
    </section>
  );
}
