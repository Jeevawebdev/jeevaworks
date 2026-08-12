"use client";

import { FormEvent, useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { Reveal, FadeScale } from "@/components/motion";
import { useLang } from "@/lib/i18n";

export function Contact() {
  const { t } = useLang();
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [place, setPlace] = useState("");
  const [need, setNeed] = useState<string>(t.contact.needs[0]);

  useEffect(() => {
    setNeed(t.contact.needs[0]);
  }, [t]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    window.open(
      whatsappLink(t.contact.formMsg(name, business, place, need)),
      "_blank",
      "noopener,noreferrer",
    );
  }

  return (
    <section id="contact" className="cv-auto bg-bg px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
        <Reveal className="mx-line">
          <p className="lang-copy text-sm font-semibold uppercase tracking-[0.14em] text-sea">
            {t.contact.eyebrow}
          </p>
          <h2 className="lang-copy mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold tracking-tight text-ink md:text-5xl">
            {t.contact.title}
          </h2>
          <p className="lang-copy mt-4 max-w-md text-base leading-relaxed text-muted md:text-lg">
            {t.contact.body}
          </p>

          <dl className="mt-10 space-y-5 text-base">
            <div>
              <dt className="lang-copy text-sm text-muted">{t.contact.phone}</dt>
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
              <dt className="lang-copy text-sm text-muted">{t.contact.email}</dt>
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
              <dt className="lang-copy text-sm text-muted">{t.contact.based}</dt>
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
            className="mx-card border border-line bg-surface p-6 md:p-8"
          >
            <label className="lang-copy block text-sm font-medium text-ink">
              {t.contact.name}
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 w-full border border-line bg-bg px-3 py-3 text-base outline-none ring-sea focus:ring-2"
                placeholder={t.contact.namePh}
              />
            </label>
            <label className="lang-copy mt-4 block text-sm font-medium text-ink">
              {t.contact.business}
              <input
                value={business}
                onChange={(e) => setBusiness(e.target.value)}
                className="mt-2 w-full border border-line bg-bg px-3 py-3 text-base outline-none ring-sea focus:ring-2"
                placeholder={t.contact.businessPh}
              />
            </label>
            <label className="lang-copy mt-4 block text-sm font-medium text-ink">
              {t.contact.place}
              <input
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                className="mt-2 w-full border border-line bg-bg px-3 py-3 text-base outline-none ring-sea focus:ring-2"
                placeholder={t.contact.placePh}
              />
            </label>
            <label className="lang-copy mt-4 block text-sm font-medium text-ink">
              {t.contact.need}
              <select
                value={need}
                onChange={(e) => setNeed(e.target.value)}
                className="mt-2 w-full border border-line bg-bg px-3 py-3 text-base outline-none ring-sea focus:ring-2"
              >
                {t.contact.needs.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className="btn-press lang-copy mt-7 w-full rounded-md bg-whatsapp px-4 py-3.5 text-base font-semibold text-white hover:opacity-90"
            >
              {t.contact.submit}
            </button>
            <p className="lang-copy mt-3 text-center text-xs text-muted">
              {t.contact.hint}
            </p>
          </form>
        </FadeScale>
      </div>
    </section>
  );
}
