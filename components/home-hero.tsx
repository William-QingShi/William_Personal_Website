"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);
  const projectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const exitLayer = exitRef.current;
    const projection = projectionRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hero || !exitLayer || !projection || reducedMotion) {
      return;
    }

    let scrollFrame = 0;
    let pointerFrame = 0;
    const updateScroll = () => {
      const heroHeight = Math.max(hero.offsetHeight, 1);
      const distance = Math.min(Math.max(window.scrollY, 0), heroHeight);
      const progress = distance / heroHeight;
      exitLayer.style.transform = `scale(${1.05 - progress * 0.05})`;
      exitLayer.style.opacity = String(1 - progress * 0.7);
      scrollFrame = 0;
    };
    const onScroll = () => {
      if (scrollFrame === 0) scrollFrame = window.requestAnimationFrame(updateScroll);
    };
    const onPointerMove = (event: PointerEvent) => {
      if (!window.matchMedia("(pointer: fine)").matches || pointerFrame !== 0) return;
      pointerFrame = window.requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
        projection.style.setProperty("--beam-x", `${(x - 0.5) * 10}px`);
        projection.style.setProperty("--beam-y", `${(y - 0.5) * 4}px`);
        projection.classList.toggle("is-beam-active", x > 0.08 && x < 0.82 && y > 0.13 && y < 0.82);
        pointerFrame = 0;
      });
    };
    const onPointerLeave = () => {
      projection.style.setProperty("--beam-x", "0px");
      projection.style.setProperty("--beam-y", "0px");
      projection.classList.remove("is-beam-active");
    };

    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);
    return () => {
      if (scrollFrame !== 0) window.cancelAnimationFrame(scrollFrame);
      if (pointerFrame !== 0) window.cancelAnimationFrame(pointerFrame);
      window.removeEventListener("scroll", onScroll);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero-media">
        <div className="hero-exit-layer" ref={exitRef}>
          <div className="hero-media-parallax">
            <Image
              src="/images/hero/hero-william-light.jpg"
              alt="William 站在暖色投影光束中"
              fill
              priority
              sizes="100vw"
              className="hero-image"
            />
            <div className="hero-projection" aria-hidden="true" ref={projectionRef}>
              <Image
                src="/images/hero/hero-william-light.jpg"
                alt=""
                fill
                sizes="100vw"
                className="hero-projection-image"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="hero-tone" />
      <h1 id="hero-title" className="sr-only">
        William Lao — AI Creative Technologist
      </h1>
    </section>
  );
}
