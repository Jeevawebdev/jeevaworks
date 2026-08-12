"use client";

import Image from "next/image";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const services = [
  {
    title: "Business website",
    body: "A clean site for your shop, clinic, school, or service — so customers find you on Google and trust you before they call.",
    image: "/images/local-shop.jpg",
    alt: "Local Tamil Nadu shop ready for online presence",
  },
  {
    title: "WhatsApp-ready pages",
    body: "One-tap enquiry buttons, price lists, and location maps. Built for how people in Chennai and nearby towns actually enquire.",
    image: "/images/phone-web.jpg",
    alt: "Business website open on a phone",
  },
  {
    title: "Booking & enquiry apps",
    body: "Simple booking forms, order requests, and admin panels so you stop losing leads buried in chat scrolls.",
    image: "/images/clinic.jpg",
    alt: "Modern local clinic reception",
  },
  {
    title: "Fix & improve existing site",
    body: "Slow, outdated, or hard to update? I refresh speed, mobile view, and contact flow without starting from zero.",
    image: "/images/rural-town.jpg",
    alt: "Rural Tamil Nadu town businesses going digital",
  },
];

export function Services() {
  return (
    <section id="services" className="cv-auto bg-bg px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-line">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sea">
            What I build
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            Digital presence that feels local — not corporate jargon.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            I explain everything in plain language. You get a site your customers
            understand on a phone, in Tamil Nadu network conditions.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-8 sm:grid-cols-2" delay={0.05}>
          {services.map((item, i) => (
            <StaggerItem key={item.title}>
              <article className="mx-card overflow-hidden border border-line bg-surface">
                <div className="relative aspect-[16/10] overflow-hidden bg-sea-soft">
                  <Image
                    src={item.image}
                    alt={item.alt}
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
                  <h3 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-ink">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-base leading-relaxed text-ink-soft">
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
