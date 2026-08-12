"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { useLang } from "@/lib/i18n";
import { LangToggle } from "@/components/LangToggle";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { t } = useLang();

  const links = [
    { href: "#services", label: t.nav.services },
    { href: "#quote", label: t.nav.quote },
    { href: "#packages", label: t.nav.packages },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 24);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-30 transition-[background-color,border-color] duration-200 ${
        scrolled
          ? "border-b border-white/10 bg-bg-deep/95"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-4 md:px-8">
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white md:text-2xl"
        >
          {site.brand}
        </a>
        <nav className="hidden items-center gap-6 text-sm text-white/80 lg:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="lang-copy transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <LangToggle light />
          <a
            href={site.phoneHref}
            className="lang-copy hidden rounded-md border border-white/25 px-3 py-2 text-sm text-white/90 transition-colors hover:border-white/50 hover:bg-white/5 sm:inline-flex"
          >
            {t.nav.call}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="lang-copy inline-flex items-center rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-bg-deep transition-colors hover:bg-sea-soft"
          >
            {t.nav.whatsapp}
          </a>
        </div>
      </div>
    </header>
  );
}
