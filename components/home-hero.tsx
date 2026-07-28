"use client";

import { useEffect, useRef } from "react";
import { StaticImage as Image } from "@/components/static-image";

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const exitLayer = exitRef.current;
    const scene = sceneRef.current;
    const light = lightRef.current;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!hero || !exitLayer || !scene || !light || reducedMotion) {
      return;
    }

    let scrollFrame = 0;
    let pointerFrame = 0;
    const updateScroll = () => {
      const heroHeight = Math.max(hero.offsetHeight, 1);
      const distance = Math.min(Math.max(window.scrollY, 0), heroHeight);
      const progress = distance / heroHeight;
      exitLayer.style.transform = `scale(${1.065 - progress * 0.08})`;
      exitLayer.style.opacity = String(1 - progress * 0.78);
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
        scene.style.setProperty("--scene-x", `${(x - 0.5) * 20}px`);
        scene.style.setProperty("--scene-y", `${(y - 0.5) * 12}px`);
        light.style.setProperty("--light-x", `${(x - 0.5) * 40}px`);
        light.style.setProperty("--light-y", `${(y - 0.5) * 24}px`);
        light.classList.toggle("is-beam-active", x > 0.05 && x < 0.88 && y > 0.08 && y < 0.9);
        pointerFrame = 0;
      });
    };
    const onPointerLeave = () => {
      scene.style.setProperty("--scene-x", "0px");
      scene.style.setProperty("--scene-y", "0px");
      light.style.setProperty("--light-x", "0px");
      light.style.setProperty("--light-y", "0px");
      light.classList.remove("is-beam-active");
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
          <div className="hero-media-parallax" ref={sceneRef}>
            <Image
              src="/images/hero/hero-william-light-16x9.png"
              alt="William 站在暖色投影光束中"
              fill
              priority
              unoptimized
              sizes="100vw"
              className="hero-image"
            />
            <div className="hero-projection" aria-hidden="true">
              <Image
                src="/images/hero/hero-william-light-16x9.png"
                alt=""
                fill
                unoptimized
                sizes="100vw"
                className="hero-projection-image"
              />
            </div>
            <div className="hero-light-field" aria-hidden="true" ref={lightRef} />
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
