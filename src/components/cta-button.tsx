"use client";

import type { ReactNode } from "react";
import { track } from "@vercel/analytics";

type Props = {
  href: string;
  /** Vercel Analytics 커스텀 이벤트 이름 */
  event: string;
  /** 클릭 위치 (hero / nav / pricing ...) */
  location: string;
  variant?: "primary" | "secondary";
  external?: boolean;
  className?: string;
  children: ReactNode;
};

export function CtaButton({
  href,
  event,
  location,
  variant = "primary",
  external = false,
  className = "",
  children,
}: Props) {
  const isPrimary = variant === "primary";
  const base =
    "relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 text-sm font-semibold transition active:scale-[0.98]";
  const styles = isPrimary
    ? "cta-primary bg-ink text-background shadow-sm hover:bg-ink/90"
    : "border border-ink/15 bg-card text-ink hover:border-ink/40";

  return (
    <a
      href={href}
      onClick={() => track(event, { location })}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className={`${base} ${styles} ${className}`}
    >
      {/* 메인 CTA 뒤로 흐르는 홀로그램 바코드 — globals.css의 .cta-holo
          (누르고 있는 동안엔 .cta-primary:active 규칙이 숨기고 빨강 오버레이) */}
      {isPrimary && <span aria-hidden className="cta-holo" />}
      <span className="relative z-[1] inline-flex items-center gap-2">
        {children}
      </span>
    </a>
  );
}
