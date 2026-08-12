"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import { MediaReveal, Reveal, Stagger, StaggerItem } from "@/components/motion";

const trust = [
  "Chennai-based — easy to talk to in English or Tamil",
  "You talk to me directly — no agency hand-offs",
  "Clear packages before we start — no surprise bills",
];

export function About() {
  return (
    <section
      id="about"
      className="cv-auto overflow-hidden bg-bg-deep px-5 py-20 text-white md:px-8 md:py-28"
    >
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <MediaReveal className="relative mx-auto max-w-md overflow-hidden rounded-[2rem] border border-white/15 bg-white/5">
          <div className="relative aspect-[4/5]">
            <Image
              src="/images/jeeva.webp"
              alt={`${site.name} portrait`}
              fill
              sizes="(max-width: 768px) 80vw, 360px"
              className="object-cover object-[center_15%]"
              quality={78}
              loading="lazy"
            />
          </div>
        </MediaReveal>

        <div>
          <Reveal className="mx-line" variant="right">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-white/55">
              About
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight md:text-5xl">
              I&apos;m {site.name} — the person behind {site.brand}.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-white/80 md:text-lg">
              I help local businesses go online with websites and apps that are
              practical, affordable, and easy to use — whether you are in
              Chennai, a suburb, or a rural town.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/70">
              You deal with me directly. No pressure sales.
            </p>
          </Reveal>

          <Stagger className="mt-8 space-y-0" delay={0.08}>
            {trust.map((item) => (
              <StaggerItem key={item}>
                <p className="border-b border-white/10 py-4 text-sm leading-relaxed text-white/85 md:text-base">
                  {item}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
