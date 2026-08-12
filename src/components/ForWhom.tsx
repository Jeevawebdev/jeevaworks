"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const items = [
  "Kirana & retail shops",
  "Clinics & labs",
  "Tuition & schools",
  "Travel & real estate",
  "Restaurants & cafés",
  "Service providers in towns",
];

export function ForWhom() {
  return (
    <section className="border-y border-line bg-surface px-5 py-12 md:px-8 md:py-16">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sea">
            Built for local businesses
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-ink md:text-3xl">
            If your customers find you by phone, WhatsApp, or word of mouth — this
            site is for you.
          </h2>
        </Reveal>
        <Stagger className="mt-8 flex flex-wrap gap-x-6 gap-y-3" delay={0.08}>
          {items.map((item) => (
            <StaggerItem key={item}>
              <span className="inline-flex items-center gap-2 text-sm text-ink-soft md:text-base">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden />
                {item}
              </span>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
