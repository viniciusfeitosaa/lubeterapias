import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "light" | "color";
  className?: string;
  priority?: boolean;
};

export function Logo({
  variant = "color",
  className = "",
  priority = false,
}: LogoProps) {
  const src =
    variant === "light"
      ? "/brand/logo-borda-branca.png"
      : "/brand/logo.png";

  return (
    <Link href="/" className={`inline-flex items-center gap-2 ${className}`}>
      <Image
        src={src}
        alt="Casa LuBe"
        width={variant === "light" ? 120 : 56}
        height={variant === "light" ? 108 : 56}
        priority={priority}
        className="h-12 w-auto md:h-14"
      />
      <span className="font-[family-name:var(--font-baloo)] text-xl font-bold tracking-tight text-lube-ink md:text-2xl">
        Casa LuBe
      </span>
    </Link>
  );
}
