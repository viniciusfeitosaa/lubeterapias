"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeletePostButton({ id, title }: { id: string; title: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function onDelete() {
    if (!window.confirm(`Excluir o post “${title}”?`)) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/posts?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Falha ao excluir");
      }
      router.refresh();
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Erro ao excluir");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={() => void onDelete()}
      disabled={loading}
      className="text-sm font-bold text-lube-coral hover:underline disabled:opacity-60"
    >
      {loading ? "…" : "Excluir"}
    </button>
  );
}
