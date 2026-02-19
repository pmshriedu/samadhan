"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      bar.style.width = `${Math.min(Math.max(pct, 0), 100)}%`;
    };

    const onScroll = () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    update();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Track */}
      <div className="fixed top-0 left-0 w-full h-1 z-[9999] bg-black/5">
        {/* Clipping bar — width driven directly via ref, zero transition */}
        <div ref={barRef} className="h-full relative overflow-hidden w-0">
          {/* Full-viewport gradient pinned to left so colors stay consistent */}
          <div
            className="absolute inset-y-0 left-0 h-full pointer-events-none"
            style={{
              width: "100vw",
              background:
                "linear-gradient(to right, #ff6c26 0%, #ff9a6e 20%, #ffd4bc 38%, #ffffff 50%, #b8e8cc 62%, #4db87a 80%, #0a6e3d 100%)",
            }}
          />

          {/* Shimmer sweep */}
          <div className="absolute inset-0 shimmer" aria-hidden="true" />
        </div>
      </div>

      <style jsx>{`
        .shimmer::after {
          content: "";
          position: absolute;
          top: 0;
          left: -100%;
          width: 55%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.55),
            transparent
          );
          animation: shimmer 2.8s ease-in-out infinite;
        }

        @keyframes shimmer {
          0% {
            left: -100%;
          }
          100% {
            left: 200%;
          }
        }
      `}</style>
    </>
  );
}
