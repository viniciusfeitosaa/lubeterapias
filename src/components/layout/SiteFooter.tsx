import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { getSite } from "@/lib/content";
import { DEFAULT_WA_TEXT, whatsappHref } from "@/lib/whatsapp";

const quickLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre nós" },
  { href: "/especialidades", label: "Especialidades" },
  { href: "/estrutura", label: "Estrutura" },
  { href: "/contato", label: "Fale com a LuBe" },
  { href: "/politica-de-privacidade", label: "Política de Privacidade" },
];

export function SiteFooter() {
  const site = getSite();

  return (
    <footer className="mt-auto bg-[linear-gradient(160deg,#1e3a4c_0%,#245c66_55%,#2a9d8f_100%)] text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2 md:px-6 lg:grid-cols-4">
        <div>
          <Logo variant="light" className="[&_span]:text-white" />
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            {site.brand.tagline}. Clínica do grupo {site.brand.group}.
          </p>
          <div className="mt-5 flex gap-3">
            <a
              href={site.brand.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/20"
            >
              Instagram
            </a>
            <a
              href={site.brand.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-white/10 px-3 py-2 text-sm font-semibold hover:bg-white/20"
            >
              Facebook
            </a>
          </div>
        </div>

        <div>
          <h2 className="font-[family-name:var(--font-baloo)] text-lg">
            Links rápidos
          </h2>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-white">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {site.units.map((unit) => (
          <div key={unit.id}>
            <h2 className="font-[family-name:var(--font-baloo)] text-lg">
              {unit.city}
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              <li>
                <a
                  href={whatsappHref(unit.whatsapp, DEFAULT_WA_TEXT)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  WhatsApp: {unit.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={unit.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white"
                >
                  {unit.address}
                </a>
              </li>
              <li>{unit.hours}</li>
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/15 px-4 py-5 text-center text-xs text-white/65 md:px-6">
        © {new Date().getFullYear()} {site.brand.name}. Todos os direitos
        reservados.
      </div>
    </footer>
  );
}
