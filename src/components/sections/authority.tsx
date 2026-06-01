export function Authority() {
  const items = [
    "일본 산토리·칼비 등이 20년간 해온 방식",
    "이 분야 작업은 2006년 칸 광고제 티타늄 라이언 수상",
    "The Dieline(2023)이 주목한 흐름",
  ];

  return (
    <section className="border-y border-line bg-card/60">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-5 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-center sm:gap-8">
        {items.map((t) => (
          <span key={t} className="flex items-center gap-2">
            <span className="h-1 w-1 shrink-0 rounded-full bg-accent/70" />
            {t}
          </span>
        ))}
      </div>
    </section>
  );
}
