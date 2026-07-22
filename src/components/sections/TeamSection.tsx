import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getEquipe } from "@/lib/content";

type TeamSectionProps = {
  /** Quando true, usa fundo lavado de página (útil em /sobre). */
  wash?: boolean;
};

export function TeamSection({ wash = false }: TeamSectionProps) {
  const team = getEquipe();
  if (team.length === 0) return null;

  return (
    <section
      className={`relative overflow-hidden py-16 md:py-24 ${
        wash ? "lube-page-wash" : ""
      }`}
    >
      <div className="lube-shell">
        <Reveal>
          <SectionHeading
            eyebrow="Equipe"
            title="Profissionais que cuidam com presença"
            description="Conheça parte da equipe multidisciplinar da Casa LuBe."
          />
        </Reveal>

        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((person, index) => (
            <Reveal key={person.id} delay={index * 0.06}>
              <li className="group">
                <article className="overflow-hidden rounded-[1.75rem] border border-lube-ink/8 bg-lube-foam/90 shadow-[var(--shadow-soft)]">
                  <div className="relative aspect-[4/5] overflow-hidden bg-lube-mist">
                    <Image
                      src={person.photo}
                      alt={person.photoAlt}
                      fill
                      className="object-cover object-[center_20%] transition duration-500 group-hover:scale-[1.03]"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <h3 className="font-display text-xl text-lube-ink md:text-2xl">
                      {person.name}
                    </h3>
                    <p className="mt-1 text-sm font-bold text-lube-teal">
                      {person.role}
                    </p>
                    {"registry" in person && person.registry ? (
                      <p className="mt-2 text-sm text-lube-ink-soft">
                        {person.registry}
                      </p>
                    ) : null}
                  </div>
                </article>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
