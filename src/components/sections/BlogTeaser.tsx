import Link from "next/link";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { SectionToys } from "@/components/toys/SectionToys";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SectionEdge } from "@/components/ui/SectionEdge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { listPublishedPosts } from "@/lib/blog";

export async function BlogTeaser() {
  const posts = await listPublishedPosts();
  const featured = posts.slice(0, 3);

  return (
    <section className="relative overflow-hidden py-20 pb-24 md:py-28 md:pb-32">
      <SectionToys section="blog-teaser" />
      <div className="lube-shell pointer-events-none relative z-10">
        <div className="pointer-events-auto">
        <Reveal>
          <SectionHeading
            eyebrow="Blog"
            title="Leituras para a família"
            description="Conteúdos sobre cuidado, terapias e o dia a dia da Casa LuBe."
          />
        </Reveal>

        {featured.length === 0 ? (
          <Reveal delay={0.08}>
            <div className="lube-card mx-auto mt-10 max-w-2xl p-8 text-center">
              <p className="font-display text-2xl text-lube-ink">
                O blog está chegando
              </p>
              <p className="mt-3 text-lube-ink-soft">
                Em breve publicaremos artigos acolhedores para apoiar sua família.
              </p>
              <Link
                href="/blog"
                className="mt-6 inline-flex font-bold text-lube-teal underline-offset-4 hover:underline"
              >
                Ir para o blog →
              </Link>
            </div>
          </Reveal>
        ) : (
          <>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featured.map((post, index) => (
                <Reveal key={post.id} delay={index * 0.05}>
                  <BlogPostCard post={post} />
                </Reveal>
              ))}
            </div>
            <div className="mt-10 text-center">
              <Button href="/blog">Ver todos os posts</Button>
            </div>
          </>
        )}
        </div>
      </div>
      <SectionEdge variant="soft" />
    </section>
  );
}
