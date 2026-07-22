import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { getSite } from "@/lib/content";
import { DEFAULT_WA_TEXT, whatsappHref } from "@/lib/whatsapp";

const quickLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre nós" },
  { href: "/especialidades", label: "Especialidades" },
  { href: "/blog", label: "Blog" },
  { href: "/estrutura", label: "Estrutura" },
  { href: "/contato", label: "Contato" },
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
];

export function SiteFooter() {
  const site = getSite();

  return (
    <footer className="mt-auto bg-[linear-gradient(165deg,var(--lube-deep)_0%,#184455_48%,var(--lube-teal-deep)_100%)] text-white">
      <div className="lube-shell grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-3">
        <div>
          <Logo variant="light" />
          <p className="mt-4 text-sm leading-relaxed text-white/90">
            {site.brand.tagline}. Clínica do grupo {site.brand.group}.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={site.brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white/12 px-3 py-2 text-sm font-bold transition hover:bg-white/22"
            >
              Instagram
            </a>
            <a
              href={site.brand.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-white/12 px-3 py-2 text-sm font-bold transition hover:bg-white/22"
            >
              Facebook
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-brand text-lg">Links rápidos</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-white/90">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="underline-offset-4 transition hover:text-white hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {site.units.map((unit) => (
          <div key={unit.id}>
            <h2 className="font-brand text-lg">{unit.city}</h2>
            <ul className="mt-4 space-y-3 text-sm text-white/90">
              <li>
                <a
                  href={whatsappHref(unit.whatsapp, DEFAULT_WA_TEXT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline-offset-4 hover:underline"
                >
                  WhatsApp: {unit.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={unit.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline-offset-4 hover:underline"
                >
                  {unit.address}
                </a>
              </li>
              <li>
                <p className="mb-2 font-semibold text-white">Horário</p>
                <ul className="space-y-1 text-white/80">
                  {unit.hoursSchedule.map((row) => (
                    <li key={row.day} className="flex justify-between gap-3">
                      <span>{row.day}</span>
                      <span>{row.time}</span>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/15 px-4 py-5 text-center text-xs text-white/80 md:px-6">
        © {new Date().getFullYear()} {site.brand.name}. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
