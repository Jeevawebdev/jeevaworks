"use client";

import { useLang, type Lang } from "@/lib/i18n";

export function LangToggle({ light = false }: { light?: boolean }) {
  const { lang, setLang } = useLang();

  const btn = (code: Lang, label: string) => {
    const active = lang === code;
    return (
      <button
        type="button"
        onClick={() => setLang(code)}
        aria-pressed={active}
        className={`rounded px-2.5 py-1 text-xs font-semibold tracking-wide transition-colors ${
          active
            ? light
              ? "bg-white text-bg-deep"
              : "bg-sea text-white"
            : light
              ? "text-white/75 hover:text-white"
              : "text-muted hover:text-ink"
        }`}
      >
        {label}
      </button>
    );
  };

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-md border p-0.5 ${
        light ? "border-white/25 bg-white/10" : "border-line bg-surface"
      }`}
      role="group"
      aria-label="Language"
    >
      {btn("en", "EN")}
      {btn("ta", "தமிழ்")}
    </div>
  );
}
