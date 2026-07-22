"use client";

import { useId } from "react";

type ArchedEyebrowProps = {
  children: string;
  className?: string;
  light?: boolean;
};

/** Eyebrow em arco suave (SVG textPath). */
export function ArchedEyebrow({
  children,
  className = "",
  light = false,
}: ArchedEyebrowProps) {
  const uid = useId().replace(/:/g, "");
  const pathId = `lube-arch-${uid}`;

  return (
    <div
      className={`mx-auto mb-3 flex w-full max-w-md justify-center ${className}`}
    >
      <svg
        viewBox="0 0 320 56"
        className="h-12 w-full max-w-sm overflow-visible md:h-14"
        role="img"
        aria-label={children}
      >
        <defs>
          <path id={pathId} d="M 24 44 Q 160 4 296 44" fill="none" />
        </defs>
        <text
          className={light ? "fill-white/85" : "fill-lube-teal"}
          style={{
            fontFamily: "var(--font-baloo), sans-serif",
            fontSize: "15px",
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          <textPath href={`#${pathId}`} startOffset="50%" textAnchor="middle">
            {children}
          </textPath>
        </text>
      </svg>
    </div>
  );
}
