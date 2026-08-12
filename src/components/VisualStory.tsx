"use client";

import Image from "next/image";
import { Reveal, FadeScale } from "@/components/motion";

export function VisualStory() {
  return (
    <section className="bg-bg px-5 py-16 md:px-8 md:py-24">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sea">
            From street to screen
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            Your business already has trust offline. I help you carry that trust
            online.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-4 md:grid-cols-12 md:grid-rows-2">
          <FadeScale className="relative md:col-span-7 md:row-span-2 min-h-[280px] md:min-h-[420px] overflow-hidden">
            <Image
              src="/images/rural-town.jpg"
              alt="Rural Tamil Nadu town ready for digital growth"
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              quality={72}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
            <p className="absolute bottom-5 left-5 right-5 font-[family-name:var(--font-display)] text-2xl font-semibold text-white md:text-3xl">
              Towns & villages across Tamil Nadu
            </p>
          </FadeScale>

          <FadeScale
            delay={0.1}
            className="relative md:col-span-5 min-h-[200px] overflow-hidden"
          >
            <Image
              src="/images/local-shop.jpg"
              alt="Local shop interior"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              quality={70}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <p className="absolute bottom-4 left-4 text-lg font-semibold text-white">
              Shops that customers already love
            </p>
          </FadeScale>

          <FadeScale
            delay={0.18}
            className="relative md:col-span-5 min-h-[200px] overflow-hidden"
          >
            <Image
              src="/images/phone-web.jpg"
              alt="Website on phone"
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover transition-transform duration-700 hover:scale-[1.03]"
              quality={70}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
            <p className="absolute bottom-4 left-4 text-lg font-semibold text-white">
              A clear site on every phone
            </p>
          </FadeScale>
        </div>
      </div>
    </section>
  );
}
