import Link from "next/link";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  external?: boolean;
};

const variants = {
  primary:
    "bg-lube-teal text-white shadow-[0_10px_30px_-12px_rgba(42,157,143,0.7)] hover:bg-[#238578]",
  secondary:
    "bg-lube-foam/95 text-lube-ink ring-1 ring-lube-ink/10 hover:bg-white",
  ghost:
    "bg-transparent text-lube-ink ring-1 ring-lube-ink/15 hover:bg-lube-sky/20",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition duration-300 ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
