import Image, { type StaticImageData } from "next/image";

import magpieBrewing from "@/assets/samples/magpie-brewing.jpg";
import gorillaBrewing from "@/assets/samples/gorilla-brewing.png";
import forest from "@/assets/samples/forest.jpg";
import dinto from "@/assets/samples/dinto.png";
import dokkaebiBrewing from "@/assets/samples/dokkaebi-brewing.png";
import unleashia from "@/assets/samples/unleashia.jpg";

const SAMPLES: {
  src: StaticImageData;
  alt: string;
  cover?: boolean;
}[] = [
  {
    src: magpieBrewing,
    alt: "남산타워와 산, 새 실루엣이 이어지는 스카이라인 모티프 바코드 아트",
    cover: true,
  },
  {
    src: gorillaBrewing,
    alt: "막대 사이로 고릴라 얼굴이 드러나는 바코드 아트",
  },
  {
    src: forest,
    alt: "나무 숲으로 변형된 바코드 아트, 가지 끝에 새가 앉아 있는 일러스트",
  },
  {
    src: dinto,
    alt: "립스틱 실루엣과 세리프 타이포를 결합한 바코드 아트",
  },
  {
    src: dokkaebiBrewing,
    alt: "도깨비 얼굴 모티프로 그린 바코드 아트",
  },
  {
    src: unleashia,
    alt: "접시 위 글리터 텍스처로 연출한 입체 바코드 아트 사진",
  },
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
          이메일 없이 전부 공개합니다. 배경과 일러스트는 자유롭게, 스캔을
          지키는 규칙 안에서 디자인합니다.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {SAMPLES.map((s, i) => (
          <div
            key={i}
            className="group overflow-hidden rounded-2xl border border-ink/[0.06] bg-card p-3 shadow-sm transition hover:shadow-md"
          >
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-xl bg-white">
              <Image
                src={s.src}
                alt={s.alt}
                sizes="(min-width: 1024px) 320px, (min-width: 640px) 50vw, 100vw"
                className={`h-full w-full ${s.cover ? "object-cover" : "object-contain"}`}
              />
            </div>
            <p className="px-1 pb-1 pt-3 text-xs text-muted">
              콘셉트 샘플 #{String(i + 1).padStart(2, "0")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
