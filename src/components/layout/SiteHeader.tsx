"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { getSite } from "@/lib/content";
import { DEFAULT_WA_TEXT, whatsappHref } from "@/lib/whatsapp";

const nav = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/estrutura", label: "Estrutura" },
  { href: "/especialidades", label: "Especialidades" },
  { href: "/unidades", label: "Unidades" },
  { href: "/contato", label: "Contato" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const site = getSite();
  const wa = whatsappHref(site.units[0].whatsapp, DEFAULT_WA_TEXT);

  return (
    <header className="sticky top-0 z-50 border-b border-lube-ink/5 bg-lube-mist/85 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 md:px-6">
        <Logo priority />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Principal">
          {nav.map((item) => {
            const active =
              item.href === "/"
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "bg-lube-sky/25 text-lube-ink"
                    : "text-lube-ink/70 hover:bg-lube-sky/15 hover:text-lube-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button href={wa} external variant="primary">
            WhatsApp
          </Button>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg ring-1 ring-lube-ink/10 lg:hidden"
          aria-expanded={open}
          aria-controls="menu-mobile"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className="block h-0.5 w-5 bg-lube-ink" />
            <span className="block h-0.5 w-5 bg-lube-ink" />
            <span className="block h-0.5 w-5 bg-lube-ink" />
          </span>
        </button>
      </div>

      {open ? (
        <div
          id="menu-mobile"
          className="border-t border-lube-ink/5 bg-lube-foam px-4 py-4 lg:hidden"
        >
          <nav className="flex flex-col gap-1" aria-label="Mobile">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-base font-semibold text-lube-ink hover:bg-lube-mist"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="mt-4">
            <Button href={wa} external className="w-full">
              Falar no WhatsApp
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
