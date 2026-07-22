import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Login admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  return (
    <main className="lube-page-wash min-h-[70svh] py-16 md:py-24">
      <div className="lube-shell">
        <Suspense fallback={<p className="text-center text-lube-ink-soft">Carregando…</p>}>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}
