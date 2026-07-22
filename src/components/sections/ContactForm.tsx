"use client";

import { useState } from "react";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { getSite } from "@/lib/content";
import { whatsappHref } from "@/lib/whatsapp";

export function ContactForm() {
  const site = getSite();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [unitId, setUnitId] = useState(site.units[0].id);
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (honeypot) return;

    const unit = site.units.find((item) => item.id === unitId) ?? site.units[0];
    const text = [
      "Olá! Vim do site da Casa LuBe.",
      `Nome: ${name}`,
      `Telefone: ${phone}`,
      `Unidade: ${unit.city}`,
      `Mensagem: ${message}`,
    ].join("\n");

    window.open(whatsappHref(unit.whatsapp, text), "_blank", "noopener,noreferrer");
  }

  return (
    <form onSubmit={onSubmit} className="lube-card p-6 md:p-8" noValidate={false}>
      <h2 className="font-display text-2xl text-lube-ink">Enviar mensagem</h2>
      <p className="mt-2 text-sm text-lube-ink-soft">
        Ao enviar, abrimos o WhatsApp da unidade escolhida com sua mensagem
        pronta — você só confirma o envio.
      </p>

      <label className="mt-6 block text-sm font-bold text-lube-ink">
        Nome
        <input
          required
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="lube-input"
        />
      </label>

      <label className="mt-4 block text-sm font-bold text-lube-ink">
        Telefone
        <input
          required
          name="tel"
          type="tel"
          autoComplete="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="lube-input"
        />
      </label>

      <label className="mt-4 block text-sm font-bold text-lube-ink">
        Unidade
        <select
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          className="lube-input"
        >
          {site.units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.city}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block text-sm font-bold text-lube-ink">
        Mensagem
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="lube-input resize-y"
        />
      </label>

      <input
        type="text"
        value={honeypot}
        onChange={(e) => setHoneypot(e.target.value)}
        className="hidden"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
      />

      <button
        type="submit"
        className="lube-btn-wa mt-6 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm font-bold tracking-wide"
      >
        <WhatsAppIcon className="h-[1.15rem] w-[1.15rem]" />
        Continuar no WhatsApp
      </button>
    </form>
  );
}
