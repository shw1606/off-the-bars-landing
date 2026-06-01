import Link from "next/link";
import { CtaButton } from "@/components/cta-button";
import { buildMailto } from "@/lib/mailto";
import { site } from "@/lib/site";

export function SiteNav() {
  return (
    <header className="sticky top-0 z-50 border-b border-line/70 bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-5">
        <Link
          href="/"
          className="text-base font-bold tracking-tight text-ink"
        >
          {site.brand}
        </Link>
        <div className="flex items-center gap-5">
          <Link
            href="#pricing"
            className="hidden text-sm text-muted hover:text-ink sm:inline"
          >
            가격
          </Link>
          <CtaButton
            href={buildMailto()}
            event="cta_mailto_click"
            location="nav"
            className="px-4 py-2 text-xs"
          >
            베타 문의
          </CtaButton>
        </div>
      </div>
    </header>
  );
}
