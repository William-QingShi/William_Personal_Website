"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ProjectGalleryProps = {
  projectTitle: string;
  stills: string[];
  aspectRatio: string;
  sectionNumber: string;
  label?: string;
  heading?: string;
  mediaLabel?: string;
  note?: string;
  fit?: "cover" | "contain";
};

export function ProjectGallery({
  projectTitle,
  stills,
  aspectRatio,
  sectionNumber,
  label = "Image Gallery / Stills",
  heading = "影像静帧",
  mediaLabel = "静帧",
  note,
  fit = "cover",
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [measuredAspects, setMeasuredAspects] = useState<Record<string, string>>({});
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const close = useCallback(() => {
    setActiveIndex(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);
  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + stills.length) % stills.length,
    );
  }, [stills.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % stills.length,
    );
  }, [stills.length]);

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") showPrevious();
      if (event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, close, showNext, showPrevious]);

  if (stills.length === 0) return null;

  return (
    <article className="project-module project-stills">
      <div className="page-shell module-heading">
        <span>{sectionNumber}</span>
        <div>
          <p>{label}</p>
          <h2>{heading}</h2>
        </div>
        <p className="module-note">
          {note ?? `${projectTitle} · ${stills.length} images`}
        </p>
      </div>

      <div className="page-shell stills-grid">
        {stills.map((still, index) => (
          <button
            type="button"
            className="still-card"
            style={{ aspectRatio: measuredAspects[still] ?? aspectRatio }}
            onClick={(event) => {
              triggerRef.current = event.currentTarget;
              setActiveIndex(index);
            }}
            aria-label={`查看 ${projectTitle} 第 ${index + 1} 张${mediaLabel}大图`}
            key={still}
          >
            <Image
              src={still}
              alt={`${projectTitle} ${mediaLabel} ${index + 1}`}
              fill
              sizes="(max-width: 760px) 100vw, 50vw"
              className={`still-image ${fit === "contain" ? "still-image-contain" : ""}`}
              onLoad={(event) => {
                const image = event.currentTarget;
                if (!image.naturalWidth || !image.naturalHeight) return;
                const measured = `${image.naturalWidth} / ${image.naturalHeight}`;
                setMeasuredAspects((current) =>
                  current[still] === measured ? current : { ...current, [still]: measured },
                );
              }}
            />
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
          </button>
        ))}
      </div>

      {activeIndex !== null && (
        <div
          className="stills-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} ${mediaLabel}大图`}
          onClick={close}
        >
          <button
            type="button"
            className="lightbox-close"
            onClick={close}
            aria-label="关闭大图"
            autoFocus
          >
            CLOSE ×
          </button>

          {stills.length > 1 && (
            <button
              type="button"
              className="lightbox-arrow lightbox-previous"
              onClick={(event) => {
                event.stopPropagation();
                showPrevious();
              }}
              aria-label={`查看上一张${mediaLabel}`}
            >
              ←
            </button>
          )}

          <div className="lightbox-image-wrap" onClick={(event) => event.stopPropagation()}>
            <Image
              src={stills[activeIndex]}
              alt={`${projectTitle} ${mediaLabel} ${activeIndex + 1} 大图`}
              fill
              sizes="100vw"
              className="lightbox-image"
              priority
            />
          </div>

          {stills.length > 1 && (
            <button
              type="button"
              className="lightbox-arrow lightbox-next"
              onClick={(event) => {
                event.stopPropagation();
                showNext();
              }}
              aria-label={`查看下一张${mediaLabel}`}
            >
              →
            </button>
          )}

          <p className="lightbox-count" aria-live="polite">
            {String(activeIndex + 1).padStart(2, "0")} / {String(stills.length).padStart(2, "0")}
          </p>
        </div>
      )}
    </article>
  );
}
