"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { StaticImage as Image } from "@/components/static-image";

export function ProjectFilmAccess({
  title,
  url,
  platform,
  qr,
}: {
  title: string;
  url?: string;
  platform?: string;
  qr?: string;
}) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const close = useCallback(() => {
    setOpen(false);
    window.requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

  useEffect(() => {
    if (!open) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [close, open]);

  if (!url) {
    return null;
  }

  return (
    <>
      <div className="film-access">
        <div>
          <small>{platform ?? "公开观看渠道"}</small>
          <a className="film-primary-link" href={url} target="_blank" rel="noreferrer">
            <span className="film-link-arrow" aria-hidden="true">↗</span>
            <span className="film-link-text">点击打开成片</span>
          </a>
        </div>
        {qr && (
          <button type="button" className="film-qr-trigger" ref={triggerRef} onClick={() => setOpen(true)}>
            <span className="film-qr-image">
              <Image src={qr} alt={`${title} 公开成片二维码`} fill unoptimized sizes="160px" />
            </span>
            <span>扫码观看 / 点击放大</span>
          </button>
        )}
      </div>

      {open && qr && (
        <div className="qr-modal" role="dialog" aria-modal="true" aria-label={`${title} 观看二维码`} onClick={close}>
          <div className="qr-modal-card" onClick={(event) => event.stopPropagation()}>
            <button type="button" className="qr-modal-close" onClick={close} autoFocus aria-label="关闭二维码">
              关闭 ×
            </button>
            <p>{title}</p>
            <div className="qr-modal-image">
              <Image src={qr} alt={`${title} 公开成片二维码大图`} fill unoptimized sizes="min(78vw, 520px)" priority />
            </div>
            <a href={url} target="_blank" rel="noreferrer">直接打开 {platform ?? "公开链接"} ↗</a>
          </div>
        </div>
      )}
    </>
  );
}
