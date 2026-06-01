// 일회성 아이콘 생성기: src/app/icon.svg → favicon.ico(16/32/48) + apple-icon.png(180)
// 실행: node scripts/gen-icons.mjs   (sharp 필요 — 이미 dependency에 있음)
import sharp from "sharp";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "src/app/icon.svg"));

// iOS 홈스크린용: 풀블리드 다크 배경(iOS가 모서리 자동 마스킹), icon.svg를 5.625배 확대
const apple = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 180 180">
  <rect width="180" height="180" fill="#14161c"/>
  <g transform="scale(5.625)">
    <g fill="#faf9f6">
      <rect x="5.5"  y="6.5" width="2.0" height="14"/>
      <rect x="8.4"  y="6.5" width="1.3" height="14"/>
      <rect x="10.6" y="6.5" width="2.6" height="14"/>
      <rect x="14.1" y="6.5" width="1.3" height="14"/>
      <rect x="16.3" y="6.5" width="2.2" height="14"/>
      <rect x="19.4" y="6.5" width="1.3" height="14"/>
      <rect x="21.6" y="6.5" width="2.6" height="14"/>
      <rect x="25.1" y="6.5" width="1.4" height="14"/>
    </g>
    <path d="M5 25.5 L10 19 L13.5 22.5 L19 16 L27 25.5 Z" fill="#4338ca"/>
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
