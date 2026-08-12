"use client";

import { FormEvent, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { Reveal, FadeScale } from "@/components/motion";

export function Contact() {
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [place, setPlace] = useState("");
  const [need, setNeed] = useState("Business website");

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const text = [
      `Hi Jeeva, this is ${name || "a client"}.`,
      business ? `Business: ${business}.` : "",
      place ? `Location: ${place}.` : "",
      `I need: ${need}.`,
      "Saw you on jeevaworks.in.",
    ]
      .filter(Boolean)
      .join(" ");
    window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
  }

  return (
    <section id="contact" className="bg-bg px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <Reveal>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-sea">
            Contact
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            Let&apos;s talk about your business online.
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted md:text-lg">
            Prefer WhatsApp? Most clients do. Fill the short form and it opens a
            ready message — or call me directly.
          </p>

          <dl className="mt-10 space-y-5 text-base">
            <div>
              <dt className="text-sm text-muted">Phone / WhatsApp</dt>
              <dd>
                <a
                  href={site.phoneHref}
                  className="font-semibold text-ink hover:text-sea"
                >
                  {site.phone}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Email</dt>
              <dd>
                <a
                  href={`mailto:${site.email}`}
                  className="font-semibold text-ink hover:text-sea"
                >
                  {site.email}
                </a>
              </dd>
            </div>
            <div>
              <dt className="text-sm text-muted">Based in</dt>
              <dd className="font-semibold text-ink">{site.location}</dd>
            </div>
            <div>
              <dt className="text-sm text-muted">LinkedIn</dt>
              <dd>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink hover:text-sea"
                >
                  linkedin.com/in/jeevawebd
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <FadeScale delay={0.1}>
        <form
          onSubmit={onSubmit}
          className="border border-line bg-surface p-6 md:p-8"
        >
          <label className="block text-sm font-medium text-ink">
            Your name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full border border-line bg-bg px-3 py-3 text-base outline-none ring-sea focus:ring-2"
              placeholder="e.g. Ramesh"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-ink">
            Business name
            <input
              value={business}
              onChange={(e) => setBusiness(e.target.value)}
              className="mt-2 w-full border border-line bg-bg px-3 py-3 text-base outline-none ring-sea focus:ring-2"
              placeholder="e.g. Sri Krishna Stores"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-ink">
            Area / town
            <input
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              className="mt-2 w-full border border-line bg-bg px-3 py-3 text-base outline-none ring-sea focus:ring-2"
              placeholder="e.g. Tambaram / Villupuram"
            />
          </label>
          <label className="mt-4 block text-sm font-medium text-ink">
            What do you need?
            <select
              value={need}
              onChange={(e) => setNeed(e.target.value)}
              className="mt-2 w-full border border-line bg-bg px-3 py-3 text-base outline-none ring-sea focus:ring-2"
            >
              <option>Business website</option>
              <option>WhatsApp-ready landing page</option>
              <option>Booking / enquiry app</option>
              <option>Fix my existing website</option>
              <option>Not sure — need advice</option>
            </select>
          </label>
          <button
            type="submit"
            className="mt-7 w-full rounded-md bg-whatsapp px-4 py-3.5 text-base font-semibold text-white transition hover:opacity-90"
          >
            Continue on WhatsApp
          </button>
          <p className="mt-3 text-center text-xs text-muted">
            Opens WhatsApp with your details filled in. No spam.
          </p>
        </form>
        </FadeScale>
      </div>
    </section>
  );
}
