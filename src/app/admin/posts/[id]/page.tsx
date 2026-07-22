import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { PostForm } from "@/components/admin/PostForm";
import { auth } from "@/auth";
import { getPostById } from "@/lib/blog";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = {
  title: "Editar post · Admin",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function EditPostPage({ params }: Props) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const { id } = await params;
  let post;
  try {
    post = await getPostById(id);
  } catch {
    notFound();
  }
  if (!post) notFound();

  return (
    <AdminShell title="Editar post">
      <PostForm
        mode="edit"
        postId={post.id}
        initial={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          body: post.body,
          cover_url: post.cover_url,
          published: post.published,
        }}
      />
    </AdminShell>
  );
}
