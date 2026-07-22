import Link from "next/link";
import { SectionToys } from "@/components/toys/SectionToys";
import { SectionEdge } from "@/components/ui/SectionEdge";
import type { ToySectionId } from "@/lib/toys";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
  backHref?: string;
  backLabel?: string;
  toys?: ToySectionId;
};

export function PageHero({
  eyebrow,
  title,
  description,
  children,
  backHref,
  backLabel,
  toys,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden lube-page-wash pb-6 md:pb-8">
      {toys ? <SectionToys section={toys} /> : null}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-[-10%] h-64 w-64 rounded-full bg-lube-sun/25 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-[-10%] left-[-5%] h-56 w-56 rounded-full bg-lube-coral/20 blur-3xl"
      />

      <div className="lube-shell pointer-events-none relative z-10 py-16 md:py-20 lg:py-24">
        <div className="pointer-events-auto">
          {backHref && backLabel ? (
            <Link
              href={backHref}
              className="mb-5 inline-flex text-sm font-bold text-lube-teal underline-offset-4 hover:underline"
            >
              ← {backLabel}
            </Link>
          ) : null}
          <p className="lube-eyebrow">{eyebrow}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl leading-[1.12] text-lube-ink md:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-lube-ink-soft">
              {description}
            </p>
          ) : null}
          {children ? <div className="mt-8">{children}</div> : null}
        </div>
      </div>

      <SectionEdge fillClassName="text-lube-mist" />
    </section>
  );
}
