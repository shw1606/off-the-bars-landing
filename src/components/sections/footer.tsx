import { buildMailto } from "@/lib/mailto";
import { site } from "@/lib/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  const b = site.business;

  return (
    <footer className="border-t border-line bg-card">
      <div className="mx-auto max-w-5xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          <div>
            <p className="text-lg font-bold tracking-tight text-ink">
              {site.brand}
            </p>
            <p className="mt-2 max-w-xs text-sm text-muted">
              뺄 수 없는 바코드를, 브랜드의 일부로. 스캔되는 바코드 아트.
            </p>
          </div>

          <nav className="grid gap-2 text-sm">
            <a
              href={buildMailto()}
              className="text-ink hover:text-accent"
            >
              {site.email}
            </a>
            <a
              href={site.instagram || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-accent"
            >
              Instagram
            </a>
            {site.notionUrl ? (
              <a
                href={site.notionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted hover:text-accent"
              >
                팀 소개
              </a>
            ) : null}
          </nav>
        </div>

        <div className="mt-10 border-t border-line pt-6 text-xs leading-relaxed text-muted">
          <p>
            {[
              b.name,
              b.representative && `대표 ${b.representative}`,
              b.registrationNumber && `사업자등록번호 ${b.registrationNumber}`,
              `문의 ${site.email}`,
            ]
              .filter(Boolean)
              .join(" · ")}
          </p>
          <p className="mt-1">
            © {year} {site.brand}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
