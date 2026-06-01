import { site } from "@/lib/site";

export function Process() {
  const steps = [
    {
      n: "01",
      t: "바코드를 보냅니다",
      d: "바코드 파일 또는 제품 이미지를 메일로 보내주세요. 입력 폼은 없습니다.",
    },
    {
      n: "02",
      t: "그리고 검증합니다",
      d: "브랜드 톤으로 시안을 그리고, 막대·여백 규격을 지켜 스캔을 확인합니다.",
    },
    {
      n: "03",
      t: "벡터로 받습니다",
      d: `인쇄용 벡터(AI·EPS)로 받아 그대로 입고하세요. 납기는 영업일 ${site.price.leadTimeDays}일.`,
    },
  ];

  return (
    <section className="mx-auto max-w-5xl px-5 py-16 sm:py-20">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          진행은 메일 한 통이면 됩니다
        </h2>
      </div>
      <div className="grid gap-5 sm:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="rounded-2xl border border-ink/10 bg-card p-6"
          >
            <span className="font-mono text-sm text-accent">{s.n}</span>
            <h3 className="mt-3 text-base font-semibold text-ink">{s.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
