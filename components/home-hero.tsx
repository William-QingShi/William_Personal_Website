"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

export function HomeHero() {
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let frame = 0;
    const update = () => {
      const distance = Math.min(window.scrollY, window.innerHeight);
      media.style.transform = `translate3d(0, ${distance * 0.055}px, 0) scale(1.045)`;
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
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media">
        <div className="hero-media-parallax" ref={mediaRef}>
          <Image
            src="/images/hero/hero-william-light.jpg"
            alt="William 站在暖色投影光束中"
            fill
            priority
            sizes="100vw"
            className="hero-image"
          />
        </div>
      </div>
      <div className="hero-tone" />

      <div className="hero-poster page-shell">
        <p className="hero-role">AI CREATIVE TECHNOLOGIST</p>
        <div className="hero-poster-copy">
          <h1 id="hero-title">William Lao</h1>
          <p>AI × Film × Creative Production</p>
        </div>
      </div>
    </section>
  );
}
