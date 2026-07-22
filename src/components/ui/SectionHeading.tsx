import { ArchedEyebrow } from "@/components/ui/ArchedEyebrow";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
  align?: "center" | "left";
  /** Default: arco no centro; false mantém texto reto (ex.: Sobre nós). */
  arched?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  align = "center",
  arched,
}: SectionHeadingProps) {
  const alignClass = align === "left" ? "text-left mx-0" : "mx-auto text-center";
  const useArch = arched ?? align === "center";

  return (
    <div className={`max-w-3xl ${alignClass}`}>
      {eyebrow ? (
        useArch ? (
          <ArchedEyebrow light={light}>{eyebrow}</ArchedEyebrow>
        ) : (
          <p
            className={`lube-eyebrow mb-3 ${
              light ? "!text-white/85" : ""
            }`}
          >
            {eyebrow}
          </p>
        )
      ) : null}
      <h2
        className={`font-display text-3xl leading-[1.15] md:text-4xl lg:text-[2.75rem] ${
          light ? "text-white" : "text-lube-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${
            light ? "text-white/88" : "text-lube-ink-soft"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
