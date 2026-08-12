"use client";

import {
  Children,
  ReactNode,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

function useInViewOnce<T extends HTMLElement>(rootMargin = "0px 0px -6% 0px") {
  const ref = useRef<T | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || shown) return;

    let frame = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        frame = requestAnimationFrame(() => setShown(true));
        io.disconnect();
      },
      { rootMargin, threshold: 0.08 },
    );

    io.observe(el);
    return () => {
      cancelAnimationFrame(frame);
      io.disconnect();
    };
  }, [shown, rootMargin]);

  return { ref, shown };
}

export function MotionProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, shown } = useInViewOnce<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal-el ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` } as CSSProperties}
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
  const { ref, shown } = useInViewOnce<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`reveal-scale ${shown ? "is-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
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
  const { ref, shown } = useInViewOnce<HTMLDivElement>("0px 0px -4% 0px");

  return (
    <div
      ref={ref}
      className={`stagger ${shown ? "is-in" : ""} ${className}`}
      style={{ "--stagger-base": `${delay}s` } as CSSProperties}
    >
      {Children.map(children, (child, i) => (
        <div
          className="stagger-item"
          style={{ transitionDelay: `calc(var(--stagger-base) + ${i * 0.07}s)` }}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

/** Kept for API compatibility — Stagger wraps children already */
export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={className}>{children}</div>;
}
