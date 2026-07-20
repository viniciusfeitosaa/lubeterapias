"use client";

import { useState } from "react";
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
    <form
      onSubmit={onSubmit}
      className="rounded-[1.5rem] bg-lube-foam p-6 ring-1 ring-lube-ink/8 md:p-8"
    >
      <h2 className="font-[family-name:var(--font-fraunces)] text-2xl text-lube-ink">
        Enviar mensagem
      </h2>
      <p className="mt-2 text-sm text-lube-ink/70">
        Ao enviar, abrimos o WhatsApp da unidade escolhida com sua mensagem.
      </p>

      <label className="mt-6 block text-sm font-semibold">
        Nome
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full rounded-xl border border-lube-ink/15 bg-lube-mist px-4 py-3 font-normal outline-none focus:border-lube-teal"
        />
      </label>

      <label className="mt-4 block text-sm font-semibold">
        Telefone
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-2 w-full rounded-xl border border-lube-ink/15 bg-lube-mist px-4 py-3 font-normal outline-none focus:border-lube-teal"
        />
      </label>

      <label className="mt-4 block text-sm font-semibold">
        Unidade
        <select
          value={unitId}
          onChange={(e) => setUnitId(e.target.value)}
          className="mt-2 w-full rounded-xl border border-lube-ink/15 bg-lube-mist px-4 py-3 font-normal outline-none focus:border-lube-teal"
        >
          {site.units.map((unit) => (
            <option key={unit.id} value={unit.id}>
              {unit.city}
            </option>
          ))}
        </select>
      </label>

      <label className="mt-4 block text-sm font-semibold">
        Mensagem
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="mt-2 w-full rounded-xl border border-lube-ink/15 bg-lube-mist px-4 py-3 font-normal outline-none focus:border-lube-teal"
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
        className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-lube-teal px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#238578]"
      >
        Continuar no WhatsApp
      </button>
    </form>
  );
}
