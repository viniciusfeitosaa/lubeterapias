"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/posts";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("E-mail ou senha incorretos.");
      return;
    }

    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="lube-card mx-auto w-full max-w-md space-y-4 p-6 md:p-8">
      <div>
        <h1 className="font-display text-2xl text-lube-ink">Admin Casa LuBe</h1>
        <p className="mt-2 text-sm text-lube-ink-soft">
          Entre com o e-mail e a senha configurados no servidor.
        </p>
      </div>

      <label className="block text-sm font-bold text-lube-ink">
        E-mail
        <input
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="lube-input"
        />
      </label>

      <label className="block text-sm font-bold text-lube-ink">
        Senha
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="lube-input"
        />
      </label>

      {error ? (
        <p className="text-sm font-semibold text-lube-coral" role="alert">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={loading}
        className="lube-btn-primary inline-flex min-h-11 w-full items-center justify-center rounded-2xl px-5 py-3 text-sm font-bold tracking-wide transition disabled:opacity-60"
      >
        {loading ? "Entrando…" : "Entrar"}
      </button>
    </form>
  );
}
