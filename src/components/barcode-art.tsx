/**
 * 결정론적(SSR-safe) 바코드 아트 SVG.
 * 규격 바코드(어두운 막대)는 그대로 두고, 그 아래로 일러스트 실루엣이 자라나는 구성 —
 * "막대·여백은 신성불가침, 그 바깥은 자유"라는 제품 정의를 그대로 시각화합니다.
 * (실제 시안이 준비되면 <Image>로 교체하세요.)
 */
export type Motif =
  | "mountains"
  | "skyline"
  | "waves"
  | "hills"
  | "pines"
  | "blocks";

const INK = "#14161c";
const W = 320;
const H = 200;
const PAD = 26; // 여백(quiet zone) 시각 표현
const BAR_TOP = 30;
const BASE = 132; // 바코드 베이스라인
const MOTIF_BOT = 168;

// mulberry32 — 시드 기반 결정론적 난수 (하이드레이션 안전)
function rng(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function makeBars(seed: number) {
  const rand = rng(seed);
  const out: { x: number; w: number; long: boolean }[] = [];
  const right = W - PAD;
  let x = PAD;
  let i = 0;
  while (x < right - 2) {
    const w = [1.6, 2.2, 2.8, 3.6, 4.6][Math.floor(rand() * 5)];
    if (x + w > right) break;
    out.push({ x, w, long: i % 6 === 3 });
    x += w + [1.6, 2.2, 3.2][Math.floor(rand() * 3)];
    i++;
  }
  return out;
}

function makeDigits(seed: number) {
  const rand = rng(seed * 7 + 13);
  let d = "";
  for (let i = 0; i < 13; i++) d += Math.floor(rand() * 10);
  return `${d[0]} ${d.slice(1, 7)} ${d.slice(7)}`;
}

function makeMotif(m: Motif, seed: number) {
  const rand = rng(seed * 31 + 5);
  const x0 = PAD;
  const x1 = W - PAD;
  const w = x1 - x0;
  const base = BASE + 6;
  const maxH = MOTIF_BOT - base;

  switch (m) {
    case "mountains":
    case "pines": {
      const peaks = m === "pines" ? 7 : 5;
      let d = `M ${x0} ${base} `;
      for (let i = 0; i <= peaks; i++) {
        const px = x0 + (w * i) / peaks;
        const down = i % 2 === 0 ? maxH * (0.55 + rand() * 0.45) : maxH * 0.12;
        d += `L ${px.toFixed(1)} ${(base + down).toFixed(1)} `;
      }
      d += `L ${x1} ${base} Z`;
      return d;
    }
    case "skyline":
    case "blocks": {
      const n = m === "blocks" ? 6 : 9;
      const bw = w / n;
      let d = "";
      for (let i = 0; i < n; i++) {
        const bx = x0 + i * bw;
        const bh = maxH * (0.3 + rand() * 0.7);
        const pad = bw * 0.14;
        const innerW = bw - pad * 2;
        d += `M ${(bx + pad).toFixed(1)} ${base} h ${innerW.toFixed(
          1,
        )} v ${bh.toFixed(1)} h ${(-innerW).toFixed(1)} Z `;
      }
      return d;
    }
    case "waves":
    case "hills":
    default: {
      const amp = m === "hills" ? maxH * 0.72 : maxH * 0.55;
      const seg = 6;
      let d = `M ${x0} ${base} `;
      for (let i = 0; i < seg; i++) {
        const px0 = x0 + (w * i) / seg;
        const px1 = x0 + (w * (i + 1)) / seg;
        const cy = base + amp * (0.6 + rand() * 0.4) * (i % 2 === 0 ? 1 : 0.5);
        d += `Q ${((px0 + px1) / 2).toFixed(1)} ${cy.toFixed(1)} ${px1.toFixed(
          1,
        )} ${base} `;
      }
      d += `L ${x1} ${MOTIF_BOT} L ${x0} ${MOTIF_BOT} Z`;
      return d;
    }
  }
}

export function BarcodeArt({
  seed = 1,
  motif = "mountains",
  tint = "#eef0ff",
  className = "",
}: {
  seed?: number;
  motif?: Motif;
  tint?: string;
  className?: string;
}) {
  const bars = makeBars(seed);
  const hri = makeDigits(seed);
  const motifPath = makeMotif(motif, seed);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="바코드 아트 콘셉트 예시"
      className={className}
      style={{ display: "block" }}
    >
      <rect x="0" y="0" width={W} height={H} rx="16" fill={tint} />
      <rect
        x="0.5"
        y="0.5"
        width={W - 1}
        height={H - 1}
        rx="15.5"
        fill="none"
        stroke="rgba(20,22,28,0.07)"
      />
      {bars.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={BAR_TOP}
          width={b.w}
          height={(b.long ? BASE + 10 : BASE) - BAR_TOP}
          fill={INK}
        />
      ))}
      <path d={motifPath} fill={INK} />
      <text
        x={W / 2}
        y={H - 14}
        textAnchor="middle"
        fontFamily="ui-monospace, 'Geist Mono', monospace"
        fontSize="11"
        letterSpacing="2"
        fill={INK}
        opacity="0.7"
      >
        {hri}
      </text>
    </svg>
  );
}
