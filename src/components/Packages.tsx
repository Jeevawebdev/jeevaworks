"use client";

import { whatsappLink } from "@/lib/site";
import { Reveal, Stagger, StaggerItem } from "@/components/motion";

const packages = [
  {
    name: "Starter site",
    price: "₹8,999",
    note: "Best for small shops & services",
    features: [
      "3–5 page mobile-first website",
      "WhatsApp & call buttons",
      "Google Maps location",
      "Basic Google-friendly setup",
      "1 round of revisions",
    ],
  },
  {
    name: "Business site",
    price: "₹14,999",
    note: "Most chosen by local businesses",
    featured: true,
    features: [
      "Up to 8 pages + gallery / menu",
      "Enquiry form + WhatsApp flow",
      "Faster loading & SEO basics",
      "Domain connect help + HTTPS",
      "2 revision rounds + 15-day support",
    ],
  },
  {
    name: "Custom app",
    price: "From ₹24,999",
    note: "Booking, orders, dashboards",
    features: [
      "Custom screens for your workflow",
      "Admin panel for you / staff",
      "Secure login where needed",
      "Hosting guidance on Vercel / cloud",
      "Scoped after a free discovery chat",
    ],
  },
];

export function Packages() {
  return (
    <section id="packages" className="cv-auto bg-bg px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-line">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sea">
            Transparent packages
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            Know the starting price before you message.
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Final quote depends on pages and features — but you will never get a
            surprise bill. Rural and first-time website owners are welcome.
          </p>
        </Reveal>

        <Stagger className="mt-14 grid gap-6 lg:grid-cols-3" delay={0.06}>
          {packages.map((pkg) => (
            <StaggerItem key={pkg.name}>
              <article
                className={`mx-card flex h-full flex-col border p-7 ${
                  pkg.featured
                    ? "border-sea bg-bg-deep text-white"
                    : "border-line bg-surface text-ink"
                }`}
              >
                <h3
                  className={`font-[family-name:var(--font-display)] text-2xl font-semibold ${
                    pkg.featured ? "text-white" : "text-ink"
                  }`}
                >
                  {pkg.name}
                </h3>
                <p
                  className={`mt-1 text-sm ${
                    pkg.featured ? "text-white/70" : "text-muted"
                  }`}
                >
                  {pkg.note}
                </p>
                <p
                  className={`mt-6 font-[family-name:var(--font-display)] text-4xl font-semibold ${
                    pkg.featured ? "text-white" : "text-ink"
                  }`}
                >
                  {pkg.price}
                </p>
                <ul
                  className={`mt-6 flex-1 space-y-3 text-sm leading-relaxed ${
                    pkg.featured ? "text-white/85" : "text-ink-soft"
                  }`}
                >
                  {pkg.features.map((f) => (
                    <li key={f} className="flex gap-2">
                      <span aria-hidden className="mt-0.5 text-gold">
                        ✓
                      </span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappLink(
                    `Hi Jeeva, I'm interested in the ${pkg.name} package (${pkg.price}).`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
className={`mt-8 inline-flex items-center justify-center rounded-md px-4 py-3 text-sm font-semibold btn-press ${
                  pkg.featured
                    ? "bg-accent text-white hover:bg-accent-hover"
                    : "bg-sea text-white hover:opacity-90"
                }`}
                >
                  Ask about this package
                </a>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
