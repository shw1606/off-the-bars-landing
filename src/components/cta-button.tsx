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
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-ink text-background shadow-sm hover:bg-ink/90"
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
      {children}
    </a>
  );
}
