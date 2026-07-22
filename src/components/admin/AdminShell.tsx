import Link from "next/link";
import { signOut } from "@/auth";

export function AdminShell({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <div className="min-h-[70svh] bg-lube-mist">
      <header className="border-b border-lube-ink/8 bg-lube-foam/90 backdrop-blur">
        <div className="lube-shell flex flex-wrap items-center justify-between gap-4 py-4">
          <div>
            <p className="lube-eyebrow">Admin</p>
            <h1 className="font-display text-2xl text-lube-ink">{title}</h1>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/blog"
              className="text-sm font-bold text-lube-teal underline-offset-4 hover:underline"
            >
              Ver blog
            </Link>
            <Link
              href="/admin/posts"
              className="text-sm font-bold text-lube-ink-soft hover:text-lube-ink"
            >
              Posts
            </Link>
            <form
              action={async () => {
                "use server";
                await signOut({ redirectTo: "/admin/login" });
              }}
            >
              <button
                type="submit"
                className="rounded-xl border border-lube-ink/15 px-3 py-2 text-sm font-bold text-lube-ink hover:bg-lube-mist"
              >
                Sair
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="lube-shell py-8 md:py-12">{children}</div>
    </div>
  );
}
