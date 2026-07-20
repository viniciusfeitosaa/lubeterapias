type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  light?: boolean;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
}: SectionHeadingProps) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      {eyebrow ? (
        <p
          className={`mb-3 font-[family-name:var(--font-baloo)] text-sm font-semibold tracking-wide uppercase ${
            light ? "text-white/80" : "text-lube-teal"
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={`font-[family-name:var(--font-fraunces)] text-3xl leading-tight md:text-4xl ${
          light ? "text-white" : "text-lube-ink"
        }`}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${
            light ? "text-white/85" : "text-lube-ink/75"
          }`}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
