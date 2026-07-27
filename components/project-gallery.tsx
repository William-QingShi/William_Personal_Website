"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type ProjectGalleryProps = {
  projectTitle: string;
  stills: string[];
  allStills?: string[];
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
  allStills,
  aspectRatio,
  sectionNumber,
  label = "影像画廊 / 静帧",
  heading = "影像静帧",
  mediaLabel = "静帧",
  note,
  fit = "cover",
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [lightboxSource, setLightboxSource] = useState<"preview" | "archive">("preview");
  const [archiveOpen, setArchiveOpen] = useState(false);
  const [measuredAspects, setMeasuredAspects] = useState<Record<string, string>>({});
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const archiveTriggerRef = useRef<HTMLButtonElement | null>(null);
  const previewStills = allStills ? stills.slice(0, 9) : stills;
  const completeStills = allStills?.length ? allStills : stills;
  const lightboxImages = lightboxSource === "archive" ? completeStills : previewStills;
  const hasArchive = Boolean(allStills && completeStills.length > previewStills.length);

  const close = useCallback(() => {
    setActiveIndex(null);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);
  const closeArchive = useCallback(() => {
    setArchiveOpen(false);
    window.requestAnimationFrame(() => archiveTriggerRef.current?.focus());
  }, []);
  const showPrevious = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current - 1 + lightboxImages.length) % lightboxImages.length,
    );
  }, [lightboxImages.length]);
  const showNext = useCallback(() => {
    setActiveIndex((current) =>
      current === null ? null : (current + 1) % lightboxImages.length,
    );
  }, [lightboxImages.length]);

  useEffect(() => {
    if (activeIndex === null && !archiveOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (activeIndex !== null) close();
        else closeArchive();
      }
      if (activeIndex !== null && event.key === "ArrowLeft") showPrevious();
      if (activeIndex !== null && event.key === "ArrowRight") showNext();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, archiveOpen, close, closeArchive, showNext, showPrevious]);

  if (previewStills.length === 0) return null;

  return (
    <article className="project-module project-stills">
      <div className="page-shell module-heading">
        <span>{sectionNumber}</span>
        <div>
          <p>{label}</p>
          <h2>{heading}</h2>
        </div>
        <p className="module-note">
          {note ?? `${projectTitle} · 精选 ${previewStills.length} 张 / 共 ${completeStills.length} 张`}
        </p>
      </div>

      <div className="page-shell stills-grid">
        {previewStills.map((still, index) => (
          <div
            className="still-card-wrap"
            style={{ aspectRatio: measuredAspects[still] ?? aspectRatio }}
            key={still}
          >
            <button
              type="button"
              className="still-card"
              onClick={(event) => {
                triggerRef.current = event.currentTarget;
                setLightboxSource("preview");
                setActiveIndex(index);
              }}
              aria-label={`查看 ${projectTitle} 第 ${index + 1} 张${mediaLabel}大图`}
            >
              <Image
                src={still}
                alt={`${projectTitle} ${mediaLabel} ${index + 1}`}
                fill
                sizes="(max-width: 760px) 50vw, 33vw"
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
            {hasArchive && index === previewStills.length - 1 && (
              <button
                type="button"
                className="more-stills-trigger"
                ref={archiveTriggerRef}
                onClick={() => setArchiveOpen(true)}
                aria-label={`查看 ${projectTitle} 的全部 ${completeStills.length} 张${mediaLabel}`}
              >
                <span>更多静帧来这里看呀</span>
                <i aria-hidden="true">↗</i>
              </button>
            )}
          </div>
        ))}
      </div>

      {archiveOpen && (
        <div
          className="stills-archive"
          role="dialog"
          aria-modal="true"
          aria-label={`${projectTitle} 全部${mediaLabel}`}
          onClick={closeArchive}
        >
          <div className="stills-archive-panel" onClick={(event) => event.stopPropagation()}>
            <header>
              <div>
                <p>{projectTitle}</p>
                <h3>全部{mediaLabel}</h3>
              </div>
              <p>{completeStills.length} 张</p>
              <button type="button" onClick={closeArchive} autoFocus aria-label="关闭全部静帧">
                关闭 ×
              </button>
            </header>
            <div className="stills-archive-grid">
              {completeStills.map((still, index) => (
                <button
                  type="button"
                  className="archive-still"
                  style={{ aspectRatio: measuredAspects[still] ?? aspectRatio }}
                  onClick={() => {
                    triggerRef.current = archiveTriggerRef.current;
                    setLightboxSource("archive");
                    setArchiveOpen(false);
                    setActiveIndex(index);
                  }}
                  aria-label={`查看 ${projectTitle} 全部${mediaLabel}第 ${index + 1} 张`}
                  key={still}
                >
                  <Image
                    src={still}
                    alt={`${projectTitle} ${mediaLabel} ${index + 1}`}
                    fill
                    sizes="(max-width: 580px) 50vw, (max-width: 1000px) 33vw, 20vw"
                    className="still-image"
                  />
                  <span>{String(index + 1).padStart(3, "0")}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

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
            关闭 ×
          </button>

          {lightboxImages.length > 1 && (
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
              src={lightboxImages[activeIndex]}
              alt={`${projectTitle} ${mediaLabel} ${activeIndex + 1} 大图`}
              fill
              sizes="100vw"
              className="lightbox-image"
              priority
            />
          </div>

          {lightboxImages.length > 1 && (
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
            {String(activeIndex + 1).padStart(2, "0")} / {String(lightboxImages.length).padStart(2, "0")}
          </p>
        </div>
      )}
    </article>
  );
}
