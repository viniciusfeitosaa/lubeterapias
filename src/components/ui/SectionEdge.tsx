type SectionEdgeProps = {
  /** Cor do preenchimento (deve bater com o fundo da seção seguinte) */
  fillClassName?: string;
  /** Espelha a onda horizontalmente */
  flip?: boolean;
  /** Curva alternativa, mais aberta */
  variant?: "wave" | "soft";
};

/**
 * Paths fechados de 0 → 1440 (viewBox), sem corte nas laterais.
 * Sem stroke: o traço gerava uma linha visível (sobretudo no mobile).
 */
const PATHS = {
  wave: {
    fill: "M0 28 C240 56 480 4 720 28 C960 52 1200 4 1440 28 L1440 64 L0 64 Z",
  },
  soft: {
    fill: "M0 36 C360 8 720 56 1080 28 C1260 14 1380 20 1440 32 L1440 64 L0 64 Z",
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
      className="pointer-events-none absolute inset-x-0 bottom-0 z-20 w-full leading-[0]"
    >
      <svg
        className={`block h-10 w-full md:h-14 ${fillClassName} ${
          flip ? "-scale-x-100" : ""
        }`}
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill="currentColor" d={paths.fill} />
      </svg>
    </div>
  );
}
