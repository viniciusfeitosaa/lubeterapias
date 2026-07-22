type SectionEdgeProps = {
  /** Cor do preenchimento (deve bater com o fundo da seção seguinte) */
  fillClassName?: string;
  /** Espelha a onda horizontalmente */
  flip?: boolean;
  /** Curva alternativa, mais aberta */
  variant?: "wave" | "soft";
};

const PATHS = {
  wave: {
    fill: "M0 24c120 18 240 32 360 28 180-6 240-36 420-36s240 30 420 36c120 4 180-4 240-12v16H0V24Z",
    stroke:
      "M0 24c120 18 240 32 360 28 180-6 240-36 420-36s240 30 420 36c120 4 180-4 240-12",
  },
  soft: {
    fill: "M0 32c180-20 300-28 480-16 200 14 280 36 480 28 140-6 220-20 300-28v40H0V32Z",
    stroke:
      "M0 32c180-20 300-28 480-16 200 14 280 36 480 28 140-6 220-20 300-28",
  },
} as const;

/** Limite inferior ondulante entre seções */
export function SectionEdge({
  fillClassName = "text-lube-mist",
  flip = false,
  variant = "wave",
}: SectionEdgeProps) {
  const paths = PATHS[variant];

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 leading-[0]"
    >
      <div className="h-px bg-gradient-to-r from-transparent via-lube-teal/25 to-transparent" />
      <svg
        className={`relative -mt-px block h-7 w-full md:h-9 ${fillClassName} ${
          flip ? "-scale-x-100" : ""
        }`}
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="currentColor" d={paths.fill} />
        <path
          fill="none"
          stroke="color-mix(in srgb, var(--lube-teal) 22%, transparent)"
          strokeWidth="1.25"
          d={paths.stroke}
        />
      </svg>
    </div>
  );
}
