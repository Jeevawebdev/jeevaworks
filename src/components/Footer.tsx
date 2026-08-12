import { site, whatsappLink } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line bg-bg px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
            {site.brand}
          </p>
          <p className="mt-1 text-sm text-muted">
            {site.domain} · {site.location}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 text-sm">
          <a href={site.phoneHref} className="text-ink-soft hover:text-sea">
            {site.phone}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="text-ink-soft hover:text-sea"
          >
            {site.email}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink-soft hover:text-sea"
          >
            WhatsApp
          </a>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-6xl text-xs text-muted">
        © {new Date().getFullYear()} {site.brand}. Websites & applications for
        Chennai and Tamil Nadu.
      </p>
    </footer>
  );
}
