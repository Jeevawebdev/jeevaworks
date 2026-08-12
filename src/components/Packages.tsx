"use client";

import { whatsappLink } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { useLang } from "@/lib/i18n";

const prices = ["₹8,999", "₹14,999", "From ₹24,999"] as const;
const featuredIndex = 1;

export function Packages() {
  const { t, lang } = useLang();

  return (
    <section id="packages" className="cv-auto bg-bg px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-line">
          <p className="lang-copy text-sm font-semibold uppercase tracking-[0.14em] text-sea">
            {t.packages.eyebrow}
          </p>
          <h2 className="lang-copy mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            {t.packages.title}
          </h2>
          <p className="lang-copy mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {t.packages.body}
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3" delay={0.06}>
          {t.packages.items.map((pkg, i) => {
            const featured = i === featuredIndex;
            const price = prices[i];
            const askMsg =
              lang === "ta"
                ? `வணக்கம் ஜீவா, ${pkg.name} பேக்கேஜ் (${price}) பற்றி தெரிந்துகொள்ள விரும்புகிறேன்.`
                : `Hi Jeeva, I'm interested in the ${pkg.name} package (${price}).`;

            return (
              <StaggerItem key={pkg.name}>
                <article
                  className={`mx-card flex h-full flex-col border p-7 ${
                    featured
                      ? "border-sea bg-bg-deep text-white"
                      : "border-line bg-surface text-ink"
                  }`}
                >
                  <h3
                    className={`lang-copy font-[family-name:var(--font-display)] text-2xl font-semibold ${
                      featured ? "text-white" : "text-ink"
                    }`}
                  >
                    {pkg.name}
                  </h3>
                  <p
                    className={`lang-copy mt-1 text-sm ${
                      featured ? "text-white/70" : "text-muted"
                    }`}
                  >
                    {pkg.note}
                  </p>
                  <p
                    className={`mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold ${
                      featured ? "text-white" : "text-ink"
                    }`}
                  >
                    {price}
                  </p>
                  <ul
                    className={`mt-6 flex-1 space-y-3 text-sm leading-relaxed ${
                      featured ? "text-white/85" : "text-ink-soft"
                    }`}
                  >
                    {pkg.features.map((f) => (
                      <li key={f} className="lang-copy flex gap-2">
                        <span aria-hidden className="mt-0.5 text-gold">
                          ✓
                        </span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a
                    href={whatsappLink(askMsg)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`btn-press lang-copy mt-8 inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold ${
                      featured
                        ? "bg-accent text-white hover:bg-accent-hover"
                        : "bg-sea text-white hover:opacity-90"
                    }`}
                  >
                    {t.packages.ask}
                  </a>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
