"use client";

import Image from "next/image";
import { site, whatsappLink } from "@/lib/site";
import { useLang } from "@/lib/i18n";

export function Hero() {
  const { t, lang } = useLang();
  const waMsg =
    lang === "ta"
      ? "வணக்கம் ஜீவா, என் வணிகத்திற்கு வலைத்தளம் / ஆப் வேண்டும். jeevaworks.in இல் பார்த்தேன்."
      : "Hi Jeeva, I need a website for my business in Chennai / Tamil Nadu.";

  return (
    <section
      id="top"
      className="hero-stage relative min-h-[100svh] overflow-hidden text-white"
    >
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/chennai-street.jpg"
          alt="Busy Chennai commercial street at golden hour"
          fill
          priority
          sizes="100vw"
          className="hero-bg-zoom object-cover"
          quality={70}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062e2c]/94 via-[#0a3d3a]/84 to-[#0a3d3a]/58" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-6xl items-end gap-10 px-5 pb-16 pt-28 md:grid-cols-[1.15fr_0.85fr] md:items-center md:px-8 md:pb-20 md:pt-28">
        <div className="hero-copy">
          <p className="lang-copy text-sm font-medium tracking-wide text-white/75 md:text-base">
            {t.hero.greeting}
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.75rem,8vw,5.25rem)] font-semibold leading-[0.95] tracking-tight">
            {site.brand}
          </h1>
          <p className="lang-copy mt-5 max-w-xl text-lg leading-relaxed text-white/88 md:text-xl">
            {t.hero.body}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={whatsappLink(waMsg)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-press lang-copy inline-flex items-center justify-center rounded-md bg-accent px-6 py-3.5 text-base font-semibold text-white hover:bg-accent-hover"
            >
              {t.hero.ctaWhatsapp}
            </a>
            <a
              href="#packages"
              className="btn-press lang-copy inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3.5 text-base font-medium text-white hover:bg-white/10"
            >
              {t.hero.ctaPackages}
            </a>
          </div>
          <p className="lang-copy mt-6 text-sm text-white/60">{t.hero.serving}</p>
        </div>

        <div className="hero-portrait relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="hero-float relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-[#0a3d3a] shadow-[0_24px_60px_rgba(0,0,0,0.28)]">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/jeeva.webp"
                alt={`${site.name}, founder of ${site.brand}`}
                fill
                priority
                sizes="(max-width: 768px) 70vw, 340px"
                className="object-cover object-[center_15%]"
                quality={82}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#062e2c]/92 via-[#062e2c]/40 to-transparent p-5 pt-20">
                <p className="font-[family-name:var(--font-display)] text-xl font-semibold">
                  {site.name}
                </p>
                <p className="lang-copy text-sm text-white/75">{t.hero.role}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
