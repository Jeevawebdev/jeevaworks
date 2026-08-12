"use client";

import Image from "next/image";
import { site, whatsappLink } from "@/lib/site";
import { FadeScale, Reveal, m } from "@/components/motion";

export function Hero() {
  return (
    <section
      id="top"
      className="grain relative min-h-[100svh] overflow-hidden text-white"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/chennai-street.jpg"
          alt="Busy Chennai commercial street at golden hour"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-105 will-change-transform"
          quality={75}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#062e2c]/94 via-[#0a3d3a]/82 to-[#0a3d3a]/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/25" />
      </div>

      <div className="relative z-10 mx-auto grid min-h-[100svh] max-w-6xl items-end gap-10 px-5 pb-16 pt-28 md:grid-cols-[1.15fr_0.85fr] md:items-center md:px-8 md:pb-20 md:pt-28">
        <div>
          <Reveal>
            <p className="text-sm font-medium tracking-wide text-white/75 md:text-base">
              வணக்கம் · Based in {site.location}
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-[clamp(2.75rem,8vw,5.25rem)] font-semibold leading-[0.95] tracking-tight">
              {site.brand}
            </h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-white/88 md:text-xl">
              Simple websites and apps that help shops, clinics, and local
              businesses get found, get trusted, and get more customers.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href={whatsappLink(
                  "Hi Jeeva, I need a website for my business in Chennai / Tamil Nadu.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-md bg-accent px-6 py-3.5 text-base font-semibold text-white transition hover:bg-accent-hover"
              >
                Message on WhatsApp
              </a>
              <a
                href="#packages"
                className="inline-flex items-center justify-center rounded-md border border-white/30 px-6 py-3.5 text-base font-medium text-white transition hover:bg-white/10"
              >
                See packages
              </a>
            </div>
            <p className="mt-6 text-sm text-white/60">
              Serving {site.serving}
            </p>
          </Reveal>
        </div>

        <FadeScale delay={0.2} className="relative mx-auto w-full max-w-sm md:max-w-none">
          <m.div
            className="relative"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-accent/35 via-white/10 to-sea/30 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/images/jeeva.webp"
                  alt={`${site.name}, founder of ${site.brand}`}
                  fill
                  priority
                  sizes="(max-width: 768px) 80vw, 360px"
                  className="object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#062e2c]/90 via-[#062e2c]/35 to-transparent p-5 pt-20">
                  <p className="font-[family-name:var(--font-display)] text-xl font-semibold">
                    {site.name}
                  </p>
                  <p className="text-sm text-white/75">
                    Your local web & app partner
                  </p>
                </div>
              </div>
            </div>
          </m.div>
        </FadeScale>
      </div>
    </section>
  );
}
