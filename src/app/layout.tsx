import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { site } from "@/lib/site";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = `${site.brand} — 스캔되는 바코드 아트`;
const description =
  "뺄 수 없는 바코드를 브랜드 톤 일러스트로. 막대·여백 규격은 그대로, 실제 매장 POS에서 스캔되는 것까지 책임집니다. 안 읽히면 전액 환불.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistMono.variable} h-full`}>
      <head>
        {/* Pretendard (한글 본문 폰트) — 동적 서브셋 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.css"
        />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
