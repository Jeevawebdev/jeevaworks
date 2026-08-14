"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";
import { site, whatsappLink } from "@/lib/site";
import { useLang } from "@/lib/i18n";
import { followUps, matchIntent, type ChatIntent } from "@/lib/chatbot";

type Msg = { id: number; from: "bot" | "user"; text: string; at: string };
type Step = "idle" | "biz" | "place" | "need";

function stamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function Chatbot() {
  const { t, lang } = useLang();
  const [open, setOpen] = useState(false);
  const [nudge, setNudge] = useState(false);
  const [input, setInput] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [step, setStep] = useState<Step>("idle");
  const [draft, setDraft] = useState({ biz: "", place: "", need: "" });
  const [lastIntent, setLastIntent] = useState<ChatIntent>("hello");
  const listRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(1);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    setMsgs([{ id: 0, from: "bot", text: t.chat.greeting, at: stamp() }]);
    setStep("idle");
    setDraft({ biz: "", place: "", need: "" });
    idRef.current = 1;
  }, [t.chat.greeting]);

  useEffect(() => {
    const seen = sessionStorage.getItem("jw-chat-nudge");
    if (seen) return;
    const id = window.setTimeout(() => setNudge(true), 7000);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [msgs, typing, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    return () => timers.current.forEach((id) => window.clearTimeout(id));
  }, []);

  function push(from: Msg["from"], text: string) {
    const id = idRef.current++;
    setMsgs((prev) => [...prev, { id, from, text, at: stamp() }]);
  }

  function say(text: string) {
    setTyping(true);
    const id = window.setTimeout(() => {
      setTyping(false);
      push("bot", text);
    }, 700);
    timers.current.push(id);
  }

  function startQuote() {
    setStep("biz");
    setDraft({ biz: "", place: "", need: "" });
    say(t.chat.flow.bizPrompt);
  }

  function handleIntent(intent: ChatIntent) {
    setLastIntent(intent);
    if (intent === "quote") {
      startQuote();
      return;
    }
    say(t.chat.replies[intent] ?? t.chat.replies.fallback);
  }

  function onChip(id: string, label: string) {
    push("user", label);
    if (step === "biz") {
      setDraft((d) => ({ ...d, biz: label }));
      setStep("place");
      say(t.chat.flow.placePrompt);
      return;
    }
    if (step === "need") {
      const next = { ...draft, need: label };
      setDraft(next);
      setStep("idle");
      setLastIntent("quote");
      say(`${t.chat.flow.ready}\n${next.biz} · ${next.place} · ${next.need}`);
      return;
    }
    handleIntent(id as ChatIntent);
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    const q = input.trim();
    if (!q) return;
    setInput("");
    push("user", q);

    if (step === "biz") {
      setDraft((d) => ({ ...d, biz: q }));
      setStep("place");
      say(t.chat.flow.placePrompt);
      return;
    }
    if (step === "place") {
      setDraft((d) => ({ ...d, place: q }));
      setStep("need");
      say(t.chat.flow.needPrompt);
      return;
    }
    if (step === "need") {
      const next = { ...draft, need: q };
      setDraft(next);
      setStep("idle");
      setLastIntent("quote");
      say(`${t.chat.flow.ready}\n${next.biz} · ${next.place} · ${next.need}`);
      return;
    }

    handleIntent(matchIntent(q));
  }

  const waHref = useMemo(() => {
    if (draft.biz && draft.need) {
      return whatsappLink(t.chat.flow.wa(draft.biz, draft.place, draft.need));
    }
    return whatsappLink(t.chat.waMessage);
  }, [draft, t, lang]);

  const chips =
    step === "biz"
      ? t.chat.flow.biz
      : step === "need"
        ? t.chat.flow.needs
        : step === "place"
          ? []
          : t.chat.chips.slice(0, 4);

  const extra =
    step === "idle"
      ? followUps[lastIntent]
          .map((id) => ({ id, label: t.chat.follow[id] || id }))
          .filter((c) => !chips.some((x) => x.id === c.id))
          .slice(0, 2)
      : [];

  function openChat() {
    setOpen(true);
    setNudge(false);
    sessionStorage.setItem("jw-chat-nudge", "1");
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end md:bottom-7 md:right-7">
      {!open && nudge && (
        <button
          type="button"
          onClick={openChat}
          className="chat-panel chat-nudge lang-copy mb-3 max-w-56 bg-white px-3.5 py-2.5 text-left text-sm leading-snug text-ink shadow-lg"
        >
          {t.chat.nudge}
        </button>
      )}

      {open && (
        <div
          className="chat-panel chat-shell mb-3 flex h-[min(34rem,72vh)] w-[min(100vw-2.5rem,22.5rem)] flex-col bg-white shadow-[0_12px_40px_rgba(11,20,26,0.28)]"
          role="dialog"
          aria-label={t.chat.title}
        >
          <div className="flex items-center gap-3 bg-[#075e54] px-3 py-2.5 text-white">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="px-1 text-lg leading-none text-white/85"
              aria-label={t.chat.close}
            >
              ‹
            </button>
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full bg-[#0a3d3a] ring-2 ring-white/20">
              <Image
                src="/images/jeeva.webp"
                alt=""
                fill
                sizes="40px"
                className="object-cover object-[center_12%]"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[15px] font-semibold leading-tight">
                {site.name}
              </p>
              <p className="lang-copy truncate text-[11px] text-white/75">
                {t.chat.online}
              </p>
            </div>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-white/15 p-2"
              aria-label={t.chat.whatsapp}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden>
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44Z" />
              </svg>
            </a>
          </div>

          <div
            ref={listRef}
            className="chat-wallpaper flex min-h-0 flex-1 flex-col gap-1.5 overflow-y-auto overscroll-contain px-3 py-3"
          >
            {msgs.map((m) =>
              m.from === "bot" ? (
                <div key={m.id} className="flex max-w-[86%] items-end gap-1.5 self-start">
                  <div className="relative mb-0.5 h-6 w-6 shrink-0 overflow-hidden rounded-full bg-[#0a3d3a]">
                    <Image
                      src="/images/jeeva.webp"
                      alt=""
                      fill
                      sizes="24px"
                      className="object-cover object-[center_12%]"
                    />
                  </div>
                  <div className="bubble-bot bg-white px-3 py-1.5">
                    <p className="lang-copy whitespace-pre-line text-[13.5px] leading-relaxed text-[#111b21]">
                      {m.text}
                    </p>
                    <p className="mt-0.5 text-right text-[10px] text-[#667781]">
                      {m.at}
                    </p>
                  </div>
                </div>
              ) : (
                <div
                  key={m.id}
                  className="bubble-user max-w-[82%] self-end bg-[#d9fdd3] px-3 py-1.5"
                >
                  <p className="lang-copy whitespace-pre-line text-[13.5px] leading-relaxed text-[#111b21]">
                    {m.text}
                  </p>
                  <p className="mt-0.5 text-right text-[10px] text-[#667781]">
                    {m.at}
                  </p>
                </div>
              ),
            )}

            {typing && (
              <div className="flex items-end gap-1.5 self-start">
                <div className="relative mb-0.5 h-6 w-6 overflow-hidden rounded-full bg-[#0a3d3a]">
                  <Image
                    src="/images/jeeva.webp"
                    alt=""
                    fill
                    sizes="24px"
                    className="object-cover object-[center_12%]"
                  />
                </div>
                <div className="bubble-bot flex items-center gap-1 bg-white px-3 py-2.5">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            )}
          </div>

          {(chips.length > 0 || extra.length > 0) && (
            <div className="flex flex-wrap gap-1.5 border-t border-black/5 bg-white px-3 py-2">
              {chips.map((chip) => (
                <button
                  key={chip.id}
                  type="button"
                  onClick={() => onChip(chip.id, chip.label)}
                  className="lang-copy rounded-full border border-[#e9edef] bg-white px-3 py-1 text-[12px] font-medium text-[#075e54]"
                >
                  {chip.label}
                </button>
              ))}
              {extra.map((chip) => (
                <button
                  key={`x-${chip.id}`}
                  type="button"
                  onClick={() => onChip(chip.id, chip.label)}
                  className="lang-copy rounded-full bg-[#e7f8f5] px-3 py-1 text-[12px] font-medium text-[#075e54]"
                >
                  {chip.label}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={onSubmit}
            className="flex items-center gap-2 bg-[#f0f2f5] px-2 py-2"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                step === "place" ? t.chat.flow.placePrompt : t.chat.placeholder
              }
              className="lang-copy min-w-0 flex-1 rounded-full border-0 bg-white px-4 py-2.5 text-[14px] text-[#111b21] outline-none"
            />
            <button
              type="submit"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#00a884] text-white"
              aria-label={t.chat.send}
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current" aria-hidden>
                <path d="M2.01 21 23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </form>
        </div>
      )}

      <div className="fab-in flex items-center gap-3">
        <a
          href={whatsappLink(t.chat.waMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t.nav.whatsapp}
          className="chat-fab flex items-center justify-center bg-[#25d366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)]"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
            <path d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.3-1.65a11.9 11.9 0 0 0 5.76 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.45-8.44ZM12.07 21.15h-.01a9.2 9.2 0 0 1-4.69-1.28l-.34-.2-3.74.98 1-3.64-.22-.37a9.2 9.2 0 0 1-1.41-4.9c0-5.08 4.14-9.21 9.23-9.21 2.46 0 4.78.96 6.52 2.7a9.16 9.16 0 0 1 2.7 6.52c0 5.08-4.14 9.2-9.24 9.2Zm5.06-6.9c-.28-.14-1.64-.81-1.9-.9-.25-.1-.44-.14-.62.14-.18.28-.71.9-.87 1.08-.16.18-.32.2-.6.07-.28-.14-1.17-.43-2.23-1.37-.82-.73-1.38-1.64-1.54-1.92-.16-.28-.02-.43.12-.57.13-.13.28-.32.42-.48.14-.16.18-.28.28-.46.1-.18.05-.35-.02-.49-.07-.14-.62-1.49-.85-2.04-.22-.53-.45-.46-.62-.47h-.53c-.18 0-.48.07-.73.35-.25.28-.96.94-.96 2.3s.98 2.66 1.12 2.85c.14.18 1.93 2.95 4.68 4.14.65.28 1.16.45 1.56.57.65.2 1.25.18 1.72.11.53-.08 1.64-.67 1.87-1.32.23-.65.23-1.2.16-1.32-.07-.11-.25-.18-.53-.32Z" />
          </svg>
        </a>
        <button
          type="button"
          onClick={() => (open ? setOpen(false) : openChat())}
          aria-expanded={open}
          aria-label={open ? t.chat.close : t.chat.open}
          className="chat-fab relative flex items-center justify-center bg-[#0a3d3a] text-white shadow-[0_8px_24px_rgba(10,61,58,0.4)]"
        >
          {open ? (
            <span className="text-2xl leading-none">×</span>
          ) : (
            <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          )}
          {!open && nudge && (
            <span className="absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-white bg-[#e11d48]" />
          )}
        </button>
      </div>
    </div>
  );
}
