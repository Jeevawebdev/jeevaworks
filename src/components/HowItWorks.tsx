"use client";

import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const steps = [
  {
    title: "Talk on WhatsApp or call",
    body: "Tell me about your business, area, and what customers should do on the site — call, visit, book, or order.",
  },
  {
    title: "Clear plan & price",
    body: "You get a simple package, timeline, and what is included. No confusing tech talk.",
  },
  {
    title: "Build, review, go live",
    body: "I build on mobile first, share preview links, and help connect your domain with secure HTTPS.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="cv-auto bg-sea-soft px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-line">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sea">
            Simple process
          </p>
          <h2 className="mt-3 max-w-xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            From first message to a live website.
          </h2>
        </Reveal>

        <Stagger className="mt-14 grid gap-8 md:grid-cols-3" delay={0.06}>
          {steps.map((step, i) => (
            <StaggerItem key={step.title}>
              <div className="mx-card h-full border border-sea/15 bg-white p-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-sea text-sm font-bold text-white">
                  {i + 1}
                </div>
                <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">
                  {step.body}
                </p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
