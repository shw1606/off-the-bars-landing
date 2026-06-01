// 일회성 아이콘 생성기: src/app/icon.svg → favicon.ico(16/32/48) + apple-icon.png(180)
// 실행: node scripts/gen-icons.mjs   (sharp 필요 — 이미 dependency에 있음)
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "src/app/icon.svg"));

// iOS 홈스크린용: 풀블리드(테두리·라운드 없음, iOS가 자동 마스킹), 여백 넉넉히
const apple = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#faf9f6"/>
  <g transform="translate(28,28) scale(3.875)">
    <g fill="#14161c">
      <rect x="6"  y="12" width="2.5" height="13" rx="0.6"/>
      <rect x="16" y="12" width="2.5" height="13" rx="0.6"/>
      <rect x="20" y="12" width="2.5" height="13" rx="0.6"/>
      <rect x="24" y="12" width="2"   height="13" rx="0.6"/>
    </g>
    <rect x="10.5" y="9" width="3.5" height="16" rx="0.6" fill="#14161c"/>
    <path d="M10.5 9 L12.25 4.5 L14 9 Z" fill="#4338ca"/>
  </g>
</svg>`);

const png = (src, size) =>
  sharp(src, { density: 384 }).resize(size, size).png().toBuffer();

// 여러 PNG를 .ico 컨테이너로 패킹 (Vista+ PNG-embedded ICO)
function buildIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);

  const dir = Buffer.alloc(16 * entries.length);
  let offset = 6 + dir.length;
  const blobs = [];
  entries.forEach((e, i) => {
    const o = i * 16;
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, o); // width
    dir.writeUInt8(e.size >= 256 ? 0 : e.size, o + 1); // height
    dir.writeUInt8(0, o + 2); // palette
    dir.writeUInt8(0, o + 3); // reserved
    dir.writeUInt16LE(1, o + 4); // color planes
    dir.writeUInt16LE(32, o + 6); // bits per pixel
    dir.writeUInt32LE(e.data.length, o + 8);
    dir.writeUInt32LE(offset, o + 12);
    offset += e.data.length;
    blobs.push(e.data);
  });
  return Buffer.concat([header, dir, ...blobs]);
}

const sizes = [16, 32, 48];
const pngs = await Promise.all(sizes.map((s) => png(svg, s)));
const ico = buildIco(sizes.map((size, i) => ({ size, data: pngs[i] })));
writeFileSync(join(root, "src/app/favicon.ico"), ico);

const applePng = await png(apple, 180);
writeFileSync(join(root, "src/app/apple-icon.png"), applePng);

console.log("✓ favicon.ico", ico.length, "bytes (16/32/48)");
console.log("✓ apple-icon.png", applePng.length, "bytes (180×180)");
