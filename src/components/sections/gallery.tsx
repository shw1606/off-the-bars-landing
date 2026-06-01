import { BarcodeArt, type Motif } from "@/components/barcode-art";

const SAMPLES: { motif: Motif; tint: string }[] = [
  { motif: "skyline", tint: "#eef0ff" },
  { motif: "mountains", tint: "#e8f7ee" },
  { motif: "waves", tint: "#e8f3ff" },
  { motif: "hills", tint: "#fff0e8" },
  { motif: "pines", tint: "#eef6e6" },
  { motif: "blocks", tint: "#f3ecff" },
];

export function Gallery() {
  return (
    <section
      id="samples"
      className="mx-auto max-w-5xl px-5 py-16 sm:py-20"
    >
      <div className="mb-10 max-w-2xl">
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          샘플 갤러리
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          이메일 없이 전부 공개합니다. 아래는{" "}
          <span className="text-ink">콘셉트 미리보기</span>예요 — 실제 시안이
          준비되는 대로 교체됩니다. 배경 색은 자유롭게, 막대는 어둡게: 스캔을
          지키는 규칙 안에서 디자인합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLES.map((s, i) => (
          <div
            key={i}
            className="group overflow-hidden rounded-2xl border border-ink/[0.06] bg-card p-3 shadow-sm transition hover:shadow-md"
          >
            <BarcodeArt
              seed={i * 13 + 3}
              motif={s.motif}
              tint={s.tint}
              className="w-full"
            />
            <p className="px-1 pb-1 pt-3 text-xs text-muted">
              예시 콘셉트 #{String(i + 1).padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
