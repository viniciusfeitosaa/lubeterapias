import Image from "next/image";
import Link from "next/link";
import type { PostRow } from "@/lib/blog";

function formatDate(iso: string | null) {
  if (!iso) return null;
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

export function BlogPostCard({ post }: { post: PostRow }) {
  const date = formatDate(post.published_at);

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="lube-card lube-card-interactive group block h-full overflow-hidden"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-lube-sky-soft">
        {post.cover_url ? (
          <Image
            src={post.cover_url}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 bg-[linear-gradient(135deg,var(--lube-sky),var(--lube-teal))] opacity-80" />
        )}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-lube-foam via-transparent to-white/15"
        />
      </div>
      <div className="p-5">
        {date ? (
          <p className="text-xs font-bold tracking-wide text-lube-teal uppercase">
            {date}
          </p>
        ) : null}
        <h3 className="mt-2 font-display text-xl text-lube-ink">{post.title}</h3>
        {post.excerpt ? (
          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-lube-ink-soft">
            {post.excerpt}
          </p>
        ) : null}
        <p className="mt-4 text-sm font-bold text-lube-teal">Ler mais →</p>
      </div>
    </Link>
  );
}
