import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/ui/PageHero";
import { getPublishedPostBySlug, listPublishedPosts } from "@/lib/blog";
import { markdownToHtml } from "@/lib/markdown";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Post" };
  return {
    title: post.title,
    description: post.excerpt || post.title,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  const html = await markdownToHtml(post.body);
  const date = post.published_at
    ? new Intl.DateTimeFormat("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date(post.published_at))
    : null;

  return (
    <main>
      <PageHero
        eyebrow="Blog"
        title={post.title}
        description={post.excerpt || undefined}
        backHref="/blog"
        backLabel="Todos os posts"
        toys="blog"
      >
        {date ? (
          <p className="text-sm font-semibold text-lube-ink-soft">{date}</p>
        ) : null}
      </PageHero>

      <article className="lube-shell max-w-3xl space-y-8 py-14 md:py-20">
        {post.cover_url ? (
          <div className="relative aspect-[16/9] overflow-hidden rounded-[1.5rem] border border-lube-ink/8 shadow-[var(--shadow-soft)]">
            <Image
              src={post.cover_url}
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
              priority
            />
          </div>
        ) : null}

        <div
          className="blog-prose lube-card space-y-4 p-6 text-lube-ink-soft leading-relaxed md:p-10 [&_a]:font-semibold [&_a]:text-lube-teal [&_a]:underline-offset-2 hover:[&_a]:underline [&_h2]:font-display [&_h2]:text-2xl [&_h2]:text-lube-ink [&_h3]:font-display [&_h3]:text-xl [&_h3]:text-lube-ink [&_li]:ml-5 [&_li]:list-disc [&_p]:text-base [&_strong]:text-lube-ink"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <p>
          <Link
            href="/blog"
            className="text-sm font-bold text-lube-teal underline-offset-4 hover:underline"
          >
            ← Voltar ao blog
          </Link>
        </p>
      </article>
    </main>
  );
}

/** Opcional: ajuda o build quando houver posts em tempo de build */
export async function generateStaticParams() {
  try {
    const posts = await listPublishedPosts();
    return posts.map((post) => ({ slug: post.slug }));
  } catch {
    return [];
  }
}
