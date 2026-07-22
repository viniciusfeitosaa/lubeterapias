import type { Metadata } from "next";
import { BlogPostCard } from "@/components/blog/BlogPostCard";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal } from "@/components/ui/Reveal";
import { listPublishedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Artigos e novidades da Casa LuBe sobre desenvolvimento infantil, terapias e acolhimento às famílias.",
};

export const dynamic = "force-dynamic";

export default async function BlogPage() {
  const posts = await listPublishedPosts();

  return (
    <main>
      <PageHero
        eyebrow="Blog"
        title="Conteúdo para famílias e cuidado"
        description="Leituras leves e úteis sobre neurodesenvolvimento, terapias e o dia a dia da Casa LuBe."
        toys="blog"
      />

      <section className="lube-shell py-14 md:py-20">
        {posts.length === 0 ? (
          <div className="lube-card mx-auto max-w-xl p-8 text-center">
            <p className="font-display text-2xl text-lube-ink">Em breve</p>
            <p className="mt-3 text-lube-ink-soft">
              Ainda não há publicações. Volte logo — estamos preparando conteúdos
              com carinho.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post, index) => (
              <Reveal key={post.id} delay={index * 0.04}>
                <BlogPostCard post={post} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
