import Image from "next/image";
import Link from "next/link";

type LogoProps = {
  variant?: "light" | "color";
  /** sm = header; md = footer / padrão */
  size?: "sm" | "md";
  className?: string;
  priority?: boolean;
};

const lightSizeClass = {
  sm: "h-auto! w-[5.25rem] md:w-[6rem]",
  md: "h-auto! w-[7.5rem] md:w-[8.5rem]",
} as const;

export function Logo({
  variant = "color",
  size = "md",
  className = "",
  priority = false,
}: LogoProps) {
  const src =
    variant === "light"
      ? "/brand/logo-borda-branca.png"
      : "/brand/logo.png";

  const isLight = variant === "light";

  return (
    <Link
      href="/"
      className={`inline-flex items-center rounded-xl ${className}`}
      aria-label="Casa LuBe — página inicial"
    >
      <Image
        src={src}
        alt=""
        width={isLight ? 160 : 200}
        height={isLight ? 144 : 90}
        priority={priority}
        className={
          isLight ? lightSizeClass[size] : "h-12! w-auto md:h-14!"
        }
      />
    </Link>
  );
}
