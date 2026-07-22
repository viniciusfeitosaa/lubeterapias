"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { getSite } from "@/lib/content";
import { DEFAULT_WA_TEXT, whatsappHref } from "@/lib/whatsapp";

const nav = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/estrutura", label: "Estrutura" },
  { href: "/especialidades", label: "Especialidades" },
  { href: "/blog", label: "Blog" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const site = getSite();
  const wa = whatsappHref(site.units[0].whatsapp, DEFAULT_WA_TEXT);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-lube-ink/8 bg-lube-foam/80 shadow-[0_8px_30px_-18px_rgba(22,53,69,0.35)] backdrop-blur-xl">
      <div className="lube-shell flex items-center justify-between gap-4 py-3">
        <Logo variant="light" size="sm" priority />

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Principal"
        >
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={`group relative px-3 py-2 text-sm font-bold tracking-wide transition-colors duration-300 ${
                  active
                    ? "text-lube-teal-deep"
                    : "text-lube-ink-soft hover:text-lube-ink"
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span
                  aria-hidden
                  className={`pointer-events-none absolute inset-x-3 -bottom-0.5 h-[3px] origin-left rounded-full bg-lube-teal transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    active
                      ? "scale-x-100"
                      : "scale-x-0 group-hover:scale-x-75 group-hover:opacity-70"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:block">
          <Button href={wa} external variant="wa">
            WhatsApp
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-lube-ink/10 bg-lube-mist md:hidden"
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="flex flex-col gap-1.5" aria-hidden>
            <span
              className={`block h-0.5 w-5 origin-center bg-lube-ink transition ${
                open ? "translate-y-2 rotate-45" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 bg-lube-ink transition ${
                open ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 w-5 origin-center bg-lube-ink transition ${
                open ? "-translate-y-2 -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <div
          id={menuId}
          className="border-t border-lube-ink/8 bg-lube-foam px-4 py-4 shadow-lg md:hidden"
        >
          <nav className="flex flex-col gap-0.5" aria-label="Mobile">
            {nav.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-3 py-3 text-base font-bold transition-colors ${
                    active
                      ? "text-lube-teal-deep"
                      : "text-lube-ink-soft hover:text-lube-ink"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  {active ? (
                    <span
                      aria-hidden
                      className="absolute top-1/2 left-0 h-5 w-[3px] -translate-y-1/2 rounded-full bg-lube-teal"
                    />
                  ) : null}
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <div className="mt-4">
            <Button href={wa} external variant="wa" className="w-full">
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
