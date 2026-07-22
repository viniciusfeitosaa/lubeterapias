"use client";

import Image from "next/image";
import { useEffect, useId, useRef, useState } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { DEFAULT_WA_TEXT, whatsappHref } from "@/lib/whatsapp";

type WhatsAppFloatProps = {
  phone: string;
  clinicName?: string;
};

const QUICK_REPLIES = [
  "Quero agendar uma avaliação",
  "Quais especialidades vocês atendem?",
  "Gostaria de conhecer a estrutura",
];

export function WhatsAppFloat({
  phone,
  clinicName = "Casa LuBe",
}: WhatsAppFloatProps) {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState(DEFAULT_WA_TEXT);
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    function onPointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (
        panelRef.current?.contains(target) ||
        triggerRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
    };
  }, [open]);

  function openWhatsApp(text: string) {
    window.open(whatsappHref(phone, text), "_blank", "noopener,noreferrer");
    setOpen(false);
  }

  return (
    <div className="pointer-events-none fixed right-4 bottom-4 z-50 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      {open ? (
        <div
          ref={panelRef}
          id={panelId}
          role="dialog"
          aria-modal="true"
          aria-label="Conversa com a Casa LuBe no WhatsApp"
          className="pointer-events-auto flex w-[min(100vw-2rem,22rem)] flex-col overflow-hidden rounded-3xl border border-lube-ink/10 bg-[#efeae2] shadow-[0_24px_60px_-20px_rgba(15,42,54,0.55)]"
        >
          <header className="flex items-center gap-3 bg-[#075e54] px-4 py-3 text-white">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1 text-white/80 transition hover:bg-white/10 hover:text-white"
              aria-label="Fechar conversa"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
                <path
                  d="M15 6 9 12l6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/25 bg-white">
              <Image
                src="/brand/logo.png"
                alt=""
                fill
                className="object-contain p-1"
                sizes="40px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold leading-tight">
                {clinicName}
              </p>
              <p className="text-xs text-white/75">online agora</p>
            </div>
            <WhatsAppIcon className="h-5 w-5 shrink-0 opacity-90" />
          </header>

          <div className="flex flex-1 flex-col gap-3 bg-[url('data:image/svg+xml,%3Csvg width=%2740%27 height=%2740%27 viewBox=%270 0 40 40%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27%23d5cfc4%27 fill-opacity=%270.35%27%3E%3Cpath d=%27M0 40L40 0H20L0 20M40 40V20L20 40%27/%3E%3C/g%3E%3C/svg%3E')] px-3 py-4">
            <div className="max-w-[85%] rounded-2xl rounded-tl-sm bg-white px-3 py-2 text-sm leading-relaxed text-[#111b21] shadow-sm">
              Olá! 👋 Bem-vindo(a) à <strong>{clinicName}</strong>.
              <br />
              Como podemos ajudar sua família hoje?
              <span className="mt-1 block text-right text-[10px] text-[#667781]">
                agora
              </span>
            </div>

            <div className="flex flex-col items-start gap-2">
              {QUICK_REPLIES.map((reply) => (
                <button
                  key={reply}
                  type="button"
                  onClick={() => openWhatsApp(reply)}
                  className="rounded-full border border-[#25d366]/45 bg-white/90 px-3 py-1.5 text-left text-xs font-semibold text-[#075e54] transition hover:border-[#25d366] hover:bg-white"
                >
                  {reply}
                </button>
              ))}
            </div>
          </div>

          <form
            className="flex items-center gap-2 border-t border-black/5 bg-[#f0f2f5] px-3 py-2.5"
            onSubmit={(event) => {
              event.preventDefault();
              const text = draft.trim() || DEFAULT_WA_TEXT;
              openWhatsApp(text);
            }}
          >
            <label className="sr-only" htmlFor={`${panelId}-msg`}>
              Mensagem
            </label>
            <input
              id={`${panelId}-msg`}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              className="min-h-10 flex-1 rounded-full border-0 bg-white px-4 text-sm text-[#111b21] shadow-sm outline-none ring-0 placeholder:text-[#667781] focus:ring-2 focus:ring-[#25d366]/40"
              placeholder="Digite uma mensagem"
            />
            <button
              type="submit"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#25d366] text-white transition hover:bg-[#1da851]"
              aria-label="Enviar no WhatsApp"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
                <path d="M3.4 20.6 21 12 3.4 3.4 3 10.2 15 12 3 13.8z" />
              </svg>
            </button>
          </form>
        </div>
      ) : null}

      <button
        ref={triggerRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={
          open
            ? "Fechar conversa do WhatsApp"
            : "Abrir conversa no WhatsApp da Casa LuBe"
        }
        onClick={() => setOpen((value) => !value)}
        className="lube-btn-wa pointer-events-auto inline-flex h-14 items-center justify-center gap-2.5 rounded-[1.35rem] px-4 text-white"
      >
        <WhatsAppIcon className="h-7 w-7 shrink-0" />
        <span className="hidden pr-0.5 text-sm font-bold tracking-wide sm:inline">
          WhatsApp
        </span>
      </button>
    </div>
  );
}
