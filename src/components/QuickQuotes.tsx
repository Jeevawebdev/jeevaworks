"use client";

import { whatsappLink } from "@/lib/site";
import { useLang } from "@/lib/i18n";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

export function QuickQuotes() {
  const { t } = useLang();

  return (
    <section
      id="quote"
      className="cv-auto border-y border-line bg-sea-soft px-5 py-16 md:px-8 md:py-20"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-line">
          <p className="lang-copy text-sm font-semibold uppercase tracking-[0.14em] text-sea">
            {t.quotes.eyebrow}
          </p>
          <h2 className="lang-copy mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {t.quotes.title}
          </h2>
          <p className="lang-copy mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">
            {t.quotes.body}
          </p>
        </Reveal>

        <Stagger className="mt-10 grid gap-4 sm:grid-cols-3" delay={0.05}>
          {t.quotes.items.map((item) => (
            <StaggerItem key={item.id}>
              <a
                href={whatsappLink(item.message)}
                target="_blank"
                rel="noopener noreferrer"
                className="mx-card btn-press flex h-full flex-col border border-sea/20 bg-white p-6 transition-colors hover:border-sea"
              >
                <span className="lang-copy font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
                  {item.label}
                </span>
                <span className="lang-copy mt-2 flex-1 text-sm leading-relaxed text-muted">
                  {item.desc}
                </span>
                <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-whatsapp">
                  WhatsApp
                  <span aria-hidden>→</span>
                </span>
              </a>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
