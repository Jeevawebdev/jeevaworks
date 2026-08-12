"use client";

import { useEffect, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { m } from "@/components/motion";

const links = [
  { href: "#services", label: "Services" },
  { href: "#how", label: "How it works" },
  { href: "#packages", label: "Packages" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <m.header
      className={`fixed inset-x-0 top-0 z-30 transition-colors duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-bg-deep/90 backdrop-blur-md"
          : "bg-transparent"
      }`}
      initial={{ y: -16, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 md:px-8">
        <a
          href="#top"
          className="font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white md:text-2xl"
        >
          {site.brand}
        </a>
        <nav className="hidden items-center gap-7 text-sm text-white/80 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="hidden rounded-md border border-white/25 px-3 py-2 text-sm text-white/90 transition hover:border-white/50 hover:bg-white/5 sm:inline-flex"
          >
            Call
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-md bg-white px-3.5 py-2 text-sm font-semibold text-bg-deep transition hover:bg-sea-soft"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </m.header>
  );
}
