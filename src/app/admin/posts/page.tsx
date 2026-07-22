import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { DeletePostButton } from "@/components/admin/DeletePostButton";
import { auth } from "@/auth";
import { listAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Posts · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  let posts: Awaited<ReturnType<typeof listAllPosts>> = [];
  let loadError: string | null = null;
  try {
    posts = await listAllPosts();
  } catch (err) {
    loadError =
      err instanceof Error
        ? err.message
        : "Não foi possível carregar os posts. Confira o Supabase.";
  }

  return (
    <AdminShell title="Publicações">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-lube-ink-soft">
          {posts.length} post{posts.length === 1 ? "" : "s"}
        </p>
        <Link
          href="/admin/posts/new"
          className="lube-btn-primary inline-flex min-h-11 items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold tracking-wide hover:bg-lube-teal-deep"
        >
          Novo post
        </Link>
      </div>

      {loadError ? (
        <div className="lube-card border border-lube-coral/30 p-6 text-sm text-lube-ink-soft">
          <p className="font-bold text-lube-coral">Erro ao conectar</p>
          <p className="mt-2">{loadError}</p>
          <p className="mt-3">
            Veja o guia em <code className="text-lube-ink">docs/blog-setup.md</code>.
          </p>
        </div>
      ) : posts.length === 0 ? (
        <div className="lube-card p-8 text-center">
          <p className="font-display text-2xl text-lube-ink">Nenhum post ainda</p>
          <p className="mt-2 text-lube-ink-soft">
            Crie a primeira publicação para destacar no site.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-[1.35rem] border border-lube-ink/8 bg-lube-foam">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-lube-ink/8 bg-lube-mist/60 text-xs uppercase tracking-wide text-lube-ink-soft">
              <tr>
                <th className="px-4 py-3 font-bold">Título</th>
                <th className="hidden px-4 py-3 font-bold md:table-cell">Status</th>
                <th className="px-4 py-3 font-bold">Ações</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id} className="border-b border-lube-ink/5 last:border-0">
                  <td className="px-4 py-4">
                    <p className="font-semibold text-lube-ink">{post.title}</p>
                    <p className="text-xs text-lube-ink-soft">/{post.slug}</p>
                  </td>
                  <td className="hidden px-4 py-4 md:table-cell">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                        post.published
                          ? "bg-lube-teal/15 text-lube-teal-deep"
                          : "bg-lube-ink/8 text-lube-ink-soft"
                      }`}
                    >
                      {post.published ? "Publicado" : "Rascunho"}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap items-center gap-3">
                      <Link
                        href={`/admin/posts/${post.id}`}
                        className="font-bold text-lube-teal hover:underline"
                      >
                        Editar
                      </Link>
                      {post.published ? (
                        <Link
                          href={`/blog/${post.slug}`}
                          className="font-bold text-lube-ink-soft hover:underline"
                        >
                          Ver
                        </Link>
                      ) : null}
                      <DeletePostButton id={post.id} title={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
