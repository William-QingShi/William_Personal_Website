import type { CSSProperties, ImgHTMLAttributes } from "react";

type StaticImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, "src"> & {
  src: string;
  fill?: boolean;
  priority?: boolean;
  unoptimized?: boolean;
};

/**
 * Render public assets directly instead of sending them through the runtime
 * image optimizer, while preserving the fill layout used across the site.
 */
export function StaticImage({
  fill = false,
  priority = false,
  unoptimized: _unoptimized,
  loading,
  style,
  ...props
}: StaticImageProps) {
  const fillStyle: CSSProperties | undefined = fill
    ? {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        color: "transparent",
        ...style,
      }
    : style;

  return (
    <img
      {...props}
      style={fillStyle}
      loading={priority ? "eager" : (loading ?? "lazy")}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
    />
  );
}
