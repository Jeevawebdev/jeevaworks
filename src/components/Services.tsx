"use client";

import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";
import { useLang } from "@/lib/i18n";

const images = [
  {
    image: "/images/local-shop.jpg",
    alt: "Local Tamil Nadu shop ready for online presence",
  },
  {
    image: "/images/phone-web.jpg",
    alt: "Business website open on a phone",
  },
  {
    image: "/images/clinic.jpg",
    alt: "Modern local clinic reception",
  },
  {
    image: "/images/rural-town.jpg",
    alt: "Rural Tamil Nadu town businesses going digital",
  },
];

export function Services() {
  const { t } = useLang();

  return (
    <section id="services" className="cv-auto bg-bg px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-line">
          <p className="lang-copy text-sm font-semibold uppercase tracking-[0.14em] text-sea">
            {t.services.eyebrow}
          </p>
          <h2 className="lang-copy mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            {t.services.title}
          </h2>
          <p className="lang-copy mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            {t.services.body}
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-8 sm:grid-cols-2" delay={0.05}>
          {t.services.items.map((item, i) => (
            <StaggerItem key={item.title}>
              <article className="mx-card overflow-hidden border border-line bg-surface">
                <div className="relative aspect-[16/10] overflow-hidden bg-sea-soft">
                  <Image
                    src={images[i].image}
                    alt={images[i].alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover"
                    quality={62}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  <span className="absolute bottom-3 left-4 text-sm font-medium text-white/90">
                    0{i + 1}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="lang-copy font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="lang-copy mt-3 text-base leading-relaxed text-ink-soft">
                    {item.body}
                  </p>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
