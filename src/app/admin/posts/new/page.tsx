import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/AdminShell";
import { PostForm } from "@/components/admin/PostForm";
import { auth } from "@/auth";

export const metadata: Metadata = {
  title: "Novo post · Admin",
  robots: { index: false, follow: false },
};

export default async function NewPostPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  return (
    <AdminShell title="Novo post">
      <PostForm mode="create" />
    </AdminShell>
  );
}
