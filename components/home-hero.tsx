"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function HomeHero() {
  const heroRef = useRef<HTMLElement>(null);
  const exitRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const transitionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = heroRef.current;
    const exitLayer = exitRef.current;
    const media = mediaRef.current;
    const poster = posterRef.current;
    const transition = transitionRef.current;
    if (
      !hero ||
      !exitLayer ||
      !media ||
      !poster ||
      !transition ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let frame = 0;
    const update = () => {
      const heroHeight = Math.max(hero.offsetHeight, 1);
      const distance = Math.min(Math.max(window.scrollY, 0), heroHeight);
      const progress = distance / heroHeight;
      const transitionProgress = Math.max(0, (progress - 0.48) / 0.52);

      media.style.transform = `translate3d(0, ${distance * 0.05}px, 0) scale(1.045)`;
      exitLayer.style.transform = `scale(${1 - progress * 0.022})`;
      exitLayer.style.opacity = String(1 - progress * 0.38);
      poster.style.transform = `translate3d(0, ${distance * 0.022}px, 0)`;
      poster.style.opacity = String(1 - Math.max(0, (progress - 0.3) / 0.7));
      transition.style.opacity = String(transitionProgress * 0.94);
      frame = 0;
    };
    const onScroll = () => {
      if (frame === 0) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      if (frame !== 0) window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="hero" aria-labelledby="hero-title" ref={heroRef}>
      <div className="hero-media">
        <div className="hero-exit-layer" ref={exitRef}>
          <div className="hero-media-parallax" ref={mediaRef}>
            <Image
              src="/images/hero/hero-william-light.jpg"
              alt="William 站在暖色投影光束中"
              fill
              priority
              sizes="100vw"
              className="hero-image"
            />
            <div className="hero-projection" aria-hidden="true">
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
      <div className="hero-transition" ref={transitionRef} />

      <div className="hero-poster page-shell" ref={posterRef}>
        <p className="hero-role">AI CREATIVE TECHNOLOGIST</p>
        <div className="hero-poster-copy">
          <h1 id="hero-title">William Lao</h1>
          <p>AI × Film × Creative Production</p>
        </div>
      </div>
    </section>
  );
}
