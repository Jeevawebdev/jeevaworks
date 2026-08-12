"use client";

import {
  Children,
  ReactNode,
  useEffect,
  useRef,
  type CSSProperties,
} from "react";

type Variant = "up" | "scale" | "left" | "right" | "media" | "fade";

let sharedObserver: IntersectionObserver | null = null;

function getObserver() {
  if (typeof window === "undefined") return null;
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        requestAnimationFrame(() => {
          el.classList.add("is-in");
        });
        sharedObserver?.unobserve(el);

        const done = () => el.classList.add("mx-done");
        el.addEventListener("transitionend", done, { once: true });
        // Fallback if no transition fires
        window.setTimeout(done, 1200);
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.14 },
  );

  return sharedObserver;
}

function useReveal(enabled = true) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !enabled) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("is-in", "mx-done");
      return;
    }

    const io = getObserver();
    io?.observe(el);

    // Safety: never leave content invisible if IO misses (e.g. content-visibility)
    const fallback = window.setTimeout(() => {
      if (!el.classList.contains("is-in")) {
        el.classList.add("is-in", "mx-done");
        io?.unobserve(el);
      }
    }, 1800);

    return () => {
      window.clearTimeout(fallback);
      io?.unobserve(el);
    };
  }, [enabled]);

  return ref;
}

export function MotionProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
  variant = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variant?: Variant;
}) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className={`mx mx-${variant} ${className}`}
      style={{ "--mx-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

export function FadeScale({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal className={className} delay={delay} variant="scale">
      {children}
    </Reveal>
  );
}

export function MediaReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <Reveal className={className} delay={delay} variant="media">
      {children}
    </Reveal>
  );
}

export function Stagger({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useReveal();

  return (
    <div
      ref={ref}
      className={`mx-stagger ${className}`}
      style={{ "--stagger-base": `${delay}s` } as CSSProperties}
    >
      {Children.map(children, (child, i) => (
        <div
          className="mx-item"
          style={{ "--i": i } as CSSProperties}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
