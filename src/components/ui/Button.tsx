import Link from "next/link";
import { ArrowSparkIcon } from "@/components/ui/ArrowSparkIcon";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type ButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "wa";
  className?: string;
  external?: boolean;
};

const variants = {
  primary: "lube-btn-primary",
  secondary:
    "bg-lube-foam text-lube-ink border border-lube-ink/10 shadow-sm hover:border-lube-teal/30 hover:bg-white",
  ghost:
    "bg-transparent text-lube-ink border border-lube-ink/15 hover:border-lube-teal/40 hover:bg-lube-sky/15",
  wa: "lube-btn-wa",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: ButtonProps) {
  const classes = `inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold tracking-wide transition duration-300 ${variants[variant]} ${className}`;

  let content: React.ReactNode = children;

  if (variant === "wa") {
    content = (
      <>
        <WhatsAppIcon className="h-[1.15rem] w-[1.15rem] shrink-0 opacity-95" />
        <span>{children}</span>
      </>
    );
  } else if (variant === "primary") {
    content = (
      <>
        <span>{children}</span>
        <ArrowSparkIcon className="lube-btn-icon h-5 w-5 shrink-0" />
      </>
    );
  }

  if (external) {
    return (
      <a
        href={href}
        className={classes}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}
